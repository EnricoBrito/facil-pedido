import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { sendPurchaseWebhook } from "@/services/WebhookService";
import { calculatePrice } from "@/services/PricingService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CreditCard, QrCode, FileText, Loader2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "cartao" | "pix" | "boleto";

const Checkout = () => {
  const { items, subtotal, shipping, total: cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [method, setMethod] = useState<PaymentMethod>("cartao");
  const [processing, setProcessing] = useState(false);

  const formatPrice = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Calculate total with role-based pricing
  const roleTotal = items.reduce((sum, item) => {
    const pricing = calculatePrice(item.product.price, item.quantity, user?.role ?? null);
    return sum + pricing.finalPrice * item.quantity;
  }, 0) + (shipping ?? 0);

  const methods: { key: PaymentMethod; label: string; icon: typeof CreditCard; desc: string }[] = [
    { key: "cartao", label: "Cartão de Crédito", icon: CreditCard, desc: "Até 12x sem juros" },
    { key: "pix", label: "Pix", icon: QrCode, desc: "Aprovação instantânea" },
    { key: "boleto", label: "Boleto", icon: FileText, desc: "Vencimento em 3 dias" },
  ];

  const handlePurchase = async () => {
    setProcessing(true);
    try {
      await sendPurchaseWebhook({
        productId: items.map((i) => i.product.id).join(","),
        productName: items.map((i) => i.product.name).join(", "),
        quantity: items.reduce((s, i) => s + i.quantity, 0),
        total: roleTotal,
        userEmail: user?.email ?? "",
        paymentMethod: method,
      });
      navigate("/pagamento-sucesso");
    } catch {
      toast({ title: "Erro", description: "Não foi possível processar o pagamento. Tente novamente.", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate("/carrinho");
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-2xl px-4 md:px-8">
          <h1 className="mb-8 text-2xl font-bold text-foreground">Pagamento</h1>

          {/* Items summary */}
          <div className="mb-6 rounded-xl border border-border bg-card p-5 shadow-soft">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Resumo do Pedido</h3>
            {items.map((item) => {
              const pricing = calculatePrice(item.product.price, item.quantity, user?.role ?? null);
              return (
                <div key={item.product.id} className="flex items-center justify-between border-b border-border/50 py-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{formatPrice(pricing.finalPrice * item.quantity)}</p>
                    {pricing.discountPercent > 0 && (
                      <p className="text-xs text-accent">-{pricing.discountPercent}% empresa</p>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(roleTotal)}</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="mb-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Forma de Pagamento</h3>
            {methods.map((m) => (
              <button
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                  method === m.key
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <div className={`rounded-lg p-2 ${method === m.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
                {method === m.key && <Check className="h-5 w-5 text-primary" />}
              </button>
            ))}
          </div>

          <button
            onClick={handlePurchase}
            disabled={processing}
            className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-medium hover:bg-amber-dark disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing && <Loader2 className="h-4 w-4 animate-spin" />}
            {processing ? "Processando..." : `Pagar ${formatPrice(roleTotal)}`}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
