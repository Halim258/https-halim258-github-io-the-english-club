import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GrammarRule {
  level: string;
  title: string;
  explanation: string;
  examples: { en: string; ar: string }[];
  tip?: string;
}

const GRAMMAR_RULES: GrammarRule[] = [
  // A1
  { level: "A1", title: "Present Simple (to be)", explanation: "Use 'am/is/are' to describe states, identity, and feelings.", examples: [{ en: "I am a student.", ar: "أنا طالب." }, { en: "She is happy.", ar: "هي سعيدة." }, { en: "They are from Egypt.", ar: "هم من مصر." }], tip: "I → am, He/She/It → is, You/We/They → are" },
  { level: "A1", title: "Articles (a, an, the)", explanation: "Use 'a/an' for singular countable nouns mentioned for the first time. Use 'the' for specific things.", examples: [{ en: "I have a cat.", ar: "عندي قطة." }, { en: "An apple a day keeps the doctor away.", ar: "تفاحة في اليوم تبعد الطبيب." }, { en: "The sun is bright.", ar: "الشمس ساطعة." }] },
  { level: "A1", title: "Present Simple Tense", explanation: "Use for habits, routines, and general facts. Add -s/-es for he/she/it.", examples: [{ en: "I drink coffee every morning.", ar: "أشرب القهوة كل صباح." }, { en: "She works at a bank.", ar: "هي تعمل في بنك." }], tip: "Signal words: always, usually, often, sometimes, never" },
  { level: "A1", title: "Possessive Adjectives", explanation: "Words that show ownership: my, your, his, her, its, our, their.", examples: [{ en: "This is my book.", ar: "هذا كتابي." }, { en: "Their house is big.", ar: "بيتهم كبير." }] },
  // A2
  { level: "A2", title: "Past Simple Tense", explanation: "Use for completed actions in the past. Regular verbs add -ed, irregular verbs change form.", examples: [{ en: "I visited Cairo last year.", ar: "زرت القاهرة العام الماضي." }, { en: "She went to school yesterday.", ar: "ذهبت إلى المدرسة أمس." }], tip: "Signal words: yesterday, last week, ago, in 2020" },
  { level: "A2", title: "Present Continuous", explanation: "Use for actions happening right now or temporary situations. Form: am/is/are + verb-ing.", examples: [{ en: "I am reading a book.", ar: "أنا أقرأ كتاباً." }, { en: "They are playing football.", ar: "هم يلعبون كرة القدم." }], tip: "Signal words: now, at the moment, currently" },
  { level: "A2", title: "Comparative Adjectives", explanation: "Compare two things. Short adj: add -er. Long adj: use 'more'.", examples: [{ en: "She is taller than her brother.", ar: "هي أطول من أخيها." }, { en: "English is more interesting than math.", ar: "الإنجليزية أكثر إثارة من الرياضيات." }] },
  { level: "A2", title: "Countable & Uncountable Nouns", explanation: "Countable: things you can count (a book, two books). Uncountable: things you can't count (water, information).", examples: [{ en: "I need some water.", ar: "أحتاج بعض الماء." }, { en: "How many books do you have?", ar: "كم كتاباً لديك؟" }], tip: "Use 'much' with uncountable, 'many' with countable" },
  // B1
  { level: "B1", title: "Present Perfect", explanation: "Use for past actions with present relevance, or experiences. Form: have/has + past participle.", examples: [{ en: "I have visited London twice.", ar: "زرت لندن مرتين." }, { en: "She has just finished her homework.", ar: "لقد أنهت واجبها للتو." }], tip: "Signal words: already, yet, just, ever, never, since, for" },
  { level: "B1", title: "Conditionals (First)", explanation: "Real/possible situations: If + present simple, will + base verb.", examples: [{ en: "If it rains, I will stay home.", ar: "إذا أمطرت، سأبقى في المنزل." }, { en: "If you study hard, you will pass.", ar: "إذا درست بجد، ستنجح." }] },
  { level: "B1", title: "Passive Voice (Present)", explanation: "Focus on the action, not who does it. Form: am/is/are + past participle.", examples: [{ en: "English is spoken worldwide.", ar: "الإنجليزية يُتحدث بها عالمياً." }, { en: "The homework is done every day.", ar: "الواجب يُنجز كل يوم." }] },
  { level: "B1", title: "Reported Speech", explanation: "Telling what someone said. Shift tenses back one step.", examples: [{ en: 'He said he was tired.', ar: "قال إنه كان متعباً." }, { en: 'She told me she would come.', ar: "أخبرتني أنها ستأتي." }], tip: "said → said, will → would, am → was" },
  // B2
  { level: "B2", title: "Conditionals (Second)", explanation: "Unreal/hypothetical situations: If + past simple, would + base verb.", examples: [{ en: "If I had a million dollars, I would travel the world.", ar: "لو كان لدي مليون دولار، لسافرت حول العالم." }, { en: "If she were here, she would help us.", ar: "لو كانت هنا، لساعدتنا." }] },
  { level: "B2", title: "Relative Clauses", explanation: "Extra info about a noun using who, which, that, where, whose.", examples: [{ en: "The book that I bought is interesting.", ar: "الكتاب الذي اشتريته مثير." }, { en: "The teacher who taught us was excellent.", ar: "المعلم الذي درّسنا كان ممتازاً." }] },
  { level: "B2", title: "Wish + Past", explanation: "Express regrets or desires about the present. Use wish + past simple.", examples: [{ en: "I wish I spoke French.", ar: "أتمنى لو كنت أتحدث الفرنسية." }, { en: "She wishes she had more time.", ar: "تتمنى لو كان لديها وقت أكثر." }] },
  // C1
  { level: "C1", title: "Conditionals (Third)", explanation: "Unreal past: If + past perfect, would have + past participle.", examples: [{ en: "If I had studied harder, I would have passed.", ar: "لو كنت درست بجد أكثر، لكنت نجحت." }] },
  { level: "C1", title: "Inversion for Emphasis", explanation: "Reverse subject-verb order for dramatic effect.", examples: [{ en: "Never have I seen such beauty.", ar: "لم أرَ مثل هذا الجمال قط." }, { en: "Rarely does he arrive on time.", ar: "نادراً ما يصل في الوقت." }], tip: "Common triggers: Never, Rarely, Seldom, Not only, Hardly" },
  { level: "C1", title: "Cleft Sentences", explanation: "Emphasize specific information using 'It is/was... that/who'.", examples: [{ en: "It was John who broke the window.", ar: "جون هو من كسر النافذة." }, { en: "What I need is a good rest.", ar: "ما أحتاجه هو راحة جيدة." }] },
  // C2
  { level: "C2", title: "Subjunctive Mood", explanation: "Used for wishes, demands, suggestions. Base form after certain verbs.", examples: [{ en: "I suggest that he study harder.", ar: "أقترح أن يدرس بجد أكثر." }, { en: "It is essential that she be present.", ar: "من الضروري أن تكون حاضرة." }] },
  { level: "C2", title: "Mixed Conditionals", explanation: "Combine different time references in conditions.", examples: [{ en: "If I had studied medicine, I would be a doctor now.", ar: "لو كنت درست الطب، لكنت طبيباً الآن." }], tip: "Past condition → present result, or present condition → past result" },
];

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function GrammarReference() {
  const [search, setSearch] = useState("");
  const [expandedLevel, setExpandedLevel] = useState<string | null>("A1");
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return GRAMMAR_RULES;
    const q = search.toLowerCase();
    return GRAMMAR_RULES.filter(
      (r) => r.title.toLowerCase().includes(q) || r.explanation.toLowerCase().includes(q) || r.level.toLowerCase().includes(q)
    );
  }, [search]);

  const groupedByLevel = useMemo(() => {
    const map: Record<string, GrammarRule[]> = {};
    LEVELS.forEach((l) => (map[l] = []));
    filtered.forEach((r) => {
      if (map[r.level]) map[r.level].push(r);
    });
    return map;
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-500/5">
            <BookOpen className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-display">Grammar Reference</h1>
            <p className="text-sm text-muted-foreground">Quick rules & examples for every level</p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search grammar rules..."
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Levels */}
      <div className="space-y-3">
        {LEVELS.map((level) => {
          const rules = groupedByLevel[level];
          if (rules.length === 0 && search) return null;
          const isOpen = expandedLevel === level;

          return (
            <motion.div
              key={level}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card shadow-soft overflow-hidden"
            >
              <button
                onClick={() => setExpandedLevel(isOpen ? null : level)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {level}
                  </span>
                  <span className="text-sm font-semibold">{level} Grammar Rules</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded-full px-2 py-0.5">{rules.length}</span>
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 space-y-2">
                  {rules.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">No rules found for {level}.</p>
                  ) : (
                    rules.map((rule) => {
                      const ruleKey = `${level}-${rule.title}`;
                      const ruleOpen = expandedRule === ruleKey;
                      return (
                        <div key={ruleKey} className="rounded-xl border bg-background">
                          <button
                            onClick={() => setExpandedRule(ruleOpen ? null : ruleKey)}
                            className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-muted/20 transition-colors rounded-xl"
                          >
                            <span className="text-sm font-medium">{rule.title}</span>
                            {ruleOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                          </button>
                          {ruleOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="px-4 pb-4 space-y-3"
                            >
                              <p className="text-sm text-muted-foreground">{rule.explanation}</p>
                              {rule.tip && (
                                <div className="flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <p className="text-xs font-medium text-primary">{rule.tip}</p>
                                </div>
                              )}
                              <div className="space-y-1.5">
                                {rule.examples.map((ex, i) => (
                                  <div key={i} className="rounded-lg bg-muted/40 px-3 py-2">
                                    <p className="text-sm font-medium">{ex.en}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5" dir="rtl">{ex.ar}</p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
