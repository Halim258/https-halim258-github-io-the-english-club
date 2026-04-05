export interface PlacementQuestion {
  id: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  type: "grammar" | "vocabulary" | "reading";
  question: string;
  options: string[];
  correctIndex: number;
  passage?: string;
}

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CEFRLevel = (typeof LEVELS)[number];

/** Full question bank — ~15 questions per level = ~90 total */
export const questionBank: PlacementQuestion[] = [
  // ═══════════════════════════════════════════
  // A1 — Beginner (15 questions)
  // ═══════════════════════════════════════════
  { id: 1, level: "A1", type: "grammar", question: "She _____ a teacher.", options: ["am", "is", "are", "be"], correctIndex: 1 },
  { id: 2, level: "A1", type: "grammar", question: "_____ you like coffee?", options: ["Does", "Do", "Are", "Is"], correctIndex: 1 },
  { id: 3, level: "A1", type: "vocabulary", question: "The opposite of 'hot' is _____.", options: ["warm", "cold", "cool", "wet"], correctIndex: 1 },
  { id: 4, level: "A1", type: "grammar", question: "I _____ from Egypt.", options: ["is", "am", "are", "be"], correctIndex: 1 },
  { id: 5, level: "A1", type: "vocabulary", question: "There are seven days in a _____.", options: ["month", "year", "week", "hour"], correctIndex: 2 },
  { id: 6, level: "A1", type: "grammar", question: "They _____ students.", options: ["is", "am", "are", "does"], correctIndex: 2 },
  { id: 7, level: "A1", type: "vocabulary", question: "We eat breakfast in the _____.", options: ["evening", "afternoon", "morning", "night"], correctIndex: 2 },
  { id: 8, level: "A1", type: "grammar", question: "He _____ to school every day.", options: ["go", "going", "goes", "gone"], correctIndex: 2 },
  { id: 9, level: "A1", type: "grammar", question: "This is _____ book.", options: ["me", "I", "my", "mine"], correctIndex: 2 },
  { id: 10, level: "A1", type: "vocabulary", question: "A _____ is a person who teaches.", options: ["doctor", "teacher", "driver", "farmer"], correctIndex: 1 },
  { id: 11, level: "A1", type: "grammar", question: "_____ is your name?", options: ["Who", "Where", "What", "How"], correctIndex: 2 },
  { id: 12, level: "A1", type: "vocabulary", question: "The colour of grass is _____.", options: ["blue", "red", "green", "yellow"], correctIndex: 2 },
  { id: 13, level: "A1", type: "grammar", question: "We _____ not hungry.", options: ["is", "am", "are", "be"], correctIndex: 2 },
  { id: 14, level: "A1", type: "vocabulary", question: "You sleep in a _____.", options: ["kitchen", "bathroom", "bedroom", "garden"], correctIndex: 2 },
  { id: 15, level: "A1", type: "grammar", question: "_____ she speak English?", options: ["Do", "Does", "Is", "Are"], correctIndex: 1 },

  // ═══════════════════════════════════════════
  // A2 — Elementary (15 questions)
  // ═══════════════════════════════════════════
  { id: 16, level: "A2", type: "grammar", question: "I _____ to the cinema last night.", options: ["go", "went", "gone", "going"], correctIndex: 1 },
  { id: 17, level: "A2", type: "grammar", question: "She is _____ than her sister.", options: ["tall", "taller", "tallest", "more tall"], correctIndex: 1 },
  { id: 18, level: "A2", type: "vocabulary", question: "I need to _____ my homework before dinner.", options: ["make", "do", "have", "take"], correctIndex: 1 },
  { id: 19, level: "A2", type: "grammar", question: "There _____ some milk in the fridge.", options: ["are", "is", "have", "has"], correctIndex: 1 },
  { id: 20, level: "A2", type: "vocabulary", question: "Can you _____ me the time, please?", options: ["say", "speak", "tell", "talk"], correctIndex: 2 },
  { id: 21, level: "A2", type: "grammar", question: "We _____ playing football when it started raining.", options: ["are", "was", "were", "been"], correctIndex: 2 },
  { id: 22, level: "A2", type: "vocabulary", question: "He _____ his car to work every day.", options: ["rides", "drives", "travels", "goes"], correctIndex: 1 },
  { id: 23, level: "A2", type: "grammar", question: "I haven't got _____ brothers or sisters.", options: ["some", "no", "any", "a"], correctIndex: 2 },
  { id: 24, level: "A2", type: "grammar", question: "She _____ never been to London.", options: ["have", "has", "is", "was"], correctIndex: 1 },
  { id: 25, level: "A2", type: "vocabulary", question: "I'm very _____ — I've been working all day.", options: ["bored", "tired", "boring", "tiring"], correctIndex: 1 },
  { id: 26, level: "A2", type: "grammar", question: "What _____ you doing at 8pm yesterday?", options: ["are", "were", "was", "did"], correctIndex: 1 },
  { id: 27, level: "A2", type: "vocabulary", question: "Please turn _____ the light. It's too dark.", options: ["off", "on", "up", "down"], correctIndex: 1 },
  { id: 28, level: "A2", type: "grammar", question: "He _____ TV when the phone rang.", options: ["watches", "watched", "was watching", "is watching"], correctIndex: 2 },
  { id: 29, level: "A2", type: "vocabulary", question: "My sister is a _____. She works in a hospital.", options: ["teacher", "nurse", "driver", "chef"], correctIndex: 1 },
  { id: 30, level: "A2", type: "grammar", question: "This is the _____ film I've ever seen.", options: ["good", "better", "best", "most good"], correctIndex: 2 },

  // ═══════════════════════════════════════════
  // B1 — Intermediate (15 questions)
  // ═══════════════════════════════════════════
  { id: 31, level: "B1", type: "grammar", question: "If I _____ you, I would accept the offer.", options: ["am", "was", "were", "be"], correctIndex: 2 },
  { id: 32, level: "B1", type: "vocabulary", question: "She was so tired that she could _____ keep her eyes open.", options: ["nearly", "hardly", "almost", "mostly"], correctIndex: 1 },
  { id: 33, level: "B1", type: "grammar", question: "The film _____ by the time we arrived at the cinema.", options: ["started", "has started", "had started", "was starting"], correctIndex: 2 },
  { id: 34, level: "B1", type: "grammar", question: "She asked me where I _____.", options: ["live", "lived", "am living", "do live"], correctIndex: 1 },
  { id: 35, level: "B1", type: "vocabulary", question: "I really _____ forward to the holiday.", options: ["see", "go", "look", "think"], correctIndex: 2 },
  { id: 36, level: "B1", type: "grammar", question: "You _____ to see a doctor about that cough.", options: ["should", "ought", "must", "need"], correctIndex: 1 },
  { id: 37, level: "B1", type: "reading", passage: "Sarah has been working at the company for three years. She started as an intern and has recently been promoted to team leader. Her colleagues admire her dedication and positive attitude.", question: "According to the passage, Sarah _____.", options: ["has always been a team leader", "recently started at the company", "moved up from a lower position", "does not get along with colleagues"], correctIndex: 2 },
  { id: 38, level: "B1", type: "grammar", question: "He suggested _____ to the park for a walk.", options: ["to go", "going", "go", "went"], correctIndex: 1 },
  { id: 39, level: "B1", type: "vocabulary", question: "The meeting was _____ until next week.", options: ["put off", "put on", "put up", "put away"], correctIndex: 0 },
  { id: 40, level: "B1", type: "grammar", question: "I wish I _____ speak French fluently.", options: ["can", "could", "would", "may"], correctIndex: 1 },
  { id: 41, level: "B1", type: "vocabulary", question: "He _____ up smoking last year.", options: ["gave", "put", "took", "set"], correctIndex: 0 },
  { id: 42, level: "B1", type: "grammar", question: "The book _____ by millions of people.", options: ["has read", "has been read", "was reading", "read"], correctIndex: 1 },
  { id: 43, level: "B1", type: "vocabulary", question: "She takes _____ her mother — they look very similar.", options: ["after", "on", "up", "over"], correctIndex: 0 },
  { id: 44, level: "B1", type: "grammar", question: "By this time tomorrow, I _____ my exam.", options: ["finish", "will finish", "will have finished", "am finishing"], correctIndex: 2 },
  { id: 45, level: "B1", type: "vocabulary", question: "We need to _____ up with a solution quickly.", options: ["come", "go", "put", "take"], correctIndex: 0 },

  // ═══════════════════════════════════════════
  // B2 — Upper-Intermediate (15 questions)
  // ═══════════════════════════════════════════
  { id: 46, level: "B2", type: "grammar", question: "Not only _____ late, but he also forgot the documents.", options: ["he was", "was he", "he is", "is he"], correctIndex: 1 },
  { id: 47, level: "B2", type: "vocabulary", question: "The government decided to _____ new regulations on emissions.", options: ["enforce", "impose", "apply", "force"], correctIndex: 1 },
  { id: 48, level: "B2", type: "grammar", question: "Had I known about the traffic, I _____ earlier.", options: ["would leave", "would have left", "will leave", "had left"], correctIndex: 1 },
  { id: 49, level: "B2", type: "vocabulary", question: "The negotiations fell _____ because neither side was willing to compromise.", options: ["apart", "down", "out", "through"], correctIndex: 3 },
  { id: 50, level: "B2", type: "reading", passage: "Remote working has become increasingly common since 2020. While many employees appreciate the flexibility, some struggle with isolation and the blurring of boundaries between work and personal life. Companies are now exploring hybrid models as a middle ground.", question: "The passage suggests that hybrid models are being considered because _____.", options: ["everyone prefers working from home", "offices are no longer needed", "remote work has both advantages and disadvantages", "companies want to reduce costs"], correctIndex: 2 },
  { id: 51, level: "B2", type: "grammar", question: "The project, _____ was expected to take six months, was completed in four.", options: ["that", "which", "what", "who"], correctIndex: 1 },
  { id: 52, level: "B2", type: "vocabulary", question: "Her performance was _____ — everyone in the audience was speechless.", options: ["breathless", "breathtaking", "breathing", "breathed"], correctIndex: 1 },
  { id: 53, level: "B2", type: "grammar", question: "_____ having studied all night, she still felt unprepared.", options: ["Despite", "Although", "However", "Even"], correctIndex: 0 },
  { id: 54, level: "B2", type: "vocabulary", question: "He tends to _____ conclusions without examining all the evidence.", options: ["reach", "jump to", "come to", "draw"], correctIndex: 1 },
  { id: 55, level: "B2", type: "grammar", question: "It's high time we _____ a decision about the future of the project.", options: ["make", "made", "making", "will make"], correctIndex: 1 },
  { id: 56, level: "B2", type: "vocabulary", question: "The company is _____ of going bankrupt if sales don't improve.", options: ["at risk", "in danger", "on the verge", "at the point"], correctIndex: 2 },
  { id: 57, level: "B2", type: "grammar", question: "She _____ have left already — her coat is gone.", options: ["can", "must", "should", "would"], correctIndex: 1 },
  { id: 58, level: "B2", type: "vocabulary", question: "The new policy brought _____ a significant change in workplace culture.", options: ["about", "up", "in", "out"], correctIndex: 0 },
  { id: 59, level: "B2", type: "grammar", question: "Little _____ he know what was about to happen.", options: ["does", "did", "was", "had"], correctIndex: 1 },
  { id: 60, level: "B2", type: "vocabulary", question: "I can't _____ up with this noise any longer!", options: ["put", "keep", "hold", "stand"], correctIndex: 0 },

  // ═══════════════════════════════════════════
  // C1 — Advanced (15 questions)
  // ═══════════════════════════════════════════
  { id: 61, level: "C1", type: "grammar", question: "Under no circumstances _____ to leave the building during the drill.", options: ["employees are allowed", "are employees allowed", "employees allowed", "allowed employees are"], correctIndex: 1 },
  { id: 62, level: "C1", type: "vocabulary", question: "The journalist wrote a _____ critique of the government's policies.", options: ["scalding", "scathing", "scratching", "scaring"], correctIndex: 1 },
  { id: 63, level: "C1", type: "reading", passage: "The proliferation of social media has fundamentally altered the landscape of public discourse. While proponents argue it has democratised access to information, critics contend that algorithmic echo chambers have polarised opinion and eroded the quality of debate. The challenge lies in harnessing its connective power without succumbing to its divisive tendencies.", question: "The author's tone in this passage is best described as _____.", options: ["overwhelmingly positive about social media", "dismissive of technology", "balanced and analytical", "primarily concerned with entertainment"], correctIndex: 2 },
  { id: 64, level: "C1", type: "grammar", question: "The proposal was rejected on the _____ that it was financially unviable.", options: ["grounds", "basis", "account", "reason"], correctIndex: 0 },
  { id: 65, level: "C1", type: "vocabulary", question: "His _____ remarks during the meeting alienated several colleagues.", options: ["offhand", "forthcoming", "outspoken", "outright"], correctIndex: 0 },
  { id: 66, level: "C1", type: "grammar", question: "Rarely _____ such a display of incompetence in a professional setting.", options: ["I have seen", "have I seen", "I saw", "did I seen"], correctIndex: 1 },
  { id: 67, level: "C1", type: "vocabulary", question: "The CEO's resignation sent _____ through the entire organisation.", options: ["shockwaves", "soundwaves", "heatwaves", "airwaves"], correctIndex: 0 },
  { id: 68, level: "C1", type: "grammar", question: "_____ the circumstances, I think we handled the situation well.", options: ["Given", "Providing", "Assuming", "Supposing"], correctIndex: 0 },
  { id: 69, level: "C1", type: "vocabulary", question: "The merger is likely to _____ considerable opposition from shareholders.", options: ["encounter", "face", "meet", "all of the above"], correctIndex: 3 },
  { id: 70, level: "C1", type: "grammar", question: "Were it not for his intervention, the deal _____.", options: ["would collapse", "would have collapsed", "collapsed", "had collapsed"], correctIndex: 1 },
  { id: 71, level: "C1", type: "vocabulary", question: "She has a _____ for remembering names — she never forgets anyone.", options: ["knack", "trick", "skill", "talent"], correctIndex: 0 },
  { id: 72, level: "C1", type: "grammar", question: "No sooner _____ the door than the phone rang.", options: ["I had opened", "had I opened", "I opened", "did I open"], correctIndex: 1 },
  { id: 73, level: "C1", type: "vocabulary", question: "The evidence was _____ — there was no room for doubt.", options: ["conclusive", "inclusive", "exclusive", "elusive"], correctIndex: 0 },
  { id: 74, level: "C1", type: "grammar", question: "Much as I _____ to help, I simply don't have the time.", options: ["would like", "like", "liked", "will like"], correctIndex: 0 },
  { id: 75, level: "C1", type: "reading", passage: "Cognitive dissonance theory suggests that individuals experience psychological discomfort when holding two contradictory beliefs simultaneously. To resolve this tension, people tend to modify one of the conflicting cognitions, add new ones to create consistency, or reduce the importance of the conflict.", question: "According to the passage, people resolve cognitive dissonance by _____.", options: ["ignoring all their beliefs", "seeking professional help", "adjusting their beliefs or their perceived importance", "accepting the contradiction permanently"], correctIndex: 2 },

  // ═══════════════════════════════════════════
  // C2 — Mastery (15 questions)
  // ═══════════════════════════════════════════
  { id: 76, level: "C2", type: "vocabulary", question: "The politician's speech was peppered with _____ designed to obscure the truth.", options: ["euphemisms", "metaphors", "synonyms", "acronyms"], correctIndex: 0 },
  { id: 77, level: "C2", type: "reading", passage: "The notion that language merely reflects thought has been supplanted by the more nuanced understanding that it actively shapes cognition. The Sapir-Whorf hypothesis, in its strong form, posits linguistic determinism — that the structure of a language determines the way its speakers perceive and conceptualise the world. While this extreme position has largely been discredited, the weaker version, linguistic relativity, maintains considerable empirical support.", question: "According to the passage, the current scholarly consensus is that _____.", options: ["the Sapir-Whorf hypothesis has been entirely disproved", "language has no effect on thought", "a modified version of linguistic relativity is supported by evidence", "linguistic determinism is widely accepted"], correctIndex: 2 },
  { id: 78, level: "C2", type: "grammar", question: "So _____ was the evidence against him that acquittal was inconceivable.", options: ["overwhelming", "overwhelmed", "overwhelmingly", "to overwhelm"], correctIndex: 0 },
  { id: 79, level: "C2", type: "vocabulary", question: "The author's _____ prose style belied the complexity of her arguments.", options: ["limpid", "turbid", "turgid", "vapid"], correctIndex: 0 },
  { id: 80, level: "C2", type: "grammar", question: "_____ it not for the timely intervention of the paramedics, the outcome would have been tragic.", options: ["Were", "Had", "Should", "Was"], correctIndex: 1 },
  { id: 81, level: "C2", type: "vocabulary", question: "The diplomat's _____ response managed to placate both parties without committing to either position.", options: ["equivocal", "unequivocal", "vociferous", "loquacious"], correctIndex: 0 },
  { id: 82, level: "C2", type: "grammar", question: "At no point during the proceedings _____ any indication of wrongdoing.", options: ["there was", "was there", "there had been", "had there"], correctIndex: 1 },
  { id: 83, level: "C2", type: "vocabulary", question: "His _____ adherence to protocol irritated those who preferred a more flexible approach.", options: ["punctilious", "perfunctory", "peremptory", "peripheral"], correctIndex: 0 },
  { id: 84, level: "C2", type: "grammar", question: "Not until the results were published _____ the true extent of the problem.", options: ["we realised", "did we realise", "we did realise", "had we realised"], correctIndex: 1 },
  { id: 85, level: "C2", type: "vocabulary", question: "The philosopher's argument, though _____, failed to persuade the sceptics.", options: ["cogent", "nebulous", "specious", "trite"], correctIndex: 0 },
  { id: 86, level: "C2", type: "reading", passage: "The concept of epistemic humility — the recognition that our knowledge is always provisional and incomplete — has gained renewed traction in an era characterised by information overload and polarised discourse. Far from advocating intellectual paralysis, proponents argue that acknowledging uncertainty paradoxically strengthens the rigour of our reasoning by compelling us to examine evidence more scrupulously.", question: "The passage argues that epistemic humility _____.", options: ["leads to indecision and inaction", "undermines confidence in knowledge", "actually improves the quality of reasoning", "is only relevant in academic contexts"], correctIndex: 2 },
  { id: 87, level: "C2", type: "grammar", question: "Seldom _____ a more eloquent defence of civil liberties.", options: ["has there been", "there has been", "there was", "it was"], correctIndex: 0 },
  { id: 88, level: "C2", type: "vocabulary", question: "The critic dismissed the novel as _____, lacking any originality or depth.", options: ["derivative", "definitive", "derisive", "decisive"], correctIndex: 0 },
  { id: 89, level: "C2", type: "grammar", question: "Only after exhaustive analysis _____ to a conclusion.", options: ["the committee came", "did the committee come", "the committee had come", "came the committee"], correctIndex: 1 },
  { id: 90, level: "C2", type: "vocabulary", question: "Her _____ wit made her the life of every gathering, yet masked a profound melancholy.", options: ["mordant", "morbid", "moribund", "mundane"], correctIndex: 0 },
];

