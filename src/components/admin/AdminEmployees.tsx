import { useState } from "react";
import { Plus, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export default function AdminEmployees({ employees, onRefresh }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", position: "teacher", phone_number: "" });
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!form.name) return;
    const { error } = await supabase.from("school_employees").insert({
      name: form.name,
      position: form.position,
      phone_number: form.phone_number || null,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Employee added" });
      setForm({ name: "", position: "teacher", phone_number: "" });
      setOpen(false);
      onRefresh();
    }
  };

  const positionColors: Record<string, string> = {
    teacher: "bg-blue-500/10 text-blue-700",
    manager: "bg-purple-500/10 text-purple-700",
    receptionist: "bg-amber-500/10 text-amber-700",
    staff: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold">{employees.length} Employees</span>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Employee</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Employee</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
              <div><Label>Position</Label><Input value={form.position} onChange={e => setForm({...form, position: e.target.value})} /></div>
              <div><Label>Phone</Label><Input value={form.phone_number} onChange={e => setForm({...form, phone_number: e.target.value})} /></div>
              <Button onClick={handleAdd} className="w-full">Add Employee</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
          </div>
        ))}
      </div>
    </div>
  );
}
