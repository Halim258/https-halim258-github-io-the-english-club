import { useState, useMemo } from "react";
import { Users2, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Group {
  id: string;
  level: string | null;
  days: string | null;
  start_time: string | null;
  end_time: string | null;
  teacher_id: number | null;
  legacy_id: number | null;
}

interface Props {
  groups: Group[];
  employees: { legacy_id: number | null; name: string }[];
  onRefresh: () => void;
}

const emptyForm = { level: "", days: "", start_time: "", end_time: "", teacher_id: "" };

export default function AdminGroups({ groups, employees, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const getTeacher = (tid: number | null) => {
    if (!tid) return "—";
    return employees.find(e => e.legacy_id === tid)?.name || `Teacher #${tid}`;
  };

  const filtered = useMemo(() => {
    if (!search) return groups;
    const q = search.toLowerCase();
    return groups.filter(g => (g.level || "").toLowerCase().includes(q) || getTeacher(g.teacher_id).toLowerCase().includes(q));
  }, [groups, search]);

  const handleAdd = async () => {
    const { error } = await supabase.from("school_groups").insert({
      level: form.level || null, days: form.days || null,
      start_time: form.start_time || null, end_time: form.end_time || null,
      teacher_id: form.teacher_id ? parseInt(form.teacher_id) : null,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Group added" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (g: Group) => {
    setEditId(g.id);
    setForm({ level: g.level || "", days: g.days || "", start_time: g.start_time || "", end_time: g.end_time || "", teacher_id: String(g.teacher_id || "") });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from("school_groups").update({
      level: form.level || null, days: form.days || null,
      start_time: form.start_time || null, end_time: form.end_time || null,
      teacher_id: form.teacher_id ? parseInt(form.teacher_id) : null,
    }).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Group updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_groups").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Group deleted" }); onRefresh(); }
  };

  const formFields = (
    <div className="space-y-3">
      <div><Label>Level</Label><Input value={form.level} onChange={e => setForm({...form, level: e.target.value})} placeholder="A1, B2..." /></div>
      <div><Label>Days</Label><Input value={form.days} onChange={e => setForm({...form, days: e.target.value})} placeholder="Sat, Mon, Wed" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Start Time</Label><Input value={form.start_time} onChange={e => setForm({...form, start_time: e.target.value})} placeholder="10:00" /></div>
        <div><Label>End Time</Label><Input value={form.end_time} onChange={e => setForm({...form, end_time: e.target.value})} placeholder="12:00" /></div>
      </div>
      <div><Label>Teacher ID</Label><Input type="number" value={form.teacher_id} onChange={e => setForm({...form, teacher_id: e.target.value})} /></div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Users2 className="h-5 w-5 text-primary" />
          <span className="font-semibold">{groups.length} Groups</span>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 w-48" />
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Group</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add Group</DialogTitle></DialogHeader>
              {formFields}
              <Button onClick={handleAdd} className="w-full mt-2">Add Group</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Group</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(g => (
          <div key={g.id} className="rounded-xl border bg-card p-4 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase text-primary">Group #{g.legacy_id}</span>
              {g.level && <span className="text-[10px] font-bold rounded-full px-2 py-0.5 bg-primary/10 text-primary">{g.level}</span>}
            </div>
            <p className="text-sm"><span className="text-muted-foreground">Teacher:</span> {getTeacher(g.teacher_id)}</p>
            <p className="text-sm"><span className="text-muted-foreground">Days:</span> {g.days || "—"}</p>
            <p className="text-sm"><span className="text-muted-foreground">Time:</span> {g.start_time || "—"} - {g.end_time || "—"}</p>
            <div className="flex gap-1 mt-3 border-t pt-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openEdit(g)}>
                <Pencil className="h-3 w-3 mr-1" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive"><Trash2 className="h-3 w-3 mr-1" /> Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Delete Group</AlertDialogTitle><AlertDialogDescription>Delete Group #{g.legacy_id}?</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(g.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
