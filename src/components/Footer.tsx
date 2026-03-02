import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Institucional */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Institucional
            </h4>
            <ul className="space-y-2.5">
              {["Sobre", "Trabalhe Conosco", "Política de Privacidade", "Termos de Uso"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Ajuda
            </h4>
            <ul className="space-y-2.5">
              {["Central de Ajuda", "Trocas e Devoluções", "Entrega"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contato
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>contato@facilpedido.com.br</li>
              <li>(11) 4000-0000</li>
              <li>WhatsApp: (11) 99000-0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground tracking-wide">
            © 2025 Fácil Pedido. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
