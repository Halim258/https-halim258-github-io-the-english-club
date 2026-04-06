import type { LessonData } from "./lessons";

const baseLegal = (n: number, title: string, desc: string): LessonData => ({
  levelId: "legal", levelLabel: "Legal English", lessonNumber: n, title, description: desc,
  vocabulary: [
    { word: "Contract", meaning: "A legal agreement", example: "Sign the contract carefully.", emoji: "📄", arabic: "عقد" },
    { word: "Plaintiff", meaning: "Person who brings a case", example: "The plaintiff filed a lawsuit.", emoji: "👤", arabic: "مدّعي" },
    { word: "Defendant", meaning: "Person accused in court", example: "The defendant pleaded not guilty.", emoji: "🧑‍⚖️", arabic: "متهم" },
    { word: "Verdict", meaning: "Decision of a jury/judge", example: "The verdict was guilty.", emoji: "⚖️", arabic: "حكم" },
    { word: "Evidence", meaning: "Proof presented in court", example: "The evidence was compelling.", emoji: "🔍", arabic: "دليل" },
    { word: "Clause", meaning: "A section of a legal document", example: "Read every clause carefully.", emoji: "📋", arabic: "بند" },
    { word: "Liability", meaning: "Legal responsibility", example: "The company denied liability.", emoji: "⚠️", arabic: "مسؤولية" },
    { word: "Jurisdiction", meaning: "Authority to make legal decisions", example: "This falls under federal jurisdiction.", emoji: "🏛️", arabic: "اختصاص قضائي" },
    { word: "Testimony", meaning: "Statement given under oath", example: "Her testimony was crucial.", emoji: "🗣️", arabic: "شهادة" },
    { word: "Statute", meaning: "A written law", example: "The statute was enacted in 2020.", emoji: "📜", arabic: "قانون" },
  ],
  dialogue: [
    { speaker: "Lawyer", text: `Let's review ${title.toLowerCase()}.` },
    { speaker: "Client", text: "I need to understand my legal rights." },
    { speaker: "Lawyer", text: "Of course. Let me explain the key terms." },
    { speaker: "Client", text: "What's the most important thing to know?" },
    { speaker: "Lawyer", text: "Always read every clause before signing anything." },
  ],
  grammar: { title: "Formal Language in Legal English", explanation: "Legal English uses formal structures: 'shall' for obligations, 'hereby' for declarations, passive voice for objectivity.", examples: [
    { sentence: "The tenant shall pay rent on the first of each month.", note: "'Shall' = obligation" },
    { sentence: "It is hereby agreed that both parties will cooperate.", note: "'Hereby' = by this document" },
    { sentence: "The contract was signed by both parties.", note: "Passive voice for formality" },
    { sentence: "The accused is presumed innocent until proven guilty.", note: "Legal principle" },
  ]},
  vocabExercises: [
    { question: "A 'contract' is:", options: ["A song", "A legal agreement", "A recipe", "A game"], correct: 1 },
    { question: "The 'plaintiff' is:", options: ["The judge", "The person who brings a case", "The lawyer", "The witness"], correct: 1 },
    { question: "'Evidence' is:", options: ["An opinion", "Proof in court", "A law", "A penalty"], correct: 1 },
    { question: "A 'verdict' is:", options: ["A question", "A decision", "A document", "A witness"], correct: 1 },
    { question: "'Liability' means:", options: ["Freedom", "Legal responsibility", "A reward", "A holiday"], correct: 1 },
  ],
  conversationExercises: [
    { question: "The client needs to understand:", options: ["Cooking", "Legal rights", "Sports rules", "Music theory"], correct: 1 },
    { question: "The lawyer advises reading:", options: ["Headlines", "Every clause", "Only the title", "Nothing"], correct: 1 },
    { question: "The conversation is about:", options: ["Food", title, "Travel", "Music"], correct: 1 },
  ],
  grammarExercises: [
    { question: "'The tenant ___ pay rent monthly.'", options: ["will", "shall", "can", "might"], correct: 1 },
    { question: "'It is ___ agreed...'", options: ["here", "hereby", "herein", "therefore"], correct: 1 },
    { question: "'The contract ___ signed.'", options: ["is", "was", "are", "were"], correct: 1 },
    { question: "'The accused is ___ innocent.'", options: ["presumed", "assuming", "guessing", "hoping"], correct: 0 },
  ],
  examQuestions: [
    { question: "'Testimony' is:", options: ["A written law", "A statement under oath", "A contract", "A fine"], correct: 1 },
    { question: "'Jurisdiction' is:", options: ["A type of court", "Authority to make legal decisions", "A lawyer's office", "A prison"], correct: 1 },
    { question: "A 'clause' is:", options: ["A type of lawyer", "A section of a document", "A court room", "A witness"], correct: 1 },
    { question: "'Statute' means:", options: ["A statue", "A written law", "A lawyer", "A contract"], correct: 1 },
    { question: "The 'defendant' is:", options: ["The judge", "The person accused", "The lawyer", "The witness"], correct: 1 },
  ],
  homeworkQuestions: [
    { question: "'The contract ___ reviewed by the lawyer.'", options: ["is", "was", "were", "are"], correct: 1 },
    { question: "'Shall' in legal English means:", options: ["Maybe", "Obligation", "Never", "Sometimes"], correct: 1 },
    { question: "'The verdict ___ announced yesterday.'", options: ["is", "was", "were", "are"], correct: 1 },
  ],
});

export const legalLessons: Record<string, LessonData> = {};

[
  { n: 1, t: "Introduction to Legal English", d: "Basic legal vocabulary and concepts." },
  { n: 2, t: "Contracts & Agreements", d: "Understanding contract language." },
  { n: 3, t: "Court Procedures", d: "How courts work in English-speaking countries." },
  { n: 4, t: "Criminal Law Vocabulary", d: "Terms used in criminal cases." },
  { n: 5, t: "Civil Law Vocabulary", d: "Terms for civil disputes and lawsuits." },
  { n: 6, t: "Intellectual Property", d: "Patents, trademarks, and copyrights." },
  { n: 7, t: "Employment Law", d: "Workplace rights and regulations." },
  { n: 8, t: "Human Rights Language", d: "Vocabulary for human rights discussions." },
  { n: 9, t: "Immigration Law", d: "Terms related to immigration and visas." },
  { n: 10, t: "Legal Correspondence", d: "Writing formal legal letters and emails." },
  { n: 11, t: "Negotiation Language", d: "Phrases for legal negotiations." },
  { n: 12, t: "Legal Ethics", d: "Professional conduct and ethical standards." },
  { n: 13, t: "Corporate Law", d: "Business law terminology and structures." },
  { n: 14, t: "Family Law", d: "Marriage, divorce, and custody vocabulary." },
  { n: 15, t: "Environmental Law", d: "Legal terms for environmental protection." },
  { n: 16, t: "International Law", d: "Treaties, diplomacy, and global governance." },
  { n: 17, t: "Legal Research", d: "How to research legal documents in English." },
  { n: 18, t: "Courtroom Language", d: "Phrases used during trials and hearings." },
  { n: 19, t: "Legal Writing", d: "Drafting legal documents and briefs." },
  { n: 20, t: "Mock Trial", d: "Practice a courtroom scenario in English." },
].forEach(({ n, t, d }) => { legalLessons[`legal-${n}`] = baseLegal(n, t, d); });
