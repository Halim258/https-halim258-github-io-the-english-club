import { useMemo, useRef, useState } from "react";
import { Upload, Loader2, Download, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Signup {
  id: string;
  full_name: string | null;
  email: string | null;
  is_student: boolean;
}

interface Row {
  email: string;
  name: string;
  fees: number;
  paid: number;
  matchedUserId: string | null;
  matchedName: string | null;
  alreadyStudent: boolean;
  paymentConfirmed: boolean;
  error: string | null;
  result?: "success" | "failed";
  resultMessage?: string;
}

interface Props {
  signups: Signup[];
  onComplete: () => void;
}

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const parseRow = (line: string): string[] => {
    const out: string[] = [];
    let cur = ""; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === "," && !inQ) { out.push(cur.trim()); cur = ""; continue; }
      cur += ch;
    }
    out.push(cur.trim());
    return out;
  };
  const headers = parseRow(lines[0]).map(h => h.toLowerCase());
  const rows = lines.slice(1).map(line => {
    const vals = parseRow(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
    return obj;
  });
  return { headers, rows };
}

const SAMPLE_CSV = `email,name,fees,paid_amount
student1@example.com,Ahmed Ali,2000,2000
student2@example.com,Sara Hassan,2500,1500
`;

export default function BulkEnrollDialog({ signups, onComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"upload" | "preview" | "done">("upload");
  const [rows, setRows] = useState<Row[]>([]);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const signupsByEmail = useMemo(() => {
    const m = new Map<string, Signup>();
    signups.forEach(s => { if (s.email) m.set(s.email.toLowerCase().trim(), s); });
    return m;
  }, [signups]);

  const reset = () => {
    setStep("upload");
    setRows([]);
    setProcessing(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = async (file: File) => {
    if (file.size > 1_000_000) {
      toast({ title: "File too large", description: "Max 1 MB.", variant: "destructive" });
      return;
    }
    const text = await file.text();
    const { headers, rows: raw } = parseCsv(text);
    if (!headers.includes("email") || !headers.includes("paid_amount")) {
      toast({ title: "Missing required columns", description: "CSV must include: email, paid_amount (optional: name, fees).", variant: "destructive" });
      return;
    }
    if (raw.length === 0) {
      toast({ title: "No rows found", variant: "destructive" });
      return;
    }
    if (raw.length > 200) {
      toast({ title: "Too many rows", description: "Import at most 200 rows at a time.", variant: "destructive" });
      return;
    }
    const parsed: Row[] = raw.map(r => {
      const email = (r.email || "").toLowerCase().trim();
      const paid = Number(r.paid_amount || 0);
      const fees = Number(r.fees || 0) || paid;
      const match = email ? signupsByEmail.get(email) : undefined;
      let error: string | null = null;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) error = "Invalid email";
      else if (!match) error = "No signed-up user with this email";
      else if (match.is_student) error = "Already enrolled";
      else if (!(paid > 0)) error = "paid_amount must be > 0";
      return {
        email,
        name: (r.name || "").trim() || match?.full_name || email.split("@")[0] || "",
        fees, paid,
        matchedUserId: match?.id ?? null,
        matchedName: match?.full_name ?? null,
        alreadyStudent: !!match?.is_student,
        paymentConfirmed: false,
        error,
      };
    });
    setRows(parsed);
    setStep("preview");
  };

  const toggleRow = (i: number, checked: boolean) => {
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, paymentConfirmed: checked } : r));
  };
  const toggleAll = (checked: boolean) => {
    setRows(prev => prev.map(r => r.error ? r : { ...r, paymentConfirmed: checked }));
  };
  const updatePaid = (i: number, v: string) => {
    const n = Number(v || 0);
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, paid: n, error: r.error && r.error !== "paid_amount must be > 0" ? r.error : (n > 0 ? null : "paid_amount must be > 0") } : r));
  };

  const enrollable = rows.filter(r => !r.error && r.paymentConfirmed);

  const runImport = async () => {
    if (enrollable.length === 0) {
      toast({ title: "Confirm payment for at least one row", variant: "destructive" });
      return;
    }
    setProcessing(true);
    const { data: auth } = await supabase.auth.getUser();
    const actor = auth?.user;

    const updated = [...rows];
    for (let i = 0; i < updated.length; i++) {
      const r = updated[i];
      if (r.error || !r.paymentConfirmed) continue;
      const remaining = Math.max(r.fees - r.paid, 0);
      const { error: insertErr } = await supabase.from("school_students").insert({
        name: r.name,
        email: r.email,
        status: "active",
        fees: r.fees,
        paid_fees: r.paid,
        remaining_fees: remaining,
      });
      if (insertErr) {
        updated[i] = { ...r, result: "failed", resultMessage: insertErr.message };
        continue;
      }
      if (actor) {
        await supabase.from("admin_audit_log").insert({
          actor_id: actor.id,
          actor_email: actor.email ?? null,
          action: "enroll_student",
          target_user_id: r.matchedUserId,
          target_email: r.email,
          target_name: r.name,
          details: {
            payment_confirmed: true,
            fees: r.fees,
            paid_fees: r.paid,
            remaining_fees: remaining,
            source: "bulk_csv_import",
          },
        });
      }
      updated[i] = { ...r, result: "success" };
    }
    setRows(updated);
    setProcessing(false);
    setStep("done");
    onComplete();
  };

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "bulk-enroll-sample.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = rows.filter(r => !r.error).length;
  const successCount = rows.filter(r => r.result === "success").length;
  const failedCount = rows.filter(r => r.result === "failed").length;

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Upload className="h-3.5 w-3.5 mr-1" /> Bulk enroll (CSV)
      </Button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Bulk enroll students from CSV
            </DialogTitle>
          </DialogHeader>

          {step === "upload" && (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed border-primary/30 p-8 text-center bg-primary/5">
                <Upload className="h-10 w-10 mx-auto text-primary mb-3" />
                <p className="font-medium mb-1">Upload a CSV of users to enroll</p>
                <p className="text-xs text-muted-foreground mb-4">
                  Required columns: <code className="bg-muted px-1 rounded">email</code>, <code className="bg-muted px-1 rounded">paid_amount</code>.
                  Optional: <code className="bg-muted px-1 rounded">name</code>, <code className="bg-muted px-1 rounded">fees</code>. Max 200 rows.
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <div className="flex items-center justify-center gap-2">
                  <Button onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4 mr-1" /> Choose file</Button>
                  <Button variant="outline" onClick={downloadSample}><Download className="h-4 w-4 mr-1" /> Sample CSV</Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Emails are matched against existing sign-ups. Only unenrolled users with a matched account can be imported.
              </p>
            </div>
          )}

          {step === "preview" && (
            <div className="flex-1 overflow-hidden flex flex-col gap-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">
                    {rows.length} rows · <span className="text-emerald-600 font-medium">{validCount} valid</span>
                    {rows.length - validCount > 0 && <> · <span className="text-red-600 font-medium">{rows.length - validCount} with errors</span></>}
                  </span>
                </div>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <Checkbox onCheckedChange={(v) => toggleAll(!!v)} />
                  Confirm payment for all valid rows
                </label>
              </div>

              <div className="overflow-auto border rounded-lg flex-1">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="text-left p-2 font-medium w-8"></th>
                      <th className="text-left p-2 font-medium">Email / Matched</th>
                      <th className="text-left p-2 font-medium">Name</th>
                      <th className="text-left p-2 font-medium w-24">Fees</th>
                      <th className="text-left p-2 font-medium w-24">Paid</th>
                      <th className="text-left p-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className={`border-t ${r.error ? "bg-red-500/5" : ""}`}>
                        <td className="p-2">
                          <Checkbox
                            checked={r.paymentConfirmed}
                            disabled={!!r.error}
                            onCheckedChange={(v) => toggleRow(i, !!v)}
                          />
                        </td>
                        <td className="p-2">
                          <div className="font-medium truncate max-w-[220px]">{r.email}</div>
                          {r.matchedName && <div className="text-muted-foreground text-[10px]">→ {r.matchedName}</div>}
                        </td>
                        <td className="p-2 truncate max-w-[140px]">{r.name}</td>
                        <td className="p-2">{r.fees}</td>
                        <td className="p-2">
                          <Input
                            type="number"
                            className="h-7 text-xs"
                            value={r.paid}
                            onChange={(e) => updatePaid(i, e.target.value)}
                            disabled={!!r.error && r.error !== "paid_amount must be > 0"}
                          />
                        </td>
                        <td className="p-2">
                          {r.error ? (
                            <span className="inline-flex items-center gap-1 text-red-600">
                              <AlertTriangle className="h-3 w-3" /> {r.error}
                            </span>
                          ) : r.paymentConfirmed ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600">
                              <CheckCircle2 className="h-3 w-3" /> Ready
                            </span>
                          ) : (
                            <span className="text-muted-foreground">Awaiting payment confirmation</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="space-y-3">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Import complete
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {successCount} enrolled successfully{failedCount > 0 && `, ${failedCount} failed`}.
                </p>
              </div>
              {failedCount > 0 && (
                <div className="max-h-40 overflow-auto border rounded-lg p-2 text-xs space-y-1">
                  {rows.filter(r => r.result === "failed").map((r, i) => (
                    <div key={i} className="text-red-600">• {r.email}: {r.resultMessage}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {step === "upload" && (
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            )}
            {step === "preview" && (
              <>
                <Button variant="outline" onClick={reset} disabled={processing}>Back</Button>
                <Button onClick={runImport} disabled={processing || enrollable.length === 0}>
                  {processing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <CheckCircle2 className="h-4 w-4 mr-1" />}
                  Enroll {enrollable.length} confirmed
                </Button>
              </>
            )}
            {step === "done" && (
              <Button onClick={() => { setOpen(false); reset(); }}>Done</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}