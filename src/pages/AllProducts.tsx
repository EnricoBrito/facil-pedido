import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PediAI from "@/components/PediAI";

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [search, setSearch] = useState(queryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesStock = inStockOnly ? p.inStock : true;
      return matchesSearch && matchesPrice && matchesStock;
    });
  }, [search, priceRange, inStockOnly]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-8 text-2xl font-bold text-foreground">Todos os Produtos</h1>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filters */}
            <aside className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Buscar</label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nome do produto..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Faixa de Preço: R${priceRange[0]} - R${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={100}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-primary"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-border accent-primary"
                  />
                  Apenas em estoque
                </label>
              </div>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-3">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">Nenhum produto encontrado.</p>
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

export default AllProducts;
