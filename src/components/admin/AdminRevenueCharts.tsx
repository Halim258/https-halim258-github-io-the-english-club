import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ArrowUp, ArrowDown, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminRevenueCharts() {
  const [income, setIncome] = useState<{ date: string; amount: number }[]>([]);
  const [outcome, setOutcome] = useState<{ date: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: incData }, { data: outData }] = await Promise.all([
        supabase.from("school_income").select("date, amount").order("date"),
        supabase.from("school_outcome").select("date, amount").order("date"),
      ]);
      setIncome((incData || []).map(d => ({ date: d.date || "", amount: Number(d.amount) })));
      setOutcome((outData || []).map(d => ({ date: d.date || "", amount: Number(d.amount) })));
      setLoading(false);
    }
    load();
  }, []);

  const monthlyData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};

    income.forEach(d => {
      const month = d.date?.substring(0, 7) || "";
      if (!month) return;
      if (!months[month]) months[month] = { income: 0, expense: 0 };
      months[month].income += d.amount;
    });

    outcome.forEach(d => {
      const month = d.date?.substring(0, 7) || "";
      if (!month) return;
      if (!months[month]) months[month] = { income: 0, expense: 0 };
      months[month].expense += d.amount;
    });

    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([month, data]) => ({
        month,
        label: new Date(month + "-01").toLocaleDateString("en", { month: "short", year: "2-digit" }),
        ...data,
        profit: data.income - data.expense,
      }));
  }, [income, outcome]);

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)), 1);

  const totalIncome = monthlyData.reduce((s, d) => s + d.income, 0);
  const totalExpense = monthlyData.reduce((s, d) => s + d.expense, 0);
  const totalProfit = totalIncome - totalExpense;

  if (loading) return <div className="text-center py-8 text-muted-foreground">Loading charts...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold font-display flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        Revenue Overview
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border bg-card p-4 text-center">
          <ArrowUp className="h-5 w-5 mx-auto text-emerald-500 mb-1" />
          <p className="text-xs text-muted-foreground">Total Income</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalIncome.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <ArrowDown className="h-5 w-5 mx-auto text-rose-500 mb-1" />
          <p className="text-xs text-muted-foreground">Total Expenses</p>
          <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{totalExpense.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <DollarSign className="h-5 w-5 mx-auto text-primary mb-1" />
          <p className="text-xs text-muted-foreground">Net Profit</p>
          <p className={`text-lg font-bold ${totalProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
            {totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      {monthlyData.length > 0 ? (
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Monthly Revenue (Last 12 Months)
          </h3>

          <div className="flex items-end gap-1 h-48">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full flex gap-px" style={{ height: "160px", alignItems: "flex-end" }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.income / maxValue) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-emerald-500/70 rounded-t-sm min-h-[2px]"
                    title={`Income: ${d.income.toLocaleString()}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.expense / maxValue) * 100}%` }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                    className="flex-1 bg-rose-500/70 rounded-t-sm min-h-[2px]"
                    title={`Expense: ${d.expense.toLocaleString()}`}
                  />
                </div>
                <span className="text-[8px] text-muted-foreground leading-none mt-1">{d.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-emerald-500/70" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-rose-500/70" /> Expenses
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">No revenue data available</div>
      )}
    </div>
  );
}
