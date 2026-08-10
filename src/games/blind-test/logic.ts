export type BlindTestCategory = 
  | "Tous" 
  | "Hits & Rap Français" 
  | "Musique Espagnole & Latino" 
  | "Pop International" 
  | "Films & Dessins Animés";

export interface TrackItem {
  id: string;
  artistName: string;
  trackName: string;
  previewUrl: string;
  artworkUrl?: string;
  category: BlindTestCategory;
}

export interface BlindTestQuestion {
  track: TrackItem;
  choices: { trackName: string; artistName: string }[];
  correctChoiceIndex: number;
}

// ─────────────────────────────────────────────────────────────────────────
// BASE DE DONNÉES MUSICALE ÉTENDUE — 30+ requêtes par catégorie
// Chaque requête est un couple "Artiste Titre" vérifié sur iTunes FR
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORY_SEARCH_QUERIES: Record<BlindTestCategory, string[]> = {
  "Hits & Rap Français": [
    "Tiakola Meuda", "Niska Reseaux", "Ninho Canoe", "SDM Bolide Germanique",
    "Gazo Midi dans le ghetto", "Jul Bande Organisee", "Aya Nakamura Djadja",
    "Keblack Chocolat", "Damso Macarena", "PLK Petrouchka",
    "Nekfeu On verra", "Booba DKR", "PNL Au DD", "Rim'K Air Max",
    "Lacrim Corleone", "SCH Jvlivs", "Orelsan La pluie", "Soprano Mon Everest",
    "Maitre Gims Sapés comme jamais", "Lomepal Trop beau",
    "Vald Journal Perso", "Laylow Trinity", "Freeze Corleone Desiigner",
    "Hamza Life", "Dinos Stamina", "Josman Mine", "Zola Mona Lisa",
    "Werenoi Pyramide", "Guy2Bezbar C'est la hess", "Koba LaD RR 9.1",
    "Gambi Popopop", "Heuss l'Enfoire Aristocrate", "Naps La kiffance"
  ],
  "Musique Espagnole & Latino": [
    "Bad Bunny Monaco", "Luis Fonsi Despacito", "Daddy Yankee Con Calma",
    "J Balvin Mi Gente", "Enrique Iglesias Bailando", "Shakira Waka Waka",
    "Karol G Provenza", "Farruko Pepas", "Ozuna Taki Taki",
    "Maluma Hawai", "Rosalia Despecha", "Rauw Alejandro Todo de Ti",
    "Nicky Jam El Amante", "Becky G Sin Pijama", "Sech Otro Trago",
    "Sebastian Yatra Traicionera", "Anuel AA China", "Bad Bunny Yonaguni",
    "Don Omar Danza Kuduro", "Wisin Reggaeton Lento", "Aventura Obsesion",
    "Carlos Vives La Bicicleta", "Marc Anthony Vivir Mi Vida",
    "Camilo Tutu", "Pedro Capo Calma", "Natti Natasha Criminal",
    "Romeo Santos Propuesta Indecente", "Prince Royce Darte un Beso",
    "Rauw Alejandro Baby Hello", "Bad Bunny Titi Me Pregunto",
    "Shakira Bzrp Music Sessions 53", "Karol G TQG"
  ],
  "Pop International": [
    "The Weeknd Blinding Lights", "Dua Lipa Levitating", "Drake Gods Plan",
    "Rihanna Umbrella", "Bruno Mars Uptown Funk", "Ed Sheeran Shape of You",
    "Beyonce Crazy in Love", "Justin Bieber Sorry",
    "Adele Rolling in the Deep", "Taylor Swift Shake it Off",
    "Post Malone Sunflower", "Billie Eilish Bad Guy",
    "Harry Styles As It Was", "Ariana Grande 7 Rings",
    "Maroon 5 Sugar", "Imagine Dragons Believer", "Sam Smith Stay With Me",
    "Sia Chandelier", "Lady Gaga Bad Romance", "Katy Perry Roar",
    "Coldplay Viva la Vida", "OneRepublic Counting Stars",
    "Miley Cyrus Flowers", "Doja Cat Say So", "Lizzo About Damn Time",
    "Olivia Rodrigo good 4 u", "SZA Kill Bill", "Travis Scott SICKO MODE",
    "Lil Nas X Montero", "The Chainsmokers Closer",
    "Calvin Harris Summer", "Pharrell Williams Happy"
  ],
  "Films & Dessins Animés": [
    "Hakuna Matata Le Roi Lion", "Liberee Delivree Reine des Neiges",
    "Ce reve bleu Aladdin", "Ne parlons pas de Bruno Encanto",
    "L'histoire de la vie Le Roi Lion", "Comme un homme Mulan",
    "Le bleu du ciel Vaiana", "Je voudrais deja etre roi Le Roi Lion",
    "Sous l'ocean La Petite Sirene", "Partir la-bas La Petite Sirene",
    "Il en faut peu pour etre heureux Le Livre de la Jungle",
    "L'air du vent Pocahontas", "Ratatouille Le Festin Camille",
    "Supercalifragilisticexpialidocious Mary Poppins",
    "Un jour mon prince viendra Blanche Neige",
    "Colors of the Wind Pocahontas", "A Whole New World Aladdin",
    "Let It Go Frozen", "You've Got a Friend in Me Toy Story",
    "Remember Me Coco", "Into the Unknown Frozen 2",
    "How Far I'll Go Moana", "Surface Pressure Encanto",
    "Can You Feel the Love Tonight Lion King",
    "Beauty and the Beast", "Be Our Guest Beauty and the Beast",
    "Friend Like Me Aladdin", "I Just Can't Wait to Be King Lion King",
    "When You Wish Upon a Star Pinocchio", "Bibbidi Bobbidi Boo Cendrillon",
    "Reflection Mulan", "Try Everything Zootopia Shakira"
  ],
  "Tous": [] // sera rempli dynamiquement
};

