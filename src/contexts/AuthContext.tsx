import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { TipoConta, Permissao, obterPermissoes, temPermissao } from "@/services/ServicoPermissao";

export type UserRole = TipoConta;

export interface AuthUser {
  id: string;
  username: string;
  nome: string;
  email: string;
  role: UserRole;
  permissoes: Permissao[];
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmpresa: boolean;
  isCliente: boolean;
  temPermissao: (p: Permissao) => boolean;
}

interface UserEntry {
  id: string;
  username: string;
  nome: string;
  password: string;
  role: UserRole;
}

const USUARIOS: UserEntry[] = [
  // Admins
  { id: "adm-1", username: "adm", nome: "Administrador", password: "123", role: "admin" },
  { id: "adm-2", username: "sotech", nome: "Sotech", password: "123", role: "admin" },
  { id: "adm-3", username: "marcelo", nome: "Marcelo", password: "123", role: "admin" },
  // Empresa
  { id: "emp-1", username: "empresa", nome: "Empresa", password: "123", role: "empresa" },
  // Clientes
  { id: "cli-1", username: "joao", nome: "João Silva", password: "123", role: "cliente" },
  { id: "cli-2", username: "maria", nome: "Maria Oliveira", password: "123", role: "cliente" },
  { id: "cli-3", username: "carlos", nome: "Carlos Souza", password: "123", role: "cliente" },
  { id: "cli-4", username: "ana", nome: "Ana Ferreira", password: "123", role: "cliente" },
  { id: "cli-5", username: "pedro", nome: "Pedro Almeida", password: "123", role: "cliente" },
  { id: "cli-6", username: "juliana", nome: "Juliana Santos", password: "123", role: "cliente" },
  { id: "cli-7", username: "rafael", nome: "Rafael Costa", password: "123", role: "cliente" },
  { id: "cli-8", username: "fernanda", nome: "Fernanda Lima", password: "123", role: "cliente" },
  { id: "cli-9", username: "lucas", nome: "Lucas Martins", password: "123", role: "cliente" },
  { id: "cli-10", username: "beatriz", nome: "Beatriz Rocha", password: "123", role: "cliente" },
  { id: "cli-11", username: "thiago", nome: "Thiago Mendes", password: "123", role: "cliente" },
  { id: "cli-12", username: "camila", nome: "Camila Ribeiro", password: "123", role: "cliente" },
  { id: "cli-13", username: "bruno", nome: "Bruno Carvalho", password: "123", role: "cliente" },
  { id: "cli-14", username: "larissa", nome: "Larissa Gomes", password: "123", role: "cliente" },
  { id: "cli-15", username: "eduardo", nome: "Eduardo Batista", password: "123", role: "cliente" },
];

const EMAIL_PADRAO = "enricodealmeidabrito@gmail.com";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((username: string, password: string): boolean => {
    const found = USUARIOS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({
        id: found.id,
        username: found.username,
        nome: found.nome,
        email: EMAIL_PADRAO,
        role: found.role,
        permissoes: obterPermissoes(found.role),
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const verificarPermissao = useCallback(
    (p: Permissao) => temPermissao(user?.role ?? null, p),
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isEmpresa: user?.role === "empresa",
        isCliente: user?.role === "cliente",
        temPermissao: verificarPermissao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Export user list for dashboard (admin only)
export function obterContasConectadas() {
  return USUARIOS.map((u) => ({
    id: u.id,
    username: u.username,
    nome: u.nome,
    tipo: u.role,
    email: EMAIL_PADRAO,
  }));
}
