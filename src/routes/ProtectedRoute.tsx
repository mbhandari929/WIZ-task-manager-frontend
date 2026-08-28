import { Navigate, Outlet } from "react-router-dom";

import LoadingState from "../components/common/LoadingState";
import { useAuth } from "../hooks/useAuth";
import type { UserRole } from "../types/auth";

type ProtectedRouteProps = {
  allowedRole?: UserRole;
};

function ProtectedRoute({ allowedRole }: ProtectedRouteProps) {
  const { status, user } = useAuth();

  if (status === "checking") {
    return <LoadingState label="認証情報を確認しています..." />;
  }

  if (status === "anonymous" || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
