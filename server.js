/**
 * VYLO — Custom Server avec Socket.io
 * Lance Next.js + WebSocket sur le même port.
 * Gestion complète du jeu Undercover Online en temps réel.
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "4000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// ─── ROOM STATE (in-memory) ────────────────────────────────
const rooms = new Map();
// rooms.get(roomCode) => { gameId, players: Map<socketId, playerData>, state, hostId, secrets, speakingOrder, currentSpeakerIndex, clueRound, votes, eliminatedPlayer, winnerTeam }

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
    path: "/api/socketio",
  });

  const broadcastRoomState = (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const playersArray = Array.from(room.players.values()).map(p => ({
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      isHost: p.id === room.hostId,
      isReady: p.isReady,
      isEliminated: p.isEliminated || false,
      role: (room.state === "END_GAME" && room.secrets?.[p.id]) ? room.secrets[p.id].role : undefined,
      word: (room.state === "END_GAME" && room.secrets?.[p.id]) ? room.secrets[p.id].word : undefined,
    }));

    io.to(roomCode).emit("room:state", {
      gameId: room.gameId,
      players: playersArray,
      state: room.state,
      isHost: false, // calculé côté client via socket.id
      speakingOrder: room.speakingOrder || [],
      currentSpeakerIndex: room.currentSpeakerIndex || 0,
      clueRound: room.clueRound || 1,
      votes: room.votes || {},
      votedSocketIds: Object.keys(room.votes || {}),
      eliminatedPlayer: room.eliminatedPlayer || null,
      winnerTeam: room.winnerTeam || null,
      category: room.category || "",
      civilianWord: room.civilianWord || "",
      gameData: room.gameData || {},
    });
  };

  const checkWinConditions = (roomCode) => {
    const room = rooms.get(roomCode);
    if (!room) return false;

    // ─── LE SABOTEUR WIN CONDITIONS ───
    if (room.gameId === "saboteur") {
      const activePlayers = Array.from(room.players.values()).filter(p => !p.isEliminated);
      const eliminatedPlayerRole = room.eliminatedPlayer?.role;

      if (eliminatedPlayerRole === "SABOTEUR") {
        room.state = "END_GAME";
        room.winnerTeam = "AGENTS";
        broadcastRoomState(roomCode);
        return true;
      }

      const saboteurCount = activePlayers.filter(p => room.secrets?.[p.id]?.role === "SABOTEUR").length;
      if (saboteurCount > 0 && activePlayers.length <= 2) {
        room.state = "END_GAME";
        room.winnerTeam = "SABOTEUR";
        broadcastRoomState(roomCode);
        return true;
      }

      return false;
    }

    // ─── UNDERCOVER WIN CONDITIONS ───
    const activePlayers = Array.from(room.players.values()).filter(p => !p.isEliminated);
    const activeRoles = activePlayers.map(p => room.secrets?.[p.id]?.role || "Civilian");

    const undercoverCount = activeRoles.filter(r => r === "Undercover").length;
    const civilianCount = activeRoles.filter(r => r === "Civilian").length;
    const mrWhiteCount = activeRoles.filter(r => r === "MrWhite").length;

    if (undercoverCount === 0 && mrWhiteCount === 0) {
      room.state = "END_GAME";
      room.winnerTeam = "CIVILIANS";
      broadcastRoomState(roomCode);
      return true;
    }

    if (undercoverCount >= civilianCount) {
      room.state = "END_GAME";
      room.winnerTeam = "UNDERCOVER";
      broadcastRoomState(roomCode);
      return true;
    }

    return false;
  };

  io.on("connection", (socket) => {
    console.log(`🟢 Joueur connecté: ${socket.id}`);

    // ─── REJOINDRE UN SALON ─────────────────────────────
    socket.on("room:join", ({ roomCode, gameId, playerName, avatar }) => {
      socket.join(roomCode);

      let room = rooms.get(roomCode);
      if (!room) {
        room = {
          gameId: gameId || "undercover",
          players: new Map(),
          state: "LOBBY",
          hostId: socket.id,
          votes: {},
          speakingOrder: [],
          currentSpeakerIndex: 0,
          clueRound: 1,
        };
        rooms.set(roomCode, room);
      }

      const isHost = socket.id === room.hostId || room.players.size === 0;
      if (isHost) room.hostId = socket.id;

      const playerData = {
        id: socket.id,
        name: playerName,
        avatar: avatar,
        isHost: isHost,
        isReady: false,
        isEliminated: false,
      };
      room.players.set(socket.id, playerData);

      // Renvoyer les secrets si en cours de partie
      if (room.secrets?.[socket.id]) {
        socket.emit("game:secret", room.secrets[socket.id]);
      }

      broadcastRoomState(roomCode);
      console.log(`👤 ${playerName} a rejoint le salon ${roomCode} (Host: ${isHost})`);
    });

    // ─── TOGGLE PRÊT ─────────────────────────────────────
    socket.on("room:ready", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      const player = room.players.get(socket.id);
      if (player) {
        player.isReady = !player.isReady;
        broadcastRoomState(roomCode);
      }
    });

    // ─── LANCEMENT UNDERCOVER ────────────────────────────
    socket.on("game:start_undercover", ({ roomCode, playerSecrets, speakingOrder, category, civilianWord }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      room.state = "PLAYING_DEBATE";
      room.secrets = playerSecrets;
      room.speakingOrder = speakingOrder || Array.from(room.players.keys());
      room.currentSpeakerIndex = 0;
      room.clueRound = 1;
      room.votes = {};
      room.eliminatedPlayer = null;
      room.winnerTeam = null;
      room.category = category || "";
      room.civilianWord = civilianWord || "";

      // Réinitialiser les statuts d'élimination
      for (const player of room.players.values()) {
        player.isEliminated = false;
      }

      // Envoi individuel du secret
      if (playerSecrets) {
        Object.entries(playerSecrets).forEach(([targetSocketId, secretData]) => {
          io.to(targetSocketId).emit("game:secret", secretData);
        });
      }

      broadcastRoomState(roomCode);
      console.log(`🕵️ Undercover lancé en ligne dans le salon ${roomCode}`);
    });

    // ─── LANCEMENT LE SABOTEUR ONLINE ─────────────────────
    socket.on("game:start_saboteur", ({ roomCode, playerSecrets, activeChallenge }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      room.state = "PLAYING_SABOTEUR";
      room.secrets = playerSecrets;
      room.activeChallenge = activeChallenge;
      room.votes = {};
      room.eliminatedPlayer = null;
      room.winnerTeam = null;

      for (const player of room.players.values()) {
        player.isEliminated = false;
      }

      if (playerSecrets) {
        Object.entries(playerSecrets).forEach(([targetSocketId, secretData]) => {
          io.to(targetSocketId).emit("game:secret", secretData);
        });
      }

      broadcastRoomState(roomCode);
      console.log(`💣 Le Saboteur lancé en ligne dans le salon ${roomCode}`);
    });

    // ─── PASSER AU SPEAKER SUIVANT ───────────────────────
    socket.on("game:next_speaker", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== "PLAYING_DEBATE") return;

      const activeSpeakingOrder = room.speakingOrder.filter(id => !room.players.get(id)?.isEliminated);
      if (activeSpeakingOrder.length === 0) return;

      room.currentSpeakerIndex = (room.currentSpeakerIndex + 1) % activeSpeakingOrder.length;
      if (room.currentSpeakerIndex === 0) {
        room.clueRound += 1;
      }

      broadcastRoomState(roomCode);
    });

    // ─── DEBUT PHASE DE VOTE ─────────────────────────────
    socket.on("game:start_vote", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      room.state = "VOTING";
      room.votes = {};
      broadcastRoomState(roomCode);
      console.log(`🗳️ Phase de vote lancée dans le salon ${roomCode}`);
    });

    // ─── SOUMISSION D'UN VOTE ────────────────────────────
    socket.on("game:cast_vote", ({ roomCode, targetId }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== "VOTING") return;

      const voter = room.players.get(socket.id);
      if (!voter || voter.isEliminated) return;

      room.votes[socket.id] = targetId;

      const activePlayers = Array.from(room.players.values()).filter(p => !p.isEliminated);
      const totalActiveVotes = Object.keys(room.votes).length;

      broadcastRoomState(roomCode);

      // Si tout le monde a voté, dépouiller !
      if (totalActiveVotes >= activePlayers.length) {
        // Dépouillement des votes
        const tally = {};
        Object.values(room.votes).forEach(target => {
          tally[target] = (tally[target] || 0) + 1;
        });

        let maxVotes = 0;
        let eliminatedId = null;
        Object.entries(tally).forEach(([target, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            eliminatedId = target;
          }
        });

        if (eliminatedId) {
          const eliminatedPlayer = room.players.get(eliminatedId);
          if (eliminatedPlayer) {
            eliminatedPlayer.isEliminated = true;
            const role = room.secrets?.[eliminatedId]?.role || "Civilian";
            room.eliminatedPlayer = {
              id: eliminatedId,
              name: eliminatedPlayer.name,
              role: role,
              votes: maxVotes
            };

            // Vérifier si Mr White est éliminé et a une chance de deviner
            if (role === "MrWhite") {
              room.state = "MR_WHITE_GUESS";
              broadcastRoomState(roomCode);
              return;
            }
          }
        }

        // Vérifier les conditions de victoire
        const hasWinner = checkWinConditions(roomCode);
        if (!hasWinner) {
          room.state = "VOTE_RESULT";
          broadcastRoomState(roomCode);
        }
      }
    });

    // ─── TENTATIVE MR WHITE ──────────────────────────────
    socket.on("game:mr_white_guess", ({ roomCode, guess }) => {
      const room = rooms.get(roomCode);
      if (!room || room.state !== "MR_WHITE_GUESS") return;

      const cleanGuess = (guess || "").trim().toLowerCase();
      const cleanSecret = (room.civilianWord || "").trim().toLowerCase();

      if (cleanGuess === cleanSecret) {
        room.state = "END_GAME";
        room.winnerTeam = "MR_WHITE";
      } else {
        const hasWinner = checkWinConditions(roomCode);
        if (!hasWinner) {
          room.state = "VOTE_RESULT";
        }
      }
      broadcastRoomState(roomCode);
    });

    // ─── CONTINUER LA PARTIE APRES VOTE ──────────────────
    socket.on("game:continue_round", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      room.state = "PLAYING_DEBATE";
      room.currentSpeakerIndex = 0;
      room.clueRound += 1;
      room.votes = {};
      broadcastRoomState(roomCode);
    });

    // ─── SYNCHRONISATION GENERIQUE MULTIJOUEUR EN LIGNE ────
    socket.on("game:sync_state", ({ roomCode, newState, gameData }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      if (newState) room.state = newState;
      if (gameData) room.gameData = { ...(room.gameData || {}), ...gameData };

      broadcastRoomState(roomCode);
      console.log(`🌐 Etat synchronisé dans le salon ${roomCode}: ${newState || "state"}`);
    });

    // ─── RELANCER LE LOBBY (REJOUER) ─────────────────────
    socket.on("game:restart_lobby", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;

      room.state = "LOBBY";
      room.votes = {};
      room.speakingOrder = [];
      room.currentSpeakerIndex = 0;
      room.clueRound = 1;
      room.eliminatedPlayer = null;
      room.winnerTeam = null;

      for (const p of room.players.values()) {
        p.isReady = false;
        p.isEliminated = false;
      }

      broadcastRoomState(roomCode);
    });

    // ─── DÉCONNEXION ────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔴 Joueur déconnecté: ${socket.id}`);
      for (const [roomCode, room] of rooms.entries()) {
        if (room.players.has(socket.id)) {
          room.players.delete(socket.id);

          if (room.players.size === 0) {
            rooms.delete(roomCode);
            console.log(`🗑️ Salon ${roomCode} supprimé (vide)`);
          } else if (socket.id === room.hostId) {
            const newHost = room.players.values().next().value;
            if (newHost) {
              room.hostId = newHost.id;
              newHost.isHost = true;
            }
            broadcastRoomState(roomCode);
          } else {
            broadcastRoomState(roomCode);
          }
        }
      }
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(`\n🚀 VYLO est prêt sur http://${hostname}:${port}\n`);
    console.log(`   WebSocket: ws://${hostname}:${port}/api/socketio`);
    console.log(`   Salons actifs: ${rooms.size}\n`);
  });
});
