"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { GameMode } from "@/engine/types";
import { getGameList } from "@/games";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LivingBackground } from "@/components/ui/LivingBackground";
import {
  ChevronLeft,
  Users,
  UserPlus,
  Trash2,
  Play,
  Sparkles,
  Share2,
  Check,
  AlertCircle,
  Smartphone,
  Globe,
} from "lucide-react";
import { sfxTap, sfxSuccess, sfxError } from "@/lib/audio";
import { getGameVisualMeta } from "@/components/illustrations/GameIllustrations";
import { markRoomCreator } from "@/lib/onlineIdentity";

const EMOJI_AVATARS = ["😎", "🦊", "🐯", "🦁", "🐉", "🦄", "🐼", "🤖", "👽", "👑", "🔥", "🚀"];

export default function UniversalLobbyPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { savedGroup, addPlayerToSavedGroup, removePlayerFromSavedGroup, setSavedGroup } = useAppStore();

  const [mounted, setMounted] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<string>("undercover");
  const [copiedCode, setCopiedCode] = useState(false);
  const [playMode, setPlayMode] = useState<"local" | "online">("local");
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const players = mounted ? savedGroup : [];
  const allGames = getGameList();
  const currentGame = allGames.find((g) => g.id === selectedGameId) || allGames[0];
  const art = getGameVisualMeta(currentGame.id);
  const supportsOnline = currentGame.modes.includes("online");

  const handleSelectGame = (gameId: string, modes: GameMode[]) => {
    setSelectedGameId(gameId);
    setValidationError(null);
    if (!modes.includes("online") && playMode === "online") {
      setPlayMode("local");
    }
    sfxTap();
  };

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    addPlayerToSavedGroup(newPlayerName.trim(), EMOJI_AVATARS[players.length % EMOJI_AVATARS.length]);
    setNewPlayerName("");
    setValidationError(null);
    sfxTap();
  };

  const handleCopyCode = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(roomId);
      setCopiedCode(true);
      sfxSuccess();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleStartGame = () => {
    if (playMode === "local" && players.length < currentGame.players.min) {
      sfxError();
      setValidationError(
        `Ajoutez au moins ${currentGame.players.min} joueurs pour lancer ${currentGame.name} en local.`
      );
      return;
    }

    sfxSuccess();
    if (playMode === "local" || !supportsOnline) {
      router.push(`/play/${currentGame.id}/${roomId}`);
    } else {
      markRoomCreator(roomId, currentGame.id);
      router.push(`/online/${currentGame.id}/${roomId}`);
    }
  };

  const isPlayerCountValid =
    players.length >= currentGame.players.min && players.length <= currentGame.players.max;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-36 max-w-3xl mx-auto relative text-center">
      <LivingBackground accentColor={art.hex} />

      {/* Header */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <button
          type="button"
          onClick={() => {
            sfxTap();
            router.push("/");
          }}
          className="h-10 px-4 bg-surface border border-border rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] active-press shadow-sm cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Accueil
        </button>

        <div className="flex items-center gap-2 bg-surface border border-border px-4 py-1.5 rounded-full shadow-sm">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Salon</span>
          <span className="text-sm font-bold font-mono text-primary tracking-wider">#{roomId}</span>
          <button
            type="button"
            onClick={handleCopyCode}
            aria-label="Copier le code du salon"
            className="text-muted hover:text-primary ml-1 transition-colors cursor-pointer"
          >
            {copiedCode ? <Check size={14} className="text-green" /> : <Share2 size={14} />}
          </button>
        </div>

        <div className="w-20 hidden sm:block shrink-0" />
      </div>

      {/* Titre */}
      <div className="w-full mb-6 z-10 text-left">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="text-primary" size={24} aria-hidden="true" /> Salon de partie
        </h1>
        <p className="text-xs md:text-sm font-semibold text-muted mt-1">
          Constituez votre groupe puis choisissez votre prochain jeu.
        </p>
      </div>

      {/* ÉTAPE 1 : JOUEURS */}
      <section className="w-full mb-8 z-10 text-left">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <Users size={15} aria-hidden="true" /> 1. Les joueurs ({players.length})
          </label>

          {players.length < 2 && (
            <span className="text-[11px] font-bold text-[#B45309] bg-[#FEF3C7] border border-[#F59E0B]/30 px-3 py-0.5 rounded-full">
              Au moins 2 joueurs recommandés
            </span>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Prénom du joueur..."
            className="flex-1 bg-surface border border-border rounded-2xl px-4 py-3 font-bold text-foreground focus:border-primary outline-none text-sm shadow-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddPlayer();
            }}
          />
          <Button variant="primary" className="px-5 rounded-2xl gap-1.5" onClick={handleAddPlayer}>
            <UserPlus size={17} aria-hidden="true" /> Ajouter
          </Button>
        </div>

        {players.length === 0 && (
          <div className="p-4 rounded-3xl bg-surface-elevated/80 border border-border text-center mb-4">
            <p className="text-xs font-semibold text-muted mb-2.5">
              Envie de tester vite ? Ajoutez un groupe exemple :
            </p>
            <button
              type="button"
              onClick={() => {
                setSavedGroup([
                  { name: "Alex", avatar: "😎" },
                  { name: "Sam", avatar: "🦊" },
                  { name: "Léa", avatar: "🐯" },
                  { name: "Hugo", avatar: "🦁" },
                ]);
                setValidationError(null);
                sfxSuccess();
              }}
              className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-bold text-primary hover:border-primary/40 transition-colors cursor-pointer"
            >
              + 4 joueurs démo
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {players.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center bg-surface border border-border p-3 rounded-2xl shadow-sm"
            >
              <span className="font-bold text-sm flex items-center gap-3 text-foreground">
                <span className="w-9 h-9 rounded-full bg-[#FEEBEB] flex items-center justify-center text-lg shrink-0">
                  {p.avatar || "😎"}
                </span>
                <span className="truncate">{p.name}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  removePlayerFromSavedGroup(p.id);
                  sfxTap();
                }}
                className="text-muted hover:text-primary p-1.5 transition-colors cursor-pointer"
                aria-label={`Supprimer ${p.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ÉTAPE 2 : CHOISIR LE JEU */}
      <section className="w-full mb-8 z-10 text-left">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
            <Sparkles size={15} aria-hidden="true" /> 2. Choisir le jeu ({allGames.length})
          </label>

          <div className="flex items-center gap-1 bg-surface border border-border rounded-full p-1">
            <button
              type="button"
              onClick={() => {
                setPlayMode("local");
                sfxTap();
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                playMode === "local" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              <Smartphone size={12} aria-hidden="true" /> Local
            </button>
            <button
              type="button"
              disabled={!supportsOnline}
              onClick={() => {
                if (!supportsOnline) return;
                setPlayMode("online");
                sfxTap();
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40 ${
                playMode === "online" ? "bg-secondary text-white shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              <Globe size={12} aria-hidden="true" /> En ligne
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allGames.map((game) => {
            const isSelected = game.id === selectedGameId;
            const isCompatible =
              players.length === 0 ||
              (players.length >= game.players.min && players.length <= game.players.max);
            const gameArt = getGameVisualMeta(game.id);

            return (
              <Card
                key={game.id}
                onClick={() => handleSelectGame(game.id, game.modes)}
                className={`p-3 cursor-pointer transition-all border flex items-center justify-between text-left ${
                  isSelected
                    ? "bg-[#FEEBEB]/55 border-primary shadow-soft"
                    : "bg-surface border-border hover:border-[var(--border-strong)]"
                } ${!isCompatible ? "opacity-65" : ""}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-16 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border border-border bg-surface-elevated">
                    {gameArt.renderIllustration()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-display text-sm font-bold text-foreground flex items-center gap-1.5 truncate">
                      {game.name}
                      {isSelected && <Check size={15} className="text-primary shrink-0" />}
                    </span>
                    <span className="text-[11px] font-semibold text-muted truncate flex items-center gap-1.5">
                      <span>{game.category} · {game.players.min}–{game.players.max} j.</span>
                      {game.status === "wip" && (
                        <span className="px-1.5 py-0.5 rounded bg-[#E4E7F0] text-[#4B526B] text-[9px] font-extrabold uppercase tracking-wider shrink-0">
                          En dév.
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {!isCompatible && (
                  <span className="text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded-full shrink-0 ml-2">
                    Min {game.players.min}
                  </span>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* BARRE BAS FIXE */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/95 border-t border-border z-50">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          {(validationError || (!isPlayerCountValid && players.length > 0)) && (
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#B45309] bg-[#FEF3C7] py-2 px-3 rounded-2xl border border-[#F59E0B]/30">
              <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
              <span>
                {validationError ||
                  (players.length < currentGame.players.min
                    ? `Il faut au moins ${currentGame.players.min} joueurs pour ${currentGame.name}`
                    : `Maximum ${currentGame.players.max} joueurs pour ${currentGame.name}`)}
              </span>
            </div>
          )}

          <Button variant="primary" size="lg" className="w-full gap-2 rounded-full" onClick={handleStartGame}>
            <Play size={19} className="fill-current" aria-hidden="true" />
            Lancer {currentGame.name} ({players.length} j.)
          </Button>
        </div>
      </div>
    </main>
  );
}
