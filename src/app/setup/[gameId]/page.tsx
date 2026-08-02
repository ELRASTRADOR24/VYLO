"use client";

import { use } from "react";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-8 pb-32 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto relative">
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
        <div className="flex-1 text-center font-black text-xl capitalize">{gameConfig?.name || gameId}</div>
        <div className="w-16" />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLONNE GAUCHE (Présentation du Jeu - Spécial Ordinateur) */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Card className="p-6 bg-surface/90 border border-white/10 space-y-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-primary">Guide du Salon</span>
              <span className="text-xs font-bold text-foreground/50">{gameConfig?.players.min}-{gameConfig?.players.max} Joueurs</span>
            </div>

            <h2 className="text-2xl font-black text-gradient-summer">{gameConfig?.name}</h2>
            <p className="text-xs text-foreground/70 font-semibold leading-relaxed">
              {gameConfig?.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-white/5 text-xs font-bold">
              <div className="flex items-center justify-between">
                <span className="text-foreground/50">Difficulté :</span>
                <span className="text-primary font-black uppercase">{gameConfig?.difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/50">Catégorie :</span>
                <span className="text-accent font-black uppercase">{gameConfig?.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/50">Narrateur Vocal :</span>
                <span className="text-purple-400 font-black">Inclus 🎙️</span>
              </div>
            </div>
          </Card>
        </div>

        {/* COLONNE DROITE (Sélection du Mode de Jeu) */}
        <div className="md:col-span-7 flex flex-col gap-5">
          <div className="w-full flex flex-col mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-1">Configuration</span>
            <h1 className="text-2xl md:text-3xl font-black text-foreground">
              Comment voulez-vous jouer ?
            </h1>
            <p className="text-foreground/60 text-xs md:text-sm mt-1">
              Choisissez l'expérience adaptée à votre soirée.
            </p>
          </div>

          {/* MODE LOCAL */}
          <Card 
            className="p-6 flex flex-col gap-4 border border-white/10 hover:border-primary/50 transition-all cursor-pointer shadow-soft group bg-surface/90"
            onClick={handleChooseLocal}
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                <Smartphone size={30} />
              </div>
              <span className="text-xs font-extrabold text-[#FF4757] bg-[#FF4757]/10 border border-[#FF4757]/25 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <Flame size={14} className="text-[#FF4757]" />
                Recommandé en soirée
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black mb-1">
                Mode Local (Passe-Téléphone)
              </h2>
              <p className="text-foreground/70 text-xs leading-relaxed">
                Un seul téléphone tourne autour de la table. Confidentialité totale, rôles secrets et narration vocale automatique.
              </p>
            </div>

            <Button variant="primary" className="w-full py-4 text-md font-black gap-2 mt-2 shadow-summer-glow">
              Lancer le mode local <ArrowRight size={18} />
            </Button>
          </Card>

          {/* MODE ONLINE MULTI-PHONES */}
          <Card 
            className="p-6 flex flex-col gap-4 border border-white/10 hover:border-accent/50 transition-all bg-surface/90 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
                <Globe size={30} />
              </div>
              <span className="text-[11px] font-bold tracking-wider text-foreground/60 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
                Multijoueur Online
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold mb-1">Mode En Ligne (Multi-Téléphones)</h2>
              <p className="text-foreground/70 text-xs leading-relaxed">
                Chaque joueur utilise son propre téléphone connecté en direct via un salon à 6 chiffres ou un QR Code.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <Button variant="surface" className="py-3.5 text-xs font-bold gap-1" onClick={handleChooseOnlineCreate}>
                Créer un salon
              </Button>
              <Button variant="surface" className="py-3.5 text-xs font-bold gap-1" onClick={handleChooseOnlineJoin}>
                <QrCode size={14} /> Rejoindre
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </main>
  );
}
