import { useEffect, useState } from "react";
import { ScrollText, RefreshCw, Loader2, Search, UserPlus, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Entry {
  id: string;
  actor_id: string;
  actor_email: string | null;
  action: string;
  target_user_id: string | null;
  target_email: string | null;
  target_name: string | null;
  details: Record<string, any>;
  created_at: string;
}

const ACTION_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  enroll_student: { label: "Enrolled as student", icon: UserPlus, color: "text-emerald-600 bg-emerald-500/10" },
};

export default function AdminAuditLog() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) toast({ title: "Failed to load audit log", description: error.message, variant: "destructive" });
    setEntries((data as Entry[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("admin-audit-log")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_audit_log" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const filtered = entries.filter(e => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (e.actor_email || "").toLowerCase().includes(q) ||
      (e.target_email || "").toLowerCase().includes(q) ||
      (e.target_name || "").toLowerCase().includes(q) ||
      e.action.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" /> Admin Audit Log
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Every admin action is recorded here, including who enrolled which user and the payment details confirmed at the time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search actor, target, action…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-72" />
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground">
          No audit entries yet.
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(e => {
            const meta = ACTION_LABELS[e.action] || { label: e.action, icon: ShieldCheck, color: "text-primary bg-primary/10" };
            const Icon = meta.icon;
            return (
              <div key={e.id} className="rounded-xl border bg-card p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${meta.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <p className="text-sm font-semibold">{meta.label}</p>
                      <p className="text-[11px] text-muted-foreground">{new Date(e.created_at).toLocaleString()}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      By <span className="font-medium text-foreground">{e.actor_email || e.actor_id}</span>
                      {e.target_name && (
                        <> · Target <span className="font-medium text-foreground">{e.target_name}</span></>
                      )}
                      {e.target_email && <> ({e.target_email})</>}
                    </p>
                    {e.details && Object.keys(e.details).length > 0 && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                        {Object.entries(e.details).map(([k, v]) => (
                          <div key={k} className="rounded-md bg-muted/50 px-2 py-1">
                            <span className="text-muted-foreground">{k.replace(/_/g, " ")}: </span>
                            <span className="font-medium">{v === null || v === undefined ? "—" : String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}