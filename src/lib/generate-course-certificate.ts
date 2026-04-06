import jsPDF from "jspdf";

interface CourseCertificateData {
  courseName: string;
  studentName: string;
  lessonsCompleted: number;
  totalLessons: number;
  date: string;
}

export function generateCourseCertificate(data: CourseCertificateData) {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(250, 250, 252);
  doc.rect(0, 0, w, h, "F");

  // Decorative border
  doc.setDrawColor(180, 30, 40);
  doc.setLineWidth(2);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setDrawColor(220, 180, 100);
  doc.setLineWidth(0.8);
  doc.rect(14, 14, w - 28, h - 28);

  // Corner ornaments
  const corners = [[12, 12], [w - 16, 12], [12, h - 16], [w - 16, h - 16]];
  doc.setFillColor(180, 30, 40);
  corners.forEach(([x, y]) => doc.rect(x, y, 4, 4, "F"));

  // Logo
  doc.setFillColor(180, 30, 40);
  doc.circle(w / 2, 35, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("EC", w / 2, 38, { align: "center" });

  // Title
  doc.setTextColor(180, 30, 40);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Certificate of Completion", w / 2, 60, { align: "center" });

  // Subtitle
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("The English Club — Course Completion Certificate", w / 2, 68, { align: "center" });

  // Decorative line
  doc.setDrawColor(220, 180, 100);
  doc.setLineWidth(0.6);
  doc.line(w / 2 - 60, 73, w / 2 + 60, 73);

  // Certifies text
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(12);
  doc.text("This is to certify that", w / 2, 85, { align: "center" });

  // Student name
  doc.setTextColor(180, 30, 40);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.studentName || "Student", w / 2, 98, { align: "center" });

  // Has completed
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("has successfully completed all lessons in", w / 2, 110, { align: "center" });

  // Course name badge
  const badgeY = 125;
  doc.setFillColor(180, 30, 40);
  doc.roundedRect(w / 2 - 60, badgeY - 10, 120, 20, 6, 6, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(data.courseName, w / 2, badgeY + 3, { align: "center" });

  // Details
  const detailY = badgeY + 30;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);

  const cols = [
    { label: "Lessons Completed", value: `${data.lessonsCompleted} / ${data.totalLessons}` },
    { label: "Completion Rate", value: "100%" },
    { label: "Date", value: data.date },
  ];

  const colWidth = 60;
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

  // Footer
  doc.setTextColor(160, 160, 160);
  doc.setFontSize(8);
  doc.text("The English Club Language School — Alexandria, Egypt", w / 2, h - 22, { align: "center" });
  doc.text("www.theenglishclub.com  •  +20 155 490 1390", w / 2, h - 17, { align: "center" });

  doc.save(`English_Club_${data.courseName.replace(/\s+/g, "_")}_Certificate.pdf`);
}
