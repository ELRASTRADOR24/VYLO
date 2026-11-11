/**
 * VYLO — Custom Server avec Socket.io
 * Lance Next.js + WebSocket sur le même port.
 * Socle multijoueur en ligne : salons persistants par playerId, vérification HTTP,
 * tolérance aux reconnexions et synchronisation temps réel des jeux.
 */
const { createServer } = require("http");
const { parse } = require("url");
const os = require("os");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, port });
const handle = app.getRequestHandler();

// ─── CONFIGURATION DES TIMERS DE GRÂCE ──────────────────────
const LOBBY_HOST_HANDOFF_MS = 12_000;
const LOBBY_PLAYER_EVICT_MS = 35_000;
const INGAME_PLAYER_EVICT_MS = 180_000;
const EMPTY_ROOM_CLEANUP_MS = 60_000;

const RESERVED_PSEUDOS = new Set([
  "",
  "invité",
  "invite",
  "guest",
  "joueur",
  "player",
]);

function normalizeRoomCode(raw) {
  return String(raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);
}

function sanitizePseudo(raw) {
  return String(raw || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 24);
}

function sanitizePlayerId(raw) {
  return String(raw || "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .trim()
    .slice(0, 80);
}

function sanitizeGameId(raw) {
  return String(raw || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40);
}

function sanitizeAvatar(raw) {
  const str = String(raw || "").trim();
  if (!str) return "😎";
  // Autorise les emojis et URLs http/data raisonnablement bornées
  return str.slice(0, 16000);
}

function isReservedPseudo(name) {
  return name.length < 2 || RESERVED_PSEUDOS.has(name.toLowerCase());
}

function getUniqueDisplayName(room, requestedName, selfPlayerId) {
  const taken = new Set();
  for (const p of room.players.values()) {
    if (p.id !== selfPlayerId) {
      taken.add(p.name.toLowerCase());
    }
  }
  if (!taken.has(requestedName.toLowerCase())) {
    return requestedName;
  }
  let suffix = 2;
  while (taken.has(`${requestedName} (${suffix})`.toLowerCase())) {
    suffix += 1;
  }
  return `${requestedName.slice(0, 19)} (${suffix})`;
}

function normalizeMrWhiteWord(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^(le |la |les |l'|un |une |des |du )/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function levenshteinOneOrLess(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
    } else {
      edits += 1;
      if (edits > 1) return false;
      if (a.length > b.length) i += 1;
      else if (b.length > a.length) j += 1;
      else {
        i += 1;
        j += 1;
      }
    }
  }
  if (i < a.length || j < b.length) edits += 1;
  return edits <= 1;
}

function checkMrWhiteGuessMatch(guess, civilianWord) {
  const normGuess = normalizeMrWhiteWord(guess);
  const normCivilian = normalizeMrWhiteWord(civilianWord);
  if (!normGuess || !normCivilian) return false;
  if (normGuess === normCivilian) return true;
  const sGuess = normGuess.replace(/[sx]$/, "");
  const sCivilian = normCivilian.replace(/[sx]$/, "");
  if (sGuess.length >= 2 && sGuess === sCivilian) return true;
  if (normCivilian.length >= 5 && normGuess.length >= 4 && levenshteinOneOrLess(normGuess, normCivilian)) {
    return true;
  }
  return false;
}

function toClientSecret(secretObj, room) {
  if (!secretObj) return null;
  if (room?.gameId !== "undercover") {
    return secretObj;
  }
  const hideCategory = Boolean(room?.config?.hideCategory);
  const isClassicHidden = secretObj.role === "Civilian" || secretObj.role === "Undercover";
  return {
    ...secretObj,
    role: isClassicHidden ? "HIDDEN" : secretObj.role,
    category: hideCategory ? "" : (secretObj.category || ""),
    ...(secretObj.role === "GuardianAngel"
      ? { guardianProtectedId: room?.guardianProtectedId || null }
      : {}),
  };
}

function applyMrWhiteFirstSpeakerAvoidance(order, secrets) {
  if (!Array.isArray(order) || order.length <= 2) return order || [];
  const copy = [...order];
  if (secrets?.[copy[0]]?.role === "MrWhite" && Math.random() < 0.9) {
    const newIdx = 1 + Math.floor(Math.random() * (copy.length - 1));
    [copy[0], copy[newIdx]] = [copy[newIdx], copy[0]];
  }
  return copy;
}

function isInfiltratorRole(role) {
  return role === "Undercover" || role === "MrWhite";
}

function isCivilianTeamRole(role) {
  return role !== "Undercover" && role !== "MrWhite" && role !== "Joker";
}

// ─── ROOM STATE (in-memory) ────────────────────────────────
const rooms = new Map();

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.end(JSON.stringify(payload));
}

function getLocalNetworkUrls(listenPort) {
  const urls = [];
  try {
    const nets = os.networkInterfaces();
    for (const ifaces of Object.values(nets)) {
      for (const iface of ifaces || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          urls.push(`http://${iface.address}:${listenPort}`);
        }
      }
    }
  } catch {}
  return urls;
}

