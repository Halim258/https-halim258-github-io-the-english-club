import { LessonData } from "./lessons";

export const speakingListeningExtra: Record<string, LessonData> = {
  "speaking-6": {
    levelId: "speaking", levelLabel: "Speaking & Conversation", lessonNumber: 6,
    title: "Debating & Persuasion",
    description: "Learn to argue a point, persuade others, and structure a debate.",
    vocabulary: [
      { word: "Debate", meaning: "A formal discussion of opposing views", example: "We had a debate about technology.", emoji: "🗣️", arabic: "مناظرة" },
      { word: "Argument", meaning: "A reason given to support an idea", example: "Her argument was very convincing.", emoji: "💬", arabic: "حجة" },
      { word: "Persuade", meaning: "To convince someone", example: "He tried to persuade me to join.", emoji: "🤝", arabic: "يُقنع" },
      { word: "Opinion", meaning: "A personal belief or view", example: "In my opinion, reading is important.", emoji: "💭", arabic: "رأي" },
      { word: "Evidence", meaning: "Facts that support a claim", example: "There is evidence that exercise helps.", emoji: "📊", arabic: "دليل" },
      { word: "Counter-argument", meaning: "An opposing point", example: "A good debater considers counter-arguments.", emoji: "⚖️", arabic: "حجة مضادة" },
      { word: "Convince", meaning: "To make someone believe", example: "The data convinced the audience.", emoji: "✅", arabic: "يُقنع" },
      { word: "Stance", meaning: "A position on an issue", example: "What is your stance on this topic?", emoji: "🧍", arabic: "موقف" },
      { word: "Rebuttal", meaning: "A reply that disproves something", example: "She gave a strong rebuttal.", emoji: "↩️", arabic: "تفنيد" },
      { word: "Compromise", meaning: "An agreement with concessions", example: "They reached a compromise.", emoji: "🤝", arabic: "حل وسط" },
    ],
    dialogue: [
      { speaker: "Alex", text: "I believe online learning is better than traditional classrooms." },
      { speaker: "Sam", text: "I disagree. Face-to-face interaction is essential for learning." },
      { speaker: "Alex", text: "However, online learning offers flexibility and access to global resources." },
      { speaker: "Sam", text: "That's a fair point, but students often lack motivation without a teacher present." },
      { speaker: "Alex", text: "Perhaps a blended approach would be the best compromise." },
    ],
    grammar: {
      title: "Expressing Opinions & Disagreement",
      explanation: "Use phrases like 'In my opinion...', 'I believe that...', 'I disagree because...' to express views respectfully.",
      examples: [
        { sentence: "In my opinion, technology improves education.", note: "'In my opinion' signals a personal view" },
        { sentence: "I strongly disagree with that statement.", note: "'Strongly disagree' shows intensity" },
        { sentence: "While I see your point, I think...", note: "Acknowledges the other side first" },
        { sentence: "On the other hand, we should consider...", note: "Introduces an alternative view" },
      ],
    },
    vocabExercises: [
      { question: "What does 'persuade' mean?", options: ["To force", "To convince", "To argue", "To ignore"], correct: 1 },
      { question: "A 'rebuttal' is:", options: ["An agreement", "A question", "A reply that disproves", "A summary"], correct: 2 },
      { question: "'Evidence' means:", options: ["An opinion", "Facts that support a claim", "A debate", "A story"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you politely disagree?", options: ["You're wrong!", "I see your point, but...", "That's stupid", "Whatever"], correct: 1 },
      { question: "Which phrase introduces a counter-argument?", options: ["I agree", "On the other hand", "That's right", "Good idea"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ my opinion, we need more research.' Fill in:", options: ["At", "In", "On", "For"], correct: 1 },
      { question: "Which is a persuasive phrase?", options: ["Maybe", "I strongly believe", "I don't know", "Perhaps"], correct: 1 },
    ],
    examQuestions: [
      { question: "What is the purpose of a rebuttal?", options: ["To agree", "To summarize", "To disprove an argument", "To ask a question"], correct: 2 },
      { question: "A 'stance' is:", options: ["A type of dance", "A position on an issue", "A greeting", "A question"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Which word means 'an agreement with concessions'?", options: ["Debate", "Compromise", "Evidence", "Argument"], correct: 1 },
    ],
  },
  "speaking-7": {
    levelId: "speaking", levelLabel: "Speaking & Conversation", lessonNumber: 7,
    title: "Public Speaking Basics",
    description: "Build confidence speaking in front of groups with structure and delivery tips.",
    vocabulary: [
      { word: "Audience", meaning: "People listening to a speaker", example: "The audience clapped loudly.", emoji: "👥", arabic: "جمهور" },
      { word: "Confidence", meaning: "Belief in yourself", example: "She spoke with great confidence.", emoji: "💪", arabic: "ثقة" },
      { word: "Gesture", meaning: "A hand or body movement", example: "He used gestures to emphasize his point.", emoji: "🤚", arabic: "إيماءة" },
      { word: "Eye contact", meaning: "Looking at listeners' eyes", example: "Maintain eye contact with your audience.", emoji: "👁️", arabic: "تواصل بصري" },
      { word: "Pace", meaning: "Speed of speaking", example: "Slow your pace for important points.", emoji: "⏱️", arabic: "وتيرة" },
      { word: "Pause", meaning: "A brief stop while speaking", example: "A pause adds dramatic effect.", emoji: "⏸️", arabic: "توقف" },
      { word: "Clarity", meaning: "Being clear and easy to understand", example: "Speak with clarity and purpose.", emoji: "🔍", arabic: "وضوح" },
      { word: "Introduction", meaning: "The opening of a speech", example: "Start with a strong introduction.", emoji: "🎬", arabic: "مقدمة" },
      { word: "Conclusion", meaning: "The ending of a speech", example: "End with a memorable conclusion.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Rehearse", meaning: "To practice before performing", example: "Rehearse your speech three times.", emoji: "🔁", arabic: "يتدرب" },
    ],
    dialogue: [
      { speaker: "Coach", text: "Before your presentation, what's the first thing you should do?" },
      { speaker: "Student", text: "I should rehearse and organize my main points." },
      { speaker: "Coach", text: "Exactly. And remember: eye contact, clear pace, and natural gestures." },
      { speaker: "Student", text: "Should I memorize every word?" },
      { speaker: "Coach", text: "No, memorize key points. Speak naturally—that builds trust with your audience." },
    ],
    grammar: {
      title: "Signposting Language in Speeches",
      explanation: "Use signposting phrases to guide your audience: 'Firstly...', 'Moving on to...', 'In conclusion...'",
      examples: [
        { sentence: "Firstly, I'd like to discuss the benefits.", note: "'Firstly' introduces the first point" },
        { sentence: "Moving on to the second topic...", note: "Transitions between sections" },
        { sentence: "To sum up, the evidence shows...", note: "Signals the conclusion" },
        { sentence: "Let me give you an example.", note: "Introduces supporting evidence" },
      ],
    },
    vocabExercises: [
      { question: "'Rehearse' means:", options: ["To perform live", "To practice beforehand", "To forget", "To write"], correct: 1 },
      { question: "Why is 'eye contact' important?", options: ["It's rude", "Builds connection", "Shows boredom", "None"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How should you start a speech?", options: ["Um... so...", "With a strong introduction", "By apologizing", "Very quickly"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which phrase signals a conclusion?", options: ["Firstly", "For example", "To sum up", "Moving on"], correct: 2 },
      { question: "'___, I'd like to welcome you all.'", options: ["Finally", "Firstly", "However", "Although"], correct: 1 },
    ],
    examQuestions: [
      { question: "What does 'pace' mean in public speaking?", options: ["Volume", "Speed", "Tone", "Gesture"], correct: 1 },
      { question: "A 'gesture' is:", options: ["A vocal technique", "A body movement", "A type of speech", "A pause"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Which is NOT a signposting phrase?", options: ["To sum up", "Moving on", "Firstly", "Nevertheless"], correct: 3 },
    ],
  },
  "speaking-8": {
    levelId: "speaking", levelLabel: "Speaking & Conversation", lessonNumber: 8,
    title: "Storytelling & Narratives",
    description: "Master the art of telling engaging stories in English.",
    vocabulary: [
      { word: "Narrative", meaning: "A spoken or written account of events", example: "She told a compelling narrative.", emoji: "📖", arabic: "سرد" },
      { word: "Plot", meaning: "The main events of a story", example: "The plot had many twists.", emoji: "🎭", arabic: "حبكة" },
      { word: "Character", meaning: "A person in a story", example: "The main character was brave.", emoji: "🧑", arabic: "شخصية" },
      { word: "Setting", meaning: "Where and when a story takes place", example: "The setting was a small village.", emoji: "🏘️", arabic: "مكان وزمان" },
      { word: "Climax", meaning: "The most exciting part", example: "The climax of the movie was thrilling.", emoji: "🔝", arabic: "ذروة" },
      { word: "Twist", meaning: "An unexpected change", example: "The story had a surprising twist.", emoji: "🔄", arabic: "تحول مفاجئ" },
      { word: "Moral", meaning: "The lesson of a story", example: "The moral is 'honesty is the best policy'.", emoji: "💡", arabic: "عبرة" },
      { word: "Vivid", meaning: "Very clear and detailed", example: "She gave a vivid description.", emoji: "🎨", arabic: "حيّ" },
      { word: "Suspense", meaning: "Excitement about what happens next", example: "The suspense kept me reading.", emoji: "😰", arabic: "تشويق" },
      { word: "Anecdote", meaning: "A short amusing true story", example: "He shared a funny anecdote.", emoji: "😄", arabic: "حكاية قصيرة" },
    ],
    dialogue: [
      { speaker: "Friend", text: "Tell me about your trip!" },
      { speaker: "You", text: "So, picture this: I was standing at the top of a mountain, completely lost..." },
      { speaker: "Friend", text: "Oh no! What happened next?" },
      { speaker: "You", text: "Just when I was about to panic, a local shepherd appeared and guided me down." },
      { speaker: "Friend", text: "What a story! That's like something from a movie!" },
    ],
    grammar: {
      title: "Past Tenses for Storytelling",
      explanation: "Use Past Simple for main events, Past Continuous for background, and Past Perfect for earlier events.",
      examples: [
        { sentence: "I was walking home when it started to rain.", note: "Past Continuous + Past Simple" },
        { sentence: "She had already left when I arrived.", note: "Past Perfect for the earlier action" },
        { sentence: "They found the treasure and celebrated.", note: "Past Simple for sequence of events" },
        { sentence: "While he was sleeping, the phone rang.", note: "Background action + interruption" },
      ],
    },
    vocabExercises: [
      { question: "The 'climax' of a story is:", options: ["The beginning", "The most exciting part", "The end", "The moral"], correct: 1 },
      { question: "An 'anecdote' is:", options: ["A long novel", "A short true story", "A poem", "A lie"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you build suspense?", options: ["Tell everything at once", "Pause and hint at what's next", "Speak very fast", "Skip details"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I ___ (walk) when I ___ (see) her.' Choose:", options: ["walked / saw", "was walking / saw", "walk / see", "had walked / seen"], correct: 1 },
      { question: "'She ___ already ___ before we arrived.'", options: ["has / left", "had / left", "was / leaving", "is / left"], correct: 1 },
    ],
    examQuestions: [
      { question: "Which tense is used for background in stories?", options: ["Present Simple", "Past Perfect", "Past Continuous", "Future"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'Vivid' means:", options: ["Boring", "Very clear and detailed", "Short", "Quiet"], correct: 1 },
    ],
  },
  "speaking-9": {
    levelId: "speaking", levelLabel: "Speaking & Conversation", lessonNumber: 9,
    title: "Expressing Emotions & Empathy",
    description: "Learn to express feelings and show empathy in conversations.",
    vocabulary: [
      { word: "Empathy", meaning: "Understanding someone's feelings", example: "She showed great empathy.", emoji: "❤️", arabic: "تعاطف" },
      { word: "Frustrated", meaning: "Feeling upset or annoyed", example: "I'm frustrated with this traffic.", emoji: "😤", arabic: "محبط" },
      { word: "Relieved", meaning: "Feeling glad a worry is over", example: "I'm so relieved you're safe.", emoji: "😌", arabic: "مرتاح" },
      { word: "Anxious", meaning: "Feeling worried or nervous", example: "She felt anxious before the exam.", emoji: "😰", arabic: "قلِق" },
      { word: "Grateful", meaning: "Feeling thankful", example: "I'm grateful for your help.", emoji: "🙏", arabic: "ممتن" },
      { word: "Overwhelmed", meaning: "Feeling too much emotion/work", example: "He was overwhelmed by the response.", emoji: "😵", arabic: "مرهق" },
      { word: "Sympathize", meaning: "To feel sorry for someone", example: "I sympathize with your situation.", emoji: "💙", arabic: "يتعاطف" },
      { word: "Comfort", meaning: "To make someone feel better", example: "She comforted her friend.", emoji: "🤗", arabic: "يُواسي" },
      { word: "Disappointed", meaning: "Sad that something wasn't as expected", example: "I'm disappointed with the results.", emoji: "😞", arabic: "خائب الأمل" },
      { word: "Thrilled", meaning: "Extremely happy", example: "I'm thrilled to see you!", emoji: "🤩", arabic: "متحمس جداً" },
    ],
    dialogue: [
      { speaker: "Ali", text: "I didn't get the job I applied for." },
      { speaker: "Sara", text: "Oh, I'm so sorry to hear that. You must be disappointed." },
      { speaker: "Ali", text: "Yeah, I'm really frustrated. I prepared so much." },
      { speaker: "Sara", text: "I totally understand how you feel. Something better will come along." },
      { speaker: "Ali", text: "Thanks, Sara. I really appreciate your support." },
    ],
    grammar: {
      title: "Adjective + Preposition Patterns for Emotions",
      explanation: "Many emotion adjectives pair with specific prepositions: afraid of, angry about, pleased with, excited about.",
      examples: [
        { sentence: "I'm worried about the test.", note: "worried + about" },
        { sentence: "She's proud of her achievement.", note: "proud + of" },
        { sentence: "He's angry about the decision.", note: "angry + about" },
        { sentence: "We're excited about the trip.", note: "excited + about" },
      ],
    },
    vocabExercises: [
      { question: "'Empathy' means:", options: ["Ignoring feelings", "Understanding someone's feelings", "Being angry", "Being happy"], correct: 1 },
      { question: "'Overwhelmed' means:", options: ["Relaxed", "Feeling too much", "Bored", "Hungry"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you show empathy?", options: ["Change the subject", "Say 'I understand how you feel'", "Laugh", "Ignore them"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'She's afraid ___ spiders.'", options: ["about", "of", "with", "for"], correct: 1 },
      { question: "'I'm pleased ___ the results.'", options: ["of", "about", "with", "for"], correct: 2 },
    ],
    examQuestions: [
      { question: "Which emotion means 'extremely happy'?", options: ["Anxious", "Frustrated", "Thrilled", "Overwhelmed"], correct: 2 },
    ],
    homeworkQuestions: [
      { question: "'To comfort' someone means:", options: ["To make them cry", "To make them feel better", "To argue", "To leave"], correct: 1 },
    ],
  },
  "speaking-10": {
    levelId: "speaking", levelLabel: "Speaking & Conversation", lessonNumber: 10,
    title: "Cultural Conversations & Taboos",
    description: "Navigate cross-cultural topics and avoid common communication pitfalls.",
    vocabulary: [
      { word: "Culture", meaning: "Beliefs and customs of a group", example: "Every culture has unique traditions.", emoji: "🌍", arabic: "ثقافة" },
      { word: "Custom", meaning: "A traditional practice", example: "It's a custom to shake hands.", emoji: "🤝", arabic: "عادة" },
      { word: "Taboo", meaning: "Something forbidden or inappropriate", example: "Asking about salary is taboo in some cultures.", emoji: "🚫", arabic: "محظور" },
      { word: "Etiquette", meaning: "Rules of polite behavior", example: "Business etiquette varies by country.", emoji: "🎩", arabic: "آداب السلوك" },
      { word: "Stereotype", meaning: "An oversimplified belief about a group", example: "We should avoid stereotypes.", emoji: "🏷️", arabic: "صورة نمطية" },
      { word: "Diversity", meaning: "Variety of different people/things", example: "Our team values diversity.", emoji: "🌈", arabic: "تنوع" },
      { word: "Sensitive", meaning: "Easily affected or delicate topic", example: "Religion can be a sensitive topic.", emoji: "⚠️", arabic: "حساس" },
      { word: "Respectful", meaning: "Showing consideration", example: "Be respectful of other cultures.", emoji: "🙏", arabic: "محترم" },
      { word: "Gesture", meaning: "A body movement with meaning", example: "Gestures vary across cultures.", emoji: "👋", arabic: "إيماءة" },
      { word: "Tradition", meaning: "A long-established custom", example: "This tradition goes back centuries.", emoji: "🏛️", arabic: "تقليد" },
    ],
    dialogue: [
      { speaker: "Emma", text: "In your culture, is it okay to ask someone's age?" },
      { speaker: "Ahmed", text: "It depends! Among friends it's fine, but with strangers it might be rude." },
      { speaker: "Emma", text: "Interesting! In the UK, asking about salary is considered very rude." },
      { speaker: "Ahmed", text: "Same here. It's important to be aware of these cultural differences." },
      { speaker: "Emma", text: "Absolutely. Being respectful is the key to good communication." },
    ],
    grammar: {
      title: "Hedging Language for Sensitive Topics",
      explanation: "Use hedging to soften statements: 'It might be...', 'Some people believe...', 'It tends to be...'",
      examples: [
        { sentence: "It might be considered rude in some cultures.", note: "'might be' softens the statement" },
        { sentence: "Some people tend to avoid that topic.", note: "'tend to' shows a general pattern" },
        { sentence: "I could be wrong, but I think...", note: "Acknowledges uncertainty" },
        { sentence: "It's generally considered impolite.", note: "'Generally' avoids absolute statements" },
      ],
    },
    vocabExercises: [
      { question: "'Taboo' means:", options: ["Popular", "Forbidden or inappropriate", "Fun", "Common"], correct: 1 },
      { question: "'Etiquette' refers to:", options: ["A type of food", "Rules of polite behavior", "A sport", "A greeting"], correct: 1 },
    ],
    conversationExercises: [
      { question: "How do you handle a sensitive topic?", options: ["Be direct and blunt", "Use hedging language", "Avoid talking entirely", "Make jokes"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is a hedging phrase?", options: ["You're wrong", "It might be", "Obviously", "Always"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Diversity' means:", options: ["Sameness", "Variety of different people", "A custom", "A taboo"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'stereotype' is:", options: ["A cultural celebration", "An oversimplified belief", "A polite gesture", "A tradition"], correct: 1 },
    ],
  },
  "listening-8": {
    levelId: "listening", levelLabel: "Listening Skills", lessonNumber: 8,
    title: "News & Current Affairs Listening",
    description: "Practice understanding news broadcasts and reports.",
    vocabulary: [
      { word: "Broadcast", meaning: "A radio or TV program", example: "The broadcast started at 6 PM.", emoji: "📡", arabic: "بث" },
      { word: "Headline", meaning: "The title of a news story", example: "Did you see today's headline?", emoji: "📰", arabic: "عنوان رئيسي" },
      { word: "Reporter", meaning: "A person who reports news", example: "The reporter was at the scene.", emoji: "🎤", arabic: "مراسل" },
      { word: "Breaking news", meaning: "Important new information", example: "Breaking news: earthquake hits the city.", emoji: "🚨", arabic: "أخبار عاجلة" },
      { word: "Source", meaning: "Where information comes from", example: "Always check your sources.", emoji: "🔗", arabic: "مصدر" },
      { word: "Update", meaning: "New information about a story", example: "We'll bring you updates throughout the day.", emoji: "🔄", arabic: "تحديث" },
      { word: "Bias", meaning: "Unfair preference for one side", example: "Good journalism avoids bias.", emoji: "⚖️", arabic: "تحيز" },
      { word: "Correspondent", meaning: "A journalist reporting from a location", example: "Our correspondent is in London.", emoji: "🌐", arabic: "مراسل" },
      { word: "Editorial", meaning: "An opinion article by the editor", example: "The editorial criticized the policy.", emoji: "📝", arabic: "افتتاحية" },
      { word: "Anchor", meaning: "The main news presenter", example: "The anchor introduced the story.", emoji: "🎙️", arabic: "مذيع رئيسي" },
    ],
    dialogue: [
      { speaker: "Anchor", text: "Good evening. Our top story tonight: a new climate agreement has been reached." },
      { speaker: "Reporter", text: "That's right. Over 190 countries signed the agreement today." },
      { speaker: "Anchor", text: "What are the key points of this agreement?" },
      { speaker: "Reporter", text: "The main goal is to reduce carbon emissions by 50% by 2035." },
      { speaker: "Anchor", text: "Thank you for that update. We'll have more details after the break." },
    ],
    grammar: {
      title: "Reported Speech in News",
      explanation: "News reports use reported speech: 'The president said that...', 'Officials announced that...'",
      examples: [
        { sentence: "The minister said that new laws would be introduced.", note: "Direct → reported: will → would" },
        { sentence: "Officials announced that the event had been cancelled.", note: "was cancelled → had been cancelled" },
        { sentence: "The spokesperson confirmed that talks were ongoing.", note: "are → were" },
        { sentence: "Experts warned that temperatures could rise.", note: "can → could" },
      ],
    },
    vocabExercises: [
      { question: "A 'headline' is:", options: ["The end of a story", "The title of a news story", "A type of bias", "A reporter"], correct: 1 },
      { question: "'Bias' means:", options: ["Fairness", "Unfair preference for one side", "A news update", "A broadcast"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What does 'breaking news' indicate?", options: ["Old news", "Important new information", "A comedy show", "An editorial"], correct: 1 },
    ],
    grammarExercises: [
      { question: "In reported speech, 'will' changes to:", options: ["can", "would", "shall", "may"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'anchor' is:", options: ["A boat part", "The main news presenter", "A reporter", "A source"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A 'correspondent' reports from:", options: ["The studio only", "A specific location", "Social media", "Home"], correct: 1 },
    ],
  },
  "listening-9": {
    levelId: "listening", levelLabel: "Listening Skills", lessonNumber: 9,
    title: "Academic Lectures & Note-Taking",
    description: "Practice listening to academic content and taking effective notes.",
    vocabulary: [
      { word: "Lecture", meaning: "A talk given to students", example: "The professor gave a lecture on history.", emoji: "🎓", arabic: "محاضرة" },
      { word: "Note-taking", meaning: "Writing key points while listening", example: "Good note-taking helps you remember.", emoji: "📝", arabic: "تدوين ملاحظات" },
      { word: "Summary", meaning: "A brief overview of main points", example: "Write a summary after the lecture.", emoji: "📋", arabic: "ملخص" },
      { word: "Key point", meaning: "The most important idea", example: "The key point was about climate change.", emoji: "🔑", arabic: "نقطة رئيسية" },
      { word: "Reference", meaning: "A source mentioned", example: "The professor cited several references.", emoji: "📚", arabic: "مرجع" },
      { word: "Thesis", meaning: "The main argument or claim", example: "The thesis was well-supported.", emoji: "📜", arabic: "أطروحة" },
      { word: "Abbreviation", meaning: "A shortened form", example: "Use abbreviations to take notes faster.", emoji: "✂️", arabic: "اختصار" },
      { word: "Paraphrase", meaning: "To restate in your own words", example: "Try to paraphrase, don't copy exactly.", emoji: "🔄", arabic: "يُعيد صياغة" },
      { word: "Outline", meaning: "A structured plan of key topics", example: "Create an outline before writing.", emoji: "📊", arabic: "مخطط" },
      { word: "Recall", meaning: "To remember", example: "Can you recall the main points?", emoji: "🧠", arabic: "يتذكر" },
    ],
    dialogue: [
      { speaker: "Student", text: "How do you take notes during fast lectures?" },
      { speaker: "Tutor", text: "Use abbreviations and focus on key points, not every word." },
      { speaker: "Student", text: "Should I paraphrase or write exact quotes?" },
      { speaker: "Tutor", text: "Paraphrase! It helps you understand and remember better." },
      { speaker: "Student", text: "That makes sense. I'll also review my notes after class." },
    ],
    grammar: {
      title: "Signposting in Academic Lectures",
      explanation: "Lecturers use signposting to guide listeners: 'Let's turn to...', 'As I mentioned earlier...', 'The key takeaway is...'",
      examples: [
        { sentence: "Let's turn to the second point.", note: "Signals moving to a new topic" },
        { sentence: "As I mentioned earlier, this is important.", note: "Refers back to a previous point" },
        { sentence: "The key takeaway is that...", note: "Highlights the most important idea" },
        { sentence: "To elaborate on this point...", note: "Going deeper into a topic" },
      ],
    },
    vocabExercises: [
      { question: "'Paraphrase' means:", options: ["To copy exactly", "To restate in your own words", "To delete", "To ignore"], correct: 1 },
      { question: "A 'thesis' is:", options: ["A question", "The main argument", "A reference", "A note"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What should you focus on during note-taking?", options: ["Every single word", "Key points", "Doodling", "The lecturer's clothes"], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which phrase signals a new topic?", options: ["In conclusion", "Let's turn to", "As I said", "For example"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'abbreviation' is:", options: ["A full sentence", "A shortened form", "A reference", "A summary"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Recall' means:", options: ["To forget", "To remember", "To write", "To read"], correct: 1 },
    ],
  },
  "listening-10": {
    levelId: "listening", levelLabel: "Listening Skills", lessonNumber: 10,
    title: "Movies, TV & Entertainment Listening",
    description: "Improve listening through movies, TV shows, and entertainment media.",
    vocabulary: [
      { word: "Subtitle", meaning: "Text shown on screen for dialogue", example: "Turn on subtitles for practice.", emoji: "📺", arabic: "ترجمة" },
      { word: "Accent", meaning: "A way of pronouncing words", example: "She has a British accent.", emoji: "🗣️", arabic: "لهجة" },
      { word: "Slang", meaning: "Very informal words", example: "'Cool' is a common slang word.", emoji: "😎", arabic: "عامية" },
      { word: "Plot twist", meaning: "An unexpected story change", example: "The movie had an amazing plot twist.", emoji: "🔄", arabic: "تحول في الحبكة" },
      { word: "Genre", meaning: "A category of film or music", example: "Comedy is my favorite genre.", emoji: "🎬", arabic: "نوع" },
      { word: "Script", meaning: "The written text of a film", example: "The actors followed the script.", emoji: "📄", arabic: "سيناريو" },
      { word: "Dialogue", meaning: "Conversation between characters", example: "The dialogue was very natural.", emoji: "💬", arabic: "حوار" },
      { word: "Soundtrack", meaning: "Music in a film", example: "The soundtrack was beautiful.", emoji: "🎵", arabic: "موسيقى تصويرية" },
      { word: "Scene", meaning: "A part of a film", example: "That scene made me cry.", emoji: "🎥", arabic: "مشهد" },
      { word: "Binge-watch", meaning: "To watch many episodes at once", example: "I binge-watched the whole series.", emoji: "📱", arabic: "مشاهدة متواصلة" },
    ],
    dialogue: [
      { speaker: "Nour", text: "Do you watch movies in English without subtitles?" },
      { speaker: "Mark", text: "I started with subtitles, then switched to English-only subtitles." },
      { speaker: "Nour", text: "That's a great strategy! It really helps with slang and accents." },
      { speaker: "Mark", text: "Exactly! I learned so many phrases from TV shows." },
      { speaker: "Nour", text: "Me too! Entertainment is the best way to learn naturally." },
    ],
    grammar: {
      title: "Informal Contractions in Speech",
      explanation: "In movies and TV, you'll hear contractions like 'gonna' (going to), 'wanna' (want to), 'gotta' (got to).",
      examples: [
        { sentence: "I'm gonna watch a movie tonight.", note: "'gonna' = going to" },
        { sentence: "Do you wanna come with us?", note: "'wanna' = want to" },
        { sentence: "I've gotta go now.", note: "'gotta' = got to" },
        { sentence: "She kinda likes him.", note: "'kinda' = kind of" },
      ],
    },
    vocabExercises: [
      { question: "'Binge-watch' means:", options: ["Watch one episode", "Watch many episodes at once", "Watch slowly", "Not watch"], correct: 1 },
      { question: "A 'genre' is:", options: ["An actor", "A category of film", "A script", "A scene"], correct: 1 },
    ],
    conversationExercises: [
      { question: "What's a good way to practice listening with movies?", options: ["Watch on mute", "Use English subtitles", "Only watch dubbed", "Don't watch"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Gonna' is informal for:", options: ["Go to", "Going to", "Gone to", "Got to"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'soundtrack' is:", options: ["A script", "Music in a film", "A subtitle", "An accent"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "'Slang' refers to:", options: ["Formal language", "Very informal words", "Academic writing", "Grammar rules"], correct: 1 },
    ],
  },
};
