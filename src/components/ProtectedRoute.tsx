import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  children: React.ReactNode;
  requiredRole?: "admin" | "student" | "teacher" | "secretary";
  requireMember?: boolean;
  minimumLevel?: "a1" | "a2" | "b1" | "b2" | "c1" | "c2";
}

const LEVEL_ORDER = ["a1", "a2", "b1", "b2", "c1", "c2"];

function MinimumLevelNotice({ requiredLevel }: { requiredLevel: string }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <GraduationCap className="h-8 w-8 text-primary" />
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Entry requirement</p>
      <h1 className="mb-3 font-display text-2xl font-semibold">{requiredLevel.toUpperCase()} English level is required</h1>
      <p className="mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        Your latest placement result is below {requiredLevel.toUpperCase()}. Retake the placement test to unlock this course, or start with a lower level first.
      </p>
      <Button asChild size="lg" className="rounded-full">
        <Link to="/placement-test">
          Retake the placement test <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}


export default function ProtectedRoute({ children, requiredRole, requireMember, minimumLevel }: Props) {
  const { user, role, loading } = useAuth();
  const { isMember, loading: memberLoading } = useMembership();
  const [levelAllowed, setLevelAllowed] = useState<boolean | null>(minimumLevel ? null : true);

  useEffect(() => {
    if (!minimumLevel || !user || role === "admin" || role === "secretary" || role === "teacher") {
      setLevelAllowed(true);
      return;
    }

    let cancelled = false;
    supabase
      .from("placement_test_results")
      .select("cefr_level")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const resultLevel = data?.cefr_level?.toLowerCase();
        const requiredIndex = LEVEL_ORDER.indexOf(minimumLevel);
        const resultIndex = resultLevel ? LEVEL_ORDER.indexOf(resultLevel) : -1;
        // No placement result yet → don't block; students can start and test later.
        setLevelAllowed(resultIndex === -1 ? true : resultIndex >= requiredIndex);
      });


    return () => { cancelled = true; };
  }, [minimumLevel, user, role]);

  if (loading || (requireMember && memberLoading) || (minimumLevel && user && levelAllowed === null)) {
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

  if (minimumLevel && !levelAllowed) {
    return <MinimumLevelNotice requiredLevel={minimumLevel} />;
  }

  return <>{children}</>;
}
