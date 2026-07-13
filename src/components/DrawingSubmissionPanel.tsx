import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload, Image as ImageIcon, Trash2, X, Loader2 } from "lucide-react";

interface Props {
  levelId: string;
  lessonNumber: number;
  lessonTitle: string;
}

interface Submission {
  id: string;
  image_path: string;
  note: string | null;
  created_at: string;
  signedUrl?: string;
}

export default function DrawingSubmissionPanel({ levelId, lessonNumber, lessonTitle }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("drawing_submissions")
      .select("id, image_path, note, created_at")
      .eq("user_id", user.id)
      .eq("level_id", levelId)
      .eq("lesson_number", lessonNumber)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }
    const withUrls = await Promise.all(
      (data ?? []).map(async (s) => {
        const { data: signed } = await supabase.storage
          .from("drawing-submissions")
          .createSignedUrl(s.image_path, 3600);
        return { ...s, signedUrl: signed?.signedUrl };
      })
    );
    setSubmissions(withUrls);
    setLoading(false);
  };

  useEffect(() => {
    if (open) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, user?.id, levelId, lessonNumber]);

  const handleUpload = async () => {
    if (!user || !file) return;
    const started = performance.now();
    const context = {
      userId: user.id,
      levelId,
      lessonNumber,
      fileName: file.name,
      sizeKB: Math.round(file.size / 1024),
      contentType: file.type,
    };
    console.groupCollapsed(`[upload] start ${file.name} (${context.sizeKB} KB)`);
    console.log("context", context);
    if (!file.type.startsWith("image/")) {
      console.warn("[upload] rejected: not an image", context);
      console.groupEnd();
      toast({ title: "Invalid file", description: "Please choose an image.", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      console.warn("[upload] rejected: file exceeds 10MB", context);
      console.groupEnd();
      toast({ title: "File too large", description: "Max size is 10MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${user.id}/${levelId}/${lessonNumber}/${Date.now()}.${ext}`;
    console.log("[upload] storage path", path);
    const { error: upErr } = await supabase.storage
      .from("drawing-submissions")
      .upload(path, file, { upsert: false, contentType: file.type });
    if (upErr) {
      console.error("[upload] STORAGE FAILED", {
        ...context,
        path,
        bucket: "drawing-submissions",
        error: upErr.message,
        name: (upErr as { name?: string }).name,
        statusCode: (upErr as { statusCode?: string }).statusCode,
        durationMs: Math.round(performance.now() - started),
      });
      console.groupEnd();
      toast({ title: "Upload failed", description: upErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    console.log("[upload] storage OK", { path, durationMs: Math.round(performance.now() - started) });
    const { error: insErr } = await supabase.from("drawing_submissions").insert({
      user_id: user.id,
      level_id: levelId,
      lesson_number: lessonNumber,
      image_path: path,
      note: note.trim() || null,
    });
    if (insErr) {
      console.error("[upload] DB INSERT FAILED — orphaned storage object", {
        ...context,
        path,
        error: insErr.message,
        code: (insErr as { code?: string }).code,
        details: (insErr as { details?: string }).details,
        hint: (insErr as { hint?: string }).hint,
      });
      console.groupEnd();
      toast({ title: "Save failed", description: insErr.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    console.log(`[upload] SUCCESS in ${Math.round(performance.now() - started)}ms`, { path });
    console.groupEnd();
    toast({ title: "Drawing uploaded 🎨", description: "Great work!" });
    setFile(null);
    setNote("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUploading(false);
    load();
  };

  const handleDelete = async (s: Submission) => {
    if (!confirm("Delete this submission?")) return;
    await supabase.storage.from("drawing-submissions").remove([s.image_path]);
    const { error } = await supabase.from("drawing_submissions").delete().eq("id", s.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setSubmissions((prev) => prev.filter((x) => x.id !== s.id));
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl active:scale-95 transition-all"
        aria-label="Upload your drawing"
      >
        <Upload className="w-4 h-4" />
        <span className="text-sm font-medium">ارفع رسمتك</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            dir="rtl"
            className="bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card z-10">
              <div>
                <h2 className="font-bold text-base">ارفع رسمتك</h2>
                <p className="text-xs text-muted-foreground truncate max-w-[240px]">{lessonTitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-muted"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">صورة الرسمة</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                {file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.name} — {(file.size / 1024).toFixed(0)} KB
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ملاحظة (اختياري)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 500))}
                  rows={3}
                  placeholder="اكتب أي ملاحظة عن رسمتك…"
                  className="w-full rounded-lg border bg-background p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-[10px] text-muted-foreground text-left">{note.length}/500</p>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="w-full"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin ml-2" /> جاري الرفع…</>
                ) : (
                  <><Upload className="w-4 h-4 ml-2" /> رفع الرسمة</>
                )}
              </Button>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> رسوماتي السابقة
                </h3>
                {loading ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : submissions.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">
                    لم ترفع أي رسمة بعد.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {submissions.map((s) => (
                      <div key={s.id} className="relative group rounded-lg overflow-hidden border bg-muted">
                        {s.signedUrl ? (
                          <img
                            src={s.signedUrl}
                            alt={s.note ?? "رسمة"}
                            className="w-full h-32 object-cover"
                          />
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center text-muted-foreground text-xs">
                            لا يمكن التحميل
                          </div>
                        )}
                        {s.note && (
                          <p className="p-2 text-[11px] line-clamp-2 bg-background/95">{s.note}</p>
                        )}
                        <button
                          onClick={() => handleDelete(s)}
                          className="absolute top-1 left-1 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}