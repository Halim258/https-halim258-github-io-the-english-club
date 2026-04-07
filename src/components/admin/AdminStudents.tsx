import { useState, useMemo } from "react";
import { Search, Plus, Users, Pencil, Trash2, ChevronLeft, ChevronRight, Download, Filter, ArrowUpDown } from "lucide-react";
import CsvImport from "./CsvImport";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DetailSheet from "./DetailSheet";

interface Student {
  id: string;
  name: string;
  phone_number: string | null;
  email: string | null;
  whatsapp: string | null;
  status: string | null;
  group_id: number | null;
  fees: number | null;
  paid_fees: number | null;
  remaining_fees: number | null;
  placement_test_result: string | null;
  membership: string | null;
  created_at: string | null;
  reservation_date: string | null;
  birth_date: string | null;
  address: string | null;
  notes: string | null;
  preferred_time: string | null;
  preferred_activity: string | null;
  other_interests: string | null;
  access_method: string | null;
  student_number: number | null;
  reference_number: string | null;
}

interface Props {
  students: Student[];
  onRefresh: () => void;
}

type SortField = "name" | "fees" | "remaining_fees" | "created_at";

const emptyForm = { name: "", phone_number: "", whatsapp: "", email: "", status: "active", fees: "", paid_fees: "", group_id: "", membership: "", placement_test_result: "", address: "", birth_date: "", preferred_time: "", preferred_activity: "", other_interests: "", access_method: "", notes: "" };

