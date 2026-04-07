import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus, Search, ChevronLeft, ChevronRight, Calendar, Pencil, Trash2, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface IncomeRow { id: string; amount: number; reason: string | null; category: string | null; date: string | null; receipt_number: number | null; }
interface OutcomeRow { id: string; amount: number; reason: string | null; category: string | null; date: string | null; }

interface Props {
  income: IncomeRow[];
  outcome: OutcomeRow[];
  onRefresh: () => void;
}

export default function AdminFinance({ income, outcome, onRefresh }: Props) {
  const [tab, setTab] = useState<"overview" | "income" | "expenses">("overview");
  const [openIncome, setOpenIncome] = useState(false);
  const [openExpense, setOpenExpense] = useState(false);
  const [incForm, setIncForm] = useState({ amount: "", reason: "", category: "", date: "" });
  const [expForm, setExpForm] = useState({ amount: "", reason: "", category: "", date: "" });
  const [searchInc, setSearchInc] = useState("");
  const [searchExp, setSearchExp] = useState("");
  const [incPage, setIncPage] = useState(0);
  const [expPage, setExpPage] = useState(0);
  const [editType, setEditType] = useState<"income" | "expense" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ amount: "", reason: "", category: "", date: "" });
  const perPage = 25;
  const { toast } = useToast();

  const totalIncome = income.reduce((s, r) => s + r.amount, 0);
  const totalExpenses = outcome.reduce((s, r) => s + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  // Monthly breakdown
  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expenses: number }> = {};
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      months[key] = { income: 0, expenses: 0 };
    }
    income.forEach(r => { if (!r.date) return; const d = new Date(r.date); const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; if (months[k]) months[k].income += r.amount; });
    outcome.forEach(r => { if (!r.date) return; const d = new Date(r.date); const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; if (months[k]) months[k].expenses += r.amount; });
    return Object.entries(months).map(([key, val]) => ({ month: new Date(key + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }), ...val, profit: val.income - val.expenses }));
  }, [income, outcome]);

  // Category breakdown
  const categoryIncome = useMemo(() => {
    const cats: Record<string, number> = {};
    income.forEach(r => { const c = r.category || "Other"; cats[c] = (cats[c] || 0) + r.amount; });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [income]);

  const categoryExpense = useMemo(() => {
    const cats: Record<string, number> = {};
    outcome.forEach(r => { const c = r.category || "Other"; cats[c] = (cats[c] || 0) + r.amount; });
    return Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [outcome]);

  const filteredIncome = useMemo(() => {
    if (!searchInc) return income;
    const q = searchInc.toLowerCase();
    return income.filter(r => (r.reason || "").toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q));
  }, [income, searchInc]);

  const filteredExpenses = useMemo(() => {
    if (!searchExp) return outcome;
    const q = searchExp.toLowerCase();
    return outcome.filter(r => (r.reason || "").toLowerCase().includes(q) || (r.category || "").toLowerCase().includes(q));
  }, [outcome, searchExp]);

  const incPages = Math.ceil(filteredIncome.length / perPage);
  const expPages = Math.ceil(filteredExpenses.length / perPage);

  const handleAddIncome = async () => {
    const { error } = await supabase.from("school_income").insert({
      amount: Number(incForm.amount) || 0, reason: incForm.reason || null,
      category: incForm.category || null, date: incForm.date ? new Date(incForm.date).toISOString() : new Date().toISOString(),
    });
    if (!error) { toast({ title: "Income added" }); setOpenIncome(false); setIncForm({ amount: "", reason: "", category: "", date: "" }); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const handleAddExpense = async () => {
    const { error } = await supabase.from("school_outcome").insert({
      amount: Number(expForm.amount) || 0, reason: expForm.reason || null,
      category: expForm.category || null, date: expForm.date ? new Date(expForm.date).toISOString() : new Date().toISOString(),
    });
    if (!error) { toast({ title: "Expense added" }); setOpenExpense(false); setExpForm({ amount: "", reason: "", category: "", date: "" }); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const openEditRow = (type: "income" | "expense", row: any) => {
    setEditType(type); setEditId(row.id);
    setEditForm({ amount: String(row.amount), reason: row.reason || "", category: row.category || "", date: row.date ? new Date(row.date).toISOString().split("T")[0] : "" });
  };

  const handleEditSave = async () => {
    if (!editId || !editType) return;
    const table = editType === "income" ? "school_income" : "school_outcome";
    const { error } = await supabase.from(table).update({
      amount: Number(editForm.amount) || 0, reason: editForm.reason || null,
      category: editForm.category || null, date: editForm.date ? new Date(editForm.date).toISOString() : null,
    }).eq("id", editId);
    if (!error) { toast({ title: "Updated" }); setEditType(null); setEditId(null); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const handleDeleteRow = async (type: "income" | "expense", id: string) => {
    const table = type === "income" ? "school_income" : "school_outcome";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (!error) { toast({ title: "Deleted" }); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const maxCatIncome = categoryIncome.length > 0 ? categoryIncome[0][1] : 1;
  const maxCatExpense = categoryExpense.length > 0 ? categoryExpense[0][1] : 1;

  const renderTable = (data: any[], type: "income" | "expense", pageNum: number, setPageNum: (fn: (p: number) => number) => void, totalPages: number) => (
    <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase"><th className="p-3">Date</th><th className="p-3">Amount</th><th className="p-3">Reason</th><th className="p-3">Category</th><th className="p-3 text-center">Actions</th></tr></thead>
          <tbody>
            {data.slice(pageNum * perPage, (pageNum + 1) * perPage).map(r => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20">
                <td className="p-3 text-xs">{r.date ? new Date(r.date).toLocaleDateString("en-GB") : "—"}</td>
                <td className={`p-3 font-mono font-bold ${type === "income" ? "text-emerald-600" : "text-red-600"}`}>{r.amount.toLocaleString()}</td>
                <td className="p-3">{r.reason || "—"}</td>
                <td className="p-3 text-xs">{r.category || "—"}</td>
                <td className="p-3">
                  <div className="flex items-center justify-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditRow(type, r)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Delete</AlertDialogTitle><AlertDialogDescription>Delete this record?</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteRow(type, r.id)} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-xs text-muted-foreground">Page {pageNum + 1} of {totalPages}</p>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={pageNum === 0} onClick={() => setPageNum(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={pageNum >= totalPages - 1} onClick={() => setPageNum(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-emerald-600" /><span className="text-xs text-muted-foreground">Total Income</span></div>
          <p className="text-2xl font-bold font-display text-emerald-600">{totalIncome.toLocaleString()} ج.م</p>
          <p className="text-[10px] text-muted-foreground mt-1">{income.length} transactions</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><TrendingDown className="h-4 w-4 text-red-600" /><span className="text-xs text-muted-foreground">Total Expenses</span></div>
          <p className="text-2xl font-bold font-display text-red-600">{totalExpenses.toLocaleString()} ج.م</p>
          <p className="text-[10px] text-muted-foreground mt-1">{outcome.length} transactions</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Net Profit</span></div>
          <p className={`text-2xl font-bold font-display ${netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>{netProfit.toLocaleString()} ج.م</p>
          <p className="text-[10px] text-muted-foreground mt-1">{netProfit >= 0 ? "Profitable" : "Loss"}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["overview", "income", "expenses"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-card shadow-sm border" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "overview" ? "📊 Overview" : t === "income" ? "📈 Income" : "📉 Expenses"}
          </button>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editType !== null} onOpenChange={(open) => { if (!open) { setEditType(null); setEditId(null); } }}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit {editType === "income" ? "Income" : "Expense"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Amount (ج.م)</Label><Input type="number" value={editForm.amount} onChange={e => setEditForm({...editForm, amount: e.target.value})} /></div>
            <div><Label>Reason</Label><Input value={editForm.reason} onChange={e => setEditForm({...editForm, reason: e.target.value})} /></div>
            <div><Label>Category</Label><Input value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} /></div>
            <div><Label>Date</Label><Input type="date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} /></div>
            <Button onClick={handleEditSave} className="w-full">Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {tab === "overview" && (
        <div className="space-y-6">
          {/* Monthly chart */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-4"><BarChart3 className="h-4 w-4 text-primary" /> Monthly Breakdown (12 months)</h3>
            <div className="space-y-2">
              {monthlyData.map(m => {
                const max = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)), 1);
                return (
                  <div key={m.month} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium w-16">{m.month}</span>
                      <div className="flex gap-3">
                        <span className="text-emerald-600">+{m.income.toLocaleString()}</span>
                        <span className="text-red-500">-{m.expenses.toLocaleString()}</span>
                        <span className={`font-bold ${m.profit >= 0 ? "text-emerald-700" : "text-red-700"}`}>{m.profit >= 0 ? "+" : ""}{m.profit.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 h-2.5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(m.income / max) * 100}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-emerald-500" />
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(m.expenses / max) * 100}%` }} transition={{ duration: 0.6, delay: 0.1 }} className="h-full rounded-full bg-red-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold mb-4 text-emerald-600">Income by Category</h3>
              <div className="space-y-2">
                {categoryIncome.map(([cat, val]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-0.5"><span>{cat}</span><span className="font-mono font-bold">{val.toLocaleString()}</span></div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(val / maxCatIncome) * 100}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold mb-4 text-red-600">Expenses by Category</h3>
              <div className="space-y-2">
                {categoryExpense.map(([cat, val]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-0.5"><span>{cat}</span><span className="font-mono font-bold">{val.toLocaleString()}</span></div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(val / maxCatExpense) * 100}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-red-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h3 className="text-sm font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-2">
              {[...income.map(r => ({...r, type: "income" as const})), ...outcome.map(r => ({...r, type: "expense" as const, receipt_number: null}))]
                .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                .slice(0, 10)
                .map(r => (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3">
                      {r.type === "income" ? <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                      <div>
                        <p className="text-sm font-medium">{r.reason || (r.type === "income" ? "Income" : "Expense")}</p>
                        <p className="text-[10px] text-muted-foreground">{r.category || "—"} • {r.date ? new Date(r.date).toLocaleDateString("en-GB") : "—"}</p>
                      </div>
                    </div>
                    <span className={`font-mono font-bold text-sm ${r.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                      {r.type === "income" ? "+" : "-"}{r.amount.toLocaleString()} ج.م
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {tab === "income" && (
        <div>
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search income..." value={searchInc} onChange={e => { setSearchInc(e.target.value); setIncPage(0); }} className="pl-9" />
            </div>
            <Dialog open={openIncome} onOpenChange={setOpenIncome}>
              <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Income</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Income</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Amount (ج.م)</Label><Input type="number" value={incForm.amount} onChange={e => setIncForm({...incForm, amount: e.target.value})} /></div>
                  <div><Label>Reason</Label><Input value={incForm.reason} onChange={e => setIncForm({...incForm, reason: e.target.value})} /></div>
                  <div><Label>Category</Label><Input value={incForm.category} onChange={e => setIncForm({...incForm, category: e.target.value})} /></div>
                  <div><Label>Date</Label><Input type="date" value={incForm.date} onChange={e => setIncForm({...incForm, date: e.target.value})} /></div>
                  <Button onClick={handleAddIncome} className="w-full">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable(filteredIncome, "income", incPage, setIncPage, incPages)}
        </div>
      )}

      {tab === "expenses" && (
        <div>
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." value={searchExp} onChange={e => { setSearchExp(e.target.value); setExpPage(0); }} className="pl-9" />
            </div>
            <Dialog open={openExpense} onOpenChange={setOpenExpense}>
              <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Expense</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Amount (ج.م)</Label><Input type="number" value={expForm.amount} onChange={e => setExpForm({...expForm, amount: e.target.value})} /></div>
                  <div><Label>Reason</Label><Input value={expForm.reason} onChange={e => setExpForm({...expForm, reason: e.target.value})} /></div>
                  <div><Label>Category</Label><Input value={expForm.category} onChange={e => setExpForm({...expForm, category: e.target.value})} /></div>
                  <div><Label>Date</Label><Input type="date" value={expForm.date} onChange={e => setExpForm({...expForm, date: e.target.value})} /></div>
                  <Button onClick={handleAddExpense} className="w-full">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {renderTable(filteredExpenses, "expense", expPage, setExpPage, expPages)}
        </div>
      )}
    </div>
  );
}
