"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, Infinity as InfinityIcon, Sparkles, Flame, Smartphone, Zap 
} from "lucide-react";
import { 
  VyloPartyCategory, VyloPartyCard, VYLO_PARTY_CATEGORIES, 
  getRandomPartyCard, formatPartyCard 
} from "@/games/vylo-party/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "PLAYING" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

const ROUND_OPTIONS: { label: string; value: number }[] = [
  { label: "5 Défis", value: 5 },
  { label: "10 Défis", value: 10 },
  { label: "15 Défis", value: 15 },
  { label: "20 Défis", value: 20 },
  { label: "30 Défis", value: 30 },
  { label: "Illimité ∞", value: -1 },
];

export default function VyloPartyGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<VyloPartyCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 }
  ]);

  const [currentCard, setCurrentCard] = useState<VyloPartyCard | null>(null);
  const [formattedCardText, setFormattedCardText] = useState<string>("");
  const [roundCount, setRoundCount] = useState<number>(1);
  const [activePlayerIdx, setActivePlayerIdx] = useState<number>(0);

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

  const loadNextCard = () => {
    sfxTap();
    const card = getRandomPartyCard(selectedCategory);
    setCurrentCard(card);

    // Sélectionner les 2 joueurs concernés (Player 1 et Player 2)
    const p1Idx = (roundCount - 1) % players.length;
    let p2Idx = (p1Idx + 1) % players.length;
    if (players.length > 2) {
      // Choisir un second joueur au hasard si plus de 2 joueurs
      const otherIndices = players.map((_, i) => i).filter(i => i !== p1Idx);
      p2Idx = otherIndices[Math.floor(Math.random() * otherIndices.length)];
    }

    setActivePlayerIdx(p1Idx);
    const p1 = players[p1Idx];
    const p2 = players[p2Idx];

    const formatted = formatPartyCard(card, p1.name, p2.name);
    setFormattedCardText(formatted);
    setPhase("PLAYING");
  };

  const handleChallengeSuccess = () => {
    sfxSuccess();
    setPlayers(prev => prev.map((p, idx) => 
      idx === activePlayerIdx ? { ...p, score: p.score + 100 } : p
    ));
    incrementStat("gamesPlayed");
    incrementStat("wins");

    handleNextRound();
  };

  const handleChallengeFailed = () => {
    sfxError();
    setPlayers(prev => prev.map((p, idx) => 
      idx === activePlayerIdx ? { ...p, score: Math.max(0, p.score - 50) } : p
    ));

    handleNextRound();
  };

  const handleNextRound = () => {
    if (maxRounds > 0 && roundCount >= maxRounds) {
      sfxVictory();
      setPhase("SCORES");
    } else {
      setRoundCount(prev => prev + 1);
      loadNextCard();
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
            VYLO Party
          </span>
          <div className="w-16" />
        </div>

        {/* Sélecteur de Tours */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Nombre de Défis
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
            Thématique des Défis
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {VYLO_PARTY_CATEGORIES.map(cat => (
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
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={loadNextCard}>
              <Play size={20} /> Lancer la Soirée ({maxRounds === -1 ? "Illimité" : `${maxRounds} Défis`})
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 2. PHASE DE JEU EN COURS
  const activePlayer = players[activePlayerIdx];

  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
      <div className="w-full flex items-center justify-between">
        <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>

        <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Smartphone size={14} /> Téléphone avec : <strong>{activePlayer?.name}</strong>
        </span>

        <span className="text-xs font-black text-foreground/60 bg-white/5 px-3 py-1 rounded-full">
          Défi {roundCount} / {maxRounds === -1 ? "∞" : maxRounds}
        </span>
      </div>

      {/* CARTE DE DÉFI DE SOIRÉE */}
      <div className="w-full my-auto space-y-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-950/80 via-surface to-purple-950/80 border-4 border-pink-500/40 shadow-2xl animate-in zoom-in-95">
          <span className="text-xs font-black uppercase tracking-widest text-pink-400 block mb-3">
            {currentCard?.category || "Défi Soirée"}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-foreground leading-relaxed">
            {formattedCardText}
          </h2>
        </div>
      </div>

      {/* BOUTONS D'ACTION KAHOOT 3D */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button variant="green" className="h-16 text-base font-black gap-2 shadow-xl" onClick={handleChallengeSuccess}>
          <Check size={24} /> DÉFI RÉUSSI ! (+100 PTS)
        </Button>

        <Button variant="red" className="h-16 text-base font-black gap-2 shadow-xl" onClick={handleChallengeFailed}>
          <X size={24} /> GAGE / RATÉ ! (-50 PTS)
        </Button>
      </div>

      {/* SCORES EN FIN DE PARTIE */}
      {phase === "SCORES" && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black mb-2">Fin de la Soirée !</h2>
          <p className="text-xs font-bold text-foreground/60 mb-6">Voici les rois de l'ambiance :</p>

          <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
            {players.sort((a,b) => b.score - a.score).map((p, idx) => (
              <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
                <span className="font-black text-primary">{p.score} pts</span>
              </div>
            ))}
          </Card>

          <EndGameActionsCard
            onReplaySameTeam={() => { setRoundCount(1); loadNextCard(); }}
            onEditTeam={() => setPhase("CONFIG")}
            onChangeTeam={() => setPhase("CONFIG")}
          />
        </div>
      )}
    </main>
  );
}
