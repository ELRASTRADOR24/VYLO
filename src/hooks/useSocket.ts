"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState, useCallback } from "react";

export interface PlayerOnline {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
  isEliminated: boolean;
  role?: string;
  word?: string;
}

export interface RoomState {
  gameId: string;
  players: PlayerOnline[];
  state: string;
  isHost: boolean;
  speakingOrder?: string[];
  currentSpeakerIndex?: number;
  clueRound?: number;
  votes?: Record<string, string>;
  votedSocketIds?: string[];
  eliminatedPlayer?: {
    id: string;
    name: string;
    role: string;
    votes: number;
  } | null;
  winnerTeam?: "CIVILIANS" | "UNDERCOVER" | "MR_WHITE" | null;
  category?: string;
  civilianWord?: string;
  gameData?: Record<string, any>;
}

export interface SecretData {
  role: string;
  word?: string;
  category?: string;
  saboteurHint?: string;
}

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  roomState: RoomState | null;
  secretData: SecretData | null;
  joinRoom: (roomCode: string, gameId: string, playerName: string, avatar?: string) => void;
  toggleReady: (roomCode: string) => void;
  startUndercover: (roomCode: string, playerSecrets: Record<string, any>, speakingOrder: string[], category: string, civilianWord: string) => void;
  startSaboteur: (roomCode: string, playerSecrets: Record<string, any>, activeChallenge: any) => void;
  nextSpeaker: (roomCode: string) => void;
  startVote: (roomCode: string) => void;
  castVote: (roomCode: string, targetId: string) => void;
  submitMrWhiteGuess: (roomCode: string, guess: string) => void;
  continueRound: (roomCode: string) => void;
  restartLobby: (roomCode: string) => void;
  syncGameState: (roomCode: string, newState?: string, gameData?: any) => void;
}

export function useSocket(): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [secretData, setSecretData] = useState<SecretData | null>(null);

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

    socket.on("game:secret", (secret: SecretData) => {
      setSecretData(secret);
    });

    socket.on("room:state", (state: RoomState) => {
      setRoomState(state);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = useCallback((roomCode: string, gameId: string, playerName: string, avatar?: string) => {
    socketRef.current?.emit("room:join", { roomCode, gameId, playerName, avatar });
  }, []);

  const toggleReady = useCallback((roomCode: string) => {
    socketRef.current?.emit("room:ready", { roomCode });
  }, []);

  const startUndercover = useCallback((
    roomCode: string, 
    playerSecrets: Record<string, any>, 
    speakingOrder: string[],
    category: string,
    civilianWord: string
  ) => {
    socketRef.current?.emit("game:start_undercover", { 
      roomCode, playerSecrets, speakingOrder, category, civilianWord 
    });
  }, []);

  const startSaboteur = useCallback((
    roomCode: string, 
    playerSecrets: Record<string, any>, 
    activeChallenge: any
  ) => {
    socketRef.current?.emit("game:start_saboteur", { 
      roomCode, playerSecrets, activeChallenge 
    });
  }, []);

  const nextSpeaker = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:next_speaker", { roomCode });
  }, []);

  const startVote = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:start_vote", { roomCode });
  }, []);

  const castVote = useCallback((roomCode: string, targetId: string) => {
    socketRef.current?.emit("game:cast_vote", { roomCode, targetId });
  }, []);

  const submitMrWhiteGuess = useCallback((roomCode: string, guess: string) => {
    socketRef.current?.emit("game:mr_white_guess", { roomCode, guess });
  }, []);

  const continueRound = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:continue_round", { roomCode });
  }, []);

  const restartLobby = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:restart_lobby", { roomCode });
  }, []);

  const syncGameState = useCallback((roomCode: string, newState?: string, gameData?: any) => {
    socketRef.current?.emit("game:sync_state", { roomCode, newState, gameData });
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    roomState,
    secretData,
    joinRoom,
    toggleReady,
    startUndercover,
    startSaboteur,
    nextSpeaker,
    startVote,
    castVote,
    submitMrWhiteGuess,
    continueRound,
    restartLobby,
    syncGameState,
  };
}
