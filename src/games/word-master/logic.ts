export type WordMasterCategory =
  | "Toutes"
  | "Pop Culture & Cinéma"
  | "Vie Quotidienne & Cuisine"
  | "Sports & Célébrités"
  | "Voyages & Nature";

export interface TabooCard {
  id: string;
  targetWord: string;
  forbiddenWords: [string, string, string, string];
  category: WordMasterCategory;
}

export const WORD_MASTER_CATEGORIES: WordMasterCategory[] = [
  "Toutes",
  "Pop Culture & Cinéma",
  "Vie Quotidienne & Cuisine",
  "Sports & Célébrités",
  "Voyages & Nature"
];

export const TABOO_DATABASE: TabooCard[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // 🎬 POP CULTURE & CINÉMA (100 CARTES)
  // ══════════════════════════════════════════════════════════════════════════

  { id: "pc1", targetWord: "Harry Potter", forbiddenWords: ["Sorcier", "Magie", "Poudlard", "Lunettes"], category: "Pop Culture & Cinéma" },
  { id: "pc2", targetWord: "Titanic", forbiddenWords: ["Bateau", "Iceberg", "Noyade", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc3", targetWord: "Star Wars", forbiddenWords: ["Espace", "Sabre", "Vador", "Jedi"], category: "Pop Culture & Cinéma" },
  { id: "pc4", targetWord: "Batman", forbiddenWords: ["Chauve-souris", "Héros", "Joker", "Gotham"], category: "Pop Culture & Cinéma" },
  { id: "pc5", targetWord: "Netflix", forbiddenWords: ["Série", "Film", "Streaming", "Écran"], category: "Pop Culture & Cinéma" },
  { id: "pc6", targetWord: "Spider-Man", forbiddenWords: ["Araignée", "Costume", "Peter", "Toile"], category: "Pop Culture & Cinéma" },
  { id: "pc7", targetWord: "Barbie", forbiddenWords: ["Rose", "Poupée", "Ken", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc8", targetWord: "Avengers", forbiddenWords: ["Marvel", "Héros", "Thor", "Thanos"], category: "Pop Culture & Cinéma" },
  { id: "pc9", targetWord: "Avatar", forbiddenWords: ["Bleu", "Pandora", "Cameron", "Cinéma"], category: "Pop Culture & Cinéma" },
  { id: "pc10", targetWord: "Squid Game", forbiddenWords: ["Corée", "Série", "Jeu", "Gagnant"], category: "Pop Culture & Cinéma" },
  { id: "pc11", targetWord: "Inception", forbiddenWords: ["Rêve", "Toupie", "DiCaprio", "Sommeil"], category: "Pop Culture & Cinéma" },
  { id: "pc12", targetWord: "Stranger Things", forbiddenWords: ["Eleven", "Démogorgon", "Série", "Monde"], category: "Pop Culture & Cinéma" },
  { id: "pc13", targetWord: "Shrek", forbiddenWords: ["Ogre", "Vert", "Âne", "Marais"], category: "Pop Culture & Cinéma" },
  { id: "pc14", targetWord: "Matrix", forbiddenWords: ["Pilule", "Neo", "Réalité", "Virtuel"], category: "Pop Culture & Cinéma" },
  { id: "pc15", targetWord: "La Reine des Neiges", forbiddenWords: ["Elsa", "Glace", "Chanson", "Neige"], category: "Pop Culture & Cinéma" },
  { id: "pc16", targetWord: "Super Mario", forbiddenWords: ["Plombier", "Casquette", "Nintendo", "Moustache"], category: "Pop Culture & Cinéma" },
  { id: "pc17", targetWord: "Pikachu", forbiddenWords: ["Jaune", "Éclair", "Pokémon", "Souris"], category: "Pop Culture & Cinéma" },
  { id: "pc18", targetWord: "Le Roi Lion", forbiddenWords: ["Simba", "Savane", "Hakuna", "Dessin"], category: "Pop Culture & Cinéma" },
  { id: "pc19", targetWord: "Jurassic Park", forbiddenWords: ["Dinosaure", "Parc", "T-Rex", "Île"], category: "Pop Culture & Cinéma" },
  { id: "pc20", targetWord: "Pirates des Caraïbes", forbiddenWords: ["Jack", "Bateau", "Capitaine", "Mer"], category: "Pop Culture & Cinéma" },
  { id: "pc21", targetWord: "Voldemort", forbiddenWords: ["Méchant", "Nez", "Serpent", "Harry"], category: "Pop Culture & Cinéma" },
  { id: "pc22", targetWord: "James Bond", forbiddenWords: ["Agent", "007", "Espion", "Martini"], category: "Pop Culture & Cinéma" },
  { id: "pc23", targetWord: "Fast & Furious", forbiddenWords: ["Voiture", "Course", "Vin Diesel", "Vitesse"], category: "Pop Culture & Cinéma" },
  { id: "pc24", targetWord: "Disney", forbiddenWords: ["Château", "Souris", "Dessin animé", "Parc"], category: "Pop Culture & Cinéma" },
  { id: "pc25", targetWord: "Game of Thrones", forbiddenWords: ["Trône", "Dragon", "Stark", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc26", targetWord: "Marvel", forbiddenWords: ["BD", "Comics", "Héros", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc27", targetWord: "Top Gun", forbiddenWords: ["Avion", "Tom Cruise", "Pilote", "Vitesse"], category: "Pop Culture & Cinéma" },
  { id: "pc28", targetWord: "Joker", forbiddenWords: ["Rire", "Maquillage", "Batman", "Gotham"], category: "Pop Culture & Cinéma" },
  { id: "pc29", targetWord: "Indiana Jones", forbiddenWords: ["Fouet", "Chapeau", "Trésor", "Archéologue"], category: "Pop Culture & Cinéma" },
  { id: "pc30", targetWord: "Minecraft", forbiddenWords: ["Blocs", "Jeu", "Creeper", "Pixel"], category: "Pop Culture & Cinéma" },
  { id: "pc31", targetWord: "Iron Man", forbiddenWords: ["Armure", "Tony Stark", "Rouge", "Marvel"], category: "Pop Culture & Cinéma" },
  { id: "pc32", targetWord: "Oppenheimer", forbiddenWords: ["Bombe", "Atomique", "Physique", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc33", targetWord: "Mercredi Addams", forbiddenWords: ["Tresses", "Noir", "Danse", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc34", targetWord: "One Piece", forbiddenWords: ["Luffy", "Pirate", "Chapeau de paille", "Manga"], category: "Pop Culture & Cinéma" },
  { id: "pc35", targetWord: "Naruto", forbiddenWords: ["Ninja", "Ramen", "Sasuke", "Manga"], category: "Pop Culture & Cinéma" },
  { id: "pc36", targetWord: "Dragon Ball", forbiddenWords: ["Goku", "Saïyan", "Boules", "Manga"], category: "Pop Culture & Cinéma" },
  { id: "pc37", targetWord: "Pokémon", forbiddenWords: ["Attrapez-les", "Pokéball", "Dresseur", "Jeu"], category: "Pop Culture & Cinéma" },
  { id: "pc38", targetWord: "Zelda", forbiddenWords: ["Link", "Épée", "Princesse", "Nintendo"], category: "Pop Culture & Cinéma" },
  { id: "pc39", targetWord: "Sonic", forbiddenWords: ["Hérisson", "Bleu", "Rings", "Vitesse"], category: "Pop Culture & Cinéma" },
  { id: "pc40", targetWord: "GTA", forbiddenWords: ["Voiture", "Braquage", "Jeu", "Ville"], category: "Pop Culture & Cinéma" },
  { id: "pc41", targetWord: "Fortnite", forbiddenWords: ["Top 1", "Danse", "Tir", "Jeu"], category: "Pop Culture & Cinéma" },
  { id: "pc42", targetWord: "The Last of Us", forbiddenWords: ["Zombie", "Joel", "Ellie", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc43", targetWord: "The Walking Dead", forbiddenWords: ["Zombie", "Survie", "Série", "Morts"], category: "Pop Culture & Cinéma" },
  { id: "pc44", targetWord: "Peaky Blinders", forbiddenWords: ["Casquette", "Tommy Shelby", "Série", "Gangster"], category: "Pop Culture & Cinéma" },
  { id: "pc45", targetWord: "Breaking Bad", forbiddenWords: ["Walter White", "Chimie", "Drogue", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc46", targetWord: "La Casa de Papel", forbiddenWords: ["Masque", "Braquage", "Professeur", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc47", targetWord: "Euphoria", forbiddenWords: ["Lycée", "Zendaya", "Maquillage", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc48", targetWord: "Cyberpunk", forbiddenWords: ["Futur", "Robot", "Ville", "Jeu"], category: "Pop Culture & Cinéma" },
  { id: "pc49", targetWord: "Pac-Man", forbiddenWords: ["Fantôme", "Jaune", "Arcade", "Labyrinthe"], category: "Pop Culture & Cinéma" },
  { id: "pc50", targetWord: "Spider-Man: New Generation", forbiddenWords: ["Miles Morales", "Spider-Verse", "Dessin", "Marvel"], category: "Pop Culture & Cinéma" },
  { id: "pc51", targetWord: "Le Seigneur des Anneaux", forbiddenWords: ["Frodon", "Gandalf", "Anneau", "Mordor"], category: "Pop Culture & Cinéma" },
  { id: "pc52", targetWord: "Harry Potter et la Chambre des Secrets", forbiddenWords: ["Poudlard", "Serpent", "Tom Jedusor", "Hogwarts"], category: "Pop Culture & Cinéma" },
  { id: "pc53", targetWord: "Interstellar", forbiddenWords: ["Espace", "Planète", "Trou noir", "Cooper"], category: "Pop Culture & Cinéma" },
  { id: "pc54", targetWord: "Gladiator", forbiddenWords: ["Rome", "Empereur", "Arène", "Maximus"], category: "Pop Culture & Cinéma" },
  { id: "pc55", targetWord: "Le Parrain", forbiddenWords: ["Mafia", "Famille", "Don", "Corleone"], category: "Pop Culture & Cinéma" },
  { id: "pc56", targetWord: "Retour vers le futur", forbiddenWords: ["DeLorean", "Marty", "Doc", "Temps"], category: "Pop Culture & Cinéma" },
  { id: "pc57", targetWord: "Terminator", forbiddenWords: ["Robot", "Arnold", "Futur", "Skynet"], category: "Pop Culture & Cinéma" },
  { id: "pc58", targetWord: "Alien", forbiddenWords: ["Espace", "Créature", "Vaisseau", "Horreur"], category: "Pop Culture & Cinéma" },
  { id: "pc59", targetWord: "Predator", forbiddenWords: ["Chasseur", "Extraterrestre", "Forêt", "Arnold"], category: "Pop Culture & Cinéma" },
  { id: "pc60", targetWord: "John Wick", forbiddenWords: ["Tueur", "Chien", "Keanu", "Pistolet"], category: "Pop Culture & Cinéma" },
  { id: "pc61", targetWord: "Mission Impossible", forbiddenWords: ["Ethan", "Tom Cruise", "Espion", "Mission"], category: "Pop Culture & Cinéma" },
  { id: "pc62", targetWord: "Rocky", forbiddenWords: ["Boxe", "Balboa", "Ring", "Sylvester"], category: "Pop Culture & Cinéma" },
  { id: "pc63", targetWord: "Creed", forbiddenWords: ["Boxe", "Rocky", "Adonis", "Combat"], category: "Pop Culture & Cinéma" },
  { id: "pc64", targetWord: "Hunger Games", forbiddenWords: ["Katniss", "Arène", "District", "Flèche"], category: "Pop Culture & Cinéma" },
  { id: "pc65", targetWord: "Divergente", forbiddenWords: ["Tris", "Faction", "Chicago", "Film"], category: "Pop Culture & Cinéma" },
  { id: "pc66", targetWord: "Twilight", forbiddenWords: ["Vampire", "Edward", "Bella", "Loup"], category: "Pop Culture & Cinéma" },
  { id: "pc67", targetWord: "Les Simpson", forbiddenWords: ["Homer", "Bart", "Jaune", "Famille"], category: "Pop Culture & Cinéma" },
  { id: "pc68", targetWord: "South Park", forbiddenWords: ["Cartman", "Kyle", "Stan", "Dessin animé"], category: "Pop Culture & Cinéma" },
  { id: "pc69", targetWord: "Rick et Morty", forbiddenWords: ["Rick", "Morty", "Portail", "Science"], category: "Pop Culture & Cinéma" },
  { id: "pc70", targetWord: "Family Guy", forbiddenWords: ["Peter", "Stewie", "Griffin", "Série"], category: "Pop Culture & Cinéma" },
  { id: "pc71", targetWord: "Les Minions", forbiddenWords: ["Jaune", "Banane", "Gru", "Petits"], category: "Pop Culture & Cinéma" },
  { id: "pc72", targetWord: "Moi, Moche et Méchant", forbiddenWords: ["Gru", "Minions", "Agnes", "Lune"], category: "Pop Culture & Cinéma" },
  { id: "pc73", targetWord: "Toy Story", forbiddenWords: ["Woody", "Buzz", "Jouet", "Andy"], category: "Pop Culture & Cinéma" },
  { id: "pc74", targetWord: "Cars", forbiddenWords: ["Flash McQueen", "Voiture", "Course", "Piston"], category: "Pop Culture & Cinéma" },
  { id: "pc75", targetWord: "Ratatouille", forbiddenWords: ["Rat", "Cuisine", "Paris", "Rémy"], category: "Pop Culture & Cinéma" },
  { id: "pc76", targetWord: "Nemo", forbiddenWords: ["Poisson", "Océan", "Dory", "Clown"], category: "Pop Culture & Cinéma" },
  { id: "pc77", targetWord: "WALL-E", forbiddenWords: ["Robot", "Terre", "Espace", "EVE"], category: "Pop Culture & Cinéma" },
  { id: "pc78", targetWord: "Kung Fu Panda", forbiddenWords: ["Po", "Panda", "Kung Fu", "Tai Lung"], category: "Pop Culture & Cinéma" },
  { id: "pc79", targetWord: "Madagascar", forbiddenWords: ["Lion", "Zèbre", "Pingouins", "Alex"], category: "Pop Culture & Cinéma" },
  { id: "pc80", targetWord: "L'Âge de Glace", forbiddenWords: ["Manny", "Sid", "Diego", "Mammouth"], category: "Pop Culture & Cinéma" },
  { id: "pc81", targetWord: "Les Indestructibles", forbiddenWords: ["Super-héros", "Famille", "Elastigirl", "Violet"], category: "Pop Culture & Cinéma" },
  { id: "pc82", targetWord: "Kung Fu Hustle", forbiddenWords: ["Kung Fu", "Chine", "Combat", "Hache"], category: "Pop Culture & Cinéma" },
  { id: "pc83", targetWord: "Kill Bill", forbiddenWords: ["Uma Thurman", "Sabre", "Mariée", "Vengeance"], category: "Pop Culture & Cinéma" },
  { id: "pc84", targetWord: "Django Unchained", forbiddenWords: ["Esclave", "Cow-boy", "Tarentino", "Bounty"], category: "Pop Culture & Cinéma" },
  { id: "pc85", targetWord: "Pulp Fiction", forbiddenWords: ["Tarantino", "Mia", "Vincent", "Portefeuille"], category: "Pop Culture & Cinéma" },
  { id: "pc86", targetWord: "The Dark Knight", forbiddenWords: ["Batman", "Joker", "Gotham", "Christopher Nolan"], category: "Pop Culture & Cinéma" },
  { id: "pc87", targetWord: "Deadpool", forbiddenWords: ["Marvel", "Ryan Reynolds", "Mercenaire", "Rouge"], category: "Pop Culture & Cinéma" },
  { id: "pc88", targetWord: "Venom", forbiddenWords: ["Symbiote", "Eddie", "Spider-Man", "Alien"], category: "Pop Culture & Cinéma" },
  { id: "pc89", targetWord: "Black Panther", forbiddenWords: ["Wakanda", "T'Challa", "Vibranium", "Marvel"], category: "Pop Culture & Cinéma" },
  { id: "pc90", targetWord: "Guardians of the Galaxy", forbiddenWords: ["Star-Lord", "Groot", "Rocket", "Marvel"], category: "Pop Culture & Cinéma" },
  { id: "pc91", targetWord: "Doctor Strange", forbiddenWords: ["Magie", "Marvel", "Sorcier", "Œil"], category: "Pop Culture & Cinéma" },
  { id: "pc92", targetWord: "Thor", forbiddenWords: ["Marteau", "Asgard", "Dieu", "Éclair"], category: "Pop Culture & Cinéma" },
  { id: "pc93", targetWord: "Hulk", forbiddenWords: ["Vert", "Bruce Banner", "Force", "Marvel"], category: "Pop Culture & Cinéma" },
  { id: "pc94", targetWord: "Captain America", forbiddenWords: ["Bouclier", "Steve Rogers", "Marvel", "Soldat"], category: "Pop Culture & Cinéma" },
  { id: "pc95", targetWord: "Black Widow", forbiddenWords: ["Natasha", "Espionne", "Marvel", "Rouge"], category: "Pop Culture & Cinéma" },
  { id: "pc96", targetWord: "Demon Slayer", forbiddenWords: ["Tanjiro", "Nezuko", "Démon", "Katana"], category: "Pop Culture & Cinéma" },
  { id: "pc97", targetWord: "Jujutsu Kaisen", forbiddenWords: ["Gojo", "Yuji", "Sukuna", "Fléau"], category: "Pop Culture & Cinéma" },
  { id: "pc98", targetWord: "Attack on Titan", forbiddenWords: ["Titan", "Eren", "Mikasa", "Muraille"], category: "Pop Culture & Cinéma" },
  { id: "pc99", targetWord: "Death Note", forbiddenWords: ["Light", "Ryuk", "Cahier", "Shinigami"], category: "Pop Culture & Cinéma" },
  { id: "pc100", targetWord: "Hunter x Hunter", forbiddenWords: ["Gon", "Killua", "Hunter", "Nen"], category: "Pop Culture & Cinéma" },

  // ══════════════════════════════════════════════════════════════════════════
  // 🍕 VIE QUOTIDIENNE & CUISINE (50 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "vq1", targetWord: "Pizza", forbiddenWords: ["Italie", "Fromage", "Pâte", "Sauce"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq2", targetWord: "Café", forbiddenWords: ["Chaud", "Matin", "Tasse", "Expresso"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq3", targetWord: "Réveil", forbiddenWords: ["Matin", "Alarme", "Lit", "Dormir"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq4", targetWord: "Chocolat", forbiddenWords: ["Cacao", "Sucré", "Noir", "Gâteau"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq5", targetWord: "Smartphone", forbiddenWords: ["Téléphone", "Écran", "Appeler", "SMS"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq6", targetWord: "Nutella", forbiddenWords: ["Pâte", "Noisette", "Chocolat", "Tartine"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq7", targetWord: "Baguette", forbiddenWords: ["Pain", "Boulangerie", "Farine", "Français"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq8", targetWord: "Frigo", forbiddenWords: ["Froid", "Cuisine", "Nourriture", "Glace"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq9", targetWord: "Machine à laver", forbiddenWords: ["Linge", "Propre", "Tambour", "Lessive"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq10", targetWord: "Hamburger", forbiddenWords: ["Fast-food", "Pain", "Steak", "Frites"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq11", targetWord: "Miroir", forbiddenWords: ["Reflet", "Glace", "Visage", "Regarder"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq12", targetWord: "Parapluie", forbiddenWords: ["Pluie", "Eau", "Gouttes", "Protéger"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq13", targetWord: "Croissant", forbiddenWords: ["Matin", "Beurre", "Viennoiserie", "Boulangerie"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq14", targetWord: "Lit", forbiddenWords: ["Dormir", "Sommeil", "Matelas", "Oreiller"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq15", targetWord: "Vélo", forbiddenWords: ["Roue", "Pédale", "Casque", "Guidon"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq16", targetWord: "Douche", forbiddenWords: ["Eau", "Savon", "Salle de bain", "Laver"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq17", targetWord: "Clé", forbiddenWords: ["Serrure", "Porte", "Fermer", "Trousseau"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq18", targetWord: "Lunettes", forbiddenWords: ["Yeux", "Vue", "Verres", "Nez"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq19", targetWord: "Tacos", forbiddenWords: ["Mexique", "Sauce", "Viande", "Galette"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq20", targetWord: "Gâteau", forbiddenWords: ["Anniversaire", "Bougie", "Sucre", "Dessert"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq21", targetWord: "Canapé", forbiddenWords: ["Salon", "Assis", "Télé", "Coussin"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq22", targetWord: "Aspirateur", forbiddenWords: ["Poussière", "Ménage", "Aspirer", "Bruit"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq23", targetWord: "Valise", forbiddenWords: ["Voyage", "Bagage", "Roulettes", "Vêtements"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq24", targetWord: "Ascenseur", forbiddenWords: ["Étage", "Bâtiment", "Monter", "Descendre"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq25", targetWord: "Horloge", forbiddenWords: ["Heure", "Temps", "Aiguille", "Mur"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq26", targetWord: "Dentifrice", forbiddenWords: ["Brosse", "Dents", "Bouche", "Propre"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq27", targetWord: "Shampooing", forbiddenWords: ["Cheveux", "Mousse", "Douche", "Laver"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq28", targetWord: "Serviette", forbiddenWords: ["Essuyer", "Eau", "Bain", "Douche"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq29", targetWord: "Tasse", forbiddenWords: ["Boire", "Café", "Thé", "Anse"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq30", targetWord: "Ciseaux", forbiddenWords: ["Couper", "Lames", "Papier", "Mains"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq31", targetWord: "Stylo", forbiddenWords: ["Écrire", "Encre", "Feuille", "Papier"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq32", targetWord: "Télécommande", forbiddenWords: ["Zapper", "Télévision", "Boutons", "Piles"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq33", targetWord: "Chargeur", forbiddenWords: ["Batterie", "Téléphone", "Câble", "Prise"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq34", targetWord: "Chaussures", forbiddenWords: ["Pieds", "Lacets", "Marcher", "Mettre"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq35", targetWord: "Manteau", forbiddenWords: ["Froid", "Veste", "Hiver", "Porter"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq36", targetWord: "Ceinture", forbiddenWords: ["Pantalon", "Taille", "Boucle", "Serrer"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq37", targetWord: "Chapeau", forbiddenWords: ["Tête", "Soleil", "Casquette", "Porter"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq38", targetWord: "Coussin", forbiddenWords: ["Lit", "Canapé", "Tête", "Doux"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq39", targetWord: "Tapis", forbiddenWords: ["Sol", "Salon", "Pieds", "Décoration"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq40", targetWord: "Porte", forbiddenWords: ["Ouvrir", "Entrer", "Poignée", "Pièce"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq41", targetWord: "Poêle", forbiddenWords: ["Cuire", "Cuisine", "Feu", "Casserole"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq42", targetWord: "Fourchette", forbiddenWords: ["Manger", "Couverts", "Piquer", "Assiette"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq43", targetWord: "Couteau", forbiddenWords: ["Couper", "Lame", "Couverts", "Trancher"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq44", targetWord: "Assiette", forbiddenWords: ["Repas", "Plat", "Table", "Manger"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq45", targetWord: "Bouteille", forbiddenWords: ["Boire", "Eau", "Bouchon", "Verre"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq46", targetWord: "Sucre", forbiddenWords: ["Sucré", "Blanc", "Café", "Dessert"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq47", targetWord: "Sel", forbiddenWords: ["Poivre", "Salé", "Assaisonner", "Mer"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq48", targetWord: "Pâtes", forbiddenWords: ["Italie", "Spaghetti", "Sauce", "Boillir"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq49", targetWord: "Glace", forbiddenWords: ["Sorbet", "Froid", "Cornet", "Été"], category: "Vie Quotidienne & Cuisine" },
  { id: "vq50", targetWord: "Fromage", forbiddenWords: ["Lait", "Camembert", "Pain", "France"], category: "Vie Quotidienne & Cuisine" },

  // ══════════════════════════════════════════════════════════════════════════
  // ⚽ SPORTS & CÉLÉBRITÉS (50 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "sc1", targetWord: "Football", forbiddenWords: ["Ballon", "But", "Joueur", "Stade"], category: "Sports & Célébrités" },
  { id: "sc2", targetWord: "Tennis", forbiddenWords: ["Raquette", "Balle", "Filet", "Roland-Garros"], category: "Sports & Célébrités" },
  { id: "sc3", targetWord: "Kylian Mbappé", forbiddenWords: ["Foot", "PSG", "Real", "Attaquant"], category: "Sports & Célébrités" },
  { id: "sc4", targetWord: "Natation", forbiddenWords: ["Eau", "Piscine", "Nager", "Maillot"], category: "Sports & Célébrités" },
  { id: "sc5", targetWord: "Boxe", forbiddenWords: ["Gants", "Ring", "Combat", "Coup"], category: "Sports & Célébrités" },
  { id: "sc6", targetWord: "Basketball", forbiddenWords: ["Panier", "Ballon", "NBA", "Dribble"], category: "Sports & Célébrités" },
  { id: "sc7", targetWord: "Cristiano Ronaldo", forbiddenWords: ["CR7", "Portugal", "Foot", "But"], category: "Sports & Célébrités" },
  { id: "sc8", targetWord: "Lionel Messi", forbiddenWords: ["Argentine", "Ballon d'Or", "Barça", "Foot"], category: "Sports & Célébrités" },
  { id: "sc9", targetWord: "Formule 1", forbiddenWords: ["Voiture", "Circuit", "Pilote", "Vitesse"], category: "Sports & Célébrités" },
  { id: "sc10", targetWord: "Judo", forbiddenWords: ["Kimono", "Ceinture", "Tatami", "Combat"], category: "Sports & Célébrités" },
  { id: "sc11", targetWord: "Tour de France", forbiddenWords: ["Vélo", "Maillot jaune", "Étape", "Cyclisme"], category: "Sports & Célébrités" },
  { id: "sc12", targetWord: "Rugby", forbiddenWords: ["Ballon ovale", "Plaquage", "Essai", "Poteaux"], category: "Sports & Célébrités" },
  { id: "sc13", targetWord: "Équitation", forbiddenWords: ["Cheval", "Selle", "Galop", "Cavalier"], category: "Sports & Célébrités" },
  { id: "sc14", targetWord: "Skateboard", forbiddenWords: ["Roue", "Planche", "Trick", "Rampe"], category: "Sports & Célébrités" },
  { id: "sc15", targetWord: "Ski", forbiddenWords: ["Neige", "Montagne", "Piste", "Bâtons"], category: "Sports & Célébrités" },
  { id: "sc16", targetWord: "Marathon", forbiddenWords: ["Course", "42 km", "Courir", "Épuisement"], category: "Sports & Célébrités" },
  { id: "sc17", targetWord: "Beyoncé", forbiddenWords: ["Chanteuse", "Pop", "Queen", "Musique"], category: "Sports & Célébrités" },
  { id: "sc18", targetWord: "Michael Jackson", forbiddenWords: ["Pop", "Danse", "Moonwalk", "Chanteur"], category: "Sports & Célébrités" },
  { id: "sc19", targetWord: "Dwayne Johnson", forbiddenWords: ["The Rock", "Muscle", "Acteur", "Catch"], category: "Sports & Célébrités" },
  { id: "sc20", targetWord: "Zinedine Zidane", forbiddenWords: ["Tête", "1998", "Bleus", "Foot"], category: "Sports & Célébrités" },
  { id: "sc21", targetWord: "Golf", forbiddenWords: ["Trou", "Balle", "Club", "Gazon"], category: "Sports & Célébrités" },
  { id: "sc22", targetWord: "Surf", forbiddenWords: ["Vague", "Mer", "Planche", "Océan"], category: "Sports & Célébrités" },
  { id: "sc23", targetWord: "Gymnastique", forbiddenWords: ["Souplesse", "Équilibre", "Sol", "Poutre"], category: "Sports & Célébrités" },
  { id: "sc24", targetWord: "Céline Dion", forbiddenWords: ["Chanteuse", "Voix", "Titanic", "Québec"], category: "Sports & Célébrités" },
  { id: "sc25", targetWord: "Teddy Riner", forbiddenWords: ["Judo", "Champion", "Lourd", "Kimono"], category: "Sports & Célébrités" },
  { id: "sc26", targetWord: "Neymar", forbiddenWords: ["Brésil", "Dribble", "Foot", "PSG"], category: "Sports & Célébrités" },
  { id: "sc27", targetWord: "Antoine Griezmann", forbiddenWords: ["Bleus", "Atlético", "Foot", "France"], category: "Sports & Célébrités" },
  { id: "sc28", targetWord: "Usain Bolt", forbiddenWords: ["Vitesse", "100m", "Jamaïque", "Sprint"], category: "Sports & Célébrités" },
  { id: "sc29", targetWord: "Serena Williams", forbiddenWords: ["Tennis", "Grand Chelem", "Raquette", "Championne"], category: "Sports & Célébrités" },
  { id: "sc30", targetWord: "LeBron James", forbiddenWords: ["NBA", "Lakers", "Basket", "Roi"], category: "Sports & Célébrités" },
  { id: "sc31", targetWord: "Tiger Woods", forbiddenWords: ["Golf", "Trou", "Club", "Master"], category: "Sports & Célébrités" },
  { id: "sc32", targetWord: "Lewis Hamilton", forbiddenWords: ["Formule 1", "Mercedes", "Champion", "Pilote"], category: "Sports & Célébrités" },
  { id: "sc33", targetWord: "Mike Tyson", forbiddenWords: ["Boxe", "K-O", "Poids lourd", "Oreille"], category: "Sports & Célébrités" },
  { id: "sc34", targetWord: "Conor McGregor", forbiddenWords: ["UFC", "MMA", "Irlande", "Combat"], category: "Sports & Célébrités" },
  { id: "sc35", targetWord: "Taylor Swift", forbiddenWords: ["Chanteuse", "Pop", "Eras Tour", "Musique"], category: "Sports & Célébrités" },
  { id: "sc36", targetWord: "Rihanna", forbiddenWords: ["Chanteuse", "Umbrella", "Fenty", "Musique"], category: "Sports & Célébrités" },
  { id: "sc37", targetWord: "Drake", forbiddenWords: ["Rappeur", "Canada", "God's Plan", "Musique"], category: "Sports & Célébrités" },
  { id: "sc38", targetWord: "Eminem", forbiddenWords: ["Rap", "Slim Shady", "Détroit", "Chanson"], category: "Sports & Célébrités" },
  { id: "sc39", targetWord: "Kanye West", forbiddenWords: ["Ye", "Rappeur", "Yeezy", "Musique"], category: "Sports & Célébrités" },
  { id: "sc40", targetWord: "Lady Gaga", forbiddenWords: ["Chanteuse", "Poker Face", "Pop", "Star"], category: "Sports & Célébrités" },
  { id: "sc41", targetWord: "Justin Bieber", forbiddenWords: ["Chanteur", "Baby", "Pop", "Canada"], category: "Sports & Célébrités" },
  { id: "sc42", targetWord: "Ariana Grande", forbiddenWords: ["Chanteuse", "Voix", "7 Rings", "Pop"], category: "Sports & Célébrités" },
  { id: "sc43", targetWord: "Shakira", forbiddenWords: ["Waka Waka", "Chanteuse", "Danse", "Colombie"], category: "Sports & Célébrités" },
  { id: "sc44", targetWord: "Snoop Dogg", forbiddenWords: ["Rap", "Californie", "Rappeur", "Légende"], category: "Sports & Célébrités" },
  { id: "sc45", targetWord: "Will Smith", forbiddenWords: ["Acteur", "Prince de Bel-Air", "Gifle", "Film"], category: "Sports & Célébrités" },
  { id: "sc46", targetWord: "Leonardo DiCaprio", forbiddenWords: ["Titanic", "Oscar", "Acteur", "Inception"], category: "Sports & Célébrités" },
  { id: "sc47", targetWord: "Brad Pitt", forbiddenWords: ["Acteur", "Fight Club", "Hollywood", "Film"], category: "Sports & Célébrités" },
  { id: "sc48", targetWord: "Tom Cruise", forbiddenWords: ["Mission Impossible", "Cascade", "Top Gun", "Acteur"], category: "Sports & Célébrités" },
  { id: "sc49", targetWord: "Ryan Gosling", forbiddenWords: ["Barbie", "Drive", "Ken", "Acteur"], category: "Sports & Célébrités" },
  { id: "sc50", targetWord: "Zendaya", forbiddenWords: ["Euphoria", "Spider-Man", "Actrice", "Dune"], category: "Sports & Célébrités" },

  // ══════════════════════════════════════════════════════════════════════════
  // 🌴 VOYAGES & NATURE (50 CARTES)
  // ══════════════════════════════════════════════════════════════════════════
  { id: "vn1", targetWord: "Plage", forbiddenWords: ["Sable", "Mer", "Soleil", "Vacances"], category: "Voyages & Nature" },
  { id: "vn2", targetWord: "Avion", forbiddenWords: ["Voler", "Ciel", "Pilote", "Aéroport"], category: "Voyages & Nature" },
  { id: "vn3", targetWord: "Montagne", forbiddenWords: ["Neige", "Ski", "Sommet", "Altitude"], category: "Voyages & Nature" },
  { id: "vn4", targetWord: "Forêt", forbiddenWords: ["Arbres", "Bois", "Feuilles", "Nature"], category: "Voyages & Nature" },
  { id: "vn5", targetWord: "Désert", forbiddenWords: ["Sable", "Chaud", "Chameau", "Dune"], category: "Voyages & Nature" },
  { id: "vn6", targetWord: "Tour Eiffel", forbiddenWords: ["Paris", "France", "Monument", "Fer"], category: "Voyages & Nature" },
  { id: "vn7", targetWord: "Pyramides", forbiddenWords: ["Égypte", "Pharaon", "Tombeau", "Désert"], category: "Voyages & Nature" },
  { id: "vn8", targetWord: "Volcan", forbiddenWords: ["Lave", "Éruption", "Magma", "Cendres"], category: "Voyages & Nature" },
  { id: "vn9", targetWord: "Océan", forbiddenWords: ["Mer", "Eau", "Poisson", "Vague"], category: "Voyages & Nature" },
  { id: "vn10", targetWord: "Neige", forbiddenWords: ["Hiver", "Blanc", "Froid", "Flocon"], category: "Voyages & Nature" },
  { id: "vn11", targetWord: "Cascade", forbiddenWords: ["Eau", "Chute", "Rivière", "Roche"], category: "Voyages & Nature" },
  { id: "vn12", targetWord: "Camping", forbiddenWords: ["Tente", "Sac de couchage", "Feu", "Nature"], category: "Voyages & Nature" },
  { id: "vn13", targetWord: "Passeport", forbiddenWords: ["Voyage", "Douane", "Visa", "Pays"], category: "Voyages & Nature" },
  { id: "vn14", targetWord: "Île", forbiddenWords: ["Eau", "Mer", "Plage", "Isolé"], category: "Voyages & Nature" },
  { id: "vn15", targetWord: "Soleil", forbiddenWords: ["Chaud", "Lumière", "Jour", "Étoile"], category: "Voyages & Nature" },
  { id: "vn16", targetWord: "Tempête", forbiddenWords: ["Vent", "Pluie", "Éclair", "Tonnerre"], category: "Voyages & Nature" },
  { id: "vn17", targetWord: "Coucher de soleil", forbiddenWords: ["Ciel", "Rouge", "Soir", "Horizon"], category: "Voyages & Nature" },
  { id: "vn18", targetWord: "Grotte", forbiddenWords: ["Sombre", "Roche", "Pierre", "Caverne"], category: "Voyages & Nature" },
  { id: "vn19", targetWord: "Arc-en-ciel", forbiddenWords: ["Couleurs", "Pluie", "Ciel", "Soleil"], category: "Voyages & Nature" },
  { id: "vn20", targetWord: "Globe terrestre", forbiddenWords: ["Pays", "Géographie", "Carte", "Continents"], category: "Voyages & Nature" },
  { id: "vn21", targetWord: "Statue de la Liberté", forbiddenWords: ["New York", "Amérique", "Torche", "Île"], category: "Voyages & Nature" },
  { id: "vn22", targetWord: "Jungle", forbiddenWords: ["Tarzan", "Animaux", "Arbres", "Tropical"], category: "Voyages & Nature" },
  { id: "vn23", targetWord: "Boussole", forbiddenWords: ["Nord", "Direction", "Aiguille", "Perdu"], category: "Voyages & Nature" },
  { id: "vn24", targetWord: "Lune", forbiddenWords: ["Nuit", "Ciel", "Cratère", "Étoiles"], category: "Voyages & Nature" },
  { id: "vn25", targetWord: "Aurore boréale", forbiddenWords: ["Vert", "Nuit", "Ciel", "Lumière"], category: "Voyages & Nature" },
  { id: "vn26", targetWord: "Grande Muraille", forbiddenWords: ["Chine", "Pierre", "Chinois", "Monument"], category: "Voyages & Nature" },
  { id: "vn27", targetWord: "Taj Mahal", forbiddenWords: ["Inde", "Blanc", "Monument", "Amour"], category: "Voyages & Nature" },
  { id: "vn28", targetWord: "Colisée", forbiddenWords: ["Rome", "Italie", "Gladiateur", "Arène"], category: "Voyages & Nature" },
  { id: "vn29", targetWord: "Grand Canyon", forbiddenWords: ["USA", "Rouge", "Roche", "Fleuve"], category: "Voyages & Nature" },
  { id: "vn30", targetWord: "Amazonie", forbiddenWords: ["Fleuve", "Forêt", "Brésil", "Poumon"], category: "Voyages & Nature" },
  { id: "vn31", targetWord: "Sahara", forbiddenWords: ["Désert", "Afrique", "Sable", "Chaud"], category: "Voyages & Nature" },
  { id: "vn32", targetWord: "Antarctique", forbiddenWords: ["Pôle Sud", "Glace", "Manchot", "Froid"], category: "Voyages & Nature" },
  { id: "vn33", targetWord: "Safari", forbiddenWords: ["Afrique", "Animaux", "Jeep", "Savane"], category: "Voyages & Nature" },
  { id: "vn34", targetWord: "Bateau", forbiddenWords: ["Naviguer", "Mer", "Capitaine", "Eau"], category: "Voyages & Nature" },
  { id: "vn35", targetWord: "Train", forbiddenWords: ["Rails", "Gare", "Voyage", "Wagon"], category: "Voyages & Nature" },
  { id: "vn36", targetWord: "Hélicoptère", forbiddenWords: ["Hélice", "Voler", "Ciel", "Pilote"], category: "Voyages & Nature" },
  { id: "vn37", targetWord: "Plongée", forbiddenWords: ["Masque", "Poissons", "Eau", "Mer"], category: "Voyages & Nature" },
  { id: "vn38", targetWord: "Étoile", forbiddenWords: ["Nuit", "Ciel", "Briller", "Espace"], category: "Voyages & Nature" },
  { id: "vn39", targetWord: "Rivière", forbiddenWords: ["Eau", "Courant", "Poisson", "Fleuve"], category: "Voyages & Nature" },
  { id: "vn40", targetWord: "Fleur", forbiddenWords: ["Rose", "Pétale", "Jardin", "Parfum"], category: "Voyages & Nature" },
  { id: "vn41", targetWord: "Papillon", forbiddenWords: ["Ailes", "Insecte", "Chenille", "Voler"], category: "Voyages & Nature" },
  { id: "vn42", targetWord: "Dauphin", forbiddenWords: ["Mer", "Flipper", "Sauter", "Mammifère"], category: "Voyages & Nature" },
  { id: "vn43", targetWord: "Requin", forbiddenWords: ["Aileron", "Dents", "Océan", "Attaque"], category: "Voyages & Nature" },
  { id: "vn44", targetWord: "Lion", forbiddenWords: ["Roi", "Savane", "Rugir", "Felin"], category: "Voyages & Nature" },
  { id: "vn45", targetWord: "Éléphant", forbiddenWords: ["Trompe", "Défenses", "Gros", "Afrique"], category: "Voyages & Nature" },
  { id: "vn46", targetWord: "Pingouin", forbiddenWords: ["Banquise", "Noir et blanc", "Glace", "Oiseau"], category: "Voyages & Nature" },
  { id: "vn47", targetWord: "Ours", forbiddenWords: ["Forêt", "Miel", "Polar", "Hiberner"], category: "Voyages & Nature" },
  { id: "vn48", targetWord: "Tremblement de terre", forbiddenWords: ["Séisme", "Sol", "Secousse", "Faillle"], category: "Voyages & Nature" },
  { id: "vn49", targetWord: "Tsunami", forbiddenWords: ["Vague", "Océan", "Eau", "Catastrophe"], category: "Voyages & Nature" },
  { id: "vn50", targetWord: "Tornade", forbiddenWords: ["Vent", "Tourbillon", "Tempête", "Degats"], category: "Voyages & Nature" },
];


const usedTabooIdsHistory = new Set<string>();

/** Réinitialiser l'historique des mots tirés */
export function resetWordMasterHistory(): void {
  usedTabooIdsHistory.clear();
}

/** Tirer une carte Tabou aléatoire sans répétition dans la session */
export function getRandomTabooCard(category: WordMasterCategory = "Toutes"): TabooCard {
  let pool = TABOO_DATABASE;
  if (category !== "Toutes") {
    pool = TABOO_DATABASE.filter(c => c.category === category);
  }
  if (pool.length === 0) pool = TABOO_DATABASE;

  // Filtrer les cartes déjà tirées dans cette session
  let availablePool = pool.filter(c => !usedTabooIdsHistory.has(c.id));

  // Si toutes les cartes de la catégorie ont été tirées, réinitialiser la mémoire de la catégorie
  if (availablePool.length === 0) {
    pool.forEach(c => usedTabooIdsHistory.delete(c.id));
    availablePool = pool;
  }

  const chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedTabooIdsHistory.add(chosen.id);

  return chosen;
}
