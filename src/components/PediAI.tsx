import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import mascot from "@/assets/pediai-mascot.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { sendChatMessage } from "@/services/WebhookService";
import { useIsMobile } from "@/hooks/use-mobile";

const PediAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: "Olá! Eu sou o PediAI, seu assistente inteligente. Como posso ajudar você hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const isMobile = useIsMobile();

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Fecha com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // BLOQUEIA SCROLL DA PÁGINA
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendChatMessage(userMsg, user?.role ?? "visitante");

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Desculpe, não consegui processar sua mensagem. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chatContent = (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3">
        <img
          src={mascot}
          alt="PediAI"
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="flex-1">
          <p className="text-sm font-semibold text-primary-foreground">
            PediAI
          </p>

          <p className="text-xs text-primary-foreground/70">
            Assistente Inteligente
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="text-primary-foreground/70 hover:text-primary-foreground transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm text-secondary-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Digitando...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-border p-3"
      >
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-primary p-2.5 text-primary-foreground transition-all hover:bg-amber-dark active:scale-95 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-elevated transition-all hover:bg-amber-dark hover:scale-105 active:scale-95 ${
          open ? "hidden" : ""
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm">Falar com PediAI</span>
      </button>

      {/* Chat */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Mobile */}
            {isMobile ? (
              <motion.div
                ref={chatRef}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-50 flex h-[85vh] flex-col rounded-t-2xl bg-card shadow-elevated border-t border-border"
              >
                <div className="flex justify-center py-2">
                  <div className="h-1.5 w-12 rounded-full bg-border" />
                </div>

                {chatContent}
              </motion.div>
            ) : (
              /* Desktop */
              <motion.div
                ref={chatRef}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-6 right-6 z-50 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl bg-card shadow-elevated border border-border"
              >
                {chatContent}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PediAI;