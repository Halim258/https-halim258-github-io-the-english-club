import jsPDF from "jspdf";

interface MinistryBookPlanData {
  schoolSystem: string;
  courseName: string;
  stage: string;
  grades: string;
  bookSeries: string;
  lessons: Array<{ lessonNumber: number; title: string; description: string }>;
}

const yearlyUnits = [
  { month: "September", focus: "Orientation, diagnostic reading, classroom language", output: "Baseline reading log + vocabulary notebook setup" },
  { month: "October", focus: "Unit vocabulary, phonics/spelling patterns, guided reading", output: "Workbook vocabulary pages + short comprehension answers" },
  { month: "November", focus: "Grammar in context, paragraph reading, model answers", output: "Grammar drills + corrected paragraph response" },
  { month: "December", focus: "Mid-term revision: reading passages, language functions, writing", output: "Revision booklet + mock quiz" },
  { month: "January", focus: "First-term consolidation and exam skills", output: "Term 1 exam practice pack" },
  { month: "February", focus: "New unit themes, extended vocabulary, listening-supported reading", output: "Reading journal + workbook completion check" },
  { month: "March", focus: "Longer reading texts, inference, sentence transformation", output: "Comprehension worksheet + grammar correction page" },
  { month: "April", focus: "Writing from reading: emails, paragraphs, summaries", output: "Writing portfolio sample + peer review" },
  { month: "May", focus: "Final revision: ministry-style questions and model answers", output: "Final revision booklet + oral reading check" },
  { month: "June", focus: "End-of-year assessment and summer reading bridge", output: "Final report + summer workbook plan" },
];

const wrap = (doc: jsPDF, text: string, maxWidth: number) => doc.splitTextToSize(text, maxWidth) as string[];

export function generateMinistryWorkbookPlan(data: MinistryBookPlanData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  const addHeader = (title = "Yearly Reading & Workbook Plan") => {
    doc.setFillColor(250, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setFillColor(180, 30, 40);
    doc.rect(0, 0, pageWidth, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("The English Club Alexandria", margin, 13);
    doc.setFontSize(9);
    doc.text(title, pageWidth - margin, 13, { align: "right" });
  };

  const addFooter = (page: number) => {
    doc.setDrawColor(220, 220, 225);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.setTextColor(120, 120, 125);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Ministry-style support plan for school English practice — adaptable to the current official textbook edition.", margin, pageHeight - 8);
    doc.text(`Page ${page}`, pageWidth - margin, pageHeight - 8, { align: "right" });
  };

  addHeader();

  doc.setTextColor(35, 35, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(data.courseName, margin, 38);

  doc.setFontSize(12);
  doc.setTextColor(180, 30, 40);
  doc.text(`${data.stage} — ${data.grades}`, margin, 48);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(70, 70, 76);
  doc.setFontSize(10);
  wrap(doc, `Book match: ${data.bookSeries}`, contentWidth).forEach((line, index) => doc.text(line, margin, 58 + index * 5));

  doc.setFillColor(255, 245, 235);
  doc.roundedRect(margin, 72, contentWidth, 30, 3, 3, "F");
  doc.setTextColor(90, 55, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Plan Structure", margin + 5, 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  wrap(doc, "Each month combines reading from the school book, workbook practice, vocabulary recycling, grammar in context, and ministry-style revision questions.", contentWidth - 10).forEach((line, index) => doc.text(line, margin + 5, 90 + index * 5));

  let y = 116;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(35, 35, 40);
  doc.setFontSize(14);
  doc.text("Yearly Reading / Workbook Map", margin, y);
  y += 8;

  yearlyUnits.forEach((unit) => {
    if (y > 258) {
      addFooter(doc.getNumberOfPages());
      doc.addPage();
      addHeader();
      y = 34;
    }
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "F");
    doc.setDrawColor(230, 230, 235);
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "S");
    doc.setTextColor(180, 30, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(unit.month, margin + 4, y + 7);
    doc.setTextColor(45, 45, 50);
    doc.text(unit.focus, margin + 34, y + 7);
    doc.setTextColor(100, 100, 106);
    doc.setFont("helvetica", "normal");
    doc.text(unit.output, margin + 34, y + 15);
    y += 24;
  });

  addFooter(1);
  doc.addPage();
  addHeader("Lesson-to-Workbook Alignment");
  y = 34;

  doc.setTextColor(35, 35, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Course Lessons Aligned to School Book Practice", margin, y);
  y += 10;

  data.lessons.forEach((lesson, index) => {
    if (y > 255) {
      addFooter(doc.getNumberOfPages());
      doc.addPage();
      addHeader("Lesson-to-Workbook Alignment");
      y = 34;
    }
    const term = index < Math.ceil(data.lessons.length / 2) ? "Term 1" : "Term 2";
    doc.setFillColor(index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 248, index % 2 === 0 ? 255 : 250);
    doc.roundedRect(margin, y, contentWidth, 19, 2, 2, "F");
    doc.setTextColor(180, 30, 40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`${term} · Week ${index + 1}`, margin + 4, y + 7);
    doc.setTextColor(35, 35, 40);
    doc.text(`Lesson ${lesson.lessonNumber}: ${lesson.title}`, margin + 39, y + 7);
    doc.setTextColor(95, 95, 100);
    doc.setFont("helvetica", "normal");
    wrap(doc, lesson.description, contentWidth - 43).slice(0, 1).forEach((line) => doc.text(line, margin + 39, y + 14));
    y += 22;
  });

  addFooter(doc.getNumberOfPages());

  const safeName = `${data.schoolSystem}_${data.stage}_Yearly_Workbook_Plan`.replace(/[^a-z0-9]+/gi, "_");
  doc.save(`${safeName}.pdf`);
}
