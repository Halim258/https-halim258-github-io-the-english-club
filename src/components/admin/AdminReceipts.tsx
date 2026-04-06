import { useState, useMemo } from "react";
import { Search, Receipt, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  receipts: any[];
}

export default function AdminReceipts({ receipts }: Props) {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "paid" | "remaining">("all");

  const filtered = useMemo(() => {
    let list = receipts;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.student_name?.toLowerCase().includes(q) ||
          r.phone_number?.toLowerCase().includes(q) ||
          String(r.receipt_number || "").includes(q)
      );
    }
    if (filterBy === "paid") list = list.filter((r) => (r.remaining_fees || 0) === 0);
    if (filterBy === "remaining") list = list.filter((r) => (r.remaining_fees || 0) > 0);
    return list;
  }, [receipts, search, filterBy]);

  const totalFees = filtered.reduce((s: number, r: any) => s + (r.fees || 0), 0);
  const totalPaid = filtered.reduce((s: number, r: any) => s + (r.paid_fees || 0), 0);
  const totalRemaining = filtered.reduce((s: number, r: any) => s + (r.remaining_fees || 0), 0);

  return (
    <div>
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Total Fees", value: totalFees, color: "text-foreground" },
          { label: "Total Paid", value: totalPaid, color: "text-emerald-600" },
          { label: "Remaining", value: totalRemaining, color: "text-destructive" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border bg-card p-4 shadow-soft">
            <p className="text-xs text-muted-foreground">{c.label}</p>
            <p className={`text-xl font-bold font-display ${c.color}`}>{c.value.toLocaleString()} ج.م</p>
          </div>
        ))}
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or receipt #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["all", "paid", "remaining"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterBy(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                filterBy === f ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "remaining" ? "Has Balance" : f}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">{filtered.length} receipts</p>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-right">Fees</th>
                <th className="p-3 text-right">Paid</th>
                <th className="p-3 text-right">Remaining</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 100).map((r: any) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3 text-muted-foreground">{r.receipt_number || "—"}</td>
                  <td className="p-3 font-medium">{r.student_name || "—"}</td>
                  <td className="p-3 text-muted-foreground">{r.phone_number || "—"}</td>
                  <td className="p-3 text-right font-medium">{(r.fees || 0).toLocaleString()}</td>
                  <td className="p-3 text-right text-emerald-600 font-medium">{(r.paid_fees || 0).toLocaleString()}</td>
                  <td className={`p-3 text-right font-medium ${(r.remaining_fees || 0) > 0 ? "text-destructive" : "text-muted-foreground"}`}>
                    {(r.remaining_fees || 0).toLocaleString()}
                  </td>
                  <td className="p-3 text-xs text-muted-foreground">
                    {r.reservation_date ? new Date(r.reservation_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 100 && (
          <p className="text-xs text-muted-foreground text-center py-3 border-t">Showing first 100 of {filtered.length} results</p>
        )}
      </div>
    </div>
  );
}
