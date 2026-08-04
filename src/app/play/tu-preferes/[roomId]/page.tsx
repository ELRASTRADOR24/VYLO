"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, UserPlus, Play, Check, X, 
  Trophy, Trash2, HelpCircle, Infinity as InfinityIcon, Sparkles, Flame, Percent,
  Zap, Brain, Hourglass, Rewind, Eye, Globe, Ghost, Plane, Sun, Shield,
  Volume2, Smile, Footprints, HardHat, Music, Bell, Utensils, Coffee,
  WifiOff, Headphones, Camera, Tv, Home, Lock, Search, MessageSquare, Coins, Users,
  Clock, Laugh, FastForward, Heart, Gift
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

const ICON_MAP: Record<string, React.ReactNode> = {
  "zap": <Zap className="w-10 h-10 md:w-12 md:h-12 text-amber-300" strokeWidth={2.5} />,
  "brain": <Brain className="w-10 h-10 md:w-12 md:h-12 text-pink-300" strokeWidth={2.5} />,
  "hourglass": <Hourglass className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" strokeWidth={2.5} />,
  "rewind": <Rewind className="w-10 h-10 md:w-12 md:h-12 text-cyan-300" strokeWidth={2.5} />,
  "eye": <Eye className="w-10 h-10 md:w-12 md:h-12 text-indigo-300" strokeWidth={2.5} />,
  "globe": <Globe className="w-10 h-10 md:w-12 md:h-12 text-emerald-300" strokeWidth={2.5} />,
  "ghost": <Ghost className="w-10 h-10 md:w-12 md:h-12 text-purple-300" strokeWidth={2.5} />,
  "plane": <Plane className="w-10 h-10 md:w-12 md:h-12 text-blue-300" strokeWidth={2.5} />,
  "sun": <Sun className="w-10 h-10 md:w-12 md:h-12 text-amber-400" strokeWidth={2.5} />,
  "shield": <Shield className="w-10 h-10 md:w-12 md:h-12 text-emerald-400" strokeWidth={2.5} />,
  "volume": <Volume2 className="w-10 h-10 md:w-12 md:h-12 text-rose-300" strokeWidth={2.5} />,
  "smile": <Smile className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" strokeWidth={2.5} />,
  "footprints": <Footprints className="w-10 h-10 md:w-12 md:h-12 text-orange-300" strokeWidth={2.5} />,
  "hard-hat": <HardHat className="w-10 h-10 md:w-12 md:h-12 text-amber-400" strokeWidth={2.5} />,
  "sparkles": <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" strokeWidth={2.5} />,
  "music": <Music className="w-10 h-10 md:w-12 md:h-12 text-emerald-300" strokeWidth={2.5} />,
  "bell": <Bell className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" strokeWidth={2.5} />,
  "utensils": <Utensils className="w-10 h-10 md:w-12 md:h-12 text-rose-400" strokeWidth={2.5} />,
  "coffee": <Coffee className="w-10 h-10 md:w-12 md:h-12 text-amber-500" strokeWidth={2.5} />,
  "wifi-off": <WifiOff className="w-10 h-10 md:w-12 md:h-12 text-red-400" strokeWidth={2.5} />,
  "headphones": <Headphones className="w-10 h-10 md:w-12 md:h-12 text-purple-300" strokeWidth={2.5} />,
  "camera": <Camera className="w-10 h-10 md:w-12 md:h-12 text-pink-400" strokeWidth={2.5} />,
  "tv": <Tv className="w-10 h-10 md:w-12 md:h-12 text-red-400" strokeWidth={2.5} />,
  "home": <Home className="w-10 h-10 md:w-12 md:h-12 text-amber-300" strokeWidth={2.5} />,
  "lock": <Lock className="w-10 h-10 md:w-12 md:h-12 text-cyan-300" strokeWidth={2.5} />,
  "search": <Search className="w-10 h-10 md:w-12 md:h-12 text-blue-300" strokeWidth={2.5} />,
  "message-square": <MessageSquare className="w-10 h-10 md:w-12 md:h-12 text-emerald-300" strokeWidth={2.5} />,
  "coins": <Coins className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" strokeWidth={2.5} />,
  "users": <Users className="w-10 h-10 md:w-12 md:h-12 text-indigo-300" strokeWidth={2.5} />,
  "clock": <Clock className="w-10 h-10 md:w-12 md:h-12 text-rose-300" strokeWidth={2.5} />,
  "help-circle": <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-purple-300" strokeWidth={2.5} />,
  "laugh": <Laugh className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" strokeWidth={2.5} />,
  "fast-forward": <FastForward className="w-10 h-10 md:w-12 md:h-12 text-cyan-300" strokeWidth={2.5} />,
  "heart": <Heart className="w-10 h-10 md:w-12 md:h-12 text-rose-400" strokeWidth={2.5} />,
  "gift": <Gift className="w-10 h-10 md:w-12 md:h-12 text-purple-300" strokeWidth={2.5} />,
};

