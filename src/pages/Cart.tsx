import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { calculatePrice } from "@/services/PricingService";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { items, updateQuantity, removeItem, shipping, setShipping } = useCart();
  const { user, isAuthenticated, isEmpresa } = useAuth();
  const navigate = useNavigate();
  const [cep, setCep] = useState("");

  const formatPrice = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleCalcShipping = () => {
    if (cep.length >= 8) setShipping(29.9);
  };

  // Subtotal com preço por perfil
  const itensComPreco = items.map((item) => {
    const pricing = calculatePrice(item.product.price, item.quantity, user?.role ?? null);
    return { item, pricing };
  });

  const roleSubtotal = itensComPreco.reduce((sum, { item, pricing }) => sum + pricing.finalPrice * item.quantity, 0);
  const baseSubtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const economiaTotal = baseSubtotal - roleSubtotal;
  const roleTotal = roleSubtotal + (shipping ?? 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">Seu carrinho está vazio</h1>
            <p className="mb-6 text-muted-foreground">Explore nossos produtos e encontre o que precisa.</p>
            <Link
              to="/"
              className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-amber-dark"
            >
              Voltar às compras
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-8 text-2xl font-bold text-foreground">Carrinho</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {itensComPreco.map(({ item, pricing }) => (
                <div key={item.product.id} className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-soft">
                  <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-lg bg-sand object-contain p-2" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{item.product.name}</h3>
                      <p className="text-lg font-bold text-foreground">{formatPrice(pricing.finalPrice)}</p>
                      {pricing.discountPercent > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground line-through">{formatPrice(item.product.price)}</span>
                          <span className="text-xs text-accent">-{pricing.discountPercent}% empresa</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="rounded-md border border-border p-1 hover:bg-secondary">
                        <Minus className="h-4 w-4 text-foreground" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="rounded-md border border-border p-1 hover:bg-secondary">
                        <Plus className="h-4 w-4 text-foreground" />
                      </button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-soft h-fit">
              <h3 className="mb-4 font-semibold text-foreground">Resumo</h3>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(roleSubtotal)}</span>
                </div>
                {isEmpresa && economiaTotal > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>Economia empresa</span>
                    <span>-{formatPrice(economiaTotal)}</span>
                  </div>
                )}
                {shipping !== null && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Frete</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(roleTotal)}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Calcular frete</label>
                <div className="flex gap-2">
                  <input
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                    placeholder="00000-000"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button onClick={handleCalcShipping} className="rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground hover:bg-border">
                    Calcular
                  </button>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-amber-dark"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
