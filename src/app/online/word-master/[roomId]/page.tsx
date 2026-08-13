"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/hooks/useSocket";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { 
  ChevronLeft, Users, Play, Check, X, Trophy, 
  Sparkles, Crown, Copy, Send, HelpCircle 
} from "lucide-react";
import { 
  getRandomTabooCard, WORD_MASTER_CATEGORIES, WordMasterCategory, TabooCard, resetWordMasterHistory 
} from "@/games/word-master/logic";
import { sfxTap, sfxSuccess, sfxError, sfxVictory, sfxReveal } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";

export default function OnlineWordMasterGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const router = useRouter();
  const { guestProfile } = useAppStore();
  const { socket, roomState, joinRoom, syncGameState } = useSocket();

  const [selectedTheme, setSelectedTheme] = useState<WordMasterCategory>("Toutes");
  const [clueInput, setClueInput] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (roomId) {
      joinRoom(roomId, "word-master", guestProfile.pseudo, guestProfile.avatar);
    }
  }, [roomId, guestProfile.pseudo, guestProfile.avatar, joinRoom]);

  const isHost = roomState?.players?.find((p) => p.id === socket?.id)?.isHost || false;
  const gameData = roomState?.gameData || {};
  const currentMasterId: string | undefined = gameData.currentMasterId;
  const targetCard: TabooCard | undefined = gameData.targetCard;
  const clues: Record<string, string> = gameData.clues || {};
  const scores: Record<string, number> = gameData.scores || {};
  const roundCount = gameData.roundCount || 1;

  const currentMaster = roomState?.players?.find(p => p.id === currentMasterId);
  const isMaster = socket?.id === currentMasterId;

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
    resetWordMasterHistory();
    const players = roomState?.players || [];
    if (players.length === 0) return;

    const firstMaster = players[Math.floor(Math.random() * players.length)];
    const card = getRandomTabooCard(selectedTheme);

    const initialScores: Record<string, number> = {};
    players.forEach(p => { initialScores[p.id] = 0; });

    syncGameState(roomId, "PLAYING", {
      currentMasterId: firstMaster.id,
      targetCard: card,
      theme: selectedTheme,
      clues: {},
      scores: initialScores,
      roundCount: 1,
    });
  };

  const handleSendClue = () => {
    if (!socket?.id || isMaster || !clueInput.trim() || roomState?.state !== "PLAYING") return;
    sfxTap();

    const newClues = { ...clues, [socket.id]: clueInput.trim() };
    setClueInput("");

    syncGameState(roomId, "PLAYING", { clues: newClues });
  };

  const handleGuessSubmit = (isCorrect: boolean) => {
    if (!isMaster && !isHost) return;

    const newScores = { ...scores };
    if (isCorrect && currentMasterId) {
      sfxSuccess();
      newScores[currentMasterId] = (newScores[currentMasterId] || 0) + 100;
    } else {
      sfxError();
    }

    const players = roomState?.players || [];
    const nextMaster = players[Math.floor(Math.random() * players.length)];
    const nextCard = getRandomTabooCard(gameData.theme || "Toutes");

    syncGameState(roomId, "PLAYING", {
      currentMasterId: nextMaster.id,
      targetCard: nextCard,
      clues: {},
      scores: newScores,
      roundCount: roundCount + 1,
    });
  };

  // 1. LOBBY
  if (roomState?.state === "LOBBY" || !roomState?.state) {
    return (
      <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 max-w-md md:max-w-2xl mx-auto relative text-center">
        <LivingBackground accentColor="#8B5CF6" />

        <div className="w-full flex items-center justify-between mb-6 z-10">
          <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
            <ChevronLeft size={16} className="text-primary" /> Quitter
          </button>
          <span className="text-lg font-black uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
            🔮 Le Maître des Mots En Ligne
          </span>
          <div className="w-16" />
        </div>

        <Card className="w-full p-5 mb-6 bg-surface/90 border-2 border-purple-500/40 z-10 flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1">Code du Salon</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white tracking-widest">{roomId}</span>
            <button onClick={handleCopyCode} className="p-2 rounded-xl bg-white/5 border border-white/10 text-foreground/70 hover:text-foreground">
              {copiedCode ? <Check size={18} className="text-purple-400" /> : <Copy size={18} />}
            </button>
          </div>
          <span className="text-[11px] font-bold text-foreground/50 mt-2">Partagez ce code pour deviner les mots ensemble !</span>
        </Card>

        {isHost && (
          <div className="w-full mb-6 text-left z-10">
            <label className="text-xs font-extrabold uppercase tracking-widest text-foreground/50 mb-2 block">Thématique des Mots</label>
            <div className="grid grid-cols-2 gap-2">
              {WORD_MASTER_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedTheme(cat); sfxTap(); }}
                  className={`py-3 px-3 rounded-2xl font-black text-xs border transition-all ${
                    selectedTheme === cat 
                      ? "bg-purple-600 text-white border-purple-400 shadow-[0_4px_0_#581C87]" 
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
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-xs font-black">
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
              <Button variant="primary" className="w-full h-14 text-base gap-2 bg-purple-600 hover:bg-purple-500 text-white shadow-[0_6px_0_#581C87]" onClick={handleHostStartGame}>
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

  // 2. JEU EN COURS
  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-6 px-4 md:px-8 max-w-md md:max-w-4xl mx-auto text-center relative pb-12">
      <LivingBackground accentColor="#8B5CF6" />

      <div className="w-full flex items-center justify-between z-10">
        <button onClick={handleLeave} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Quitter
        </button>
        <span className="text-xs font-black text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full">
          Maître des Mots : {currentMaster?.name}
        </span>
      </div>

      <div className="w-full my-auto z-10 space-y-4">
        {isMaster ? (
          <Card className="w-full p-6 bg-surface/90 border-2 border-purple-500/40 text-center">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 block mb-1">C'est à toi de deviner !</span>
            <p className="text-sm font-bold text-foreground/60 mb-4">Indices donnés par vos coéquipiers :</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {Object.entries(clues).map(([pId, wordClue]) => (
                <span key={pId} className="px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-black text-sm">
                  {wordClue}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="primary" className="flex-1 py-3 text-sm bg-emerald-600 text-white" onClick={() => handleGuessSubmit(true)}>
                <Check size={18} /> J'ai Trouvé ! (+100 pts)
              </Button>
              <Button variant="surface" className="flex-1 py-3 text-sm text-foreground/60" onClick={() => handleGuessSubmit(false)}>
                <X size={18} /> Mauvais Mot
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="w-full p-6 bg-surface/90 border-2 border-purple-500/40 text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-purple-400 block">Mot à Faire Deviner à {currentMaster?.name}</span>
            <h1 className="text-4xl font-black text-white tracking-wider">{targetCard?.targetWord}</h1>
            
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs font-extrabold text-red-300">
              Mots Interdits : {targetCard?.forbiddenWords.join(", ")}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={clueInput}
                onChange={(e) => setClueInput(e.target.value)}
                placeholder="Votre indice unique..."
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-purple-500"
              />
              <Button variant="primary" className="px-4 bg-purple-600 text-white" onClick={handleSendClue}>
                <Send size={18} />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
