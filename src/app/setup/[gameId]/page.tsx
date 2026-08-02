"use client";

import { Button } from "@/components/ui/Button";
import { ChevronLeft, Users, Zap, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Setup() {
  const { gameId } = useParams();
  const router = useRouter();
  
  const [players, setPlayers] = useState(5);
  const [difficulty, setDifficulty] = useState("Moyen");

  const handleCreate = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    router.push(`/lobby/${code}`);
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-8 pb-32">
      <div className="w-full max-w-md flex items-center mb-6">
        <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-md flex flex-col mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground capitalize">
          Configuration
        </h1>
        <p className="text-foreground/50 font-medium">Préparez votre partie de {gameId}</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-8 mb-12">
        {/* Players */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Nombre de joueurs</h2>
          </div>
          <div className="flex items-center justify-between bg-surface p-4 rounded-2xl shadow-soft">
            <button 
              onClick={() => setPlayers(Math.max(3, players - 1))}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl font-bold active:scale-90"
            >-</button>
            <span className="text-2xl font-bold">{players}</span>
            <button 
              onClick={() => setPlayers(Math.min(20, players + 1))}
              className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl font-bold active:scale-90"
            >+</button>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold">Difficulté</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Facile", "Moyen", "Difficile"].map(lvl => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={cn(
                  "py-3 rounded-xl font-bold text-sm transition-colors",
                  difficulty === lvl 
                    ? "bg-primary text-white shadow-soft" 
                    : "bg-surface text-foreground/60"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <Button variant="primary" className="w-full h-16 text-lg" onClick={handleCreate}>
          Créer le salon
        </Button>
      </div>
    </main>
  );
}
