"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, QrCode, ArrowRight, Sparkles, Smartphone, Zap, Users, Heart, Volume2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { VBubble } from "@/components/ui/VBubble";
import { 
  VyloMascot, 
  UndercoverIllustration, 
  BlindTestIllustration,
  TuPreferesIllustration,
  WerewolfIllustration, 
  TodIllustration, 
  SaboteurIllustration 
} from "@/components/illustrations/GameIllustrations";
import { getGameList } from "@/games";
import { voiceEngine } from "@/lib/voiceEngine";
import { sfxTap } from "@/lib/audio";

export default function Home() {
  const router = useRouter();
  const [quickCode, setQuickCode] = useState("");
  const games = getGameList();

  const handleQuickJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim().length === 6) {
      sfxTap();
      router.push(`/online/undercover/${quickCode.trim()}`);
    }
  };

  const handleNarratorSpeak = () => {
    sfxTap();
    voiceEngine.speak("Bienvenue sur VYLO ! Choisis ton jeu et lance une partie en quelques secondes avec tes amis !", { tone: "ANNOUNCEMENT" });
  };

  return (
    <main className="flex-1 flex flex-col items-center px-4 md:px-8 pt-6 md:pt-10 pb-32 max-w-md md:max-w-5xl lg:max-w-6xl mx-auto w-full relative">

      {/* SECTION HERO : "Prêt à jouer ?" avec Mascotte 3D */}
      <div className="w-full bg-surface/90 border border-white/10 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden shadow-2xl animate-fade-up">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex flex-col text-left max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground flex items-center gap-2 mb-2">
              Prêt à jouer ? <span className="text-primary">~</span>
            </h1>
            <p className="text-foreground/70 font-bold text-sm md:text-base mb-6">
              Choisis ton jeu et lance une partie en quelques secondes !
            </p>

            {/* DUAL ACTION CARDS (Lancer une partie & Rejoindre par code) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* Carte 1 : Lancer une partie (Orange Sunset Gradient) */}
              <Link href="/library" className="block group" onClick={() => sfxTap()}>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg group-hover:scale-[1.03] group-hover:shadow-xl transition-all duration-200 flex items-center justify-between relative overflow-hidden active-press">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                      <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-black leading-tight">Lancer une partie</span>
                      <span className="text-[11px] font-semibold opacity-90">Crée ta partie et invite tes amis</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>

              {/* Carte 2 : Rejoindre par code (Electric Royal Blue/Purple Gradient) */}
              <Link href="/join" className="block group" onClick={() => sfxTap()}>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg group-hover:scale-[1.03] group-hover:shadow-xl transition-all duration-200 flex items-center justify-between relative overflow-hidden active-press">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-lg font-black leading-tight">Rejoindre par code</span>
                      <span className="text-[11px] font-semibold opacity-90">Entre un code et rejoins la partie</span>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mascotte Officielle VYLO 3D Mignonne */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <VyloMascot className="w-36 h-36 animate-float" />
          </div>
        </div>
      </div>

      {/* REJOINDRER RAPIDE FORM */}
      <Card className="w-full p-4 mb-10 bg-surface/90 border border-white/10 shadow-soft">
        <form onSubmit={handleQuickJoin} className="flex gap-3 items-center">
          <input
            type="text"
            maxLength={6}
            value={quickCode}
            onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
            placeholder="Saisissez un code de salon (ex: A7K92)..."
            className="flex-1 bg-background border border-white/10 rounded-2xl px-5 py-3 text-xs font-black tracking-widest text-foreground focus:outline-none focus:border-primary uppercase"
          />
          <Button type="submit" variant="primary" className="px-6 py-3 font-black text-xs gap-2 shadow-summer-glow" disabled={quickCode.length !== 6}>
            GO <ArrowRight size={14} />
          </Button>
        </form>
      </Card>

      {/* SECTION "NOS JEUX" AVEC ILLUSTRATIONS 3D ET V-BUBBLE */}
      <div className="w-full flex flex-col gap-4 mb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-primary" /> Nos Jeux
          </h2>
          <Link href="/library" className="text-xs font-black text-primary hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 : Undercover */}
          <Card 
            onClick={() => { sfxTap(); router.push("/setup/undercover"); }}
            className="p-4 flex flex-col gap-3 bg-surface/90 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer group active-press"
          >
            <div className="relative">
              <UndercoverIllustration />
              <div className="absolute top-2.5 right-2.5 z-20">
                <VBubble title="Undercover" description="Infiltrés contre Innocents ! Décrivez votre mot secret sans révéler votre véritable identité." />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-foreground group-hover:text-purple-400 transition-colors">Undercover</span>
              <div className="flex gap-2 text-[10px] font-black uppercase text-foreground/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span>2-20</span>
                <span>•</span>
                <span>30 min</span>
              </div>
            </div>
          </Card>

          {/* Card 2 : Loup-Garou */}
          <Card 
            onClick={() => { sfxTap(); router.push("/setup/werewolf"); }}
            className="p-4 flex flex-col gap-3 bg-surface/90 border border-indigo-500/20 hover:border-indigo-500/50 transition-all cursor-pointer group active-press"
          >
            <div className="relative">
              <WerewolfIllustration />
              <div className="absolute top-2.5 right-2.5 z-20">
                <VBubble title="Loup-Garou" description="Le village se réveille ! Identifiez les loups cachés parmi les villageois avant qu'il ne soit trop tard." />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-foreground group-hover:text-indigo-400 transition-colors">Loup-Garou</span>
              <div className="flex gap-2 text-[10px] font-black uppercase text-foreground/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span>6-20</span>
                <span>•</span>
                <span>30 min</span>
              </div>
            </div>
          </Card>

          {/* Card 3 : Action ou Vérité */}
          <Card 
            onClick={() => { sfxTap(); router.push("/setup/truth-or-dare"); }}
            className="p-4 flex flex-col gap-3 bg-surface/90 border border-orange-500/20 hover:border-orange-500/50 transition-all cursor-pointer group active-press"
          >
            <div className="relative">
              <TodIllustration />
              <div className="absolute top-2.5 right-2.5 z-20">
                <VBubble title="Action ou Vérité" description="Révélez vos pires secrets ou accomplissez des défis déjantés entre amis !" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-foreground group-hover:text-orange-400 transition-colors">Action ou Vérité</span>
              <div className="flex gap-2 text-[10px] font-black uppercase text-foreground/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span>2-20</span>
                <span>•</span>
                <span>30 min</span>
              </div>
            </div>
          </Card>

          {/* Card 5 : Blind Test Musical */}
          <Card 
            onClick={() => { sfxTap(); router.push("/setup/blind-test"); }}
            className="p-4 flex flex-col gap-3 bg-surface/90 border border-pink-500/20 hover:border-pink-500/50 transition-all cursor-pointer group active-press"
          >
            <div className="relative">
              <BlindTestIllustration />
              <div className="absolute top-2.5 right-2.5 z-20">
                <VBubble title="Blind Test Musical" description="Écoutez des extraits officiels de 30s de Rap FR, Latino & Hits et choisissez la bonne réponse en 30s chrono !" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-foreground group-hover:text-pink-400 transition-colors">Blind Test</span>
              <div className="flex gap-2 text-[10px] font-black uppercase text-foreground/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span>2-16</span>
                <span>•</span>
                <span>15 min</span>
              </div>
            </div>
          </Card>

          {/* Card 6 : Tu Préfères ? */}
          <Card 
            onClick={() => { sfxTap(); router.push("/setup/tu-preferes"); }}
            className="p-4 flex flex-col gap-3 bg-surface/90 border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer group active-press"
          >
            <div className="relative">
              <TuPreferesIllustration />
              <div className="absolute top-2.5 right-2.5 z-20">
                <VBubble title="Tu Préfères ?" description="Tranchez des dilemmes absurdes et hilarants entre amis ! Option Rouge vs Option Bleu !" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-foreground group-hover:text-purple-400 transition-colors">Tu Préfères ?</span>
              <div className="flex gap-2 text-[10px] font-black uppercase text-foreground/60 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                <span>2-20</span>
                <span>•</span>
                <span>15 min</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* BANNIÈRE DE FONCTIONNALITÉS EN 4 COLONNES */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card className="p-4 flex items-center gap-3 bg-surface/80 border border-white/5">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Smartphone size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-foreground">1 téléphone</span>
            <span className="text-[10px] font-bold text-foreground/50">Suffit pour jouer</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3 bg-surface/80 border border-white/5">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Zap size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-foreground">Facile à comprendre</span>
            <span className="text-[10px] font-bold text-foreground/50">Aucun texte inutile</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3 bg-surface/80 border border-white/5">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Users size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-foreground">Adapté à tous</span>
            <span className="text-[10px] font-bold text-foreground/50">Toutes les occasions</span>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3 bg-surface/80 border border-white/5">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Heart size={20} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black text-foreground">100% fun</span>
            <span className="text-[10px] font-bold text-foreground/50">Crée des souvenirs !</span>
          </div>
        </Card>
      </div>

      {/* WIDGET NARRATEUR OPTIONNEL AVEC MASCOTTE */}
      <div className="w-full bg-slate-900/90 border border-purple-500/30 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <VyloMascot className="w-14 h-14" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Volume2 size={14} /> Narrateur Optionnel
            </span>
            <p className="text-xs font-semibold text-foreground/80 mt-1">
              "Le narrateur peut donner des conseils courts à la place du texte. Prêt à lancer la partie ?"
            </p>
          </div>
        </div>

        <Button 
          variant="surface" 
          size="sm" 
          onClick={handleNarratorSpeak}
          className="px-5 py-2.5 font-black text-xs gap-2 border border-primary/30 text-primary hover:bg-primary/10 rounded-full"
        >
          <Volume2 size={14} /> Écouter le Narrateur
        </Button>
      </div>

    </main>
  );
}
