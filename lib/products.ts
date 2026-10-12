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
    name: "Classic T-Shirt",
    description: "Comfortable 100% cotton t-shirt available in multiple colors",
    price: 25.99,
    image: "/images/tshirt.jpg",
    category: "Clothing",
    inStock: true,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30hr battery life",
    price: 89.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Mug",
    description: "Ceramic coffee mug with inspirational quote",
    price: 12.99,
    image: "/images/mug.jpg",
    category: "Home",
    inStock: true,
  },
  {
    id: "4",
    name: "Running Shoes",
    description: "Lightweight running shoes with responsive cushioning",
    price: 75.99,
    image: "/images/shoes.jpg",
    category: "Footwear",
    inStock: true,
  },
  {
    id: "5",
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor",
    price: 199.99,
    image: "/images/watch.jpg",
    category: "Electronics",
    inStock: false,
  },
  {
    id: "6",
    name: "Backpack",
    description: "Durable backpack with laptop compartment",
    price: 45.99,
    image: "/images/backpack.jpg",
    category: "Accessories",
    inStock: true,
  },
];