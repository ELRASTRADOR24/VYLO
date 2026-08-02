"use client";

import { GameCard } from "@/components/game/GameCard";
import { Ghost, Flame, Sword, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameList } from "@/games";
import { GameConfig } from "@/engine/types";

const FILTERS = ["Tous", "Bluff", "Action", "Humour", "Réflexion", "Créativité", "Social"];

// Mapping des icônes par jeu
const GAME_ICONS: Record<string, React.ReactNode> = {
  "undercover": <Ghost className="w-8 h-8" strokeWidth={2.5} />,
  "truth-or-dare": <Flame className="w-8 h-8" strokeWidth={2.5} />,
  "werewolf": <Sword className="w-8 h-8" strokeWidth={2.5} />,
};

function getGameIcon(gameId: string): React.ReactNode {
  return GAME_ICONS[gameId] || <HelpCircle className="w-8 h-8" strokeWidth={2.5} />;
}

export default function Library() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const allGames = getGameList();

  const filteredGames = activeFilter === "Tous" 
    ? allGames 
    : allGames.filter(g => g.category === activeFilter);

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-10 pb-32 overflow-x-hidden">
      <div className="w-full max-w-md flex flex-col mb-6 mt-2">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
          Bibliothèque
        </h1>
        <p className="text-foreground/50 font-medium">
          {allGames.length} jeux disponibles. Choisissez et jouez !
        </p>
      </div>

      <div className="w-full max-w-md mb-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
        <div className="flex gap-2 w-max">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2.5 rounded-full font-bold text-sm transition-colors shadow-soft whitespace-nowrap active:scale-95",
                activeFilter === filter 
                  ? "bg-foreground text-background"
                  : "bg-surface border border-white/5 text-foreground/70 hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-6">
        {filteredGames.map(game => (
          <Link key={game.id} href={`/play/${game.id}/${Math.floor(100000 + Math.random() * 900000)}`}>
            <GameCard 
              title={game.name}
              description={game.description}
              minPlayers={game.players.min}
              maxPlayers={game.players.max}
              difficulty={game.difficulty}
              themeColor={game.themeColor}
              icon={getGameIcon(game.id)}
            />
          </Link>
        ))}

        {filteredGames.length === 0 && (
          <div className="text-center py-16 text-foreground/40">
            <p className="text-lg font-bold mb-2">Aucun jeu dans cette catégorie</p>
            <p className="text-sm">De nouveaux jeux arrivent bientôt !</p>
          </div>
        )}
      </div>
    </main>
  );
}

