/**
 * Discussion prompts for Communication Skills courses (speaking, listening, pronunciation).
 * These replace the dialogue section with open-ended questions students discuss/answer.
 */

export interface DiscussionPrompt {
  question: string;
  hint: string;
  emoji: string;
}

const communicationPrompts: Record<string, DiscussionPrompt[]> = {
  // Speaking lessons
  "speaking-1": [
    { question: "Introduce yourself to the class. Include your name, where you're from, and what you do.", hint: "Use: 'My name is...', 'I'm originally from...', 'I currently...'", emoji: "👋" },
    { question: "What are three things you're passionate about? Why?", hint: "Use: 'I'm passionate about... because...'", emoji: "❤️" },
    { question: "Describe your background and experience in 3-4 sentences.", hint: "Use Present Simple for facts, Present Continuous for current activities.", emoji: "📋" },
    { question: "If you met someone at a conference, how would you introduce yourself professionally?", hint: "Keep it brief: name, role, one interesting fact.", emoji: "💼" },
  ],
  "speaking-2": [
    { question: "Do you think online learning is better than traditional classrooms? Why or why not?", hint: "Use: 'In my opinion...', 'I believe that...'", emoji: "💭" },
    { question: "What is your opinion about social media? Is it helpful or harmful?", hint: "Use: 'From my perspective...', 'However...'", emoji: "📱" },
    { question: "Do you agree that English is the most important language to learn? Explain.", hint: "Use: 'I agree/disagree because...', 'Furthermore...'", emoji: "🌍" },
    { question: "What is one opinion you hold strongly? Defend it politely.", hint: "Use hedging: 'I tend to think...', 'I would say...'", emoji: "💪" },
  ],
  "speaking-3": [
    { question: "How would you politely ask your teacher to repeat something?", hint: "Use: 'Could you...?', 'Would you mind...?'", emoji: "🙏" },
    { question: "Your friend wants to go to a restaurant. Suggest three alternatives.", hint: "Use: 'How about...?', 'Why don't we...?', 'I suggest...'", emoji: "💡" },
    { question: "You need to borrow a book from a classmate. Make a polite request.", hint: "Use: 'Would it be possible to...?', 'Could I possibly...?'", emoji: "📚" },
    { question: "Suggest a plan for a group project. How would you divide the work?", hint: "Use: 'I'd recommend...', 'Perhaps we could...'", emoji: "📝" },
  ],
  "speaking-4": [
    { question: "Tell a story about the most exciting thing that happened to you this year.", hint: "Use sequencing: 'First...', 'Then...', 'Suddenly...'", emoji: "📖" },
    { question: "Describe a funny or memorable experience from your childhood.", hint: "Use Past Simple for main events, Past Continuous for background.", emoji: "😄" },
    { question: "Create a short story starting with: 'One day, I was walking home when...'", hint: "Include a climax and a moral.", emoji: "✨" },
    { question: "What is the most interesting story you've ever heard? Retell it.", hint: "Use vivid descriptions and sequencing words.", emoji: "🎭" },
  ],
  "speaking-5": [
    { question: "You're at a job interview. How do you answer: 'Tell me about yourself'?", hint: "Structure: background → experience → goals.", emoji: "💼" },
    { question: "How would you handle a disagreement with a colleague at work?", hint: "Use diplomatic language: 'I see your point, but...', 'Perhaps we could...'", emoji: "🤝" },
    { question: "Describe your ideal job and explain why it suits you.", hint: "Use: 'I'm interested in... because...', 'My strengths include...'", emoji: "⭐" },
    { question: "How do you give constructive feedback to a teammate?", hint: "Use: 'I appreciate..., however, I think we could improve...'", emoji: "💬" },
  ],
  "speaking-6": [
    { question: "Should students be required to wear school uniforms? Debate both sides.", hint: "Use: 'On one hand...', 'On the other hand...', 'I believe...'", emoji: "⚖️" },
    { question: "Is technology making us smarter or lazier? Defend your position.", hint: "Use evidence: 'Studies show...', 'For example...'", emoji: "📊" },
    { question: "Do you think remote work is better than working in an office? Why?", hint: "Use: 'I strongly believe...', 'However, the counter-argument is...'", emoji: "🏠" },
    { question: "Choose a topic you feel strongly about and present your stance in 1 minute.", hint: "Structure: State position → Give 2 reasons → Conclude.", emoji: "🎤" },
  ],
  "speaking-7": [
    { question: "Prepare a 1-minute speech introducing your favorite book or movie.", hint: "Use signposting: 'Firstly...', 'Moving on to...', 'In conclusion...'", emoji: "🎬" },
    { question: "What makes a great public speaker? List 3 qualities and explain.", hint: "Think about: confidence, clarity, connection with audience.", emoji: "🌟" },
    { question: "Give a short speech about why learning English is important.", hint: "Use eye contact, gestures, and vary your pace.", emoji: "🗣️" },
    { question: "How do you overcome nervousness before speaking in public?", hint: "Share personal strategies and advice.", emoji: "💪" },
  ],
  "speaking-8": [
    { question: "Tell a story about a trip that didn't go as planned.", hint: "Use Past Continuous for background, Past Simple for events.", emoji: "✈️" },
    { question: "Describe a person who has influenced your life. What makes them special?", hint: "Use vivid adjectives and specific examples.", emoji: "👤" },
    { question: "Create a suspenseful story that ends with a surprise twist.", hint: "Build suspense slowly, then surprise your listener.", emoji: "😱" },
    { question: "Share an anecdote that taught you an important lesson.", hint: "End with the moral or lesson learned.", emoji: "💡" },
  ],
  "speaking-9": [
    { question: "Your friend is feeling sad about failing an exam. What do you say?", hint: "Use empathy: 'I understand how you feel...', 'That must be...'", emoji: "🤗" },
    { question: "Describe a time when you felt very proud of yourself.", hint: "Use emotion vocabulary: thrilled, grateful, relieved.", emoji: "🏆" },
    { question: "How do you comfort someone who is going through a difficult time?", hint: "Use: 'I'm here for you', 'It's okay to feel...'", emoji: "❤️" },
    { question: "What makes you feel anxious? How do you deal with it?", hint: "Be honest and use emotion adjectives.", emoji: "😰" },
  ],
  "speaking-10": [
    { question: "What cultural differences have you noticed between your country and others?", hint: "Use: 'In my culture...', 'It might be considered...'", emoji: "🌍" },
    { question: "Are there topics that are taboo in your culture but not in others?", hint: "Use hedging: 'It tends to be...', 'Some people believe...'", emoji: "🚫" },
    { question: "How can we show respect when visiting a country with different customs?", hint: "Use: 'It's important to...', 'One should...'", emoji: "🙏" },
    { question: "Describe a tradition from your culture that you would like to share with the world.", hint: "Explain the tradition and why it's meaningful.", emoji: "🎉" },
  ],

  // Listening lessons
  "listening-1": [
    { question: "After listening to a short audio, what was the main idea? Summarize in 2 sentences.", hint: "Focus on: Who? What? Why?", emoji: "🎯" },
    { question: "How do you prepare yourself before listening to a lecture or presentation?", hint: "Think about: predicting, looking at titles, preparing questions.", emoji: "📝" },
    { question: "What strategies help you understand the gist of a conversation?", hint: "Focus on repeated words, tone, and key phrases.", emoji: "🧠" },
    { question: "Describe the difference between listening for main ideas vs. listening for details.", hint: "Main ideas = big picture; Details = specific facts.", emoji: "🔍" },
  ],
  "listening-2": [
    { question: "How do you take effective notes while listening to a lecture?", hint: "Think about: abbreviations, key words, symbols.", emoji: "📋" },
    { question: "What do you find most difficult about listening to English? How do you overcome it?", hint: "Be specific: speed, accent, vocabulary, etc.", emoji: "💪" },
    { question: "Describe a time you misunderstood something in English. What happened?", hint: "What caused the misunderstanding? How was it resolved?", emoji: "😅" },
    { question: "Why is listening considered the most challenging skill? Do you agree?", hint: "Give reasons and examples from your experience.", emoji: "🎧" },
  ],
  "listening-3": [
    { question: "How can you tell if a speaker is being sarcastic or serious?", hint: "Think about: tone, context, facial expressions.", emoji: "🤔" },
    { question: "What clues help you predict what a speaker will say next?", hint: "Consider: topic, tone changes, signposting phrases.", emoji: "🔮" },
    { question: "How do you handle situations where you don't understand a speaker?", hint: "Use: 'Could you repeat that?', 'Do you mean...?'", emoji: "❓" },
    { question: "What types of audio content help improve your listening skills?", hint: "Think about: podcasts, news, songs, movies.", emoji: "🎵" },
  ],
  "listening-4": [
    { question: "What makes native English speakers difficult to understand?", hint: "Think about: connected speech, reductions, speed.", emoji: "🗣️" },
    { question: "Can you identify common contractions? Give 5 examples.", hint: "E.g., 'gonna' = 'going to', 'wanna' = 'want to'", emoji: "✂️" },
    { question: "How is spoken English different from written English?", hint: "Think about: contractions, slang, tone.", emoji: "📖" },
    { question: "Practice: Say 'What do you want to do?' naturally, then in connected speech.", hint: "Connected: 'Whaddya wanna do?'", emoji: "🔗" },
  ],
  "listening-5": [
    { question: "How do you distinguish facts from opinions when listening to a speaker?", hint: "Facts can be verified; opinions include 'I think', 'I believe'.", emoji: "⚖️" },
    { question: "Describe a podcast or show you listen to in English. What do you learn from it?", hint: "Share what makes it helpful for your English.", emoji: "🎙️" },
    { question: "How important is it to understand every word when listening? Explain.", hint: "Discuss the difference between understanding every word vs. getting the message.", emoji: "💯" },
    { question: "What techniques do you use to improve your listening outside of class?", hint: "Share practical tips and routines.", emoji: "📈" },
  ],
  "listening-6": [
    { question: "How do you follow a conversation with multiple speakers?", hint: "Think about: voice recognition, turn-taking, context.", emoji: "👥" },
    { question: "What role does body language play in understanding spoken English?", hint: "Consider: gestures, facial expressions, posture.", emoji: "🤚" },
    { question: "How can watching movies with subtitles help your listening skills?", hint: "Discuss the pros and cons of using subtitles.", emoji: "🎬" },
    { question: "Describe the most challenging listening experience you've had in English.", hint: "What made it difficult? How did you handle it?", emoji: "💪" },
  ],
  "listening-7": [
    { question: "How do you understand speakers with different accents?", hint: "Think about: exposure, context, asking for clarification.", emoji: "🌐" },
    { question: "What's the difference between hearing and active listening?", hint: "Active listening involves focus, response, and engagement.", emoji: "👂" },
    { question: "How can music help improve your English listening comprehension?", hint: "Discuss: lyrics, rhythm, repetition.", emoji: "🎵" },
    { question: "Create 3 tips for someone who struggles with listening comprehension.", hint: "Think about practical, actionable advice.", emoji: "📝" },
  ],
  "listening-8": [
    { question: "How do you identify bias in news reporting?", hint: "Look for: loaded language, one-sided sources, emotional appeals.", emoji: "📰" },
    { question: "Summarize a recent news story you heard in English.", hint: "Include: who, what, when, where, why.", emoji: "🗞️" },
    { question: "Why is it important to check multiple news sources?", hint: "Think about: bias, accuracy, different perspectives.", emoji: "🔍" },
    { question: "How do news anchors use language differently from everyday speakers?", hint: "Consider: formal language, passive voice, reported speech.", emoji: "🎤" },
  ],
  "listening-9": [
    { question: "How do you follow instructions given verbally in English?", hint: "Think about: key words, sequence markers, asking for repetition.", emoji: "📋" },
    { question: "What's the best way to take notes during a phone call in English?", hint: "Focus on: names, numbers, key action items.", emoji: "📞" },
    { question: "Describe a situation where good listening skills helped you.", hint: "Give a specific example from school, work, or daily life.", emoji: "✅" },
    { question: "How do you stay focused during long lectures or presentations?", hint: "Share strategies: note-taking, questions, mental summaries.", emoji: "🧠" },
  ],
  "listening-10": [
    { question: "How has your listening ability improved since you started learning English?", hint: "Compare: before and now. What strategies helped?", emoji: "📈" },
    { question: "What would you recommend to a beginner struggling with English listening?", hint: "Give 3 practical pieces of advice.", emoji: "💡" },
    { question: "How do you handle understanding English in noisy environments?", hint: "Think about: focus, lip reading, asking to repeat.", emoji: "🔊" },
    { question: "Set a personal listening goal for the next month. What will you do?", hint: "Be specific: minutes per day, type of content, etc.", emoji: "🎯" },
  ],

  // Pronunciation lessons
  "pronunciation-1": [
    { question: "Say these minimal pairs: 'ship/sheep', 'bit/beat', 'sit/seat'. Can you hear the difference?", hint: "Short vowels are quick; long vowels are stretched.", emoji: "🗣️" },
    { question: "Which English vowel sounds are the hardest for you? Why?", hint: "Think about sounds that don't exist in your language.", emoji: "🤔" },
    { question: "Practice saying 5 words with short vowels and 5 with long vowels.", hint: "Short: cat, sit, hot. Long: cake, see, boat.", emoji: "📝" },
    { question: "How does pronouncing vowels incorrectly change the meaning of words?", hint: "Example: 'ship' vs 'sheep' — completely different meanings!", emoji: "⚠️" },
  ],
  "pronunciation-2": [
    { question: "Practice these sounds: /θ/ (think) and /ð/ (this). Say 5 words for each.", hint: "Put your tongue between your teeth for both sounds.", emoji: "👅" },
    { question: "Which consonant sounds in English don't exist in your language?", hint: "Common difficult ones: /θ/, /ð/, /r/, /v/.", emoji: "🔤" },
    { question: "Say these pairs: 'very/berry', 'thin/tin', 'right/light'. Hear the difference?", hint: "Focus on the initial consonant sound.", emoji: "👂" },
    { question: "Why is the English 'r' sound difficult for many learners?", hint: "It varies between American, British, and other accents.", emoji: "🌍" },
  ],
  "pronunciation-3": [
    { question: "Clap the stressed syllable: 'computer', 'important', 'education'.", hint: "comPUter, imPORtant, eduCAtion", emoji: "👏" },
    { question: "How does word stress change meaning? Compare: 'REcord' (noun) vs 'reCORD' (verb).", hint: "Noun stress is usually on the first syllable.", emoji: "🎵" },
    { question: "Say these words with correct stress: 'photograph', 'photographer', 'photographic'.", hint: "Notice how stress shifts: PHOtograph, phoTOGrapher, photoGRAPHic.", emoji: "📸" },
    { question: "Why is stress important in English communication?", hint: "Wrong stress can cause misunderstanding or sound unnatural.", emoji: "💡" },
  ],
  "pronunciation-4": [
    { question: "Say 'You're coming.' as a statement (falling) and as a question (rising).", hint: "Statement: voice goes down ↓. Question: voice goes up ↑.", emoji: "📈" },
    { question: "Practice list intonation: 'I need apples, oranges, and bananas.'", hint: "Rise on each item ↑, fall on the last one ↓.", emoji: "📝" },
    { question: "How does intonation show surprise vs. certainty? Give examples.", hint: "Surprise: 'Really?!' (big rise). Certainty: 'I know.' (fall).", emoji: "😲" },
    { question: "Read these sentences with appropriate intonation and explain your choices.", hint: "Think about: questions, statements, lists, emotions.", emoji: "🎭" },
  ],
  "pronunciation-5": [
    { question: "Practice sentence stress: 'I DIDN'T say he STOLE the money.' Stress different words.", hint: "Changing stress changes the meaning entirely!", emoji: "💬" },
    { question: "What happens when you stress content words vs. function words?", hint: "Content words carry meaning; function words are reduced.", emoji: "📊" },
    { question: "Read a short paragraph naturally. Which words do you stress and why?", hint: "Stress nouns, verbs, adjectives. Reduce articles, prepositions.", emoji: "📖" },
    { question: "How does rhythm in English differ from your native language?", hint: "English is stress-timed; many languages are syllable-timed.", emoji: "🥁" },
  ],
};

/** Get discussion prompts for a lesson key (e.g., "speaking-1") */
export function getDiscussionPrompts(lessonKey: string): DiscussionPrompt[] | null {
  return communicationPrompts[lessonKey] || null;
}

/** Check if a levelId is a communication course */
export function isCommunicationCourse(levelId: string): boolean {
  return ["speaking", "listening", "pronunciation"].includes(levelId);
}
