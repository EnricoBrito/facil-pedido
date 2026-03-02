import productArmchair from "@/assets/product-armchair.jpg";
import productTable from "@/assets/product-table.jpg";
import productBookshelf from "@/assets/product-bookshelf.jpg";
import productTvStand from "@/assets/product-tv-stand.jpg";
import productBed from "@/assets/product-bed.jpg";
import productDesk from "@/assets/product-desk.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  inStock: boolean;
  rating: number;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  warranty: string;
  colors: { name: string; hex: string }[];
  installments?: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Poltrona Oslo Premium",
    price: 2890,
    originalPrice: 3490,
    discount: 17,
    image: productArmchair,
    inStock: true,
    rating: 4.8,
    description: "Poltrona de design escandinavo com estrutura em madeira maciça de carvalho e estofamento em couro legítimo. Conforto e elegância para sua sala de estar.",
    material: "Madeira maciça de carvalho, couro legítimo",
    dimensions: "75cm x 80cm x 85cm",
    weight: "18kg",
    warranty: "5 anos",
    colors: [
      { name: "Caramelo", hex: "#C4883A" },
      { name: "Marrom Escuro", hex: "#4A3728" },
      { name: "Cinza", hex: "#8B8B8B" },
    ],
  },
  {
    id: "2",
    name: "Mesa de Jantar Nórdica",
    price: 4250,
    image: productTable,
    inStock: true,
    rating: 4.9,
    description: "Mesa de jantar para 6 lugares em madeira maciça de nogueira com acabamento natural. Design contemporâneo com linhas limpas.",
    material: "Madeira maciça de nogueira",
    dimensions: "180cm x 90cm x 76cm",
    weight: "45kg",
    warranty: "8 anos",
    colors: [
      { name: "Natural", hex: "#C4943A" },
      { name: "Escuro", hex: "#5C3D2E" },
    ],
  },
  {
    id: "3",
    name: "Estante Modular Ipê",
    price: 3150,
    originalPrice: 3700,
    discount: 15,
    image: productBookshelf,
    inStock: true,
    rating: 4.7,
    description: "Estante modular em MDF com acabamento em laminado nogueira. Configuração flexível para diferentes espaços.",
    material: "MDF com laminado nogueira",
    dimensions: "120cm x 35cm x 180cm",
    weight: "38kg",
    warranty: "3 anos",
    colors: [
      { name: "Nogueira", hex: "#6B4226" },
      { name: "Freijó", hex: "#A07850" },
    ],
  },
  {
    id: "4",
    name: "Rack TV Essencial",
    price: 1890,
    image: productTvStand,
    inStock: true,
    rating: 4.6,
    description: "Rack para TV até 65 polegadas com design minimalista. Portas de correr e nicho central para equipamentos.",
    material: "MDF com acabamento em carvalho",
    dimensions: "180cm x 45cm x 55cm",
    weight: "32kg",
    warranty: "3 anos",
    colors: [
      { name: "Carvalho", hex: "#C4A265" },
      { name: "Off-White", hex: "#F5F0E8" },
    ],
  },
  {
    id: "5",
    name: "Cama Queen Montana",
    price: 5490,
    originalPrice: 6200,
    discount: 11,
    image: productBed,
    inStock: false,
    rating: 4.9,
    description: "Cama queen size com cabeceira estofada e estrutura em madeira de reflorestamento. Elegância e durabilidade.",
    material: "Madeira de reflorestamento, linho",
    dimensions: "160cm x 200cm x 110cm",
    weight: "55kg",
    warranty: "10 anos",
    colors: [
      { name: "Nogueira", hex: "#6B4226" },
      { name: "Mel", hex: "#C4943A" },
    ],
  },
  {
    id: "6",
    name: "Escrivaninha Studio",
    price: 2190,
    image: productDesk,
    inStock: true,
    rating: 4.5,
    description: "Escrivaninha moderna com gavetas ocultas e passagem para cabos. Perfeita para home office.",
    material: "MDF com acabamento em carvalho natural",
    dimensions: "140cm x 65cm x 75cm",
    weight: "28kg",
    warranty: "3 anos",
    colors: [
      { name: "Carvalho Natural", hex: "#C4A265" },
      { name: "Preto", hex: "#2C2C2C" },
    ],
  },
];

export const getWeeklyProduct = (): Product => {
  // Simulated "smart" selection - in production this would be API-driven
  return products[0];
};
