/**
 * VYLO — Custom Server avec Socket.io
 * Lance Next.js + WebSocket sur le même port.
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
// rooms.get(roomCode) => { gameId, players: Map<socketId, playerData>, state, hostId }

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: { origin: "*" },
    path: "/api/socketio",
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Joueur connecté: ${socket.id}`);

    // ─── REJOINDRE UN SALON ─────────────────────────────
    socket.on("room:join", ({ roomCode, gameId, playerName }) => {
      socket.join(roomCode);

      let room = rooms.get(roomCode);
      if (!room) {
        // Créer le salon
        room = {
          gameId,
          players: new Map(),
          state: "LOBBY",
          hostId: socket.id,
        };
        rooms.set(roomCode, room);
      }

      const playerData = {
        id: socket.id,
        name: playerName,
        isHost: socket.id === room.hostId,
        isReady: false,
      };
      room.players.set(socket.id, playerData);

      // Envoyer l'état complet au joueur qui rejoint
      socket.emit("room:state", {
        gameId: room.gameId,
        players: Array.from(room.players.values()),
        state: room.state,
        isHost: socket.id === room.hostId,
      });

      // Notifier les autres
      socket.to(roomCode).emit("room:player-joined", playerData);
      console.log(`👤 ${playerName} a rejoint le salon ${roomCode}`);
    });

    // ─── PRÊT ───────────────────────────────────────────
    socket.on("room:ready", ({ roomCode }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      const player = room.players.get(socket.id);
      if (player) {
        player.isReady = !player.isReady;
        io.to(roomCode).emit("room:player-updated", player);
      }
    });

    // ─── LANCER LA PARTIE (GÉNÉRIQUE) ───────────────────
    socket.on("game:start", ({ roomCode, gameData }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;
      room.state = "PLAYING";
      io.to(roomCode).emit("game:started", {
        players: Array.from(room.players.values()),
        ...gameData,
      });
      console.log(`🎮 Partie lancée dans le salon ${roomCode}`);
    });

    // ─── LANCER UNDERCOVER (DISTRIBUTION PRIVÉE DES MOTS) ──
    socket.on("game:start_undercover", ({ roomCode, playerSecrets }) => {
      const room = rooms.get(roomCode);
      if (!room || socket.id !== room.hostId) return;
      room.state = "PLAYING";
      room.secrets = playerSecrets;

      // Envoi privé du mot à chaque joueur
      Object.entries(playerSecrets).forEach(([targetSocketId, secretData]) => {
        io.to(targetSocketId).emit("game:secret", secretData);
      });

      // Annonce générale du début de partie
      io.to(roomCode).emit("game:started_undercover", {
        players: Array.from(room.players.values()).map(p => ({
          ...p,
          isEliminated: false
        })),
        state: "PLAYING"
      });
      console.log(`🕵️ Undercover lancé en ligne dans le salon ${roomCode}`);
    });

    // ─── ACTIONS DE JEU (Générique) ─────────────────────
    socket.on("game:action", ({ roomCode, action, payload }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      // Broadcast l'action à tous les joueurs du salon
      io.to(roomCode).emit("game:action", {
        playerId: socket.id,
        action,
        payload,
      });
    });

    // ─── VOTE ───────────────────────────────────────────
    socket.on("game:vote", ({ roomCode, targetId }) => {
      const room = rooms.get(roomCode);
      if (!room) return;
      io.to(roomCode).emit("game:vote-cast", {
        voterId: socket.id,
        targetId,
      });
    });

    // ─── DÉCONNEXION ────────────────────────────────────
    socket.on("disconnect", () => {
      console.log(`🔴 Joueur déconnecté: ${socket.id}`);
      // Nettoyer les salons
      for (const [roomCode, room] of rooms.entries()) {
        if (room.players.has(socket.id)) {
          const playerName = room.players.get(socket.id)?.name;
          room.players.delete(socket.id);
          io.to(roomCode).emit("room:player-left", { id: socket.id, name: playerName });

          // Si le salon est vide, le supprimer
          if (room.players.size === 0) {
            rooms.delete(roomCode);
            console.log(`🗑️ Salon ${roomCode} supprimé (vide)`);
          }
          // Si l'hôte part, transférer
          else if (socket.id === room.hostId) {
            const newHost = room.players.values().next().value;
            room.hostId = newHost.id;
            newHost.isHost = true;
            io.to(roomCode).emit("room:host-changed", newHost);
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
