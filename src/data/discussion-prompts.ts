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

  // Pronunciation 6-10
  "pronunciation-6": [
    { question: "Practice linking: Say 'turn off' as one sound — 'tur-noff'. Find 3 more examples.", hint: "Linking happens when a word ends in a consonant and the next starts with a vowel.", emoji: "🔗" },
    { question: "How does linking change the way sentences sound in natural speech?", hint: "Words blend together: 'pick it up' → 'pi-ki-tup'.", emoji: "🗣️" },
    { question: "Say 'an apple', 'an egg', 'an orange'. Notice the linking. Create 5 more.", hint: "The 'n' links smoothly to the vowel sound.", emoji: "🍎" },
    { question: "Why do learners find connected speech difficult to understand?", hint: "Words don't sound the same in isolation vs. in sentences.", emoji: "🤔" },
  ],
  "pronunciation-7": [
    { question: "Practice the schwa /ə/ sound: Say 'about', 'banana', 'support'. What do the unstressed vowels sound like?", hint: "The schwa is the most common vowel sound — short, lazy, neutral.", emoji: "🔤" },
    { question: "Find the schwa in these words: 'chocolate', 'comfortable', 'vegetable'.", hint: "Schwa often replaces vowels in unstressed syllables.", emoji: "🔍" },
    { question: "Why is the schwa important for sounding natural in English?", hint: "Native speakers reduce unstressed syllables — it creates English rhythm.", emoji: "🎵" },
    { question: "Record yourself saying 'I want to go to the store.' How many schwas can you find?", hint: "'to' and 'the' both use schwa in natural speech.", emoji: "🎙️" },
  ],
  "pronunciation-8": [
    { question: "Practice silent letters: Say 'knife', 'write', 'honest', 'island'. Which letters are silent?", hint: "K in knife, W in write, H in honest, S in island.", emoji: "🤫" },
    { question: "List 10 English words with silent letters. Why do these silent letters exist?", hint: "They're historical — pronunciation changed but spelling didn't.", emoji: "📜" },
    { question: "How do silent letters make English spelling difficult for learners?", hint: "You can't always predict pronunciation from spelling.", emoji: "😤" },
    { question: "Practice: 'Wednesday', 'February', 'comfortable'. How do native speakers actually say these?", hint: "Wenz-day, Feb-yoo-ary, Comf-ter-bul.", emoji: "👂" },
  ],
  "pronunciation-9": [
    { question: "Compare American and British pronunciation: 'water', 'can't', 'schedule'. What differences do you notice?", hint: "American: 'wader', 'kænt', 'skedule'. British: 'wohtuh', 'kahnt', 'shedule'.", emoji: "🇺🇸" },
    { question: "Which English accent do you prefer to learn? Why?", hint: "Consider: exposure, goals, media you consume.", emoji: "🌍" },
    { question: "How does the 'r' sound differ between American and British English?", hint: "American English is rhotic (pronounces all r's); British often drops final r's.", emoji: "🔤" },
    { question: "Listen to a clip in Australian, Indian, or South African English. What patterns do you notice?", hint: "Every accent has its own vowel shifts and intonation patterns.", emoji: "🎧" },
  ],
  "pronunciation-10": [
    { question: "Read a paragraph aloud focusing on all pronunciation skills: stress, intonation, linking, and rhythm.", hint: "Combine everything: stress content words, link sounds, use natural intonation.", emoji: "🏆" },
    { question: "What are your top 3 pronunciation challenges? Create a practice plan for each.", hint: "Be specific: which sounds, which patterns, how will you practice?", emoji: "📋" },
    { question: "Record yourself speaking for 1 minute. Listen back — what would you improve?", hint: "Focus on: clarity, rhythm, stress patterns, natural flow.", emoji: "🎙️" },
    { question: "How has your pronunciation improved since lesson 1? What strategies helped most?", hint: "Reflect on: minimal pairs, stress practice, listening exposure.", emoji: "📈" },
  ],

  // Speaking 11-20
  "speaking-11": [
    { question: "Describe a process you know well (cooking a meal, using an app, etc.) step by step.", hint: "Use sequence words: 'First...', 'After that...', 'Finally...'", emoji: "📝" },
    { question: "How would you explain how to use social media to an elderly person?", hint: "Use simple language, analogies, and patience.", emoji: "👵" },
    { question: "Give instructions for a daily routine. Make them clear enough for a child to follow.", hint: "Use imperatives: 'Wake up at...', 'Brush your...'", emoji: "⏰" },
    { question: "Describe how to get from your home to your school/workplace.", hint: "Use direction language: 'Turn left...', 'Go straight...', 'Pass the...'", emoji: "🗺️" },
  ],
  "speaking-12": [
    { question: "Compare life in a big city vs. a small town. Which do you prefer and why?", hint: "Use comparatives: 'more...than', 'less...than', 'as...as'.", emoji: "🏙️" },
    { question: "Compare two movies, books, or TV shows you've watched recently.", hint: "Use: 'While X is..., Y is...', 'Both...however...'", emoji: "🎬" },
    { question: "What are the similarities and differences between learning online and in a classroom?", hint: "Structure: similarities first, then differences, then your preference.", emoji: "💻" },
    { question: "Compare your generation with your parents' generation. What's different?", hint: "Use: 'Unlike...', 'In contrast...', 'Similarly...'", emoji: "👨‍👩‍👧" },
  ],
  "speaking-13": [
    { question: "You need to complain about a product you bought online. Role-play the call.", hint: "Be firm but polite: 'I'm not satisfied with...', 'I'd like a refund...'", emoji: "📞" },
    { question: "How do you handle a situation where someone cuts in line?", hint: "Use assertive language: 'Excuse me, I believe I was here first.'", emoji: "🙋" },
    { question: "Practice making and responding to complaints in a restaurant.", hint: "Complain: 'I'm afraid this is cold.' Respond: 'I apologize, let me...'", emoji: "🍽️" },
    { question: "Write a formal complaint email about a delayed delivery. Read it aloud.", hint: "Structure: greeting → problem → expectation → closing.", emoji: "📧" },
  ],
  "speaking-14": [
    { question: "If you could change one thing about your country, what would it be? Why?", hint: "Use conditionals: 'If I could...', 'I would...because...'", emoji: "🌍" },
    { question: "What would you do if you won a million dollars? Plan your spending.", hint: "Use 'would' for hypothetical: 'I'd invest...', 'I'd donate...'", emoji: "💰" },
    { question: "If you could have dinner with any person (alive or dead), who and why?", hint: "Explain your choice and what questions you'd ask them.", emoji: "🍝" },
    { question: "Imagine you could live in any time period. Which would you choose?", hint: "Use: 'If I lived in...', 'I would experience...'", emoji: "⏳" },
  ],
  "speaking-15": [
    { question: "Give a 2-minute presentation about a topic you're an expert in.", hint: "Structure: hook → 3 main points → conclusion with call to action.", emoji: "🎤" },
    { question: "How do you structure a presentation to keep the audience engaged?", hint: "Think about: storytelling, questions, visual aids, humor.", emoji: "📊" },
    { question: "Practice handling Q&A: Answer unexpected questions about your presentation topic.", hint: "Techniques: 'That's a great question...', 'Let me think about that...'", emoji: "❓" },
    { question: "What's the best presentation you've ever seen? What made it memorable?", hint: "Analyze: content, delivery, visuals, speaker's energy.", emoji: "⭐" },
  ],
  "speaking-16": [
    { question: "Negotiate a price at a market. Role-play as both buyer and seller.", hint: "Buyer: 'Could you do it for less?' Seller: 'The best I can offer is...'", emoji: "🤝" },
    { question: "How would you negotiate a salary raise with your boss?", hint: "Prepare: achievements, market rate, timing. Use: 'Based on my performance...'", emoji: "💼" },
    { question: "Practice agreeing and disagreeing diplomatically in a business meeting.", hint: "Agree: 'I see your point and...' Disagree: 'I understand, however...'", emoji: "📋" },
    { question: "Negotiate plans with friends — everyone wants to do something different.", hint: "Find compromise: 'How about we...', 'What if we did X first, then Y?'", emoji: "👥" },
  ],
  "speaking-17": [
    { question: "Describe a graph or chart showing population growth. Use data language.", hint: "Use: 'increased sharply', 'remained stable', 'decreased gradually'.", emoji: "📈" },
    { question: "Present statistics about a topic you care about (education, health, etc.).", hint: "Use: 'According to...', 'The data shows...', 'X percent of...'", emoji: "📊" },
    { question: "How do you make numbers and data interesting in a presentation?", hint: "Use comparisons, stories, visuals: 'That's equivalent to...'", emoji: "🔢" },
    { question: "Analyze a recent trend (social media usage, climate change, etc.) using data.", hint: "Describe the trend, give causes, predict the future.", emoji: "🔮" },
  ],
  "speaking-18": [
    { question: "Tell a story using reported speech: 'She said that...', 'He told me...'", hint: "Remember tense changes: 'I am' → 'she was', 'I will' → 'she would'.", emoji: "🗣️" },
    { question: "Report a conversation you had recently. Use indirect speech accurately.", hint: "Use reporting verbs: said, told, asked, explained, mentioned.", emoji: "📰" },
    { question: "Practice gossiping politely: Report what someone told you without being rude.", hint: "Use hedging: 'Apparently...', 'I heard that...', 'Someone mentioned...'", emoji: "🤫" },
    { question: "How does reported speech change in formal vs. informal settings?", hint: "Formal: full reported speech. Informal: 'She's like... and I'm like...'", emoji: "🎭" },
  ],
  "speaking-19": [
    { question: "Lead a group discussion about a controversial topic. Keep everyone involved.", hint: "Use: 'What do you think, [name]?', 'Let's hear another perspective.'", emoji: "👥" },
    { question: "How do you politely interrupt someone in a conversation?", hint: "Use: 'Sorry to interrupt, but...', 'Can I add something?', 'If I may...'", emoji: "✋" },
    { question: "Practice turn-taking in a conversation about weekend plans.", hint: "Skills: active listening, building on others' ideas, asking follow-ups.", emoji: "🔄" },
    { question: "How do you keep a conversation going when it starts to die?", hint: "Techniques: ask open questions, share related stories, change topics smoothly.", emoji: "💬" },
  ],
  "speaking-20": [
    { question: "Give a 3-minute impromptu speech on a random topic chosen by your classmate.", hint: "Structure quickly: state opinion → 2 reasons → example → conclusion.", emoji: "🎤" },
    { question: "Reflect on your speaking journey: How have you improved since lesson 1?", hint: "Compare: confidence, fluency, vocabulary range, pronunciation.", emoji: "📈" },
    { question: "What advice would you give to someone just starting to learn English speaking?", hint: "Share your top 5 tips based on personal experience.", emoji: "💡" },
    { question: "Create a 1-minute speech about why communication skills matter in the modern world.", hint: "Include: career benefits, relationships, global citizenship.", emoji: "🌟" },
  ],

  // Listening 11-20
  "listening-11": [
    { question: "What strategies do you use to understand fast speakers in English?", hint: "Think about: focus on key words, context clues, don't try to catch every word.", emoji: "⚡" },
    { question: "How do you differentiate between similar-sounding words in fast speech?", hint: "Use context: 'I need to buy/by the store' — context tells you which.", emoji: "🔍" },
    { question: "Practice listening to a podcast at 1.25x speed. What did you understand?", hint: "Start slow, increase speed gradually as your ear adjusts.", emoji: "🎧" },
    { question: "Why do native speakers seem to 'eat' words? Give examples.", hint: "Connected speech: 'going to' → 'gonna', 'want to' → 'wanna'.", emoji: "🗣️" },
  ],
  "listening-12": [
    { question: "Listen to a song in English. Can you identify the main message?", hint: "Focus on the chorus — it usually contains the main theme.", emoji: "🎵" },
    { question: "How do songs help with listening comprehension? What are the limitations?", hint: "Pros: rhythm, repetition. Cons: poetic language, unclear pronunciation.", emoji: "🎶" },
    { question: "Choose a song and write down as many lyrics as you can hear. Check your accuracy.", hint: "This is called a 'dictation exercise' — great for ear training!", emoji: "✏️" },
    { question: "What genres of English music do you enjoy? How do they help your English?", hint: "Different genres teach different vocabulary and speech patterns.", emoji: "🎸" },
  ],
  "listening-13": [
    { question: "Watch a short news clip. Identify: Who? What? When? Where? Why?", hint: "News follows the '5W' structure — listen for these key details.", emoji: "📺" },
    { question: "How is the language in news broadcasts different from everyday conversation?", hint: "News: formal, passive voice, reported speech. Conversation: informal, active.", emoji: "📰" },
    { question: "Summarize a news story you heard today in your own words.", hint: "Keep it brief: main event → key details → significance.", emoji: "📝" },
    { question: "What challenges do you face when listening to English news? How do you overcome them?", hint: "Common issues: speed, vocabulary, background knowledge.", emoji: "💪" },
  ],
  "listening-14": [
    { question: "How do you understand humor in English? What makes English jokes difficult?", hint: "Humor relies on: wordplay, cultural references, timing, sarcasm.", emoji: "😂" },
    { question: "Watch a comedy clip in English. What made it funny? Did you catch the punchline?", hint: "Pay attention to: setup, build-up, unexpected twist.", emoji: "🎭" },
    { question: "Why is sarcasm hard to detect in English? Give examples.", hint: "Sarcasm uses opposite meaning: 'Oh great!' (meaning terrible).", emoji: "🙄" },
    { question: "Tell a joke in English. Was the timing and delivery effective?", hint: "Jokes need: clear setup, pause before punchline, confident delivery.", emoji: "🤣" },
  ],
  "listening-15": [
    { question: "Listen to a TED Talk for 5 minutes. What was the speaker's main argument?", hint: "TED Talks have a clear structure: hook → problem → solution → call to action.", emoji: "🎙️" },
    { question: "How do great speakers use pauses and emphasis to make their message clearer?", hint: "Pauses create anticipation; emphasis highlights key words.", emoji: "⏸️" },
    { question: "What note-taking method works best for lectures? Try Cornell Notes.", hint: "Cornell: divide paper into notes, cues, and summary sections.", emoji: "📋" },
    { question: "Practice listening to an academic lecture. Identify the thesis and supporting points.", hint: "Listen for signposts: 'My main point is...', 'Furthermore...'", emoji: "🎓" },
  ],
  "listening-16": [
    { question: "How do you understand phone calls in English when you can't see the speaker?", hint: "Focus on: tone, key words, ask for repetition when needed.", emoji: "📱" },
    { question: "Practice taking a message during a phone call. What information do you need?", hint: "Get: caller's name, number, reason for calling, action needed.", emoji: "📞" },
    { question: "What makes phone conversations harder than face-to-face? How do you cope?", hint: "No body language, possible bad connection, can't lip-read.", emoji: "🤔" },
    { question: "Role-play: Call to make a reservation. Focus on listening to the options given.", hint: "Listen for: dates, times, availability, special requirements.", emoji: "📅" },
  ],
  "listening-17": [
    { question: "Watch a movie scene without subtitles. How much did you understand?", hint: "Focus on: visual context, character emotions, key phrases.", emoji: "🎬" },
    { question: "How do movies and TV shows differ in the type of English they use?", hint: "Movies: scripted, clear. TV: more casual, faster, more slang.", emoji: "📺" },
    { question: "What's easier to understand: movies or documentaries? Why?", hint: "Documentaries: clearer speech, academic vocab. Movies: slang, fast dialogue.", emoji: "🎥" },
    { question: "Practice: Watch a scene, then retell what happened to a partner.", hint: "Include: setting, characters, main events, dialogue highlights.", emoji: "🗣️" },
  ],
  "listening-18": [
    { question: "Listen to a debate or argument. Identify each side's main points.", hint: "Listen for: claims, evidence, counterarguments, conclusions.", emoji: "⚖️" },
    { question: "How can you tell which speaker has a stronger argument?", hint: "Stronger arguments have: evidence, logic, acknowledgment of other views.", emoji: "💪" },
    { question: "Practice listening for persuasion techniques in advertisements.", hint: "Watch for: emotional appeals, celebrity endorsement, statistics.", emoji: "📢" },
    { question: "Summarize both sides of a debate you listened to. Which side do you agree with?", hint: "Be fair: present both sides accurately before sharing your opinion.", emoji: "🤝" },
  ],
  "listening-19": [
    { question: "Listen to different English accents (Scottish, Australian, Indian). Rate your understanding.", hint: "Exposure is key — the more you listen, the easier it gets.", emoji: "🌐" },
    { question: "Which English accent is hardest for you to understand? How can you improve?", hint: "Find podcasts, YouTubers, or shows with that accent.", emoji: "🎧" },
    { question: "How do regional accents within the US or UK differ from standard accents?", hint: "Think about: Southern US, Cockney, Scottish, New York.", emoji: "🗺️" },
    { question: "Why is it important to understand multiple accents in today's global world?", hint: "Business, travel, media — English is spoken worldwide with many accents.", emoji: "🌍" },
  ],
  "listening-20": [
    { question: "Reflect on your listening journey. What was your biggest breakthrough moment?", hint: "Think about: a time you suddenly understood something you couldn't before.", emoji: "🎉" },
    { question: "Create a personalized listening practice plan for the next 30 days.", hint: "Include: daily minutes, content types, specific goals, progress tracking.", emoji: "📅" },
    { question: "What resources (apps, websites, podcasts) have helped your listening the most?", hint: "Share specific names and explain why they're effective.", emoji: "📱" },
    { question: "Listen to a 5-minute audio and write a complete summary. How accurate were you?", hint: "Compare your summary with the original — note what you missed.", emoji: "📝" },
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
