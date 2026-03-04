import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PedidosProvider } from "@/contexts/ContextoPedidos";
import RoleGuard from "@/components/RoleGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Criar from "./pages/Criar";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Dashboard from "./pages/Dashboard";
import Historico from "./pages/Historico";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <PedidosProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/criar" element={<Criar />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/produtos" element={<AllProducts />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pagamento-sucesso" element={<PaymentSuccess />} />
                <Route path="/historico" element={<Historico />} />
                <Route
                  path="/dashboard"
                  element={
                    <RoleGuard allowedRoles={["admin"]}>
                      <Dashboard />
                    </RoleGuard>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PedidosProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