app.prepare().then(() => {
  let io;

  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url || "/", true);
    const pathname = parsedUrl.pathname || "/";

    // Pré-vol CORS pour les déploiements front/socket séparés
    if (req.method === "OPTIONS" && (pathname === "/api/health" || pathname === "/api/rooms/check")) {
      res.statusCode = 204;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      return res.end();
    }

    // Health check rapide pour monitoring et diagnostics serveur
    if (req.method === "GET" && pathname === "/api/health") {
      return sendJson(res, 200, {
        ok: true,
        status: "healthy",
        uptimeSec: Math.round(process.uptime()),
        roomsCount: rooms.size,
        connectedSockets: io ? io.engine.clientsCount : 0,
      });
    }

    // Vérification sans création fantôme d'un salon existant avant navigation
    if (req.method === "GET" && pathname === "/api/rooms/check") {
      const code = normalizeRoomCode(parsedUrl.query?.code);
      const reqPlayerId =
        typeof parsedUrl.query?.playerId === "string" ? parsedUrl.query.playerId.trim() : "";

      if (!code || code.length < 4) {
        return sendJson(res, 200, {
          exists: false,
          roomCode: code,
          joinable: false,
          canReconnect: false,
          reason: "INVALID_CODE",
        });
      }

      const room = rooms.get(code);
      if (!room) {
        return sendJson(res, 200, {
          exists: false,
          roomCode: code,
          joinable: false,
          canReconnect: false,
          reason: "ROOM_NOT_FOUND",
        });
      }

      const canReconnect = Boolean(reqPlayerId && room.players.has(reqPlayerId));
      const playerCount = room.players.size;
      const connectedCount = Array.from(room.players.values()).filter((p) => p.isConnected).length;
      const maxPlayers = room.maxPlayers || 20;
      const isFull = playerCount >= maxPlayers && !canReconnect;
      const isLobby = room.state === "LOBBY";
      const joinable = canReconnect || (isLobby && !isFull);
      const reason = joinable ? null : isFull ? "ROOM_FULL" : "ROOM_IN_PROGRESS";

      return sendJson(res, 200, {
        exists: true,
        roomCode: code,
        gameId: room.gameId,
        state: room.state,
        playerCount,
        connectedCount,
        maxPlayers,
        joinable,
        canReconnect,
        reason,
      });
    }

    handle(req, res, parsedUrl);
  });

  io = new Server(httpServer, {
    cors: { origin: "*" },
    path: "/api/socketio",
    pingInterval: 10000,
    pingTimeout: 10000,
  });

  const clearPlayerTimers = (room, playerId) => {
    const timer = room.disconnectTimers.get(playerId);
    if (timer) {
      clearTimeout(timer);
      room.disconnectTimers.delete(playerId);
    }
    if (playerId === room.hostId && room.hostHandoffTimeout) {
      clearTimeout(room.hostHandoffTimeout);
      room.hostHandoffTimeout = null;
    }
  };

  const clearAllRoomTimers = (room) => {
    for (const timer of room.disconnectTimers.values()) {
      clearTimeout(timer);
    }
    room.disconnectTimers.clear();
    if (room.hostHandoffTimeout) {
      clearTimeout(room.hostHandoffTimeout);
      room.hostHandoffTimeout = null;
    }
    if (room.emptyTimeout) {
      clearTimeout(room.emptyTimeout);
      room.emptyTimeout = null;
    }
  };

  const pickNextHost = (room, excludePlayerId) => {
    const candidates = Array.from(room.players.values()).filter((p) => p.id !== excludePlayerId);
    if (candidates.length === 0) return null;
    return candidates.find((p) => p.isConnected) || candidates[0];
  };

  const syncHostFlags = (room) => {
    if (!room.hostId || !room.players.has(room.hostId)) {
      const nextHost = pickNextHost(room, null);
      room.hostId = nextHost ? nextHost.id : null;
    }
    for (const player of room.players.values()) {
      player.isHost = player.id === room.hostId;
    }
  };

  const broadcastRoomState = (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    syncHostFlags(room);

    const playersArray = Array.from(room.players.values()).map((p) => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      isHost: p.id === room.hostId,
      isReady: p.isReady,
      isConnected: p.isConnected,
      isEliminated: p.isEliminated || false,
      role: room.state === "END_GAME" && room.secrets?.[p.id] ? room.secrets[p.id].role : undefined,
      word: room.state === "END_GAME" && room.secrets?.[p.id] ? room.secrets[p.id].word : undefined,
    }));

    const votedIds = Object.keys(room.votes || {});
    const isEndGame = room.state === "END_GAME";
    const hideCategory = Boolean(room.config?.hideCategory);
    const sanitizedEliminated = room.eliminatedPlayer
      ? {
          id: room.eliminatedPlayer.id,
          name: room.eliminatedPlayer.name,
          role: room.eliminatedPlayer.role,
          votes: room.eliminatedPlayer.votes,
          savedByGuardian: Boolean(room.eliminatedPlayer.savedByGuardian),
        }
      : null;

    io.to(roomCode).emit("room:state", {
      roomCode,
      gameId: room.gameId,
      hostId: room.hostId,
      players: playersArray,
      state: room.state,
      isHost: false, // Calculé côté client via playerId === player.id
      speakingOrder: room.speakingOrder || [],
      currentSpeakerIndex: room.currentSpeakerIndex || 0,
      clueRound: room.clueRound || 1,
      eliminationRound: room.eliminationRound || 1,
      cluesHistory: room.cluesHistory || [],
      tiedPlayerIds: room.tiedPlayerIds || [],
      isTieBreakerVote: Boolean(room.isTieBreakerVote),
      turnDeadlineAt: room.turnDeadlineAt || null,
      config: room.config || null,
      votes: isEndGame ? (room.votes || {}) : {},
      votedPlayerIds: votedIds,
      votedSocketIds: votedIds,
      eliminatedPlayer: sanitizedEliminated,
      winnerTeam: room.winnerTeam || null,
      category: !hideCategory || isEndGame ? (room.category || "") : "",
      civilianWord: isEndGame ? (room.civilianWord || "") : "",
      undercoverWord: isEndGame ? (room.undercoverWord || "") : "",
      activeChallenge: room.activeChallenge || null,
      gameData: room.gameData || {},
    });
  };

  const removePlayerImmediately = (roomCode, playerId) => {
    const room = rooms.get(roomCode);
    if (!room || !room.players.has(playerId)) return;

    let prevSpeakerId = null;
    let prevSpeakerWasLast = false;
    if (room.gameId === "undercover" && room.state === "PLAYING_DEBATE") {
      const prevActiveOrder = (room.speakingOrder || []).filter((id) => {
        const p = room.players.get(id);
        return p && !p.isEliminated;
      });
      if (prevActiveOrder.length > 0) {
        const safePrevIdx = Math.min(room.currentSpeakerIndex || 0, prevActiveOrder.length - 1);
        prevSpeakerId = prevActiveOrder[safePrevIdx] || null;
        prevSpeakerWasLast = safePrevIdx === prevActiveOrder.length - 1;
      }
    }

    clearPlayerTimers(room, playerId);
    room.players.delete(playerId);

    if (room.players.size === 0) {
      clearAllRoomTimers(room);
      rooms.delete(roomCode);
      console.log(`🗑️ Salon ${roomCode} supprimé (vide)`);
      return;
    }

    if (room.hostId === playerId) {
      const nextHost = pickNextHost(room, playerId);
      room.hostId = nextHost ? nextHost.id : null;
    }

    // Nettoyer la file d'attente si aucun connecté ne reste
    const connectedLeft = Array.from(room.players.values()).some((p) => p.isConnected);
    if (!connectedLeft && !room.emptyTimeout) {
      room.emptyTimeout = setTimeout(() => {
        const currentRoom = rooms.get(roomCode);
        if (!currentRoom) return;
        const stillAnyConnected = Array.from(currentRoom.players.values()).some((p) => p.isConnected);
        if (!stillAnyConnected) {
          clearAllRoomTimers(currentRoom);
          rooms.delete(roomCode);
          console.log(`🗑️ Salon ${roomCode} expiré (inactif)`);
        }
      }, EMPTY_ROOM_CLEANUP_MS);
    }

    // Nettoyage anti-softlock si un joueur quitte / expire en pleine partie Undercover
    if (room.gameId === "undercover" && room.state !== "LOBBY" && room.state !== "END_GAME") {
      if (room.votes) {
        delete room.votes[playerId];
        for (const [voterId, target] of Object.entries(room.votes)) {
          if (target === playerId) {
            delete room.votes[voterId];
          }
        }
      }
      if (Array.isArray(room.speakingOrder)) {
        room.speakingOrder = room.speakingOrder.filter((id) => id !== playerId);
      }
      if (Array.isArray(room.tiedPlayerIds)) {
        room.tiedPlayerIds = room.tiedPlayerIds.filter((id) => id !== playerId);
      }
      if (room.guardianProtectedId === playerId) {
        room.guardianProtectedId = null;
      }

      if (
        (room.state === "MR_WHITE_GUESS" || room.state === "DOUBLE_AGENT_REVENGE") &&
        room.eliminatedPlayer?.id === playerId
      ) {
        if (checkWinConditions(roomCode)) return;
        room.state = "VOTE_RESULT";
        broadcastRoomState(roomCode);
        return;
      }

      if (room.state === "PLAYING_DEBATE") {
        const activeOrder = (room.speakingOrder || []).filter((id) => {
          const p = room.players.get(id);
          return p && !p.isEliminated;
        });
        if (activeOrder.length === 0) {
          room.state = "DISCUSSION";
          room.turnDeadlineAt = null;
        } else if (prevSpeakerId && prevSpeakerId !== playerId) {
          const keptIdx = activeOrder.indexOf(prevSpeakerId);
          room.currentSpeakerIndex =
            keptIdx >= 0 ? keptIdx : Math.min(room.currentSpeakerIndex || 0, activeOrder.length - 1);
        } else if (prevSpeakerId === playerId && prevSpeakerWasLast) {
          room.currentSpeakerIndex = 0;
          const minRounds = room.config?.minRoundsBeforeVote || 1;
          const currentSubRound = room.clueSubRound || 1;
          const turnTimerSec = room.config?.turnTimerSec || 0;
          if (room.eliminationRound === 1 && currentSubRound < minRounds) {
            room.clueRound = (room.clueRound || 1) + 1;
            room.clueSubRound = currentSubRound + 1;
            room.turnDeadlineAt = turnTimerSec > 0 ? Date.now() + turnTimerSec * 1000 : null;
          } else {
            room.state = "DISCUSSION";
            room.turnDeadlineAt = null;
          }
        } else {
          room.currentSpeakerIndex = Math.min(room.currentSpeakerIndex || 0, activeOrder.length - 1);
        }
      }

      if (room.state === "DOUBLE_AGENT_REVENGE") {
        const targetsLeft = Array.from(room.players.values()).filter(
          (p) => !p.isEliminated && p.id !== room.eliminatedPlayer?.id
        ).length;
        if (targetsLeft <= 1) {
          if (checkWinConditions(roomCode)) return;
          room.state = "VOTE_RESULT";
          broadcastRoomState(roomCode);
          return;
        }
      }

      if (
        room.state !== "VOTE_RESULT" &&
        room.state !== "MR_WHITE_GUESS" &&
        room.state !== "DOUBLE_AGENT_REVENGE"
      ) {
        if (checkWinConditions(roomCode)) return;
      }

      if (room.state === "VOTING") {
        if (room.isTieBreakerVote && (room.tiedPlayerIds || []).length <= 1) {
          room.isTieBreakerVote = false;
          room.tiedPlayerIds = [];
          room.votes = {};
        } else {
          const activeRemaining = Array.from(room.players.values()).filter((p) => !p.isEliminated);
          if (activeRemaining.length > 0 && Object.keys(room.votes || {}).length >= activeRemaining.length) {
            resolveUndercoverVote(roomCode);
            return;
          }
        }
      }
    }

    broadcastRoomState(roomCode);
  };

  const checkWinConditions = (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return false;

    // ─── LE SABOTEUR WIN CONDITIONS ───
    if (room.gameId === "saboteur") {
      const activePlayers = Array.from(room.players.values()).filter((p) => !p.isEliminated);
      const eliminatedPlayerRole = room.eliminatedPlayer?.role;

      if (eliminatedPlayerRole === "SABOTEUR") {
        room.state = "END_GAME";
        room.winnerTeam = "AGENTS";
        broadcastRoomState(roomCode);
        return true;
      }

      const saboteurCount = activePlayers.filter(
        (p) => room.secrets?.[p.id]?.role === "SABOTEUR"
      ).length;
      if (saboteurCount > 0 && activePlayers.length <= 2) {
        room.state = "END_GAME";
        room.winnerTeam = "SABOTEUR";
        broadcastRoomState(roomCode);
        return true;
      }

      return false;
    }

    // ─── UNDERCOVER WIN CONDITIONS ───
    const activePlayers = Array.from(room.players.values()).filter((p) => !p.isEliminated);
    const activeRoles = activePlayers.map((p) => room.secrets?.[p.id]?.role || "Civilian");

    const undercoverCount = activeRoles.filter((r) => r === "Undercover").length;
    const mrWhiteCount = activeRoles.filter((r) => r === "MrWhite").length;
    const infiltratorsCount = undercoverCount + mrWhiteCount;
    const civilianTeamCount = activeRoles.filter((r) => isCivilianTeamRole(r)).length;

    if (infiltratorsCount === 0) {
      room.state = "END_GAME";
      room.winnerTeam = "CIVILIANS";
      broadcastRoomState(roomCode);
      return true;
    }

    if (infiltratorsCount >= civilianTeamCount) {
      room.state = "END_GAME";
      room.winnerTeam = undercoverCount > 0 ? "UNDERCOVER" : "MR_WHITE";
      broadcastRoomState(roomCode);
      return true;
    }

    return false;
  };

  const resolveUndercoverVote = (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room || room.state !== "VOTING") return;

    const tally = {};
    let totalRealVotes = 0;
    Object.values(room.votes || {}).forEach((target) => {
      if (target && target !== "ABSTAIN" && room.players.has(target)) {
        tally[target] = (tally[target] || 0) + 1;
        totalRealVotes += 1;
      }
    });

    if (totalRealVotes === 0) {
      room.eliminatedPlayer = null;
      room.isTieBreakerVote = false;
      room.tiedPlayerIds = [];
      room.state = "VOTE_RESULT";
      broadcastRoomState(roomCode);
      return;
    }

    let maxVotes = 0;
    Object.values(tally).forEach((count) => {
      if (count > maxVotes) maxVotes = count;
    });

    const tiedIds = Object.entries(tally)
      .filter(([, count]) => count === maxVotes)
      .map(([id]) => id);

    if (tiedIds.length > 1) {
      if (!room.isTieBreakerVote) {
        room.isTieBreakerVote = true;
        room.tiedPlayerIds = tiedIds;
        room.votes = {};
        room.state = "VOTING";
        broadcastRoomState(roomCode);
        return;
      }
      room.eliminatedPlayer = null;
      room.isTieBreakerVote = false;
      room.tiedPlayerIds = [];
      room.state = "VOTE_RESULT";
      broadcastRoomState(roomCode);
      return;
    }

    const eliminatedId = tiedIds[0];
    const eliminatedPlayer = room.players.get(eliminatedId);
    if (!eliminatedPlayer) {
      room.eliminatedPlayer = null;
      room.isTieBreakerVote = false;
      room.tiedPlayerIds = [];
      room.state = "VOTE_RESULT";
      broadcastRoomState(roomCode);
      return;
    }

    // Bouclier de l'Ange Gardien au Tour 1
    if (room.eliminationRound === 1 && room.guardianProtectedId === eliminatedId) {
      room.guardianProtectedId = null;
      room.isTieBreakerVote = false;
      room.tiedPlayerIds = [];
      room.eliminatedPlayer = {
        id: eliminatedId,
        name: eliminatedPlayer.name,
        role: "GUARDIAN_SAVED",
        votes: maxVotes,
        savedByGuardian: true,
      };
      room.state = "VOTE_RESULT";
      broadcastRoomState(roomCode);
      return;
    }

    eliminatedPlayer.isEliminated = true;
    const actualRole = room.secrets?.[eliminatedId]?.role || "Civilian";
    const revealRole = room.config?.revealRoleOnElimination !== false;
    room.isTieBreakerVote = false;
    room.tiedPlayerIds = [];

    // Victoire solo du Joker UNIQUEMENT à la 1ère élimination
    if (actualRole === "Joker" && room.eliminationRound === 1) {
      room.eliminatedPlayer = {
        id: eliminatedId,
        name: eliminatedPlayer.name,
        role: actualRole,
        votes: maxVotes,
      };
      room.state = "END_GAME";
      room.winnerTeam = "JOKER";
      broadcastRoomState(roomCode);
      return;
    }

    // Dernière chance de Mr. White
    if (actualRole === "MrWhite") {
      room.eliminatedPlayer = {
        id: eliminatedId,
        name: eliminatedPlayer.name,
        role: "MrWhite",
        votes: maxVotes,
      };
      room.state = "MR_WHITE_GUESS";
      broadcastRoomState(roomCode);
      return;
    }

    // Pouvoir post-mortem du Double-Agent
    const aliveRemaining = Array.from(room.players.values()).filter((p) => !p.isEliminated);
    if (actualRole === "DoubleAgent" && aliveRemaining.length >= 2) {
      room.eliminatedPlayer = {
        id: eliminatedId,
        name: eliminatedPlayer.name,
        role: "DoubleAgent",
        votes: maxVotes,
      };
      room.state = "DOUBLE_AGENT_REVENGE";
      broadcastRoomState(roomCode);
      return;
    }

    room.eliminatedPlayer = {
      id: eliminatedId,
      name: eliminatedPlayer.name,
      role: revealRole ? actualRole : "HIDDEN",
      votes: maxVotes,
    };

    const hasWinner = checkWinConditions(roomCode);
    if (!hasWinner) {
      room.state = "VOTE_RESULT";
      broadcastRoomState(roomCode);
    }
  };

  io.on("connection", (socket) => {
    console.log(`🟢 Socket connecté: ${socket.id}`);

    // ─── REJOINDRE / CRÉER UN SALON ───────────────────────
    socket.on("room:join", (payload = {}, ack) => {
      const code = normalizeRoomCode(payload.roomCode);
      const reqGameId = sanitizeGameId(payload.gameId);
      const cleanPlayerId = sanitizePlayerId(payload.playerId) || socket.id;
      const cleanName = sanitizePseudo(payload.playerName);
      const cleanAvatar = sanitizeAvatar(payload.avatar);
      const createIfMissing = Boolean(payload.createIfMissing);

      const fail = (errorCode, message, extra = {}) => {
        const errPayload = { code: errorCode, error: errorCode, message, roomCode: code, ...extra };
        socket.emit("room:error", errPayload);
        if (typeof ack === "function") ack({ ok: false, ...errPayload });
      };

      if (!code || code.length < 4) {
        return fail("INVALID_CODE", "Le code du salon est invalide.");
      }

      if (isReservedPseudo(cleanName)) {
        return fail(
          "INVALID_NAME",
          "Choisissez votre vrai prénom ou pseudo (min. 2 caractères) pour rejoindre."
        );
      }

      // Quitter proprement un éventuel ancien salon avant de basculer vers le nouveau
      if (socket.data?.roomCode && socket.data.roomCode !== code) {
        const prevRoomCode = socket.data.roomCode;
        const prevPlayerId = socket.data.playerId || socket.id;
        socket.leave(prevRoomCode);
        removePlayerImmediately(prevRoomCode, prevPlayerId);
      }

      let room = rooms.get(code);
      if (!room) {
        if (!createIfMissing) {
          return fail(
            "ROOM_NOT_FOUND",
            `Aucun salon actif avec le code ${code}. Vérifiez le code auprès de votre hôte.`
          );
        }

        room = {
          code,
          gameId: reqGameId || "undercover",
          players: new Map(),
          kickedIds: new Set(),
          disconnectTimers: new Map(),
          hostHandoffTimeout: null,
          emptyTimeout: null,
          state: "LOBBY",
          hostId: cleanPlayerId,
          maxPlayers: 20,
          createdAt: Date.now(),
          secrets: {},
          votes: {},
          speakingOrder: [],
          currentSpeakerIndex: 0,
          clueRound: 1,
          clueSubRound: 1,
          eliminationRound: 1,
          cluesHistory: [],
          tiedPlayerIds: [],
          isTieBreakerVote: false,
          turnDeadlineAt: null,
          guardianProtectedId: null,
          config: null,
          eliminatedPlayer: null,
          winnerTeam: null,
          category: "",
          civilianWord: "",
          undercoverWord: "",
          activeChallenge: null,
          gameData: {},
        };
        rooms.set(code, room);
        console.log(`✨ Salon créé: ${code} (${room.gameId}) par ${cleanName}`);
      }

      if (reqGameId && room.gameId !== reqGameId) {
        return fail(
          "GAME_MISMATCH",
          `Ce salon correspond au jeu "${room.gameId}". Redirection en cours...`,
          { expectedGameId: room.gameId }
        );
      }

      const existingPlayer = room.players.get(cleanPlayerId);
      if (!existingPlayer) {
        if (room.kickedIds?.has(cleanPlayerId)) {
          return fail(
            "KICKED",
            "Vous avez été retiré de ce salon par l'hôte."
          );
        }
        if (room.state !== "LOBBY") {
          return fail(
            "ROOM_IN_PROGRESS",
            "La partie a déjà commencé dans ce salon. Attendez la manche suivante !"
          );
        }
        if (room.players.size >= (room.maxPlayers || 20)) {
          return fail("ROOM_FULL", "Ce salon est déjà complet.");
        }
      }

      // Annuler les timers de déconnexion / suppression si le joueur revient
      clearPlayerTimers(room, cleanPlayerId);
      if (room.emptyTimeout) {
        clearTimeout(room.emptyTimeout);
        room.emptyTimeout = null;
      }

      const assignedName = getUniqueDisplayName(room, cleanName, cleanPlayerId);

      if (existingPlayer) {
        existingPlayer.socketId = socket.id;
        existingPlayer.name = assignedName;
        existingPlayer.avatar = cleanAvatar;
        existingPlayer.isConnected = true;
        existingPlayer.disconnectedAt = null;
      } else {
        const shouldBeHost =
          room.players.size === 0 || !room.hostId || !room.players.has(room.hostId);
        if (shouldBeHost) {
          room.hostId = cleanPlayerId;
        }
        room.players.set(cleanPlayerId, {
          id: cleanPlayerId,
          socketId: socket.id,
          name: assignedName,
          avatar: cleanAvatar,
          isHost: cleanPlayerId === room.hostId,
          isReady: false,
          isConnected: true,
          isEliminated: false,
          disconnectedAt: null,
          joinedAt: Date.now(),
        });
      }

      syncHostFlags(room);
      socket.join(code);
      socket.data = { roomCode: code, playerId: cleanPlayerId };

      // Renvoyer les secrets si une partie est déjà en cours (reconnexion)
      if (room.secrets?.[cleanPlayerId]) {
        socket.emit("game:secret", toClientSecret(room.secrets[cleanPlayerId], room));
      }

      broadcastRoomState(code);

      if (typeof ack === "function") {
        ack({
          ok: true,
          roomCode: code,
          gameId: room.gameId,
          playerId: cleanPlayerId,
          assignedName,
          isHost: cleanPlayerId === room.hostId,
        });
      }

      console.log(
        `👤 ${assignedName} (${cleanPlayerId.slice(0, 10)}) dans ${code} [Host: ${
          cleanPlayerId === room.hostId
        }]`
      );
    });

    // ─── QUITTER EXPLICITEMENT UN SALON ──────────────────
    socket.on("room:leave", (payload = {}, ack) => {
      const code = normalizeRoomCode(payload.roomCode) || socket.data?.roomCode;
      const playerId = socket.data?.playerId || socket.id;
      if (!code) {
        if (typeof ack === "function") ack({ ok: true });
        return;
      }
      socket.leave(code);
      if (socket.data?.roomCode === code) {
        socket.data.roomCode = null;
      }
      removePlayerImmediately(code, playerId);
      if (typeof ack === "function") ack({ ok: true });
    });

    // ─── EXPULSER UN JOUEUR (HÔTE) ───────────────────────
    socket.on("room:kick", ({ roomCode, targetPlayerId } = {}, ack) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId || !targetPlayerId || targetPlayerId === callerId) {
        if (typeof ack === "function") ack({ ok: false });
        return;
      }

      const target = room.players.get(targetPlayerId);
      if (!target) {
        if (typeof ack === "function") ack({ ok: false });
        return;
      }

      if (!room.kickedIds) room.kickedIds = new Set();
      room.kickedIds.add(targetPlayerId);

      if (target.socketId && target.isConnected) {
        io.to(target.socketId).emit("room:error", {
          code: "KICKED",
          message: "Vous avez été retiré du salon par l'hôte.",
          roomCode: code,
        });
        const targetSocket = io.sockets.sockets.get(target.socketId);
        if (targetSocket) {
          targetSocket.leave(code);
          if (targetSocket.data?.roomCode === code) {
            targetSocket.data.roomCode = null;
          }
        }
      }

      removePlayerImmediately(code, targetPlayerId);
      if (typeof ack === "function") ack({ ok: true });
    });

    // ─── TRANSFÉRER LE RÔLE HÔTE ─────────────────────────
    socket.on("room:transfer_host", ({ roomCode, targetPlayerId } = {}, ack) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId || !room.players.has(targetPlayerId)) {
        if (typeof ack === "function") ack({ ok: false });
        return;
      }

      room.hostId = targetPlayerId;
      broadcastRoomState(code);
      if (typeof ack === "function") ack({ ok: true });
    });

    // ─── TOGGLE PRÊT ─────────────────────────────────────
    socket.on("room:ready", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const playerId = socket.data?.playerId;
      if (!room || !playerId) return;

      const player = room.players.get(playerId);
      if (player) {
        player.isReady = !player.isReady;
        broadcastRoomState(code);
      }
    });

    // ─── LANCEMENT UNDERCOVER ────────────────────────────
    socket.on(
      "game:start_undercover",
      ({
        roomCode,
        playerSecrets,
        speakingOrder,
        category,
        civilianWord,
        undercoverWord,
        config,
      } = {}) => {
        const code = normalizeRoomCode(roomCode);
        const room = rooms.get(code);
        const callerId = socket.data?.playerId;
        if (!room || callerId !== room.hostId) return;
        if (room.state !== "LOBBY" || room.players.size < 3) return;

        const safeConfig = {
          turnTimerSec: Math.max(0, Math.min(180, Number(config?.turnTimerSec ?? 30) || 0)),
          hideCategory: Boolean(config?.hideCategory),
          revealRoleOnElimination:
            config?.revealRoleOnElimination !== undefined
              ? Boolean(config.revealRoleOnElimination)
              : true,
          minRoundsBeforeVote: Math.max(1, Math.min(3, Number(config?.minRoundsBeforeVote ?? 1) || 1)),
        };

        const rawOrder =
          Array.isArray(speakingOrder) && speakingOrder.length > 0
            ? speakingOrder.filter((id) => room.players.has(id))
            : [];
        const seenInOrder = new Set(rawOrder);
        for (const id of room.players.keys()) {
          if (!seenInOrder.has(id)) rawOrder.push(id);
        }

        room.state = "PLAYING_DEBATE";
        room.secrets = playerSecrets || {};
        room.config = safeConfig;
        room.speakingOrder = applyMrWhiteFirstSpeakerAvoidance(rawOrder, room.secrets);
        room.currentSpeakerIndex = 0;
        room.clueRound = 1;
        room.clueSubRound = 1;
        room.eliminationRound = 1;
        room.cluesHistory = [];
        room.votes = {};
        room.tiedPlayerIds = [];
        room.isTieBreakerVote = false;
        room.guardianProtectedId = null;
        room.eliminatedPlayer = null;
        room.winnerTeam = null;
        room.category = category || "";
        room.civilianWord = civilianWord || "";
        room.undercoverWord = undercoverWord || "";
        room.turnDeadlineAt =
          safeConfig.turnTimerSec > 0 ? Date.now() + safeConfig.turnTimerSec * 1000 : null;

        for (const player of room.players.values()) {
          player.isEliminated = false;
        }

        // Envoi individuel du secret filtré (Civil et Undercover ne voient jamais leur rôle!)
        Object.entries(room.secrets).forEach(([targetPlayerId, secretData]) => {
          const targetPlayer = room.players.get(targetPlayerId);
          if (targetPlayer?.socketId) {
            io.to(targetPlayer.socketId).emit(
              "game:secret",
              toClientSecret(secretData, room)
            );
          }
        });

        broadcastRoomState(code);
        console.log(`🕵️ Undercover lancé en ligne dans le salon ${code}`);
      }
    );

    // ─── LANCEMENT LE SABOTEUR ONLINE ────────────────────
    socket.on("game:start_saboteur", ({ roomCode, playerSecrets, activeChallenge } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId) return;

      room.state = "PLAYING_SABOTEUR";
      room.secrets = playerSecrets || {};
      room.activeChallenge = activeChallenge || null;
      room.votes = {};
      room.eliminatedPlayer = null;
      room.winnerTeam = null;

      for (const player of room.players.values()) {
        player.isEliminated = false;
      }

      Object.entries(room.secrets).forEach(([targetPlayerId, secretData]) => {
        const targetPlayer = room.players.get(targetPlayerId);
        if (targetPlayer?.socketId) {
          io.to(targetPlayer.socketId).emit("game:secret", secretData);
        }
      });

      broadcastRoomState(code);
      console.log(`💣 Le Saboteur lancé en ligne dans le salon ${code}`);
    });

    // ─── POUVOIR ANGE GARDIEN (PROTECTION TOUR 1) ────────
    socket.on("game:guardian_protect", ({ roomCode, targetId } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || room.gameId !== "undercover" || !callerId) return;
      if (room.eliminationRound !== 1) return;
      if (room.state !== "PLAYING_DEBATE" && room.state !== "DISCUSSION") return;

      const callerPlayer = room.players.get(callerId);
      if (!callerPlayer || callerPlayer.isEliminated) return;
      if (room.secrets?.[callerId]?.role !== "GuardianAngel") return;

      const targetPlayer = room.players.get(targetId);
      if (!targetPlayer || targetPlayer.isEliminated) return;

      room.guardianProtectedId = targetId;
      socket.emit("game:secret", toClientSecret(room.secrets[callerId], room));
    });

    // ─── PASSER AU SPEAKER SUIVANT ───────────────────────
    socket.on("game:next_speaker", ({ roomCode, clue, expectedSpeakerId } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || room.state !== "PLAYING_DEBATE" || !callerId) return;

      const activeSpeakingOrder = room.speakingOrder.filter((id) => {
        const p = room.players.get(id);
        return p && !p.isEliminated;
      });
      if (activeSpeakingOrder.length === 0) return;

      const safeIdx = Math.min(room.currentSpeakerIndex || 0, activeSpeakingOrder.length - 1);
      const currentSpeakerId = activeSpeakingOrder[safeIdx];
      if (expectedSpeakerId && expectedSpeakerId !== currentSpeakerId) return;
      if (callerId !== currentSpeakerId && callerId !== room.hostId) return;

      const currentSpeaker = room.players.get(currentSpeakerId);
      const cleanClue = String(clue || "")
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .trim()
        .slice(0, 60);

      room.cluesHistory = room.cluesHistory || [];
      room.cluesHistory.push({
        round: room.clueRound || 1,
        eliminationRound: room.eliminationRound || 1,
        playerId: currentSpeakerId,
        playerName: currentSpeaker?.name || "Joueur",
        clue: cleanClue || "(Indice oral)",
        at: Date.now(),
      });

      const nextIdx = (safeIdx + 1) % activeSpeakingOrder.length;
      room.currentSpeakerIndex = nextIdx;

      const turnTimerSec = room.config?.turnTimerSec || 0;
      if (nextIdx === 0) {
        const minRounds = room.config?.minRoundsBeforeVote || 1;
        const currentSubRound = room.clueSubRound || 1;
        if (room.eliminationRound === 1 && currentSubRound < minRounds) {
          room.clueRound = (room.clueRound || 1) + 1;
          room.clueSubRound = currentSubRound + 1;
          room.turnDeadlineAt = turnTimerSec > 0 ? Date.now() + turnTimerSec * 1000 : null;
        } else {
          room.state = "DISCUSSION";
          room.turnDeadlineAt = null;
        }
      } else {
        room.turnDeadlineAt = turnTimerSec > 0 ? Date.now() + turnTimerSec * 1000 : null;
      }

      broadcastRoomState(code);
    });

    // ─── REFAIRE UN TOUR D'INDICES DEPUIS DISCUSSION ──────
    socket.on("game:continue_debate", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId) return;
      if (room.state !== "DISCUSSION") return;

      room.state = "PLAYING_DEBATE";
      room.currentSpeakerIndex = 0;
      room.clueRound = (room.clueRound || 1) + 1;
      room.clueSubRound = (room.clueSubRound || 1) + 1;
      const turnTimerSec = room.config?.turnTimerSec || 0;
      room.turnDeadlineAt = turnTimerSec > 0 ? Date.now() + turnTimerSec * 1000 : null;

      broadcastRoomState(code);
    });

    // ─── DEBUT PHASE DE VOTE ─────────────────────────────
    socket.on("game:start_vote", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || !callerId || !room.players.has(callerId)) return;
      if (room.gameId === "undercover") {
        if (callerId !== room.hostId) return;
        const canReopenAfterNoElim = room.state === "VOTE_RESULT" && !room.eliminatedPlayer;
        if (!["PLAYING_DEBATE", "DISCUSSION"].includes(room.state) && !canReopenAfterNoElim) {
          return;
        }
      }

      room.state = "VOTING";
      room.votes = {};
      room.tiedPlayerIds = [];
      room.isTieBreakerVote = false;
      room.turnDeadlineAt = null;
      broadcastRoomState(code);
      console.log(`🗳️ Phase de vote lancée dans le salon ${code}`);
    });

    // ─── CLÔTURER LE VOTE MANUELLEMENT (HÔTE) ─────────────
    socket.on("game:close_vote", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId || room.state !== "VOTING") return;
      if (Object.keys(room.votes || {}).length === 0) return;

      if (room.gameId === "undercover") {
        resolveUndercoverVote(code);
      }
    });

    // ─── SOUMISSION D'UN VOTE ────────────────────────────
    socket.on("game:cast_vote", ({ roomCode, targetId } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const voterId = socket.data?.playerId;
      if (!room || room.state !== "VOTING" || !voterId) return;

      const voter = room.players.get(voterId);
      if (!voter || voter.isEliminated || !targetId) return;

      // ─── BRANCHE LE SABOTEUR (CONSERVÉE INTACTE) ───
      if (room.gameId === "saboteur") {
        room.votes[voterId] = targetId;
        const activePlayers = Array.from(room.players.values()).filter((p) => !p.isEliminated);
        broadcastRoomState(code);

        if (Object.keys(room.votes).length >= activePlayers.length) {
          const tally = {};
          Object.values(room.votes).forEach((t) => {
            tally[t] = (tally[t] || 0) + 1;
          });
          let maxVotes = 0;
          let eliminatedId = null;
          Object.entries(tally).forEach(([t, count]) => {
            if (count > maxVotes) {
              maxVotes = count;
              eliminatedId = t;
            }
          });
          if (eliminatedId && room.players.get(eliminatedId)) {
            const elim = room.players.get(eliminatedId);
            elim.isEliminated = true;
            room.eliminatedPlayer = {
              id: eliminatedId,
              name: elim.name,
              role: room.secrets?.[eliminatedId]?.role || "AGENT",
              votes: maxVotes,
            };
          }
          if (!checkWinConditions(code)) {
            room.state = "VOTE_RESULT";
            broadcastRoomState(code);
          }
        }
        return;
      }

      // ─── BRANCHE UNDERCOVER OFFICIELLE ───
      if (room.votes[voterId]) return; // Un seul vote valide par tour
      if (targetId === "ABSTAIN") {
        if (room.isTieBreakerVote) return; // En cas d'égalité, voter parmi les ex-aequo
      } else {
        if (targetId === voterId) return; // Pas d'auto-vote
        const targetPlayer = room.players.get(targetId);
        if (!targetPlayer || targetPlayer.isEliminated) return;
        if (room.isTieBreakerVote && !(room.tiedPlayerIds || []).includes(targetId)) {
          return;
        }
      }

      room.votes[voterId] = targetId;

      const activePlayers = Array.from(room.players.values()).filter((p) => !p.isEliminated);
      if (Object.keys(room.votes).length >= activePlayers.length) {
        resolveUndercoverVote(code);
      } else {
        broadcastRoomState(code);
      }
    });

    // ─── TENTATIVE MR WHITE ──────────────────────────────
    socket.on("game:mr_white_guess", ({ roomCode, guess } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || room.state !== "MR_WHITE_GUESS" || !callerId) return;

      const mrWhiteId = room.eliminatedPlayer?.id;
      const mrWhitePlayer = mrWhiteId ? room.players.get(mrWhiteId) : null;
      const isAuthorized =
        (callerId === mrWhiteId && room.secrets?.[callerId]?.role === "MrWhite") ||
        (callerId === room.hostId && mrWhitePlayer && !mrWhitePlayer.isConnected);
      if (!isAuthorized) return;

      if (checkMrWhiteGuessMatch(guess, room.civilianWord)) {
        room.state = "END_GAME";
        room.winnerTeam = "MR_WHITE";
      } else {
        const hasWinner = checkWinConditions(code);
        if (!hasWinner) {
          room.state = "VOTE_RESULT";
        }
      }
      broadcastRoomState(code);
    });

    // ─── VENGEANCE DU DOUBLE-AGENT ───────────────────────
    socket.on("game:double_agent_revenge", ({ roomCode, targetId } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || room.state !== "DOUBLE_AGENT_REVENGE" || !callerId || !targetId) return;

      const agentId = room.eliminatedPlayer?.id;
      const agentPlayer = agentId ? room.players.get(agentId) : null;
      const isAuthorized =
        (callerId === agentId && room.secrets?.[callerId]?.role === "DoubleAgent") ||
        (callerId === room.hostId && agentPlayer && !agentPlayer.isConnected);
      if (!isAuthorized) return;

      const targetPlayer = room.players.get(targetId);
      if (!targetPlayer || targetPlayer.isEliminated || targetId === agentId) return;

      targetPlayer.isEliminated = true;
      const targetRole = room.secrets?.[targetId]?.role || "Civilian";
      const revealRole = room.config?.revealRoleOnElimination !== false;

      if (targetRole === "MrWhite") {
        room.eliminatedPlayer = {
          id: targetId,
          name: targetPlayer.name,
          role: "MrWhite",
          votes: 1,
        };
        room.state = "MR_WHITE_GUESS";
        broadcastRoomState(code);
        return;
      }

      room.eliminatedPlayer = {
        id: targetId,
        name: targetPlayer.name,
        role: revealRole ? targetRole : "HIDDEN",
        votes: 1,
      };

      const hasWinner = checkWinConditions(code);
      if (!hasWinner) {
        room.state = "VOTE_RESULT";
        broadcastRoomState(code);
      }
    });

    // ─── CONTINUER LA PARTIE APRES VOTE ──────────────────
    socket.on("game:continue_round", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId) return;
      if (room.gameId === "undercover" && room.state !== "VOTE_RESULT") return;

      const aliveOrder = (room.speakingOrder || []).filter((id) => {
        const p = room.players.get(id);
        return p && !p.isEliminated;
      });

      const hadEliminationOrSave = Boolean(room.eliminatedPlayer);
      room.state = "PLAYING_DEBATE";
      room.speakingOrder = applyMrWhiteFirstSpeakerAvoidance(aliveOrder, room.secrets);
      room.currentSpeakerIndex = 0;
      if (hadEliminationOrSave) {
        room.eliminationRound = (room.eliminationRound || 1) + 1;
        room.clueSubRound = 1;
      } else {
        room.clueSubRound = (room.clueSubRound || 1) + 1;
      }
      room.clueRound = (room.clueRound || 1) + 1;
      room.votes = {};
      room.tiedPlayerIds = [];
      room.isTieBreakerVote = false;
      room.eliminatedPlayer = null;
      const turnTimerSec = room.config?.turnTimerSec || 0;
      room.turnDeadlineAt = turnTimerSec > 0 ? Date.now() + turnTimerSec * 1000 : null;
      broadcastRoomState(code);
    });

    // ─── SYNCHRONISATION GENERIQUE MULTIJOUEUR EN LIGNE ──
    socket.on("game:sync_state", ({ roomCode, newState, gameData } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || !callerId || !room.players.has(callerId)) return;

      if (newState) room.state = newState;
      if (gameData && typeof gameData === "object") {
        room.gameData = { ...(room.gameData || {}), ...gameData };
      }

      broadcastRoomState(code);
    });

    // ─── MISE À JOUR ATOMIQUE PAR JOUEUR (ÉVITE LES ÉCRASEMENTS) ───
    socket.on(
      "game:player_map_update",
      ({ roomCode, mapField, value, scoreDelta, revealStateWhenAllIn } = {}) => {
        const code = normalizeRoomCode(roomCode);
        const room = rooms.get(code);
        const playerId = socket.data?.playerId;
        if (!room || !playerId || !room.players.has(playerId) || !mapField) return;

        room.gameData = room.gameData || {};
        const prevMap =
          room.gameData[mapField] && typeof room.gameData[mapField] === "object"
            ? room.gameData[mapField]
            : {};

        room.gameData[mapField] = {
          ...prevMap,
          [playerId]: value,
        };

        if (typeof scoreDelta === "number" && scoreDelta !== 0) {
          const prevScores = room.gameData.scores || {};
          room.gameData.scores = {
            ...prevScores,
            [playerId]: (prevScores[playerId] || 0) + scoreDelta,
          };
        }

        if (revealStateWhenAllIn) {
          const connectedCount = Array.from(room.players.values()).filter(
            (p) => p.isConnected && !p.isEliminated
          ).length;
          const submittedCount = Object.keys(room.gameData[mapField]).length;
          if (submittedCount >= Math.max(1, connectedCount)) {
            room.state = revealStateWhenAllIn;
          }
        }

        broadcastRoomState(code);
      }
    );

    // ─── RÉACTIONS EMOJIS EN TEMPS RÉEL ──────────────────
    socket.on("game:emoji_reaction", ({ roomCode, emoji, senderName } = {}) => {
      const code = normalizeRoomCode(roomCode);
      if (!code || !emoji) return;
      io.to(code).emit("game:emoji_reaction", {
        emoji: String(emoji).slice(0, 8),
        senderName: sanitizePseudo(senderName),
        id: Date.now() + Math.random(),
      });
    });

    // ─── RELANCER LE LOBBY (REJOUER) ─────────────────────
    socket.on("game:restart_lobby", ({ roomCode } = {}) => {
      const code = normalizeRoomCode(roomCode);
      const room = rooms.get(code);
      const callerId = socket.data?.playerId;
      if (!room || callerId !== room.hostId) return;

      room.state = "LOBBY";
      room.kickedIds?.clear();
      room.votes = {};
      room.speakingOrder = [];
      room.currentSpeakerIndex = 0;
      room.clueRound = 1;
      room.clueSubRound = 1;
      room.eliminationRound = 1;
      room.cluesHistory = [];
      room.tiedPlayerIds = [];
      room.isTieBreakerVote = false;
      room.turnDeadlineAt = null;
      room.guardianProtectedId = null;
      room.config = null;
      room.eliminatedPlayer = null;
      room.winnerTeam = null;
      room.secrets = {};
      room.category = "";
      room.civilianWord = "";
      room.undercoverWord = "";
      room.activeChallenge = null;
      room.gameData = {};

      for (const p of room.players.values()) {
        p.isReady = false;
        p.isEliminated = false;
      }

      io.to(code).emit("game:secret", null);
      broadcastRoomState(code);
    });

    // ─── DÉCONNEXION TEMPORAIRE AVEC PÉRIODE DE GRÂCE ────
    socket.on("disconnect", (reason) => {
      const code = socket.data?.roomCode;
      const playerId = socket.data?.playerId;
      if (!code || !playerId) {
        console.log(`🔴 Socket déconnecté: ${socket.id} (${reason})`);
        return;
      }

      const room = rooms.get(code);
      if (!room) return;

      const player = room.players.get(playerId);
      // Ignorer si un nouveau socket a déjà repris la session de ce joueur avant cette fermeture
      if (!player || player.socketId !== socket.id) {
        return;
      }

      player.isConnected = false;
      player.disconnectedAt = Date.now();
      console.log(`🟠 ${player.name} déconnecté temporairement de ${code} (${reason})`);

      // Si l'hôte se déconnecte (lobby ou en pleine partie), attendre 12s avant de transférer la couronne
      if (playerId === room.hostId) {
        if (room.hostHandoffTimeout) clearTimeout(room.hostHandoffTimeout);
        room.hostHandoffTimeout = setTimeout(() => {
          const currentRoom = rooms.get(code);
          if (!currentRoom) return;
          const currentHost = currentRoom.players.get(currentRoom.hostId);
          if (currentHost && !currentHost.isConnected) {
            const replacement = pickNextHost(currentRoom, currentRoom.hostId);
            if (replacement && replacement.isConnected) {
              currentRoom.hostId = replacement.id;
              broadcastRoomState(code);
              console.log(`👑 Hôte transféré dans ${code} -> ${replacement.name}`);
            }
          }
        }, LOBBY_HOST_HANDOFF_MS);
      }

      // Timer d'expulsion si le joueur ne revient pas dans la fenêtre de grâce
      const graceMs = room.state === "LOBBY" ? LOBBY_PLAYER_EVICT_MS : INGAME_PLAYER_EVICT_MS;
      const prevTimer = room.disconnectTimers.get(playerId);
      if (prevTimer) clearTimeout(prevTimer);

      const evictTimer = setTimeout(() => {
        const currentRoom = rooms.get(code);
        if (!currentRoom) return;
        const target = currentRoom.players.get(playerId);
        if (target && !target.isConnected) {
          removePlayerImmediately(code, playerId);
        }
      }, graceMs);
      room.disconnectTimers.set(playerId, evictTimer);

      // Timer global si plus personne n'est connecté dans le salon
      const anyConnected = Array.from(room.players.values()).some((p) => p.isConnected);
      if (!anyConnected) {
        if (room.emptyTimeout) clearTimeout(room.emptyTimeout);
        room.emptyTimeout = setTimeout(() => {
          const currentRoom = rooms.get(code);
          if (!currentRoom) return;
          const stillAny = Array.from(currentRoom.players.values()).some((p) => p.isConnected);
          if (!stillAny) {
            clearAllRoomTimers(currentRoom);
            rooms.delete(code);
            console.log(`🗑️ Salon ${code} expiré (aucun joueur connecté)`);
          }
        }, EMPTY_ROOM_CLEANUP_MS);
      }

      broadcastRoomState(code);
    });
  });

  httpServer.keepAliveTimeout = 65000;
  httpServer.headersTimeout = 66000;

  // Omettre hostname permet l'écoute dual-stack IPv6 (::1 / localhost) + IPv4 (127.0.0.1 / 0.0.0.0)
  httpServer.listen(port, () => {
    console.log(`\n🚀 VYLO est prêt sur http://localhost:${port}`);
    const lanUrls = getLocalNetworkUrls(port);
    if (lanUrls.length > 0) {
      lanUrls.forEach((u) => console.log(`   Réseau local (Wi-Fi) : ${u}`));
    }
    console.log(`   WebSocket : ws://localhost:${port}/api/socketio`);
    console.log(`   Health API : http://localhost:${port}/api/health\n`);
  });

  let shuttingDown = false;
  const gracefulShutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`\n🛑 Arrêt VYLO (${signal})...`);
    for (const room of rooms.values()) {
      clearAllRoomTimers(room);
    }
    rooms.clear();
    if (io) {
      io.close();
    }
    httpServer.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(0), 2500).unref();
  };

  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
});