/** Adaptive test engine config */
export const ADAPTIVE_CONFIG = {
  /** Total questions to ask */
  totalQuestions: 25,
  /** Start level index (0=A1, 1=A2, ... 5=C2) — start at B1 */
  startLevelIndex: 2,
  /** Min questions per level before moving on */
  minQuestionsPerLevel: 2,
  /** Consecutive correct answers to level up */
  correctToLevelUp: 2,
  /** Consecutive wrong answers to level down */
  wrongToLevelDown: 2,
  /** Questions at the "ceiling" level to confirm placement */
  ceilingConfirmation: 3,
};

/**
 * Adaptive algorithm: selects the next question based on performance.
 * Returns a shuffled, unused question from the target level.
 */
export function selectNextQuestion(
  currentLevelIndex: number,
  usedIds: Set<number>,
): PlacementQuestion | null {
  const level = LEVELS[currentLevelIndex];
  const available = questionBank.filter(
    (q) => q.level === level && !usedIds.has(q.id)
  );

  if (available.length === 0) {
    // Try adjacent levels
    for (let offset = 1; offset <= 5; offset++) {
      for (const dir of [1, -1]) {
        const idx = currentLevelIndex + offset * dir;
        if (idx >= 0 && idx < LEVELS.length) {
          const fallback = questionBank.filter(
            (q) => q.level === LEVELS[idx] && !usedIds.has(q.id)
          );
          if (fallback.length > 0) {
            return fallback[Math.floor(Math.random() * fallback.length)];
          }
        }
      }
    }
    return null;
  }

  return available[Math.floor(Math.random() * available.length)];
}

