import { useState, useEffect } from "react";
import { Users2, Calendar, Clock, Mail, CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface PublicGroup {
  id: string;
  level: string | null;
  days: string | null;
  start_time: string | null;
  end_time: string | null;
  teacher_name: string | null;
  teacher_email: string | null;
  description: string | null;
  max_students: number | null;
  is_public: boolean;
}

export default function Groups() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [groups, setGroups] = useState<PublicGroup[]>([]);
  const [enrollments, setEnrollments] = useState<Record<string, string>>({});
  const [enrollCounts, setEnrollCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<PublicGroup | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchGroups();
  }, [user]);

  const fetchGroups = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("school_groups")
      .select("id, level, days, start_time, end_time, teacher_name, teacher_email, description, max_students, is_public")
      .eq("is_public", true);

    setGroups((data as PublicGroup[]) || []);

    if (user) {
      const { data: myEnrollments } = await supabase
        .from("group_enrollments")
        .select("group_id, status")
        .eq("user_id", user.id);
      const map: Record<string, string> = {};
      myEnrollments?.forEach((e: any) => { map[e.group_id] = e.status; });
      setEnrollments(map);
    }
    setLoading(false);
  };

  const openEnroll = (g: PublicGroup) => {
    setSelectedGroup(g);
    setForm({
      name: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phone: "",
    });
    setEnrollOpen(true);
  };

  const handleEnroll = async () => {
    if (!user || !selectedGroup) return;
    if (!form.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    setEnrolling(true);

    const isAutoApprove = selectedGroup.is_public;
    const { error } = await supabase.from("group_enrollments").insert({
      group_id: selectedGroup.id,
      user_id: user.id,
      student_name: form.name.trim(),
      student_email: form.email.trim() || null,
      student_phone: form.phone.trim() || null,
      status: isAutoApprove ? "approved" : "pending",
    });

    setEnrolling(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isAutoApprove ? "Enrolled! ✅" : "Request sent! ⏳", description: isAutoApprove ? "You're in the group." : "Waiting for teacher approval." });
      setEnrollOpen(false);
      fetchGroups();
    }
  };

  const getStatusBadge = (groupId: string) => {
    const s = enrollments[groupId];
    if (!s) return null;
    const colors: Record<string, string> = {
      approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return (
      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[s] || ""}`}>
        {s === "approved" && <CheckCircle2 className="h-3 w-3" />}
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display">Available Groups</h1>
        <p className="mt-2 text-muted-foreground">Join a group and start learning with our teachers</p>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Users2 className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>No groups available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.id} className="rounded-2xl border-2 border-border/50 bg-card p-6 shadow-soft hover:shadow-md transition-shadow">
              {/* Level badge */}
              {g.level && (
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
                  {g.level}
                </span>
              )}

              {/* Teacher info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {g.teacher_name?.split(" ").map(n => n[0]).join("") || "?"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{g.teacher_name || "TBA"}</p>
                  {g.teacher_email && (
                    <a href={`mailto:${g.teacher_email}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3 w-3" />
                      {g.teacher_email}
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              {g.description && (
                <p className="text-sm text-muted-foreground mb-3">{g.description}</p>
              )}

              {/* Schedule */}
              <div className="flex flex-wrap gap-3 text-sm mb-4">
                {g.days && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {g.days}
                  </span>
                )}
                {(g.start_time || g.end_time) && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {g.start_time || "?"} – {g.end_time || "?"}
                  </span>
                )}
              </div>

              {/* Action */}
              {getStatusBadge(g.id) || (
                user ? (
                  <Button size="sm" className="w-full" onClick={() => openEnroll(g)}>
                    <UserPlus className="h-4 w-4 mr-1.5" /> Join This Group
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <a href="/login">Log in to join</a>
                  </Button>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {/* Enroll dialog */}
      <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Join {selectedGroup?.teacher_name}'s Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Your Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
            <div>
              <Label>Phone (optional)</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="01xxxxxxxxx" />
            </div>
            <Button className="w-full" onClick={handleEnroll} disabled={enrolling}>
              {enrolling ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />}
              Confirm Enrollment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
