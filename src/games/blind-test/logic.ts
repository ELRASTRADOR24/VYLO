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
  choices: string[]; // 4 choix affichant CLAIREMENT le titre de la chanson en premier !
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

// Vrais titres de chansons célèbres par catégorie pour créer des leurres ultra-crédibles
export const CATEGORY_WRONG_TITLES: Record<BlindTestCategory, { title: string; artist: string }[]> = {
  "Tous": [
    { title: "Meuda", artist: "Tiakola" },
    { title: "Réseaux", artist: "Niska" },
    { title: "Canoë", artist: "Ninho" },
    { title: "Hakuna Matata", artist: "Le Roi Lion" },
    { title: "Despacito", artist: "Luis Fonsi" },
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Libérée, Délivrée", artist: "La Reine des Neiges" },
    { title: "Ce rêve bleu", artist: "Aladdin" }
  ],
  "Hits & Rap Français": [
    { title: "Meuda", artist: "Tiakola" },
    { title: "Réseaux", artist: "Niska" },
    { title: "Canoë", artist: "Ninho" },
    { title: "Bande Organisée", artist: "Jul" },
    { title: "Djadja", artist: "Aya Nakamura" },
    { title: "Bolide Germanique", artist: "SDM" },
    { title: "Midi dans le ghetto", artist: "Gazo" },
    { title: "Chocolat", artist: "Keblack" }
  ],
  "Musique Espagnole & Latino": [
    { title: "Despacito", artist: "Luis Fonsi" },
    { title: "Dakiti", artist: "Bad Bunny" },
    { title: "Con Calma", artist: "Daddy Yankee" },
    { title: "Pepas", artist: "Farruko" },
    { title: "Mi Gente", artist: "J Balvin" },
    { title: "Bailando", artist: "Enrique Iglesias" },
    { title: "Provenza", artist: "Karol G" },
    { title: "Gasolina", artist: "Daddy Yankee" }
  ],
  "Pop International": [
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "God's Plan", artist: "Drake" },
    { title: "Umbrella", artist: "Rihanna" },
    { title: "Uptown Funk", artist: "Bruno Mars" },
    { title: "Shape of You", artist: "Ed Sheeran" },
    { title: "Starboy", artist: "The Weeknd" }
  ],
  "Films & Dessins Animés": [
    { title: "Hakuna Matata", artist: "Le Roi Lion" },
    { title: "Libérée, Délivrée", artist: "La Reine des Neiges" },
    { title: "Ce rêve bleu", artist: "Aladdin" },
    { title: "L'histoire de la vie", artist: "Le Roi Lion" },
    { title: "Ne parlons pas de Bruno", artist: "Encanto" },
    { title: "Comme un homme", artist: "Mulan" },
    { title: "Le bleu du ciel", artist: "Vaiana" },
    { title: "Je voudrais déjà être roi", artist: "Le Roi Lion" }
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
  // Si c'est une liste de comédiens/artistes très longue ("Jamel Debbouze, Alban Ivanov..."), garder le premier principal
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

/** Formatage standardisé d'un choix : Le Titre de la Chanson en PREMIER ! */
function formatChoiceText(title: string, artist: string): string {
  return `${title} — ${artist}`;
}

/** Génère une question complète de Blind Test avec le TITRE DE LA CHANSON TOUJOURS CLAIREMENT VISIBLE */
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

  // Vraie réponse (TITRE EN PREMIER !)
  const correctAnswer = formatChoiceText(track.trackName, track.artistName);
  
  // Leurres crédibles avec vrais titres de chansons de la même catégorie
  const availableWrong = wrongPool.filter(w => w.title.toLowerCase() !== track?.trackName.toLowerCase());
  const shuffledWrong = [...availableWrong].sort(() => 0.5 - Math.random());
  
  const choicesSet = new Set<string>();
  choicesSet.add(correctAnswer);

  // 1. Même artiste, mais autre titre célèbre
  if (shuffledWrong.length > 0) {
    choicesSet.add(formatChoiceText(shuffledWrong[0].title, track.artistName));
  }

  // 2. Autre titre célèbre avec son propre artiste
  if (shuffledWrong.length > 1) {
    choicesSet.add(formatChoiceText(shuffledWrong[1].title, shuffledWrong[1].artist));
  }

  // 3. Autre titre célèbre
  if (shuffledWrong.length > 2) {
    choicesSet.add(formatChoiceText(shuffledWrong[2].title, shuffledWrong[2].artist));
  }

  // Compléter à 4 choix uniques si besoin
  let fallbackIndex = 0;
  while (choicesSet.size < 4 && fallbackIndex < wrongPool.length) {
    const item = wrongPool[fallbackIndex];
    const candidate = formatChoiceText(item.title, item.artist);
    if (!choicesSet.has(candidate)) {
      choicesSet.add(candidate);
    }
    fallbackIndex++;
  }

  const allChoices = Array.from(choicesSet).sort(() => 0.5 - Math.random());
  const correctChoiceIndex = allChoices.indexOf(correctAnswer);

  return {
    track,
    choices: allChoices,
    correctChoiceIndex
  };
}
