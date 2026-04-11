import type { LessonData } from "./lessons";
import { businessEnglishLessons } from "./business-english-lessons";

// Enhance lessons 1-10 with additional vocabulary, dialogue, grammar examples, and exercises

// ─── Lesson 1: Business Introductions ───
const b1 = businessEnglishLessons["business-1"];
b1.vocabulary.push(
  { word: "Liaison", meaning: "A person who connects groups", example: "She's our client liaison.", emoji: "🔗", arabic: "حلقة وصل" },
  { word: "Corporate", meaning: "Relating to a large company", example: "The corporate office is in Dubai.", emoji: "🏢", arabic: "شركة كبرى" },
  { word: "Delegate", meaning: "A person sent to represent others", example: "He's a delegate at the conference.", emoji: "🧑‍💼", arabic: "مندوب" },
  { word: "Expertise", meaning: "Great skill or knowledge in an area", example: "Her expertise is in digital marketing.", emoji: "🎓", arabic: "خبرة" },
  { word: "Onboard", meaning: "To integrate a new employee", example: "We'll onboard you next Monday.", emoji: "🚀", arabic: "تهيئة موظف جديد" }
);
b1.dialogue.push(
  { speaker: "Ahmed", text: "What department are you in exactly?" },
  { speaker: "Sarah", text: "I'm in digital marketing. We handle social media and campaigns." },
  { speaker: "Ahmed", text: "That sounds exciting. We should collaborate on the next client pitch." },
  { speaker: "Sarah", text: "Definitely! Let me give you my business card." },
  { speaker: "Ahmed", text: "Great. I'll send you an email to set up a meeting." }
);
b1.grammar.examples.push(
  { sentence: "May I introduce myself? I'm the new liaison.", note: "'May I' — very polite formal opener" },
  { sentence: "I don't believe we've met. I'm from the London branch.", note: "Polite first-time introduction" }
);
b1.vocabExercises.push(
  { question: "A 'liaison' connects:", options: ["Cables", "Different groups", "Computers", "Buildings"], correct: 1 },
  { question: "Someone with 'expertise' has:", options: ["No experience", "Great knowledge", "A big office", "Many friends"], correct: 1 },
  { question: "'Corporate' relates to:", options: ["Small shops", "A large company", "Schools", "Hospitals"], correct: 1 },
  { question: "A 'delegate' is sent to:", options: ["Buy products", "Represent others", "Clean offices", "Cook food"], correct: 1 },
  { question: "To 'onboard' someone means to:", options: ["Fire them", "Integrate a new hire", "Promote them", "Transfer them"], correct: 1 }
);
b1.conversationExercises.push(
  { question: "After exchanging names, you should:", options: ["Walk away", "Ask about their role", "Stay silent", "Check your phone"], correct: 1 },
  { question: "A business card is exchanged:", options: ["Never", "During introductions", "Only by email", "At lunch only"], correct: 1 }
);
b1.grammarExercises.push(
  { question: "'May I ___ myself?'", options: ["introducing", "introduce", "introduced", "introduces"], correct: 1 },
  { question: "'I don't believe we ___ met.'", options: ["has", "have", "had", "having"], correct: 1 },
  { question: "Which is a polite formal opener?", options: ["Yo!", "Hey there!", "How do you do?", "What's up?"], correct: 2 }
);
b1.examQuestions.push(
  { question: "'Expertise' means:", options: ["Laziness", "Great skill", "A meeting", "A title"], correct: 1 },
  { question: "What does 'onboard' mean?", options: ["Get on a ship", "Integrate a new employee", "Fire someone", "Leave the company"], correct: 1 },
  { question: "Formal introductions use:", options: ["Slang", "Titles and polite phrases", "Nicknames", "Emojis"], correct: 1 },
  { question: "A 'delegate' at a conference:", options: ["Cleans up", "Represents others", "Cooks food", "Drives a car"], correct: 1 }
);
b1.homeworkQuestions.push(
  { question: "When networking, it's best to:", options: ["Only talk about yourself", "Listen and share equally", "Ignore others", "Leave early"], correct: 1 },
  { question: "'Corporate office' refers to:", options: ["A home office", "The main company office", "A cafe", "A factory"], correct: 1 }
);

