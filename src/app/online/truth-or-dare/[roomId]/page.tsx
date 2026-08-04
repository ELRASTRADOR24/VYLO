"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, Play, Check, X, Trophy, Dices, 
  HelpCircle, Flame, Crown, Copy, Sparkles 
} from "lucide-react";
import { 
  getRandomCard, TodCard, TOD_CATEGORIES, IntensityLevel, CardType 
} from "@/games/truth-or-dare/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal, sfxSuspense } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { cleanPromptText } from "@/lib/utils";

export default function OnlineTruthOrDareGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { socket, roomState, joinRoom, syncGameState } = useSocket();

  const [intensity, setIntensity] = useState<IntensityLevel>("Toutes");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId, "truth-or-dare", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  const isHost = roomState?.players?.find((p) => p.id === socket?.id)?.isHost || false;
  const gameData = roomState?.gameData || {};
  const currentSpeakerId: string | undefined = gameData.currentSpeakerId;
  const activeCard: TodCard | undefined = gameData.activeCard;
  const scores: Record<string, number> = gameData.scores || {};

  const currentSpeaker = roomState?.players?.find(p => p.id === currentSpeakerId);
  const isMyTurn = socket?.id === currentSpeakerId;

  const handleCopyCode = () => {
    sfxTap();
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLeave = () => {
    sfxTap();
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/library");
  };

  // Lancement du premier tour par l'Hôte
  const handleHostStartGame = () => {
    sfxSuspense();
    const players = roomState?.players || [];
    if (players.length === 0) return;

    const firstSpeaker = players[Math.floor(Math.random() * players.length)];
    const initialScores: Record<string, number> = {};
    players.forEach(p => { initialScores[p.id] = 0; });

    syncGameState(roomId, "SPIN", {
      currentSpeakerId: firstSpeaker.id,
      activeCard: null,
      scores: initialScores,
      intensity: intensity,
    });
  };

  // Le joueur désigné choisit Action ou Vérité
  const handleSelectType = (type: CardType) => {
    if (!isMyTurn) return;
    sfxReveal();

    const card = getRandomCard(type, gameData.intensity || "Toutes");
    syncGameState(roomId, "CARD_REVEAL", {
      activeCard: card,
    });
  };

  // Validation du défi par le joueur ou l'Hôte
  const handleCompleteChallenge = (success: boolean) => {
    if (!isMyTurn && !isHost) return;

    const newScores = { ...scores };
    if (success && currentSpeakerId) {
      sfxSuccess();
      newScores[currentSpeakerId] = (newScores[currentSpeakerId] || 0) + 50;
    } else {
      sfxError();
    }

    // Choisir le joueur suivant
    const players = roomState?.players || [];
    const nextSpeaker = players[Math.floor(Math.random() * players.length)];

    syncGameState(roomId, "SPIN", {
      currentSpeakerId: nextSpeaker.id,
      activeCard: null,
      scores: newScores,
    });
  };

  // 1. SALON DE RASSEMBLEMENT (LOBBY)
  if (roomState?.state === "LOBBY" || !roomState?.state) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-2xl mx-auto relative text-center">
        <LivingBackground accentColor="#EC4899" />

        <div className="w-full flex items-center justify-between mb-6 z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-lg font-black uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
            🔥 Action ou Vérité En Ligne
          </span>
          <div className="w-16" />
        </div>

        <Card className="w-full p-5 mb-6 bg-surface/90 border-2 border-pink-500/40 z-10 flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 mb-1">Code du Salon</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white tracking-widest">{roomId}</span>
            <button onClick={handleCopyCode} className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground/70 hover:text-foreground">
              {copiedCode ? <Check size={18} className="text-pink-400" /> : <Copy size={18} />}
            </button>
          </div>
          <span className="text-[11px] font-bold text-foreground/50 mt-2">Partagez ce code pour jouer sur plusieurs téléphones !</span>
        </Card>

        {isHost && (
          <div className="w-full mb-6 text-left z-10">
            <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-2 block">Niveau d'Intensité</label>
            <div className="grid grid-cols-2 gap-2">
              {TOD_CATEGORIES.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setIntensity(lvl); sfxTap(); }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs border transition-all ${
                    intensity === lvl 
                      ? "bg-pink-600 text-white border-pink-400 shadow-[0_4px_0_#831843]" 
                      : "bg-surface border-white/10 text-foreground/70"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-full mb-8 text-left z-10">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block">
            Joueurs Connectés ({roomState?.players?.length || 1})
          </label>
          <div className="space-y-2">
            {(roomState?.players || []).map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-surface/90 p-3.5 rounded-2xl border border-white/10">
                <span className="font-extrabold text-sm flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center justify-center text-xs font-black">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                </span>
                {p.isHost && (
                  <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Crown size={12} /> Hôte
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            {isHost ? (
              <Button variant="primary" className="w-full h-14 text-base gap-2 bg-pink-600 hover:bg-pink-500 text-white shadow-[0_6px_0_#831843]" onClick={handleHostStartGame}>
                <Dices size={20} /> Lancer la Partie En Ligne
              </Button>
            ) : (
              <div className="p-3 bg-surface/90 rounded-2xl text-xs font-black text-foreground/60 border border-white/10">
                Attente du lancement par l'hôte...
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // 2. PHASE DE CHOIX (ACTION OU VÉRITÉ)
  if (roomState?.state === "SPIN") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
        <LivingBackground accentColor="#EC4899" />

        <div className="w-full flex items-center justify-between z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>

          <span className="text-xs font-black text-pink-400 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
            Tour de : {currentSpeaker?.name || "Joueur"}
          </span>
        </div>

        <Card className="w-full p-8 flex flex-col items-center text-center border-2 border-pink-500/40 shadow-glow my-auto z-10 bg-surface/90">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-rose-700 text-white flex items-center justify-center text-4xl font-black mb-4 shadow-lg animate-bounce">
            {currentSpeaker?.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-pink-400 mb-1">La Bouteille Désigne</span>
          <h1 className="text-3xl font-black text-white mb-4">{currentSpeaker?.name}</h1>

          {isMyTurn ? (
            <p className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full animate-pulse">
              🎯 C'est à TON tour ! Fais ton choix ci-dessous :
            </p>
          ) : (
            <p className="text-xs font-extrabold text-foreground/50">
              Attente du choix de {currentSpeaker?.name}...
            </p>
          )}
        </Card>

        {isMyTurn ? (
          <div className="w-full grid grid-cols-2 gap-4 z-10">
            <Button variant="primary" className="h-20 text-lg flex flex-col items-center justify-center gap-1 bg-purple-600 hover:bg-purple-500 text-white shadow-[0_6px_0_#581C87]" onClick={() => handleSelectType("TRUTH")}>
              <HelpCircle size={22} />
              <span>VÉRITÉ</span>
            </Button>
            <Button variant="secondary" className="h-20 text-lg flex flex-col items-center justify-center gap-1 bg-pink-600 hover:bg-pink-500 text-white shadow-[0_6px_0_#831843]" onClick={() => handleSelectType("DARE")}>
              <Flame size={22} />
              <span>ACTION</span>
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-surface/90 rounded-2xl text-xs font-black text-foreground/50 border border-white/10 z-10 w-full">
            Seul {currentSpeaker?.name} peut choisir Action ou Vérité sur son écran !
          </div>
        )}
      </main>
    );
  }

  // 3. PHASE DE DÉFI ET RÉVÉLATION
  if (roomState?.state === "CARD_REVEAL" && activeCard) {
    const isTruth = activeCard.type === "TRUTH";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
        <LivingBackground accentColor="#EC4899" />

        <div className="w-full flex items-center justify-between z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className={`text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1 ${isTruth ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'}`}>
            {isTruth ? <HelpCircle size={14} /> : <Flame size={14} />}
            {isTruth ? "VÉRITÉ" : "ACTION"}
          </span>
        </div>

        <Card className="w-full p-8 flex flex-col items-center border-2 border-pink-500/40 shadow-glow my-auto z-10 bg-surface/90">
          <h2 className="text-lg font-black text-pink-300 mb-2">{currentSpeaker?.name}</h2>
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full text-foreground/50 mb-6">
            Niveau {activeCard.intensity}
          </span>
          <p className="text-2xl font-black leading-snug text-white mb-4">
            {cleanPromptText(activeCard.text)}
          </p>
        </Card>

        {(isMyTurn || isHost) ? (
          <div className="w-full flex flex-col gap-3 z-10">
            <Button variant="primary" className="w-full py-5 text-base gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#064E3B]" onClick={() => handleCompleteChallenge(true)}>
              <Check size={22} /> Défi Réussi ! (+50 pts)
            </Button>
            <Button variant="surface" className="w-full py-4 text-sm gap-2 text-foreground/70" onClick={() => handleCompleteChallenge(false)}>
              <X size={20} /> J'abandonne / Gage
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-surface/90 rounded-2xl text-xs font-black text-foreground/50 border border-white/10 z-10 w-full">
            Attente de la réalisation du défi par {currentSpeaker?.name}...
          </div>
        )}
      </main>
    );
  }

  return null;
}
