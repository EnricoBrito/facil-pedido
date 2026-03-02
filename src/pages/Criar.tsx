import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const Criar = () => {
  const [tipoConta, setTipoConta] = useState<"cliente" | "empresa">("cliente");

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cnpj: "",
    empresa: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link to="/">
            <img
              src={logo}
              alt="Fácil Pedido"
              className="mx-auto h-24 w-auto"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-medium">

          {/* Abas com Slider Animado */}
          <div className="relative mb-6 flex rounded-lg bg-muted p-1">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-1 bottom-1 w-1/2 rounded-md bg-primary shadow-soft"
              style={{
                left: tipoConta === "cliente" ? "4px" : "50%",
              }}
            />

            <button
              type="button"
              onClick={() => setTipoConta("cliente")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${
                tipoConta === "cliente"
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Cliente
            </button>

            <button
              type="button"
              onClick={() => setTipoConta("empresa")}
              className={`relative z-10 flex-1 py-2 text-sm font-medium transition ${
                tipoConta === "empresa"
                  ? "text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Empresa
            </button>
          </div>

          {/* Formulário com transição suave */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={tipoConta}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {tipoConta === "cliente" && (
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Seu nome"
                    />
                  </div>
                )}

                {tipoConta === "empresa" && (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        Nome da Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Nome da empresa"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        name="cnpj"
                        value={form.cnpj}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="00.000.000/0000-00"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Campos comuns */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              Criar Conta
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Criar;