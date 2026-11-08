export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  title: string;
  /** Slug de catégorie : la galerie filtre sur le même plan que le catalogue. */
  category: string;
  /** Contraint technique : c'est ce que la vignette a le droit d'affirmer. */
  spec: string;
  /** Prestation à laquelle cette technique se rattache, pour le lien interne. */
  product: string;
  wide?: boolean;
}

/** Vitrine des techniques, pas un copier-coller du catalogue : chaque visuel est
    utilisé une seule fois et le titre décrit ce que l'atelier sait faire, pas ce
    que le client achète. Les visuels de démonstration sont remplacés au fur et à
    mesure par les photos de chantiers réels déposées dans public/images. */
export const galleryItems: GalleryItem[] = [
  {
    id: "serigraphie-textile",
    image: "/images/tshirt.jpg",
    alt: "T-shirt blanc plié, marqué d’un visuel géométrique vert et orange",
    title: "Sérigraphie textile",
    category: "textile",
    spec: "Jusqu’à 6 passages couleur, encres à l’eau sur coton 120 à 180 g.",
    product: "tshirts-personnalises",
    wide: true,
  },
  {
    id: "dtf-petit-nombre",
    image: "/images/tote-bag.jpg",
    alt: "Tote bag en toile naturelle marqué d’un motif vert et orange",
    title: "Transfert DTF pleine couleur",
    category: "textile",
    spec: "Dégradés et visuels photo dès le premier exemplaire, sans typon.",
    product: "tote-bags",
  },
  {
    id: "broderie",
    image: "/images/casquette.jpg",
    alt: "Casquette blanche brodée d’un motif géométrique vert et orange",
    title: "Broderie de logo",
    category: "textile",
    spec: "Fil polyester 1 000 points maxi, sur casquette, polaire et chemise.",
    product: "casquettes-brodees",
  },
  {
    id: "quadri-volailles",
    image: "/images/flyers-depliants.jpg",
    alt: "Une pile de flyers et un dépliant plié debout, à visuels géométriques vert et orange",
    title: "Quadri numérique haute densité",
    category: "papier",
    spec: "De 100 à 5 000 exemplaires, pliage et massicot dans l’atelier.",
    product: "flyers-depliants",
  },
  {
    id: "cartes-finitions",
    image: "/images/cartes-de-visite.jpg",
    alt: "Pile de cartes de visite et une carte à motif vert et orange",
    title: "Finitions de cartes",
    category: "papier",
    spec: "Soft touch, vernis sélectif, dorure à froid et angles arrondis.",
    product: "cartes-de-visite",
  },
  {
    id: "decoupe-adhésifs",
    image: "/images/stickers.jpg",
    alt: "Planche d’autocollants découpés à motif géométrique vert et orange, l’un d’eux décollé",
    title: "Découpe à la forme",
    category: "papier",
    spec: "Vinyle blanc, transparent ou repositionnable, contour sur-mesure.",
    product: "autocollants",
  },
  {
    id: "reliure-carnets",
    image: "/images/carnet.jpg",
    alt: "Carnet à couverture crème, dos en toile verte et petit motif embossé",
    title: "Reliure et dos carré",
    category: "papier",
    spec: "Couverture 300 g pelliculée, 48 à 128 pages, dos collé ou cousu.",
    product: "carnets-personnalises",
  },
  {
    id: "sublimation-mug",
    image: "/images/mug.jpg",
    alt: "Mug blanc à intérieur orange, imprimé de formes géométriques vert et orange",
    title: "Sublimation sur céramique",
    category: "objets",
    spec: "Encre intégrée à l’émail : aucun relief, lavable au quotidien.",
    product: "mugs-personnalises",
  },
  {
    id: "marquage-gourde",
    image: "/images/gourde.jpg",
    alt: "Gourde blanche à bouchon vert et thermos orange posés côte à côte",
    title: "Marquage d’objets techniques",
    category: "objets",
    spec: "Tampographie et laser sur surfaces courbes et anodisées.",
    product: "gourdes-personnalisees",
  },
  {
    id: "gravure-verre",
    image: "/images/trophee-verre.jpg",
    alt: "Trophée en verre transparent à motif géométrique vert et orange sur socle aluminium",
    title: "Gravure sur verre et cristal",
    category: "objets",
    spec: "Découpe à la forme, bords polis, socle cristal ou noir laqué.",
    product: "trophees-verre-graves",
  },
  {
    id: "sublimation-metal",
    image: "/images/porte-cles.jpg",
    alt: "Trois porte-clés en plexiglass découpés à motifs vert et orange, anneaux en métal",
    title: "Sublimation sur métal",
    category: "objets",
    spec: "Nom, téléphone et logo tenus sur la même petite face.",
    product: "porte-cles-personnalises",
  },
  {
    id: "impression-coque",
    image: "/images/coque-telephone.jpg",
    alt: "Coque de téléphone blanche imprimée de formes géométriques vert et orange",
    title: "Impression sur coque",
    category: "objets",
    spec: "Pleine surface sans relief, découpes contrôlées modèle par modèle.",
    product: "coques-telephone",
  },
  {
    id: "marquage-eventail",
    image: "/images/eventail.jpg",
    alt: "Éventail ouvert à motifs géométriques vert et orange, posé près d’un éventail fermé",
    title: "Marquage d’éventails",
    category: "objets",
    spec: "Grand carton ou plastique, deux faces imprimables, tiges bois.",
    product: "eventails-personnalises",
    wide: true,
  },
  {
    id: "roll-up-stand",
    image: "/images/roll-up.jpg",
    alt: "Roll-up déroulé, bâche à visuel géométrique vert et orange",
    title: "Roll-up et signalétique",
    category: "grand-format",
    spec: "Bâche 210 g, structure aluminium, sacoche de transport incluse.",
    product: "roll-up",
    wide: true,
  },
  {
    id: "bache-vitree",
    image: "/images/baches-affiches.jpg",
    alt: "Bâche PVC roulée avec œillets métalliques et affiche grand format appuyée au mur",
    title: "Grand format et œillets",
    category: "grand-format",
    spec: "Laize jusqu’à 3,20 m, ourlets, œillets tous les 50 cm.",
    product: "baches-affiches",
  },
  {
    id: "dibond-facade",
    image: "/images/panneau-dibond.jpg",
    alt: "Panneau composite blanc imprimé de formes géométriques vert et orange, appuyé au mur",
    title: "Panneaux rigides en façade",
    category: "grand-format",
    spec: "Composite 3 et 4 mm, lamination anti-UV, pose à Dakar et Thiès.",
    product: "panneaux-dibond",
  },
];
