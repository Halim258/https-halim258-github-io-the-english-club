import { useMemo, useState } from "react";
import { Clipboard, Facebook, Lightbulb, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { dailyAdvices, getDailyAdviceIndex, type DailyAdvice as Advice } from "@/data/daily-advices";

function buildPost(advice: Advice) {
  return [
    `💡 Advice of the day — ${advice.category}`,
    "",
    `🇬🇧 ${advice.title}`,
    advice.english,
    "",
    `🇪🇬 ${advice.title} (بالمصري)`,
    advice.arabic,
    "",
    `🎯 Today's action: ${advice.action}`,
    "",
    "👉 theenglishclub.app",
    "📲 WhatsApp: +20 155 490 1390",
    "",
    [...advice.hashtags, "#TheEnglishClubAlexandria"].join(" "),
  ].join("\n");
}

export default function DailyAdviceSection() {
  const todayIndex = useMemo(() => getDailyAdviceIndex(), []);
  const [activeIndex, setActiveIndex] = useState(todayIndex);
  const advice = dailyAdvices[activeIndex];
  const copy = buildPost(advice);

  const upcoming = useMemo(
    () => Array.from({ length: 6 }, (_, i) => dailyAdvices[(todayIndex + i) % dailyAdvices.length]),
    [todayIndex],
  );

  const copyAdvice = async () => {
    await navigator.clipboard.writeText(copy);
    toast({ title: "Advice post copied", description: "Paste it on the school's Facebook page." });
  };

  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
              <Lightbulb className="h-4 w-4" /> Advice of the day
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
              Daily study advice — English &amp; بالمصري
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              One short, practical piece of advice every day, with a clear action you can finish in minutes.
            </p>
          </div>
          <Button onClick={copyAdvice} className="gap-2">
            <Facebook className="h-4 w-4" /> Copy Advice Post
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-lg border bg-card p-4 shadow-soft sm:p-6 min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
                {advice.category}
              </span>
              {activeIndex === todayIndex && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3 w-3" /> Today
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold md:text-2xl break-words">{advice.title}</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <h4 className="mb-2 font-semibold">🇬🇧 English</h4>
                <p className="leading-7 text-muted-foreground">{advice.english}</p>
              </div>
              <div className="rounded-lg border bg-background p-4" dir="rtl">
                <h4 className="mb-2 font-semibold">🇪🇬 بالمصري</h4>
                <p className="leading-8 text-muted-foreground">{advice.arabic}</p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-sm font-medium">
                <strong className="text-primary">Today&apos;s action:</strong> {advice.action}
              </p>
            </div>

            <div className="mt-4 rounded-lg border bg-background p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Facebook className="h-4 w-4 text-primary" /> Ready-to-paste post
                </h4>
                <Button size="sm" variant="outline" onClick={copyAdvice} className="gap-1.5">
                  <Clipboard className="h-3.5 w-3.5" /> Copy
                </Button>
              </div>
              <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-md border bg-card p-3 text-xs leading-6 text-muted-foreground">{copy}</pre>
            </div>
          </article>

          <aside className="min-w-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next days
            </p>
            <div className="space-y-2">
              {upcoming.map((item, i) => {
                const index = (todayIndex + i) % dailyAdvices.length;
                const active = index === activeIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full rounded-lg border px-3 py-3 text-left transition-colors ${
                      active ? "border-primary bg-primary/10" : "bg-card hover:bg-muted/60"
                    }`}
                  >
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {i === 0 ? "Today" : `Day +${i}`} · {item.category}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
