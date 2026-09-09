import { useEffect, useMemo, useState } from "react";
import { Search, Loader2, UserRound, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PaymentPrefill {
  userId?: string | null;
  name?: string;
  phone?: string;
  fees?: number | null;
  periodMonth?: string; // yyyy-MM
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  prefill?: PaymentPrefill | null;
}

export interface Person {
  userId: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  fees: number | null;
}

export const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "instapay", label: "InstaPay" },
  { value: "vodafone_cash", label: "Vodafone Cash" },
  { value: "bank", label: "Bank transfer" },
  { value: "other", label: "Other" },
] as const;

export function currentMonthKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export function monthKeyToDate(key: string) {
  return `${key}-01`;
}

export function monthLabel(key: string) {
  const [y, m] = key.split("-").map(Number);
  if (!y || !m) return key;
  return new Date(y, m - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

/** Loads every signed-up account plus school student records, merged by email. */
export async function loadPeople(): Promise<Person[]> {
  const [signupsRes, studentsRes] = await Promise.all([
    supabase.rpc("get_recent_signups", { _limit: 500 }),
    supabase.from("school_students").select("id, name, email, phone_number, whatsapp, fees, user_id, status"),
  ]);

  const students = studentsRes.data || [];
  const byEmail = new Map<string, any>();
  students.forEach((s) => { if (s.email) byEmail.set(s.email.toLowerCase(), s); });

  const list: Person[] = [];
  const seenEmails = new Set<string>();

  (signupsRes.data || []).forEach((s: any) => {
    const email = s.email ? String(s.email).toLowerCase() : null;
    const match = email ? byEmail.get(email) : null;
    if (email) seenEmails.add(email);
    list.push({
      userId: s.id,
      name: s.full_name || match?.name || s.email || "Unnamed",
      email: s.email ?? null,
      phone: match?.phone_number || match?.whatsapp || null,
      fees: match?.fees ?? null,
    });
  });

  students.forEach((s: any) => {
    const email = s.email ? String(s.email).toLowerCase() : null;
    if (email && seenEmails.has(email)) return;
    list.push({
      userId: s.user_id ?? null,
      name: s.name || s.email || "Unnamed",
      email: s.email ?? null,
      phone: s.phone_number || s.whatsapp || null,
      fees: s.fees ?? null,
    });
  });

  return list.sort((a, b) => a.name.localeCompare(b.name));
}

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function PaymentDialog({ open, onOpenChange, onSaved, prefill }: Props) {
  const { toast } = useToast();
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingPeople, setLoadingPeople] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Person | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    paid: "",
    fees: "",
    date: todayKey(),
    month: currentMonthKey(),
    method: "cash",
    note: "",
  });

  useEffect(() => {
    if (!open) return;
    setLoadingPeople(true);
    loadPeople().then((p) => { setPeople(p); setLoadingPeople(false); });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setSearch("");
    setSelected(prefill?.userId || prefill?.name
      ? { userId: prefill?.userId ?? null, name: prefill?.name || "", email: null, phone: prefill?.phone ?? null, fees: prefill?.fees ?? null }
      : null);
    setForm({
      name: prefill?.name || "",
      phone: prefill?.phone || "",
      paid: "",
      fees: prefill?.fees ? String(prefill.fees) : "",
      date: todayKey(),
      month: prefill?.periodMonth || currentMonthKey(),
      method: "cash",
      note: "",
    });
  }, [open, prefill]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [] as Person[];
    return people
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        (p.email || "").toLowerCase().includes(q) ||
        (p.phone || "").includes(q))
      .slice(0, 8);
  }, [people, search]);

  const pick = (p: Person) => {
    setSelected(p);
    setSearch("");
    setForm((f) => ({
      ...f,
      name: p.name,
      phone: p.phone || f.phone,
      fees: p.fees ? String(p.fees) : f.fees,
    }));
  };

  const paidNum = parseFloat(form.paid) || 0;
  const feesNum = parseFloat(form.fees) || 0;
  const remaining = Math.max(0, (feesNum || paidNum) - paidNum);

  const save = async () => {
    if (!form.name.trim()) {
      toast({ title: "Add a name", description: "Choose a person or type a name.", variant: "destructive" });
      return;
    }
    if (paidNum <= 0) {
      toast({ title: "Add the amount paid", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.rpc("record_payment", {
      _user_id: selected?.userId ?? null,
      _student_name: form.name.trim(),
      _phone_number: form.phone || null,
      _fees: feesNum || paidNum,
      _paid_fees: paidNum,
      _payment_date: new Date(`${form.date}T12:00:00`).toISOString(),
      _period_month: monthKeyToDate(form.month),
      _payment_method: form.method,
      _note: form.note || null,
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Payment recorded", description: `${form.name} — ${paidNum.toLocaleString()} EGP for ${monthLabel(form.month)}.` });
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record a payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Who paid?</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search name, email or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {loadingPeople && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
            </div>
            {results.length > 0 && (
              <div className="mt-2 rounded-lg border divide-y max-h-56 overflow-y-auto">
                {results.map((p, i) => (
                  <button
                    key={`${p.userId || "x"}-${p.email || i}`}
                    type="button"
                    onClick={() => pick(p)}
                    className="flex w-full items-center gap-3 p-2.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {p.name[0]?.toUpperCase() || <UserRound className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{p.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">{p.email || p.phone || "No contact"}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            {selected && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
                <Check className="h-3.5 w-3.5" /> Linked to {selected.name}{selected.email ? ` (${selected.email})` : ""}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Name on receipt</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <Label>Amount paid (EGP)</Label>
              <Input type="number" min="0" value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })} />
            </div>
            <div>
              <Label>Total fee (optional)</Label>
              <Input type="number" min="0" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} />
            </div>
            <div>
              <Label>Payment date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <Label>Month covered</Label>
              <Input type="month" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
            </div>
            <div>
              <Label>Method</Label>
              <select
                value={form.method}
                onChange={(e) => setForm({ ...form, method: e.target.value })}
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <Label>Note</Label>
              <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Optional" />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3 text-sm">
            Remaining after this payment:{" "}
            <span className={remaining > 0 ? "font-semibold text-destructive" : "font-semibold text-emerald-600"}>
              {remaining.toLocaleString()} EGP
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={save} disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