// ─── Lesson 2: Business Meetings ───
const b2 = businessEnglishLessons["business-2"];
b2.vocabulary.push(
  { word: "Proxy", meaning: "A person authorized to act for another", example: "She voted by proxy.", emoji: "👤", arabic: "وكيل" },
  { word: "Brainstorm", meaning: "To generate ideas in a group", example: "Let's brainstorm solutions.", emoji: "🧠", arabic: "عصف ذهني" },
  { word: "Delegate", meaning: "To assign tasks to others", example: "Delegate tasks to your team.", emoji: "📋", arabic: "يُفوّض" },
  { word: "Table (verb)", meaning: "To postpone discussion", example: "Let's table this until next week.", emoji: "⏸️", arabic: "يؤجل" },
  { word: "Wrap up", meaning: "To finish or conclude", example: "Let's wrap up this meeting.", emoji: "🎁", arabic: "يُنهي" }
);
b2.dialogue.push(
  { speaker: "Lina", text: "I think we should brainstorm some cost-cutting ideas." },
  { speaker: "Omar", text: "Good idea. Can we set a deadline for proposals?" },
  { speaker: "Chair", text: "Let's say end of this week. Any other business?" },
  { speaker: "Lina", text: "I'd like to delegate the research to the analytics team." },
  { speaker: "Chair", text: "Agreed. Let's wrap up. I'll send the minutes by tomorrow." }
);
b2.grammar.examples.push(
  { sentence: "Shall we move on to the next item?", note: "'Shall we' — polite suggestion" },
  { sentence: "Would anyone like to add anything?", note: "'Would' for open invitation" }
);
b2.vocabExercises.push(
  { question: "To 'brainstorm' means to:", options: ["Argue", "Generate ideas together", "Sleep", "Write alone"], correct: 1 },
  { question: "A 'proxy' is:", options: ["A product", "A person acting for another", "A computer", "A report"], correct: 1 },
  { question: "To 'wrap up' means:", options: ["To start", "To conclude", "To delay", "To cancel"], correct: 1 },
  { question: "To 'table' a discussion means:", options: ["To start it", "To postpone it", "To end it forever", "To vote on it"], correct: 1 },
  { question: "'Delegate' as a verb means:", options: ["To attend", "To assign tasks", "To quit", "To hire"], correct: 1 }
);
b2.conversationExercises.push(
  { question: "Before ending a meeting, you should:", options: ["Just leave", "Summarize action items", "Start a new topic", "Argue"], correct: 1 },
  { question: "'Any other business?' is asked:", options: ["At the start", "Before wrapping up", "Never", "During lunch"], correct: 1 }
);
b2.grammarExercises.push(
  { question: "'___ we move on to the next point?'", options: ["Will", "Shall", "Must", "Do"], correct: 1 },
  { question: "'Would anyone ___ to comment?'", options: ["likes", "like", "liked", "liking"], correct: 1 },
  { question: "'We ___ want to reconsider.' (tentative)", options: ["must", "might", "will", "do"], correct: 1 }
);
b2.examQuestions.push(
  { question: "Meeting 'minutes' should be:", options: ["Verbal only", "Written and distributed", "Kept secret", "Deleted after"], correct: 1 },
  { question: "A 'brainstorm' session is for:", options: ["Complaints", "Generating ideas", "Performance reviews", "Firing people"], correct: 1 },
  { question: "'Wrap up' a meeting means:", options: ["Gift wrapping", "Concluding the meeting", "Starting over", "Taking a break"], correct: 1 },
  { question: "A 'quorum' ensures:", options: ["Fun", "Valid decision-making", "Short meetings", "Free food"], correct: 1 }
);
b2.homeworkQuestions.push(
  { question: "'Shall we' is used for:", options: ["Commands", "Polite suggestions", "Threats", "Apologies"], correct: 1 },
  { question: "After a meeting, you should:", options: ["Forget everything", "Follow up on action items", "Complain", "Do nothing"], correct: 1 }
);

