import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, UserPlus, DollarSign, BookOpen, Search, ArrowRight, ArrowUpRight, ArrowDownRight,
  Minus, AlertCircle, KeyRound, Clock, Sparkles, Activity, CheckCircle2, RefreshCw,
} from "lucide-react";

type RangeKey = "today" | "7d" | "30d";

const RANGES: { id: RangeKey; label: string; days: number }[] = [
  { id: "today", label: "Today", days: 1 },
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
];

interface Props {
  profiles: any[];
  schoolStudents: any[];
  income: any[];
  outcome: any[];
  receipts: any[];
  newcomers: any[];
  testResults: any[];
  sessions: any[];
  onNavigate: (tab: string) => void;
  onRefresh: () => void;
}

const startOf = (days: number) => {
  const d = new Date();
  if (days === 1) d.setHours(0, 0, 0, 0);
  else d.setTime(d.getTime() - days * 86400000);
  return d;
};

const inWindow = (value: any, from: Date, to?: Date) => {
  if (!value) return false;
  const t = new Date(value).getTime();
  if (Number.isNaN(t)) return false;
  return t >= from.getTime() && (!to || t < to.getTime());
};

const money = (n: number) => `${Math.round(n).toLocaleString("en-GB")} EGP`;

function Trend({ current, previous }: { current: number; previous: number }) {
  if (previous === 0 && current === 0) {
    return (
      <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
        <Minus className="h-3 w-3" /> no change
      </span>
    );
  }
  const pct = previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);
  const up = pct >= 0;
  return (
    <span
      className={`flex items-center gap-1 text-[11px] font-semibold ${
        up ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
      }`}
    >
      {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {Math.abs(pct)}% vs previous
    </span>
  );
}

