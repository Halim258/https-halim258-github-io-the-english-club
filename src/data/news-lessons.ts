import type { LessonData } from "./lessons";

function nl(n: number, title: string, desc: string, vocab: any[], dialogue: any[], grammar: any, ve: any[], ce: any[], ge: any[], eq: any[], hw: any[]): LessonData {
  return { levelId: "news", levelLabel: "English through News", lessonNumber: n, title, description: desc, vocabulary: vocab, dialogue, grammar, vocabExercises: ve, conversationExercises: ce, grammarExercises: ge, examQuestions: eq, homeworkQuestions: hw };
}

const baseLesson = (n: number, title: string, desc: string): LessonData => ({
  levelId: "news", levelLabel: "English through News", lessonNumber: n, title, description: desc,
  vocabulary: [
    { word: "Headline", meaning: "Title of a news article", example: "The headline grabbed attention.", emoji: "📰", arabic: "عنوان رئيسي" },
    { word: "Reporter", meaning: "Person who gathers news", example: "The reporter interviewed the mayor.", emoji: "🎤", arabic: "مراسل" },
    { word: "Source", meaning: "Origin of information", example: "Always check your sources.", emoji: "🔍", arabic: "مصدر" },
    { word: "Breaking", meaning: "Happening right now", example: "Breaking news just came in.", emoji: "🚨", arabic: "عاجل" },
    { word: "Editorial", meaning: "Opinion article by editors", example: "The editorial argued for change.", emoji: "✍️", arabic: "افتتاحية" },
    { word: "Broadcast", meaning: "To transmit by radio/TV", example: "The show is broadcast live.", emoji: "📡", arabic: "بث" },
    { word: "Investigation", meaning: "Detailed examination of facts", example: "The investigation revealed fraud.", emoji: "🔎", arabic: "تحقيق" },
    { word: "Bias", meaning: "Unfair prejudice", example: "Good journalism avoids bias.", emoji: "⚖️", arabic: "تحيز" },
    { word: "Correspondent", meaning: "Reporter from a specific location", example: "Our foreign correspondent reports.", emoji: "🌍", arabic: "مراسل" },
    { word: "Deadline", meaning: "Final time to complete something", example: "The deadline is midnight.", emoji: "⏰", arabic: "موعد نهائي" },
  ],
  dialogue: [
    { speaker: "Editor", text: `Today's topic is ${title.toLowerCase()}.` },
    { speaker: "Reporter", text: "I've been researching this story all week." },
    { speaker: "Editor", text: "Great. What's the main angle?" },
    { speaker: "Reporter", text: "I want to focus on how it affects everyday people." },
    { speaker: "Editor", text: "Perfect. Make sure to check all sources before the deadline." },
  ],
  grammar: { title: "Passive Voice in News", explanation: "News often uses passive voice (be + past participle) to focus on the event rather than who did it.", examples: [
    { sentence: "The building was destroyed by the fire.", note: "Focus on the building" },
    { sentence: "Three people were arrested.", note: "Who arrested them is less important" },
    { sentence: "A new law has been passed.", note: "Present perfect passive" },
    { sentence: "The story is being investigated.", note: "Present continuous passive" },
  ]},
  vocabExercises: [
    { question: "A 'headline' is:", options: ["The last line", "The title of an article", "A photo caption", "The author's name"], correct: 1 },
    { question: "'Breaking news' means:", options: ["Old news", "Happening right now", "Fake news", "Boring news"], correct: 1 },
    { question: "'Bias' in journalism means:", options: ["Accuracy", "Unfair prejudice", "Speed", "Creativity"], correct: 1 },
    { question: "A 'source' is:", options: ["A reporter", "Origin of information", "A headline", "A deadline"], correct: 1 },
    { question: "'Deadline' means:", options: ["Start time", "Final time to complete", "Break time", "Lunch time"], correct: 1 },
  ],
  conversationExercises: [
    { question: "The reporter researched for:", options: ["One day", "One week", "One month", "One year"], correct: 1 },
    { question: "The main angle focuses on:", options: ["Politicians", "Everyday people", "Celebrities", "Animals"], correct: 1 },
    { question: "The editor says to check:", options: ["The weather", "All sources", "Social media", "Email"], correct: 1 },
  ],
  grammarExercises: [
    { question: "'The building ___ destroyed.'", options: ["is", "was", "were", "are"], correct: 1 },
    { question: "'Three people ___ arrested.'", options: ["was", "is", "were", "are"], correct: 2 },
    { question: "'A new law ___ been passed.'", options: ["have", "has", "had", "is"], correct: 1 },
    { question: "'The story ___ being investigated.'", options: ["are", "is", "were", "was"], correct: 1 },
  ],
  examQuestions: [
    { question: "A 'reporter' is someone who:", options: ["Sings", "Gathers news", "Cooks", "Drives"], correct: 1 },
    { question: "'Broadcast' means to:", options: ["Record only", "Transmit by radio/TV", "Write a book", "Take photos"], correct: 1 },
    { question: "'Editorial' is:", options: ["A news photo", "An opinion article", "A headline", "An ad"], correct: 1 },
    { question: "'Correspondent' is a reporter from:", options: ["The office", "A specific location", "Home", "School"], correct: 1 },
    { question: "'Investigation' involves:", options: ["Guessing", "Detailed examination", "Sleeping", "Shopping"], correct: 1 },
  ],
  homeworkQuestions: [
    { question: "'The suspect ___ arrested yesterday.'", options: ["is", "was", "were", "are"], correct: 1 },
    { question: "Good journalism avoids:", options: ["Facts", "Bias", "Sources", "Deadlines"], correct: 1 },
    { question: "'Breaking news' is news that is:", options: ["Old", "Happening now", "Funny", "Fake"], correct: 1 },
  ],
});

