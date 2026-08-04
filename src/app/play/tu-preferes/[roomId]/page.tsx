"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, HelpCircle, Infinity as InfinityIcon, Sparkles, Flame, Percent 
} from "lucide-react";
import { 
  TuPreferesCategory, TuPreferesDilemma, TU_PREFERES_CATEGORIES, getRandomDilemma 
} from "@/games/tu-preferes/logic";
import { sfxTap, sfxSuccess, sfxVictory, sfxReveal } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "PLAYING" | "REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

const ROUND_OPTIONS: { label: string; value: number }[] = [
  { label: "5 Dilemmes", value: 5 },
  { label: "10 Dilemmes", value: 10 },
  { label: "15 Dilemmes", value: 15 },
  { label: "20 Dilemmes", value: 20 },
  { label: "30 Dilemmes", value: 30 },
  { label: "Illimité ∞", value: -1 },
];

export default function TuPreferesGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<TuPreferesCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 }
  ]);

  const [currentDilemma, setCurrentDilemma] = useState<TuPreferesDilemma | null>(null);
  const [votes, setVotes] = useState<Record<string, "A" | "B">>({});
  const [currentVoterIdx, setCurrentVoterIdx] = useState<number>(0);
  const [roundCount, setRoundCount] = useState<number>(1);

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

  const startNextDilemma = () => {
    sfxTap();
    const dilemma = getRandomDilemma(selectedCategory);
    setCurrentDilemma(dilemma);
    setVotes({});
    setCurrentVoterIdx(0);
    setPhase("PLAYING");
  };

  const handleVote = (choice: "A" | "B") => {
    sfxSuccess();
    const currentVoter = players[currentVoterIdx];
    const newVotes = { ...votes, [currentVoter.id]: choice };
    setVotes(newVotes);

    if (currentVoterIdx + 1 < players.length) {
      setCurrentVoterIdx(prev => prev + 1);
    } else {
      // Tous les joueurs ont voté ! Calcul des stats & révélation
      sfxReveal();
      calculateScores(newVotes);
      setPhase("REVEAL");
    }
  };

  const calculateScores = (finalVotes: Record<string, "A" | "B">) => {
    const countA = Object.values(finalVotes).filter(v => v === "A").length;
    const countB = Object.values(finalVotes).filter(v => v === "B").length;
    const majorityChoice = countA >= countB ? "A" : "B";

    setPlayers(prev => prev.map(p => {
      const pVote = finalVotes[p.id];
      if (pVote === majorityChoice) {
        return { ...p, score: p.score + 50 };
      }
      return p;
    }));

    incrementStat("gamesPlayed");
  };

  const handleNextRound = () => {
    if (maxRounds > 0 && roundCount >= maxRounds) {
      sfxVictory();
      setPhase("SCORES");
    } else {
      setRoundCount(prev => prev + 1);
      startNextDilemma();
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
            🤔 Tu Préfères ?
          </span>
          <div className="w-16" />
        </div>

        {/* Sélecteur de Nombre de Dilemmes */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Nombre de Dilemmes
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

        {/* Sélecteur de Catégorie */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Thématique des Dilemmes
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {TU_PREFERES_CATEGORIES.map(cat => (
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
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={startNextDilemma}>
              <Play size={20} /> Lancer la Partie ({maxRounds === -1 ? "Illimité" : `${maxRounds} Dilemmes`})
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 2. PHASE DE VOTE
  const currentVoter = players[currentVoterIdx];

  if (phase === "PLAYING" && currentDilemma) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
            Dilemma {roundCount} / {maxRounds === -1 ? "∞" : maxRounds}
          </span>
        </div>

        <div className="w-full my-auto flex flex-col gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mx-auto mb-2">
            Passez le téléphone à : <strong>{currentVoter?.name}</strong>
          </span>

          {/* Option A (Rouge Kahoot) */}
          <button
            onClick={() => handleVote("A")}
            className="p-6 rounded-3xl btn-kahoot-red text-left font-black text-lg md:text-xl active-press shadow-2xl transition-transform hover:scale-[1.02] flex items-center justify-between border-2 border-white/20"
          >
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-xs uppercase tracking-widest text-white/80 font-black">Option A</span>
              <span>{currentDilemma.optionA}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-sm font-black shrink-0 uppercase tracking-widest">
              A
            </div>
          </button>

          <span className="text-sm font-black text-foreground/40 uppercase tracking-widest">— OU —</span>

          {/* Option B (Bleu Kahoot) */}
          <button
            onClick={() => handleVote("B")}
            className="p-6 rounded-3xl btn-kahoot-blue text-left font-black text-lg md:text-xl active-press shadow-2xl transition-transform hover:scale-[1.02] flex items-center justify-between border-2 border-white/20"
          >
            <div className="flex flex-col gap-1 pr-4">
              <span className="text-xs uppercase tracking-widest text-white/80 font-black">Option B</span>
              <span>{currentDilemma.optionB}</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-sm font-black shrink-0 uppercase tracking-widest">
              B
            </div>
          </button>
        </div>
      </main>
    );
  }

  // 3. PHASE DE RÉVÉLATION ET STATISTIQUES EN POURCENTAGE
  if (phase === "REVEAL" && currentDilemma) {
    const totalVotes = Object.keys(votes).length;
    const countA = Object.values(votes).filter(v => v === "A").length;
    const countB = Object.values(votes).filter(v => v === "B").length;

    const percentA = totalVotes > 0 ? Math.round((countA / totalVotes) * 100) : 50;
    const percentB = totalVotes > 0 ? Math.round((countB / totalVotes) * 100) : 50;

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Résultats du Groupe
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <h2 className="text-2xl font-black text-foreground mb-4">Le Groupe a tranché !</h2>

          {/* Barres de Pourcentages Animées */}
          <div className="space-y-4">
            {/* Résultat Option A */}
            <div className={`p-5 rounded-3xl border-2 transition-all ${countA >= countB ? 'bg-red-600/90 border-red-400 text-white shadow-xl scale-[1.02]' : 'bg-surface border-white/10 opacity-70'}`}>
              <div className="flex justify-between items-center mb-2 font-black">
                <span className="text-sm uppercase tracking-wider">Option A</span>
                <span className="text-2xl">{percentA}% ({countA} votes)</span>
              </div>
              <p className="text-base font-bold text-left mb-2">{currentDilemma.optionA}</p>
              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-red-400 transition-all duration-1000" style={{ width: `${percentA}%` }} />
              </div>
            </div>

            {/* Résultat Option B */}
            <div className={`p-5 rounded-3xl border-2 transition-all ${countB >= countA ? 'bg-blue-600/90 border-blue-400 text-white shadow-xl scale-[1.02]' : 'bg-surface border-white/10 opacity-70'}`}>
              <div className="flex justify-between items-center mb-2 font-black">
                <span className="text-sm uppercase tracking-wider">Option B</span>
                <span className="text-2xl">{percentB}% ({countB} votes)</span>
              </div>
              <p className="text-base font-bold text-left mb-2">{currentDilemma.optionB}</p>
              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-1000" style={{ width: `${percentB}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3">
          <Button variant="primary" className="flex-1 py-4 text-base gap-2 shadow-summer-glow" onClick={handleNextRound}>
            Dilemme Suivant →
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
        <h2 className="text-3xl font-black mb-2">Fin des Dilemmes !</h2>
        <p className="text-xs font-bold text-foreground/60 mb-6">Joueurs les plus en phase avec le groupe :</p>

        <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
          {players.sort((a,b) => b.score - a.score).map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
              <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </Card>

        <EndGameActionsCard
          onReplaySameTeam={() => { setRoundCount(1); startNextDilemma(); }}
          onEditTeam={() => setPhase("CONFIG")}
          onChangeTeam={() => setPhase("CONFIG")}
        />
      </main>
    );
  }

  return null;
}
