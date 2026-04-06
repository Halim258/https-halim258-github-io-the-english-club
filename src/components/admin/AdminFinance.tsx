import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [incForm, setIncForm] = useState({ amount: "", reason: "", category: "" });
  const [expForm, setExpForm] = useState({ amount: "", reason: "", category: "" });
  const { toast } = useToast();

  const totalIncome = income.reduce((s, r) => s + r.amount, 0);
  const totalExpenses = outcome.reduce((s, r) => s + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const handleAddIncome = async () => {
    const { error } = await supabase.from("school_income").insert({
      amount: Number(incForm.amount) || 0,
      reason: incForm.reason || null,
      category: incForm.category || null,
      date: new Date().toISOString(),
    });
    if (!error) { toast({ title: "Income added" }); setOpenIncome(false); setIncForm({ amount: "", reason: "", category: "" }); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const handleAddExpense = async () => {
    const { error } = await supabase.from("school_outcome").insert({
      amount: Number(expForm.amount) || 0,
      reason: expForm.reason || null,
      category: expForm.category || null,
      date: new Date().toISOString(),
    });
    if (!error) { toast({ title: "Expense added" }); setOpenExpense(false); setExpForm({ amount: "", reason: "", category: "" }); onRefresh(); }
    else toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-emerald-600" /><span className="text-xs text-muted-foreground">Total Income</span></div>
          <p className="text-2xl font-bold font-display text-emerald-600">{totalIncome.toLocaleString()} ج.م</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><TrendingDown className="h-4 w-4 text-red-600" /><span className="text-xs text-muted-foreground">Total Expenses</span></div>
          <p className="text-2xl font-bold font-display text-red-600">{totalExpenses.toLocaleString()} ج.م</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-soft">
          <div className="flex items-center gap-2 mb-1"><DollarSign className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Net Profit</span></div>
          <p className={`text-2xl font-bold font-display ${netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>{netProfit.toLocaleString()} ج.م</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {(["overview", "income", "expenses"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            {t === "overview" ? "Overview" : t === "income" ? "Income" : "Expenses"}
          </button>
        ))}
      </div>

      {tab === "income" && (
        <div>
          <div className="flex justify-end mb-3">
            <Dialog open={openIncome} onOpenChange={setOpenIncome}>
              <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Income</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Income</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Amount (ج.م)</Label><Input type="number" value={incForm.amount} onChange={e => setIncForm({...incForm, amount: e.target.value})} /></div>
                  <div><Label>Reason</Label><Input value={incForm.reason} onChange={e => setIncForm({...incForm, reason: e.target.value})} /></div>
                  <div><Label>Category</Label><Input value={incForm.category} onChange={e => setIncForm({...incForm, category: e.target.value})} /></div>
                  <Button onClick={handleAddIncome} className="w-full">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-2xl border bg-card shadow-soft overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase"><th className="p-3">Date</th><th className="p-3">Amount</th><th className="p-3">Reason</th><th className="p-3">Category</th></tr></thead>
              <tbody>
                {income.slice(0, 50).map(r => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 text-xs">{r.date ? new Date(r.date).toLocaleDateString("en-GB") : "—"}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">{r.amount.toLocaleString()}</td>
                    <td className="p-3">{r.reason || "—"}</td>
                    <td className="p-3 text-xs">{r.category || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "expenses" && (
        <div>
          <div className="flex justify-end mb-3">
            <Dialog open={openExpense} onOpenChange={setOpenExpense}>
              <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Expense</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Amount (ج.م)</Label><Input type="number" value={expForm.amount} onChange={e => setExpForm({...expForm, amount: e.target.value})} /></div>
                  <div><Label>Reason</Label><Input value={expForm.reason} onChange={e => setExpForm({...expForm, reason: e.target.value})} /></div>
                  <div><Label>Category</Label><Input value={expForm.category} onChange={e => setExpForm({...expForm, category: e.target.value})} /></div>
                  <Button onClick={handleAddExpense} className="w-full">Add</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="rounded-2xl border bg-card shadow-soft overflow-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase"><th className="p-3">Date</th><th className="p-3">Amount</th><th className="p-3">Reason</th><th className="p-3">Category</th></tr></thead>
              <tbody>
                {outcome.slice(0, 50).map(r => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3 text-xs">{r.date ? new Date(r.date).toLocaleDateString("en-GB") : "—"}</td>
                    <td className="p-3 font-mono font-bold text-red-600">{r.amount.toLocaleString()}</td>
                    <td className="p-3">{r.reason || "—"}</td>
                    <td className="p-3 text-xs">{r.category || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "overview" && (
        <div className="rounded-2xl border bg-card p-6 shadow-soft">
          <h3 className="text-sm font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {[...income.map(r => ({...r, type: "income" as const})), ...outcome.map(r => ({...r, type: "expense" as const, receipt_number: null}))]
              .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
              .slice(0, 15)
              .map(r => (
                <div key={r.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    {r.type === "income" ? <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                    <div>
                      <p className="text-sm font-medium">{r.reason || (r.type === "income" ? "Income" : "Expense")}</p>
                      <p className="text-[10px] text-muted-foreground">{r.date ? new Date(r.date).toLocaleDateString("en-GB") : "—"}</p>
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-sm ${r.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                    {r.type === "income" ? "+" : "-"}{r.amount.toLocaleString()} ج.م
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
