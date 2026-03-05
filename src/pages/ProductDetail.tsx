import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { calculatePrice, getVolumeDiscount } from "@/services/PricingService";
import { sendSimulatedPurchase } from "@/services/WebhookService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PediAI from "@/components/PediAI";
import { useState } from "react";
import { Star, ArrowLeft, Loader2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { user, isAuthenticated, isAdmin, isEmpresa, temPermissao } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [simulating, setSimulating] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const pricing = calculatePrice(product.price, quantity, user?.role ?? null);
  const showStock = temPermissao("VER_ESTOQUE");
  const volumeDiscount = getVolumeDiscount(quantity);

  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Validar estoque
    if (quantity > product.stock) {
      toast({ title: "Estoque insuficiente", description: `Apenas ${product.stock} unidades disponíveis.`, variant: "destructive" });
      return;
    }
    for (let i = 0; i < quantity; i++) addItem(product);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      toast({ title: "Estoque insuficiente", description: `Apenas ${product.stock} unidades disponíveis.`, variant: "destructive" });
      return;
    }
    for (let i = 0; i < quantity; i++) addItem(product);
    toast({ title: "Adicionado!", description: `${product.name} adicionado ao carrinho.` });
  };

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      await sendSimulatedPurchase({
        productId: product.id,
        productName: product.name,
        quantity,
        email: user?.email ?? "",
      });
      toast({ title: "Simulação enviada", description: "Webhook de simulação disparado com sucesso." });
    } catch {
      toast({ title: "Erro na simulação", description: "Não foi possível disparar o webhook.", variant: "destructive" });
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-sand p-8 md:p-12">
              <img src={product.image} alt={product.name} className="mx-auto h-72 w-auto object-contain md:h-96" />
            </div>

            {/* Details */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm font-medium text-foreground">
                  {product.inStock ? "Produto em estoque" : "Produto indisponível"}
                </span>
                {showStock && product.inStock && (
                  <span className="ml-2 flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                    <Package className="h-3 w-3" /> {product.stock} un
                  </span>
                )}
              </div>

              <h1 className="mb-3 text-3xl font-bold text-foreground">{product.name}</h1>

              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`} />
                ))}
                <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium text-foreground">Cor: {product.colors[selectedColor].name}</p>
                <div className="flex gap-2">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${i === selectedColor ? "border-primary scale-110" : "border-border"}`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantidade */}
              {isAuthenticated && (
                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-foreground">Quantidade</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-md border border-border px-3 py-1 text-foreground hover:bg-secondary"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                      className="w-20 rounded-lg border border-border bg-background px-3 py-1.5 text-center text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="rounded-md border border-border px-3 py-1 text-foreground hover:bg-secondary"
                    >
                      +
                    </button>
                    {isEmpresa && volumeDiscount > 0 && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-accent">
                        -{volumeDiscount}% desconto
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl bg-secondary p-4 text-sm">
                <div><span className="text-muted-foreground">Dimensões:</span> <span className="font-medium text-foreground">{product.dimensions}</span></div>
                <div><span className="text-muted-foreground">Peso:</span> <span className="font-medium text-foreground">{product.weight}</span></div>
                <div><span className="text-muted-foreground">Material:</span> <span className="font-medium text-foreground">{product.material}</span></div>
                <div><span className="text-muted-foreground">Garantia:</span> <span className="font-medium text-foreground">{product.warranty}</span></div>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
                )}
                <p className="text-3xl font-bold text-foreground">{formatPrice(pricing.finalPrice)}</p>
                {isEmpresa && pricing.discountPercent > 0 && (
                  <p className="text-sm font-medium text-accent">
                    Preço empresa com {pricing.discountPercent}% de desconto
                  </p>
                )}
                {isAdmin && temPermissao("VER_PRECO_INTERNO") && (
                  <div className="mt-2 rounded-lg bg-secondary p-3 text-xs space-y-1">
                    <p className="text-muted-foreground">Preço cliente: <span className="font-medium text-foreground">{formatPrice(product.price)}</span></p>
                    <p className="text-muted-foreground">Preço empresa (1un): <span className="font-medium text-foreground">{formatPrice(calculatePrice(product.price, 1, "empresa").finalPrice)}</span></p>
                    <p className="text-muted-foreground">Preço empresa (10un): <span className="font-medium text-foreground">{formatPrice(calculatePrice(product.price, 10, "empresa").finalPrice)}</span></p>
                    <p className="text-muted-foreground">Margem simulada: <span className="font-medium text-accent">35%</span></p>
                  </div>
                )}
                <p className="mt-1 text-sm text-muted-foreground">ou 12x de {formatPrice(pricing.finalPrice / 12)}</p>
              </div>

              {/* Actions */}
              {product.inStock ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleAddToCart}
                    className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-medium hover:bg-amber-dark"
                  >
                    Adicionar ao Carrinho
                  </button>
                  <button
                    onClick={handleBuy}
                    className="rounded-lg border-2 border-accent bg-transparent px-8 py-3.5 text-center text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Comprar Agora
                  </button>
                  {isAdmin && temPermissao("SIMULAR_COMPRA") && (
                    <button
                      onClick={handleSimulate}
                      disabled={simulating}
                      className="flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground hover:bg-border disabled:opacity-50"
                    >
                      {simulating && <Loader2 className="h-4 w-4 animate-spin" />}
                      Simular Compra
                    </button>
                  )}
                </div>
              ) : (
                <button className="rounded-lg border-2 border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-accent hover:bg-primary/10">
                  Solicitar Fabricação
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PediAI />
    </div>
  );
};

export default ProductDetail;
