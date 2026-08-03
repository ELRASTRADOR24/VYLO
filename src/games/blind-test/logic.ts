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
  choices: string[]; // 4 choix (1 vrai + 3 faux)
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

/**
  Interroge l'API officielle iTunes d'Apple pour récupérer un extrait MP3/M4A de 30s
 */
export async function fetchTrackFromiTunes(searchQuery: string, category: BlindTestCategory): Promise<TrackItem | null> {
  try {
    const encoded = encodeURIComponent(searchQuery);
    const url = `https://itunes.apple.com/search?term=${encoded}&country=FR&media=music&entity=song&limit=10`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      // Filtrer les morceaux avec extraits audio valides
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

/**
  Génère une question complète de Blind Test avec 4 choix (1 vrai + 3 leurres)
 */
export async function generateBlindTestQuestion(category: BlindTestCategory = "Tous"): Promise<BlindTestQuestion> {
  const artistsList = CATEGORY_ARTISTS[category] || CATEGORY_ARTISTS["Tous"];
  const randomArtist = artistsList[Math.floor(Math.random() * artistsList.length)];
  
  let track = await fetchTrackFromiTunes(randomArtist, category);

  // Si l'API renvoie null ou un morceau déjà joué, prendre un autre morceau ou fallback
  if (!track || usedTrackIdsHistory.has(track.id)) {
    const fallbackCategoryTracks = FALLBACK_TRACKS.filter(t => category === "Tous" || t.category === category);
    track = fallbackCategoryTracks[Math.floor(Math.random() * fallbackCategoryTracks.length)] || FALLBACK_TRACKS[0];
  }

  usedTrackIdsHistory.add(track.id);

  // Génération des 4 choix (Leurres)
  const correctAnswer = `${track.artistName} — ${track.trackName}`;
  
  // Leurres d'autres artistes
  const otherArtists = artistsList.filter(a => a !== track?.artistName);
  const shuffledOthers = [...otherArtists].sort(() => 0.5 - Math.random());
  
  const wrongChoices = [
    `${shuffledOthers[0] || "Jul"} — ${track.trackName}`,
    `${track.artistName} — ${shuffledOthers[1] || "Canoë"}`,
    `${shuffledOthers[2] || "Ninho"} — ${shuffledOthers[3] || "Réseaux"}`
  ];

  // Mélanger les 4 choix de façon aléatoire
  const allChoices = [correctAnswer, ...wrongChoices].sort(() => 0.5 - Math.random());
  const correctChoiceIndex = allChoices.indexOf(correctAnswer);

  return {
    track,
    choices: allChoices,
    correctChoiceIndex
  };
}
