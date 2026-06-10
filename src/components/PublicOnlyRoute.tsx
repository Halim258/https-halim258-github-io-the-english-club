import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

/**
 * Guards auth pages (login, signup, forgot-password) so that
 * already-authenticated users are redirected to their proper landing
 * page instead of seeing a stale login form.
 */
export default function PublicOnlyRoute({ children }: Props) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    // Honor an explicit ?redirect=/path target if present
    const params = new URLSearchParams(location.search);
    const redirect = params.get("redirect");
    if (redirect && redirect.startsWith("/")) {
      return <Navigate to={redirect} replace />;
    }
    if (role === "admin" || role === "secretary") return <Navigate to="/admin" replace />;
    if (role === "teacher") return <Navigate to="/teacher-dashboard" replace />;
    return <Navigate to="/courses" replace />;
  }

  return <>{children}</>;
}