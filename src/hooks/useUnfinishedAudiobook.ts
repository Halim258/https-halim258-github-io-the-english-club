import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Returns the number of unfinished chapters from the user's most recent
 * (not completed) audiobook session, or 0 if none.
 */
export function useUnfinishedAudiobook() {
  const { user } = useAuth();
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (!user) { setRemaining(0); return; }
    (async () => {
      const { data } = await supabase
        .from("library_history")
        .select("metadata, completed")
        .eq("user_id", user.id)
        .eq("item_type", "audiobook")
        .eq("completed", false)
        .order("viewed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      const meta = ((data?.metadata as any) || {}) as Record<string, any>;
      const total = Number(meta.total_sections);
      const idx = Number(meta.resume_index);
      if (!Number.isFinite(total) || !Number.isFinite(idx) || total <= 0) {
        setRemaining(0);
        return;
      }
      setRemaining(Math.max(0, total - idx));
    })();
    return () => { cancelled = true; };
  }, [user]);

  return remaining;
}
