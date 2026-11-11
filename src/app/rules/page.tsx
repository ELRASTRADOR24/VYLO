"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LivingBackground } from "@/components/ui/LivingBackground";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BookOpen, ShieldAlert, ChevronLeft, Target, Users, XCircle, Zap } from "lucide-react";
import { sfxTap } from "@/lib/audio";
import { getGameVisualMeta } from "@/components/illustrations/GameIllustrations";

interface GameRuleData {
  id: string;
  name: string;
  category: string;
  goal: string;
  roles?: { title: string; badge: string; desc: string }[];
  donts: string[];
}

const GAME_RULES: GameRuleData[] = [
  {
    id: "undercover",
    name: "Undercover",
    category: "Bluff & Déduction",
    goal: "Démasquer les infiltrés cachés parmi les Civils grâce aux mots-indices échangés à voix haute.",
    roles: [
      { title: "Civils", badge: "Majorité", desc: "Ont tous exactement le même mot secret. Doivent repérer et éliminer les imposteurs." },
      { title: "Undercover", badge: "Infiltré", desc: "A un mot très proche du mot Civil. Doit se fondre dans la discussion." },
      { title: "Mr. White", badge: "Sans mot", desc: "Ne reçoit aucun mot. Doit improviser et deviner le mot des Civils s'il est démasqué." },
      { title: "Le Joker", badge: "Spécial", desc: "Gagne en solo s'il réussit à se faire éliminer dès le tout premier vote." },
      { title: "Le Caméléon", badge: "Copieur", desc: "Sans mot au départ : il adopte discrètement la piste du premier orateur." },
      { title: "Double-Agent", badge: "Piégé", desc: "Connaît le mot Civil et emporte un joueur de son choix s'il est éliminé." },
    ],
    donts: [
      "Ne donnez jamais l'initiale ni le nombre de lettres du mot.",
      "Évitez les synonymes trop évidents ou de répéter un indice déjà dit.",
      "Ne regardez pas l'écran pendant qu'un autre joueur consulte son mot.",
    ],
  },
  {
    id: "werewolf",
    name: "Loup-Garou",
    category: "Rôles Secrets & Débat",
    goal: "Le Village doit éliminer tous les Loups-Garous le jour, pendant que la meute chasse la nuit.",
    roles: [
      { title: "Villageois", badge: "Village", desc: "Enquêtent ensemble le jour pour démasquer les Loups." },
      { title: "Loup-Garou", badge: "Meute", desc: "Se réveillent la nuit pour choisir leur cible en secret." },
      { title: "La Voyante", badge: "Spécial", desc: "Observe le rôle exact d'un joueur chaque nuit." },
      { title: "La Sorcière", badge: "Spécial", desc: "Dispose d'une potion de vie et d'une potion de mort." },
      { title: "Le Chasseur", badge: "Spécial", desc: "S'il est éliminé, il emporte immédiatement un joueur avec lui." },
    ],
    donts: [
      "Gardez les yeux bien fermés pendant la phase de Nuit.",
      "Évitez les indices sonores ou gestes qui trahissent votre tour de jeu.",
      "Ne divulguez pas votre rôle en montrant l'écran du téléphone.",
    ],
  },
  {
    id: "blind-test",
    name: "Blind Test",
    category: "Musique & Rapidité",
    goal: "Identifier le titre ou l'artiste de chaque extrait musical le plus vite possible.",
    donts: [
      "Pas d'application de reconnaissance musicale pendant la manche.",
      "Laissez tout le monde entendre l'extrait avant de couper le son.",
    ],
  },
  {
    id: "fake-artist",
    name: "Faux Artiste",
    category: "Dessin & Bluff",
    goal: "Compléter un dessin collectif trait par trait tout en repérant qui ne connaît pas le mot secret.",
    roles: [
      { title: "Artistes", badge: "Équipe", desc: "Connaissent le mot secret et dessinent un trait pertinent sans trop en révéler." },
      { title: "Faux Artiste", badge: "Imposteur", desc: "Connaît uniquement le thème. Doit imiter les autres traits sans se faire prendre !" },
    ],
    donts: [
      "Un seul trait continu par joueur et par tour.",
      "Interdiction d'écrire des lettres ou des chiffres dans le dessin.",
    ],
  },
  {
    id: "truth-or-dare",
    name: "Action ou Vérité",
    category: "Défis & Confidences",
    goal: "Répondre honnêtement à une question ou relever un défi dans la bonne humeur.",
    donts: [
      "Assumez le choix sélectionné entre Action ou Vérité.",
      "Gardez toujours les défis bienveillants et sans danger pour le groupe.",
    ],
  },
  {
    id: "tu-preferes",
    name: "Tu Préfères ?",
    category: "Dilemmes",
    goal: "Choisir entre deux options improbables et découvrir les votes du reste de la table.",
    donts: [
      "Impossible de passer ou de rester neutre : choisissez A ou B !",
      "Votez sans influencer votre voisin avant l'affichage.",
    ],
  },
  {
    id: "flag-quiz",
    name: "Devine le Drapeau",
    category: "Quiz Visuel",
    goal: "Reconnaître les drapeaux du monde entier et marquer un maximum de points.",
    donts: [
      "Ne soufflez pas la réponse à l'équipe adverse avant la fin du chrono.",
    ],
  },
  {
    id: "saboteur",
    name: "Le Saboteur",
    category: "Défis d'équipe & Trahison",
    goal: "Réussir ensemble des mini-missions chronométrées tout en démasquant le Saboteur qui essaie de vous faire rater.",
    roles: [
      { title: "Agents", badge: "Équipe", desc: "Coopèrent à voix haute sur le défi commun pour gagner le point de mission." },
      { title: "Saboteur", badge: "Traître", desc: "Fait échouer le groupe subtilement en glissant de fausses réponses ou en cassant le rythme." },
    ],
    donts: [
      "Ne sabotez pas de façon trop évidente dès le premier second.",
      "Débattez uniquement après la fin du chrono de mission.",
    ],
  },
  {
    id: "word-master",
    name: "Le Maître des Mots",
    category: "Mots & Tabous",
    goal: "Faire deviner le mot affiché sans prononcer aucun des mots interdits de la carte.",
    donts: [
      "Interdit de citer les mots tabous ou des mots de la même famille.",
      "Pas de mime si la carte demande uniquement des indices oraux.",
    ],
  },
  {
    id: "punchlines",
    name: "Punchlines",
    category: "Humour & Cartes",
    goal: "Compléter une carte situation avec la réponse la plus drôle ou inattendue.",
    donts: [
      "Laissez chaque joueur défendre ou lire sa carte avec le ton juste.",
    ],
  },
  {
    id: "vylo-party",
    name: "VYLO Party",
    category: "Mini-défis rapides",
    goal: "Enchaîner défis collectifs, gages express et questions de rapidité à toute allure.",
    donts: [
      "Respectez le petit chrono de 5 secondes pour garder le rythme !",
    ],
  },
  {
    id: "most-likely-to",
    name: "Qui est le plus susceptible de... ?",
    category: "Votes & Fous rires",
    goal: "Désigner collectivement le joueur du groupe qui correspond le plus à la situation.",
    donts: [
      "Tout le monde compte 1, 2, 3 et vote en même temps !",
    ],
  },
];

