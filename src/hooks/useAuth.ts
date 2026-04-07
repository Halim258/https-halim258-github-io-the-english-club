import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: "admin" | "student" | "teacher" | null;
  loading: boolean;
}

type AppRole = "admin" | "student" | "teacher";

const roleCache = new Map<string, AppRole>();

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    function fetchRole(userId: string) {
      const cached = roleCache.get(userId);
      if (cached) {
        if (!cancelled) { setRole(cached); setLoading(false); }
        return;
      }
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle()
        .then(({ data }) => {
          if (cancelled) return;
          const r: AppRole = (data?.role as AppRole) || "student";
          roleCache.set(userId, r);
          setRole(r);
          setLoading(false);
        });
    }

    function handleSession(u: User | null) {
      if (cancelled) return;
      setUser(u);
      if (u) {
        fetchRole(u.id);
      } else {
        roleCache.clear();
        setRole(null);
        setLoading(false);
      }
    }

    // 1. Restore session from storage (fast, no network)
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session?.user ?? null);
    });

    // 2. Listen for future changes (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        handleSession(session?.user ?? null);
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return { user, role, loading };
}