export const newsLessons: Record<string, LessonData> = {};

const topics = [
  { n: 1, t: "Reading the News", d: "Understanding news articles and vocabulary." },
  { n: 2, t: "Headlines & Hooks", d: "How headlines grab your attention." },
  { n: 3, t: "Types of News", d: "Hard news, soft news, features, and opinion pieces." },
  { n: 4, t: "Reporting Facts", d: "Distinguishing facts from opinions in news." },
  { n: 5, t: "World News", d: "Vocabulary for international current events." },
  { n: 6, t: "Local News", d: "Community events and local reporting." },
  { n: 7, t: "Weather Reports", d: "Understanding weather forecasts in English." },
  { n: 8, t: "Sports News", d: "Vocabulary for sports reporting." },
  { n: 9, t: "Business News", d: "Financial and economic news vocabulary." },
  { n: 10, t: "Technology News", d: "Reporting on tech innovations and trends." },
  { n: 11, t: "Science News", d: "Discussing scientific discoveries in the news." },
  { n: 12, t: "Health News", d: "Medical and health reporting vocabulary." },
  { n: 13, t: "Environmental News", d: "Climate change and environmental reporting." },
  { n: 14, t: "Political News", d: "Government and political news vocabulary." },
  { n: 15, t: "Social Media News", d: "How social media shapes news consumption." },
  { n: 16, t: "Fake News", d: "Identifying misinformation and fact-checking." },
  { n: 17, t: "Press Conferences", d: "Vocabulary for official announcements." },
  { n: 18, t: "Investigative Journalism", d: "In-depth reporting and exposés." },
  { n: 19, t: "News Debate", d: "Discussing and debating current issues." },
  { n: 20, t: "Becoming a News Reader", d: "Present a news bulletin in English." },
];

topics.forEach(({ n, t, d }) => {
  newsLessons[`news-${n}`] = baseLesson(n, t, d);
});