export default function RulesNoticePage() {
  const router = useRouter();
  const [selectedGameId, setSelectedGameId] = useState<string>("undercover");

  const activeGame = GAME_RULES.find((g) => g.id === selectedGameId) || GAME_RULES[0];
  const art = getGameVisualMeta(activeGame.id);

  return (
    <main className="min-h-screen flex flex-col items-center pt-6 pb-28 px-4 md:px-8 w-full max-w-4xl mx-auto relative">
      <LivingBackground accentColor={art.hex} />

      {/* En-tête */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <button
          type="button"
          onClick={() => {
            sfxTap();
            if (typeof window !== "undefined" && window.history.length > 1) router.back();
            else router.push("/");
          }}
          className="h-10 px-4 bg-surface border border-border rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] active-press shadow-sm cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Retour
        </button>

        <div className="flex items-center gap-2 font-display text-lg sm:text-xl font-bold text-foreground">
          <BookOpen size={20} className="text-primary" aria-hidden="true" /> Règles des jeux
        </div>

        <div className="w-20 hidden sm:block shrink-0" />
      </div>

      {/* Onglets 12 jeux */}
      <div className="w-full flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 z-10">
        {GAME_RULES.map((game) => (
          <button
            key={game.id}
            type="button"
            onClick={() => {
              sfxTap();
              setSelectedGameId(game.id);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border cursor-pointer ${
              selectedGameId === game.id
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-surface border-border text-muted hover:text-foreground hover:border-[var(--border-strong)]"
            }`}
          >
            {game.name}
          </button>
        ))}
      </div>

      {/* Carte d'en-tête avec illustration */}
      <Card className="w-full overflow-hidden bg-surface border border-border shadow-soft mb-6 text-left z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-5 aspect-[16/10] w-full bg-surface-elevated overflow-hidden">
            {art.renderIllustration({ priority: true })}
          </div>
          <div className="md:col-span-7 p-6 space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FEEBEB] text-[#C22E2E]">
                  {activeGame.category}
                </span>
                {activeGame.id !== "undercover" && (
                  <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E4E7F0] text-[#454B63] border border-[#C6CDDC]">
                    Jeu toujours en développement · Jouable
                  </span>
                )}
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {activeGame.name}
              </h1>
            </div>

            <div className="p-4 rounded-2xl bg-surface-elevated border border-border">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                <Target size={14} aria-hidden="true" /> Le but du jeu
              </span>
              <p className="text-sm font-bold text-foreground leading-relaxed">{activeGame.goal}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Rôles */}
      {activeGame.roles && activeGame.roles.length > 0 && (
        <div className="w-full mb-7 z-10 text-left space-y-3.5">
          <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <Users className="text-secondary" size={19} aria-hidden="true" /> Les rôles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeGame.roles.map((role, idx) => (
              <Card key={idx} className="p-5 bg-surface border border-border shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-display font-bold text-base text-foreground">{role.title}</span>
                  <span className="text-[11px] font-bold bg-[#EEF2FF] text-[#4338CA] px-2.5 py-0.5 rounded-full">
                    {role.badge}
                  </span>
                </div>
                <p className="text-xs font-semibold text-muted leading-relaxed">{role.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* À retenir */}
      <div className="w-full z-10 text-left space-y-3.5">
        <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
          <ShieldAlert size={19} className="text-primary" aria-hidden="true" /> Règles d&apos;or pour bien jouer
        </h2>

        <Card className="p-5 sm:p-6 bg-surface border border-border space-y-2.5">
          {activeGame.donts.map((dont, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-surface-elevated p-3.5 rounded-2xl border border-border"
            >
              <XCircle size={17} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">{dont}</p>
            </div>
          ))}
        </Card>
      </div>

      {/* Bouton fixe */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/95 border-t border-border z-50">
        <div className="max-w-md mx-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full gap-2 rounded-full"
            onClick={() => {
              sfxTap();
              router.push(`/setup/${activeGame.id}`);
            }}
          >
            <Zap size={18} aria-hidden="true" /> Jouer à {activeGame.name}
          </Button>
        </div>
      </div>
    </main>
  );
}