// "Tous" = mélange de TOUTES les catégories
CATEGORY_SEARCH_QUERIES["Tous"] = [
  ...CATEGORY_SEARCH_QUERIES["Hits & Rap Français"],
  ...CATEGORY_SEARCH_QUERIES["Musique Espagnole & Latino"],
  ...CATEGORY_SEARCH_QUERIES["Pop International"],
  ...CATEGORY_SEARCH_QUERIES["Films & Dessins Animés"],
];

// ─────────────────────────────────────────────────────────────────────────
// LEURRES (faux choix) — Largement enrichis par catégorie
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORY_WRONG_TITLES: Record<BlindTestCategory, { trackName: string; artistName: string }[]> = {
  "Hits & Rap Français": [
    { trackName: "Meuda", artistName: "Tiakola" },
    { trackName: "Réseaux", artistName: "Niska" },
    { trackName: "Canoë", artistName: "Ninho" },
    { trackName: "Bande Organisée", artistName: "Jul" },
    { trackName: "Djadja", artistName: "Aya Nakamura" },
    { trackName: "Bolide Germanique", artistName: "SDM" },
    { trackName: "Midi dans le ghetto", artistName: "Gazo" },
    { trackName: "Chocolat", artistName: "Keblack" },
    { trackName: "Macarena", artistName: "Damso" },
    { trackName: "Petrouchka", artistName: "PLK" },
    { trackName: "On verra", artistName: "Nekfeu" },
    { trackName: "DKR", artistName: "Booba" },
    { trackName: "Au DD", artistName: "PNL" },
    { trackName: "Air Max", artistName: "Rim'K" },
    { trackName: "Corleone", artistName: "Lacrim" },
    { trackName: "Jvlivs", artistName: "SCH" },
    { trackName: "La pluie", artistName: "Orelsan" },
    { trackName: "Mon Everest", artistName: "Soprano" },
    { trackName: "Sapés comme jamais", artistName: "Maître Gims" },
    { trackName: "Trop beau", artistName: "Lomepal" },
    { trackName: "Journal Perso", artistName: "Vald" },
    { trackName: "Trinity", artistName: "Laylow" },
    { trackName: "Life", artistName: "Hamza" },
    { trackName: "Stamina", artistName: "Dinos" },
    { trackName: "Mine", artistName: "Josman" },
    { trackName: "Mona Lisa", artistName: "Zola" },
    { trackName: "Pyramide", artistName: "Werenoi" },
    { trackName: "La kiffance", artistName: "Naps" },
    { trackName: "RR 9.1", artistName: "Koba LaD" },
    { trackName: "Popopop", artistName: "Gambi" },
  ],
  "Musique Espagnole & Latino": [
    { trackName: "Despacito", artistName: "Luis Fonsi" },
    { trackName: "MONACO", artistName: "Bad Bunny" },
    { trackName: "Con Calma", artistName: "Daddy Yankee" },
    { trackName: "Pepas", artistName: "Farruko" },
    { trackName: "Mi Gente", artistName: "J Balvin" },
    { trackName: "Bailando", artistName: "Enrique Iglesias" },
    { trackName: "Provenza", artistName: "Karol G" },
    { trackName: "Waka Waka", artistName: "Shakira" },
    { trackName: "Taki Taki", artistName: "Ozuna" },
    { trackName: "Hawai", artistName: "Maluma" },
    { trackName: "Despecha", artistName: "Rosalía" },
    { trackName: "Todo de Ti", artistName: "Rauw Alejandro" },
    { trackName: "El Amante", artistName: "Nicky Jam" },
    { trackName: "Sin Pijama", artistName: "Becky G" },
    { trackName: "Otro Trago", artistName: "Sech" },
    { trackName: "Yonaguni", artistName: "Bad Bunny" },
    { trackName: "Danza Kuduro", artistName: "Don Omar" },
    { trackName: "Obsesión", artistName: "Aventura" },
    { trackName: "Vivir Mi Vida", artistName: "Marc Anthony" },
    { trackName: "Calma", artistName: "Pedro Capó" },
    { trackName: "Criminal", artistName: "Natti Natasha" },
    { trackName: "Titi Me Preguntó", artistName: "Bad Bunny" },
    { trackName: "TQG", artistName: "Karol G" },
    { trackName: "Baby Hello", artistName: "Rauw Alejandro" },
  ],
  "Pop International": [
    { trackName: "Blinding Lights", artistName: "The Weeknd" },
    { trackName: "Levitating", artistName: "Dua Lipa" },
    { trackName: "God's Plan", artistName: "Drake" },
    { trackName: "Umbrella", artistName: "Rihanna" },
    { trackName: "Uptown Funk", artistName: "Bruno Mars" },
    { trackName: "Shape of You", artistName: "Ed Sheeran" },
    { trackName: "Crazy in Love", artistName: "Beyoncé" },
    { trackName: "Sorry", artistName: "Justin Bieber" },
    { trackName: "Rolling in the Deep", artistName: "Adele" },
    { trackName: "Shake It Off", artistName: "Taylor Swift" },
    { trackName: "Sunflower", artistName: "Post Malone" },
    { trackName: "Bad Guy", artistName: "Billie Eilish" },
    { trackName: "As It Was", artistName: "Harry Styles" },
    { trackName: "7 Rings", artistName: "Ariana Grande" },
    { trackName: "Sugar", artistName: "Maroon 5" },
    { trackName: "Believer", artistName: "Imagine Dragons" },
    { trackName: "Chandelier", artistName: "Sia" },
    { trackName: "Bad Romance", artistName: "Lady Gaga" },
    { trackName: "Roar", artistName: "Katy Perry" },
    { trackName: "Viva la Vida", artistName: "Coldplay" },
    { trackName: "Counting Stars", artistName: "OneRepublic" },
    { trackName: "Flowers", artistName: "Miley Cyrus" },
    { trackName: "Say So", artistName: "Doja Cat" },
    { trackName: "good 4 u", artistName: "Olivia Rodrigo" },
    { trackName: "Kill Bill", artistName: "SZA" },
    { trackName: "SICKO MODE", artistName: "Travis Scott" },
    { trackName: "Montero", artistName: "Lil Nas X" },
    { trackName: "Closer", artistName: "The Chainsmokers" },
    { trackName: "Happy", artistName: "Pharrell Williams" },
    { trackName: "Summer", artistName: "Calvin Harris" },
  ],
  "Films & Dessins Animés": [
    { trackName: "Hakuna Matata", artistName: "Le Roi Lion" },
    { trackName: "Libérée, Délivrée", artistName: "La Reine des Neiges" },
    { trackName: "Ce rêve bleu", artistName: "Aladdin" },
    { trackName: "L'histoire de la vie", artistName: "Le Roi Lion" },
    { trackName: "Ne parlons pas de Bruno", artistName: "Encanto" },
    { trackName: "Comme un homme", artistName: "Mulan" },
    { trackName: "Le bleu du ciel", artistName: "Vaiana" },
    { trackName: "Je voudrais déjà être roi", artistName: "Le Roi Lion" },
    { trackName: "Sous l'océan", artistName: "La Petite Sirène" },
    { trackName: "Partir là-bas", artistName: "La Petite Sirène" },
    { trackName: "Il en faut peu pour être heureux", artistName: "Le Livre de la Jungle" },
    { trackName: "L'air du vent", artistName: "Pocahontas" },
    { trackName: "Le Festin", artistName: "Ratatouille" },
    { trackName: "Un jour mon prince viendra", artistName: "Blanche-Neige" },
    { trackName: "A Whole New World", artistName: "Aladdin" },
    { trackName: "Let It Go", artistName: "Frozen" },
    { trackName: "You've Got a Friend in Me", artistName: "Toy Story" },
    { trackName: "Remember Me", artistName: "Coco" },
    { trackName: "Into the Unknown", artistName: "Frozen 2" },
    { trackName: "How Far I'll Go", artistName: "Moana" },
    { trackName: "Surface Pressure", artistName: "Encanto" },
    { trackName: "Beauty and the Beast", artistName: "La Belle et la Bête" },
    { trackName: "Friend Like Me", artistName: "Aladdin" },
    { trackName: "Reflection", artistName: "Mulan" },
    { trackName: "Try Everything", artistName: "Zootopia" },
    { trackName: "Bibbidi-Bobbidi-Boo", artistName: "Cendrillon" },
  ],
  "Tous": [] // sera rempli dynamiquement
};