// Override first lesson with richer content
newsLessons["news-1"] = nl(1, "Reading the News", "Understanding news articles and vocabulary.",
  [
    { word: "Article", meaning: "A piece of writing in a newspaper", example: "I read an interesting article.", emoji: "📄", arabic: "مقالة" },
    { word: "Headline", meaning: "Title of a news story", example: "The headline was shocking.", emoji: "📰", arabic: "عنوان" },
    { word: "Column", meaning: "Regular written piece by same author", example: "She writes a weekly column.", emoji: "📝", arabic: "عمود" },
    { word: "Editor", meaning: "Person who prepares content", example: "The editor approved the story.", emoji: "✂️", arabic: "محرر" },
    { word: "Journalist", meaning: "Person who writes for media", example: "The journalist won an award.", emoji: "🎤", arabic: "صحفي" },
    { word: "Publish", meaning: "To make available to the public", example: "The article was published online.", emoji: "📢", arabic: "ينشر" },
    { word: "Fact", meaning: "Something proven to be true", example: "Check the facts before sharing.", emoji: "✅", arabic: "حقيقة" },
    { word: "Opinion", meaning: "A personal view", example: "Everyone has a different opinion.", emoji: "💭", arabic: "رأي" },
    { word: "Media", meaning: "Communication channels", example: "Social media spreads news fast.", emoji: "📱", arabic: "إعلام" },
    { word: "Summary", meaning: "A brief overview", example: "Write a summary of the article.", emoji: "📋", arabic: "ملخص" },
  ],
  [
    { speaker: "Teacher", text: "Do you read the news in English?" },
    { speaker: "Student", text: "Sometimes, but the vocabulary is difficult." },
    { speaker: "Teacher", text: "Start with headlines — they use simple, strong words." },
    { speaker: "Student", text: "How do I tell facts from opinions?" },
    { speaker: "Teacher", text: "Facts can be verified. Opinions include phrases like 'I think' or 'in my view'." },
  ],
  { title: "Reported Speech (Basics)", explanation: "When reporting what someone said, we often change the tense. Direct: 'I am happy.' Reported: She said she was happy.", examples: [
    { sentence: "He said (that) the news was shocking.", note: "Present → Past" },
    { sentence: "She told me she had read the article.", note: "Past → Past Perfect" },
    { sentence: "They announced (that) the election was over.", note: "Formal reporting" },
    { sentence: "The reporter said it would rain tomorrow.", note: "Will → Would" },
  ]},
  [
    { question: "An 'article' is:", options: ["A book", "A piece of writing in media", "A painting", "A song"], correct: 1 },
    { question: "A 'journalist' is:", options: ["A teacher", "A person who writes for media", "A doctor", "A chef"], correct: 1 },
    { question: "'Publish' means:", options: ["To hide", "To make available to public", "To delete", "To steal"], correct: 1 },
    { question: "A 'fact' is:", options: ["An opinion", "Something proven true", "A guess", "A lie"], correct: 1 },
    { question: "A 'summary' is:", options: ["The full text", "A brief overview", "A photograph", "A headline"], correct: 1 },
  ],
  [
    { question: "The teacher suggests starting with:", options: ["Long articles", "Headlines", "Books", "Podcasts"], correct: 1 },
    { question: "Facts can be:", options: ["Imagined", "Verified", "Ignored", "Created"], correct: 1 },
    { question: "Opinions include phrases like:", options: ["It is proven", "I think", "Studies show", "Data confirms"], correct: 1 },
  ],
  [
    { question: "'He said the news ___ shocking.'", options: ["is", "was", "are", "were"], correct: 1 },
    { question: "'She told me she ___ read the article.'", options: ["has", "have", "had", "having"], correct: 2 },
    { question: "'They announced the election ___ over.'", options: ["is", "was", "are", "were"], correct: 1 },
    { question: "'He said it ___ rain.'", options: ["will", "would", "can", "may"], correct: 1 },
  ],
  [
    { question: "An 'editor' is someone who:", options: ["Writes songs", "Prepares content", "Sings", "Dances"], correct: 1 },
    { question: "'Media' refers to:", options: ["Food", "Communication channels", "Sports", "Music"], correct: 1 },
    { question: "A 'column' is written by:", options: ["Anyone", "The same author regularly", "A robot", "A student"], correct: 1 },
    { question: "'Opinion' is:", options: ["Always true", "A personal view", "A scientific fact", "A law"], correct: 1 },
    { question: "A 'headline' should be:", options: ["Very long", "Short and attention-grabbing", "In another language", "Hidden"], correct: 1 },
  ],
  [
    { question: "'The reporter ___ that the event was canceled.'", options: ["say", "says", "said", "saying"], correct: 2 },
    { question: "To 'publish' an article means to:", options: ["Delete it", "Make it public", "Hide it", "Forget it"], correct: 1 },
    { question: "'Social ___ spreads news fast.'", options: ["Life", "Media", "Work", "School"], correct: 1 },
  ],
);
