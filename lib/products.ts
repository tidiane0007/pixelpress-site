export interface ProductOption {
  label: string;
  values: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  /** Sert d'identifiant dans l'URL : /prestations/<id>. */
  id: string;
  name: string;
  /** Une ligne d'accroche pour les vignettes. */
  short: string;
  description: string;
  /** Tarif indicatif en FCFA, confirmé au devis. */
  price: number;
  priceUnit: string;
  image: string;
  imageAlt: string;
  category: string;
  options: ProductOption[];
  specs: ProductSpec[];
  delay: string;
  featured?: boolean;
  inStock: boolean;
}

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "papier",
    name: "Impression papier",
    tagline: "Le net et le coloré",
    description:
      "Flyers, cartes, autocollants et carnets imprimés en numérique, du petit tirage urgent au gros volume négocié.",
    image: "/images/flyers-depliants.jpg",
  },
  {
    slug: "textile",
    name: "Textile & mode",
    tagline: "Marquer ce qui se porte",
    description:
      "Sérigraphie, DTF et broderie sur coton, toile de coton et polyester, du prototype à la série d'équipe.",
    image: "/images/tshirt.jpg",
  },
  {
    slug: "objets",
    name: "Objets personnalisés",
    tagline: "Le cadeau qui reste",
    description:
      "Sublimation et gravure sur mug, gourde, trophée de verre, porte-clés et coque : vos couleurs au quotidien.",
    image: "/images/mug.jpg",
  },
  {
    slug: "grand-format",
    name: "Grand format",
    tagline: "Visible de loin",
    description:
      "Bâches, roll-up et panneaux rigides imprimés, œilletés et découpés à la forme dans nos ateliers.",
    image: "/images/baches-affiches.jpg",
  },
];

