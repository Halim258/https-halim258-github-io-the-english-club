import { useState, useMemo } from "react";
import { UserPlus, Search, Plus, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Newcomer {
  id: string;
  client_name: string;
  client_number: string | null;
  access_method: string | null;
  the_date: string | null;
  reserved: boolean | null;
}

interface Props {
  newcomers: Newcomer[];
  onRefresh: () => void;
}

const emptyForm = { client_name: "", client_number: "", access_method: "", reserved: false };

export default function AdminNewcomers({ newcomers, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "reserved" | "pending">("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const perPage = 25;
  const { toast } = useToast();

  const filtered = useMemo(() => {
    let list = newcomers;
    if (filter === "reserved") list = list.filter(n => n.reserved);
    if (filter === "pending") list = list.filter(n => !n.reserved);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(n => n.client_name.toLowerCase().includes(q) || (n.client_number || "").includes(q));
    }
    return list;
  }, [newcomers, search, filter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const reservedCount = newcomers.filter(n => n.reserved).length;
  const convRate = newcomers.length > 0 ? Math.round((reservedCount / newcomers.length) * 100) : 0;

  const handleAdd = async () => {
    if (!form.client_name) return;
    const { error } = await supabase.from("school_newcomers").insert({
      client_name: form.client_name, client_number: form.client_number || null,
      access_method: form.access_method || null, reserved: form.reserved, the_date: new Date().toISOString(),
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Lead added" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (n: Newcomer) => {
    setEditId(n.id);
    setForm({ client_name: n.client_name, client_number: n.client_number || "", access_method: n.access_method || "", reserved: n.reserved || false });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from("school_newcomers").update({
      client_name: form.client_name, client_number: form.client_number || null,
      access_method: form.access_method || null, reserved: form.reserved,
    }).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_newcomers").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); onRefresh(); }
  };

  const formFields = (
    <div className="space-y-3">
      <div><Label>Name *</Label><Input value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} /></div>
      <div><Label>Phone</Label><Input value={form.client_number} onChange={e => setForm({...form, client_number: e.target.value})} /></div>
      <div><Label>Source</Label><Input value={form.access_method} onChange={e => setForm({...form, access_method: e.target.value})} placeholder="Facebook, Walk-in, Referral..." /></div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.reserved} onChange={e => setForm({...form, reserved: e.target.checked})} className="rounded" /> Enrolled / Reserved</label>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Leads", value: newcomers.length, color: "text-primary" },
          { label: "Enrolled", value: reservedCount, color: "text-emerald-600" },
          { label: "Pending", value: newcomers.length - reservedCount, color: "text-amber-600" },
          { label: "Conversion", value: `${convRate}%`, color: "text-blue-600" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-lg font-bold font-display ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["all", "reserved", "pending"] as const).map(f => (
            <button key={f} onClick={() => { setFilter(f); setPage(0); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${filter === f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {f === "reserved" ? "Enrolled" : f}
            </button>
          ))}
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild><Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Lead</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Lead</DialogTitle></DialogHeader>
            {formFields}
            <Button onClick={handleAdd} className="w-full mt-2">Add</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Lead</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save</Button>
        </DialogContent>
      </Dialog>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
              <th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Source</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(n => (
              <tr key={n.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="p-3 font-medium">{n.client_name}</td>
                <td className="p-3 font-mono text-xs">{n.client_number || "—"}</td>
                <td className="p-3 text-xs">{n.access_method || "—"}</td>
                <td className="p-3 text-xs">{n.the_date ? new Date(n.the_date).toLocaleDateString("en-GB") : "—"}</td>
                <td className="p-3">
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${n.reserved ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-700"}`}>
                    {n.reserved ? "Enrolled" : "Pending"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(n)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete Lead</AlertDialogTitle><AlertDialogDescription>Delete "{n.client_name}"?</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(n.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
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
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} leads)</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
