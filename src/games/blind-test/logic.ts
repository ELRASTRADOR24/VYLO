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

// ══════════════════════════════════════════════════════════════════════════
// BASE DE DONNÉES MUSICALE — 100+ REQUÊTES PAR CATÉGORIE
// Chaque entrée = "Artiste Titre" → recherche iTunes FR
// ══════════════════════════════════════════════════════════════════════════

const RAP_FR: string[] = [
  "Tiakola Meuda","Niska Reseaux","Ninho Canoe","SDM Bolide Germanique",
  "Gazo Midi dans le ghetto","Jul Bande Organisee","Aya Nakamura Djadja",
  "Keblack Chocolat","Damso Macarena","PLK Petrouchka",
  "Nekfeu On verra","Booba DKR","PNL Au DD","Rim'K Air Max",
  "Lacrim Corleone","SCH Jvlivs","Orelsan La pluie","Soprano Mon Everest",
  "Maitre Gims Sapés comme jamais","Lomepal Trop beau",
  "Vald Journal Perso","Laylow Trinity","Freeze Corleone Desiigner",
  "Hamza Life","Dinos Stamina","Josman Mine","Zola Mona Lisa",
  "Werenoi Pyramide","Guy2Bezbar C'est la hess","Koba LaD RR 9.1",
  "Gambi Popopop","Heuss l'Enfoire Aristocrate","Naps La kiffance",
  "Kaaris Sevran","Gradur Sheguey","Maes Madrina","Naza Laisser couler",
  "Soolking Guerilla","Dadju Reine","Alonzo Assurance vie",
  "Gims Est-ce que tu m'aimes","Vegedream Ramenez la coupe",
  "MHD Afro Trap Part 7","Fally Ipupa Eloko Oyo","Tayc Le temps",
  "Djadja Dinaz Favela","Hornet La Frappe Gramme 2 peuf",
  "RK Insolent","Lefa Fame","Dosseh Infréquentables",
  "Rohff Qui est l'exemple","IAM Je danse le Mia","MC Solaar Caroline",
  "Oxmo Puccino L'enfant seul","La Fouine Veni vidi vici",
  "Youssoupha Entourage","Médine Grand Paris","Lino Requiem",
  "Kery James Banlieusards","Kalash Mwaka Moon","Kalash Criminel Sauvagerie",
  "Sofiane Bandit saleté","13 Block Binks","DTF Nuit",
  "Leto Tik Tok","Mister V MVP","Lorenzo Nuit de folie",
  "Moha La Squale Bandolero","Imen Es Essaie encore","Wejdene Anissa",
  "Eva Alibi","Hatik Angela","Soso Maness So Maness",
  "Larry Landes","Timal La 11","Fresh La Peuf",
  "SDM Persona non grata","Gazo Die","Ninho Lettre à une femme",
  "PLK Pas les mêmes","Booba Ratpi World","PNL Deux frères",
  "Jul C'est pas des LOL","Aya Nakamura Pookie","Aya Nakamura Copines",
  "Niska Médicament","Damso Bruxelles vie","SCH Otto",
  "Orelsan Basique","Orelsan Tout va bien","Soprano Fresh Prince",
  "Maitre Gims Bella","Nekfeu Les étoiles vagabondes","Vald Ce monde est cruel",
  "Lomepal 1000°C","Hamza Vibes","Josman À quoi tu joues",
  "Freeze Corleone LDA","Laylow Jojô","Dinos Stéréotype",
  "Zola Comme à l'ancienne","Koba LaD Danse sur ma lève",
  "Gambi Hé oh","Heuss l'Enfoire Khapta","Naps Bébé",
  "Kaaris Château noir","Gradur Rosa","Maes Les derniers salopards",
  "Soolking Dalida","Dadju Bob Marley","Alonzo Tu mérites",
  "Vegedream Obscure","MHD Bébé","Tayc Do Do Do",
  "Hornet La Frappe Ma belle","RK Premier étage","Moha MMZ À ma table",
];

