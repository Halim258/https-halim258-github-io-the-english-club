import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Shield, Search, UserPlus, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type AppRole = "admin" | "student" | "teacher" | "secretary";

interface RoleRow {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  profile?: { full_name: string | null };
}

export default function AdminRoles() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  // For assigning new roles
  const [allProfiles, setAllProfiles] = useState<{ id: string; full_name: string | null }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<AppRole>("teacher");
  const [assigning, setAssigning] = useState(false);

  const loadRoles = async () => {
    setLoading(true);
    const [rolesRes, profilesRes] = await Promise.all([
      supabase.from("user_roles").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name"),
    ]);

    const profileMap: Record<string, string> = {};
    (profilesRes.data || []).forEach((p) => {
      profileMap[p.id] = p.full_name || "Unnamed";
    });

    setRoles((rolesRes.data as RoleRow[]) || []);
    setProfiles(profileMap);
    setAllProfiles(profilesRes.data || []);
    setLoading(false);
  };

  useEffect(() => { loadRoles(); }, []);

  const handleAssign = async () => {
    if (!selectedUserId) {
      toast({ title: "Select a user", variant: "destructive" });
      return;
    }

    setAssigning(true);

    // Check if user already has this role
    const existing = roles.find(r => r.user_id === selectedUserId && r.role === selectedRole);
    if (existing) {
      toast({ title: "User already has this role", variant: "destructive" });
      setAssigning(false);
      return;
    }

    // Remove any existing role for this user first (one role per user)
    await supabase.from("user_roles").delete().eq("user_id", selectedUserId);

    const { error } = await supabase.from("user_roles").insert({
      user_id: selectedUserId,
      role: selectedRole as any,
    });

    if (error) {
      toast({ title: "Error assigning role", description: error.message, variant: "destructive" });
    } else {
      toast({ title: `Role assigned: ${selectedRole}`, description: `User: ${profiles[selectedUserId] || "Unknown"}` });
      setSelectedUserId("");
      await loadRoles();
    }
    setAssigning(false);
  };

  const handleRemove = async (id: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Role removed" });
      await loadRoles();
    }
  };

  const filtered = roles.filter((r) => {
    const name = profiles[r.user_id]?.toLowerCase() || "";
    const matchSearch = !search || name.includes(search.toLowerCase()) || r.user_id.includes(search);
    const matchRole = filterRole === "all" || r.role === filterRole;
    return matchSearch && matchRole;
  });

  const roleBadge = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-destructive/10 text-destructive",
      teacher: "bg-blue-500/10 text-blue-600",
      secretary: "bg-amber-500/10 text-amber-600",
      student: "bg-muted text-muted-foreground",
    };
    return colors[role] || colors.student;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Assign Role Section */}
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2 mb-4">
          <UserPlus className="h-4 w-4 text-primary" /> Assign Role
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedUserId} onValueChange={setSelectedUserId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a user..." />
            </SelectTrigger>
            <SelectContent>
              {allProfiles.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.full_name || "Unnamed"} <span className="text-muted-foreground text-xs ml-1">({p.id.slice(0, 8)}...)</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="secretary">Secretary</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAssign} disabled={assigning} className="gap-1.5">
            <Shield className="h-4 w-4" />
            {assigning ? "Assigning..." : "Assign"}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="secretary">Secretary</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Roles Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No roles found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {(profiles[r.user_id] || "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{profiles[r.user_id] || "Unknown"}</p>
                        <p className="text-[10px] text-muted-foreground">{r.user_id.slice(0, 12)}...</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-semibold rounded-full px-2.5 py-1 capitalize ${roleBadge(r.role)}`}>
                      {r.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Remove the "{r.role}" role from {profiles[r.user_id] || "this user"}?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemove(r.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
