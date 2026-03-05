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
  category?: string;
}

const images = [productArmchair, productTable, productBookshelf, productTvStand, productBed, productDesk];
const img = (i: number) => images[i % images.length];

export const products: Product[] = [
  // ===== MESAS =====
  {
    id: "1", name: "Mesa de Jantar Nórdica 6 Lugares", price: 4250, image: productTable, inStock: true, rating: 4.9, stock: 12, category: "mesas",
    description: "Mesa de jantar para 6 lugares em madeira maciça de nogueira com acabamento natural. Perfeita para ambientes corporativos e residenciais.",
    material: "Madeira maciça de nogueira", dimensions: "180cm x 90cm x 76cm", weight: "45kg", warranty: "8 anos",
    colors: [{ name: "Natural", hex: "#C4943A" }, { name: "Escuro", hex: "#5C3D2E" }],
  },
  {
    id: "2", name: "Mesa Reunião Executiva 8 Lugares", price: 3499.9, image: productTable, inStock: true, rating: 4.7, stock: 8, category: "mesas",
    description: "Mesa de reunião para 8 lugares com acabamento em laca fosca. Ideal para salas de diretoria.",
    material: "MDF reforçado, laca fosca", dimensions: "240cm x 120cm x 76cm", weight: "72kg", warranty: "5 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Grafite", hex: "#3D3D3D" }],
  },
  {
    id: "3", name: "Mesa Centro Industrial Loft", price: 1199.9, image: img(1), inStock: true, rating: 4.5, stock: 22, category: "mesas",
    description: "Mesa de centro estilo industrial com tampo em madeira de demolição e estrutura em aço carbono.",
    material: "Madeira de demolição, aço carbono", dimensions: "120cm x 60cm x 45cm", weight: "25kg", warranty: "3 anos",
    colors: [{ name: "Natural/Preto", hex: "#4A3728" }, { name: "Natural/Cobre", hex: "#B87333" }],
  },
  {
    id: "4", name: "Mesa Escritório Diretor", price: 2499.9, image: productDesk, inStock: true, rating: 4.8, stock: 15, category: "mesas",
    description: "Mesa para escritório com gavetas ocultas, passagem para cabos e acabamento premium em carvalho.",
    material: "MDF premium com acabamento carvalho", dimensions: "160cm x 75cm x 76cm", weight: "38kg", warranty: "5 anos",
    colors: [{ name: "Carvalho Natural", hex: "#C4A265" }, { name: "Preto Fosco", hex: "#2C2C2C" }],
  },

  // ===== CADEIRAS =====
  {
    id: "5", name: "Poltrona Oslo Premium", price: 2890, originalPrice: 3490, discount: 17,
    image: productArmchair, inStock: true, rating: 4.8, stock: 24, category: "cadeiras",
    description: "Poltrona de design escandinavo com estrutura em madeira maciça de carvalho e estofamento em couro legítimo.",
    material: "Madeira maciça de carvalho, couro legítimo", dimensions: "75cm x 80cm x 85cm", weight: "18kg", warranty: "5 anos",
    colors: [{ name: "Caramelo", hex: "#C4883A" }, { name: "Marrom Escuro", hex: "#4A3728" }, { name: "Cinza", hex: "#8B8B8B" }],
  },
  {
    id: "6", name: "Cadeira Executiva Presidente", price: 1899.9, image: img(0), inStock: true, rating: 4.7, stock: 30, category: "cadeiras",
    description: "Cadeira executiva com encosto alto, apoio lombar regulável e base cromada com rodízios silenciosos.",
    material: "Couro sintético premium, aço cromado", dimensions: "65cm x 65cm x 125cm", weight: "16kg", warranty: "3 anos",
    colors: [{ name: "Preto", hex: "#1A1A1A" }, { name: "Marrom", hex: "#5C3D2E" }],
  },
  {
    id: "7", name: "Cadeira Ergonômica Pro", price: 1499.9, image: img(5), inStock: true, rating: 4.6, stock: 45, category: "cadeiras",
    description: "Cadeira ergonômica com mesh respirável, apoio de cabeça ajustável e mecanismo de recline avançado.",
    material: "Mesh, alumínio, espuma de alta densidade", dimensions: "60cm x 60cm x 120cm", weight: "14kg", warranty: "5 anos",
    colors: [{ name: "Cinza/Preto", hex: "#7A7A7A" }, { name: "Azul/Preto", hex: "#2C3E50" }],
  },

  // ===== CAMAS =====
  {
    id: "8", name: "Cama Queen Montana Premium", price: 5490, originalPrice: 6200, discount: 11,
    image: productBed, inStock: false, rating: 4.9, stock: 0, category: "camas",
    description: "Cama queen size com cabeceira estofada e estrutura em madeira de reflorestamento.",
    material: "Madeira de reflorestamento, linho", dimensions: "160cm x 200cm x 110cm", weight: "55kg", warranty: "10 anos",
    colors: [{ name: "Nogueira", hex: "#6B4226" }, { name: "Mel", hex: "#C4943A" }],
  },
  {
    id: "9", name: "Cama King Florença", price: 7990, image: productBed, inStock: true, rating: 4.9, stock: 5, category: "camas",
    description: "Cama king size com cabeceira capitonê em veludo e estrutura reforçada. Máximo luxo e conforto.",
    material: "Veludo premium, madeira maciça", dimensions: "193cm x 203cm x 130cm", weight: "72kg", warranty: "10 anos",
    colors: [{ name: "Grafite", hex: "#3D3D3D" }, { name: "Bege", hex: "#D2C4A0" }],
  },
  {
    id: "10", name: "Cama Casal Box Confort", price: 3499.9, image: img(4), inStock: true, rating: 4.5, stock: 18, category: "camas",
    description: "Cama casal com base box integrada e cabeceira em courino. Design moderno e funcional.",
    material: "MDF, courino, espuma D45", dimensions: "138cm x 188cm x 100cm", weight: "42kg", warranty: "5 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Cinza", hex: "#8B8B8B" }],
  },

  // ===== ARMÁRIOS =====
  {
    id: "11", name: "Armário Industrial 4 Portas", price: 2899.9, image: productBookshelf, inStock: true, rating: 4.6, stock: 14, category: "armarios",
    description: "Armário estilo industrial com 4 portas, prateleiras ajustáveis e estrutura em aço reforçado.",
    material: "Aço carbono, MDF reforçado", dimensions: "120cm x 50cm x 200cm", weight: "65kg", warranty: "5 anos",
    colors: [{ name: "Preto/Madeira", hex: "#4A3728" }, { name: "Cinza/Madeira", hex: "#7A7A7A" }],
  },
  {
    id: "12", name: "Estante Modular Ipê", price: 3150, originalPrice: 3700, discount: 15,
    image: productBookshelf, inStock: true, rating: 4.7, stock: 18, category: "armarios",
    description: "Estante modular em MDF com acabamento em laminado nogueira. Configurável para diversos ambientes.",
    material: "MDF com laminado nogueira", dimensions: "120cm x 35cm x 180cm", weight: "38kg", warranty: "3 anos",
    colors: [{ name: "Nogueira", hex: "#6B4226" }, { name: "Freijó", hex: "#A07850" }],
  },
  {
    id: "13", name: "Gaveteiro Executivo 4 Gavetas", price: 899.9, image: img(1), inStock: true, rating: 4.4, stock: 35, category: "armarios",
    description: "Gaveteiro executivo com 4 gavetas, trava de segurança e rodízios. Ideal para escritórios corporativos.",
    material: "MDF com acabamento UV, aço", dimensions: "45cm x 55cm x 70cm", weight: "18kg", warranty: "3 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Cinza", hex: "#8B8B8B" }],
  },

  // ===== ESTRUTURAL =====
  {
    id: "14", name: "Bancada Industrial 2m", price: 1899.9, image: img(1), inStock: true, rating: 4.6, stock: 14, category: "estrutural",
    description: "Bancada de trabalho industrial com tampo em madeira maciça de teca e estrutura em aço reforçado.",
    material: "Madeira maciça teca, aço carbono", dimensions: "200cm x 60cm x 90cm", weight: "55kg", warranty: "5 anos",
    colors: [{ name: "Natural/Preto", hex: "#4A3728" }],
  },
  {
    id: "15", name: "Prateleira Industrial Parede 3m", price: 799.9, image: img(2), inStock: true, rating: 4.5, stock: 40, category: "estrutural",
    description: "Sistema de prateleiras industriais para fixação em parede. Suporta até 150kg por prateleira.",
    material: "Aço carbono, madeira de pinus tratada", dimensions: "300cm x 30cm x 150cm", weight: "28kg", warranty: "3 anos",
    colors: [{ name: "Preto/Natural", hex: "#2C2C2C" }],
  },
  {
    id: "16", name: "Rack TV Suspenso 1.80m", price: 1599.9, image: productTvStand, inStock: true, rating: 4.7, stock: 20, category: "estrutural",
    description: "Painel para TV suspenso com nicho central e LED embutido. Suporta até 65 polegadas.",
    material: "MDF com acabamento UV", dimensions: "180cm x 12cm x 120cm", weight: "28kg", warranty: "3 anos",
    colors: [{ name: "Off-White", hex: "#F5F0E8" }, { name: "Nogueira", hex: "#6B4226" }],
  },

  // ===== INDUSTRIAL =====
  {
    id: "17", name: "Estação Trabalho Dupla", price: 3200.9, image: img(5), inStock: true, rating: 4.8, stock: 10, category: "industrial",
    description: "Estação de trabalho dupla com divisórias, passagem para cabos e tampo em melamínico de alta pressão.",
    material: "Aço, MDF melamínico HP", dimensions: "240cm x 120cm x 76cm", weight: "68kg", warranty: "5 anos",
    colors: [{ name: "Branco/Cinza", hex: "#F0F0F0" }, { name: "Cinza/Preto", hex: "#3D3D3D" }],
  },
  {
    id: "18", name: "Arquivo de Aço 4 Gavetas", price: 1199.9, image: img(2), inStock: true, rating: 4.3, stock: 50, category: "industrial",
    description: "Arquivo de aço com 4 gavetas para pasta suspensa, trilhos telescópicos e trava geral.",
    material: "Aço laminado a frio, pintura eletrostática", dimensions: "47cm x 60cm x 133cm", weight: "35kg", warranty: "5 anos",
    colors: [{ name: "Cinza", hex: "#8B8B8B" }, { name: "Preto", hex: "#2C2C2C" }],
  },
  {
    id: "19", name: "Armário Ferramentas Industrial", price: 2499.9, image: img(2), inStock: false, rating: 4.7, stock: 0, category: "industrial",
    description: "Armário para ferramentas com portas de correr, prateleiras reguláveis e fechadura de segurança.",
    material: "Aço reforçado, pintura eletrostática", dimensions: "100cm x 50cm x 200cm", weight: "80kg", warranty: "5 anos",
    colors: [{ name: "Cinza Industrial", hex: "#7A7A7A" }],
  },

  // ===== UTILIDADES =====
  {
    id: "20", name: "Sofá Premium Milão 3 Lugares", price: 4999.9, originalPrice: 5990, discount: 17,
    image: productArmchair, inStock: true, rating: 4.9, stock: 8, category: "utilidades",
    description: "Sofá premium com revestimento em couro italiano legítimo e estrutura reforçada com molas ensacadas.",
    material: "Couro italiano, madeira de lei, molas ensacadas", dimensions: "220cm x 95cm x 85cm", weight: "65kg", warranty: "8 anos",
    colors: [{ name: "Cognac", hex: "#9A4B2E" }, { name: "Preto", hex: "#1A1A1A" }],
  },
  {
    id: "21", name: "Sofá Retrátil Reclinável", price: 3200.9, image: img(0), inStock: true, rating: 4.8, stock: 7, category: "utilidades",
    description: "Sofá retrátil e reclinável em suede com molas ensacadas. Máximo conforto para áreas de descanso.",
    material: "Suede premium, molas ensacadas, madeira", dimensions: "230cm x 100cm x 95cm", weight: "70kg", warranty: "5 anos",
    colors: [{ name: "Cinza", hex: "#8B8B8B" }, { name: "Bege", hex: "#D2C4A0" }],
  },
  {
    id: "22", name: "Aparador Artesanal Ouro", price: 1899.9, originalPrice: 2299.9, discount: 17,
    image: productTvStand, inStock: true, rating: 4.6, stock: 6, category: "utilidades",
    description: "Aparador artesanal com detalhes em folha de ouro e pés torneados. Peça exclusiva.",
    material: "Madeira maciça, folha de ouro", dimensions: "140cm x 40cm x 85cm", weight: "25kg", warranty: "5 anos",
    colors: [{ name: "Nogueira/Ouro", hex: "#D4A843" }, { name: "Ébano/Ouro", hex: "#3B2F2F" }],
  },
  {
    id: "23", name: "Conjunto Sala Jantar 6 Lugares", price: 5490, image: img(1), inStock: true, rating: 4.8, stock: 4, category: "utilidades",
    description: "Conjunto completo: mesa retangular + 6 cadeiras estofadas em linho. Elegância para reuniões.",
    material: "Madeira maciça, linho", dimensions: "160cm x 90cm x 76cm", weight: "85kg", warranty: "5 anos",
    colors: [{ name: "Natural/Bege", hex: "#C4943A" }, { name: "Escuro/Cinza", hex: "#5C3D2E" }],
  },
  {
    id: "24", name: "Rack Industrial TV 2m", price: 1299.9, image: productTvStand, inStock: true, rating: 4.5, stock: 25, category: "utilidades",
    description: "Rack para TV até 75 polegadas com design industrial, portas de correr e nichos organizadores.",
    material: "MDF reforçado, aço carbono", dimensions: "200cm x 45cm x 55cm", weight: "35kg", warranty: "3 anos",
    colors: [{ name: "Carvalho/Preto", hex: "#C4A265" }, { name: "Nogueira/Preto", hex: "#6B4226" }],
  },
  {
    id: "25", name: "Balcão Recepção Corporativo", price: 3499.9, image: img(5), inStock: true, rating: 4.7, stock: 6, category: "industrial",
    description: "Balcão de recepção corporativo com iluminação LED embutida e acabamento premium.",
    material: "MDF lacado, vidro temperado, LED", dimensions: "200cm x 60cm x 110cm", weight: "48kg", warranty: "3 anos",
    colors: [{ name: "Branco/Grafite", hex: "#F0F0F0" }, { name: "Preto/Dourado", hex: "#2C2C2C" }],
  },
  {
    id: "26", name: "Poltrona Giratória Lounge", price: 2199.9, image: productArmchair, inStock: false, rating: 4.6, stock: 0, category: "cadeiras",
    description: "Poltrona giratória com base em alumínio polido e estofamento em veludo premium.",
    material: "Veludo, alumínio polido, espuma HR", dimensions: "80cm x 80cm x 90cm", weight: "20kg", warranty: "3 anos",
    colors: [{ name: "Verde Musgo", hex: "#4A5D4A" }, { name: "Terracota", hex: "#C4603A" }],
  },
  {
    id: "27", name: "Estante Livros Industrial 5 Níveis", price: 1599.9, image: productBookshelf, inStock: true, rating: 4.4, stock: 30, category: "armarios",
    description: "Estante industrial com 5 níveis em madeira de demolição e estrutura tubular em aço.",
    material: "Aço tubular, madeira de demolição", dimensions: "100cm x 35cm x 200cm", weight: "32kg", warranty: "3 anos",
    colors: [{ name: "Natural/Preto", hex: "#4A3728" }],
  },
  {
    id: "28", name: "Mesa Lateral Vidro Temperado", price: 799.9, image: img(1), inStock: true, rating: 4.3, stock: 45, category: "mesas",
    description: "Mesa lateral redonda com tampo em vidro temperado 8mm e base metálica dourada.",
    material: "Vidro temperado 8mm, aço dourado", dimensions: "50cm x 50cm x 55cm", weight: "8kg", warranty: "2 anos",
    colors: [{ name: "Dourado/Vidro", hex: "#D4A843" }, { name: "Cromado/Vidro", hex: "#C0C0C0" }],
  },
  {
    id: "29", name: "Cômoda 6 Gavetas Premium", price: 2899.9, image: img(2), inStock: true, rating: 4.5, stock: 12, category: "armarios",
    description: "Cômoda com 6 gavetas em MDF lacado com puxadores em aço escovado. Design minimalista.",
    material: "MDF lacado, aço escovado", dimensions: "130cm x 45cm x 80cm", weight: "42kg", warranty: "3 anos",
    colors: [{ name: "Branco Lacado", hex: "#F5F0E8" }, { name: "Grafite Lacado", hex: "#3D3D3D" }],
  },
  {
    id: "30", name: "Escritório Completo Home Office", price: 4590, originalPrice: 5490, discount: 16,
    image: productDesk, inStock: true, rating: 4.9, stock: 3, category: "utilidades",
    description: "Kit completo: mesa 1.60m + cadeira ergonômica + gaveteiro. Tudo para seu escritório profissional.",
    material: "MDF premium, mesh, aço cromado", dimensions: "160cm x 65cm x 76cm (mesa)", weight: "52kg total", warranty: "3 anos",
    colors: [{ name: "Carvalho/Preto", hex: "#C4A265" }, { name: "Branco/Cinza", hex: "#F0F0F0" }],
  },
];

export const categories = [
  { value: "mesas", label: "Mesas" },
  { value: "cadeiras", label: "Cadeiras" },
  { value: "camas", label: "Camas" },
  { value: "armarios", label: "Armários" },
  { value: "estrutural", label: "Estrutural" },
  { value: "industrial", label: "Industrial" },
  { value: "utilidades", label: "Utilidades" },
];

export const getWeeklyProduct = (): Product => products[0];
