export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "T-shirts personnalisés",
    description: "Impression textile durable pour vos équipes, événements et marques.",
    price: 4500,
    image: "/images/tshirt.jpg",
    category: "Textile",
    inStock: true,
  },
  {
    id: "2",
    name: "Flyers et dépliants",
    description: "Supports promotionnels nets et colorés, adaptés à vos campagnes.",
    price: 25000,
    image: "/images/headphones.jpg",
    category: "Impression papier",
    inStock: true,
  },
  {
    id: "3",
    name: "Mugs personnalisés",
    description: "Mugs personnalisés pour cadeaux, entreprises et événements.",
    price: 3500,
    image: "/images/mug.jpg",
    category: "Objets personnalisés",
    inStock: true,
  },
  {
    id: "4",
    name: "Cartes de visite",
    description: "Cartes professionnelles avec finitions soignées pour marquer les esprits.",
    price: 15000,
    image: "/images/shoes.jpg",
    category: "Impression papier",
    inStock: true,
  },
  {
    id: "5",
    name: "Roll-up publicitaire",
    description: "Support grand format pour vos salons, boutiques et présentations.",
    price: 45000,
    image: "/images/watch.jpg",
    category: "Grand format",
    inStock: true,
  },
  {
    id: "6",
    name: "Bâches et affiches",
    description: "Impression grand format visible et résistante pour vos communications.",
    price: 30000,
    image: "/images/backpack.jpg",
    category: "Grand format",
    inStock: true,
  },
];
