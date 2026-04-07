import { useState, useMemo } from "react";
import { Calendar, Clock, Plus, Search, ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DetailSheet from "./DetailSheet";

interface Session {
  id: string;
  session_name: string | null;
  session_date: string | null;
  level: string | null;
  group_id: number | null;
  teacher_id: number | null;
  time_from: number | null;
  time_to: number | null;
  hours: number | null;
  teacher_lateness: number | null;
}

interface Props {
  sessions: Session[];
  employees: { legacy_id: number | null; name: string }[];
  onRefresh: () => void;
}

const emptyForm = { session_name: "", level: "", group_id: "", teacher_id: "", session_date: "", hours: "1", teacher_lateness: "0" };

export default function AdminSessions({ sessions, employees, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const perPage = 25;
  const { toast } = useToast();

  const getTeacher = (tid: number | null) => {
    if (!tid) return "—";
    return employees.find(e => e.legacy_id === tid)?.name || `#${tid}`;
  };

  const filtered = useMemo(() => sessions.filter(s => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (s.session_name || "").toLowerCase().includes(q) ||
      (s.level || "").toLowerCase().includes(q) ||
      getTeacher(s.teacher_id).toLowerCase().includes(q);
  }), [sessions, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const totalHours = sessions.reduce((s, ses) => s + (ses.hours || 0), 0);
  const totalLateness = sessions.reduce((s, ses) => s + (ses.teacher_lateness || 0), 0);

  const handleAdd = async () => {
    if (!form.session_name) return;
    const { error } = await supabase.from("school_sessions").insert({
      session_name: form.session_name,
      level: form.level || null,
      group_id: form.group_id ? parseInt(form.group_id) : null,
      teacher_id: form.teacher_id ? parseInt(form.teacher_id) : null,
      session_date: form.session_date ? new Date(form.session_date).toISOString() : null,
      hours: parseInt(form.hours) || 1,
      teacher_lateness: parseInt(form.teacher_lateness) || 0,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Session added" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (s: Session) => {
    setEditId(s.id);
    setForm({
      session_name: s.session_name || "",
      level: s.level || "",
      group_id: String(s.group_id || ""),
      teacher_id: String(s.teacher_id || ""),
      session_date: s.session_date ? new Date(s.session_date).toISOString().split("T")[0] : "",
      hours: String(s.hours || 1),
      teacher_lateness: String(s.teacher_lateness || 0),
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from("school_sessions").update({
      session_name: form.session_name || null,
      level: form.level || null,
      group_id: form.group_id ? parseInt(form.group_id) : null,
      teacher_id: form.teacher_id ? parseInt(form.teacher_id) : null,
      session_date: form.session_date ? new Date(form.session_date).toISOString() : null,
      hours: parseInt(form.hours) || 1,
      teacher_lateness: parseInt(form.teacher_lateness) || 0,
    }).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Session updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_sessions").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Session deleted" }); onRefresh(); }
  };

  const formFields = (
    <div className="space-y-3">
      <div><Label>Session Name *</Label><Input value={form.session_name} onChange={e => setForm({ ...form, session_name: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Level</Label><Input value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} placeholder="A1, B2..." /></div>
        <div><Label>Date</Label><Input type="date" value={form.session_date} onChange={e => setForm({ ...form, session_date: e.target.value })} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Group ID</Label><Input type="number" value={form.group_id} onChange={e => setForm({ ...form, group_id: e.target.value })} /></div>
        <div><Label>Teacher ID</Label><Input type="number" value={form.teacher_id} onChange={e => setForm({ ...form, teacher_id: e.target.value })} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Hours</Label><Input type="number" value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} /></div>
        <div><Label>Lateness (min)</Label><Input type="number" value={form.teacher_lateness} onChange={e => setForm({ ...form, teacher_lateness: e.target.value })} /></div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Calendar, label: "Total Sessions", value: sessions.length },
          { icon: Clock, label: "Total Hours", value: totalHours },
          { icon: Clock, label: "Avg Hours/Session", value: sessions.length ? (totalHours / sessions.length).toFixed(1) : "0" },
          { icon: Clock, label: "Total Lateness", value: `${totalLateness} min` },
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
          <Input placeholder="Search sessions..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Session</DialogTitle></DialogHeader>
            {formFields}
            <Button onClick={handleAdd} className="w-full mt-2">Add Session</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Session</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-left">Level</th>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-center">Hours</th>
              <th className="p-3 text-center">Late (min)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(s => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setSelectedSession(s)}>
                <td className="p-3 font-medium text-primary hover:underline">{s.session_name || "—"}</td>
                <td className="p-3"><span className="text-xs font-bold rounded-full px-2 py-0.5 bg-primary/10 text-primary">{s.level || "—"}</span></td>
                <td className="p-3 text-xs">{getTeacher(s.teacher_id)}</td>
                <td className="p-3 text-xs">{s.session_date ? new Date(s.session_date).toLocaleDateString("en-GB") : "—"}</td>
                <td className="p-3 text-center font-mono">{s.hours || 0}</td>
                <td className="p-3 text-center">
                  <span className={`font-mono text-xs ${(s.teacher_lateness || 0) > 0 ? "text-red-600" : "text-muted-foreground"}`}>
                    {s.teacher_lateness || 0}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Session</AlertDialogTitle>
                          <AlertDialogDescription>Delete this session? This cannot be undone.</AlertDialogDescription>
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
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} sessions)</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No sessions found.</p>}
      </div>

      <DetailSheet
        open={!!selectedSession}
        onOpenChange={(open) => { if (!open) setSelectedSession(null); }}
        title={selectedSession?.session_name || "Session"}
        subtitle={selectedSession?.level ? `Level: ${selectedSession.level}` : undefined}
        avatar={selectedSession?.session_name?.[0]?.toUpperCase() || "S"}
        fields={selectedSession ? [
          { label: "Session Name", value: selectedSession.session_name },
          { label: "Level", value: selectedSession.level, type: "badge" as const },
          { label: "Date", value: selectedSession.session_date, type: "date" as const },
          { label: "Teacher", value: getTeacher(selectedSession.teacher_id) },
          { label: "Group ID", value: selectedSession.group_id },
          { label: "Hours", value: selectedSession.hours },
          { label: "Time From", value: selectedSession.time_from },
          { label: "Time To", value: selectedSession.time_to },
          { label: "Teacher Lateness", value: selectedSession.teacher_lateness ? `${selectedSession.teacher_lateness} min` : "0 min" },
        ] : []}
      />
    </div>
  );
}
