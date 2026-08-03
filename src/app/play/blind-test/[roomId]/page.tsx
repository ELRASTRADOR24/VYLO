"use client";

import { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, UserPlus, Play, Check, X, 
  RotateCcw, Trophy, Trash2, Dices, Music, Disc, Volume2, Sparkles 
} from "lucide-react";
import { 
  BlindTestCategory, BlindTestQuestion, generateBlindTestQuestion 
} from "@/games/blind-test/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "@/lib/audio";
import { EndGameActionsCard } from "@/components/ui/EndGameActionsCard";

type LocalPhase = "CONFIG" | "QUESTION_LOADING" | "PLAYING" | "REVEAL" | "SCORES";

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
}

const CATEGORIES: BlindTestCategory[] = [
  "Tous",
  "Hits & Rap Français",
  "Musique Espagnole & Latino",
  "Pop International",
  "Films & Dessins Animés"
];

const KAHOOT_BUTTON_VARIANTS: ("red" | "blue" | "yellow" | "green")[] = [
  "red", "blue", "yellow", "green"
];

export default function BlindTestGamePage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { incrementStat } = useAppStore();

  const [phase, setPhase] = useState<LocalPhase>("CONFIG");
  const [selectedCategory, setSelectedCategory] = useState<BlindTestCategory>("Hits & Rap Français");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: "1", name: "Joueur 1", score: 0 },
    { id: "2", name: "Joueur 2", score: 0 }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<BlindTestQuestion | null>(null);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(30);
  const [roundCount, setRoundCount] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Timer 30s
  useEffect(() => {
    if (phase !== "PLAYING" || timeLeftSec <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSec(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, timeLeftSec]);

  const handleLeaveGame = () => {
    sfxTap();
    if (audioRef.current) audioRef.current.pause();
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

  const loadNextQuestion = async () => {
    sfxTap();
    setPhase("QUESTION_LOADING");
    setSelectedChoiceIdx(null);
    setTimeLeftSec(30);

    const question = await generateBlindTestQuestion(selectedCategory);
    setCurrentQuestion(question);
    setPhase("PLAYING");

    // Jouer le son
    if (question.track.previewUrl) {
      try {
        if (audioRef.current) {
          audioRef.current.src = question.track.previewUrl;
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.warn("Audio autoplay blocked", e));
        }
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const handleTimeExpired = () => {
    sfxError();
    setPhase("REVEAL");
  };

  const handleAnswerChoice = (index: number) => {
    if (phase !== "PLAYING" || !currentQuestion) return;
    setSelectedChoiceIdx(index);

    const isCorrect = index === currentQuestion.correctChoiceIndex;
    if (isCorrect) {
      sfxSuccess();
      const speedBonus = Math.max(10, Math.floor(timeLeftSec * 3));
      const pointsEarned = 50 + speedBonus;
      
      // Créditer le joueur actuel
      setPlayers(prev => prev.map((p, idx) => 
        idx === (roundCount - 1) % players.length ? { ...p, score: p.score + pointsEarned } : p
      ));
      incrementStat("gamesPlayed");
      incrementStat("wins");
    } else {
      sfxError();
    }

    setPhase("REVEAL");
  };

  const handleNextRound = () => {
    if (audioRef.current) audioRef.current.pause();

    if (roundCount >= players.length * 3) {
      sfxVictory();
      setPhase("SCORES");
    } else {
      setRoundCount(prev => prev + 1);
      loadNextQuestion();
    }
  };

  // 1. CONFIGURATION
  if (phase === "CONFIG") {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto relative text-center">
        <div className="w-full flex items-center justify-between mb-6">
          <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xl font-black flex items-center gap-2">
            <Music className="text-primary" /> Blind Test
          </span>
          <div className="w-16" />
        </div>

        {/* Sélection de Catégorie Musicale */}
        <div className="w-full mb-6">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block text-left">
            Catégorie Musicale
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CATEGORIES.map(cat => (
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

        {/* Liste des Joueurs */}
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
            <Button variant="primary" className="w-full h-16 text-lg gap-2 shadow-summer-glow" onClick={loadNextQuestion}>
              <Play size={20} /> Lancer le Blind Test ({players.length} joueurs)
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // 2. CHARGEMENT
  if (phase === "QUESTION_LOADING") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 animate-pulse">
          <Disc size={40} className="animate-spin" />
        </div>
        <h2 className="text-2xl font-black text-foreground">Chargement de la piste...</h2>
        <p className="text-xs font-bold text-foreground/50 mt-2">Recherche de l'extrait audio officiel 30s</p>
      </main>
    );
  }

  // 3. JEU EN COURS & REVEAL
  const activePlayer = players[(roundCount - 1) % players.length];

  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12">
      <audio ref={audioRef} />

      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <button onClick={handleLeaveGame} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>
        <span className="text-xs font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          Tour de : {activePlayer?.name}
        </span>
        <div className="text-xs font-black text-foreground/60 bg-white/5 px-3 py-1 rounded-full">
          ⏱️ {timeLeftSec}s
        </div>
      </div>

      {/* Visualiseur Audio Vinyle */}
      <div className="w-full flex flex-col items-center my-auto">
        <div className="relative mb-6">
          <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-4 border-primary/40 flex items-center justify-center shadow-2xl ${phase === 'PLAYING' ? 'animate-spin duration-[4000ms]' : ''}`}>
            <Disc size={64} className="text-primary/70" />
          </div>
          {phase === "REVEAL" && currentQuestion?.track.artworkUrl && (
            <img 
              src={currentQuestion.track.artworkUrl} 
              alt="Pochette Album" 
              className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-primary shadow-2xl animate-in zoom-in-95 duration-200"
            />
          )}
        </div>

        {phase === "PLAYING" && (
          <div className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-4">
            <Volume2 size={16} className="animate-pulse" /> Extrait en cours d'écoute...
          </div>
        )}

        {phase === "REVEAL" && currentQuestion && (
          <div className="bg-surface/90 border border-white/10 p-5 rounded-3xl w-full max-w-sm mb-6 animate-bounce-in">
            <span className="text-xs font-black uppercase tracking-wider text-primary block mb-1">Résultat Réveillé</span>
            <h2 className="text-2xl font-black text-foreground">{currentQuestion.track.trackName}</h2>
            <p className="text-sm font-extrabold text-foreground/70 mt-1">{currentQuestion.track.artistName}</p>
          </div>
        )}
      </div>

      {/* Choix de Réponses Style Kahoot 3D */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {currentQuestion?.choices.map((choice, idx) => {
          const variant = KAHOOT_BUTTON_VARIANTS[idx % 4];
          const isSelected = selectedChoiceIdx === idx;
          const isCorrect = phase === "REVEAL" && idx === currentQuestion.correctChoiceIndex;

          return (
            <Button
              key={idx}
              variant={variant}
              disabled={phase === "REVEAL"}
              onClick={() => handleAnswerChoice(idx)}
              className={`h-16 text-sm md:text-base font-black normal-case leading-snug justify-between px-5 ${
                isCorrect ? 'ring-4 ring-green-400 scale-105' : ''
              }`}
            >
              <span className="truncate">{choice}</span>
              {phase === "REVEAL" && isCorrect && <Check size={20} className="text-white" />}
            </Button>
          );
        })}
      </div>

      {phase === "REVEAL" && (
        <Button variant="primary" className="w-full max-w-sm py-4 text-base gap-2 shadow-summer-glow" onClick={handleNextRound}>
          Question Suivante →
        </Button>
      )}

      {/* SCORES EN FIN DE PARTIE */}
      {phase === "SCORES" && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black mb-2">Fin du Blind Test !</h2>
          <p className="text-xs font-bold text-foreground/60 mb-6">Voici le classement final :</p>

          <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
            {players.sort((a,b) => b.score - a.score).map((p, idx) => (
              <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                <span className="font-extrabold text-sm">#{idx + 1} {p.name}</span>
                <span className="font-black text-primary">{p.score} pts</span>
              </div>
            ))}
          </Card>

          <EndGameActionsCard
            onReplaySameTeam={() => { setRoundCount(1); loadNextQuestion(); }}
            onEditTeam={() => setPhase("CONFIG")}
            onChangeTeam={() => setPhase("CONFIG")}
          />
        </div>
      )}
    </main>
  );
}
