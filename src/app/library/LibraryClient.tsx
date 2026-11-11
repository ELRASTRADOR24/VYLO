"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronLeft } from "lucide-react";
import { getGameList } from "@/games";
import { GameCard3D } from "@/components/ui/GameCard3D";
import { getGameVisualMeta } from "@/components/illustrations/GameIllustrations";
import { cn } from "@/lib/utils";
import { sfxTap } from "@/lib/audio";

const FILTERS = ["Tous", "Bluff", "Social", "Créativité"] as const;

export default function LibraryClient() {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const allGames = getGameList();

  const filteredGames = allGames.filter((g) => {
    const matchesFilter = activeFilter === "Tous" || g.category === activeFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      g.name.toLowerCase().includes(query) ||
      g.description.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-8 pb-28 md:pb-16 max-w-6xl mx-auto w-full relative">
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <Link
          href="/"
          prefetch={false}
          onClick={() => sfxTap()}
          className="h-10 px-4 bg-surface border border-border hover:border-[var(--border-strong)] rounded-xl flex items-center gap-1.5 text-xs font-bold text-foreground shadow-sm transition-colors"
        >
          <ChevronLeft size={16} className="text-primary" aria-hidden="true" /> Accueil
        </Link>

        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Tous les jeux ({allGames.length})
        </h1>

        <div className="w-20 hidden sm:block" />
      </div>

      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 z-10">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter === "Tous"
                ? allGames.length
                : allGames.filter((g) => g.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  sfxTap();
                  setActiveFilter(filter);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl font-bold text-xs transition-colors whitespace-nowrap active-press cursor-pointer border",
                  activeFilter === filter
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface border-border text-muted hover:text-foreground hover:border-[var(--border-strong)]"
                )}
              >
                {filter} ({count})
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un jeu..."
            aria-label="Rechercher un jeu"
            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted/70 focus:outline-none focus:border-primary shadow-sm"
          />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 z-10">
        {filteredGames.map((game, idx) => {
          const art = getGameVisualMeta(game.id);
          const modeLabel = game.modes.includes("online") ? "Local & En ligne" : "1 téléphone";

          return (
            <GameCard3D
              key={game.id}
              title={game.name}
              description={game.description}
              playersMin={game.players.min}
              playersMax={game.players.max}
              durationMins={game.durationMins}
              themeColor={art.themeColor}
              modeBadge={`${game.category} · ${modeLabel}`}
              isWip={game.status === "wip"}
              href={`/setup/${game.id}`}
              illustration={art.renderIllustration({ priority: idx < 2, eager: idx >= 2 && idx < 4 })}
            />
          );
        })}

        {filteredGames.length === 0 && (
          <div className="col-span-full text-center py-16 rounded-2xl bg-surface border border-border text-muted">
            <p className="font-display text-lg font-extrabold text-foreground mb-1">
              Aucun jeu trouvé
            </p>
            <p className="text-sm">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          </div>
        )}
      </div>
    </main>
  );
}
