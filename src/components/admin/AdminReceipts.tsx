import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, ChevronLeft, ChevronRight, Plus, QrCode, Download, Ban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DetailSheet from "./DetailSheet";
import NewReceiptDialog, { StudentLite } from "./NewReceiptDialog";
import { receiptItemLabel } from "@/data/receipt-items";
import { downloadReceiptPdf, receiptQrDataUrl, receiptShareUrl } from "@/lib/receipt-pdf";

interface Props {
  receipts: any[];
  students?: StudentLite[];
  onRefresh: () => void;
}

const emptyForm = { receipt_number: "", student_name: "", phone_number: "", fees: "", paid_fees: "" };

export default function AdminReceipts({ receipts, students = [], onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "paid" | "remaining" | "faulty">("all");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [newOpen, setNewOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [qrFor, setQrFor] = useState<any | null>(null);
  const [qrImg, setQrImg] = useState("");
  const perPage = 50;
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let list = receipts;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.student_name?.toLowerCase().includes(q) ||
          r.phone_number?.toLowerCase().includes(q) ||
          String(r.receipt_number || "").includes(q)
      );
    }
    if (filterBy === "paid") list = list.filter((r) => (r.remaining_fees || 0) === 0 && r.status !== "faulty");
    if (filterBy === "remaining") list = list.filter((r) => (r.remaining_fees || 0) > 0 && r.status !== "faulty");
    if (filterBy === "faulty") list = list.filter((r) => r.status === "faulty");
    return list;
  }, [receipts, search, filterBy]);

  const live = filtered.filter((r) => r.status !== "faulty");
  const totalFees = live.reduce((s: number, r: any) => s + (r.fees || 0), 0);
  const totalPaid = live.reduce((s: number, r: any) => s + (r.paid_fees || 0), 0);
  const totalRemaining = live.reduce((s: number, r: any) => s + (r.remaining_fees || 0), 0);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const openEdit = (r: any) => {
    setEditId(r.id);
    setForm({
      receipt_number: String(r.receipt_number ?? ""),
      student_name: r.student_name || "",
      phone_number: r.phone_number || "",
      fees: String(r.fees || 0),
      paid_fees: String(r.paid_fees || 0),
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const fees = parseFloat(form.fees) || 0;
    const paid_fees = parseFloat(form.paid_fees) || 0;
    const { error } = await supabase.from("school_receipts").update({
      receipt_number: form.receipt_number ? parseInt(form.receipt_number, 10) : null,
      student_name: form.student_name || null,
      phone_number: form.phone_number || null,
      fees,
      paid_fees,
      remaining_fees: Math.max(fees - paid_fees, 0),
    }).eq("id", editId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Receipt updated" });
      setEditOpen(false);
      setEditId(null);
      setForm(emptyForm);
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_receipts").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Receipt deleted" }); onRefresh(); }
  };

  const setStatus = async (r: any, status: "issued" | "faulty") => {
    const { error } = await supabase.from("school_receipts").update({ status }).eq("id", r.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: status === "faulty" ? `#${r.receipt_number} marked faulty` : `#${r.receipt_number} restored` }); onRefresh(); }
  };

  const toggleOne = (id: string) =>
    setSelectedIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const bulkAction = async (action: "faulty" | "delete") => {
    if (!selectedIds.length) return;
    const { error } = action === "delete"
      ? await supabase.from("school_receipts").delete().in("id", selectedIds)
      : await supabase.from("school_receipts").update({ status: "faulty" }).in("id", selectedIds);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `${selectedIds.length} receipt(s) updated` }); setSelectedIds([]); onRefresh(); }
  };

  const showQr = async (r: any) => {
    setQrFor(r);
    setQrImg(await receiptQrDataUrl(r.public_token));
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Fees", value: totalFees, color: "text-foreground" },
          { label: "Total Paid", value: totalPaid, color: "text-emerald-600" },
          { label: "Remaining", value: totalRemaining, color: "text-destructive" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className={`text-xl font-bold font-display ${c.color}`}>{c.value.toLocaleString()} ج.م</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, phone, or receipt #..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["all", "paid", "remaining", "faulty"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterBy(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                filterBy === f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "remaining" ? "Has Balance" : f}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setNewOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> New receipt
        </Button>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input type="checkbox" className="h-4 w-4 accent-primary"
            checked={paged.length > 0 && paged.every((r) => selectedIds.includes(r.id))}
            onChange={(e) => setSelectedIds(e.target.checked ? paged.map((r) => r.id) : [])} />
          Select all
        </label>
        <span className="text-xs text-muted-foreground">{filtered.length} receipts</span>
        {selectedIds.length > 0 && (
          <>
            <span className="text-xs font-semibold">{selectedIds.length} selected</span>
            <Button size="sm" variant="outline" onClick={() => bulkAction("faulty")}>Mark faulty</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete {selectedIds.length} receipts</AlertDialogTitle>
                  <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => bulkAction("delete")} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <button onClick={() => setSelectedIds([])} className="text-xs text-muted-foreground hover:underline">Clear</button>
          </>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Receipt</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Receipt number</Label><Input value={form.receipt_number} onChange={e => setForm({...form, receipt_number: e.target.value})} inputMode="numeric" /></div>
            <div><Label>Student Name</Label><Input value={form.student_name} onChange={e => setForm({...form, student_name: e.target.value})} /></div>
            <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Fees</Label><Input type="number" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} /></div>
              <div><Label>Paid</Label><Input type="number" value={form.paid_fees} onChange={e => setForm({...form, paid_fees: e.target.value})} /></div>
            </div>
          </div>
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-3 text-left">Sel</th>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-right">Fees</th>
                <th className="p-3 text-right">Paid</th>
                <th className="p-3 text-right">Remaining</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((r: any) => (
                <tr key={r.id} className={`border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer ${r.status === "faulty" ? "opacity-60" : ""}`} onClick={() => setSelectedReceipt(r)}>
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="h-4 w-4 accent-primary" checked={selectedIds.includes(r.id)}
                      onChange={() => toggleOne(r.id)} aria-label="Select receipt" />
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {r.receipt_number || "—"}
                    {r.status === "faulty" && <span className="ml-1 text-[10px] font-bold uppercase text-destructive">faulty</span>}
                  </td>
                  <td className="p-3 font-medium text-primary hover:underline">{r.student_name || "—"}</td>
                  <td className="p-3 text-xs text-muted-foreground">{receiptItemLabel(r.item_key, r.item_label)}</td>
                  <td className="p-3 text-right font-medium">{(r.fees || 0).toLocaleString()}</td>
                  <td className="p-3 text-right text-emerald-600 font-medium">{(r.paid_fees || 0).toLocaleString()}</td>
                  <td className={`p-3 text-right font-medium ${(r.remaining_fees || 0) > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {(r.remaining_fees || 0).toLocaleString()}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {r.reservation_date ? new Date(r.reservation_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                      {r.public_token && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="QR code" onClick={() => showQr(r)}>
                          <QrCode className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Download PDF" onClick={() => downloadReceiptPdf(r)}>
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" title={r.status === "faulty" ? "Restore" : "Mark faulty"}
                        onClick={() => setStatus(r, r.status === "faulty" ? "issued" : "faulty")}>
                        <Ban className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(r)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Receipt</AlertDialogTitle>
                            <AlertDialogDescription>Delete receipt #{r.receipt_number} for "{r.student_name}"? This cannot be undone.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(r.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} receipts)</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <NewReceiptDialog
        open={newOpen}
        onOpenChange={setNewOpen}
        students={students}
        receipts={receipts}
        onSaved={onRefresh}
      />

      <Dialog open={!!qrFor} onOpenChange={(o) => { if (!o) { setQrFor(null); setQrImg(""); } }}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader><DialogTitle>Receipt #{qrFor?.receipt_number}</DialogTitle></DialogHeader>
          {qrImg && <img src={qrImg} alt="Receipt QR code" className="mx-auto h-48 w-48 rounded-lg border bg-white p-2" />}
          <p className="break-all text-xs text-muted-foreground">{receiptShareUrl(qrFor?.public_token)}</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(receiptShareUrl(qrFor?.public_token))}>Copy link</Button>
            <Button size="sm" onClick={() => qrFor && downloadReceiptPdf(qrFor)}>
              <Download className="mr-1.5 h-4 w-4" /> PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <DetailSheet
        open={!!selectedReceipt}
        onOpenChange={(open) => { if (!open) setSelectedReceipt(null); }}
        title={selectedReceipt?.student_name || "Receipt"}
        subtitle={selectedReceipt?.receipt_number ? `Receipt #${selectedReceipt.receipt_number}` : undefined}
        avatar={selectedReceipt?.student_name?.[0]?.toUpperCase()}
        fields={selectedReceipt ? [
          { label: "Receipt #", value: selectedReceipt.receipt_number },
          { label: "Student Name", value: selectedReceipt.student_name },
          { label: "Phone", value: selectedReceipt.phone_number, type: "phone" as const },
          { label: "Item", value: receiptItemLabel(selectedReceipt.item_key, selectedReceipt.item_label) },
          { label: "Status", value: selectedReceipt.status },
          { label: "Total Fees", value: selectedReceipt.fees, type: "currency" as const },
          { label: "Paid Fees", value: selectedReceipt.paid_fees, type: "currency" as const },
          { label: "Remaining", value: selectedReceipt.remaining_fees, type: "currency" as const },
          { label: "Method", value: selectedReceipt.payment_method },
          { label: "Note", value: selectedReceipt.note },
          { label: "Reservation Date", value: selectedReceipt.reservation_date, type: "date" as const },
        ] : []}
      />
    </div>
  );
}
