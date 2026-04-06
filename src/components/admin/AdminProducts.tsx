import { Package } from "lucide-react";

interface Product {
  id: string;
  product: string;
  price: number | null;
  price_for_members: number | null;
  per: string | null;
}

interface Props { products: Product[]; }

export default function AdminProducts({ products }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-primary" />
        <span className="font-semibold">{products.length} Products & Services</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <div key={p.id} className="rounded-xl border bg-card p-4 shadow-soft">
            <h4 className="font-semibold text-sm mb-1">{p.product}</h4>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono font-bold text-primary">{p.price?.toLocaleString() || 0} ج.م</span>
              {p.price_for_members != null && (
                <span className="font-mono text-emerald-600">Members: {p.price_for_members.toLocaleString()} ج.م</span>
              )}
            </div>
            {p.per && <p className="text-[10px] text-muted-foreground mt-1">Per: {p.per}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
