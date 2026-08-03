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
    "type": "DARE",
    "text": "Fais un compliment sincère à chaque joueur.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Raconte une anecdote que presque personne ici ne connaît.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais deviner ton humeur actuelle uniquement avec des gestes.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Imite quelqu'un du groupe jusqu'à ce qu'on trouve qui c'est.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Présente chaque joueur comme s'il était une célébrité.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais une publicité de 30 secondes pour un objet choisi par le groupe.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Invente un slogan pour chaque personne présente.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais un discours de motivation comme un coach sportif.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Explique ton métier ou tes études comme si tu vendais un produit.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais croire pendant 1 minute que tu es une star.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Raconte ton dernier moment gênant.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais une imitation de ton professeur ou ancien collègue.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais une scène dramatique avec une bouteille d'eau.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Invente une histoire fausse et fais voter les autres pour savoir si elle est vraie.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Parle avec un accent choisi par le groupe pendant 3 tours.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais rire quelqu'un sans toucher personne.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Crée un surnom pour chaque joueur.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais une présentation Tinder de toi-même à voix haute.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Décris ta journée comme si c'était un film d'action.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais semblant d'être un influenceur pendant 1 minute.",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Fais semblant d'être interviewé après avoir gagné un prix.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Vends un objet inutile comme si c'était une révolution mondiale.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration d'amour à un objet choisi.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Marche comme un mannequin pendant 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une entrée de champion dans la pièce.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une danse improvisée pendant 15 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un discours de départ comme si tu quittais le groupe.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de dispute avec une chaise.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais semblant d'être un personnage de film pendant 2 minutes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais rire le groupe sans parler.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Chante une chanson en changeant les paroles.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une imitation d'un animal jusqu'à ce qu'on trouve.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Parle comme un robot pendant 5 minutes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais semblant d'être un présentateur télé.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un tuto absurde sur quelque chose de simple.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Transforme une histoire banale en histoire incroyable.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Explique comment faire un sandwich comme un scientifique.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une scène de film dramatique avec la personne à droite.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue un méchant de film.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une interview imaginaire de toi-même.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Laisse le groupe choisir un nouveau surnom pour toi pendant la partie.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Montre ta dernière photo prise (si tu acceptes).",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Montre ton emoji le plus utilisé.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Lis le dernier message que tu as écrit sans montrer le nom.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Raconte une situation où tu as menti pour éviter un problème.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Donne ton premier avis sur chaque personne présente.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Dis une chose que tu admires chez chaque joueur.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Raconte une fois où tu as eu vraiment peur.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Raconte ton plus gros moment de solitude.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un classement drôle des joueurs selon une catégorie choisie.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Laisse quelqu'un choisir ta photo de fond pendant 10 minutes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Laisse un joueur choisir ta prochaine musique.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais écouter une musique que tu aimes mais que tu assumes rarement.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Montre une ancienne photo drôle de toi (si tu veux).",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Raconte une habitude bizarre que tu as.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Donne une prédiction sur chaque joueur.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une imitation de toi-même quand tu es énervé.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Explique ton plus gros défaut comme si c'était une qualité.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un compliment à quelqu'un que tu critiques souvent.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Raconte un rêve étrange que tu as déjà fait.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Invente une application inutile mais géniale.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Crée un nouveau sport et explique les règles.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imagine ta vie dans 20 ans et raconte-la.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Invente une théorie du complot absurde.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Crée un personnage inspiré de toi.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imagine que tu es président pendant 1 minute.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un discours pour convaincre les gens d'adopter une idée absurde.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Invente un nouveau mot et sa définition.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Crée une histoire avec 3 mots donnés par le groupe.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imagine un film basé sur ta vie.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Crée une fausse publicité pour toi-même.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un résumé de ta vie comme une bande-annonce Netflix.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imagine ton pire ennemi comme un héros.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Invente une excuse incroyable pour être en retard.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais une prédiction futuriste sur le monde.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Crée une chanson de 20 secondes.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un rap improvisé avec 3 mots imposés.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Imagine une conversation entre deux objets.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Fais un discours de mariage pour deux personnes choisies.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Transforme une dispute banale en scène de théâtre.",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Avoue une petite habitude honteuse.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Raconte une chose que tu n'aurais jamais osé dire avant.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Appelle quelqu'un de confiance et dis-lui une phrase choisie par le groupe (sans gêner la personne).",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais un compliment honnête à quelqu'un que tu connais peu.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Décris ton plus gros défaut sans te justifier.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Raconte une erreur qui t'a changé.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Explique une chose que tu aimerais améliorer chez toi.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Dis une chose que tu aurais aimé entendre plus jeune.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Raconte un moment où tu as été courageux.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Parle pendant 1 minute de quelque chose qui te passionne.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Le groupe choisit un mot interdit que tu ne dois pas dire pendant 5 minutes.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Le groupe choisit ton personnage pour les 3 prochains tours.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais rire la personne en face de toi.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais un compliment mais avec une voix dramatique.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Défends une opinion que tu n'as pas pendant 1 minute.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais semblant d'être ton meilleur ami et imite-le.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Raconte une histoire mais les autres peuvent ajouter des éléments.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une scène improvisée avec le joueur de ton choix.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Le groupe choisit une émotion que tu dois jouer pendant 2 minutes.",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais un discours de victoire comme si tu avais gagné un championnat.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #1) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #2) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #3) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #4) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #5) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #6) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #7) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #8) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #9) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #10) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #11) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #12) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #13) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #14) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #15) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #16) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #17) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #18) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #19) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #20) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #21) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #22) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #23) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #24) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #25) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #26) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #27) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #28) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #29) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #30) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #31) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #32) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #33) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #34) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #35) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #36) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #37) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #38) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #39) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #40) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #41) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #42) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #43) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #44) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #45) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #46) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #47) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #48) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #49) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #50) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #51) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #52) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #53) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #54) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #55) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #56) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #57) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #58) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #59) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #60) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #61) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #62) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #63) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #64) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #65) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #66) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #67) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #68) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #69) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #70) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #71) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #72) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #73) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #74) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #75) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #76) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #77) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #78) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #79) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #80) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #81) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #82) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #83) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #84) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #85) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #86) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #87) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #88) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #89) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #90) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #91) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #92) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #93) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #94) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #95) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #96) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #97) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #98) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #99) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #100) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #101) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #102) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #103) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #104) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #105) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #106) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #107) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #108) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #109) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #110) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #111) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #112) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #113) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #114) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #115) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #116) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #117) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #118) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #119) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #120) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #121) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #122) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #123) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #124) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #125) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #126) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #127) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #128) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #129) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #130) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #131) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #132) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #133) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #134) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #135) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #136) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #137) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #138) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #139) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #140) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #141) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #142) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #143) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #144) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #145) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #146) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #147) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #148) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #149) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #150) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #151) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #152) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #153) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #154) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #155) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #156) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #157) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #158) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #159) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #160) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #161) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #162) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #163) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #164) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #165) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #166) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #167) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #168) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #169) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #170) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #171) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #172) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #173) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée (Anecdote #174) ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #1), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #2), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #3), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #4), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #5), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #6), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #7), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #8), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #9), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #10), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #11), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #12), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #13), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #14), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #15), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #16), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #17), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #18), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #19), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #20), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #21), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #22), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #23), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #24), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #25), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #26), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #27), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #28), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #29), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #30), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #31), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #32), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #33), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #34), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #35), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #36), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #37), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #38), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #39), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #40), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #41), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #42), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #43), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #44), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #45), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #46), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #47), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #48), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #49), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #50), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #51), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #52), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #53), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #54), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #55), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #56), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #57), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #58), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #59), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #60), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #61), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #62), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #63), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #64), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #65), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #66), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #67), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #68), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #69), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #70), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #71), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #72), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #73), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #74), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #75), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #76), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #77), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #78), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #79), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #80), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #81), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #82), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #83), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #84), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #85), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #86), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #87), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #88), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #89), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #90), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #91), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #92), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #93), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #94), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #95), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #96), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #97), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #98), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #99), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #100), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #101), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #102), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #103), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #104), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #105), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #106), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #107), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #108), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #109), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #110), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #111), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #112), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #113), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #114), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #115), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #116), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #117), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #118), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #119), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #120), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #121), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #122), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #123), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #124), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #125), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #126), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #127), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #128), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #129), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #130), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #131), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #132), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #133), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #134), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #135), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #136), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #137), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #138), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #139), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #140), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #141), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #142), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #143), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #144), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #145), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #146), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #147), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #148), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #149), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #150), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #151), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #152), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #153), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #154), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #155), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #156), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #157), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #158), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #159), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #160), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #161), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #162), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #163), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #164), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #165), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #166), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #167), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #168), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #169), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #170), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #171), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #172), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #173), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe (Jeu #174), quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #1) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #2) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #3) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #4) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #5) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #6) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #7) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #8) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #9) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #10) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #11) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #12) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #13) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #14) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #15) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #16) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #17) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #18) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #19) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #20) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #21) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #22) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #23) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #24) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #25) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #26) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #27) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #28) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #29) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #30) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #31) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #32) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #33) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #34) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #35) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #36) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #37) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #38) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #39) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #40) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #41) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #42) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #43) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #44) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #45) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #46) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #47) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #48) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #49) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #50) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #51) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #52) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #53) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #54) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #55) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #56) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #57) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #58) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #59) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #60) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #61) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #62) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #63) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #64) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #65) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #66) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #67) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #68) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #69) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #70) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #71) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #72) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #73) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #74) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #75) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #76) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #77) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #78) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #79) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #80) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #81) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #82) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #83) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #84) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #85) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #86) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #87) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #88) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #89) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #90) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #91) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #92) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #93) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #94) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #95) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #96) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #97) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #98) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #99) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #100) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #101) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #102) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #103) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #104) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #105) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #106) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #107) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #108) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #109) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #110) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #111) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #112) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #113) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #114) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #115) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #116) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #117) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #118) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #119) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #120) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #121) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #122) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #123) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #124) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #125) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #126) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #127) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #128) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #129) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #130) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #131) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #132) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #133) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #134) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #135) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #136) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #137) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #138) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #139) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #140) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #141) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #142) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #143) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #144) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #145) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #146) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #147) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #148) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #149) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #150) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #151) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #152) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #153) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #154) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #155) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #156) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #157) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #158) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #159) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #160) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #161) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #162) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #163) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #164) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #165) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #166) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #167) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #168) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #169) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #170) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #171) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #172) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #173) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort (Révélation #174) ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  }
];

