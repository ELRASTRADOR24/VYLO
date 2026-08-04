"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LivingBackground } from "@/components/ui/LivingBackground";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { 
  BookOpen, ShieldAlert, Sparkles, ChevronLeft, Target, Users, CheckCircle2, 
  XCircle, Crown, Eye, Flame, Disc, Flag, HelpCircle, Pickaxe, MessageSquare, Zap
} from "lucide-react";
import { sfxTap } from "@/lib/audio";

interface GameRuleData {
  id: string;
  name: string;
  category: string;
  icon: string;
  themeColor: string;
  accentHex: string;
  goal: string;
  roles?: { title: string; badge: string; desc: string; icon: string }[];
  donts: string[];
}

const GAME_RULES: GameRuleData[] = [
  {
    id: "undercover",
    name: "Undercover",
    category: "Enquête & Bluff",
    icon: "🕵️‍♂️",
    themeColor: "purple",
    accentHex: "#9333EA",
    goal: "Démasquer les imposteurs (Undercovers & Mr. White) cachés parmi les Civils grâce aux mots-indices !",
    roles: [
      { title: "Civils", badge: "Majorité", desc: "Ont tous le même mot secret. Doivent se reconnaître entre eux et éliminer les imposteurs.", icon: "👥" },
      { title: "Undercover", badge: "Imposteur", desc: "A un mot très proche du mot Civil. Doit fondre dans la masse et se faire passer pour un Civil.", icon: "🕵️‍♂️" },
      { title: "Mr. White", badge: "Mystère", desc: "N'a AUCUN mot. Doit deviner le mot des Civils en écoutant leurs indices pour ne pas se faire démasquer.", icon: "🤍" },
      { title: "Le Joker", badge: "Rôle Chaotique", desc: "Gagne en SOLO s'il se fait éliminer au TOUT PREMIER VOTE du Tour 1 en bluffant avec malice !", icon: "🃏" },
      { title: "Le Caméléon", badge: "Rôle Copieur", desc: "N'a pas de mot au début. Il copie secrètement le mot et le camp du premier joueur qui s'exprime.", icon: "🪞" },
      { title: "Double-Agent", badge: "Rôle Piégé", desc: "Connaît le mot Civil, mais s'il est éliminé au vote, il emporte un joueur de son choix dans sa mort !", icon: "💣" }
    ],
    donts: [
      "🚫 Interdiction de donner l'initiale ou d'épeeler le mot lettre par lettre (ex: 'Ça commence par P').",
      "🚫 Interdiction de donner des indices trop évidents ou synonymes directs (ex: dire 'Chat' pour 'Félin').",
      "🚫 Interdiction de regarder l'écran ou la main du voisin pendant la distribution des mots.",
      "🚫 Interdiction pour Mr. White de donner un indice au pif sans avoir attentivement écouté les précédents."
    ]
  },
  {
    id: "werewolf",
    name: "Loup-Garou",
    category: "Rôle Secret & Débat",
    icon: "🐺",
    themeColor: "blue",
    accentHex: "#2563EB",
    goal: "Les Villageois doivent éliminer tous les Loups-Garous le jour, et les Loups doivent dévorer le village la nuit !",
    roles: [
      { title: "Villageois", badge: "Innocent", desc: "Débattent le jour pour démasquer et éliminer les Loups-Garous au vote.", icon: "🧑‍🌾" },
      { title: "Loup-Garou", badge: "Tueur", desc: "Se réveillent la nuit en secret pour désigner une victime à dévorer.", icon: "🐺" },
      { title: "La Voyante", badge: "Spécial", desc: "Découvre le rôle exact d'un joueur chaque nuit.", icon: "🔮" },
      { title: "La Sorcière", badge: "Spécial", desc: "Possède 1 potion de vie (sauve la victime) et 1 potion de mort (élimine un joueur).", icon: "🧪" },
      { title: "Le Chasseur", badge: "Spécial", desc: "S'il meurt, il tire une dernière balle pour éliminer un joueur au choix.", icon: "🏹" }
    ],
    donts: [
      "🚫 Interdiction d'ouvrir les yeux pendant la phase de Nuit quand ce n'est pas votre tour.",
      "🚫 Interdiction de faire du bruit ou des mouvements de bras traîtres pendant la Nuit.",
      "🚫 Interdiction d'évoquer des preuves physiques (ex: 'J'ai entendu son téléphone vibrer à ma gauche')."
    ]
  },
  {
    id: "blind-test",
    name: "Blind Test Musical",
    category: "Musique & Vitesse",
    icon: "🎶",
    themeColor: "green",
    accentHex: "#10B981",
    goal: "Reconnaître le titre ou l'artiste de chaque extrait audio le plus rapidement possible !",
    donts: [
      "🚫 Interdiction de crier la réponse pendant que l'extrait tourne si vous jouez avec les propositions sur téléphone.",
      "🚫 Interdiction d'utiliser Shazam ou des applications de reconnaissance musicale externes !",
      "🚫 Interdiction de couper la musique des autres pendant les 30 secondes d'écoute."
    ]
  },
  {
    id: "truth-or-dare",
    name: "Action ou Vérité",
    category: "Défis & Secrets",
    icon: "🔥",
    themeColor: "orange",
    accentHex: "#F97316",
    goal: "Révéler vos pires secrets ou réaliser des défis déjantés entre amis !",
    donts: [
      "🚫 Interdiction de refuser une Vérité si vous avez choisi d'y répondre.",
      "🚫 Interdiction de proposer des défis dangereux ou irrespectueux envers autrui.",
      "🚫 Ne gâchez pas l'ambiance : assumez vos choix dans la rigolade et le respect !"
    ]
  },
  {
    id: "tu-preferes",
    name: "Tu Préfères ?",
    category: "Dilemmes & Votes",
    icon: "⚖️",
    themeColor: "red",
    accentHex: "#EF4444",
    goal: "Voter pour l'option A ou B et découvrir si vous pensez comme la majorité du groupe !",
    donts: [
      "🚫 Ne cherchez pas d'échappatoire : vous OBLIGÉ de choisir entre Option A ou Option B !",
      "🚫 Ne votez pas en regardant le téléphone du voisin : exprimez votre vrai choix secret."
    ]
  },
  {
    id: "saboteur",
    name: "Le Saboteur",
    category: "Stratégie & Trahison",
    icon: "⛏️",
    themeColor: "cyan",
    accentHex: "#06B6D4",
    goal: "Les Chercheurs d'Or doivent créer un chemin vers le trésor, le Saboteur doit les bloquer !",
    donts: [
      "🚫 Interdiction pour le Saboteur de se révéler trop tôt au Tour 1.",
      "🚫 Ne détruisez pas des cartes sans stratégie : bluffez jusqu'au bout !"
    ]
  }
];

