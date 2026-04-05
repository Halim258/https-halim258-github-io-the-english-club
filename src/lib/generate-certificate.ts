import jsPDF from "jspdf";

interface CertificateData {
  cefrLevel: string;
  cefrLabel: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTaken: string;
  date: string;
}

export function generateCertificate(data: CertificateData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // ─── Background ───
  doc.setFillColor(250, 250, 252);
  doc.rect(0, 0, w, h, "F");

  // Decorative border
  doc.setDrawColor(180, 30, 40); // primary red
  doc.setLineWidth(2);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setDrawColor(220, 180, 100); // gold accent
  doc.setLineWidth(0.8);
  doc.rect(14, 14, w - 28, h - 28);

  // Corner ornaments (small squares)
  const corners = [
    [12, 12], [w - 16, 12], [12, h - 16], [w - 16, h - 16],
  ];
  doc.setFillColor(180, 30, 40);
  corners.forEach(([x, y]) => doc.rect(x, y, 4, 4, "F"));

  // ─── Logo area ───
  doc.setFillColor(180, 30, 40);
  doc.circle(w / 2, 35, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("EC", w / 2, 38, { align: "center" });

  // ─── Title ───
  doc.setTextColor(180, 30, 40);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Certificate of Achievement", w / 2, 60, { align: "center" });

  // Subtitle
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("The English Club — Cambridge-Style Placement Test", w / 2, 68, { align: "center" });

  // Decorative line
  doc.setDrawColor(220, 180, 100);
  doc.setLineWidth(0.6);
  doc.line(w / 2 - 60, 73, w / 2 + 60, 73);

  // ─── "This certifies that" ───
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(12);
  doc.text("This is to certify that the holder has completed", w / 2, 83, { align: "center" });
  doc.text("the English Proficiency Placement Test and achieved:", w / 2, 90, { align: "center" });

  // ─── CEFR Level Badge ───
  const badgeY = 105;
  // Badge background
  doc.setFillColor(180, 30, 40);
  roundedRect(doc, w / 2 - 30, badgeY - 12, 60, 24, 6);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text(data.cefrLevel, w / 2, badgeY + 3, { align: "center" });

  // Level description
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.cefrLabel, w / 2, badgeY + 22, { align: "center" });

  // ─── Score details ───
  const detailY = badgeY + 36;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);

  const cols = [
    { label: "Score", value: `${data.score} / ${data.totalQuestions}` },
    { label: "Accuracy", value: `${data.percentage}%` },
    { label: "Time", value: data.timeTaken },
    { label: "Date", value: data.date },
  ];

  const colWidth = 50;
  const startX = w / 2 - (cols.length * colWidth) / 2;

  cols.forEach((col, i) => {
    const cx = startX + i * colWidth + colWidth / 2;
    doc.setFontSize(9);
    doc.setTextColor(140, 140, 140);
    doc.text(col.label, cx, detailY, { align: "center" });
    doc.setFontSize(13);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "bold");
    doc.text(col.value, cx, detailY + 7, { align: "center" });
    doc.setFont("helvetica", "normal");
  });

  // Separator
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(w / 2 - 80, detailY + 14, w / 2 + 80, detailY + 14);

  // ─── CEFR Scale ───
  const scaleY = detailY + 22;
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text("CEFR Scale", w / 2, scaleY, { align: "center" });

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const scaleBarW = 160;
  const cellW = scaleBarW / levels.length;
  const scaleStartX = w / 2 - scaleBarW / 2;

  levels.forEach((lvl, i) => {
    const x = scaleStartX + i * cellW;
    const isActive = lvl === data.cefrLevel;

    if (isActive) {
      doc.setFillColor(180, 30, 40);
      roundedRect(doc, x + 1, scaleY + 3, cellW - 2, 10, 2);
      doc.setTextColor(255, 255, 255);
    } else {
      doc.setFillColor(235, 235, 240);
      roundedRect(doc, x + 1, scaleY + 3, cellW - 2, 10, 2);
      doc.setTextColor(120, 120, 120);
    }
    doc.setFontSize(9);
    doc.setFont("helvetica", isActive ? "bold" : "normal");
    doc.text(lvl, x + cellW / 2, scaleY + 10, { align: "center" });
  });

  // ─── Footer ───
  doc.setTextColor(160, 160, 160);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("The English Club Language School — Alexandria, Egypt", w / 2, h - 22, { align: "center" });
  doc.text("www.theenglishclub.com  •  +20 155 490 1390", w / 2, h - 17, { align: "center" });

  // Save
  doc.save(`English_Club_Certificate_${data.cefrLevel}.pdf`);
}

/** Draw a rounded rectangle (jsPDF doesn't have one built-in) */
function roundedRect(doc: jsPDF, x: number, y: number, w: number, h: number, r: number) {
  doc.roundedRect(x, y, w, h, r, r, "F");
}
