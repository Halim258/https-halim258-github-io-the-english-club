import { useState } from "react";
import { BriefcaseBusiness, CheckCircle2, ClipboardCheck, Lightbulb, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkplaceToolkit } from "@/data/customer-service-workplace";

type Channel = "phone" | "email" | "chat";

const channelMeta: Record<Channel, { label: string; icon: typeof Phone }> = {
  phone: { label: "Phone", icon: Phone },
  email: { label: "Email", icon: Mail },
  chat: { label: "Chat", icon: MessageSquare },
};

export default function WorkplaceToolkitCard({
  lessonNumber,
  toolkit,
}: {
  lessonNumber: number;
  toolkit: WorkplaceToolkit;
}) {
  const [channel, setChannel] = useState<Channel>("phone");
  const ChannelIcon = channelMeta[channel].icon;

  return (
    <div className="mx-auto flex w-full max-w-xl items-center justify-center px-4 py-3">
      <article className="w-full overflow-y-auto rounded-2xl border border-primary/20 bg-card p-5 shadow-lg sm:p-6">
        <div className="flex items-start gap-3 border-b border-border/70 pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Workplace toolkit · Lesson {lessonNumber}</p>
            <h2 className="mt-1 text-lg font-bold text-foreground">Use it on the job</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Study the goal, practise the phrases, then use them in the role-play.</p>
          </div>
        </div>

        <section className="mt-4 rounded-xl bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            By the end of this lesson, you can…
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {toolkit.objectives.map((objective) => (
              <li key={objective} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {objective}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">Phrase bank</h3>
            <div className="flex gap-1 rounded-lg bg-muted p-1" role="tablist" aria-label="Workplace phrase channels">
              {(Object.keys(channelMeta) as Channel[]).map((item) => {
                const Icon = channelMeta[item].icon;
                return (
                  <Button
                    key={item}
                    type="button"
                    size="sm"
                    variant={channel === item ? "default" : "ghost"}
                    className="h-8 gap-1.5 px-2.5 text-xs"
                    onClick={() => setChannel(item)}
                    role="tab"
                    aria-selected={channel === item}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {channelMeta[item].label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="mt-2 rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-primary">
              <ChannelIcon className="h-3.5 w-3.5" />
              {channelMeta[channel].label} language
            </div>
            <ul className="grid gap-2">
              {toolkit.phrases[channel].map((phrase) => (
                <li key={phrase} className="rounded-lg bg-muted/60 px-3 py-2 text-sm leading-relaxed text-foreground">“{phrase}”</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> Do this</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{toolkit.doThis}</p>
          </div>
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-3">
            <p className="flex items-center gap-2 text-xs font-bold text-destructive"><ShieldAlert className="h-3.5 w-3.5" /> Avoid this</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{toolkit.avoidThis}</p>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
          <p className="text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">On-the-job tip: </span>{toolkit.tip}</p>
        </div>
      </article>
    </div>
  );
}
