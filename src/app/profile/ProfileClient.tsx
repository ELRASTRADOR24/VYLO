"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, Shield, Edit2, Target, Flame, Search, Ghost, Crown, Lock, Camera } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProfileModal } from "@/components/ui/ProfileModal";
import { useAppStore } from "@/store/useAppStore";
import { getUnlockedBadges, BADGES } from "@/lib/badges";

const BADGE_ICONS: Record<string, React.ReactNode> = {
  debutant: <Target size={22} />,
  habitue: <Flame size={22} />,
  detective: <Search size={22} />,
  fantome: <Ghost size={22} />,
  maitre: <Crown size={22} />,
};

export default function ProfileClient() {
  const { guestProfile, activeAccount } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pseudo = mounted ? activeAccount?.username || guestProfile.pseudo : "Invité";
  const avatar = mounted ? guestProfile.avatar : "👻";
  const stats = mounted
    ? guestProfile.stats
    : { gamesPlayed: 0, wins: 0, undercoverWins: 0, civilianWins: 0, totalPlayTimeMins: 0 };

  const unlockedBadges = getUnlockedBadges(stats);
  const lockedBadges = BADGES.filter((b) => !unlockedBadges.includes(b));
  const isCustomImage = avatar.startsWith("http") || avatar.startsWith("data:image");

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-8 md:pt-12 pb-32 max-w-5xl mx-auto w-full">
      <ProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      {/* Header Profil */}
      <div className="w-full flex flex-col items-center mb-10 text-center">
        <div
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-surface bg-[#EEF2FF] flex items-center justify-center text-4xl md:text-5xl font-bold mb-4 shadow-soft relative group cursor-pointer overflow-hidden"
          onClick={() => setIsEditOpen(true)}
        >
          {isCustomImage ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span>{avatar}</span>
          )}

          <div className="absolute inset-0 bg-[#161824]/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={24} className="text-white" />
            <span className="text-xs font-bold text-white mt-1">Modifier</span>
          </div>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
          {pseudo}
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            aria-label="Modifier le profil"
            className="p-2 rounded-full bg-surface-elevated hover:bg-[#E2E5F0] text-primary transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
          </button>
        </h1>
        <p className="text-muted font-bold mt-1 text-sm">
          {unlockedBadges.length > 0 ? unlockedBadges[unlockedBadges.length - 1].name : "Joueur convivial"}
        </p>

        <Button
          variant="surface"
          size="sm"
          className="mt-4 font-bold text-xs gap-2 rounded-full px-5"
          onClick={() => setIsEditOpen(true)}
        >
          <Edit2 size={14} className="text-primary" /> Modifier photo & pseudo
        </Button>
      </div>

      {/* Statistiques & Badges */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
        <div className="md:col-span-5 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold flex items-center gap-2 text-foreground">
            <Trophy className="text-yellow" size={20} aria-hidden="true" /> Vos parties
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center p-6 gap-1.5 text-center bg-surface border border-border shadow-soft">
              <div className="w-10 h-10 rounded-2xl bg-[#FEEBEB] text-[#C22E2E] flex items-center justify-center mb-1">
                <Trophy className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-display text-3xl font-bold text-foreground">{stats.gamesPlayed}</span>
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Parties</span>
            </Card>
            <Card className="flex flex-col items-center justify-center p-6 gap-1.5 text-center bg-surface border border-border shadow-soft">
              <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-1">
                <Star className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-display text-3xl font-bold text-foreground">{stats.wins}</span>
              <span className="text-xs font-bold text-muted uppercase tracking-wider">Victoires</span>
            </Card>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col gap-4">
          <h2 className="font-display text-xl font-bold flex items-center gap-2 text-foreground">
            <Shield className="text-secondary" size={20} aria-hidden="true" /> Badges ({unlockedBadges.length}/{BADGES.length})
          </h2>

          <div className="grid gap-3">
            {unlockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-surface p-4 rounded-3xl flex items-center gap-4 border border-border shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E1F4EC] text-[#226B50] flex items-center justify-center shrink-0">
                  {BADGE_ICONS[badge.id] || <Target size={22} />}
                </div>
                <div className="flex flex-col flex-1 text-left">
                  <span className="font-display font-bold text-base text-foreground">{badge.name}</span>
                  <span className="text-xs text-muted font-semibold">{badge.description}</span>
                </div>
              </div>
            ))}

            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-surface-elevated/60 p-4 rounded-3xl flex items-center gap-4 border border-border opacity-65"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center text-muted shrink-0">
                  <Lock size={18} />
                </div>
                <div className="flex flex-col flex-1 text-left">
                  <span className="font-display font-bold text-base text-foreground">{badge.name}</span>
                  <span className="text-xs text-muted font-semibold">{badge.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
