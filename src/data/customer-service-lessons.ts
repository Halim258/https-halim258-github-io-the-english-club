import type { LessonData, MCQItem, VocabWord } from "./lessons";

type CustomerServiceSpec = {
  title: string;
  description: string;
  focus: string;
  vocabulary: Array<[string, string, string, string, string]>;
  grammar: { title: string; explanation: string; examples: Array<{ sentence: string; note: string }> };
  dialogue: Array<{ speaker: string; text: string }>;
  task: string;
};

const specs: CustomerServiceSpec[] = [
  {
    title: "The Customer Service Role",
    description: "Understand the purpose of customer service and the responsibilities of a service professional.",
    focus: "customer service roles",
    vocabulary: [
      ["customer", "a person who buys or uses a service", "عميل", "A customer called about a delivery.", "👤"],
      ["service", "help or work provided to a customer", "خدمة", "Our service is available every day.", "🛎️"],
      ["support", "help given to solve a problem", "دعم", "The support team helped me quickly.", "🤝"],
      ["request", "something a customer asks for", "طلب", "We received a request for a new invoice.", "📝"],
      ["representative", "a person who speaks for a company", "ممثل", "A representative will call you back.", "🎧"],
      ["satisfaction", "the feeling that a service is good", "رضا", "Customer satisfaction is our main goal.", "⭐"],
    ],
    grammar: {
      title: "Present simple for responsibilities",
      explanation: "Use the present simple to describe regular duties and company policies. Add -s with he, she, or it: 'The agent answers calls.'",
      examples: [
        { sentence: "I answer customer questions every day.", note: "Regular responsibility" },
        { sentence: "The team checks every request.", note: "He, she, or it takes -s" },
        { sentence: "We support customers by phone and email.", note: "Company service" },
      ],
    },
    dialogue: [
      { speaker: "Supervisor", text: "What does a customer service representative do?" },
      { speaker: "Agent", text: "I answer questions, solve problems, and record each request." },
      { speaker: "Supervisor", text: "Good. What is our main goal?" },
      { speaker: "Agent", text: "We want every customer to receive helpful and respectful service." },
    ],
    task: "Write five customer service responsibilities using the present simple.",
  },
  {
    title: "Welcoming Customers",
    description: "Open conversations warmly in person, by phone, and through digital channels.",
    focus: "professional greetings",
    vocabulary: [
      ["welcome", "to greet someone in a friendly way", "يرحب", "Welcome to our customer support team.", "👋"],
      ["assist", "to help someone", "يساعد", "How may I assist you today?", "🤲"],
      ["inquiry", "a question asking for information", "استفسار", "Thank you for your inquiry.", "❓"],
      ["available", "ready to help or be used", "متاح", "An agent is available now.", "🟢"],
      ["introduce", "to give your name or explain who you are", "يعرّف", "Let me introduce myself.", "🙋"],
      ["professional", "suitable for work and business", "مهني", "Use a professional tone with every customer.", "💼"],
    ],
    grammar: {
      title: "Polite questions with may and can",
      explanation: "Use 'How may I...?' and 'How can I...?' to offer help politely. Use 'Could you...?' when asking the customer for information.",
      examples: [
        { sentence: "How may I assist you today?", note: "Polite offer" },
        { sentence: "Could you tell me your order number, please?", note: "Polite request" },
        { sentence: "How can we help you?", note: "Friendly service question" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "Good morning. Welcome to Bright Store. How may I assist you?" },
      { speaker: "Customer", text: "I have an inquiry about my order." },
      { speaker: "Agent", text: "Of course. Could you tell me your order number, please?" },
      { speaker: "Customer", text: "Yes, it is 4582. Thank you for your help." },
    ],
    task: "Write a professional opening for a customer who contacts your company.",
  },
  {
    title: "Active Listening",
    description: "Listen carefully, show attention, and confirm what the customer means.",
    focus: "active listening",
    vocabulary: [
      ["listen", "to pay attention to what someone says", "يستمع", "Please listen carefully to the customer.", "👂"],
      ["understand", "to know the meaning of something", "يفهم", "I understand your question.", "💡"],
      ["confirm", "to check that information is correct", "يؤكد", "Let me confirm your address.", "✅"],
      ["repeat", "to say something again", "يكرر", "Could you repeat the last number?", "🔁"],
      ["detail", "a small piece of information", "تفصيل", "I need one more detail.", "🔎"],
      ["note", "a short written record", "ملاحظة", "I am making a note of your request.", "📌"],
    ],
    grammar: {
      title: "Checking and confirming information",
      explanation: "Use 'So, you mean...' to check meaning and 'Let me make sure...' to confirm details before taking action.",
      examples: [
        { sentence: "So, you mean the package arrived late?", note: "Checking meaning" },
        { sentence: "Let me make sure I have the correct address.", note: "Confirming information" },
        { sentence: "I understand that you need a replacement.", note: "Showing understanding" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "The package came, but one item is missing." },
      { speaker: "Agent", text: "I understand. So, one item is missing from your delivery?" },
      { speaker: "Customer", text: "Yes, that is correct." },
      { speaker: "Agent", text: "Let me confirm the item and make a note of your report." },
    ],
    task: "Write three sentences that show you are listening and checking details.",
  },
  {
    title: "Asking Clear Questions",
    description: "Use focused questions to collect the information needed to help a customer.",
    focus: "clarifying questions",
    vocabulary: [
      ["clarify", "to make something clear", "يوضح", "May I clarify one point?", "🔦"],
      ["issue", "a problem or subject to discuss", "مشكلة", "What is the main issue?", "⚠️"],
      ["specific", "clear and exact", "محدد", "Could you give a specific example?", "🎯"],
      ["when", "at what time or date", "متى", "When did the problem start?", "🕒"],
      ["where", "in what place", "أين", "Where did you place the order?", "📍"],
      ["exactly", "in a completely correct way", "بالضبط", "What happened exactly?", "📋"],
    ],
    grammar: {
      title: "Question words for customer information",
      explanation: "Use what, when, where, who, and how to collect precise information. Keep questions short and ask one question at a time.",
      examples: [
        { sentence: "When did you receive the message?", note: "Time" },
        { sentence: "Where did the problem happen?", note: "Place" },
        { sentence: "What would you like us to do?", note: "Need or preference" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "I would like to understand the issue clearly." },
      { speaker: "Customer", text: "My payment was not accepted." },
      { speaker: "Agent", text: "When did you try to pay, and which payment method did you use?" },
      { speaker: "Customer", text: "I tried this morning with my card." },
    ],
    task: "Write five clear questions to investigate a customer problem.",
  },
  {
    title: "Showing Empathy",
    description: "Acknowledge how a customer feels and respond with calm, human language.",
    focus: "empathy and reassurance",
    vocabulary: [
      ["empathy", "understanding another person's feelings", "تعاطف", "Empathy helps us support upset customers.", "❤️"],
      ["frustrated", "annoyed because something is difficult", "محبط", "I understand why you feel frustrated.", "😟"],
      ["sorry", "a polite word used when something is wrong", "آسف", "I am sorry for the delay.", "🙏"],
      ["reassure", "to make someone feel less worried", "يطمئن", "I want to reassure you that we are helping.", "🛡️"],
      ["patient", "able to wait calmly", "صبور", "Thank you for being patient.", "⏳"],
      ["concern", "a worry or problem", "مصدر قلق", "I understand your concern.", "💬"],
    ],
    grammar: {
      title: "I understand + feeling and reason",
      explanation: "Name the feeling without blaming the customer: 'I understand this is frustrating.' Then state the next helpful action.",
      examples: [
        { sentence: "I understand that this delay is frustrating.", note: "Acknowledging a feeling" },
        { sentence: "I am sorry that you had this problem.", note: "Apologising professionally" },
        { sentence: "I will check this for you now.", note: "Giving reassurance through action" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "I have waited all week and still have no answer." },
      { speaker: "Agent", text: "I understand how frustrating that must be, and I am sorry for the delay." },
      { speaker: "Customer", text: "Can someone help me today?" },
      { speaker: "Agent", text: "Yes. I will check your case now and update you before the end of the day." },
    ],
    task: "Write a calm, empathetic reply to a customer who has waited too long.",
  },
  {
    title: "Positive Service Language",
    description: "Replace negative or unclear expressions with helpful, professional alternatives.",
    focus: "positive language",
    vocabulary: [
      ["solution", "a way to solve a problem", "حل", "Let us find a solution together.", "🧩"],
      ["option", "one possible choice", "خيار", "I can offer you two options.", "🔀"],
      ["instead", "in place of something else", "بدلاً من ذلك", "We can send a replacement instead.", "↪️"],
      ["certainly", "definitely; yes in a polite way", "بالتأكيد", "Certainly, I can help with that.", "👍"],
      ["unfortunately", "used to introduce bad news politely", "للأسف", "Unfortunately, that item is unavailable.", "ℹ️"],
      ["possible", "able to happen or be done", "ممكن", "We will do everything possible.", "🌱"],
    ],
    grammar: {
      title: "Can, can’t, and alternatives",
      explanation: "When something is not possible, explain briefly and offer an alternative with 'We can...' or 'Another option is...'.",
      examples: [
        { sentence: "I cannot change the past delivery, but I can arrange a new one.", note: "Limit plus solution" },
        { sentence: "Another option is to collect the item tomorrow.", note: "Offering a choice" },
        { sentence: "Certainly, I can update the address.", note: "Positive response" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "Can you deliver it this afternoon?" },
      { speaker: "Agent", text: "Unfortunately, afternoon delivery is not possible today." },
      { speaker: "Customer", text: "What can you do instead?" },
      { speaker: "Agent", text: "I can offer morning delivery tomorrow or a collection today." },
    ],
    task: "Rewrite three negative service sentences so they include a helpful alternative.",
  },
  {
    title: "Understanding Products and Services",
    description: "Explain features, benefits, prices, and limits in simple, accurate language.",
    focus: "product information",
    vocabulary: [
      ["feature", "an important part or quality of a product", "ميزة", "This feature saves time.", "⚙️"],
      ["benefit", "a good result from a product or service", "فائدة", "The main benefit is faster delivery.", "📈"],
      ["price", "the amount of money needed to buy something", "سعر", "The price includes delivery.", "💳"],
      ["include", "to have something as part of a group", "يشمل", "The plan includes free support.", "➕"],
      ["available", "ready to buy or use", "متاح", "The blue model is available.", "📦"],
      ["recommend", "to suggest something as a good choice", "يوصي", "I recommend the standard plan.", "🌟"],
    ],
    grammar: {
      title: "Comparatives for helpful recommendations",
      explanation: "Use 'cheaper', 'faster', or 'more suitable' to compare options. Explain the reason for your recommendation.",
      examples: [
        { sentence: "The standard plan is cheaper than the premium plan.", note: "Price comparison" },
        { sentence: "The premium plan is more suitable for large teams.", note: "Long adjective comparison" },
        { sentence: "I recommend this option because it includes priority support.", note: "Recommendation and reason" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "Which plan is best for a small business?" },
      { speaker: "Agent", text: "The standard plan is more suitable and includes email support." },
      { speaker: "Customer", text: "Is the premium plan faster?" },
      { speaker: "Agent", text: "Yes, it includes priority support, but the price is higher." },
    ],
    task: "Compare two products and recommend one with two clear reasons.",
  },
  {
    title: "Orders, Delivery, and Returns",
    description: "Guide customers through order status, delivery times, exchanges, and returns.",
    focus: "orders and returns",
    vocabulary: [
      ["order", "a request to buy something", "طلب شراء", "Your order is being prepared.", "🛒"],
      ["dispatch", "to send an order", "يشحن", "We will dispatch your order today.", "🚚"],
      ["delivery", "the act of bringing something to a customer", "توصيل", "Delivery usually takes two days.", "📦"],
      ["return", "to send a purchase back", "إرجاع", "You can return the item within 14 days.", "↩️"],
      ["exchange", "to replace one item with another", "استبدال", "We can arrange an exchange.", "🔄"],
      ["tracking", "information showing where a delivery is", "تتبع", "Here is your tracking number.", "📍"],
    ],
    grammar: {
      title: "Future arrangements with will and going to",
      explanation: "Use 'will' for a promise or decision now. Use 'going to' for an arranged plan or expected action.",
      examples: [
        { sentence: "I will send you the tracking link now.", note: "Immediate promise" },
        { sentence: "Your order is going to leave our warehouse today.", note: "Planned action" },
        { sentence: "We will arrange an exchange for you.", note: "Service commitment" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "Where is my order? The delivery date was yesterday." },
      { speaker: "Agent", text: "I am sorry. I will check the tracking information now." },
      { speaker: "Agent", text: "It is going to arrive tomorrow morning." },
      { speaker: "Customer", text: "Thank you for checking that for me." },
    ],
    task: "Write a short customer reply explaining an order delay and the next delivery step.",
  },
  {
    title: "Billing and Payments",
    description: "Discuss invoices, charges, payment methods, and refunds clearly and safely.",
    focus: "billing and payments",
    vocabulary: [
      ["invoice", "a document showing money owed", "فاتورة", "I will email the invoice today.", "🧾"],
      ["charge", "an amount of money taken for a service", "رسوم", "I cannot see this charge on my account.", "💰"],
      ["refund", "money returned after a payment", "استرداد", "Your refund will arrive in five days.", "↩️"],
      ["receipt", "proof that payment was made", "إيصال", "Would you like a receipt?", "🧾"],
      ["payment", "money given for a product or service", "دفع", "Your payment was successful.", "💳"],
      ["secure", "protected from danger or unauthorised use", "آمن", "Please use our secure payment page.", "🔒"],
    ],
    grammar: {
      title: "Explaining amounts and time",
      explanation: "Use 'was/were charged' for a past payment and 'will be refunded' for a promised return of money.",
      examples: [
        { sentence: "You were charged £20 for delivery.", note: "Past payment" },
        { sentence: "The full amount will be refunded within five days.", note: "Future passive" },
        { sentence: "Your receipt was sent by email.", note: "Completed action" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "I was charged twice for the same order." },
      { speaker: "Agent", text: "I am sorry about that. I will check the payment record." },
      { speaker: "Agent", text: "You were charged twice, so one payment will be refunded." },
      { speaker: "Customer", text: "When will I receive the refund?" },
    ],
    task: "Write a polite response to a customer who reports an incorrect charge.",
  },
  {
    title: "Phone and Email Support",
    description: "Use the right structure and tone for telephone conversations and support emails.",
    focus: "phone and email channels",
    vocabulary: [
      ["call", "a conversation by telephone", "مكالمة", "I will make a follow-up call.", "📞"],
      ["hold", "a short wait during a telephone call", "انتظار على الهاتف", "May I place you on hold?", "⏸️"],
      ["voicemail", "a recorded telephone message", "بريد صوتي", "Please leave a voicemail after the tone.", "🎙️"],
      ["subject", "the title of an email", "موضوع", "Use a clear subject line.", "✉️"],
      ["attachment", "a file sent with an email", "مرفق", "I have included the invoice as an attachment.", "📎"],
      ["follow-up", "a later message about an earlier matter", "متابعة", "I am sending a follow-up to our call.", "🔁"],
    ],
    grammar: {
      title: "Email sequence and polite telephone phrases",
      explanation: "Use a clear sequence: greeting, reason, action, and closing. Use 'May I put you on hold?' rather than direct commands.",
      examples: [
        { sentence: "Thank you for contacting Bright Store.", note: "Email opening" },
        { sentence: "May I put you on hold for one minute?", note: "Polite phone request" },
        { sentence: "Please let me know if you need anything else.", note: "Professional closing" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "Thank you for calling Bright Store. How may I help?" },
      { speaker: "Customer", text: "I need a copy of my invoice." },
      { speaker: "Agent", text: "Certainly. May I place you on hold while I find it?" },
      { speaker: "Agent", text: "I have sent the invoice by email. Please check the attachment." },
    ],
    task: "Write a five-line support email with a greeting, solution, and professional closing.",
  },
  {
    title: "Chat and Social Media Support",
    description: "Answer quickly and professionally when customers contact a company online.",
    focus: "digital support",
    vocabulary: [
      ["chat", "a written conversation online", "محادثة", "Our live chat is open until 10 p.m.", "💬"],
      ["reply", "an answer to a message", "رد", "We will reply within one hour.", "↩️"],
      ["public", "seen by everyone", "عام", "Do not share personal details in a public comment.", "🌐"],
      ["private", "not seen by everyone", "خاص", "Please send your order number in a private message.", "🔐"],
      ["urgent", "needing quick attention", "عاجل", "I will mark this as urgent.", "🚨"],
      ["response", "an answer or reaction", "استجابة", "Thank you for your quick response.", "⚡"],
    ],
    grammar: {
      title: "Short, clear online replies",
      explanation: "Online support should be friendly and direct. Use one idea per sentence, avoid slang, and move private information to a secure channel.",
      examples: [
        { sentence: "Thanks for reaching out. We can help with that.", note: "Friendly opening" },
        { sentence: "Please send your order number by private message.", note: "Protecting information" },
        { sentence: "We will respond within one business day.", note: "Setting a time expectation" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "My order has not arrived. Can you help?" },
      { speaker: "Agent", text: "Thanks for reaching out. We can check that for you." },
      { speaker: "Agent", text: "Please send your order number in a private message." },
      { speaker: "Customer", text: "I have sent it. Thank you for your quick response." },
    ],
    task: "Write a short public reply that moves a customer’s personal details to a private channel.",
  },
  {
    title: "Troubleshooting Step by Step",
    description: "Guide customers through simple checks and explain technical steps in order.",
    focus: "troubleshooting",
    vocabulary: [
      ["troubleshoot", "to find and fix the cause of a problem", "يستكشف العطل", "Let us troubleshoot the connection.", "🛠️"],
      ["restart", "to stop and start a device again", "يعيد التشغيل", "Please restart the device.", "🔄"],
      ["connect", "to join or link to something", "يتصل", "Is the cable connected?", "🔌"],
      ["check", "to look at something carefully", "يفحص", "First, check the power light.", "☑️"],
      ["step", "one action in a process", "خطوة", "The next step is simple.", "1️⃣"],
      ["screen", "the flat surface that shows information", "شاشة", "What do you see on the screen?", "🖥️"],
    ],
    grammar: {
      title: "Imperatives and sequence words",
      explanation: "Use a base verb for instructions: 'Check the cable.' Add first, then, next, and finally to make the order clear.",
      examples: [
        { sentence: "First, check the power cable.", note: "First instruction" },
        { sentence: "Then, restart the device.", note: "Second instruction" },
        { sentence: "Finally, try to connect again.", note: "Last instruction" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "The screen is on, but I cannot connect." },
      { speaker: "Agent", text: "First, check that the cable is firmly connected." },
      { speaker: "Customer", text: "It is connected. What is the next step?" },
      { speaker: "Agent", text: "Then restart the device and try again." },
    ],
    task: "Write four numbered troubleshooting steps for a simple service problem.",
  },
  {
    title: "Handling Complaints",
    description: "Receive a complaint without arguing, investigate the facts, and offer a fair response.",
    focus: "complaint handling",
    vocabulary: [
      ["complaint", "a statement that something is wrong", "شكوى", "We take every complaint seriously.", "📣"],
      ["apologise", "to say sorry for a problem", "يعتذر", "I apologise for the inconvenience.", "🙏"],
      ["investigate", "to find out what happened", "يحقق", "We will investigate the issue.", "🔍"],
      ["inconvenience", "a problem that makes life difficult", "إزعاج", "Thank you for reporting this inconvenience.", "⏰"],
      ["fair", "reasonable and treating people equally", "عادل", "We want to find a fair solution.", "⚖️"],
      ["resolve", "to solve a problem", "يحل", "I will do my best to resolve this.", "✅"],
    ],
    grammar: {
      title: "Past simple for complaint facts",
      explanation: "Use the past simple to ask what happened, then use present or future language to explain the solution.",
      examples: [
        { sentence: "When did the problem start?", note: "Past event question" },
        { sentence: "You received the wrong item yesterday.", note: "Past fact" },
        { sentence: "I will investigate this and contact you tomorrow.", note: "Next action" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "I received the wrong item, and nobody answered my emails." },
      { speaker: "Agent", text: "I apologise for the inconvenience. I understand why you are unhappy." },
      { speaker: "Agent", text: "I will investigate the emails and arrange the correct item." },
      { speaker: "Customer", text: "Thank you. I would like a clear update, please." },
    ],
    task: "Write a four-step response to a complaint: acknowledge, apologise, investigate, and resolve.",
  },
  {
    title: "De-escalating Difficult Conversations",
    description: "Stay calm, set respectful boundaries, and move an emotional conversation toward a solution.",
    focus: "de-escalation",
    vocabulary: [
      ["calm", "not angry or excited", "هادئ", "Please remain calm while I check this.", "🌿"],
      ["tone", "the feeling in a person’s voice or words", "نبرة", "Use a calm and respectful tone.", "🎵"],
      ["boundary", "a clear limit on acceptable behaviour", "حد", "We need to set a respectful boundary.", "🛑"],
      ["behaviour", "the way a person acts", "سلوك", "We cannot accept abusive behaviour.", "🧭"],
      ["escalate", "to send a problem to a higher level", "يصعّد", "I can escalate this to my manager.", "⬆️"],
      ["priority", "something treated as more important", "أولوية", "I will mark your case as a priority.", "⭐"],
    ],
    grammar: {
      title: "Could, would, and respectful boundaries",
      explanation: "Use calm modal phrases to offer choices and set limits: 'Could we focus on the order?' and 'I can help if we speak respectfully.'",
      examples: [
        { sentence: "Could we focus on finding a solution?", note: "Redirecting calmly" },
        { sentence: "I can help if we speak respectfully.", note: "Clear boundary" },
        { sentence: "I would like to involve my manager.", note: "Offering escalation" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "This is unacceptable! I want an answer now." },
      { speaker: "Agent", text: "I understand that you need an answer quickly." },
      { speaker: "Agent", text: "I can help if we speak respectfully. Could we focus on the order?" },
      { speaker: "Customer", text: "All right. I need to know when it will arrive." },
    ],
    task: "Write a calm reply that acknowledges anger, sets a respectful boundary, and offers help.",
  },
  {
    title: "Service Recovery",
    description: "Turn a service failure into a clear recovery plan and rebuild customer trust.",
    focus: "service recovery",
    vocabulary: [
      ["failure", "a situation in which something does not work", "فشل", "We are sorry about this service failure.", "⚠️"],
      ["recover", "to return to a good situation after a problem", "يتعافى", "We want to recover your trust.", "🌤️"],
      ["replace", "to provide a new item instead of a damaged one", "يستبدل", "We can replace the damaged product.", "🔁"],
      ["compensation", "money or a benefit given for a problem", "تعويض", "The manager approved compensation.", "🎁"],
      ["trust", "belief that someone is reliable", "ثقة", "Clear updates help build trust.", "🤝"],
      ["prevent", "to stop something from happening", "يمنع", "We will prevent this problem in the future.", "🛡️"],
    ],
    grammar: {
      title: "If clauses for prevention",
      explanation: "Use 'if' to discuss a condition and its result: 'If we check the address, we can prevent another delay.'",
      examples: [
        { sentence: "If we replace the item today, the customer will receive it tomorrow.", note: "Condition and result" },
        { sentence: "If you prefer, we can offer a refund.", note: "Offering a choice" },
        { sentence: "We will prevent this problem by checking every order.", note: "Prevention plan" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "We made a mistake with your order, and we are sorry." },
      { speaker: "Customer", text: "What will you do to fix it?" },
      { speaker: "Agent", text: "If you agree, we will replace the item today and refund the delivery charge." },
      { speaker: "Customer", text: "That is a fair solution. Thank you." },
    ],
    task: "Create a service recovery plan with two actions and one prevention step.",
  },
  {
    title: "Accounts and Customer Records",
    description: "Update customer details accurately while protecting private information.",
    focus: "customer records",
    vocabulary: [
      ["account", "a record of a customer and their activity", "حساب", "I can find your account with your email.", "👤"],
      ["profile", "information about a customer", "ملف شخصي", "Your profile needs an updated phone number.", "🪪"],
      ["verify", "to check that something is true", "يتحقق", "We need to verify your identity.", "✔️"],
      ["privacy", "the right to keep personal information protected", "خصوصية", "Customer privacy is important.", "🔒"],
      ["permission", "approval to do something", "إذن", "We need your permission to change the account.", "🗝️"],
      ["update", "to make information current", "يحدّث", "I will update your address.", "🔃"],
    ],
    grammar: {
      title: "Need to, must, and can for policy",
      explanation: "Use 'need to' and 'must' for required steps, and 'can' for permitted actions. Never promise access without verification.",
      examples: [
        { sentence: "We need to verify your identity first.", note: "Required process" },
        { sentence: "You must not share your password.", note: "Security rule" },
        { sentence: "I can update the phone number after verification.", note: "Permitted action" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "Please change the email on my account." },
      { speaker: "Agent", text: "I can help with that, but we need to verify your identity first." },
      { speaker: "Customer", text: "What information do you need?" },
      { speaker: "Agent", text: "I need two details from your profile. Please do not share your password." },
    ],
    task: "Write three customer-record rules using must, must not, and can.",
  },
  {
    title: "Accessibility and Inclusive Service",
    description: "Adapt communication so every customer can understand and use the service.",
    focus: "accessible service",
    vocabulary: [
      ["accessible", "easy for people with different needs to use", "متاح للجميع", "Our website is accessible.", "♿"],
      ["inclusive", "welcoming and involving everyone", "شامل", "We provide inclusive service.", "🌍"],
      ["adapt", "to change something for a need", "يكيّف", "We can adapt the format for you.", "🧩"],
      ["clear", "easy to understand", "واضح", "Use clear language in every message.", "🔎"],
      ["format", "the way information is arranged or shared", "تنسيق", "Which format do you prefer?", "📄"],
      ["supportive", "helpful and encouraging", "داعِم", "Our staff are supportive and patient.", "🤲"],
    ],
    grammar: {
      title: "Offering choices respectfully",
      explanation: "Ask what the customer needs instead of guessing. Use 'Would you prefer...?' and 'What would work best for you?'.",
      examples: [
        { sentence: "Would you prefer an email or a phone call?", note: "Offering a choice" },
        { sentence: "What format would work best for you?", note: "Respectful question" },
        { sentence: "We can provide the information in large print.", note: "Offering an adaptation" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "I need the instructions in a different format." },
      { speaker: "Agent", text: "Of course. What format would work best for you?" },
      { speaker: "Customer", text: "Large print would be helpful." },
      { speaker: "Agent", text: "Certainly. We can send the instructions in large print today." },
    ],
    task: "Write a respectful exchange where an agent asks about and provides an accessibility need.",
  },
  {
    title: "Cultural Awareness",
    description: "Communicate respectfully with customers from different cultures, languages, and backgrounds.",
    focus: "cultural awareness",
    vocabulary: [
      ["culture", "the customs and ideas of a group", "ثقافة", "Culture can influence communication.", "🌍"],
      ["respect", "polite care for another person", "احترام", "Treat every customer with respect.", "🤝"],
      ["custom", "a traditional way of doing something", "عادة", "Ask about local customs when needed.", "🏛️"],
      ["misunderstanding", "a failure to understand correctly", "سوء فهم", "Let us correct the misunderstanding.", "↔️"],
      ["patient", "calm when something takes time", "صبور", "Please be patient while we translate.", "⏳"],
      ["language", "a system used for communication", "لغة", "We can support several languages.", "🗣️"],
    ],
    grammar: {
      title: "Clarifying without making assumptions",
      explanation: "Use neutral questions such as 'Could you explain what you mean?' Avoid guessing a customer’s needs, background, or preferences.",
      examples: [
        { sentence: "Could you explain what you need?", note: "Neutral clarification" },
        { sentence: "Would you like an interpreter?", note: "Offering language support" },
        { sentence: "I want to make sure I understand you correctly.", note: "Respectful checking" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "I am not sure what this form means." },
      { speaker: "Agent", text: "I want to make sure I explain it clearly. Which part is difficult?" },
      { speaker: "Customer", text: "The payment section, please." },
      { speaker: "Agent", text: "Of course. I will explain it slowly and answer your questions." },
    ],
    task: "Write four sentences that show respect and clarify a possible misunderstanding.",
  },
  {
    title: "Escalation and Team Handoffs",
    description: "Know when to involve a supervisor and transfer a case without making the customer repeat everything.",
    focus: "escalation and handoffs",
    vocabulary: [
      ["escalation", "moving a problem to a person with more authority", "تصعيد", "This case needs an escalation.", "⬆️"],
      ["supervisor", "a person who manages a team", "مشرف", "I will ask my supervisor to review this.", "🧑‍💼"],
      ["transfer", "to move a call or case to another team", "يحوّل", "I can transfer you to billing.", "🔀"],
      ["summary", "a short statement of the important facts", "ملخص", "I will give my colleague a summary.", "📋"],
      ["specialist", "a person with expert knowledge", "متخصص", "A technical specialist will contact you.", "🛠️"],
      ["ownership", "responsibility for managing a case", "مسؤولية", "I will keep ownership of your case.", "🧭"],
    ],
    grammar: {
      title: "Explaining reasons and next steps",
      explanation: "Tell the customer why a handoff is needed and what will happen next. Use 'because', 'so', and 'will'.",
      examples: [
        { sentence: "I am escalating this because it needs manager approval.", note: "Reason" },
        { sentence: "I will brief the specialist, so you do not need to repeat the details.", note: "Result and reassurance" },
        { sentence: "A supervisor will contact you within one business day.", note: "Clear expectation" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "This request needs manager approval, so I will escalate it." },
      { speaker: "Customer", text: "Will I need to explain everything again?" },
      { speaker: "Agent", text: "No. I will send the specialist a full summary and keep ownership of your case." },
      { speaker: "Customer", text: "That is helpful. Thank you." },
    ],
    task: "Write a handoff note with the customer’s issue, action taken, and next owner.",
  },
  {
    title: "CRM Notes and Case Management",
    description: "Record accurate case notes so the whole service team can continue the customer journey.",
    focus: "CRM case notes",
    vocabulary: [
      ["case", "a customer problem tracked by a team", "حالة", "I opened a case for your request.", "📁"],
      ["record", "to write or store information", "يسجل", "Please record the customer’s answer.", "🗃️"],
      ["status", "the current position of a case", "حالة", "The case status is now open.", "📊"],
      ["contact", "a message or conversation with someone", "تواصل", "I recorded our contact in the system.", "📞"],
      ["action", "something done to reach a result", "إجراء", "The next action is a replacement.", "✅"],
      ["accurate", "correct and without mistakes", "دقيق", "Keep the customer record accurate.", "🎯"],
    ],
    grammar: {
      title: "Past simple notes and concise writing",
      explanation: "CRM notes should state who, what, when, and the next action. Use short factual sentences and avoid emotional or personal comments.",
      examples: [
        { sentence: "Customer called on 12 May about a missing item.", note: "Date and reason" },
        { sentence: "Agent checked the order and opened a case.", note: "Action taken" },
        { sentence: "Next action: warehouse will contact customer tomorrow.", note: "Follow-up" },
      ],
    },
    dialogue: [
      { speaker: "Supervisor", text: "What should a good case note include?" },
      { speaker: "Agent", text: "It should include the date, the customer’s issue, our action, and the next step." },
      { speaker: "Supervisor", text: "Should you write your personal opinion?" },
      { speaker: "Agent", text: "No. Notes should be accurate, short, and professional." },
    ],
    task: "Write a concise CRM note about a delayed order, including the next action.",
  },
  {
    title: "Quality Standards and KPIs",
    description: "Understand service quality, response time, first-contact resolution, and customer feedback.",
    focus: "quality and performance",
    vocabulary: [
      ["quality", "how good a product or service is", "جودة", "We review service quality every week.", "🏅"],
      ["response time", "how long a customer waits for an answer", "وقت الاستجابة", "Our response time improved this month.", "⏱️"],
      ["resolution", "a successful solution to a problem", "حل", "First-contact resolution is an important measure.", "✅"],
      ["feedback", "opinions about a product or service", "ملاحظات", "We use feedback to improve.", "💬"],
      ["target", "a result a team aims to achieve", "هدف", "Our target is a response within one hour.", "🎯"],
      ["measure", "to check the size, amount, or level of something", "يقيس", "We measure customer satisfaction.", "📏"],
    ],
    grammar: {
      title: "Present perfect for progress",
      explanation: "Use the present perfect with 'has/have' to describe change or progress up to now: 'Response time has improved.'",
      examples: [
        { sentence: "Our response time has improved this month.", note: "Change until now" },
        { sentence: "The team has resolved 90% of cases.", note: "Result up to now" },
        { sentence: "We have received useful feedback.", note: "Recent experience" },
      ],
    },
    dialogue: [
      { speaker: "Manager", text: "How has the team performed this month?" },
      { speaker: "Analyst", text: "Our response time has improved, and we have resolved more cases on the first contact." },
      { speaker: "Manager", text: "What should we improve next?" },
      { speaker: "Analyst", text: "We should read customer feedback and reduce waiting time." },
    ],
    task: "Write a short quality report using three service measures.",
  },
  {
    title: "Retention and Customer Loyalty",
    description: "Build long-term relationships by following up, keeping promises, and recognising customer needs.",
    focus: "retention and loyalty",
    vocabulary: [
      ["retain", "to keep a customer or employee", "يحتفظ", "Good service helps us retain customers.", "🔗"],
      ["loyalty", "continued support for a company", "ولاء", "Customer loyalty grows through trust.", "❤️"],
      ["follow up", "to contact someone again later", "يتابع", "I will follow up after delivery.", "🔁"],
      ["promise", "a statement that you will do something", "وعد", "Keep every promise you make.", "🤝"],
      ["personalise", "to make something suitable for one person", "يخصص", "We personalise the customer experience.", "✨"],
      ["renew", "to continue a contract or service", "يجدد", "The customer wants to renew the plan.", "♻️"],
    ],
    grammar: {
      title: "Will and would for follow-up",
      explanation: "Use 'will' for a clear commitment and 'would' in polite offers or preference questions.",
      examples: [
        { sentence: "I will follow up with you tomorrow.", note: "Commitment" },
        { sentence: "Would you like us to call after delivery?", note: "Polite offer" },
        { sentence: "We would be happy to help you renew your plan.", note: "Professional offer" },
      ],
    },
    dialogue: [
      { speaker: "Agent", text: "I will follow up tomorrow to make sure everything is working well." },
      { speaker: "Customer", text: "That is excellent service." },
      { speaker: "Agent", text: "Would you like information about our renewal options?" },
      { speaker: "Customer", text: "Yes, please send it with the follow-up email." },
    ],
    task: "Write a follow-up message that thanks a customer and invites them to continue with the service.",
  },
  {
    title: "Safety, Fraud, and Sensitive Requests",
    description: "Recognise risky requests, protect customer information, and follow safe escalation procedures.",
    focus: "safety and data protection",
    vocabulary: [
      ["fraud", "illegal deception for money or personal gain", "احتيال", "We report suspected fraud immediately.", "🚩"],
      ["suspicious", "possibly unsafe or dishonest", "مريب", "This login looks suspicious.", "🔍"],
      ["identity", "who a person is", "هوية", "We must verify your identity.", "🪪"],
      ["confidential", "intended to be kept private", "سري", "This information is confidential.", "🔐"],
      ["report", "to give information about a problem", "يبلغ", "Please report unusual activity.", "📢"],
      ["protect", "to keep safe from harm", "يحمي", "We protect customer data.", "🛡️"],
    ],
    grammar: {
      title: "Must, must not, and should",
      explanation: "Use 'must' for strict rules, 'must not' for forbidden actions, and 'should' for recommended actions.",
      examples: [
        { sentence: "You must verify the customer’s identity.", note: "Strict requirement" },
        { sentence: "You must not share confidential information.", note: "Prohibited action" },
        { sentence: "You should report suspicious activity to the security team.", note: "Recommendation" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "Can you tell me the full card number on my account?" },
      { speaker: "Agent", text: "I cannot share that confidential information." },
      { speaker: "Agent", text: "We must verify your identity, and I can explain the safe next step." },
      { speaker: "Customer", text: "I understand. Please tell me what to do." },
    ],
    task: "Write five safety rules for a customer service team.",
  },
  {
    title: "The Customer Journey",
    description: "Connect every stage from first contact to purchase, support, feedback, and follow-up.",
    focus: "customer journey",
    vocabulary: [
      ["journey", "the stages a customer passes through", "رحلة", "We map the customer journey.", "🗺️"],
      ["stage", "one part of a process", "مرحلة", "The support stage follows the purchase.", "📍"],
      ["experience", "what someone feels during an activity", "تجربة", "We want a smooth customer experience.", "✨"],
      ["contact", "a point where a customer communicates with a company", "نقطة تواصل", "Email is an important contact point.", "📞"],
      ["smooth", "easy and without problems", "سلس", "A clear process makes service smooth.", "🌊"],
      ["improve", "to make something better", "يحسن", "We improve the journey through feedback.", "📈"],
    ],
    grammar: {
      title: "Sequencing a process",
      explanation: "Use first, after that, then, and finally to describe the customer journey in a clear order.",
      examples: [
        { sentence: "First, the customer asks for information.", note: "Starting stage" },
        { sentence: "After that, the customer places an order.", note: "Next stage" },
        { sentence: "Finally, the team follows up for feedback.", note: "Closing stage" },
      ],
    },
    dialogue: [
      { speaker: "Trainer", text: "What happens first in the customer journey?" },
      { speaker: "Agent", text: "First, the customer contacts us for information." },
      { speaker: "Trainer", text: "And what happens after the purchase?" },
      { speaker: "Agent", text: "We provide support, ask for feedback, and follow up." },
    ],
    task: "Describe a customer journey in eight ordered sentences.",
  },
  {
    title: "Planning a Service Shift",
    description: "Organise priorities, workload, team coverage, and handover information during a busy shift.",
    focus: "team operations",
    vocabulary: [
      ["shift", "a period of work", "وردية", "I work the morning shift.", "🕘"],
      ["workload", "the amount of work to do", "عبء العمل", "The workload is high today.", "📚"],
      ["priority", "the most important task", "أولوية", "Urgent complaints are a priority.", "⭐"],
      ["coverage", "people available to provide a service", "تغطية", "We need phone coverage at lunch.", "🛡️"],
      ["handover", "information passed to the next worker", "تسليم المهام", "Write a clear handover note.", "📤"],
      ["schedule", "a plan of times and activities", "جدول", "Check the team schedule.", "📅"],
    ],
    grammar: {
      title: "Have to and should for work planning",
      explanation: "Use 'have to' for duties and 'should' for advice. Use time phrases to make responsibilities clear.",
      examples: [
        { sentence: "We have to answer urgent calls first.", note: "Work duty" },
        { sentence: "You should update the handover before your shift ends.", note: "Professional advice" },
        { sentence: "The evening team will take over at six.", note: "Planned handover" },
      ],
    },
    dialogue: [
      { speaker: "Team Leader", text: "What are our priorities for this shift?" },
      { speaker: "Agent", text: "We have to answer urgent calls first and keep email coverage at lunch." },
      { speaker: "Team Leader", text: "What should you add to the handover?" },
      { speaker: "Agent", text: "I should add all open cases and the next action for each one." },
    ],
    task: "Write a shift plan with three duties, two priorities, and one handover note.",
  },
  {
    title: "Career Skills and Professional Growth",
    description: "Reflect on service strengths, training goals, and the skills needed for promotion.",
    focus: "career development",
    vocabulary: [
      ["skill", "an ability developed through learning or practice", "مهارة", "Listening is an important service skill.", "🧠"],
      ["training", "learning to improve work ability", "تدريب", "The team has customer care training.", "📘"],
      ["strength", "something you do well", "نقطة قوة", "Patience is one of my strengths.", "💪"],
      ["goal", "something you plan to achieve", "هدف", "My goal is to become a team leader.", "🎯"],
      ["feedback", "information that helps you improve", "ملاحظات", "I ask my manager for feedback.", "💬"],
      ["promote", "to move someone to a higher job", "يرقي", "Good performance can lead to promotion.", "⬆️"],
    ],
    grammar: {
      title: "Talking about experience and goals",
      explanation: "Use 'I have...' for experience and 'I would like to...' for professional goals. Give a reason with 'because'.",
      examples: [
        { sentence: "I have handled phone and email enquiries.", note: "Work experience" },
        { sentence: "I would like to improve my complaint-handling skills.", note: "Development goal" },
        { sentence: "I want to become a team leader because I enjoy coaching others.", note: "Goal and reason" },
      ],
    },
    dialogue: [
      { speaker: "Manager", text: "What is one of your strengths?" },
      { speaker: "Agent", text: "I listen carefully and stay calm when customers are upset." },
      { speaker: "Manager", text: "What would you like to improve?" },
      { speaker: "Agent", text: "I would like to improve my reporting skills and prepare for promotion." },
    ],
    task: "Write a short professional development plan with two strengths and three goals.",
  },
  {
    title: "Capstone: Solve a Complete Customer Case",
    description: "Bring the course together by managing a complaint from first contact to final follow-up.",
    focus: "complete case management",
    vocabulary: [
      ["case study", "a detailed example used for learning", "دراسة حالة", "This case study includes a delivery complaint.", "📖"],
      ["root cause", "the main reason a problem happened", "السبب الجذري", "We need to find the root cause.", "🌱"],
      ["action plan", "a list of steps to reach a result", "خطة عمل", "I will create an action plan.", "📝"],
      ["outcome", "the final result of an action", "نتيجة", "The outcome was positive.", "🏁"],
      ["ownership", "responsibility for a problem until it is resolved", "مسؤولية", "I will take ownership of the case.", "🧭"],
      ["follow-through", "completing what you promised", "متابعة التنفيذ", "Good follow-through builds trust.", "✅"],
    ],
    grammar: {
      title: "A complete professional response",
      explanation: "Combine the course language: acknowledge the issue, ask clear questions, explain the action, set a time, and follow through.",
      examples: [
        { sentence: "I understand the problem, and I am sorry for the delay.", note: "Empathy and apology" },
        { sentence: "I will investigate the order and update you by 4 p.m.", note: "Action and time" },
        { sentence: "I have resolved the issue and will follow up tomorrow.", note: "Outcome and follow-through" },
      ],
    },
    dialogue: [
      { speaker: "Customer", text: "My order is late, the item is damaged, and I cannot reach anyone." },
      { speaker: "Agent", text: "I understand your frustration. I am sorry, and I will take ownership of this case." },
      { speaker: "Agent", text: "I will arrange a replacement today and send an update by 4 p.m." },
      { speaker: "Customer", text: "Thank you for explaining the plan clearly." },
      { speaker: "Agent", text: "You are welcome. I will follow up tomorrow to confirm the replacement arrived safely." },
    ],
    task: "Write the complete customer-service response for a delayed, damaged order. Include empathy, questions, a solution, a deadline, and a follow-up.",
  },
];

const shuffle = <T,>(items: T[], seed: number): T[] => {
  const copy = [...items];
  let value = seed * 9301 + 49297;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    value = (value * 233280 + 12345) % 1000003;
    const j = Math.floor((value / 1000003) * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const mcq = (question: string, correct: string, distractors: string[], seed: number): MCQItem => {
  const options = shuffle([correct, ...distractors.filter((item) => item !== correct).slice(0, 3)], seed);
  return { question, options, correct: options.indexOf(correct) };
};

const buildLesson = (spec: CustomerServiceSpec, lessonNumber: number): LessonData => {
  const vocabulary: VocabWord[] = spec.vocabulary.map(([word, meaning, arabic, example, emoji]) => ({ word, meaning, arabic, example, emoji }));
  const allWords = specs.flatMap((item) => item.vocabulary.map(([word]) => word));
  const otherWords = allWords.filter((word) => !spec.vocabulary.some(([current]) => current === word));
  const examples = spec.grammar.examples;

  return {
    levelId: "customer-service",
    levelLabel: "Customer Service English — Minimum A2",
    lessonNumber,
    title: spec.title,
    description: spec.description,
    vocabulary,
    dialogue: spec.dialogue,
    grammar: spec.grammar,
    vocabExercises: vocabulary.slice(0, 5).map((item, index) => mcq(
      `What does “${item.word}” mean in this lesson?`,
      item.meaning,
      vocabulary.filter((candidate) => candidate.word !== item.word).map((candidate) => candidate.meaning),
      lessonNumber * 11 + index,
    )),
    conversationExercises: spec.dialogue.slice(0, 3).map((line, index) => mcq(
      `Who says: “${line.text}”?`,
      line.speaker,
      [...new Set(spec.dialogue.map((entry) => entry.speaker))].filter((speaker) => speaker !== line.speaker),
      lessonNumber * 17 + index,
    )),
    grammarExercises: examples.map((example, index) => mcq(
      `What is the purpose of: “${example.sentence}”?`,
      example.note,
      examples.filter((candidate) => candidate.sentence !== example.sentence).map((candidate) => candidate.note),
      lessonNumber * 23 + index,
    )),
    examQuestions: [
      mcq(`Which word is central to ${spec.focus}?`, vocabulary[0].word, otherWords, lessonNumber * 29),
      mcq("Which response best matches professional customer service?", examples[0].sentence, [
        "That is not my problem.",
        "You must wait without an update.",
        "I cannot help you with that.",
      ], lessonNumber * 31),
      mcq("What should the agent do first?", "Listen and understand the customer’s need.", [
        "End the conversation immediately.",
        "Blame another department.",
        "Ask for private information in a public message.",
      ], lessonNumber * 37),
      mcq("Which action supports a good customer experience?", "Give a clear next step and time.", [
        "Make a promise without checking.",
        "Use unclear technical language.",
        "Ignore the customer’s concern.",
      ], lessonNumber * 41),
    ],
    homeworkQuestions: [
      mcq(`Choose the best word for this ${spec.focus} task: “${spec.task}”`, vocabulary[1].word, otherWords, lessonNumber * 43),
      mcq("What should a professional service message include?", "A clear action and helpful next step.", [
        "Only an apology.",
        "A long personal opinion.",
        "Unconfirmed information.",
      ], lessonNumber * 47),
      mcq("Which sentence has a professional tone?", examples[Math.min(1, examples.length - 1)].sentence, [
        "You should have known that.",
        "Wait. I am busy.",
        "That problem is yours.",
      ], lessonNumber * 53),
    ],
    speakingPrompt: `Role-play this ${spec.focus} situation: ${spec.task} Speak for 60–90 seconds using at least five words from the lesson.`,
    writingPrompt: spec.task,
    reading: {
      title: `${spec.title}: A workplace example`,
      text: `${spec.dialogue.map((line) => `${line.speaker}: ${line.text}`).join(" ")} In this situation, the service professional focuses on ${spec.focus}. The best next step is to communicate clearly, protect the customer’s trust, and record the action taken.`,
      questions: [
        mcq("What is the workplace situation mainly about?", spec.focus, otherWords.slice(0, 3), lessonNumber * 59),
        mcq("What should the service professional do?", "Communicate clearly and take a helpful next step.", [
          "Avoid the customer.",
          "Give an unclear promise.",
          "Share private details publicly.",
        ], lessonNumber * 61),
        mcq("Which word from the lesson supports the situation?", vocabulary[2].word, vocabulary.slice(3).map((item) => item.word), lessonNumber * 67),
      ],
    },
  };
};

export const customerServiceLessons: Record<string, LessonData> = Object.fromEntries(
  specs.map((spec, index) => [`customer-service-${index + 1}`, buildLesson(spec, index + 1)]),
);