export default function AdminStudents({ students, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const perPage = 25;
  const { toast } = useToast();

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    let list = students;
    if (statusFilter !== "all") list = list.filter(s => s.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || (s.phone_number || "").includes(q) || (s.email || "").toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "fees") cmp = (a.fees || 0) - (b.fees || 0);
      else if (sortField === "remaining_fees") cmp = (a.remaining_fees || 0) - (b.remaining_fees || 0);
      else if (sortField === "created_at") cmp = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
      return sortDir === "desc" ? -cmp : cmp;
    });
    return list;
  }, [students, search, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-700",
    inactive: "bg-red-500/10 text-red-700",
    graduated: "bg-blue-500/10 text-blue-700",
  };

  const handleAdd = async () => {
    if (!form.name) { toast({ title: "Name is required", variant: "destructive" }); return; }
    const fees = parseFloat(form.fees) || 0;
    const paid_fees = parseFloat(form.paid_fees) || 0;
    const { error } = await supabase.from("school_students").insert({
      name: form.name, phone_number: form.phone_number || null, whatsapp: form.whatsapp || null,
      email: form.email || null, status: form.status, fees, paid_fees, remaining_fees: fees - paid_fees,
      group_id: form.group_id ? parseInt(form.group_id) : null, membership: form.membership || null,
      placement_test_result: form.placement_test_result || null, address: form.address || null,
      birth_date: form.birth_date ? new Date(form.birth_date).toISOString() : null,
      preferred_time: form.preferred_time || null, preferred_activity: form.preferred_activity || null,
      other_interests: form.other_interests || null, access_method: form.access_method || null,
      notes: form.notes || null, reservation_date: new Date().toISOString(),
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "✅ Student added successfully!" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (s: Student) => {
    setEditId(s.id);
    setForm({
      name: s.name, phone_number: s.phone_number || "", whatsapp: s.whatsapp || "",
      email: s.email || "", status: s.status || "active", fees: String(s.fees || 0), paid_fees: String(s.paid_fees || 0),
      group_id: s.group_id ? String(s.group_id) : "", membership: s.membership || "",
      placement_test_result: s.placement_test_result || "", address: s.address || "",
      birth_date: s.birth_date ? new Date(s.birth_date).toISOString().split("T")[0] : "",
      preferred_time: s.preferred_time || "", preferred_activity: s.preferred_activity || "",
      other_interests: s.other_interests || "", access_method: s.access_method || "", notes: s.notes || "",
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId || !form.name) return;
    const fees = parseFloat(form.fees) || 0;
    const paid_fees = parseFloat(form.paid_fees) || 0;
    const { error } = await supabase.from("school_students").update({
      name: form.name, phone_number: form.phone_number || null, whatsapp: form.whatsapp || null,
      email: form.email || null, status: form.status, fees, paid_fees, remaining_fees: fees - paid_fees,
      group_id: form.group_id ? parseInt(form.group_id) : null, membership: form.membership || null,
      placement_test_result: form.placement_test_result || null, address: form.address || null,
      birth_date: form.birth_date ? new Date(form.birth_date).toISOString() : null,
      preferred_time: form.preferred_time || null, preferred_activity: form.preferred_activity || null,
      other_interests: form.other_interests || null, access_method: form.access_method || null,
      notes: form.notes || null,
    }).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Student updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_students").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Student deleted" }); onRefresh(); }
  };

  const totalFees = students.reduce((s, st) => s + (st.fees || 0), 0);
  const totalPaid = students.reduce((s, st) => s + (st.paid_fees || 0), 0);
  const totalRemaining = students.reduce((s, st) => s + (st.remaining_fees || 0), 0);
  const activeCount = students.filter(s => s.status === "active").length;

  const remaining = (parseFloat(form.fees) || 0) - (parseFloat(form.paid_fees) || 0);

  const formFields = (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      {/* Basic Info */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">👤 Basic Info</p>
        <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Student full name" autoFocus /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} placeholder="01xxxxxxxxx" /></div>
          <div><Label>WhatsApp</Label><Input value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} placeholder="01xxxxxxxxx" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" /></div>
          <div><Label>Birth Date</Label><Input type="date" value={form.birth_date} onChange={e => setForm({...form, birth_date: e.target.value})} /></div>
        </div>
        <div><Label>Address</Label><Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="City, area..." /></div>
      </div>

      {/* Academic */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">📚 Academic</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>Status</Label>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
          <div>
            <Label>Level</Label>
            <select value={form.placement_test_result} onChange={e => setForm({...form, placement_test_result: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">—</option>
              {["A1","A2","B1","B2","C1","C2"].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div><Label>Group ID</Label><Input type="number" value={form.group_id} onChange={e => setForm({...form, group_id: e.target.value})} placeholder="#" /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Membership</Label>
            <select value={form.membership} onChange={e => setForm({...form, membership: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">—</option>
              <option value="member">Member</option>
              <option value="non-member">Non-Member</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <div>
            <Label>Access Method</Label>
            <select value={form.access_method} onChange={e => setForm({...form, access_method: e.target.value})} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">—</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Referral">Referral</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">💰 Fees</p>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>Total Fees</Label><Input type="number" value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} placeholder="0" /></div>
          <div><Label>Paid</Label><Input type="number" value={form.paid_fees} onChange={e => setForm({...form, paid_fees: e.target.value})} placeholder="0" /></div>
          <div>
            <Label>Remaining</Label>
            <div className={`flex h-10 items-center rounded-md border px-3 text-sm font-mono font-bold ${remaining > 0 ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/20 dark:border-red-800" : "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800"}`}>
              {remaining.toLocaleString()} ج.م
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">⭐ Preferences</p>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Preferred Time</Label><Input value={form.preferred_time} onChange={e => setForm({...form, preferred_time: e.target.value})} placeholder="Morning, Evening..." /></div>
          <div><Label>Preferred Activity</Label><Input value={form.preferred_activity} onChange={e => setForm({...form, preferred_activity: e.target.value})} placeholder="Speaking, Grammar..." /></div>
        </div>
        <div><Label>Other Interests</Label><Input value={form.other_interests} onChange={e => setForm({...form, other_interests: e.target.value})} placeholder="IELTS, Business..." /></div>
      </div>

      {/* Notes */}
      <div>
        <Label>Notes</Label>
        <textarea
          value={form.notes}
          onChange={e => setForm({...form, notes: e.target.value})}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px] resize-y"
          placeholder="Any additional notes about the student..."
        />
      </div>
    </div>
  );

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th className="p-3 cursor-pointer hover:text-foreground transition-colors" onClick={() => toggleSort(field)}>
      <span className="flex items-center gap-1">{children}<ArrowUpDown className="h-3 w-3" /></span>
    </th>
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Students", value: students.length, icon: Users, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "Active", value: activeCount, icon: Users, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Total Fees", value: `${totalFees.toLocaleString()} ج.م`, icon: Filter, color: "text-primary", bg: "bg-primary/10" },
          { label: "Outstanding", value: `${totalRemaining.toLocaleString()} ج.م`, icon: Filter, color: "text-red-600", bg: "bg-red-500/10" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-lg font-bold font-display">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, phone, email..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {["all", "active", "inactive", "graduated"].map(f => (
            <button key={f} onClick={() => { setStatusFilter(f); setPage(0); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${statusFilter === f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <CsvImport
            table="school_students"
            label="Import CSV"
            mappings={[
              { csvHeader: "name", dbField: "name", required: true },
              { csvHeader: "phone_number", dbField: "phone_number" },
              { csvHeader: "whatsapp", dbField: "whatsapp" },
              { csvHeader: "email", dbField: "email" },
              { csvHeader: "status", dbField: "status" },
              { csvHeader: "fees", dbField: "fees" },
              { csvHeader: "paid_fees", dbField: "paid_fees" },
              { csvHeader: "group_id", dbField: "group_id" },
              { csvHeader: "membership", dbField: "membership" },
              { csvHeader: "placement_test_result", dbField: "placement_test_result" },
              { csvHeader: "address", dbField: "address" },
              { csvHeader: "birth_date", dbField: "birth_date" },
              { csvHeader: "access_method", dbField: "access_method" },
              { csvHeader: "notes", dbField: "notes" },
            ]}
            transformRow={(row) => ({
              name: row.name,
              phone_number: row.phone_number || null,
              whatsapp: row.whatsapp || null,
              email: row.email || null,
              status: row.status || "active",
              fees: parseFloat(row.fees) || 0,
              paid_fees: parseFloat(row.paid_fees) || 0,
              remaining_fees: (parseFloat(row.fees) || 0) - (parseFloat(row.paid_fees) || 0),
              group_id: row.group_id ? parseInt(row.group_id) : null,
              membership: row.membership || null,
              placement_test_result: row.placement_test_result || null,
              address: row.address || null,
              birth_date: row.birth_date || null,
              access_method: row.access_method || null,
              notes: row.notes || null,
              reservation_date: new Date().toISOString(),
            })}
            onComplete={onRefresh}
          />
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
              {formFields}
              <Button onClick={handleAdd} className="w-full mt-2">Add Student</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3">#</th>
              <SortHeader field="name">Name</SortHeader>
              <th className="p-3">Phone</th>
              <th className="p-3">Group</th>
              <SortHeader field="fees">Fees</SortHeader>
              <th className="p-3">Paid</th>
              <SortHeader field="remaining_fees">Remaining</SortHeader>
              <th className="p-3">Status</th>
              <th className="p-3">Level</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((s, i) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelectedStudent(s)}>
                <td className="p-3 text-muted-foreground">{page * perPage + i + 1}</td>
                <td className="p-3 font-medium text-primary hover:underline">{s.name}</td>
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
                  <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Student</AlertDialogTitle>
                          <AlertDialogDescription>Delete "{s.name}"? This cannot be undone.</AlertDialogDescription>
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
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No students found.</p>}
      </div>

      {/* Detail Sheet */}
      <DetailSheet
        open={!!selectedStudent}
        onOpenChange={(open) => { if (!open) setSelectedStudent(null); }}
        title={selectedStudent?.name || ""}
        subtitle={selectedStudent?.status ? `Status: ${selectedStudent.status}` : undefined}
        avatar={selectedStudent?.name?.[0]?.toUpperCase()}
        fields={selectedStudent ? [
          { label: "Student #", value: selectedStudent.student_number },
          { label: "Reference #", value: selectedStudent.reference_number },
          { label: "Phone", value: selectedStudent.phone_number, type: "phone" as const },
          { label: "WhatsApp", value: selectedStudent.whatsapp, type: "phone" as const },
          { label: "Email", value: selectedStudent.email, type: "email" as const },
          { label: "Status", value: selectedStudent.status, type: "badge" as const, badgeColor: selectedStudent.status === "active" ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700" },
          { label: "Group ID", value: selectedStudent.group_id },
          { label: "Level", value: selectedStudent.placement_test_result, type: "badge" as const },
          { label: "Membership", value: selectedStudent.membership },
          { label: "Total Fees", value: selectedStudent.fees, type: "currency" as const },
          { label: "Paid Fees", value: selectedStudent.paid_fees, type: "currency" as const },
          { label: "Remaining", value: selectedStudent.remaining_fees, type: "currency" as const },
          { label: "Birth Date", value: selectedStudent.birth_date, type: "date" as const },
          { label: "Address", value: selectedStudent.address },
          { label: "Reservation Date", value: selectedStudent.reservation_date, type: "date" as const },
          { label: "Registered", value: selectedStudent.created_at, type: "date" as const },
          { label: "Preferred Time", value: selectedStudent.preferred_time },
          { label: "Preferred Activity", value: selectedStudent.preferred_activity },
          { label: "Other Interests", value: selectedStudent.other_interests },
          { label: "Access Method", value: selectedStudent.access_method },
          { label: "Notes", value: selectedStudent.notes },
        ] : []}
      />
    </div>
  );
}
