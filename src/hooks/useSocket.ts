"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  getOrCreateOnlinePlayerId,
  normalizeRoomCode,
  sanitizePseudo,
} from "@/lib/onlineIdentity";

export interface PlayerOnline {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
  isConnected?: boolean;
  isEliminated: boolean;
  role?: string;
  word?: string;
}

export interface UndercoverOnlineConfig {
  turnTimerSec: number;
  hideCategory: boolean;
  revealRoleOnElimination: boolean;
  minRoundsBeforeVote: number;
}

export interface UndercoverClueEntry {
  round: number;
  eliminationRound?: number;
  playerId: string;
  playerName: string;
  clue: string;
  at: number;
}

export interface RoomState {
  roomCode?: string;
  gameId: string;
  hostId?: string | null;
  players: PlayerOnline[];
  state: string;
  isHost: boolean;
  speakingOrder?: string[];
  currentSpeakerIndex?: number;
  clueRound?: number;
  eliminationRound?: number;
  cluesHistory?: UndercoverClueEntry[];
  tiedPlayerIds?: string[];
  isTieBreakerVote?: boolean;
  turnDeadlineAt?: number | null;
  config?: UndercoverOnlineConfig | null;
  votes?: Record<string, string>;
  votedPlayerIds?: string[];
  votedSocketIds?: string[];
  eliminatedPlayer?: {
    id: string;
    name: string;
    role: string;
    votes: number;
    savedByGuardian?: boolean;
  } | null;
  winnerTeam?: "CIVILIANS" | "UNDERCOVER" | "MR_WHITE" | "JOKER" | "AGENTS" | "SABOTEUR" | null;
  category?: string;
  civilianWord?: string;
  undercoverWord?: string;
  activeChallenge?: any;
  gameData?: Record<string, any>;
}

export interface SecretData {
  role: string;
  word?: string;
  category?: string;
  saboteurHint?: string;
  detectiveClue?: string;
  guardianProtectedId?: string | null;
  allies?: string[];
}

export type RoomErrorCode =
  | "ROOM_NOT_FOUND"
  | "ROOM_IN_PROGRESS"
  | "ROOM_FULL"
  | "GAME_MISMATCH"
  | "INVALID_CODE"
  | "INVALID_NAME"
  | "KICKED";

export interface RoomError {
  code: RoomErrorCode | string;
  message: string;
  roomCode?: string;
  expectedGameId?: string;
}

export type ConnectionStatus = "connecting" | "connected" | "reconnecting" | "disconnected";

export interface JoinRoomOptions {
  createIfMissing?: boolean;
}

interface PendingJoinPayload {
  roomCode: string;
  gameId: string;
  playerName: string;
  avatar?: string;
  createIfMissing?: boolean;
}

export interface UseSocketReturn {
  socket: Socket | null;
  socketId: string | null;
  playerId: string;
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  roomState: RoomState | null;
  secretData: SecretData | null;
  roomError: RoomError | null;
  clearRoomError: () => void;
  joinRoom: (
    roomCode: string,
    gameId: string,
    playerName: string,
    avatar?: string,
    options?: JoinRoomOptions
  ) => void;
  leaveRoom: (roomCode?: string) => void;
  kickPlayer: (roomCode: string, targetPlayerId: string) => void;
  transferHost: (roomCode: string, targetPlayerId: string) => void;
  toggleReady: (roomCode: string) => void;
  startUndercover: (
    roomCode: string,
    playerSecrets: Record<string, any>,
    speakingOrder: string[],
    category: string,
    civilianWord: string,
    undercoverWord?: string,
    config?: Partial<UndercoverOnlineConfig>
  ) => void;
  startSaboteur: (
    roomCode: string,
    playerSecrets: Record<string, any>,
    activeChallenge: any
  ) => void;
  nextSpeaker: (roomCode: string, clue?: string, expectedSpeakerId?: string) => void;
  continueDebate: (roomCode: string) => void;
  startVote: (roomCode: string) => void;
  closeVote: (roomCode: string) => void;
  castVote: (roomCode: string, targetId: string) => void;
  protectWithGuardian: (roomCode: string, targetId: string) => void;
  submitDoubleAgentTarget: (roomCode: string, targetId: string) => void;
  submitMrWhiteGuess: (roomCode: string, guess: string) => void;
  continueRound: (roomCode: string) => void;
  restartLobby: (roomCode: string) => void;
  syncGameState: (roomCode: string, newState?: string, gameData?: any) => void;
  submitPlayerMapUpdate: (
    roomCode: string,
    mapField: string,
    value: any,
    options?: { scoreDelta?: number; revealStateWhenAllIn?: string }
  ) => void;
}

