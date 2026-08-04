"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, Play, Check, X, Trophy, 
  Globe, Flag, Sparkles, Crown, Copy 
} from "lucide-react";
import { 
  FlagQuizQuestion, FlagCategory, FLAG_CATEGORIES, generateFlagQuestion 
} from "@/games/flag-quiz/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";

const KAHOOT_BUTTON_VARIANTS: ("red" | "blue" | "yellow" | "green")[] = [
  "red", "blue", "yellow", "green"
];

export default function OnlineFlagQuizGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { socket, roomState, joinRoom, syncGameState } = useSocket();

  const [selectedCategory, setSelectedCategory] = useState<FlagCategory>("Monde Entier");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [copiedCode, setCopiedCode] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(15);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId, "flag-quiz", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  useEffect(() => {
    if (roomState?.state !== "PLAYING" || timeLeftSec <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [roomState?.state, timeLeftSec]);

  const isHost = roomState?.players?.find((p) => p.id === socket?.id)?.isHost || false;
  const gameData = roomState?.gameData || {};
  const currentQuestion: FlagQuizQuestion | undefined = gameData.currentQuestion;
  const playerAnswers: Record<string, { choiceIndex: number; timeSec: number }> = gameData.answers || {};
  const scores: Record<string, number> = gameData.scores || {};
  const roundCount = gameData.roundCount || 1;

  const myAnswer = socket?.id ? playerAnswers[socket.id] : undefined;

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

  const handleHostStartGame = () => {
    sfxTap();
    const firstQuestion = generateFlagQuestion(selectedCategory);
    const initialScores: Record<string, number> = {};
    (roomState?.players || []).forEach(p => { initialScores[p.id] = 0; });

    syncGameState(roomId, "PLAYING", {
      currentQuestion: firstQuestion,
      answers: {},
      scores: initialScores,
      category: selectedCategory,
      maxRounds: maxRounds,
      roundCount: 1,
    });
    setTimeLeftSec(15);
  };

  const handlePlayerSubmitChoice = (choiceIndex: number) => {
    if (!socket?.id || myAnswer !== undefined || roomState?.state !== "PLAYING") return;
    sfxTap();

    const timeSpent = 15 - timeLeftSec;
    const isCorrect = choiceIndex === currentQuestion?.correctChoiceIndex;

    const newAnswers = {
      ...playerAnswers,
      [socket.id]: { choiceIndex, timeSec: timeSpent },
    };

    const newScores = { ...scores };
    if (isCorrect) {
      const speedBonus = Math.max(5, Math.floor(timeLeftSec * 4));
      newScores[socket.id] = (newScores[socket.id] || 0) + 50 + speedBonus;
      sfxSuccess();
    } else {
      sfxError();
    }

    const totalPlayers = roomState?.players?.length || 1;
    const allAnswered = Object.keys(newAnswers).length >= totalPlayers;

    syncGameState(roomId, allAnswered ? "REVEAL" : "PLAYING", {
      answers: newAnswers,
      scores: newScores,
    });

    if (allAnswered) sfxReveal();
  };

  const handleNextRound = () => {
    sfxTap();
    if (roundCount >= (gameData.maxRounds || 10)) {
      sfxVictory();
      syncGameState(roomId, "SCORES");
    } else {
      const nextQuestion = generateFlagQuestion(gameData.category || "Monde Entier");
      syncGameState(roomId, "PLAYING", {
        currentQuestion: nextQuestion,
        answers: {},
        roundCount: roundCount + 1,
      });
      setTimeLeftSec(15);
    }
  };

  // 1. SALON D'ATTENTE (LOBBY)
  if (roomState?.state === "LOBBY" || !roomState?.state) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-2xl mx-auto relative text-center">
        <LivingBackground accentColor="#06B6D4" />

        <div className="w-full flex items-center justify-between mb-6 z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-lg font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            🌍 Devine le Drapeau En Ligne
          </span>
          <div className="w-16" />
        </div>

        <Card className="w-full p-5 mb-6 bg-surface/90 border-2 border-cyan-500/40 z-10 flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-1">Code du Salon</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white tracking-widest">{roomId}</span>
            <button onClick={handleCopyCode} className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground/70 hover:text-foreground">
              {copiedCode ? <Check size={18} className="text-cyan-400" /> : <Copy size={18} />}
            </button>
          </div>
          <span className="text-[11px] font-bold text-foreground/50 mt-2">Partagez ce code pour jouer au quiz drapeaux sur plusieurs téléphones !</span>
        </Card>

        {isHost && (
          <div className="w-full mb-6 text-left z-10">
            <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-2 block">Catégorie de Drapeaux</label>
            <div className="grid grid-cols-2 gap-2">
              {FLAG_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); sfxTap(); }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs border transition-all ${
                    selectedCategory === cat 
                      ? "bg-cyan-600 text-white border-cyan-400 shadow-[0_4px_0_#155E75]" 
                      : "bg-surface border-white/10 text-foreground/70"
                  }`}
                >
                  {cat}
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
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center text-xs font-black">
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
              <Button variant="primary" className="w-full h-14 text-base gap-2 bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_6px_0_#155E75]" onClick={handleHostStartGame}>
                <Play size={20} /> Lancer le Quiz Drapeaux
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

  // 2. PHASE DE QUIZ SUR CHAGUE TÉLÉPHONE
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
      <LivingBackground accentColor="#06B6D4" />

      <div className="w-full flex items-center justify-between z-10">
        <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>

        <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
          Drapeau {roundCount} / {gameData.maxRounds || 10}
        </span>

        <div className="text-xs font-black text-foreground/80 bg-surface/90 px-3 py-1 rounded-full border border-white/10">
          ⏱️ {timeLeftSec}s
        </div>
      </div>

      <div className="w-full flex flex-col items-center my-auto z-10">
        {currentQuestion?.flag && (
          <div className="w-48 h-32 overflow-hidden rounded-2xl border-4 border-cyan-500/50 shadow-2xl mb-4 bg-black/40 flex items-center justify-center">
            <img src={currentQuestion.flag.flagUrl} alt="Drapeau" className="w-full h-full object-cover" />
          </div>
        )}

        {roomState.state === "REVEAL" && currentQuestion && (
          <div className="bg-surface/90 border-2 border-cyan-500/50 p-4 rounded-2xl w-full max-w-sm mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-1">Pays Exact</span>
            <h2 className="text-xl font-black text-white">{currentQuestion.flag.countryName}</h2>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 z-10">
        {currentQuestion?.choices.map((optName, idx) => {
          const variant = KAHOOT_BUTTON_VARIANTS[idx % 4];
          const isMyChoice = myAnswer?.choiceIndex === idx;
          const isCorrect = roomState.state === "REVEAL" && idx === currentQuestion.correctChoiceIndex;

          return (
            <Button
              key={idx}
              variant={variant}
              disabled={myAnswer !== undefined || roomState.state === "REVEAL"}
              onClick={() => handlePlayerSubmitChoice(idx)}
              className={`h-16 text-left font-black text-base justify-between px-5 ${
                isMyChoice ? 'ring-4 ring-white scale-105' : ''
              } ${isCorrect ? 'ring-4 ring-cyan-400 scale-105' : ''}`}
            >
              <span>{optName}</span>
              {isMyChoice && <Check size={20} className="text-white" />}
            </Button>
          );
        })}
      </div>

      {roomState.state === "REVEAL" && isHost && (
        <div className="w-full max-w-sm z-10">
          <Button variant="primary" className="w-full py-4 text-base bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_6px_0_#155E75]" onClick={handleNextRound}>
            Drapeau Suivant →
          </Button>
        </div>
      )}
    </main>
  );
}
