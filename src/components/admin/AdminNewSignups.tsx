import { useEffect, useState } from "react";
import { UserPlus, Loader2, CheckCircle2, RefreshCw, Search, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Signup {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  is_student: boolean;
  role: string | null;
}

interface Props {
  onRefresh?: () => void;
}

export default function AdminNewSignups({ onRefresh }: Props) {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<Signup | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone_number: "", whatsapp: "", fees: "", paid_fees: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("get_recent_signups", { _limit: 200 });
    if (error) toast({ title: "Failed to load signups", description: error.message, variant: "destructive" });
    setSignups((data as Signup[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // Realtime: refresh when new profiles appear or students are added
    const ch = supabase
      .channel("admin-new-signups")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "profiles" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "school_students" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const openAdd = (s: Signup) => {
    setTarget(s);
    setForm({
      name: s.full_name || s.email?.split("@")[0] || "",
      email: s.email || "",
      phone_number: "",
      whatsapp: "",
      fees: "",
      paid_fees: "",
    });
  };

  const submit = async () => {
    if (!target) return;
    if (!form.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const fees = form.fees ? Number(form.fees) : 0;
    const paid = form.paid_fees ? Number(form.paid_fees) : 0;
    const { error } = await supabase.from("school_students").insert({
      name: form.name.trim(),
      email: form.email.trim() || null,
      phone_number: form.phone_number.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      status: "active",
      fees,
      paid_fees: paid,
      remaining_fees: Math.max(fees - paid, 0),
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not add student", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Added as student ✅", description: `${form.name} is now in your student list.` });
    setTarget(null);
    onRefresh?.();
    load();
  };

  const filtered = signups.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (s.full_name || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q);
  });

  const newest = filtered.filter(s => !s.is_student);
  const already = filtered.filter(s => s.is_student);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" /> New Sign-ups
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Users who created accounts on the platform. Add them as school students in one click.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name or email…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-64" />
          </div>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : (
        <>
          <section>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              Not yet enrolled
              <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{newest.length}</span>
            </h3>
            {newest.length === 0 ? (
              <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground">
                No new sign-ups waiting to be enrolled.
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {newest.map(s => (
                  <div key={s.id} className="rounded-xl border bg-card p-4 shadow-soft flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      {s.avatar_url ? (
                        <img src={s.avatar_url} alt="" className="h-11 w-11 rounded-full object-cover" />
                      ) : (
                        <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {(s.full_name || s.email || "?").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">{s.full_name || "Unnamed user"}</p>
                        <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {s.email || "no email"}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {new Date(s.created_at).toLocaleDateString()}
                          {s.role && <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">{s.role}</span>}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => openAdd(s)} className="w-full">
                      <UserPlus className="h-3.5 w-3.5 mr-1" /> Add as Student
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {already.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                Already students
                <span className="text-xs bg-emerald-500/10 text-emerald-600 rounded-full px-2 py-0.5">{already.length}</span>
              </h3>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {already.map(s => (
                  <div key={s.id} className="rounded-lg border bg-card/50 p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{s.full_name || "Unnamed"}</p>
                      <p className="text-xs text-muted-foreground truncate">{s.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <Dialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add as school student</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label htmlFor="ns-name">Full name *</Label>
              <Input id="ns-name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="ns-email">Email</Label>
              <Input id="ns-email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ns-phone">Phone</Label>
                <Input id="ns-phone" value={form.phone_number} onChange={e => setForm({ ...form, phone_number: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="ns-wa">WhatsApp</Label>
                <Input id="ns-wa" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ns-fees">Fees (EGP)</Label>
                <Input id="ns-fees" type="number" value={form.fees} onChange={e => setForm({ ...form, fees: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="ns-paid">Paid</Label>
                <Input id="ns-paid" type="number" value={form.paid_fees} onChange={e => setForm({ ...form, paid_fees: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)} disabled={saving}>Cancel</Button>
            <Button onClick={submit} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <UserPlus className="h-4 w-4 mr-1" />}
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}