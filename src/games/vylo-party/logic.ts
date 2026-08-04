export type VyloPartyCategory = 
  | "Toutes"
  | "Défis Flash"
  | "Vérités Piquantes"
  | "Duels & Groupe"
  | "Chrono 5s";

export interface VyloPartyCard {
  id: string;
  template: string; // Ex: "{player1}, passe le téléphone à {player2} ! Il a 15s pour..."
  type: "SINGLE" | "TARGET" | "DUEL" | "GROUP";
  category: VyloPartyCategory;
}

export const VYLO_PARTY_CATEGORIES: VyloPartyCategory[] = [
  "Toutes",
  "Défis Flash",
  "Vérités Piquantes",
  "Duels & Groupe",
  "Chrono 5s"
];

export const VYLO_PARTY_DATABASE: VyloPartyCard[] = [
  // --- Défis Flash (Passage de téléphone) ---
  { id: "df1", template: "{player1}, passe le téléphone à {player2} ! {player2} doit imiter le cri d'un animal sauvage pendant 10 secondes sans rire.", type: "TARGET", category: "Défis Flash" },
  { id: "df2", template: "{player1}, tu as 15 secondes pour chanter un refrain de rap français avec la voix la plus aiguë possible !", type: "SINGLE", category: "Défis Flash" },
  { id: "df3", template: "{player1}, passe le téléphone à {player2} ! {player2} doit laisser {player1} choisir son prochain surnom pour la soirée.", type: "TARGET", category: "Défis Flash" },
  { id: "df4", template: "{player1}, fais deviner un mot à {player2} uniquement en faisant du mime !", type: "DUEL", category: "Défis Flash" },
  { id: "df5", template: "{player1}, passe le téléphone à {player2} ! {player2} doit raconter sa pire blague en gardant un visage totalement sérieux.", type: "TARGET", category: "Défis Flash" },
  { id: "df6", template: "{player1}, passe le téléphone à {player2} ! {player2} doit chanter le refrain de 'Tiki Taka' ou d'un hit d'Aya Nakamura !", type: "TARGET", category: "Défis Flash" },
  { id: "df7", template: "{player1}, passe le téléphone à {player2} ! {player2} doit faire une déclaration d'amour théâtrale à une chaise de la pièce !", type: "TARGET", category: "Défis Flash" },
  { id: "df8", template: "{player1}, passe le téléphone à {player2} ! {player2} doit laisser {player1} choisir son nouveau fond d'écran pour 10 minutes !", type: "TARGET", category: "Défis Flash" },
  { id: "df9", template: "{player1}, passe le téléphone à {player2} ! {player2} doit répéter tout ce que dit {player1} pendant 20 secondes !", type: "TARGET", category: "Défis Flash" },
  { id: "df10", template: "{player1}, passe le téléphone à {player2} ! {player2} doit imiter le rire d'un méchant de dessin animé !", type: "TARGET", category: "Défis Flash" },
  { id: "df11", template: "{player1}, passe le téléphone à {player2} ! {player2} doit faire un massage des épaules de 15 secondes à {player1}.", type: "TARGET", category: "Défis Flash" },
  { id: "df12", template: "{player1}, passe le téléphone à {player2} ! {player2} doit parler uniquement en rimant pendant 3 tours !", type: "TARGET", category: "Défis Flash" },
  { id: "df13", template: "{player1}, passe le téléphone à {player2} ! {player2} doit imiter la voix de Jul pendant 15 secondes !", type: "TARGET", category: "Défis Flash" },
  { id: "df14", template: "{player1}, passe le téléphone à {player2} ! {player2} doit faire la statue et ne plus bouger du tout pendant 30 secondes !", type: "TARGET", category: "Défis Flash" },
  { id: "df15", template: "{player1}, passe le téléphone à {player2} ! {player2} doit donner un compliment sincère et exagéré à {player1}.", type: "TARGET", category: "Défis Flash" },
  { id: "df16", template: "{player1}, passe le téléphone à {player2} ! {player2} doit faire 10 squats sautés en criant 'JE SUIS EN FORME !'.", type: "TARGET", category: "Défis Flash" },
  { id: "df17", template: "{player1}, passe le téléphone à {player2} ! {player2} doit raconter une histoire drôle en utilisant un accent italien !", type: "TARGET", category: "Défis Flash" },
  { id: "df18", template: "{player1}, passe le téléphone à {player2} ! {player2} doit imiter un présentateur du JT de 20h !", type: "TARGET", category: "Défis Flash" },
  { id: "df19", template: "{player1}, passe le téléphone à {player2} ! {player2} doit faire semblant d'être au téléphone avec une grande star !", type: "TARGET", category: "Défis Flash" },
  { id: "df20", template: "{player1}, passe le téléphone à {player2} ! {player2} doit réciter l'alphabet à l'envers sans se tromper !", type: "TARGET", category: "Défis Flash" },

  // --- Vérités Piquantes ---
  { id: "vp1", template: "{player1}, avoue la chose la plus embarrassante que tu as faite cette année ou prends un gage !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp2", template: "{player1}, désigne la personne dans la pièce qui selon toi s'habille avec le plus de style !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp3", template: "{player1}, passe le téléphone à {player2} ! {player2} doit révéler son dernier message reçu ou prendre un gage.", type: "TARGET", category: "Vérités Piquantes" },
  { id: "vp4", template: "{player1}, dis quelle est la première impression que tu as eue sur {player2} la première fois que tu l'as vu !", type: "DUEL", category: "Vérités Piquantes" },
  { id: "vp5", template: "{player1}, avoue quelle chanson honteuse tu écoutes en cachette sous la douche !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp6", template: "{player1}, quelle est la pire bêtise que tu as faite à l'école sans jamais te faire attraper ?", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp7", template: "{player1}, si tu devais échanger ta vie avec l'un des joueurs de la soirée pour une journée, qui choisirais-tu et pourquoi ?", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp8", template: "{player1}, dis quel est le message le plus gênant que tu as envoyé cette semaine !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp9", template: "{player1}, avoue quelle est la manie la plus bizarre que tu as quand tu es seul chez toi !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp10", template: "{player1}, quelle est la plus grande honte que tu as vécue devant une personne qui te plaisait ?", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp11", template: "{player1}, passe le téléphone à {player2} ! {player2} doit avouer quel joueur de la pièce est le plus susceptible de lui prêter de l'argent.", type: "TARGET", category: "Vérités Piquantes" },
  { id: "vp12", template: "{player1}, si tu gagnais 1 million d'euros ce soir, quelle est la première chose absurde que tu achèterais ?", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp13", template: "{player1}, dis quel est le pire cadeau qu'on t'ait jamais offert et ce que tu en as fait !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp14", template: "{player1}, avoue quelle est la dispute la plus bête que tu as eue dans ta vie !", type: "SINGLE", category: "Vérités Piquantes" },
  { id: "vp15", template: "{player1}, raconte l'excuse la plus incroyable que tu as sortie pour annuler une soirée !", type: "SINGLE", category: "Vérités Piquantes" },

  // --- Duels & Groupe ---
  { id: "dg1", template: "DUEL ! {player1} et {player2} se font un duel de regard ! Le premier qui cligne des yeux ou rigole prend un gage !", type: "DUEL", category: "Duels & Groupe" },
  { id: "dg2", template: "ACTION GROUPE ! Tout le monde pointe simultanément du doigt la personne la plus drôle de la soirée à 3... 1, 2, 3 !", type: "GROUP", category: "Duels & Groupe" },
  { id: "dg3", template: "CHORE ! {player1} et {player2} doivent improviser une danse de 10 secondes en synchronisation parfaite !", type: "DUEL", category: "Duels & Groupe" },
  { id: "dg4", template: "VOTE GROUPE ! Désignez tous la personne qui risque le plus de perdre ses affaires d'ici la fin de la soirée !", type: "GROUP", category: "Duels & Groupe" },
  { id: "dg5", template: "DUEL ! {player1} et {player2} font un bras de fer chinois ou un duel de pierre-feuille-ciseaux en 3 manches gagnantes !", type: "DUEL", category: "Duels & Groupe" },
  { id: "dg6", template: "DUEL ! {player1} et {player2} doivent chanter en duo le refrain d'une chanson connue de tous !", type: "DUEL", category: "Duels & Groupe" },
  { id: "dg7", template: "DUEL ! {player1} et {player2} doivent se faire un concours de compliments : le premier qui bafouille perd !", type: "DUEL", category: "Duels & Groupe" },
  { id: "dg8", template: "ACTION GROUPE ! Tout le monde se lève et fait une hola générale à la santé de {player1} !", type: "GROUP", category: "Duels & Groupe" },
  { id: "dg9", template: "VOTE GROUPE ! Désignez tous à 3 la personne la plus susceptible d'oublier son mot de passe de téléphone !", type: "GROUP", category: "Duels & Groupe" },
  { id: "dg10", template: "VOTE GROUPE ! Tout le monde pointe la personne la plus gourmande de la bande !", type: "GROUP", category: "Duels & Groupe" },

  // --- Chrono 5s ---
  { id: "c5_1", template: "{player1}, cite 3 marques de sneakers en moins de 5 secondes ! C'est parti !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_2", template: "{player1}, cite 3 rappeurs français en moins de 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_3", template: "{player1}, cite 3 trucs qu'on trouve au fond d'un frigo en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_4", template: "{player1}, cite 3 séries Netflix cultes en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_5", template: "{player1}, cite 3 marques de voitures allemandes en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_6", template: "{player1}, cite 3 villes de France commençant par la lettre M en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_7", template: "{player1}, cite 3 plats italiens délicieux en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_8", template: "{player1}, cite 3 rappeurs du 93 ou du 91 en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_9", template: "{player1}, cite 3 choses qu'on met dans une valise pour la plage en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_10", template: "{player1}, cite 3 applications indispensables sur ton téléphone en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_11", template: "{player1}, cite 3 personnages de films Disney en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_12", template: "{player1}, cite 3 marques de fast-food célèbres en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_13", template: "{player1}, cite 3 objets qu'on trouve dans une cuisine en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_14", template: "{player1}, cite 3 sports qui se jouent avec un ballon en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_15", template: "{player1}, cite 3 super-héros de Marvel ou DC en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_16", template: "{player1}, cite 3 chansons de Jul ou de Ninho en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_17", template: "{player1}, cite 3 choses rouges qu'on trouve dans une maison en 5 secondes !", type: "SINGLE", category: "Chrono 5s" },
  { id: "c5_18", template: "{player1}, cite 3 excuses pour arriver 30 minutes en retard en 5 secondes !", type: "SINGLE", category: "Chrono 5s" }
];

const usedCardIdsHistory = new Set<string>();

/** Format de la carte avec remplacement dynamique des prénoms */
export function formatPartyCard(card: VyloPartyCard, player1Name: string, player2Name: string): string {
  return card.template
    .replace(/{player1}/g, player1Name)
    .replace(/{player2}/g, player2Name);
}

/** Tirer une carte de soirée sans répétition */
export function getRandomPartyCard(category: VyloPartyCategory = "Toutes"): VyloPartyCard {
  let pool = VYLO_PARTY_DATABASE;
  if (category !== "Toutes") {
    pool = VYLO_PARTY_DATABASE.filter(c => c.category === category);
  }
  if (pool.length === 0) pool = VYLO_PARTY_DATABASE;

  let availablePool = pool.filter(c => !usedCardIdsHistory.has(c.id));

  if (availablePool.length === 0) {
    pool.forEach(c => usedCardIdsHistory.delete(c.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedCardIdsHistory.add(chosen.id);

  return chosen;
}
