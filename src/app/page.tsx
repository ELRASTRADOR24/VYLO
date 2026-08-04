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
  WordMasterIllustration, PunchlinesIllustration, VyloPartyIllustration 
} from "@/components/illustrations/GameIllustrations";
import { sfxTap, sfxSuccess } from "@/lib/audio";

export default function PlayfulPremiumHomePage() {
  const router = useRouter();
  const [ambientColor, setAmbientColor] = useState<string>("#9333EA");
  const [activeTab, setActiveTab] = useState<string>("accueil");

  return (
    <div className="min-h-screen bg-[#0B0914] text-foreground flex flex-col md:flex-row relative overflow-x-hidden font-sans selection:bg-primary/30">
      {/* 1. Arrière-plan Vivant Respirant & Particules */}
      <LivingBackground accentColor={ambientColor} />

      {/* 2. SIDEBAR LEFT (DESKTOP) */}
      <aside className="hidden md:flex flex-col justify-between w-64 p-6 bg-surface/40 backdrop-blur-2xl border-r border-white/10 z-30 sticky top-0 h-screen">
        <div className="space-y-8">
          {/* Logo VYLO */}
          <div 
            onClick={() => { sfxTap(); router.push("/"); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-summer flex items-center justify-center text-white font-black text-xl shadow-summer-glow group-hover:scale-105 transition-all">
              V
            </div>
            <span className="text-2xl font-black tracking-widest text-foreground group-hover:text-primary transition-colors">
              VYLO
            </span>
          </div>

          {/* Nav Items Principal */}
          <nav className="space-y-2">
            <button
              onClick={() => { setActiveTab("accueil"); sfxTap(); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                activeTab === "accueil"
                  ? "bg-primary text-white shadow-summer-glow scale-[1.02]"
                  : "text-foreground/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Home size={20} /> Accueil
            </button>

            <button
              onClick={() => { setActiveTab("jeux"); sfxTap(); router.push("/library"); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                activeTab === "jeux"
                  ? "bg-primary text-white shadow-summer-glow scale-[1.02]"
                  : "text-foreground/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Grid size={20} /> Tous les jeux
            </button>

            <button
              onClick={() => { setActiveTab("parties"); sfxTap(); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                activeTab === "parties"
                  ? "bg-primary text-white shadow-summer-glow scale-[1.02]"
                  : "text-foreground/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Clock size={20} /> Mes parties
            </button>

            <button
              onClick={() => { setActiveTab("favoris"); sfxTap(); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm transition-all ${
                activeTab === "favoris"
                  ? "bg-primary text-white shadow-summer-glow scale-[1.02]"
                  : "text-foreground/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Heart size={20} /> Favoris
            </button>
          </nav>

          <hr className="border-white/10" />

          {/* Profil & Paramètres */}
          <nav className="space-y-2">
            <button
              onClick={() => { sfxTap(); router.push("/profile"); }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm text-foreground/70 hover:bg-white/5 hover:text-white transition-all"
            >
              <User size={20} /> Profil
            </button>

            <button
              onClick={() => { sfxTap(); }}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-extrabold text-sm text-foreground/70 hover:bg-white/5 hover:text-white transition-all"
            >
              <Settings size={20} /> Paramètres
            </button>
          </nav>
        </div>

        {/* Mascotte VYLO Bot Bottom Left */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-purple-950/60 via-surface/80 to-purple-900/60 border border-purple-500/30 text-center relative overflow-hidden shadow-glow group hover:scale-[1.02] transition-transform cursor-pointer">
          <VyloMascot className="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-xs font-black text-purple-200">Prêt pour une nouvelle partie ?</p>
        </div>
      </aside>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="flex-1 min-h-screen px-4 md:px-10 pt-6 pb-36 max-w-6xl mx-auto z-10 space-y-10">
        
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
              Un seul téléphone, <span className="text-primary font-black">des heures de fun.</span>
            </p>
            
            <div className="pt-2">
              <button 
                onClick={() => { sfxSuccess(); router.push("/setup/undercover"); }}
                className="h-14 px-8 rounded-2xl bg-gradient-summer text-white font-black text-base shadow-summer-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto md:mx-0"
              >
                <Plus size={20} /> Créer une partie
              </button>
            </div>
          </div>

          {/* Illustration visuelle d'ambiance soirée */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl relative shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" 
              alt="Soirée entre amis"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent" />
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

        {/* Central Action Button */}
        <button 
          onClick={() => { sfxSuccess(); router.push("/setup/undercover"); }}
          className="w-14 h-14 rounded-full bg-gradient-summer flex items-center justify-center text-white font-black text-2xl shadow-summer-glow -translate-y-4 border-4 border-[#0B0914]"
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
