import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2, UserPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Enrollment {
  id: string;
  student_name: string;
  student_email: string | null;
  student_phone: string | null;
  status: string;
  created_at: string;
  group_id: string;
  group_level: string | null;
  group_days: string | null;
}

export default function TeacherEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => { fetchEnrollments(); }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("group_enrollments")
      .select("id, student_name, student_email, student_phone, status, created_at, group_id")
      .order("created_at", { ascending: false });

    if (!data) { setLoading(false); return; }

    // Fetch group info for each enrollment
    const groupIds = [...new Set(data.map((e: any) => e.group_id))];
    const { data: groups } = await supabase
      .from("school_groups")
      .select("id, level, days")
      .in("id", groupIds);

    const groupMap: Record<string, any> = {};
    groups?.forEach((g: any) => { groupMap[g.id] = g; });

    setEnrollments(data.map((e: any) => ({
      ...e,
      group_level: groupMap[e.group_id]?.level || null,
      group_days: groupMap[e.group_id]?.days || null,
    })));
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setUpdating(id);
    const { error } = await supabase.from("group_enrollments").update({ status }).eq("id", id);
    setUpdating(null);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "approved" ? "Student approved ✅" : "Request rejected" });
      setEnrollments(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;

  const pending = enrollments.filter(e => e.status === "pending");
  const resolved = enrollments.filter(e => e.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Pending requests */}
      <div>
        <h3 className="font-semibold flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-yellow-500" />
          Pending Requests ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground bg-card rounded-xl border p-4">No pending enrollment requests.</p>
        ) : (
          <div className="space-y-2">
            {pending.map((e) => (
              <div key={e.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border bg-card p-4 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-700 dark:text-yellow-400 font-bold text-xs shrink-0">
                    {e.student_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{e.student_name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {e.student_email || "No email"} {e.student_phone && `· ${e.student_phone}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {e.group_level && <span className="font-medium text-primary">{e.group_level}</span>}
                      {e.group_days && ` · ${e.group_days}`}
                      {" · "}{new Date(e.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => updateStatus(e.id, "rejected")} disabled={updating === e.id}>
                    <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                  </Button>
                  <Button size="sm" onClick={() => updateStatus(e.id, "approved")} disabled={updating === e.id}>
                    {updating === e.id ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resolved */}
      {resolved.length > 0 && (
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-3">
            <UserPlus className="h-4 w-4 text-muted-foreground" />
            All Enrollments ({resolved.length})
          </h3>
          <div className="space-y-2">
            {resolved.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border bg-card p-3 px-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    e.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {e.student_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{e.student_name}</p>
                    <p className="text-xs text-muted-foreground">{e.group_level || "Group"} · {e.group_days || ""}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  e.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
