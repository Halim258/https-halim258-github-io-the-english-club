import { useState, useMemo } from "react";
import { Search, Plus, Users, Calendar, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  phone_number: string | null;
  email: string | null;
  status: string | null;
  group_id: number | null;
  fees: number | null;
  paid_fees: number | null;
  remaining_fees: number | null;
  placement_test_result: string | null;
  membership: string | null;
  created_at: string | null;
}

interface Props {
  students: Student[];
  onRefresh: () => void;
}

const emptyForm = { name: "", phone_number: "", email: "", status: "active", fees: "", paid_fees: "" };

export default function AdminStudents({ students, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const perPage = 25;
  const { toast } = useToast();

  const filtered = useMemo(() => students.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.phone_number || "").includes(search)
  ), [students, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-700",
    inactive: "bg-red-500/10 text-red-700",
    graduated: "bg-blue-500/10 text-blue-700",
  };

  const handleAdd = async () => {
    if (!form.name) return;
    const fees = parseFloat(form.fees) || 0;
    const paid_fees = parseFloat(form.paid_fees) || 0;
    const { error } = await supabase.from("school_students").insert({
      name: form.name,
      phone_number: form.phone_number || null,
      email: form.email || null,
      status: form.status,
      fees,
      paid_fees,
      remaining_fees: fees - paid_fees,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student added successfully" });
      setForm(emptyForm);
      setAddOpen(false);
      onRefresh();
    }
  };

  const openEdit = (s: Student) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      phone_number: s.phone_number || "",
      email: s.email || "",
      status: s.status || "active",
      fees: String(s.fees || 0),
      paid_fees: String(s.paid_fees || 0),
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId || !form.name) return;
    const fees = parseFloat(form.fees) || 0;
    const paid_fees = parseFloat(form.paid_fees) || 0;
    const { error } = await supabase.from("school_students").update({
      name: form.name,
      phone_number: form.phone_number || null,
      email: form.email || null,
      status: form.status,
      fees,
      paid_fees,
      remaining_fees: fees - paid_fees,
    }).eq("id", editId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student updated" });
      setEditOpen(false);
      setEditId(null);
      setForm(emptyForm);
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_students").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student deleted" });
      onRefresh();
    }
  };

  const totalFees = students.reduce((s, st) => s + (st.fees || 0), 0);
  const totalRemaining = students.reduce((s, st) => s + (st.remaining_fees || 0), 0);

  const formFields = (
    <div className="space-y-3">
      <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
      <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} /></div>
      <div><Label>Email</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Fees</Label><Input type="number" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} /></div>
        <div><Label>Paid Fees</Label><Input type="number" value={form.paid_fees} onChange={e => setForm({...form, paid_fees: e.target.value})} /></div>
      </div>
      <div><Label>Status</Label><Input value={form.status} onChange={e => setForm({...form, status: e.target.value})} placeholder="active / inactive / graduated" /></div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Students", value: students.length, icon: Users },
          { label: "Active", value: students.filter(s => s.status === "active").length, icon: Users },
          { label: "Total Fees", value: `${totalFees.toLocaleString()} ج.م`, icon: Calendar },
          { label: "Remaining", value: `${totalRemaining.toLocaleString()} ج.م`, icon: Calendar },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold font-display mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or phone..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
            {formFields}
            <Button onClick={handleAdd} className="w-full mt-2">Add Student</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3 text-right">#</th>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">الهاتف</th>
              <th className="p-3 text-right">المجموعة</th>
              <th className="p-3 text-right">الرسوم</th>
              <th className="p-3 text-right">المدفوع</th>
              <th className="p-3 text-right">المتبقي</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">المستوى</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((s, i) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="p-3 text-muted-foreground">{page * perPage + i + 1}</td>
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{s.phone_number || "—"}</td>
                <td className="p-3">{s.group_id || "—"}</td>
                <td className="p-3 font-mono">{s.fees?.toLocaleString() || 0}</td>
                <td className="p-3 font-mono text-emerald-600">{s.paid_fees?.toLocaleString() || 0}</td>
                <td className="p-3 font-mono text-destructive">{s.remaining_fees?.toLocaleString() || 0}</td>
                <td className="p-3">
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${statusColors[s.status || "active"] || "bg-muted"}`}>
                    {s.status || "active"}
                  </span>
                </td>
                <td className="p-3 text-xs">{s.placement_test_result || "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(s)}>
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
                          <AlertDialogTitle>Delete Student</AlertDialogTitle>
                          <AlertDialogDescription>Are you sure you want to delete "{s.name}"? This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(s.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} students)</p>
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
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No students found.</p>}
      </div>
    </div>
  );
}
