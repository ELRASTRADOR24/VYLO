export type CardType = "TRUTH" | "DARE";

export interface TodCard {
  type: CardType;
  text: string;
  difficulty: number; // 1: Soft, 2: Hot, 3: Extreme
}

export const TOD_CONTENT: TodCard[] = [
  { type: "TRUTH", text: "Quel est ton plus grand mensonge ?", difficulty: 1 },
  { type: "TRUTH", text: "Qui dans cette pièce est le mieux habillé ?", difficulty: 1 },
  { type: "TRUTH", text: "As-tu déjà fouillé dans le téléphone de ton/ta partenaire ?", difficulty: 2 },
  { type: "TRUTH", text: "Quelle est ta pire honte en public ?", difficulty: 1 },
  { type: "TRUTH", text: "Quel est ton secret le plus inavouable ?", difficulty: 3 },

  { type: "DARE", text: "Fais 10 pompes ou bois 2 gorgées.", difficulty: 1 },
  { type: "DARE", text: "Imite un membre du groupe jusqu'à ce que quelqu'un devine qui c'est.", difficulty: 1 },
  { type: "DARE", text: "Laisse le joueur à ta droite envoyer le message de son choix à un de tes contacts.", difficulty: 3 },
  { type: "DARE", text: "Mange une cuillère de piment ou sauce piquante.", difficulty: 2 },
  { type: "DARE", text: "Ne parle plus jusqu'à ton prochain tour.", difficulty: 1 },
];

export function getRandomCard(type: CardType): TodCard {
  const filtered = TOD_CONTENT.filter(c => c.type === type);
  return filtered[Math.floor(Math.random() * filtered.length)];
}
