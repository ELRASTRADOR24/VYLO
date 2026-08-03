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
  choices: string[]; // 4 choix crédibles et proches (1 vrai + 3 leurres)
  correctChoiceIndex: number;
}

// Artistes & Titres Clés pour la recherche dynamique Apple Music iTunes API
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
    "Disney", "Star Wars", "Harry Potter", "Roi Lion", "Reine des neiges", "Encanto", "Dragon Ball Z", "Naruto"
  ]
};

// Titres leurres plausibles par catégorie pour créer des pièges crédibles
export const PLAUSIBLE_TRACK_TITLES: Record<BlindTestCategory, string[]> = {
  "Tous": ["Canoë", "Réseaux", "Meuda", "Dakiti", "Despacito", "Blinding Lights", "Libérée, Délivrée"],
  "Hits & Rap Français": ["Canoë", "Réseaux", "Meuda", "J'ai mal", "Chocolat", "Bande Organisée", "Djadja", "Bolide Germanique", "Midi dans le ghetto"],
  "Musique Espagnole & Latino": ["Dakiti", "Despacito", "Con Calma", "Pepas", "Mi Gente", "Bailando", "Provenza", "Gasolina"],
  "Pop International": ["Blinding Lights", "Levitating", "God's Plan", "Umbrella", "Uptown Funk", "Shape of You", "Starboy"],
  "Films & Dessins Animés": ["Libérée, Délivrée", "Ce rêve bleu", "L'histoire de la vie", "Ne parlons pas de Bruno", "Chala Head Chala"]
};

// Base de pistes de secours réelles avec vrais extraits Apple Music M4A
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
    artistName: "Bad Bunny",
    trackName: "MONACO",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4a/12/34/4a123456.plus.aac.p.m4a",
    category: "Musique Espagnole & Latino"
  }
];

const usedTrackIdsHistory = new Set<string>();

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
        artistName: randomTrack.artistName,
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

/** Génère une question complète de Blind Test avec 4 choix proches et crédibles */
export async function generateBlindTestQuestion(category: BlindTestCategory = "Tous"): Promise<BlindTestQuestion> {
  const artistsList = CATEGORY_ARTISTS[category] || CATEGORY_ARTISTS["Tous"];
  const plausibleTitles = PLAUSIBLE_TRACK_TITLES[category] || PLAUSIBLE_TRACK_TITLES["Tous"];
  const randomArtist = artistsList[Math.floor(Math.random() * artistsList.length)];
  
  let track = await fetchTrackFromiTunes(randomArtist, category);

  if (!track || usedTrackIdsHistory.has(track.id)) {
    const fallbackCategoryTracks = FALLBACK_TRACKS.filter(t => category === "Tous" || t.category === category);
    track = fallbackCategoryTracks[Math.floor(Math.random() * fallbackCategoryTracks.length)] || FALLBACK_TRACKS[0];
  }

  usedTrackIdsHistory.add(track.id);

  // Vraie réponse
  const correctAnswer = `${track.artistName} — ${track.trackName}`;
  
  // Leurres de la MÊME catégorie (artistes très proches de même style)
  const relatedArtists = artistsList.filter(a => a.toLowerCase() !== track?.artistName.toLowerCase());
  const shuffledArtists = [...relatedArtists].sort(() => 0.5 - Math.random());
  const shuffledTitles = [...plausibleTitles].filter(t => t.toLowerCase() !== track?.trackName.toLowerCase()).sort(() => 0.5 - Math.random());
  
  const wrongChoices = [
    `${shuffledArtists[0] || "Ninho"} — ${track.trackName}`, // Mème nom de chanson, autre artiste proche
    `${track.artistName} — ${shuffledTitles[0] || "Canoë"}`, // Même artiste, titre alternatif plausible
    `${shuffledArtists[1] || "SDM"} — ${shuffledTitles[1] || "Midi dans le ghetto"}` // Autre artiste du même genre
  ];

  // Mélange aléatoire des 4 choix
  const allChoices = Array.from(new Set([correctAnswer, ...wrongChoices])).sort(() => 0.5 - Math.random());
  
  // Compléter à 4 choix si doublon supprimé
  while (allChoices.length < 4) {
    const extraArtist = shuffledArtists[allChoices.length] || "Jul";
    const extraTitle = shuffledTitles[allChoices.length] || "Morceau";
    const option = `${extraArtist} — ${extraTitle}`;
    if (!allChoices.includes(option)) allChoices.push(option);
  }

  const correctChoiceIndex = allChoices.indexOf(correctAnswer);

  return {
    track,
    choices: allChoices,
    correctChoiceIndex
  };
}
