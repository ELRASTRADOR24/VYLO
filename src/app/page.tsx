"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Ghost, Flame, Sword, HelpCircle, Users, QrCode, Sparkles, Mic, Globe, Zap, ArrowRight, Trophy, Play, Bomb, ShieldAlert } from "lucide-react";
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
    tag: "Defis & Revelations",
    icon: <Flame className="w-8 h-8 text-orange-400" strokeWidth={2.5} />
  }
};

export default function Home() {
  const games = getGameList();
  const router = useRouter();
  const { guestProfile, activeAccount } = useAppStore();
  const stats = guestProfile.stats;
  const [quickCode, setQuickCode] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim().length === 6) {
      router.push(`/online/undercover/${quickCode.trim()}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-4 md:pt-10 pb-32 max-w-md md:max-w-6xl mx-auto relative w-full">
      <ProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Hero Section */}
      <div className="w-full text-center flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
            🧪 Version Bêta V0.9
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full">
            Jeux de Soirée
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gradient-summer mb-2">
          VYLO
        </h1>
        <p className="text-foreground/70 font-bold text-sm md:text-base max-w-lg leading-relaxed">
          L'application ultime pour vos soirées entres amis. Jouez en local sur un téléphone ou en ligne à plusieurs !
        </p>

        {/* 1-Click Primary Action CTA */}
        <div className="w-full max-w-md mt-6 flex flex-col gap-3">
          <Link href="/library" className="w-full">
            <Button variant="primary" size="lg" className="w-full h-16 text-lg font-black gap-3 shadow-summer-glow">
              <Play className="w-6 h-6 fill-white" />
              Lancer une partie
            </Button>
          </Link>

          <Link href="/join" className="w-full">
            <Button variant="surface" className="w-full h-14 text-sm font-black gap-2 text-foreground/90 border border-white/10 hover:border-primary/40">
              <QrCode className="w-5 h-5 text-primary" />
              Rejoindre un salon par Code
            </Button>
          </Link>
        </div>
      </div>

      {/* Formulaire Rejoindre Rapide Desktop/Mobile */}
      <Card className="w-full max-w-md p-4 mb-8 bg-surface/90 border border-white/10 shadow-soft">
        <label className="text-xs font-black uppercase tracking-wider text-foreground/60 flex items-center gap-2 mb-2">
          <Zap size={16} className="text-primary" /> Rejoindre un salon en 1 clic
        </label>
        <form onSubmit={handleQuickJoin} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
            placeholder="Code salon (ex: A7K92)..."
            className="flex-1 bg-background border border-white/10 rounded-xl px-4 py-3 text-xs font-black tracking-widest text-foreground focus:outline-none focus:border-primary uppercase"
          />
          <Button type="submit" variant="primary" size="sm" className="px-4 font-black gap-1" disabled={quickCode.length !== 6}>
            GO <ArrowRight size={14} />
          </Button>
        </form>
      </Card>

      {/* Catalogue de Jeux */}
      <div className="w-full max-w-md md:max-w-6xl flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-primary" /> Sélection des jeux
          </h2>
          <Link href="/library" className="text-xs font-black text-primary hover:underline flex items-center gap-1">
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map(game => {
            const config = GAME_THEME_CLASSES[game.id] || {
              theme: "theme-undercover",
              tag: "Jeux de groupe",
              icon: <HelpCircle className="w-8 h-8 text-primary" />
            };

            return (
              <Link key={game.id} href={`/setup/${game.id}`} className="block">
                <Card className={`p-5 flex flex-col justify-between min-h-[160px] border ${config.theme} relative group transition-all`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-slate-950/40 border border-white/10">
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
                      Jouer <ArrowRight size={14} />
                    </span>
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
