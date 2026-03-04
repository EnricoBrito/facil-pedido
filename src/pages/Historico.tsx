import { useAuth } from "@/contexts/AuthContext";
import { usePedidos } from "@/contexts/ContextoPedidos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Historico = () => {
  const { user } = useAuth();
  const { pedidosDoUsuario } = usePedidos();

  if (!user) return null;

  const meusPedidos = pedidosDoUsuario(user.id);

  const formatPrice = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const economiaTotal = meusPedidos.reduce((sum, p) => sum + p.descontoTotal, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Meus Pedidos</h1>
          <p className="mb-8 text-sm text-muted-foreground">
            {meusPedidos.length} pedido{meusPedidos.length !== 1 ? "s" : ""} realizado{meusPedidos.length !== 1 ? "s" : ""}
            {user.role === "empresa" && economiaTotal > 0 && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-accent">
                Economia total: {formatPrice(economiaTotal)}
              </span>
            )}
          </p>

          {meusPedidos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <p className="mb-2 text-lg font-medium text-foreground">Nenhum pedido ainda</p>
              <p className="mb-6 text-sm text-muted-foreground">Explore nossos produtos e faça sua primeira compra.</p>
              <Link
                to="/"
                className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-amber-dark"
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {meusPedidos.map((pedido) => (
                <div key={pedido.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">{pedido.id}</span>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                        {pedido.status}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatDate(pedido.data)}</span>
                  </div>

                  <div className="space-y-2">
                    {pedido.itens.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">
                          {item.produto.name} <span className="text-muted-foreground">x{item.quantidade}</span>
                        </span>
                        <span className="font-medium text-foreground">{formatPrice(item.precoUnitario * item.quantidade)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">
                      {pedido.metodoPagamento === "cartao" ? "Cartão" : pedido.metodoPagamento === "pix" ? "Pix" : "Boleto"}
                    </span>
                    <div className="text-right">
                      {pedido.descontoTotal > 0 && (
                        <p className="text-xs text-accent">Economia: {formatPrice(pedido.descontoTotal)}</p>
                      )}
                      <p className="text-base font-bold text-foreground">{formatPrice(pedido.valorTotal)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Historico;
