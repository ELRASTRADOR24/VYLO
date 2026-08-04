"use client";

import { use, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, Play, Pause, Check, X, Trophy, 
  Music, Disc, Volume2, Copy, Sparkles, QrCode, Crown
} from "lucide-react";
import { 
  BlindTestCategory, BlindTestQuestion, generateBlindTestQuestion 
} from "@/games/blind-test/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { LobbyQRCodeCard } from "@/components/ui/LobbyQRCodeCard";
import { FloatingEmojis } from "@/components/ui/FloatingEmojis";

const KAHOOT_BUTTON_VARIANTS: ("red" | "blue" | "yellow" | "green")[] = [
  "red", "blue", "yellow", "green"
];

const CATEGORIES: BlindTestCategory[] = [
  "Tous",
  "Hits & Rap Français",
  "Musique Espagnole & Latino",
  "Pop International",
  "Films & Dessins Animés"
];

export default function OnlineBlindTestGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { socket, roomState, joinRoom, syncGameState } = useSocket();

  const [selectedCategory, setSelectedCategory] = useState<BlindTestCategory>("Films & Dessins Animés");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [copiedCode, setCopiedCode] = useState(false);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(30);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialisation et connexion Socket.IO à la room
  useEffect(() => {
    if (roomId) {
      joinRoom(roomId, "blind-test", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  // Synchronisation du chronomètre de 30 secondes en mode de jeu
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

  // Lecture de l'extrait audio lors du changement de question
  useEffect(() => {
    const previewUrl = roomState?.gameData?.currentQuestion?.track?.previewUrl;
    if (roomState?.state === "PLAYING" && previewUrl && audioRef.current) {
      audioRef.current.src = previewUrl;
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch((err) => {
        console.warn("Autoplay audio bloqué par le navigateur:", err);
        setIsPlayingAudio(false);
      });
    } else if (roomState?.state === "REVEAL" && audioRef.current) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  }, [roomState?.state, roomState?.gameData?.currentQuestion?.track?.previewUrl]);

  const toggleManualAudioPlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(console.error);
    } else {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    }
  };

  const isHost = roomState?.players?.find((p) => p.id === socket?.id)?.isHost || false;
  const gameData = roomState?.gameData || {};
  const currentQuestion: BlindTestQuestion | undefined = gameData.currentQuestion;
  const playerAnswers: Record<string, { choiceIndex: number; timeSec: number }> = gameData.answers || {};
  const scores: Record<string, number> = gameData.scores || {};
  const roundCount = gameData.roundCount || 1;

  const handleCopyCode = () => {
    sfxTap();
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleLeave = () => {
    sfxTap();
    if (audioRef.current) audioRef.current.pause();
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/library");
  };

  // Lancement de la première question par l'Hôte
  const handleHostStartGame = async () => {
    sfxTap();
    const firstQuestion = await generateBlindTestQuestion(selectedCategory);
    
    // Initialiser les scores des joueurs présents
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
    setTimeLeftSec(30);
  };

  // Soumission de la réponse d'un joueur
  const handlePlayerSubmitChoice = (choiceIndex: number) => {
    if (!socket?.id || playerAnswers[socket.id] !== undefined || roomState?.state !== "PLAYING") return;
    sfxTap();

    const timeSpent = 30 - timeLeftSec;
    const isCorrect = choiceIndex === currentQuestion?.correctChoiceIndex;

    const newAnswers = {
      ...playerAnswers,
      [socket.id]: { choiceIndex, timeSec: timeSpent },
    };

    const newScores = { ...scores };
    if (isCorrect) {
      const speedBonus = Math.max(10, Math.floor(timeLeftSec * 3));
      newScores[socket.id] = (newScores[socket.id] || 0) + 50 + speedBonus;
      sfxSuccess();
    } else {
      sfxError();
    }

    // Vérifier si tous les joueurs ont répondu
    const totalPlayers = roomState?.players?.length || 1;
    const allAnswered = Object.keys(newAnswers).length >= totalPlayers;

    syncGameState(roomId, allAnswered ? "REVEAL" : "PLAYING", {
      answers: newAnswers,
      scores: newScores,
    });

    if (allAnswered) sfxReveal();
  };

  // Passation à la question suivante par l'Hôte
  const handleNextRound = async () => {
    sfxTap();
    if (roundCount >= (gameData.maxRounds || 10)) {
      sfxVictory();
      syncGameState(roomId, "SCORES");
    } else {
      const nextQuestion = await generateBlindTestQuestion(gameData.category || "Tous");
      syncGameState(roomId, "PLAYING", {
        currentQuestion: nextQuestion,
        answers: {},
        roundCount: roundCount + 1,
      });
      setTimeLeftSec(30);
    }
  };

  // 1. SALON D'ATTENTE EN LIGNE (LOBBY)
  if (roomState?.state === "LOBBY" || !roomState?.state) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-2xl mx-auto relative text-center">
        <LivingBackground accentColor="#10B981" />

        {/* Header Navigation */}
        <div className="w-full flex items-center justify-between mb-6 z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>

          <span className="text-lg font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Music size={18} /> Blind Test En Ligne
          </span>
          <div className="w-16" />
        </div>

        {/* Code de Salon & QR Code Interactif */}
        <div className="w-full mb-6">
          <LobbyQRCodeCard roomCode={roomId} />
        </div>

        {/* Paramètres par l'Hôte */}
        {isHost && (
          <div className="w-full mb-6 text-left z-10 space-y-4">
            <div>
              <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-2 block">Catégorie Musicale</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); sfxTap(); }}
                    className={`py-3 px-3 rounded-2xl font-black text-xs border transition-all ${
                      selectedCategory === cat 
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-[0_4px_0_#064E3B]" 
                        : "bg-surface border-white/10 text-foreground/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Liste des Joueurs Connectés */}
        <div className="w-full mb-8 text-left z-10">
          <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-3 block">
            Joueurs Connectés ({roomState?.players?.length || 1})
          </label>
          <div className="space-y-2">
            {(roomState?.players || []).map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-surface/90 p-3.5 rounded-2xl border border-white/10">
                <span className="font-extrabold text-sm flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-xs font-black">
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

        {/* Bouton Lancement */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 border-t border-white/10 z-50">
          <div className="max-w-md mx-auto">
            {isHost ? (
              <Button variant="primary" className="w-full h-14 text-base gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#064E3B]" onClick={handleHostStartGame}>
                <Play size={20} /> Lancer le Blind Test En Ligne
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

  // 2. PHASE DE JEU MULTIJOUEUR (CHOIX SUR CHAQUE TÉLÉPHONE)
  const myAnswer = socket?.id ? playerAnswers[socket.id] : undefined;

  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center pb-12 relative">
      <LivingBackground accentColor="#10B981" />

      <audio 
        ref={audioRef} 
        onPlay={() => setIsPlayingAudio(true)}
        onPause={() => setIsPlayingAudio(false)}
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* Header Statut */}
      <div className="w-full flex items-center justify-between z-10">
        <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>

        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
          Tour {roundCount} / {gameData.maxRounds || 10}
        </span>

        <div className="text-xs font-black text-foreground/80 bg-surface/90 px-3 py-1 rounded-full border border-white/10">
          ⏱️ {timeLeftSec}s
        </div>
      </div>

      {/* Visuel Extrait Musical & Contrôle Tactile */}
      <div className="w-full flex flex-col items-center my-auto z-10">
        <button 
          onClick={toggleManualAudioPlay}
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-4 border-emerald-500/50 flex flex-col items-center justify-center shadow-2xl mb-4 transition-transform active:scale-95 cursor-pointer ${
            isPlayingAudio ? 'animate-spin duration-[4000ms]' : ''
          }`}
        >
          <Disc size={44} className="text-emerald-400 mb-1" />
          <span className="text-[10px] font-black uppercase text-emerald-300">
            {isPlayingAudio ? "En lecture..." : "▶ Ecouter"}
          </span>
        </button>

        {!isPlayingAudio && roomState.state === "PLAYING" && (
          <button 
            onClick={toggleManualAudioPlay}
            className="mb-4 text-xs font-black text-emerald-300 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/30 flex items-center gap-1.5 animate-pulse"
          >
            🔊 Cliquez pour lancer l'extrait audio
          </button>
        )}

        {roomState.state === "REVEAL" && currentQuestion && (
          <div className="bg-surface/90 border-2 border-emerald-500/50 p-5 rounded-3xl w-full max-w-sm mb-4 animate-bounce-in">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block mb-1">Morceau Dévoilé</span>
            <h2 className="text-xl font-black text-white">{currentQuestion.track.trackName}</h2>
            <p className="text-sm font-extrabold text-foreground/70 mt-1">{currentQuestion.track.artistName}</p>
          </div>
        )}
      </div>

      {/* Boutons de Choix 3D sur le téléphone de chaque joueur */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 z-10">
        {currentQuestion?.choices.map((choiceObj, idx) => {
          const variant = KAHOOT_BUTTON_VARIANTS[idx % 4];
          const isMyChoice = myAnswer?.choiceIndex === idx;
          const isCorrect = roomState.state === "REVEAL" && idx === currentQuestion.correctChoiceIndex;

          return (
            <Button
              key={idx}
              variant={variant}
              disabled={myAnswer !== undefined || roomState.state === "REVEAL"}
              onClick={() => handlePlayerSubmitChoice(idx)}
              className={`h-20 text-left font-black normal-case leading-tight justify-between px-5 py-3 ${
                isMyChoice ? 'ring-4 ring-white scale-105' : ''
              } ${isCorrect ? 'ring-4 ring-emerald-400 scale-105' : ''}`}
            >
              <div className="flex flex-col text-left overflow-hidden pr-2">
                <span className="text-sm md:text-base font-black text-white truncate block">
                  {choiceObj.trackName}
                </span>
                <span className="text-[11px] font-bold text-white/80 truncate block mt-0.5">
                  {choiceObj.artistName}
                </span>
              </div>
              {isMyChoice && <Check size={22} className="text-white shrink-0 ml-2" />}
            </Button>
          );
        })}
      </div>

      {/* Révélation et Contrôle Hôte */}
      {roomState.state === "REVEAL" && isHost && (
        <div className="w-full max-w-sm z-10">
          <Button variant="primary" className="w-full py-4 text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_0_#064E3B]" onClick={handleNextRound}>
            Question Suivante →
          </Button>
        </div>
      )}

      {/* 3. CLASSEMENT FINAL SCORES */}
      {roomState.state === "SCORES" && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-4">
            <Trophy size={40} />
          </div>
          <h2 className="text-3xl font-black mb-2">Classement Final !</h2>
          <p className="text-xs font-bold text-foreground/60 mb-6">Scores du salon :</p>

          <Card className="w-full max-w-sm p-6 mb-6 space-y-3">
            {(roomState.players || [])
              .sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))
              .map((p, idx) => (
                <div key={p.id} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                  <span className="font-extrabold text-sm text-white">#{idx + 1} {p.name}</span>
                  <span className="font-black text-emerald-400">{scores[p.id] || 0} pts</span>
                </div>
              ))}
          </Card>

          {isHost && (
            <Button variant="primary" className="w-full max-w-sm py-4 bg-emerald-600 text-white shadow-[0_6px_0_#064E3B]" onClick={() => syncGameState(roomId, "LOBBY")}>
              Rejouer avec le salon
            </Button>
          )}
        </div>
      )}
      {/* Réactions Emojis Flottants en Temps Réel */}
      <FloatingEmojis socket={socket} roomCode={roomId} senderName={guestProfile.pseudo} />
    </main>
  );
}
