import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PediAI from "@/components/PediAI";
import { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);

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
                <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
                <p className="text-sm text-muted-foreground">ou 12x de {formatPrice(product.price / 12)}</p>
              </div>

              {/* Actions */}
              {product.inStock ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => addItem(product)}
                    className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-medium hover:bg-amber-dark"
                  >
                    Adicionar ao Carrinho
                  </button>
                  <Link
                    to="/login"
                    className="rounded-lg border-2 border-accent bg-transparent px-8 py-3.5 text-center text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    Comprar Agora
                  </Link>
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
