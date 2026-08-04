"use client";

import { use } from "react";
import Card from "@/components/ui/Card";
import { VBubble } from "@/components/ui/VBubble";
import { ChevronLeft, Smartphone, Globe, QrCode, ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { getGameConfig } from "@/games";
import { sfxTap, sfxSuccess } from "@/lib/audio";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { 
  UndercoverIllustration, WerewolfIllustration, BlindTestIllustration, 
  TodIllustration, FlagQuizIllustration, TuPreferesIllustration, SaboteurIllustration, 
  WordMasterIllustration, PunchlinesIllustration, VyloPartyIllustration 
} from "@/components/illustrations/GameIllustrations";

const GAME_ART_MAP: Record<string, { themeColor: string; hex: string; illustration: React.ReactNode }> = {
  "undercover": { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-44" /> },
  "werewolf": { themeColor: "blue", hex: "#2563EB", illustration: <WerewolfIllustration className="w-full h-44" /> },
  "blind-test": { themeColor: "green", hex: "#10B981", illustration: <BlindTestIllustration className="w-full h-44" /> },
  "truth-or-dare": { themeColor: "orange", hex: "#F97316", illustration: <TodIllustration className="w-full h-44" /> },
  "flag-quiz": { themeColor: "yellow", hex: "#FACC15", illustration: <FlagQuizIllustration className="w-full h-44" /> },
  "tu-preferes": { themeColor: "red", hex: "#EF4444", illustration: <TuPreferesIllustration className="w-full h-44" /> },
  "saboteur": { themeColor: "cyan", hex: "#06B6D4", illustration: <SaboteurIllustration className="w-full h-44" /> },
  "word-master": { themeColor: "pink", hex: "#EC4899", illustration: <WordMasterIllustration className="w-full h-44" /> },
  "punchlines": { themeColor: "purple", hex: "#8B5CF6", illustration: <PunchlinesIllustration className="w-full h-44" /> },
  "vylo-party": { themeColor: "pink", hex: "#EC4899", illustration: <VyloPartyIllustration className="w-full h-44" /> },
};

export default function GameSetup({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const art = GAME_ART_MAP[gameId] || { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-44" /> };

  const handleChooseLocal = () => {
    sfxSuccess();
    router.push(`/play/${gameId}/${roomCode}`);
  };

  const handleChooseOnlineCreate = () => {
    sfxSuccess();
    if (gameId === "undercover") {
      router.push(`/online/undercover/${roomCode}`);
    } else if (gameId === "saboteur") {
      router.push(`/online/saboteur/${roomCode}`);
    } else {
      router.push(`/online/${gameId}/${roomCode}`);
    }
  };

  const handleChooseOnlineJoin = () => {
    sfxTap();
    router.push("/join");
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-32 max-w-md md:max-w-4xl mx-auto relative">
      <LivingBackground accentColor={art.hex} />

      {/* Navigation Header */}
      <div className="w-full flex items-center justify-between mb-6 z-10">
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
            <VBubble title={gameConfig.name} description={gameConfig.description} />
          )}
        </div>
        <div className="w-16" />
      </div>

      {/* Aperçu Carte Tarot Vector */}
      <div className="w-full max-w-sm mb-6 z-10">
        {art.illustration}
      </div>

      <div className="w-full flex flex-col gap-4 z-10">
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Pass-and-Play</span>
                <VBubble title="Pass-and-Play (1 téléphone)" description="Un seul smartphone circule entre les joueurs à tour de rôle pour recevoir les rôles et instructions." />
              </div>
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">Multijoueur Web</span>
                <VBubble title="Multijoueur En Ligne" description="Chaque joueur rejoint la partie sur son propre téléphone en saisissant le code à 6 chiffres." />
              </div>
              <h3 className="text-xl font-black text-foreground group-hover:text-cyan-400 transition-colors">Chacun son Téléphone</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" size={24} />
        </Card>

        {/* REJOINDRE AVEC UN CODE */}
        <button
          onClick={handleChooseOnlineJoin}
          className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-xs font-black text-foreground/70 hover:text-foreground flex items-center justify-center gap-2 transition-all active-press mt-2"
        >
          <QrCode size={16} />
          Vous avez déjà un code ? Rejoindre un salon
        </button>
      </div>
    </main>
  );
}
