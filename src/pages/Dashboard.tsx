import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMockSalesData, getConnectedAccounts } from "@/services/DashboardService";
import { getWebhookUrl, setWebhookUrl } from "@/services/WebhookService";
import { products } from "@/data/products";
import { calculatePrice, getVolumeDiscount } from "@/services/PricingService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart3, DollarSign, Link2, Users, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const sales = getMockSalesData();
  const accounts = getConnectedAccounts();
  const [webhookUrl, setLocalWebhookUrl] = useState(getWebhookUrl());
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"vendas" | "precos" | "contas" | "webhook">("vendas");

  const formatPrice = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const handleSaveWebhook = () => {
    setSaving(true);
    setTimeout(() => {
      setWebhookUrl(webhookUrl);
      setSaving(false);
      toast({ title: "Webhook salvo", description: "URL atualizada com sucesso." });
    }, 600);
  };

  const tabs = [
    { key: "vendas" as const, label: "Vendas", icon: BarChart3 },
    { key: "precos" as const, label: "Preços", icon: DollarSign },
    { key: "contas" as const, label: "Contas", icon: Users },
    { key: "webhook" as const, label: "Webhook", icon: Link2 },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mb-8 text-sm text-muted-foreground">Bem-vindo, {user?.username}</p>

          {/* Tabs */}
          <div className="mb-8 flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === t.key
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Vendas */}
          {activeTab === "vendas" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-medium text-muted-foreground">Total de Vendas</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{formatPrice(sales.totalSales)}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-medium text-muted-foreground">Ticket Médio</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{formatPrice(sales.averageTicket)}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-medium text-muted-foreground">Compras por Tipo</p>
                  <div className="mt-1 flex gap-4">
                    <span className="text-sm text-foreground">Cliente: <strong>{sales.salesByType.cliente}</strong></span>
                    <span className="text-sm text-foreground">Empresa: <strong>{sales.salesByType.empresa}</strong></span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-semibold text-foreground">Pedidos Recentes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 pr-4">ID</th>
                        <th className="pb-2 pr-4">Produto</th>
                        <th className="pb-2 pr-4">Tipo</th>
                        <th className="pb-2 pr-4">Total</th>
                        <th className="pb-2">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-medium text-foreground">{order.id}</td>
                          <td className="py-3 pr-4 text-foreground">{order.product}</td>
                          <td className="py-3 pr-4">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              order.type === "empresa" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary-foreground"
                            }`}>
                              {order.type}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(order.total)}</td>
                          <td className="py-3 text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Preços */}
          {activeTab === "precos" && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-semibold text-foreground">Comparativo de Preços</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-muted-foreground">
                      <th className="pb-2 pr-4">Produto</th>
                      <th className="pb-2 pr-4">Preço Cliente</th>
                      <th className="pb-2 pr-4">Preço Empresa (10un)</th>
                      <th className="pb-2 pr-4">Margem Simulada</th>
                      <th className="pb-2">Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const empresaPricing = calculatePrice(p.price, 10, "empresa");
                      return (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(p.price)}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(empresaPricing.finalPrice)}</td>
                          <td className="py-3 pr-4 text-accent font-medium">35%</td>
                          <td className="py-3">
                            <span className={`font-medium ${p.stock > 0 ? "text-foreground" : "text-destructive"}`}>
                              {p.stock}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contas */}
          {activeTab === "contas" && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <h3 className="mb-4 font-semibold text-foreground">Contas Conectadas</h3>
              <div className="space-y-3">
                {accounts.map((acc, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{acc.username}</p>
                      <p className="text-xs text-muted-foreground">{acc.email}</p>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-accent">
                        {acc.type}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">Último login: {acc.lastLogin}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Webhook */}
          {activeTab === "webhook" && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft max-w-lg">
              <h3 className="mb-4 font-semibold text-foreground">Configuração de Webhook</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Configure a URL base para os webhooks de compra e chat.
              </p>
              <div className="space-y-3">
                <input
                  value={webhookUrl}
                  onChange={(e) => setLocalWebhookUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleSaveWebhook}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-amber-dark disabled:opacity-50"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
