import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Phone, Mail, Calendar, MapPin, DollarSign, User, Hash, Clock, FileText, Tag } from "lucide-react";

interface DetailField {
  label: string;
  value: string | number | boolean | null | undefined;
  type?: "text" | "phone" | "email" | "date" | "currency" | "badge" | "boolean";
  badgeColor?: string;
}

interface DetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  fields: DetailField[];
  avatar?: string;
}

const iconMap: Record<string, React.ElementType> = {
  phone: Phone,
  email: Mail,
  date: Calendar,
  currency: DollarSign,
};

export default function DetailSheet({ open, onOpenChange, title, subtitle, fields, avatar }: DetailSheetProps) {
  const formatValue = (field: DetailField) => {
    const v = field.value;
    if (v === null || v === undefined || v === "") return "—";

    switch (field.type) {
      case "date":
        return new Date(String(v)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      case "currency":
        return `${Number(v).toLocaleString()} ج.م`;
      case "boolean":
        return v ? "✅ Yes" : "❌ No";
      case "phone":
        return String(v);
      default:
        return String(v);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            {avatar && (
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                {avatar}
              </div>
            )}
            <div>
              <SheetTitle className="text-lg">{title}</SheetTitle>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {fields.map((field, i) => {
            const val = formatValue(field);
            if (val === "—" && field.type !== "currency") {
              // Still show it but dimmed
            }

            return (
              <div key={i} className="flex items-start justify-between py-3 px-1 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground shrink-0 mr-4">{field.label}</span>
                <div className="text-right">
                  {field.type === "badge" && val !== "—" ? (
                    <span className={`text-xs font-bold rounded-full px-2.5 py-1 ${field.badgeColor || "bg-primary/10 text-primary"}`}>
                      {val}
                    </span>
                  ) : field.type === "phone" && val !== "—" ? (
                    <a href={`tel:${field.value}`} className="text-sm font-mono text-primary hover:underline">{val}</a>
                  ) : field.type === "email" && val !== "—" ? (
                    <a href={`mailto:${field.value}`} className="text-sm text-primary hover:underline">{val}</a>
                  ) : field.type === "currency" ? (
                    <span className={`text-sm font-mono font-medium ${Number(field.value || 0) > 0 ? "text-foreground" : "text-muted-foreground"}`}>{val}</span>
                  ) : (
                    <span className={`text-sm font-medium ${val === "—" ? "text-muted-foreground" : "text-foreground"}`}>{val}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
