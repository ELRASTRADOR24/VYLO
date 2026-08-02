"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, UserPlus, Play, Check, X, 
  RotateCcw, Flame, HelpCircle, Trophy, Trash2, Dices, LogOut
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getRandomCard, TodCard, TOD_CATEGORIES, IntensityLevel, CardType } from "@/games/truth-or-dare/logic";
import { sfxTap, sfxSuccess, sfxSuspense, sfxReveal, sfxJoin, sfxError } from "@/lib/audio";
import { truthOrDareConfig } from "@/games/truth-or-dare/config";

type LocalPhase = "CONFIG" | "SPIN" | "CARD_REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

export default function TruthOrDareLocalGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  // --- State Configuration ---
  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [intensity, setIntensity] = useState<IntensityLevel>("Toutes");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 }
  ]);

  // --- Gameplay State ---
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [activeCard, setActiveCard] = useState<TodCard | null>(null);

  const handleLeaveGame = () => {
    sfxTap();
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/library");
    }
  };

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    setPlayers(prev => [
      ...prev,
      { id: Date.now().toString(), name: newPlayerName.trim(), score: 0 }
    ]);
    setNewPlayerName("");
    sfxJoin();
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 2) return alert("Il faut au moins 2 joueurs !");
    setPlayers(prev => prev.filter(p => p.id !== id));
    sfxTap();
  };

  const handleStartGame = () => {
    if (players.length < 2) return alert("Il faut au moins 2 joueurs !");
    sfxSuspense();
    spinNextPlayer();
  };

  const spinNextPlayer = () => {
    const nextIdx = Math.floor(Math.random() * players.length);
    setCurrentSpeakerIdx(nextIdx);
    setActiveCard(null);
    setPhase("SPIN");
  };

  const handleSelectType = (type: CardType) => {
    sfxReveal();
    const card = getRandomCard(type, intensity);
    setActiveCard(card);
    setPhase("CARD_REVEAL");
  };

  const handleCompleteChallenge = (success: boolean) => {
    if (success) {
      sfxSuccess();
      setPlayers(prev => prev.map((p, idx) => 
        idx === currentSpeakerIdx ? { ...p, score: p.score + 50 } : p
      ));
      incrementStat("gamesPlayed");
      incrementStat("wins");
    } else {
      sfxError();
    }

    spinNextPlayer();
  };

  // --- ÉCRAN 1 : CONFIGURATION DU JEU ---
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto relative">
        <div className="w-full flex items-center justify-between mb-6">
          <button 
            onClick={handleLeaveGame} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div className="text-xl font-black">Action ou Vérité</div>
          <div className="w-20" />
        </div>

        {/* Sélection de l'intensité */}
        <div className="w-full mb-8">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block">
            Niveau d'intensité
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TOD_CATEGORIES.map(lvl => (
              <button
                key={lvl}
                onClick={() => { setIntensity(lvl); sfxTap(); }}
                className={`py-3.5 px-4 rounded-2xl font-black text-sm transition-all active:scale-95 border ${
                  intensity === lvl 
                    ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow" 
                    : "bg-surface border-white/5 text-foreground/70"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des Joueurs */}
        <div className="w-full mb-8">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block">
            Joueurs ({players.length})
          </label>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Prénom du joueur..."
              className="flex-1 bg-surface border-2 border-white/5 rounded-2xl px-4 py-3.5 font-bold focus:border-primary outline-none transition-colors"
              onKeyDown={(e) => { if (e.key === "Enter") handleAddPlayer(); }}
            />
            <Button variant="surface" className="px-5 rounded-2xl" onClick={handleAddPlayer}>
              <UserPlus size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            {players.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5">
                <span className="font-extrabold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-summer text-white flex items-center justify-center text-sm font-black">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                </span>
                {players.length > 2 && (
                  <button onClick={() => handleRemovePlayer(p.id)} className="text-foreground/40 hover:text-red-400 p-2">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={handleStartGame}>
              <Dices size={22} /> Lancer la partie ({players.length} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 2 : LA BOUTEILLE TOURNE / CHOIX ACTION OU VÉRITÉ ---
  if (phase === "SPIN") {
    const currentSpeaker = players[currentSpeakerIdx];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handleLeaveGame} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <div className="flex gap-2">
            <button onClick={() => setPhase("CONFIG")} className="text-foreground/60 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/10">
              Joueurs
            </button>
            <button onClick={() => setPhase("SCORES")} className="flex items-center gap-1 text-yellow-400 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Trophy size={14} /> Scores
            </button>
          </div>
        </div>

        <Card className="w-full p-8 flex flex-col items-center text-center border border-white/10 shadow-glow my-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-summer text-white flex items-center justify-center text-4xl font-black mb-6 shadow-summer-glow animate-bounce">
            {currentSpeaker?.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-primary mb-2">La bouteille s'arrête sur</span>
          <h1 className="text-4xl font-black text-white mb-6">{currentSpeaker?.name}</h1>
          <p className="text-xs text-foreground/50">Fais ton choix ultime !</p>
        </Card>

        <div className="w-full grid grid-cols-2 gap-4">
          <Button 
            variant="primary" 
            className="h-20 text-lg flex flex-col items-center justify-center gap-1"
            onClick={() => handleSelectType("TRUTH")}
          >
            <HelpCircle size={22} />
            <span>VÉRITÉ</span>
          </Button>

          <Button 
            variant="secondary" 
            className="h-20 text-lg flex flex-col items-center justify-center gap-1"
            onClick={() => handleSelectType("DARE")}
          >
            <Flame size={22} />
            <span>ACTION</span>
          </Button>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 3 : DÉCOUVERTE DU DÉFI ---
  if (phase === "CARD_REVEAL" && activeCard) {
    const currentSpeaker = players[currentSpeakerIdx];
    const isTruth = activeCard.type === "TRUTH";

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center">
        <div className="w-full flex items-center justify-between">
          <button 
            onClick={handleLeaveGame} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className={`text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full flex items-center gap-1 ${isTruth ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'}`}>
            {isTruth ? <HelpCircle size={14} /> : <Flame size={14} />}
            {isTruth ? "VÉRITÉ" : "ACTION"}
          </span>
        </div>

        <Card className="w-full p-8 flex flex-col items-center border border-white/10 shadow-glow my-auto relative">
          <h2 className="text-xl font-extrabold text-foreground/80 mb-4">{currentSpeaker?.name}</h2>
          <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full text-foreground/50 mb-6">
            Niveau {activeCard.intensity}
          </span>
          <p className="text-2xl font-black leading-snug mb-4">{activeCard.text}</p>
        </Card>

        <div className="w-full flex flex-col gap-3">
          <Button 
            variant="primary" 
            className="w-full py-5 text-lg gap-2 shadow-summer-glow"
            onClick={() => handleCompleteChallenge(true)}
          >
            <Check size={22} /> Défi Réussi ! (+50 pts)
          </Button>

          <Button 
            variant="surface" 
            className="w-full py-4 text-md gap-2 text-foreground/60"
            onClick={() => handleCompleteChallenge(false)}
          >
            <X size={20} /> J'abandonne / Gage
          </Button>
        </div>
      </main>
    );
  }

  // --- ÉCRAN 4 : CLASSEMENT DES SCORES ---
  if (phase === "SCORES") {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    return (
      <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto">
        <div className="w-full flex items-center justify-between mb-6">
          <button 
            onClick={handleLeaveGame} 
            className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer"
          >
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Trophy className="text-yellow-400" /> Classement
          </h1>
          <div className="w-16" />
        </div>

        <Card className="w-full p-6 mb-8 border border-white/10 shadow-glow">
          <div className="space-y-4">
            {sortedPlayers.map((p, idx) => (
              <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                <span className="font-extrabold flex items-center gap-3">
                  <span className="text-sm font-black text-foreground/40 w-4">#{idx + 1}</span>
                  {p.name}
                </span>
                <span className="font-black text-primary text-lg">{p.score} pts</span>
              </div>
            ))}
          </div>
        </Card>

        <Button variant="primary" className="w-full py-5 text-lg gap-2 shadow-summer-glow" onClick={spinNextPlayer}>
          <Dices size={22} /> Joueur Suivant →
        </Button>
      </main>
    );
  }

  return null;
}
