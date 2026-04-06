import { useState } from "react";
import { Search, Plus, Users, Phone, Mail, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export default function AdminStudents({ students, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone_number: "", email: "", status: "active" });
  const { toast } = useToast();

  const filtered = students.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.phone_number || "").includes(search)
  );

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/10 text-emerald-700",
    inactive: "bg-red-500/10 text-red-700",
    graduated: "bg-blue-500/10 text-blue-700",
  };

  const handleAdd = async () => {
    if (!form.name) return;
    const { error } = await supabase.from("school_students").insert({
      name: form.name,
      phone_number: form.phone_number || null,
      email: form.email || null,
      status: form.status,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Student added successfully" });
      setForm({ name: "", phone_number: "", email: "", status: "active" });
      setOpen(false);
      onRefresh();
    }
  };

  const totalFees = students.reduce((s, st) => s + (st.fees || 0), 0);
  const totalPaid = students.reduce((s, st) => s + (st.paid_fees || 0), 0);
  const totalRemaining = students.reduce((s, st) => s + (st.remaining_fees || 0), 0);

  return (
    <div>
      {/* Stats */}
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

      {/* Search + Add */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} /></div>
              <div><Label>Email</Label><Input value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
              <Button onClick={handleAdd} className="w-full">Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
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
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 50).map((s, i) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="p-3 text-muted-foreground">{i + 1}</td>
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3 text-muted-foreground font-mono text-xs">{s.phone_number || "—"}</td>
                <td className="p-3">{s.group_id || "—"}</td>
                <td className="p-3 font-mono">{s.fees?.toLocaleString() || 0}</td>
                <td className="p-3 font-mono text-emerald-600">{s.paid_fees?.toLocaleString() || 0}</td>
                <td className="p-3 font-mono text-red-600">{s.remaining_fees?.toLocaleString() || 0}</td>
                <td className="p-3">
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${statusColors[s.status || "active"] || "bg-muted"}`}>
                    {s.status || "active"}
                  </span>
                </td>
                <td className="p-3 text-xs">{s.placement_test_result || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 50 && (
          <p className="text-xs text-muted-foreground text-center py-2">Showing 50 of {filtered.length} students</p>
        )}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No students found.</p>}
      </div>
    </div>
  );
}
