import { useEffect, useMemo, useState } from "react";
import { Search, Loader2, UserPlus, Check, SkipForward, Download, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RECEIPT_ITEMS, receiptItem } from "@/data/receipt-items";
import { PAYMENT_METHODS, currentMonthKey, monthKeyToDate } from "./PaymentDialog";
import { downloadReceiptPdf, receiptQrDataUrl, receiptShareUrl } from "@/lib/receipt-pdf";

export interface StudentLite {
  id: string;
  name: string;
  phone_number?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  student_number?: number | null;
  student_id_legacy?: number | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: StudentLite[];
  receipts: any[];
  onSaved: () => void;
}

const todayKey = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  number: "",
  itemKey: "membership_beginner",
  price: "500",
  paid: "500",
  method: "cash",
  date: todayKey(),
  month: currentMonthKey(),
  note: "",
  faulty: false,
  settles: "",
  newName: "",
  newPhone: "",
  givenBy: "",
};


export default function NewReceiptDialog({ open, onOpenChange, students, receipts, onSaved }: Props) {
  const { toast } = useToast();
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<StudentLite | null>(null);
  const [newMode, setNewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<{ number: number; token: string } | null>(null);
  const [qr, setQr] = useState<string>("");
  const [issuers, setIssuers] = useState<string[]>([]);
  const [addingIssuer, setAddingIssuer] = useState(false);
  const [newIssuer, setNewIssuer] = useState("");

  const loadIssuers = async (pick?: string) => {
    const { data } = await supabase.from("receipt_issuers").select("name").eq("active", true).order("name");
    const names = (data || []).map((r: any) => r.name as string);
    setIssuers(names);
    setForm((f) => ({ ...f, givenBy: pick || f.givenBy || names[0] || "" }));
  };

  useEffect(() => {
    if (!open) return;
    setForm(emptyForm);
    setSearch("");
    setSelected(null);
    setNewMode(false);
    setDone(null);
    setQr("");
    setAddingIssuer(false);
    setNewIssuer("");
    void loadIssuers();
    supabase.rpc("next_receipt_number").then(({ data }) => {
      if (typeof data === "number") setForm((f) => ({ ...f, number: String(data) }));
    });
  }, [open]);

  const addIssuer = async () => {
    const name = newIssuer.trim();
    if (!name) return;
    const { error } = await supabase.from("receipt_issuers").insert({ name });
    if (error && !error.message.includes("duplicate")) {
      toast({ title: "Could not add the person", description: error.message, variant: "destructive" });
      return;
    }
    setNewIssuer("");
    setAddingIssuer(false);
    await loadIssuers(name);
  };


  const item = receiptItem(form.itemKey)!;

  const pickItem = (key: string) => {
    const it = receiptItem(key)!;
    setForm((f) => ({
      ...f,
      itemKey: key,
      settles: "",
      price: it.price != null ? String(it.price) : "",
      paid: it.price != null ? String(it.price) : "",
    }));
  };

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [] as StudentLite[];
    return students
      .filter((s) =>
        (s.name || "").toLowerCase().includes(q) ||
        (s.phone_number || "").includes(q) ||
        (s.whatsapp || "").includes(q) ||
        String(s.student_number ?? "").includes(q) ||
        String(s.student_id_legacy ?? "").includes(q) ||
        s.id.toLowerCase().startsWith(q))
      .slice(0, 8);
  }, [students, search]);

  const unpaid = useMemo(() => {
    if (!selected) return [] as any[];
    return receipts.filter(
      (r) => r.student_record_id === selected.id && (r.remaining_fees || 0) > 0 && r.status !== "faulty"
    );
  }, [receipts, selected]);

  const save = async () => {
    if (!form.faulty) {
      if (!selected && !(newMode && form.newName.trim() && form.newPhone.trim())) {
        toast({ title: "Choose a student", description: "Search for a student or add a new one with a phone number.", variant: "destructive" });
        return;
      }
      if (item.settlement && !form.settles) {
        toast({ title: "Choose the older receipt to settle", variant: "destructive" });
        return;
      }
    }
    setSaving(true);
    const { data, error } = await supabase.rpc("create_receipt", {
      _item_key: form.itemKey,
      _paid: parseFloat(form.paid) || 0,
      _receipt_number: form.number ? parseInt(form.number, 10) : null,
      _student_record_id: selected?.id ?? null,
      _new_student_name: newMode ? form.newName.trim() : null,
      _new_student_phone: newMode ? form.newPhone.trim() : null,
      _price: form.price ? parseFloat(form.price) : null,
      _payment_method: form.method,
      _payment_date: new Date(`${form.date}T12:00:00`).toISOString(),
      _period_month: monthKeyToDate(form.month),
      _note: form.note || null,
      _settles_receipt_id: form.settles || null,
      _status: form.faulty ? "faulty" : "issued",
    });
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    const row: any = Array.isArray(data) ? data[0] : data;
    onSaved();
    if (form.faulty) {
      toast({ title: `Receipt #${row?.receipt_number} marked faulty` });
      onOpenChange(false);
      return;
    }
    setDone({ number: row?.receipt_number, token: row?.public_token });
    setQr(await receiptQrDataUrl(row?.public_token));
    toast({ title: `Receipt #${row?.receipt_number} saved` });
  };

  const savedReceipt = () => receipts.find((r) => r.receipt_number === done?.number);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{done ? `Receipt #${done.number}` : "New receipt"}</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="space-y-4 text-center">
            {qr && <img src={qr} alt="Receipt QR code" className="mx-auto h-44 w-44 rounded-lg border bg-white p-2" />}
            <p className="text-sm text-muted-foreground">
              The student can scan this code to open and download their receipt.
            </p>
            <p className="break-all text-xs text-muted-foreground">{receiptShareUrl(done.token)}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(receiptShareUrl(done.token))}>
                <QrCode className="mr-1.5 h-4 w-4" /> Copy link
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  downloadReceiptPdf({
                    ...(savedReceipt() || {}),
                    receipt_number: done.number,
                    public_token: done.token,
                    student_name: selected?.name || form.newName,
                    phone_number: selected?.phone_number || form.newPhone,
                    item_label: item.label,
                    fees: parseFloat(form.price) || parseFloat(form.paid) || 0,
                    paid_fees: parseFloat(form.paid) || 0,
                    remaining_fees: Math.max((parseFloat(form.price) || 0) - (parseFloat(form.paid) || 0), 0),
                    payment_method: form.method,
                    note: form.note,
                    issued_at: new Date(`${form.date}T12:00:00`).toISOString(),
                  })
                }
              >
                <Download className="mr-1.5 h-4 w-4" /> Download PDF
              </Button>
            </div>
            <Button variant="ghost" className="w-full" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* number */}
            <div className="grid grid-cols-[1fr_auto] items-end gap-2">
              <div>
                <Label>Receipt number</Label>
                <Input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} inputMode="numeric" />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setForm((f) => ({ ...f, number: String((parseInt(f.number, 10) || 2500) + 1) }))}
              >
                <SkipForward className="mr-1.5 h-4 w-4" /> Skip
              </Button>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4 accent-primary" checked={form.faulty}
                onChange={(e) => setForm({ ...form, faulty: e.target.checked })} />
              Mark this number as faulty (nothing is collected)
            </label>

            {!form.faulty && (
              <>
                {/* student */}
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label>Student</Label>
                    <button type="button" onClick={() => { setNewMode((v) => !v); setSelected(null); }}
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      <UserPlus className="h-3.5 w-3.5" /> {newMode ? "Search instead" : "Add new student"}
                    </button>
                  </div>

                  {newMode ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Full name" value={form.newName} onChange={(e) => setForm({ ...form, newName: e.target.value })} />
                      <Input placeholder="Phone number" value={form.newPhone} onChange={(e) => setForm({ ...form, newPhone: e.target.value })} />
                      <p className="col-span-2 text-xs text-muted-foreground">
                        The student is added to the database now and linked to their account when they sign up with this phone number.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input className="pl-9" placeholder="Search name, phone or student number…"
                          value={search} onChange={(e) => setSearch(e.target.value)} />
                      </div>
                      {results.length > 0 && (
                        <div className="mt-2 max-h-52 divide-y overflow-y-auto rounded-lg border">
                          {results.map((s) => (
                            <button key={s.id} type="button"
                              onClick={() => { setSelected(s); setSearch(""); }}
                              className="flex w-full items-center justify-between gap-3 p-2.5 text-left transition-colors hover:bg-muted/50">
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium">{s.name}</span>
                                <span className="block truncate text-xs text-muted-foreground">
                                  {s.phone_number || s.whatsapp || s.email || "No contact"}
                                </span>
                              </span>
                              <span className="text-xs text-muted-foreground">#{s.student_number ?? s.student_id_legacy ?? "—"}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      {selected && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600">
                          <Check className="h-3.5 w-3.5" /> {selected.name}
                          {selected.phone_number ? ` · ${selected.phone_number}` : ""}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* item */}
                <div>
                  <Label>Item of purchase</Label>
                  <select value={form.itemKey} onChange={(e) => pickItem(e.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    {RECEIPT_ITEMS.map((i) => (
                      <option key={i.key} value={i.key}>
                        {i.label}{i.price != null ? ` — ${i.price} EGP` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {item.settlement && (
                  <div>
                    <Label>Older unpaid receipt to close</Label>
                    <select value={form.settles} onChange={(e) => {
                      const r = unpaid.find((u) => u.id === e.target.value);
                      setForm((f) => ({ ...f, settles: e.target.value, paid: r ? String(r.remaining_fees) : f.paid, price: r ? String(r.remaining_fees) : f.price }));
                    }} disabled={!selected}
                      className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                      <option value="">{selected ? "Choose a receipt…" : "Choose a student first"}</option>
                      {unpaid.map((r) => (
                        <option key={r.id} value={r.id}>
                          #{r.receipt_number} · {r.item_label || "Payment"} · {Number(r.remaining_fees).toLocaleString()} EGP left
                        </option>
                      ))}
                    </select>
                    {selected && unpaid.length === 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">This student has no unpaid receipts.</p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Price (EGP)</Label>
                    <Input type="number" min="0" value={form.price} disabled={item.fixed}
                      onChange={(e) => setForm({ ...form, price: e.target.value, paid: e.target.value })} />
                    {item.fixed && <p className="mt-1 text-xs text-muted-foreground">Fixed price</p>}
                  </div>
                  <div>
                    <Label>Amount paid now</Label>
                    <Input type="number" min="0" value={form.paid} onChange={(e) => setForm({ ...form, paid: e.target.value })} />
                  </div>
                  <div>
                    <Label>Date</Label>
                    <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <Label>Month covered</Label>
                    <Input type="month" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} />
                  </div>
                  <div>
                    <Label>Method</Label>
                    <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}
                      className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
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
                  <span className={(parseFloat(form.price) || 0) - (parseFloat(form.paid) || 0) > 0 ? "font-semibold text-destructive" : "font-semibold text-emerald-600"}>
                    {Math.max((parseFloat(form.price) || 0) - (parseFloat(form.paid) || 0), 0).toLocaleString()} EGP
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {!done && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {form.faulty ? "Save as faulty" : "Save receipt"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
