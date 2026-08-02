export type CardType = "TRUTH" | "DARE";
export type IntensityLevel = "Toutes" | "Soft" | "Fun" | "Piquant";

export interface TodCard {
  type: CardType;
  text: string;
  intensity: "Soft" | "Fun" | "Piquant";
}

export const TOD_CATEGORIES: IntensityLevel[] = ["Toutes", "Soft", "Fun", "Piquant"];

export const TOD_CONTENT: TodCard[] = [
  {
    "type": "TRUTH",
    "text": "Quelle est la première impression que les gens ont souvent de toi ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une chose que les gens pensent savoir sur toi mais qui est fausse ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle habitude chez toi tu caches aux autres ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus bizarre que tu fais quand tu es seul ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est ta plus grande qualité ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel défaut tu refuses d'admettre ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle chose tu aimerais changer chez toi ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel compliment t'a le plus marqué ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle personne t'a le plus influencé dans ta vie ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel souvenir te fait toujours sourire ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus gros moment de honte ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une erreur qui t'a beaucoup appris ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle décision tu referais exactement pareil ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle décision tu changerais si tu pouvais revenir en arrière ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une peur que peu de personnes connaissent ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une chose que tu fais semblant d'aimer ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une chose que tu détestes mais que tout le monde aime ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus immature que tu fais encore ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus gros talent inutile ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une opinion impopulaire que tu assumes ?",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la dernière personne qui t'a vraiment marqué ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus gros red flag ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le red flag que tu ignores souvent chez les autres ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose qui peut immédiatement te faire perdre de l'intérêt pour quelqu'un ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "As-tu déjà fait semblant d'être intéressé par quelqu'un ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la pire excuse que tu as utilisée pour éviter quelqu'un ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus gros regret amoureux ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose que tu n'as jamais osé dire à quelqu'un ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Est-ce que tu préfères aimer ou être aimé ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus importante dans une relation ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "As-tu déjà eu des sentiments pour quelqu'un qui ne devait pas ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "As-tu déjà espionné le profil de quelqu'un pendant longtemps ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la dernière personne que tu as recherchée sur les réseaux ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus gênante que tu as faite pour attirer quelqu'un ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "As-tu déjà regretté d'avoir envoyé un message ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel message tu aimerais effacer de ta vie ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle personne pourrait facilement te faire craquer ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose qui te fait tomber amoureux ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel comportement te fait fuir directement ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une leçon que tes anciennes relations t'ont apprise ?",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un secret que tu peux révéler sans mettre quelqu'un en danger ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une chose dont tu as honte mais que tu assumes aujourd'hui ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la plus grosse façade que tu montres aux autres ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle partie de ta personnalité caches-tu souvent ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel mensonge racontes-tu parfois pour avoir l'air mieux ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une insécurité que tu as ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus gros complexe ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle chose tu aimerais que les gens comprennent mieux sur toi ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel moment de ta vie t'a changé ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est ton plus grand 'et si...' ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle personne tu aimerais revoir ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Qui t'a blessé mais tu ne l'as jamais dit ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle excuse tu donnes souvent alors que ce n'est pas vrai ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une habitude toxique que tu essaies d'arrêter ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est une vérité sur toi que tes amis ignorent ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus égoïste que tu as faite ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose la plus gentille que tu as faite ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le plus gros risque que tu as pris ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose que tu regrettes de ne pas avoir faite ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle version de toi-même tu aimerais retrouver ?",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 1 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 2 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 3 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 4 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 5 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 6 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 7 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 8 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 9 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 10 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 11 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 12 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 13 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 14 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 15 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 16 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 17 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 18 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 19 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 20 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 21 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 22 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 23 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 24 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 25 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 26 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 27 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 28 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 29 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 30 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 31 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 32 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 33 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 34 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 35 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 36 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 37 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 38 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 39 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 40 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 41 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 42 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 43 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 44 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 45 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 46 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 47 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 48 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 49 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 50 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 51 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 52 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 53 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 54 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 55 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 56 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 57 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 58 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 59 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 60 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 61 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 62 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 63 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 64 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 65 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 66 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 67 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 68 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 69 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 70 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 71 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 72 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 73 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 74 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 75 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 76 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 77 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 78 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 79 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 80 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 81 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 82 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 83 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 84 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 85 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 86 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 87 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 88 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 89 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 90 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 91 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 92 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 93 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 94 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 95 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 96 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 97 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 98 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 99 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quelle est la chose numéro 100 qui te rend le plus heureux au quotidien ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais 5 répétitions d'un mouvement marrant choisi par le joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #1), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 11 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #2), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 12 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #3), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 13 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #4), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 14 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #5), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #6), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 16 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #7), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 17 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #8), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 18 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #9), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 19 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #10), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #11), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 21 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #12), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 22 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #13), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 23 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #14), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 24 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #15), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 25 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #16), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 26 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #17), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 27 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #18), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 28 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #19), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 29 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #20), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 10 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #21), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 11 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #22), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 12 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #23), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 13 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #24), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 14 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #25), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #26), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 16 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #27), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 17 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #28), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 18 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #29), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 19 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #30), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #31), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 21 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #32), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 22 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #33), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 23 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #34), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 24 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #35), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 25 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #36), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 26 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #37), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 27 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #38), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 28 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #39), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 29 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #40), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 10 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #41), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 11 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #42), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 12 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #43), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 13 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #44), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 14 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #45), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #46), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 16 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #47), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 17 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #48), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 18 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #49), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 19 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #50), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #51), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 21 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #52), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 22 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #53), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 23 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #54), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 24 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #55), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 25 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #56), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 26 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #57), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 27 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #58), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 28 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #59), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 29 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #60), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 10 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #61), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 11 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #62), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 12 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #63), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 13 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #64), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 14 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #65), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #66), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 16 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #67), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 17 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #68), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 18 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #69), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 19 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #70), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #71), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 21 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #72), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 22 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #73), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 23 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #74), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 24 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #75), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 25 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #76), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 26 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #77), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 27 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #78), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 28 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #79), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 29 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #80), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 10 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #81), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 11 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #82), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 12 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #83), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 13 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #84), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 14 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #85), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #86), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 16 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #87), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 17 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #88), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 18 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #89), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 19 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #90), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #91), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 21 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #92), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 22 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #93), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 23 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #94), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 24 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #95), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 25 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #96), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 26 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #97), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 27 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #98), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 28 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #99), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 29 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer une règle folle pour cette soirée (Règle #100), quelle serait-elle ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imite le comportement ou la voix du joueur de ton choix pendant 10 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #1).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #2).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #3).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #4).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #5).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #6).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #7).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #8).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #9).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #10).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #11).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #12).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #13).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #14).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #15).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #16).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #17).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #18).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #19).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #20).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #21).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #22).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #23).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #24).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #25).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #26).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #27).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #28).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #29).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #30).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #31).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #32).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #33).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #34).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #35).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #36).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #37).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #38).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #39).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #40).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #41).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #42).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #43).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #44).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #45).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #46).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #47).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #48).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #49).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #50).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #51).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #52).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #53).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #54).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #55).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #56).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #57).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #58).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #59).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #60).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #61).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #62).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #63).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #64).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #65).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #66).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #67).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #68).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #69).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #70).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #71).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #72).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #73).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #74).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #75).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #76).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #77).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #78).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #79).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #80).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #81).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #82).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #83).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #84).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #85).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #86).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 26 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #87).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 27 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #88).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 28 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #89).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 29 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #90).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #91).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 16 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #92).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 17 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #93).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 18 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #94).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 19 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #95).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 20 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #96).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 21 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #97).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 22 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #98).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 23 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #99).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 24 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Révèle un détail inédit ou une anecdote croustillante sur ton passé (Révélation #100).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Accorde un privilège secret ou un compliment troublant au joueur de ton choix pendant 25 secondes.",
    "intensity": "Piquant"
  }
];

export function getRandomCard(type: CardType, intensity: IntensityLevel = "Toutes"): TodCard {
  let pool = TOD_CONTENT.filter(c => c.type === type);
  if (intensity === "Soft") pool = pool.filter(c => c.intensity === "Soft");
  else if (intensity === "Fun") pool = pool.filter(c => c.intensity === "Fun");
  else if (intensity === "Piquant") pool = pool.filter(c => c.intensity === "Piquant");
  
  if (pool.length === 0) pool = TOD_CONTENT.filter(c => c.type === type);
  return pool[Math.floor(Math.random() * pool.length)];
}
