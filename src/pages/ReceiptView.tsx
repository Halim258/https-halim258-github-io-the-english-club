import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { downloadReceiptPdf, receiptQrDataUrl } from "@/lib/receipt-pdf";

export default function ReceiptView() {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState<any | null>(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    document.title = "Your receipt · The English Club Alexandria";
    if (!token) return;
    supabase.rpc("get_receipt_by_token", { _token: token }).then(({ data }) => {
      const row: any = Array.isArray(data) ? data[0] : data;
      setReceipt(row || null);
      setLoading(false);
    });
    receiptQrDataUrl(token).then(setQr).catch(() => {});
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold font-display">Receipt not found</h1>
        <p className="mt-2 text-muted-foreground">This link is not valid. Please ask the office for a new one.</p>
      </div>
    );
  }

  const money = (v: any) => `${Number(v || 0).toLocaleString()} EGP`;
  const rows: [string, string][] = [
    ["Student", receipt.student_name || "—"],
    ["Phone", receipt.phone_number || "—"],
    ["Item", receipt.item_label || "—"],
    ["Total", money(receipt.fees)],
    ["Paid", money(receipt.paid_fees)],
    ["Remaining", money(receipt.remaining_fees)],
    ["Method", String(receipt.payment_method || "cash").replace("_", " ")],
    ["Date", receipt.issued_at ? new Date(receipt.issued_at).toLocaleString("en-GB") : "—"],
  ];

  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <div className="rounded-none border-2 bg-card p-6 shadow-soft">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">The English Club Alexandria</p>
            <h1 className="mt-1 text-2xl font-bold font-display">Payment receipt</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-display">#{receipt.receipt_number ?? "—"}</p>
            {receipt.status === "faulty" && (
              <p className="text-xs font-bold uppercase text-destructive">Faulty / void</p>
            )}
          </div>
        </div>

        <dl className="mt-4 space-y-2 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-dashed py-1.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
          {receipt.note && (
            <div className="flex justify-between gap-4 py-1.5">
              <dt className="text-muted-foreground">Note</dt>
              <dd className="font-medium">{receipt.note}</dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-col items-center gap-3">
          {qr && <img src={qr} alt="Receipt QR code" className="h-36 w-36 border bg-white p-2" />}
          <Button onClick={() => downloadReceiptPdf({ ...receipt, public_token: token })} className="rounded-none">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
