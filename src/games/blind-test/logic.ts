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

// Base de secours garantie par catégorie (Extraits M4A certifiés 100% fonctionnels)
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

const usedTrackIdsHistory = new Set<string>();

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

  // Leurres crédibles de la MÊME CATÉGORIE — comparaison normalisée
  const normalizedCorrect = normalizeTitle(track.trackName);
  const availableWrong = wrongPool.filter(w => normalizeTitle(w.trackName) !== normalizedCorrect);
  const shuffledWrong = [...availableWrong].sort(() => 0.5 - Math.random());

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
  const shuffledChoices = [...choicesList].sort(() => 0.5 - Math.random());

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