const LATINO: string[] = [
  "Bad Bunny Monaco","Luis Fonsi Despacito","Daddy Yankee Con Calma",
  "J Balvin Mi Gente","Enrique Iglesias Bailando","Shakira Waka Waka",
  "Karol G Provenza","Farruko Pepas","Ozuna Taki Taki",
  "Maluma Hawai","Rosalia Despecha","Rauw Alejandro Todo de Ti",
  "Nicky Jam El Amante","Becky G Sin Pijama","Sech Otro Trago",
  "Sebastian Yatra Traicionera","Anuel AA China","Bad Bunny Yonaguni",
  "Don Omar Danza Kuduro","Wisin Reggaeton Lento","Aventura Obsesion",
  "Carlos Vives La Bicicleta","Marc Anthony Vivir Mi Vida",
  "Camilo Tutu","Pedro Capo Calma","Natti Natasha Criminal",
  "Romeo Santos Propuesta Indecente","Prince Royce Darte un Beso",
  "Rauw Alejandro Baby Hello","Bad Bunny Titi Me Pregunto",
  "Shakira Bzrp Music Sessions 53","Karol G TQG",
  "Daddy Yankee Gasolina","Daddy Yankee Dura","Shakira Hips Don't Lie",
  "Shakira Whenever Wherever","Ricky Martin Livin La Vida Loca",
  "Ricky Martin She Bangs","Enrique Iglesias Hero","Enrique Iglesias Rhythm Divine",
  "Pitbull Timber","Pitbull International Love","Pitbull Don't Stop The Party",
  "Shakira La Tortura","Juanes La Camisa Negra","Juanes A Dios Le Pido",
  "Celia Cruz La Vida Es Un Carnaval","Gloria Estefan Conga",
  "Jennifer Lopez On The Floor","Jennifer Lopez Let's Get Loud",
  "J Balvin Ay Vamos","J Balvin Ginza","J Balvin Tranquila",
  "Bad Bunny Dakiti","Bad Bunny Callaita","Bad Bunny Yo Perreo Sola",
  "Ozuna Se Preparo","Ozuna Te Bote","Ozuna Baila Baila Baila",
  "Maluma Felices Los 4","Maluma Borro Cassette","Maluma Corazon",
  "Nicky Jam Hasta El Amanecer","Nicky Jam Travesuras",
  "Don Omar Dale Don Dale","Don Omar Taboo","Wisin Algo Me Gusta De Ti",
  "Rosalia Con Altura","Rosalia Malamente","Rosalia Bizcochito",
  "Rauw Alejandro Desesperados","Rauw Alejandro 2 Camisetas",
  "Karol G Bichota","Karol G Tusa","Karol G Mamiii",
  "Becky G Mayores","Becky G Shower","Anuel AA Secreto",
  "Jhay Cortez Dakiti","Feid Normal","Feid Ferxxo 100",
  "Sebastian Yatra Robarte Un Beso","Camilo Vida de Rico",
  "Carlos Vives Volví a Nacer","Marc Anthony Tu Amor Me Hace Bien",
  "Romeo Santos Eres Mia","Romeo Santos La Diabla",
  "Prince Royce Corazon Sin Cara","Prince Royce Te Robaré",
  "Daddy Yankee Que Tire Pa Lante","Daddy Yankee Limbo",
  "Bad Bunny Moscow Mule","Bad Bunny Un Verano Sin Ti",
  "Luis Fonsi Echame La Culpa","Luis Fonsi No Me Doy Por Vencido",
  "Pedro Capo Cien años","Natti Natasha Sin Pijama",
  "Aventura Un Beso","Aventura Los Infieles",
  "Farruko Calma Remix","Sech 911","Sech Relacion",
  "Cnco Reggaeton Lento","Reik Ya Me Entere",
  "Mana Rayando El Sol","Mana Labios Compartidos",
  "Shakira Chantaje","Shakira Me Gusta","Shakira Loca",
];