export default function RulesNoticePage() {
  const router = useRouter();
  const [selectedGameId, setSelectedGameId] = useState<string>("undercover");

  const activeGame = GAME_RULES.find(g => g.id === selectedGameId) || GAME_RULES[0];

  return (
    <main className="min-h-screen flex flex-col items-center pt-6 pb-36 px-4 md:px-8 w-full max-w-4xl mx-auto relative">
      <LivingBackground accentColor={activeGame.accentHex} />

      {/* Header Navigation */}
      <div className="w-full flex items-center justify-between mb-8 z-10">
        <button 
          onClick={() => {
            sfxTap();
            if (typeof window !== "undefined" && window.history.length > 1) router.back();
            else router.push("/");
          }} 
          className="h-10 px-4 bg-surface/90 border border-white/10 rounded-full flex items-center gap-1.5 text-xs font-black text-foreground hover:bg-white/10 active:scale-95 transition-all shadow-soft cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Retour
        </button>

        <div className="flex items-center gap-2 text-primary font-black text-xl uppercase tracking-wider">
          <BookOpen size={24} /> Guide & Règles Officiels
        </div>

        <div className="w-20 shrink-0" />
      </div>

      {/* Onglets de Sélection des Jeux */}
      <div className="w-full flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 z-10">
        {GAME_RULES.map((game) => (
          <button
            key={game.id}
            onClick={() => { sfxTap(); setSelectedGameId(game.id); }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all shrink-0 border cursor-pointer ${
              selectedGameId === game.id
                ? "bg-gradient-summer text-white border-white/20 shadow-summer-glow scale-105"
                : "bg-surface/90 border-white/10 text-foreground/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <span>{game.icon}</span>
            <span>{game.name}</span>
          </button>
        ))}
      </div>

      {/* BANNIÈRE EN-TÊTE DU JEU SÉLECTIONNÉ */}
      <Card className="w-full p-6 md:p-8 bg-surface/95 border-2 border-white/10 shadow-2xl mb-6 text-left z-10 relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-white/5 rounded-2xl border border-white/10">{activeGame.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-0.5">
                {activeGame.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">{activeGame.name}</h1>
            </div>
          </div>
          <span className="text-xs font-black uppercase tracking-wider bg-white/10 px-3.5 py-1.5 rounded-full text-foreground/70 border border-white/10">
            Guide Officiel VYLO
          </span>
        </div>

        {/* Le But du Jeu */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <span className="text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5 mb-1">
            <Target size={14} /> Le But du Jeu
          </span>
          <p className="text-sm font-extrabold text-white leading-relaxed">
            {activeGame.goal}
          </p>
        </div>
      </Card>

      {/* SECTION 1 : TOUS LES RÔLES DU JEU (SI DISPONIBLES) */}
      {activeGame.roles && activeGame.roles.length > 0 && (
        <div className="w-full mb-8 z-10 text-left space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wider">
            <Users className="text-primary" size={20} /> Explication des Rôles en Détail
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGame.roles.map((role, idx) => (
              <Card key={idx} className="p-5 bg-surface/90 border border-white/10 shadow-soft hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-black text-base text-white flex items-center gap-2">
                      <span className="text-xl">{role.icon}</span> {role.title}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 px-2.5 py-0.5 rounded-full">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-foreground/70 leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2 : 🚫 CE QU'IL NE FAUT ABSOLUMENT PAS FAIRE (RÈGLES D'OR) */}
      <div className="w-full z-10 text-left space-y-4">
        <h2 className="text-lg font-black text-red-400 flex items-center gap-2 uppercase tracking-wider">
          <ShieldAlert size={20} /> Les Règles d'Or — Ce qu'il ne faut PAS faire !
        </h2>

        <Card className="p-6 bg-red-950/20 border-2 border-red-500/30 text-left space-y-3">
          <p className="text-xs font-black text-red-300 uppercase tracking-widest mb-1">
            ⚠️ Pour ne pas gâcher le jeu et garder le plaisir de la soirée :
          </p>
          <div className="space-y-2.5">
            {activeGame.donts.map((dont, idx) => (
              <div key={idx} className="flex items-start gap-2.5 bg-surface/80 p-3 rounded-2xl border border-red-500/20">
                <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-foreground/90 leading-normal">
                  {dont}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bouton de Lancement */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-2xl border-t border-white/10 z-50">
        <div className="max-w-md mx-auto">
          <Button 
            variant="primary" 
            className="w-full h-14 text-base gap-2 shadow-summer-glow"
            onClick={() => { sfxTap(); router.push(`/setup/${activeGame.id}`); }}
          >
            <Zap size={18} /> Jouer à {activeGame.name} Maintenant
          </Button>
        </div>
      </div>
    </main>
  );
}