/** Determine CEFR level from adaptive test results */
export function adaptiveScoreToCEFR(
  answeredQuestions: { question: PlacementQuestion; selectedIndex: number }[]
): CEFRLevel {
  // Weight by level: correct answers at higher levels count more
  const levelWeights: Record<CEFRLevel, number> = {
    A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6,
  };

  let weightedScore = 0;
  let maxWeight = 0;

  for (const { question, selectedIndex } of answeredQuestions) {
    const weight = levelWeights[question.level];
    maxWeight += weight;
    if (selectedIndex === question.correctIndex) {
      weightedScore += weight;
    }
  }

  // Find highest level where student got majority correct
  let determinedLevel: CEFRLevel = "A1";

  for (const level of LEVELS) {
    const levelAnswers = answeredQuestions.filter((a) => a.question.level === level);
    if (levelAnswers.length === 0) continue;
    const correct = levelAnswers.filter(
      (a) => a.selectedIndex === a.question.correctIndex
    ).length;
    const ratio = correct / levelAnswers.length;
    if (ratio >= 0.5) {
      determinedLevel = level;
    } else {
      break; // Stop at first level they fail
    }
  }

  return determinedLevel;
}

export const cefrDescriptions: Record<string, { label: string; desc: string; color: string }> = {
  A1: { label: "Beginner", desc: "You can understand and use familiar everyday expressions and basic phrases.", color: "from-emerald-500 to-emerald-600" },
  A2: { label: "Elementary", desc: "You can communicate in simple, routine tasks and describe your background.", color: "from-teal-500 to-teal-600" },
  B1: { label: "Intermediate", desc: "You can deal with most situations while travelling and describe experiences and events.", color: "from-blue-500 to-blue-600" },
  B2: { label: "Upper-Intermediate", desc: "You can interact with a degree of fluency and produce detailed text on a wide range of subjects.", color: "from-violet-500 to-violet-600" },
  C1: { label: "Advanced", desc: "You can express ideas fluently and use language flexibly for social, academic, and professional purposes.", color: "from-amber-500 to-amber-600" },
  C2: { label: "Mastery", desc: "You can understand virtually everything heard or read and express yourself spontaneously with precision.", color: "from-primary to-rose-600" },
};
