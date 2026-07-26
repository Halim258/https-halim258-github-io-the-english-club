import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Loader2, KeyRound, CheckCircle2, XCircle, Trash2, Search, RefreshCw, ShieldOff, Sparkles, Clock, UserCheck, UserX, Zap, CalendarClock, Infinity as InfinityIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

interface ResultRow {
  identifier: string;
  status: "granted" | "already" | "error";
  message?: string;
}

interface Member {
  id: string;
  name: string | null;
  email: string | null;
  user_id: string | null;
  created_at: string;
  status: string | null;
  access_expires_at: string | null;
}

interface Signup {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  is_student: boolean;
  role: string | null;
}

export default function AdminGrantAccess() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const [bulk, setBulk] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [results, setResults] = useState<ResultRow[]>([]);

  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberSearch, setMemberSearch] = useState("");
  const [revokeTarget, setRevokeTarget] = useState<Member | null>(null);
  const [revoking, setRevoking] = useState(false);

  const [expiryTarget, setExpiryTarget] = useState<Member | null>(null);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [savingExpiry, setSavingExpiry] = useState(false);

  const [signups, setSignups] = useState<Signup[]>([]);
  const [loadingSignups, setLoadingSignups] = useState(true);
  const [signupSearch, setSignupSearch] = useState("");
  const [grantingId, setGrantingId] = useState<string | null>(null);
  const [grantingAll, setGrantingAll] = useState(false);
  const [signupFilter, setSignupFilter] = useState<"all" | "today" | "week">("all");

  const loadSignups = async () => {
    setLoadingSignups(true);
    const { data, error } = await supabase.rpc("get_recent_signups", { _limit: 200 });
    if (!error) setSignups((data as Signup[]) || []);
    setLoadingSignups(false);
  };

  const loadMembers = async () => {
    setLoadingMembers(true);
    const { data, error } = await supabase
      .from("school_students")
      .select("id, name, email, user_id, created_at, status, access_expires_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast({ title: "Failed to load members", description: error.message, variant: "destructive" });
    } else {
      setMembers((data as Member[]) || []);
    }
    setLoadingMembers(false);
  };

  useEffect(() => { loadMembers(); loadSignups(); }, []);

  const pendingSignups = useMemo(() => {
    let list = signups.filter((s) => !s.is_student);
    if (signupFilter !== "all") {
      const cutoff = Date.now() - (signupFilter === "today" ? 86400000 : 7 * 86400000);
      list = list.filter((s) => new Date(s.created_at).getTime() >= cutoff);
    }
    if (!signupSearch.trim()) return list;
    const q = signupSearch.toLowerCase();
    return list.filter(
      (s) =>
        (s.full_name || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q)
    );
  }, [signups, signupSearch, signupFilter]);

  const stats = useMemo(() => {
    const dayAgo = Date.now() - 86400000;
    const weekAgo = Date.now() - 7 * 86400000;
    const pending = signups.filter((s) => !s.is_student).length;
    const newToday = signups.filter((s) => new Date(s.created_at).getTime() >= dayAgo).length;
    const newWeek = signups.filter((s) => new Date(s.created_at).getTime() >= weekAgo).length;
    return { pending, newToday, newWeek, total: members.length };
  }, [signups, members]);

  const timeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${Math.max(1, m)}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  };

  const grantSignup = async (s: Signup) => {
    setGrantingId(s.id);
    const cleanName = s.full_name || (s.email ? s.email.split("@")[0] : "New member");
    const { error } = await supabase.from("school_students").insert({
      name: cleanName,
      email: s.email,
      user_id: s.id,
      status: "active",
      fees: 0,
      paid_fees: 0,
      remaining_fees: 0,
    });
    if (error) {
      toast({ title: "Could not grant access", description: error.message, variant: "destructive" });
      setGrantingId(null);
      return;
    }
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      await supabase.from("admin_audit_log").insert({
        actor_id: auth.user.id,
        actor_email: auth.user.email ?? null,
        action: "grant_access",
        target_user_id: s.id,
        target_email: s.email,
        target_name: cleanName,
        details: { source: "grant_access_page:signup_suggestion" },
      });
    }
    toast({ title: "Access granted ✅", description: `${cleanName} can now access the platform.` });
    setSignups((prev) => prev.map((x) => (x.id === s.id ? { ...x, is_student: true } : x)));
    setGrantingId(null);
    loadMembers();
  };

  const grantAllPending = async () => {
    if (pendingSignups.length === 0) return;
    setGrantingAll(true);
    let ok = 0;
    for (const s of pendingSignups) {
      const cleanName = s.full_name || (s.email ? s.email.split("@")[0] : "New member");
      const { error } = await supabase.from("school_students").insert({
        name: cleanName,
        email: s.email,
        user_id: s.id,
        status: "active",
        fees: 0,
        paid_fees: 0,
        remaining_fees: 0,
      });
      if (!error) {
        ok++;
        const { data: auth } = await supabase.auth.getUser();
        if (auth?.user) {
          await supabase.from("admin_audit_log").insert({
            actor_id: auth.user.id,
            actor_email: auth.user.email ?? null,
            action: "grant_access",
            target_user_id: s.id,
            target_email: s.email,
            target_name: cleanName,
            details: { source: "grant_access_page:bulk_grant_all" },
          });
        }
      }
    }
    setGrantingAll(false);
    toast({ title: `Granted access to ${ok}/${pendingSignups.length}` });
    loadSignups();
    loadMembers();
  };

  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return members;
    const q = memberSearch.toLowerCase();
    return members.filter((m) =>
      (m.name || "").toLowerCase().includes(q) ||
      (m.email || "").toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  const revoke = async () => {
    if (!revokeTarget) return;
    setRevoking(true);
    const { error } = await supabase.from("school_students").delete().eq("id", revokeTarget.id);
    if (error) {
      setRevoking(false);
      toast({ title: "Could not revoke access", description: error.message, variant: "destructive" });
      return;
    }
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      await supabase.from("admin_audit_log").insert({
        actor_id: auth.user.id,
        actor_email: auth.user.email ?? null,
        action: "revoke_access",
        target_user_id: revokeTarget.user_id,
        target_email: revokeTarget.email,
        target_name: revokeTarget.name,
        details: { source: "grant_access_page", school_student_id: revokeTarget.id },
      });
    }
    toast({
      title: "Access revoked",
      description: `${revokeTarget.name || revokeTarget.email || "Member"} can no longer access the platform.`,
    });
    setMembers((prev) => prev.filter((m) => m.id !== revokeTarget.id));
    setRevokeTarget(null);
    setRevoking(false);
  };

  const openExpiry = (m: Member) => {
    setExpiryTarget(m);
    if (m.access_expires_at) {
      // to yyyy-MM-ddTHH:mm local
      const d = new Date(m.access_expires_at);
      const pad = (n: number) => String(n).padStart(2, "0");
      setExpiryDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
    } else {
      setExpiryDate("");
    }
  };

  const applyExpiryPreset = (days: number | null) => {
    if (days === null) { setExpiryDate(""); return; }
    const d = new Date(Date.now() + days * 86400000);
    const pad = (n: number) => String(n).padStart(2, "0");
    setExpiryDate(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);
  };

  const saveExpiry = async () => {
    if (!expiryTarget) return;
    setSavingExpiry(true);
    const iso = expiryDate ? new Date(expiryDate).toISOString() : null;
    const { error } = await supabase
      .from("school_students")
      .update({ access_expires_at: iso })
      .eq("id", expiryTarget.id);
    if (error) {
      setSavingExpiry(false);
      toast({ title: "Could not update expiry", description: error.message, variant: "destructive" });
      return;
    }
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      await supabase.from("admin_audit_log").insert({
        actor_id: auth.user.id,
        actor_email: auth.user.email ?? null,
        action: iso ? "set_access_expiry" : "clear_access_expiry",
        target_user_id: expiryTarget.user_id,
        target_email: expiryTarget.email,
        target_name: expiryTarget.name,
        details: { source: "grant_access_page", expires_at: iso },
      });
    }
    setMembers((prev) => prev.map((m) => m.id === expiryTarget.id ? { ...m, access_expires_at: iso } : m));
    toast({ title: iso ? "Access window set" : "Made access permanent" });
    setExpiryTarget(null);
    setSavingExpiry(false);
  };

  const expiryLabel = (iso: string | null) => {
    if (!iso) return null;
    const t = new Date(iso).getTime();
    const diff = t - Date.now();
    if (diff <= 0) return { text: "Expired", tone: "text-destructive" };
    const days = Math.round(diff / 86400000);
    if (days === 0) {
      const h = Math.max(1, Math.round(diff / 3600000));
      return { text: `Expires in ${h}h`, tone: "text-amber-600 dark:text-amber-400" };
    }
    if (days <= 7) return { text: `Expires in ${days}d`, tone: "text-amber-600 dark:text-amber-400" };
    return { text: `Until ${new Date(iso).toLocaleDateString()}`, tone: "text-muted-foreground" };
  };

  const grantOne = async (rawName: string, rawEmail: string): Promise<ResultRow> => {
    const cleanEmail = rawEmail.trim().toLowerCase();
    const cleanName = rawName.trim() || cleanEmail.split("@")[0] || "New member";
    const identifier = cleanEmail || cleanName;

    if (!cleanEmail && !cleanName) {
      return { identifier: "(empty)", status: "error", message: "Name or email required" };
    }

    // Check if already exists
    if (cleanEmail) {
      const { data: existing } = await supabase
        .from("school_students")
        .select("id")
        .ilike("email", cleanEmail)
        .maybeSingle();
      if (existing) {
        return { identifier, status: "already", message: "Already has access" };
      }
    }

    const { error } = await supabase.from("school_students").insert({
      name: cleanName,
      email: cleanEmail || null,
      status: "active",
      fees: 0,
      paid_fees: 0,
      remaining_fees: 0,
    });

    if (error) return { identifier, status: "error", message: error.message };

    // Audit log (best-effort)
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      await supabase.from("admin_audit_log").insert({
        actor_id: auth.user.id,
        actor_email: auth.user.email ?? null,
        action: "grant_access",
        target_email: cleanEmail || null,
        target_name: cleanName,
        details: { source: "grant_access_page" },
      });
    }

    return { identifier, status: "granted" };
  };

  const submitSingle = async () => {
    if (!name.trim() && !email.trim()) {
      toast({ title: "Enter a name or email", variant: "destructive" });
      return;
    }
    setSaving(true);
    const r = await grantOne(name, email);
    setSaving(false);
    setResults([r, ...results]);
    if (r.status === "granted") {
      toast({ title: "Access granted ✅", description: `${r.identifier} can now access the platform.` });
      setName("");
      setEmail("");
      loadMembers();
    } else if (r.status === "already") {
      toast({ title: "Already a member", description: r.identifier });
    } else {
      toast({ title: "Could not grant access", description: r.message, variant: "destructive" });
    }
  };

  const submitBulk = async () => {
    const lines = bulk.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      toast({ title: "Paste one email or name per line", variant: "destructive" });
      return;
    }
    setBulkSaving(true);
    const collected: ResultRow[] = [];
    for (const line of lines) {
      // Formats: "email", "name,email", "name <email>"
      let n = "";
      let e = "";
      const angle = line.match(/^(.*?)<([^>]+)>\s*$/);
      if (angle) {
        n = angle[1].trim();
        e = angle[2].trim();
      } else if (line.includes(",")) {
        const [a, b] = line.split(",");
        if (b && b.includes("@")) { n = a.trim(); e = b.trim(); }
        else if (a.includes("@")) { e = a.trim(); n = (b || "").trim(); }
        else { n = a.trim(); e = (b || "").trim(); }
      } else if (line.includes("@")) {
        e = line;
      } else {
        n = line;
      }
      collected.push(await grantOne(n, e));
    }
    setBulkSaving(false);
    setResults([...collected, ...results]);
    const ok = collected.filter((r) => r.status === "granted").length;
    toast({ title: `Granted access to ${ok}/${collected.length}` });
    setBulk("");
    if (ok > 0) loadMembers();
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to admin
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
        <KeyRound className="h-6 w-6 text-primary" /> Grant Access
      </h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Add people to the English Club by name or email. Once added, they can sign up (or sign in) and get full access — no waiting for approval.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="rounded-xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><UserX className="h-3.5 w-3.5" /> Waiting</div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Sparkles className="h-3.5 w-3.5" /> New today</div>
          <div className="text-2xl font-bold">{stats.newToday}</div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Clock className="h-3.5 w-3.5" /> This week</div>
          <div className="text-2xl font-bold">{stats.newWeek}</div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><UserCheck className="h-3.5 w-3.5" /> With access</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.total}</div>
        </div>
      </div>

      <section className="mb-8 rounded-xl border bg-gradient-to-br from-primary/5 via-card to-card p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Recent sign-ups waiting for access
            <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{pendingSignups.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sign-ups…"
                value={signupSearch}
                onChange={(e) => setSignupSearch(e.target.value)}
                className="pl-9 w-44 sm:w-56"
              />
            </div>
            <Button variant="outline" size="sm" onClick={loadSignups} disabled={loadingSignups}>
              <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loadingSignups ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-1 rounded-lg border bg-background p-0.5">
            {(["all", "today", "week"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setSignupFilter(f)}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${signupFilter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f === "all" ? "All" : f === "today" ? "Today" : "This week"}
              </button>
            ))}
          </div>
          {pendingSignups.length > 0 && (
            <Button size="sm" variant="secondary" onClick={grantAllPending} disabled={grantingAll}>
              {grantingAll ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <Zap className="h-3.5 w-3.5 mr-1" />}
              Grant all ({pendingSignups.length})
            </Button>
          )}
        </div>

        {loadingSignups ? (
          <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : pendingSignups.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            🎉 Everyone who signed up has access. New sign-ups will appear here.
          </p>
        ) : (
          <ul className="divide-y max-h-96 overflow-y-auto">
            {pendingSignups.map((s) => (
              <li key={s.id} className="py-3 flex items-center gap-3">
                {s.avatar_url ? (
                  <img src={s.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                    {(s.full_name || s.email || "?").slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{s.full_name || "Unnamed"}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.email || "no email"}</p>
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:flex items-center gap-1 shrink-0">
                  <Clock className="h-3 w-3" /> {timeAgo(s.created_at)}
                </span>
                <Button
                  size="sm"
                  onClick={() => grantSignup(s)}
                  disabled={grantingId === s.id}
                  className="shrink-0"
                >
                  {grantingId === s.id ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  )}
                  Grant
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-5 shadow-soft">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" /> Add one person
          </h2>
          <div className="space-y-3">
            <div>
              <Label htmlFor="ga-name">Full name</Label>
              <Input id="ga-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ahmed Hassan" />
            </div>
            <div>
              <Label htmlFor="ga-email">Email</Label>
              <Input id="ga-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" />
            </div>
            <Button onClick={submitSingle} disabled={saving} className="w-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
              Grant access
            </Button>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-5 shadow-soft">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-primary" /> Add many at once
          </h2>
          <div className="space-y-3">
            <Label htmlFor="ga-bulk">One per line</Label>
            <Textarea
              id="ga-bulk"
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
              rows={7}
              placeholder={`student@example.com\nAhmed Hassan, ahmed@example.com\nFatma Ali <fatma@example.com>`}
              className="font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              Accepts <code>email</code>, <code>name, email</code>, or <code>Name &lt;email&gt;</code>.
            </p>
            <Button onClick={submitBulk} disabled={bulkSaving} className="w-full">
              {bulkSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
              Grant access to all
            </Button>
          </div>
        </section>
      </div>

      {results.length > 0 && (
        <section className="mt-8 rounded-xl border bg-card p-5 shadow-soft">
          <h2 className="font-semibold mb-3">Recent results</h2>
          <ul className="divide-y">
            {results.map((r, i) => (
              <li key={i} className="py-2 flex items-center gap-3 text-sm">
                {r.status === "granted" && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                {r.status === "already" && <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />}
                {r.status === "error" && <XCircle className="h-4 w-4 text-destructive shrink-0" />}
                <span className="font-medium truncate flex-1">{r.identifier}</span>
                <span className={
                  r.status === "granted" ? "text-emerald-600 dark:text-emerald-400 text-xs" :
                  r.status === "already" ? "text-muted-foreground text-xs" :
                  "text-destructive text-xs"
                }>
                  {r.status === "granted" ? "Access granted" : r.status === "already" ? "Already a member" : r.message || "Failed"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8 rounded-xl border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <ShieldOff className="h-4 w-4 text-primary" /> People with access
            <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{members.length}</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search name or email…"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="pl-9 w-56"
              />
            </div>
            <Button variant="outline" size="sm" onClick={loadMembers} disabled={loadingMembers}>
              <RefreshCw className={`h-3.5 w-3.5 mr-1 ${loadingMembers ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>
        </div>

        {loadingMembers ? (
          <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : filteredMembers.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            {memberSearch ? "No members match your search." : "No members yet."}
          </p>
        ) : (
          <ul className="divide-y">
            {filteredMembers.map((m) => (
              <li key={m.id} className="py-3 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {(m.name || m.email || "?").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{m.name || "Unnamed"}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.email || "no email"}</p>
                </div>
                {(() => {
                  const label = expiryLabel(m.access_expires_at);
                  return label ? (
                    <span className={`text-[11px] hidden md:inline-flex items-center gap-1 ${label.tone}`}>
                      <CalendarClock className="h-3 w-3" /> {label.text}
                    </span>
                  ) : null;
                })()}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openExpiry(m)}
                  title="Set access expiration"
                >
                  <CalendarClock className="h-3.5 w-3.5 mr-1" />
                  {m.access_expires_at ? "Edit expiry" : "Set expiry"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRevokeTarget(m)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Revoke
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AlertDialog open={!!revokeTarget} onOpenChange={(o) => !o && !revoking && setRevokeTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke access?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-foreground">
                {revokeTarget?.name || revokeTarget?.email || "This member"}
              </span>{" "}
              will immediately lose access to courses and be redirected to the pending-approval screen next time they open the platform. Their account and progress are kept — you can grant access again anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={revoking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); revoke(); }}
              disabled={revoking}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {revoking ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Revoke access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}