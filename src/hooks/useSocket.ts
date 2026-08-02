"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState, useCallback } from "react";

interface PlayerOnline {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
}

interface RoomState {
  gameId: string;
  players: PlayerOnline[];
  state: string;
  isHost: boolean;
}

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  roomState: RoomState | null;
  secretData: any | null;
  joinRoom: (roomCode: string, gameId: string, playerName: string) => void;
  toggleReady: (roomCode: string) => void;
  startGame: (roomCode: string, gameData?: any) => void;
  startUndercover: (roomCode: string, playerSecrets: Record<string, any>) => void;
  sendAction: (roomCode: string, action: string, payload?: any) => void;
  sendVote: (roomCode: string, targetId: string) => void;
}

export function useSocket(): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [secretData, setSecretData] = useState<any | null>(null);

  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || undefined;
    const socket = io(socketUrl, {
      path: "/api/socketio",
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("🟢 Connecté au serveur VYLO");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Déconnecté du serveur VYLO");
      setIsConnected(false);
    });

    // Secret listener
    socket.on("game:secret", (secret: any) => {
      setSecretData(secret);
    });

    socket.on("game:started_undercover", (data: any) => {
      setRoomState((prev: RoomState | null) => prev ? {
        ...prev,
        state: "PLAYING",
        players: data.players
      } : null);
    });

    // Room events
    socket.on("room:state", (state: RoomState) => {
      setRoomState(state);
    });

    socket.on("room:player-joined", (player: PlayerOnline) => {
      setRoomState((prev: RoomState | null) => prev ? {
        ...prev,
        players: [...prev.players, player],
      } : null);
    });

    socket.on("room:player-left", ({ id }: { id: string }) => {
      setRoomState((prev: RoomState | null) => prev ? {
        ...prev,
        players: prev.players.filter((p: PlayerOnline) => p.id !== id),
      } : null);
    });

    socket.on("room:player-updated", (updatedPlayer: PlayerOnline) => {
      setRoomState((prev: RoomState | null) => prev ? {
        ...prev,
        players: prev.players.map((p: PlayerOnline) => p.id === updatedPlayer.id ? updatedPlayer : p),
      } : null);
    });

    socket.on("room:host-changed", (newHost: PlayerOnline) => {
      setRoomState((prev: RoomState | null) => prev ? {
        ...prev,
        players: prev.players.map((p: PlayerOnline) => ({
          ...p,
          isHost: p.id === newHost.id,
        })),
        isHost: socketRef.current?.id === newHost.id,
      } : null);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = useCallback((roomCode: string, gameId: string, playerName: string) => {
    socketRef.current?.emit("room:join", { roomCode, gameId, playerName });
  }, []);

  const toggleReady = useCallback((roomCode: string) => {
    socketRef.current?.emit("room:ready", { roomCode });
  }, []);

  const startGame = useCallback((roomCode: string, gameData?: any) => {
    socketRef.current?.emit("game:start", { roomCode, gameData });
  }, []);

  const startUndercover = useCallback((roomCode: string, playerSecrets: Record<string, any>) => {
    socketRef.current?.emit("game:start_undercover", { roomCode, playerSecrets });
  }, []);

  const sendAction = useCallback((roomCode: string, action: string, payload?: any) => {
    socketRef.current?.emit("game:action", { roomCode, action, payload });
  }, []);

  const sendVote = useCallback((roomCode: string, targetId: string) => {
    socketRef.current?.emit("game:vote", { roomCode, targetId });
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    roomState,
    secretData,
    joinRoom,
    toggleReady,
    startGame,
    startUndercover,
    sendAction,
    sendVote,
  };
}
