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
  // ========== EXISTENTES ==========
  {
    id: "1", name: "Poltrona Oslo Premium", price: 2890, originalPrice: 3490, discount: 17,
    image: productArmchair, inStock: true, rating: 4.8, stock: 24, category: "moveis",
    description: "Poltrona de design escandinavo com estrutura em madeira maciça de carvalho e estofamento em couro legítimo.",
    material: "Madeira maciça de carvalho, couro legítimo", dimensions: "75cm x 80cm x 85cm", weight: "18kg", warranty: "5 anos",
    colors: [{ name: "Caramelo", hex: "#C4883A" }, { name: "Marrom Escuro", hex: "#4A3728" }, { name: "Cinza", hex: "#8B8B8B" }],
  },
  {
    id: "2", name: "Mesa de Jantar Nórdica", price: 4250, image: productTable, inStock: true, rating: 4.9, stock: 12, category: "moveis",
    description: "Mesa de jantar para 6 lugares em madeira maciça de nogueira com acabamento natural.",
    material: "Madeira maciça de nogueira", dimensions: "180cm x 90cm x 76cm", weight: "45kg", warranty: "8 anos",
    colors: [{ name: "Natural", hex: "#C4943A" }, { name: "Escuro", hex: "#5C3D2E" }],
  },
  {
    id: "3", name: "Estante Modular Ipê", price: 3150, originalPrice: 3700, discount: 15,
    image: productBookshelf, inStock: true, rating: 4.7, stock: 18, category: "moveis",
    description: "Estante modular em MDF com acabamento em laminado nogueira.",
    material: "MDF com laminado nogueira", dimensions: "120cm x 35cm x 180cm", weight: "38kg", warranty: "3 anos",
    colors: [{ name: "Nogueira", hex: "#6B4226" }, { name: "Freijó", hex: "#A07850" }],
  },
  {
    id: "4", name: "Rack TV Essencial", price: 1890, image: productTvStand, inStock: true, rating: 4.6, stock: 30, category: "moveis",
    description: "Rack para TV até 65 polegadas com design minimalista.",
    material: "MDF com acabamento em carvalho", dimensions: "180cm x 45cm x 55cm", weight: "32kg", warranty: "3 anos",
    colors: [{ name: "Carvalho", hex: "#C4A265" }, { name: "Off-White", hex: "#F5F0E8" }],
  },
  {
    id: "5", name: "Cama Queen Montana", price: 5490, originalPrice: 6200, discount: 11,
    image: productBed, inStock: false, rating: 4.9, stock: 0, category: "moveis",
    description: "Cama queen size com cabeceira estofada e estrutura em madeira de reflorestamento.",
    material: "Madeira de reflorestamento, linho", dimensions: "160cm x 200cm x 110cm", weight: "55kg", warranty: "10 anos",
    colors: [{ name: "Nogueira", hex: "#6B4226" }, { name: "Mel", hex: "#C4943A" }],
  },
  {
    id: "6", name: "Escrivaninha Studio", price: 2190, image: productDesk, inStock: true, rating: 4.5, stock: 42, category: "escritorio",
    description: "Escrivaninha moderna com gavetas ocultas e passagem para cabos.",
    material: "MDF com acabamento em carvalho natural", dimensions: "140cm x 65cm x 75cm", weight: "28kg", warranty: "3 anos",
    colors: [{ name: "Carvalho Natural", hex: "#C4A265" }, { name: "Preto", hex: "#2C2C2C" }],
  },
  {
    id: "7", name: "Sofá Premium Milão", price: 1999.9, originalPrice: 2499.9, discount: 20,
    image: productArmchair, inStock: true, rating: 4.9, stock: 8, category: "premium",
    description: "Sofá premium com revestimento em couro italiano e estrutura reforçada.",
    material: "Couro italiano, madeira de lei", dimensions: "220cm x 95cm x 85cm", weight: "65kg", warranty: "8 anos",
    colors: [{ name: "Cognac", hex: "#9A4B2E" }, { name: "Preto", hex: "#1A1A1A" }],
  },
  {
    id: "8", name: "Cadeira Escritório Eco", price: 559.9, image: productDesk, inStock: true, rating: 4.3, stock: 85, category: "economico",
    description: "Cadeira ergonômica com materiais reciclados.",
    material: "Plástico reciclado, mesh, aço", dimensions: "60cm x 60cm x 110cm", weight: "12kg", warranty: "2 anos",
    colors: [{ name: "Cinza", hex: "#7A7A7A" }, { name: "Azul Escuro", hex: "#2C3E50" }],
  },
  {
    id: "9", name: "Mesa Reunião Executiva", price: 999.9, image: productTable, inStock: true, rating: 4.7, stock: 15, category: "corporativo",
    description: "Mesa de reunião para 8 lugares com acabamento em laca fosca.",
    material: "MDF reforçado, laca fosca", dimensions: "240cm x 120cm x 76cm", weight: "72kg", warranty: "5 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Grafite", hex: "#3D3D3D" }],
  },
  {
    id: "10", name: "Estante Industrial Loft", price: 799.9, image: productBookshelf, inStock: true, rating: 4.8, stock: 52, category: "alta-demanda",
    description: "Estante estilo industrial com estrutura em aço e prateleiras em madeira de demolição.",
    material: "Aço carbono, madeira de demolição", dimensions: "100cm x 40cm x 200cm", weight: "35kg", warranty: "3 anos",
    colors: [{ name: "Natural/Preto", hex: "#4A3728" }, { name: "Natural/Cobre", hex: "#B87333" }],
  },
  {
    id: "11", name: "Aparador Artesanal Ouro", price: 1119.9, originalPrice: 1399.9, discount: 20,
    image: productTvStand, inStock: true, rating: 4.6, stock: 6, category: "especial",
    description: "Aparador artesanal com detalhes em folha de ouro e pés torneados.",
    material: "Madeira maciça, folha de ouro", dimensions: "140cm x 40cm x 85cm", weight: "25kg", warranty: "5 anos",
    colors: [{ name: "Nogueira/Ouro", hex: "#D4A843" }, { name: "Ébano/Ouro", hex: "#3B2F2F" }],
  },

  // ========== FAIXA BAIXA ==========
  {
    id: "12", name: "Luminária LED Clip", price: 9.9, image: img(5), inStock: true, rating: 4.0, stock: 200, category: "utilidades",
    description: "Luminária LED compacta com clip para fixação. Ideal para leitura e trabalho noturno.",
    material: "Plástico ABS, LED", dimensions: "15cm x 5cm x 30cm", weight: "0.2kg", warranty: "6 meses",
    colors: [{ name: "Branco", hex: "#FFFFFF" }, { name: "Preto", hex: "#2C2C2C" }],
  },
  {
    id: "13", name: "Organizador de Mesa Bambu", price: 14.9, image: img(2), inStock: true, rating: 4.2, stock: 150, category: "escritorio",
    description: "Organizador de mesa em bambu natural com 4 compartimentos.",
    material: "Bambu natural", dimensions: "20cm x 10cm x 12cm", weight: "0.3kg", warranty: "1 ano",
    colors: [{ name: "Natural", hex: "#D4A843" }],
  },
  {
    id: "14", name: "Porta-Canetas Industrial", price: 24.9, image: img(3), inStock: true, rating: 4.1, stock: 120, category: "escritorio",
    description: "Porta-canetas em aço com acabamento industrial. Resistente e moderno.",
    material: "Aço carbono pintado", dimensions: "8cm x 8cm x 12cm", weight: "0.4kg", warranty: "1 ano",
    colors: [{ name: "Preto", hex: "#2C2C2C" }, { name: "Cobre", hex: "#B87333" }],
  },
  {
    id: "15", name: "Kit Ganchos Adesivos (6un)", price: 9.9, image: img(4), inStock: true, rating: 3.9, stock: 300, category: "utilidades",
    description: "Kit com 6 ganchos adesivos em aço inox. Suporta até 3kg cada.",
    material: "Aço inox, adesivo 3M", dimensions: "4cm x 4cm x 3cm", weight: "0.15kg", warranty: "6 meses",
    colors: [{ name: "Inox", hex: "#C0C0C0" }],
  },
  {
    id: "16", name: "Fita LED RGB 5m", price: 24.9, image: img(5), inStock: true, rating: 4.4, stock: 180, category: "eletronicos",
    description: "Fita LED RGB com controle remoto e 16 cores. 5 metros com adesivo.",
    material: "LED, silicone, cobre", dimensions: "500cm x 1cm x 0.3cm", weight: "0.2kg", warranty: "1 ano",
    colors: [{ name: "RGB", hex: "#FF0000" }],
  },

  // ========== FAIXA MÉDIA ==========
  {
    id: "17", name: "Cadeira Dobrável Compact", price: 89.9, image: img(0), inStock: true, rating: 4.2, stock: 95, category: "moveis",
    description: "Cadeira dobrável em aço com assento acolchoado. Fácil de guardar.",
    material: "Aço pintado, espuma, tecido", dimensions: "45cm x 50cm x 80cm", weight: "4kg", warranty: "1 ano",
    colors: [{ name: "Preto", hex: "#2C2C2C" }, { name: "Cinza", hex: "#7A7A7A" }],
  },
  {
    id: "18", name: "Gaveteiro Móvel 3 Gavetas", price: 159.9, image: img(1), inStock: true, rating: 4.5, stock: 60, category: "escritorio",
    description: "Gaveteiro móvel com rodízios e 3 gavetas com chave. Ideal para escritórios.",
    material: "MDF com acabamento UV", dimensions: "40cm x 50cm x 60cm", weight: "15kg", warranty: "2 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Cinza", hex: "#8B8B8B" }],
  },
  {
    id: "19", name: "Suporte Monitor Ergonômico", price: 89.9, image: img(3), inStock: true, rating: 4.6, stock: 75, category: "escritorio",
    description: "Suporte para monitor com regulagem de altura e gaveta organizadora.",
    material: "MDF, aço", dimensions: "50cm x 25cm x 15cm", weight: "2.5kg", warranty: "2 anos",
    colors: [{ name: "Branco", hex: "#F5F0E8" }, { name: "Preto", hex: "#2C2C2C" }],
  },
  {
    id: "20", name: "Armário Multiuso Slim", price: 299.9, image: img(2), inStock: true, rating: 4.4, stock: 35, category: "moveis",
    description: "Armário multiuso com 2 portas e 3 prateleiras internas. Design compacto.",
    material: "MDF com acabamento melamínico", dimensions: "60cm x 35cm x 180cm", weight: "22kg", warranty: "2 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Carvalho", hex: "#C4A265" }],
  },
  {
    id: "21", name: "Mesa Lateral Redonda", price: 159.9, image: img(1), inStock: true, rating: 4.3, stock: 45, category: "moveis",
    description: "Mesa lateral redonda com tampo em vidro temperado e base metálica.",
    material: "Vidro temperado, aço cromado", dimensions: "45cm x 45cm x 55cm", weight: "5kg", warranty: "2 anos",
    colors: [{ name: "Cromado", hex: "#C0C0C0" }, { name: "Dourado", hex: "#D4A843" }],
  },
  {
    id: "22", name: "Kit Ferramentas 50 Peças", price: 89.9, image: img(4), inStock: true, rating: 4.5, stock: 110, category: "ferramentas",
    description: "Kit completo com 50 peças: chaves, alicates, martelo e acessórios em maleta.",
    material: "Aço cromo-vanádio", dimensions: "35cm x 25cm x 10cm", weight: "4kg", warranty: "3 anos",
    colors: [{ name: "Amarelo/Preto", hex: "#F5C518" }],
  },

  // ========== FAIXA ALTA ==========
  {
    id: "23", name: "Painel TV Suspenso 1.80m", price: 799.9, image: img(3), inStock: true, rating: 4.7, stock: 20, category: "moveis",
    description: "Painel para TV suspenso com nicho central e LED embutido. Suporta até 65 polegadas.",
    material: "MDF com acabamento UV", dimensions: "180cm x 12cm x 120cm", weight: "28kg", warranty: "3 anos",
    colors: [{ name: "Off-White", hex: "#F5F0E8" }, { name: "Nogueira", hex: "#6B4226" }],
  },
  {
    id: "24", name: "Conjunto Sala de Jantar 6 Lugares", price: 1499.9, image: img(1), inStock: true, rating: 4.8, stock: 10, category: "premium",
    description: "Conjunto completo: mesa retangular + 6 cadeiras estofadas em linho.",
    material: "Madeira maciça, linho", dimensions: "160cm x 90cm x 76cm", weight: "85kg", warranty: "5 anos",
    colors: [{ name: "Natural/Bege", hex: "#C4943A" }, { name: "Escuro/Cinza", hex: "#5C3D2E" }],
  },
  {
    id: "25", name: "Sofá Retrátil 3 Lugares", price: 3200.9, image: img(0), inStock: true, rating: 4.9, stock: 7, category: "premium",
    description: "Sofá retrátil e reclinável em suede com molas ensacadas. Máximo conforto.",
    material: "Suede premium, molas ensacadas, madeira", dimensions: "230cm x 100cm x 95cm", weight: "70kg", warranty: "5 anos",
    colors: [{ name: "Cinza", hex: "#8B8B8B" }, { name: "Bege", hex: "#D2C4A0" }],
  },
  {
    id: "26", name: "Bancada Industrial 2m", price: 799.9, image: img(1), inStock: true, rating: 4.6, stock: 14, category: "industrial",
    description: "Bancada de trabalho industrial com tampo em madeira maciça e estrutura em aço.",
    material: "Madeira maciça teca, aço carbono", dimensions: "200cm x 60cm x 90cm", weight: "55kg", warranty: "5 anos",
    colors: [{ name: "Natural/Preto", hex: "#4A3728" }],
  },
  {
    id: "27", name: "Lixeira Inox Sensor 50L", price: 299.9, image: img(4), inStock: true, rating: 4.4, stock: 40, category: "utilidades",
    description: "Lixeira em aço inox com sensor de abertura automática. Capacidade 50 litros.",
    material: "Aço inox 304", dimensions: "30cm x 30cm x 70cm", weight: "5kg", warranty: "2 anos",
    colors: [{ name: "Inox", hex: "#C0C0C0" }, { name: "Preto Fosco", hex: "#2C2C2C" }],
  },
  {
    id: "28", name: "Estante Livros Compacta", price: 299.9, image: img(2), inStock: true, rating: 4.3, stock: 55, category: "moveis",
    description: "Estante compacta para livros com 5 prateleiras. Ideal para espaços pequenos.",
    material: "MDF com acabamento BP", dimensions: "60cm x 25cm x 180cm", weight: "18kg", warranty: "2 anos",
    colors: [{ name: "Branco", hex: "#F0F0F0" }, { name: "Carvalho", hex: "#C4A265" }],
  },
];

export const getWeeklyProduct = (): Product => products[0];
