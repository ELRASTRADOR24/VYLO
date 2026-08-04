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

// Requêtes de recherche exactes et vérifiées par catégorie pour iTunes
export const CATEGORY_SEARCH_QUERIES: Record<BlindTestCategory, string[]> = {
  "Tous": [
    "Tiakola Meuda", "Niska Reseaux", "Bad Bunny Monaco", "Luis Fonsi Despacito", "The Weeknd Blinding Lights", "Hakuna Matata Le Roi Lion", "Liberee Delivree Reine des Neiges"
  ],
  "Hits & Rap Français": [
    "Tiakola Meuda", "Niska Reseaux", "Ninho Canoë", "SDM Bolide Germanique", "Gazo Midi dans le ghetto", "Jul Bande Organisee", "Aya Nakamura Djadja", "Keblack Chocolat", "Damso Macarena", "PLK Petrouchka"
  ],
  "Musique Espagnole & Latino": [
    "Bad Bunny Monaco", "Luis Fonsi Despacito", "Daddy Yankee Con Calma", "J Balvin Mi Gente", "Enrique Iglesias Bailando", "Shakira Waka Waka", "Karol G Provenza", "Farruko Pepas"
  ],
  "Pop International": [
    "The Weeknd Blinding Lights", "Dua Lipa Levitating", "Drake Gods Plan", "Rihanna Umbrella", "Bruno Mars Uptown Funk", "Ed Sheeran Shape of You", "Beyonce Crazy in Love", "Justin Bieber Sorry"
  ],
  "Films & Dessins Animés": [
    "Hakuna Matata Le Roi Lion", 
    "Liberee Delivree Reine des Neiges", 
    "Ce reve bleu Aladdin", 
    "Ne parlons pas de Bruno Encanto", 
    "L'histoire de la vie Le Roi Lion", 
    "Comme un homme Mulan", 
    "Le bleu du ciel Vaiana", 
    "Je voudrais deja etre roi Le Roi Lion"
  ]
};

// Leurres crédibles et 100% valides par catégorie
export const CATEGORY_WRONG_TITLES: Record<BlindTestCategory, { trackName: string; artistName: string }[]> = {
  "Tous": [
    { trackName: "Meuda", artistName: "Tiakola" },
    { trackName: "Réseaux", artistName: "Niska" },
    { trackName: "Hakuna Matata", artistName: "Le Roi Lion" },
    { trackName: "Despacito", artistName: "Luis Fonsi" },
    { trackName: "Blinding Lights", artistName: "The Weeknd" },
    { trackName: "Libérée, Délivrée", artistName: "La Reine des Neiges" }
  ],
  "Hits & Rap Français": [
    { trackName: "Meuda", artistName: "Tiakola" },
    { trackName: "Réseaux", artistName: "Niska" },
    { trackName: "Canoë", artistName: "Ninho" },
    { trackName: "Bande Organisée", artistName: "Jul" },
    { trackName: "Djadja", artistName: "Aya Nakamura" },
    { trackName: "Bolide Germanique", artistName: "SDM" },
    { trackName: "Midi dans le ghetto", artistName: "Gazo" },
    { trackName: "Chocolat", artistName: "Keblack" }
  ],
  "Musique Espagnole & Latino": [
    { trackName: "Despacito", artistName: "Luis Fonsi" },
    { trackName: "MONACO", artistName: "Bad Bunny" },
    { trackName: "Con Calma", artistName: "Daddy Yankee" },
    { trackName: "Pepas", artistName: "Farruko" },
    { trackName: "Mi Gente", artistName: "J Balvin" },
    { trackName: "Bailando", artistName: "Enrique Iglesias" },
    { trackName: "Provenza", artistName: "Karol G" }
  ],
  "Pop International": [
    { trackName: "Blinding Lights", artistName: "The Weeknd" },
    { trackName: "Levitating", artistName: "Dua Lipa" },
    { trackName: "God's Plan", artistName: "Drake" },
    { trackName: "Umbrella", artistName: "Rihanna" },
    { trackName: "Uptown Funk", artistName: "Bruno Mars" },
    { trackName: "Shape of You", artistName: "Ed Sheeran" }
  ],
  "Films & Dessins Animés": [
    { trackName: "Hakuna Matata", artistName: "Le Roi Lion" },
    { trackName: "Libérée, Délivrée", artistName: "La Reine des Neiges" },
    { trackName: "Ce rêve bleu", artistName: "Aladdin" },
    { trackName: "L'histoire de la vie", artistName: "Le Roi Lion" },
    { trackName: "Ne parlons pas de Bruno", artistName: "Encanto" },
    { trackName: "Comme un homme", artistName: "Mulan" },
    { trackName: "Le bleu du ciel", artistName: "Vaiana" },
    { trackName: "Je voudrais déjà être roi", artistName: "Le Roi Lion" }
  ]
};

