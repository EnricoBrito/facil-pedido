import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/produto/${product.id}`}
        className="group block overflow-hidden rounded-xl bg-card shadow-soft transition-all hover:shadow-medium"
      >
        <div className="relative overflow-hidden bg-sand p-4">
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-xs text-muted-foreground">
              {product.inStock ? "Em estoque" : "Indisponível"}
            </span>
          </div>
          <h3 className="mb-1 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mb-3 text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <span className="inline-block rounded-md bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            Ver Produto
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
