import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type UserRole = "admin" | "empresa" | "cliente";

export interface AuthUser {
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmpresa: boolean;
  isCliente: boolean;
}

const HARDCODED_USERS: { username: string; password: string; role: UserRole }[] = [
  { username: "adm", password: "123", role: "admin" },
  { username: "empresa", password: "123", role: "empresa" },
  { username: "cliente", password: "123", role: "cliente" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((username: string, password: string): boolean => {
    const found = HARDCODED_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({
        username: found.username,
        email: "enricodealmeidabrito@gmail.com",
        role: found.role,
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

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
