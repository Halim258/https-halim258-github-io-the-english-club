import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserPlus, Loader2, CheckCircle2, RefreshCw, Search, Mail, Calendar, BarChart3, CircleDollarSign, CircleAlert, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import BulkEnrollDialog from "./BulkEnrollDialog";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState<Signup | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone_number: "", whatsapp: "", fees: "", paid_fees: "" });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Per-signup payment status ("unconfirmed" | "confirmed"), persisted locally.
  const PAY_KEY = "admin.newSignups.paymentStatus.v1";
  const [payStatus, setPayStatus] = useState<Record<string, "confirmed" | "unconfirmed">>(() => {
    try { return JSON.parse(localStorage.getItem(PAY_KEY) || "{}"); } catch { return {}; }
  });
  const setPay = (id: string, status: "confirmed" | "unconfirmed") => {
    setPayStatus(prev => {
      const next = { ...prev, [id]: status };
      try { localStorage.setItem(PAY_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const isConfirmed = (id: string) => payStatus[id] === "confirmed";

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

  // Deep-link: /admin?tab=new-signups&enroll=<user_id> auto-opens the enroll dialog
  useEffect(() => {
    const enrollId = searchParams.get("enroll");
    if (!enrollId || loading || target) return;
    const match = signups.find(s => s.id === enrollId);
    if (match && !match.is_student && isConfirmed(match.id)) {
      openAdd(match);
      // clear param so refreshing does not reopen it forever
      searchParams.delete("enroll");
      setSearchParams(searchParams, { replace: true });
    }
  }, [signups, loading, searchParams, target, payStatus]);

  const openAdd = (s: Signup) => {
    if (!isConfirmed(s.id)) {
      toast({ title: "Payment not confirmed", description: "Mark payment as Confirmed before enrolling this user.", variant: "destructive" });
      return;
    }
    setTarget(s);
    setPaymentConfirmed(true);
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
    if (!paymentConfirmed) {
      toast({ title: "Payment required", description: "Confirm the student has paid before enrolling.", variant: "destructive" });
      return;
    }
    const feesNum = form.fees ? Number(form.fees) : 0;
    const paidNum = form.paid_fees ? Number(form.paid_fees) : 0;
    if (paidNum <= 0) {
      toast({ title: "Enter paid amount", description: "The paid amount must be greater than 0.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const fees = feesNum;
    const paid = paidNum;
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
    // Write to admin audit log (best-effort; do not block success)
    const { data: auth } = await supabase.auth.getUser();
    const actor = auth?.user;
    if (actor) {
      await supabase.from("admin_audit_log").insert({
        actor_id: actor.id,
        actor_email: actor.email ?? null,
        action: "enroll_student",
        target_user_id: target.id,
        target_email: form.email.trim() || target.email || null,
        target_name: form.name.trim(),
        details: {
          payment_confirmed: true,
          fees,
          paid_fees: paid,
          remaining_fees: Math.max(fees - paid, 0),
          phone_number: form.phone_number.trim() || null,
          whatsapp: form.whatsapp.trim() || null,
          signup_created_at: target.created_at,
        },
      });
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
          <BulkEnrollDialog signups={signups} onComplete={() => { onRefresh?.(); load(); }} />
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
                    <div className="flex items-center justify-between gap-2">
                      {isConfirmed(s.id) ? (
                        <button
                          type="button"
                          onClick={() => setPay(s.id, "unconfirmed")}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-medium hover:bg-emerald-500/20 transition"
                          title="Click to mark as Unconfirmed"
                        >
                          <CircleDollarSign className="h-3 w-3" /> Payment: Confirmed
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPay(s.id, "confirmed")}
                          className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[11px] font-medium hover:bg-amber-500/20 transition"
                          title="Click to mark payment as Confirmed"
                        >
                          <CircleAlert className="h-3 w-3" /> Payment: Unconfirmed
                        </button>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => openAdd(s)}
                      disabled={!isConfirmed(s.id)}
                      className="w-full"
                      title={!isConfirmed(s.id) ? "Confirm payment first to enroll" : undefined}
                    >
                      {isConfirmed(s.id) ? (
                        <><UserPlus className="h-3.5 w-3.5 mr-1" /> Add as Student</>
                      ) : (
                        <><Lock className="h-3.5 w-3.5 mr-1" /> Enrollment locked</>
                      )}
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
                    <Link
                      to="/admin?tab=reports"
                      className="text-xs text-primary hover:underline flex items-center gap-1 shrink-0"
                      title="View progress in Reports tab"
                    >
                      <BarChart3 className="h-3.5 w-3.5" /> Progress
                    </Link>
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
                <Label htmlFor="ns-paid">Paid *</Label>
                <Input id="ns-paid" type="number" value={form.paid_fees} onChange={e => setForm({ ...form, paid_fees: e.target.value })} />
              </div>
            </div>
            <label className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-3 cursor-pointer">
              <Checkbox
                checked={paymentConfirmed}
                onCheckedChange={(v) => setPaymentConfirmed(!!v)}
                className="mt-0.5"
              />
              <span className="text-xs leading-relaxed">
                <span className="font-semibold">I confirm the student has paid.</span>{" "}
                <span className="text-muted-foreground">Only enroll users after receiving payment. This is required.</span>
              </span>
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTarget(null)} disabled={saving}>Cancel</Button>
            <Button onClick={submit} disabled={saving || !paymentConfirmed}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <UserPlus className="h-4 w-4 mr-1" />}
              Enroll Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}