const POP_INT: string[] = [
  "The Weeknd Blinding Lights","Dua Lipa Levitating","Drake Gods Plan",
  "Rihanna Umbrella","Bruno Mars Uptown Funk","Ed Sheeran Shape of You",
  "Beyonce Crazy in Love","Justin Bieber Sorry",
  "Adele Rolling in the Deep","Taylor Swift Shake it Off",
  "Post Malone Sunflower","Billie Eilish Bad Guy",
  "Harry Styles As It Was","Ariana Grande 7 Rings",
  "Maroon 5 Sugar","Imagine Dragons Believer","Sam Smith Stay With Me",
  "Sia Chandelier","Lady Gaga Bad Romance","Katy Perry Roar",
  "Coldplay Viva la Vida","OneRepublic Counting Stars",
  "Miley Cyrus Flowers","Doja Cat Say So","Lizzo About Damn Time",
  "Olivia Rodrigo good 4 u","SZA Kill Bill","Travis Scott SICKO MODE",
  "Lil Nas X Montero","The Chainsmokers Closer",
  "Calvin Harris Summer","Pharrell Williams Happy",
  "Adele Someone Like You","Adele Hello","Adele Easy On Me",
  "Taylor Swift Anti Hero","Taylor Swift Love Story","Taylor Swift Blank Space",
  "Ed Sheeran Perfect","Ed Sheeran Photograph","Ed Sheeran Bad Habits",
  "Bruno Mars Just The Way You Are","Bruno Mars 24K Magic","Bruno Mars Grenade",
  "Rihanna We Found Love","Rihanna Diamonds","Rihanna Don't Stop The Music",
  "Beyonce Single Ladies","Beyonce Halo","Beyonce Formation",
  "Justin Bieber Love Yourself","Justin Bieber Peaches","Justin Bieber Baby",
  "Drake One Dance","Drake Hotline Bling","Drake Started From The Bottom",
  "The Weeknd Starboy","The Weeknd Save Your Tears","The Weeknd Can't Feel My Face",
  "Dua Lipa Don't Start Now","Dua Lipa New Rules","Dua Lipa Physical",
  "Ariana Grande Thank U Next","Ariana Grande Into You","Ariana Grande Positions",
  "Lady Gaga Poker Face","Lady Gaga Born This Way","Lady Gaga Shallow",
  "Katy Perry Firework","Katy Perry California Gurls","Katy Perry Dark Horse",
  "Billie Eilish Lovely","Billie Eilish Happier Than Ever","Billie Eilish Ocean Eyes",
  "Harry Styles Watermelon Sugar","Harry Styles Sign of the Times","Harry Styles Adore You",
  "Post Malone Rockstar","Post Malone Circles","Post Malone Congratulations",
  "Miley Cyrus Wrecking Ball","Miley Cyrus Party In The USA","Miley Cyrus Midnight Sky",
  "Coldplay Yellow","Coldplay The Scientist","Coldplay Fix You",
  "Maroon 5 Payphone","Maroon 5 Moves Like Jagger","Maroon 5 Girls Like You",
  "Imagine Dragons Radioactive","Imagine Dragons Thunder","Imagine Dragons Demons",
  "Sam Smith Unholy","Sam Smith I'm Not The Only One","Sam Smith Too Good at Goodbyes",
  "Sia Cheap Thrills","Sia Elastic Heart","Sia Titanium",
  "Doja Cat Kiss Me More","Doja Cat Woman","Doja Cat Paint The Town Red",
  "SZA Good Days","SZA Snooze","Olivia Rodrigo drivers license",
  "Olivia Rodrigo vampire","Lil Nas X Old Town Road","Travis Scott goosebumps",
  "The Chainsmokers Don't Let Me Down","Calvin Harris Feel So Close",
  "OneRepublic Apologize","Pharrell Williams Get Lucky Daft Punk",
  "Cardi B WAP","Cardi B I Like It","Megan Thee Stallion Savage",
  "Daft Punk Around The World","Daft Punk One More Time",
  "Michael Jackson Thriller","Michael Jackson Billie Jean","Michael Jackson Beat It",
  "Whitney Houston I Will Always Love You","Queen Bohemian Rhapsody",
  "Eminem Lose Yourself","Eminem The Real Slim Shady","Eminem Without Me",
  "Kendrick Lamar HUMBLE","Kendrick Lamar DNA","Kanye West Stronger",
];

