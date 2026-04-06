import type { LessonData } from "./lessons";

export const socialMediaLessons: Record<string, LessonData> = {
  "social-media-1": {
    levelId: "social-media", levelLabel: "English for Social Media", lessonNumber: 1,
    title: "Social Media Basics & Vocabulary",
    description: "Master essential social media terms and understand platform language.",
    vocabulary: [
      { word: "Post", meaning: "Content shared online", example: "She published a new post on Instagram.", emoji: "📱", arabic: "منشور" },
      { word: "Feed", meaning: "A stream of content updates", example: "My feed is full of travel photos.", emoji: "📰", arabic: "خلاصة" },
      { word: "Hashtag", meaning: "A # symbol used to categorise content", example: "Use the hashtag #TravelGoals.", emoji: "#️⃣", arabic: "هاشتاق" },
      { word: "Follower", meaning: "Someone who subscribes to your content", example: "She gained 1,000 new followers.", emoji: "👥", arabic: "متابع" },
      { word: "Engagement", meaning: "Likes, comments, and shares", example: "This post got great engagement.", emoji: "❤️", arabic: "تفاعل" },
      { word: "Viral", meaning: "Spreading rapidly online", example: "The video went viral overnight.", emoji: "🔥", arabic: "انتشاري" },
      { word: "Algorithm", meaning: "The system that decides what you see", example: "The algorithm favours video content.", emoji: "🤖", arabic: "خوارزمية" },
      { word: "Caption", meaning: "Text under a photo or video", example: "Write a catchy caption for your photo.", emoji: "✍️", arabic: "تعليق" },
      { word: "Influencer", meaning: "A person with many followers who shapes opinions", example: "She's a fashion influencer.", emoji: "⭐", arabic: "مؤثر" },
      { word: "Trending", meaning: "Currently popular", example: "That song is trending right now.", emoji: "📈", arabic: "رائج" },
    ],
    dialogue: [
      { speaker: "Noor", text: "Did you see my latest post? I finally hit 10K followers!" },
      { speaker: "Tariq", text: "Congrats! What's your secret to growing so fast?" },
      { speaker: "Noor", text: "Consistent posting, engaging captions, and using trending hashtags." },
      { speaker: "Tariq", text: "I barely get any engagement on my posts. Any tips?" },
      { speaker: "Noor", text: "Try posting when your audience is most active — evenings usually work best." },
      { speaker: "Tariq", text: "Makes sense. Should I use Reels more?" },
      { speaker: "Noor", text: "Definitely! The algorithm pushes video content more than photos." },
    ],
    grammar: {
      title: "Present Simple for Describing Social Media Habits",
      explanation: "Use present simple to talk about regular social media habits and general truths about platforms.",
      examples: [
        { sentence: "I post three times a week.", note: "Regular habit" },
        { sentence: "The algorithm favours short videos.", note: "General truth" },
        { sentence: "Influencers use hashtags to reach wider audiences.", note: "General practice" },
      ],
    },
    vocabExercises: [
      { question: "'Viral' means:", options: ["A computer virus", "Spreading rapidly online", "Very slow", "Private"], correct: 1 },
      { question: "An 'algorithm' is:", options: ["A type of post", "A system that decides what you see", "A hashtag", "A caption"], correct: 1 },
      { question: "'Engagement' includes:", options: ["Only likes", "Likes, comments, and shares", "Only followers", "Only views"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Your friend asks how to get more followers. Best advice?", options: ["Buy them.", "Post consistently and use relevant hashtags.", "Just wait.", "Delete your account."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'She ___ a new photo every day.'", options: ["post", "posts", "posting", "posted"], correct: 1 },
    ],
    examQuestions: [
      { question: "What is a 'caption' on social media?", options: ["A video", "Text under a photo or video", "A filter", "A link"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Write a social media post about your day. What makes it engaging?", options: ["Just text, no images", "A good photo, catchy caption, and relevant hashtags", "No hashtags needed", "Post at midnight"], correct: 1 },
    ],
  },
  "social-media-2": {
    levelId: "social-media", levelLabel: "English for Social Media", lessonNumber: 2,
    title: "Writing Captions & Hooks",
    description: "Craft compelling captions that grab attention and boost engagement.",
    vocabulary: [
      { word: "Hook", meaning: "An attention-grabbing opening", example: "Start with a hook to stop the scroll.", emoji: "🪝", arabic: "جاذب" },
      { word: "Call-to-action", meaning: "A prompt telling the audience what to do", example: "Add a call-to-action: 'Comment below!'", emoji: "📢", arabic: "دعوة للعمل" },
      { word: "Relatable", meaning: "Easy for others to connect with", example: "Relatable content gets more shares.", emoji: "🤗", arabic: "قابل للتواصل" },
      { word: "Authentic", meaning: "Genuine and real", example: "Audiences love authentic stories.", emoji: "💎", arabic: "أصيل" },
      { word: "Tone", meaning: "The feeling or attitude of writing", example: "Keep a friendly, casual tone.", emoji: "🎵", arabic: "نبرة" },
      { word: "Emoji", meaning: "Small digital icons used in text", example: "Emojis make captions more fun. 😊", emoji: "😎", arabic: "رمز تعبيري" },
      { word: "Storytelling", meaning: "Sharing an experience as a narrative", example: "Storytelling captions perform well.", emoji: "📖", arabic: "سرد القصص" },
      { word: "Niche", meaning: "A specialised segment of the market", example: "Her niche is vegan cooking.", emoji: "🎯", arabic: "تخصص" },
      { word: "Scroll", meaning: "To move through content on a screen", example: "People scroll fast — make them stop!", emoji: "📲", arabic: "يتصفح" },
      { word: "Copywriting", meaning: "Writing text to persuade or sell", example: "Good copywriting boosts sales.", emoji: "🖊️", arabic: "كتابة إعلانية" },
    ],
    dialogue: [
      { speaker: "Coach", text: "Your photo is great, but the caption needs work. What's the hook?" },
      { speaker: "Student", text: "I just wrote 'Beautiful sunset'. Is that not enough?" },
      { speaker: "Coach", text: "It's too generic. Try: 'This sunset reminded me why I moved to the coast…'" },
      { speaker: "Student", text: "Oh, that's much more engaging! It tells a story." },
      { speaker: "Coach", text: "Exactly! Then add a question or call-to-action at the end." },
      { speaker: "Student", text: "Like 'What's the most beautiful place you've ever visited?'" },
      { speaker: "Coach", text: "Perfect! That invites engagement and builds community." },
    ],
    grammar: {
      title: "Imperative Mood for Calls-to-Action",
      explanation: "Use imperatives to create strong calls-to-action: 'Follow', 'Share', 'Comment', 'Tag'. These direct your audience to take action.",
      examples: [
        { sentence: "Double-tap if you agree! ❤️", note: "Imperative for engagement" },
        { sentence: "Tag a friend who needs to see this!", note: "Imperative with audience targeting" },
        { sentence: "Save this post for later! 📌", note: "Imperative with benefit" },
      ],
    },
    vocabExercises: [
      { question: "A 'hook' is:", options: ["A fishing tool", "An attention-grabbing opening", "A hashtag", "A filter"], correct: 1 },
      { question: "'Call-to-action' prompts the audience to:", options: ["Leave the page", "Do something specific", "Stop reading", "Report the post"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Which is a better caption hook?", options: ["Nice day.", "The one habit that changed my life forever…", "Hello everyone.", "Photo."], correct: 1 },
    ],
    grammarExercises: [
      { question: "Which is an imperative call-to-action?", options: ["I like this post.", "Share this with a friend!", "She commented.", "They followed."], correct: 1 },
    ],
    examQuestions: [
      { question: "What makes a caption 'relatable'?", options: ["Using big words", "Content others can connect with personally", "Being vague", "Using no emojis"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Write 3 different captions for a coffee photo. Which approach is best?", options: ["Just 'Coffee.'", "A hook + story + call-to-action", "A long paragraph with no breaks", "No caption needed"], correct: 1 },
    ],
  },
  "social-media-3": {
    levelId: "social-media", levelLabel: "English for Social Media", lessonNumber: 3,
    title: "Understanding Analytics & Metrics",
    description: "Learn key metrics to measure and improve your social media performance.",
    vocabulary: [
      { word: "Reach", meaning: "The number of unique people who see your content", example: "This post had a reach of 50,000.", emoji: "👀", arabic: "الوصول" },
      { word: "Impressions", meaning: "Total times content is displayed", example: "Impressions count every view, including repeats.", emoji: "🔢", arabic: "مرات الظهور" },
      { word: "Analytics", meaning: "Data about performance", example: "Check your analytics to see what works.", emoji: "📊", arabic: "تحليلات" },
      { word: "Conversion", meaning: "When someone takes a desired action", example: "The conversion rate from the ad was 5%.", emoji: "🎯", arabic: "تحويل" },
      { word: "Demographic", meaning: "Statistical data about a population", example: "Your main demographic is 18-24 year olds.", emoji: "📋", arabic: "فئة سكانية" },
      { word: "Insight", meaning: "A useful understanding from data", example: "The insights show peak activity at 8 PM.", emoji: "💡", arabic: "رؤية" },
      { word: "ROI", meaning: "Return on investment — profit vs cost", example: "The campaign had a great ROI.", emoji: "💰", arabic: "العائد على الاستثمار" },
      { word: "Bounce rate", meaning: "People who leave quickly", example: "A high bounce rate means people aren't staying.", emoji: "⬆️", arabic: "معدل الارتداد" },
      { word: "Organic", meaning: "Growth without paid promotion", example: "We focus on organic growth first.", emoji: "🌱", arabic: "عضوي" },
      { word: "Metric", meaning: "A measurable value", example: "Engagement rate is an important metric.", emoji: "📏", arabic: "مقياس" },
    ],
    dialogue: [
      { speaker: "Manager", text: "Let's review this month's social media analytics." },
      { speaker: "Analyst", text: "Our reach increased by 35%, and engagement is up 20%." },
      { speaker: "Manager", text: "That's great! What about conversions from our latest campaign?" },
      { speaker: "Analyst", text: "The conversion rate is 4.5%, which is above industry average." },
      { speaker: "Manager", text: "Which demographic is most engaged?" },
      { speaker: "Analyst", text: "Women aged 25-34, primarily from the UK and Egypt." },
      { speaker: "Manager", text: "Interesting. Let's create more content targeted at that group." },
    ],
    grammar: {
      title: "Comparatives & Superlatives for Data Discussion",
      explanation: "Use comparatives to discuss trends: 'higher than', 'more than last month'. Use superlatives for best/worst performers: 'the most popular', 'the highest engagement'.",
      examples: [
        { sentence: "This month's reach was higher than last month's.", note: "Comparative for comparison" },
        { sentence: "Instagram is our most engaging platform.", note: "Superlative for best performer" },
        { sentence: "The campaign performed better than expected.", note: "Comparative with past participle" },
      ],
    },
    vocabExercises: [
      { question: "'Reach' vs 'Impressions' — the difference is:", options: ["They're the same", "Reach counts unique viewers; impressions count all views", "Reach is only for videos", "Impressions are only for ads"], correct: 1 },
      { question: "'ROI' stands for:", options: ["Rate of increase", "Return on investment", "Range of interest", "Revenue of income"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Your boss asks about this week's performance. Best response?", options: ["It was OK.", "Engagement increased 15% week-over-week, driven by our Reels content.", "I didn't check.", "Lots of likes."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Our engagement rate is ___ than our competitors'.'", options: ["high", "higher", "highest", "highly"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Organic growth' means:", options: ["Paid advertising", "Growth without paid promotion", "Plant-based content", "Automated growth"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Check your own social media insights. What's the most important metric to track?", options: ["Only followers", "Engagement rate — it shows how your audience interacts", "Only likes", "Only views"], correct: 1 },
    ],
  },
  "social-media-4": {
    levelId: "social-media", levelLabel: "English for Social Media", lessonNumber: 4,
    title: "Content Creation & Brand Voice",
    description: "Develop a consistent brand voice and create compelling content.",
    vocabulary: [
      { word: "Brand", meaning: "The identity of a business or person", example: "Her personal brand is all about wellness.", emoji: "🏷️", arabic: "علامة تجارية" },
      { word: "Aesthetic", meaning: "The visual style or look", example: "Keep a consistent aesthetic on your profile.", emoji: "🎨", arabic: "جمالية" },
      { word: "Content calendar", meaning: "A schedule for planned posts", example: "Use a content calendar to stay organised.", emoji: "📅", arabic: "جدول المحتوى" },
      { word: "Template", meaning: "A pre-designed format", example: "I use templates for my Instagram stories.", emoji: "📐", arabic: "قالب" },
      { word: "Curate", meaning: "To carefully select and organise", example: "She curates beautiful travel content.", emoji: "✨", arabic: "ينتقي" },
      { word: "Consistency", meaning: "Doing something regularly and reliably", example: "Consistency is key to building an audience.", emoji: "🔁", arabic: "اتساق" },
      { word: "Collaborate", meaning: "To work together", example: "Let's collaborate on a joint post.", emoji: "🤝", arabic: "يتعاون" },
      { word: "Repost", meaning: "To share someone else's content", example: "Can I repost your video on my page?", emoji: "🔄", arabic: "إعادة نشر" },
      { word: "Filter", meaning: "A visual effect applied to photos", example: "Which filter looks best on this photo?", emoji: "🌈", arabic: "فلتر" },
      { word: "Draft", meaning: "An unpublished version", example: "I saved the post as a draft first.", emoji: "📝", arabic: "مسودة" },
    ],
    dialogue: [
      { speaker: "Mentor", text: "What's your brand all about?" },
      { speaker: "Creator", text: "I focus on sustainable fashion — eco-friendly tips and style inspiration." },
      { speaker: "Mentor", text: "Great niche! Is your visual aesthetic consistent?" },
      { speaker: "Creator", text: "I try! I use earthy tones and clean layouts." },
      { speaker: "Mentor", text: "Perfect. Do you have a content calendar?" },
      { speaker: "Creator", text: "Not really. I just post when I feel like it." },
      { speaker: "Mentor", text: "That's a common mistake. Plan ahead — consistency builds trust with your audience." },
    ],
    grammar: {
      title: "Gerunds as Subjects for Discussing Strategy",
      explanation: "Use gerunds (verb + -ing as noun) to discuss content strategies: 'Posting regularly builds trust.', 'Creating quality content takes time.'",
      examples: [
        { sentence: "Posting consistently is more important than posting daily.", note: "Gerund as subject" },
        { sentence: "Collaborating with other creators expands your reach.", note: "Gerund leading a complex subject" },
        { sentence: "Planning content in advance reduces stress.", note: "Gerund phrase as subject" },
      ],
    },
    vocabExercises: [
      { question: "To 'curate' content means to:", options: ["Delete it", "Carefully select and organise it", "Copy it", "Ignore it"], correct: 1 },
      { question: "A 'content calendar' is:", options: ["A phone app", "A schedule for planned posts", "A type of filter", "A social media platform"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Someone asks 'How do I build a personal brand?' Best answer?", options: ["Just post anything.", "Define your niche, keep a consistent aesthetic, and post regularly.", "Buy followers.", "Copy others."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ regularly builds trust with your audience.'", options: ["Post", "Posting", "Posts", "Posted"], correct: 1 },
    ],
    examQuestions: [
      { question: "Why is 'consistency' important in social media?", options: ["It doesn't matter", "It builds trust and keeps your audience engaged", "It wastes time", "Only for big brands"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Create a 1-week content calendar. What should it include?", options: ["Random ideas", "Dates, content type, captions, hashtags, and posting times", "Just photos", "Nothing — just improvise"], correct: 1 },
    ],
  },
  "social-media-5": {
    levelId: "social-media", levelLabel: "English for Social Media", lessonNumber: 5,
    title: "Handling Comments & Online Etiquette",
    description: "Respond to comments professionally and manage your online presence.",
    vocabulary: [
      { word: "Troll", meaning: "Someone who posts to provoke others", example: "Don't feed the trolls — ignore negative comments.", emoji: "👹", arabic: "متصيد" },
      { word: "Block", meaning: "To prevent someone from seeing your content", example: "I had to block a rude commenter.", emoji: "🚫", arabic: "يحظر" },
      { word: "Moderate", meaning: "To review and manage content/comments", example: "We moderate comments to keep discussions positive.", emoji: "🛡️", arabic: "يشرف" },
      { word: "Constructive", meaning: "Helpful and intended to improve", example: "That's constructive feedback — thank you!", emoji: "🔧", arabic: "بنّاء" },
      { word: "Etiquette", meaning: "The rules of polite behaviour", example: "Online etiquette includes being respectful.", emoji: "🎩", arabic: "آداب" },
      { word: "Reply", meaning: "A response to a comment", example: "Always reply to genuine questions.", emoji: "💬", arabic: "رد" },
      { word: "Community", meaning: "A group of people with shared interests", example: "Build a supportive community around your brand.", emoji: "🌍", arabic: "مجتمع" },
      { word: "Spam", meaning: "Unwanted, irrelevant messages", example: "Report spam comments to the platform.", emoji: "📧", arabic: "رسائل مزعجة" },
      { word: "Cyberbully", meaning: "Someone who harasses others online", example: "Report cyberbullying immediately.", emoji: "😠", arabic: "متنمر إلكتروني" },
      { word: "Mute", meaning: "To silence notifications from someone", example: "You can mute conversations without unfollowing.", emoji: "🔇", arabic: "يكتم" },
    ],
    dialogue: [
      { speaker: "Creator", text: "Someone left a really mean comment on my latest video." },
      { speaker: "Friend", text: "What did they say?" },
      { speaker: "Creator", text: "They said my content is boring and I should stop posting." },
      { speaker: "Friend", text: "That's just a troll. Don't engage — it's not constructive feedback." },
      { speaker: "Creator", text: "Should I delete it or respond?" },
      { speaker: "Friend", text: "If it's harassment, delete and block. If it's just negativity, ignore it." },
      { speaker: "Creator", text: "You're right. I'll focus on the positive comments instead." },
    ],
    grammar: {
      title: "Modal Verbs for Advice: 'Should', 'Could', 'Might'",
      explanation: "Use 'should' for strong advice, 'could' for suggestions, and 'might' for gentle possibilities when discussing online behaviour.",
      examples: [
        { sentence: "You should always respond to genuine questions.", note: "'Should' for strong advice" },
        { sentence: "You could try using a humorous reply.", note: "'Could' for a suggestion" },
        { sentence: "You might want to mute that person instead of blocking.", note: "'Might' for gentle advice" },
      ],
    },
    vocabExercises: [
      { question: "A 'troll' on social media is:", options: ["A helpful user", "Someone who posts to provoke others", "An admin", "A bot"], correct: 1 },
      { question: "To 'moderate' comments means to:", options: ["Delete everything", "Review and manage them", "Ignore them", "Like them all"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Someone leaves hate on your post. Best response?", options: ["Fight back aggressively", "Ignore or delete — don't engage with trolls", "Post about them publicly", "Cry"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'You ___ respond politely to constructive criticism.'", options: ["must not", "should", "shouldn't", "wouldn't"], correct: 1 },
    ],
    examQuestions: [
      { question: "What is 'online etiquette'?", options: ["Rules for coding", "Rules of polite behaviour online", "A social media platform", "A type of content"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Create a comment policy for your page. What should it include?", options: ["No rules needed", "Guidelines for respectful discussion, consequences for harassment", "Only positive comments allowed", "No comments allowed"], correct: 1 },
    ],
  },
};