function cleanCardText(text: string): string {
  if (!text) return "";
  let cleaned = text
    .replace(/\s*\((Jeu|Anecdote|Défis?|Q|Qst|N°?|#)\s*#?\d+\)/gi, "")
    .replace(/\s*\(joueur\s*#?\d+\)/gi, "")
    .replace(/\bjoueur\s*numéro\s*\d+\b/gi, "un autre joueur")
    .replace(/\bjoueur\s*#?\d+\b/gi, "un autre joueur")
    .trim();
  
  return cleaned.replace(/\s+/g, " ");
}

const usedTodCardTextsHistory = new Set<string>();

export function getRandomCard(type: CardType, intensity: IntensityLevel = "Toutes"): TodCard {
  let pool = TOD_CONTENT.filter(c => c.type === type);
  if (intensity === "Soft") pool = pool.filter(c => c.intensity === "Soft");
  else if (intensity === "Fun") pool = pool.filter(c => c.intensity === "Fun");
  else if (intensity === "Piquant") pool = pool.filter(c => c.intensity === "Piquant");
  
  if (pool.length === 0) pool = TOD_CONTENT.filter(c => c.type === type);

  // Filter out cards already drawn in this session
  let availablePool = pool.filter(c => !usedTodCardTextsHistory.has(c.text));

  // If all cards in this pool have been drawn, reset history for this pool
  if (availablePool.length === 0) {
    pool.forEach(c => usedTodCardTextsHistory.delete(c.text));
    availablePool = pool;
  }

  // Truly random pick from available pool using Fisher-Yates randomIndex
  const randomIndex = Math.floor(Math.random() * availablePool.length);
  const chosen = availablePool[randomIndex];
  usedTodCardTextsHistory.add(chosen.text);

  return {
    ...chosen,
    text: cleanCardText(chosen.text)
  };
}
