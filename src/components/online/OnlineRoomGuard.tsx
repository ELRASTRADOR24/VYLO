"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Loader2,
  Plus,
  QrCode,
  Sparkles,
  UserCheck,
  WifiOff,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { UseOnlineRoomReturn } from "@/hooks/useOnlineRoom";
import { ConnectionStatus } from "@/hooks/useSocket";
import { getGameConfig } from "@/games";
import { sfxError, sfxSuccess, sfxTap } from "@/lib/audio";

const ONLINE_AVATARS = ["😎", "🦊", "🐯", "🦁", "🐼", "🐉", "🦄", "👑", "🔥", "🚀", "🎭", "⚡"];

export function ReconnectingBanner({ status }: { status: ConnectionStatus }) {
  if (status !== "reconnecting") return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#FEF3C7] border border-amber-500/45 text-[#92400E] font-bold text-xs shadow-glow flex items-center gap-2 animate-pulse">
      <WifiOff size={14} aria-hidden="true" />
      <span>Reconnexion au serveur en cours...</span>
    </div>
  );
}

export function OnlineRoomGuard({ online }: { online: UseOnlineRoomReturn }) {
  const {
    guardStatus,
    roomCode,
    gameId,
    playerAvatar,
    roomError,
    submitIdentity,
    createMissingRoomHere,
    leaveRoomAndGo,
  } = online;

  const gameConfig = getGameConfig(gameId);
  const gameTitle = gameConfig?.name || gameId;

  const [pseudoInput, setPseudoInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    playerAvatar && playerAvatar !== "👻" ? playerAvatar : "😎"
  );
  const [formError, setFormError] = useState<string | null>(null);

  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submitIdentity(pseudoInput, selectedAvatar);
    if (!result.ok) {
      sfxError();
      setFormError(result.error || "Pseudo invalide.");
      return;
    }
    sfxSuccess();
    setFormError(null);
  };

  // 1. Hydratation / Connexion
  if (guardStatus === "hydrating" || guardStatus === "connecting") {
    return (
      <main className="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-4 py-10 w-full max-w-md mx-auto text-center">
        <Card className="w-full p-8 bg-surface border border-border flex flex-col items-center gap-4 shadow-glow">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <Loader2 size={24} className="animate-spin" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              {gameTitle} · En ligne
            </p>
            <h1 className="font-display text-xl font-bold text-foreground">
              Connexion au salon #{roomCode}
            </h1>
            <p className="text-xs font-semibold text-muted">
              Synchronisation temps réel avec le serveur VYLO...
            </p>
          </div>
        </Card>
      </main>
    );
  }

  // 2. Identification obligatoire (empêche les collisions "Invité")
  if (guardStatus === "needs_identity") {
    return (
      <main className="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-4 py-8 w-full max-w-md mx-auto">
        <div className="w-full mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sfxTap();
              leaveRoomAndGo("/join");
            }}
            className="h-9 px-3.5 rounded-full bg-surface border border-border text-xs font-bold text-foreground flex items-center gap-1.5 hover:border-[var(--border-strong)] cursor-pointer"
          >
            <ChevronLeft size={15} className="text-primary" /> Retour
          </button>
          <span className="text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/25 px-3 py-1 rounded-full">
            Salon #{roomCode}
          </span>
        </div>

        <Card className="w-full p-6 sm:p-7 bg-surface border border-border shadow-glow space-y-5">
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-2">
              <UserCheck size={24} aria-hidden="true" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
              {gameTitle} · Multijoueur
            </span>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Comment vous appelez-vous ?
            </h1>
            <p className="text-xs font-semibold text-muted">
              Chaque joueur doit choisir son prénom pour que l&apos;hôte, les rôles et les votes restent fiables.
            </p>
          </div>

          <form onSubmit={handleIdentitySubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="vylo-online-pseudo"
                className="text-xs font-bold uppercase tracking-wider text-muted block"
              >
                Votre prénom ou pseudo
              </label>
              <input
                id="vylo-online-pseudo"
                type="text"
                value={pseudoInput}
                maxLength={20}
                autoFocus
                onChange={(e) => {
                  setPseudoInput(e.target.value);
                  if (formError) setFormError(null);
                }}
                placeholder="Ex : Johanson, Léa, Alex..."
                className="w-full h-12 px-4 rounded-2xl bg-surface-elevated border border-border focus:border-primary outline-none text-sm font-bold text-foreground placeholder:text-muted/60"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-muted block">
                Choisissez votre icône
              </span>
              <div className="grid grid-cols-6 gap-2">
                {ONLINE_AVATARS.map((emoji) => {
                  const active = selectedAvatar === emoji;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        sfxTap();
                        setSelectedAvatar(emoji);
                      }}
                      className={`h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                        active
                          ? "bg-primary/20 border-primary scale-105"
                          : "bg-surface-elevated border-border hover:border-[var(--border-strong)]"
                      }`}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-[#FEEBEB] border border-primary/25 text-xs font-bold text-[#C22E2E] flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full rounded-full gap-2">
              Entrer dans le salon <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </form>
        </Card>
      </main>
    );
  }

  // 3. Erreur structurée (Salon introuvable, partie commencée, complet, expulsé...)
  const isMissingRoom = roomError?.code === "ROOM_NOT_FOUND";
  const isInProgress = roomError?.code === "ROOM_IN_PROGRESS";

  return (
    <main className="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center px-4 py-10 w-full max-w-md mx-auto text-center">
      <Card className="w-full p-6 sm:p-8 bg-surface border border-border shadow-glow space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-[#FEEBEB] border border-primary/25 text-[#C22E2E] flex items-center justify-center mx-auto">
          <AlertCircle size={28} aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold text-muted uppercase tracking-wider">
            Salon #{roomCode}
          </span>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {isMissingRoom
              ? "Salon introuvable"
              : isInProgress
              ? "Partie déjà lancée"
              : roomError?.code === "KICKED"
              ? "Vous avez quitté le salon"
              : "Impossible de rejoindre"}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-muted leading-relaxed">
            {roomError?.message || "Ce salon n'est plus disponible."}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          {isMissingRoom && (
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full rounded-full gap-2"
              onClick={() => {
                sfxSuccess();
                createMissingRoomHere();
              }}
            >
              <Plus size={18} aria-hidden="true" />
              Ouvrir ce salon en tant qu&apos;hôte
            </Button>
          )}

          <Link
            href="/join"
            prefetch={false}
            onClick={() => sfxTap()}
            className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-surface-elevated border border-[var(--border-strong)] text-sm font-bold text-foreground hover:bg-[var(--surface-hover)] transition-colors"
          >
            <QrCode size={16} aria-hidden="true" />
            Entrer un autre code
          </Link>

          <Link
            href="/library"
            prefetch={false}
            onClick={() => sfxTap()}
            className="inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-muted hover:text-foreground transition-colors"
          >
            <Sparkles size={14} aria-hidden="true" />
            Choisir un jeu
          </Link>
        </div>
      </Card>
    </main>
  );
}
