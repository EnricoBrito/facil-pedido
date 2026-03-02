import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

const Header = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-soft">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img src={logo} alt="Fácil Pedido" className="h-10 md:h-12 w-auto" />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden flex-1 max-w-xl sm:block">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura hoje?"
            className="w-full rounded-full border border-border bg-background py-2.5 pl-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-primary-foreground transition-colors hover:bg-amber-dark"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-secondary"
          >
            <User className="h-5 w-5" />
            <span className="hidden md:inline">Entrar</span>
          </Link>
          <Link
            to="/carrinho"
            className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-secondary"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden md:inline">Carrinho</span>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={handleSearch} className="px-4 pb-3 sm:hidden">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O que você procura hoje?"
            className="w-full rounded-full border border-border bg-background py-2.5 pl-5 pr-12 text-sm text-foreground placeholder:text-muted-foreground shadow-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2 text-primary-foreground transition-colors hover:bg-amber-dark"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