export const products: Product[] = [
  {
    id: "tshirts-personnalises",
    name: "T-shirts personnalisés",
    short: "Marquage textile pour équipes, événements et marques.",
    description:
      "Impression textile durable sur coton peigné, en sérigraphie pour les grandes séries et en DTF pour les visuels multicolores en petit nombre. Nous contrôlons le placement, la tenue au lavage et la régularité d'une pièce à l'autre.",
    price: 4500,
    priceUnit: "l'unité, à partir de 10 pièces",
    image: "/images/tshirt.jpg",
    imageAlt: "T-shirt blanc plié avec un visuel géométrique vert et orange",
    category: "textile",
    options: [
      { label: "Technique", values: ["Sérigraphie", "DTF", "Broderie"] },
      { label: "Support", values: ["Coton 120 g", "Coton 180 g", "Polyester sport"] },
      { label: "Tailles", values: ["Enfant", "XS → XXL", "Grandes tailles"] },
    ],
    specs: [
      { label: "Couleurs", value: "Jusqu'à 6 passages en sérigraphie" },
      { label: "Tenue", value: "50 lavages à 40 °C sans craquelure" },
      { label: "Minimum", value: "10 pièces, 1 pièce en DTF" },
    ],
    delay: "3 à 6 jours après validation du bon à tirer",
    featured: true,
    inStock: true,
  },
  {
    id: "flyers-depliants",
    name: "Flyers et dépliants",
    short: "Supports promotionnels nets et colorés.",
    description:
      "Le format qui fait campagne : quadri recto-verso sur papier couché, pliage en deux, trois ou roulé, et massicotage dans nos ateliers. Un BAT papier vous est remis avant le lancement du tirage.",
    price: 25000,
    priceUnit: "les 500 exemplaires A5",
    image: "/images/flyers-depliants.jpg",
    imageAlt: "Une pile de flyers et un dépliant plié debout, à visuels géométriques vert et orange",
    category: "papier",
    options: [
      { label: "Format", values: ["A6", "A5", "A4", "Carré 21 × 21"] },
      { label: "Papier", values: ["Couché 115 g", "Couché 135 g", "Création 300 g"] },
      { label: "Pliage", values: ["Sans pli", "En deux", "En trois", "Roulé"] },
    ],
    specs: [
      { label: "Impression", value: "Numérique quadri recto-verso" },
      { label: "Finition", value: "Pelliculage mat ou brillant en option" },
      { label: "Volume", value: "De 100 à 50 000 exemplaires" },
    ],
    delay: "48 h en numérique, 4 jours au-delà de 5 000 exemplaires",
    featured: true,
    inStock: true,
  },
  {
    id: "cartes-de-visite",
    name: "Cartes de visite",
    short: "Finitions soignées pour marquer les esprits.",
    description:
      "9 × 5 cm sur papier de création 350 g, avec pelliculage, angles arrondis et vernis sélectif. Nous vérifions les fonds perdus, le noir profond et la lisibilité des coordonnées avant d'imprimer.",
    price: 15000,
    priceUnit: "les 500 exemplaires",
    image: "/images/cartes-de-visite.jpg",
    imageAlt: "Pile de cartes de visite et une carte à motif vert et orange",
    category: "papier",
    options: [
      { label: "Papier", values: ["350 g classique", "Création texturé", "Noir profond"] },
      { label: "Finition", values: ["Mat", "Brillant", "Soft touch", "Vernis sélectif"] },
      { label: "Forme", values: ["Angles droits", "Angles arrondis", "Découpe forme"] },
    ],
    specs: [
      { label: "Format", value: "90 × 50 mm, recto ou recto-verso" },
      { label: "Unités", value: "Par 100, 250, 500 ou 1 000" },
      { label: "Contrôle", value: "Relecture des coordonnées incluse" },
    ],
    delay: "24 à 72 h",
    featured: true,
    inStock: true,
  },
  {
    id: "autocollants",
    name: "Autocollants découpés",
    short: "Vinyle découpé à la forme, collé pour durer.",
    description:
      "Étiquettes et stickers en vinyle adhésif, découpés à la forme sur notre table de découpe. Pose intérieure ou extérieure, sur vitrine, packaging, engin ou mur lisse.",
    price: 8000,
    priceUnit: "la planche de 20 pièces",
    image: "/images/stickers.jpg",
    imageAlt: "Planche d’autocollants découpés à motif géométrique vert et orange, l’un d’eux décollé",
    category: "papier",
    options: [
      { label: "Usage", values: ["Intérieur", "Extérieur 3 ans", "Vitrine translucide"] },
      { label: "Découpe", values: ["À la forme", "Ronde", "Carrée", "Rectangle"] },
      { label: "Pose", values: ["Livré à plat", "Sur film de transfert"] },
    ],
    specs: [
      { label: "Taille max", value: "Une pièce jusqu'à 30 × 30 cm" },
      { label: "Finition", value: "Lamination anti-UV et anti-rayures" },
      { label: "Lot", value: "Dès 10 pièces identiques" },
    ],
    delay: "2 à 4 jours",
    inStock: true,
  },
  {
    id: "carnets-personnalises",
    name: "Carnets et blocs",
    short: "L'objet publicitaire qu'on garde sur son bureau.",
    description:
      "Carnets A5 ou A6 à couverture imprimée en vos couleurs, dos carré collé ou piqûre, pages blanches ou seyées. Un support de marque qui reste en place toute l'année.",
    price: 2500,
    priceUnit: "l'unité, à partir de 50 carnets",
    image: "/images/carnet.jpg",
    imageAlt: "Carnet à couverture crème, dos en toile verte et petit motif embossé",
    category: "papier",
    options: [
      { label: "Format", values: ["A6 de poche", "A5", "A4"] },
      { label: "Pages", values: ["Blanches", "Seyées", "Quadrillées"] },
      { label: "Couverture", values: ["Souple 300 g", "Cartonnée", "Toile"] },
    ],
    specs: [
      { label: "Intérieur", value: "40, 80 ou 120 pages 90 g" },
      { label: "Dos", value: "Piqûre ou carré collé" },
      { label: "Option", value: "Marque-page et coin arrondi" },
    ],
    delay: "5 à 8 jours",
    inStock: true,
  },
  {
    id: "mugs-personnalises",
    name: "Mugs personnalisés",
    short: "Sublimation pleine surface, du logo au visuel photo.",
    description:
      "Impression par sublimation sur céramique : l'encre entre dans l'émail, le visuel couvre la surface entière et ne se décolore pas au lave-vaisselle. Idéal pour les cadeaux d'affaires et les lancements.",
    price: 3500,
    priceUnit: "l'unité, à partir de 12 mugs",
    image: "/images/mug.jpg",
    imageAlt: "Mug blanc à intérieur orange, imprimé de formes géométriques vert et orange",
    category: "objets",
    options: [
      { label: "Contenance", values: ["11 cl espresso", "33 cl standard", "50 cl latto"] },
      { label: "Couleur", values: ["Blanc", "Intérieur coloré", "Magique noir"] },
      { label: "Marquage", values: ["Une face", "Tour complet"] },
    ],
    specs: [
      { label: "Technique", value: "Sublimation haute température" },
      { label: "Entretien", value: "Lave-vaisselle et micro-ondes" },
      { label: "Minimum", value: "12 pièces, 1 pièce en échantillon" },
    ],
    delay: "2 à 4 jours",
    featured: true,
    inStock: true,
  },
  {
    id: "gourdes-personnalisees",
    name: "Gourdes et thermos",
    short: "L'accessoire durable qui accompagne vos couleurs.",
    description:
      "Gourdes inox brossé et thermos personnalisés par impression ou gravure laser. Un cadeau d'équipe qui sert tous les jours et qui reste visible longtemps.",
    price: 4000,
    priceUnit: "l'unité, à partir de 20 gourdes",
    image: "/images/gourde.jpg",
    imageAlt: "Gourde blanche à bouchon vert et thermos orange posés côte à côte",
    category: "objets",
    options: [
      { label: "Modèle", values: ["Simple paroi", "Double paroi isotherme", "Thermos"] },
      { label: "Contenance", values: ["50 cl", "75 cl", "1 litre"] },
      { label: "Marquage", values: ["Impression", "Gravure laser"] },
    ],
    specs: [
      { label: "Matériau", value: "Inox 304 sans BPA" },
      { label: "Isotherme", value: "12 h au froid, 6 h au chaud" },
      { label: "Minimum", value: "20 pièces" },
    ],
    delay: "5 à 8 jours",
    inStock: true,
  },
  {
    id: "trophees-verre-graves",
    name: "Trophées et plaques de verre",
    short: "Verre et cristal gravés, montés sur socle.",
    description:
      "Plaques de verre ou d'acrylique découpées à la forme — hexagone, écu, octogone, losange — aux bords polis, personnalisées par gravure laser ou impression couleur, puis montées sur socle cristal ou noir. Nous contrôlons l'épaisseur, l'équerrage et la lisibilité du texte gravé avant de lancer la série.",
    price: 18000,
    priceUnit: "la pièce, à partir de 10 trophées",
    image: "/images/trophee-verre.jpg",
    imageAlt: "Trophée en verre transparent à motif géométrique vert et orange sur socle aluminium",
    category: "objets",
    options: [
      { label: "Forme", values: ["Hexagone", "Écu", "Octogone", "Losange", "Forme libre"] },
      { label: "Épaisseur", values: ["Verre 10 mm", "Verre 15 mm", "Acrylique 8 mm"] },
      { label: "Marquage", values: ["Gravure laser", "Impression couleur", "Décalque doré"] },
      { label: "Socle", values: ["Cristal", "Noir laqué", "Sans socle"] },
    ],
    specs: [
      { label: "Hauteur", value: "Jusqu'à 25 cm, socle inclus" },
      { label: "Série", value: "Dès 5 pièces identiques, prix dégressif" },
      { label: "Finition", value: "Bords polis, angles ébavurés" },
    ],
    delay: "4 à 7 jours après validation du bon à tirer",
    featured: true,
    inStock: true,
  },
  {
    id: "porte-cles-personnalises",
    name: "Porte-clés personnalisés",
    short: "Métal ou acrylique, gravés ou imprimés, sous étui.",
    description:
      "Porte-clés en métal (rond, cœur, rectangle, médiator) ou en acrylique, marqués par sublimation, gravure laser ou impression directe. Chacun peut porter un nom, un numéro de téléphone ou un logo, et se livre dans son étui cadeau pour les remises de prix et les opérations commerciales.",
    price: 1200,
    priceUnit: "l'unité, à partir de 50 pièces",
    image: "/images/porte-cles.jpg",
    imageAlt: "Trois porte-clés en plexiglass découpés à motifs vert et orange, anneaux en métal",
    category: "objets",
    options: [
      { label: "Forme", values: ["Rond", "Cœur", "Rectangle", "Médiateur", "Forme libre"] },
      { label: "Matière", values: ["Métal sublimable", "Acrylique", "Bois", "Inox gravé"] },
      { label: "Marquage", values: ["Une face", "Deux faces", "Gravure laser"] },
      { label: "Livraison", values: ["En vrac", "Étui cadeau"] },
    ],
    specs: [
      { label: "Taille", value: "32 à 55 mm selon la forme" },
      { label: "Personnalisation", value: "Nom, téléphone et logo sur la même face" },
      { label: "Minimum", value: "50 pièces identiques" },
    ],
    delay: "3 à 5 jours",
    inStock: true,
  },
  {
    id: "coques-telephone",
    name: "Coques de téléphone",
    short: "Impression pleine surface, découpes contrôlées.",
    description:
      "Coques imprimées par sublimation : le visuel couvre toute la face et le marquage est noyé dans la résine, sans relief. Les découpes d'objectif, de boutons et de chargeur sont vérifiées sur le modèle annoncé avant tirage, pièce par pièce si la série mélange plusieurs téléphones.",
    price: 3500,
    priceUnit: "l'unité, à partir de 12 coques",
    image: "/images/coque-telephone.jpg",
    imageAlt: "Coque de téléphone blanche imprimée de formes géométriques vert et orange",
    category: "objets",
    options: [
      { label: "Type", values: ["Rigide", "Souple", "Verre trempé"] },
      { label: "Modèles", values: ["iPhone 11 → 16", "Samsung Galaxy", "Xiaomi et autres"] },
      { label: "Bord", values: ["Blanc", "Noir", "Translucide"] },
      { label: "Marquage", values: ["Une face", "Tour complet"] },
    ],
    specs: [
      { label: "Découpes", value: "Contrôlées sur le modèle annoncé" },
      { label: "Tenue", value: "Marquage noyé dans la résine, sans relief" },
      { label: "Minimum", value: "12 coques, 1 pièce en échantillon" },
    ],
    delay: "2 à 4 jours",
    inStock: true,
  },
  {
    id: "eventails-personnalises",
    name: "Éventails personnalisés",
    short: "Le support des événements en plein air.",
    description:
      "Éventails à main imprimés sur carton ou plastique, montés sur tiges bois ou plastique, avec une large surface de marquage des deux côtés. Un objet utile sous la chaleur de Dakar, pensé pour les rencontres, les matchs et les lancements en extérieur.",
    price: 900,
    priceUnit: "l'unité, à partir de 100 éventails",
    image: "/images/eventail.jpg",
    imageAlt: "Éventail ouvert à motifs géométriques vert et orange, posé près d’un éventail fermé",
    category: "objets",
    options: [
      { label: "Support", values: ["Carton 300 g", "Plastique", "Bois"] },
      { label: "Taille", values: ["21 × 38 cm", "25 × 43 cm", "Format poche"] },
      { label: "Marquage", values: ["Une face", "Deux faces"] },
      { label: "Manche", values: ["Plastique", "Bois verni"] },
    ],
    specs: [
      { label: "Surface", value: "Jusqu'à 21 × 25 cm de visuel" },
      { label: "Minimum", value: "100 pièces" },
      { label: "Finition", value: "Vernis anti-traces en option" },
    ],
    delay: "5 à 8 jours",
    inStock: true,
  },
  {
    id: "casquettes-brodees",
    name: "Casquettes brodées",
    short: "Broderie filée, tenue impeccable en série.",
    description:
      "Casquettes et bonnets brodés en fil polyester, avec numérisation du motif réalisée en interne. La broderie supporte le soleil et les lavages répétés sans passer.",
    price: 3000,
    priceUnit: "l'unité, à partir de 15 pièces",
    image: "/images/casquette.jpg",
    imageAlt: "Casquette blanche brodée d’un motif géométrique vert et orange",
    category: "textile",
    options: [
      { label: "Modèle", values: ["6 pans", "Panneau unique", "Bonnet"] },
      { label: "Fermeture", values: ["Sangle métal", "Velcro", "Élastique"] },
      { label: "Broderie", values: ["Face avant", "Deux côtés", "Visière"] },
    ],
    specs: [
      { label: "Points", value: "Jusqu'à 10 000 points par logo" },
      { label: "Coloris fil", value: "Nuancier de 40 teintes" },
      { label: "Minimum", value: "15 pièces identiques" },
    ],
    delay: "5 à 8 jours",
    inStock: true,
  },
  {
    id: "tote-bags",
    name: "Tote bags imprimés",
    short: "Toile de coton, le support de marque du quotidien.",
    description:
      "Tote bags en toile de coton naturel imprimés en sérigraphie ou en DTF. Un support léger, lavable et réutilisable, très utilisé pour les salons, les lancements et les boutiques.",
    price: 3500,
    priceUnit: "l'unité, à partir de 25 pièces",
    image: "/images/tote-bag.jpg",
    imageAlt: "Tote bag en toile naturelle à motif géométrique vert et orange",
    category: "textile",
    options: [
      { label: "Toile", values: ["Naturelle 140 g", "Renforcée 280 g"] },
      { label: "Ans", values: ["Courtes", "Longues épaule"] },
      { label: "Marquage", values: ["Une face", "Deux faces"] },
    ],
    specs: [
      { label: "Format", value: "38 × 42 cm standard" },
      { label: "Coloris", value: "Naturel, noir, blanc" },
      { label: "Minimum", value: "25 pièces" },
    ],
    delay: "4 à 7 jours",
    inStock: true,
  },
  {
    id: "roll-up",
    name: "Roll-up publicitaire",
    short: "Structure autoportante qui se monte en deux minutes.",
    description:
      "Bâche imprimée en haute définition montée sur cassette aluminium à enroulement automatique, avec sacoche de transport. Le support de salon qui se déplie sans outil ni adhésif.",
    price: 45000,
    priceUnit: "le kit complet 85 × 200 cm",
    image: "/images/roll-up.jpg",
    imageAlt: "Roll-up déroulé à visuel géométrique vert et orange",
    category: "grand-format",
    options: [
      { label: "Largeur", values: ["85 cm", "100 cm", "Double 200 cm"] },
      { label: "Structure", values: ["Aluminium standard", "Premium", "Rétroéclairé"] },
      { label: "Visuel", values: ["Une face", "Deux faces"] },
    ],
    specs: [
      { label: "Hauteur", value: "200 cm, visuel 210 cm avec le lestage" },
      { label: "Résolution", value: "1 440 dpi sur bâche 210 g" },
      { label: "Inclus", value: "Cassette, pied, sacoche" },
    ],
    delay: "3 à 5 jours",
    featured: true,
    inStock: true,
  },
  {
    id: "baches-affiches",
    name: "Bâches et affiches",
    short: "Grand format résistant, posé chez vous.",
    description:
      "Impression grand format sur bâche PVC ou intissé, avec ourlets, œillets et découpe à la forme. Nous assurons aussi la pose sur façade, échafaudage ou palissade de chantier.",
    price: 30000,
    priceUnit: "les 5 m² posés",
    image: "/images/baches-affiches.jpg",
    imageAlt: "Bâche PVC roulée avec œillets métalliques et affiche grand format appuyée au mur",
    category: "grand-format",
    options: [
      { label: "Support", values: ["Bâche 510 g", "Bâche mesh", "Intissé", "Affiche vinyle"] },
      { label: "Finition", values: ["Ourlets et œillets", "Fourreau", "Cadre"] },
      { label: "Pose", values: ["Retrait atelier", "Pose Dakar", "Pose région"] },
    ],
    specs: [
      { label: "Laize", value: "Jusqu'à 3,20 m sans raccord" },
      { label: "Résistance", value: "3 ans en extérieur" },
      { label: "Devis", value: "Au m², pose incluse dans Dakar" },
    ],
    delay: "2 à 5 jours selon la pose",
    inStock: true,
  },
  {
    id: "panneaux-dibond",
    name: "Panneaux rigides",
    short: "Aluminium composite pour enseigne et signalétique.",
    description:
      "Panneaux dibond imprimés et découpés, montés sur entretoises ou collés en intérieur. Le support des enseignes, consignes de sécurité et signalétique de direction qui doivent durer.",
    price: 55000,
    priceUnit: "le panneau 100 × 70 cm posé",
    image: "/images/panneau-dibond.jpg",
    imageAlt: "Panneau composite blanc imprimé de formes géométriques vert et orange, appuyé au mur",
    category: "grand-format",
    options: [
      { label: "Épaisseur", values: ["3 mm intérieur", "4 mm extérieur"] },
      { label: "Fixation", values: ["Entretoises", "Vis directes", "Adhésif double face"] },
      { label: "Forme", values: ["Rectangle", "Rond", "Découpe à la forme"] },
    ],
    specs: [
      { label: "Surface", value: "Jusqu'à 150 × 305 cm" },
      { label: "Protection", value: "Lamination anti-UV incluse" },
      { label: "Pose", value: "Équipe à Dakar et Thiès" },
    ],
    delay: "4 à 7 jours",
    inStock: true,
  },
];

