export type FlagCategory = 
  | "Monde Entier" 
  | "Europe & Amériques" 
  | "Afrique & Asie" 
  | "Drapeaux Pièges & Rares";

export interface CountryFlag {
  code: string; // Code ISO 2 lettres ex: "fr", "sn", "br"
  countryName: string;
  capital: string;
  flagUrl: string;
  category: FlagCategory;
}

export interface FlagQuizQuestion {
  flag: CountryFlag;
  choices: string[]; // 4 choix (1 vrai + 3 faux)
  correctChoiceIndex: number;
}

export const FLAG_CATEGORIES: FlagCategory[] = [
  "Monde Entier",
  "Europe & Amériques",
  "Afrique & Asie",
  "Drapeaux Pièges & Rares"
];

// Base de données complète de pays avec codes ISO pour drapeaux HD FlagCDN
export const WORLD_FLAGS_DATABASE: CountryFlag[] = [
  // --- Europe & Amériques ---
  { code: "fr", countryName: "France", capital: "Paris", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/fr.png" },
  { code: "es", countryName: "Espagne", capital: "Madrid", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/es.png" },
  { code: "br", countryName: "Brésil", capital: "Brasília", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/br.png" },
  { code: "ar", countryName: "Argentine", capital: "Buenos Aires", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/ar.png" },
  { code: "us", countryName: "États-Unis", capital: "Washington D.C.", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/us.png" },
  { code: "ca", countryName: "Canada", capital: "Ottawa", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/ca.png" },
  { code: "it", countryName: "Italie", capital: "Rome", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/it.png" },
  { code: "de", countryName: "Allemagne", capital: "Berlin", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/de.png" },
  { code: "pt", countryName: "Portugal", capital: "Lisbonne", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/pt.png" },
  { code: "mx", countryName: "Mexique", capital: "Mexico", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/mx.png" },
  { code: "co", countryName: "Colombie", capital: "Bogota", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/co.png" },
  { code: "gb", countryName: "Royaume-Uni", capital: "Londres", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/gb.png" },
  { code: "nl", countryName: "Pays-Bas", capital: "Amsterdam", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/nl.png text" },
  { code: "be", countryName: "Belgique", capital: "Bruxelles", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/be.png" },
  { code: "ch", countryName: "Suisse", capital: "Berne", category: "Europe & Amériques", flagUrl: "https://flagcdn.com/w320/ch.png" },

  // --- Afrique & Asie ---
  { code: "sn", countryName: "Sénégal", capital: "Dakar", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/sn.png" },
  { code: "ci", countryName: "Côte d'Ivoire", capital: "Yamoussoukro", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/ci.png" },
  { code: "ma", countryName: "Maroc", capital: "Rabat", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/ma.png" },
  { code: "dz", countryName: "Algérie", capital: "Alger", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/dz.png" },
  { code: "cm", countryName: "Cameroun", capital: "Yaoundé", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/cm.png" },
  { code: "jp", countryName: "Japon", capital: "Tokyo", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/jp.png" },
  { code: "kr", countryName: "Corée du Sud", capital: "Séoul", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/kr.png" },
  { code: "cn", countryName: "Chine", capital: "Pékin", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/cn.png" },
  { code: "in", countryName: "Inde", capital: "New Delhi", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/in.png" },
  { code: "eg", countryName: "Égypte", capital: "Le Caire", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/eg.png" },
  { code: "ng", countryName: "Négéria", capital: "Abuja", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/ng.png" },
  { code: "tn", countryName: "Tunisie", capital: "Tunis", category: "Afrique & Asie", flagUrl: "https://flagcdn.com/w320/tn.png" },

  // --- Drapeaux Pièges & Rares ---
  { code: "nr", countryName: "Nauru", capital: "Yaren", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/nr.png" },
  { code: "ki", countryName: "Kiribati", capital: "Tarawa", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/ki.png" },
  { code: "sz", countryName: "Eswatini", capital: "Mbabane", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/sz.png" },
  { code: "km", countryName: "Comores", capital: "Moroni", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/km.png" },
  { code: "tv", countryName: "Tuvalu", capital: "Funafuti", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/tv.png" },
  { code: "bt", countryName: "Bhoutan", capital: "Thimphou", category: "Drapeaux Pièges & Rares", flagUrl: "https://flagcdn.com/w320/bt.png" }
];

const usedFlagCodesHistory = new Set<string>();

/** Génère une question de drapeau avec 4 choix proches et crédibles */
export function generateFlagQuestion(category: FlagCategory = "Monde Entier"): FlagQuizQuestion {
  let pool = WORLD_FLAGS_DATABASE;
  if (category !== "Monde Entier") {
    pool = WORLD_FLAGS_DATABASE.filter(f => f.category === category);
  }
  if (pool.length === 0) pool = WORLD_FLAGS_DATABASE;

  // Filtrer les drapeaux déjà tirés dans cette session
  let availablePool = pool.filter(f => !usedFlagCodesHistory.has(f.code));

  if (availablePool.length === 0) {
    pool.forEach(f => usedFlagCodesHistory.delete(f.code));
    availablePool = pool;
  }

  const chosenFlag = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedFlagCodesHistory.add(chosenFlag.code);

  const correctAnswer = chosenFlag.countryName;

  // Sélectionner 3 pays leurres d'autres drapeaux
  const otherCountries = WORLD_FLAGS_DATABASE
    .filter(f => f.code !== chosenFlag.code)
    .map(f => f.countryName);

  const shuffledOthers = [...otherCountries].sort(() => 0.5 - Math.random());
  
  const allChoices = Array.from(new Set([correctAnswer, shuffledOthers[0], shuffledOthers[1], shuffledOthers[2]]))
    .sort(() => 0.5 - Math.random());

  while (allChoices.length < 4) {
    const extra = shuffledOthers[allChoices.length + 2] || "Suède";
    if (!allChoices.includes(extra)) allChoices.push(extra);
  }

  const correctChoiceIndex = allChoices.indexOf(correctAnswer);

  return {
    flag: chosenFlag,
    choices: allChoices,
    correctChoiceIndex
  };
}
