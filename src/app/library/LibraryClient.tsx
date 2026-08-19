"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ChevronLeft } from "lucide-react";
import { getGameList } from "@/games";
import { GameCard3D } from "@/components/ui/GameCard3D";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { 
  UndercoverIllustration, WerewolfIllustration, BlindTestIllustration, 
  TodIllustration, FlagQuizIllustration, TuPreferesIllustration, SaboteurIllustration, 
  WordMasterIllustration, PunchlinesIllustration, VyloPartyIllustration, FakeArtistIllustration 
} from "@/components/illustrations/GameIllustrations";
import { cn } from "@/lib/utils";

const FILTERS = ["Tous", "Bluff", "Action", "Social", "Quiz", "Créativité & Bluff"];

const GAME_ART_MAP: Record<string, { themeColor: any; hex: string; illustration: React.ReactNode }> = {
  "undercover": { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration /> },
  "fake-artist": { themeColor: "green", hex: "#10B981", illustration: <FakeArtistIllustration /> },
  "werewolf": { themeColor: "blue", hex: "#2563EB", illustration: <WerewolfIllustration /> },
  "blind-test": { themeColor: "green", hex: "#10B981", illustration: <BlindTestIllustration /> },
  "truth-or-dare": { themeColor: "orange", hex: "#F97316", illustration: <TodIllustration /> },
  "flag-quiz": { themeColor: "yellow", hex: "#FACC15", illustration: <FlagQuizIllustration /> },
  "tu-preferes": { themeColor: "red", hex: "#EF4444", illustration: <TuPreferesIllustration /> },
  "saboteur": { themeColor: "cyan", hex: "#06B6D4", illustration: <SaboteurIllustration /> },
  "word-master": { themeColor: "pink", hex: "#EC4899", illustration: <WordMasterIllustration /> },
  "punchlines": { themeColor: "purple", hex: "#8B5CF6", illustration: <PunchlinesIllustration /> },
  "vylo-party": { themeColor: "pink", hex: "#EC4899", illustration: <VyloPartyIllustration /> },
};

export default function LibraryClient() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [ambientColor, setAmbientColor] = useState("#9333EA");
  const allGames = getGameList();

  const filteredGames = allGames.filter(g => {
    const matchesFilter = activeFilter === "Tous" || g.category === activeFilter;
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-10 pb-36 max-w-md md:max-w-6xl mx-auto w-full relative">
      <LivingBackground accentColor={ambientColor} />

      {/* Header Navigation */}
      <div className="w-full flex items-center justify-between mb-6 z-10">
        <button onClick={() => router.push("/")} className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground">
          <ChevronLeft size={16} className="text-primary" /> Accueil
        </button>

        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          Bibliothèque de Jeux <Sparkles className="w-5 h-5 text-primary" />
        </h1>

        <div className="w-16" />
      </div>

      {/* Barre de Recherche & Filtres */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 z-10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full font-black text-xs transition-all shadow-soft whitespace-nowrap active-press",
                activeFilter === filter 
                  ? "bg-gradient-summer text-white shadow-summer-glow"
                  : "bg-surface border border-white/10 text-foreground/70 hover:text-foreground hover:border-white/20"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un jeu..."
            className="w-full bg-surface border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Grille de Cartes Tarot Vector 3D */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 z-10">
        {filteredGames.map(game => {
          const art = GAME_ART_MAP[game.id] || {
            themeColor: "purple",
            hex: "#9333EA",
            illustration: <UndercoverIllustration />
          };

          return (
            <GameCard3D
              key={game.id}
              title={game.name.toUpperCase()}
              description={game.description}
              playersMin={game.players.min}
              playersMax={game.players.max}
              durationMins={game.durationMins}
              themeColor={art.themeColor}
              accentHex={art.hex}
              illustration={art.illustration}
              onClick={() => router.push(`/setup/${game.id}`)}
              onHover={(hex) => setAmbientColor(hex)}
            />
          );
        })}

        {filteredGames.length === 0 && (
          <div className="col-span-full text-center py-20 text-foreground/40">
            <p className="text-lg font-bold mb-2">Aucun jeu ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </main>
  );
}
