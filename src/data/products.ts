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
  stock: number;
  category?: "premium" | "economico" | "corporativo" | "alta-demanda" | "especial" | "padrao";
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
    stock: 24,
    category: "padrao",
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
    stock: 12,
    category: "padrao",
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
    stock: 18,
    category: "padrao",
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
    stock: 30,
    category: "padrao",
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
    stock: 0,
    category: "padrao",
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
    stock: 42,
    category: "padrao",
  },
  {
    id: "7",
    name: "Sofá Premium Milão",
    price: 1999.9,
    originalPrice: 2499.9,
    discount: 20,
    image: productArmchair,
    inStock: true,
    rating: 4.9,
    description: "Sofá premium com revestimento em couro italiano e estrutura reforçada. Máximo conforto para ambientes sofisticados.",
    material: "Couro italiano, madeira de lei",
    dimensions: "220cm x 95cm x 85cm",
    weight: "65kg",
    warranty: "8 anos",
    colors: [
      { name: "Cognac", hex: "#9A4B2E" },
      { name: "Preto", hex: "#1A1A1A" },
    ],
    stock: 8,
    category: "premium",
  },
  {
    id: "8",
    name: "Cadeira Escritório Eco",
    price: 559.9,
    image: productDesk,
    inStock: true,
    rating: 4.3,
    description: "Cadeira ergonômica com materiais reciclados. Encosto em mesh respirável e ajuste de altura.",
    material: "Plástico reciclado, mesh, aço",
    dimensions: "60cm x 60cm x 110cm",
    weight: "12kg",
    warranty: "2 anos",
    colors: [
      { name: "Cinza", hex: "#7A7A7A" },
      { name: "Azul Escuro", hex: "#2C3E50" },
    ],
    stock: 85,
    category: "economico",
  },
  {
    id: "9",
    name: "Mesa Reunião Executiva",
    price: 999.9,
    image: productTable,
    inStock: true,
    rating: 4.7,
    description: "Mesa de reunião para 8 lugares com acabamento em laca fosca. Passagem integrada para cabos e conectividade.",
    material: "MDF reforçado, laca fosca",
    dimensions: "240cm x 120cm x 76cm",
    weight: "72kg",
    warranty: "5 anos",
    colors: [
      { name: "Branco", hex: "#F0F0F0" },
      { name: "Grafite", hex: "#3D3D3D" },
    ],
    stock: 15,
    category: "corporativo",
  },
  {
    id: "10",
    name: "Estante Industrial Loft",
    price: 799.9,
    image: productBookshelf,
    inStock: true,
    rating: 4.8,
    description: "Estante estilo industrial com estrutura em aço e prateleiras em madeira de demolição. Design urbano e resistente.",
    material: "Aço carbono, madeira de demolição",
    dimensions: "100cm x 40cm x 200cm",
    weight: "35kg",
    warranty: "3 anos",
    colors: [
      { name: "Natural/Preto", hex: "#4A3728" },
      { name: "Natural/Cobre", hex: "#B87333" },
    ],
    stock: 52,
    category: "alta-demanda",
  },
  {
    id: "11",
    name: "Aparador Artesanal Ouro",
    price: 1119.9,
    originalPrice: 1399.9,
    discount: 20,
    image: productTvStand,
    inStock: true,
    rating: 4.6,
    description: "Aparador artesanal com detalhes em folha de ouro e pés torneados. Peça exclusiva de decoração.",
    material: "Madeira maciça, folha de ouro",
    dimensions: "140cm x 40cm x 85cm",
    weight: "25kg",
    warranty: "5 anos",
    colors: [
      { name: "Nogueira/Ouro", hex: "#D4A843" },
      { name: "Ébano/Ouro", hex: "#3B2F2F" },
    ],
    stock: 6,
    category: "especial",
  },
];

export const getWeeklyProduct = (): Product => {
  return products[0];
};
