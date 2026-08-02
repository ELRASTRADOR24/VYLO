"use client";

import { use } from "react";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ChevronLeft, Smartphone, Globe, QrCode, ArrowRight, Sparkles } from "lucide-react";
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
    <main className="min-h-screen flex flex-col items-center px-4 pt-8 pb-32 max-w-md mx-auto relative">
      <div className="w-full flex items-center mb-6">
        <button onClick={() => router.back()} className="h-12 w-12 bg-surface rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center font-bold text-lg capitalize">{gameConfig?.name || gameId}</div>
        <div className="h-12 w-12" />
      </div>

      <div className="w-full flex flex-col items-center mb-8 text-center">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-2">Mode de jeu</span>
        <h1 className="text-3xl font-black mb-2 text-foreground">
          Comment voulez-vous jouer ?
        </h1>
        <p className="text-foreground/50 text-sm">
          Choisissez l'expérience adaptée à votre soirée.
        </p>
      </div>

      <div className="w-full flex flex-col gap-5 mb-8">
        {/* MODE LOCAL */}
        <Card 
          className="p-6 flex flex-col gap-4 border-2 border-primary/30 hover:border-primary transition-all cursor-pointer shadow-glow bg-surface-elevated group"
          onClick={handleChooseLocal}
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
              <Smartphone size={30} />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">
              Recommandé en soirée
            </span>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-1 flex items-center gap-2">
              Mode Local <Sparkles size={16} className="text-yellow-400" />
            </h2>
            <p className="text-foreground/60 text-xs leading-relaxed">
              Un seul téléphone passe de main en main autour de la table. Zéro connexion requise, 100% rapide & confidentiel.
            </p>
          </div>

          <Button variant="primary" className="w-full py-4 text-md gap-2 mt-2">
            Lancer le mode local <ArrowRight size={18} />
          </Button>
        </Card>

        {/* MODE ONLINE MULTI-PHONES */}
        <Card 
          className="p-6 flex flex-col gap-4 border border-white/5 hover:border-accent/50 transition-all bg-surface"
        >
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center">
              <Globe size={30} />
            </div>
            <span className="text-xs font-bold text-foreground/40 bg-white/5 px-3 py-1 rounded-full">
              Multijoueur
            </span>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-1">Mode En Ligne</h2>
            <p className="text-foreground/60 text-xs leading-relaxed">
              Chacun joue depuis son propre smartphone via un code à 6 chiffres ou un QR Code.
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
    </main>
  );
}
