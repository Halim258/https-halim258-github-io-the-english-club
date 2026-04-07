import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Users, UserCheck, DollarSign, Calendar, UserPlus, Package, Receipt, BarChart3, Award, Download, ClipboardCheck, Timer, AlertCircle, Command } from "lucide-react";

interface Props {
  onNavigate: (tab: string) => void;
}

const commands = [
  { id: "overview", label: "Overview Dashboard", icon: BarChart3, keywords: "home stats kpi" },
  { id: "school-students", label: "Manage Students", icon: Users, keywords: "students school fees" },
  { id: "employees", label: "Manage Employees", icon: UserCheck, keywords: "staff teachers" },
  { id: "groups", label: "Manage Groups", icon: Users, keywords: "classes levels" },
  { id: "sessions", label: "View Sessions", icon: Calendar, keywords: "schedule teaching" },
  { id: "attendance", label: "Attendance Tracker", icon: ClipboardCheck, keywords: "checkin checkout present" },
  { id: "teacher-hours", label: "Teacher Hours", icon: Timer, keywords: "payroll hours lateness" },
  { id: "unpaid", label: "Unpaid Students", icon: AlertCircle, keywords: "fees remaining owed" },
  { id: "finance", label: "Finance & P/L", icon: DollarSign, keywords: "income expenses profit loss money" },
  { id: "newcomers", label: "Leads & Newcomers", icon: UserPlus, keywords: "leads prospects" },
  { id: "products", label: "Products & Pricing", icon: Package, keywords: "items prices" },
  { id: "receipts", label: "Receipts", icon: Receipt, keywords: "payments records" },
  { id: "online-students", label: "Online Users", icon: Users, keywords: "platform users" },
  { id: "tests", label: "Test Results", icon: Award, keywords: "placement cefr levels" },
  { id: "export", label: "Export Data", icon: Download, keywords: "csv download backup" },
];

export default function CommandPalette({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c => {
    const q = query.toLowerCase();
    return c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.id.includes(q);
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(prev => !prev);
      setQuery("");
      setSelectedIdx(0);
    }
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const select = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setQuery(""); setSelectedIdx(0); }}
        className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors shadow-sm"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex ml-2 h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-mono text-muted-foreground">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-2xl border bg-card shadow-2xl overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
            onKeyDown={e => {
              if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, filtered.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
              if (e.key === "Enter" && filtered[selectedIdx]) select(filtered[selectedIdx].id);
            }}
            placeholder="Search tabs, features..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] text-muted-foreground border rounded px-1.5 py-0.5">ESC</kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => select(cmd.id)}
              onMouseEnter={() => setSelectedIdx(i)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                i === selectedIdx ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
              }`}
            >
              <cmd.icon className="h-4 w-4 shrink-0" />
              <span className="font-medium">{cmd.label}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
