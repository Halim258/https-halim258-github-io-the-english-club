import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UserMinus, UserPlus, Users2, Receipt, Loader2, Search } from "lucide-react";
import { groupLabel } from "@/lib/group-label";

export interface GroupRow {
  id: string;
  legacy_id: number | null;
  level: string | null;
  days: string | null;
  start_time: string | null;
  end_time: string | null;
  teacher_id: number | null;
  teacher_employee_id?: string | null;
  teacher_name?: string | null;
  max_students?: number | null;
}

export interface StudentRow {
  id: string;
  name: string;
  phone_number: string | null;
  email: string | null;
  status: string | null;
  group_id: number | null;
  school_group_id?: string | null;
  fees: number | null;
  paid_fees: number | null;
  remaining_fees: number | null;
  placement_test_result: string | null;
}

interface Props {
  group: GroupRow | null;
  employees: { id: string; legacy_id: number | null; name: string; position: string }[];
  students: StudentRow[];
  receipts?: { id: string; student_name: string | null; paid_fees: number | null; reservation_date: string | null; period_month?: string | null }[];
  onOpenChange: (open: boolean) => void;
  onRefresh: () => void;
}

export default function GroupDetailSheet({ group, employees, students, receipts = [], onOpenChange, onRefresh }: Props) {
  const [busy, setBusy] = useState(false);
  const [addSearch, setAddSearch] = useState("");
  const { toast } = useToast();

  const teachers = employees.filter(e => e.position === "teacher");

  const members = useMemo(
    () => (group ? students.filter(s => s.school_group_id === group.id) : []),
    [students, group]
  );

  const candidates = useMemo(() => {
    if (!group) return [];
    const q = addSearch.trim().toLowerCase();
    if (!q) return [];
    return students
      .filter(s => s.school_group_id !== group.id)
      .filter(s => s.name.toLowerCase().includes(q) || (s.phone_number || "").includes(q) || (s.email || "").toLowerCase().includes(q))
      .slice(0, 8);
  }, [students, group, addSearch]);

  const memberNames = new Set(members.map(m => m.name.trim().toLowerCase()));
  const groupReceipts = receipts.filter(r => r.student_name && memberNames.has(r.student_name.trim().toLowerCase()));
  const collected = groupReceipts.reduce((sum, r) => sum + Number(r.paid_fees || 0), 0);
  const outstanding = members.reduce((sum, m) => sum + Number(m.remaining_fees || 0), 0);

  const setTeacher = async (employeeId: string) => {
    if (!group) return;
    const emp = employees.find(e => e.id === employeeId);
    setBusy(true);
    const { error } = await supabase.from("school_groups").update({
      teacher_employee_id: emp ? emp.id : null,
      teacher_id: emp?.legacy_id ?? null,
      teacher_name: emp?.name ?? null,
    }).eq("id", group.id);
    setBusy(false);
    if (error) toast({ title: "Could not change the teacher", description: error.message, variant: "destructive" });
    else { toast({ title: emp ? `${emp.name} is now the teacher` : "Teacher removed" }); onRefresh(); }
  };

  const addStudent = async (student: StudentRow) => {
    if (!group) return;
    setBusy(true);
    const { error } = await supabase.from("school_students")
      .update({ school_group_id: group.id, group_id: group.legacy_id })
      .eq("id", student.id);
    setBusy(false);
    if (error) toast({ title: "Could not add the student", description: error.message, variant: "destructive" });
    else { toast({ title: `${student.name} added to the group` }); setAddSearch(""); onRefresh(); }
  };

  const removeStudent = async (student: StudentRow) => {
    setBusy(true);
    const { error } = await supabase.from("school_students")
      .update({ school_group_id: null, group_id: null })
      .eq("id", student.id);
    setBusy(false);
    if (error) toast({ title: "Could not remove the student", description: error.message, variant: "destructive" });
    else { toast({ title: `${student.name} removed from the group` }); onRefresh(); }
  };

  return (
    <Sheet open={!!group} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-lg">{groupLabel(group)}</SheetTitle>
          <p className="text-sm text-muted-foreground">
            {group?.start_time || "—"} - {group?.end_time || "—"} · {members.length} student{members.length === 1 ? "" : "s"}
            {group?.max_students ? ` / ${group.max_students}` : ""}
          </p>
        </SheetHeader>

        {/* Teacher */}
        <div className="mt-6">
          <Label>Teacher</Label>
          <select
            value={group?.teacher_employee_id || ""}
            disabled={busy}
            onChange={e => setTeacher(e.target.value)}
            className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">No teacher assigned</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {/* Money */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Collected</p>
            <p className="font-bold font-mono text-emerald-600">{collected.toLocaleString()} ج.م</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1"><Receipt className="h-3 w-3" /> {groupReceipts.length} receipts</p>
          </div>
          <div className="rounded-xl border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Outstanding</p>
            <p className="font-bold font-mono text-destructive">{outstanding.toLocaleString()} ج.م</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">across group members</p>
          </div>
        </div>

        {/* Add student */}
        <div className="mt-6">
          <Label className="flex items-center gap-1"><UserPlus className="h-3.5 w-3.5" /> Add a student</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={addSearch} onChange={e => setAddSearch(e.target.value)} placeholder="Search by name, phone or email..." className="pl-9" />
          </div>
          {candidates.length > 0 && (
            <div className="mt-2 rounded-xl border divide-y overflow-hidden">
              {candidates.map(c => (
                <button key={c.id} disabled={busy} onClick={() => addStudent(c)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted/40 disabled:opacity-50">
                  <span>
                    {c.name}
                    <span className="block text-[11px] text-muted-foreground font-mono">{c.phone_number || c.email || "—"}</span>
                  </span>
                  <UserPlus className="h-4 w-4 text-primary shrink-0" />
                </button>
              ))}
            </div>
          )}
          {addSearch && candidates.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">No matching student found.</p>
          )}
        </div>

        {/* Roster */}
        <div className="mt-6">
          <p className="font-semibold text-sm flex items-center gap-2 mb-2">
            <Users2 className="h-4 w-4 text-primary" /> Students ({members.length})
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
          </p>
          {members.length === 0 ? (
            <p className="text-sm text-muted-foreground rounded-xl border p-4">No students in this group yet.</p>
          ) : (
            <div className="rounded-xl border divide-y overflow-hidden">
              {members.map(m => (
                <div key={m.id} className="flex items-center justify-between gap-2 px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {m.placement_test_result || "no level"} · {m.status || "active"}
                      {Number(m.remaining_fees || 0) > 0 && <span className="text-destructive"> · owes {Number(m.remaining_fees).toLocaleString()} ج.م</span>}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" disabled={busy} className="h-7 text-xs text-destructive hover:text-destructive shrink-0"
                    onClick={() => removeStudent(m)}>
                    <UserMinus className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
