/**
 * Workplace toolkit for the Customer Service English course.
 * Each lesson gets study objectives, a channel-based phrase bank (phone / email / chat),
 * a do-and-don't pair and one on-the-job tip so learners can use the language at work.
 */

export type WorkplaceToolkit = {
  objectives: string[];
  phrases: { phone: string[]; email: string[]; chat: string[] };
  doThis: string;
  avoidThis: string;
  tip: string;
};

type Entry = [
  objectives: [string, string, string],
  phone: [string, string],
  email: [string, string],
  chat: [string, string],
  doThis: string,
  avoidThis: string,
  tip: string,
];

const entries: Entry[] = [
  [
    ["Describe the duties of a service professional", "Explain your team's service goal", "Introduce your role to a customer"],
    ["Thank you for calling {company}. My name is {name}. How may I help you?", "I handle orders and account questions, so I can help with this."],
    ["Subject: Your request — reference {case}", "I am the service representative looking after your case from today."],
    ["Hi {name}, I am {agent} from the support team.", "I will stay with you until this is resolved."],
    "Say who you are and what you can do in the first ten seconds.",
    "Starting with company policy before you understand the customer's need.",
    "Most quality scores start with a correct greeting and clear identification.",
  ],
  [
    ["Greet customers warmly in any channel", "Confirm the reason for contact", "Set expectations for the next minutes"],
    ["Good morning, thank you for waiting. How can I help today?", "I will need about two minutes to check this for you."],
    ["Thank you for contacting us about {topic}.", "I have reviewed your message and can help right away."],
    ["Welcome! What can I help you with today?", "Give me one moment to open your account."],
    "Use the customer's name once you know it.",
    "Reading a robotic script without adapting to the customer.",
    "A warm first line lowers complaint escalation more than any other phrase.",
  ],
  [
    ["Show active listening with short confirmations", "Repeat key facts accurately", "Take notes while the customer speaks"],
    ["Let me make sure I understand: {summary}.", "Please continue — I am taking notes."],
    ["To confirm the details you sent: {summary}.", "Please correct me if any detail is wrong."],
    ["Got it — so the order arrived without the charger?", "Thanks for the details, I am noting them now."],
    "Summarise back before you offer a solution.",
    "Interrupting to guess the problem.",
    "One accurate summary saves an average of two follow-up contacts.",
  ],
  [
    ["Ask focused questions in a polite order", "Explain why you need each detail", "Verify identity safely"],
    ["May I have your order number, please?", "I ask for this so I can find the right record."],
    ["Could you send the order number and the delivery date?", "This helps us locate the shipment quickly."],
    ["Do you have the order number handy?", "And which email address is on the account?"],
    "Ask one question at a time and confirm each answer.",
    "Requesting card or password details in any channel.",
    "Open questions gather the story; closed questions confirm the facts.",
  ],
  [
    ["Acknowledge feelings before facts", "Apologise without blaming a colleague", "Reassure with a concrete action"],
    ["I understand why that is frustrating, and I am sorry.", "Here is what I will do for you right now."],
    ["I am sorry for the inconvenience this has caused.", "I have already started to resolve it on our side."],
    ["That sounds stressful — I am sorry.", "Let me take this over for you."],
    "Name the feeling, then move to the fix.",
    "Saying \"calm down\" or \"that is our policy\".",
    "Empathy plus a next step is what customers score as \"good service\".",
  ],
  [
    ["Replace negative wording with service language", "Offer alternatives when you must say no", "Close with a positive check"],
    ["What I can do is {option}.", "Would that work for you?"],
    ["While {limitation}, we can offer {alternative}.", "Please let me know which option you prefer."],
    ["I cannot do that on this plan, but here is a good alternative.", "Happy with that option?"],
    "Say what is possible before what is not.",
    "Using words like \"impossible\", \"you must\" or \"not my department\".",
    "Positive phrasing keeps the conversation solution-focused.",
  ],
  [
    ["Explain a product in plain language", "State one key condition clearly", "Check understanding"],
    ["The main benefit is {benefit}, and it includes {items}.", "Does that answer your question, or shall I go into detail?"],
    ["Your plan includes {items}. Please note {condition}.", "Full details are in the attached summary."],
    ["Short version: it covers {items}.", "Want the details on {condition}?"],
    "Give the benefit first, the technical detail second.",
    "Overloading the customer with features they did not ask about.",
    "If you cannot explain it in two sentences, simplify it again.",
  ],
  [
    ["Handle order, delivery and return requests", "Explain timelines precisely", "Confirm the agreed action in writing"],
    ["Your replacement will be dispatched today and arrives by {date}.", "I will send written confirmation after this call."],
    ["Subject: Return authorised — {case}", "Please use the enclosed label; refunds are issued within {days} working days."],
    ["Return created ✅ — label is on the way to your email.", "Tracking will update within 24 hours."],
    "Always give a date, not \"soon\".",
    "Promising a delivery time you have not verified.",
    "Written confirmation of dates prevents most repeat contacts.",
  ],
  [
    ["Discuss invoices and charges professionally", "Explain a refund timeline", "Protect payment data"],
    ["I can see a duplicate charge on {date}; one payment will be refunded.", "The refund reference is {ref}."],
    ["Subject: Refund confirmation — {ref}", "The amount of {amount} will appear within {days} working days."],
    ["I have raised the refund — reference {ref}.", "Please never send full card numbers in chat."],
    "Quote the amount, the date and the reference number.",
    "Discussing money without a reference the customer can quote later.",
    "Billing cases are audited — write the reference in your notes too.",
  ],
  [
    ["Manage phone and email support well", "Hold and transfer politely", "Write clear follow-up emails"],
    ["May I place you on hold for two minutes while I check?", "Thank you for holding — here is what I found."],
    ["Subject: Follow-up on your call today — {case}", "As promised, please find the invoice attached."],
    ["I will email the summary to you as well.", "Anything else while we are connected?"],
    "Explain why and how long before you put anyone on hold.",
    "Silent holds or transfers without a warm handover.",
    "One short follow-up email turns a good call into a closed case.",
  ],
  [
    ["Support customers in chat and social media", "Keep public replies short and safe", "Move private data to a private channel"],
    ["I will send you a private link so we can continue securely.", "Thank you for reporting this publicly — we are on it."],
    ["Subject: Continuing your social media enquiry", "We have moved to email to protect your personal details."],
    ["We are sorry to see this — please send us a direct message.", "For your privacy, please do not post your address."],
    "Reply publicly once, then continue privately.",
    "Asking for order or address details in a public comment.",
    "Public replies are read by hundreds of customers — write for all of them.",
  ],
  [
    ["Give numbered troubleshooting instructions", "Check the result after each step", "Escalate when a step fails"],
    ["First, please check the cable. What do you see now?", "Great — next, restart the device."],
    ["Please follow steps 1–3 below and reply with the result.", "If step 2 fails, we will arrange a technician."],
    ["Step 1: unplug for 10 seconds. Tell me when done ✅", "Working now? If not, I will escalate."],
    "One instruction per message, then wait for the result.",
    "Sending five steps at once and assuming they worked.",
    "Guided troubleshooting resolves most cases without an engineer visit.",
  ],
  [
    ["Take ownership of a complaint", "Investigate and report findings", "Agree a fair resolution"],
    ["I am taking ownership of this case; my reference is {case}.", "I will update you by {time} even if the check is not finished."],
    ["Subject: Your complaint — investigation update {case}", "Our findings and proposed resolution are below."],
    ["I own this case now — reference {case}.", "Update coming by {time}."],
    "Give the customer one owner and one reference.",
    "Passing the customer between agents with no notes.",
    "Ownership language is the strongest de-escalation tool you have.",
  ],
  [
    ["De-escalate angry conversations", "Keep a calm, steady tone", "Set respectful boundaries"],
    ["I hear you, and I want to fix this. Let us start with {fact}.", "I will stay on the line until we have a plan."],
    ["I understand the strength of your concern and I am acting on it today.", "Here is exactly what happens next."],
    ["I understand you are upset — I am here to solve it.", "Let us take the first step together."],
    "Lower your speed and volume when the customer raises theirs.",
    "Matching the customer's anger or arguing about who is right.",
    "Facts calm faster than defence: state what you know and what you will do.",
  ],
  [
    ["Recover trust after a service failure", "Offer suitable compensation", "Confirm prevention steps"],
    ["To make this right, I can offer {gesture}.", "I have also flagged the cause so it does not repeat."],
    ["Subject: Making this right — {case}", "We have applied {gesture} and corrected the cause."],
    ["Applied {gesture} to your account ✅", "The root cause is fixed on our side."],
    "Pair the goodwill gesture with the fix, not instead of it.",
    "Offering compensation before you understand the impact.",
    "Recovered customers often become more loyal than untroubled ones.",
  ],
  [
    ["Update customer accounts accurately", "Verify identity before changes", "Explain what you changed"],
    ["Before I update the account, may I verify two details?", "The address is updated and effective from today."],
    ["Subject: Account update confirmation", "The following details were changed on {date}: {changes}."],
    ["Verified ✅ — updating the account now.", "Changes saved; you will see them after a refresh."],
    "Read changes back before you save them.",
    "Editing records from memory or from an unverified caller.",
    "Accurate records are what the next agent depends on.",
  ],
  [
    ["Serve customers with different access needs", "Offer channel and format choices", "Adapt pace and language"],
    ["Would you prefer that I email these steps instead?", "Please tell me if you need me to slow down or repeat."],
    ["We can send this in large print or plain text — just tell us.", "Screen-reader friendly instructions are below."],
    ["Happy to send this as a voice note or text — your choice.", "Let me know the pace that suits you."],
    "Ask about preferences instead of assuming them.",
    "Speaking louder rather than clearer, or rushing the customer.",
    "Inclusive service is a legal expectation in many markets, not a bonus.",
  ],
  [
    ["Work respectfully across cultures", "Choose neutral, clear English", "Handle names and titles correctly"],
    ["How would you like me to address you?", "Let me confirm the spelling of your name."],
    ["Dear {title} {surname},", "Please let me know your preferred form of address."],
    ["How should I address you? 🙂", "Thanks — noted on your profile."],
    "Use simple international English and confirm names.",
    "Idioms, slang or humour that may not translate.",
    "Neutral English reduces misunderstanding in global teams.",
  ],
  [
    ["Escalate cases correctly", "Write a warm handover", "Set customer expectations for the transfer"],
    ["I am transferring you to {team}; I have briefed them on {summary}.", "They will call you back within {time}."],
    ["Subject: Escalation — {case} handed to {team}", "Summary, actions taken and next owner are listed below."],
    ["Escalating to {team} now with full notes.", "You keep the same reference: {case}."],
    "Brief the next agent before you transfer the customer.",
    "A cold transfer that forces the customer to repeat everything.",
    "A good handover note is the difference between one contact and five.",
  ],
  [
    ["Write clear CRM notes", "Structure a case record", "Use notes to plan follow-ups"],
    ["I am recording this so any colleague can continue.", "Your reference for any future call is {case}."],
    ["Case note: issue / action taken / next step / due date.", "Follow-up scheduled for {date}."],
    ["Noted in the case: issue, action, next step ✅", "Follow-up set for {date}."],
    "Write notes a stranger could act on tomorrow.",
    "Vague notes such as \"customer called, resolved\".",
    "Notes are the product of your shift — treat them as deliverables.",
  ],
  [
    ["Understand quality standards and KPIs", "Talk about response and resolution time", "Use feedback to improve"],
    ["Your case is within our {hours}-hour response standard.", "You will receive a short survey after this call."],
    ["Subject: How did we do? — {case}", "Your feedback goes directly to the service team."],
    ["We aim to reply in under {minutes} minutes.", "A one-question survey will follow — thank you!"],
    "Know your team's targets for response, resolution and satisfaction.",
    "Closing a case early just to protect a metric.",
    "KPIs describe the service; they never replace solving the problem.",
  ],
  [
    ["Support customer retention", "Explain value at renewal", "Handle cancellation requests professionally"],
    ["Before you decide, may I show two options that fit your use?", "If you still prefer to cancel, I will process it today."],
    ["Subject: Your renewal options", "Here is a comparison of the plans and the savings on each."],
    ["Two options that might suit you better — want to see them?", "Either way, I will respect your decision."],
    "Offer value first, then respect the customer's choice.",
    "Pressuring or delaying a cancellation the customer confirmed.",
    "Respectful cancellations bring customers back later.",
  ],
  [
    ["Handle sensitive and fraud-related requests", "Follow verification and privacy rules", "Escalate suspicious activity"],
    ["For your security, I can only discuss this after verification.", "I am escalating this to our fraud team now."],
    ["Subject: Security review on your account", "Please do not share passwords or full card numbers with anyone."],
    ["Security check first — thank you for understanding.", "Escalated to the security team ✅"],
    "Follow the verification script exactly, every time.",
    "Making an exception \"just this once\" for an unverified request.",
    "Security scripts protect the customer, the company and you.",
  ],
  [
    ["Map the customer journey", "Identify friction points", "Suggest service improvements"],
    ["This is the third contact about the same issue — I will fix the cause.", "I am logging this as a recurring journey problem."],
    ["Subject: Recurring issue report — {topic}", "Pattern, impact and suggested improvement are described below."],
    ["I can see this happened before — logging the pattern.", "Passing the improvement idea to the product team."],
    "Report repeated problems, not just individual cases.",
    "Fixing the same issue silently for the tenth customer.",
    "Frontline agents see journey problems before any dashboard does.",
  ],
  [
    ["Plan a service shift", "Prioritise queues and follow-ups", "Hand over at end of shift"],
    ["I start my shift by reviewing overdue cases.", "I will hand your case to the evening team with full notes."],
    ["Subject: Shift handover — open cases", "Priority, owner and due time are listed for each case."],
    ["Checking the queue by priority now.", "Handover note prepared for the next shift ✅"],
    "Plan the first and last fifteen minutes of every shift.",
    "Leaving open promises without an owner.",
    "Shift discipline is what keeps promises to customers.",
  ],
  [
    ["Describe your service skills professionally", "Prepare for a service job interview", "Set a development goal"],
    ["In my last role I handled around {number} contacts a day.", "I improved satisfaction by {result}."],
    ["Subject: Application — Customer Service Representative", "My strengths are de-escalation, clear writing and CRM accuracy."],
    ["Happy to share an example of a case I turned around.", "My goal this quarter is {goal}."],
    "Describe results with numbers and examples.",
    "Listing duties without any outcome.",
    "Interviewers hire evidence: case, action, result.",
  ],
  [
    ["Combine all course skills in one case", "Move from empathy to resolution to follow-up", "Document the full case"],
    ["I understand the impact; here is my plan and timeline.", "I will follow up tomorrow to confirm the replacement arrived."],
    ["Subject: Full resolution plan — {case}", "Summary, actions, timeline, compensation and follow-up date included."],
    ["Plan: replacement today, update by 4 p.m., follow-up tomorrow.", "Case documented with all steps ✅"],
    "Finish every case with a documented follow-up.",
    "Ending a complex case without a written summary.",
    "The capstone standard: empathy, action, deadline, follow-up, record.",
  ],
];

