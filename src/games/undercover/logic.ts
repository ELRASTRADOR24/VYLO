import { Player } from "@/engine/types";

export type UndercoverRole = "Civilian" | "Undercover" | "MrWhite";

export interface UndercoverPlayer extends Player {
  gameRole?: UndercoverRole;
  word?: string; // Le mot secret reçu
  isEliminated: boolean;
  scorePoints: number;
}

export interface UndercoverWordPair {
  civilian: string;
  undercover: string;
  category: string;
}

export const CATEGORIES = [
  "Toutes les catégories",
  "Incontournables de Soirée",
  "Anime, Manga & Geek Culture",
  "Légendes, Fantaisie & Super-Héros",
  "Écoles, Culture & Arts",
  "Émotions, Esprit & Adjectifs",
  "Nature & Éléments",
  "High-Tech & Digital",
  "Animaux",
  "Nourriture & Cuisine",
  "Football & Sport",
  "Jeux vidéo",
  "Films & Séries",
  "Célébrités & Star System",
  "Objets du quotidien",
  "Vêtements & Mode",
  "Transports",
  "Maison",
  "Métiers",
  "Pays & Géographie",
  "Marques",
  "Mode Expert"
] as const;

export type CategoryName = typeof CATEGORIES[number];

export const WORD_PAIRS_DATABASE: UndercoverWordPair[] = [
  // Incontournables de Soirée (25 paires ultra-connues)
  { civilian: "Pain au chocolat", undercover: "Chocolatine", category: "Incontournables de Soirée" },
  { civilian: "WhatsApp", undercover: "Snapchat", category: "Incontournables de Soirée" },
  { civilian: "Mojito", undercover: "Piña Colada", category: "Incontournables de Soirée" },
  { civilian: "Pastis", undercover: "Ricard", category: "Incontournables de Soirée" },
  { civilian: "Champagne", undercover: "Prosecco", category: "Incontournables de Soirée" },
  { civilian: "Cigarette", undercover: "Vape", category: "Incontournables de Soirée" },
  { civilian: "Père Noël", undercover: "Saint Nicolas", category: "Incontournables de Soirée" },
  { civilian: "Baguette", undercover: "Tradition", category: "Incontournables de Soirée" },
  { civilian: "Plage", undercover: "Piscine", category: "Incontournables de Soirée" },
  { civilian: "Soleil", undercover: "Lune", category: "Incontournables de Soirée" },
  { civilian: "Facebook", undercover: "Instagram", category: "Incontournables de Soirée" },
  { civilian: "Chocolat", undercover: "Nutella", category: "Incontournables de Soirée" },
  { civilian: "TGV", undercover: "TER", category: "Incontournables de Soirée" },
  { civilian: "Gendarme", undercover: "Policier", category: "Incontournables de Soirée" },
  { civilian: "Château", undercover: "Palais", category: "Incontournables de Soirée" },
  { civilian: "Dents", undercover: "Langue", category: "Incontournables de Soirée" },
  { civilian: "Cheveux", undercover: "Barbe", category: "Incontournables de Soirée" },
  { civilian: "Doigt", undercover: "Orteil", category: "Incontournables de Soirée" },
  { civilian: "Cœur", undercover: "Poumon", category: "Incontournables de Soirée" },
  { civilian: "Montagne", undercover: "Mer", category: "Incontournables de Soirée" },
  { civilian: "Soleil", undercover: "Pluie", category: "Incontournables de Soirée" },
  { civilian: "Café", undercover: "Espresso", category: "Incontournables de Soirée" },
  { civilian: "T-shirt", undercover: "Chemise", category: "Incontournables de Soirée" },
  { civilian: "Super Mario", undercover: "Sonic", category: "Incontournables de Soirée" },
  { civilian: "Superman", undercover: "Spider-Man", category: "Incontournables de Soirée" },

  // Anime, Manga & Geek Culture (22)
  { civilian: "Naruto", undercover: "Sasuke", category: "Anime, Manga & Geek Culture" },
  { civilian: "Sakura", undercover: "Hinata", category: "Anime, Manga & Geek Culture" },
  { civilian: "Kakashi", undercover: "Itachi", category: "Anime, Manga & Geek Culture" },
  { civilian: "One Piece", undercover: "Naruto", category: "Anime, Manga & Geek Culture" },
  { civilian: "Luffy", undercover: "Gon", category: "Anime, Manga & Geek Culture" },
  { civilian: "Zoro", undercover: "Sasuke", category: "Anime, Manga & Geek Culture" },
  { civilian: "Goku", undercover: "Saitama", category: "Anime, Manga & Geek Culture" },
  { civilian: "Vegeta", undercover: "Goku", category: "Anime, Manga & Geek Culture" },
  { civilian: "Pikachu", undercover: "Évoli", category: "Anime, Manga & Geek Culture" },
  { civilian: "Pokémon", undercover: "Yu-Gi-Oh", category: "Anime, Manga & Geek Culture" },
  { civilian: "Demon Slayer", undercover: "Jujutsu Kaisen", category: "Anime, Manga & Geek Culture" },
  { civilian: "Tanjiro", undercover: "Zenitsu", category: "Anime, Manga & Geek Culture" },
  { civilian: "Gojo", undercover: "Sukuna", category: "Anime, Manga & Geek Culture" },
  { civilian: "Attack on Titan", undercover: "Tokyo Ghoul", category: "Anime, Manga & Geek Culture" },
  { civilian: "Eren", undercover: "Levi", category: "Anime, Manga & Geek Culture" },
  { civilian: "Death Note", undercover: "Code Geass", category: "Anime, Manga & Geek Culture" },
  { civilian: "Dragon Ball Z", undercover: "Dragon Ball Super", category: "Anime, Manga & Geek Culture" },
  { civilian: "Jedi", undercover: "Sith", category: "Anime, Manga & Geek Culture" },
  { civilian: "Dark Vador", undercover: "Voldemort", category: "Anime, Manga & Geek Culture" },
  { civilian: "Harry Potter", undercover: "Hermione", category: "Anime, Manga & Geek Culture" },
  { civilian: "Gryffondor", undercover: "Serpentard", category: "Anime, Manga & Geek Culture" },

  // Légendes, Fantaisie & Super-Héros (26)
  { civilian: "Batman", undercover: "Superman", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Joker", undercover: "Venom", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Iron Man", undercover: "Spider-Man", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Thor", undercover: "Hulk", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Captain America", undercover: "Superman", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Roi", undercover: "Président", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Reine", undercover: "Princesse", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Prince", undercover: "Chevalier", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Château", undercover: "Palais", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Épée", undercover: "Sabre", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Arc", undercover: "Arbalète", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Bouclier", undercover: "Armure", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Dragon", undercover: "Dinosaure", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Vampire", undercover: "Loup-garou", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Sorcier", undercover: "Magicien", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Zombie", undercover: "Momie", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Fantôme", undercover: "Esprit", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Pirate", undercover: "Corsaire", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Trésor", undercover: "Diamant", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Carte au trésor", undercover: "GPS", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Détective", undercover: "Policier", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Espion", undercover: "Agent secret", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Cambrioleur", undercover: "Voleur", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Prison", undercover: "Prisonnier", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Méchant", undercover: "Vilain", category: "Légendes, Fantaisie & Super-Héros" },
  { civilian: "Héros", undercover: "Sauveur", category: "Légendes, Fantaisie & Super-Héros" },

  // Écoles, Culture & Arts (20)
  { civilian: "École", undercover: "Université", category: "Écoles, Culture & Arts" },
  { civilian: "Lycée", undercover: "Collège", category: "Écoles, Culture & Arts" },
  { civilian: "Classe", undercover: "Salle", category: "Écoles, Culture & Arts" },
  { civilian: "Élève", undercover: "Étudiant", category: "Écoles, Culture & Arts" },
  { civilian: "Professeur", undercover: "Formateur", category: "Écoles, Culture & Arts" },
  { civilian: "Livre", undercover: "Manuel", category: "Écoles, Culture & Arts" },
  { civilian: "Roman", undercover: "Conte", category: "Écoles, Culture & Arts" },
  { civilian: "Histoire", undercover: "Légende", category: "Écoles, Culture & Arts" },
  { civilian: "Journal", undercover: "Article", category: "Écoles, Culture & Arts" },
  { civilian: "Lettre", undercover: "Message", category: "Écoles, Culture & Arts" },
  { civilian: "Message", undercover: "Notification", category: "Écoles, Culture & Arts" },
  { civilian: "Photo", undercover: "Portrait", category: "Écoles, Culture & Arts" },
  { civilian: "Image", undercover: "Illustration", category: "Écoles, Culture & Arts" },
  { civilian: "Dessin", undercover: "Peinture", category: "Écoles, Culture & Arts" },
  { civilian: "Peinture", undercover: "Tableau", category: "Écoles, Culture & Arts" },
  { civilian: "Artiste", undercover: "Créateur", category: "Écoles, Culture & Arts" },
  { civilian: "Musique", undercover: "Mélodie", category: "Écoles, Culture & Arts" },
  { civilian: "Chanson", undercover: "Musique", category: "Écoles, Culture & Arts" },
  { civilian: "Danse", undercover: "Chorégraphe", category: "Écoles, Culture & Arts" },
  { civilian: "Théâtre", undercover: "Cinéma", category: "Écoles, Culture & Arts" },
  { civilian: "Spectacle", undercover: "Concert", category: "Écoles, Culture & Arts" },
  { civilian: "Magie", undercover: "Illusion", category: "Écoles, Culture & Arts" },

  // Émotions, Esprit & Adjectifs (25)
  { civilian: "Secret", undercover: "Mystère", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Mensonge", undercover: "Excuse", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Vérité", undercover: "Réalité", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Rêve", undercover: "Imagination", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Idée", undercover: "Pensée", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Mémoire", undercover: "Souvenir", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Amour", undercover: "Amitié", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Amitié", undercover: "Fraternité", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Colère", undercover: "Rage", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Joie", undercover: "Bonheur", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Peur", undercover: "Stress", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Courage", undercover: "Force", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Force", undercover: "Puissance", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Vitesse", undercover: "Rapidité", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Lent", undercover: "Calme", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Chaud", undercover: "Tiède", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Froid", undercover: "Glacé", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Grand", undercover: "Géant", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Petit", undercover: "Minuscule", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Nouveau", undercover: "Moderne", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Ancien", undercover: "Vieux", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Propre", undercover: "Neuf", category: "Émotions, Esprit & Adjectifs" },
  { civilian: "Sale", undercover: "Poussiéreux", category: "Émotions, Esprit & Adjectifs" },

  // Nature & Éléments (33)
  { civilian: "Neige", undercover: "Grêle", category: "Nature & Éléments" },
  { civilian: "Pluie", undercover: "Averse", category: "Nature & Éléments" },
  { civilian: "Orage", undercover: "Tempête", category: "Nature & Éléments" },
  { civilian: "Éclair", undercover: "Tonnerre", category: "Nature & Éléments" },
  { civilian: "Arc-en-ciel", undercover: "Aurore", category: "Nature & Éléments" },
  { civilian: "Soleil", undercover: "Étoile", category: "Nature & Éléments" },
  { civilian: "Lune", undercover: "Satellite", category: "Nature & Éléments" },
  { civilian: "Planète", undercover: "Astéroïde", category: "Nature & Éléments" },
  { civilian: "Comète", undercover: "Météorite", category: "Nature & Éléments" },
  { civilian: "Ciel", undercover: "Horizon", category: "Nature & Éléments" },
  { civilian: "Mer", undercover: "Océan", category: "Nature & Éléments" },
  { civilian: "Rivière", undercover: "Fleuve", category: "Nature & Éléments" },
  { civilian: "Lac", undercover: "Étang", category: "Nature & Éléments" },
  { civilian: "Cascade", undercover: "Chute d'eau", category: "Nature & Éléments" },
  { civilian: "Île", undercover: "Archipel", category: "Nature & Éléments" },
  { civilian: "Plage", undercover: "Côte", category: "Nature & Éléments" },
  { civilian: "Désert", undercover: "Dune", category: "Nature & Éléments" },
  { civilian: "Montagne", undercover: "Colline", category: "Nature & Éléments" },
  { civilian: "Grotte", undercover: "Caverne", category: "Nature & Éléments" },
  { civilian: "Forêt", undercover: "Jungle", category: "Nature & Éléments" },
  { civilian: "Arbre", undercover: "Sapin", category: "Nature & Éléments" },
  { civilian: "Fleur", undercover: "Rose", category: "Nature & Éléments" },
  { civilian: "Tulipe", undercover: "Lys", category: "Nature & Éléments" },
  { civilian: "Bambou", undercover: "Roseau", category: "Nature & Éléments" },
  { civilian: "Feuille", undercover: "Branche", category: "Nature & Éléments" },
  { civilian: "Racine", undercover: "Tronc", category: "Nature & Éléments" },
  { civilian: "Graine", undercover: "Noyau", category: "Nature & Éléments" },
  { civilian: "Champignon", undercover: "Truffe", category: "Nature & Éléments" },
  { civilian: "Pierre", undercover: "Roche", category: "Nature & Éléments" },
  { civilian: "Diamant", undercover: "Cristal", category: "Nature & Éléments" },
  { civilian: "Or", undercover: "Argent", category: "Nature & Éléments" },
  { civilian: "Bronze", undercover: "Cuivre", category: "Nature & Éléments" },
  { civilian: "Fer", undercover: "Acier", category: "Nature & Éléments" },

  // High-Tech & Digital (12)
  { civilian: "Wi-Fi", undercover: "Bluetooth", category: "High-Tech & Digital" },
  { civilian: "Internet", undercover: "Réseau", category: "High-Tech & Digital" },
  { civilian: "Mot de passe", undercover: "Code PIN", category: "High-Tech & Digital" },
  { civilian: "QR Code", undercover: "Code-barres", category: "High-Tech & Digital" },
  { civilian: "Email", undercover: "SMS", category: "High-Tech & Digital" },
  { civilian: "Appel", undercover: "Visioconférence", category: "High-Tech & Digital" },
  { civilian: "Appareil photo", undercover: "Caméra", category: "High-Tech & Digital" },
  { civilian: "Vidéo", undercover: "Film", category: "High-Tech & Digital" },
  { civilian: "Playlist", undercover: "Album", category: "High-Tech & Digital" },
  { civilian: "Prise", undercover: "Multiprise", category: "High-Tech & Digital" },
  { civilian: "Interrupteur", undercover: "Variateur", category: "High-Tech & Digital" },
  { civilian: "Ampoule", undercover: "Néon", category: "High-Tech & Digital" },
  { civilian: "Chat", undercover: "Tigre", category: "Animaux" },
  { civilian: "Chien", undercover: "Loup", category: "Animaux" },
  { civilian: "Lion", undercover: "Tigre", category: "Animaux" },
  { civilian: "Panthère", undercover: "Jaguar", category: "Animaux" },
  { civilian: "Léopard", undercover: "Guépard", category: "Animaux" },
  { civilian: "Zèbre", undercover: "Cheval", category: "Animaux" },
  { civilian: "Âne", undercover: "Cheval", category: "Animaux" },
  { civilian: "Lapin", undercover: "Lièvre", category: "Animaux" },
  { civilian: "Canard", undercover: "Oie", category: "Animaux" },
  { civilian: "Poule", undercover: "Coq", category: "Animaux" },
  { civilian: "Pigeon", undercover: "Colombe", category: "Animaux" },
  { civilian: "Aigle", undercover: "Faucon", category: "Animaux" },
  { civilian: "Corbeau", undercover: "Corneille", category: "Animaux" },
  { civilian: "Dauphin", undercover: "Requin", category: "Animaux" },
  { civilian: "Baleine", undercover: "Dauphin", category: "Animaux" },
  { civilian: "Requin", undercover: "Orque", category: "Animaux" },
  { civilian: "Tortue", undercover: "Escargot", category: "Animaux" },
  { civilian: "Escargot", undercover: "Limace", category: "Animaux" },
  { civilian: "Tortue", undercover: "Carapace", category: "Animaux" },
  { civilian: "Grenouille", undercover: "Crapaud", category: "Animaux" },
  { civilian: "Crocodile", undercover: "Alligator", category: "Animaux" },
  { civilian: "Souris", undercover: "Rat", category: "Animaux" },
  { civilian: "Abeille", undercover: "Guêpe", category: "Animaux" },
  { civilian: "Fourmi", undercover: "Termite", category: "Animaux" },
  { civilian: "Papillon", undercover: "Libellule", category: "Animaux" },
  { civilian: "Moustique", undercover: "Mouche", category: "Animaux" },

  // Nourriture & Cuisine (33)
  { civilian: "Pizza", undercover: "Tarte", category: "Nourriture & Cuisine" },
  { civilian: "Hamburger", undercover: "Cheeseburger", category: "Nourriture & Cuisine" },
  { civilian: "Riz", undercover: "Pâtes", category: "Nourriture & Cuisine" },
  { civilian: "Frites", undercover: "Chips", category: "Nourriture & Cuisine" },
  { civilian: "Banane", undercover: "Plantain", category: "Nourriture & Cuisine" },
  { civilian: "Orange", undercover: "Mandarine", category: "Nourriture & Cuisine" },
  { civilian: "Pomme", undercover: "Poire", category: "Nourriture & Cuisine" },
  { civilian: "Fraise", undercover: "Framboise", category: "Nourriture & Cuisine" },
  { civilian: "Citron", undercover: "Lime", category: "Nourriture & Cuisine" },
  { civilian: "Chocolat", undercover: "Cacao", category: "Nourriture & Cuisine" },
  { civilian: "Café", undercover: "Thé", category: "Nourriture & Cuisine" },
  { civilian: "Lait", undercover: "Yaourt", category: "Nourriture & Cuisine" },
  { civilian: "Beurre", undercover: "Margarine", category: "Nourriture & Cuisine" },
  { civilian: "Sel", undercover: "Sucre", category: "Nourriture & Cuisine" },
  { civilian: "Miel", undercover: "Confiture", category: "Nourriture & Cuisine" },
  { civilian: "Crêpe", undercover: "Pancake", category: "Nourriture & Cuisine" },
  { civilian: "Gaufre", undercover: "Crêpe", category: "Nourriture & Cuisine" },
  { civilian: "Glace", undercover: "Sorbet", category: "Nourriture & Cuisine" },
  { civilian: "Biscuit", undercover: "Cookie", category: "Nourriture & Cuisine" },
  { civilian: "Croissant", undercover: "Pain au chocolat", category: "Nourriture & Cuisine" },
  { civilian: "Tiramisu", undercover: "Mousse au chocolat", category: "Nourriture & Cuisine" },
  { civilian: "Cookie", undercover: "Brownie", category: "Nourriture & Cuisine" },
  { civilian: "Donut", undercover: "Beignet", category: "Nourriture & Cuisine" },
  { civilian: "Tacos", undercover: "Burrito", category: "Nourriture & Cuisine" },
  { civilian: "Nachos", undercover: "Doritos", category: "Nourriture & Cuisine" },
  { civilian: "Nutella", undercover: "Nocciolata", category: "Nourriture & Cuisine" },
  { civilian: "Red Bull", undercover: "Monster", category: "Nourriture & Cuisine" },
  { civilian: "Fanta", undercover: "Orangina", category: "Nourriture & Cuisine" },
  { civilian: "Kinder Bueno", undercover: "KitKat", category: "Nourriture & Cuisine" },
  { civilian: "Haribo", undercover: "Dragibus", category: "Nourriture & Cuisine" },
  { civilian: "Camembert", undercover: "Brie", category: "Nourriture & Cuisine" },
  { civilian: "Fromage", undercover: "Camembert", category: "Nourriture & Cuisine" },
  { civilian: "Raclette", undercover: "Fondue", category: "Nourriture & Cuisine" },
  { civilian: "Tartiflette", undercover: "Gratin dauphinois", category: "Nourriture & Cuisine" },
  { civilian: "Cerise", undercover: "Griotte", category: "Nourriture & Cuisine" },
  { civilian: "Raisin", undercover: "Myrtille", category: "Nourriture & Cuisine" },
  { civilian: "Ananas", undercover: "Mangue", category: "Nourriture & Cuisine" },
  { civilian: "Kiwi", undercover: "Avocat", category: "Nourriture & Cuisine" },
  { civilian: "Pastèque", undercover: "Melon", category: "Nourriture & Cuisine" },
  { civilian: "Sandwich", undercover: "Panini", category: "Nourriture & Cuisine" },
  { civilian: "Pain", undercover: "Baguette", category: "Nourriture & Cuisine" },
  { civilian: "Poivre", undercover: "Paprika", category: "Nourriture & Cuisine" },

  // Football & Sport (35)
  { civilian: "Mbappé", undercover: "Vinícius Jr.", category: "Football & Sport" },
  { civilian: "Messi", undercover: "Maradona", category: "Football & Sport" },
  { civilian: "Ronaldo", undercover: "Benzema", category: "Football & Sport" },
  { civilian: "Football", undercover: "Rugby", category: "Football & Sport" },
  { civilian: "Basket", undercover: "Volley", category: "Football & Sport" },
  { civilian: "Tennis", undercover: "Badminton", category: "Football & Sport" },
  { civilian: "Boxe", undercover: "MMA", category: "Football & Sport" },
  { civilian: "Natation", undercover: "Plongée", category: "Football & Sport" },
  { civilian: "Ski", undercover: "Snowboard", category: "Football & Sport" },
  { civilian: "Surf", undercover: "Skateboard", category: "Football & Sport" },
  { civilian: "Course", undercover: "Marche", category: "Football & Sport" },
  { civilian: "Marathon", undercover: "Sprint", category: "Football & Sport" },
  { civilian: "Stade", undercover: "Arena", category: "Football & Sport" },
  { civilian: "Ballon", undercover: "Balle", category: "Football & Sport" },
  { civilian: "Gardien", undercover: "Défenseur", category: "Football & Sport" },
  { civilian: "Attaquant", undercover: "Milieu", category: "Football & Sport" },
  { civilian: "Arbitre", undercover: "Entraîneur", category: "Football & Sport" },
  { civilian: "Carton jaune", undercover: "Carton rouge", category: "Football & Sport" },
  { civilian: "But", undercover: "Panier", category: "Football & Sport" },
  { civilian: "Coupe", undercover: "Trophée", category: "Football & Sport" },
  { civilian: "Médaille", undercover: "Récompense", category: "Football & Sport" },
  { civilian: "Champion", undercover: "Leader", category: "Football & Sport" },
  { civilian: "Équipe", undercover: "Groupe", category: "Football & Sport" },
  { civilian: "Corner", undercover: "Coup franc", category: "Football & Sport" },
  { civilian: "Penalty", undercover: "Coup franc", category: "Football & Sport" },
  { civilian: "Ligue 1", undercover: "Premier League", category: "Football & Sport" },
  { civilian: "Real Madrid", undercover: "FC Barcelone", category: "Football & Sport" },
  { civilian: "PSG", undercover: "Manchester City", category: "Football & Sport" },
  { civilian: "Coupe du Monde", undercover: "Euro", category: "Football & Sport" },
  { civilian: "Maillot", undercover: "Short", category: "Football & Sport" },
  { civilian: "Chaussures", undercover: "Crampons", category: "Football & Sport" },

  // Jeux vidéo (25)
  { civilian: "PlayStation", undercover: "Xbox", category: "Jeux vidéo" },
  { civilian: "Nintendo", undercover: "Sega", category: "Jeux vidéo" },
  { civilian: "Minecraft", undercover: "Roblox", category: "Jeux vidéo" },
  { civilian: "Fortnite", undercover: "PUBG", category: "Jeux vidéo" },
  { civilian: "FIFA", undercover: "eFootball", category: "Jeux vidéo" },
  { civilian: "Mario", undercover: "Luigi", category: "Jeux vidéo" },
  { civilian: "Zelda", undercover: "Link", category: "Jeux vidéo" },
  { civilian: "Pokémon", undercover: "Digimon", category: "Jeux vidéo" },
  { civilian: "Pac-Man", undercover: "Sonic", category: "Jeux vidéo" },
  { civilian: "GTA", undercover: "Saints Row", category: "Jeux vidéo" },
  { civilian: "Call of Duty", undercover: "Battlefield", category: "Jeux vidéo" },
  { civilian: "Valorant", undercover: "Counter-Strike", category: "Jeux vidéo" },
  { civilian: "Elden Ring", undercover: "Dark Souls", category: "Jeux vidéo" },
  { civilian: "Cyberpunk", undercover: "Watch Dogs", category: "Jeux vidéo" },
  { civilian: "Assassin's Creed", undercover: "Ghost of Tsushima", category: "Jeux vidéo" },
  { civilian: "Mario Kart", undercover: "Crash Team Racing", category: "Jeux vidéo" },
  { civilian: "Clash Royale", undercover: "Clash of Clans", category: "Jeux vidéo" },
  { civilian: "Among Us", undercover: "Loup-Garou", category: "Jeux vidéo" },
  { civilian: "League of Legends", undercover: "Dota 2", category: "Jeux vidéo" },
  { civilian: "Rocket League", undercover: "FIFA", category: "Jeux vidéo" },
  { civilian: "Super Smash Bros", undercover: "Street Fighter", category: "Jeux vidéo" },
  { civilian: "Tetris", undercover: "Pac-Man", category: "Jeux vidéo" },
  { civilian: "Animal Crossing", undercover: "Les Sims", category: "Jeux vidéo" },
  { civilian: "Subnautica", undercover: "Sea of Thieves", category: "Jeux vidéo" },
  { civilian: "Dead by Daylight", undercover: "Phasmophobia", category: "Jeux vidéo" },

  // Films & Séries (25)
  { civilian: "Harry Potter", undercover: "Hermione", category: "Films & Séries" },
  { civilian: "Batman", undercover: "Superman", category: "Films & Séries" },
  { civilian: "Joker", undercover: "Harley Quinn", category: "Films & Séries" },
  { civilian: "Iron Man", undercover: "Captain America", category: "Films & Séries" },
  { civilian: "Thor", undercover: "Loki", category: "Films & Séries" },
  { civilian: "Shrek", undercover: "Fiona", category: "Films & Séries" },
  { civilian: "Elsa", undercover: "Anna", category: "Films & Séries" },
  { civilian: "Simba", undercover: "Mufasa", category: "Films & Séries" },
  { civilian: "Titanic", undercover: "Avatar", category: "Films & Séries" },
  { civilian: "Matrix", undercover: "Inception", category: "Films & Séries" },
  { civilian: "Star Wars", undercover: "Star Trek", category: "Films & Séries" },
  { civilian: "Breaking Bad", undercover: "Better Call Saul", category: "Films & Séries" },
  { civilian: "Stranger Things", undercover: "Dark", category: "Films & Séries" },
  { civilian: "Naruto", undercover: "Boruto", category: "Films & Séries" },
  { civilian: "One Piece", undercover: "Fairy Tail", category: "Films & Séries" },
  { civilian: "Squid Game", undercover: "Alice in Borderland", category: "Films & Séries" },
  { civilian: "Euphoria", undercover: "Skins", category: "Films & Séries" },
  { civilian: "Peaky Blinders", undercover: "Sons of Anarchy", category: "Films & Séries" },
  { civilian: "The Walking Dead", undercover: "The Last of Us", category: "Films & Séries" },
  { civilian: "Fast & Furious", undercover: "Need for Speed", category: "Films & Séries" },
  { civilian: "Pirates des Caraïbes", undercover: "Peter Pan", category: "Films & Séries" },
  { civilian: "Jurassic Park", undercover: "Godzilla", category: "Films & Séries" },
  { civilian: "Inception", undercover: "Interstellar", category: "Films & Séries" },
  { civilian: "The Dark Knight", undercover: "Man of Steel", category: "Films & Séries" },
  { civilian: "Spider-Man: No Way Home", undercover: "Doctor Strange", category: "Films & Séries" },

  // Célébrités & Star System (12)
  { civilian: "Rihanna", undercover: "Beyoncé", category: "Célébrités & Star System" },
  { civilian: "Drake", undercover: "Kanye West", category: "Célébrités & Star System" },
  { civilian: "Snoop Dogg", undercover: "Wiz Khalifa", category: "Célébrités & Star System" },
  { civilian: "Michael Jackson", undercover: "Prince", category: "Célébrités & Star System" },
  { civilian: "Taylor Swift", undercover: "Katy Perry", category: "Célébrités & Star System" },
  { civilian: "Billie Eilish", undercover: "Olivia Rodrigo", category: "Célébrités & Star System" },
  { civilian: "Zendaya", undercover: "Jenna Ortega", category: "Célébrités & Star System" },
  { civilian: "Ryan Gosling", undercover: "Ryan Reynolds", category: "Célébrités & Star System" },
  { civilian: "Leonardo DiCaprio", undercover: "Brad Pitt", category: "Célébrités & Star System" },
  { civilian: "Will Smith", undercover: "Denzel Washington", category: "Célébrités & Star System" },
  { civilian: "Tom Cruise", undercover: "Keanu Reeves", category: "Célébrités & Star System" },
  { civilian: "Dwayne Johnson", undercover: "Vin Diesel", category: "Célébrités & Star System" },

  // Objets du quotidien (28)
  { civilian: "Sac à main", undercover: "Sac à dos", category: "Objets du quotidien" },
  { civilian: "Stylo", undercover: "Crayon", category: "Objets du quotidien" },
  { civilian: "Feutre", undercover: "Surligneur", category: "Objets du quotidien" },
  { civilian: "Cahier", undercover: "Carnet", category: "Objets du quotidien" },
  { civilian: "Livre", undercover: "Roman", category: "Objets du quotidien" },
  { civilian: "Journal", undercover: "Magazine", category: "Objets du quotidien" },
  { civilian: "Ordinateur", undercover: "PC", category: "Objets du quotidien" },
  { civilian: "Clavier", undercover: "Souris", category: "Objets du quotidien" },
  { civilian: "Écran", undercover: "Télévision", category: "Objets du quotidien" },
  { civilian: "Téléphone", undercover: "Tablette", category: "Objets du quotidien" },
  { civilian: "Chargeur", undercover: "Batterie", category: "Objets du quotidien" },
  { civilian: "Casque", undercover: "Écouteurs", category: "Objets du quotidien" },
  { civilian: "Télécommande", undercover: "Manette", category: "Objets du quotidien" },
  { civilian: "Manette", undercover: "Volant", category: "Objets du quotidien" },
  { civilian: "Lunettes", undercover: "Jumelles", category: "Objets du quotidien" },
  { civilian: "Porte", undercover: "Fenêtre", category: "Objets du quotidien" },
  { civilian: "Chaise", undercover: "Fauteuil", category: "Objets du quotidien" },
  { civilian: "Lit", undercover: "Canapé", category: "Objets du quotidien" },
  { civilian: "Lampe", undercover: "Ampoule", category: "Objets du quotidien" },
  { civilian: "Horloge", undercover: "Montre", category: "Objets du quotidien" },
  { civilian: "Clé", undercover: "Cadenas", category: "Objets du quotidien" },
  { civilian: "Valise", undercover: "Sac de voyage", category: "Objets du quotidien" },
  { civilian: "Bouteille", undercover: "Gourde", category: "Objets du quotidien" },
  { civilian: "Parapluie", undercover: "Parasol", category: "Objets du quotidien" },
  { civilian: "Couteau", undercover: "Fourchette", category: "Objets du quotidien" },
  { civilian: "Cuillère", undercover: "Louche", category: "Objets du quotidien" },
  // Objets du quotidien (50)
  { civilian: "Sac à main", undercover: "Sac à dos", category: "Objets du quotidien" },
  { civilian: "Stylo", undercover: "Crayon", category: "Objets du quotidien" },
  { civilian: "Feutre", undercover: "Surligneur", category: "Objets du quotidien" },
  { civilian: "Cahier", undercover: "Carnet", category: "Objets du quotidien" },
  { civilian: "Livre", undercover: "Roman", category: "Objets du quotidien" },
  { civilian: "Journal", undercover: "Magazine", category: "Objets du quotidien" },
  { civilian: "Ordinateur", undercover: "PC", category: "Objets du quotidien" },
  { civilian: "Clavier", undercover: "Souris", category: "Objets du quotidien" },
  { civilian: "Écran", undercover: "Télévision", category: "Objets du quotidien" },
  { civilian: "Téléphone", undercover: "Tablette", category: "Objets du quotidien" },
  { civilian: "Chargeur", undercover: "Batterie", category: "Objets du quotidien" },
  { civilian: "Casque", undercover: "Écouteurs", category: "Objets du quotidien" },
  { civilian: "Télécommande", undercover: "Manette", category: "Objets du quotidien" },
  { civilian: "Manette", undercover: "Volant", category: "Objets du quotidien" },
  { civilian: "Lunettes", undercover: "Jumelles", category: "Objets du quotidien" },
  { civilian: "Porte", undercover: "Fenêtre", category: "Objets du quotidien" },
  { civilian: "Chaise", undercover: "Fauteuil", category: "Objets du quotidien" },
  { civilian: "Lit", undercover: "Canapé", category: "Objets du quotidien" },
  { civilian: "Lampe", undercover: "Ampoule", category: "Objets du quotidien" },
  { civilian: "Horloge", undercover: "Montre", category: "Objets du quotidien" },
  { civilian: "Clé", undercover: "Cadenas", category: "Objets du quotidien" },
  { civilian: "Valise", undercover: "Sac de voyage", category: "Objets du quotidien" },
  { civilian: "Bouteille", undercover: "Gourde", category: "Objets du quotidien" },
  { civilian: "Parapluie", undercover: "Parasol", category: "Objets du quotidien" },
  { civilian: "Couteau", undercover: "Fourchette", category: "Objets du quotidien" },
  { civilian: "Cuillère", undercover: "Louche", category: "Objets du quotidien" },
  { civilian: "Assiette", undercover: "Plateau", category: "Objets du quotidien" },
  { civilian: "Verre", undercover: "Tasse", category: "Objets du quotidien" },
  { civilian: "Balai", undercover: "Aspirateur", category: "Objets du quotidien" },
  { civilian: "Parfum", undercover: "Déodorant", category: "Objets du quotidien" },
  { civilian: "Savon", undercover: "Gel douche", category: "Objets du quotidien" },
  { civilian: "Shampoing", undercover: "Après-shampoing", category: "Objets du quotidien" },
  { civilian: "Brosse", undercover: "Peigne", category: "Objets du quotidien" },
  { civilian: "Dentifrice", undercover: "Bain de bouche", category: "Objets du quotidien" },
  { civilian: "Brosse à dents", undercover: "Fil dentaire", category: "Objets du quotidien" },
  { civilian: "Portefeuille", undercover: "Porte-monnaie", category: "Objets du quotidien" },
  { civilian: "Carte", undercover: "Plan", category: "Objets du quotidien" },
  { civilian: "Boussole", undercover: "GPS", category: "Objets du quotidien" },
  { civilian: "Calendrier", undercover: "Agenda", category: "Objets du quotidien" },
  { civilian: "Corde", undercover: "Ficelle", category: "Objets du quotidien" },
  { civilian: "Chaîne", undercover: "Collier", category: "Objets du quotidien" },
  { civilian: "Échelle", undercover: "Escabeau", category: "Objets du quotidien" },
  { civilian: "Marteau", undercover: "Maillet", category: "Objets du quotidien" },
  { civilian: "Tournevis", undercover: "Clé à molette", category: "Objets du quotidien" },
  { civilian: "Perceuse", undercover: "Visseuse", category: "Objets du quotidien" },
  { civilian: "Pelle", undercover: "Bêche", category: "Objets du quotidien" },
  { civilian: "Râteau", undercover: "Balai", category: "Objets du quotidien" },
  { civilian: "Ciseaux", undercover: "Cutter", category: "Objets du quotidien" },
  { civilian: "Aiguille", undercover: "Épingle", category: "Objets du quotidien" },
  { civilian: "Fil", undercover: "Laine", category: "Objets du quotidien" },
  { civilian: "Bougie", undercover: "Torche", category: "Objets du quotidien" },

  // Vêtements & Mode (19)
  { civilian: "T-shirt", undercover: "Débardeur", category: "Vêtements & Mode" },
  { civilian: "Pull", undercover: "Sweat à capuche", category: "Vêtements & Mode" },
  { civilian: "Jean", undercover: "Pantalon de jogging", category: "Vêtements & Mode" },
  { civilian: "Short", undercover: "Bermudas", category: "Vêtements & Mode" },
  { civilian: "Manteau", undercover: "Veste", category: "Vêtements & Mode" },
  { civilian: "Baskets", undercover: "Sneakers", category: "Vêtements & Mode" },
  { civilian: "Bottes", undercover: "Bottines", category: "Vêtements & Mode" },
  { civilian: "Pyjama", undercover: "Peignoir", category: "Vêtements & Mode" },
  { civilian: "Ceinture", undercover: "Bretelles", category: "Vêtements & Mode" },
  { civilian: "Chaussettes", undercover: "Collants", category: "Vêtements & Mode" },
  { civilian: "Écharpe", undercover: "Foulard", category: "Vêtements & Mode" },
  { civilian: "Gants", undercover: "Moufles", category: "Vêtements & Mode" },
  { civilian: "Chemise", undercover: "Polo", category: "Vêtements & Mode" },
  { civilian: "Robe", undercover: "Jupe", category: "Vêtements & Mode" },
  { civilian: "Sandales", undercover: "Tongs", category: "Vêtements & Mode" },
  { civilian: "Pantoufles", undercover: "Chaussons", category: "Vêtements & Mode" },
  { civilian: "Bague", undercover: "Bracelet", category: "Vêtements & Mode" },
  { civilian: "Collier", undercover: "Pendentif", category: "Vêtements & Mode" },

  // Transports (10)
  { civilian: "Voiture", undercover: "Camion", category: "Transports" },
  { civilian: "Moto", undercover: "Scooter", category: "Transports" },
  { civilian: "Vélo", undercover: "Trottinette", category: "Transports" },
  { civilian: "Train", undercover: "Métro", category: "Transports" },
  { civilian: "Bus", undercover: "Tramway", category: "Transports" },
  { civilian: "Avion", undercover: "Hélicoptère", category: "Transports" },
  { civilian: "Fusée", undercover: "Navette spatiale", category: "Transports" },
  { civilian: "Bateau", undercover: "Voilier", category: "Transports" },
  { civilian: "Sous-marin", undercover: "Bateau", category: "Transports" },
  { civilian: "Taxi", undercover: "Uber", category: "Transports" },

  // Maison (16)
  { civilian: "Cuisine", undercover: "Salle à manger", category: "Maison" },
  { civilian: "Salon", undercover: "Chambre", category: "Maison" },
  { civilian: "Salle de bain", undercover: "Toilettes", category: "Maison" },
  { civilian: "Frigo", undercover: "Congélateur", category: "Maison" },
  { civilian: "Four", undercover: "Micro-ondes", category: "Maison" },
  { civilian: "Plaque", undercover: "Barbecue", category: "Maison" },
  { civilian: "Oreiller", undercover: "Couette", category: "Maison" },
  { civilian: "Rideau", undercover: "Store", category: "Maison" },
  { civilian: "Rideau", undercover: "Voilage", category: "Maison" },
  { civilian: "Tapis", undercover: "Moquette", category: "Maison" },
  { civilian: "Tapis", undercover: "Paillasson", category: "Maison" },
  { civilian: "Terrasse", undercover: "Balcon", category: "Maison" },
  { civilian: "Serviette", undercover: "Drap de bain", category: "Maison" },
  { civilian: "Couette", undercover: "Couverture", category: "Maison" },
  { civilian: "Climatiseur", undercover: "Ventilateur", category: "Maison" },
  { civilian: "Radiateur", undercover: "Cheminée", category: "Maison" },

  // Métiers (17)
  { civilian: "Médecin", undercover: "Infirmier", category: "Métiers" },
  { civilian: "Pharmacien", undercover: "Docteur", category: "Métiers" },
  { civilian: "Pompier", undercover: "Policier", category: "Métiers" },
  { civilian: "Police", undercover: "Gendarmerie", category: "Métiers" },
  { civilian: "Pompier", undercover: "Ambulancier", category: "Métiers" },
  { civilian: "Professeur", undercover: "Instituteur", category: "Métiers" },
  { civilian: "Avocat", undercover: "Juge", category: "Métiers" },
  { civilian: "Boulanger", undercover: "Pâtissier", category: "Métiers" },
  { civilian: "Coiffeur", undercover: "Barbier", category: "Métiers" },
  { civilian: "Architecte", undercover: "Ingénieur", category: "Métiers" },
  { civilian: "Journaliste", undercover: "Reporter", category: "Métiers" },
  { civilian: "Pilote", undercover: "Steward", category: "Métiers" },
  { civilian: "Pilote", undercover: "Commandant de bord", category: "Métiers" },
  { civilian: "Développeur", undercover: "Designer", category: "Métiers" },
  { civilian: "Développeur", undercover: "Programmeur", category: "Métiers" },
  { civilian: "Acteur", undercover: "Chanteur", category: "Métiers" },
  { civilian: "Danseur", undercover: "Chorégraphe", category: "Métiers" },

  // Pays & Géographie (24)
  { civilian: "France", undercover: "Belgique", category: "Pays & Géographie" },
  { civilian: "Espagne", undercover: "Portugal", category: "Pays & Géographie" },
  { civilian: "Allemagne", undercover: "Autriche", category: "Pays & Géographie" },
  { civilian: "Chine", undercover: "Japon", category: "Pays & Géographie" },
  { civilian: "Corée du Sud", undercover: "Corée du Nord", category: "Pays & Géographie" },
  { civilian: "Canada", undercover: "États-Unis", category: "Pays & Géographie" },
  { civilian: "Brésil", undercover: "Argentine", category: "Pays & Géographie" },
  { civilian: "Égypte", undercover: "Maroc", category: "Pays & Géographie" },
  { civilian: "Cameroun", undercover: "Congo", category: "Pays & Géographie" },
  { civilian: "Australie", undercover: "Nouvelle-Zélande", category: "Pays & Géographie" },
  { civilian: "Paris", undercover: "Lyon", category: "Pays & Géographie" },
  { civilian: "Marseille", undercover: "Nice", category: "Pays & Géographie" },
  { civilian: "Tokyo", undercover: "Séoul", category: "Pays & Géographie" },
  { civilian: "New York", undercover: "Los Angeles", category: "Pays & Géographie" },
  { civilian: "Londres", undercover: "Manchester", category: "Pays & Géographie" },
  { civilian: "Rome", undercover: "Milan", category: "Pays & Géographie" },
  { civilian: "Madrid", undercover: "Barcelone", category: "Pays & Géographie" },
  { civilian: "Dubaï", undercover: "Abou Dhabi", category: "Pays & Géographie" },
  { civilian: "Rio de Janeiro", undercover: "São Paulo", category: "Pays & Géographie" },
  { civilian: "Montréal", undercover: "Toronto", category: "Pays & Géographie" },
  { civilian: "Pays", undercover: "Nation", category: "Pays & Géographie" },
  { civilian: "Ville", undercover: "Capitale", category: "Pays & Géographie" },
  { civilian: "Village", undercover: "Quartier", category: "Pays & Géographie" },
  { civilian: "Rue", undercover: "Avenue", category: "Pays & Géographie" },

  // Marques (18)
  { civilian: "Nike", undercover: "Adidas", category: "Marques" },
  { civilian: "Puma", undercover: "Reebok", category: "Marques" },
  { civilian: "Apple", undercover: "Samsung", category: "Marques" },
  { civilian: "Coca-Cola", undercover: "Pepsi", category: "Marques" },
  { civilian: "McDonald's", undercover: "Burger King", category: "Marques" },
  { civilian: "KFC", undercover: "Popeyes", category: "Marques" },
  { civilian: "KFC", undercover: "Subway", category: "Marques" },
  { civilian: "Netflix", undercover: "Disney+", category: "Marques" },
  { civilian: "YouTube", undercover: "TikTok", category: "Marques" },
  { civilian: "WhatsApp", undercover: "Messenger", category: "Marques" },
  { civilian: "Google", undercover: "Bing", category: "Marques" },
  { civilian: "Amazon", undercover: "eBay", category: "Marques" },
  { civilian: "Amazon", undercover: "Alibaba", category: "Marques" },
  { civilian: "Ferrari", undercover: "Lamborghini", category: "Marques" },
  { civilian: "Porsche", undercover: "Ferrari", category: "Marques" },
  { civilian: "Audi", undercover: "BMW", category: "Marques" },
  { civilian: "Mercedes", undercover: "Tesla", category: "Marques" },
  { civilian: "Rolex", undercover: "Cartier", category: "Marques" },

  // Mode Expert (35)
  { civilian: "Nuage", undercover: "Brouillard", category: "Mode Expert" },
  { civilian: "Rivière", undercover: "Fleuve", category: "Mode Expert" },
  { civilian: "Océan", undercover: "Mer", category: "Mode Expert" },
  { civilian: "Colline", undercover: "Montagne", category: "Mode Expert" },
  { civilian: "Lune", undercover: "Satellite", category: "Mode Expert" },
  { civilian: "Étoile", undercover: "Soleil", category: "Mode Expert" },
  { civilian: "Verre", undercover: "Cristal", category: "Mode Expert" },
  { civilian: "Bois", undercover: "Forêt", category: "Mode Expert" },
  { civilian: "Neige", undercover: "Grêle", category: "Mode Expert" },
  { civilian: "Tempête", undercover: "Tornade", category: "Mode Expert" },
  { civilian: "Mur", undercover: "Cloison", category: "Mode Expert" },
  { civilian: "Bureau", undercover: "Table", category: "Mode Expert" },
  { civilian: "Roman", undercover: "Nouvelle", category: "Mode Expert" },
  { civilian: "Poème", undercover: "Chanson", category: "Mode Expert" },
  { civilian: "Peinture", undercover: "Dessin", category: "Mode Expert" },
  { civilian: "Silence", undercover: "Calme", category: "Mode Expert" },
  { civilian: "Colère", undercover: "Haine", category: "Mode Expert" },
  { civilian: "Courage", undercover: "Audace", category: "Mode Expert" },
  { civilian: "Vitesse", undercover: "Rapidité", category: "Mode Expert" },
  { civilian: "Chance", undercover: "Hasard", category: "Mode Expert" },
  { civilian: "Espoir", undercover: "Illusions", category: "Mode Expert" },
  { civilian: "Rêve", undercover: "Cauchemar", category: "Mode Expert" },
  { civilian: "Secret", undercover: "Mystère", category: "Mode Expert" },
  { civilian: "Vérité", undercover: "Réalité", category: "Mode Expert" },
  { civilian: "Mémoire", undercover: "Souvenir", category: "Mode Expert" },
  { civilian: "Passé", undercover: "Futur", category: "Mode Expert" },
  { civilian: "Ombre", undercover: "Pénombre", category: "Mode Expert" },
  { civilian: "Miroir", undercover: "Reflet", category: "Mode Expert" },
  { civilian: "Énigme", undercover: "Casse-tête", category: "Mode Expert" },
  { civilian: "Trésor", undercover: "Fortune", category: "Mode Expert" },
  { civilian: "Labyrinthe", undercover: "Dédale", category: "Mode Expert" },
  { civilian: "Illusion", undercover: "Mirage", category: "Mode Expert" },
  { civilian: "Éclipse", undercover: "Crépuscule", category: "Mode Expert" },
  { civilian: "Paradis", undercover: "Enfer", category: "Mode Expert" },
  { civilian: "Ange", undercover: "Démon", category: "Mode Expert" },
];

/** Validation stricte de la répartition des rôles */
export function validateRoleConfig(
  totalPlayers: number,
  undercoverCount: number,
  mrWhiteCount: number
): { isValid: boolean; error?: string } {
  const civilianCount = totalPlayers - undercoverCount - mrWhiteCount;

  if (civilianCount < 2) {
    return { isValid: false, error: "Il faut au moins 2 Civils dans la partie." };
  }

  if (totalPlayers === 3 && undercoverCount > 0 && mrWhiteCount > 0) {
    return { isValid: false, error: "À 3 joueurs, impossible d'avoir à la fois un Undercover et Mr. White." };
  }

  if (undercoverCount < 1 && mrWhiteCount < 1) {
    return { isValid: false, error: "Il faut au moins 1 Undercover ou 1 Mr. White." };
  }

  return { isValid: true };
}

/** Obtenir une paire de mots aléatoire selon la catégorie choisie */
export function getRandomWordPair(categories: CategoryName | CategoryName[]): UndercoverWordPair {
  let pool = WORD_PAIRS_DATABASE;
  
  if (Array.isArray(categories)) {
    if (!categories.includes("Toutes les catégories") && categories.length > 0) {
      pool = WORD_PAIRS_DATABASE.filter(p => categories.includes(p.category as CategoryName));
    }
  } else if (categories !== "Toutes les catégories") {
    pool = WORD_PAIRS_DATABASE.filter(p => p.category === categories);
  }

  if (pool.length === 0) pool = WORD_PAIRS_DATABASE;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Helper classique de génération automatique des rôles */
export function generateRoles(playerCount: number): UndercoverRole[] {
  let undercoverCount = 1;
  let mrWhiteCount = 0;
  if (playerCount >= 5) mrWhiteCount = 1;
  if (playerCount >= 7) undercoverCount = 2;
  if (playerCount >= 10) undercoverCount = 3;
  return generateRolesFromConfig(playerCount, undercoverCount, mrWhiteCount);
}

/** Génération mélangée des rôles */
export function generateRolesFromConfig(
  totalPlayers: number,
  undercoverCount: number,
  mrWhiteCount: number
): UndercoverRole[] {
  const civilianCount = totalPlayers - undercoverCount - mrWhiteCount;
  const roles: UndercoverRole[] = [];

  for (let i = 0; i < civilianCount; i++) roles.push("Civilian");
  for (let i = 0; i < undercoverCount; i++) roles.push("Undercover");
  for (let i = 0; i < mrWhiteCount; i++) roles.push("MrWhite");

  // Mélange de Fisher-Yates
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  return roles;
}

/** Ordre de parole mélangé avec probabilité réduite pour Mr. White d'être le premier joueur */
export function shuffleSpeakingOrder(players: UndercoverPlayer[]): UndercoverPlayer[] {
  let shuffled = [...players];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Si le premier joueur tiré est Mr. White, on lui applique 90% de chance d'être déplacé plus loin
  if (shuffled[0].gameRole === "MrWhite" && Math.random() < 0.9 && shuffled.length > 2) {
    const newIdx = 1 + Math.floor(Math.random() * (shuffled.length - 1));
    [shuffled[0], shuffled[newIdx]] = [shuffled[newIdx], shuffled[0]];
  }

  return shuffled;
}
