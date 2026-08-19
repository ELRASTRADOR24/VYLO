"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Home, Grid, Clock, Heart, User, Settings, Users, Bell, Plus, Play, RotateCcw, ChevronRight, Sparkles 
} from "lucide-react";
import { LivingBackground } from "@/components/ui/LivingBackground";
import { GameCard3D } from "@/components/ui/GameCard3D";
import { 
  VyloMascot, UndercoverIllustration, WerewolfIllustration, BlindTestIllustration, 
  TodIllustration, FlagQuizIllustration, TuPreferesIllustration, SaboteurIllustration, 
  WordMasterIllustration, PunchlinesIllustration, VyloPartyIllustration, FakeArtistIllustration 
} from "@/components/illustrations/GameIllustrations";
import { sfxTap, sfxSuccess } from "@/lib/audio";

export default function PlayfulPremiumHomePage() {
  const router = useRouter();
  const [ambientColor, setAmbientColor] = useState<string>("#9333EA");
  const [activeTab, setActiveTab] = useState<string>("accueil");

  return (
    <div className="min-h-screen bg-[#0B0914] text-foreground flex flex-col relative overflow-x-hidden font-sans selection:bg-primary/30">
      {/* 1. Arrière-plan Vivant Respirant & Particules */}
      <LivingBackground accentColor={ambientColor} />

      {/* 2. MAIN CONTENT CONTAINER (Pleine largeur avec Header Supérieur) */}
      <main className="w-full flex-1 min-h-screen px-4 md:px-8 pt-6 pb-36 max-w-7xl mx-auto z-10 space-y-10">
        
        {/* Header Bar Top (Groupe Actuel & Cloche Notification) */}
        <div className="w-full flex items-center justify-between gap-4">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-summer flex items-center justify-center text-white font-black text-lg shadow-summer-glow">
              V
            </div>
            <span className="text-xl font-black tracking-widest text-foreground">VYLO</span>
          </div>

          <div className="hidden sm:block" />

          {/* Groupe Pill & Notifications */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-3 px-4 py-2 bg-surface/90 border border-white/10 rounded-full text-xs font-extrabold shadow-soft">
              <span className="text-foreground/50">Groupe actuel</span>
              <span className="text-primary font-black">Soirée entre amis</span>
              <span className="flex items-center gap-1 text-foreground/70 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                <Users size={12} /> 5
              </span>
            </div>

            <button className="w-10 h-10 rounded-full bg-surface/90 border border-white/10 flex items-center justify-center text-foreground hover:bg-white/10 transition-all relative">
              <Bell size={18} />
              <span className="w-2.5 h-2.5 rounded-full bg-primary absolute top-2 right-2 animate-ping" />
            </button>
          </div>
        </div>

        {/* HERO BANNER DE SOIRÉE */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950/90 via-surface to-indigo-950/90 border-2 border-purple-500/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-4 text-center md:text-left max-w-xl z-10">
            <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
              Le meilleur des jeux de groupe.
            </h1>
            <p className="text-base md:text-lg font-bold text-foreground/70">
              En local ou <span className="text-primary font-black">en ligne à distance</span> avec vos amis.
            </p>
            
            <div className="pt-2">
              <button 
                onClick={() => { 
                  sfxSuccess(); 
                  const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
                  router.push(`/lobby/${roomCode}`); 
                }}
                className="h-14 px-8 rounded-2xl bg-gradient-summer text-white font-black text-base shadow-summer-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto md:mx-0 cursor-pointer"
              >
                <Plus size={20} /> Créer une partie
              </button>
            </div>
          </div>

          {/* Composition 3D de Cartes de Jeux Vectorielles Premium */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 shrink-0 flex items-center justify-center select-none">
            {/* Carte arrière gauche (Loup Garou - Bleu) */}
            <div className="absolute -left-3 top-2 w-36 h-48 md:w-40 md:h-52 rounded-2xl bg-gradient-to-br from-blue-900 via-surface to-indigo-950 border-2 border-blue-500/40 shadow-2xl -rotate-12 transform-gpu hover:rotate-0 transition-transform duration-300 flex flex-col items-center justify-center p-3">
              <WerewolfIllustration className="w-16 h-16 md:w-20 md:h-20 mb-2" />
              <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Loup-Garou</span>
            </div>

            {/* Carte arrière droite (Blind Test - Vert) */}
            <div className="absolute -right-3 top-4 w-36 h-48 md:w-40 md:h-52 rounded-2xl bg-gradient-to-br from-emerald-900 via-surface to-teal-950 border-2 border-emerald-500/40 shadow-2xl rotate-12 transform-gpu hover:rotate-0 transition-transform duration-300 flex flex-col items-center justify-center p-3">
              <BlindTestIllustration className="w-16 h-16 md:w-20 md:h-20 mb-2" />
              <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Blind Test</span>
            </div>

            {/* Carte centrale avant (Undercover - Violet) */}
            <div className="absolute z-10 w-40 h-52 md:w-44 md:h-56 rounded-2xl bg-gradient-to-br from-purple-900 via-surface to-pink-950 border-2 border-purple-400 shadow-[0_10px_30px_rgba(147,51,234,0.5)] hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-4">
              <UndercoverIllustration className="w-20 h-20 md:w-24 md:h-24 mb-2" />
              <span className="text-xs font-black text-purple-200 uppercase tracking-widest">Undercover</span>
              <span className="text-[9px] font-extrabold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30 mt-1">Jeu N°1</span>
            </div>
          </div>
        </div>

        {/* SECTION 1 : NOS JEUX PHARES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
              Nos jeux phares
            </h2>
            <button 
              onClick={() => router.push("/library")}
              className="text-xs font-extrabold text-primary hover:text-primary/80 flex items-center gap-1"
            >
              Voir tout <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Undercover (🟣 Purple) */}
            <GameCard3D
              title="UNDERCOVER"
              description="Démasquez l'Undercover et Mr. White qui se cachent parmi les Civils !"
              playersMin={4}
              playersMax={12}
              durationMins={15}
              themeColor="purple"
              accentHex="#9333EA"
              illustration={<UndercoverIllustration />}
              onClick={() => router.push("/setup/undercover")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 2: Loup-Garou (🔵 Blue) */}
            <GameCard3D
              title="LOUP-GAROU"
              description="Le village se réveille... Démasquez les loups-garous avant qu'ils ne dévorent les innocents !"
              playersMin={6}
              playersMax={18}
              durationMins={20}
              themeColor="blue"
              accentHex="#2563EB"
              illustration={<WerewolfIllustration />}
              onClick={() => router.push("/setup/werewolf")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 3: Blind Test (🟢 Green) */}
            <GameCard3D
              title="BLIND TEST"
              description="Testez votre culture musicale ! Écoutez 30s d'extraits officiels et soyez le plus rapide !"
              playersMin={2}
              playersMax={20}
              durationMins={15}
              themeColor="green"
              accentHex="#10B981"
              illustration={<BlindTestIllustration />}
              onClick={() => router.push("/setup/blind-test")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 4: Action ou Vérité (🟠 Orange) */}
            <GameCard3D
              title="ACTION OU VÉRITÉ"
              description="Le jeu classique des secrets et des défis ! Vérité pimentée ou action osée !"
              playersMin={2}
              playersMax={20}
              durationMins={20}
              themeColor="orange"
              accentHex="#F97316"
              illustration={<TodIllustration />}
              onClick={() => router.push("/setup/truth-or-dare")}
              onHover={(hex) => setAmbientColor(hex)}
            />
          </div>
        </div>

        {/* SECTION 2 : AUTRES JEUX */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
              Autres jeux
            </h2>
            <button 
              onClick={() => router.push("/library")}
              className="text-xs font-extrabold text-primary hover:text-primary/80 flex items-center gap-1"
            >
              Voir tout <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card: Faux Artiste (🟢 Emerald) */}
            <GameCard3D
              title="FAUX ARTISTE"
              description="Dessinez le mot secret trait par trait... sans vous faire repérer par le faussaire !"
              playersMin={3}
              playersMax={12}
              durationMins={10}
              themeColor="green"
              accentHex="#10B981"
              illustration={<FakeArtistIllustration />}
              onClick={() => router.push("/setup/fake-artist")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 5: Devine le Drapeau (🟡 Yellow) */}
            <GameCard3D
              title="DEVINE LE DRAPEAU"
              description="Devinez le pays correspondant au drapeau affiché le plus vite possible !"
              playersMin={2}
              playersMax={20}
              durationMins={15}
              themeColor="yellow"
              accentHex="#FACC15"
              illustration={<FlagQuizIllustration />}
              onClick={() => router.push("/setup/flag-quiz")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 6: Tu Préfères (❤️ Red) */}
            <GameCard3D
              title="TU PRÉFÈRES ?"
              description="Tranchez des dilemmes absurdes et hilarants entre amis ! Option A ou Option B ?"
              playersMin={2}
              playersMax={20}
              durationMins={15}
              themeColor="red"
              accentHex="#EF4444"
              illustration={<TuPreferesIllustration />}
              onClick={() => router.push("/setup/tu-preferes")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 7: Le Saboteur (🩵 Cyan) */}
            <GameCard3D
              title="LE SABOTEUR"
              description="Réalisez les défis de la mission tout en découvrant qui fait rater le groupe !"
              playersMin={3}
              playersMax={10}
              durationMins={20}
              themeColor="cyan"
              accentHex="#06B6D4"
              illustration={<SaboteurIllustration />}
              onClick={() => router.push("/setup/saboteur")}
              onHover={(hex) => setAmbientColor(hex)}
            />

            {/* Card 8: Le Maître des Mots (🔷 Pink) */}
            <GameCard3D
              title="MAÎTRE DES MOTS"
              description="Faites deviner le mot secret à votre équipe sans prononcer les 4 mots interdits !"
              playersMin={2}
              playersMax={12}
              durationMins={15}
              themeColor="pink"
              accentHex="#EC4899"
              illustration={<WordMasterIllustration />}
              onClick={() => router.push("/setup/word-master")}
              onHover={(hex) => setAmbientColor(hex)}
            />
          </div>
        </div>

        {/* SECTION 3 : REPRENDRE UNE PARTIE */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            Reprendre une partie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Session 1 */}
            <div className="p-5 rounded-3xl bg-surface/90 border border-purple-500/20 hover:border-purple-500/50 transition-all flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-purple-400">Undercover</span>
                <p className="text-xs text-foreground/50 font-bold">Soirée d'hier • 8/12 joueurs</p>
                <button 
                  onClick={() => router.push("/setup/undercover")}
                  className="mt-2 text-xs font-black text-purple-300 bg-purple-500/20 px-3.5 py-1.5 rounded-full border border-purple-500/30 flex items-center gap-1 hover:bg-purple-500/30 transition-all"
                >
                  <RotateCcw size={12} /> Reprendre
                </button>
              </div>
            </div>

            {/* Session 2 */}
            <div className="p-5 rounded-3xl bg-surface/90 border border-blue-500/20 hover:border-blue-500/50 transition-all flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-blue-400">Loup-Garou</span>
                <p className="text-xs text-foreground/50 font-bold">Vendredi soir • 10/18 joueurs</p>
                <button 
                  onClick={() => router.push("/setup/werewolf")}
                  className="mt-2 text-xs font-black text-blue-300 bg-blue-500/20 px-3.5 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-1 hover:bg-blue-500/30 transition-all"
                >
                  <RotateCcw size={12} /> Reprendre
                </button>
              </div>
            </div>

            {/* Session 3 */}
            <div className="p-5 rounded-3xl bg-surface/90 border border-orange-500/20 hover:border-orange-500/50 transition-all flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-orange-400">Action ou Vérité</span>
                <p className="text-xs text-foreground/50 font-bold">Soirée entre amis • 6/20 joueurs</p>
                <button 
                  onClick={() => router.push("/setup/truth-or-dare")}
                  className="mt-2 text-xs font-black text-orange-300 bg-orange-500/20 px-3.5 py-1.5 rounded-full border border-orange-500/30 flex items-center gap-1 hover:bg-orange-500/30 transition-all"
                >
                  <RotateCcw size={12} /> Reprendre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Encart Indexation Googlebot & Référencement Naturel (SEO) */}
        <section className="w-full mt-16 p-6 rounded-3xl bg-surface/40 border border-white/5 text-left text-xs text-foreground/50 space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            VYLO — Plateforme N°1 de Jeux de Soirée, de Société & de Famille
          </h2>
          <p>
            Bienvenue sur <strong>VYLO</strong>, la référence ultime des jeux d'ambiance, jeux de société et jeux de famille gratuits en ligne et en local. Retrouvez vos jeux favoris directement sur votre smartphone, tablette ou ordinateur sans aucun téléchargement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="font-extrabold text-white mb-1">🕵️‍♂️ Undercover & Le Saboteur en Ligne</h3>
              <p>Infiltrez-vous ou démasquez les imposteurs avec le jeu d'enquête culte Undercover et Le Saboteur en mode multijoueur synchrone.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-white mb-1">🎶 Blind Test Musical & Quiz Drapeaux</h3>
              <p>Testez vos connaissances musicales sur des milliers d'extraits audio synchronisés ou affrontez vos amis dans un duel de culture générale.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-white mb-1">🔥 Action ou Vérité & Tu Préfères ?</h3>
              <p>Relevez des défis déjantés, révélez vos secrets ou votez sur des dilemmes visuels 3D avec des statistiques de groupe en direct.</p>
            </div>
            <div>
              <h3 className="font-extrabold text-white mb-1">🐺 Loup-Garou & Le Maître des Mots</h3>
              <p>Formez votre village, débattez la nuit et faites deviner des mots secrets à vos coéquipiers en temps réel sur smartphone.</p>
            </div>
          </div>
        </section>
      </main>

      {/* 4. MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-surface/95 backdrop-blur-2xl border-t border-white/10 z-50 flex items-center justify-around px-2 shadow-2xl">
        <button 
          onClick={() => { setActiveTab("accueil"); sfxTap(); router.push("/"); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "accueil" ? "text-primary font-black" : "text-foreground/50 font-bold"}`}
        >
          <Home size={22} />
          <span className="text-[10px]">Accueil</span>
        </button>

        <button 
          onClick={() => { setActiveTab("jeux"); sfxTap(); router.push("/library"); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "jeux" ? "text-primary font-black" : "text-foreground/50 font-bold"}`}
        >
          <Grid size={22} />
          <span className="text-[10px]">Jeux</span>
        </button>

        {/* Central Action Button (Créer une partie dans le lobby) */}
        <button 
          onClick={() => { 
            sfxSuccess(); 
            const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
            router.push(`/lobby/${roomCode}`); 
          }}
          className="w-14 h-14 rounded-full bg-gradient-summer flex items-center justify-center text-white font-black text-2xl shadow-summer-glow -translate-y-4 border-4 border-[#0B0914] cursor-pointer"
        >
          +
        </button>

        <button 
          onClick={() => { setActiveTab("parties"); sfxTap(); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "parties" ? "text-primary font-black" : "text-foreground/50 font-bold"}`}
        >
          <Clock size={22} />
          <span className="text-[10px]">Parties</span>
        </button>

        <button 
          onClick={() => { sfxTap(); router.push("/profile"); }}
          className="flex flex-col items-center gap-1 text-foreground/50 font-bold"
        >
          <User size={22} />
          <span className="text-[10px]">Profil</span>
        </button>
      </nav>
    </div>
  );
}
