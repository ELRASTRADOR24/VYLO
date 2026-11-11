"use client";

const PLAYER_ID_KEY = "vylo:online_player_id";
const ROOM_CREATOR_PREFIX = "vylo:host_room:";
const CREATOR_TTL_MS = 30 * 60 * 1000;

const RESERVED_PSEUDOS = new Set([
  "",
  "invité",
  "invite",
  "guest",
  "joueur",
  "player",
]);

export function getSocketApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SOCKET_URL || "").replace(/\/$/, "");
}

export function normalizeRoomCode(raw?: string | null): string {
  return (raw || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 12);
}

export function sanitizePseudo(raw?: string | null): string {
  return (raw || "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 20);
}

export function isValidOnlinePseudo(raw?: string | null): boolean {
  const clean = sanitizePseudo(raw);
  if (clean.length < 2) return false;
  return !RESERVED_PSEUDOS.has(clean.toLowerCase());
}

export function getOrCreateOnlinePlayerId(): string {
  if (typeof window === "undefined") return "";

  try {
    const existing = window.sessionStorage.getItem(PLAYER_ID_KEY);
    if (existing && existing.length >= 6) {
      return existing;
    }

    const generated =
      typeof window.crypto?.randomUUID === "function"
        ? `vp_${window.crypto.randomUUID()}`
        : `vp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

    window.sessionStorage.setItem(PLAYER_ID_KEY, generated);
    return generated;
  } catch {
    return `vp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function markRoomCreator(roomCode: string, gameId?: string): void {
  if (typeof window === "undefined") return;
  const code = normalizeRoomCode(roomCode);
  if (!code) return;

  try {
    window.sessionStorage.setItem(
      `${ROOM_CREATOR_PREFIX}${code}`,
      JSON.stringify({
        gameId: gameId || "",
        expiresAt: Date.now() + CREATOR_TTL_MS,
      })
    );
  } catch {
    // sessionStorage indisponible (navigation privée stricte)
  }
}

export function hasRoomCreatorFlag(roomCode: string, gameId?: string): boolean {
  if (typeof window === "undefined") return false;
  const code = normalizeRoomCode(roomCode);
  if (!code) return false;

  try {
    const raw = window.sessionStorage.getItem(`${ROOM_CREATOR_PREFIX}${code}`);
    if (!raw) return false;

    const parsed = JSON.parse(raw) as { gameId?: string; expiresAt?: number };
    if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
      window.sessionStorage.removeItem(`${ROOM_CREATOR_PREFIX}${code}`);
      return false;
    }

    if (gameId && parsed.gameId && parsed.gameId !== gameId) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function clearRoomCreatorFlag(roomCode: string): void {
  if (typeof window === "undefined") return;
  const code = normalizeRoomCode(roomCode);
  if (!code) return;

  try {
    window.sessionStorage.removeItem(`${ROOM_CREATOR_PREFIX}${code}`);
  } catch {
    // no-op
  }
}
