"use client";

import { GameCard } from "@/components/game/GameCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Ghost, Flame, Sword, HelpCircle, Users, QrCode, Sparkles, Mic, Globe, Zap, ArrowRight, ShieldCheck, Award, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGameList } from "@/games";
import { useAppStore } from "@/store/useAppStore";

import { ProfileModal } from "@/components/ui/ProfileModal";

const GAME_ICONS: Record<string, React.ReactNode> = {
  "undercover": <Ghost className="w-8 h-8" strokeWidth={2.5} />,
  "truth-or-dare": <Flame className="w-8 h-8" strokeWidth={2.5} />,
  "werewolf": <Sword className="w-8 h-8" strokeWidth={2.5} />,
};

export default function Home() {
  const games = getGameList();
  const router = useRouter();
  const { guestProfile } = useAppStore();
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
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-12 pb-32 max-w-md md:max-w-6xl mx-auto relative">
      <ProfileModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      {/* Fond Luminescent Flouté pour Ordinateur */}
      <div className="hidden md:block absolute -top-20 -left-20 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute top-1/3 -right-20 w-96 h-96 bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grille Principale (1 col sur Mobile, 2 cols sur Ordinateur) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* COLONNE GAUCHE (Hero & Actions Rapides) */}
        <div className="md:col-span-6 flex flex-col gap-6">
          {/* Header Mobile & Desktop */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[11px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">
                🧪 Version Bêta (V0.9)
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30">
                Jeux de Soirée
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gradient-summer flex items-center gap-3">
              VYLO <span className="text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-xl uppercase tracking-widest align-middle">Bêta</span>
            </h1>
            <p className="text-foreground/70 font-semibold text-sm md:text-base mt-2 leading-relaxed">
              L'application ultime pour animer vos soirées entre amis, en local ou à distance ! (Plateforme en cours de test & développement).
            </p>
          </div>

          {/* Hub des Boutons d'Actions */}
          <div className="flex flex-col gap-3.5">
            <Link href="/library" className="w-full">
              <Button variant="primary" className="w-full h-16 text-lg font-black gap-3 shadow-summer-glow">
                <Users className="w-6 h-6" />
                Créer une partie
              </Button>
            </Link>

            <Link href="/join" className="w-full">
              <Button variant="surface" className="w-full h-14 text-md font-bold gap-3 text-foreground/90 border border-white/10 hover:border-accent/40 transition-all">
                <QrCode className="w-5 h-5 text-accent" />
                Rejoindre avec un code
              </Button>
            </Link>
          </div>

          {/* Formulaire de Connexion Rapide (Spécial Ordinateur) */}
          <Card className="hidden md:flex flex-col gap-3 p-5 bg-surface/90 border border-white/10 shadow-soft">
            <label className="text-xs font-black uppercase tracking-wider text-foreground/60 flex items-center gap-2">
              <Zap size={15} className="text-accent" /> Rejoindre instantanément un salon
            </label>
            <form onSubmit={handleQuickJoin} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                placeholder="Code à 6 chiffres (ex: 979430)..."
                className="flex-1 bg-background/90 border border-white/10 rounded-xl px-4 py-3 text-sm font-black tracking-widest text-foreground focus:outline-none focus:border-primary uppercase"
              />
              <Button type="submit" variant="primary" size="sm" className="px-5 font-black gap-1.5" disabled={quickCode.length !== 6}>
                Rejoindre <ArrowRight size={16} />
              </Button>
            </form>
          </Card>

          {/* Badges de Fonctionnalités Clés (Desktop Dashboard) */}
          <div className="hidden md:grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
                <Mic size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black">Voice Engine</span>
                <span className="text-[10px] text-foreground/50 font-bold">Narrateur Vocal HD</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">
                <Globe size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black">Multijoueur Online</span>
                <span className="text-[10px] text-foreground/50 font-bold">Multi-téléphones</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE (Jeux Populaires & Stats Ordinateur) */}
        <div className="md:col-span-6 flex flex-col gap-6 w-full">
          
          {/* Dashboard Statistiques Joueur (Exclusif Ordinateur) */}
          <Card className="hidden md:block p-6 bg-surface/90 border border-white/10 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                <Trophy size={16} /> Profil & Statistiques
              </span>
              <button onClick={() => setIsEditOpen(true)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-purple-500/20 text-xs flex items-center justify-center font-bold">
                  {guestProfile.avatar.startsWith("http") || guestProfile.avatar.startsWith("data:") ? (
                    <img src={guestProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{guestProfile.avatar}</span>
                  )}
                </div>
                <span className="text-xs font-black text-foreground">{guestProfile.pseudo}</span>
                <span className="text-[10px] text-primary underline">Éditer</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xl font-black text-foreground">{stats.gamesPlayed || 0}</span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase block mt-0.5">Parties</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xl font-black text-amber-400">{stats.wins || 0}</span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase block mt-0.5">Victoires</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-2xl font-black text-cyan-400">
                  {stats.gamesPlayed ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0}%
                </span>
                <span className="text-[10px] text-foreground/50 font-bold uppercase block mt-0.5">Taux de Succès</span>
              </div>
            </div>
          </Card>

          {/* Liste des Jeux Populaires */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Jeux populaires
              </h2>
              <Link href="/library" className="text-xs font-black text-primary hover:underline flex items-center gap-1">
                Voir toute la bibliothèque <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {games.slice(0, 3).map(game => (
                <Link key={game.id} href={`/setup/${game.id}`} className="transition-all hover:scale-[1.01] active:scale-[0.99]">
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
          </div>
        </div>

      </div>
    </main>
  );
}
