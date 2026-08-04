"use client";

import { use } from "react";
import Card from "@/components/ui/Card";
import { ChevronLeft, Smartphone, Globe, QrCode, ArrowRight, Users, Clock, HelpCircle, Target, Zap } from "lucide-react";
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
  "undercover": { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-48 md:h-56" /> },
  "werewolf": { themeColor: "blue", hex: "#2563EB", illustration: <WerewolfIllustration className="w-full h-48 md:h-56" /> },
  "blind-test": { themeColor: "green", hex: "#10B981", illustration: <BlindTestIllustration className="w-full h-48 md:h-56" /> },
  "truth-or-dare": { themeColor: "orange", hex: "#F97316", illustration: <TodIllustration className="w-full h-48 md:h-56" /> },
  "flag-quiz": { themeColor: "yellow", hex: "#FACC15", illustration: <FlagQuizIllustration className="w-full h-48 md:h-56" /> },
  "tu-preferes": { themeColor: "red", hex: "#EF4444", illustration: <TuPreferesIllustration className="w-full h-48 md:h-56" /> },
  "saboteur": { themeColor: "cyan", hex: "#06B6D4", illustration: <SaboteurIllustration className="w-full h-48 md:h-56" /> },
  "word-master": { themeColor: "pink", hex: "#EC4899", illustration: <WordMasterIllustration className="w-full h-48 md:h-56" /> },
  "punchlines": { themeColor: "purple", hex: "#8B5CF6", illustration: <PunchlinesIllustration className="w-full h-48 md:h-56" /> },
  "vylo-party": { themeColor: "pink", hex: "#EC4899", illustration: <VyloPartyIllustration className="w-full h-48 md:h-56" /> },
};

// Guide Débutant Ultra-Clair par Jeu
const HOW_TO_PLAY_MAP: Record<string, { goal: string; steps: string[] }> = {
  "undercover": {
    goal: "Démasquer l'imposteur caché parmi vous ou survivre si vous êtes l'infiltré !",
    steps: [
      "Chaque joueur reçoit un mot secret (les Civils ont le même mot, l'Undercover a un mot très proche, M. White n'a rien).",
      "Donnez un mot-indice à tour de rôle pour prouver que vous connaissez le vrai mot sans trop en dévoiler.",
      "Débattez et votez à la majorité pour éliminer le joueur qui vous semble le plus suspect !"
    ]
  },
  "werewolf": {
    goal: "Les Villageois doivent éliminer les Loups-Garous, et les Loups doivent dévorer le village !",
    steps: [
      "La Nuit tombe : tout le monde ferme les yeux, les Loups-Garous désignent une victime en secret.",
      "Le Jour se lève : le village découvre la victime du matin et lance le débat.",
      "Votez tous ensemble pour éliminer le joueur soupçonné d'être un Loup-Garou !"
    ]
  },
  "blind-test": {
    goal: "Deviner le titre ou l'artiste de chaque extrait musical le plus vite possible !",
    steps: [
      "Écoutez l'extrait audio diffusé par l'application.",
      "Soyez le premier à crier la bonne réponse ou à valider sur votre téléphone.",
      "Marquez des points à chaque bonne réponse pour devenir le roi du Blind Test !"
    ]
  },
  "truth-or-dare": {
    goal: "Révéler vos pires secrets ou réaliser des défis hilarants entre amis !",
    steps: [
      "À votre tour, choisissez entre une Vérité croustillante ou une Action déjantée.",
      "Répondez en toute honnêteté ou accomplissez le défi affiché.",
      "Passez le téléphone au joueur suivant pour faire monter la pression !"
    ]
  },
  "flag-quiz": {
    goal: "Tester vos connaissances géographiques et reconnaître un maximum de drapeaux !",
    steps: [
      "Un drapeau du monde apparaît à l'écran.",
      "Sélectionnez le bon pays parmi les propositions avant la fin du chrono.",
      "Enchaînez les bonnes réponses pour établir le meilleur score !"
    ]
  },
  "tu-preferes": {
    goal: "Faire des choix cornéliens et découvrir les votes surprenants de vos amis !",
    steps: [
      "Deux propositions extrêmes ou absurdes apparaissent à l'écran.",
      "Votez pour votre option préférée (A ou B).",
      "Découvrez les résultats du groupe et débattez sur les choix les plus fous !"
    ]
  },
  "saboteur": {
    goal: "Atteindre le trésor ou tout faire sauter en secret si vous êtes le Saboteur !",
    steps: [
      "Chaque joueur reçoit son rôle secret (Mineur ou Saboteur).",
      "Posez des cartes chemin pour créer une galerie vers l'or ou bloquez vos amis.",
      "Démasquez le Saboteur avant qu'il ne bloque totalement l'accès au trésor !"
    ]
  },
  "word-master": {
    goal: "Faire deviner des mots secrets à votre équipe avec des indices limités !",
    steps: [
      "Le Maître des Mots reçoit une série de mots secrets.",
      "Donnez des indices malins sans prononcer les mots interdits.",
      "Votre équipe doit deviner un maximum de mots avant la fin du temps !"
    ]
  },
  "punchlines": {
    goal: "Compléter des cartes phrases avec les répliques les plus hilarantes !",
    steps: [
      "Une carte question avec un trou est lue à voix haute.",
      "Choisissez votre meilleure carte réponse pour créer la phrase la plus décalée.",
      "Le Maître du Tour élit la combinaison la plus drôle !"
    ]
  },
  "vylo-party": {
    goal: "Relever des gages flash, des vérités piquantes et faire circuler le mobile !",
    steps: [
      "L'application désigne des joueurs au hasard pour des défis ou des duels.",
      "Répondez ou réalisez l'action avant la fin du chrono 5s.",
      "Passez rapidement le téléphone pour enchaîner les tours de soirée !"
    ]
  }
};

