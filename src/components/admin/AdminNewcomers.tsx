import { UserPlus } from "lucide-react";

interface Newcomer {
  id: string;
  client_name: string;
  client_number: string | null;
  access_method: string | null;
  the_date: string | null;
  reserved: boolean | null;
}

interface Props { newcomers: Newcomer[]; }

export default function AdminNewcomers({ newcomers }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="h-5 w-5 text-primary" />
        <span className="font-semibold">{newcomers.length} Newcomers / Leads</span>
      </div>
      <div className="rounded-2xl border bg-card shadow-soft overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase">
              <th className="p-3">Name</th><th className="p-3">Phone</th><th className="p-3">Source</th><th className="p-3">Date</th><th className="p-3">Reserved</th>
            </tr>
          </thead>
          <tbody>
            {newcomers.slice(0, 50).map(n => (
              <tr key={n.id} className="border-b last:border-0 hover:bg-muted/20">
                <td className="p-3 font-medium">{n.client_name}</td>
                <td className="p-3 font-mono text-xs">{n.client_number || "—"}</td>
                <td className="p-3 text-xs">{n.access_method || "—"}</td>
                <td className="p-3 text-xs">{n.the_date ? new Date(n.the_date).toLocaleDateString("en-GB") : "—"}</td>
                <td className="p-3">
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${n.reserved ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}`}>
                    {n.reserved ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