// "Tous" = tous les leurres de toutes les catégories
CATEGORY_WRONG_TITLES["Tous"] = [
  ...CATEGORY_WRONG_TITLES["Hits & Rap Français"],
  ...CATEGORY_WRONG_TITLES["Musique Espagnole & Latino"],
  ...CATEGORY_WRONG_TITLES["Pop International"],
  ...CATEGORY_WRONG_TITLES["Films & Dessins Animés"],
];

// ─────────────────────────────────────────────────────────────────────────
// BASE DE SECOURS STATIQUE (extraits M4A certifiés fonctionnels)
// ─────────────────────────────────────────────────────────────────────────

export const FALLBACK_TRACKS_BY_CATEGORY: Record<BlindTestCategory, TrackItem[]> = {
  "Tous": [
    {
      id: "f_disney1",
      artistName: "Le Roi Lion",
      trackName: "Hakuna Matata",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/45/7f/cb457fa6-274c-874c-609c-256818be0dee/mzaf_6042916080041616002.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    }
  ],
  "Films & Dessins Animés": [
    {
      id: "f_disney1",
      artistName: "Le Roi Lion",
      trackName: "Hakuna Matata",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/45/7f/cb457fa6-274c-874c-609c-256818be0dee/mzaf_6042916080041616002.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    },
    {
      id: "f_disney2",
      artistName: "La Reine des Neiges",
      trackName: "Libérée, Délivrée",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/5d/c8/895dc868-cab0-6007-82df-8868f6e3fa60/mzaf_17801391047194953213.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    }
  ],
  "Hits & Rap Français": [
    {
      id: "f_rap1",
      artistName: "Tiakola",
      trackName: "Meuda",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/06/ab/7b/06ab7bee-a243-d196-4e76-06c91b01b6e4/mzaf_4586533787945775726.plus.aac.p.m4a",
      category: "Hits & Rap Français"
    },
    {
      id: "f_rap2",
      artistName: "Niska",
      trackName: "Réseaux",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1c/ef/38/1cef383f-1f36-eeba-e73e-e8b49327bb02/mzaf_3753683410543449189.plus.aac.p.m4a",
      category: "Hits & Rap Français"
    }
  ],
  "Musique Espagnole & Latino": [
    {
      id: "f_latino1",
      artistName: "Luis Fonsi",
      trackName: "Despacito",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/5b/e7/405be722-3ec9-ba27-7469-002182d57b39/mzaf_14120258742032474456.plus.aac.p.m4a",
      category: "Musique Espagnole & Latino"
    }
  ],
  "Pop International": [
    {
      id: "f_pop1",
      artistName: "The Weeknd",
      trackName: "Blinding Lights",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/b4/8f/17b48f9a-0b93-6bb8-fe1d-3a16623c2cfb/mzaf_9560252727299052414.plus.aac.p.m4a",
      category: "Pop International"
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────
// ANTI-RÉPÉTITION : suivi des requêtes ET des tracks déjà jouées
// ─────────────────────────────────────────────────────────────────────────

const usedTrackIdsHistory = new Set<string>();
const usedQueriesHistory = new Set<string>();

/** Réinitialise l'historique (appelé par la page au début d'une nouvelle partie) */
export function resetBlindTestHistory(): void {
  usedTrackIdsHistory.clear();
  usedQueriesHistory.clear();
}

/** Normalise un titre pour comparaison fiable (supprime feat, parenthèses, accents, casse) */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // supprime accents
    .replace(/\s*\(.*?\)/g, "")      // supprime (feat. X), (Remix), etc.
    .replace(/\s*\[.*?\]/g, "")      // supprime [Deluxe], [Live], etc.
    .replace(/\s*feat\.?\s.*/i, "")  // supprime "feat. Rsko" en fin
    .replace(/\s*ft\.?\s.*/i, "")   // supprime "ft. Rsko" en fin
    .replace(/[^a-z0-9\s]/g, "")    // supprime ponctuation
    .replace(/\s+/g, " ")           // normalise espaces
    .trim();
}

/** Nettoie le nom de l'artiste s'il est trop long ou contient des virgules multiples */
function cleanArtistName(rawArtist: string, category: BlindTestCategory): string {
  if (!rawArtist) return "Artiste";
  if (category === "Films & Dessins Animés") {
    if (rawArtist.toLowerCase().includes("roi lion")) return "Le Roi Lion";
    if (rawArtist.toLowerCase().includes("reine des neiges")) return "La Reine des Neiges";
    if (rawArtist.toLowerCase().includes("aladdin")) return "Aladdin";
    if (rawArtist.toLowerCase().includes("encanto")) return "Encanto";
    if (rawArtist.toLowerCase().includes("mulan")) return "Mulan";
    if (rawArtist.toLowerCase().includes("vaiana") || rawArtist.toLowerCase().includes("moana")) return "Vaiana";
    if (rawArtist.toLowerCase().includes("disney")) return "Disney";
    if (rawArtist.toLowerCase().includes("coco")) return "Coco";
    if (rawArtist.toLowerCase().includes("toy story")) return "Toy Story";
    if (rawArtist.toLowerCase().includes("frozen")) return "La Reine des Neiges";
    if (rawArtist.toLowerCase().includes("petite sir")) return "La Petite Sirène";
    if (rawArtist.toLowerCase().includes("pocahontas")) return "Pocahontas";
    if (rawArtist.toLowerCase().includes("ratatouille")) return "Ratatouille";
    if (rawArtist.toLowerCase().includes("zootop") || rawArtist.toLowerCase().includes("zootopia")) return "Zootopia";
    if (rawArtist.toLowerCase().includes("cendrillon") || rawArtist.toLowerCase().includes("cinderella")) return "Cendrillon";
    if (rawArtist.toLowerCase().includes("blanche") || rawArtist.toLowerCase().includes("snow white")) return "Blanche-Neige";
    if (rawArtist.toLowerCase().includes("beauty") || rawArtist.toLowerCase().includes("belle et")) return "La Belle et la Bête";
    if (rawArtist.toLowerCase().includes("livre de la jungle") || rawArtist.toLowerCase().includes("jungle book")) return "Le Livre de la Jungle";
    if (rawArtist.toLowerCase().includes("pinocchio")) return "Pinocchio";
    if (rawArtist.toLowerCase().includes("mary poppins")) return "Mary Poppins";
  }

  const parts = rawArtist.split(",");
  if (parts.length > 2) {
    return parts[0].trim();
  }
  return rawArtist.trim();
}

/** Mélange un tableau (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Interroge l'API officielle iTunes d'Apple pour récupérer un extrait MP3/M4A de 30s */
export async function fetchTrackFromiTunes(searchQuery: string, category: BlindTestCategory): Promise<TrackItem | null> {
  try {
    const encoded = encodeURIComponent(searchQuery);
    const url = `https://itunes.apple.com/search?term=${encoded}&country=FR&media=music&entity=song&limit=5`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const validResults = data.results.filter((r: any) => r.previewUrl && r.artistName && r.trackName);
      if (validResults.length === 0) return null;

      // Toujours prendre le PREMIER résultat (le plus pertinent par l'API iTunes)
      const bestTrack = validResults[0];
      return {
        id: bestTrack.trackId?.toString() || Math.random().toString(),
        artistName: cleanArtistName(bestTrack.artistName, category),
        trackName: bestTrack.trackName,
        previewUrl: bestTrack.previewUrl,
        artworkUrl: bestTrack.artworkUrl100?.replace("100x100bb", "300x300bb"),
        category
      };
    }
    return null;
  } catch (err) {
    console.warn("iTunes API search failed, fallback to static dataset", err);
    return null;
  }
}

/** Génère une question de Blind Test SANS RÉPÉTITION et STRICTEMENT ISOLÉE par catégorie */
export async function generateBlindTestQuestion(category: BlindTestCategory = "Tous"): Promise<BlindTestQuestion> {
  const queryList = CATEGORY_SEARCH_QUERIES[category] || CATEGORY_SEARCH_QUERIES["Tous"];
  const wrongPool = CATEGORY_WRONG_TITLES[category] || CATEGORY_WRONG_TITLES["Tous"];
  const categoryFallbacks = FALLBACK_TRACKS_BY_CATEGORY[category] || FALLBACK_TRACKS_BY_CATEGORY["Tous"];

  // ── ANTI-RÉPÉTITION : filtrer les requêtes déjà utilisées ──
  let unusedQueries = queryList.filter(q => !usedQueriesHistory.has(q));

  // Si toutes les requêtes de cette catégorie ont été utilisées, RESET de la catégorie
  if (unusedQueries.length === 0) {
    queryList.forEach(q => usedQueriesHistory.delete(q));
    unusedQueries = [...queryList];
  }

  // Mélanger les requêtes non utilisées et tenter chacune dans l'ordre
  const shuffledQueries = shuffle(unusedQueries);
  let track: TrackItem | null = null;

  for (const query of shuffledQueries) {
    track = await fetchTrackFromiTunes(query, category);

    if (track && !usedTrackIdsHistory.has(track.id)) {
      // Track trouvée et pas encore jouée → on la prend !
      usedQueriesHistory.add(query);
      break;
    }

    // Track déjà jouée ou introuvable, marquer la requête et essayer la suivante
    usedQueriesHistory.add(query);
    track = null;
  }

  // Si AUCUNE requête n'a donné de track unique, utiliser les fallbacks
  if (!track) {
    const unusedFallbacks = categoryFallbacks.filter(t => !usedTrackIdsHistory.has(t.id));
    if (unusedFallbacks.length > 0) {
      track = unusedFallbacks[Math.floor(Math.random() * unusedFallbacks.length)];
    } else {
      // Dernier recours : reset complet et prendre un fallback
      usedTrackIdsHistory.clear();
      track = categoryFallbacks[0];
    }
  }

  usedTrackIdsHistory.add(track.id);

  // ── GÉNÉRATION DES 4 CHOIX ──

  // Vraie réponse
  const correctChoice = {
    trackName: track.trackName,
    artistName: track.artistName
  };

  // Leurres crédibles de la MÊME CATÉGORIE — comparaison normalisée
  const normalizedCorrect = normalizeTitle(track.trackName);
  const availableWrong = wrongPool.filter(w => normalizeTitle(w.trackName) !== normalizedCorrect);
  const shuffledWrong = shuffle(availableWrong);

  const choicesList: { trackName: string; artistName: string }[] = [correctChoice];

  for (const wrongItem of shuffledWrong) {
    if (choicesList.length >= 4) break;
    const normalizedWrong = normalizeTitle(wrongItem.trackName);
    const exists = choicesList.some(c => normalizeTitle(c.trackName) === normalizedWrong);
    if (!exists) {
      choicesList.push(wrongItem);
    }
  }

  // Compléter à 4 si besoin
  while (choicesList.length < 4) {
    const dummy = { trackName: `Titre ${choicesList.length + 1}`, artistName: track.artistName };
    choicesList.push(dummy);
  }

  // Mélange aléatoire des 4 choix
  const shuffledChoices = shuffle(choicesList);

  // GARANTIE ABSOLUE : la bonne réponse DOIT être dans les choix
  let correctChoiceIndex = shuffledChoices.findIndex(
    c => c.trackName === correctChoice.trackName && c.artistName === correctChoice.artistName
  );

  // Sécurité : si la bonne réponse est introuvable (ne devrait jamais arriver), forcer en position 0
  if (correctChoiceIndex === -1) {
    shuffledChoices[0] = correctChoice;
    correctChoiceIndex = 0;
  }

  return {
    track,
    choices: shuffledChoices,
    correctChoiceIndex
  };
}
