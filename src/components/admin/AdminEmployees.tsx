import { useState } from "react";
import { Plus, UserCheck, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  position: string;
  phone_number: string | null;
  phone_number_2: string | null;
}

interface Props {
  employees: Employee[];
  onRefresh: () => void;
}

const emptyForm = { name: "", position: "teacher", phone_number: "", phone_number_2: "" };

export default function AdminEmployees({ employees, onRefresh }: Props) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!form.name) return;
    const { error } = await supabase.from("school_employees").insert({
      name: form.name,
      position: form.position,
      phone_number: form.phone_number || null,
      phone_number_2: form.phone_number_2 || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Employee added" });
      setForm(emptyForm);
      setAddOpen(false);
      onRefresh();
    }
  };

  const openEdit = (emp: Employee) => {
    setEditId(emp.id);
    setForm({
      name: emp.name,
      position: emp.position,
      phone_number: emp.phone_number || "",
      phone_number_2: emp.phone_number_2 || "",
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId || !form.name) return;
    const { error } = await supabase.from("school_employees").update({
      name: form.name,
      position: form.position,
      phone_number: form.phone_number || null,
      phone_number_2: form.phone_number_2 || null,
    }).eq("id", editId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Employee updated" });
      setEditOpen(false);
      setEditId(null);
      setForm(emptyForm);
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_employees").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Employee deleted" });
      onRefresh();
    }
  };

  const positionColors: Record<string, string> = {
    teacher: "bg-blue-500/10 text-blue-700",
    manager: "bg-purple-500/10 text-purple-700",
    receptionist: "bg-amber-500/10 text-amber-700",
    staff: "bg-muted text-muted-foreground",
  };

  const formFields = (
    <div className="space-y-3">
      <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
      <div><Label>Position</Label><Input value={form.position} onChange={e => setForm({...form, position: e.target.value})} placeholder="teacher / manager / receptionist" /></div>
      <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} /></div>
      <div><Label>Phone 2</Label><Input value={form.phone_number_2} onChange={e => setForm({...form, phone_number_2: e.target.value})} /></div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold">{employees.length} Employees</span>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Employee</DialogTitle></DialogHeader>
            {formFields}
            <Button onClick={handleAdd} className="w-full mt-2">Add Employee</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Employee</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save Changes</Button>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {employees.map(emp => (
          <div key={emp.id} className="rounded-xl border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">{emp.name}</h4>
              <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${positionColors[emp.position] || positionColors.staff}`}>
                {emp.position}
              </span>
            </div>
            {emp.phone_number && <p className="text-xs text-muted-foreground font-mono">{emp.phone_number}</p>}
            {emp.phone_number_2 && <p className="text-xs text-muted-foreground font-mono">{emp.phone_number_2}</p>}
            <div className="flex gap-1 mt-3 border-t pt-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => openEdit(emp)}>
                <Pencil className="h-3 w-3 mr-1" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive hover:text-destructive">
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                    <AlertDialogDescription>Are you sure you want to delete "{emp.name}"? This cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(emp.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
