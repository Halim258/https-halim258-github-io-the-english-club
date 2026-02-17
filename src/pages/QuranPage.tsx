import { BookOpenCheck, Volume2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const surahs = [
  { id: 1, name: "الفاتحة", en: "Al-Fatiha", verses: 7, difficulty: "Beginner" },
  { id: 2, name: "الإخلاص", en: "Al-Ikhlas", verses: 4, difficulty: "Beginner" },
  { id: 3, name: "الفلق", en: "Al-Falaq", verses: 5, difficulty: "Beginner" },
  { id: 4, name: "الناس", en: "An-Nas", verses: 6, difficulty: "Beginner" },
  { id: 5, name: "الكوثر", en: "Al-Kawthar", verses: 3, difficulty: "Beginner" },
  { id: 6, name: "العصر", en: "Al-Asr", verses: 3, difficulty: "Beginner" },
];

const tajweedRules = [
  { name: "Ikhfa", color: "bg-green-200", desc: "Hidden nasalization" },
  { name: "Idgham", color: "bg-blue-200", desc: "Merging of letters" },
  { name: "Iqlab", color: "bg-purple-200", desc: "Conversion of noon" },
  { name: "Qalqalah", color: "bg-red-200", desc: "Echoing sound" },
];

export default function QuranPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Quran Recitation</h1>
      <p className="mt-2 text-muted-foreground">Learn to recite the Quran with proper Tajweed rules.</p>

      {/* Tajweed legend */}
      <div className="mt-6 rounded-xl border bg-card p-5 shadow-soft">
        <h3 className="font-semibold mb-3">Tajweed Color Guide</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {tajweedRules.map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <span className={`h-4 w-4 rounded ${r.color}`} />
              <span className="text-sm font-medium">{r.name}</span>
              <span className="text-xs text-muted-foreground">— {r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Surah list */}
      <h2 className="mt-10 text-xl font-semibold">Surahs</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {surahs.map((s) => (
          <div key={s.id} className="rounded-xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="arabic-text text-2xl font-bold" dir="rtl">{s.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.en} · {s.verses} verses</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.difficulty}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                <Volume2 className="mr-1 h-3 w-3" /> Listen
              </Button>
              <Button size="sm">Start Lesson</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
