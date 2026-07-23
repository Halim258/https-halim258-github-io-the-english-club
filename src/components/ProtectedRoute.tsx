import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";

interface Props {
  children: React.ReactNode;
  requiredRole?: "admin" | "student" | "teacher" | "secretary";
  requireMember?: boolean;
}

export default function ProtectedRoute({ children, requiredRole, requireMember }: Props) {
  const { user, role, loading } = useAuth();
  const { isMember, loading: memberLoading } = useMembership();

  if (loading || (requireMember && memberLoading)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === "admin" && role !== "admin" && role !== "secretary") {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole === "teacher" && role !== "teacher" && role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireMember && !isMember) {
    return <Navigate to="/pending-approval" replace />;
  }

  return <>{children}</>;
}