export default function AdminCommandCenter({
  profiles, schoolStudents, income, outcome, receipts, newcomers, testResults, sessions,
  onNavigate, onRefresh,
}: Props) {
  const [range, setRange] = useState<RangeKey>("7d");
  const [query, setQuery] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [xp, setXp] = useState<any[]>([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [lessonRes, xpRes] = await Promise.all([
        supabase.from("lesson_progress").select("user_id, level_id, lesson_number, completed, completed_at").order("completed_at", { ascending: false }).limit(5000),
        supabase.from("user_xp").select("user_id, total_xp, current_streak, last_activity_date"),
      ]);
      if (!alive) return;
      setLessons(lessonRes.data || []);
      setXp(xpRes.data || []);
      setLoadingExtra(false);
    })();
    return () => { alive = false; };
  }, []);

  const days = RANGES.find((r) => r.id === range)!.days;
  const from = useMemo(() => startOf(days), [days]);
  const prevFrom = useMemo(() => new Date(from.getTime() - days * 86400000), [from, days]);

  const stats = useMemo(() => {
    const count = (rows: any[], field: string, a: Date, b?: Date) =>
      rows.filter((r) => inWindow(r?.[field], a, b)).length;
    const sum = (rows: any[], field: string, dateField: string, a: Date, b?: Date) =>
      rows.filter((r) => inWindow(r?.[dateField], a, b)).reduce((s, r) => s + Number(r?.[field] || 0), 0);

    const doneLessons = lessons.filter((l) => l.completed);

    return {
      signups: { current: count(profiles, "created_at", from), previous: count(profiles, "created_at", prevFrom, from) },
      enrolled: { current: count(schoolStudents, "created_at", from), previous: count(schoolStudents, "created_at", prevFrom, from) },
      lessons: { current: count(doneLessons, "completed_at", from), previous: count(doneLessons, "completed_at", prevFrom, from) },
      revenue: { current: sum(income, "amount", "date", from), previous: sum(income, "amount", "date", prevFrom, from) },
      spend: { current: sum(outcome, "amount", "date", from), previous: sum(outcome, "amount", "date", prevFrom, from) },
      tests: { current: count(testResults, "created_at", from), previous: count(testResults, "created_at", prevFrom, from) },
      classes: { current: count(sessions, "session_date", from), previous: count(sessions, "session_date", prevFrom, from) },
      leads: { current: count(newcomers, "the_date", from), previous: count(newcomers, "the_date", prevFrom, from) },
      activeLearners: new Set(doneLessons.filter((l) => inWindow(l.completed_at, from)).map((l) => l.user_id)).size,
    };
  }, [profiles, schoolStudents, income, outcome, testResults, sessions, newcomers, lessons, from, prevFrom]);

  /* ---------- Needs action ---------- */
  const actions = useMemo(() => {
    const enrolledIds = new Set(schoolStudents.map((s) => s.user_id).filter(Boolean));
    const waiting = profiles.filter((p) => !enrolledIds.has(p.id));

    const now = Date.now();
    const expiring = schoolStudents.filter((s) => {
      if (!s.access_expires_at) return false;
      const t = new Date(s.access_expires_at).getTime();
      return t > now && t < now + 7 * 86400000;
    });
    const expired = schoolStudents.filter((s) => s.access_expires_at && new Date(s.access_expires_at).getTime() <= now);
    const unpaid = schoolStudents.filter((s) => Number(s.remaining_fees || 0) > 0);
    const unpaidTotal = unpaid.reduce((sum, s) => sum + Number(s.remaining_fees || 0), 0);
    const followUps = newcomers.filter((n) => n.status && String(n.status).toLowerCase() !== "done" && !n.reserved);

    const activeIds = new Set(lessons.filter((l) => l.completed && inWindow(l.completed_at, startOf(14))).map((l) => l.user_id));
    const dormant = schoolStudents.filter((s) => s.user_id && !activeIds.has(s.user_id));

    return [
      { key: "waiting", label: "Sign-ups waiting for enrolment", value: waiting.length, tone: "primary", tab: "new-signups", cta: "Review", icon: UserPlus },
      { key: "expiring", label: "Access expiring within 7 days", value: expiring.length, tone: "amber", tab: "grant-access", cta: "Extend", icon: Clock },
      { key: "expired", label: "Access already expired", value: expired.length, tone: "destructive", tab: "grant-access", cta: "Renew", icon: KeyRound },
      { key: "unpaid", label: `Students with unpaid fees (${money(unpaidTotal)})`, value: unpaid.length, tone: "destructive", tab: "unpaid", cta: "Collect", icon: DollarSign },
      { key: "followUps", label: "Newcomers needing follow-up", value: followUps.length, tone: "primary", tab: "newcomers", cta: "Follow up", icon: Activity },
      { key: "dormant", label: "Students inactive for 14+ days", value: dormant.length, tone: "amber", tab: "school-students", cta: "Nudge", icon: AlertCircle },
    ].filter((a) => a.value > 0);
  }, [profiles, schoolStudents, newcomers, lessons]);

  /* ---------- Smart briefing ---------- */
  const briefing = useMemo(() => {
    const label = RANGES.find((r) => r.id === range)!.label.toLowerCase();
    const lines: string[] = [];
    const net = stats.revenue.current - stats.spend.current;

    lines.push(
      `Over the ${label}, ${stats.signups.current} new ${stats.signups.current === 1 ? "person" : "people"} signed up, ` +
      `${stats.enrolled.current} were enrolled as students, and ${stats.activeLearners} students studied at least one lesson ` +
      `(${stats.lessons.current} lessons finished in total).`
    );

    if (stats.revenue.current || stats.spend.current) {
      lines.push(
        `Money in was ${money(stats.revenue.current)} against ${money(stats.spend.current)} spent, leaving ` +
        `${net >= 0 ? "a surplus of " : "a shortfall of "}${money(Math.abs(net))}.`
      );
    }

    if (stats.signups.previous > 0) {
      const diff = stats.signups.current - stats.signups.previous;
      if (diff > 0) lines.push(`Sign-ups are up by ${diff} compared with the period before — keep the placement test promoted.`);
      else if (diff < 0) lines.push(`Sign-ups dropped by ${Math.abs(diff)} compared with the period before; consider a message to your newcomer list.`);
    }

    if (stats.leads.current) lines.push(`${stats.leads.current} newcomers asked about the club and should be contacted while interest is fresh.`);
    if (stats.tests.current) lines.push(`${stats.tests.current} placement tests were completed, so new levels are ready to be placed into groups.`);

    const top = actions.slice(0, 2).map((a) => `${a.value} ${a.label.toLowerCase()}`);
    if (top.length) lines.push(`Most urgent right now: ${top.join(", and ")}.`);
    else lines.push("Nothing is waiting on you right now — every queue is clear.");

    return lines;
  }, [stats, actions, range]);

  /* ---------- Search ---------- */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const xpBy = new Map(xp.map((x) => [x.user_id, x]));
    const doneBy = new Map<string, number>();
    lessons.filter((l) => l.completed).forEach((l) => doneBy.set(l.user_id, (doneBy.get(l.user_id) || 0) + 1));

    const fromStudents = schoolStudents
      .filter((s) => [s.name, s.email, s.phone_number, s.whatsapp].some((v) => v && String(v).toLowerCase().includes(q)))
      .map((s) => ({
        id: s.id,
        name: s.name,
        detail: [s.email, s.phone_number].filter(Boolean).join(" · ") || "School student",
        badge: s.membership || s.status || "student",
        lessons: s.user_id ? doneBy.get(s.user_id) || 0 : 0,
        streak: s.user_id ? xpBy.get(s.user_id)?.current_streak || 0 : 0,
        tab: "school-students",
      }));

    const fromProfiles = profiles
      .filter((p) => p.full_name && String(p.full_name).toLowerCase().includes(q))
      .map((p) => ({
        id: p.id,
        name: p.full_name,
        detail: `Joined ${new Date(p.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
        badge: "app user",
        lessons: doneBy.get(p.id) || 0,
        streak: xpBy.get(p.id)?.current_streak || 0,
        tab: "new-signups",
      }));

    const seen = new Set<string>();
    return [...fromStudents, ...fromProfiles].filter((r) => {
      const key = `${r.name}-${r.detail}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 8);
  }, [query, schoolStudents, profiles, lessons, xp]);

  /* ---------- Automatic money maths ---------- */
  const monthMoney = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const receiptDate = (r: any) => r?.reservation_date || r?.created_at;
    const valid = receipts.filter((r) => String(r?.status || "paid").toLowerCase() !== "faulty");
    const thisMonth = valid.filter((r) => inWindow(receiptDate(r), monthStart));
    const lastMonth = valid.filter((r) => inWindow(receiptDate(r), prevStart, monthStart));

    const sumBy = (rows: any[], field: string) => rows.reduce((s, r) => s + Number(r?.[field] || 0), 0);

    const collected = sumBy(thisMonth, "paid_fees");
    const billed = sumBy(thisMonth, "fees");
    const outstandingMonth = Math.max(0, billed - collected);
    const outstandingAll = schoolStudents.reduce((s, r) => s + Number(r?.remaining_fees || 0), 0);
    const spent = outcome.filter((o) => inWindow(o?.date, monthStart)).reduce((s, o) => s + Number(o?.amount || 0), 0);
    const collectionRate = billed > 0 ? Math.round((collected / billed) * 100) : 0;
    const payers = new Set(thisMonth.map((r) => r.student_record_id || r.student_name).filter(Boolean)).size;

    // 14-day daily collection for the mini chart
    const bars: { label: string; value: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const next = new Date(day.getTime() + 86400000);
      bars.push({
        label: day.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
        value: valid.filter((r) => inWindow(receiptDate(r), day, next)).reduce((s, r) => s + Number(r?.paid_fees || 0), 0),
      });
    }

    return {
      monthLabel: now.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
      collected, billed, outstandingMonth, outstandingAll, spent,
      net: collected - spent,
      collectionRate,
      payers,
      average: payers > 0 ? collected / payers : 0,
      receiptCount: thisMonth.length,
      lastMonthCollected: sumBy(lastMonth, "paid_fees"),
      bars,
    };
  }, [receipts, outcome, schoolStudents]);

  const kpis = [
    { label: "New sign-ups", value: stats.signups.current, trend: stats.signups, icon: UserPlus, tab: "new-signups" },
    { label: "Newly enrolled", value: stats.enrolled.current, trend: stats.enrolled, icon: Users, tab: "school-students" },
    { label: "Lessons finished", value: stats.lessons.current, trend: stats.lessons, icon: BookOpen, tab: "analytics" },
    { label: "Money received", value: money(stats.revenue.current), trend: stats.revenue, icon: DollarSign, tab: "finance" },
  ];


  const toneClass = (tone: string) =>
    tone === "destructive"
      ? "border-destructive/40 bg-destructive/5"
      : tone === "amber"
      ? "border-amber-500/40 bg-amber-500/5"
      : "border-primary/40 bg-primary/5";

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Range switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1 border border-border bg-card p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                range === r.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">Totals update automatically</p>
      </div>



      {/* KPIs */}
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <button
            key={k.label}
            onClick={() => onNavigate(k.tab)}
            className="group bg-card p-5 text-left transition-colors hover:bg-primary/5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{k.label}</span>
              <k.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="font-display text-2xl font-bold">{k.value}</p>
            <div className="mt-2"><Trend current={k.trend.current} previous={k.trend.previous} /></div>
          </button>
        ))}
      </div>

      {/* Automatic money summary */}
      <div className="border border-border bg-card p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Money — {monthMoney.monthLabel}</h2>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-none text-[11px]" onClick={() => onNavigate("receipts")}>Receipts</Button>
            <Button size="sm" variant="outline" className="rounded-none text-[11px]" onClick={() => onNavigate("unpaid")}>Unpaid</Button>
          </div>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Collected this month", value: money(monthMoney.collected), note: `${monthMoney.receiptCount} receipts · last month ${money(monthMoney.lastMonthCollected)}` },
            { label: "Still to collect", value: money(monthMoney.outstandingMonth), note: `All-time outstanding ${money(monthMoney.outstandingAll)}` },
            { label: "Spent this month", value: money(monthMoney.spent), note: `Net ${monthMoney.net >= 0 ? "surplus" : "shortfall"} ${money(Math.abs(monthMoney.net))}` },
            { label: "Average per payer", value: money(monthMoney.average), note: `${monthMoney.payers} ${monthMoney.payers === 1 ? "person" : "people"} paid` },
          ].map((c) => (
            <div key={c.label} className="bg-card p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
              <p className="mt-1.5 font-display text-xl font-bold">{c.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>

        {/* Collection progress */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
            <span>Collected {money(monthMoney.collected)} of {money(monthMoney.billed)} billed</span>
            <span>{monthMoney.collectionRate}%</span>
          </div>
          <div className="h-2.5 w-full bg-muted">
            <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, monthMoney.collectionRate)}%` }} />
          </div>
        </div>

        {/* 14-day mini chart */}
        <div className="mt-6">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Last 14 days of payments</p>
          <div className="flex h-24 items-end gap-1">
            {monthMoney.bars.map((b) => {
              const max = Math.max(...monthMoney.bars.map((x) => x.value), 1);
              return (
                <div
                  key={b.label}
                  title={`${b.label}: ${money(b.value)}`}
                  className="flex-1 bg-primary/25 transition-colors hover:bg-primary/60"
                  style={{ height: `${Math.max(3, (b.value / max) * 100)}%` }}
                />
              );
            })}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>{monthMoney.bars[0]?.label}</span>
            <span>{monthMoney.bars[monthMoney.bars.length - 1]?.label}</span>
          </div>
        </div>
      </div>



      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Briefing */}
        <div className="border border-border bg-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Daily briefing</h2>
          </div>
          {loadingExtra ? (
            <p className="text-sm text-muted-foreground">Reading the latest activity…</p>
          ) : (
            <ul className="space-y-3">
              {briefing.map((line, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 grid grid-cols-2 gap-px border-t border-border bg-border pt-px sm:grid-cols-4">
            {[
              { label: "Active students", value: stats.activeLearners },
              { label: "Placement tests", value: stats.tests.current },
              { label: "Classes held", value: stats.classes.current },
              { label: "New enquiries", value: stats.leads.current },
            ].map((s) => (
              <div key={s.label} className="bg-card px-3 py-3">
                <p className="font-display text-lg font-bold">{s.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Needs action */}
        <div className="border border-border bg-card p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-bold">Needs your action</h2>
          </div>
          {actions.length === 0 ? (
            <div className="flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/5 p-4">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm font-medium">All clear — nothing is waiting for you.</p>
            </div>
          ) : (
            <ul className="space-y-2.5">
              {actions.map((a) => (
                <li key={a.key} className={`flex items-center gap-3 border p-3.5 ${toneClass(a.tone)}`}>
                  <a.icon className="h-4 w-4 shrink-0 text-foreground/70" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-bold leading-none">{a.value}</p>
                    <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{a.label}</p>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 gap-1 rounded-none text-[11px]" onClick={() => onNavigate(a.tab)}>
                    {a.cta} <ArrowRight className="h-3 w-3" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="border border-border bg-card p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold">Find anyone</h2>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or phone…"
          className="h-12 rounded-none text-base"
          aria-label="Search students and sign-ups"
        />
        {query.trim().length >= 2 && (
          <div className="mt-4 divide-y divide-border border border-border">
            {results.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">No one matches “{query}”.</p>
            ) : (
              results.map((r) => (
                <div key={`${r.id}-${r.badge}`} className="flex flex-wrap items-center gap-3 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-sm font-bold text-primary">
                    {(r.name || "?")[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{r.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{r.detail}</p>
                  </div>
                  <span className="border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {r.badge}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{r.lessons} lessons · {r.streak}-day streak</span>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="rounded-none text-[11px]" onClick={() => onNavigate(r.tab)}>Open</Button>
                    <Button size="sm" variant="outline" className="rounded-none text-[11px]" onClick={() => onNavigate("grant-access")}>Access</Button>
                    <Button size="sm" variant="outline" className="rounded-none text-[11px]" onClick={() => onNavigate("notifications")}>Message</Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
