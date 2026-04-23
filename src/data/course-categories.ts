import { BookOpen, MessageCircle, PenLine, BookMarked, Target, Briefcase, Globe2, Headphones, Brain, Music, Newspaper, Scale, Hotel, MessageSquare, Smartphone, HeartPulse, DollarSign, Plane, Video, Code2, Cog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import coreEnglishImg from "@/assets/courses/core-english.jpg";
import communicationImg from "@/assets/courses/communication.jpg";
import writingImg from "@/assets/courses/writing.jpg";
import readingImg from "@/assets/courses/reading.jpg";
import examPrepImg from "@/assets/courses/exam-prep.jpg";
import professionalImg from "@/assets/courses/professional.jpg";
import specializedImg from "@/assets/courses/specialized.jpg";
import interactiveImg from "@/assets/courses/interactive.jpg";
import grammarImg from "@/assets/courses/grammar.jpg";
import musicImg from "@/assets/courses/music.jpg";
import newsImg from "@/assets/courses/news.jpg";
import legalImg from "@/assets/courses/legal.jpg";
import hospitalityImg from "@/assets/courses/hospitality.jpg";
import conversationImg from "@/assets/courses/conversation.jpg";
import socialMediaImg from "@/assets/courses/social-media.jpg";
import healthcareImg from "@/assets/courses/healthcare.jpg";
import financeImg from "@/assets/courses/finance.jpg";
import aviationImg from "@/assets/courses/aviation.jpg";
import documentaryImg from "@/assets/courses/documentary.jpg";

export interface Course {
  name: string;
  description: string;
  topics?: string[];
}

export interface Category {
  icon: LucideIcon;
  emoji: string;
  title: string;
  slug: string;
  color: string;
  iconBg: string;
  description: string;
  image: string;
  courses: Course[];
}

export const categories: Category[] = [
  {
    icon: BookOpen,
    emoji: "📘",
    title: "Core English Courses",
    slug: "core-english",
    color: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/15",
    image: coreEnglishImg,
    description: "Build a strong English foundation from beginner to advanced with our structured general courses.",
    courses: [
      { name: "General English (A1–C2)", description: "Complete English course covering all proficiency levels with progressive skill-building.", topics: ["Grammar", "Vocabulary", "Speaking", "Writing"] },
      { name: "Intensive English Course", description: "Accelerated learning for students who want to progress quickly through focused daily sessions.", topics: ["Immersive", "Daily Practice", "Rapid Progress"] },
      { name: "English for Beginners", description: "Start your English journey with fundamentals — the alphabet, basic phrases, and simple conversations.", topics: ["Alphabet", "Basic Phrases", "Introductions"] },
      { name: "Intermediate English", description: "Strengthen your skills with complex grammar, expanded vocabulary, and fluent conversation practice.", topics: ["Complex Grammar", "Discussion", "Reading"] },
      { name: "Advanced English", description: "Master nuanced language use, academic expression, and sophisticated communication.", topics: ["Academic English", "Nuance", "Critical Thinking"] },
    ],
  },
  {
    icon: MessageCircle,
    emoji: "🗣️",
    title: "Communication Skills",
    slug: "communication",
    color: "from-blue-500/10 to-blue-500/5",
    iconBg: "bg-blue-500/15",
    image: communicationImg,
    description: "Improve your ability to speak, listen, and communicate confidently in real-world situations.",
    courses: [
      { name: "Speaking & Conversation Practice", description: "Build confidence through guided conversation sessions on everyday and academic topics.", topics: ["Role Play", "Debates", "Discussions"] },
      { name: "Listening Skills", description: "Train your ear with authentic audio materials — podcasts, lectures, and native speech.", topics: ["Comprehension", "Note-taking", "Accents"] },
      { name: "Pronunciation & Accent Training", description: "Perfect your pronunciation with phonetics drills, minimal pairs, and intonation practice.", topics: ["Phonetics", "Intonation", "Stress Patterns"] },
      { name: "Fluency Development", description: "Break through fluency barriers with timed speaking, spontaneous responses, and storytelling.", topics: ["Speed", "Natural Speech", "Fillers"] },
    ],
  },
  {
    icon: PenLine,
    emoji: "✍️",
    title: "Writing Skills",
    slug: "writing",
    color: "from-violet-500/10 to-violet-500/5",
    iconBg: "bg-violet-500/15",
    image: writingImg,
    description: "Develop clear, structured, and effective writing across academic, creative, and professional contexts.",
    courses: [
      { name: "English Writing Basics", description: "Learn sentence structure, paragraphs, and basic essay formats.", topics: ["Sentences", "Paragraphs", "Punctuation"] },
      { name: "Academic Writing", description: "Master essays, research papers, and formal writing with proper citations and structure.", topics: ["Essays", "Research", "Citations"] },
      { name: "Creative Writing", description: "Explore storytelling, poetry, and creative expression in English.", topics: ["Fiction", "Poetry", "Narrative"] },
      { name: "Business Writing", description: "Write professional reports, proposals, and business documents with clarity.", topics: ["Reports", "Proposals", "Memos"] },
      { name: "Email Writing", description: "Craft effective professional and personal emails with proper tone and format.", topics: ["Formal Emails", "Follow-ups", "Etiquette"] },
    ],
  },
  {
    icon: BookMarked,
    emoji: "📖",
    title: "Reading & Vocabulary",
    slug: "reading-vocabulary",
    color: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "bg-emerald-500/15",
    image: readingImg,
    description: "Expand your vocabulary and reading comprehension through engaging texts and systematic word-building.",
    courses: [
      { name: "Reading Comprehension", description: "Improve understanding of texts through inference, summarization, and critical analysis.", topics: ["Inference", "Summarization", "Analysis"] },
      { name: "Vocabulary Building", description: "Systematically expand your word bank with contextual learning and spaced repetition.", topics: ["Word Families", "Context Clues", "Repetition"] },
      { name: "Idioms & Expressions", description: "Learn common English idioms, proverbs, and figurative language used in daily speech.", topics: ["Idioms", "Proverbs", "Slang"] },
      { name: "Phrasal Verbs Course", description: "Master the most common and tricky phrasal verbs with examples and practice.", topics: ["Common Phrasal Verbs", "Context", "Quizzes"] },
    ],
  },
  {
    icon: Target,
    emoji: "🎯",
    title: "Exam Preparation",
    slug: "exam-prep",
    color: "from-orange-500/10 to-orange-500/5",
    iconBg: "bg-orange-500/15",
    image: examPrepImg,
    description: "Prepare for IELTS, TOEFL, Cambridge & SAT — structured by exam skill: Reading, Listening, Writing & Speaking.",
    courses: [
      { name: "📖 Reading Skills", description: "Master skimming, scanning, inference, and timed reading passages for all major exams.", topics: ["IELTS Reading", "TOEFL Reading", "Cambridge Reading", "SAT Reading"] },
      { name: "🎧 Listening Skills", description: "Train for all listening sections — note-taking, gap-fill, multiple choice, and map labelling.", topics: ["IELTS Listening", "TOEFL Listening", "Cambridge Listening"] },
      { name: "✍️ Writing Skills", description: "Practice Task 1 & Task 2 essays, integrated writing, and timed essay strategies.", topics: ["IELTS Writing", "TOEFL Writing", "Cambridge Writing", "SAT Essay"] },
      { name: "🗣️ Speaking Skills", description: "Prepare for speaking interviews, cue cards, discussions, and pronunciation scoring.", topics: ["IELTS Speaking", "TOEFL Speaking", "Cambridge Speaking"] },
      { name: "📋 Exam Overview & Strategies", description: "Understand exam formats, scoring systems, time management, and test-day tips.", topics: ["IELTS Format", "TOEFL iBT", "Cambridge FCE/CAE", "SAT Structure"] },
    ],
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "Professional English",
    slug: "professional",
    color: "from-slate-500/10 to-slate-500/5",
    iconBg: "bg-slate-500/15",
    image: professionalImg,
    description: "Communicate effectively in the workplace with specialized professional English courses.",
    courses: [
      { name: "Business English", description: "Learn business vocabulary, meeting language, and professional communication skills.", topics: ["Meetings", "Negotiations", "Vocabulary"] },
      { name: "English for Interviews", description: "Prepare for job interviews with practice questions, answers, and confidence-building.", topics: ["Common Questions", "STAR Method", "Body Language"] },
      { name: "Workplace Communication", description: "Navigate office communication — emails, presentations, and team collaboration.", topics: ["Team Communication", "Reports", "Feedback"] },
      { name: "Presentation Skills", description: "Deliver impactful presentations with clear structure, visuals, and audience engagement.", topics: ["Structure", "Delivery", "Visual Aids"] },
    ],
  },
  {
    icon: Globe2,
    emoji: "🌍",
    title: "Specialized English",
    slug: "specialized",
    color: "from-teal-500/10 to-teal-500/5",
    iconBg: "bg-teal-500/15",
    image: specializedImg,
    description: "Tailored English courses for specific industries, age groups, and purposes.",
    courses: [
      { name: "English for Travel", description: "Essential English for traveling — airports, hotels, restaurants, and navigation.", topics: ["Travel Phrases", "Directions", "Emergencies"] },
      { name: "English for Kids", description: "Fun, interactive lessons designed for young learners with games and activities.", topics: ["Games", "Songs", "Stories"] },
      { name: "English for Teenagers", description: "Engaging content for teens covering school, social life, and pop culture topics.", topics: ["Social Media", "School Life", "Pop Culture"] },
      { name: "ESP (Specific Purposes)", description: "Customized English training for specific professional or academic fields.", topics: ["Custom Content", "Field-Specific"] },
      { name: "Medical English", description: "Medical terminology, patient communication, and healthcare English.", topics: ["Terminology", "Patient Care", "Reports"] },
      { name: "Engineering English", description: "Professional English for engineers covering site work, safety, materials, specifications, reports, and technical decisions from B1 to C1. Minimum requirement: B1 English.", topics: ["Minimum B1", "B1–C1", "Safety", "Materials", "Specifications", "Reports"] },
      { name: "IT English", description: "English for the tech industry — documentation, meetings, and technical discussions.", topics: ["Documentation", "Agile Terms", "Tech Vocab"] },
      { name: "Web Development English", description: "Frontend, backend, bugs, features, deployment, and stakeholder communication for learners at B1+.", topics: ["Minimum B1", "B1–C1", "Bugs", "Deployment", "Architecture"] },
    ],
  },
  {
    icon: Headphones,
    emoji: "🎧",
    title: "Interactive / Modern",
    slug: "interactive",
    color: "from-pink-500/10 to-pink-500/5",
    iconBg: "bg-pink-500/15",
    image: interactiveImg,
    description: "Learn English through entertainment and real-world immersion with modern, engaging methods.",
    courses: [
      { name: "English through Movies & Series", description: "Learn natural English by analyzing scenes, dialogues, and expressions from popular media.", topics: ["Film Analysis", "Dialogue", "Slang"] },
      { name: "English through Stories", description: "Improve reading and listening through graded stories and narrative-based learning.", topics: ["Short Stories", "Audiobooks", "Discussion"] },
      { name: "Real-life Conversation Practice", description: "Practice real-world scenarios — shopping, doctor visits, social events, and more.", topics: ["Role Play", "Scenarios", "Daily Life"] },
      { name: "Slang & Everyday English", description: "Understand and use informal English, slang, and colloquial expressions like a native.", topics: ["Slang", "Colloquialisms", "Informal Speech"] },
      { name: "English through Documentary", description: "Watch real documentaries, learn vocabulary word-by-word, and test your understanding.", topics: ["Nature", "Science", "History", "Technology"] },
    ],
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "English through Music",
    slug: "music",
    color: "from-fuchsia-500/10 to-fuchsia-500/5",
    iconBg: "bg-fuchsia-500/15",
    image: musicImg,
    description: "Learn English vocabulary, pronunciation, and grammar through songs, lyrics, and musical culture.",
    courses: [
      { name: "English through Music", description: "Learn English through song lyrics, music genres, and musical culture.", topics: ["Lyrics", "Pronunciation", "Genres", "Culture"] },
    ],
  },
  {
    icon: Newspaper,
    emoji: "📰",
    title: "English through News",
    slug: "news",
    color: "from-sky-500/10 to-sky-500/5",
    iconBg: "bg-sky-500/15",
    image: newsImg,
    description: "Improve reading comprehension and vocabulary by learning through real-world news and current events.",
    courses: [
      { name: "English through News", description: "Read and discuss news articles to build vocabulary and critical thinking.", topics: ["Headlines", "Current Events", "Media Literacy"] },
    ],
  },
  {
    icon: Scale,
    emoji: "⚖️",
    title: "Legal English",
    slug: "legal",
    color: "from-stone-500/10 to-stone-500/5",
    iconBg: "bg-stone-500/15",
    image: legalImg,
    description: "Master legal terminology, contracts, court language, and formal writing for law professionals.",
    courses: [
      { name: "Legal English", description: "Legal vocabulary, contracts, court procedures, and formal legal writing.", topics: ["Contracts", "Court Language", "Legal Writing"] },
    ],
  },
  {
    icon: Hotel,
    emoji: "🏨",
    title: "Hospitality English",
    slug: "hospitality",
    color: "from-amber-600/10 to-amber-600/5",
    iconBg: "bg-amber-600/15",
    image: hospitalityImg,
    description: "English for hotels, restaurants, tourism, and the service industry.",
    courses: [
      { name: "Hospitality English", description: "Hotel check-in, restaurant service, guest relations, and tourism vocabulary.", topics: ["Hotels", "Restaurants", "Tourism", "Guest Service"] },
    ],
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Grammar & Structure",
    slug: "grammar",
    color: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-amber-500/15",
    image: grammarImg,
    description: "Master English grammar rules, tenses, and sentence patterns from basic to advanced levels.",
    courses: [
      { name: "English Grammar (Basic → Advanced)", description: "Complete grammar course covering all rules, exceptions, and usage patterns.", topics: ["Parts of Speech", "Clauses", "Advanced Rules"] },
      { name: "Tenses Mastery", description: "Understand and use all 12 English tenses correctly with drills and real-world examples.", topics: ["Present", "Past", "Future", "Perfect"] },
      { name: "Sentence Structure", description: "Build well-formed sentences — simple, compound, complex, and compound-complex.", topics: ["Simple", "Compound", "Complex"] },
    ],
  },
  {
    icon: MessageSquare,
    emoji: "💬",
    title: "Conversation Practice",
    slug: "conversation-practice",
    color: "from-cyan-500/10 to-cyan-500/5",
    iconBg: "bg-cyan-500/15",
    image: conversationImg,
    description: "Practice real conversations for everyday situations — coffee shops, doctors, interviews, and more.",
    courses: [
      { name: "Conversation Practice", description: "10 real-life conversation scenarios with vocabulary, grammar, and exercises.", topics: ["Small Talk", "Shopping", "Hotels", "Interviews", "Opinions"] },
    ],
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "English for Social Media",
    slug: "social-media",
    color: "from-rose-500/10 to-rose-500/5",
    iconBg: "bg-rose-500/15",
    image: socialMediaImg,
    description: "Master social media English — captions, hashtags, analytics, brand voice, and online etiquette.",
    courses: [
      { name: "English for Social Media", description: "Learn the language of social media marketing and content creation.", topics: ["Captions", "Analytics", "Brand Voice", "Etiquette"] },
    ],
  },
  {
    icon: HeartPulse,
    emoji: "🏥",
    title: "English for Healthcare",
    slug: "healthcare",
    color: "from-red-500/10 to-red-500/5",
    iconBg: "bg-red-500/15",
    image: healthcareImg,
    description: "Medical English for nurses, pharmacists, and healthcare workers — patient care, procedures, and mental health.",
    courses: [
      { name: "English for Healthcare", description: "Hospital vocabulary, patient intake, procedures, medication, and mental health.", topics: ["Hospital", "Medication", "Procedures", "Mental Health"] },
    ],
  },
  {
    icon: DollarSign,
    emoji: "💰",
    title: "English for Finance",
    slug: "finance",
    color: "from-yellow-600/10 to-yellow-600/5",
    iconBg: "bg-yellow-600/15",
    image: financeImg,
    description: "Financial English for banking, investments, reports, taxes, and international trade.",
    courses: [
      { name: "English for Finance", description: "Banking, investments, financial reports, personal finance, and global trade.", topics: ["Banking", "Investments", "Reports", "Trade"] },
    ],
  },
  {
    icon: Plane,
    emoji: "✈️",
    title: "English for Aviation",
    slug: "aviation",
    color: "from-sky-600/10 to-sky-600/5",
    iconBg: "bg-sky-600/15",
    image: aviationImg,
    description: "Aviation English for pilots, cabin crew, and airport staff — ATC communication, safety, and weather.",
    courses: [
      { name: "English for Aviation", description: "Airport navigation, in-flight communication, ATC phraseology, weather, and safety.", topics: ["Airport", "ATC", "Weather", "Safety"] },
    ],
  },
  {
    icon: Video,
    emoji: "🎥",
    title: "English through Documentary",
    slug: "documentary",
    color: "from-teal-500/10 to-emerald-500/5",
    iconBg: "bg-teal-500/15",
    image: documentaryImg,
    description: "Learn English by watching real documentaries — nature, science, history, and more — with word-by-word transcripts.",
    courses: [
      { name: "English through Documentary", description: "Watch free documentary clips, learn vocabulary word-by-word, and test comprehension.", topics: ["Nature", "Science", "History", "Technology", "Psychology"] },
    ],
  },
  {
    icon: Cog,
    emoji: "⚙️",
    title: "Engineering English",
    slug: "engineering",
    color: "from-slate-500/10 to-cyan-500/5",
    iconBg: "bg-slate-500/15",
    image: specializedImg,
    description: "High-quality English for engineers covering B1, B2, and C1 communication. Minimum requirement: B1 English.",
    courses: [
      { name: "Engineering English", description: "Learn to discuss engineering drawings, safety, materials, installation, inspections, specifications, risks, and technical trade-offs in professional English.", topics: ["Minimum B1", "B1", "B2", "C1", "Safety", "Technical Reports"] },
    ],
  },
  {
    icon: Code2,
    emoji: "💻",
    title: "Web Development English",
    slug: "web-development",
    color: "from-cyan-500/10 to-emerald-500/5",
    iconBg: "bg-cyan-500/15",
    image: specializedImg,
    description: "High-quality English for web developers covering B1, B2, and C1 communication. Minimum requirement: B1 English.",
    courses: [
      { name: "Web Development English", description: "Learn to discuss websites, bugs, features, code reviews, deployment, architecture, and performance in professional English.", topics: ["Minimum B1", "B1", "B2", "C1", "Frontend", "Backend"] },
    ],
  },
];