// ─── Lesson 3: Business Emails ───
const b3 = businessEnglishLessons["business-3"];
b3.vocabulary.push(
  { word: "Thread", meaning: "A series of related emails", example: "Check the email thread for context.", emoji: "📨", arabic: "سلسلة رسائل" },
  { word: "Proofread", meaning: "To check for errors before sending", example: "Always proofread your emails.", emoji: "🔍", arabic: "مراجعة" },
  { word: "Recipient", meaning: "The person receiving the email", example: "Double-check the recipient list.", emoji: "📬", arabic: "المستلم" },
  { word: "Forward", meaning: "To send a received email to someone else", example: "Please forward this to the team.", emoji: "➡️", arabic: "إعادة توجيه" },
  { word: "Follow-up", meaning: "A subsequent email checking on progress", example: "I'll send a follow-up next week.", emoji: "🔄", arabic: "متابعة" }
);
b3.dialogue.push(
  { speaker: "Employee", text: "Should I CC the entire team on this thread?" },
  { speaker: "Manager", text: "Only CC those who need to take action." },
  { speaker: "Employee", text: "Got it. I'll proofread it before sending." },
  { speaker: "Manager", text: "Good. And please forward the client's response to me." },
  { speaker: "Employee", text: "Will do. I'll also schedule a follow-up for Monday." }
);
b3.grammar.examples.push(
  { sentence: "I would be grateful if you could send the files.", note: "Very formal polite request" },
  { sentence: "Could you kindly confirm receipt of this email?", note: "'Could you kindly' — extra polite" }
);
b3.vocabExercises.push(
  { question: "An email 'thread' is:", options: ["A single email", "A series of related emails", "A deleted email", "A spam email"], correct: 1 },
  { question: "To 'proofread' means:", options: ["To delete", "To check for errors", "To send quickly", "To print"], correct: 1 },
  { question: "The 'recipient' is:", options: ["The sender", "The person receiving", "The CC'd person", "The BCC'd person"], correct: 1 },
  { question: "To 'forward' an email is to:", options: ["Delete it", "Reply to it", "Send it to someone else", "Print it"], correct: 2 },
  { question: "A 'follow-up' email:", options: ["Starts a new topic", "Checks on progress", "Cancels a meeting", "Reports spam"], correct: 1 }
);
b3.conversationExercises.push(
  { question: "Before sending an important email:", options: ["Send immediately", "Proofread carefully", "Don't use a subject", "Use all caps"], correct: 1 },
  { question: "You should CC someone when:", options: ["Always", "They need to be informed", "Never", "Only on weekends"], correct: 1 }
);
b3.grammarExercises.push(
  { question: "'I would be ___ if you could help.'", options: ["angry", "grateful", "sad", "bored"], correct: 1 },
  { question: "'Could you ___ confirm receipt?'", options: ["rudely", "loudly", "kindly", "quickly"], correct: 2 },
  { question: "'Please find ___ the quarterly report.'", options: ["include", "attached", "inside", "below"], correct: 1 }
);
b3.examQuestions.push(
  { question: "Professional email closings include:", options: ["Later dude", "Best regards", "Whatever", "Bye bye"], correct: 1 },
  { question: "A clear subject line should:", options: ["Be empty", "Summarize the purpose", "Be funny", "Use all caps"], correct: 1 },
  { question: "'I look forward to hearing from you' is:", options: ["Rude", "A polite closing phrase", "Informal", "A greeting"], correct: 1 },
  { question: "When to use BCC:", options: ["Always", "For privacy protection", "Never", "Only with friends"], correct: 1 }
);
b3.homeworkQuestions.push(
  { question: "Email etiquette requires:", options: ["Emojis everywhere", "Clear and professional tone", "No greetings", "All caps"], correct: 1 },
  { question: "A 'thread' helps you:", options: ["Start fresh", "See the conversation history", "Delete old emails", "Block senders"], correct: 1 }
);

