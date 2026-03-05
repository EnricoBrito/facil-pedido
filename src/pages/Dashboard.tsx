import { useState } from "react";
import { useAuth, obterContasConectadas } from "@/contexts/AuthContext";
import { usePedidos } from "@/contexts/ContextoPedidos";
import { getWebhookUrl, setWebhookUrl } from "@/services/WebhookService";
import { products } from "@/data/products";
import { calculatePrice } from "@/services/PricingService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart3, DollarSign, Link2, Users, Save, Loader2, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const { todosPedidos, totalVendido, totalPorTipo, ticketMedio } = usePedidos();
  const { toast } = useToast();
  const [webhookUrl, setLocalWebhookUrl] = useState(getWebhookUrl());
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"vendas" | "precos" | "contas" | "webhook">("vendas");

  const contas = obterContasConectadas();
  const pedidos = todosPedidos();
  const porTipo = totalPorTipo();

  const formatPrice = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const mascaraUrl = (url: string) => {
    try {
      const u = new URL(url);
      return `${u.protocol}//${u.hostname.slice(0, 10)}***${u.pathname.slice(0, 5)}***`;
    } catch {
      return url.slice(0, 20) + "***";
    }
  };

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
    { key: "contas" as const, label: "Relatório de Contas", icon: Users },
    { key: "webhook" as const, label: "Webhook", icon: Link2 },
  ];

  // Stats para relatório de contas
  const contasPorTipo = {
    admin: contas.filter(c => c.tipo === "admin").length,
    empresa: contas.filter(c => c.tipo === "empresa").length,
    cliente: contas.filter(c => c.tipo === "cliente").length,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="mb-8 text-sm text-muted-foreground">Bem-vindo, {user?.nome ?? user?.username}</p>

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
                  <p className="mt-1 text-2xl font-bold text-foreground">{formatPrice(totalVendido())}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-medium text-muted-foreground">Ticket Médio</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{formatPrice(ticketMedio())}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <p className="text-xs font-medium text-muted-foreground">Compras por Tipo</p>
                  <div className="mt-1 flex gap-4">
                    <span className="text-sm text-foreground">Cliente: <strong>{porTipo.cliente}</strong></span>
                    <span className="text-sm text-foreground">Empresa: <strong>{porTipo.empresa}</strong></span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <h3 className="mb-4 font-semibold text-foreground">Pedidos Recentes</h3>
                {pedidos.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">Nenhum pedido registrado ainda.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="pb-2 pr-4">ID</th>
                          <th className="pb-2 pr-4">Usuário</th>
                          <th className="pb-2 pr-4">Tipo</th>
                          <th className="pb-2 pr-4">Total</th>
                          <th className="pb-2">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedidos.slice(0, 20).map((p) => (
                          <tr key={p.id} className="border-b border-border/50">
                            <td className="py-3 pr-4 font-medium text-foreground">{p.id}</td>
                            <td className="py-3 pr-4 text-foreground">{p.nomeUsuario}</td>
                            <td className="py-3 pr-4">
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                p.tipoConta === "empresa" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary-foreground"
                              }`}>
                                {p.tipoConta}
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-foreground">{formatPrice(p.valorTotal)}</td>
                            <td className="py-3 text-muted-foreground">{new Date(p.data).toLocaleDateString("pt-BR")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                      <th className="pb-2 pr-4">Empresa (1un)</th>
                      <th className="pb-2 pr-4">Empresa (10un)</th>
                      <th className="pb-2 pr-4">Empresa (50un)</th>
                      <th className="pb-2 pr-4">Margem</th>
                      <th className="pb-2">Estoque</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => {
                      const emp1 = calculatePrice(p.price, 1, "empresa");
                      const emp10 = calculatePrice(p.price, 10, "empresa");
                      const emp50 = calculatePrice(p.price, 50, "empresa");
                      return (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="py-3 pr-4 font-medium text-foreground">{p.name}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(p.price)}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(emp1.finalPrice)}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(emp10.finalPrice)}</td>
                          <td className="py-3 pr-4 text-foreground">{formatPrice(emp50.finalPrice)}</td>
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

          {/* Relatório de Contas */}
          {activeTab === "contas" && (
            <div className="space-y-6">
              {/* Resumo */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-accent" />
                    <p className="text-xs font-medium text-muted-foreground">Administradores</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{contasPorTipo.admin}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-accent" />
                    <p className="text-xs font-medium text-muted-foreground">Empresas</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{contasPorTipo.empresa}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-accent" />
                    <p className="text-xs font-medium text-muted-foreground">Clientes</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{contasPorTipo.cliente}</p>
                </div>
              </div>

              {/* Tabela detalhada */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Relatório Completo de Contas</h3>
                  <span className="text-xs text-muted-foreground">{contas.length} contas registradas</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 pr-4">ID</th>
                        <th className="pb-2 pr-4">Nome</th>
                        <th className="pb-2 pr-4">Login</th>
                        <th className="pb-2 pr-4">E-mail</th>
                        <th className="pb-2 pr-4">Tipo de Conta</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contas.map((acc) => {
                        const pedidosConta = pedidos.filter(p => p.idUsuario === acc.id);
                        const totalGasto = pedidosConta.reduce((s, p) => s + p.valorTotal, 0);
                        return (
                          <tr key={acc.id} className="border-b border-border/50">
                            <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{acc.id}</td>
                            <td className="py-3 pr-4 font-medium text-foreground">{acc.nome}</td>
                            <td className="py-3 pr-4 text-foreground">@{acc.username}</td>
                            <td className="py-3 pr-4 text-muted-foreground text-xs">{acc.email}</td>
                            <td className="py-3 pr-4">
                              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                acc.tipo === "admin"
                                  ? "bg-accent/10 text-accent"
                                  : acc.tipo === "empresa"
                                  ? "bg-primary/10 text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}>
                                {acc.tipo === "admin" ? "Administrador" : acc.tipo === "empresa" ? "Empresa" : "Cliente"}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-xs text-foreground">Ativo</span>
                              </div>
                              {pedidosConta.length > 0 && (
                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                  {pedidosConta.length} pedido{pedidosConta.length > 1 ? "s" : ""} · {formatPrice(totalGasto)}
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Webhook */}
          {activeTab === "webhook" && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-soft max-w-lg">
              <h3 className="mb-4 font-semibold text-foreground">Configuração de Webhook</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Configure a URL base para os webhooks de compra e chat.
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                URL atual (mascarada): <span className="font-mono text-foreground">{mascaraUrl(webhookUrl)}</span>
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
