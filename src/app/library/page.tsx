"use client";

import { Card } from "@/components/ui/Card";
import { Ghost, Flame, Sword, HelpCircle, Search, Sparkles, ArrowRight, Bomb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getGameList } from "@/games";

const FILTERS = ["Tous", "Bluff", "Action", "Social"];

const GAME_THEME_CLASSES: Record<string, { theme: string; tag: string; icon: React.ReactNode }> = {
  "undercover": {
    theme: "theme-undercover",
    tag: "Bluff & Suspense",
    icon: <Ghost className="w-8 h-8 text-purple-400" strokeWidth={2.5} />
  },
  "saboteur": {
    theme: "theme-saboteur",
    tag: "Trahison & Pièges",
    icon: <Bomb className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
  },
  "werewolf": {
    theme: "theme-werewolf",
    tag: "Nuit & Rôles Secrètes",
    icon: <Sword className="w-8 h-8 text-indigo-400" strokeWidth={2.5} />
  },
  "truth-or-dare": {
    theme: "theme-tod",
    tag: "Défis & Révélations",
    icon: <Flame className="w-8 h-8 text-orange-400" strokeWidth={2.5} />
  }
};

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
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-10 pb-32 max-w-md md:max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-2">
            Bibliothèque de Jeux <Sparkles className="w-6 h-6 text-primary" />
          </h1>
          <p className="text-foreground/60 font-semibold text-xs md:text-sm mt-1">
            {allGames.length} jeux de soirée prêts à être joués !
          </p>
        </div>

        {/* Barre de Recherche */}
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
      <div className="w-full mb-6 overflow-x-auto no-scrollbar pb-1">
        <div className="flex gap-2 w-max">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2.5 rounded-full font-black text-xs transition-all shadow-soft whitespace-nowrap active-press",
                activeFilter === filter 
                  ? "bg-gradient-summer text-white shadow-summer-glow"
                  : "bg-surface border border-white/10 text-foreground/70 hover:text-foreground hover:border-white/20"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de Jeux */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredGames.map(game => {
          const config = GAME_THEME_CLASSES[game.id] || {
            theme: "theme-undercover",
            tag: "Jeux de groupe",
            icon: <HelpCircle className="w-8 h-8 text-primary" />
          };

          return (
            <Link key={game.id} href={`/setup/${game.id}`} className="block">
              <Card className={`p-6 flex flex-col justify-between min-h-[170px] border ${config.theme} relative group transition-all`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-white/10">
                      {config.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60 block">
                        {config.tag}
                      </span>
                      <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors">
                        {game.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-black uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    {game.players.min}-{game.players.max} 👥
                  </span>
                </div>

                <p className="text-xs font-bold text-foreground/75 mt-3 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-[11px] font-black text-foreground/50">⏱️ {game.durationMins} mins</span>
                  <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Lancer le jeu <ArrowRight size={14} />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}

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
