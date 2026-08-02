"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronLeft, Skull, Copy, UserPlus, Play, Check, X, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRandomCard, TodCard } from "@/games/truth-or-dare/logic";
import { sfxTap, sfxSuccess, sfxSuspense, sfxReveal, sfxJoin, sfxSelect } from "@/lib/audio";

import { truthOrDareConfig } from "@/games/truth-or-dare/config";

export default function TruthOrDareGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { 
    gameState, setGameState, players, initGame, 
    addPlayer, removePlayer
  } = useEngineStore();
  const { guestProfile, incrementStat } = useAppStore();
  const router = useRouter();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<TodCard | null>(null);

  // Initialisation du jeu
  useEffect(() => {
    initGame(truthOrDareConfig, "local", roomId);
    addPlayer({ id: "host", name: guestProfile.pseudo, isHost: true, isReady: true, isConnected: true, score: 0 });
  }, [roomId]);

  const playerArray = Object.values(players);

  const handleStartGame = () => {
    if (playerArray.length < 2) return alert("Il faut au moins 2 joueurs !");
    pickNextPlayer();
  };

  const pickNextPlayer = () => {
    const nextIdx = Math.floor(Math.random() * playerArray.length);
    setCurrentPlayerIndex(nextIdx);
    setActiveCard(null);
    sfxSuspense();
    setGameState("START");
  };

  const handleChoice = (type: "TRUTH" | "DARE") => {
    sfxReveal();
    setActiveCard(getRandomCard(type));
    setGameState("PLAYING");
  };

  const handleSuccess = () => {
    sfxSuccess();
    incrementStat("gamesPlayed");
    pickNextPlayer();
  };

  const handleFail = () => {
    sfxTap();
    pickNextPlayer();
  };

  // --- Écran LOBBY ---
  if (gameState === "LOBBY") {
    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto relative">
        <div className="w-full flex items-center mb-10">
          <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center font-bold text-xl">Action ou Vérité</div>
          <div className="h-12 w-12" />
        </div>

        <Card className="w-full p-6 mb-8 text-center bg-surface border border-white/5">
          <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2">Code du salon</p>
          <div className="text-4xl font-extrabold text-primary flex items-center justify-center gap-4">
            {roomId}
            <button className="bg-white/5 p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all">
              <Copy size={20} className="text-white" />
            </button>
          </div>
        </Card>

        <div className="w-full mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
            Joueurs <span className="text-primary">{playerArray.length}/20</span>
          </h2>
          <div className="flex gap-2 mb-6">
            <input 
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Prénom..."
              className="flex-1 bg-surface border-2 border-white/5 rounded-2xl px-4 py-3 focus:border-primary outline-none transition-colors"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && newPlayerName.trim()) {
                  addPlayer({ id: Date.now().toString(), name: newPlayerName.trim(), isHost: false, isReady: true, isConnected: true, score: 0 });
                  setNewPlayerName("");
                }
              }}
            />
            <Button 
              variant="surface" 
              className="px-6 rounded-2xl bg-white/5"
              onClick={() => {
                if (newPlayerName.trim()) {
                  addPlayer({ id: Date.now().toString(), name: newPlayerName.trim(), isHost: false, isReady: true, isConnected: true, score: 0 });
                  setNewPlayerName("");
                }
              }}
            >
              <UserPlus size={20} />
            </Button>
          </div>

          <div className="space-y-2">
            {playerArray.map((p) => (
              <div key={p.id} className="flex justify-between items-center bg-surface p-4 rounded-2xl border border-white/5 shadow-soft">
                <span className="font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  {p.name}
                  {p.isHost && <span className="text-[10px] uppercase bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">Hôte</span>}
                </span>
                {!p.isHost && (
                  <button onClick={() => removePlayer(p.id)} className="text-red-400 p-2 hover:bg-red-400/10 rounded-full">
                    <Skull size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 z-50">
          <div className="max-w-md mx-auto">
            <Button variant="primary" className="w-full h-16 text-lg gap-2" onClick={handleStartGame}>
              <Play size={20} /> Lancer la partie
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // --- Écran START (Tirage au sort) ---
  if (gameState === "START") {
    const currentPlayer = playerArray[currentPlayerIndex];
    
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto relative overflow-hidden">
        <h2 className="text-2xl font-bold text-foreground/50 mb-2">C'est au tour de...</h2>
        <h1 className="text-6xl font-black text-primary mb-16 animate-pulse">
          {currentPlayer?.name}
        </h1>
        
        <div className="w-full grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleChoice("TRUTH")}
            className="flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-3xl p-8 shadow-glow transition-transform active:scale-95 h-48"
          >
            <span className="text-3xl font-black mb-2">Vérité</span>
            <span className="text-white/70 text-sm">Réponds honnêtement</span>
          </button>
          <button 
            onClick={() => handleChoice("DARE")}
            className="flex flex-col items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-3xl p-8 shadow-glow transition-transform active:scale-95 h-48"
          >
            <span className="text-3xl font-black mb-2">Action</span>
            <span className="text-white/70 text-sm">Relève le défi</span>
          </button>
        </div>

        <button onClick={() => setGameState("LOBBY")} className="absolute top-6 left-6 text-foreground/50 flex items-center gap-2">
          <ChevronLeft size={20} /> Quitter
        </button>
      </main>
    );
  }

  // --- Écran PLAYING (Affichage Carte) ---
  if (gameState === "PLAYING" && activeCard) {
    const isTruth = activeCard.type === "TRUTH";
    const currentPlayer = playerArray[currentPlayerIndex];

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <div className="w-full flex items-center justify-between mb-12">
          <span className="font-bold text-foreground/50">{currentPlayer?.name} joue</span>
          <span className="font-bold flex items-center gap-1">
            {Array(activeCard.difficulty).fill("🌶️").join("")}
          </span>
        </div>

        <Card className={`w-full flex flex-col items-center justify-center p-10 min-h-[300px] mb-12 shadow-glow relative overflow-hidden ${isTruth ? 'border-blue-500/50' : 'border-red-500/50'}`}>
          <div className={`absolute inset-0 opacity-10 ${isTruth ? 'bg-blue-500' : 'bg-red-500'}`}></div>
          <span className={`uppercase tracking-widest font-bold text-sm mb-6 ${isTruth ? 'text-blue-400' : 'text-red-400'} relative z-10`}>
            {isTruth ? "Vérité" : "Action"}
          </span>
          <h2 className="text-3xl font-extrabold text-center leading-tight relative z-10">
            {activeCard.text}
          </h2>
        </Card>

        <div className="w-full flex flex-col gap-4">
          <Button variant="primary" className={`w-full py-6 text-xl gap-2 ${isTruth ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`} onClick={handleSuccess}>
            <Check size={24} /> Fait !
          </Button>
          <Button variant="surface" className="w-full py-6 text-xl gap-2 text-foreground/50" onClick={handleFail}>
            <X size={24} /> Refusé
          </Button>
        </div>
      </main>
    );
  }

  return null;
}
