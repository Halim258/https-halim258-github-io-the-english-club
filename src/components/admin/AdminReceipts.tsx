import { useState, useMemo } from "react";
import { Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Props {
  receipts: any[];
  onRefresh: () => void;
}

const emptyForm = { student_name: "", phone_number: "", fees: "", paid_fees: "" };

export default function AdminReceipts({ receipts, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "paid" | "remaining">("all");
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
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
    if (filterBy === "paid") list = list.filter((r) => (r.remaining_fees || 0) === 0);
    if (filterBy === "remaining") list = list.filter((r) => (r.remaining_fees || 0) > 0);
    return list;
  }, [receipts, search, filterBy]);

  const totalFees = filtered.reduce((s: number, r: any) => s + (r.fees || 0), 0);
  const totalPaid = filtered.reduce((s: number, r: any) => s + (r.paid_fees || 0), 0);
  const totalRemaining = filtered.reduce((s: number, r: any) => s + (r.remaining_fees || 0), 0);
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const openEdit = (r: any) => {
    setEditId(r.id);
    setForm({
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
      student_name: form.student_name || null,
      phone_number: form.phone_number || null,
      fees,
      paid_fees,
      remaining_fees: fees - paid_fees,
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
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Receipt deleted" });
      onRefresh();
    }
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
          {(["all", "paid", "remaining"] as const).map((f) => (
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
      </div>

      <p className="text-xs text-muted-foreground mb-3">{filtered.length} receipts</p>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Receipt</DialogTitle></DialogHeader>
          <div className="space-y-3">
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
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-right">Fees</th>
                <th className="p-3 text-right">Paid</th>
                <th className="p-3 text-right">Remaining</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((r: any) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3 text-muted-foreground">{r.receipt_number || "—"}</td>
                  <td className="p-3 font-medium">{r.student_name || "—"}</td>
                  <td className="p-3 text-muted-foreground">{r.phone_number || "—"}</td>
                  <td className="p-3 text-right font-medium">{(r.fees || 0).toLocaleString()}</td>
                  <td className="p-3 text-right text-emerald-600 font-medium">{(r.paid_fees || 0).toLocaleString()}</td>
                  <td className={`p-3 text-right font-medium ${(r.remaining_fees || 0) > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {(r.remaining_fees || 0).toLocaleString()}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {r.reservation_date ? new Date(r.reservation_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1">
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
    </div>
  );
}
