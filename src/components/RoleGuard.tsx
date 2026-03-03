import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: string;
}

const RoleGuard = ({ children, allowedRoles, fallback = "/" }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="text-center">
          <p className="mb-2 text-6xl font-bold text-primary">403</p>
          <h1 className="mb-2 font-display text-2xl font-bold text-foreground">Acesso Negado</h1>
          <p className="mb-6 text-muted-foreground">Você não tem permissão para acessar esta página.</p>
          <a
            href={fallback}
            className="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-amber-dark"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