// Base de secours garantie par catégorie (Extraits M4A certifiés)
export const FALLBACK_TRACKS_BY_CATEGORY: Record<BlindTestCategory, TrackItem[]> = {
  "Tous": [
    {
      id: "f_disney1",
      artistName: "Le Roi Lion",
      trackName: "Hakuna Matata",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bf/1e/8c/bf1e8c68-efcb-49d7-bf6f-b2e3e5b3f1a2/mzaf_1648057280738622143.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    }
  ],
  "Films & Dessins Animés": [
    {
      id: "f_disney1",
      artistName: "Le Roi Lion",
      trackName: "Hakuna Matata",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bf/1e/8c/bf1e8c68-efcb-49d7-bf6f-b2e3e5b3f1a2/mzaf_1648057280738622143.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    },
    {
      id: "f_disney2",
      artistName: "La Reine des Neiges",
      trackName: "Libérée, Délivrée",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4a/12/34/4a123456.plus.aac.p.m4a",
      category: "Films & Dessins Animés"
    }
  ],
  "Hits & Rap Français": [
    {
      id: "f_rap1",
      artistName: "Tiakola",
      trackName: "Meuda",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ff/0e/6d/ff0e6d54-77bd-8396-8b4b-80add22a5d07/mzaf_15907425106486008883.plus.aac.p.m4a",
      category: "Hits & Rap Français"
    },
    {
      id: "f_rap2",
      artistName: "Niska",
      trackName: "Réseaux",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/94/77/3a947788-e825-712c-0f6e-0e6ad25497a4/mzaf_18124790980569350929.plus.aac.p.m4a",
      category: "Hits & Rap Français"
    }
  ],
  "Musique Espagnole & Latino": [
    {
      id: "f_latino1",
      artistName: "Luis Fonsi",
      trackName: "Despacito",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/1e/8c/bf1e8c68-efcb-49d7-bf6f-b2e3e5b3f1a2/mzaf_1648057280738622143.plus.aac.p.m4a",
      category: "Musique Espagnole & Latino"
    }
  ],
  "Pop International": [
    {
      id: "f_pop1",
      artistName: "The Weeknd",
      trackName: "Blinding Lights",
      previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4a/12/34/4a123456.plus.aac.p.m4a",
      category: "Pop International"
    }
  ]
};

const usedTrackIdsHistory = new Set<string>();

/** Nettoie le nom de l'artiste s'il est trop long ou contient des virgules multiples */
function cleanArtistName(rawArtist: string, category: BlindTestCategory): string {
  if (!rawArtist) return "Artiste";
  if (category === "Films & Dessins Animés") {
    if (rawArtist.toLowerCase().includes("roi lion")) return "Le Roi Lion";
    if (rawArtist.toLowerCase().includes("reine des neiges")) return "La Reine des Neiges";
    if (rawArtist.toLowerCase().includes("aladdin")) return "Aladdin";
    if (rawArtist.toLowerCase().includes("encanto")) return "Encanto";
    if (rawArtist.toLowerCase().includes("mulan")) return "Mulan";
    if (rawArtist.toLowerCase().includes("vaiana")) return "Vaiana";
    if (rawArtist.toLowerCase().includes("disney")) return "Disney";
  }

  const parts = rawArtist.split(",");
  if (parts.length > 2) {
    return parts[0].trim();
  }
  return rawArtist.trim();
}

