import { BookOpen, MessageCircle, PenLine, BookMarked, Target, Briefcase, Globe2, Headphones, Brain, Music, Newspaper, Scale, Hotel, MessageSquare, Smartphone, HeartPulse, DollarSign, Plane, Video, Code2, Cog, ShieldCheck, School, Palette, Music2, Languages, Baby } from "lucide-react";
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
  modules?: {
    week: string;
    title: string;
    goal: string;
    activities: string[];
  }[];
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
    icon: School,
    emoji: "🏫",
    title: "Egyptian Schools English",
    slug: "egyptian-schools",
    color: "from-primary/10 to-emerald-500/5",
    iconBg: "bg-primary/15",
    image: coreEnglishImg,
    description: "Book-based English support for Egyptian Public, National, and International school students.",
    courses: [
      { name: "Public School English", description: "Ministry-curriculum support with Arabic-friendly explanations, workbook practice, and exam revision.", topics: ["Egyptian Schools", "Public School", "Ministry", "Revision"] },
      { name: "National School English", description: "Reading, writing, grammar, and school exam preparation for national school learners.", topics: ["National School", "Grammar", "Writing", "Term Exams"] },
      { name: "International School English", description: "Literature, academic writing, presentations, and critical thinking for international school students.", topics: ["International School", "British", "American", "IB", "Literature"] },
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
    icon: ShieldCheck,
    emoji: "🛡️",
    title: "Safety English",
    slug: "safety",
    color: "from-red-500/10 to-amber-500/5",
    iconBg: "bg-red-500/15",
    image: specializedImg,
    description: "High-quality safety communication for workplaces, sites, engineering teams, and HSE roles. Minimum requirement: B1 English.",
    courses: [
      { name: "Safety English", description: "Learn safety signs, PPE, hazards, risk assessment, incident reports, compliance, audits, and safety leadership in professional English.", topics: ["Minimum B1", "B1", "B2", "C1", "PPE", "Risk Assessment", "Incident Reports"] },
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
  {
    icon: Palette,
    emoji: "🎨",
    title: "Painting Classes",
    slug: "painting",
    color: "from-rose-500/10 to-orange-500/5",
    iconBg: "bg-rose-500/15",
    image: specializedImg,
    description: "Learn to paint from scratch — color theory, sketching, watercolor, acrylics, and portraits. Structured 12-week curriculum.",
    courses: [
      {
        name: "Foundations of Drawing",
        description: "Learn how to see like an artist — lines, shapes, shading, perspective, and observational sketching.",
        topics: ["Lines & Shapes", "Shading", "Perspective", "Still Life"],
        modules: [
          { week: "Week 1", title: "Line & Mark Making", goal: "Control your pencil with confident, expressive lines.", activities: ["Straight & curved line drills", "Hatching & cross-hatching", "Contour drawing of hands"] },
          { week: "Week 2", title: "Shapes & Forms", goal: "Break any object into basic geometric shapes.", activities: ["Cube, sphere, cone studies", "Object breakdown sketches", "Simple still-life setup"] },
          { week: "Week 3", title: "Light & Shadow", goal: "Add depth using value and shading.", activities: ["Value scale exercise", "Single light-source studies", "Shading a sphere and cube"] },
          { week: "Week 4", title: "Perspective & Composition", goal: "Draw realistic depth with 1 and 2-point perspective.", activities: ["Room in 1-point perspective", "Street in 2-point perspective", "Rule of thirds composition"] },
        ],
      },
      {
        name: "Color Theory",
        description: "Master the language of color — the wheel, mixing, harmony, and emotional impact.",
        topics: ["Color Wheel", "Mixing", "Harmony", "Contrast"],
        modules: [
          { week: "Week 1", title: "The Color Wheel", goal: "Understand primary, secondary, and tertiary colors.", activities: ["Paint your own 12-color wheel", "Warm vs cool sorting", "Color vocabulary quiz"] },
          { week: "Week 2", title: "Mixing & Value", goal: "Mix any color with only 3 primaries + white.", activities: ["Tint, tone & shade chart", "Gray-scale from complements", "Skin-tone mixing"] },
          { week: "Week 3", title: "Harmony Schemes", goal: "Choose palettes that feel right together.", activities: ["Complementary study", "Analogous landscape", "Triadic abstract"] },
          { week: "Week 4", title: "Color & Emotion", goal: "Use color to tell a story.", activities: ["Mood-board painting", "Warm vs cool version of same scene", "Color critique session"] },
        ],
      },
      {
        name: "Watercolor Techniques",
        description: "Fresh, transparent, expressive — the classic watercolor toolkit.",
        topics: ["Wet-on-Wet", "Washes", "Landscapes", "Florals"],
        modules: [
          { week: "Week 1", title: "Materials & Washes", goal: "Learn brushes, paper, and flat/graded washes.", activities: ["Brush handling drills", "Flat wash sky", "Graded sunset wash"] },
          { week: "Week 2", title: "Wet-on-Wet & Layering", goal: "Control water for soft blends and glazes.", activities: ["Wet-on-wet clouds", "Layered leaves", "Loose abstract splash"] },
          { week: "Week 3", title: "Landscapes", goal: "Paint a simple watercolor landscape start to finish.", activities: ["Mountain silhouette", "Reflective lake", "Countryside study"] },
          { week: "Week 4", title: "Florals & Botanicals", goal: "Paint expressive flowers with confidence.", activities: ["Single rose study", "Loose wildflower bouquet", "Botanical page composition"] },
        ],
      },
      {
        name: "Acrylic Painting",
        description: "Bold, versatile, forgiving — acrylics from first stroke to finished canvas.",
        topics: ["Brushwork", "Texture", "Abstract", "Figurative"],
        modules: [
          { week: "Week 1", title: "Acrylic Basics", goal: "Understand paint consistency, mediums, and brushes.", activities: ["Color swatch board", "Thick vs thin strokes", "Blending exercise"] },
          { week: "Week 2", title: "Texture & Palette Knife", goal: "Create dimension with impasto and knife work.", activities: ["Knife-only abstract", "Textured tree bark", "Impasto floral"] },
          { week: "Week 3", title: "Abstract Composition", goal: "Compose expressive non-representational art.", activities: ["Geometric abstract", "Gestural expressive piece", "Color-field study"] },
          { week: "Week 4", title: "Figurative Painting", goal: "Paint a simple figure or still-life with acrylics.", activities: ["Silhouette figure", "Cafe scene", "Small canvas still-life"] },
        ],
      },
      {
        name: "Portrait Painting",
        description: "Capture faces with proportion, likeness, and personality.",
        topics: ["Proportions", "Skin Tones", "Expression"],
        modules: [
          { week: "Week 1", title: "Face Proportions", goal: "Draw a balanced face using the loomis method.", activities: ["Head guidelines", "Front & profile study", "Features placement drills"] },
          { week: "Week 2", title: "Features Study", goal: "Master eyes, nose, mouth, ears individually.", activities: ["Eye studies (x6)", "Nose from 3 angles", "Lips & teeth"] },
          { week: "Week 3", title: "Skin Tones & Light", goal: "Mix realistic skin tones and paint form.", activities: ["Skin tone chart", "Value-only portrait", "Full color portrait head"] },
          { week: "Week 4", title: "Full Portrait", goal: "Deliver a finished portrait with likeness and mood.", activities: ["Reference selection", "Under-painting", "Final portrait critique"] },
        ],
      },
      {
        name: "Final Project & Exhibition",
        description: "Bring everything together in a signature piece and present it.",
        topics: ["Personal Style", "Presentation", "Critique"],
        modules: [
          { week: "Week 1", title: "Concept & Sketch", goal: "Choose a subject and plan the composition.", activities: ["Mood board", "3 thumbnail sketches", "Instructor concept review"] },
          { week: "Week 2", title: "Under-painting", goal: "Block in shapes, values, and color foundation.", activities: ["Grisaille layer", "Color block-in", "Mid-project feedback"] },
          { week: "Week 3", title: "Detail & Refinement", goal: "Refine focal points, textures, and highlights.", activities: ["Focal-point pass", "Texture pass", "Highlight & accent pass"] },
          { week: "Week 4", title: "Exhibition Day", goal: "Frame, present, and speak about your work.", activities: ["Framing & signing", "Artist statement", "Live class showcase"] },
        ],
      },
    ],
  },
  {
    icon: Music2,
    emoji: "🎼",
    title: "Music Lessons",
    slug: "music-lessons",
    color: "from-purple-500/10 to-pink-500/5",
    iconBg: "bg-purple-500/15",
    image: musicImg,
    description: "Complete music curriculum — theory, instruments, and singing. Structured path from beginner to performer.",
    courses: [
      {
        name: "Music Theory Basics",
        description: "The universal language of music — notes, rhythm, scales, keys, and reading sheet music.",
        topics: ["Notes", "Rhythm", "Scales", "Sight-Reading"],
        modules: [
          { week: "Week 1", title: "Notes & Staff", goal: "Read notes on the treble and bass clef.", activities: ["Learn the musical alphabet", "Treble clef note flashcards", "Bass clef note flashcards"] },
          { week: "Week 2", title: "Rhythm & Time", goal: "Feel note values and clap accurate rhythm.", activities: ["Whole/half/quarter/eighth notes", "Time-signature clapping", "Rhythm dictation drills"] },
          { week: "Week 3", title: "Scales & Keys", goal: "Build and play major and minor scales.", activities: ["C major scale", "Key signatures (sharps & flats)", "Minor scales & modes intro"] },
          { week: "Week 4", title: "Chords & Intervals", goal: "Understand triads and how chords are built.", activities: ["Major & minor triads", "Chord inversions", "I–IV–V progression"] },
        ],
      },
      {
        name: "Piano / Keyboard",
        description: "From your first note to playing your favourite songs on piano or keyboard.",
        topics: ["Technique", "Chords", "Songs", "Improvisation"],
        modules: [
          { week: "Week 1", title: "Posture & Hand Position", goal: "Sit, breathe, and place hands correctly.", activities: ["Finger numbering", "5-finger C position", "Simple 5-note melodies"] },
          { week: "Week 2", title: "Reading & First Songs", goal: "Play both hands together on a simple song.", activities: ["Ode to Joy", "Twinkle Twinkle", "Basic sight-reading"] },
          { week: "Week 3", title: "Chords & Accompaniment", goal: "Play chord shapes and simple accompaniments.", activities: ["Major/minor chords", "Broken chord patterns", "Left-hand bass with right-hand melody"] },
          { week: "Week 4", title: "Popular Song Project", goal: "Perform one full pop or classical piece.", activities: ["Song of your choice", "Practice routine", "Recording & feedback"] },
        ],
      },
      {
        name: "Guitar",
        description: "Acoustic and electric guitar — chords, strumming, fingerpicking, and full songs.",
        topics: ["Chords", "Strumming", "Fingerpicking", "Songs"],
        modules: [
          { week: "Week 1", title: "Guitar Anatomy & Tuning", goal: "Know your guitar and tune it by ear or app.", activities: ["Parts of the guitar", "Standard tuning", "Basic picking exercises"] },
          { week: "Week 2", title: "Open Chords", goal: "Play the 8 essential open chords cleanly.", activities: ["Em, Am, Dm, C, G, D, A, E", "Chord transitions drill", "1-minute chord change"] },
          { week: "Week 3", title: "Strumming Patterns", goal: "Groove with common strumming rhythms.", activities: ["Down-down-up", "16th-note strums", "Play along to backing tracks"] },
          { week: "Week 4", title: "Fingerpicking & Songs", goal: "Fingerpick a full song from start to finish.", activities: ["Travis picking pattern", "Simple arpeggios", "Perform 1 full song"] },
        ],
      },
      {
        name: "Singing & Vocal Training",
        description: "Breath, pitch, tone, and confidence — sing songs you love with control.",
        topics: ["Breathing", "Pitch", "Range", "Performance"],
        modules: [
          { week: "Week 1", title: "Breath & Posture", goal: "Support the voice with diaphragmatic breath.", activities: ["Breathing exercises", "Posture check", "Sirens & lip trills"] },
          { week: "Week 2", title: "Pitch & Range", goal: "Sing in tune across your natural range.", activities: ["Pitch matching", "Scale warm-ups", "Range test & mapping"] },
          { week: "Week 3", title: "Tone & Diction", goal: "Shape vowels and consonants for a clear tone.", activities: ["Vowel modification", "Diction drills", "Style listening (pop / classical)"] },
          { week: "Week 4", title: "Song Performance", goal: "Perform one song with expression and confidence.", activities: ["Song selection", "Interpretation coaching", "Live class performance"] },
        ],
      },
      {
        name: "Ear Training & Rhythm",
        description: "Train your inner musician — recognize intervals, chords, and lock in timing.",
        topics: ["Intervals", "Melody", "Timing"],
        modules: [
          { week: "Week 1", title: "Interval Recognition", goal: "Identify basic intervals by ear.", activities: ["Ascending intervals", "Descending intervals", "Interval song mnemonics"] },
          { week: "Week 2", title: "Chord Quality", goal: "Hear major, minor, diminished, augmented.", activities: ["Chord quality drills", "Blind chord ID", "Chord in context"] },
          { week: "Week 3", title: "Melody & Dictation", goal: "Write down short melodies you hear.", activities: ["2-bar dictations", "Solfege singing", "Melody replay games"] },
          { week: "Week 4", title: "Rhythm & Groove", goal: "Play/clap tight rhythms with a metronome.", activities: ["Metronome drills", "Polyrhythms intro", "Play-along groove challenge"] },
        ],
      },
      {
        name: "Songwriting & Performance",
        description: "Write your own songs and perform them live in end-of-term recitals.",
        topics: ["Composition", "Lyrics", "Recital"],
        modules: [
          { week: "Week 1", title: "Song Structure", goal: "Understand verse–chorus–bridge form.", activities: ["Analyze 3 hit songs", "Section labeling", "Draft song outline"] },
          { week: "Week 2", title: "Chord Progressions & Melody", goal: "Write a memorable chord progression and top-line.", activities: ["I–V–vi–IV progression", "Melody over chords", "Hook writing"] },
          { week: "Week 3", title: "Lyrics & Storytelling", goal: "Write lyrics with rhyme, imagery, and emotion.", activities: ["Rhyme schemes", "Story arc worksheet", "Lyric draft"] },
          { week: "Week 4", title: "Recital Performance", goal: "Perform your original song live.", activities: ["Rehearsal", "Stage tips", "End-of-term recital"] },
        ],
      },
    ],
  },
  {
    icon: Languages,
    emoji: "🇪🇸",
    title: "Español A1–C2 (Estilo Cervantes)",
    slug: "spanish",
    color: "from-yellow-500/10 to-red-500/5",
    iconBg: "bg-yellow-500/15",
    image: coreEnglishImg,
    description:
      "Curso completo de español desde A1 hasta C2 con el mismo enfoque que el curso de inglés — vocabulario, diálogo, gramática, ejercicios y exámenes tipo DELE, siguiendo el estilo del Instituto Cervantes.",
    courses: [
      {
        name: "Español A1 — Acceso",
        description: "Nivel inicial: saludos, presentaciones, familia, rutinas y necesidades básicas.",
        topics: ["Saludos", "Ser / Tener", "Familia", "Números", "Presente"],
      },
      {
        name: "Español A2 — Plataforma",
        description: "Hablar del pasado, planes futuros con 'ir a', viajes, servicios y biografías.",
        topics: ["Pretérito perfecto", "Pretérito indefinido", "Futuro próximo", "Viajes"],
      },
      {
        name: "Español B1 — Umbral",
        description: "Opiniones, hipótesis, subjuntivo introductorio, discurso indirecto y marcadores.",
        topics: ["Imperfecto vs. indefinido", "Condicional", "Subjuntivo presente", "Estilo indirecto"],
      },
      {
        name: "Español B2 — Avanzado",
        description: "Argumentación, subjuntivo imperfecto, condicionales, léxico académico y cultura hispana.",
        topics: ["Subjuntivo imperfecto", "Condicionales", "Voz pasiva", "Debate"],
      },
      {
        name: "Español C1 — Dominio operativo",
        description: "Matices, expresiones idiomáticas, registros, ensayo argumentativo, literatura y arte.",
        topics: ["Pluscuamperfecto de subjuntivo", "Idioms", "Ensayo", "Registros"],
      },
      {
        name: "Español C2 — Maestría",
        description: "Registros especializados, variedades del español, pragmática y tareas integradas tipo DELE C2.",
        topics: ["Registro jurídico", "Registro científico", "Variedades", "Oratoria"],
      },
    ],
  },
  {
    icon: Baby,
    emoji: "🧒",
    title: "Kids Language Therapy",
    slug: "kids-language-therapy",
    color: "from-emerald-500/10 to-sky-500/5",
    iconBg: "bg-emerald-500/15",
    image: specializedImg,
    description: "Specialized speech and language therapy for children — articulation, vocabulary, sentence-building, and confident communication.",
    courses: [
      {
        name: "Speech Sounds & Articulation",
        description: "Individual sound practice, minimal pairs, and clear pronunciation through playful drills.",
        topics: ["Sounds", "Minimal Pairs", "Articulation"],
        modules: [
          { week: "Week 1", title: "Front Sounds (p, b, m, t, d)", goal: "Produce clear front-of-mouth sounds.", activities: ["Mirror practice", "Bubble blowing for /p/", "Animal sound game"] },
          { week: "Week 2", title: "Back Sounds (k, g, ng)", goal: "Move sounds to the back of the mouth.", activities: ["Cough game for /k/", "Picture cards", "Silly sentence practice"] },
          { week: "Week 3", title: "Tricky Sounds (s, r, l, th)", goal: "Correct commonly misarticulated sounds.", activities: ["Snake /s/ game", "Roar for /r/", "Mirror + tongue placement"] },
          { week: "Week 4", title: "Minimal Pairs & Words", goal: "Distinguish similar sounds in real words.", activities: ["Pat vs bat cards", "Rhyme sorting", "Storytime with target sounds"] },
        ],
      },
      {
        name: "Vocabulary Building for Kids",
        description: "Themed word banks — family, animals, food, school — through games and stories.",
        topics: ["Themes", "Games", "Stories"],
        modules: [
          { week: "Week 1", title: "Family & Home", goal: "Name family members and household items.", activities: ["Family photo talk", "Room labeling game", "Doll-house play"] },
          { week: "Week 2", title: "Animals & Nature", goal: "Learn 30+ animal & nature words.", activities: ["Animal flashcards", "Zoo pretend play", "Sound-animal matching"] },
          { week: "Week 3", title: "Food & Colors", goal: "Describe food using color and taste words.", activities: ["Play kitchen", "Fruit sorting", "Color hunt"] },
          { week: "Week 4", title: "School & Actions", goal: "Learn action verbs and school vocab.", activities: ["Simon Says", "Backpack unpack game", "Verb charades"] },
        ],
      },
      {
        name: "Sentence Structure & Grammar",
        description: "Building simple to complex sentences, questions, and correct word order.",
        topics: ["Sentences", "Questions", "Word Order"],
        modules: [
          { week: "Week 1", title: "2–3 Word Sentences", goal: "Combine words into simple phrases.", activities: ["Picture + verb", "Big red ball", "Cloze prompts"] },
          { week: "Week 2", title: "Full Simple Sentences", goal: "Say complete subject–verb–object sentences.", activities: ["Who-does-what cards", "Story pictures", "Sentence race"] },
          { week: "Week 3", title: "Questions & Answers", goal: "Ask and answer wh-questions.", activities: ["Who/What/Where quizzes", "Question dice", "Interview game"] },
          { week: "Week 4", title: "Longer Sentences", goal: "Use 'and', 'because', 'but' to extend.", activities: ["Connector cards", "Why? game", "Story retelling"] },
        ],
      },
      {
        name: "Listening & Following Instructions",
        description: "Auditory processing games, multi-step instructions, and comprehension activities.",
        topics: ["Listening", "Instructions", "Comprehension"],
        modules: [
          { week: "Week 1", title: "One-Step Instructions", goal: "Follow single clear instructions.", activities: ["Clap once", "Touch your nose", "Simon Says (easy)"] },
          { week: "Week 2", title: "Two-Step Instructions", goal: "Hold two ideas at once.", activities: ["Stand up and clap", "Get the red block and give it to me", "Obstacle course"] },
          { week: "Week 3", title: "Story Listening", goal: "Answer questions about a short story.", activities: ["Short read-aloud", "Picture recall", "Who did what?"] },
          { week: "Week 4", title: "Multi-Step Play", goal: "Follow 3–4 step tasks in a game.", activities: ["Craft instructions", "Recipe roleplay", "Treasure hunt"] },
        ],
      },
      {
        name: "Social Communication Skills",
        description: "Turn-taking, greetings, expressing feelings, and interacting with peers.",
        topics: ["Turn-Taking", "Feelings", "Peer Interaction"],
        modules: [
          { week: "Week 1", title: "Greetings & Politeness", goal: "Say hello, please, thank you naturally.", activities: ["Greeting role-plays", "Please/thank you songs", "Puppet play"] },
          { week: "Week 2", title: "Turn-Taking", goal: "Wait and take turns in conversation and play.", activities: ["Board games", "Talking stick", "My turn / your turn"] },
          { week: "Week 3", title: "Feelings & Emotions", goal: "Name and show feelings.", activities: ["Feelings flashcards", "Mirror faces", "Story: how did they feel?"] },
          { week: "Week 4", title: "Peer Play", goal: "Join and sustain play with others.", activities: ["Small group play", "Sharing games", "Cooperation task"] },
        ],
      },
      {
        name: "Fluency & Confidence",
        description: "Reducing stuttering, building rhythm, and boosting confidence when speaking in front of others.",
        topics: ["Fluency", "Rhythm", "Confidence"],
        modules: [
          { week: "Week 1", title: "Slow, Easy Speech", goal: "Speak slowly and smoothly.", activities: ["Slow speech modeling", "Stretched sounds", "Turtle talk game"] },
          { week: "Week 2", title: "Breath & Rhythm", goal: "Use breath to support smooth speech.", activities: ["Belly breathing", "Sentence pacing", "Chant games"] },
          { week: "Week 3", title: "Talking Confidently", goal: "Speak in front of small groups.", activities: ["Show and tell", "Puppet presentations", "1-min story"] },
          { week: "Week 4", title: "Real Situations", goal: "Order, ask, and greet in the real world.", activities: ["Cafe role-play", "Asking a question", "Family showcase"] },
        ],
      },
    ],
  },
];
