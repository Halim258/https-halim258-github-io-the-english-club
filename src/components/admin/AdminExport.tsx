import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Props {
  students: any[];
  employees: any[];
  income: any[];
  outcome: any[];
  receipts: any[];
  newcomers: any[];
}

function toCSV(headers: string[], rows: string[][]): string {
  const escape = (v: string) => `"${String(v || "").replace(/"/g, '""')}"`;
  return [headers.map(escape).join(","), ...rows.map(r => r.map(escape).join(","))].join("\n");
}

function downloadCSV(filename: string, csv: string) {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminExport({ students, employees, income, outcome, receipts, newcomers }: Props) {
  const { toast } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);

  const exports = [
    {
      id: "students",
      label: "Students",
      count: students.length,
      icon: "👨‍🎓",
      action: () => {
        const csv = toCSV(
          ["Name", "Phone", "Email", "Status", "Group", "Fees", "Paid", "Remaining", "Level"],
          students.map(s => [s.name, s.phone_number, s.email, s.status, s.group_id, s.fees, s.paid_fees, s.remaining_fees, s.placement_test_result])
        );
        downloadCSV("students.csv", csv);
      }
    },
    {
      id: "employees",
      label: "Employees",
      count: employees.length,
      icon: "👔",
      action: () => {
        const csv = toCSV(
          ["Name", "Position", "Phone", "Phone 2"],
          employees.map(e => [e.name, e.position, e.phone_number, e.phone_number_2])
        );
        downloadCSV("employees.csv", csv);
      }
    },
    {
      id: "income",
      label: "Income",
      count: income.length,
      icon: "📈",
      action: () => {
        const csv = toCSV(
          ["Date", "Amount", "Reason", "Category", "Receipt #"],
          income.map(r => [r.date ? new Date(r.date).toLocaleDateString("en-GB") : "", r.amount, r.reason, r.category, r.receipt_number])
        );
        downloadCSV("income.csv", csv);
      }
    },
    {
      id: "expenses",
      label: "Expenses",
      count: outcome.length,
      icon: "📉",
      action: () => {
        const csv = toCSV(
          ["Date", "Amount", "Reason", "Category"],
          outcome.map(r => [r.date ? new Date(r.date).toLocaleDateString("en-GB") : "", r.amount, r.reason, r.category])
        );
        downloadCSV("expenses.csv", csv);
      }
    },
    {
      id: "receipts",
      label: "Receipts",
      count: receipts.length,
      icon: "🧾",
      action: () => {
        const csv = toCSV(
          ["Receipt #", "Student", "Phone", "Fees", "Paid", "Remaining", "Date"],
          receipts.map(r => [r.receipt_number, r.student_name, r.phone_number, r.fees, r.paid_fees, r.remaining_fees, r.reservation_date ? new Date(r.reservation_date).toLocaleDateString("en-GB") : ""])
        );
        downloadCSV("receipts.csv", csv);
      }
    },
    {
      id: "newcomers",
      label: "Newcomers",
      count: newcomers.length,
      icon: "🆕",
      action: () => {
        const csv = toCSV(
          ["Name", "Phone", "Source", "Date", "Reserved"],
          newcomers.map(n => [n.client_name, n.client_number, n.access_method, n.the_date ? new Date(n.the_date).toLocaleDateString("en-GB") : "", n.reserved ? "Yes" : "No"])
        );
        downloadCSV("newcomers.csv", csv);
      }
    },
  ];

  const handleExport = (exp: typeof exports[0]) => {
    setExporting(exp.id);
    setTimeout(() => {
      exp.action();
      toast({ title: `${exp.label} exported`, description: `${exp.count} records exported to CSV` });
      setExporting(null);
    }, 300);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <FileSpreadsheet className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Export Data</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {exports.map(exp => (
          <div key={exp.id} className="rounded-xl border bg-card p-5 shadow-soft hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{exp.icon}</span>
              <div>
                <h4 className="font-semibold text-sm">{exp.label}</h4>
                <p className="text-xs text-muted-foreground">{exp.count} records</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              disabled={exporting === exp.id}
              onClick={() => handleExport(exp)}
            >
              <Download className="h-4 w-4 mr-1" />
              {exporting === exp.id ? "Exporting..." : "Export CSV"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