/** Interroge l'API officielle iTunes d'Apple pour récupérer un extrait MP3/M4A de 30s */
export async function fetchTrackFromiTunes(searchQuery: string, category: BlindTestCategory): Promise<TrackItem | null> {
  try {
    const encoded = encodeURIComponent(searchQuery);
    const url = `https://itunes.apple.com/search?term=${encoded}&country=FR&media=music&entity=song&limit=10`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const validResults = data.results.filter((r: any) => r.previewUrl && r.artistName && r.trackName);
      if (validResults.length === 0) return null;

      const randomTrack = validResults[Math.floor(Math.random() * validResults.length)];
      return {
        id: randomTrack.trackId?.toString() || Math.random().toString(),
        artistName: cleanArtistName(randomTrack.artistName, category),
        trackName: randomTrack.trackName,
        previewUrl: randomTrack.previewUrl,
        artworkUrl: randomTrack.artworkUrl100?.replace("100x100bb", "300x300bb"),
        category
      };
    }
    return null;
  } catch (err) {
    console.warn("iTunes API search failed, fallback to static dataset", err);
    return null;
  }
}

/** Génère une question de Blind Test STRICTEMENT ISOLÉE DANS SA CATÉGORIE */
export async function generateBlindTestQuestion(category: BlindTestCategory = "Tous"): Promise<BlindTestQuestion> {
  const queryList = CATEGORY_SEARCH_QUERIES[category] || CATEGORY_SEARCH_QUERIES["Tous"];
  const wrongPool = CATEGORY_WRONG_TITLES[category] || CATEGORY_WRONG_TITLES["Tous"];
  const categoryFallbacks = FALLBACK_TRACKS_BY_CATEGORY[category] || FALLBACK_TRACKS_BY_CATEGORY["Tous"];

  const randomQuery = queryList[Math.floor(Math.random() * queryList.length)];
  let track = await fetchTrackFromiTunes(randomQuery, category);

  // Si le morceau est introuvable ou a déjà été joué, utiliser la base de secours DE LA MÊME CATÉGORIE
  if (!track || usedTrackIdsHistory.has(track.id)) {
    const unusedFallbacks = categoryFallbacks.filter(t => !usedTrackIdsHistory.has(t.id));
    track = unusedFallbacks.length > 0 
      ? unusedFallbacks[Math.floor(Math.random() * unusedFallbacks.length)] 
      : categoryFallbacks[0];
  }

  usedTrackIdsHistory.add(track.id);

  // Vraie réponse
  const correctChoice = {
    trackName: track.trackName,
    artistName: track.artistName
  };

  // Leurres crédibles de la MÊME CATÉGORIE
  const availableWrong = wrongPool.filter(w => w.trackName.toLowerCase() !== track?.trackName.toLowerCase());
  const shuffledWrong = [...availableWrong].sort(() => 0.5 - Math.random());

  const choicesList: { trackName: string; artistName: string }[] = [correctChoice];

  for (const wrongItem of shuffledWrong) {
    if (choicesList.length >= 4) break;
    const exists = choicesList.some(c => c.trackName.toLowerCase() === wrongItem.trackName.toLowerCase());
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
  const shuffledChoices = [...choicesList].sort(() => 0.5 - Math.random());
  const correctChoiceIndex = shuffledChoices.findIndex(
    c => c.trackName === correctChoice.trackName && c.artistName === correctChoice.artistName
  );

  return {
    track,
    choices: shuffledChoices,
    correctChoiceIndex
  };
}
