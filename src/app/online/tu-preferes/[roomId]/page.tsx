"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, Play, Check, X, Trophy, 
  HelpCircle, Infinity as InfinityIcon, Sparkles, Crown, Copy,
  Zap, Brain, Hourglass, Rewind, Eye, Globe, Ghost, Plane, Sun, Shield
} from "lucide-react";
import { 
  TuPreferesCategory, TuPreferesDilemma, TU_PREFERES_CATEGORIES, getRandomDilemma 
} from "@/games/tu-preferes/logic";
import { sfxTap, sfxSuccess, sfxVictory, sfxReveal } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";

const ICON_MAP: Record<string, React.ReactNode> = {
  "zap": <Zap className="w-10 h-10 text-amber-300" strokeWidth={2.5} />,
  "brain": <Brain className="w-10 h-10 text-pink-300" strokeWidth={2.5} />,
  "hourglass": <Hourglass className="w-10 h-10 text-yellow-300" strokeWidth={2.5} />,
  "rewind": <Rewind className="w-10 h-10 text-cyan-300" strokeWidth={2.5} />,
  "ghost": <Ghost className="w-10 h-10 text-purple-300" strokeWidth={2.5} />,
  "plane": <Plane className="w-10 h-10 text-blue-300" strokeWidth={2.5} />,
  "sun": <Sun className="w-10 h-10 text-amber-400" strokeWidth={2.5} />,
  "shield": <Shield className="w-10 h-10 text-emerald-400" strokeWidth={2.5} />,
};

