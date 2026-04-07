import { useState, useRef, useCallback } from "react";
import { Upload, FileSpreadsheet, AlertTriangle, CheckCircle2, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ColumnMapping {
  csvHeader: string;
  dbField: string;
  required?: boolean;
}

interface CsvImportProps {
  /** The Supabase table to insert into */
  table: "school_students" | "school_newcomers";
  /** Column mappings: csvHeader → dbField */
  mappings: ColumnMapping[];
  /** Transform a parsed row before insert */
  transformRow?: (row: Record<string, string>) => Record<string, any>;
  /** Called after successful import */
  onComplete: () => void;
  /** Button label */
  label?: string;
}

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  
  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { result.push(current.trim()); current = ""; continue; }
      current += ch;
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).map(line => {
    const vals = parseRow(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ""; });
    return obj;
  });
  return { headers, rows };
}

export default function CsvImport({ table, mappings, transformRow, onComplete, label = "Import CSV" }: CsvImportProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"upload" | "preview" | "result">("upload");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([]);
  const [colMap, setColMap] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] }>({ success: 0, failed: 0, errors: [] });
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const reset = () => { setStep("upload"); setCsvHeaders([]); setCsvRows([]); setColMap({}); setResult({ success: 0, failed: 0, errors: [] }); };

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { headers, rows } = parseCsv(text);
      if (!headers.length) { toast({ title: "Invalid CSV file", variant: "destructive" }); return; }
      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto-map columns by matching header names
      const autoMap: Record<string, string> = {};
      mappings.forEach(m => {
        const match = headers.find(h =>
          h.toLowerCase().replace(/[_\s-]/g, "") === m.csvHeader.toLowerCase().replace(/[_\s-]/g, "") ||
          h.toLowerCase().replace(/[_\s-]/g, "") === m.dbField.toLowerCase().replace(/[_\s-]/g, "")
        );
        if (match) autoMap[m.dbField] = match;
      });
      setColMap(autoMap);
      setStep("preview");
    };
    reader.readAsText(file);
  }, [mappings, toast]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".csv") || file.type === "text/csv")) handleFile(file);
    else toast({ title: "Please upload a .csv file", variant: "destructive" });
  };

  const handleImport = async () => {
    setImporting(true);
    let success = 0, failed = 0;
    const errors: string[] = [];
    const BATCH = 50;

    const rows = csvRows.map((row, idx) => {
      try {
        const mapped: Record<string, string> = {};
        Object.entries(colMap).forEach(([dbField, csvHeader]) => {
          mapped[dbField] = row[csvHeader] || "";
        });
        return transformRow ? transformRow(mapped) : mapped;
      } catch (err: any) {
        errors.push(`Row ${idx + 2}: ${err.message}`);
        return null;
      }
    }).filter(Boolean);

    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH);
      const { error, data } = await supabase.from(table).insert(batch as any[]);
      if (error) {
        failed += batch.length;
        errors.push(`Batch ${Math.floor(i / BATCH) + 1}: ${error.message}`);
      } else {
        success += batch.length;
      }
    }

    setResult({ success, failed, errors });
    setStep("result");
    setImporting(false);
    if (success > 0) onComplete();
  };

  const downloadTemplate = () => {
    const headers = mappings.map(m => m.csvHeader).join(",");
    const example = mappings.map(m => m.required ? "required" : "optional").join(",");
    const blob = new Blob([headers + "\n" + example + "\n"], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${table}_template.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const requiredMissing = mappings.filter(m => m.required && !colMap[m.dbField]);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => { reset(); setOpen(true); }}>
        <Upload className="h-4 w-4 mr-1" /> {label}
      </Button>
      <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = ""; }} />

      <Dialog open={open} onOpenChange={o => { if (!importing) setOpen(o); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" /> Bulk Import — {table === "school_students" ? "Students" : "Leads"}
            </DialogTitle>
          </DialogHeader>

          {step === "upload" && (
            <div className="space-y-4">
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors"
              >
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="font-medium text-sm">Drop a CSV file here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Supports .csv files with headers in the first row</p>
              </div>
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={downloadTemplate}>
                <Download className="h-3 w-3 mr-1" /> Download CSV Template
              </Button>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{csvRows.length} rows found</p>
                <Button variant="ghost" size="sm" onClick={reset}><X className="h-4 w-4" /></Button>
              </div>

              {/* Column mapping */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">📋 Map Columns</p>
                {mappings.map(m => (
                  <div key={m.dbField} className="flex items-center gap-2">
                    <span className="text-xs w-32 truncate font-medium">
                      {m.csvHeader} {m.required && <span className="text-destructive">*</span>}
                    </span>
                    <span className="text-muted-foreground text-xs">→</span>
                    <select
                      value={colMap[m.dbField] || ""}
                      onChange={e => setColMap(prev => ({ ...prev, [m.dbField]: e.target.value }))}
                      className="flex h-8 flex-1 rounded-md border border-input bg-background px-2 text-xs"
                    >
                      <option value="">— skip —</option>
                      {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                ))}
              </div>

              {requiredMissing.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  Missing required: {requiredMissing.map(m => m.csvHeader).join(", ")}
                </div>
              )}

              {/* Preview table */}
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">👀 Preview (first 5 rows)</p>
                <div className="rounded-lg border overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50">
                        {Object.values(colMap).filter(Boolean).map(h => (
                          <th key={h} className="p-2 text-left font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {csvRows.slice(0, 5).map((row, i) => (
                        <tr key={i} className="border-t">
                          {Object.values(colMap).filter(Boolean).map(h => (
                            <td key={h} className="p-2 truncate max-w-[120px]">{row[h] || "—"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Button onClick={handleImport} disabled={importing || requiredMissing.length > 0} className="w-full">
                {importing ? "Importing..." : `Import ${csvRows.length} Records`}
              </Button>
            </div>
          )}

          {step === "result" && (
            <div className="space-y-4 text-center py-4">
              {result.failed === 0 ? (
                <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500" />
              ) : (
                <AlertTriangle className="h-12 w-12 mx-auto text-amber-500" />
              )}
              <div>
                <p className="font-semibold text-lg">Import Complete</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-emerald-600 font-bold">{result.success}</span> imported
                  {result.failed > 0 && <>, <span className="text-destructive font-bold">{result.failed}</span> failed</>}
                </p>
              </div>
              {result.errors.length > 0 && (
                <div className="text-left bg-destructive/5 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {result.errors.map((e, i) => <p key={i} className="text-xs text-destructive">{e}</p>)}
                </div>
              )}
              <Button onClick={() => setOpen(false)} className="w-full">Done</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}