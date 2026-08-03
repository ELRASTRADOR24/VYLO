"use client";

import { use } from "react";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { InfoTooltip } from "@/components/ui/InfoTooltip";
import { ChevronLeft, Smartphone, Globe, QrCode, ArrowRight, Flame, Users, Sparkles, ShieldAlert, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { getGameConfig } from "@/games";
import { sfxTap, sfxSuccess } from "@/lib/audio";

export default function GameSetup({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();

  const handleChooseLocal = () => {
    sfxSuccess();
    router.push(`/play/${gameId}/${roomCode}`);
  };

  const handleChooseOnlineCreate = () => {
    sfxSuccess();
    if (gameId === "undercover") {
      router.push(`/online/undercover/${roomCode}`);
    } else {
      router.push(`/online/${roomCode}`);
    }
  };

  const handleChooseOnlineJoin = () => {
    sfxTap();
    router.push("/join");
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-32 max-w-md md:max-w-4xl mx-auto relative">
      {/* Navigation Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <button 
          onClick={() => {
            sfxTap();
            if (typeof window !== "undefined" && window.history.length > 1) router.back();
            else router.push("/library");
          }} 
          className="h-10 px-3.5 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer z-50"
        >
          <ChevronLeft size={16} className="text-primary" /> Retour
        </button>

        <div className="flex items-center gap-2 font-black text-xl capitalize">
          {gameConfig?.name || gameId}
          {gameConfig && (
            <InfoTooltip title={gameConfig.name} description={gameConfig.description} />
          )}
        </div>
        <div className="w-16" />
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-col text-center mb-2">
          <h1 className="text-3xl font-black text-foreground">
            Choisissez le mode de jeu
          </h1>
          <span className="text-xs font-bold text-foreground/50 mt-1">
            {gameConfig?.players.min}-{gameConfig?.players.max} Joueurs • ⏱️ {gameConfig?.durationMins} Mins
          </span>
        </div>

        {/* MODE LOCAL */}
        <Card 
          onClick={handleChooseLocal}
          className="p-6 cursor-pointer border border-white/10 hover:border-primary/50 transition-all flex items-center justify-between group active-press bg-surface/90"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center font-black">
              <Smartphone size={28} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-primary uppercase tracking-wider">Pass-and-Play</span>
              <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">1 Seul Téléphone</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" size={24} />
        </Card>

        {/* MODE EN LIGNE */}
        <Card 
          onClick={handleChooseOnlineCreate}
          className="p-6 cursor-pointer border border-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-between group active-press bg-surface/90"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-black">
              <Globe size={28} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">Multijoueur Web</span>
              <h3 className="text-xl font-black text-foreground group-hover:text-cyan-400 transition-colors">Chacun son Téléphone</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" size={24} />
        </Card>

        {/* REJOINDRER UN SALON */}
        <Card 
          onClick={handleChooseOnlineJoin}
          className="p-6 cursor-pointer border border-white/10 hover:border-purple-500/50 transition-all flex items-center justify-between group active-press bg-surface/90"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center font-black">
              <QrCode size={28} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-black text-purple-400 uppercase tracking-wider">Rejoindre</span>
              <h3 className="text-xl font-black text-foreground group-hover:text-purple-400 transition-colors">Entrer un Code / QR Code</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" size={24} />
        </Card>
      </div>
    </main>
  );
}
