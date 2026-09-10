import jsPDF from "jspdf";
import QRCode from "qrcode";

export interface ReceiptForPdf {
  receipt_number?: number | null;
  student_name?: string | null;
  phone_number?: string | null;
  item_label?: string | null;
  fees?: number | null;
  paid_fees?: number | null;
  remaining_fees?: number | null;
  status?: string | null;
  payment_method?: string | null;
  note?: string | null;
  reservation_date?: string | null;
  issued_at?: string | null;
  public_token?: string | null;
  given_by_name?: string | null;

}

export const receiptShareUrl = (token?: string | null) =>
  token ? `${window.location.origin}/r/${token}` : "";

export const receiptQrDataUrl = (token?: string | null) =>
  QRCode.toDataURL(receiptShareUrl(token), { width: 480, margin: 1 });

const money = (v?: number | null) => `${Number(v || 0).toLocaleString()} EGP`;

export async function downloadReceiptPdf(r: ReceiptForPdf) {
  const doc = new jsPDF({ unit: "pt", format: "a5" });
  const w = doc.internal.pageSize.getWidth();
  const date = r.reservation_date || r.issued_at;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("The English Club Alexandria", 40, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Payment receipt", 40, 68);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`#${r.receipt_number ?? "—"}`, w - 40, 55, { align: "right" });
  if (r.status === "faulty") {
    doc.setTextColor(180, 30, 30);
    doc.setFontSize(11);
    doc.text("FAULTY / VOID", w - 40, 72, { align: "right" });
    doc.setTextColor(0, 0, 0);
  }

  doc.setDrawColor(200);
  doc.line(40, 84, w - 40, 84);

  const rows: [string, string][] = [
    ["Student", r.student_name || "—"],
    ["Phone", r.phone_number || "—"],
    ["Item", r.item_label || "—"],
    ["Total", money(r.fees)],
    ["Paid", money(r.paid_fees)],
    ["Remaining", money(r.remaining_fees)],
    ["Method", (r.payment_method || "cash").replace("_", " ")],
    ["Date", date ? new Date(date).toLocaleString("en-GB") : "—"],
  ];
  if (r.given_by_name) rows.push(["Given by", r.given_by_name]);
  if (r.note) rows.push(["Note", r.note]);


  let y = 110;
  doc.setFontSize(11);
  rows.forEach(([k, v]) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(110);
    doc.text(k, 40, y);
    doc.setTextColor(20);
    doc.setFont("helvetica", "bold");
    doc.text(String(v), 150, y);
    y += 22;
  });

  if (r.public_token) {
    try {
      const qr = await receiptQrDataUrl(r.public_token);
      doc.addImage(qr, "PNG", w - 130, y - 6, 90, 90);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text("Scan to view online", w - 85, y + 96, { align: "center" });
    } catch {
      /* ignore QR failure */
    }
  }

  doc.save(`receipt-${r.receipt_number ?? "new"}.pdf`);
}
