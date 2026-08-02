export type CardType = "TRUTH" | "DARE";
export type IntensityLevel = "Toutes" | "Soft" | "Fun" | "Piquant";

export interface TodCard {
  type: CardType;
  text: string;
  intensity: "Soft" | "Fun" | "Piquant";
}

export const TOD_CATEGORIES: IntensityLevel[] = ["Toutes", "Soft", "Fun", "Piquant"];

export const TOD_CONTENT: TodCard[] = [
  // 🌸 SOFT — Rigolo, léger & brise-glace
  { type: "TRUTH", text: "Quel est ton pire souvenir d'enfance le plus rigolo ?", intensity: "Soft" },
  { type: "TRUTH", text: "Qui dans cette pièce est le mieux habillé ce soir ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quel est l'achat le plus inutile que tu aies jamais fait ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quelle est la chanson que tu écoutes en secret sans l'avouer ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quel est le plat que tu détestes le plus au monde ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quel est le surnom le plus ridicule qu'on t'ait jamais donné ?", intensity: "Soft" },
  { type: "TRUTH", text: "Si tu devais habiter sur une île déserte avec un joueur ici, qui choisirais-tu ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quelle est ta plus grande peur irrationnelle (ex: les pigeons, l'obscurité...) ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quel est le dernier mensonge totalement inoffensif que tu as raconté ?", intensity: "Soft" },
  { type: "TRUTH", text: "As-tu déjà fait semblant de connaître un film ou une série pour ne pas paraître bête ?", intensity: "Soft" },

  { type: "DARE", text: "Fais 10 pompes bien exécutées devant tout le monde.", intensity: "Soft" },
  { type: "DARE", text: "Imite un membre du groupe jusqu'à ce que quelqu'un devine qui c'est.", intensity: "Soft" },
  { type: "DARE", text: "Chante le refrain de ta chanson préférée avec une voix d'opéra.", intensity: "Soft" },
  { type: "DARE", text: "Ne parle plus qu'en chuchotant jusqu'à ton prochain tour.", intensity: "Soft" },
  { type: "DARE", text: "Fais une grimace et garde-la pendant 15 secondes sans rire.", intensity: "Soft" },
  { type: "DARE", text: "Parle avec un accent étranger (ex: québécois, italien) jusqu'à ton prochain tour.", intensity: "Soft" },
  { type: "DARE", text: "Fais un monologue dramatique de 30 secondes sur l'importance de manger des légumes.", intensity: "Soft" },
  { type: "DARE", text: "Raconte la pire blague que tu connaisses avec le plus grand sérieux du monde.", intensity: "Soft" },
  { type: "DARE", text: "Essaye de toucher ton nez avec ta langue devant tout le monde.", intensity: "Soft" },

  // 🥳 FUN — Ambiance, décalé & défis marrants
  { type: "TRUTH", text: "As-tu déjà fouillé en secret dans le téléphone de quelqu'un ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quelle est ta pire honte arrivée en public ?", intensity: "Fun" },
  { type: "TRUTH", text: "Si tu devais échanger ta vie avec un joueur de la pièce pour une journée, qui ce serait ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quel est le mensonge le plus absurde que tu aies raconté pour sécher un cours ou un rendez-vous ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quelle est la chose la plus bizarre que tu aies faite quand tu étais seul chez toi ?", intensity: "Fun" },
  { type: "TRUTH", text: "As-tu déjà supprimé un message juste après l'avoir envoyé par pure panique ?", intensity: "Fun" },
  { type: "TRUTH", text: "Qui dans ce groupe serait le premier à survivre en cas d'invasion zombie ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quel est ton pire flop en essayant de draguer quelqu'un ?", intensity: "Fun" },
  { type: "TRUTH", text: "As-tu déjà fait semblant de dormir pour éviter une conversation ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quelle est l'habitude la plus énervante qu'un ami puisse avoir selon toi ?", intensity: "Fun" },

  { type: "DARE", text: "Laisse le joueur à ta droite te refaire une coiffure originale.", intensity: "Fun" },
  { type: "DARE", text: "Envoie une photo grimaçante au 3ème contact récent de ton téléphone.", intensity: "Fun" },
  { type: "DARE", text: "Danse le robot pendant 30 secondes sans musique.", intensity: "Fun" },
  { type: "DARE", text: "Laisse le groupe te choisir un surnom que tu dois utiliser toute la soirée.", intensity: "Fun" },
  { type: "DARE", text: "Imite le cri d'un coq à plein poumon.", intensity: "Fun" },
  { type: "DARE", text: "Fais 5 squats en portant (ou faisant semblant de porter) le joueur à ta gauche.", intensity: "Fun" },
  { type: "DARE", text: "Propose une battle de danse improvisée de 20 secondes contre le joueur de ton choix.", intensity: "Fun" },
  { type: "DARE", text: "Laisse quelqu'un écrire un mot loufoque sur ton bras avec un stylo.", intensity: "Fun" },
  { type: "DARE", text: "Répète 'Je suis un génie méconnu' après chaque phrase jusqu'à ton prochain tour.", intensity: "Fun" },

  // 🌶️ PIQUANT — Révélations, répliques & défis gênants
  { type: "TRUTH", text: "Quel est ton plus grand crush secret dans cette pièce ou dans ton cercle proche ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quelle est la chose la plus folle que tu aies faite par amour ou par jalousie ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quel est le premier détail physique que tu regardes chez une personne qui te plaît ?", intensity: "Piquant" },
  { type: "TRUTH", text: "As-tu déjà menti à un ami proche ici présent ? Si oui, à propos de quoi ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quel est le message le plus gênant que tu aies reçu récemment dans tes DMs ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Qui autour de cette table penses-tu être le plus grand séducteur / la plus grande séductrice ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Si tu devais embrasser un joueur dans cette pièce (sur la joue ou les lèvres), qui choisirais-tu ?", intensity: "Piquant" },
  { type: "TRUTH", text: "As-tu déjà stalké l'ex de quelqu'un sur les réseaux sociaux pendant plus de 20 minutes ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quelle est la pire décision romantique ou amicale que tu aies prise cette année ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Si tu pouvais effacer une rencontre de ton passé, qui effacerais-tu ?", intensity: "Piquant" },

  { type: "DARE", text: "Laisse le joueur à ta gauche lire à voix haute le tout dernier message d'une de tes conversations.", intensity: "Piquant" },
  { type: "DARE", text: "Fais un compliment très sincère et troublant à la personne de ton choix dans la pièce.", intensity: "Piquant" },
  { type: "DARE", text: "Fais une déclaration d'amour passionnée et théâtrale à la personne en face de toi.", intensity: "Piquant" },
  { type: "DARE", text: "Prends une cuillère d'un condiment improbable (sauce piquante, moutarde...) choisi par le groupe.", intensity: "Piquant" },
  { type: "DARE", text: "Regarde le joueur à ta droite dans les yeux pendant 30 secondes sans ciller ni rire.", intensity: "Piquant" },
  { type: "DARE", text: "Laisse le groupe poster une story éphémère (texte ou photo rigolote) sur ton compte Insta/Snap.", intensity: "Piquant" },
  { type: "DARE", text: "Murmure un secret totalement faux mais crédible à l'oreille du joueur de ton choix.", intensity: "Piquant" },
  { type: "DARE", text: "Fais un massage des épaules de 30 secondes au joueur qui a le score le plus bas.", intensity: "Piquant" },
  { type: "DARE", text: "Accepte de répondre en toute honnêteté à une question choisie sur-le-champ par TOUT le groupe réunis.", intensity: "Piquant" },
];

export function getRandomCard(type: CardType, intensity: IntensityLevel = "Toutes"): TodCard {
  let pool = TOD_CONTENT.filter(c => c.type === type);
  if (intensity === "Soft") pool = pool.filter(c => c.intensity === "Soft");
  else if (intensity === "Fun") pool = pool.filter(c => c.intensity === "Fun");
  else if (intensity === "Piquant") pool = pool.filter(c => c.intensity === "Piquant");
  
  if (pool.length === 0) pool = TOD_CONTENT.filter(c => c.type === type);
  return pool[Math.floor(Math.random() * pool.length)];
}
