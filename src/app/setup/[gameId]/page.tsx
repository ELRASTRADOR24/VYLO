"use client";

import { use } from "react";
import Card from "@/components/ui/Card";
import { VBubble } from "@/components/ui/VBubble";
import { ChevronLeft, Smartphone, Globe, QrCode, ArrowRight, Users, Clock } from "lucide-react";
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
  "undercover": { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-52 md:h-60" /> },
  "werewolf": { themeColor: "blue", hex: "#2563EB", illustration: <WerewolfIllustration className="w-full h-52 md:h-60" /> },
  "blind-test": { themeColor: "green", hex: "#10B981", illustration: <BlindTestIllustration className="w-full h-52 md:h-60" /> },
  "truth-or-dare": { themeColor: "orange", hex: "#F97316", illustration: <TodIllustration className="w-full h-52 md:h-60" /> },
  "flag-quiz": { themeColor: "yellow", hex: "#FACC15", illustration: <FlagQuizIllustration className="w-full h-52 md:h-60" /> },
  "tu-preferes": { themeColor: "red", hex: "#EF4444", illustration: <TuPreferesIllustration className="w-full h-52 md:h-60" /> },
  "saboteur": { themeColor: "cyan", hex: "#06B6D4", illustration: <SaboteurIllustration className="w-full h-52 md:h-60" /> },
  "word-master": { themeColor: "pink", hex: "#EC4899", illustration: <WordMasterIllustration className="w-full h-52 md:h-60" /> },
  "punchlines": { themeColor: "purple", hex: "#8B5CF6", illustration: <PunchlinesIllustration className="w-full h-52 md:h-60" /> },
  "vylo-party": { themeColor: "pink", hex: "#EC4899", illustration: <VyloPartyIllustration className="w-full h-52 md:h-60" /> },
};

export default function GameSetup({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const art = GAME_ART_MAP[gameId] || { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-52 md:h-60" /> };

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
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-36 max-w-md md:max-w-2xl mx-auto relative text-center">
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

        <div className="flex items-center gap-2 font-black text-xl uppercase tracking-wider text-primary">
          {gameConfig?.name || gameId}
          {gameConfig && (
            <VBubble title={gameConfig.name} description={gameConfig.description} />
          )}
        </div>
        <div className="w-16" />
      </div>

      {/* Aperçu Carte Tarot Vector avec espacement net */}
      <div className="w-full max-w-xs mx-auto mb-6 z-10">
        {art.illustration}
      </div>

      {/* Titre & Badges explicites */}
      <div className="w-full flex flex-col items-center text-center mb-6 z-10">
        <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-2">
          Choisissez le mode de jeu
        </h1>
        <div className="flex items-center justify-center gap-3 text-xs font-extrabold text-foreground/70 bg-surface/80 border border-white/10 px-4 py-1.5 rounded-full shadow-soft">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-primary" /> {gameConfig?.players.min}-{gameConfig?.players.max} Joueurs
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" /> {gameConfig?.durationMins} Mins
          </span>
        </div>
      </div>

      {/* Cartes d'Options Mode de Jeu */}
      <div className="w-full flex flex-col gap-4 z-10">
        {/* MODE LOCAL */}
        <Card 
          onClick={handleChooseLocal}
          className="p-5 cursor-pointer border border-white/10 hover:border-primary/60 transition-all flex items-center justify-between group active-press bg-surface/90 shadow-xl"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 text-primary flex items-center justify-center font-black shrink-0">
              <Smartphone size={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black text-primary uppercase tracking-wider">Pass-and-Play</span>
                <VBubble title="1 Seul Téléphone" description="Un seul smartphone circule entre les joueurs à tour de rôle pour recevoir les rôles et instructions." size="sm" />
              </div>
              <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">1 Seul Téléphone</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
        </Card>

        {/* MODE EN LIGNE */}
        <Card 
          onClick={handleChooseOnlineCreate}
          className="p-5 cursor-pointer border border-white/10 hover:border-cyan-500/60 transition-all flex items-center justify-between group active-press bg-surface/90 shadow-xl"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-black shrink-0">
              <Globe size={24} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">Multijoueur Web</span>
                <VBubble title="Chacun son Téléphone" description="Chaque joueur rejoint la partie sur son propre téléphone en saisissant le code à 6 chiffres." size="sm" />
              </div>
              <h3 className="text-lg font-black text-foreground group-hover:text-cyan-400 transition-colors">Chacun son Téléphone</h3>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" size={20} />
        </Card>

        {/* REJOINDRE AVEC UN CODE */}
        <button
          onClick={handleChooseOnlineJoin}
          className="w-full p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 text-xs font-black text-foreground/70 hover:text-foreground flex items-center justify-center gap-2 transition-all active-press mt-1"
        >
          <QrCode size={16} />
          Vous avez déjà un code ? Rejoindre un salon
        </button>
      </div>
    </main>
  );
}
