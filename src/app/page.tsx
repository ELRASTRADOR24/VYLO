"use client";

import { GameCard } from "@/components/game/GameCard";
import { Button } from "@/components/ui/Button";
import { Ghost, Flame, Sword, HelpCircle, Users, QrCode } from "lucide-react";
import Link from "next/link";
import { getGameList } from "@/games";

const GAME_ICONS: Record<string, React.ReactNode> = {
  "undercover": <Ghost className="w-8 h-8" strokeWidth={2.5} />,
  "truth-or-dare": <Flame className="w-8 h-8" strokeWidth={2.5} />,
  "werewolf": <Sword className="w-8 h-8" strokeWidth={2.5} />,
};

export default function Home() {
  const games = getGameList();

  return (
    <main className="flex-1 flex flex-col items-center px-4 pt-10 pb-32">
      <div className="w-full max-w-md flex flex-col mb-8 mt-2">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-5xl font-black tracking-tight text-gradient-summer">
            VYLO
          </h1>
          <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-summer text-white px-2.5 py-1 rounded-full shadow-summer-glow">
            Party App ☀️
          </span>
        </div>
        <p className="text-foreground/70 font-semibold text-sm">Tous vos jeux de soirée réinventés.</p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4 mb-10">
        <Link href="/library" className="w-full">
          <Button variant="primary" className="w-full h-16 text-lg gap-2">
            <Users className="w-5 h-5" />
            Créer une partie
          </Button>
        </Link>
        <Link href="/join" className="w-full">
          <Button variant="surface" className="w-full h-14 text-md gap-2 text-foreground/80">
            <QrCode className="w-5 h-5" />
            Rejoindre avec un code
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Jeux populaires</h2>
          <Link href="/library" className="text-sm font-semibold text-primary hover:underline">Voir tout</Link>
        </div>
        
        {games.slice(0, 3).map(game => (
          <Link key={game.id} href={`/setup/${game.id}`}>
            <GameCard 
              title={game.name}
              description={game.description}
              minPlayers={game.players.min}
              maxPlayers={game.players.max}
              difficulty={game.difficulty}
              themeColor={game.themeColor}
              icon={GAME_ICONS[game.id] || <HelpCircle className="w-8 h-8" />}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}

