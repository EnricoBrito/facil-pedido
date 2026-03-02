import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/produtos"
            className="inline-block rounded-lg border-2 border-accent bg-transparent px-10 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
