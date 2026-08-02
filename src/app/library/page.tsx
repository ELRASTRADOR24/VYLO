"use client";

import { GameCard } from "@/components/game/GameCard";
import { Ghost, Flame, Sword, HelpCircle, Search, Filter, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameList } from "@/games";

const FILTERS = ["Tous", "Bluff", "Action", "Humour", "Réflexion", "Créativité", "Social"];

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
  const [searchQuery, setSearchQuery] = useState("");
  const allGames = getGameList();

  const filteredGames = allGames.filter(g => {
    const matchesFilter = activeFilter === "Tous" || g.category === activeFilter;
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-8 md:pt-12 pb-32 max-w-md md:max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-2">
            Bibliothèque de Jeux <Sparkles className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-foreground/60 font-semibold text-sm mt-1">
            {allGames.length} jeux prêts à être joués en soirée !
          </p>
        </div>

        {/* Barre de Recherche (Spécial Ordinateur / Tablette) */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un jeu..."
            className="w-full bg-surface border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Filtres par Catégorie */}
      <div className="w-full mb-8 overflow-x-auto no-scrollbar pb-2">
        <div className="flex gap-2 w-max">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-soft whitespace-nowrap active:scale-95",
                activeFilter === filter 
                  ? "bg-gradient-summer text-white font-black shadow-summer-glow"
                  : "bg-surface border border-white/10 text-foreground/70 hover:text-foreground hover:border-white/20"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de Jeux (1 col sur Mobile, 2-3 cols sur Ordinateur) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <Link key={game.id} href={`/setup/${game.id}`} className="transition-all hover:-translate-y-1">
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
          <div className="col-span-full text-center py-20 text-foreground/40">
            <p className="text-lg font-bold mb-2">Aucun jeu ne correspond à votre recherche</p>
            <p className="text-sm">Essayez de modifier vos mots-clés ou vos filtres.</p>
          </div>
        )}
      </div>
    </main>
  );
}
