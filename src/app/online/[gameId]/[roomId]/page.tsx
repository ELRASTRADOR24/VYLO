"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket, PlayerOnline } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import { getGameConfig } from "@/games";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { QRCodeModal } from "@/components/ui/QRCodeModal";
import { 
  Users, Crown, Play, QrCode, Share, Check, ChevronLeft, Wifi, WifiOff,
  Sparkles, Flame, Trophy, RefreshCw, Smartphone, Zap
} from "lucide-react";
import { sfxTap, sfxSuccess, sfxVictory, sfxError, sfxReveal } from "@/lib/audio";
import { getRandomPartyCard, formatPartyCard } from "@/games/vylo-party/logic";
import { TOD_CONTENT } from "@/games/truth-or-dare/logic";
import { TU_PREFERES_DATABASE } from "@/games/tu-preferes/logic";
import { WORLD_FLAGS_DATABASE, generateFlagQuestion } from "@/games/flag-quiz/logic";

export default function UniversalOnlineGamePage({ params }: { params: Promise<{ gameId: string; roomId: string }> }) {
  const { gameId, roomId } = use(params);
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);
  const { guestProfile, incrementStat } = useAppStore();
  const { isConnected, roomState, joinRoom, toggleReady, restartLobby, syncGameState } = useSocket();

  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const playerPseudo = guestProfile?.pseudo || "Joueur";
  const playerAvatar = guestProfile?.avatar || "👻";

  // Joindre le salon en ligne à la connexion
  useEffect(() => {
    if (isConnected && playerPseudo) {
      joinRoom(roomId, gameId, playerPseudo, playerAvatar);
    }
  }, [isConnected, playerPseudo, playerAvatar, roomId, gameId, joinRoom]);

  const players = roomState?.players || [];
  const isHost = players.find(p => p.id === roomState?.players?.find(p => p.name === playerPseudo)?.id)?.isHost || roomState?.isHost || false;
  const gameState = roomState?.state || "LOBBY";
  const gameData = roomState?.gameData || {};

  const handleLeave = () => {
    sfxTap();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/library");
    }
  };

  const handleCopyCode = () => {
    sfxTap();
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. PHASE DE SALON (LOBBY EN LIGNE)
  if (gameState === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between pt-6 pb-32 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto relative text-center">
        {/* Navigation Header */}
        <div className="w-full flex items-center justify-between mb-4">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">En Ligne</span>
          </div>

          <button onClick={() => setShowQR(true)} className="h-10 w-10 bg-surface/90 border border-white/10 rounded-full flex items-center justify-center text-foreground">
            <QrCode size={18} />
          </button>
        </div>

        {/* Code de salon & Partage */}
        <div className="w-full my-auto space-y-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary">Salon Multijoueur</span>
            <h1 className="text-3xl font-black">{gameConfig?.name || gameId}</h1>
          </div>

          <div 
            onClick={handleCopyCode}
            className="p-6 bg-surface/90 border-2 border-primary/40 rounded-3xl cursor-pointer hover:border-primary transition-all flex flex-col items-center justify-center gap-1 shadow-glow"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Code d'accès</span>
            <span className="text-4xl font-black text-primary tracking-widest font-mono">{roomId}</span>
            <span className="text-xs font-bold text-foreground/60 flex items-center gap-1 mt-1">
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share size={14} />}
              {copied ? "Copié !" : "Cliquer pour copier le code"}
            </span>
          </div>

          {/* Liste des Joueurs */}
          <div className="w-full text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-foreground/50">
                Joueurs Connectés ({players.length})
              </span>
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <Users size={14} /> Min. {gameConfig?.players.min || 2}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {players.map((p) => (
                <div key={p.id} className="p-3.5 bg-surface border border-white/5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-summer text-white flex items-center justify-center text-sm font-black">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-extrabold text-sm flex items-center gap-1.5">
                      {p.name}
                      {p.isHost && <Crown size={14} className="text-yellow-400" />}
                    </span>
                  </div>
                  {p.isReady ? (
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">Prêt</span>
                  ) : (
                    <span className="text-[10px] font-black uppercase text-foreground/40 bg-white/5 px-2 py-1 rounded-full">En attente</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Lancement */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 border-t border-white/10 z-50">
          <div className="max-w-md mx-auto flex gap-3">
            <Button variant="surface" className="flex-1 h-14" onClick={() => toggleReady(roomId)}>
              Prêt !
            </Button>

            {isHost && (
              <Button 
                variant="primary" 
                className="flex-1 h-14 font-black text-base shadow-summer-glow"
                onClick={() => {
                  sfxVictory();
                  // Initialiser la première manche selon le jeu
                  if (gameId === "vylo-party") {
                    const card = getRandomPartyCard();
                    const p1 = players[0]?.name || "Joueur 1";
                    const p2 = players[1]?.name || "Joueur 2";
                    syncGameState(roomId, "PLAYING", {
                      cardText: formatPartyCard(card, p1, p2),
                      cardCategory: card.category,
                      activePlayerName: p1,
                      round: 1,
                      scores: {}
                    });
                  } else if (gameId === "tu-preferes") {
                    const dilemma = TU_PREFERES_DATABASE[Math.floor(Math.random() * TU_PREFERES_DATABASE.length)];
                    syncGameState(roomId, "PLAYING", {
                      optionA: dilemma.optionA,
                      optionB: dilemma.optionB,
                      category: dilemma.category,
                      votesA: 0,
                      votesB: 0,
                      votedUserIds: [],
                      round: 1
                    });
                  } else if (gameId === "flag-quiz") {
                    const q = generateFlagQuestion("Monde Entier");
                    syncGameState(roomId, "PLAYING", {
                      countryName: q.flag.countryName,
                      flagCode: q.flag.code,
                      choices: q.choices,
                      round: 1,
                      scores: {}
                    });
                  } else if (gameId === "truth-or-dare") {
                    const chosen = TOD_CONTENT[Math.floor(Math.random() * TOD_CONTENT.length)];
                    const targetPlayer = players[Math.floor(Math.random() * players.length)]?.name || "Joueur 1";
                    syncGameState(roomId, "PLAYING", {
                      promptText: chosen.text,
                      promptType: chosen.type,
                      activePlayerName: targetPlayer,
                      round: 1
                    });
                  } else {
                    syncGameState(roomId, "PLAYING", { round: 1, scores: {} });
                  }
                }}
              >
                <Play size={20} /> Lancer la Partie
              </Button>
            )}
          </div>
        </div>

        <QRCodeModal isOpen={showQR} url={window.location.href} roomCode={roomId} onClose={() => setShowQR(false)} />
      </main>
    );
  }

  // 2. PHASE DE JEU EN MULTIJOUEUR EN LIGNE SYNCHRONISE
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-24">
      {/* En-tête de jeu */}
      <div className="w-full flex items-center justify-between">
        <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>

        <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
          <Wifi size={14} className="text-emerald-400 animate-pulse" /> Partie En Ligne • {gameConfig?.name || gameId}
        </span>

        <span className="text-xs font-black text-foreground/60 bg-white/5 px-3 py-1 rounded-full">
          Manche {gameData.round || 1}
        </span>
      </div>

      {/* COMPOSANTS DE JEU SPÉCIFIQUES MULTIJOUEUR */}
      <div className="w-full my-auto space-y-6">
        {gameId === "vylo-party" && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-950/80 via-surface to-purple-950/80 border-4 border-pink-500/40 shadow-2xl animate-in zoom-in-95 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-pink-400 block">
              {gameData.cardCategory || "DÉFI MULTIJOUEUR"}
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-relaxed">
              {gameData.cardText || "Préparez-vous au défi !"}
            </h2>
          </div>
        )}

        {gameId === "tu-preferes" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <button 
              onClick={() => {
                sfxSuccess();
                syncGameState(roomId, "PLAYING", {
                  ...gameData,
                  votesA: (gameData.votesA || 0) + 1
                });
              }}
              className="p-8 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white font-black text-xl hover:scale-105 transition-all shadow-xl"
            >
              🔴 {gameData.optionA || "Option A"}
            </button>

            <button 
              onClick={() => {
                sfxSuccess();
                syncGameState(roomId, "PLAYING", {
                  ...gameData,
                  votesB: (gameData.votesB || 0) + 1
                });
              }}
              className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-xl hover:scale-105 transition-all shadow-xl"
            >
              🔵 {gameData.optionB || "Option B"}
            </button>
          </div>
        )}

        {gameId === "truth-or-dare" && (
          <div className="p-8 rounded-3xl bg-surface border-2 border-primary/40 space-y-4">
            <span className="text-xs font-black uppercase text-primary tracking-widest">
              Joueur désigné : <strong>{gameData.activePlayerName || "Tout le monde"}</strong>
            </span>
            <h2 className="text-2xl font-black leading-relaxed">
              {gameData.promptText || "Action ou Vérité ?"}
            </h2>
          </div>
        )}

        {gameId === "flag-quiz" && (
          <div className="space-y-6">
            <div className="w-48 h-32 mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              {gameData.flagCode && (
                <img 
                  src={`https://flagcdn.com/w320/${gameData.flagCode}.png`} 
                  alt="Drapeau" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(gameData.choices || []).map((opt: string, i: number) => (
                <Button key={i} variant="surface" className="h-14 font-bold" onClick={() => sfxSuccess()}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Par défaut pour les autres jeux */}
        {!["vylo-party", "tu-preferes", "truth-or-dare", "flag-quiz"].includes(gameId) && (
          <div className="p-8 rounded-3xl bg-surface border border-white/10 space-y-4">
            <span className="text-xs font-black uppercase text-primary tracking-widest">Partie En Ligne En Cours</span>
            <h2 className="text-2xl font-black">Manche {gameData.round || 1} • {gameConfig?.name}</h2>
            <p className="text-sm font-bold text-foreground/60">Suivez les instructions sur votre écran et profitez de la partie !</p>
          </div>
        )}
      </div>

      {/* BOUTON REPRISES / SUIVANT POUR L'HOTE */}
      {isHost && (
        <div className="w-full max-w-md">
          <Button 
            variant="primary" 
            className="w-full h-14 font-black gap-2 shadow-summer-glow"
            onClick={() => {
              sfxTap();
              if (gameId === "vylo-party") {
                const card = getRandomPartyCard();
                const p1 = players[Math.floor(Math.random() * players.length)]?.name || "Joueur 1";
                const p2 = players[Math.floor(Math.random() * players.length)]?.name || "Joueur 2";
                syncGameState(roomId, "PLAYING", {
                  cardText: formatPartyCard(card, p1, p2),
                  cardCategory: card.category,
                  round: (gameData.round || 1) + 1
                });
              } else if (gameId === "tu-preferes") {
                const dilemma = TU_PREFERES_DATABASE[Math.floor(Math.random() * TU_PREFERES_DATABASE.length)];
                syncGameState(roomId, "PLAYING", {
                  optionA: dilemma.optionA,
                  optionB: dilemma.optionB,
                  category: dilemma.category,
                  votesA: 0,
                  votesB: 0,
                  round: (gameData.round || 1) + 1
                });
              } else if (gameId === "flag-quiz") {
                const q = generateFlagQuestion("Monde Entier");
                syncGameState(roomId, "PLAYING", {
                  countryName: q.flag.countryName,
                  flagCode: q.flag.code,
                  choices: q.choices,
                  round: (gameData.round || 1) + 1
                });
              } else {
                syncGameState(roomId, "PLAYING", { round: (gameData.round || 1) + 1 });
              }
            }}
          >
            Manche Suivante <Zap size={18} />
          </Button>
        </div>
      )}
    </main>
  );
}
