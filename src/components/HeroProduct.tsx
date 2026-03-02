import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { getWeeklyProduct } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const HeroProduct = () => {
  const product = getWeeklyProduct();
  const { addItem } = useCart();

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section className="bg-card py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Produto da Semana
        </motion.p>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 md:flex-row md:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1"
          >
            <div className="relative overflow-hidden rounded-2xl bg-sand p-6 md:p-10">
              {product.discount && (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  -{product.discount}%
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-64 w-auto object-contain md:h-80"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mb-4 flex items-center justify-center gap-1 md:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}`}
                />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mb-8">
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-3xl font-bold text-foreground md:text-4xl">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                ou 12x de {formatPrice(product.price / 12)}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <button
                onClick={() => addItem(product)}
                className="rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-medium transition-all hover:bg-amber-dark hover:shadow-elevated active:scale-[0.98]"
              >
                Adicionar ao Carrinho
              </button>
              <Link
                to={`/produto/${product.id}`}
                className="rounded-lg border-2 border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-primary/10"
              >
                Ver Detalhes
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroProduct;
