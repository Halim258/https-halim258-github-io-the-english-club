import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, UserPlus, Loader2, KeyRound, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ResultRow {
  identifier: string;
  status: "granted" | "already" | "error";
  message?: string;
}

export default function AdminGrantAccess() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  const [bulk, setBulk] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [results, setResults] = useState<ResultRow[]>([]);

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
    </div>
  );
}