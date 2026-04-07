import type { LessonData } from "./lessons";

const l = (n: number, title: string, desc: string, vocab: LessonData["vocabulary"], dialogue: LessonData["dialogue"], grammar: LessonData["grammar"], vocabEx: LessonData["vocabExercises"], convEx: LessonData["conversationExercises"], gramEx: LessonData["grammarExercises"], exam: LessonData["examQuestions"], hw: LessonData["homeworkQuestions"]): LessonData => ({
  levelId: "academic-writing", levelLabel: "Academic Writing", lessonNumber: n, title, description: desc,
  vocabulary: vocab, dialogue, grammar, vocabExercises: vocabEx, conversationExercises: convEx,
  grammarExercises: gramEx, examQuestions: exam, homeworkQuestions: hw,
});

export const academicWritingLessons: Record<string, LessonData> = {
  "academic-writing-1": l(1, "Introduction to Academic Writing", "Understand what makes writing 'academic' and how it differs from casual writing.",
    [
      { word: "Thesis", meaning: "Main argument of an essay", example: "State your thesis clearly.", emoji: "📝", arabic: "أطروحة" },
      { word: "Argument", meaning: "A reasoned case for a position", example: "Support your argument with evidence.", emoji: "💬", arabic: "حجة" },
      { word: "Evidence", meaning: "Facts supporting a claim", example: "Cite evidence from the study.", emoji: "📊", arabic: "دليل" },
      { word: "Objective", meaning: "Unbiased, based on facts", example: "Academic writing should be objective.", emoji: "🎯", arabic: "موضوعي" },
      { word: "Formal", meaning: "Following proper conventions", example: "Use formal language in essays.", emoji: "👔", arabic: "رسمي" },
      { word: "Analysis", meaning: "Detailed examination", example: "Provide a thorough analysis.", emoji: "🔍", arabic: "تحليل" },
      { word: "Structure", meaning: "Organization of writing", example: "Follow a clear structure.", emoji: "🏗️", arabic: "هيكل" },
      { word: "Paragraph", meaning: "A section of writing", example: "Each paragraph needs a topic sentence.", emoji: "📄", arabic: "فقرة" },
      { word: "Draft", meaning: "A preliminary version", example: "Submit your first draft.", emoji: "✏️", arabic: "مسودة" },
      { word: "Proofread", meaning: "To check for errors", example: "Always proofread before submitting.", emoji: "🔎", arabic: "يراجع" },
    ],
    [
      { speaker: "Professor", text: "What makes academic writing different from a blog post?" },
      { speaker: "Student", text: "It's more formal and needs evidence to support claims." },
      { speaker: "Professor", text: "Exactly. And you must always cite your sources." },
      { speaker: "Student", text: "How should I structure my essay?" },
      { speaker: "Professor", text: "Introduction, body paragraphs, and conclusion. Always." },
    ],
    { title: "Academic vs. Informal Language", explanation: "Academic writing avoids contractions, slang, and first-person opinions. Use hedging language and formal vocabulary.",
      examples: [
        { sentence: "The results suggest that... (NOT: I think that...)", note: "Avoiding first person" },
        { sentence: "It is important to note... (NOT: You should know...)", note: "Impersonal structures" },
        { sentence: "The study demonstrates... (NOT: The study shows...)", note: "Formal verb choice" },
        { sentence: "Furthermore, the data indicates... (NOT: Also, the data shows...)", note: "Formal connectors" },
      ]},
    [
      { question: "A 'thesis' is:", options: ["A book", "The main argument", "A bibliography", "A summary"], correct: 1 },
      { question: "'Objective' writing is:", options: ["Personal", "Unbiased", "Creative", "Short"], correct: 1 },
    ],
    [
      { question: "Academic writing should:", options: ["Use slang", "Be objective and formal", "Include personal opinions", "Avoid evidence"], correct: 1 },
      { question: "Every paragraph needs:", options: ["A picture", "A topic sentence", "A question", "Slang"], correct: 1 },
    ],
    [
      { question: "Which is more academic?", options: ["I think this is true", "The evidence suggests", "It's obvious", "Everyone knows"], correct: 1 },
      { question: "Academic writing avoids:", options: ["Evidence", "Contractions", "Paragraphs", "Citations"], correct: 1 },
    ],
    [
      { question: "A 'draft' is:", options: ["The final version", "A preliminary version", "A citation", "A bibliography"], correct: 1 },
      { question: "'Proofread' means:", options: ["Write faster", "Check for errors", "Add images", "Shorten text"], correct: 1 },
      { question: "'Analysis' means:", options: ["Guessing", "Detailed examination", "Summarizing", "Copying"], correct: 1 },
    ],
    [
      { question: "'Structure' in writing refers to:", options: ["Font size", "Organization", "Color scheme", "Page count"], correct: 1 },
      { question: "'Evidence' supports:", options: ["Opinions only", "Claims and arguments", "Titles", "Formatting"], correct: 1 },
    ]
  ),

  "academic-writing-2": l(2, "Essay Structure", "Master the standard essay format: introduction, body, and conclusion.",
    [
      { word: "Introduction", meaning: "Opening section of an essay", example: "The introduction hooks the reader.", emoji: "🎬", arabic: "مقدمة" },
      { word: "Body paragraph", meaning: "Main section with arguments", example: "Each body paragraph covers one idea.", emoji: "📝", arabic: "فقرة رئيسية" },
      { word: "Conclusion", meaning: "Final section summarizing key points", example: "The conclusion restates the thesis.", emoji: "🏁", arabic: "خاتمة" },
      { word: "Topic sentence", meaning: "First sentence of a paragraph", example: "Start with a strong topic sentence.", emoji: "📌", arabic: "جملة افتتاحية" },
      { word: "Hook", meaning: "Opening that grabs attention", example: "Use a surprising fact as a hook.", emoji: "🎣", arabic: "جملة جاذبة" },
      { word: "Transition", meaning: "Words connecting ideas", example: "Use transitions between paragraphs.", emoji: "🔗", arabic: "كلمة ربط" },
      { word: "Restate", meaning: "To say again in different words", example: "Restate your thesis in the conclusion.", emoji: "🔄", arabic: "يعيد صياغة" },
      { word: "Outline", meaning: "A plan for your essay", example: "Create an outline before writing.", emoji: "📋", arabic: "مخطط" },
      { word: "Coherent", meaning: "Logically connected and clear", example: "Your essay must be coherent.", emoji: "🧩", arabic: "متماسك" },
      { word: "Concise", meaning: "Brief and to the point", example: "Be concise in your writing.", emoji: "✂️", arabic: "موجز" },
    ],
    [
      { speaker: "Tutor", text: "What's the first step in writing an essay?" },
      { speaker: "Student", text: "Creating an outline?" },
      { speaker: "Tutor", text: "Yes! Plan your introduction, body paragraphs, and conclusion." },
      { speaker: "Student", text: "How many body paragraphs should I have?" },
      { speaker: "Tutor", text: "At least three, each with its own topic sentence and evidence." },
    ],
    { title: "Linking Words for Structure", explanation: "Use linking words to organize ideas: Firstly/Secondly for ordering, However for contrast, Furthermore for addition, In conclusion for ending.",
      examples: [
        { sentence: "Firstly, the study examined...", note: "Ordering ideas" },
        { sentence: "However, the results were inconclusive.", note: "Showing contrast" },
        { sentence: "Furthermore, additional research supports...", note: "Adding information" },
        { sentence: "In conclusion, the evidence suggests...", note: "Concluding" },
      ]},
    [
      { question: "A 'hook' is:", options: ["The last sentence", "An attention-grabbing opener", "A conclusion", "A citation"], correct: 1 },
      { question: "'Coherent' writing is:", options: ["Confusing", "Logically connected", "Very long", "Informal"], correct: 1 },
    ],
    [
      { question: "An essay's body paragraphs each need:", options: ["A hook", "A topic sentence", "A bibliography", "A conclusion"], correct: 1 },
      { question: "In the conclusion, you should:", options: ["Add new arguments", "Restate the thesis", "Ask questions", "Use slang"], correct: 1 },
    ],
    [
      { question: "'_____, the data shows improvement.'", options: ["Firstly", "But", "Or", "Maybe"], correct: 0 },
      { question: "'The results were positive. _____, some limitations exist.'", options: ["Furthermore", "However", "Therefore", "Also"], correct: 1 },
    ],
    [
      { question: "An 'outline' is:", options: ["The final essay", "A plan for writing", "A bibliography", "A draft"], correct: 1 },
      { question: "'Concise' means:", options: ["Very long", "Brief and clear", "Complex", "Repetitive"], correct: 1 },
      { question: "A 'transition' word:", options: ["Ends an essay", "Connects ideas", "Starts an essay", "Defines terms"], correct: 1 },
    ],
    [
      { question: "The standard essay order is:", options: ["Conclusion, body, intro", "Intro, body, conclusion", "Body, intro, conclusion", "Random"], correct: 1 },
      { question: "'Restate' means:", options: ["Copy exactly", "Say in different words", "Delete", "Ignore"], correct: 1 },
    ]
  ),

  "academic-writing-3": l(3, "Thesis Statements", "Write strong, clear thesis statements that guide your essay.",
    [
      { word: "Claim", meaning: "A statement to be proven", example: "Your thesis makes a claim.", emoji: "📢", arabic: "ادعاء" },
      { word: "Debatable", meaning: "Can be argued for or against", example: "A good thesis is debatable.", emoji: "⚡", arabic: "قابل للنقاش" },
      { word: "Specific", meaning: "Clear and focused", example: "Make your thesis specific.", emoji: "🎯", arabic: "محدد" },
      { word: "Broad", meaning: "Too general or vague", example: "Avoid broad thesis statements.", emoji: "🌊", arabic: "واسع" },
      { word: "Arguable", meaning: "Worth arguing about", example: "Is your position arguable?", emoji: "💭", arabic: "قابل للجدل" },
      { word: "Position", meaning: "Your stance on an issue", example: "State your position clearly.", emoji: "🏳️", arabic: "موقف" },
      { word: "Scope", meaning: "Range covered by the thesis", example: "Narrow the scope of your thesis.", emoji: "📐", arabic: "نطاق" },
      { word: "Qualify", meaning: "To limit or add conditions", example: "Qualify your thesis with evidence.", emoji: "📎", arabic: "يُقيّد" },
      { word: "Assert", meaning: "To state confidently", example: "Assert your main argument.", emoji: "💪", arabic: "يؤكد" },
      { word: "Premise", meaning: "A base assumption", example: "The premise of the argument is...", emoji: "🧱", arabic: "فرضية" },
    ],
    [
      { speaker: "Professor", text: "Read me your thesis statement." },
      { speaker: "Student", text: "'Social media is bad.' Is that okay?" },
      { speaker: "Professor", text: "It's too broad. What specifically about social media?" },
      { speaker: "Student", text: "How about: 'Excessive social media use negatively impacts adolescent mental health.'" },
      { speaker: "Professor", text: "Much better! It's specific, debatable, and focused." },
    ],
    { title: "Hedging Language in Claims", explanation: "Academic claims use hedging to avoid absolute statements: 'may', 'might', 'could', 'tends to', 'suggests that'.",
      examples: [
        { sentence: "Social media may contribute to anxiety.", note: "'May' hedges the claim" },
        { sentence: "The data suggests that exercise improves focus.", note: "'Suggests' = cautious" },
        { sentence: "This could indicate a correlation.", note: "'Could' shows possibility" },
        { sentence: "Students tend to perform better with feedback.", note: "'Tend to' = general pattern" },
      ]},
    [
      { question: "A thesis should be:", options: ["Very broad", "Specific and debatable", "A question", "One word"], correct: 1 },
      { question: "'Debatable' means:", options: ["Obviously true", "Can be argued", "Impossible to prove", "Too long"], correct: 1 },
    ],
    [
      { question: "Which is a better thesis?", options: ["Pollution is bad.", "Air pollution in urban areas increases respiratory illness.", "I don't like pollution.", "Pollution exists."], correct: 1 },
      { question: "A thesis should NOT be:", options: ["Specific", "Debatable", "A fact everyone agrees on", "Arguable"], correct: 2 },
    ],
    [
      { question: "'The results ___ that practice helps.'", options: ["prove absolutely", "suggest", "show definitely", "demand"], correct: 1 },
      { question: "'Social media ___ affect mental health.'", options: ["definitely will", "may", "always does", "never can"], correct: 1 },
    ],
    [
      { question: "To 'assert' means:", options: ["To doubt", "To state confidently", "To question", "To delete"], correct: 1 },
      { question: "'Scope' of a thesis means:", options: ["Length", "Range covered", "Font size", "Word count"], correct: 1 },
      { question: "A 'premise' is:", options: ["A conclusion", "A base assumption", "A citation", "A heading"], correct: 1 },
    ],
    [
      { question: "'Qualify' a thesis means:", options: ["Make it longer", "Add conditions/limits", "Remove it", "Copy it"], correct: 1 },
      { question: "Hedging language shows:", options: ["Certainty", "Caution", "Anger", "Speed"], correct: 1 },
    ]
  ),

  "academic-writing-4": l(4, "Research & Sources", "Learn to find, evaluate, and use academic sources effectively.",
    [
      { word: "Citation", meaning: "Reference to a source", example: "Include a citation for every claim.", emoji: "📎", arabic: "اقتباس مرجعي" },
      { word: "Bibliography", meaning: "List of sources used", example: "Add all sources to the bibliography.", emoji: "📚", arabic: "قائمة مراجع" },
      { word: "Peer-reviewed", meaning: "Evaluated by experts", example: "Use peer-reviewed journals.", emoji: "✅", arabic: "محكّم" },
      { word: "Primary source", meaning: "Original, firsthand material", example: "Interviews are primary sources.", emoji: "📰", arabic: "مصدر أولي" },
      { word: "Secondary source", meaning: "Analysis of primary sources", example: "Textbooks are secondary sources.", emoji: "📖", arabic: "مصدر ثانوي" },
      { word: "Plagiarism", meaning: "Using others' work as your own", example: "Plagiarism is a serious offense.", emoji: "🚫", arabic: "انتحال" },
      { word: "Paraphrase", meaning: "Restate in your own words", example: "Paraphrase instead of copying.", emoji: "🔄", arabic: "إعادة صياغة" },
      { word: "Quotation", meaning: "Exact words from a source", example: "Use quotation marks for direct quotes.", emoji: "💬", arabic: "اقتباس" },
      { word: "Credible", meaning: "Trustworthy and reliable", example: "Is this source credible?", emoji: "🛡️", arabic: "موثوق" },
      { word: "Database", meaning: "Collection of academic resources", example: "Search the university database.", emoji: "💻", arabic: "قاعدة بيانات" },
    ],
    [
      { speaker: "Librarian", text: "What kind of sources do you need for your paper?" },
      { speaker: "Student", text: "Peer-reviewed articles from academic journals." },
      { speaker: "Librarian", text: "Try our database. Filter by date and relevance." },
      { speaker: "Student", text: "How do I avoid plagiarism?" },
      { speaker: "Librarian", text: "Always cite your sources and paraphrase properly." },
    ],
    { title: "Reporting Verbs for Citations", explanation: "Use reporting verbs to introduce sources: argues, claims, demonstrates, suggests, notes, observes, contends, maintains.",
      examples: [
        { sentence: "Smith (2023) argues that climate change...", note: "'Argues' for a strong position" },
        { sentence: "According to Jones, the data suggests...", note: "'According to' + author" },
        { sentence: "The study demonstrates a clear link...", note: "'Demonstrates' for proof" },
        { sentence: "As noted by Brown, the trend continues...", note: "'Noted by' for observations" },
      ]},
    [
      { question: "'Plagiarism' is:", options: ["Good practice", "Using others' work as yours", "A type of citation", "A database"], correct: 1 },
      { question: "'Peer-reviewed' means:", options: ["Self-published", "Evaluated by experts", "Student-written", "Unpublished"], correct: 1 },
    ],
    [
      { question: "To avoid plagiarism, you should:", options: ["Copy and paste", "Cite and paraphrase", "Remove sources", "Guess information"], correct: 1 },
      { question: "A 'primary source' is:", options: ["A textbook", "Original material", "A summary", "An opinion"], correct: 1 },
    ],
    [
      { question: "'Smith (2023) ___ that the theory is valid.'", options: ["argue", "argues", "arguing", "argued"], correct: 1 },
      { question: "'___ to the study, results were positive.'", options: ["According", "Because", "Since", "Although"], correct: 0 },
    ],
    [
      { question: "A 'bibliography' is:", options: ["An essay type", "A list of sources", "A paragraph", "A thesis"], correct: 1 },
      { question: "'Credible' sources are:", options: ["Biased blogs", "Trustworthy and reliable", "Social media posts", "Wikipedia only"], correct: 1 },
      { question: "'Paraphrase' means:", options: ["Copy exactly", "Restate in own words", "Delete", "Summarize in one word"], correct: 1 },
    ],
    [
      { question: "A 'quotation' uses:", options: ["Paraphrasing", "Exact words with marks", "Summary", "No citation"], correct: 1 },
      { question: "A 'database' is:", options: ["A physical library", "A collection of digital resources", "A type of essay", "A citation style"], correct: 1 },
    ]
  ),

  "academic-writing-5": l(5, "Paragraphing Skills", "Write well-structured paragraphs with clear topic sentences and supporting details.",
    [
      { word: "Unity", meaning: "One main idea per paragraph", example: "Maintain paragraph unity.", emoji: "🎯", arabic: "وحدة" },
      { word: "Coherence", meaning: "Logical flow of ideas", example: "Ensure coherence with transitions.", emoji: "🔗", arabic: "تماسك" },
      { word: "Supporting detail", meaning: "Information backing the main idea", example: "Add supporting details.", emoji: "📊", arabic: "تفاصيل داعمة" },
      { word: "Elaboration", meaning: "Expanding on an idea", example: "Your point needs more elaboration.", emoji: "📝", arabic: "توسع" },
      { word: "Concluding sentence", meaning: "Final sentence wrapping up", example: "End with a concluding sentence.", emoji: "🏁", arabic: "جملة ختامية" },
      { word: "Develop", meaning: "To expand with detail", example: "Develop your ideas fully.", emoji: "🌱", arabic: "يطور" },
      { word: "Relevant", meaning: "Directly related to the topic", example: "Include only relevant information.", emoji: "✅", arabic: "ذو صلة" },
      { word: "Logical", meaning: "Following clear reasoning", example: "Present ideas in a logical order.", emoji: "🧠", arabic: "منطقي" },
      { word: "Example", meaning: "Instance that illustrates", example: "Give an example to clarify.", emoji: "💡", arabic: "مثال" },
      { word: "Clarify", meaning: "To make something clearer", example: "Clarify your argument with data.", emoji: "🔍", arabic: "يوضح" },
    ],
    [
      { speaker: "Tutor", text: "This paragraph has three different ideas. That's too many." },
      { speaker: "Student", text: "Should I split it into separate paragraphs?" },
      { speaker: "Tutor", text: "Yes. Each paragraph should have one main idea." },
      { speaker: "Student", text: "And I need supporting details for each?" },
      { speaker: "Tutor", text: "Exactly. Topic sentence, evidence, explanation, concluding sentence." },
    ],
    { title: "PEEL Paragraph Structure", explanation: "PEEL: Point (topic sentence), Evidence (data/quotes), Explanation (analysis), Link (connect to thesis/next point).",
      examples: [
        { sentence: "Point: Regular exercise improves academic performance.", note: "Topic sentence = your claim" },
        { sentence: "Evidence: A 2022 study found a 15% improvement.", note: "Data supporting the point" },
        { sentence: "Explanation: Physical activity increases blood flow to the brain.", note: "Why the evidence matters" },
        { sentence: "Link: This supports the argument for mandatory PE classes.", note: "Connect back to thesis" },
      ]},
    [
      { question: "Paragraph 'unity' means:", options: ["Multiple ideas", "One main idea", "No topic sentence", "Random structure"], correct: 1 },
      { question: "'PEEL' stands for:", options: ["Point, Evidence, Explanation, Link", "Paragraph, Essay, Edit, Learn", "Plan, Execute, Evaluate, Learn", "Point, Edit, Examine, List"], correct: 0 },
    ],
    [
      { question: "A 'concluding sentence' appears:", options: ["At the start", "In the middle", "At the end of a paragraph", "In the title"], correct: 2 },
      { question: "'Supporting details' do what?", options: ["Contradict the main idea", "Back up the main idea", "Change the topic", "End the essay"], correct: 1 },
    ],
    [
      { question: "Which shows coherence?", options: ["Random order", "Logical flow with transitions", "No connections", "Repeating the same idea"], correct: 1 },
      { question: "'Furthermore' is a ___ word.", options: ["Contrast", "Addition", "Conclusion", "Time"], correct: 1 },
    ],
    [
      { question: "'Relevant' information is:", options: ["Off-topic", "Directly related", "Interesting but unrelated", "Personal"], correct: 1 },
      { question: "'Elaboration' means:", options: ["Shortening", "Expanding on an idea", "Deleting", "Copying"], correct: 1 },
      { question: "A topic sentence should:", options: ["Be vague", "State the paragraph's main point", "Be a question", "Use slang"], correct: 1 },
    ],
    [
      { question: "'Develop' an idea means:", options: ["Delete it", "Expand with detail", "Shorten it", "Ignore it"], correct: 1 },
      { question: "Good paragraphs need:", options: ["Only a topic sentence", "Unity and coherence", "No examples", "Random facts"], correct: 1 },
    ]
  ),

  "academic-writing-6": l(6, "APA Citation Style", "Learn the basics of APA format for in-text citations and references.",
    [
      { word: "In-text citation", meaning: "Brief reference within the text", example: "(Smith, 2023) is an in-text citation.", emoji: "📎", arabic: "اقتباس داخلي" },
      { word: "Reference list", meaning: "Full source details at the end", example: "Include all sources in the reference list.", emoji: "📚", arabic: "قائمة المراجع" },
      { word: "DOI", meaning: "Digital Object Identifier", example: "Include the DOI for online articles.", emoji: "🔗", arabic: "معرف رقمي" },
      { word: "Volume", meaning: "Issue number of a journal", example: "The article is in Volume 12.", emoji: "📰", arabic: "مجلد" },
      { word: "Author", meaning: "Writer of a source", example: "List the author's last name first.", emoji: "✍️", arabic: "مؤلف" },
      { word: "Publication date", meaning: "When the source was published", example: "Include the publication date.", emoji: "📅", arabic: "تاريخ النشر" },
      { word: "Italicize", meaning: "To slant text for emphasis", example: "Italicize journal names.", emoji: "𝐼", arabic: "يكتب بخط مائل" },
      { word: "et al.", meaning: "And others (3+ authors)", example: "Smith et al. (2023) found...", emoji: "👥", arabic: "وآخرون" },
      { word: "Retrieval", meaning: "Where/how source was accessed", example: "Note the retrieval date for websites.", emoji: "🌐", arabic: "استرجاع" },
      { word: "Format", meaning: "Standard layout rules", example: "Follow APA format guidelines.", emoji: "📏", arabic: "تنسيق" },
    ],
    [
      { speaker: "Professor", text: "Are your citations in APA format?" },
      { speaker: "Student", text: "I think so. I used (Smith, 2023) in the text." },
      { speaker: "Professor", text: "Good. And in your reference list?" },
      { speaker: "Student", text: "Smith, J. (2023). Title of article. Journal Name, 12(3), 45-60." },
      { speaker: "Professor", text: "Perfect format. Don't forget to italicize the journal name." },
    ],
    { title: "Integrating Citations Smoothly", explanation: "Integrate citations naturally using signal phrases with the author's name, or parenthetical citations at the end of the sentence.",
      examples: [
        { sentence: "According to Smith (2023), the trend continues.", note: "Signal phrase with author" },
        { sentence: "The trend has continued (Smith, 2023).", note: "Parenthetical at end" },
        { sentence: "Smith (2023) argues that education reform...", note: "Author as subject" },
        { sentence: "Recent studies support this view (Jones, 2022; Lee, 2023).", note: "Multiple sources" },
      ]},
    [
      { question: "'et al.' means:", options: ["And one", "And others", "For example", "In addition"], correct: 1 },
      { question: "In APA, you italicize:", options: ["Author names", "Journal titles", "Page numbers", "Dates"], correct: 1 },
    ],
    [
      { question: "An in-text citation includes:", options: ["Author and date", "Publisher only", "Page count", "Font size"], correct: 0 },
      { question: "The reference list goes:", options: ["At the beginning", "In footnotes", "At the end", "In the introduction"], correct: 2 },
    ],
    [
      { question: "'According ___ Smith (2023), results improved.'", options: ["for", "to", "by", "with"], correct: 1 },
      { question: "Multiple sources: '(Jones, 2022___ Lee, 2023)'", options: ["and", ";", ",", "or"], correct: 1 },
    ],
    [
      { question: "'DOI' stands for:", options: ["Document of Interest", "Digital Object Identifier", "Data Online Index", "Draft Official Issue"], correct: 1 },
      { question: "APA format requires:", options: ["MLA style", "Specific citation rules", "No citations", "Only footnotes"], correct: 1 },
      { question: "A 'reference list' contains:", options: ["Only books", "All sources used", "Only websites", "Personal notes"], correct: 1 },
    ],
    [
      { question: "'Publication date' tells:", options: ["Author's birthday", "When source was published", "Page count", "Word count"], correct: 1 },
      { question: "'Volume' refers to:", options: ["Sound level", "Journal issue number", "Page size", "Font size"], correct: 1 },
    ]
  ),

  "academic-writing-7": l(7, "Argumentative Essays", "Build a strong argument with claims, evidence, and counterarguments.",
    [
      { word: "Counterargument", meaning: "Opposing viewpoint", example: "Address the counterargument.", emoji: "🔄", arabic: "حجة مضادة" },
      { word: "Rebut", meaning: "To argue against", example: "Rebut the opposing view with data.", emoji: "⚔️", arabic: "يدحض" },
      { word: "Persuade", meaning: "To convince through reasoning", example: "Use evidence to persuade.", emoji: "🗣️", arabic: "يُقنع" },
      { word: "Credibility", meaning: "Being trustworthy", example: "Build credibility with sources.", emoji: "🛡️", arabic: "مصداقية" },
      { word: "Stance", meaning: "Position on an issue", example: "What's your stance on this?", emoji: "🏳️", arabic: "موقف" },
      { word: "Logical fallacy", meaning: "Error in reasoning", example: "Avoid logical fallacies.", emoji: "⚠️", arabic: "مغالطة منطقية" },
      { word: "Concede", meaning: "To acknowledge the other side", example: "Concede valid points gracefully.", emoji: "🤝", arabic: "يُسلّم" },
      { word: "Warrant", meaning: "Reasoning linking evidence to claim", example: "Explain the warrant clearly.", emoji: "🔗", arabic: "مبرر" },
      { word: "Bias", meaning: "Unfair preference or prejudice", example: "Check for bias in your sources.", emoji: "⚖️", arabic: "تحيز" },
      { word: "Compelling", meaning: "Strongly convincing", example: "Present compelling evidence.", emoji: "💪", arabic: "مقنع" },
    ],
    [
      { speaker: "Tutor", text: "Your essay argues for remote learning, but you ignore the downsides." },
      { speaker: "Student", text: "Should I include counterarguments?" },
      { speaker: "Tutor", text: "Yes! Acknowledge them, then rebut with evidence." },
      { speaker: "Student", text: "Like: 'While some argue isolation is an issue, studies show...'" },
      { speaker: "Tutor", text: "Exactly. That makes your argument much stronger." },
    ],
    { title: "Concession and Rebuttal Structures", explanation: "Use concession phrases to acknowledge opposing views, then rebut: 'While it is true that... nevertheless...'",
      examples: [
        { sentence: "While some argue that..., the evidence suggests otherwise.", note: "Concede then rebut" },
        { sentence: "Although this is a valid concern, research shows...", note: "Acknowledge then counter" },
        { sentence: "Opponents may claim...; however, this overlooks...", note: "Present and counter" },
        { sentence: "Admittedly, there are risks; nevertheless, the benefits outweigh them.", note: "Balance both sides" },
      ]},
    [
      { question: "A 'counterargument' is:", options: ["Your main point", "An opposing viewpoint", "A conclusion", "A citation"], correct: 1 },
      { question: "To 'rebut' means:", options: ["To agree", "To argue against", "To ignore", "To summarize"], correct: 1 },
    ],
    [
      { question: "Including counterarguments makes your essay:", options: ["Weaker", "Stronger", "Longer only", "Confusing"], correct: 1 },
      { question: "A 'logical fallacy' is:", options: ["Good reasoning", "An error in reasoning", "A strong argument", "A citation"], correct: 1 },
    ],
    [
      { question: "'While some argue X, ___ evidence suggests Y.'", options: ["the", "a", "an", "some"], correct: 0 },
      { question: "'Admittedly, there are risks; ___, benefits outweigh them.'", options: ["also", "nevertheless", "because", "since"], correct: 1 },
    ],
    [
      { question: "'Credibility' means:", options: ["Being popular", "Being trustworthy", "Being loud", "Being fast"], correct: 1 },
      { question: "'Bias' means:", options: ["Fair treatment", "Unfair preference", "Good judgment", "Balance"], correct: 1 },
      { question: "To 'concede' means:", options: ["To win", "To acknowledge the other side", "To attack", "To ignore"], correct: 1 },
    ],
    [
      { question: "A 'compelling' argument is:", options: ["Weak", "Strongly convincing", "Short", "Unrelated"], correct: 1 },
      { question: "'Stance' means:", options: ["A posture", "Position on an issue", "A paragraph type", "A citation"], correct: 1 },
    ]
  ),

  "academic-writing-8": l(8, "Compare & Contrast Essays", "Write essays that effectively compare and contrast ideas, theories, or phenomena.",
    [
      { word: "Similarity", meaning: "Something in common", example: "One similarity is the method used.", emoji: "🔗", arabic: "تشابه" },
      { word: "Difference", meaning: "Way things are unlike", example: "The main difference is cost.", emoji: "↔️", arabic: "اختلاف" },
      { word: "Criterion", meaning: "Standard for comparison", example: "Define your criteria clearly.", emoji: "📏", arabic: "معيار" },
      { word: "Whereas", meaning: "In contrast to", example: "Theory A is broad, whereas B is specific.", emoji: "⚖️", arabic: "بينما" },
      { word: "Likewise", meaning: "In the same way", example: "Likewise, both studies support...", emoji: "🤝", arabic: "بالمثل" },
      { word: "Distinct", meaning: "Clearly different", example: "The approaches are quite distinct.", emoji: "🎯", arabic: "مختلف" },
      { word: "Parallel", meaning: "Similar or corresponding", example: "There are parallel trends.", emoji: "📐", arabic: "متوازٍ" },
      { word: "Overlap", meaning: "To share common features", example: "The theories overlap in key areas.", emoji: "🔄", arabic: "تداخل" },
      { word: "Aspect", meaning: "A feature or element", example: "Compare each aspect carefully.", emoji: "🔍", arabic: "جانب" },
      { word: "Framework", meaning: "Structure for analysis", example: "Use a clear analytical framework.", emoji: "🏗️", arabic: "إطار" },
    ],
    [
      { speaker: "Professor", text: "Your essay should compare online and traditional education." },
      { speaker: "Student", text: "Should I use point-by-point or block structure?" },
      { speaker: "Professor", text: "Point-by-point works best for detailed comparison." },
      { speaker: "Student", text: "So I compare both on each criterion — cost, quality, access?" },
      { speaker: "Professor", text: "Exactly. Use 'whereas', 'similarly', and 'in contrast' to link ideas." },
    ],
    { title: "Compare/Contrast Signal Words", explanation: "Similarities: similarly, likewise, both, also, in the same way. Differences: however, in contrast, whereas, on the other hand, unlike.",
      examples: [
        { sentence: "Both methods produce reliable results.", note: "'Both' for similarities" },
        { sentence: "However, the cost differs significantly.", note: "'However' for differences" },
        { sentence: "Similarly, both studies found a correlation.", note: "'Similarly' for parallels" },
        { sentence: "Unlike Method A, Method B is faster.", note: "'Unlike' for contrasts" },
      ]},
    [
      { question: "'Whereas' shows:", options: ["Similarity", "Contrast", "Cause", "Effect"], correct: 1 },
      { question: "'Likewise' shows:", options: ["Difference", "Similarity", "Conclusion", "Cause"], correct: 1 },
    ],
    [
      { question: "Point-by-point structure compares:", options: ["One subject fully then the other", "Each criterion for both", "Only differences", "Only similarities"], correct: 1 },
      { question: "A 'criterion' for comparison is:", options: ["A random detail", "A standard for comparing", "A conclusion", "A citation"], correct: 1 },
    ],
    [
      { question: "'___ Method A, Method B is cheaper.'", options: ["Unlike", "Likely", "Because", "Since"], correct: 0 },
      { question: "'Both approaches ___ effective.'", options: ["is", "are", "was", "be"], correct: 1 },
    ],
    [
      { question: "'Overlap' means:", options: ["No connection", "Share common features", "Complete difference", "A type of essay"], correct: 1 },
      { question: "'Distinct' means:", options: ["Similar", "Clearly different", "Unclear", "Average"], correct: 1 },
      { question: "'Framework' means:", options: ["A picture frame", "Structure for analysis", "A paragraph", "A draft"], correct: 1 },
    ],
    [
      { question: "'Parallel' trends are:", options: ["Opposite", "Similar/corresponding", "Random", "Unrelated"], correct: 1 },
      { question: "An 'aspect' is:", options: ["A whole essay", "A feature or element", "A conclusion", "A title"], correct: 1 },
    ]
  ),

  "academic-writing-9": l(9, "Cause & Effect Essays", "Analyze causes and effects of events, trends, and phenomena.",
    [
      { word: "Cause", meaning: "Reason something happens", example: "Pollution is a cause of illness.", emoji: "➡️", arabic: "سبب" },
      { word: "Effect", meaning: "Result of something", example: "The effect was a 20% decline.", emoji: "📉", arabic: "أثر" },
      { word: "Consequence", meaning: "Outcome of an action", example: "Consider the consequences.", emoji: "⚡", arabic: "عاقبة" },
      { word: "Correlation", meaning: "Connection between two things", example: "There's a correlation between X and Y.", emoji: "📊", arabic: "ارتباط" },
      { word: "Trigger", meaning: "Something that starts an event", example: "What triggered the crisis?", emoji: "🔫", arabic: "مُحفّز" },
      { word: "Factor", meaning: "Element contributing to a result", example: "Several factors led to success.", emoji: "🧩", arabic: "عامل" },
      { word: "Outcome", meaning: "Final result", example: "The outcome was positive.", emoji: "🏁", arabic: "نتيجة" },
      { word: "Contribute", meaning: "To add to a result", example: "Diet contributes to health.", emoji: "➕", arabic: "يساهم" },
      { word: "Stem from", meaning: "To originate from", example: "The problem stems from poverty.", emoji: "🌱", arabic: "ينبع من" },
      { word: "Lead to", meaning: "To result in", example: "Lack of sleep leads to fatigue.", emoji: "🔗", arabic: "يؤدي إلى" },
    ],
    [
      { speaker: "Student", text: "My essay explores why students drop out of university." },
      { speaker: "Tutor", text: "Good topic. What causes have you identified?" },
      { speaker: "Student", text: "Financial difficulties, lack of support, and poor preparation." },
      { speaker: "Tutor", text: "Now explain how each factor leads to the outcome." },
      { speaker: "Student", text: "Financial stress leads to part-time work, which reduces study time." },
    ],
    { title: "Cause-Effect Language Patterns", explanation: "Use specific language to show cause-effect relationships: 'due to', 'as a result of', 'leads to', 'results in', 'consequently'.",
      examples: [
        { sentence: "Due to budget cuts, programs were eliminated.", note: "'Due to' = cause" },
        { sentence: "This results in lower student performance.", note: "'Results in' = effect" },
        { sentence: "Consequently, dropout rates have increased.", note: "'Consequently' = effect" },
        { sentence: "One contributing factor is lack of funding.", note: "Identifying a cause" },
      ]},
    [
      { question: "'Correlation' means:", options: ["Causation", "Connection between things", "No relationship", "A coincidence only"], correct: 1 },
      { question: "'Stem from' means:", options: ["To grow flowers", "To originate from", "To end", "To copy"], correct: 1 },
    ],
    [
      { question: "A cause-effect essay analyzes:", options: ["Opinions", "Why things happen and results", "Stories", "Definitions"], correct: 1 },
      { question: "Multiple causes can lead to:", options: ["No effect", "One or more effects", "Only one cause", "No outcome"], correct: 1 },
    ],
    [
      { question: "'___ budget cuts, services declined.'", options: ["Due to", "Despite", "Although", "Instead of"], correct: 0 },
      { question: "'Poor diet ___ health problems.'", options: ["leads to", "leads from", "leads by", "leads at"], correct: 0 },
    ],
    [
      { question: "A 'trigger' is:", options: ["A result", "Something that starts an event", "A summary", "A citation"], correct: 1 },
      { question: "'Contribute' means:", options: ["To take away", "To add to a result", "To block", "To ignore"], correct: 1 },
      { question: "'Consequently' introduces:", options: ["A cause", "An effect", "A similarity", "A question"], correct: 1 },
    ],
    [
      { question: "'Factor' means:", options: ["A factory", "An element contributing to result", "A machine", "A tool"], correct: 1 },
      { question: "'Outcome' means:", options: ["Beginning", "Final result", "Cause", "Process"], correct: 1 },
    ]
  ),

  "academic-writing-10": l(10, "Critical Analysis", "Develop skills to critically evaluate and analyze sources and arguments.",
    [
      { word: "Evaluate", meaning: "To assess value or quality", example: "Evaluate the argument's strengths.", emoji: "⚖️", arabic: "يُقيّم" },
      { word: "Critique", meaning: "A detailed analysis and assessment", example: "Write a critique of the article.", emoji: "📝", arabic: "نقد" },
      { word: "Assumption", meaning: "Something taken for granted", example: "Challenge underlying assumptions.", emoji: "🤔", arabic: "افتراض" },
      { word: "Implication", meaning: "A consequence or meaning not stated", example: "Consider the implications.", emoji: "💡", arabic: "مضمون" },
      { word: "Methodology", meaning: "Methods used in research", example: "Evaluate the methodology.", emoji: "🔬", arabic: "منهجية" },
      { word: "Limitation", meaning: "A restriction or shortcoming", example: "Every study has limitations.", emoji: "⚠️", arabic: "قيد" },
      { word: "Validity", meaning: "Whether findings are accurate", example: "Question the validity of results.", emoji: "✅", arabic: "صلاحية" },
      { word: "Perspective", meaning: "A particular point of view", example: "Consider multiple perspectives.", emoji: "👁️", arabic: "منظور" },
      { word: "Synthesize", meaning: "To combine ideas into a whole", example: "Synthesize information from sources.", emoji: "🔗", arabic: "يجمع" },
      { word: "Nuance", meaning: "Subtle difference in meaning", example: "Appreciate the nuance of the argument.", emoji: "🎨", arabic: "فارق دقيق" },
    ],
    [
      { speaker: "Professor", text: "Don't just summarize the article. Analyze it critically." },
      { speaker: "Student", text: "What should I focus on?" },
      { speaker: "Professor", text: "Evaluate the methodology, check for bias, and identify limitations." },
      { speaker: "Student", text: "Should I also consider the author's perspective?" },
      { speaker: "Professor", text: "Absolutely. And think about the implications of their findings." },
    ],
    { title: "Language for Critical Evaluation", explanation: "Use evaluative language: 'The author fails to consider...', 'A strength of this study is...', 'This argument overlooks...'",
      examples: [
        { sentence: "A key strength of this study is its large sample size.", note: "Positive evaluation" },
        { sentence: "However, the author fails to address confounding variables.", note: "Identifying weakness" },
        { sentence: "This argument overlooks the economic factors.", note: "Pointing out gaps" },
        { sentence: "The methodology raises questions about validity.", note: "Questioning methods" },
      ]},
    [
      { question: "To 'synthesize' means:", options: ["To copy", "To combine ideas", "To delete", "To summarize only"], correct: 1 },
      { question: "A 'limitation' is:", options: ["A strength", "A shortcoming", "A result", "A citation"], correct: 1 },
    ],
    [
      { question: "Critical analysis requires:", options: ["Just summarizing", "Evaluating strengths and weaknesses", "Copying sources", "Ignoring methodology"], correct: 1 },
      { question: "Considering 'implications' means:", options: ["Ignoring results", "Thinking about consequences", "Repeating data", "Adding citations"], correct: 1 },
    ],
    [
      { question: "'A ___ of this study is its small sample.'", options: ["strength", "limitation", "result", "method"], correct: 1 },
      { question: "'The author ___ to consider alternative explanations.'", options: ["succeeds", "fails", "tries", "wants"], correct: 1 },
    ],
    [
      { question: "'Methodology' refers to:", options: ["Results", "Methods used in research", "Conclusions", "Citations"], correct: 1 },
      { question: "'Validity' asks:", options: ["Is it popular?", "Are findings accurate?", "Is it long?", "Is it new?"], correct: 1 },
      { question: "'Nuance' means:", options: ["Obvious difference", "Subtle difference", "No difference", "Major gap"], correct: 1 },
    ],
    [
      { question: "'Assumption' is:", options: ["A proven fact", "Something taken for granted", "A conclusion", "A citation"], correct: 1 },
      { question: "A 'critique' includes:", options: ["Only praise", "Detailed analysis and assessment", "Just a summary", "Personal feelings only"], correct: 1 },
    ]
  ),

  "academic-writing-11": l(11, "Literature Reviews", "Learn to synthesize multiple sources into a comprehensive literature review.",
    [
      { word: "Literature review", meaning: "Survey of existing research", example: "Write a literature review first.", emoji: "📚", arabic: "مراجعة أدبية" },
      { word: "Gap", meaning: "Missing area in research", example: "Identify gaps in the literature.", emoji: "🕳️", arabic: "فجوة" },
      { word: "Theme", meaning: "Recurring idea across sources", example: "Organize by themes, not authors.", emoji: "🎨", arabic: "موضوع" },
      { word: "Synthesize", meaning: "To combine multiple sources", example: "Synthesize findings from all studies.", emoji: "🔗", arabic: "يجمع" },
      { word: "Chronological", meaning: "In time order", example: "Present research chronologically.", emoji: "📅", arabic: "ترتيب زمني" },
      { word: "Seminal", meaning: "Highly influential", example: "Cite seminal works in the field.", emoji: "⭐", arabic: "تأسيسي" },
      { word: "Scope", meaning: "Range of the review", example: "Define the scope of your review.", emoji: "📐", arabic: "نطاق" },
      { word: "Trend", meaning: "Direction of change over time", example: "Note trends in the research.", emoji: "📈", arabic: "اتجاه" },
      { word: "Consensus", meaning: "Agreement among researchers", example: "There's a consensus on the benefits.", emoji: "✅", arabic: "إجماع" },
      { word: "Contradictory", meaning: "Conflicting with each other", example: "Some findings are contradictory.", emoji: "⚡", arabic: "متناقض" },
    ],
    [
      { speaker: "Advisor", text: "How are you organizing your literature review?" },
      { speaker: "Student", text: "By themes: social impact, economic effects, and policy responses." },
      { speaker: "Advisor", text: "Good. Don't just list sources — synthesize them." },
      { speaker: "Student", text: "I'll also identify gaps in the current research." },
      { speaker: "Advisor", text: "That's how you justify your own study." },
    ],
    { title: "Synthesis vs. Summary", explanation: "Summary = describing one source. Synthesis = combining multiple sources to show patterns, agreements, and disagreements.",
      examples: [
        { sentence: "Several studies (Smith, 2020; Jones, 2021) support this finding.", note: "Combining multiple sources" },
        { sentence: "While Smith argues X, Jones presents contradictory evidence.", note: "Showing disagreement" },
        { sentence: "A recurring theme in the literature is...", note: "Identifying patterns" },
        { sentence: "There is a gap in research regarding...", note: "Identifying missing research" },
      ]},
    [
      { question: "A literature review surveys:", options: ["One source", "Existing research on a topic", "Only your own work", "Textbooks only"], correct: 1 },
      { question: "A 'gap' in research is:", options: ["A mistake", "A missing area", "A duplicate", "A trend"], correct: 1 },
    ],
    [
      { question: "Synthesis involves:", options: ["Listing sources", "Combining multiple sources", "Copying quotes", "Ignoring patterns"], correct: 1 },
      { question: "Organize by 'themes' means:", options: ["By author name", "By recurring ideas", "By date only", "By length"], correct: 1 },
    ],
    [
      { question: "'Several studies ___ this finding.'", options: ["supports", "support", "supporting", "supported"], correct: 1 },
      { question: "'There is a ___ in research regarding...'", options: ["gap", "theme", "trend", "source"], correct: 0 },
    ],
    [
      { question: "A 'seminal' work is:", options: ["New and unproven", "Highly influential", "Minor", "Unpublished"], correct: 1 },
      { question: "'Contradictory' findings are:", options: ["Identical", "Conflicting", "Missing", "Irrelevant"], correct: 1 },
      { question: "'Consensus' means:", options: ["Disagreement", "Agreement among researchers", "A survey", "A gap"], correct: 1 },
    ],
    [
      { question: "'Chronological' order is:", options: ["Random", "By importance", "By time", "By author"], correct: 2 },
      { question: "A 'trend' shows:", options: ["No change", "Direction of change", "A single event", "A mistake"], correct: 1 },
    ]
  ),

  "academic-writing-12": l(12, "Research Proposals", "Write clear research proposals with objectives, methodology, and significance.",
    [
      { word: "Proposal", meaning: "Plan for a research project", example: "Submit your research proposal.", emoji: "📋", arabic: "مقترح بحثي" },
      { word: "Hypothesis", meaning: "A testable prediction", example: "State your hypothesis clearly.", emoji: "🔬", arabic: "فرضية" },
      { word: "Methodology", meaning: "Research methods to be used", example: "Describe your methodology.", emoji: "🛠️", arabic: "منهجية" },
      { word: "Significance", meaning: "Importance of the research", example: "Explain the significance.", emoji: "⭐", arabic: "أهمية" },
      { word: "Feasibility", meaning: "Whether the plan is achievable", example: "Assess the feasibility.", emoji: "✅", arabic: "جدوى" },
      { word: "Timeline", meaning: "Schedule for the project", example: "Include a realistic timeline.", emoji: "📅", arabic: "جدول زمني" },
      { word: "Scope", meaning: "Boundaries of the research", example: "Define the scope clearly.", emoji: "📐", arabic: "نطاق" },
      { word: "Rationale", meaning: "Reason behind the research", example: "Provide a strong rationale.", emoji: "💡", arabic: "مبررات" },
      { word: "Ethical", meaning: "Following moral principles", example: "Address ethical considerations.", emoji: "⚖️", arabic: "أخلاقي" },
      { word: "Sample", meaning: "Group selected for study", example: "The sample includes 200 students.", emoji: "👥", arabic: "عينة" },
    ],
    [
      { speaker: "Advisor", text: "Tell me about your research proposal." },
      { speaker: "Student", text: "I want to study the impact of sleep on academic performance." },
      { speaker: "Advisor", text: "What's your hypothesis?" },
      { speaker: "Student", text: "Students who sleep 7+ hours perform 15% better on exams." },
      { speaker: "Advisor", text: "Good. Now describe your methodology and sample size." },
    ],
    { title: "Future Forms in Proposals", explanation: "Use future forms to describe planned research: 'This study will examine...', 'The researcher aims to...', 'Data will be collected...'",
      examples: [
        { sentence: "This study will examine the relationship between...", note: "'Will' for planned actions" },
        { sentence: "Data will be collected through surveys.", note: "Passive future for methods" },
        { sentence: "The findings are expected to contribute to...", note: "Expected outcomes" },
        { sentence: "The project aims to address the gap in...", note: "'Aims to' for objectives" },
      ]},
    [
      { question: "A 'hypothesis' is:", options: ["A proven fact", "A testable prediction", "A conclusion", "A summary"], correct: 1 },
      { question: "'Feasibility' means:", options: ["Impossibility", "Whether achievable", "Cost only", "Importance"], correct: 1 },
    ],
    [
      { question: "A proposal includes:", options: ["Only results", "Objectives and methodology", "Just a title", "Only a bibliography"], correct: 1 },
      { question: "'Rationale' explains:", options: ["Results", "Why the research matters", "The timeline", "The budget"], correct: 1 },
    ],
    [
      { question: "'This study ___ examine the effects of...'", options: ["would", "will", "was", "had"], correct: 1 },
      { question: "'Data ___ be collected through interviews.'", options: ["would", "will", "is", "was"], correct: 1 },
    ],
    [
      { question: "A 'sample' is:", options: ["The whole population", "A group selected for study", "A research tool", "A bibliography"], correct: 1 },
      { question: "'Ethical' considerations include:", options: ["Budget only", "Participant consent and privacy", "Publication only", "Font choice"], correct: 1 },
      { question: "'Significance' explains:", options: ["How long it takes", "Why the research is important", "Who funds it", "Where it's published"], correct: 1 },
    ],
    [
      { question: "A 'timeline' shows:", options: ["Results", "Schedule for the project", "The bibliography", "The hypothesis"], correct: 1 },
      { question: "Research 'scope' defines:", options: ["Everything possible", "Boundaries of the study", "Only the budget", "The conclusion"], correct: 1 },
    ]
  ),

  "academic-writing-13": l(13, "Data Presentation", "Present data, statistics, and findings clearly in academic writing.",
    [
      { word: "Statistics", meaning: "Numerical data and analysis", example: "The statistics support our claim.", emoji: "📊", arabic: "إحصائيات" },
      { word: "Graph", meaning: "Visual representation of data", example: "See the graph on page 5.", emoji: "📈", arabic: "رسم بياني" },
      { word: "Table", meaning: "Data organized in rows/columns", example: "Table 1 shows the results.", emoji: "📋", arabic: "جدول" },
      { word: "Figure", meaning: "An image, chart, or diagram", example: "As shown in Figure 2...", emoji: "🖼️", arabic: "شكل" },
      { word: "Significant", meaning: "Statistically meaningful", example: "The difference was significant.", emoji: "⭐", arabic: "ذو دلالة" },
      { word: "Trend", meaning: "General direction of data", example: "The trend shows increase.", emoji: "📈", arabic: "اتجاه" },
      { word: "Percentage", meaning: "Proportion out of 100", example: "85% of respondents agreed.", emoji: "💯", arabic: "نسبة مئوية" },
      { word: "Variable", meaning: "Factor that can change", example: "Control all variables.", emoji: "🔧", arabic: "متغير" },
      { word: "Mean", meaning: "Average value", example: "The mean score was 72.", emoji: "📐", arabic: "متوسط" },
      { word: "Distribution", meaning: "How data is spread", example: "Check the data distribution.", emoji: "📊", arabic: "توزيع" },
    ],
    [
      { speaker: "Professor", text: "How will you present your findings?" },
      { speaker: "Student", text: "I'll use a bar graph for comparisons and a table for raw data." },
      { speaker: "Professor", text: "Good. Always label your figures and reference them in the text." },
      { speaker: "Student", text: "Like 'As shown in Figure 1, the trend is upward'?" },
      { speaker: "Professor", text: "Exactly. Never include a figure without discussing it." },
    ],
    { title: "Describing Data and Trends", explanation: "Use precise language for data: 'increased sharply', 'remained stable', 'declined gradually', 'peaked at', 'fluctuated between'.",
      examples: [
        { sentence: "Sales increased sharply in Q3.", note: "'Sharply' = dramatic increase" },
        { sentence: "The rate remained stable throughout 2023.", note: "'Remained stable' = no change" },
        { sentence: "Enrollment peaked at 5,000 in September.", note: "'Peaked at' = highest point" },
        { sentence: "Values fluctuated between 20 and 30.", note: "'Fluctuated' = went up and down" },
      ]},
    [
      { question: "'Significant' in statistics means:", options: ["Important personally", "Statistically meaningful", "Very large", "Unexpected"], correct: 1 },
      { question: "The 'mean' is:", options: ["The middle value", "The average", "The highest value", "The most common"], correct: 1 },
    ],
    [
      { question: "Figures in a paper should be:", options: ["Unlabeled", "Labeled and referenced in text", "Hidden", "Optional"], correct: 1 },
      { question: "'Fluctuated' means:", options: ["Stayed the same", "Went up and down", "Only increased", "Disappeared"], correct: 1 },
    ],
    [
      { question: "'Sales ___ sharply in Q3.'", options: ["increase", "increased", "increasing", "increases"], correct: 1 },
      { question: "'As ___ in Figure 1...'", options: ["showed", "shown", "showing", "shows"], correct: 1 },
    ],
    [
      { question: "A 'variable' is:", options: ["A constant", "A factor that changes", "A result", "A graph type"], correct: 1 },
      { question: "'Distribution' shows:", options: ["How data is spread", "The average only", "One data point", "The title"], correct: 0 },
      { question: "'Peaked at' means:", options: ["Reached the lowest", "Reached the highest", "Stayed stable", "Disappeared"], correct: 1 },
    ],
    [
      { question: "A 'table' organizes data in:", options: ["Paragraphs", "Rows and columns", "Bullet points", "Footnotes"], correct: 1 },
      { question: "'Percentage' is:", options: ["A fraction", "Proportion out of 100", "A decimal", "A ratio only"], correct: 1 },
    ]
  ),

  "academic-writing-14": l(14, "Abstract Writing", "Write clear, concise abstracts that summarize your research effectively.",
    [
      { word: "Abstract", meaning: "Brief summary of a paper", example: "Write the abstract last.", emoji: "📄", arabic: "ملخص" },
      { word: "Purpose", meaning: "Aim of the research", example: "State the purpose clearly.", emoji: "🎯", arabic: "غرض" },
      { word: "Findings", meaning: "Results discovered", example: "Summarize key findings.", emoji: "🔍", arabic: "نتائج" },
      { word: "Keywords", meaning: "Important searchable terms", example: "Include 5 keywords.", emoji: "🔑", arabic: "كلمات مفتاحية" },
      { word: "Concise", meaning: "Brief and clear", example: "Keep the abstract concise.", emoji: "✂️", arabic: "موجز" },
      { word: "Scope", meaning: "What the study covers", example: "Define the scope briefly.", emoji: "📐", arabic: "نطاق" },
      { word: "Implication", meaning: "What the results mean", example: "Discuss implications briefly.", emoji: "💡", arabic: "دلالة" },
      { word: "Background", meaning: "Context for the research", example: "Provide brief background.", emoji: "📚", arabic: "خلفية" },
      { word: "Method", meaning: "How the research was done", example: "Briefly describe your method.", emoji: "🔬", arabic: "طريقة" },
      { word: "Word limit", meaning: "Maximum words allowed", example: "Stay within the word limit.", emoji: "📏", arabic: "حد الكلمات" },
    ],
    [
      { speaker: "Advisor", text: "Your abstract is too long. It should be 150-250 words." },
      { speaker: "Student", text: "What should I include?" },
      { speaker: "Advisor", text: "Purpose, methods, key findings, and implications — that's it." },
      { speaker: "Student", text: "Should I write it before or after the paper?" },
      { speaker: "Advisor", text: "Always write the abstract last, even though it appears first." },
    ],
    { title: "Past Tense for Completed Research", explanation: "In abstracts, use past tense for methods and results (what was done), present tense for implications (what it means now).",
      examples: [
        { sentence: "This study examined the effects of...", note: "Past tense for what was studied" },
        { sentence: "Data were collected from 500 participants.", note: "Past passive for methods" },
        { sentence: "Results indicated a significant correlation.", note: "Past tense for findings" },
        { sentence: "These findings suggest that further research is needed.", note: "Present for implications" },
      ]},
    [
      { question: "An abstract is:", options: ["The full paper", "A brief summary", "The bibliography", "The introduction"], correct: 1 },
      { question: "Abstracts are typically:", options: ["5000 words", "150-250 words", "50 words", "1000 words"], correct: 1 },
    ],
    [
      { question: "Write the abstract:", options: ["First", "Last", "In the middle", "Never"], correct: 1 },
      { question: "An abstract includes:", options: ["Only methods", "Purpose, methods, findings, implications", "Only conclusions", "Just keywords"], correct: 1 },
    ],
    [
      { question: "'This study ___ the effects of sleep.'", options: ["examine", "examined", "examining", "examines"], correct: 1 },
      { question: "'These findings ___ further research is needed.'", options: ["suggested", "suggest", "suggesting", "suggests"], correct: 1 },
    ],
    [
      { question: "'Keywords' help with:", options: ["Formatting", "Searchability", "Grammar", "Spelling"], correct: 1 },
      { question: "'Implications' describe:", options: ["Methods used", "What results mean", "The hypothesis", "The abstract"], correct: 1 },
      { question: "An abstract provides:", options: ["New arguments", "Overview of the entire paper", "Only data", "Personal opinions"], correct: 1 },
    ],
    [
      { question: "'Concise' writing is:", options: ["Very long", "Brief and clear", "Repetitive", "Complex"], correct: 1 },
      { question: "The 'word limit' is:", options: ["A suggestion", "Maximum words allowed", "Minimum words", "Optional"], correct: 1 },
    ]
  ),

  "academic-writing-15": l(15, "Academic Vocabulary", "Build a strong academic vocabulary for formal writing.",
    [
      { word: "Demonstrate", meaning: "To show clearly", example: "The data demonstrate a trend.", emoji: "📊", arabic: "يُظهر" },
      { word: "Investigate", meaning: "To examine systematically", example: "We investigated the cause.", emoji: "🔬", arabic: "يحقق" },
      { word: "Establish", meaning: "To set up or prove", example: "Establish credibility early.", emoji: "🏗️", arabic: "يُثبت" },
      { word: "Indicate", meaning: "To point out or suggest", example: "Results indicate improvement.", emoji: "👉", arabic: "يشير" },
      { word: "Comprise", meaning: "To consist of", example: "The study comprises three parts.", emoji: "📦", arabic: "يتكون من" },
      { word: "Facilitate", meaning: "To make easier", example: "Technology facilitates learning.", emoji: "🔧", arabic: "يُسهّل" },
      { word: "Enhance", meaning: "To improve or increase", example: "Feedback enhances performance.", emoji: "⬆️", arabic: "يُعزز" },
      { word: "Implement", meaning: "To put into action", example: "Implement the new strategy.", emoji: "🚀", arabic: "يُنفّذ" },
      { word: "Predominant", meaning: "Main or most common", example: "The predominant view is...", emoji: "👑", arabic: "سائد" },
      { word: "Subsequent", meaning: "Coming after", example: "Subsequent studies confirmed...", emoji: "➡️", arabic: "لاحق" },
    ],
    [
      { speaker: "Professor", text: "Your essay uses too many simple words. Try academic vocabulary." },
      { speaker: "Student", text: "Instead of 'show', what should I use?" },
      { speaker: "Professor", text: "'Demonstrate', 'indicate', or 'illustrate' — depending on context." },
      { speaker: "Student", text: "And instead of 'help'?" },
      { speaker: "Professor", text: "'Facilitate', 'enable', or 'enhance'." },
    ],
    { title: "Nominalisation", explanation: "Convert verbs/adjectives to nouns for formal writing: 'develop → development', 'important → importance', 'fail → failure'.",
      examples: [
        { sentence: "The development of new methods... (NOT: Developing new methods...)", note: "Noun form is more formal" },
        { sentence: "The significance of this finding...", note: "'Significant → significance'" },
        { sentence: "An analysis of the data reveals...", note: "'Analyse → analysis'" },
        { sentence: "The implementation of the policy led to...", note: "'Implement → implementation'" },
      ]},
    [
      { question: "'Facilitate' means:", options: ["To make harder", "To make easier", "To stop", "To question"], correct: 1 },
      { question: "'Subsequent' means:", options: ["Before", "Coming after", "At the same time", "Never"], correct: 1 },
    ],
    [
      { question: "Academic alternative to 'show' is:", options: ["Display", "Demonstrate", "Tell", "Point"], correct: 1 },
      { question: "Academic alternative to 'help' is:", options: ["Aid", "Facilitate", "Fix", "Solve"], correct: 1 },
    ],
    [
      { question: "Nominalisation of 'develop' is:", options: ["Developer", "Development", "Developing", "Developed"], correct: 1 },
      { question: "Nominalisation of 'analyse' is:", options: ["Analyser", "Analytical", "Analysis", "Analysing"], correct: 2 },
    ],
    [
      { question: "'Comprise' means:", options: ["To exclude", "To consist of", "To compare", "To compete"], correct: 1 },
      { question: "'Predominant' means:", options: ["Minor", "Main or most common", "Rare", "New"], correct: 1 },
      { question: "'Enhance' means:", options: ["To reduce", "To improve", "To remove", "To keep same"], correct: 1 },
    ],
    [
      { question: "'Implement' means:", options: ["To plan", "To put into action", "To study", "To review"], correct: 1 },
      { question: "'Establish' can mean:", options: ["To destroy", "To prove or set up", "To ignore", "To delay"], correct: 1 },
    ]
  ),

  "academic-writing-16": l(16, "Editing & Proofreading", "Polish your academic writing through systematic editing and proofreading.",
    [
      { word: "Revise", meaning: "To change and improve", example: "Revise your draft thoroughly.", emoji: "✏️", arabic: "يُراجع" },
      { word: "Proofread", meaning: "To check for errors", example: "Proofread for grammar mistakes.", emoji: "🔎", arabic: "يُدقق" },
      { word: "Redundancy", meaning: "Unnecessary repetition", example: "Remove all redundancy.", emoji: "🔁", arabic: "تكرار" },
      { word: "Clarity", meaning: "Being clear and easy to understand", example: "Write with clarity.", emoji: "💎", arabic: "وضوح" },
      { word: "Consistency", meaning: "Using the same style throughout", example: "Maintain consistency in format.", emoji: "📏", arabic: "اتساق" },
      { word: "Typo", meaning: "A typing error", example: "Fix all typos before submission.", emoji: "❌", arabic: "خطأ مطبعي" },
      { word: "Wordy", meaning: "Using too many words", example: "This sentence is too wordy.", emoji: "📝", arabic: "مُطنب" },
      { word: "Tighten", meaning: "To make writing more concise", example: "Tighten your prose.", emoji: "🔧", arabic: "يختصر" },
      { word: "Flow", meaning: "Smooth progression of ideas", example: "Improve the essay's flow.", emoji: "🌊", arabic: "انسياب" },
      { word: "Feedback", meaning: "Comments for improvement", example: "Incorporate peer feedback.", emoji: "💬", arabic: "ملاحظات" },
    ],
    [
      { speaker: "Peer", text: "I noticed some redundancy in your second paragraph." },
      { speaker: "Writer", text: "Really? Where?" },
      { speaker: "Peer", text: "You said 'important and significant' — they mean the same thing." },
      { speaker: "Writer", text: "Good catch! I'll also check for consistency in my formatting." },
      { speaker: "Peer", text: "And proofread for typos — I spotted two in the introduction." },
    ],
    { title: "Common Academic Writing Errors", explanation: "Avoid: run-on sentences, comma splices, subject-verb disagreement, dangling modifiers, and wordiness.",
      examples: [
        { sentence: "WRONG: The study shows results, they are positive.", note: "Comma splice — use '; ' or 'and'" },
        { sentence: "RIGHT: The study shows results; they are positive.", note: "Semicolon fixes the splice" },
        { sentence: "WRONG: The data shows... RIGHT: The data show...", note: "'Data' is plural" },
        { sentence: "WORDY: 'Due to the fact that' → BETTER: 'Because'", note: "Reduce wordiness" },
      ]},
    [
      { question: "'Redundancy' means:", options: ["Creativity", "Unnecessary repetition", "Good writing", "Formal style"], correct: 1 },
      { question: "A 'typo' is:", options: ["A writing style", "A typing error", "A paragraph type", "A citation"], correct: 1 },
    ],
    [
      { question: "Proofreading checks for:", options: ["New ideas", "Errors and mistakes", "More content", "Shorter text"], correct: 1 },
      { question: "'Consistency' in writing means:", options: ["Changing styles", "Same style throughout", "Using different fonts", "Varying tone"], correct: 1 },
    ],
    [
      { question: "'The data ___ significant results.' (data is plural)", options: ["shows", "show", "showing", "showed"], correct: 1 },
      { question: "Replace 'due to the fact that' with:", options: ["However", "Because", "Although", "Nevertheless"], correct: 1 },
    ],
    [
      { question: "To 'tighten' writing means:", options: ["Make it longer", "Make it more concise", "Add more words", "Change the topic"], correct: 1 },
      { question: "'Flow' in writing means:", options: ["Random order", "Smooth progression", "Repetition", "Complexity"], correct: 1 },
      { question: "Peer feedback helps you:", options: ["Copy others", "Identify weaknesses", "Avoid revision", "Skip proofreading"], correct: 1 },
    ],
    [
      { question: "A comma splice is:", options: ["Correct punctuation", "Joining sentences with only a comma", "A type of citation", "A paragraph style"], correct: 1 },
      { question: "'Clarity' means:", options: ["Complexity", "Being clear", "Being creative", "Being long"], correct: 1 },
    ]
  ),

  "academic-writing-17": l(17, "Research Methodology Writing", "Describe research methods clearly and accurately in academic papers.",
    [
      { word: "Qualitative", meaning: "Non-numerical data analysis", example: "We used qualitative interviews.", emoji: "💬", arabic: "نوعي" },
      { word: "Quantitative", meaning: "Numerical data analysis", example: "Quantitative data was collected.", emoji: "📊", arabic: "كمّي" },
      { word: "Participant", meaning: "Person in a study", example: "50 participants were recruited.", emoji: "👤", arabic: "مشارك" },
      { word: "Survey", meaning: "Questionnaire for data collection", example: "A survey was distributed.", emoji: "📋", arabic: "استبيان" },
      { word: "Control group", meaning: "Group not receiving treatment", example: "The control group received a placebo.", emoji: "🔬", arabic: "مجموعة ضابطة" },
      { word: "Sampling", meaning: "Selecting participants", example: "Random sampling was used.", emoji: "🎲", arabic: "أخذ عينات" },
      { word: "Instrument", meaning: "Tool for data collection", example: "The survey instrument was validated.", emoji: "🛠️", arabic: "أداة" },
      { word: "Validity", meaning: "Accuracy of measurement", example: "Ensure the instrument's validity.", emoji: "✅", arabic: "صلاحية" },
      { word: "Reliability", meaning: "Consistency of results", example: "Test-retest reliability was high.", emoji: "🔄", arabic: "موثوقية" },
      { word: "Ethical approval", meaning: "Permission for human research", example: "Ethical approval was obtained.", emoji: "📜", arabic: "موافقة أخلاقية" },
    ],
    [
      { speaker: "Advisor", text: "How will you describe your methodology?" },
      { speaker: "Student", text: "I'll explain the research design, sampling, and instruments." },
      { speaker: "Advisor", text: "Use passive voice: 'Data were collected through...'." },
      { speaker: "Student", text: "Should I mention ethical approval?" },
      { speaker: "Advisor", text: "Absolutely. Always state that ethical approval was obtained." },
    ],
    { title: "Passive Voice in Methodology", explanation: "Methodology sections primarily use passive voice to focus on the process, not the researcher: 'Data were collected' not 'I collected data'.",
      examples: [
        { sentence: "A questionnaire was distributed to 200 students.", note: "Passive focuses on action" },
        { sentence: "Participants were randomly assigned to groups.", note: "Passive for procedure" },
        { sentence: "Data were analysed using SPSS software.", note: "Passive for analysis" },
        { sentence: "Informed consent was obtained from all participants.", note: "Passive for ethics" },
      ]},
    [
      { question: "'Qualitative' research uses:", options: ["Numbers only", "Non-numerical data", "Statistics only", "Calculations"], correct: 1 },
      { question: "'Reliability' means:", options: ["Accuracy", "Consistency of results", "Speed", "Validity"], correct: 1 },
    ],
    [
      { question: "A 'control group' does not receive:", options: ["Food", "The treatment", "Information", "Consent"], correct: 1 },
      { question: "'Random sampling' means:", options: ["Choosing friends", "Selecting participants randomly", "Using a small group", "Ignoring selection"], correct: 1 },
    ],
    [
      { question: "'Data ___ collected through surveys.'", options: ["was", "were", "is", "are"], correct: 1 },
      { question: "'Participants ___ randomly assigned.'", options: ["was", "were", "is", "are"], correct: 1 },
    ],
    [
      { question: "An 'instrument' in research is:", options: ["A musical tool", "A data collection tool", "A calculator", "A textbook"], correct: 1 },
      { question: "'Validity' ensures:", options: ["Speed", "Accuracy of measurement", "Reliability", "Sample size"], correct: 1 },
      { question: "'Ethical approval' is needed for:", options: ["All papers", "Research involving humans", "Math only", "Reviews"], correct: 1 },
    ],
    [
      { question: "Methodology sections use:", options: ["First person", "Passive voice", "Slang", "Contractions"], correct: 1 },
      { question: "A 'survey' collects:", options: ["Physical samples", "Questionnaire responses", "Lab results", "Field observations only"], correct: 1 },
    ]
  ),

  "academic-writing-18": l(18, "Discussion & Conclusion Writing", "Write effective discussion and conclusion sections for research papers.",
    [
      { word: "Interpret", meaning: "To explain the meaning of results", example: "Interpret the findings carefully.", emoji: "🔍", arabic: "يُفسّر" },
      { word: "Implication", meaning: "What the results mean for practice", example: "Discuss practical implications.", emoji: "💡", arabic: "دلالة" },
      { word: "Limitation", meaning: "Weakness of the study", example: "Acknowledge limitations.", emoji: "⚠️", arabic: "قيد" },
      { word: "Recommendation", meaning: "Suggestion for future action", example: "Make recommendations for practice.", emoji: "📌", arabic: "توصية" },
      { word: "Generalize", meaning: "To apply broadly", example: "Can we generalize these results?", emoji: "🌐", arabic: "يُعمّم" },
      { word: "Consistent", meaning: "In agreement with", example: "Results are consistent with prior research.", emoji: "✅", arabic: "متسق" },
      { word: "Contradict", meaning: "To go against", example: "Our findings contradict Smith's study.", emoji: "⚡", arabic: "يناقض" },
      { word: "Contribution", meaning: "What the study adds to knowledge", example: "State the paper's contribution.", emoji: "🎁", arabic: "مساهمة" },
      { word: "Warrant", meaning: "To justify or deserve", example: "These results warrant further study.", emoji: "📢", arabic: "يستدعي" },
      { word: "Reiterate", meaning: "To state again for emphasis", example: "Reiterate key findings.", emoji: "🔄", arabic: "يُكرر" },
    ],
    [
      { speaker: "Advisor", text: "Your results section is strong, but the discussion is weak." },
      { speaker: "Student", text: "What should I add?" },
      { speaker: "Advisor", text: "Interpret your findings. How do they compare to existing research?" },
      { speaker: "Student", text: "I'll also add limitations and recommendations." },
      { speaker: "Advisor", text: "Don't forget to state the study's contribution to the field." },
    ],
    { title: "Hedging in Discussions", explanation: "Use hedging to discuss findings cautiously: 'This may suggest...', 'It is possible that...', 'The results appear to indicate...'",
      examples: [
        { sentence: "These results may suggest a causal relationship.", note: "'May suggest' = cautious" },
        { sentence: "It is possible that external factors influenced...", note: "'It is possible' = uncertainty" },
        { sentence: "The findings appear to support the hypothesis.", note: "'Appear to' = tentative" },
        { sentence: "This could be attributed to sample size limitations.", note: "'Could be' = possible explanation" },
      ]},
    [
      { question: "To 'interpret' results means:", options: ["To translate", "To explain meaning", "To ignore", "To collect"], correct: 1 },
      { question: "'Warrant' means:", options: ["To prevent", "To justify/deserve", "To stop", "To question"], correct: 1 },
    ],
    [
      { question: "A discussion section should:", options: ["Just repeat results", "Interpret and compare findings", "Add new data", "Only list limitations"], correct: 1 },
      { question: "'Consistent with prior research' means:", options: ["Contradicts it", "Agrees with it", "Ignores it", "Copies it"], correct: 1 },
    ],
    [
      { question: "'These results ___ suggest a link.'", options: ["definitely", "may", "absolutely", "always"], correct: 1 },
      { question: "'It ___ possible that other factors...'", options: ["are", "is", "were", "be"], correct: 1 },
    ],
    [
      { question: "A 'limitation' is:", options: ["A strength", "A weakness of the study", "A finding", "A citation"], correct: 1 },
      { question: "'Recommendation' suggests:", options: ["Past actions", "Future actions", "No action", "Current results"], correct: 1 },
      { question: "A study's 'contribution' is:", options: ["Its cost", "What it adds to knowledge", "Its length", "Its citations"], correct: 1 },
    ],
    [
      { question: "To 'generalize' means:", options: ["Be specific", "Apply broadly", "Ignore", "Limit"], correct: 1 },
      { question: "'Reiterate' means:", options: ["To delete", "To state again", "To question", "To change"], correct: 1 },
    ]
  ),

  "academic-writing-19": l(19, "Peer Review Process", "Understand and participate in the academic peer review process.",
    [
      { word: "Peer review", meaning: "Evaluation by fellow scholars", example: "Submit for peer review.", emoji: "👥", arabic: "مراجعة الأقران" },
      { word: "Referee", meaning: "Expert reviewer of a paper", example: "The referee suggested revisions.", emoji: "🧑‍🔬", arabic: "مراجع" },
      { word: "Revision", meaning: "Changes based on feedback", example: "Complete the revisions by Friday.", emoji: "✏️", arabic: "مراجعة" },
      { word: "Manuscript", meaning: "Draft of a paper for review", example: "Submit your manuscript online.", emoji: "📄", arabic: "مخطوطة" },
      { word: "Accept", meaning: "Paper approved for publication", example: "The paper was accepted!", emoji: "✅", arabic: "قبول" },
      { word: "Reject", meaning: "Paper not accepted", example: "The paper was rejected.", emoji: "❌", arabic: "رفض" },
      { word: "Minor revisions", meaning: "Small changes needed", example: "Only minor revisions required.", emoji: "🔧", arabic: "تعديلات طفيفة" },
      { word: "Major revisions", meaning: "Significant changes needed", example: "Major revisions were requested.", emoji: "🔨", arabic: "تعديلات كبيرة" },
      { word: "Constructive", meaning: "Helpful and positive", example: "Give constructive feedback.", emoji: "🌱", arabic: "بنّاء" },
      { word: "Blind review", meaning: "Reviewer doesn't know author", example: "It's a double-blind review.", emoji: "🙈", arabic: "مراجعة عمياء" },
    ],
    [
      { speaker: "Editor", text: "Your manuscript has been reviewed. Two referees responded." },
      { speaker: "Author", text: "What's the decision?" },
      { speaker: "Editor", text: "Accept with minor revisions. Address the comments within two weeks." },
      { speaker: "Author", text: "I'll revise and submit a response letter." },
      { speaker: "Editor", text: "Great. Respond to each comment point by point." },
    ],
    { title: "Responding to Reviewer Comments", explanation: "Use professional language when responding: 'We appreciate the reviewer's comment...', 'As suggested, we have revised...', 'We respectfully disagree because...'",
      examples: [
        { sentence: "We thank the reviewer for this insightful comment.", note: "Acknowledging feedback" },
        { sentence: "As suggested, we have revised Section 3.", note: "Showing compliance" },
        { sentence: "We respectfully disagree, as our data shows...", note: "Polite disagreement" },
        { sentence: "This has been addressed in the revised manuscript.", note: "Confirming changes" },
      ]},
    [
      { question: "A 'manuscript' is:", options: ["A published book", "A draft for review", "A textbook", "A citation"], correct: 1 },
      { question: "'Blind review' means:", options: ["Reviewer is blind", "Reviewer doesn't know the author", "Author doesn't write", "No review"], correct: 1 },
    ],
    [
      { question: "'Major revisions' means:", options: ["No changes", "Significant changes needed", "Paper is perfect", "Rejected"], correct: 1 },
      { question: "Constructive feedback is:", options: ["Negative only", "Helpful and positive", "Ignoring problems", "Harsh"], correct: 1 },
    ],
    [
      { question: "'We ___ the reviewer for this comment.'", options: ["blame", "thank", "ignore", "question"], correct: 1 },
      { question: "'As ___, we have revised Section 3.'", options: ["demanded", "suggested", "forced", "required"], correct: 1 },
    ],
    [
      { question: "A 'referee' is:", options: ["A sports official", "An expert reviewer", "The author", "The editor"], correct: 1 },
      { question: "'Revision' means:", options: ["Final version", "Changes based on feedback", "First draft", "Publication"], correct: 1 },
      { question: "When disagreeing with a reviewer:", options: ["Be rude", "Be respectful with evidence", "Ignore the comment", "Delete the section"], correct: 1 },
    ],
    [
      { question: "Peer review ensures:", options: ["Fast publication", "Quality and accuracy", "Short papers", "No revisions"], correct: 1 },
      { question: "'Accept' means:", options: ["Rejected", "Approved for publication", "Needs revision", "Under review"], correct: 1 },
    ]
  ),

  "academic-writing-20": l(20, "Publishing & Dissemination", "Learn about publishing your research and sharing it with the academic community.",
    [
      { word: "Journal", meaning: "Academic publication for papers", example: "Submit to a high-impact journal.", emoji: "📰", arabic: "مجلة علمية" },
      { word: "Impact factor", meaning: "Measure of journal importance", example: "Choose a journal with high impact factor.", emoji: "📊", arabic: "معامل التأثير" },
      { word: "Open access", meaning: "Freely available to all", example: "Publish in an open access journal.", emoji: "🔓", arabic: "وصول مفتوح" },
      { word: "Conference paper", meaning: "Paper presented at a conference", example: "Submit a conference paper.", emoji: "🎤", arabic: "ورقة مؤتمر" },
      { word: "Proceedings", meaning: "Published conference papers", example: "It's in the conference proceedings.", emoji: "📚", arabic: "وقائع" },
      { word: "Dissemination", meaning: "Spreading research findings", example: "Plan your dissemination strategy.", emoji: "📢", arabic: "نشر" },
      { word: "Embargo", meaning: "Restriction period before publication", example: "The paper is under embargo.", emoji: "⏰", arabic: "حظر نشر" },
      { word: "Preprint", meaning: "Paper shared before peer review", example: "Post a preprint on arXiv.", emoji: "📄", arabic: "نسخة مسبقة" },
      { word: "Citation count", meaning: "Times a paper is referenced", example: "High citation count shows impact.", emoji: "📈", arabic: "عدد الاقتباسات" },
      { word: "Collaborate", meaning: "To work with other researchers", example: "Collaborate on multi-site studies.", emoji: "🤝", arabic: "يتعاون" },
    ],
    [
      { speaker: "Mentor", text: "Have you decided where to submit your paper?" },
      { speaker: "Researcher", text: "I'm considering an open access journal with a good impact factor." },
      { speaker: "Mentor", text: "Good choice. Also consider presenting at a conference." },
      { speaker: "Researcher", text: "Can I post a preprint before submission?" },
      { speaker: "Mentor", text: "Yes, many journals allow preprints. Check their policy first." },
    ],
    { title: "Academic Communication Styles", explanation: "Match your writing style to the audience: formal for journals, engaging for conferences, accessible for public dissemination.",
      examples: [
        { sentence: "This study contributes to the literature by... (journal)", note: "Formal and precise" },
        { sentence: "Our findings show that... (conference)", note: "Clear and engaging" },
        { sentence: "We discovered that students learn better when... (public)", note: "Accessible language" },
        { sentence: "The implications for practitioners include... (policy)", note: "Action-oriented" },
      ]},
    [
      { question: "'Impact factor' measures:", options: ["Paper length", "Journal importance", "Author count", "Page count"], correct: 1 },
      { question: "'Open access' means:", options: ["Paid only", "Freely available", "Restricted", "Private"], correct: 1 },
    ],
    [
      { question: "A 'preprint' is:", options: ["A final version", "Shared before peer review", "A rejected paper", "A textbook"], correct: 1 },
      { question: "'Dissemination' means:", options: ["Hiding research", "Spreading findings", "Deleting data", "Reviewing"], correct: 1 },
    ],
    [
      { question: "'This study ___ to the literature by...'", options: ["contribute", "contributes", "contributing", "contributed"], correct: 1 },
      { question: "'The findings ___ implications for...'", options: ["has", "have", "having", "had"], correct: 1 },
    ],
    [
      { question: "A 'journal' is:", options: ["A diary", "An academic publication", "A newspaper", "A blog"], correct: 1 },
      { question: "'Conference proceedings' contain:", options: ["Meeting notes", "Published conference papers", "Attendance lists", "Schedules"], correct: 1 },
      { question: "High 'citation count' indicates:", options: ["Low quality", "High impact", "Old paper", "Short paper"], correct: 1 },
    ],
    [
      { question: "An 'embargo' is:", options: ["A publication award", "A restriction period", "A type of journal", "A writing style"], correct: 1 },
      { question: "'Collaborate' means:", options: ["Work alone", "Work with others", "Compete", "Copy"], correct: 1 },
    ]
  ),
};
