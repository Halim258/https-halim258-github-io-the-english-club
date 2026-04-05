// Per-course images mapped by course name
import generalEnglish from "@/assets/courses/general-english.jpg";
import intensiveEnglish from "@/assets/courses/intensive-english.jpg";
import beginnersEnglish from "@/assets/courses/beginners-english.jpg";
import intermediateEnglish from "@/assets/courses/intermediate-english.jpg";
import advancedEnglish from "@/assets/courses/advanced-english.jpg";
import speakingConversation from "@/assets/courses/speaking-conversation.jpg";
import listeningSkills from "@/assets/courses/listening-skills.jpg";
import pronunciation from "@/assets/courses/pronunciation.jpg";
import fluency from "@/assets/courses/fluency.jpg";

// Category images used as fallbacks
import coreEnglishImg from "@/assets/courses/core-english.jpg";
import communicationImg from "@/assets/courses/communication.jpg";
import writingImg from "@/assets/courses/writing.jpg";
import readingImg from "@/assets/courses/reading.jpg";
import examPrepImg from "@/assets/courses/exam-prep.jpg";
import professionalImg from "@/assets/courses/professional.jpg";
import specializedImg from "@/assets/courses/specialized.jpg";
import interactiveImg from "@/assets/courses/interactive.jpg";
import grammarImg from "@/assets/courses/grammar.jpg";

export const courseImages: Record<string, string> = {
  // Core English
  "General English (A1–C2)": generalEnglish,
  "Intensive English Course": intensiveEnglish,
  "English for Beginners": beginnersEnglish,
  "Intermediate English": intermediateEnglish,
  "Advanced English": advancedEnglish,
  // Communication
  "Speaking & Conversation Practice": speakingConversation,
  "Listening Skills": listeningSkills,
  "Pronunciation & Accent Training": pronunciation,
  "Fluency Development": fluency,
  // Writing - use category fallback
  "English Writing Basics": writingImg,
  "Academic Writing": writingImg,
  "Creative Writing": writingImg,
  "Business Writing": professionalImg,
  "Email Writing": professionalImg,
  // Reading & Vocabulary
  "Reading Comprehension": readingImg,
  "Vocabulary Building": readingImg,
  "Idioms & Expressions": readingImg,
  "Phrasal Verbs Course": readingImg,
  // Exam Preparation
  "IELTS Preparation": examPrepImg,
  "TOEFL Preparation": examPrepImg,
  "Cambridge Exams (PET, FCE, CAE)": examPrepImg,
  "SAT English": examPrepImg,
  // Professional
  "Business English": professionalImg,
  "English for Interviews": professionalImg,
  "Workplace Communication": professionalImg,
  "Presentation Skills": professionalImg,
  // Specialized
  "English for Travel": specializedImg,
  "English for Kids": beginnersEnglish,
  "English for Teenagers": communicationImg,
  "ESP (Specific Purposes)": specializedImg,
  "Medical English": specializedImg,
  "Engineering English": specializedImg,
  "IT English": specializedImg,
  // Interactive
  "English through Movies & Series": interactiveImg,
  "English through Stories": readingImg,
  "Real-life Conversation Practice": speakingConversation,
  "Slang & Everyday English": communicationImg,
  // Grammar
  "English Grammar (Basic → Advanced)": grammarImg,
  "Tenses Mastery": grammarImg,
  "Sentence Structure": grammarImg,
};

export function getCourseImage(courseName: string, fallback: string): string {
  return courseImages[courseName] || fallback;
}
