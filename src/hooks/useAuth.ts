import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: "admin" | "student" | "teacher" | null;
  loading: boolean;
}

// Cache role per user to avoid repeated DB queries
const roleCache = new Map<string, "admin" | "student" | "teacher">();

export function useAuth(): AuthState {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "student" | "teacher" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchRole(u: User) {
      const cached = roleCache.get(u.id);
      if (cached) return cached;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", u.id)
        .limit(1)
        .single();
      const r = (data?.role as "admin" | "student" | "teacher") || "student";
      roleCache.set(u.id, r);
      return r;
    }

    // Set up listener FIRST, then check session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      if (cancelled) return;
      setUser(u);
      if (u) {
        const r = await fetchRole(u);
        if (!cancelled) setRole(r);
      } else {
        setRole(null);
        roleCache.clear();
      }
      if (!cancelled) setLoading(false);
    });

    // Quick sync check from localStorage (no network)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const r = await fetchRole(u);
        if (!cancelled) setRole(r);
      }
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return { user, role, loading };
}
