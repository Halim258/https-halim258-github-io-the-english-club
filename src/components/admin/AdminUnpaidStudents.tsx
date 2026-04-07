import { useMemo, useState } from "react";
import { AlertCircle, Search, Phone, ChevronLeft, ChevronRight, DollarSign, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Student {
  id: string;
  name: string;
  phone_number: string | null;
  whatsapp: string | null;
  fees: number | null;
  paid_fees: number | null;
  remaining_fees: number | null;
  group_id: number | null;
  status: string | null;
  reservation_date: string | null;
}

interface Props {
  students: Student[];
}

export default function AdminUnpaidStudents({ students }: Props) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"remaining_fees" | "name" | "fees">("remaining_fees");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [messageTemplate, setMessageTemplate] = useState(
    "مرحباً {name}، نود تذكيركم بأن لديكم مبلغ {amount} جنيه مستحق. نرجو سداد المبلغ في أقرب وقت. شكراً لكم - The English Club"
  );
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const perPage = 25;

  const buildWhatsAppUrl = (student: Student) => {
    const phone = (student.whatsapp || student.phone_number || "").replace(/[^0-9+]/g, "").replace(/^0/, "20");
    const msg = messageTemplate
      .replace("{name}", student.name)
      .replace("{amount}", (student.remaining_fees || 0).toLocaleString());
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const hasPhone = (s: Student) => !!(s.whatsapp || s.phone_number);

  const unpaid = useMemo(() => {
    let list = students.filter(s => (s.remaining_fees || 0) > 0);

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || (s.phone_number || "").includes(q));
    }

    list.sort((a, b) => {
      if (sortField === "name") {
        const cmp = a.name.localeCompare(b.name);
        return sortDir === "desc" ? -cmp : cmp;
      }
      const av = (a[sortField] as number) || 0;
      const bv = (b[sortField] as number) || 0;
      return sortDir === "desc" ? bv - av : av - bv;
    });

    return list;
  }, [students, search, sortField, sortDir]);

  const totalPages = Math.ceil(unpaid.length / perPage);
  const paged = unpaid.slice(page * perPage, (page + 1) * perPage);

  const totalOwed = unpaid.reduce((s, st) => s + (st.remaining_fees || 0), 0);
  const totalFees = unpaid.reduce((s, st) => s + (st.fees || 0), 0);
  const totalPaid = unpaid.reduce((s, st) => s + (st.paid_fees || 0), 0);

  const paidPercent = totalFees > 0 ? Math.round((totalPaid / totalFees) * 100) : 0;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: AlertCircle, label: "Unpaid Students", value: unpaid.length, color: "text-destructive" },
          { icon: DollarSign, label: "Total Owed", value: `${totalOwed.toLocaleString()} EGP`, color: "text-destructive" },
          { icon: DollarSign, label: "Total Paid", value: `${totalPaid.toLocaleString()} EGP` },
          { icon: DollarSign, label: "Collection Rate", value: `${paidPercent}%` },
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

      {/* Progress bar */}
      <div className="mb-6 rounded-xl border bg-card p-4 shadow-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Collection Progress</span>
          <span className="text-sm font-bold text-primary">{paidPercent}%</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${paidPercent}%` }} />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Paid: {totalPaid.toLocaleString()} EGP</span>
          <span>Remaining: {totalOwed.toLocaleString()} EGP</span>
        </div>
      </div>

      {/* Template editor */}
      {showTemplateEditor && (
        <div className="mb-4 rounded-xl border bg-card p-4 shadow-soft">
          <label className="text-sm font-medium mb-2 block">Message Template</label>
          <p className="text-xs text-muted-foreground mb-2">Use <code className="bg-muted px-1 rounded">{"{name}"}</code> for student name and <code className="bg-muted px-1 rounded">{"{amount}"}</code> for remaining fees.</p>
          <textarea
            value={messageTemplate}
            onChange={e => setMessageTemplate(e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm min-h-[80px] resize-y"
            dir="auto"
          />
        </div>
      )}

      {/* Search + Actions */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search student or phone..." value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} className="pl-9" />
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowTemplateEditor(!showTemplateEditor)}>
          <MessageCircle className="h-4 w-4 mr-1" /> {showTemplateEditor ? "Hide Template" : "Edit Message"}
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-3 text-left cursor-pointer select-none" onClick={() => { setSortField("name"); setSortDir(d => sortField === "name" ? (d === "asc" ? "desc" : "asc") : "asc"); }}>
                Student
              </th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-center cursor-pointer select-none" onClick={() => { setSortField("fees"); setSortDir(d => sortField === "fees" ? (d === "asc" ? "desc" : "asc") : "desc"); }}>
                Total Fees
              </th>
              <th className="p-3 text-center">Paid</th>
              <th className="p-3 text-center cursor-pointer select-none" onClick={() => { setSortField("remaining_fees"); setSortDir(d => sortField === "remaining_fees" ? (d === "asc" ? "desc" : "asc") : "desc"); }}>
                Remaining
              </th>
              <th className="p-3 text-center">% Paid</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Remind</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(s => {
              const pct = (s.fees || 0) > 0 ? Math.round(((s.paid_fees || 0) / (s.fees || 1)) * 100) : 0;
              const remaining = s.remaining_fees || 0;
              const urgency = remaining >= 1000 ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                remaining >= 500 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
              return (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3 text-xs">
                    {s.phone_number ? (
                      <a href={`tel:${s.phone_number}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Phone className="h-3 w-3" />{s.phone_number}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="p-3 text-center font-mono">{(s.fees || 0).toLocaleString()}</td>
                  <td className="p-3 text-center font-mono text-primary">{(s.paid_fees || 0).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <span className={`font-mono font-bold text-xs rounded-full px-2 py-0.5 ${urgency}`}>
                      {remaining.toLocaleString()} EGP
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-mono">{pct}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${s.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {s.status || "—"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {hasPhone(s) ? (
                      <a
                        href={buildWhatsAppUrl(s)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-xs font-medium transition-colors"
                      >
                        <Send className="h-3 w-3" /> WhatsApp
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">No phone</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">Page {page + 1} of {totalPages} ({unpaid.length} students)</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 0} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-7 w-7" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        {unpaid.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">🎉 All students have paid their fees!</p>}
      </div>
    </div>
  );
}