// ─── Lesson 4: Negotiations & Deals ───
const b4 = businessEnglishLessons["business-4"];
b4.vocabulary.push(
  { word: "Stakeholder", meaning: "A person with interest in the outcome", example: "Stakeholders must approve the deal.", emoji: "👥", arabic: "صاحب مصلحة" },
  { word: "Impasse", meaning: "A situation where no progress is possible", example: "We've reached an impasse.", emoji: "🚧", arabic: "طريق مسدود" },
  { word: "Mediator", meaning: "A neutral person who helps resolve disputes", example: "We brought in a mediator.", emoji: "⚖️", arabic: "وسيط" },
  { word: "Ratify", meaning: "To formally approve an agreement", example: "The board will ratify the deal.", emoji: "✅", arabic: "يُصادق" },
  { word: "Contingency", meaning: "A backup plan for unexpected events", example: "We need a contingency plan.", emoji: "🔄", arabic: "خطة بديلة" }
);
b4.dialogue.push(
  { speaker: "Seller", text: "Before we finalize, let me consult with my stakeholders." },
  { speaker: "Buyer", text: "Of course. We also need our board to ratify the agreement." },
  { speaker: "Seller", text: "What if we reach an impasse on the delivery schedule?" },
  { speaker: "Buyer", text: "We can bring in a mediator if needed." },
  { speaker: "Seller", text: "Good. Let's also have a contingency plan for supply delays." }
);
b4.grammar.examples.push(
  { sentence: "Unless you lower the price, we can't proceed.", note: "'Unless' = if not — firm condition" },
  { sentence: "Provided that quality is maintained, we'll sign.", note: "'Provided that' = on the condition" }
);
b4.vocabExercises.push(
  { question: "An 'impasse' means:", options: ["Quick progress", "No progress possible", "A celebration", "A discount"], correct: 1 },
  { question: "A 'mediator' is:", options: ["A buyer", "A neutral dispute resolver", "A seller", "A lawyer"], correct: 1 },
  { question: "To 'ratify' means:", options: ["To reject", "To formally approve", "To delay", "To negotiate"], correct: 1 },
  { question: "A 'contingency' plan is:", options: ["The main plan", "A backup plan", "A budget", "A report"], correct: 1 },
  { question: "'Stakeholder' in negotiations refers to:", options: ["Only the buyer", "A person with interest in the outcome", "Only the seller", "A judge"], correct: 1 }
);
b4.conversationExercises.push(
  { question: "When negotiations stall, you should:", options: ["Walk away angrily", "Consider compromise", "Shout louder", "Give up"], correct: 1 },
  { question: "A mediator helps by:", options: ["Taking sides", "Remaining neutral", "Ending the deal", "Adding costs"], correct: 1 }
);
b4.grammarExercises.push(
  { question: "'___ you lower the price, we can't proceed.'", options: ["If", "Unless", "Although", "Because"], correct: 1 },
  { question: "'___ that quality is maintained, we'll sign.'", options: ["Despite", "Although", "Provided", "Unless"], correct: 2 },
  { question: "'If we ___ extend the deadline, we'd accept.' (hypothetical)", options: ["can", "could", "will", "do"], correct: 1 }
);
b4.examQuestions.push(
  { question: "A successful negotiation aims for:", options: ["One side winning", "A win-win outcome", "Argument", "No agreement"], correct: 1 },
  { question: "When you 'ratify' a deal, you:", options: ["Cancel it", "Formally approve it", "Delay it", "Reject it"], correct: 1 },
  { question: "A 'contingency' is important because:", options: ["It saves money", "It prepares for unexpected events", "It delays projects", "It confuses others"], correct: 1 },
  { question: "'Bottom line' in negotiations is:", options: ["The last page", "The minimum acceptable outcome", "The highest price", "A joke"], correct: 1 }
);
b4.homeworkQuestions.push(
  { question: "An 'impasse' can be broken by:", options: ["Ignoring it", "Finding creative solutions", "Giving up", "Being rude"], correct: 1 },
  { question: "'Unless' introduces:", options: ["A result", "A condition that must be met", "A past event", "A greeting"], correct: 1 }
);

