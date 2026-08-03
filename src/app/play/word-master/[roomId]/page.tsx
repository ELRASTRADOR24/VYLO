"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, Infinity as InfinityIcon, Sparkles, AlertTriangle, ShieldAlert 
} from "lucide-react";
import { 
  WordMasterCategory, TabooCard, WORD_MASTER_CATEGORIES, getRandomTabooCard 
} from "@/games/word-master/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "PLAYING" | "REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

const ROUND_OPTIONS: { label: string; value: number }[] = [
  { label: "5 Mots", value: 5 },
  { label: "10 Mots", value: 10 },
  { label: "15 Mots", value: 15 },
  { label: "20 Mots", value: 20 },
  { label: "30 Mots", value: 30 },
  { label: "Illimité ∞", value: -1 },
];

export default function WordMasterGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<WordMasterCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 }
  ]);

  const [currentCard, setCurrentCard] = useState<TabooCard | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(60);
  const [roundCount, setRoundCount] = useState<number>(1);
  const [roundResult, setRoundResult] = useState<"GUESS" | "INFRACTION" | "TIMEOUT" | null>(null);

  // Synchronisation du Timer 60s
  useEffect(() => {
    if (phase !== "PLAYING" || timeLeftSec <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSec(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeLeftSec]);

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
    sfxTap();
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length <= 2) return alert("Il faut au moins 2 joueurs !");
    setPlayers(prev => prev.filter(p => p.id !== id));
    sfxTap();
  };

  const startNextWord = () => {
    sfxTap();
    setRoundResult(null);
    setTimeLeftSec(60);

    const card = getRandomTabooCard(selectedCategory);
    setCurrentCard(card);
    setPhase("PLAYING");
  };

  const handleTimeout = () => {
    sfxError();
    setRoundResult("TIMEOUT");
    setPhase("REVEAL");
  };

  const handleWordGuessed = () => {
    sfxSuccess();
    setRoundResult("GUESS");

    const activePlayerIdx = (roundCount - 1) % players.length;
    setPlayers(prev => prev.map((p, idx) => 
      idx === activePlayerIdx ? { ...p, score: p.score + 100 } : p
    ));
    incrementStat("gamesPlayed");
    incrementStat("wins");

    setPhase("REVEAL");
  };

  const handleInfraction = () => {
    sfxError();
    setRoundResult("INFRACTION");

    const activePlayerIdx = (roundCount - 1) % players.length;
    setPlayers(prev => prev.map((p, idx) => 
      idx === activePlayerIdx ? { ...p, score: Math.max(0, p.score - 50) } : p
    ));

    setPhase("REVEAL");
  };

  const handleNextRound = () => {
    if (maxRounds > 0 && roundCount >= maxRounds) {
      sfxVictory();
      setPhase("SCORES");
    } else {
      setRoundCount(prev => prev + 1);
      startNextWord();
    }
  };

  // 1. CONFIGURATION DU JEU
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto relative text-center">
        <div className="w-full flex items-center justify-between mb-6">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xl font-black flex items-center gap-2">
            🎭 Le Maître des Mots
          </span>
          <div className="w-16" />
        </div>

        {/* Sélecteur de Nombre de Mots */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Nombre de Cartes
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ROUND_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { setMaxRounds(opt.value); sfxTap(); }}
                className={`py-3 px-3 rounded-2xl font-black text-xs transition-all border flex items-center justify-center gap-1 ${
                  maxRounds === opt.value 
                    ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow scale-[1.02]" 
                    : "bg-surface border-white/5 text-foreground/70 hover:bg-white/5"
                }`}
              >
                {opt.value === -1 ? <InfinityIcon size={14} /> : null} {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thématique */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Thématique des Mots
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {WORD_MASTER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); sfxTap(); }}
                className={`py-3.5 px-4 rounded-2xl font-black text-xs text-left transition-all border ${
                  selectedCategory === cat 
                    ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow scale-[1.02]" 
                    : "bg-surface border-white/5 text-foreground/70 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Joueurs */}
        <div className="w-full mb-8">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Joueurs ({players.length})
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Prénom du joueur..."
              className="flex-1 bg-surface border-2 border-white/5 rounded-2xl px-4 py-3.5 font-bold focus:border-primary outline-none"
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

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={startNextWord}>
              <Play size={20} /> Lancer la Partie ({maxRounds === -1 ? "Illimité" : `${maxRounds} Cartes`})
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 2. PHASE DE JEU
  const activePlayer = players[(roundCount - 1) % players.length];

  if (phase === "PLAYING" && currentCard) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>

          <span className="text-xs font-black text-pink-400 bg-pink-500/10 border border-pink-500/30 px-3 py-1 rounded-full">
            Maître des mots : {activePlayer?.name}
          </span>

          <div className="text-xs font-black text-foreground/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            ⏱️ {timeLeftSec}s
          </div>
        </div>

        {/* CARTE MOT CIBLE & MOTS INTERDITS */}
        <div className="w-full my-auto space-y-6">
          {/* Mot Cible Secret */}
          <div className="p-8 rounded-3xl bg-surface border-4 border-primary/40 shadow-2xl animate-in zoom-in-95">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-2">Mot Cible à Faire Deviner</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground text-gradient-summer">
              {currentCard.targetWord}
            </h2>
          </div>

          {/* Bannière Rouge des 4 Mots Interdits */}
          <div className="p-6 rounded-3xl bg-red-950/80 border-2 border-red-500/40 text-left space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-red-400 font-black text-xs uppercase tracking-widest">
              <ShieldAlert size={18} /> Mots Interdits (NE PAS DIRE !)
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {currentCard.forbiddenWords.map((word, idx) => (
                <div key={idx} className="bg-red-500/20 border border-red-500/30 px-3.5 py-2.5 rounded-xl text-sm font-black text-red-200 text-center">
                  🚫 {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOUTONS D'ACTION (Kahoot 3D) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="green" className="h-16 text-base font-black gap-2 shadow-xl" onClick={handleWordGuessed}>
            <Check size={24} /> MOT DEVINÉ ! (+100 PTS)
          </Button>

          <Button variant="red" className="h-16 text-base font-black gap-2 shadow-xl" onClick={handleInfraction}>
            <AlertTriangle size={24} /> MOT INTERDIT ! (-50 PTS)
          </Button>
        </div>
      </main>
    );
  }

  // 3. PHASE DE RÉVÉLATION DU TOUR
  if (phase === "REVEAL" && currentCard) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Résultat du Tour
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          {roundResult === "GUESS" && (
            <div className="p-8 rounded-3xl bg-green-950/80 border-2 border-green-500/40 text-center space-y-2 animate-bounce-in">
              <span className="text-4xl">🎉</span>
              <h2 className="text-3xl font-black text-green-400">Bravo ! Mot deviné !</h2>
              <p className="text-sm font-bold text-white/80">+100 points ajoutés au score de {activePlayer?.name} !</p>
            </div>
          )}

          {roundResult === "INFRACTION" && (
            <div className="p-8 rounded-3xl bg-red-950/80 border-2 border-red-500/40 text-center space-y-2 animate-bounce-in">
              <span className="text-4xl">🚨</span>
              <h2 className="text-3xl font-black text-red-400">Mot Interdit Prononcé !</h2>
              <p className="text-sm font-bold text-white/80">Pénalité de -50 points pour {activePlayer?.name} !</p>
            </div>
          )}

          {roundResult === "TIMEOUT" && (
            <div className="p-8 rounded-3xl bg-amber-950/80 border-2 border-amber-500/40 text-center space-y-2 animate-bounce-in">
              <span className="text-4xl">⏱️</span>
              <h2 className="text-3xl font-black text-amber-400">Temps Écoulé !</h2>
              <p className="text-sm font-bold text-white/80">Le chrono de 60s est arrivé à sa fin.</p>
            </div>
          )}

          <div className="bg-surface/90 border border-white/10 p-5 rounded-3xl text-center">
            <span className="text-xs font-black text-foreground/50 uppercase tracking-widest block mb-1">Mot Cible</span>
            <h3 className="text-2xl font-black text-primary">{currentCard.targetWord}</h3>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3">
          <Button variant="primary" className="flex-1 py-4 text-base gap-2 shadow-summer-glow" onClick={handleNextRound}>
            Carte Suivante →
          </Button>
          {maxRounds === -1 && (
            <Button variant="surface" className="py-4 text-xs font-black gap-1.5" onClick={() => setPhase("SCORES")}>
              <Trophy size={16} className="text-yellow-400" /> Fin de Partie
            </Button>
          )}
        </div>
      </main>
    );
  }

  // 4. CLASSEMENT DES SCORES FINAUX
  if (phase === "SCORES") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
          <Trophy size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2">Fin de la Partie !</h2>
        <p className="text-xs font-bold text-foreground/60 mb-6">Voici le classement des Maîtres des Mots :</p>

        <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
          {players.sort((a,b) => b.score - a.score).map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
              <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </Card>

        <EndGameActionsCard
          onReplaySameTeam={() => { setRoundCount(1); startNextWord(); }}
          onEditTeam={() => setPhase("CONFIG")}
          onChangeTeam={() => setPhase("CONFIG")}
        />
      </main>
    );
  }

  return null;
}
