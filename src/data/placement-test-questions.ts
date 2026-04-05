export interface PlacementQuestion {
  id: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  type: "grammar" | "vocabulary" | "reading";
  question: string;
  options: string[];
  correctIndex: number;
  /** Optional reading passage for reading comprehension questions */
  passage?: string;
}

/**
 * 50 Cambridge-style placement test questions.
 * Ordered by difficulty: A1 (1-8), A2 (9-16), B1 (17-26), B2 (27-36), C1 (37-44), C2 (45-50)
 */
export const placementQuestions: PlacementQuestion[] = [
  // ═══ A1 — Beginner (8 questions) ═══
  {
    id: 1, level: "A1", type: "grammar",
    question: "She _____ a teacher.",
    options: ["am", "is", "are", "be"],
    correctIndex: 1,
  },
  {
    id: 2, level: "A1", type: "grammar",
    question: "_____ you like coffee?",
    options: ["Does", "Do", "Are", "Is"],
    correctIndex: 1,
  },
  {
    id: 3, level: "A1", type: "vocabulary",
    question: "The opposite of 'hot' is _____.",
    options: ["warm", "cold", "cool", "wet"],
    correctIndex: 1,
  },
  {
    id: 4, level: "A1", type: "grammar",
    question: "I _____ from Egypt.",
    options: ["is", "am", "are", "be"],
    correctIndex: 1,
  },
  {
    id: 5, level: "A1", type: "vocabulary",
    question: "There are seven days in a _____.",
    options: ["month", "year", "week", "hour"],
    correctIndex: 2,
  },
  {
    id: 6, level: "A1", type: "grammar",
    question: "They _____ students.",
    options: ["is", "am", "are", "does"],
    correctIndex: 2,
  },
  {
    id: 7, level: "A1", type: "vocabulary",
    question: "We eat breakfast in the _____.",
    options: ["evening", "afternoon", "morning", "night"],
    correctIndex: 2,
  },
  {
    id: 8, level: "A1", type: "grammar",
    question: "He _____ to school every day.",
    options: ["go", "going", "goes", "gone"],
    correctIndex: 2,
  },

  // ═══ A2 — Elementary (8 questions) ═══
  {
    id: 9, level: "A2", type: "grammar",
    question: "I _____ to the cinema last night.",
    options: ["go", "went", "gone", "going"],
    correctIndex: 1,
  },
  {
    id: 10, level: "A2", type: "grammar",
    question: "She is _____ than her sister.",
    options: ["tall", "taller", "tallest", "more tall"],
    correctIndex: 1,
  },
  {
    id: 11, level: "A2", type: "vocabulary",
    question: "I need to _____ my homework before dinner.",
    options: ["make", "do", "have", "take"],
    correctIndex: 1,
  },
  {
    id: 12, level: "A2", type: "grammar",
    question: "There _____ some milk in the fridge.",
    options: ["are", "is", "have", "has"],
    correctIndex: 1,
  },
  {
    id: 13, level: "A2", type: "vocabulary",
    question: "Can you _____ me the time, please?",
    options: ["say", "speak", "tell", "talk"],
    correctIndex: 2,
  },
  {
    id: 14, level: "A2", type: "grammar",
    question: "We _____ playing football when it started raining.",
    options: ["are", "was", "were", "been"],
    correctIndex: 2,
  },
  {
    id: 15, level: "A2", type: "vocabulary",
    question: "He _____ his car to work every day.",
    options: ["rides", "drives", "travels", "goes"],
    correctIndex: 1,
  },
  {
    id: 16, level: "A2", type: "grammar",
    question: "I haven't got _____ brothers or sisters.",
    options: ["some", "no", "any", "a"],
    correctIndex: 2,
  },

  // ═══ B1 — Intermediate (10 questions) ═══
  {
    id: 17, level: "B1", type: "grammar",
    question: "If I _____ you, I would accept the offer.",
    options: ["am", "was", "were", "be"],
    correctIndex: 2,
  },
  {
    id: 18, level: "B1", type: "vocabulary",
    question: "She was so tired that she could _____ keep her eyes open.",
    options: ["nearly", "hardly", "almost", "mostly"],
    correctIndex: 1,
  },
  {
    id: 19, level: "B1", type: "grammar",
    question: "The film _____ by the time we arrived at the cinema.",
    options: ["started", "has started", "had started", "was starting"],
    correctIndex: 2,
  },
  {
    id: 20, level: "B1", type: "grammar",
    question: "She asked me where I _____.",
    options: ["live", "lived", "am living", "do live"],
    correctIndex: 1,
  },
  {
    id: 21, level: "B1", type: "vocabulary",
    question: "I really _____ forward to the holiday.",
    options: ["see", "go", "look", "think"],
    correctIndex: 2,
  },
  {
    id: 22, level: "B1", type: "grammar",
    question: "You _____ to see a doctor about that cough.",
    options: ["should", "ought", "must", "need"],
    correctIndex: 1,
  },
  {
    id: 23, level: "B1", type: "reading",
    passage: "Sarah has been working at the company for three years. She started as an intern and has recently been promoted to team leader. Her colleagues admire her dedication and positive attitude.",
    question: "According to the passage, Sarah _____.",
    options: [
      "has always been a team leader",
      "recently started at the company",
      "moved up from a lower position",
      "does not get along with colleagues"
    ],
    correctIndex: 2,
  },
  {
    id: 24, level: "B1", type: "grammar",
    question: "He suggested _____ to the park for a walk.",
    options: ["to go", "going", "go", "went"],
    correctIndex: 1,
  },
  {
    id: 25, level: "B1", type: "vocabulary",
    question: "The meeting was _____ until next week.",
    options: ["put off", "put on", "put up", "put away"],
    correctIndex: 0,
  },
  {
    id: 26, level: "B1", type: "grammar",
    question: "I wish I _____ speak French fluently.",
    options: ["can", "could", "would", "may"],
    correctIndex: 1,
  },

  // ═══ B2 — Upper-Intermediate (10 questions) ═══
  {
    id: 27, level: "B2", type: "grammar",
    question: "Not only _____ late, but he also forgot the documents.",
    options: ["he was", "was he", "he is", "is he"],
    correctIndex: 1,
  },
  {
    id: 28, level: "B2", type: "vocabulary",
    question: "The government decided to _____ new regulations on emissions.",
    options: ["enforce", "impose", "apply", "force"],
    correctIndex: 1,
  },
  {
    id: 29, level: "B2", type: "grammar",
    question: "Had I known about the traffic, I _____ earlier.",
    options: [
      "would leave",
      "would have left",
      "will leave",
      "had left"
    ],
    correctIndex: 1,
  },
  {
    id: 30, level: "B2", type: "vocabulary",
    question: "The negotiations fell _____ because neither side was willing to compromise.",
    options: ["apart", "down", "out", "through"],
    correctIndex: 3,
  },
  {
    id: 31, level: "B2", type: "reading",
    passage: "Remote working has become increasingly common since 2020. While many employees appreciate the flexibility, some struggle with isolation and the blurring of boundaries between work and personal life. Companies are now exploring hybrid models as a middle ground.",
    question: "The passage suggests that hybrid models are being considered because _____.",
    options: [
      "everyone prefers working from home",
      "offices are no longer needed",
      "remote work has both advantages and disadvantages",
      "companies want to reduce costs"
    ],
    correctIndex: 2,
  },
  {
    id: 32, level: "B2", type: "grammar",
    question: "The project, _____ was expected to take six months, was completed in four.",
    options: ["that", "which", "what", "who"],
    correctIndex: 1,
  },
  {
    id: 33, level: "B2", type: "vocabulary",
    question: "Her performance was _____ — everyone in the audience was speechless.",
    options: ["breathless", "breathtaking", "breathing", "breathed"],
    correctIndex: 1,
  },
  {
    id: 34, level: "B2", type: "grammar",
    question: "_____ having studied all night, she still felt unprepared.",
    options: ["Despite", "Although", "However", "Even"],
    correctIndex: 0,
  },
  {
    id: 35, level: "B2", type: "vocabulary",
    question: "He tends to _____ conclusions without examining all the evidence.",
    options: ["reach", "jump to", "come to", "draw"],
    correctIndex: 1,
  },
  {
    id: 36, level: "B2", type: "grammar",
    question: "It's high time we _____ a decision about the future of the project.",
    options: ["make", "made", "making", "will make"],
    correctIndex: 1,
  },

  // ═══ C1 — Advanced (8 questions) ═══
  {
    id: 37, level: "C1", type: "grammar",
    question: "Under no circumstances _____ to leave the building during the drill.",
    options: [
      "employees are allowed",
      "are employees allowed",
      "employees allowed",
      "allowed employees are"
    ],
    correctIndex: 1,
  },
  {
    id: 38, level: "C1", type: "vocabulary",
    question: "The journalist wrote a _____ critique of the government's policies.",
    options: ["scalding", "scathing", "scratching", "scaring"],
    correctIndex: 1,
  },
  {
    id: 39, level: "C1", type: "reading",
    passage: "The proliferation of social media has fundamentally altered the landscape of public discourse. While proponents argue it has democratised access to information, critics contend that algorithmic echo chambers have polarised opinion and eroded the quality of debate. The challenge lies in harnessing its connective power without succumbing to its divisive tendencies.",
    question: "The author's tone in this passage is best described as _____.",
    options: [
      "overwhelmingly positive about social media",
      "dismissive of technology",
      "balanced and analytical",
      "primarily concerned with entertainment"
    ],
    correctIndex: 2,
  },
  {
    id: 40, level: "C1", type: "grammar",
    question: "The proposal was rejected on the _____ that it was financially unviable.",
    options: ["grounds", "basis", "account", "reason"],
    correctIndex: 0,
  },
  {
    id: 41, level: "C1", type: "vocabulary",
    question: "His _____ remarks during the meeting alienated several colleagues.",
    options: ["offhand", "forthcoming", "outspoken", "outright"],
    correctIndex: 0,
  },
  {
    id: 42, level: "C1", type: "grammar",
    question: "Rarely _____ such a display of incompetence in a professional setting.",
    options: [
      "I have seen",
      "have I seen",
      "I saw",
      "did I seen"
    ],
    correctIndex: 1,
  },
  {
    id: 43, level: "C1", type: "vocabulary",
    question: "The CEO's resignation sent _____ through the entire organisation.",
    options: ["shockwaves", "soundwaves", "heatwaves", "airwaves"],
    correctIndex: 0,
  },
  {
    id: 44, level: "C1", type: "grammar",
    question: "_____ the circumstances, I think we handled the situation well.",
    options: ["Given", "Providing", "Assuming", "Supposing"],
    correctIndex: 0,
  },

  // ═══ C2 — Mastery (6 questions) ═══
  {
    id: 45, level: "C2", type: "vocabulary",
    question: "The politician's speech was peppered with _____ designed to obscure the truth.",
    options: ["euphemisms", "metaphors", "synonyms", "acronyms"],
    correctIndex: 0,
  },
  {
    id: 46, level: "C2", type: "reading",
    passage: "The notion that language merely reflects thought has been supplanted by the more nuanced understanding that it actively shapes cognition. The Sapir-Whorf hypothesis, in its strong form, posits linguistic determinism — that the structure of a language determines the way its speakers perceive and conceptualise the world. While this extreme position has largely been discredited, the weaker version, linguistic relativity, maintains considerable empirical support.",
    question: "According to the passage, the current scholarly consensus is that _____.",
    options: [
      "the Sapir-Whorf hypothesis has been entirely disproved",
      "language has no effect on thought",
      "a modified version of linguistic relativity is supported by evidence",
      "linguistic determinism is widely accepted"
    ],
    correctIndex: 2,
  },
  {
    id: 47, level: "C2", type: "grammar",
    question: "So _____ was the evidence against him that acquittal was inconceivable.",
    options: ["overwhelming", "overwhelmed", "overwhelmingly", "to overwhelm"],
    correctIndex: 0,
  },
  {
    id: 48, level: "C2", type: "vocabulary",
    question: "The author's _____ prose style belied the complexity of her arguments.",
    options: ["limpid", "turbid", "turgid", "vapid"],
    correctIndex: 0,
  },
  {
    id: 49, level: "C2", type: "grammar",
    question: "_____ it not for the timely intervention of the paramedics, the outcome would have been tragic.",
    options: ["Were", "Had", "Should", "Was"],
    correctIndex: 1,
  },
  {
    id: 50, level: "C2", type: "vocabulary",
    question: "The diplomat's _____ response managed to placate both parties without committing to either position.",
    options: ["equivocal", "unequivocal", "vociferous", "loquacious"],
    correctIndex: 0,
  },
];

