"use client";

import Card from "@/components/ui/Card";
import {
  ChevronLeft,
  Smartphone,
  Globe,
  QrCode,
  ArrowRight,
  Users,
  Clock,
  Target,
  Zap,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getGameConfig } from "@/games";
import { sfxTap, sfxSuccess } from "@/lib/audio";
import { getGameVisualMeta } from "@/components/illustrations/GameIllustrations";
import { markRoomCreator } from "@/lib/onlineIdentity";

const HOW_TO_PLAY_MAP: Record<string, { goal: string; steps: string[] }> = {
  "fake-artist": {
    goal: "Dessiner le mot secret trait par trait sans vous faire piéger par le Faux Artiste.",
    steps: [
      "Chaque joueur reçoit le mot secret, sauf le Faux Artiste qui ne connaît que la catégorie.",
      "À tour de rôle, chacun ajoute un seul trait continu avec sa couleur sur le dessin commun.",
      "Débattez ensuite et votez pour démasquer l'imposteur avant qu'il ne devine le mot !",
    ],
  },
  undercover: {
    goal: "Démasquer les infiltrés cachés parmi les Civils grâce aux mots-indices.",
    steps: [
      "Les Civils ont le même mot secret ; l'Undercover a un mot très proche et Mr. White n'en a aucun.",
      "Donnez chacun un indice à voix haute pour montrer que vous êtes dans le bon camp sans trop en dire.",
      "Votez ensemble pour éliminer la personne qui vous semble la plus suspecte !",
    ],
  },
  werewolf: {
    goal: "Le Village doit éliminer les Loups-Garous le jour, pendant que la meute chasse la nuit.",
    steps: [
      "La Nuit tombe : tout le monde ferme les yeux et les rôles spéciaux agissent secrètement.",
      "Le Jour se lève : le village découvre la victime et lance le débat.",
      "Votez à la majorité pour tenter d'éliminer un Loup-Garou !",
    ],
  },
  "blind-test": {
    goal: "Reconnaître le titre ou l'artiste de chaque extrait musical le plus vite possible.",
    steps: [
      "Écoutez l'extrait audio lancé par l'application.",
      "Trouvez la bonne chanson avant la fin du chrono.",
      "Cumulez les bonnes réponses pour monter sur le podium !",
    ],
  },
  "truth-or-dare": {
    goal: "Répondre en toute franchise ou relever des défis amusants en groupe.",
    steps: [
      "À votre tour, choisissez entre Action ou Vérité.",
      "Réalisez le défi ou répondez à la question sans esquiver.",
      "Passez l'écran au joueur suivant pour continuer la ronde !",
    ],
  },
  "flag-quiz": {
    goal: "Reconnaître un maximum de drapeaux du monde en un minimum de temps.",
    steps: [
      "Un drapeau s'affiche au centre de l'écran.",
      "Sélectionnez le bon pays avant la fin du compte à rebours.",
      "Enchaînez les séries pour battre le record du groupe !",
    ],
  },
  "tu-preferes": {
    goal: "Trancher entre deux dilemmes impossibles et découvrir les choix de chacun.",
    steps: [
      "Lisez les deux propositions extrêmes ou décalées.",
      "Votez pour votre option préférée (A ou B).",
      "Comparez les résultats du groupe et défendez votre choix !",
    ],
  },
  saboteur: {
    goal: "Réussir les défis d'équipe minutés pendant que le Saboteur cherche à vous faire échouer.",
    steps: [
      "Chaque joueur découvre s'il est Agent (loyal) ou Saboteur en secret.",
      "Le groupe tente de réussir des défis chronométrés ensemble à voix haute.",
      "Un échec vous met sur la piste du Saboteur : votez pour l'éliminer avant qu'il ne gagne !",
    ],
  },
  "word-master": {
    goal: "Faire deviner un maximum de mots secrets sans jamais prononcer les mots interdits.",
    steps: [
      "Le Maître des Mots reçoit une carte avec un mot à deviner et une liste de mots tabous.",
      "Donnez des indices créatifs à votre équipe avant la fin du sablier.",
      "Validez chaque mot trouvé et évitez les faux pas !",
    ],
  },
  punchlines: {
    goal: "Compléter des situations absurdes avec les répliques les plus drôles.",
    steps: [
      "Une phrase à trou s'affiche pour tout le groupe.",
      "Chaque joueur propose ou choisit sa réponse la plus décalée.",
      "Le jury du tour attribue le point à la meilleure punchline !",
    ],
  },
  "vylo-party": {
    goal: "Enchaîner mini-défis éclair, duels de rapidité et questions surprises.",
    steps: [
      "Suivez la carte piochée qui désigne un ou plusieurs joueurs.",
      "Réagissez avant la fin du petit chrono de 5 secondes.",
      "Faites passer le téléphone au rythme de la soirée !",
    ],
  },
  "most-likely-to": {
    goal: "Désigner qui dans la pièce correspond le mieux à chaque affirmation.",
    steps: [
      "Une phrase « Qui est le plus susceptible de... » apparaît à l'écran.",
      "À 3, chacun pointe du doigt ou vote pour le joueur idéal.",
      "Riez de vos résultats et passez à la question suivante !",
    ],
  },
};

