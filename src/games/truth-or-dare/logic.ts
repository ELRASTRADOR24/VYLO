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
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 2.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 3.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 4.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 5.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 6.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Quel est le moment le plus drôle ou inattendu qui t'est arrivé pendant une soirée ?",
    "intensity": "Soft"
  },
  {
    "type": "DARE",
    "text": "Mets-toi en scène et donne un conseil de vie plein d'humour au joueur numéro 1.",
    "intensity": "Soft"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Si tu devais inventer un jeu télévisé basé sur la vie du groupe, quel serait le principe ?",
    "intensity": "Fun"
  },
  {
    "type": "DARE",
    "text": "Joue une scène de comédie improvisée de 20 secondes sur le thème choisi par le joueur à ta droite.",
    "intensity": "Fun"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
    "intensity": "Piquant"
  },
  {
    "type": "DARE",
    "text": "Fais une déclaration amicale ou troublante en regardant le joueur de ton choix droit dans les yeux pendant 15 secondes.",
    "intensity": "Piquant"
  },
  {
    "type": "TRUTH",
    "text": "Quel est un moment de vulnérabilité que tu as traversé et qui t'a rendu plus fort ?",
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
    .replace(/\s*\([^)]*#\d+[^)]*\)/gi, "")
    .replace(/\s*\([^)]*(Révélation|Anecdote|Défis?|Gage|Qst?|N°?)[^)]*\)/gi, "")
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
