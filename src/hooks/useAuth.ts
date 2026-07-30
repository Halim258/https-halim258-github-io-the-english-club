import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { notifyAdmins } from "@/lib/notifications";

interface AuthState {
  user: User | null;
  role: "admin" | "student" | "teacher" | "secretary" | null;
  loading: boolean;
}

type AppRole = "admin" | "student" | "teacher" | "secretary";

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
        if (_event === "SIGNED_IN" && session?.user) {
          const u = session.user;
          const key = `admin_notified_signin_${u.id}`;
          const last = Number(localStorage.getItem(key) || 0);
          if (Date.now() - last >= 12 * 60 * 60 * 1000) {
            localStorage.setItem(key, String(Date.now()));
            const name = (u.user_metadata?.full_name as string) || u.email || "A user";
            notifyAdmins({
              title: `${name} signed in 👤`,
              message: `${name} (${u.email ?? "no email"}) just signed in to the platform.`,
              type: "info",
              link: `/admin/students/${u.id}/progress`,
            });
          }
        }
      }
    );

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return { user, role, loading };
}
