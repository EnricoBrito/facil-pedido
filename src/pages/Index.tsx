import Header from "@/components/Header";
import HeroProduct from "@/components/HeroProduct";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import PediAI from "@/components/PediAI";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroProduct />
        <ProductGrid />
      </main>
      <Footer />
      <PediAI />
    </div>
  );
};

export default Index;
