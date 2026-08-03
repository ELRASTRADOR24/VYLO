"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, Infinity as InfinityIcon, Sparkles, UserCheck 
} from "lucide-react";
import { 
  MostLikelyToCategory, MostLikelyToPrompt, MOST_LIKELY_TO_CATEGORIES, getRandomMostLikelyPrompt 
} from "@/games/most-likely-to/logic";
import { sfxTap, sfxSuccess, sfxVictory, sfxReveal } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "VOTING" | "REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

const ROUND_OPTIONS: { label: string; value: number }[] = [
  { label: "5 Questions", value: 5 },
  { label: "10 Questions", value: 10 },
  { label: "15 Questions", value: 15 },
  { label: "20 Questions", value: 20 },
  { label: "30 Questions", value: 30 },
  { label: "Illimité ∞", value: -1 },
];

export default function MostLikelyToGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<MostLikelyToCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 },
    { id: "3", name: "Joueur 3", score: 0 }
  ]);

  const [currentPrompt, setCurrentPrompt] = useState<MostLikelyToPrompt | null>(null);
  const [votes, setVotes] = useState<Record<string, string>>({}); // voterId -> targetPlayerId
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

  const startNextPrompt = () => {
    sfxTap();
    const prompt = getRandomMostLikelyPrompt(selectedCategory);
    setCurrentPrompt(prompt);
    setVotes({});
    setCurrentVoterIdx(0);
    setPhase("VOTING");
  };

  const handleVote = (targetPlayerId: string) => {
    sfxSuccess();
    const currentVoter = players[currentVoterIdx];
    const newVotes = { ...votes, [currentVoter.id]: targetPlayerId };
    setVotes(newVotes);

    if (currentVoterIdx + 1 < players.length) {
      setCurrentVoterIdx(prev => prev + 1);
    } else {
      // Tous les joueurs ont voté ! Calcul du gagnant
      sfxReveal();
      calculateScores(newVotes);
      setPhase("REVEAL");
    }
  };

  const calculateScores = (finalVotes: Record<string, string>) => {
    const voteCounts: Record<string, number> = {};
    Object.values(finalVotes).forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });

    // Ajouter les points au(x) joueur(s) le(s) plus voté(s)
    let maxVotes = 0;
    Object.values(voteCounts).forEach(c => { if (c > maxVotes) maxVotes = c; });

    setPlayers(prev => prev.map(p => {
      if ((voteCounts[p.id] || 0) === maxVotes && maxVotes > 0) {
        return { ...p, score: p.score + 100 };
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
      startNextPrompt();
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
            🎯 Qui est le plus susceptible de... ?
          </span>
          <div className="w-16" />
        </div>

        {/* Sélecteur de Tours */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Nombre de Questions
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

        {/* Catégories */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Thématique des Situations
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MOST_LIKELY_TO_CATEGORIES.map(cat => (
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
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={startNextPrompt}>
              <Play size={20} /> Lancer la Partie ({maxRounds === -1 ? "Illimité" : `${maxRounds} Questions`})
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 2. PHASE DE VOTE
  const currentVoter = players[currentVoterIdx];

  if (phase === "VOTING" && currentPrompt) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
            Question {roundCount} / {maxRounds === -1 ? "∞" : maxRounds}
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mx-auto">
            Vote secret de : <strong>{currentVoter?.name}</strong>
          </span>

          <div className="p-8 rounded-3xl bg-surface border-4 border-orange-500/40 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-snug">
              "{currentPrompt.question}"
            </h2>
          </div>

          {/* Boutons des Joueurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {players.map((targetPlayer) => (
              <Button
                key={targetPlayer.id}
                variant="surface"
                onClick={() => handleVote(targetPlayer.id)}
                className="h-16 text-base font-black justify-start px-4 gap-3 bg-white/5 border border-white/10 hover:border-orange-400 hover:bg-orange-500/10 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-summer text-white flex items-center justify-center text-sm font-black shrink-0">
                  {targetPlayer.name.charAt(0).toUpperCase()}
                </div>
                <span>{targetPlayer.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // 3. PHASE DE RÉVÉLATION DES RÉSULTATS
  if (phase === "REVEAL" && currentPrompt) {
    const totalVotes = Object.keys(votes).length;
    const voteCounts: Record<string, number> = {};
    Object.values(votes).forEach(targetId => {
      voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
    });

    let maxVotes = 0;
    Object.values(voteCounts).forEach(c => { if (c > maxVotes) maxVotes = c; });
    const winners = players.filter(p => (voteCounts[p.id] || 0) === maxVotes);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Élu par le Groupe
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <h2 className="text-2xl font-black text-foreground">Le Groupe a parlé !</h2>

          {/* Joueur Élu */}
          <div className="p-6 rounded-3xl bg-orange-950/80 border-2 border-orange-500/40 text-center space-y-2 shadow-2xl animate-bounce-in">
            <span className="text-4xl">👑</span>
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 block">Élu le Plus Susceptible</span>
            <h3 className="text-3xl font-black text-white">
              {winners.map(w => w.name).join(" & ")}
            </h3>
            <span className="text-xs font-bold text-white/70">
              ({maxVotes} votes sur {totalVotes})
            </span>
          </div>

          {/* Détail de tous les votes */}
          <div className="space-y-2">
            {players.map(p => {
              const count = voteCounts[p.id] || 0;
              const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              return (
                <div key={p.id} className="bg-surface p-3.5 rounded-2xl border border-white/5 flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span>{p.name}</span>
                    <span className="text-primary">{percent}% ({count} votes)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                    <div className="h-full bg-gradient-summer transition-all duration-1000" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3">
          <Button variant="primary" className="flex-1 py-4 text-base gap-2 shadow-summer-glow" onClick={handleNextRound}>
            Question Suivante →
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

  // 4. SCORES FINAUX
  if (phase === "SCORES") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
          <Trophy size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2">Fin de la Partie !</h2>
        <p className="text-xs font-bold text-foreground/60 mb-6">Joueurs les plus souvent désignés par le groupe :</p>

        <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
          {players.sort((a,b) => b.score - a.score).map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
              <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </Card>

        <EndGameActionsCard
          onReplaySameTeam={() => { setRoundCount(1); startNextPrompt(); }}
          onEditTeam={() => setPhase("CONFIG")}
          onChangeTeam={() => setPhase("CONFIG")}
        />
      </main>
    );
  }

  return null;
}
