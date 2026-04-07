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
  const [tab, setTab] = useState<"overview" | "income" | "expenses" | "pnl">("overview");
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

  // Fixed monthly expenses for P&L
  const [fixedExpenses, setFixedExpenses] = useState([
    { name: "Rent", amount: 5000 },
    { name: "Electricity", amount: 800 },
    { name: "Water", amount: 200 },
    { name: "Internet", amount: 500 },
    { name: "Cleaning", amount: 400 },
  ]);
  const [newFixedName, setNewFixedName] = useState("");
  const [newFixedAmount, setNewFixedAmount] = useState("");
  const [pnlMonth, setPnlMonth] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

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
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {(["overview", "income", "expenses", "pnl"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tab === t ? "bg-card shadow-sm border" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "overview" ? "📊 Overview" : t === "income" ? "📈 Income" : t === "expenses" ? "📉 Expenses" : "📋 P&L"}
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

      {tab === "pnl" && (() => {
        const monthIncome = income.filter(r => {
          if (!r.date) return false;
          const d = new Date(r.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === pnlMonth;
        });
        const monthOutcome = outcome.filter(r => {
          if (!r.date) return false;
          const d = new Date(r.date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` === pnlMonth;
        });

        const totalMonthIncome = monthIncome.reduce((s, r) => s + r.amount, 0);
        const totalMonthExpenses = monthOutcome.reduce((s, r) => s + r.amount, 0);
        const totalFixed = fixedExpenses.reduce((s, e) => s + e.amount, 0);
        const totalAllExpenses = totalMonthExpenses + totalFixed;
        const netPnl = totalMonthIncome - totalAllExpenses;
        const margin = totalMonthIncome > 0 ? ((netPnl / totalMonthIncome) * 100).toFixed(1) : "0";

        // Group variable expenses by category
        const varCats: Record<string, number> = {};
        monthOutcome.forEach(r => { const c = r.category || "Other"; varCats[c] = (varCats[c] || 0) + r.amount; });

        // Group income by category
        const incCats: Record<string, number> = {};
        monthIncome.forEach(r => { const c = r.category || "Other"; incCats[c] = (incCats[c] || 0) + r.amount; });

        const pnlMonthLabel = (() => {
          const [y, mo] = pnlMonth.split("-");
          return new Date(parseInt(y), parseInt(mo) - 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
        })();

        // Available months
        const availableMonths = (() => {
          const set = new Set<string>();
          income.forEach(r => { if (r.date) { const d = new Date(r.date); set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); }});
          outcome.forEach(r => { if (r.date) { const d = new Date(r.date); set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`); }});
          set.add(pnlMonth);
          return Array.from(set).sort().reverse();
        })();

        return (
          <div className="space-y-6">
            {/* Month selector */}
            <div className="flex flex-wrap items-center gap-3">
              <select value={pnlMonth} onChange={e => setPnlMonth(e.target.value)} className="rounded-md border bg-background px-3 py-2 text-sm font-medium">
                {availableMonths.map(m => {
                  const [y, mo] = m.split("-");
                  return <option key={m} value={m}>{new Date(parseInt(y), parseInt(mo) - 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</option>;
                })}
              </select>
              <span className="text-sm text-muted-foreground">Profit & Loss Statement</span>
            </div>

            {/* P&L Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border bg-card p-4 shadow-soft">
                <span className="text-xs text-muted-foreground">Revenue</span>
                <p className="text-xl font-bold font-display text-emerald-600 mt-1">{totalMonthIncome.toLocaleString()} ج.م</p>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-soft">
                <span className="text-xs text-muted-foreground">Variable Expenses</span>
                <p className="text-xl font-bold font-display text-red-600 mt-1">{totalMonthExpenses.toLocaleString()} ج.م</p>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-soft">
                <span className="text-xs text-muted-foreground">Fixed Expenses</span>
                <p className="text-xl font-bold font-display text-amber-600 mt-1">{totalFixed.toLocaleString()} ج.م</p>
              </div>
              <div className={`rounded-xl border p-4 shadow-soft ${netPnl >= 0 ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"}`}>
                <span className="text-xs text-muted-foreground">{netPnl >= 0 ? "Net Profit ✅" : "Net Loss ❌"}</span>
                <p className={`text-xl font-bold font-display mt-1 ${netPnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>{netPnl.toLocaleString()} ج.م</p>
                <p className="text-[10px] text-muted-foreground">Margin: {margin}%</p>
              </div>
            </div>

            {/* P&L Statement */}
            <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
              <div className="p-4 border-b bg-muted/50">
                <h3 className="text-sm font-bold">📋 Profit & Loss — {pnlMonthLabel}</h3>
              </div>
              <div className="divide-y">
                {/* Revenue Section */}
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">Revenue</p>
                  {Object.entries(incCats).map(([cat, val]) => (
                    <div key={cat} className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-mono font-medium text-emerald-600">+{val.toLocaleString()}</span>
                    </div>
                  ))}
                  {Object.keys(incCats).length === 0 && <p className="text-xs text-muted-foreground">No income this month</p>}
                  <div className="flex justify-between py-2 mt-2 border-t font-bold text-sm">
                    <span>Total Revenue</span>
                    <span className="font-mono text-emerald-600">{totalMonthIncome.toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Variable Expenses Section */}
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-3">Variable Expenses</p>
                  {Object.entries(varCats).map(([cat, val]) => (
                    <div key={cat} className="flex justify-between py-1 text-sm">
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-mono font-medium text-red-600">-{val.toLocaleString()}</span>
                    </div>
                  ))}
                  {Object.keys(varCats).length === 0 && <p className="text-xs text-muted-foreground">No variable expenses this month</p>}
                  <div className="flex justify-between py-2 mt-2 border-t font-bold text-sm">
                    <span>Total Variable</span>
                    <span className="font-mono text-red-600">-{totalMonthExpenses.toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Fixed Expenses Section */}
                <div className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3">Fixed Monthly Expenses</p>
                  {fixedExpenses.map((e, i) => (
                    <div key={i} className="flex items-center justify-between py-1 text-sm group">
                      <span className="text-muted-foreground">{e.name}</span>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="w-24 h-7 text-xs text-right"
                          value={e.amount}
                          onChange={ev => {
                            const updated = [...fixedExpenses];
                            updated[i] = { ...updated[i], amount: Number(ev.target.value) || 0 };
                            setFixedExpenses(updated);
                          }}
                        />
                        <button
                          onClick={() => setFixedExpenses(fixedExpenses.filter((_, j) => j !== i))}
                          className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >✕</button>
                      </div>
                    </div>
                  ))}
                  {/* Add new fixed expense */}
                  <div className="flex gap-2 mt-3">
                    <Input
                      placeholder="Expense name..."
                      value={newFixedName}
                      onChange={e => setNewFixedName(e.target.value)}
                      className="h-8 text-xs flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={newFixedAmount}
                      onChange={e => setNewFixedAmount(e.target.value)}
                      className="h-8 text-xs w-24"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => {
                        if (newFixedName && newFixedAmount) {
                          setFixedExpenses([...fixedExpenses, { name: newFixedName, amount: Number(newFixedAmount) || 0 }]);
                          setNewFixedName(""); setNewFixedAmount("");
                        }
                      }}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex justify-between py-2 mt-2 border-t font-bold text-sm">
                    <span>Total Fixed</span>
                    <span className="font-mono text-amber-600">-{totalFixed.toLocaleString()} ج.م</span>
                  </div>
                </div>

                {/* Net Result */}
                <div className={`p-4 ${netPnl >= 0 ? "bg-emerald-50 dark:bg-emerald-950/20" : "bg-red-50 dark:bg-red-950/20"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-bold">{netPnl >= 0 ? "✅ Net Profit" : "❌ Net Loss"}</p>
                      <p className="text-xs text-muted-foreground">Revenue − Variable Expenses − Fixed Expenses</p>
                    </div>
                    <p className={`text-2xl font-bold font-display ${netPnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {netPnl.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${netPnl >= 0 ? "bg-emerald-500" : "bg-red-500"}`}
                      style={{ width: `${Math.min(Math.abs(netPnl / (totalMonthIncome || 1)) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">Margin: {margin}%</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
