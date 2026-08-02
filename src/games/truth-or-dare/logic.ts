export type CardType = "TRUTH" | "DARE";
export type IntensityLevel = "Soft 🌸" | "Fun 🥳" | "Piquant 🌶️" | "Toutes 🔥";

export interface TodCard {
  type: CardType;
  text: string;
  intensity: "Soft" | "Fun" | "Piquant";
}

export const TOD_CATEGORIES: IntensityLevel[] = ["Toutes 🔥", "Soft 🌸", "Fun 🥳", "Piquant 🌶️"];

export const TOD_CONTENT: TodCard[] = [
  // Soft 🌸
  { type: "TRUTH", text: "Quel est ton pire souvenir d'enfance le plus rigolo ?", intensity: "Soft" },
  { type: "TRUTH", text: "Qui dans cette pièce est le mieux habillé ce soir ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quel est l'achat le plus inutile que tu aies jamais fait ?", intensity: "Soft" },
  { type: "TRUTH", text: "Quelle est la chanson que tu écoutes en secret sans l'avouer ?", intensity: "Soft" },
  { type: "DARE", text: "Fais 10 pompes bien exécutées devant tout le monde.", intensity: "Soft" },
  { type: "DARE", text: "Imite un membre du groupe jusqu'à ce que quelqu'un devine qui c'est.", intensity: "Soft" },
  { type: "DARE", text: "Chante le refrain de ta chanson préférée avec une voix d'opéra.", intensity: "Soft" },
  { type: "DARE", text: "Ne parle plus qu'en chuchotant jusqu'à ton prochain tour.", intensity: "Soft" },

  // Fun 🥳
  { type: "TRUTH", text: "As-tu déjà fouillé en secret dans le téléphone de quelqu'un ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quelle est ta pire honte arrivée en public ?", intensity: "Fun" },
  { type: "TRUTH", text: "Si tu devais échanger ta vie avec un joueur de la pièce pour une journée, qui ce serait ?", intensity: "Fun" },
  { type: "TRUTH", text: "Quel est le mensonge le plus absurde que tu aies raconté pour sécher un cours ou un rendez-vous ?", intensity: "Fun" },
  { type: "DARE", text: "Laisse le joueur à ta droite te refaire une coiffure originale.", intensity: "Fun" },
  { type: "DARE", text: "Envoie une photo grimaçante à ton 3ème contact récent sur WhatsApp.", intensity: "Fun" },
  { type: "DARE", text: "Danse le robot pendant 30 secondes sans musique.", intensity: "Fun" },
  { type: "DARE", text: "Laisse le groupe te choisir un surnom que tu dois utiliser toute la soirée.", intensity: "Fun" },

  // Piquant 🌶️
  { type: "TRUTH", text: "Quel est ton plus grand béguin secret dans cette pièce ou dans ton cercle d'amis ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quelle est la chose la plus folle que tu aies faite par amour ou par jalousie ?", intensity: "Piquant" },
  { type: "TRUTH", text: "Quel est le premier détail physique que tu regardes chez une personne qui te plaît ?", intensity: "Piquant" },
  { type: "TRUTH", text: "As-tu déjà menti à un ami proche ici présent ? Si oui, quoi ?", intensity: "Piquant" },
  { type: "DARE", text: "Laisse le joueur à ta gauche lire le dernier message d'une de tes conversations.", intensity: "Piquant" },
  { type: "DARE", text: "Fais un compliment très sincère et déplacé à la personne de ton choix dans la pièce.", intensity: "Piquant" },
  { type: "DARE", text: "Fais une déclaration d'amour théâtrale à la personne en face de toi.", intensity: "Piquant" },
  { type: "DARE", text: "Prends une cuillère d'un condiment improbable choisi par le groupe.", intensity: "Piquant" },
];

export function getRandomCard(type: CardType, intensity: IntensityLevel = "Toutes 🔥"): TodCard {
  let pool = TOD_CONTENT.filter(c => c.type === type);
  if (intensity === "Soft 🌸") pool = pool.filter(c => c.intensity === "Soft");
  else if (intensity === "Fun 🥳") pool = pool.filter(c => c.intensity === "Fun");
  else if (intensity === "Piquant 🌶️") pool = pool.filter(c => c.intensity === "Piquant");
  
  if (pool.length === 0) pool = TOD_CONTENT.filter(c => c.type === type);
  return pool[Math.floor(Math.random() * pool.length)];
}