// ─── Lesson 5: Presentations ───
const b5 = businessEnglishLessons["business-5"];
b5.vocabulary.push(
  { word: "Podium", meaning: "A raised platform for speakers", example: "She stepped up to the podium.", emoji: "🎙️", arabic: "منصة" },
  { word: "Engage", meaning: "To capture and hold attention", example: "Engage the audience with questions.", emoji: "🎯", arabic: "يُشرك" },
  { word: "Data-driven", meaning: "Based on facts and numbers", example: "Use a data-driven approach.", emoji: "📊", arabic: "قائم على البيانات" },
  { word: "Rhetoric", meaning: "The art of persuasive speaking", example: "Good rhetoric wins arguments.", emoji: "🗣️", arabic: "بلاغة" },
  { word: "Debrief", meaning: "To review after an event", example: "Let's debrief after the presentation.", emoji: "📋", arabic: "مراجعة" }
);
b5.dialogue.push(
  { speaker: "Audience", text: "That was very data-driven. Can you share the slides?" },
  { speaker: "Presenter", text: "Of course. I'll email the deck to everyone." },
  { speaker: "Audience", text: "What sources did you use for the market analysis?" },
  { speaker: "Presenter", text: "We used industry reports from McKinsey and Deloitte." },
  { speaker: "Presenter", text: "Thank you all for your attention. Let's debrief tomorrow." }
);
b5.grammar.examples.push(
  { sentence: "Let me draw your attention to this chart.", note: "'Let me draw your attention' — focusing technique" },
  { sentence: "I'd like to conclude by emphasizing three key takeaways.", note: "Structured closing" }
);
b5.vocabExercises.push(
  { question: "A 'podium' is:", options: ["A screen", "A raised platform", "A microphone", "A chart"], correct: 1 },
  { question: "To 'engage' the audience means:", options: ["Bore them", "Capture their attention", "Ignore them", "Confuse them"], correct: 1 },
  { question: "'Data-driven' means:", options: ["Opinion-based", "Based on facts and numbers", "Random", "Emotional"], correct: 1 },
  { question: "'Rhetoric' is:", options: ["Loud speaking", "The art of persuasion", "Reading aloud", "Singing"], correct: 1 },
  { question: "To 'debrief' means:", options: ["To prepare", "To review after an event", "To cancel", "To skip"], correct: 1 }
);
b5.conversationExercises.push(
  { question: "Eye contact during a presentation:", options: ["Should be avoided", "Helps engage the audience", "Is rude", "Is unnecessary"], correct: 1 },
  { question: "A good conclusion should:", options: ["Introduce new topics", "Summarize key points", "Be very long", "Apologize"], correct: 1 }
);
b5.grammarExercises.push(
  { question: "'Let me ___ your attention to this data.'", options: ["pull", "draw", "push", "take"], correct: 1 },
  { question: "'I'd like to ___ by summarizing...'", options: ["start", "begin", "conclude", "open"], correct: 2 },
  { question: "'___ you can see from this graph...'", options: ["Like", "As", "When", "If"], correct: 1 }
);
b5.examQuestions.push(
  { question: "Signposting in presentations helps:", options: ["Confuse the audience", "Guide them through the structure", "Make it longer", "Add humor"], correct: 1 },
  { question: "After a presentation, you should:", options: ["Leave immediately", "Take questions and debrief", "Argue with critics", "Delete slides"], correct: 1 },
  { question: "'Data-driven' presentations are more:", options: ["Boring", "Credible and convincing", "Confusing", "Artistic"], correct: 1 },
  { question: "The best way to start a presentation:", options: ["Apologize for being unprepared", "Greet and state the purpose", "Read from notes only", "Show a video"], correct: 1 }
);
b5.homeworkQuestions.push(
  { question: "'Rhetoric' helps a speaker:", options: ["Speak quietly", "Persuade the audience", "Avoid questions", "Read faster"], correct: 1 },
  { question: "Effective presentations use:", options: ["No visuals", "Visual aids and clear structure", "Only text slides", "No preparation"], correct: 1 }
);

// ─── Lessons 6-10: Add 5 more vocab, 5 more dialogue lines, 2 more grammar examples, and more exercises ───

// Lesson 6: Financial Reports
const b6 = businessEnglishLessons["business-6"];
b6.vocabulary.push(
  { word: "Depreciation", meaning: "Decrease in value over time", example: "Equipment depreciation is $50K.", emoji: "📉", arabic: "إهلاك" },
  { word: "Liquidity", meaning: "How easily assets convert to cash", example: "The company has good liquidity.", emoji: "💧", arabic: "سيولة" },
  { word: "Fiscal year", meaning: "A 12-month period for accounting", example: "Our fiscal year ends in March.", emoji: "📅", arabic: "سنة مالية" },
  { word: "Deficit", meaning: "When spending exceeds income", example: "We ran a budget deficit.", emoji: "🔴", arabic: "عجز" },
  { word: "Dividend", meaning: "Payment to shareholders from profits", example: "The dividend was $2 per share.", emoji: "💵", arabic: "أرباح موزعة" }
);
b6.dialogue.push(
  { speaker: "CFO", text: "What's our liquidity position looking like?" },
  { speaker: "Manager", text: "Strong. We have enough cash reserves for six months." },
  { speaker: "CFO", text: "And depreciation on the new equipment?" },
  { speaker: "Manager", text: "About $50,000 this fiscal year." },
  { speaker: "CFO", text: "Good. Let's plan the shareholder dividend announcement." }
);
b6.grammar.examples.push(
  { sentence: "The deficit was considerably larger than projected.", note: "'Considerably' emphasizes size of difference" },
  { sentence: "Revenue has gradually increased over the past three quarters.", note: "'Gradually' shows slow, steady change" }
);
b6.vocabExercises.push(
  { question: "'Depreciation' means:", options: ["Increase in value", "Decrease in value over time", "No change", "A tax"], correct: 1 },
  { question: "'Liquidity' refers to:", options: ["Water usage", "Ease of converting to cash", "Company size", "Employee count"], correct: 1 },
  { question: "A 'fiscal year' is:", options: ["A calendar year", "A 12-month accounting period", "A quarter", "A week"], correct: 1 },
  { question: "A 'deficit' occurs when:", options: ["Income exceeds spending", "Spending exceeds income", "Both are equal", "No transactions happen"], correct: 1 },
  { question: "A 'dividend' is paid to:", options: ["Employees", "Customers", "Shareholders", "Vendors"], correct: 2 }
);
b6.conversationExercises.push(
  { question: "Financial reports should be:", options: ["Vague", "Accurate and detailed", "Secret", "Verbal only"], correct: 1 },
  { question: "'Break-even' is important because:", options: ["It means profit", "It shows when costs equal revenue", "It's the loss point", "It's irrelevant"], correct: 1 }
);
b6.grammarExercises.push(
  { question: "'The deficit was ___ larger than expected.'", options: ["consider", "considerably", "considerate", "considering"], correct: 1 },
  { question: "'Revenue has ___ increased over the year.'", options: ["gradual", "gradually", "grading", "grade"], correct: 1 },
  { question: "'Costs ___ significantly higher this quarter.'", options: ["is", "are", "was", "be"], correct: 1 }
);
b6.examQuestions.push(
  { question: "'Liquidity' is important because:", options: ["It looks good", "It shows cash availability", "It's a legal requirement only", "It measures size"], correct: 1 },
  { question: "A 'dividend' comes from:", options: ["Loans", "Company profits", "Employee salaries", "Government"], correct: 1 },
  { question: "'Fiscal year' may differ from:", options: ["Company policy", "The calendar year", "Tax laws", "Employee contracts"], correct: 1 },
  { question: "'Depreciation' affects:", options: ["Revenue only", "Asset values over time", "Employee morale", "Customer satisfaction"], correct: 1 }
);
b6.homeworkQuestions.push(
  { question: "A budget 'deficit' means the company:", options: ["Made a profit", "Spent more than it earned", "Broke even", "Saved money"], correct: 1 },
  { question: "'ROI' helps measure:", options: ["Employee happiness", "Return on investment", "Office space", "Team size"], correct: 1 }
);