export default function SetupClient({ gameId }: { gameId: string }) {
  const router = useRouter();
  const gameConfig = getGameConfig(gameId);
  const art = getGameVisualMeta(gameId);
  const supportsOnline = gameConfig ? gameConfig.modes.includes("online") : true;

  const generateRoomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const guide = HOW_TO_PLAY_MAP[gameId] || {
    goal: gameConfig?.description || "Amusez-vous en groupe !",
    steps: [
      "Suivez les instructions affichées à l'écran.",
      "Jouez à tour de rôle avec vos proches.",
      "Profitez de la partie sans prise de tête.",
    ],
  };

  const handleChooseLocal = () => {
    sfxSuccess();
    router.push(`/play/${gameId}/${generateRoomCode()}`);
  };

  const handleChooseOnlineCreate = () => {
    if (!supportsOnline) return;
    sfxSuccess();
    const roomCode = generateRoomCode();
    markRoomCreator(roomCode, gameId);
    router.push(`/online/${gameId}/${roomCode}`);
  };

  const handleChooseOnlineJoin = () => {
    sfxTap();
    router.push("/join");
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 md:px-8 pt-6 pb-20 max-w-2xl mx-auto relative text-center">
      {/* En-tête */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 z-10">
        <button
          type="button"
          onClick={() => {
            sfxTap();
            if (typeof window !== "undefined" && window.history.length > 1) router.back();
            else router.push("/library");
          }}
          className="h-10 px-4 bg-surface border border-border rounded-full flex items-center gap-1.5 text-xs font-bold text-foreground hover:border-[var(--border-strong)] active-press shadow-sm cursor-pointer shrink-0"
        >
          <ChevronLeft size={16} className="text-primary" /> Retour
        </button>

        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground truncate">
          {gameConfig?.name || gameId}
        </h1>

        <div className="w-20 shrink-0" />
      </div>

      {/* Illustration du jeu */}
      <div className="relative w-full max-w-md mx-auto mb-5 z-10 rounded-3xl overflow-hidden border border-border shadow-soft bg-surface">
        <div className={`aspect-[16/10] w-full ${gameConfig?.status === "wip" ? "grayscale-[35%] opacity-90" : ""}`}>
          {art.renderIllustration({ priority: true })}
        </div>
        {gameConfig?.status === "wip" && (
          <div
            role="note"
            className="pointer-events-none select-none absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[16deg] w-[142%] z-10 bg-gradient-to-b from-[#ECEEF4]/95 via-[#DFE3EC]/95 to-[#CFD5E2]/95 border-y-2 border-[#7C849C]/85 ring-1 ring-inset ring-white/55 shadow-[0_3px_10px_rgba(22,24,36,0.18)] py-1.5 px-6 flex flex-col items-center justify-center text-center"
          >
            <span className="text-[11px] font-black uppercase tracking-[0.06em] text-[#1E2235] leading-tight">
              Jeu toujours en développement
            </span>
            <span className="text-[9.5px] font-bold text-[#4B526B] leading-tight mt-0.5">
              Jouable · Non terminé (bugs possibles)
            </span>
          </div>
        )}
      </div>

      {gameConfig?.status === "wip" && (
        <div className="w-full mb-5 z-10 p-3.5 rounded-2xl bg-[#ECEEF5] border border-[#C6CDDC] flex items-start gap-3 text-left">
          <Info size={18} className="text-[#4B526B] shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs font-semibold text-[#3C4257] leading-relaxed">
            <strong className="font-extrabold text-[#1E2235]">Jeu toujours en développement :</strong>{" "}
            vous pouvez déjà y jouer, mais il n&apos;est pas encore terminé (certains bugs ou l&apos;ancienne interface peuvent apparaître). Seul Undercover est finalisé.
          </p>
        </div>
      )}

      {/* Guide rapide lisible */}
      <div className="w-full mb-7 z-10 text-left">
        <div className="p-5 sm:p-6 rounded-3xl bg-surface border border-border shadow-soft space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
              <Target size={14} aria-hidden="true" /> Le but du jeu
            </span>
            <p className="text-sm font-bold text-foreground leading-relaxed">{guide.goal}</p>
          </div>

          <div className="pt-3 border-t border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-2.5">
              <Zap size={14} aria-hidden="true" /> Comment jouer
            </span>
            <div className="space-y-2.5">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FEEBEB] text-[#C22E2E] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-muted leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {gameConfig && (
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-muted">
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-primary" aria-hidden="true" />
                {gameConfig.players.min}–{gameConfig.players.max} joueurs
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-secondary" aria-hidden="true" />
                {gameConfig.durationMins} min environ
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Choix du mode */}
      <div className="w-full flex flex-col gap-3.5 z-10">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Choisissez comment jouer
        </h2>

        <Card
          onClick={handleChooseLocal}
          className="p-5 cursor-pointer border border-border hover:border-primary/45 transition-all flex items-center justify-between group bg-surface shadow-soft hover:-translate-y-0.5 active-press"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FEEBEB] text-[#C22E2E] flex items-center justify-center shrink-0">
              <Smartphone size={24} aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Local · Passe-le-tel
              </span>
              <h3 className="font-display text-lg font-bold text-foreground">1 seul téléphone</h3>
              <p className="text-xs font-semibold text-muted">
                Un écran commun qui circule autour de la table.
              </p>
            </div>
          </div>
          <ArrowRight
            className="text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
            size={20}
            aria-hidden="true"
          />
        </Card>

        {supportsOnline ? (
          <Card
            onClick={handleChooseOnlineCreate}
            className="p-5 cursor-pointer border border-border hover:border-secondary/45 transition-all flex items-center justify-between group bg-surface shadow-soft hover:-translate-y-0.5 active-press"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center shrink-0">
                <Globe size={24} aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                  En ligne · Chacun son écran
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">Chacun son téléphone</h3>
                <p className="text-xs font-semibold text-muted">
                  Ouvrez un salon avec un code à 6 chiffres pour vos proches.
                </p>
              </div>
            </div>
            <ArrowRight
              className="text-muted group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0"
              size={20}
              aria-hidden="true"
            />
          </Card>
        ) : (
          <div className="p-4 rounded-3xl bg-surface-elevated/80 border border-border flex items-center gap-3 text-left text-muted">
            <Info size={18} className="shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-xs font-semibold">
              Ce jeu se joue uniquement sur <strong className="text-foreground">1 seul téléphone</strong> autour de la table.
            </p>
          </div>
        )}

        {supportsOnline && (
          <button
            type="button"
            onClick={handleChooseOnlineJoin}
            className="w-full p-3.5 rounded-full bg-surface border border-border hover:border-[var(--border-strong)] text-xs font-bold text-muted hover:text-foreground flex items-center justify-center gap-2 transition-colors mt-1 cursor-pointer"
          >
            <QrCode size={16} aria-hidden="true" />
            Vous avez déjà un code ? Rejoindre un salon
          </button>
        )}
      </div>
    </main>
  );
}
