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

// Artistes & Mots-clés de recherche iTunes par catégorie
export const CATEGORY_ARTISTS: Record<BlindTestCategory, string[]> = {
  "Tous": [
    "Tiakola", "Niska", "Ninho", "Gazo", "SDM", "Jul", "Aya Nakamura", "Werenoi", "Bad Bunny", "Rosalía", "Daddy Yankee", "Dua Lipa", "Disney"
  ],
  "Hits & Rap Français": [
    "Tiakola", "Niska", "Ninho", "Gazo", "SDM", "Jul", "Aya Nakamura", "Werenoi", "Tayc", "Franglish", "Keblack", "Damso", "PLK", "Gims", "Soprano", "Soolking"
  ],
  "Musique Espagnole & Latino": [
    "Bad Bunny", "Rosalía", "J Balvin", "Daddy Yankee", "Rauw Alejandro", "Karol G", "Maluma", "Enrique Iglesias", "Aitana", "Luis Fonsi", "Shakira"
  ],
  "Pop International": [
    "The Weeknd", "Dua Lipa", "Drake", "Rihanna", "Bruno Mars", "Justin Bieber", "Ed Sheeran", "Beyoncé", "Ariana Grande"
  ],
  "Films & Dessins Animés": [
    "Disney", "Roi Lion", "Reine des neiges", "Encanto", "Aladdin", "Mulan", "Tarzan", "Vaiana", "Hercules"
  ]
};

// Leurres crédibles de la MÊME catégorie avec vrais artistes et vraies chansons correspondantes !
export const CATEGORY_WRONG_TITLES: Record<BlindTestCategory, { trackName: string; artistName: string }[]> = {
  "Tous": [
    { trackName: "Meuda", artistName: "Tiakola" },
    { trackName: "Réseaux", artistName: "Niska" },
    { trackName: "Canoë", artistName: "Ninho" },
    { trackName: "Hakuna Matata", artistName: "Le Roi Lion" },
    { trackName: "Despacito", artistName: "Luis Fonsi" },
    { trackName: "Blinding Lights", artistName: "The Weeknd" },
    { trackName: "Libérée, Délivrée", artistName: "La Reine des Neiges" },
    { trackName: "Ce rêve bleu", artistName: "Aladdin" }
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
    { trackName: "Dakiti", artistName: "Bad Bunny" },
    { trackName: "Con Calma", artistName: "Daddy Yankee" },
    { trackName: "Pepas", artistName: "Farruko" },
    { trackName: "Mi Gente", artistName: "J Balvin" },
    { trackName: "Bailando", artistName: "Enrique Iglesias" },
    { trackName: "Provenza", artistName: "Karol G" },
    { trackName: "Gasolina", artistName: "Daddy Yankee" }
  ],
  "Pop International": [
    { trackName: "Blinding Lights", artistName: "The Weeknd" },
    { trackName: "Levitating", artistName: "Dua Lipa" },
    { trackName: "God's Plan", artistName: "Drake" },
    { trackName: "Umbrella", artistName: "Rihanna" },
    { trackName: "Uptown Funk", artistName: "Bruno Mars" },
    { trackName: "Shape of You", artistName: "Ed Sheeran" },
    { trackName: "Starboy", artistName: "The Weeknd" }
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

// Base de secours réelle avec extraits Apple Music
export const FALLBACK_TRACKS: TrackItem[] = [
  {
    id: "f1",
    artistName: "Tiakola",
    trackName: "Meuda",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/ff/0e/6d/ff0e6d54-77bd-8396-8b4b-80add22a5d07/mzaf_15907425106486008883.plus.aac.p.m4a",
    category: "Hits & Rap Français"
  },
  {
    id: "f2",
    artistName: "Niska",
    trackName: "Réseaux",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/94/77/3a947788-e825-712c-0f6e-0e6ad25497a4/mzaf_18124790980569350929.plus.aac.p.m4a",
    category: "Hits & Rap Français"
  },
  {
    id: "f3",
    artistName: "Luis Fonsi",
    trackName: "Despacito",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/1e/8c/bf1e8c68-efcb-49d7-bf6f-b2e3e5b3f1a2/mzaf_1648057280738622143.plus.aac.p.m4a",
    category: "Musique Espagnole & Latino"
  }
];

const usedTrackIdsHistory = new Set<string>();

/** Nettoie le nom de l'artiste s'il est trop long ou contient des virgules multiples */
function cleanArtistName(rawArtist: string): string {
  if (!rawArtist) return "Artiste";
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
        artistName: cleanArtistName(randomTrack.artistName),
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

/** Génère une question de Blind Test avec des paires { trackName, artistName } 100% Cohérentes ! */
export async function generateBlindTestQuestion(category: BlindTestCategory = "Tous"): Promise<BlindTestQuestion> {
  const artistsList = CATEGORY_ARTISTS[category] || CATEGORY_ARTISTS["Tous"];
  const wrongPool = CATEGORY_WRONG_TITLES[category] || CATEGORY_WRONG_TITLES["Tous"];
  const randomArtist = artistsList[Math.floor(Math.random() * artistsList.length)];
  
  let track = await fetchTrackFromiTunes(randomArtist, category);

  if (!track || usedTrackIdsHistory.has(track.id)) {
    const fallbackCategoryTracks = FALLBACK_TRACKS.filter(t => category === "Tous" || t.category === category);
    track = fallbackCategoryTracks[Math.floor(Math.random() * fallbackCategoryTracks.length)] || FALLBACK_TRACKS[0];
  }

  usedTrackIdsHistory.add(track.id);

  // Vraie réponse
  const correctChoice = {
    trackName: track.trackName,
    artistName: track.artistName
  };

  // Leurres crédibles avec de VRAIES paires { trackName, artistName } de la même catégorie !
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