// Lessons 7-10: Similar enhancements
const b7 = businessEnglishLessons["business-7"];
b7.vocabulary.push(
  { word: "Turnover", meaning: "Rate at which employees leave", example: "High turnover costs money.", emoji: "🔄", arabic: "دوران الموظفين" },
  { word: "Grievance", meaning: "A formal employee complaint", example: "She filed a grievance with HR.", emoji: "📝", arabic: "تظلم" },
  { word: "Severance", meaning: "Pay given when employment ends", example: "He received a severance package.", emoji: "💰", arabic: "مكافأة نهاية خدمة" },
  { word: "Diversity", meaning: "Variety of people and perspectives", example: "We value workplace diversity.", emoji: "🌈", arabic: "تنوع" },
  { word: "Redundancy", meaning: "Loss of job due to role elimination", example: "Budget cuts led to redundancies.", emoji: "📉", arabic: "تسريح" }
);
b7.dialogue.push(
  { speaker: "New hire", text: "Is there a diversity and inclusion program?" },
  { speaker: "HR", text: "Yes, it's one of our core values. We also have employee resource groups." },
  { speaker: "New hire", text: "What happens if I have a grievance?" },
  { speaker: "HR", text: "You can file it with HR. We investigate all complaints." },
  { speaker: "New hire", text: "That's reassuring. What about career development?" }
);
b7.grammar.examples.push(
  { sentence: "Contracts are reviewed before being signed.", note: "Passive — formal process" },
  { sentence: "New hires must be trained within the first week.", note: "'Must be' + past participle — obligation" }
);
b7.vocabExercises.push(
  { question: "'Turnover' in HR means:", options: ["Profit", "Rate employees leave", "Sales volume", "A type of pastry"], correct: 1 },
  { question: "A 'grievance' is:", options: ["A party", "A formal complaint", "A reward", "A meeting"], correct: 1 },
  { question: "'Severance' pay is given when:", options: ["Hired", "Promoted", "Employment ends", "On vacation"], correct: 2 },
  { question: "'Diversity' means:", options: ["Everyone is the same", "Variety of people", "One culture", "A department"], correct: 1 },
  { question: "'Redundancy' means:", options: ["A promotion", "Job loss due to role elimination", "Overtime", "A transfer"], correct: 1 }
);
b7.examQuestions.push(
  { question: "High employee 'turnover' is:", options: ["Good for business", "Costly for companies", "Normal always", "Desired"], correct: 1 },
  { question: "A 'severance package' includes:", options: ["Only a letter", "Pay and benefits on departure", "A promotion", "More work"], correct: 1 },
  { question: "Filing a 'grievance' is:", options: ["Rude", "An employee right", "Illegal", "Optional only for managers"], correct: 1 },
  { question: "Workplace 'diversity' improves:", options: ["Nothing", "Innovation and perspective", "Conflict only", "Costs"], correct: 1 }
);