export default function GameSetup({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = use(params);
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);

  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const art = GAME_ART_MAP[gameId] || { themeColor: "purple", hex: "#9333EA", illustration: <UndercoverIllustration className="w-full h-48 md:h-56" /> };
  const guide = HOW_TO_PLAY_MAP[gameId] || {
    goal: gameConfig?.description || "Amusez-vous en groupe !",
    steps: [
      "Suivez les instructions sur l'écran.",
      "Prenez des décisions avec vos amis.",
      "Passez un bon moment !"
    ]
  };

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
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <button 
          onClick={() => {
            sfxTap();
            if (typeof window !== "undefined" && window.history.length > 1) router.back();
            else router.push("/library");
          }} 
          className="h-10 px-4 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Retour
        </button>

        <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-primary truncate">
          {gameConfig?.name || gameId}
        </h1>

        <div className="w-20 shrink-0" />
      </div>

      {/* Carte Tarot Vectorielle Héroïque */}
      <div className="w-full max-w-xs mx-auto mb-6 z-10">
        {art.illustration}
      </div>

      {/* ENCART D'EXPLICATIONS ULTRA-CLAIR POUR NOUVEAUX JOUEURS */}
      <div className="w-full mb-6 z-10 text-left">
        <div className="p-5 rounded-3xl bg-surface/95 border-2 border-primary/40 backdrop-blur-xl shadow-2xl space-y-4">
          {/* Le But */}
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
              <Target size={14} /> Le But du jeu
            </span>
            <p className="text-xs font-extrabold text-foreground leading-relaxed">
              {guide.goal}
            </p>
          </div>

          {/* Comment jouer (1, 2, 3) */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-1.5 mb-2.5">
              <Zap size={14} /> Comment jouer (Guide rapide)
            </span>
            <div className="space-y-2">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/40 text-primary font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-foreground/80 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statut Joueurs & Temps */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-extrabold text-foreground/70">
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-primary" /> {gameConfig?.players.min}-{gameConfig?.players.max} Joueurs
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-primary" /> {gameConfig?.durationMins} Mins environ
            </span>
          </div>
        </div>
      </div>

      {/* Titre & Choix du Mode */}
      <div className="w-full flex flex-col gap-4 z-10">
        <h2 className="text-2xl font-black text-foreground tracking-tight">
          Choisissez le mode de jeu
        </h2>

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
              <span className="text-[10px] font-black text-primary uppercase tracking-wider mb-0.5">Pass-and-Play</span>
              <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">1 Seul Téléphone</h3>
              <p className="text-[11px] font-bold text-foreground/50">Le téléphone circule entre les joueurs à tour de rôle.</p>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" size={20} />
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
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider mb-0.5">Multijoueur Web</span>
              <h3 className="text-lg font-black text-foreground group-hover:text-cyan-400 transition-colors">Chacun son Téléphone</h3>
              <p className="text-[11px] font-bold text-foreground/50">Chaque joueur utilise son propre téléphone avec un code de salon.</p>
            </div>
          </div>
          <ArrowRight className="text-foreground/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0" size={20} />
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
