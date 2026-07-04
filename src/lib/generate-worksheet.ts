import jsPDF from "jspdf";

export interface WorksheetInput {
  categoryTitle: string;
  courseName: string;
  stepNumber: number;
  totalSteps: number;
  week: string;
  title: string;
  goal: string;
  activities: string[];
  topics?: string[];
  tips?: string[];
  quiz?: { question: string; options: string[] }[];
  estimatedMinutes?: number;
}

const MARGIN = 15;
const PAGE_W = 210;
const PAGE_H = 297;
const CONTENT_W = PAGE_W - MARGIN * 2;

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}

export function generateWorksheetPdf(w: WorksheetInput): { blob: Blob; filename: string } {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const ensureRoom = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const text = (
    str: string,
    opts: { size?: number; bold?: boolean; color?: [number, number, number]; lineGap?: number; indent?: number } = {}
  ) => {
    const size = opts.size ?? 11;
    doc.setFont("helvetica", opts.bold ? "bold" : "normal");
    doc.setFontSize(size);
    if (opts.color) doc.setTextColor(...opts.color); else doc.setTextColor(20, 20, 20);
    const indent = opts.indent ?? 0;
    const lines = doc.splitTextToSize(str, CONTENT_W - indent);
    const lineH = size * 0.42;
    for (const ln of lines) {
      ensureRoom(lineH + 1);
      doc.text(ln, MARGIN + indent, y);
      y += lineH;
    }
    y += opts.lineGap ?? 1;
  };

  const rule = () => {
    ensureRoom(4);
    doc.setDrawColor(210, 210, 210);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 4;
  };

  const sectionHeader = (label: string) => {
    ensureRoom(9);
    doc.setFillColor(235, 240, 250);
    doc.rect(MARGIN, y - 4, CONTENT_W, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(30, 60, 130);
    doc.text(label.toUpperCase(), MARGIN + 2, y + 1);
    y += 7;
  };

  const checkbox = (x: number, cy: number, size = 3.5) => {
    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.3);
    doc.rect(x, cy - size + 0.5, size, size);
  };

  const linedBlank = (lines: number, gap = 7) => {
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    for (let i = 0; i < lines; i++) {
      ensureRoom(gap);
      doc.line(MARGIN, y, PAGE_W - MARGIN, y);
      y += gap;
    }
    y += 1;
  };

  // Header banner
  doc.setFillColor(30, 60, 130);
  doc.rect(0, 0, PAGE_W, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(w.categoryTitle.toUpperCase(), MARGIN, 9);
  doc.setFontSize(14);
  doc.text(w.courseName, MARGIN, 16);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const meta = `Step ${w.stepNumber} of ${w.totalSteps}  •  ${w.week}${w.estimatedMinutes ? `  •  ~${w.estimatedMinutes} min` : ""}`;
  doc.text(meta, PAGE_W - MARGIN, 9, { align: "right" });
  y = 30;

  // Title
  doc.setTextColor(20, 20, 20);
  text(w.title, { size: 18, bold: true, lineGap: 2 });
  rule();

  // Goal / summary
  sectionHeader("Summary notes");
  text("Learning goal", { size: 10, bold: true, color: [90, 90, 90] });
  text(w.goal, { size: 11, lineGap: 3 });

  if (w.topics && w.topics.length) {
    text("Key concepts to review", { size: 10, bold: true, color: [90, 90, 90] });
    for (const t of w.topics) text(`•  ${t}`, { size: 11, indent: 2 });
    y += 2;
  }

  if (w.tips && w.tips.length) {
    text("Pro tips", { size: 10, bold: true, color: [90, 90, 90] });
    for (const t of w.tips) text(`•  ${t}`, { size: 11, indent: 2 });
    y += 2;
  }

  // Activities checklist
  sectionHeader("Practice activities");
  text("Tick each activity as you complete it offline.", { size: 9, color: [110, 110, 110], lineGap: 3 });
  for (let i = 0; i < w.activities.length; i++) {
    ensureRoom(9);
    checkbox(MARGIN, y + 0.5);
    const lines = doc.splitTextToSize(`${i + 1}. ${w.activities[i]}`, CONTENT_W - 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    for (let li = 0; li < lines.length; li++) {
      ensureRoom(5);
      doc.text(lines[li], MARGIN + 6, y + (li === 0 ? 2.5 : 2.5 + li * 4.5));
    }
    y += 2.5 + lines.length * 4.5 + 2;
  }

  // Quiz
  if (w.quiz && w.quiz.length) {
    sectionHeader("Self-check quiz");
    text("Circle the answer you think is correct.", { size: 9, color: [110, 110, 110], lineGap: 3 });
    w.quiz.forEach((q, qi) => {
      ensureRoom(10);
      text(`${qi + 1}. ${q.question}`, { size: 11, bold: true, lineGap: 1 });
      q.options.forEach((opt, oi) => {
        const letter = String.fromCharCode(65 + oi);
        text(`(${letter})  ${opt}`, { size: 10, indent: 4 });
      });
      y += 2;
    });
  }

  // Notes
  sectionHeader("My notes & reflections");
  linedBlank(8);

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(`${w.courseName} — Step ${w.stepNumber}`, MARGIN, PAGE_H - 8);
    doc.text(`Page ${p} of ${pageCount}`, PAGE_W - MARGIN, PAGE_H - 8, { align: "right" });
  }

  const blob = doc.output("blob");
  const filename = `${slug(w.courseName)}-step-${w.stepNumber}-${slug(w.title)}.pdf`;
  return { blob, filename };
}

export function downloadWorksheet(w: WorksheetInput) {
  const { blob, filename } = generateWorksheetPdf(w);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}