const b8 = businessEnglishLessons["business-8"];
b8.vocabulary.push(
  { word: "Influencer", meaning: "Person with power to affect buying decisions", example: "We partnered with an influencer.", emoji: "📱", arabic: "مؤثر" },
  { word: "ROI", meaning: "Return on Investment", example: "The campaign's ROI was excellent.", emoji: "📊", arabic: "عائد الاستثمار" },
  { word: "Demographics", meaning: "Statistical data about a population", example: "Study the target demographics.", emoji: "👥", arabic: "بيانات ديموغرافية" },
  { word: "Viral", meaning: "Spreading rapidly online", example: "The video went viral.", emoji: "🔥", arabic: "منتشر" },
  { word: "Rebrand", meaning: "To change a company's image", example: "We plan to rebrand next year.", emoji: "🎨", arabic: "إعادة تسمية" }
);
b8.dialogue.push(
  { speaker: "Director", text: "Should we partner with an influencer for the launch?" },
  { speaker: "Marketer", text: "Yes, our target demographics are active on social media." },
  { speaker: "Director", text: "What kind of ROI can we expect?" },
  { speaker: "Marketer", text: "Based on similar campaigns, at least 3x return." },
  { speaker: "Director", text: "Let's also consider whether we need to rebrand the product line." }
);
b8.grammar.examples.push(
  { sentence: "The campaign has been performing well since launch.", note: "Present perfect continuous for ongoing result" },
  { sentence: "We haven't decided on the final slogan yet.", note: "'Yet' — action still pending" }
);
b8.vocabExercises.push(
  { question: "An 'influencer' affects:", options: ["Stock prices", "Buying decisions", "Weather", "Laws"], correct: 1 },
  { question: "'Demographics' refers to:", options: ["Product features", "Population statistics", "Brand colors", "Ad placements"], correct: 1 },
  { question: "A 'viral' post:", options: ["Is deleted quickly", "Spreads rapidly online", "Gets no views", "Is private"], correct: 1 },
  { question: "To 'rebrand' is to:", options: ["Keep the same image", "Change a company's image", "Close the company", "Merge with another"], correct: 1 },
  { question: "'ROI' measures:", options: ["Customer satisfaction", "Return on investment", "Employee count", "Office space"], correct: 1 }
);
b8.examQuestions.push(
  { question: "Working with 'influencers' helps:", options: ["Internal communication", "Reaching target audiences", "Legal compliance", "Accounting"], correct: 1 },
  { question: "'Viral' content is valuable because:", options: ["It's expensive", "It spreads organically to many people", "It's private", "It requires no effort"], correct: 1 },
  { question: "'Demographics' help marketers:", options: ["Guess randomly", "Understand their audience", "Set prices", "Write code"], correct: 1 },
  { question: "A 'rebrand' involves changing:", options: ["The CEO", "The company's image and identity", "Employee salaries", "Office location"], correct: 1 }
);