export const getProduct = (id: string) => products.find((product) => product.id === id);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const categoryName = (slug: string) => getCategory(slug)?.name ?? slug;

export const featuredProducts = products.filter((product) => product.featured);

export const countByCategory = (slug: string) =>
  products.filter((product) => product.category === slug).length;

export const getRelated = (product: Product, limit = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);

/** Un client tape « tshirt », « bache » ou « tee-shirt » : le catalogue écrit
    « T-shirts personnalisés » et « Bâches et affiches ». Plier les accents puis
    retirer tirets, espaces et apostrophes couvre les deux premiers cas ; le
    troisième demande de couper la requête sur les tirets, sinon « teeshirt » ne
    ressemble à rien de connu. */
export const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

export const normalizeWords = (rawQuery: string) =>
  rawQuery
    .split(/[\s-]+/)
    .map(normalizeSearch)
    .filter(Boolean);

/** Termes que les clients emploient et que le catalogue n'écrit nulle part. Une
    seule table ici plutôt qu'un champ éparpillé sur tout le catalogue : elle ne sert
    qu'à élargir la requête, jamais à modifier un intitulé affiché. */
const searchAliases: Record<string, string[]> = {
  maillot: ["tshirt"],
  polo: ["tshirt"],
  tee: ["tshirt"],
  teeshirt: ["tshirt"],
  shirt: ["tshirt"],
  business: ["visite"],
  card: ["carte"],
  tract: ["flyer"],
  banderole: ["bache"],
  tasse: ["mug"],
  chope: ["mug"],
  cabas: ["tote"],
  sac: ["tote"],
  agenda: ["carnet"],
  kakemono: ["rollup"],
  enrouleur: ["rollup"],
  bob: ["casquette"],
  medaille: ["trophee"],
  recompense: ["trophee"],
  tropee: ["trophee"],
  cristal: ["verre"],
  keychain: ["portecles"],
  trousseau: ["portecles"],
  clef: ["portecles"],
  housse: ["coque"],
  etui: ["coque"],
};

