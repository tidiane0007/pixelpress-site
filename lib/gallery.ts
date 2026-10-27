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
    alt: "Presse à sérigraphie en train d’imprimer un textile",
    title: "Sérigraphie textile",
    category: "textile",
    spec: "Jusqu’à 6 passages couleur, encres à l’eau sur coton 120 à 180 g.",
    product: "tshirts-personnalises",
    wide: true,
  },
  {
    id: "dtf-petit-nombre",
    image: "/images/tote-bag.jpg",
    alt: "Tote bag en toile de coton prêt au marquage",
    title: "Transfert DTF pleine couleur",
    category: "textile",
    spec: "Dégradés et visuels photo dès le premier exemplaire, sans typon.",
    product: "tote-bags",
  },
  {
    id: "broderie",
    image: "/images/casquette.jpg",
    alt: "Casquette en toile posée sur l’atelier de broderie",
    title: "Broderie de logo",
    category: "textile",
    spec: "Fil polyester 1 000 points maxi, sur casquette, polaire et chemise.",
    product: "casquettes-brodees",
  },
  {
    id: "quadri-volailles",
    image: "/images/flyers-depliants.jpg",
    alt: "Pile de flyers quadri sortant de l’imprimante numérique",
    title: "Quadri numérique haute densité",
    category: "papier",
    spec: "De 100 à 5 000 exemplaires, pliage et massicot dans l’atelier.",
    product: "flyers-depliants",
  },
  {
    id: "cartes-finitions",
    image: "/images/cartes-de-visite.jpg",
    alt: "Piles de cartes de visite prêtes au pelliculage",
    title: "Finitions de cartes",
    category: "papier",
    spec: "Soft touch, vernis sélectif, dorure à froid et angles arrondis.",
    product: "cartes-de-visite",
  },
  {
    id: "decoupe-adhésifs",
    image: "/images/stickers.jpg",
    alt: "Planche d’autocollants découpés à la forme",
    title: "Découpe à la forme",
    category: "papier",
    spec: "Vinyle blanc, transparent ou repositionnable, contour sur-mesure.",
    product: "autocollants",
  },
  {
    id: "reliure-carnets",
    image: "/images/carnet.jpg",
    alt: "Carnets publicitaires à couverture imprimée",
    title: "Reliure et dos carré",
    category: "papier",
    spec: "Couverture 300 g pelliculée, 48 à 128 pages, dos collé ou cousu.",
    product: "carnets-personnalises",
  },
  {
    id: "sublimation-mug",
    image: "/images/mug.jpg",
    alt: "Mug blanc en céramique avant sublimation",
    title: "Sublimation sur céramique",
    category: "objets",
    spec: "Encre intégrée à l’émail : aucun relief, lavable au quotidien.",
    product: "mugs-personnalises",
  },
  {
    id: "marquage-gourde",
    image: "/images/gourde.jpg",
    alt: "Gourde de sport en aluminium anodisé",
    title: "Marquage d’objets techniques",
    category: "objets",
    spec: "Tampographie et laser sur surfaces courbes et anodisées.",
    product: "gourdes-personnalisees",
  },
  {
    id: "roll-up-stand",
    image: "/images/roll-up.jpg",
    alt: "Structure de roll-up ouverte dans un espace d’exposition",
    title: "Roll-up et signalétique",
    category: "grand-format",
    spec: "Bâche 210 g, structure aluminium, sacoche de transport incluse.",
    product: "roll-up",
    wide: true,
  },
  {
    id: "bache-vitree",
    image: "/images/baches-affiches.jpg",
    alt: "Traceur grand format déroulant une bâche imprimée",
    title: "Grand format et œillets",
    category: "grand-format",
    spec: "Laize jusqu’à 3,20 m, ourlets, œillets tous les 50 cm.",
    product: "baches-affiches",
  },
  {
    id: "dibond-facade",
    image: "/images/panneau-dibond.jpg",
    alt: "Panneau composite fixé en façade par des entretoises",
    title: "Panneaux rigides en façade",
    category: "grand-format",
    spec: "Composite 3 et 4 mm, lamination anti-UV, pose à Dakar et Thiès.",
    product: "panneaux-dibond",
  },
];