const b9 = businessEnglishLessons["business-9"];
b9.vocabulary.push(
  { word: "Backorder", meaning: "An order for out-of-stock items", example: "Those items are on backorder.", emoji: "📋", arabic: "طلب مؤجل" },
  { word: "Throughput", meaning: "Amount of work processed in a time period", example: "We need to increase throughput.", emoji: "⚡", arabic: "معدل الإنتاج" },
  { word: "Bottleneck", meaning: "A point causing delays in the process", example: "Quality checks are a bottleneck.", emoji: "🔧", arabic: "عنق زجاجة" },
  { word: "Distribution", meaning: "The delivery of goods to retailers", example: "Our distribution network is wide.", emoji: "🚛", arabic: "توزيع" },
  { word: "Traceability", meaning: "Ability to track a product's journey", example: "Traceability ensures food safety.", emoji: "📍", arabic: "تتبع" }
);
b9.dialogue.push(
  { speaker: "Manager", text: "How's the throughput at the main warehouse?" },
  { speaker: "Logistics", text: "It improved 15% after we removed the quality bottleneck." },
  { speaker: "Manager", text: "Any items on backorder?" },
  { speaker: "Logistics", text: "About 200 units. We expect delivery by next Wednesday." },
  { speaker: "Manager", text: "Good. Let's ensure full traceability on all shipments." }
);
b9.grammar.examples.push(
  { sentence: "The shipment is being processed at the warehouse.", note: "Present continuous passive" },
  { sentence: "By next month, we will have shipped 10,000 units.", note: "Future perfect for completion target" }
);
b9.vocabExercises.push(
  { question: "A 'backorder' is for:", options: ["In-stock items", "Out-of-stock items", "Returned items", "Free items"], correct: 1 },
  { question: "'Throughput' measures:", options: ["Profit", "Work processed in a period", "Employee count", "Temperature"], correct: 1 },
  { question: "'Traceability' helps with:", options: ["Advertising", "Tracking a product's journey", "Hiring", "Design"], correct: 1 },
  { question: "'Distribution' involves:", options: ["Manufacturing", "Delivering goods to retailers", "Designing products", "Training staff"], correct: 1 },
  { question: "A 'bottleneck' in logistics:", options: ["Speeds things up", "Causes delays", "Reduces costs", "Improves quality"], correct: 1 }
);
b9.examQuestions.push(
  { question: "'Throughput' improvement means:", options: ["Slower work", "More work processed", "Less inventory", "Higher prices"], correct: 1 },
  { question: "'Traceability' is critical for:", options: ["Marketing", "Product safety and accountability", "Office design", "Team building"], correct: 1 },
  { question: "Items on 'backorder' are:", options: ["Ready to ship", "Not yet available", "Returned", "Discounted"], correct: 1 },
  { question: "A 'distribution' network should be:", options: ["Narrow", "Efficient and wide-reaching", "Slow", "Expensive"], correct: 1 }
);

const b10 = businessEnglishLessons["business-10"];
b10.vocabulary.push(
  { word: "Retention", meaning: "Keeping existing customers", example: "Customer retention is key to growth.", emoji: "🔒", arabic: "الاحتفاظ بالعملاء" },
  { word: "Churn rate", meaning: "Rate at which customers stop buying", example: "Our churn rate dropped to 5%.", emoji: "📉", arabic: "معدل فقدان العملاء" },
  { word: "Upsell", meaning: "To encourage buying a more expensive option", example: "Try to upsell the premium plan.", emoji: "⬆️", arabic: "بيع أعلى" },
  { word: "Omnichannel", meaning: "Seamless experience across all channels", example: "We offer omnichannel support.", emoji: "🔗", arabic: "متعدد القنوات" },
  { word: "Ticket", meaning: "A customer service request", example: "Open a support ticket.", emoji: "🎫", arabic: "تذكرة دعم" }
);
b10.dialogue.push(
  { speaker: "Agent", text: "I've opened a support ticket for your issue — number #4521." },
  { speaker: "Customer", text: "How long will it take to resolve?" },
  { speaker: "Agent", text: "Our SLA guarantees a response within 24 hours." },
  { speaker: "Customer", text: "Can I track the ticket status online?" },
  { speaker: "Agent", text: "Yes, you can check it anytime through our omnichannel platform." }
);
b10.grammar.examples.push(
  { sentence: "I do apologize for the inconvenience.", note: "'Do apologize' — emphatic apology" },
  { sentence: "Rest assured, we will resolve this promptly.", note: "'Rest assured' — reassuring phrase" }
);
b10.vocabExercises.push(
  { question: "'Retention' means:", options: ["Losing customers", "Keeping existing customers", "Gaining new ones", "Firing employees"], correct: 1 },
  { question: "'Churn rate' measures:", options: ["Profit growth", "Rate customers leave", "Employee satisfaction", "Website traffic"], correct: 1 },
  { question: "To 'upsell' means:", options: ["Give a discount", "Encourage a more expensive purchase", "Return an item", "Cancel an order"], correct: 1 },
  { question: "'Omnichannel' means:", options: ["One channel only", "Seamless across all channels", "No channels", "Physical only"], correct: 1 },
  { question: "A support 'ticket' is:", options: ["A movie ticket", "A customer service request", "A parking fine", "A receipt"], correct: 1 }
);
b10.examQuestions.push(
  { question: "Low 'churn rate' is:", options: ["Bad for business", "Good — means customers stay", "Irrelevant", "Expensive"], correct: 1 },
  { question: "'Upselling' benefits:", options: ["Only the customer", "Both company and customer", "Only competitors", "Nobody"], correct: 1 },
  { question: "'Omnichannel' support provides:", options: ["Inconsistent service", "Seamless experience across platforms", "Phone support only", "Email only"], correct: 1 },
  { question: "Customer 'retention' is cheaper than:", options: ["Nothing", "Acquiring new customers", "Hiring", "Training"], correct: 1 }
);

export {};