/** Le pluriel se range derrière le singulier : « maillots » doit retomber sur
    l'alias de « maillot » sans le rédiger deux fois. */
const singular = (word: string) =>
  word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;

const wordMatches = (text: string, word: string) => {
  const forms = [word, singular(word)];
  return forms.some((form) =>
    [form, ...(searchAliases[form] ?? [])].some((candidate) => text.includes(candidate))
  );
};

// Tout ce qu'un visiteur est censé pouvoir retrouver : l'identifiant de l'URL
// (« dibond », « rollup »), le texte commercial et les valeurs d'options et de
// fiches techniques (« vinyle », « vitrine », « sublimation »).
const searchHaystack = (product: Product) =>
  normalizeSearch(
    [
      product.id,
      product.name,
      product.short,
      product.description,
      categoryName(product.category),
      ...product.options.flatMap((option) => [option.label, ...option.values]),
      ...product.specs.flatMap((spec) => [spec.label, spec.value]),
    ].join(" ")
  );

/** Comparaison mot à mot : « cartes de visite » doit trouver « Cartes de visite »
    même si le visiteur ajoute un mot ou change l'ordre. Une requête vide ne filtre rien. */
export const matchesSearch = (product: Product, rawQuery: string) => {
  const words = normalizeWords(rawQuery);
  if (!words.length) return true;
  const text = searchHaystack(product);
  return words.every((word) => wordMatches(text, word));
};

/** Même logique pour les catégories suggérées : « grand format » doit trouver la
    catégorie dont le nom s'écrit « Grand format ». */
export const categoryMatchesSearch = (category: Category, rawQuery: string) => {
  const words = normalizeWords(rawQuery);
  if (!words.length) return true;
  const text = normalizeSearch(
    [category.slug, category.name, category.tagline, category.description].join(" ")
  );
  return words.every((word) => wordMatches(text, word));
};

export const formatPrice = (amount: number) =>
  `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;

/** Un choix se note « Label : valeur » partout : si l'aperçu rapide et la fiche
    écrivent la même option différemment, le panier crée deux lignes pour une seule
    configuration et le devis devient ambigu. */
export const selectionLabel = (option: ProductOption, value: string) =>
  `${option.label} : ${value}`;

export const defaultSelections = (product: Product) =>
  product.options.map((option) => selectionLabel(option, option.values[0]));
