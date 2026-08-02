"use client";

import { useState } from "react";
import { Trophy, Star, Shield, Edit2, Target, Flame, Search, Ghost, Crown, Lock, User, Camera } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProfileModal } from "@/components/ui/ProfileModal";
import { useAppStore } from "@/store/useAppStore";
import { getUnlockedBadges, BADGES } from "@/lib/badges";

const BADGE_ICONS: Record<string, React.ReactNode> = {
  debutant: <Target size={24} />,
  habitue: <Flame size={24} />,
  detective: <Search size={24} />,
  fantome: <Ghost size={24} />,
  maitre: <Crown size={24} />,
};

export default function Profile() {
  const { guestProfile } = useAppStore();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const unlockedBadges = getUnlockedBadges(guestProfile.stats);
  const lockedBadges = BADGES.filter(b => !unlockedBadges.includes(b));

  const isCustomImage = guestProfile.avatar.startsWith("http") || guestProfile.avatar.startsWith("data:image");

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-8 md:pt-12 pb-32 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto w-full">
      <ProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Header du Profil */}
      <div className="w-full flex flex-col items-center mb-10 relative text-center">
        <div 
          className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-surface bg-purple-500/20 flex items-center justify-center text-4xl md:text-5xl font-black mb-4 shadow-summer-glow relative group cursor-pointer overflow-hidden"
          onClick={() => setIsEditOpen(true)}
        >
          {isCustomImage ? (
            <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{guestProfile.avatar}</span>
          )}

          <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={28} className="text-white" />
            <span className="text-xs font-black text-white mt-1">Modifier</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center justify-center gap-2">
          {guestProfile.pseudo}
          <button onClick={() => setIsEditOpen(true)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-all">
            <Edit2 size={18} />
          </button>
        </h1>
        <p className="text-foreground/60 font-bold mt-1 text-sm md:text-base">
          {unlockedBadges.length > 0 ? unlockedBadges[unlockedBadges.length - 1].name : "Novice"}
        </p>

        <Button variant="surface" size="sm" className="mt-4 font-black text-xs gap-2 rounded-full px-5 border border-white/10" onClick={() => setIsEditOpen(true)}>
          <Edit2 size={14} className="text-primary" /> Modifier Photo & Pseudo
        </Button>
      </div>

      {/* Grille Responsive Statistiques & Badges */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Colonne Gauche : Cartes Statistiques */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <h2 className="text-xl font-black flex items-center gap-2 mb-1">
            <Trophy className="text-yellow-400" /> Statistiques Générales
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center p-6 gap-2 text-center bg-surface/90 border border-white/10 shadow-soft">
              <Trophy className="w-8 h-8 text-accent mb-1" />
              <span className="text-3xl font-black">{guestProfile.stats.gamesPlayed}</span>
              <span className="text-xs font-black text-foreground/50 uppercase tracking-wider">Parties</span>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 gap-2 text-center bg-surface/90 border border-white/10 shadow-soft">
              <Star className="w-8 h-8 text-yellow-400 mb-1" />
              <span className="text-3xl font-black">{guestProfile.stats.wins}</span>
              <span className="text-xs font-black text-foreground/50 uppercase tracking-wider">Victoires</span>
            </Card>
          </div>
        </div>

        {/* Colonne Droite : Liste des Badges */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <h2 className="text-xl font-black flex items-center gap-2 mb-1">
            <Shield className="text-primary" /> Badges & Succès ({unlockedBadges.length}/{BADGES.length})
          </h2>
          
          <div className="grid gap-3">
            {unlockedBadges.map(badge => (
              <div key={badge.id} className="bg-surface/90 p-4 rounded-2xl flex items-center gap-4 border border-white/10 shadow-soft">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${badge.color}`}>
                  {BADGE_ICONS[badge.id] || <Target size={24} />}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-extrabold text-lg">{badge.name}</span>
                  <span className="text-sm text-foreground/60 font-medium">{badge.description}</span>
                </div>
              </div>
            ))}

            {lockedBadges.map(badge => (
              <div key={badge.id} className="bg-surface/40 p-4 rounded-2xl flex items-center gap-4 border border-white/5 opacity-50 grayscale">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-foreground/40">
                  <Lock size={20} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-extrabold text-lg">{badge.name}</span>
                  <span className="text-sm text-foreground/40 font-medium">{badge.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
