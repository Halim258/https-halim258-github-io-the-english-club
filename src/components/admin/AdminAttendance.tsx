import { useState, useEffect, useMemo } from "react";
import { ClipboardCheck, Clock, Search, Plus, UserCheck, UserX, ChevronLeft, ChevronRight, LogIn, LogOut, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  session_name: string | null;
  session_date: string | null;
  level: string | null;
}

interface Attendance {
  id: string;
  session_id: string;
  student_name: string;
  student_id_legacy: number | null;
  check_in: string | null;
  check_out: string | null;
  status: string;
  notes: string | null;
  created_at: string | null;
}

interface Props {
  sessions: Session[];
}

export default function AdminAttendance({ sessions }: Props) {
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sessionFilter, setSessionFilter] = useState<string>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 25;
  const { toast } = useToast();

  const [form, setForm] = useState({ student_name: "", student_id_legacy: "", session_id: "", status: "present", notes: "" });

  const loadAttendance = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("school_attendance")
      .select("*")
      .order("check_in", { ascending: false })
      .limit(1000);
    if (!error) setRecords((data as Attendance[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadAttendance(); }, []);

  const getSessionName = (sid: string) => sessions.find(s => s.id === sid)?.session_name || "—";

  const filtered = useMemo(() => records.filter(r => {
    if (sessionFilter !== "all" && r.session_id !== sessionFilter) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return r.student_name.toLowerCase().includes(q) || getSessionName(r.session_id).toLowerCase().includes(q);
  }), [records, search, sessionFilter, sessions]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const presentCount = records.filter(r => r.status === "present").length;
  const lateCount = records.filter(r => r.status === "late").length;
  const absentCount = records.filter(r => r.status === "absent").length;

  const handleAdd = async () => {
    if (!form.student_name || !form.session_id) return;
    const { error } = await supabase.from("school_attendance").insert({
      student_name: form.student_name,
      student_id_legacy: form.student_id_legacy ? parseInt(form.student_id_legacy) : null,
      session_id: form.session_id,
      status: form.status,
      notes: form.notes || null,
      check_in: new Date().toISOString(),
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Attendance recorded" }); setAddOpen(false); setForm({ student_name: "", student_id_legacy: "", session_id: "", status: "present", notes: "" }); loadAttendance(); }
  };

  const handleCheckOut = async (id: string) => {
    const { error } = await supabase.from("school_attendance").update({ check_out: new Date().toISOString() } as any).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Checked out" }); loadAttendance(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_attendance").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Record deleted" }); loadAttendance(); }
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      present: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      late: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      absent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return map[status] || "bg-muted text-muted-foreground";
  };

  const recentSessions = sessions.slice(0, 30);

  if (loading) return <div className="flex justify-center py-16"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: ClipboardCheck, label: "Total Records", value: records.length },
          { icon: UserCheck, label: "Present", value: presentCount, color: "text-emerald-600" },
          { icon: Clock, label: "Late", value: lateCount, color: "text-amber-600" },
          { icon: UserX, label: "Absent", value: absentCount, color: "text-red-600" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-2">
              <s.icon className={`h-4 w-4 ${s.color || "text-primary"}`} />
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-lg font-bold font-display mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search student..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <select
          value={sessionFilter}
          onChange={e => { setSessionFilter(e.target.value); setPage(0); }}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All Sessions</option>
          {recentSessions.map(s => (
            <option key={s.id} value={s.id}>{s.session_name || `Session ${s.id.slice(0,6)}`}</option>
          ))}
        </select>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Check In</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Record Attendance</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Student Name *</Label><Input value={form.student_name} onChange={e => setForm({ ...form, student_name: e.target.value })} /></div>
              <div><Label>Student ID (Legacy)</Label><Input type="number" value={form.student_id_legacy} onChange={e => setForm({ ...form, student_id_legacy: e.target.value })} /></div>
              <div>
                <Label>Session *</Label>
                <select value={form.session_id} onChange={e => setForm({ ...form, session_id: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="">Select session...</option>
                  {recentSessions.map(s => (
                    <option key={s.id} value={s.id}>{s.session_name || `Session ${s.id.slice(0,6)}`} — {s.session_date ? new Date(s.session_date).toLocaleDateString("en-GB") : "No date"}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div><Label>Notes</Label><Input value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" /></div>
            </div>
            <Button onClick={handleAdd} className="w-full mt-2">Record Attendance</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Session</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-left">Check In</th>
              <th className="p-3 text-left">Check Out</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(r => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                <td className="p-3 font-medium">{r.student_name}</td>
                <td className="p-3 text-xs">{getSessionName(r.session_id)}</td>
                <td className="p-3 text-center">
                  <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${statusBadge(r.status)}`}>{r.status}</span>
                </td>
                <td className="p-3 text-xs font-mono">{r.check_in ? new Date(r.check_in).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                <td className="p-3 text-xs font-mono">{r.check_out ? new Date(r.check_out).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</td>
                <td className="p-3 text-xs text-muted-foreground truncate max-w-[150px]">{r.notes || "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1">
                    {!r.check_out && r.status !== "absent" && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600" title="Check Out" onClick={() => handleCheckOut(r.id)}>
                        <LogOut className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Record</AlertDialogTitle>
                          <AlertDialogDescription>Delete this attendance record? This cannot be undone.</AlertDialogDescription>
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
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({filtered.length} records)</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No attendance records found.</p>}
      </div>
    </div>
  );
}
