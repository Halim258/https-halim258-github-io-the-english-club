import { useState, useCallback } from "react";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  schoolStudents: any[];
  income: any[];
  outcome: any[];
  newcomers: any[];
  sessions: any[];
  receipts: any[];
}

export default function AIInsights({ schoolStudents, income, outcome, newcomers, sessions, receipts }: Props) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInsights = useCallback(async () => {
    setLoading(true);
    setError(null);
    setInsights(null);

    // Prepare summary data
    const now = new Date();
    const monthAgo = new Date(now.getTime() - 30 * 86400000);
    const weekAgo = new Date(now.getTime() - 7 * 86400000);

    const totalStudents = schoolStudents.length;
    const activeStudents = schoolStudents.filter(s => s.status === "active").length;
    const unpaidCount = schoolStudents.filter(s => (s.remaining_fees || 0) > 0).length;
    const totalOwed = schoolStudents.reduce((s, st) => s + (st.remaining_fees || 0), 0);
    const totalIncome = income.reduce((s, r) => s + r.amount, 0);
    const totalExpenses = outcome.reduce((s, r) => s + r.amount, 0);
    const monthlyIncome = income.filter(r => r.date && new Date(r.date) >= monthAgo).reduce((s, r) => s + r.amount, 0);
    const monthlyExpenses = outcome.filter(r => r.date && new Date(r.date) >= monthAgo).reduce((s, r) => s + r.amount, 0);
    const newLeads = newcomers.filter(n => n.the_date && new Date(n.the_date) >= monthAgo).length;
    const conversionRate = newcomers.length > 0 ? Math.round((totalStudents / newcomers.length) * 100) : 0;
    const recentSessions = sessions.filter(s => s.session_date && new Date(s.session_date) >= weekAgo).length;

    const summary = `School Data Summary:
- Total Students: ${totalStudents} (${activeStudents} active)
- Unpaid Students: ${unpaidCount}, Total Owed: ${totalOwed} EGP
- Total Income: ${totalIncome} EGP, Total Expenses: ${totalExpenses} EGP
- This Month Income: ${monthlyIncome} EGP, Expenses: ${monthlyExpenses} EGP
- Net Profit (All Time): ${totalIncome - totalExpenses} EGP
- Monthly Leads: ${newLeads}, Overall Conversion: ${conversionRate}%
- Sessions This Week: ${recentSessions}
- Total Receipts: ${receipts.length}`;

    try {
      const { data, error: fnError } = await supabase.functions.invoke("admin-insights", {
        body: { summary },
      });

      if (fnError) throw fnError;
      setInsights(data?.insights || "No insights generated.");
    } catch (err: any) {
      console.error("AI insights error:", err);
      setError(err.message || "Failed to generate insights. Try again.");
    } finally {
      setLoading(false);
    }
  }, [schoolStudents, income, outcome, newcomers, sessions, receipts]);

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-5 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-display flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> AI Insights
        </h3>
        <Button
          size="sm"
          variant="outline"
          onClick={generateInsights}
          disabled={loading}
          className="h-7 text-xs"
        >
          {loading ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <RefreshCw className="h-3 w-3 mr-1" />}
          {insights ? "Refresh" : "Generate"}
        </Button>
      </div>

      {!insights && !loading && !error && (
        <div className="text-center py-6">
          <Sparkles className="h-8 w-8 text-primary/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Click "Generate" for AI-powered insights about your school.</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8 gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Analyzing your data...</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {insights && !loading && (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {insights.split("\n").map((line, i) => {
            if (!line.trim()) return null;
            if (line.startsWith("##")) return <h4 key={i} className="text-sm font-semibold mt-3 mb-1">{line.replace(/^#+\s*/, "")}</h4>;
            if (line.startsWith("- ") || line.startsWith("• ")) return <p key={i} className="text-xs text-muted-foreground pl-3 my-0.5">• {line.replace(/^[-•]\s*/, "")}</p>;
            if (line.startsWith("**")) return <p key={i} className="text-xs font-semibold my-1">{line.replace(/\*\*/g, "")}</p>;
            return <p key={i} className="text-xs text-muted-foreground my-0.5">{line}</p>;
          })}
        </div>
      )}
    </div>
  );
}
