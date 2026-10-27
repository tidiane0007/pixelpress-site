export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "checklist"; items: string[] };

export interface Article {
  /** Sert d'identifiant dans l'URL : /conseils/<slug>.
      Toujours sans accent ni espace : un slug accentué répond 500 envoyé brut et
      400/404 une fois échappé par le navigateur, donc introuvable dans les deux cas. */
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** Durée de lecture affichée, arrondie à la minute. */
  minutes: number;
  updated: string;
  blocks: ArticleBlock[];
  /** Prestations auxquelles cet article renvoie, pour le maillage interne. */
  related: string[];
}

/** Le coin conseils ne vend pas : il évite les erreurs de fichier, les mauvais
    supports et les délais impossibles. Un client qui arrive avec un PDF prêt
    gagne du temps, et l'atelier aussi. */
export const articles: Article[] = [
  {
    slug: "preparer-un-fichier-qui-sort-net",
    title: "Préparer un fichier qui sort net dès le premier passage",
    excerpt:
      "Fonds perdus, 300 dpi, polices vectorisées et profil CMJN : les quatre réglages qui décident si votre impression sera propre ou rejetée.",
    category: "Fichier & BAT",
    minutes: 4,
    updated: "2026-10-20",
    blocks: [
      {
        type: "p",
        text: "La moitié des retards que nous voyons viennent du fichier, pas de la machine. Un visuel prêt à imprimer se prépare en cinq minutes et évite deux allers-retours d'une journée.",
      },
      { type: "h2", text: "Les fonds perdus d'abord" },
      {
        type: "p",
        text: "Le massicot ne tombe jamais exactement sur le trait de coupe. On ajoute 3 mm de débord de chaque côté : un fond qui s'arrête au format fini laissera un liseré blanc aléatoire d'un exemplaire à l'autre.",
      },
      { type: "h2", text: "Résolution et couleur" },
      {
        type: "list",
        items: [
          "Images à 300 dpi à la taille réelle d'impression, jamais agrandies depuis 72 dpi.",
          "Texte noir fin en noir 100 % (K seul) : en quadri, un filet de 6 pt devient illisible au repérage.",
          "RVB accepté à l'envoi, mais attendez-vous à un vert et un bleu moins saturés une fois convertis en CMJN.",
          "Polices vectorisées ou incluses dans le PDF : une police manquante est remplacée sans prévenir.",
        ],
      },
      { type: "h2", text: "Le bon à tirer reste la sécurité" },
      {
        type: "checklist",
        items: [
          "Orthographe et numéros de téléphone relus par quelqu'un d'autre",
          "Format final et orientation confirmés",
          "Quantité et délai notés dans la demande",
          "Coordonnées de la personne qui valide, joignable le jour du tirage",
        ],
      },
      {
        type: "p",
        text: "Une fois le BAT validé, le tirage part tel quel. C'est le dernier moment où corriger est gratuit.",
      },
    ],
    related: ["flyers-depliants", "cartes-de-visite"],
  },
  {
    slug: "choisir-le-bon-papier",
    title: "Quel grammage pour quel support ?",
    excerpt:
      "115 g pour un flyer distribué dans la rue, 350 g pour une carte qui reste en poche : le grammage se choisit selon la durée de vie voulue, pas selon le budget seul.",
    category: "Supports",
    minutes: 3,
    updated: "2026-10-18",
    blocks: [
      {
        type: "p",
        text: "Le grammage, c'est le poids au mètre carré. Il décide de la tenue en main, et donc de ce que le destinataire comprend de votre marque.",
      },
      {
        type: "list",
        items: [
          "115 à 135 g couché : flyers, dépliants et programmes distribués en grand nombre. Léger, économique, pliable en deux ou en trois.",
          "170 à 200 g : affiches d'intérieur, menus, cartes de fidélité. Commence à se tenir debout seul.",
          "250 à 300 g : cartes de visite, couvertures de carnet, cartons d'invitation. Le standard professionnel.",
          "350 g et plus, ou papier de création texturé : cartes de visite haut de gamme, packaging léger, étiquettes rigides.",
        ],
      },
      { type: "h2", text: "Pelliculage : utile ou décoratif ?" },
      {
        type: "p",
        text: "Le mat adoucit les couleurs et masque les traces de doigts ; le brillant ravive les aplats et protège un peu l'eau. Sur un flyer qui vit deux heures dans un sac, le pelliculage est une dépense inutile. Sur une carte de visite qui passe de poche en poche, il évite l'usure aux coins.",
      },
      { type: "h2", text: "Le cas du noir profond" },
      {
        type: "p",
        text: "Un fond noir sur papier 300 g non pelliculé marque les traces. Nous poussons alors le noir à 60 % de cyan et 200 % d'encre totale, et préférons un soft touch — à vérifier sur un BAT papier avant de lancer 2 000 exemplaires.",
      },
    ],
    related: ["cartes-de-visite", "carnets-personnalises", "autocollants"],
  },
  {
    slug: "serigraphie-ou-dtf",
    title: "Sérigraphie ou DTF : où est le point d'équilibre ?",
    excerpt:
      "La sérigraphie devient intéressante à partir de 30 à 50 pièces identiques ; en dessous, le DTF garde les dégradés et évite le typon.",
    category: "Textile",
    minutes: 4,
    updated: "2026-10-22",
    blocks: [
      {
        type: "p",
        text: "Ces deux techniques ne s'opposent pas : elles se partagent les quantités et les visuels.",
      },
      { type: "h2", text: "Sérigraphie" },
      {
        type: "list",
        items: [
          "Une écran (typon) par couleur : le coût est fixe, donc le prix unitaire baisse vite avec la quantité.",
          "Encres à l'eau ou plastisol, très couvertes sur coton foncé.",
          "Idéale pour un logo en 1 à 4 couleurs, des séries de 30 à 5 000 pièces, et un marquage qui tient les lavages.",
        ],
      },
      { type: "h2", text: "DTF (transfert numérique)" },
      {
        type: "list",
        items: [
          "Aucun typon : impression directe d'un visuel quadri, dégradés et photos compris.",
          "Rentable dès le premier exemplaire, donc parfait pour les prototypes, les tailles uniques et les commandes fragmentées.",
          "Souple sur coton, polyester et mélanges ; moins apprécié sur les très grandes surfaces car la pellicule reste perceptible au toucher.",
        ],
      },
      { type: "h2", text: "Et la broderie ?" },
      {
        type: "p",
        text: "Elle ne remplace pas les deux : elle change la valeur perçue. Sur une casquette, une polaire ou une chemise d'équipe, un logo brodé tient plus longtemps que l'encre et se voit de loin. Limite pratique : les fichiers très fins et les dégradés ne se traduisent pas en fil.",
      },
      {
        type: "p",
        text: "En cas de doute, envoyez le visuel et la quantité : nous disons laquelle des trois revient le moins cher à rendu équivalent.",
      },
    ],
    related: ["tshirts-personnalises", "casquettes-brodees", "tote-bags"],
  },
  {
    slug: "comprendre-un-devis-impression",
    title: "Ce qui change vraiment le prix d'une impression",
    excerpt:
      "Quantité, support, nombre de faces, finitions, délai et pose : les six leviers d'un devis, et sur lesquels négocier en priorité.",
    category: "Budget",
    minutes: 4,
    updated: "2026-10-24",
    blocks: [
      {
        type: "p",
        text: "Nos fiches affichent un tarif de départ. Le devis ferme dépend de six paramètres, dans cet ordre d'impact.",
      },
      {
        type: "list",
        items: [
          "La quantité : le premier bond se fait au-delà du seuil de calage machine, pas au centime près.",
          "Le support : un papier de création coûte plus cher à l'unité qu'un couché standard, à rendu pourtant proche.",
          "Les faces et la couleur : recto seul, recto-verso quadri, ou noir seul — trois budgets différents.",
          "Les finitions : pelliculage, vernis sélectif, dorure, angles arrondis, découpe à la forme.",
          "Le délai : une production en 48 h se fait en dehors de la planification, donc se facture.",
          "La pose : œillets, ourlets, livraison et installation en façade ou en salon.",
        ],
      },
      { type: "h2", text: "Où négocier en premier" },
      {
        type: "p",
        text: "Réduire le nombre de finitions fait baisser le prix sans abîmer le rendu. Changer de papier en fait baisser davantage, mais se voit. Diviser la commande en deux quantités égales coûte souvent plus cher qu'une seule commande double : le calage machine est payé deux fois.",
      },
      { type: "h2", text: "Ce que nous ne facturons pas" },
      {
        type: "checklist",
        items: [
          "Le contrôle du fichier et les corrections simples de marge",
          "Le BAT numérique avant lancement",
          "Les conseils sur le choix du support",
        ],
      },
      {
        type: "p",
        text: "Un devis chez nous est écrit, chiffré par ligne, et valable sur la durée annoncée. Comparez les lignes, pas seulement le total.",
      },
    ],
    related: ["flyers-depliants", "roll-up", "baches-affiches"],
  },
  {
    slug: "delais-realistes-a-dakar",
    title: "Délais réalistes à Dakar, et ce qui les fait déraper",
    excerpt:
      "Du fichier au retrait : la chronologie réelle d'une commande, les jours d'attente incompressibles et les trois causes de retard les plus fréquentes.",
    category: "Organisation",
    minutes: 3,
    updated: "2026-10-16",
    blocks: [
      {
        type: "p",
        text: "Un délai d'impression n'est pas du temps de machine : c'est une chaîne. Voici comment elle se déroule réellement.",
      },
      {
        type: "list",
        items: [
          "Jour 1 — réception du fichier, contrôle, devis ferme.",
          "Jour 1 à 2 — BAT numérique ou papier envoyé, puis validation client.",
          "Jour 2 à 3 — lancement du tirage, séchage et pelliculage.",
          "Jour 3 à 5 — finitions, pliage, massicot, contrôle qualité.",
          "Jour 5 à 7 — retrait à l'atelier ou livraison et pose.",
        ],
      },
      { type: "h2", text: "La partie qui ne dépend pas de nous" },
      {
        type: "p",
        text: "Le temps de validation du BAT. Une commande bloquée deux jours pour un numéro de téléphone à corriger perd deux jours de production. Donnez-nous un interlocuteur unique, joignable, et la chaîne tient.",
      },
      { type: "h2", text: "Ce que nous savons accélérer" },
      {
        type: "checklist",
        items: [
          "Flyers et cartes de visite numériques en 48 h, BAT validé avant midi",
          "Roll-up prêt en 24 h si la bâche est déjà imprimée",
          "Sous-total de textile en DTF sans typon, dès 5 pièces",
        ],
      },
      {
        type: "p",
        text: "Un événement à date fixe se sécurise en réservant le créneau à la commande, pas à la réception du fichier. Parlez-nous de la date : nous remontons la chaîne.",
      },
    ],
    related: ["flyers-depliants", "roll-up", "cartes-de-visite"],
  },
  {
    slug: "signaletique-exterieure-tenir-dans-le-temps",
    title: "Signalétique extérieure : tenir au soleil, à la poussière et à la pluie",
    excerpt:
      "Entre l'harmattan, la saison des pluies et un soleil qui décolle les encres, un panneau d'extérieur ne se choisit pas comme une affiche d'intérieur.",
    category: "Grand format",
    minutes: 3,
    updated: "2026-10-14",
    blocks: [
      {
        type: "p",
        text: "À Dakar, une bâche en façade perd ses couleurs en quelques mois si rien ne la protège. Trois postes décident de sa durée de vie.",
      },
      { type: "h2", text: "1. La lamination" },
      {
        type: "p",
        text: "Un film anti-UV appliqué après impression retarde nettement la décoloration. Sur une façade exposée plein sud, c'est la ligne du devis à ne pas couper en premier.",
      },
      { type: "h2", text: "2. Le support et sa tenue au vent" },
      {
        type: "list",
        items: [
          "Bâche 440 g avec ourlets et œillets tous les 50 cm : façade, chantier, tribune.",
          "Panneau composite 3 ou 4 mm sur entretoises : enseigne durable, plane, ne se déchire pas.",
          "Roll-up : uniquement d'intérieur ou à l'abri, la structure ne tient pas le vent.",
        ],
      },
      { type: "h2", text: "3. La pose" },
      {
        type: "p",
        text: "Une bâche mal tendue se déchire aux œillets au premier coup de vent. Nous fournissons la quantité d'attaches, et posons à Dakar et Thiès quand la hauteur le demande.",
      },
      {
        type: "p",
        text: "Envoyez-nous une photo de l'emplacement et ses dimensions : nous disons quel support tient, et combien de temps.",
      },
    ],
    related: ["baches-affiches", "panneaux-dibond", "roll-up"],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
