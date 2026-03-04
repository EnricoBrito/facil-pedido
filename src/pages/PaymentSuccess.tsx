import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Pedido Confirmado!</h1>
          <p className="mb-8 text-muted-foreground">
            Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/historico"
              className="inline-block rounded-lg border-2 border-accent bg-transparent px-8 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Ver Meus Pedidos
            </Link>
            <Link
              to="/"
              className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-amber-dark"
            >
              Voltar às Compras
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