const DISNEY: string[] = [
  "Hakuna Matata Le Roi Lion","Liberee Delivree Reine des Neiges",
  "Ce reve bleu Aladdin","Ne parlons pas de Bruno Encanto",
  "L'histoire de la vie Le Roi Lion","Comme un homme Mulan",
  "Le bleu du ciel Vaiana","Je voudrais deja etre roi Le Roi Lion",
  "Sous l'ocean La Petite Sirene","Partir la-bas La Petite Sirene",
  "Il en faut peu pour etre heureux Le Livre de la Jungle",
  "L'air du vent Pocahontas","Ratatouille Le Festin Camille",
  "Supercalifragilisticexpialidocious Mary Poppins",
  "Un jour mon prince viendra Blanche Neige",
  "Colors of the Wind Pocahontas","A Whole New World Aladdin",
  "Let It Go Frozen","You've Got a Friend in Me Toy Story",
  "Remember Me Coco","Into the Unknown Frozen 2",
  "How Far I'll Go Moana","Surface Pressure Encanto",
  "Can You Feel the Love Tonight Lion King",
  "Beauty and the Beast","Be Our Guest Beauty and the Beast",
  "Friend Like Me Aladdin","I Just Can't Wait to Be King Lion King",
  "When You Wish Upon a Star Pinocchio","Bibbidi Bobbidi Boo Cendrillon",
  "Reflection Mulan","Try Everything Zootopia Shakira",
  "We Don't Talk About Bruno Encanto","What Else Can I Do Encanto",
  "The Family Madrigal Encanto","Dos Oruguitas Encanto",
  "Do You Want to Build a Snowman Frozen","For The First Time In Forever Frozen",
  "Love Is An Open Door Frozen","Fixer Upper Frozen",
  "Show Yourself Frozen 2","Some Things Never Change Frozen 2",
  "You're Welcome Moana","Shiny Moana","Where You Are Moana",
  "I See The Light Tangled","When Will My Life Begin Tangled",
  "Mother Knows Best Tangled","I've Got a Dream Tangled",
  "Almost There Princess and the Frog","Friends on the Other Side Princess and the Frog",
  "Dig a Little Deeper Princess and the Frog",
  "Bear Necessities Jungle Book","I Wanna Be Like You Jungle Book",
  "Prince Ali Aladdin","One Jump Ahead Aladdin",
  "Kiss the Girl Little Mermaid","Poor Unfortunate Souls Little Mermaid",
  "Circle of Life Lion King","Be Prepared Lion King",
  "God Help the Outcasts Hunchback of Notre Dame",
  "Hellfire Hunchback of Notre Dame","Out There Hunchback of Notre Dame",
  "Go the Distance Hercules","Zero to Hero Hercules",
  "I Won't Say I'm In Love Hercules",
  "Strangers Like Me Tarzan","You'll Be In My Heart Tarzan",
  "Two Worlds Tarzan Phil Collins",
  "Just Around the Riverbend Pocahontas","Savages Pocahontas",
  "Yo Ho Yo Ho A Pirate's Life Pirates of the Caribbean",
  "He's a Pirate Pirates of the Caribbean",
  "This Is Halloween Nightmare Before Christmas",
  "What's This Nightmare Before Christmas",
  "Oogie Boogie's Song Nightmare Before Christmas",
  "Once Upon a Dream Sleeping Beauty","A Dream Is A Wish Your Heart Makes Cinderella",
  "Someday My Prince Will Come Snow White",
  "Everybody Wants to Be a Cat Aristocats",
  "The Siamese Cat Song Lady and the Tramp",
  "Bella Notte Lady and the Tramp",
  "Cruella De Vil 101 Dalmatians",
  "True Love's Kiss Enchanted","Happy Working Song Enchanted",
  "That's How You Know Enchanted",
  "Speechless Aladdin 2019","A Whole New World Aladdin 2019",
  "Spirit Beyonce Lion King 2019","Never Too Late Lion King 2019",
  "Gaston Beauty and the Beast","Something There Beauty and the Beast",
  "Tale As Old As Time Beauty and the Beast",
  "Lost in the Woods Frozen 2","All Is Found Frozen 2",
  "Trashin the Camp Tarzan","Son of Man Tarzan",
  "Lava Disney Pixar","Remember Me Lullaby Coco",
  "Un Poco Loco Coco","The World Es Mi Familia Coco",
  "Married Life Up Pixar","You've Got a Friend in Me Toy Story 2",
  "When She Loved Me Toy Story 2","We Belong Together Toy Story 3",
  "I Ain't Got No Home Toy Story 4",
  "Touch the Sky Brave","Into the Open Air Brave",
  "Let It Go Demi Lovato Frozen","Monster Inc Theme",
  "Hawaiian Roller Coaster Ride Lilo and Stitch",
  "He Mele No Lilo Lilo and Stitch",
  "Waiting on a Miracle Encanto","Colombia Mi Encanto",
];

export const CATEGORY_SEARCH_QUERIES: Record<BlindTestCategory, string[]> = {
  "Hits & Rap Français": RAP_FR,
  "Musique Espagnole & Latino": LATINO,
  "Pop International": POP_INT,
  "Films & Dessins Animés": DISNEY,
  "Tous": [...RAP_FR, ...LATINO, ...POP_INT, ...DISNEY],
};

// ══════════════════════════════════════════════════════════════════════════
// LEURRES (faux choix) — Générés automatiquement depuis la base
// ══════════════════════════════════════════════════════════════════════════

interface WrongChoice { trackName: string; artistName: string }

