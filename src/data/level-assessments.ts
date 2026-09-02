import type { MCQItem } from "@/data/lessons";

export type LevelAssessment = {
  levelId: string;
  title: string;
  description: string;
  passMark: number;
  questions: MCQItem[];
};

const assessment = (levelId: string, title: string, description: string, questions: MCQItem[]): LevelAssessment => ({
  levelId,
  title,
  description,
  passMark: 60,
  questions,
});

export const levelAssessments: Record<string, LevelAssessment> = {
  a1: assessment("a1", "A1 Beginner Check", "Show that you can use simple everyday English.", [
    { question: "Choose the correct greeting: ___ morning!", options: ["Good", "Well", "Best", "Fine"], correct: 0 },
    { question: "I ___ a student.", options: ["am", "is", "are", "be"], correct: 0 },
    { question: "What is the opposite of 'big'?", options: ["long", "small", "old", "fast"], correct: 1 },
    { question: "She ___ two brothers.", options: ["have", "has", "is", "are"], correct: 1 },
    { question: "Choose the correct question.", options: ["Where you live?", "Where do you live?", "Where are live?", "Where live you?"], correct: 1 },
    { question: "There ___ a book on the table.", options: ["are", "am", "is", "be"], correct: 2 },
    { question: "I get up ___ seven o'clock.", options: ["in", "on", "at", "to"], correct: 2 },
    { question: "We use a ___ to write.", options: ["pen", "plate", "shoe", "door"], correct: 0 },
  ]),
  a2: assessment("a2", "A2 Elementary Check", "Show that you can describe routines, past events, and familiar situations.", [
    { question: "I ___ to work every day.", options: ["go", "goes", "going", "went"], correct: 0 },
    { question: "We ___ a film last night.", options: ["watch", "watched", "are watching", "watches"], correct: 1 },
    { question: "There isn't ___ milk left.", options: ["some", "many", "any", "few"], correct: 2 },
    { question: "You ___ wear a seat belt in a car.", options: ["should", "would", "could to", "must to"], correct: 0 },
    { question: "This bag is ___ than that one.", options: ["cheap", "cheaper", "cheapest", "more cheap"], correct: 1 },
    { question: "I have lived here ___ 2022.", options: ["for", "since", "during", "from"], correct: 1 },
    { question: "Could you tell me ___ the station is?", options: ["what", "where", "who", "which"], correct: 1 },
    { question: "I am going ___ my friend tomorrow.", options: ["visit", "to visit", "visiting to", "visited"], correct: 1 },
  ]),
  b1: assessment("b1", "B1 Intermediate Check", "Show that you can explain experiences, opinions, and plans with connected language.", [
    { question: "If it rains tomorrow, we ___ at home.", options: ["stay", "will stay", "stayed", "would stayed"], correct: 1 },
    { question: "I have been studying English ___ three years.", options: ["since", "for", "during", "from"], correct: 1 },
    { question: "The report ___ by the team yesterday.", options: ["completed", "was completed", "has completing", "is complete"], correct: 1 },
    { question: "She said that she ___ tired.", options: ["is", "was", "has", "will"], correct: 1 },
    { question: "I enjoy ___ new places.", options: ["explore", "to explore", "exploring", "explored"], correct: 2 },
    { question: "The film was ___ than I expected.", options: ["more interesting", "interestinger", "most interesting", "interesting"], correct: 0 },
    { question: "You look tired. You ___ take a break.", options: ["ought", "should", "must to", "had better to"], correct: 1 },
    { question: "Although it was expensive, we ___ the course.", options: ["took", "take", "have take", "taking"], correct: 0 },
  ]),
  b2: assessment("b2", "B2 Upper-Intermediate Check", "Show that you can handle complex grammar, nuance, and professional discussion.", [
    { question: "By the time we arrived, the meeting ___.", options: ["had started", "has started", "starts", "was start"], correct: 0 },
    { question: "The proposal, ___ was submitted yesterday, needs revision.", options: ["who", "where", "which", "what"], correct: 2 },
    { question: "If I ___ about the delay, I would have called.", options: ["knew", "had known", "know", "would know"], correct: 1 },
    { question: "The manager suggested that we ___ the deadline.", options: ["extend", "extended", "will extend", "extending"], correct: 0 },
    { question: "The results are consistent ___ our earlier findings.", options: ["to", "with", "by", "for"], correct: 1 },
    { question: "The new system is expected ___ costs.", options: ["reducing", "reduce", "to reduce", "reduced"], correct: 2 },
    { question: "He speaks as though he ___ the answer already.", options: ["knows", "knew", "will know", "has know"], correct: 1 },
    { question: "We need a solution that is both practical ___ affordable.", options: ["or", "but", "and", "so"], correct: 2 },
  ]),
  c1: assessment("c1", "C1 Advanced Check", "Show that you can interpret nuance and express precise, sophisticated ideas.", [
    { question: "The findings call ___ question the reliability of the original data.", options: ["on", "into", "at", "for"], correct: 1 },
    { question: "Had the team acted sooner, the problem ___.", options: ["might have been avoided", "will be avoided", "is avoided", "would avoid"], correct: 0 },
    { question: "Her argument is persuasive, ___ one important qualification.", options: ["apart from", "unless", "despite of", "whereas"], correct: 0 },
    { question: "The report offers a ___ analysis of the policy's effects.", options: ["comprehend", "comprehensively", "comprehensive", "comprehension"], correct: 2 },
    { question: "It is imperative that the proposal ___ reviewed independently.", options: ["is", "be", "being", "was"], correct: 1 },
    { question: "The speaker's conclusion was ___ from the evidence presented.", options: ["borne out", "put out", "taken in", "made up"], correct: 0 },
    { question: "The phrase 'a mixed blessing' describes something that is ___.", options: ["entirely positive", "both helpful and problematic", "unexpectedly simple", "not yet decided"], correct: 1 },
    { question: "The policy was introduced with a view ___ improving access.", options: ["for", "to", "at", "on"], correct: 1 },
  ]),
  c2: assessment("c2", "C2 Proficiency Check", "Show highly precise control of meaning, register, and complex expression.", [
    { question: "The criticism was dismissed as ___ and lacking substantive evidence.", options: ["specious", "spacious", "specific", "special"], correct: 0 },
    { question: "No sooner ___ the announcement than the markets reacted.", options: ["had they made", "they had made", "have they made", "they made"], correct: 0 },
    { question: "The report is notable not so much for its conclusions ___ for its methodology.", options: ["than", "as", "but", "and"], correct: 1 },
    { question: "Her explanation was sufficiently ___ to resolve the ambiguity.", options: ["nuance", "nuanced", "nuisance", "nuancing"], correct: 1 },
    { question: "The agreement is predicated ___ both parties meeting their obligations.", options: ["in", "on", "at", "with"], correct: 1 },
    { question: "His remarks were carefully ___ to avoid any unintended implication.", options: ["worded", "wording", "words", "word"], correct: 0 },
    { question: "The distinction is subtle but ___ to the argument.", options: ["material", "materially", "materiel", "materialism"], correct: 0 },
    { question: "The findings should be interpreted with caution, ___ the limited sample size.", options: ["given", "giving", "to give", "gave"], correct: 0 },
  ]),
};

export const getLevelAssessment = (levelId: string) => levelAssessments[levelId.toLowerCase()];