// Composant Visuel Carte d'Option (Vector Tarot Style avec Rayons)
function VisualOptionCard({ 
  type, 
  title, 
  iconKey = "zap", 
  onClick 
}: { 
  type: "A" | "B"; 
  title: string; 
  iconKey?: string; 
  onClick: () => void; 
}) {
  const isA = type === "A";
  const iconNode = ICON_MAP[iconKey] || <Sparkles className="w-10 h-10 text-yellow-300" />;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative p-5 md:p-6 rounded-3xl text-left transition-all duration-300 transform hover:-translate-y-2 active:scale-95 cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xl border-4 ${
        isA 
          ? "bg-gradient-to-br from-[#450A0A] via-[#7F1D1D] to-[#450A0A] border-red-500 hover:border-red-400 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)]" 
          : "bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] border-blue-500 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
      }`}
    >
      {/* Rayons Sunburst Arrière-Plan */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="0" y1="0" x2="200" y2="200" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="0" x2="0" y2="200" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Header Badge (A ou B) + Illustration Icône Héroïque */}
      <div className="relative z-10 flex items-center justify-between mb-4 w-full">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm uppercase tracking-widest border-2 ${
          isA ? "bg-red-500/30 border-red-400 text-red-200" : "bg-blue-500/30 border-blue-400 text-blue-200"
        }`}>
          {type}
        </div>

        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2 shadow-lg group-hover:scale-110 transition-transform ${
          isA ? "bg-red-950/80 border-red-400/50" : "bg-blue-950/80 border-blue-400/50"
        }`}>
          {iconNode}
        </div>
      </div>

      {/* Texte du Dilemme */}
      <div className="relative z-10 space-y-1">
        <span className={`text-[10px] font-black uppercase tracking-widest block ${isA ? "text-red-300" : "text-blue-300"}`}>
          OPTION {type}
        </span>
        <p className="text-base md:text-xl font-black text-white leading-tight">
          {title}
        </p>
      </div>

      {/* Bouton d'action tactile en bas */}
      <div className={`mt-5 py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all ${
        isA ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_4px_0_#7F1D1D]" : "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_4px_0_#1E3A8A]"
      }`}>
        Choisir Option {type}
      </div>
    </button>
  );
}

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

  // 2. PHASE DE VOTE AVEC CARTES DE DESSIN ET D'ICÔNES VECTORIELLES
  const currentVoter = players[currentVoterIdx];

  if (phase === "PLAYING" && currentDilemma) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
        <div className="w-full flex items-center justify-between mb-4">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
            Dilemme {roundCount} / {maxRounds === -1 ? "∞" : maxRounds}
          </span>
        </div>

        <div className="w-full my-auto flex flex-col gap-5">
          <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mx-auto mb-1">
            Passez le téléphone à : <strong>{currentVoter?.name}</strong>
          </span>

          {/* Grille de Cartes d'Options Visuelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <VisualOptionCard
              type="A"
              title={currentDilemma.optionA}
              iconKey={currentDilemma.iconA}
              onClick={() => handleVote("A")}
            />

            <VisualOptionCard
              type="B"
              title={currentDilemma.optionB}
              iconKey={currentDilemma.iconB}
              onClick={() => handleVote("B")}
            />
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Résultat Option A */}
            <div className={`p-6 rounded-3xl border-4 transition-all flex flex-col justify-between ${
              countA >= countB 
                ? 'bg-gradient-to-br from-[#7F1D1D] to-[#450A0A] border-red-500 text-white shadow-2xl scale-[1.02]' 
                : 'bg-surface border-white/10 opacity-70'
            }`}>
              <div className="flex justify-between items-center mb-3 font-black">
                <span className="text-xs uppercase tracking-widest text-red-300">OPTION A</span>
                <span className="text-2xl font-black">{percentA}% ({countA} votes)</span>
              </div>

              <div className="flex items-center gap-3 mb-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-400/40 flex items-center justify-center shrink-0">
                  {ICON_MAP[currentDilemma.iconA || "zap"] || <Sparkles className="text-yellow-300" />}
                </div>
                <p className="text-base font-bold text-white leading-tight">{currentDilemma.optionA}</p>
              </div>

              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-red-400 transition-all duration-1000" style={{ width: `${percentA}%` }} />
              </div>
            </div>

            {/* Résultat Option B */}
            <div className={`p-6 rounded-3xl border-4 transition-all flex flex-col justify-between ${
              countB >= countA 
                ? 'bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] border-blue-500 text-white shadow-2xl scale-[1.02]' 
                : 'bg-surface border-white/10 opacity-70'
            }`}>
              <div className="flex justify-between items-center mb-3 font-black">
                <span className="text-xs uppercase tracking-widest text-blue-300">OPTION B</span>
                <span className="text-2xl font-black">{percentB}% ({countB} votes)</span>
              </div>

              <div className="flex items-center gap-3 mb-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-400/40 flex items-center justify-center shrink-0">
                  {ICON_MAP[currentDilemma.iconB || "zap"] || <Sparkles className="text-yellow-300" />}
                </div>
                <p className="text-base font-bold text-white leading-tight">{currentDilemma.optionB}</p>
              </div>

              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-blue-400 transition-all duration-1000" style={{ width: `${percentB}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex gap-3 mt-6">
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