/** Map score percentage to CEFR level */
export function scoreToCEFR(score: number, total: number): string {
  const pct = (score / total) * 100;
  if (pct >= 90) return "C2";
  if (pct >= 78) return "C1";
  if (pct >= 64) return "B2";
  if (pct >= 50) return "B1";
  if (pct >= 34) return "A2";
  return "A1";
}

export const cefrDescriptions: Record<string, { label: string; desc: string; color: string }> = {
  A1: { label: "Beginner", desc: "You can understand and use familiar everyday expressions and basic phrases.", color: "from-emerald-500 to-emerald-600" },
  A2: { label: "Elementary", desc: "You can communicate in simple, routine tasks and describe your background.", color: "from-teal-500 to-teal-600" },
  B1: { label: "Intermediate", desc: "You can deal with most situations while travelling and describe experiences and events.", color: "from-blue-500 to-blue-600" },
  B2: { label: "Upper-Intermediate", desc: "You can interact with a degree of fluency and produce detailed text on a wide range of subjects.", color: "from-violet-500 to-violet-600" },
  C1: { label: "Advanced", desc: "You can express ideas fluently and use language flexibly for social, academic, and professional purposes.", color: "from-amber-500 to-amber-600" },
  C2: { label: "Mastery", desc: "You can understand virtually everything heard or read and express yourself spontaneously with precision.", color: "from-primary to-rose-600" },
};
