"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, Infinity as InfinityIcon, Sparkles, Crown, Layers 
} from "lucide-react";
import { 
  PunchlinesCategory, PunchlinePrompt, PUNCHLINES_CATEGORIES, 
  getRandomPunchlinePrompt, drawAnswerCards 
} from "@/games/punchlines/logic";
import { sfxTap, sfxSuccess, sfxVictory, sfxReveal } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "SUBMITTING" | "JUDGING" | "REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

interface SubmittedCard {
  playerId: string;
  cardText: string;
}

const ROUND_OPTIONS: { label: string; value: number }[] = [
  { label: "5 Cartes", value: 5 },
  { label: "10 Cartes", value: 10 },
  { label: "15 Cartes", value: 15 },
  { label: "20 Cartes", value: 20 },
  { label: "30 Cartes", value: 30 },
  { label: "Illimité ∞", value: -1 },
];

export default function PunchlinesGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<PunchlinesCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 },
    { id: "3", name: "Joueur 3", score: 0 }
  ]);

  const [currentPrompt, setCurrentPrompt] = useState<PunchlinePrompt | null>(null);
  const [playerHands, setPlayerHands] = useState<Record<string, string[]>>({});
  const [submissions, setSubmissions] = useState<SubmittedCard[]>([]);
  const [currentSubmitterIdx, setCurrentSubmitterIdx] = useState<number>(0);
  const [winningCard, setWinningCard] = useState<SubmittedCard | null>(null);
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

  const startNextRound = () => {
    sfxTap();
    const prompt = getRandomPunchlinePrompt(selectedCategory);
    setCurrentPrompt(prompt);
    setSubmissions([]);
    setWinningCard(null);

    // Générer une main de 5 cartes pour chaque joueur
    const hands: Record<string, string[]> = {};
    players.forEach(p => {
      hands[p.id] = drawAnswerCards(5);
    });
    setPlayerHands(hands);

    // Définir le premier joueur soumissionnaire (le juge ne soumet pas)
    const judgeIdx = (roundCount - 1) % players.length;
    const firstSubmitterIdx = judgeIdx === 0 ? 1 : 0;
    setCurrentSubmitterIdx(firstSubmitterIdx);

    setPhase("SUBMITTING");
  };

  const handleSelectCard = (cardText: string) => {
    sfxSuccess();
    const currentSubmitter = players[currentSubmitterIdx];
    const newSubmissions = [...submissions, { playerId: currentSubmitter.id, cardText }];
    setSubmissions(newSubmissions);

    const judgeIdx = (roundCount - 1) % players.length;
    let nextIdx = currentSubmitterIdx + 1;
    if (nextIdx === judgeIdx) nextIdx++;

    if (nextIdx < players.length) {
      setCurrentSubmitterIdx(nextIdx);
    } else {
      // Tous les joueurs ont soumis leur carte ! Le Juge tranche !
      sfxReveal();
      setPhase("JUDGING");
    }
  };

  const handleJudgePickWinner = (submitted: SubmittedCard) => {
    sfxVictory();
    setWinningCard(submitted);

    setPlayers(prev => prev.map(p => 
      p.id === submitted.playerId ? { ...p, score: p.score + 100 } : p
    ));
    incrementStat("gamesPlayed");

    setPhase("REVEAL");
  };

  const handleNextRound = () => {
    if (maxRounds > 0 && roundCount >= maxRounds) {
      sfxVictory();
      setPhase("SCORES");
    } else {
      setRoundCount(prev => prev + 1);
      startNextRound();
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
            🔥 VYLO Cards — Punchlines
          </span>
          <div className="w-16" />
        </div>

        {/* Sélecteur de Tours */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Nombre de Manches
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
            Thématique des Phrases
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PUNCHLINES_CATEGORIES.map(cat => (
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
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={startNextRound}>
              <Play size={20} /> Lancer la Partie ({maxRounds === -1 ? "Illimité" : `${maxRounds} Manches`})
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const judge = players[(roundCount - 1) % players.length];
  const currentSubmitter = players[currentSubmitterIdx];

  // 2. PHASE DE SOUMISSION DE CARTE
  if (phase === "SUBMITTING" && currentPrompt) {
    const hand = playerHands[currentSubmitter?.id] || [];

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>

          <span className="text-xs font-black text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
            Juge du tour : 👑 {judge?.name}
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mx-auto">
            Passez le téléphone à : <strong>{currentSubmitter?.name}</strong>
          </span>

          {/* Phrase à Trou */}
          <div className="p-6 rounded-3xl bg-surface border-2 border-white/10 shadow-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-2">Phrase à Compléter</span>
            <h2 className="text-xl md:text-2xl font-black text-foreground leading-relaxed">
              "{currentPrompt.template}"
            </h2>
          </div>

          {/* Main de 5 Cartes Réponses */}
          <div className="space-y-2.5">
            <span className="text-xs font-black uppercase tracking-widest text-foreground/50 block text-left">
              Choisissez votre meilleure carte :
            </span>
            {hand.map((cardText, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectCard(cardText)}
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-left font-extrabold text-sm text-foreground active:scale-[0.98] transition-all shadow-md flex items-center justify-between gap-3"
              >
                <span>"{cardText}"</span>
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xs shrink-0">
                  #{idx + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // 3. PHASE DE JUGEMENT (LE JUGE LIT ET DÉSIGNE LE GAGNANT)
  if (phase === "JUDGING" && currentPrompt) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 px-3 py-1 rounded-full">
            👑 Le Juge {judge?.name} choisit !
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <div className="p-6 rounded-3xl bg-surface border-2 border-white/10 shadow-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-primary block mb-2">Phrase à Compléter</span>
            <h2 className="text-xl font-black text-foreground">"{currentPrompt.template}"</h2>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-400 block text-left">
              👑 {judge?.name}, lisez à voix haute et touchez l'association la plus hilarante :
            </span>
            {submissions.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => handleJudgePickWinner(sub)}
                className="w-full p-5 rounded-3xl bg-gradient-to-r from-purple-900/40 to-slate-900/60 border-2 border-purple-500/30 hover:border-yellow-400 hover:scale-[1.02] text-left font-black text-base text-white transition-all shadow-xl"
              >
                "{sub.cardText}"
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // 4. PHASE DE RÉVÉLATION DU VAINQUEUR DU TOUR
  if (phase === "REVEAL" && currentPrompt && winningCard) {
    const winnerPlayer = players.find(p => p.id === winningCard.playerId);

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Meilleure Punchline
          </span>
        </div>

        <div className="w-full my-auto space-y-6">
          <div className="p-6 rounded-3xl bg-purple-950/80 border-2 border-purple-500/40 text-center space-y-2 shadow-2xl animate-bounce-in">
            <span className="text-4xl">🏆</span>
            <span className="text-xs font-black uppercase tracking-widest text-purple-300 block">Punchline Gagnante !</span>
            <h3 className="text-2xl font-black text-white">"{winningCard.cardText}"</h3>
            <span className="text-sm font-bold text-yellow-400 block pt-2">
              Proposée par : <strong>{winnerPlayer?.name} (+100 pts)</strong>
            </span>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3">
          <Button variant="primary" className="flex-1 py-4 text-base gap-2 shadow-summer-glow" onClick={handleNextRound}>
            Manche Suivante →
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

  // 5. SCORES FINAUX
  if (phase === "SCORES") {
    return (
      <main className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
          <Trophy size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2">Fin de la Partie !</h2>
        <p className="text-xs font-bold text-foreground/60 mb-6">Classement des rois de la punchline :</p>

        <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
          {players.sort((a,b) => b.score - a.score).map((p, idx) => (
            <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
              <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
              <span className="font-black text-primary">{p.score} pts</span>
            </div>
          ))}
        </Card>

        <EndGameActionsCard
          onReplaySameTeam={() => { setRoundCount(1); startNextRound(); }}
          onEditTeam={() => setPhase("CONFIG")}
          onChangeTeam={() => setPhase("CONFIG")}
        />
      </main>
    );
  }

  return null;
}
