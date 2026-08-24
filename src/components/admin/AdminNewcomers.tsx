import { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Pencil, Trash2, MessageCircle, Phone, Mail, CalendarClock, Download, AlertTriangle } from "lucide-react";
import CsvImport from "./CsvImport";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DetailSheet from "./DetailSheet";

interface Newcomer {
  id: string;
  client_name: string;
  client_number: string | null;
  client_email: string | null;
  access_method: string | null;
  the_date: string | null;
  reserved: boolean | null;
  status?: string | null;
  follow_up_at?: string | null;
  notes?: string | null;
  interest?: string | null;
}

interface Props {
  newcomers: Newcomer[];
  onRefresh: () => void;
}

type Status = "new" | "contacted" | "visited" | "enrolled" | "lost";

const STATUSES: { id: Status; label: string; badge: string; dot: string }[] = [
  { id: "new", label: "New", badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
  { id: "contacted", label: "Contacted", badge: "bg-amber-500/10 text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
  { id: "visited", label: "Visited", badge: "bg-violet-500/10 text-violet-700 dark:text-violet-300", dot: "bg-violet-500" },
  { id: "enrolled", label: "Enrolled", badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
  { id: "lost", label: "Lost", badge: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
];

const statusMeta = (s?: string | null, reserved?: boolean | null) => {
  const key = (s || (reserved ? "enrolled" : "new")) as Status;
  return STATUSES.find(x => x.id === key) || STATUSES[0];
};

const emptyForm = {
  client_name: "",
  client_number: "",
  client_email: "",
  access_method: "",
  interest: "",
  notes: "",
  status: "new" as Status,
  follow_up_at: "",
  reserved: false,
};

const toLocalInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const waLink = (phone: string | null, name: string) => {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return null;
  const intl = digits.startsWith("0") ? `2${digits}` : digits;
  const msg = `Hello ${name}, this is The English Club Alexandria. Thanks for your interest — how can we help you choose the right course?`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
};

export default function AdminNewcomers({ newcomers, onRefresh }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | Status | "due">("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [page, setPage] = useState(0);
  const [selectedNewcomer, setSelectedNewcomer] = useState<Newcomer | null>(null);
  const perPage = 25;
  const { toast } = useToast();

  const now = Date.now();
  const isDue = (n: Newcomer) =>
    !!n.follow_up_at &&
    new Date(n.follow_up_at).getTime() <= now &&
    !["enrolled", "lost"].includes(statusMeta(n.status, n.reserved).id);

  const filtered = useMemo(() => {
    let list = newcomers;
    if (filter === "due") list = list.filter(isDue);
    else if (filter !== "all") list = list.filter(n => statusMeta(n.status, n.reserved).id === filter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(n =>
        n.client_name.toLowerCase().includes(q) ||
        (n.client_number || "").includes(q) ||
        (n.client_email || "").toLowerCase().includes(q) ||
        (n.interest || "").toLowerCase().includes(q) ||
        (n.notes || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [newcomers, search, filter, now]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    newcomers.forEach(n => { const k = statusMeta(n.status, n.reserved).id; map[k] = (map[k] || 0) + 1; });
    return map;
  }, [newcomers]);
  const dueCount = newcomers.filter(isDue).length;
  const enrolled = counts.enrolled || 0;
  const convRate = newcomers.length > 0 ? Math.round((enrolled / newcomers.length) * 100) : 0;

  const payload = () => ({
    client_name: form.client_name.trim(),
    client_number: form.client_number.trim() || null,
    client_email: form.client_email.trim() || null,
    access_method: form.access_method || null,
    interest: form.interest.trim() || null,
    notes: form.notes.trim() || null,
    status: form.status,
    follow_up_at: form.follow_up_at ? new Date(form.follow_up_at).toISOString() : null,
    reserved: form.status === "enrolled" ? true : form.reserved,
  });

  const handleAdd = async () => {
    if (!form.client_name.trim()) { toast({ title: "Name is required", variant: "destructive" }); return; }
    const { error } = await supabase.from("school_newcomers").insert({ ...payload(), the_date: new Date().toISOString() });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Lead added" }); setForm(emptyForm); setAddOpen(false); onRefresh(); }
  };

  const openEdit = (n: Newcomer) => {
    setEditId(n.id);
    setForm({
      client_name: n.client_name,
      client_number: n.client_number || "",
      client_email: n.client_email || "",
      access_method: n.access_method || "",
      interest: n.interest || "",
      notes: n.notes || "",
      status: statusMeta(n.status, n.reserved).id,
      follow_up_at: toLocalInput(n.follow_up_at),
      reserved: !!n.reserved,
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    if (!editId) return;
    const { error } = await supabase.from("school_newcomers").update(payload()).eq("id", editId);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Updated" }); setEditOpen(false); setEditId(null); setForm(emptyForm); onRefresh(); }
  };

  const quickStatus = async (n: Newcomer, status: Status) => {
    const { error } = await supabase.from("school_newcomers")
      .update({ status, reserved: status === "enrolled" ? true : n.reserved })
      .eq("id", n.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Marked as ${status}` }); onRefresh(); }
  };

  const snooze = async (n: Newcomer, days: number) => {
    const d = new Date(); d.setDate(d.getDate() + days);
    const { error } = await supabase.from("school_newcomers").update({ follow_up_at: d.toISOString() }).eq("id", n.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Follow-up set in ${days} day${days > 1 ? "s" : ""}` }); onRefresh(); }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("school_newcomers").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); onRefresh(); }
  };

  const exportCsv = () => {
    const head = ["name", "phone", "email", "source", "interest", "status", "follow_up", "date", "notes"];
    const rows = filtered.map(n => [
      n.client_name, n.client_number || "", n.client_email || "", n.access_method || "", n.interest || "",
      statusMeta(n.status, n.reserved).id, n.follow_up_at || "", n.the_date || "", (n.notes || "").replace(/\n/g, " "),
    ]);
    const csv = [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const formFields = (
    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Lead info</p>
        <p className="text-xs text-muted-foreground">All fields are optional — fill in whatever you have.</p>
        <div><Label>Full name <span className="text-muted-foreground font-normal">(optional)</span></Label><Input value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })} placeholder="Client full name" autoFocus /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div><Label>Phone number <span className="text-muted-foreground font-normal">(optional)</span></Label><Input value={form.client_number} onChange={e => setForm({ ...form, client_number: e.target.value })} placeholder="01xxxxxxxxx" /></div>
          <div><Label>Email <span className="text-muted-foreground font-normal">(optional)</span></Label><Input type="email" value={form.client_email} onChange={e => setForm({ ...form, client_email: e.target.value })} placeholder="name@example.com" /></div>
        </div>
        <div><Label>Asked about <span className="text-muted-foreground font-normal">(optional)</span></Label><Input value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} placeholder="e.g. A2 evening group, IELTS, kids course" /></div>
        <div>
          <Label>How did they find us? <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <select value={form.access_method} onChange={e => setForm({ ...form, access_method: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">— Select source —</option>
            {["Facebook", "Instagram", "WhatsApp", "Walk-in", "Referral", "Google", "Flyer", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div><Label>Notes <span className="text-muted-foreground font-normal">(optional)</span></Label><Textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="What did they ask about? Preferred time, budget, next step..." /></div>
      </div>
    </div>
  );


  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
        {[
          { label: "Total leads", value: newcomers.length, color: "text-primary" },
          { label: "Enrolled", value: enrolled, color: "text-emerald-600" },
          { label: "In pipeline", value: (counts.new || 0) + (counts.contacted || 0) + (counts.visited || 0), color: "text-amber-600" },
          { label: "Follow-up due", value: dueCount, color: "text-rose-600" },
          { label: "Conversion", value: `${convRate}%`, color: "text-blue-600" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`text-lg font-bold font-display ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, phone, email, notes..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
          {([{ id: "all", label: "All" }, ...STATUSES, { id: "due", label: `Due${dueCount ? ` (${dueCount})` : ""}` }] as { id: string; label: string }[]).map(f => (
            <button key={f.id} onClick={() => { setFilter(f.id as typeof filter); setPage(0); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === f.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 lg:ml-auto">
          <Button size="sm" variant="outline" onClick={exportCsv}><Download className="h-4 w-4 mr-1" /> Export</Button>
          <CsvImport
            table="school_newcomers"
            label="Import CSV"
            mappings={[
              { csvHeader: "client_name", dbField: "client_name", required: true },
              { csvHeader: "client_number", dbField: "client_number" },
              { csvHeader: "client_email", dbField: "client_email" },
              { csvHeader: "access_method", dbField: "access_method" },
              { csvHeader: "interest", dbField: "interest" },
              { csvHeader: "notes", dbField: "notes" },
            ]}
            transformRow={(row) => ({
              client_name: row.client_name,
              client_number: row.client_number || null,
              client_email: row.client_email || null,
              access_method: row.access_method || null,
              interest: row.interest || null,
              notes: row.notes || null,
              status: "new",
              reserved: false,
              the_date: new Date().toISOString(),
            })}
            onComplete={onRefresh}
          />
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button size="sm" onClick={() => setForm(emptyForm)}><Plus className="h-4 w-4 mr-1" /> Add lead</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add lead</DialogTitle></DialogHeader>
              {formFields}
              <Button onClick={handleAdd} className="w-full mt-2">Add</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit lead</DialogTitle></DialogHeader>
          {formFields}
          <Button onClick={handleEdit} className="w-full mt-2">Save</Button>
        </DialogContent>
      </Dialog>

      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3 hidden md:table-cell">Asked about</th>
              <th className="p-3 hidden lg:table-cell">Source</th>
              <th className="p-3">Status</th>
              <th className="p-3">Follow-up</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(n => {
              const meta = statusMeta(n.status, n.reserved);
              const wa = waLink(n.client_number, n.client_name);
              const due = isDue(n);
              return (
                <tr key={n.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer align-top" onClick={() => setSelectedNewcomer(n)}>
                  <td className="p-3">
                    <span className="font-medium text-primary hover:underline">{n.client_name}</span>
                    <p className="text-[11px] text-muted-foreground">{n.the_date ? new Date(n.the_date).toLocaleDateString("en-GB") : "—"}</p>
                  </td>
                  <td className="p-3">
                    <p className="font-mono text-xs">{n.client_number || "—"}</p>
                    {n.client_email && <p className="text-[11px] text-muted-foreground truncate max-w-[160px]">{n.client_email}</p>}
                  </td>
                  <td className="p-3 text-xs hidden md:table-cell max-w-[180px] truncate">{n.interest || "—"}</td>
                  <td className="p-3 text-xs hidden lg:table-cell">{n.access_method || "—"}</td>
                  <td className="p-3" onClick={e => e.stopPropagation()}>
                    <select
                      value={meta.id}
                      onChange={e => quickStatus(n, e.target.value as Status)}
                      className={`text-[11px] font-bold rounded-full px-2 py-1 border-0 outline-none cursor-pointer ${meta.badge}`}
                    >
                      {STATUSES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-xs">
                    {n.follow_up_at ? (
                      <span className={`inline-flex items-center gap-1 ${due ? "text-rose-600 font-semibold" : "text-muted-foreground"}`}>
                        {due ? <AlertTriangle className="h-3 w-3" /> : <CalendarClock className="h-3 w-3" />}
                        {new Date(n.follow_up_at).toLocaleDateString("en-GB")}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                      {wa && (
                        <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-emerald-600">
                          <a href={wa} target="_blank" rel="noreferrer" title="WhatsApp"><MessageCircle className="h-3.5 w-3.5" /></a>
                        </Button>
                      )}
                      {n.client_number && (
                        <Button asChild variant="ghost" size="icon" className="h-7 w-7"><a href={`tel:${n.client_number}`} title="Call"><Phone className="h-3.5 w-3.5" /></a></Button>
                      )}
                      {n.client_email && (
                        <Button asChild variant="ghost" size="icon" className="h-7 w-7"><a href={`mailto:${n.client_email}`} title="Email"><Mail className="h-3.5 w-3.5" /></a></Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" title="Follow up in 3 days" onClick={() => snooze(n, 3)}><CalendarClock className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(n)} title="Edit"><Pencil className="h-3.5 w-3.5" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Delete lead</AlertDialogTitle><AlertDialogDescription>Delete "{n.client_name}"?</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(n.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paged.length === 0 && (
              <tr><td colSpan={7} className="p-8 text-center text-sm text-muted-foreground">No leads match this view.</td></tr>
            )}
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

      <DetailSheet
        open={!!selectedNewcomer}
        onOpenChange={(open) => { if (!open) setSelectedNewcomer(null); }}
        title={selectedNewcomer?.client_name || ""}
        subtitle={selectedNewcomer ? statusMeta(selectedNewcomer.status, selectedNewcomer.reserved).label : ""}
        avatar={selectedNewcomer?.client_name?.[0]?.toUpperCase()}
        fields={selectedNewcomer ? [
          { label: "Name", value: selectedNewcomer.client_name },
          { label: "Phone", value: selectedNewcomer.client_number, type: "phone" as const },
          { label: "Email", value: selectedNewcomer.client_email, type: "email" as const },
          { label: "Asked about", value: selectedNewcomer.interest },
          { label: "Source", value: selectedNewcomer.access_method },
          { label: "First contact", value: selectedNewcomer.the_date, type: "date" as const },
          { label: "Follow-up", value: selectedNewcomer.follow_up_at, type: "date" as const },
          { label: "Notes", value: selectedNewcomer.notes },
          {
            label: "Status",
            value: statusMeta(selectedNewcomer.status, selectedNewcomer.reserved).label,
            type: "badge" as const,
            badgeColor: statusMeta(selectedNewcomer.status, selectedNewcomer.reserved).badge,
          },
        ] : []}
      />
    </div>
  );
}
