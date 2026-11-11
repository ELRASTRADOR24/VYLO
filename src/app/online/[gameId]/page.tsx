"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Loader2, QrCode, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import { getGameConfig } from "@/games";
import {
  getOrCreateOnlinePlayerId,
  getSocketApiBaseUrl,
  normalizeRoomCode,
} from "@/lib/onlineIdentity";
import { sfxTap } from "@/lib/audio";

export default function OnlineRoomRedirect({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId: rawParam } = use(params);
  const router = useRouter();

  const maybeGame = getGameConfig(rawParam);
  const roomCode = normalizeRoomCode(rawParam);

  const [status, setStatus] = useState<"checking" | "not_found" | "blocked" | "error">("checking");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    // Si quelqu'un visite /online/undercover sans code, rediriger vers la configuration du jeu
    if (maybeGame) {
      router.replace(`/setup/${maybeGame.id}`);
      return;
    }

    let cancelled = false;

    async function checkAndRedirect() {
      if (!roomCode || roomCode.length < 4) {
        setStatus("not_found");
        setErrorMessage("Le code de salon indiqué est invalide.");
        return;
      }

      try {
        const playerId = getOrCreateOnlinePlayerId();
        const apiBase = getSocketApiBaseUrl();
        const res = await fetch(
          `${apiBase}/api/rooms/check?code=${encodeURIComponent(roomCode)}&playerId=${encodeURIComponent(playerId)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("CHECK_FAILED");

        const data = (await res.json()) as {
          exists: boolean;
          roomCode?: string;
          gameId?: string;
          joinable?: boolean;
          reason?: string;
        };

        if (cancelled) return;

        if (!data.exists || !data.gameId) {
          setStatus("not_found");
          setErrorMessage(`Aucun salon actif trouvé avec le code ${roomCode}.`);
          return;
        }

        if (!data.joinable) {
          setStatus("blocked");
          setErrorMessage(
            data.reason === "ROOM_FULL"
              ? `Le salon ${roomCode} est déjà complet.`
              : `La partie a déjà commencé dans le salon ${roomCode}.`
          );
          return;
        }

        router.replace(`/online/${data.gameId}/${data.roomCode || roomCode}`);
      } catch {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage("Impossible de joindre le serveur VYLO pour vérifier le salon.");
      }
    }

    checkAndRedirect();

    return () => {
      cancelled = true;
    };
  }, [maybeGame, roomCode, router]);

  if (status === "checking") {
    return (
      <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4">
        <Card className="w-full max-w-sm p-8 bg-surface border border-border text-center space-y-3 shadow-glow">
          <Loader2 size={28} className="animate-spin text-primary mx-auto" aria-hidden="true" />
          <h1 className="font-display text-lg font-bold text-foreground">
            Recherche du salon #{roomCode}...
          </h1>
          <p className="text-xs font-semibold text-muted">
            Vérification du code en cours sans créer de salon fantôme.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md p-6 sm:p-8 bg-surface border border-border text-center space-y-5 shadow-glow">
        <div className="w-14 h-14 rounded-2xl bg-[#FEEBEB] border border-primary/25 text-[#C22E2E] flex items-center justify-center mx-auto">
          <AlertCircle size={28} aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-muted uppercase tracking-wider">
            Salon #{roomCode}
          </span>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {status === "blocked" ? "Accès refusé" : "Salon introuvable"}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-muted leading-relaxed">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/join"
            prefetch={false}
            onClick={() => sfxTap()}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-[#D43B3B] transition-colors"
          >
            <QrCode size={16} aria-hidden="true" />
            Entrer un autre code
          </Link>

          <Link
            href="/library"
            prefetch={false}
            onClick={() => sfxTap()}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-surface-elevated border border-[var(--border-strong)] text-foreground font-bold text-sm hover:bg-[var(--surface-hover)] transition-colors"
          >
            <Sparkles size={16} aria-hidden="true" />
            Créer une nouvelle partie
          </Link>
        </div>
      </Card>
    </main>
  );
}
