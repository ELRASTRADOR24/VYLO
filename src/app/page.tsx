"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { Ghost, Flame, Sword, HelpCircle, QrCode, Sparkles, Zap, ArrowRight, Play, Bomb } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGameList } from "@/games";
import { useAppStore } from "@/store/useAppStore";
import { ProfileModal } from "@/components/ui/ProfileModal";

const GAME_THEME_CLASSES: Record<string, { theme: string; tag: string; icon: React.ReactNode }> = {
  "undercover": {
    theme: "theme-undercover",
    tag: "Bluff & Suspense",
    icon: <Ghost className="w-7 h-7 text-purple-400" strokeWidth={2.5} />
  },
  "saboteur": {
    theme: "theme-saboteur",
    tag: "Trahison & Pièges",
    icon: <Bomb className="w-7 h-7 text-amber-400" strokeWidth={2.5} />
  },
  "werewolf": {
    theme: "theme-werewolf",
    tag: "Nuit & Rôles Secrètes",
    icon: <Sword className="w-7 h-7 text-indigo-400" strokeWidth={2.5} />
  },
  "truth-or-dare": {
    theme: "theme-tod",
    tag: "Défis & Révélations",
    icon: <Flame className="w-7 h-7 text-orange-400" strokeWidth={2.5} />
  }
};

export default function Home() {
  const games = getGameList();
  const router = useRouter();
  const [quickCode, setQuickCode] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim().length === 6) {
      router.push(`/online/undercover/${quickCode.trim()}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-4 md:pt-8 pb-32 max-w-md md:max-w-5xl mx-auto relative w-full">
      <ProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Hero Section Épuré */}
      <div className="w-full text-center flex flex-col items-center mb-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gradient-summer mb-1">
          VYLO
        </h1>
        <p className="text-foreground/70 font-extrabold text-sm max-w-sm">
          L'application ultime pour vos soirées entres amis !
        </p>

        {/* Action Héroïque Principale */}
        <div className="w-full max-w-md mt-5 flex flex-col gap-2.5">
          <Link href="/library" className="w-full">
            <Button variant="primary" size="lg" className="w-full h-16 text-lg font-black gap-3 shadow-summer-glow">
              <Play className="w-6 h-6 fill-white" />
              Lancer une partie
            </Button>
          </Link>

          <Link href="/join" className="w-full">
            <Button variant="surface" className="w-full h-12 text-xs font-black gap-2 text-foreground/90 border border-white/10 hover:border-primary/40">
              <QrCode className="w-4 h-4 text-primary" />
              Rejoindre par Code
            </Button>
          </Link>
        </div>
      </div>

      {/* Formulaire Rejoindre Rapide */}
      <Card className="w-full max-w-md p-3.5 mb-6 bg-surface/90 border border-white/10 shadow-soft">
        <form onSubmit={handleQuickJoin} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
            placeholder="Code salon (ex: A7K92)..."
            className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-2.5 text-xs font-black tracking-widest text-foreground focus:outline-none focus:border-primary uppercase"
          />
          <Button type="submit" variant="primary" size="sm" className="px-4 font-black text-xs gap-1" disabled={quickCode.length !== 6}>
            GO <ArrowRight size={14} />
          </Button>
        </form>
      </Card>

      {/* Cartes de Jeux Épurées & Minimalistes */}
      <div className="w-full max-w-md md:max-w-5xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black flex items-center gap-2 text-foreground">
            <Sparkles className="w-4 h-4 text-primary" /> Vos Jeux
          </h2>
          <Link href="/library" className="text-xs font-black text-primary hover:underline flex items-center gap-1">
            Tout voir <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {games.map(game => {
            const config = GAME_THEME_CLASSES[game.id] || {
              theme: "theme-undercover",
              tag: "Jeux de groupe",
              icon: <HelpCircle className="w-7 h-7 text-primary" />
            };

            return (
              <Link key={game.id} href={`/setup/${game.id}`} className="block">
                <Card className={`p-4 flex items-center justify-between border ${config.theme} relative group transition-all`}>
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-950/40 border border-white/10">
                      {config.icon}
                    </div>
                    
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                          {game.name}
                        </h3>
                        {/* Point d'Interrogation ? avec Tooltip */}
                        <InfoTooltip title={game.name} description={game.description} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">
                        {game.players.min}-{game.players.max} 👥 • ⏱️ {game.durationMins} mins
                      </span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

    </main>
  );
}