export function useSocket(): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const activeJoinRef = useRef<PendingJoinPayload | null>(null);
  const lastEmitSignatureRef = useRef<string>("");
  const playerIdRef = useRef<string>("");

  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string>("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [secretData, setSecretData] = useState<SecretData | null>(null);
  const [roomError, setRoomError] = useState<RoomError | null>(null);

  const emitJoin = useCallback((sock: Socket, payload: PendingJoinPayload, pId: string) => {
    const cleanCode = normalizeRoomCode(payload.roomCode);
    const cleanName = sanitizePseudo(payload.playerName);
    if (!cleanCode || !cleanName || !pId) return;

    const sig = `${sock.id || "pending"}|${cleanCode}|${payload.gameId}|${pId}|${cleanName}|${
      payload.avatar || ""
    }|${Boolean(payload.createIfMissing)}`;

    if (lastEmitSignatureRef.current === sig) {
      return;
    }
    lastEmitSignatureRef.current = sig;

    sock.emit(
      "room:join",
      {
        roomCode: cleanCode,
        gameId: payload.gameId,
        playerId: pId,
        playerName: cleanName,
        avatar: payload.avatar || "😎",
        createIfMissing: Boolean(payload.createIfMissing),
      },
      (ack?: {
        ok?: boolean;
        error?: string;
        message?: string;
        roomCode?: string;
        expectedGameId?: string;
      }) => {
        if (ack && ack.ok) {
          setRoomError(null);
        } else if (ack && !ack.ok && ack.error) {
          lastEmitSignatureRef.current = "";
          setRoomError({
            code: ack.error,
            message: ack.message || "Impossible de rejoindre ce salon.",
            roomCode: ack.roomCode || cleanCode,
            expectedGameId: ack.expectedGameId,
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    const resolvedPlayerId = getOrCreateOnlinePlayerId();
    playerIdRef.current = resolvedPlayerId;
    setPlayerId(resolvedPlayerId);

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || undefined;
    const socket = io(socketUrl, {
      path: "/api/socketio",
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 600,
      reconnectionDelayMax: 4000,
    });

    socketRef.current = socket;
    setSocketInstance(socket);

    socket.on("connect", () => {
      setSocketId(socket.id || null);
      setIsConnected(true);
      setConnectionStatus("connected");
      lastEmitSignatureRef.current = "";

      if (activeJoinRef.current && playerIdRef.current) {
        emitJoin(socket, activeJoinRef.current, playerIdRef.current);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setSocketId(null);
      setConnectionStatus(activeJoinRef.current ? "reconnecting" : "disconnected");
      lastEmitSignatureRef.current = "";
    });

    socket.io.on("reconnect_attempt", () => {
      setConnectionStatus("reconnecting");
    });

    socket.on("game:secret", (secret: SecretData | null) => {
      setSecretData(secret);
    });

    socket.on("room:state", (state: RoomState) => {
      setRoomError(null);
      setRoomState(state);
    });

    socket.on("room:error", (err: RoomError) => {
      lastEmitSignatureRef.current = "";
      if (err?.code === "KICKED") {
        activeJoinRef.current = null;
        setRoomState(null);
      }
      setRoomError(err);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      setSocketInstance(null);
    };
  }, [emitJoin]);

  const clearRoomError = useCallback(() => {
    lastEmitSignatureRef.current = "";
    setRoomError(null);
  }, []);

  const joinRoom = useCallback(
    (
      roomCode: string,
      gameId: string,
      playerName: string,
      avatar?: string,
      options?: JoinRoomOptions
    ) => {
      const payload: PendingJoinPayload = {
        roomCode: normalizeRoomCode(roomCode),
        gameId,
        playerName,
        avatar,
        createIfMissing: Boolean(options?.createIfMissing),
      };
      activeJoinRef.current = payload;

      const sock = socketRef.current;
      const pId = playerIdRef.current || getOrCreateOnlinePlayerId();
      if (!playerIdRef.current && pId) {
        playerIdRef.current = pId;
        setPlayerId(pId);
      }

      if (sock?.connected && pId) {
        emitJoin(sock, payload, pId);
      }
    },
    [emitJoin]
  );

  const leaveRoom = useCallback((roomCode?: string) => {
    const code = normalizeRoomCode(roomCode || activeJoinRef.current?.roomCode);
    activeJoinRef.current = null;
    lastEmitSignatureRef.current = "";
    setRoomState(null);
    setSecretData(null);
    if (code && socketRef.current?.connected) {
      socketRef.current.emit("room:leave", { roomCode: code });
    }
  }, []);

  const kickPlayer = useCallback((roomCode: string, targetPlayerId: string) => {
    socketRef.current?.emit("room:kick", {
      roomCode: normalizeRoomCode(roomCode),
      targetPlayerId,
    });
  }, []);

  const transferHost = useCallback((roomCode: string, targetPlayerId: string) => {
    socketRef.current?.emit("room:transfer_host", {
      roomCode: normalizeRoomCode(roomCode),
      targetPlayerId,
    });
  }, []);

  const toggleReady = useCallback((roomCode: string) => {
    socketRef.current?.emit("room:ready", { roomCode: normalizeRoomCode(roomCode) });
  }, []);

  const startUndercover = useCallback(
    (
      roomCode: string,
      playerSecrets: Record<string, any>,
      speakingOrder: string[],
      category: string,
      civilianWord: string,
      undercoverWord?: string,
      config?: Partial<UndercoverOnlineConfig>
    ) => {
      socketRef.current?.emit("game:start_undercover", {
        roomCode: normalizeRoomCode(roomCode),
        playerSecrets,
        speakingOrder,
        category,
        civilianWord,
        undercoverWord,
        config,
      });
    },
    []
  );

  const startSaboteur = useCallback(
    (roomCode: string, playerSecrets: Record<string, any>, activeChallenge: any) => {
      socketRef.current?.emit("game:start_saboteur", {
        roomCode: normalizeRoomCode(roomCode),
        playerSecrets,
        activeChallenge,
      });
    },
    []
  );

  const nextSpeaker = useCallback((roomCode: string, clue?: string, expectedSpeakerId?: string) => {
    socketRef.current?.emit("game:next_speaker", {
      roomCode: normalizeRoomCode(roomCode),
      clue,
      expectedSpeakerId,
    });
  }, []);

  const continueDebate = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:continue_debate", {
      roomCode: normalizeRoomCode(roomCode),
    });
  }, []);

  const startVote = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:start_vote", { roomCode: normalizeRoomCode(roomCode) });
  }, []);

  const closeVote = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:close_vote", { roomCode: normalizeRoomCode(roomCode) });
  }, []);

  const castVote = useCallback((roomCode: string, targetId: string) => {
    socketRef.current?.emit("game:cast_vote", {
      roomCode: normalizeRoomCode(roomCode),
      targetId,
    });
  }, []);

  const protectWithGuardian = useCallback((roomCode: string, targetId: string) => {
    socketRef.current?.emit("game:guardian_protect", {
      roomCode: normalizeRoomCode(roomCode),
      targetId,
    });
  }, []);

  const submitDoubleAgentTarget = useCallback((roomCode: string, targetId: string) => {
    socketRef.current?.emit("game:double_agent_revenge", {
      roomCode: normalizeRoomCode(roomCode),
      targetId,
    });
  }, []);

  const submitMrWhiteGuess = useCallback((roomCode: string, guess: string) => {
    socketRef.current?.emit("game:mr_white_guess", {
      roomCode: normalizeRoomCode(roomCode),
      guess,
    });
  }, []);

  const continueRound = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:continue_round", { roomCode: normalizeRoomCode(roomCode) });
  }, []);

  const restartLobby = useCallback((roomCode: string) => {
    socketRef.current?.emit("game:restart_lobby", { roomCode: normalizeRoomCode(roomCode) });
  }, []);

  const syncGameState = useCallback((roomCode: string, newState?: string, gameData?: any) => {
    socketRef.current?.emit("game:sync_state", {
      roomCode: normalizeRoomCode(roomCode),
      newState,
      gameData,
    });
  }, []);

  const submitPlayerMapUpdate = useCallback(
    (
      roomCode: string,
      mapField: string,
      value: any,
      options?: { scoreDelta?: number; revealStateWhenAllIn?: string }
    ) => {
      socketRef.current?.emit("game:player_map_update", {
        roomCode: normalizeRoomCode(roomCode),
        mapField,
        value,
        scoreDelta: options?.scoreDelta,
        revealStateWhenAllIn: options?.revealStateWhenAllIn,
      });
    },
    []
  );

  return {
    socket: socketInstance,
    socketId,
    playerId,
    isConnected,
    connectionStatus,
    roomState,
    secretData,
    roomError,
    clearRoomError,
    joinRoom,
    leaveRoom,
    kickPlayer,
    transferHost,
    toggleReady,
    startUndercover,
    startSaboteur,
    nextSpeaker,
    continueDebate,
    startVote,
    closeVote,
    castVote,
    protectWithGuardian,
    submitDoubleAgentTarget,
    submitMrWhiteGuess,
    continueRound,
    restartLobby,
    syncGameState,
    submitPlayerMapUpdate,
  };
}