export const customerServiceModules: { code: string; title: string; from: number; to: number; outcome: string }[] = [
  { code: "Module 1", title: "Customer Care Foundations", from: 1, to: 6, outcome: "Greet, listen, question and respond with empathy in any channel." },
  { code: "Module 2", title: "Products, Orders & Payments", from: 7, to: 9, outcome: "Explain services and handle order, delivery and billing requests." },
  { code: "Module 3", title: "Channels & Problem Solving", from: 10, to: 15, outcome: "Support customers by phone, email, chat and social media, and recover from failures." },
  { code: "Module 4", title: "Records, Inclusion & Teamwork", from: 16, to: 20, outcome: "Keep accurate records, serve every customer inclusively and escalate well." },
  { code: "Module 5", title: "Quality, Retention & Career", from: 21, to: 27, outcome: "Work to quality standards, protect customers and present your skills at work." },
];

export function getCustomerServiceModule(lessonNumber: number) {
  return customerServiceModules.find((m) => lessonNumber >= m.from && lessonNumber <= m.to) ?? null;
}

export function getCustomerServiceToolkit(lessonNumber: number): WorkplaceToolkit | null {
  const entry = entries[lessonNumber - 1];
  if (!entry) return null;
  const [objectives, phone, email, chat, doThis, avoidThis, tip] = entry;
  return {
    objectives,
    phrases: { phone: [...phone], email: [...email], chat: [...chat] },
    doThis,
    avoidThis,
    tip,
  };
}
