import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type RoleProtectedRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RoleProtectedRoute = ({ allowedRoles, children }: RoleProtectedRouteProps) => {
  const { auth } = useAuth();
  const roles = auth?.roles ?? [];
  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;

