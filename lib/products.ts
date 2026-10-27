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
      "Sublimation et gravure sur mug, gourde et accessoires de bureau : vos couleurs au quotidien.",
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
    imageAlt: "Presse sérigraphique en train d'imprimer un textile",
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
    imageAlt: "Pile de flyers quadri fraîchement imprimés",
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
    imageAlt: "Deux piles de cartes de visite prêtes à imprimer",
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
    imageAlt: "Planche d'autocollants vinyle découpés à la forme",
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
    imageAlt: "Pile de carnets à la couverture bleue et cyan",
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
    imageAlt: "Mug personnalisé posé sur une table",
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
    imageAlt: "Gourde inox brossé avec un motif cyan et bleu",
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
    id: "casquettes-brodees",
    name: "Casquettes brodées",
    short: "Broderie filée, tenue impeccable en série.",
    description:
      "Casquettes et bonnets brodés en fil polyester, avec numérisation du motif réalisée en interne. La broderie supporte le soleil et les lavages répétés sans passer.",
    price: 3000,
    priceUnit: "l'unité, à partir de 15 pièces",
    image: "/images/casquette.jpg",
    imageAlt: "Casquette bleu marine avec un motif brodé cyan",
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
    imageAlt: "Tote bag en toile de coton avec un imprimé bleu et cyan",
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
    imageAlt: "Roll-up déployé dans un stand d'exposition",
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
    imageAlt: "Traceur grand format en cours d'impression d'une affiche",
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
    imageAlt: "Panneau rigide fixé en façade par des entretoises",
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

export const formatPrice = (amount: number) =>
  `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;

/** Un choix se note « Label : valeur » partout : si l'aperçu rapide et la fiche
    écrivent la même option différemment, le panier crée deux lignes pour une seule
    configuration et le devis devient ambigu. */
export const selectionLabel = (option: ProductOption, value: string) =>
  `${option.label} : ${value}`;

export const defaultSelections = (product: Product) =>
  product.options.map((option) => selectionLabel(option, option.values[0]));