/** Extrait Artiste + Titre depuis la string de requête "Artiste Titre" */
function parseQueryToChoice(query: string, category: BlindTestCategory): WrongChoice {
  // Cas spéciaux Films & Dessins Animés
  if (category === "Films & Dessins Animés") {
    const filmMappings: [RegExp, string, string][] = [
      [/hakuna matata/i, "Hakuna Matata", "Le Roi Lion"],
      [/liberee delivree/i, "Libérée, Délivrée", "La Reine des Neiges"],
      [/ce reve bleu/i, "Ce rêve bleu", "Aladdin"],
      [/ne parlons pas de bruno/i, "Ne parlons pas de Bruno", "Encanto"],
      [/we don't talk about bruno/i, "We Don't Talk About Bruno", "Encanto"],
      [/l'histoire de la vie/i, "L'histoire de la vie", "Le Roi Lion"],
      [/comme un homme/i, "Comme un homme", "Mulan"],
      [/le bleu du ciel/i, "Le bleu du ciel", "Vaiana"],
      [/je voudrais deja/i, "Je voudrais déjà être roi", "Le Roi Lion"],
      [/sous l'ocean/i, "Sous l'océan", "La Petite Sirène"],
      [/partir la-bas/i, "Partir là-bas", "La Petite Sirène"],
      [/il en faut peu/i, "Il en faut peu pour être heureux", "Le Livre de la Jungle"],
      [/l'air du vent/i, "L'air du vent", "Pocahontas"],
      [/le festin/i, "Le Festin", "Ratatouille"],
      [/let it go/i, "Let It Go", "La Reine des Neiges"],
      [/into the unknown/i, "Into the Unknown", "La Reine des Neiges 2"],
      [/how far i'll go/i, "How Far I'll Go", "Vaiana"],
      [/surface pressure/i, "Surface Pressure", "Encanto"],
      [/you've got a friend/i, "You've Got a Friend in Me", "Toy Story"],
      [/remember me/i, "Remember Me", "Coco"],
      [/a whole new world/i, "A Whole New World", "Aladdin"],
      [/beauty and the beast/i, "Beauty and the Beast", "La Belle et la Bête"],
      [/be our guest/i, "Be Our Guest", "La Belle et la Bête"],
      [/friend like me/i, "Friend Like Me", "Aladdin"],
      [/i just can't wait/i, "I Just Can't Wait to Be King", "Le Roi Lion"],
      [/when you wish/i, "When You Wish Upon a Star", "Pinocchio"],
      [/bibbidi/i, "Bibbidi-Bobbidi-Boo", "Cendrillon"],
      [/reflection/i, "Reflection", "Mulan"],
      [/try everything/i, "Try Everything", "Zootopia"],
      [/do you want to build/i, "Do You Want to Build a Snowman?", "La Reine des Neiges"],
      [/for the first time/i, "For The First Time In Forever", "La Reine des Neiges"],
      [/you're welcome/i, "You're Welcome", "Vaiana"],
      [/shiny moana/i, "Shiny", "Vaiana"],
      [/i see the light/i, "I See The Light", "Raiponce"],
      [/when will my life/i, "When Will My Life Begin", "Raiponce"],
      [/almost there/i, "Almost There", "La Princesse et la Grenouille"],
      [/friends on the other/i, "Friends on the Other Side", "La Princesse et la Grenouille"],
      [/prince ali/i, "Prince Ali", "Aladdin"],
      [/kiss the girl/i, "Kiss the Girl", "La Petite Sirène"],
      [/poor unfortunate/i, "Poor Unfortunate Souls", "La Petite Sirène"],
      [/circle of life/i, "Circle of Life", "Le Roi Lion"],
      [/be prepared/i, "Be Prepared", "Le Roi Lion"],
      [/can you feel the love/i, "Can You Feel the Love Tonight", "Le Roi Lion"],
      [/go the distance/i, "Go the Distance", "Hercule"],
      [/zero to hero/i, "Zero to Hero", "Hercule"],
      [/i won't say/i, "I Won't Say I'm In Love", "Hercule"],
      [/strangers like me/i, "Strangers Like Me", "Tarzan"],
      [/you'll be in my heart/i, "You'll Be In My Heart", "Tarzan"],
      [/this is halloween/i, "This Is Halloween", "L'Étrange Noël de Mr Jack"],
      [/once upon a dream/i, "Once Upon a Dream", "La Belle au Bois Dormant"],
      [/everybody wants to be a cat/i, "Everybody Wants to Be a Cat", "Les Aristochats"],
      [/cruella de vil/i, "Cruella De Vil", "Les 101 Dalmatiens"],
      [/gaston/i, "Gaston", "La Belle et la Bête"],
      [/tale as old/i, "Tale As Old As Time", "La Belle et la Bête"],
      [/speechless/i, "Speechless", "Aladdin"],
      [/lava disney/i, "Lava", "Pixar"],
      [/un poco loco/i, "Un Poco Loco", "Coco"],
      [/married life/i, "Married Life", "Là-Haut"],
      [/touch the sky/i, "Touch the Sky", "Rebelle"],
      [/he's a pirate/i, "He's a Pirate", "Pirates des Caraïbes"],
      [/hellfire/i, "Hellfire", "Le Bossu de Notre-Dame"],
      [/out there hunchback/i, "Out There", "Le Bossu de Notre-Dame"],
      [/waiting on a miracle/i, "Waiting on a Miracle", "Encanto"],
      [/show yourself/i, "Show Yourself", "La Reine des Neiges 2"],
      [/lost in the woods/i, "Lost in the Woods", "La Reine des Neiges 2"],
      [/when she loved me/i, "When She Loved Me", "Toy Story 2"],
      [/we belong together/i, "We Belong Together", "Toy Story 3"],
      [/hawaiian roller/i, "Hawaiian Roller Coaster Ride", "Lilo & Stitch"],
      [/he mele no lilo/i, "He Mele No Lilo", "Lilo & Stitch"],
      [/supercali/i, "Supercalifragilisticexpialidocious", "Mary Poppins"],
      [/un jour mon prince/i, "Un jour mon prince viendra", "Blanche-Neige"],
      [/colors of the wind/i, "Colors of the Wind", "Pocahontas"],
      [/bear necessities/i, "The Bare Necessities", "Le Livre de la Jungle"],
      [/i wanna be like you/i, "I Wanna Be Like You", "Le Livre de la Jungle"],
      [/dos oruguitas/i, "Dos Oruguitas", "Encanto"],
      [/what else can i do/i, "What Else Can I Do?", "Encanto"],
      [/colombia mi encanto/i, "Colombia, Mi Encanto", "Encanto"],
      [/where you are moana/i, "Where You Are", "Vaiana"],
      [/mother knows best/i, "Mother Knows Best", "Raiponce"],
      [/god help the outcasts/i, "God Help the Outcasts", "Le Bossu de Notre-Dame"],
    ];
    for (const [regex, title, artist] of filmMappings) {
      if (regex.test(query)) return { trackName: title, artistName: artist };
    }
    // Fallback basique
    const parts = query.split(" ");
    return { trackName: parts.slice(0, Math.ceil(parts.length / 2)).join(" "), artistName: parts.slice(Math.ceil(parts.length / 2)).join(" ") || "Disney" };
  }

  // Pour les autres catégories : "Artiste Titre" → séparer au premier espace significatif
  // On utilise un mapping connu des artistes pour séparer proprement
  const knownArtists: string[] = [
    // Rap FR
    "Tiakola","Niska","Ninho","SDM","Gazo","Jul","Aya Nakamura","Keblack",
    "Damso","PLK","Nekfeu","Booba","PNL","Rim'K","Lacrim","SCH","Orelsan",
    "Soprano","Maitre Gims","Gims","Lomepal","Vald","Laylow","Freeze Corleone",
    "Hamza","Dinos","Josman","Zola","Werenoi","Guy2Bezbar","Koba LaD",
    "Gambi","Heuss l'Enfoire","Naps","Kaaris","Gradur","Maes","Naza",
    "Soolking","Dadju","Alonzo","Vegedream","MHD","Fally Ipupa","Tayc",
    "Djadja Dinaz","Hornet La Frappe","RK","Lefa","Dosseh","Rohff","IAM",
    "MC Solaar","Oxmo Puccino","La Fouine","Youssoupha","Médine","Lino",
    "Kery James","Kalash","Kalash Criminel","Sofiane","13 Block","DTF",
    "Leto","Mister V","Lorenzo","Moha La Squale","Imen Es","Wejdene",
    "Eva","Hatik","Soso Maness","Larry","Timal","Fresh La Peuf","Moha MMZ",
    // Latino
    "Bad Bunny","Luis Fonsi","Daddy Yankee","J Balvin","Enrique Iglesias",
    "Shakira","Karol G","Farruko","Ozuna","Maluma","Rosalia","Rauw Alejandro",
    "Nicky Jam","Becky G","Sech","Sebastian Yatra","Anuel AA","Don Omar",
    "Wisin","Aventura","Carlos Vives","Marc Anthony","Camilo","Pedro Capo",
    "Natti Natasha","Romeo Santos","Prince Royce","Pitbull","Ricky Martin",
    "Celia Cruz","Gloria Estefan","Jennifer Lopez","Jhay Cortez","Feid",
    "Cnco","Reik","Mana",
    // Pop
    "The Weeknd","Dua Lipa","Drake","Rihanna","Bruno Mars","Ed Sheeran",
    "Beyonce","Justin Bieber","Adele","Taylor Swift","Post Malone",
    "Billie Eilish","Harry Styles","Ariana Grande","Maroon 5",
    "Imagine Dragons","Sam Smith","Sia","Lady Gaga","Katy Perry","Coldplay",
    "OneRepublic","Miley Cyrus","Doja Cat","Lizzo","Olivia Rodrigo","SZA",
    "Travis Scott","Lil Nas X","The Chainsmokers","Calvin Harris",
    "Pharrell Williams","Cardi B","Megan Thee Stallion","Daft Punk",
    "Michael Jackson","Whitney Houston","Queen","Eminem","Kendrick Lamar",
    "Kanye West",
  ];

  // Trier par longueur décroissante pour matcher les noms composés en premier
  const sortedArtists = [...knownArtists].sort((a, b) => b.length - a.length);
  for (const artist of sortedArtists) {
    if (query.toLowerCase().startsWith(artist.toLowerCase() + " ")) {
      const title = query.substring(artist.length + 1).trim();
      return { trackName: title, artistName: artist };
    }
  }

  // Fallback : premier mot = artiste, reste = titre
  const spaceIdx = query.indexOf(" ");
  if (spaceIdx > 0) {
    return { trackName: query.substring(spaceIdx + 1), artistName: query.substring(0, spaceIdx) };
  }
  return { trackName: query, artistName: "Artiste" };
}

// Générer les leurres automatiquement depuis les requêtes
function buildWrongPool(queries: string[], category: BlindTestCategory): WrongChoice[] {
  const seen = new Set<string>();
  const pool: WrongChoice[] = [];
  for (const q of queries) {
    const choice = parseQueryToChoice(q, category);
    const key = choice.trackName.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      pool.push(choice);
    }
  }
  return pool;
}

export const CATEGORY_WRONG_TITLES: Record<BlindTestCategory, WrongChoice[]> = {
  "Hits & Rap Français": buildWrongPool(RAP_FR, "Hits & Rap Français"),
  "Musique Espagnole & Latino": buildWrongPool(LATINO, "Musique Espagnole & Latino"),
  "Pop International": buildWrongPool(POP_INT, "Pop International"),
  "Films & Dessins Animés": buildWrongPool(DISNEY, "Films & Dessins Animés"),
  "Tous": [
    ...buildWrongPool(RAP_FR, "Hits & Rap Français"),
    ...buildWrongPool(LATINO, "Musique Espagnole & Latino"),
    ...buildWrongPool(POP_INT, "Pop International"),
    ...buildWrongPool(DISNEY, "Films & Dessins Animés"),
  ],
};

// ══════════════════════════════════════════════════════════════════════════
// BASE DE SECOURS STATIQUE (extraits M4A certifiés fonctionnels)
// ══════════════════════════════════════════════════════════════════════════

export const FALLBACK_TRACKS_BY_CATEGORY: Record<BlindTestCategory, TrackItem[]> = {
  "Tous": [
    { id: "f_disney1", artistName: "Le Roi Lion", trackName: "Hakuna Matata", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/45/7f/cb457fa6-274c-874c-609c-256818be0dee/mzaf_6042916080041616002.plus.aac.p.m4a", category: "Films & Dessins Animés" }
  ],
  "Films & Dessins Animés": [
    { id: "f_disney1", artistName: "Le Roi Lion", trackName: "Hakuna Matata", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/45/7f/cb457fa6-274c-874c-609c-256818be0dee/mzaf_6042916080041616002.plus.aac.p.m4a", category: "Films & Dessins Animés" },
    { id: "f_disney2", artistName: "La Reine des Neiges", trackName: "Libérée, Délivrée", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/89/5d/c8/895dc868-cab0-6007-82df-8868f6e3fa60/mzaf_17801391047194953213.plus.aac.p.m4a", category: "Films & Dessins Animés" }
  ],
  "Hits & Rap Français": [
    { id: "f_rap1", artistName: "Tiakola", trackName: "Meuda", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/06/ab/7b/06ab7bee-a243-d196-4e76-06c91b01b6e4/mzaf_4586533787945775726.plus.aac.p.m4a", category: "Hits & Rap Français" },
    { id: "f_rap2", artistName: "Niska", trackName: "Réseaux", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1c/ef/38/1cef383f-1f36-eeba-e73e-e8b49327bb02/mzaf_3753683410543449189.plus.aac.p.m4a", category: "Hits & Rap Français" }
  ],
  "Musique Espagnole & Latino": [
    { id: "f_latino1", artistName: "Luis Fonsi", trackName: "Despacito", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/5b/e7/405be722-3ec9-ba27-7469-002182d57b39/mzaf_14120258742032474456.plus.aac.p.m4a", category: "Musique Espagnole & Latino" }
  ],
  "Pop International": [
    { id: "f_pop1", artistName: "The Weeknd", trackName: "Blinding Lights", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/b4/8f/17b48f9a-0b93-6bb8-fe1d-3a16623c2cfb/mzaf_9560252727299052414.plus.aac.p.m4a", category: "Pop International" }
  ]
};

// ══════════════════════════════════════════════════════════════════════════
// ANTI-RÉPÉTITION
// ══════════════════════════════════════════════════════════════════════════

const usedTrackIdsHistory = new Set<string>();
const usedQueriesHistory = new Set<string>();

/** Réinitialise l'historique (appelé au début d'une nouvelle partie) */
export function resetBlindTestHistory(): void {
  usedTrackIdsHistory.clear();
  usedQueriesHistory.clear();
}

/** Normalise un titre pour comparaison fiable */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\s*\[.*?\]/g, "")
    .replace(/\s*feat\.?\s.*/i, "")
    .replace(/\s*ft\.?\s.*/i, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Nettoie le nom de l'artiste */
function cleanArtistName(rawArtist: string, category: BlindTestCategory): string {
  if (!rawArtist) return "Artiste";
  if (category === "Films & Dessins Animés") {
    const lower = rawArtist.toLowerCase();
    if (lower.includes("roi lion") || lower.includes("lion king")) return "Le Roi Lion";
    if (lower.includes("reine des neiges") || lower.includes("frozen")) return "La Reine des Neiges";
    if (lower.includes("aladdin")) return "Aladdin";
    if (lower.includes("encanto")) return "Encanto";
    if (lower.includes("mulan")) return "Mulan";
    if (lower.includes("vaiana") || lower.includes("moana")) return "Vaiana";
    if (lower.includes("disney")) return "Disney";
    if (lower.includes("coco")) return "Coco";
    if (lower.includes("toy story")) return "Toy Story";
    if (lower.includes("petite sir") || lower.includes("little mermaid")) return "La Petite Sirène";
    if (lower.includes("pocahontas")) return "Pocahontas";
    if (lower.includes("ratatouille")) return "Ratatouille";
    if (lower.includes("zootop") || lower.includes("zootopia")) return "Zootopia";
    if (lower.includes("cendrillon") || lower.includes("cinderella")) return "Cendrillon";
    if (lower.includes("blanche") || lower.includes("snow white")) return "Blanche-Neige";
    if (lower.includes("beauty") || lower.includes("belle et")) return "La Belle et la Bête";
    if (lower.includes("livre de la jungle") || lower.includes("jungle book")) return "Le Livre de la Jungle";
    if (lower.includes("pinocchio")) return "Pinocchio";
    if (lower.includes("mary poppins")) return "Mary Poppins";
    if (lower.includes("tangled") || lower.includes("raiponce")) return "Raiponce";
    if (lower.includes("tarzan")) return "Tarzan";
    if (lower.includes("hercul")) return "Hercule";
    if (lower.includes("hunchback") || lower.includes("bossu")) return "Le Bossu de Notre-Dame";
    if (lower.includes("princess") || lower.includes("grenouille")) return "La Princesse et la Grenouille";
    if (lower.includes("nightmare") || lower.includes("étrange")) return "L'Étrange Noël de Mr Jack";
    if (lower.includes("aristoc")) return "Les Aristochats";
    if (lower.includes("dalmat")) return "Les 101 Dalmatiens";
    if (lower.includes("pirate")) return "Pirates des Caraïbes";
    if (lower.includes("lilo") || lower.includes("stitch")) return "Lilo & Stitch";
    if (lower.includes("brave") || lower.includes("rebelle")) return "Rebelle";
    if (lower.includes("up") || lower.includes("là-haut")) return "Là-Haut";
    if (lower.includes("pixar")) return "Pixar";
    if (lower.includes("enchant")) return "Il était une fois";
    if (lower.includes("sleeping") || lower.includes("dormant")) return "La Belle au Bois Dormant";
  }
  const parts = rawArtist.split(",");
  if (parts.length > 2) return parts[0].trim();
  return rawArtist.trim();
}

/** Mélange Fisher-Yates */
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Interroge l'API iTunes */
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
    console.warn("iTunes API search failed", err);
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
  if (unusedQueries.length === 0) {
    queryList.forEach(q => usedQueriesHistory.delete(q));
    unusedQueries = [...queryList];
  }

  const shuffledQueries = shuffle(unusedQueries);
  let track: TrackItem | null = null;

  // Essayer chaque requête non utilisée (max 5 tentatives pour la vitesse)
  const maxAttempts = Math.min(shuffledQueries.length, 5);
  for (let i = 0; i < maxAttempts; i++) {
    const query = shuffledQueries[i];
    track = await fetchTrackFromiTunes(query, category);
    if (track && !usedTrackIdsHistory.has(track.id)) {
      usedQueriesHistory.add(query);
      break;
    }
    usedQueriesHistory.add(query);
    track = null;
  }

  // Fallback si aucune requête n'a donné de track unique
  if (!track) {
    const unusedFallbacks = categoryFallbacks.filter(t => !usedTrackIdsHistory.has(t.id));
    if (unusedFallbacks.length > 0) {
      track = unusedFallbacks[Math.floor(Math.random() * unusedFallbacks.length)];
    } else {
      usedTrackIdsHistory.clear();
      track = categoryFallbacks[0];
    }
  }

  usedTrackIdsHistory.add(track.id);

  // ── GÉNÉRATION DES 4 CHOIX ──
  const correctChoice = { trackName: track.trackName, artistName: track.artistName };
  const normalizedCorrect = normalizeTitle(track.trackName);
  const availableWrong = wrongPool.filter(w => normalizeTitle(w.trackName) !== normalizedCorrect);
  const shuffledWrong = shuffle(availableWrong);

  const choicesList: WrongChoice[] = [correctChoice];
  for (const wrongItem of shuffledWrong) {
    if (choicesList.length >= 4) break;
    const nw = normalizeTitle(wrongItem.trackName);
    if (!choicesList.some(c => normalizeTitle(c.trackName) === nw)) {
      choicesList.push(wrongItem);
    }
  }
  while (choicesList.length < 4) {
    choicesList.push({ trackName: `Titre ${choicesList.length + 1}`, artistName: track.artistName });
  }

  const shuffledChoices = shuffle(choicesList);
  let correctChoiceIndex = shuffledChoices.findIndex(
    c => c.trackName === correctChoice.trackName && c.artistName === correctChoice.artistName
  );
  if (correctChoiceIndex === -1) {
    shuffledChoices[0] = correctChoice;
    correctChoiceIndex = 0;
  }

  return { track, choices: shuffledChoices, correctChoiceIndex };
}