function VisualOptionCard({ 
  type, 
  title, 
  iconKey = "zap", 
  onClick,
  disabled = false,
  selected = false
}: { 
  type: "A" | "B"; 
  title: string; 
  iconKey?: string; 
  onClick: () => void; 
  disabled?: boolean;
  selected?: boolean;
}) {
  const isA = type === "A";
  const iconNode = ICON_MAP[iconKey] || <Sparkles className="w-10 h-10 text-yellow-300" />;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group relative p-5 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl border-4 ${
        selected ? 'ring-4 ring-white scale-105' : ''
      } ${
        isA 
          ? "bg-gradient-to-br from-[#450A0A] via-[#7F1D1D] to-[#450A0A] border-red-500 hover:border-red-400" 
          : "bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] border-blue-500 hover:border-blue-400"
      }`}
    >
      <div className="relative z-10 flex items-center justify-between mb-4 w-full">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs uppercase tracking-widest border-2 ${
          isA ? "bg-red-500/30 border-red-400 text-red-200" : "bg-blue-500/30 border-blue-400 text-blue-200"
        }`}>
          {type}
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 bg-black/40 border-white/20">
          {iconNode}
        </div>
      </div>

      <p className="text-base font-black text-white leading-tight mb-4 relative z-10">{title}</p>

      <div className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center ${
        isA ? "bg-red-600 text-white" : "bg-blue-600 text-white"
      }`}>
        {selected ? "✓ Sélectionné" : `Choisir ${type}`}
      </div>
    </button>
  );
}

export default function OnlineTuPreferesGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { socket, roomState, joinRoom, syncGameState } = useSocket();

  const [selectedCategory, setSelectedCategory] = useState<TuPreferesCategory>("Toutes");
  const [maxRounds, setMaxRounds] = useState<number>(10);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId, "tu-preferes", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  const isHost = roomState?.players?.find((p) => p.id === socket?.id)?.isHost || false;
  const gameData = roomState?.gameData || {};
  const currentDilemma: TuPreferesDilemma | undefined = gameData.currentDilemma;
  const votes: Record<string, "A" | "B"> = gameData.votes || {};
  const scores: Record<string, number> = gameData.scores || {};
  const roundCount = gameData.roundCount || 1;

  const myVote = socket?.id ? votes[socket.id] : undefined;

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
    const firstDilemma = getRandomDilemma(selectedCategory);
    const initialScores: Record<string, number> = {};
    (roomState?.players || []).forEach(p => { initialScores[p.id] = 0; });

    syncGameState(roomId, "PLAYING", {
      currentDilemma: firstDilemma,
      votes: {},
      scores: initialScores,
      category: selectedCategory,
      maxRounds: maxRounds,
      roundCount: 1,
    });
  };

  const handleVote = (choice: "A" | "B") => {
    if (!socket?.id || myVote !== undefined || roomState?.state !== "PLAYING") return;
    sfxSuccess();

    const newVotes = { ...votes, [socket.id]: choice };
    const totalPlayers = roomState?.players?.length || 1;
    const allVoted = Object.keys(newVotes).length >= totalPlayers;

    const newScores = { ...scores };
    if (allVoted) {
      sfxReveal();
      const countA = Object.values(newVotes).filter(v => v === "A").length;
      const countB = Object.values(newVotes).filter(v => v === "B").length;
      const majorityChoice = countA >= countB ? "A" : "B";

      Object.entries(newVotes).forEach(([pId, voteChoice]) => {
        if (voteChoice === majorityChoice) {
          newScores[pId] = (newScores[pId] || 0) + 50;
        }
      });
    }

    syncGameState(roomId, allVoted ? "REVEAL" : "PLAYING", {
      votes: newVotes,
      scores: newScores,
    });
  };

  const handleNextRound = () => {
    sfxTap();
    if (roundCount >= (gameData.maxRounds || 10)) {
      sfxVictory();
      syncGameState(roomId, "SCORES");
    } else {
      const nextDilemma = getRandomDilemma(gameData.category || "Toutes");
      syncGameState(roomId, "PLAYING", {
        currentDilemma: nextDilemma,
        votes: {},
        roundCount: roundCount + 1,
      });
    }
  };

  // 1. SALON D'ATTENTE (LOBBY)
  if (roomState?.state === "LOBBY" || !roomState?.state) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-2xl mx-auto relative text-center">
        <LivingBackground accentColor="#3B82F6" />

        <div className="w-full flex items-center justify-between mb-6 z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-lg font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            🤔 Tu Préfères ? En Ligne
          </span>
          <div className="w-16" />
        </div>

        <Card className="w-full p-5 mb-6 bg-surface/90 border-2 border-blue-500/40 z-10 flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Code du Salon</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white tracking-widest">{roomId}</span>
            <button onClick={handleCopyCode} className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground/70 hover:text-foreground">
              {copiedCode ? <Check size={18} className="text-blue-400" /> : <Copy size={18} />}
            </button>
          </div>
          <span className="text-[11px] font-bold text-foreground/50 mt-2">Partagez ce code pour voter sur plusieurs téléphones !</span>
        </Card>

        {isHost && (
          <div className="w-full mb-6 text-left z-10">
            <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-2 block">Thématique des Dilemmes</label>
            <div className="grid grid-cols-2 gap-2">
              {TU_PREFERES_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); sfxTap(); }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs border transition-all ${
                    selectedCategory === cat 
                      ? "bg-blue-600 text-white border-blue-400 shadow-[0_4px_0_#1E3A8A]" 
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
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center justify-center text-xs font-black">
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
              <Button variant="primary" className="w-full h-14 text-base gap-2 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_6px_0_#1E3A8A]" onClick={handleHostStartGame}>
                <Play size={20} /> Lancer le Jeu En Ligne
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

  // 2. PHASE DE VOTE EN LIGNE
  if (roomState?.state === "PLAYING" && currentDilemma) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
        <LivingBackground accentColor="#3B82F6" />

        <div className="w-full flex items-center justify-between z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
            Dilemme {roundCount} / {gameData.maxRounds || 10}
          </span>
        </div>

        <div className="w-full my-auto z-10 space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-foreground/50">
            Faites votre choix secret sur votre téléphone :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <VisualOptionCard
              type="A"
              title={currentDilemma.optionA}
              iconKey={currentDilemma.iconA}
              selected={myVote === "A"}
              disabled={myVote !== undefined}
              onClick={() => handleVote("A")}
            />
            <VisualOptionCard
              type="B"
              title={currentDilemma.optionB}
              iconKey={currentDilemma.iconB}
              selected={myVote === "B"}
              disabled={myVote !== undefined}
              onClick={() => handleVote("B")}
            />
          </div>
        </div>
      </main>
    );
  }

  // 3. PHASE DE RÉVÉLATION ET POURCENTAGES DU GROUPE
  if (roomState?.state === "REVEAL" && currentDilemma) {
    const totalVotes = Object.keys(votes).length;
    const countA = Object.values(votes).filter(v => v === "A").length;
    const countB = Object.values(votes).filter(v => v === "B").length;

    const percentA = totalVotes > 0 ? Math.round((countA / totalVotes) * 100) : 50;
    const percentB = totalVotes > 0 ? Math.round((countB / totalVotes) * 100) : 50;

    return (
      <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
        <LivingBackground accentColor="#3B82F6" />

        <div className="w-full flex items-center justify-between z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
            Résultats du Salon
          </span>
        </div>

        <div className="w-full my-auto space-y-6 z-10">
          <h2 className="text-2xl font-black text-white">Le Groupe a parlé !</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="p-5 rounded-3xl bg-surface/90 border-2 border-red-500/40 text-left">
              <div className="flex justify-between items-center mb-2 font-black text-red-400 text-sm">
                <span>OPTION A</span>
                <span>{percentA}% ({countA} votes)</span>
              </div>
              <p className="text-base font-bold text-white leading-tight mb-3">{currentDilemma.optionA}</p>
              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${percentA}%` }} />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-surface/90 border-2 border-blue-500/40 text-left">
              <div className="flex justify-between items-center mb-2 font-black text-blue-400 text-sm">
                <span>OPTION B</span>
                <span>{percentB}% ({countB} votes)</span>
              </div>
              <p className="text-base font-bold text-white leading-tight mb-3">{currentDilemma.optionB}</p>
              <div className="w-full h-3 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${percentB}%` }} />
              </div>
            </div>
          </div>
        </div>

        {isHost && (
          <div className="w-full max-w-sm z-10">
            <Button variant="primary" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_6px_0_#1E3A8A]" onClick={handleNextRound}>
              Dilemme Suivant →
            </Button>
          </div>
        )}
      </main>
    );
  }

  return null;
}
