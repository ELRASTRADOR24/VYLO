"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { useSocket, PlayerOnline, UseSocketReturn } from "@/hooks/useSocket";
import {
  normalizeRoomCode,
  isValidOnlinePseudo,
  sanitizePseudo,
  hasRoomCreatorFlag,
  markRoomCreator,
  clearRoomCreatorFlag,
} from "@/lib/onlineIdentity";

export type OnlineGuardStatus =
  | "hydrating"
  | "needs_identity"
  | "error"
  | "connecting"
  | "ready";

export interface UseOnlineRoomReturn extends UseSocketReturn {
  roomCode: string;
  gameId: string;
  playerName: string;
  playerAvatar: string;
  me: PlayerOnline | null;
  isHost: boolean;
  isRoomReady: boolean;
  guardStatus: OnlineGuardStatus;
  submitIdentity: (pseudo: string, avatar: string) => { ok: boolean; error?: string };
  createMissingRoomHere: () => void;
  leaveRoomAndGo: (fallbackHref?: string) => void;
}

export function useOnlineRoom(rawRoomId: string, gameId: string): UseOnlineRoomReturn {
  const roomCode = normalizeRoomCode(rawRoomId);
  const router = useRouter();
  const { guestProfile, activeAccount, updateGuestProfile } = useAppStore();
  const socketApi = useSocket();

  const [hydrated, setHydrated] = useState(false);
  const [forceCreate, setForceCreate] = useState(false);

  useEffect(() => {
    const persistApi = useAppStore.persist;
    if (persistApi?.hasHydrated?.()) {
      setHydrated(true);
    }
    const unsub = persistApi?.onFinishHydration?.(() => {
      setHydrated(true);
    });
    // Sécurité si persist absent ou déjà hydraté au montage client
    const timer = setTimeout(() => setHydrated(true), 0);
    return () => {
      clearTimeout(timer);
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const rawPseudo = activeAccount?.username || guestProfile?.pseudo || "";
  const playerName = sanitizePseudo(rawPseudo);
  const playerAvatar = activeAccount?.avatar || guestProfile?.avatar || "😎";
  const isIdentityValid = hydrated && isValidOnlinePseudo(playerName);

  // Déclencher la connexion/synchronisation au salon dès que l'identité et playerId sont prêts
  useEffect(() => {
    if (!hydrated || !isIdentityValid || !roomCode || !socketApi.playerId) return;

    const shouldCreate = forceCreate || hasRoomCreatorFlag(roomCode, gameId);
    socketApi.joinRoom(roomCode, gameId, playerName, playerAvatar, {
      createIfMissing: shouldCreate,
    });
  }, [
    hydrated,
    isIdentityValid,
    roomCode,
    gameId,
    playerName,
    playerAvatar,
    socketApi.playerId,
    forceCreate,
    socketApi.joinRoom,
  ]);

  // Redirection automatique si le code pointe vers un autre jeu
  useEffect(() => {
    if (socketApi.roomError?.code === "GAME_MISMATCH" && socketApi.roomError.expectedGameId) {
      router.replace(`/online/${socketApi.roomError.expectedGameId}/${roomCode}`);
    }
  }, [socketApi.roomError, roomCode, router]);

  const submitIdentity = useCallback(
    (pseudoInput: string, avatarInput: string) => {
      const clean = sanitizePseudo(pseudoInput);
      if (!isValidOnlinePseudo(clean)) {
        return {
          ok: false,
          error: "Choisissez un prénom ou pseudo personnel (minimum 2 caractères).",
        };
      }
      updateGuestProfile({
        pseudo: clean,
        avatar: avatarInput || playerAvatar || "😎",
      });
      return { ok: true };
    },
    [playerAvatar, updateGuestProfile]
  );

  const createMissingRoomHere = useCallback(() => {
    if (!roomCode) return;
    markRoomCreator(roomCode, gameId);
    socketApi.clearRoomError();
    setForceCreate(true);
  }, [roomCode, gameId, socketApi.clearRoomError]);

  const leaveRoomAndGo = useCallback(
    (fallbackHref = "/library") => {
      socketApi.leaveRoom(roomCode);
      clearRoomCreatorFlag(roomCode);
      router.push(fallbackHref);
    },
    [roomCode, router, socketApi.leaveRoom]
  );

  const players = socketApi.roomState?.players || [];
  const me =
    players.find((p) => p.id === socketApi.playerId) ||
    (socketApi.socketId ? players.find((p) => p.id === socketApi.socketId) : undefined) ||
    null;

  const isHost = Boolean(
    me?.isHost || (socketApi.roomState?.hostId && socketApi.roomState.hostId === socketApi.playerId)
  );

  let guardStatus: OnlineGuardStatus = "hydrating";
  if (hydrated) {
    if (!isIdentityValid) {
      guardStatus = "needs_identity";
    } else if (socketApi.roomError) {
      guardStatus = "error";
    } else if (!socketApi.roomState) {
      guardStatus = "connecting";
    } else {
      guardStatus = "ready";
    }
  }

  return {
    ...socketApi,
    roomCode,
    gameId,
    playerName,
    playerAvatar,
    me,
    isHost,
    isRoomReady: guardStatus === "ready",
    guardStatus,
    submitIdentity,
    createMissingRoomHere,
    leaveRoomAndGo,
  };
}
