import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

const cache = new Map<string, boolean>();

export function useMembership() {
  const { user, role, loading: authLoading } = useAuth();
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (authLoading) return;
    if (!user) { setIsMember(false); setLoading(false); return; }
    // Staff bypass
    if (role === "admin" || role === "secretary" || role === "teacher") {
      setIsMember(true); setLoading(false); return;
    }
    const cached = cache.get(user.id);
    if (cached !== undefined) { setIsMember(cached); setLoading(false); return; }

    supabase.rpc("is_current_user_member").then(({ data }) => {
      if (cancelled) return;
      const ok = data === true;
      cache.set(user.id, ok);
      setIsMember(ok);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [user, role, authLoading]);

  return { isMember: isMember ?? false, loading: loading || authLoading };
}