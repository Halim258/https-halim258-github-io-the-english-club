import { useMemo, useState } from "react";
import { CalendarDays, CircleDollarSign, AlertTriangle, MessageCircle, Plus, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { PAYMENT_METHODS, currentMonthKey, monthLabel, type PaymentPrefill } from "./PaymentDialog";

interface Props {
  receipts: any[];
  schoolStudents: any[];
  onRecord: (prefill: PaymentPrefill) => void;
}

const GOAL_KEY = "admin.payments.defaultMonthlyFee.v1";
const methodLabel = (v: string | null) =>
  PAYMENT_METHODS.find((m) => m.value === v)?.label || (v ? v : "—");

const monthKeyOf = (value: string | null) => (value ? String(value).slice(0, 7) : null);

export default function MonthlyCollection({ receipts, schoolStudents, onRecord }: Props) {
  const [month, setMonth] = useState(currentMonthKey());
  const [defaultFee, setDefaultFee] = useState<string>(() => localStorage.getItem(GOAL_KEY) || "500");

  const saveDefaultFee = (v: string) => {
    setDefaultFee(v);
    localStorage.setItem(GOAL_KEY, v);
  };

  const monthReceipts = useMemo(
    () => receipts.filter((r) => {
      const key = monthKeyOf(r.period_month) || monthKeyOf(r.reservation_date);
      return key === month;
    }),
    [receipts, month]
  );

  const activeStudents = useMemo(
    () => schoolStudents.filter((s) => !s.status || String(s.status).toLowerCase() === "active"),
    [schoolStudents]
  );

  const paidKeys = useMemo(() => {
    const ids = new Set<string>();
    const names = new Set<string>();
    monthReceipts.forEach((r) => {
      if (r.user_id) ids.add(r.user_id);
      if (r.student_name) names.add(String(r.student_name).trim().toLowerCase());
    });
    return { ids, names };
  }, [monthReceipts]);

  const isPaid = (s: any) =>
    (s.user_id && paidKeys.ids.has(s.user_id)) ||
    (s.name && paidKeys.names.has(String(s.name).trim().toLowerCase()));

  const unpaid = useMemo(() => activeStudents.filter((s) => !isPaid(s)), [activeStudents, paidKeys]);

  const collected = monthReceipts.reduce((sum, r) => sum + (Number(r.paid_fees) || 0), 0);
  const fallbackFee = parseFloat(defaultFee) || 0;
  const expected = activeStudents.reduce((sum, s) => sum + (Number(s.fees) || fallbackFee), 0);
  const missing = Math.max(0, expected - collected);
  const progress = expected > 0 ? Math.min(100, Math.round((collected / expected) * 100)) : 0;

  const now = new Date();
  const isCurrentMonth = month === currentMonthKey();
  const late = isCurrentMonth && now.getDate() > 7;

  const remind = (s: any) => {
    const phone = s.phone_number || s.whatsapp;
    if (!phone) return;
    const msg = `Hello ${s.name || ""}, this is The English Club. This is a friendly reminder about your ${monthLabel(month)} fees. Thank you!`;
    window.open(getWhatsAppUrl({ phone, message: msg }), "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header + month picker */}
      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <CalendarDays className="h-5 w-5 text-primary" /> Monthly collection
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Who has paid for {monthLabel(month)} and who still owes.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <Label className="text-xs">Month</Label>
              <Input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="w-[160px]" />
            </div>
            <div>
              <Label className="text-xs">Default fee (EGP)</Label>
              <Input
                type="number"
                min="0"
                value={defaultFee}
                onChange={(e) => saveDefaultFee(e.target.value)}
                className="w-[130px]"
              />
            </div>
            <Button onClick={() => onRecord({ periodMonth: month })}>
              <Plus className="mr-2 h-4 w-4" /> Record payment
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Collected", value: collected, color: "text-emerald-600" },
            { label: "Expected", value: expected, color: "text-foreground" },
            { label: "Still missing", value: missing, color: "text-destructive" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border bg-background p-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`font-display text-xl font-bold ${c.color}`}>{c.value.toLocaleString()} EGP</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">
            {progress}% of {monthLabel(month)} fees collected · {monthReceipts.length} payments · {unpaid.length} students not paid yet
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Paid */}
        <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
            <CircleDollarSign className="h-4 w-4 text-emerald-600" />
            <h4 className="text-sm font-semibold">Paid this month ({monthReceipts.length})</h4>
          </div>
          <div className="max-h-[420px] divide-y overflow-y-auto">
            {monthReceipts.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">No payments recorded for {monthLabel(month)} yet.</p>
            )}
            {monthReceipts.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{r.student_name || "—"}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.reservation_date ? new Date(r.reservation_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}
                    {" · "}{methodLabel(r.payment_method)}
                    {r.user_id ? " · linked account" : ""}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold text-emerald-600">
                  {(Number(r.paid_fees) || 0).toLocaleString()} EGP
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Unpaid */}
        <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
            <AlertTriangle className={`h-4 w-4 ${late ? "text-destructive" : "text-amber-500"}`} />
            <h4 className="text-sm font-semibold">Not paid yet ({unpaid.length})</h4>
            {late && (
              <span className="ml-auto rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive">
                Late
              </span>
            )}
          </div>
          <div className="max-h-[420px] divide-y overflow-y-auto">
            {unpaid.length === 0 && (
              <p className="flex items-center gap-2 p-4 text-sm text-emerald-600">
                <Check className="h-4 w-4" /> Everyone has paid for {monthLabel(month)}.
              </p>
            )}
            {unpaid.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{s.name || "—"}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.phone_number || s.whatsapp || s.email || "No contact"}
                    {" · "}{(Number(s.fees) || fallbackFee).toLocaleString()} EGP due
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {(s.phone_number || s.whatsapp) && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remind(s)} title="WhatsApp reminder">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => onRecord({
                      userId: s.user_id ?? null,
                      name: s.name || "",
                      phone: s.phone_number || s.whatsapp || "",
                      fees: s.fees ?? fallbackFee,
                      periodMonth: month,
                    })}
                  >
                    Record
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
