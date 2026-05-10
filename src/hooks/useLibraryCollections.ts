import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export type LibItemType = "book" | "audiobook" | "article" | "word";

export type LibItem = {
  item_type: LibItemType;
  item_key: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  url?: string | null;
  metadata?: Record<string, any>;
};

export type LibRow = LibItem & { id: string; created_at?: string; viewed_at?: string };

export function useLibraryCollections() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<LibRow[]>([]);
  const [history, setHistory] = useState<LibRow[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) { setFavorites([]); setHistory([]); setLoading(false); return; }
    setLoading(true);
    const [f, h] = await Promise.all([
      supabase.from("library_favorites").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("library_history").select("*").eq("user_id", user.id).order("viewed_at", { ascending: false }).limit(50),
    ]);
    setFavorites((f.data as any) || []);
    setHistory((h.data as any) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const isFavorite = useCallback(
    (type: LibItemType, key: string) => favorites.some((x) => x.item_type === type && x.item_key === key),
    [favorites]
  );

  const toggleFavorite = useCallback(async (item: LibItem) => {
    if (!user) { toast.error("Please log in to save favorites."); return; }
    const existing = favorites.find((x) => x.item_type === item.item_type && x.item_key === item.item_key);
    if (existing) {
      await supabase.from("library_favorites").delete().eq("id", existing.id);
      setFavorites((p) => p.filter((x) => x.id !== existing.id));
      toast.success("Removed from favorites");
    } else {
      const { data, error } = await supabase.from("library_favorites").insert({ user_id: user.id, ...item }).select().single();
      if (error) { toast.error("Couldn't save"); return; }
      setFavorites((p) => [data as any, ...p]);
      toast.success("Saved to favorites ⭐");
    }
  }, [favorites, user]);

  const recordView = useCallback(async (item: LibItem) => {
    if (!user) return;
    // upsert on (user_id, item_type, item_key)
    const payload = { user_id: user.id, viewed_at: new Date().toISOString(), ...item };
    const { data } = await supabase
      .from("library_history")
      .upsert(payload, { onConflict: "user_id,item_type,item_key" })
      .select()
      .single();
    if (data) {
      setHistory((p) => [data as any, ...p.filter((x) => !(x.item_type === item.item_type && x.item_key === item.item_key))].slice(0, 50));
    }
  }, [user]);

  const clearHistory = useCallback(async () => {
    if (!user) return;
    await supabase.from("library_history").delete().eq("user_id", user.id);
    setHistory([]);
    toast.success("History cleared");
  }, [user]);

  return { favorites, history, loading, isFavorite, toggleFavorite, recordView, clearHistory, refresh };
}