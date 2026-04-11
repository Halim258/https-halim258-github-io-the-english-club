import { legalLessons } from "./legal-lessons";

const extraVocab: Record<number, { word: string; meaning: string; example: string; emoji: string; arabic: string }[]> = {
  1: [
    { word: "Attorney", meaning: "A lawyer", example: "The attorney represented the client.", emoji: "👨‍⚖️", arabic: "محامٍ" },
    { word: "Brief", meaning: "A written legal argument", example: "The attorney filed a brief.", emoji: "📄", arabic: "مذكرة قانونية" },
    { word: "Precedent", meaning: "A previous case used as a guide", example: "The ruling set a legal precedent.", emoji: "📚", arabic: "سابقة قضائية" },
    { word: "Appeal", meaning: "Request to review a court decision", example: "They filed an appeal.", emoji: "🔄", arabic: "استئناف" },
    { word: "Litigation", meaning: "The process of taking legal action", example: "Litigation can take years.", emoji: "⚖️", arabic: "تقاضي" },
  ],
  2: [
    { word: "Breach", meaning: "Breaking a contract term", example: "It was a breach of contract.", emoji: "💔", arabic: "خرق" },
    { word: "Indemnity", meaning: "Protection against loss", example: "The indemnity clause protects both parties.", emoji: "🛡️", arabic: "تعويض" },
    { word: "Arbitration", meaning: "Settling disputes outside court", example: "They agreed to arbitration.", emoji: "🤝", arabic: "تحكيم" },
    { word: "Stipulation", meaning: "A condition in an agreement", example: "The stipulation was clear.", emoji: "📋", arabic: "شرط" },
    { word: "Amendment", meaning: "A change to a document", example: "An amendment was added to the contract.", emoji: "✏️", arabic: "تعديل" },
  ],
  3: [
    { word: "Subpoena", meaning: "A court order to appear", example: "She received a subpoena.", emoji: "📜", arabic: "أمر استدعاء" },
    { word: "Bail", meaning: "Money paid for temporary release", example: "Bail was set at $10,000.", emoji: "💰", arabic: "كفالة" },
    { word: "Arraignment", meaning: "First court appearance", example: "The arraignment is tomorrow.", emoji: "🏛️", arabic: "جلسة مثول أولى" },
    { word: "Cross-examination", meaning: "Questioning the other side's witness", example: "The cross-examination was intense.", emoji: "🔍", arabic: "استجواب" },
    { word: "Acquittal", meaning: "Being found not guilty", example: "The jury returned an acquittal.", emoji: "✅", arabic: "تبرئة" },
  ],
  4: [
    { word: "Felony", meaning: "A serious crime", example: "Robbery is a felony.", emoji: "🚨", arabic: "جناية" },
    { word: "Misdemeanor", meaning: "A minor criminal offense", example: "Petty theft is a misdemeanor.", emoji: "⚠️", arabic: "جنحة" },
    { word: "Parole", meaning: "Early release from prison with conditions", example: "He was granted parole.", emoji: "🔓", arabic: "إفراج مشروط" },
    { word: "Probation", meaning: "Supervised release instead of prison", example: "She was placed on probation.", emoji: "👁️", arabic: "فترة اختبار" },
    { word: "Manslaughter", meaning: "Unintentional killing", example: "He was charged with manslaughter.", emoji: "⚖️", arabic: "قتل غير عمد" },
  ],
  5: [
    { word: "Tort", meaning: "A wrongful act causing harm", example: "Negligence is a common tort.", emoji: "⚠️", arabic: "فعل ضار" },
    { word: "Damages", meaning: "Money awarded for loss", example: "The court awarded damages.", emoji: "💰", arabic: "تعويضات" },
    { word: "Negligence", meaning: "Failure to take proper care", example: "The accident was caused by negligence.", emoji: "🤷", arabic: "إهمال" },
    { word: "Mediation", meaning: "Third-party dispute resolution", example: "They chose mediation over court.", emoji: "🤝", arabic: "وساطة" },
    { word: "Injunction", meaning: "Court order to stop an action", example: "The judge issued an injunction.", emoji: "🛑", arabic: "أمر قضائي" },
  ],
  6: [
    { word: "Patent", meaning: "Protection for inventions", example: "She filed a patent for her design.", emoji: "💡", arabic: "براءة اختراع" },
    { word: "Trademark", meaning: "A protected brand symbol", example: "The logo is a registered trademark.", emoji: "™️", arabic: "علامة تجارية" },
    { word: "Copyright", meaning: "Protection for creative works", example: "The book is protected by copyright.", emoji: "©️", arabic: "حقوق النشر" },
    { word: "Infringement", meaning: "Violating someone's IP rights", example: "That's copyright infringement.", emoji: "🚫", arabic: "انتهاك" },
    { word: "Royalty", meaning: "Payment for using IP", example: "The artist receives royalties.", emoji: "💵", arabic: "عائدات" },
  ],
  7: [
    { word: "Discrimination", meaning: "Unfair treatment based on characteristics", example: "Discrimination is illegal.", emoji: "🚫", arabic: "تمييز" },
    { word: "Harassment", meaning: "Unwanted aggressive behavior", example: "Workplace harassment is prohibited.", emoji: "⛔", arabic: "تحرش" },
    { word: "Wrongful termination", meaning: "Illegal firing of an employee", example: "She sued for wrongful termination.", emoji: "📋", arabic: "فصل تعسفي" },
    { word: "Severance", meaning: "Payment upon job ending", example: "He received severance pay.", emoji: "💰", arabic: "مكافأة نهاية الخدمة" },
    { word: "Whistleblower", meaning: "Person who reports wrongdoing", example: "The whistleblower was protected.", emoji: "📢", arabic: "مُبلّغ عن مخالفات" },
  ],
  8: [
    { word: "Asylum", meaning: "Protection given to refugees", example: "She applied for asylum.", emoji: "🏠", arabic: "لجوء" },
    { word: "Convention", meaning: "An international agreement", example: "The Geneva Convention protects civilians.", emoji: "📜", arabic: "اتفاقية" },
    { word: "Tribunal", meaning: "A court for specific matters", example: "The tribunal heard the case.", emoji: "🏛️", arabic: "محكمة" },
    { word: "Sanction", meaning: "A penalty or restriction", example: "Economic sanctions were imposed.", emoji: "🔒", arabic: "عقوبة" },
    { word: "Ratification", meaning: "Formal approval of an agreement", example: "The treaty awaits ratification.", emoji: "✅", arabic: "تصديق" },
  ],
  9: [
    { word: "Visa", meaning: "Permission to enter a country", example: "Her visa expires next month.", emoji: "🛂", arabic: "تأشيرة" },
    { word: "Deportation", meaning: "Forced removal from a country", example: "He faced deportation.", emoji: "✈️", arabic: "ترحيل" },
    { word: "Naturalization", meaning: "Process of becoming a citizen", example: "She completed the naturalization process.", emoji: "🏳️", arabic: "تجنس" },
    { word: "Residency", meaning: "Permission to live in a country", example: "He applied for permanent residency.", emoji: "🏠", arabic: "إقامة" },
    { word: "Petition", meaning: "A formal request", example: "They filed an immigration petition.", emoji: "📝", arabic: "عريضة" },
  ],
  10: [
    { word: "Affidavit", meaning: "A written sworn statement", example: "She signed an affidavit.", emoji: "📝", arabic: "إفادة مشفوعة بقسم" },
    { word: "Notarize", meaning: "To officially certify a document", example: "The document was notarized.", emoji: "🔏", arabic: "توثيق" },
    { word: "Memorandum", meaning: "A formal written message", example: "The legal memorandum was detailed.", emoji: "📋", arabic: "مذكرة" },
    { word: "Retainer", meaning: "Advance fee paid to a lawyer", example: "She paid a retainer of $5,000.", emoji: "💵", arabic: "أتعاب مقدمة" },
    { word: "Deposition", meaning: "Testimony given outside court", example: "The deposition lasted three hours.", emoji: "🗣️", arabic: "شهادة خارج المحكمة" },
  ],
};

const extraDialogues: Record<number, { speaker: string; text: string }[]> = {
  1: [
    { speaker: "Judge", text: "The court is now in session." },
    { speaker: "Lawyer", text: "Your Honor, my client pleads not guilty." },
    { speaker: "Judge", text: "The trial will begin next Monday." },
    { speaker: "Client", text: "What happens during the trial?" },
    { speaker: "Lawyer", text: "Both sides present evidence and witnesses testify." },
  ],
  2: [
    { speaker: "Lawyer", text: "This clause specifies the payment terms." },
    { speaker: "Client", text: "What if the other party breaches the contract?" },
    { speaker: "Lawyer", text: "You can seek damages or go to arbitration." },
    { speaker: "Client", text: "Can we add an indemnity clause?" },
    { speaker: "Lawyer", text: "Absolutely. I'll draft an amendment." },
  ],
  3: [
    { speaker: "Bailiff", text: "All rise. Court is in session." },
    { speaker: "Prosecutor", text: "The state calls its first witness." },
    { speaker: "Defense", text: "I object, Your Honor. That's hearsay." },
    { speaker: "Judge", text: "Objection sustained. The jury will disregard." },
    { speaker: "Witness", text: "I was at the scene that evening." },
  ],
  4: [
    { speaker: "Prosecutor", text: "The defendant is charged with a felony." },
    { speaker: "Defense", text: "My client has no prior record." },
    { speaker: "Prosecutor", text: "The evidence clearly shows guilt." },
    { speaker: "Judge", text: "The defendant is entitled to bail." },
    { speaker: "Defense", text: "We request a reasonable bail amount." },
  ],
  5: [
    { speaker: "Plaintiff", text: "The defendant's negligence caused my injuries." },
    { speaker: "Defendant's Lawyer", text: "We propose mediation to resolve this." },
    { speaker: "Plaintiff", text: "I want fair compensation for my damages." },
    { speaker: "Mediator", text: "Let's find a solution both parties agree on." },
    { speaker: "Judge", text: "I'm issuing an injunction to prevent further harm." },
  ],
  6: [
    { speaker: "IP Lawyer", text: "Your invention qualifies for a patent." },
    { speaker: "Inventor", text: "How long does protection last?" },
    { speaker: "IP Lawyer", text: "Typically 20 years from the filing date." },
    { speaker: "Inventor", text: "What if someone copies my design?" },
    { speaker: "IP Lawyer", text: "That would be infringement. We can sue for damages." },
  ],
  7: [
    { speaker: "Employee", text: "I was fired without any warning." },
    { speaker: "HR Lawyer", text: "That could be wrongful termination." },
    { speaker: "Employee", text: "I also experienced harassment from my manager." },
    { speaker: "HR Lawyer", text: "We should document everything and file a complaint." },
    { speaker: "Employee", text: "Am I entitled to severance?" },
  ],
  8: [
    { speaker: "Advocate", text: "Every person has the right to a fair trial." },
    { speaker: "Diplomat", text: "The convention protects civilians during conflict." },
    { speaker: "Advocate", text: "Sanctions can pressure governments to comply." },
    { speaker: "Diplomat", text: "Ratification requires majority approval." },
    { speaker: "Advocate", text: "The tribunal will review the case." },
  ],
  9: [
    { speaker: "Immigration Lawyer", text: "Your visa expires in 30 days." },
    { speaker: "Client", text: "Can I apply for an extension?" },
    { speaker: "Immigration Lawyer", text: "Yes, or you can apply for permanent residency." },
    { speaker: "Client", text: "What about naturalization?" },
    { speaker: "Immigration Lawyer", text: "That takes about five years of residency." },
  ],
  10: [
    { speaker: "Lawyer", text: "I'll draft the legal memorandum today." },
    { speaker: "Client", text: "Does it need to be notarized?" },
    { speaker: "Lawyer", text: "Yes, and you'll need to sign an affidavit." },
    { speaker: "Client", text: "How much is the retainer fee?" },
    { speaker: "Lawyer", text: "The retainer is $3,000 for initial services." },
  ],
};

const extraExercises: Record<number, {
  vocab: { question: string; options: string[]; correct: number }[];
  conv: { question: string; options: string[]; correct: number }[];
  grammar: { question: string; options: string[]; correct: number }[];
  exam: { question: string; options: string[]; correct: number }[];
  homework: { question: string; options: string[]; correct: number }[];
}> = {
  1: {
    vocab: [
      { question: "An 'attorney' is:", options: ["A judge", "A lawyer", "A witness", "A clerk"], correct: 1 },
      { question: "'Litigation' means:", options: ["Negotiation", "Legal action process", "A contract", "A verdict"], correct: 1 },
      { question: "A 'precedent' is:", options: ["A new law", "A previous case as guide", "A penalty", "A witness"], correct: 1 },
    ],
    conv: [
      { question: "The client pleads:", options: ["Guilty", "Not guilty", "No contest", "Silence"], correct: 1 },
      { question: "Both sides present:", options: ["Food", "Evidence", "Music", "Gifts"], correct: 1 },
    ],
    grammar: [
      { question: "'The court ___ now in session.'", options: ["are", "is", "were", "am"], correct: 1 },
      { question: "'My client ___ not guilty.'", options: ["plead", "pleads", "pleading", "pleased"], correct: 1 },
    ],
    exam: [
      { question: "An 'appeal' is:", options: ["A new crime", "Request to review a decision", "A fine", "A witness"], correct: 1 },
      { question: "A 'brief' is:", options: ["Short pants", "A written legal argument", "A meeting", "A verdict"], correct: 1 },
    ],
    homework: [
      { question: "'The ruling set a legal ___.'", options: ["Record", "Precedent", "Fee", "Penalty"], correct: 1 },
      { question: "'___ can take years.'", options: ["Cooking", "Litigation", "Shopping", "Driving"], correct: 1 },
    ],
  },
  2: {
    vocab: [
      { question: "A 'breach' of contract is:", options: ["Following terms", "Breaking a term", "Signing", "Reading"], correct: 1 },
      { question: "'Arbitration' is:", options: ["A trial", "Dispute resolution outside court", "A law", "A contract"], correct: 1 },
      { question: "An 'amendment' is:", options: ["A deletion", "A change to a document", "A signature", "A penalty"], correct: 1 },
    ],
    conv: [
      { question: "If the other party breaches, you can seek:", options: ["Advice", "Damages", "Friendship", "Nothing"], correct: 1 },
      { question: "The lawyer will draft an:", options: ["Email", "Amendment", "Invoice", "Menu"], correct: 1 },
    ],
    grammar: [
      { question: "'The clause ___ the payment terms.'", options: ["specify", "specifies", "specified", "specifying"], correct: 1 },
      { question: "'We ___ add an indemnity clause.'", options: ["will", "can", "shall", "may"], correct: 1 },
    ],
    exam: [
      { question: "'Indemnity' provides:", options: ["Protection against loss", "A fine", "A reward", "A job"], correct: 0 },
      { question: "A 'stipulation' is:", options: ["A question", "A condition", "A signature", "A penalty"], correct: 1 },
    ],
    homework: [
      { question: "'It was a ___ of contract.'", options: ["Breach", "Piece", "Type", "Form"], correct: 0 },
      { question: "'They agreed to ___.'", options: ["Cooking", "Arbitration", "Dancing", "Sleeping"], correct: 1 },
    ],
  },
  3: {
    vocab: [
      { question: "A 'subpoena' is:", options: ["A fine", "A court order to appear", "A reward", "A contract"], correct: 1 },
      { question: "'Bail' is:", options: ["A prison", "Money for temporary release", "A verdict", "A law"], correct: 1 },
      { question: "'Acquittal' means:", options: ["Guilty", "Not guilty", "No trial", "Retrial"], correct: 1 },
    ],
    conv: [
      { question: "The prosecutor calls a:", options: ["Friend", "Witness", "Family member", "Teacher"], correct: 1 },
      { question: "'Objection sustained' means:", options: ["Rejected", "Accepted", "Ignored", "Repeated"], correct: 1 },
    ],
    grammar: [
      { question: "'All ___. Court is in session.'", options: ["sit", "rise", "leave", "sleep"], correct: 1 },
      { question: "'The jury will ___ the statement.'", options: ["disregard", "accept", "write", "read"], correct: 0 },
    ],
    exam: [
      { question: "'Arraignment' is:", options: ["Sentencing", "First court appearance", "Appeal", "Parole"], correct: 1 },
      { question: "'Cross-examination' is:", options: ["Self-questioning", "Questioning other side's witness", "A test", "An exam"], correct: 1 },
    ],
    homework: [
      { question: "'She received a ___.'", options: ["Gift", "Subpoena", "Promotion", "Award"], correct: 1 },
      { question: "'Bail was set at ___.'", options: ["$100", "$10,000", "$1", "Nothing"], correct: 1 },
    ],
  },
  4: {
    vocab: [
      { question: "A 'felony' is:", options: ["A minor offense", "A serious crime", "A fine", "A warning"], correct: 1 },
      { question: "'Parole' is:", options: ["Prison", "Early release with conditions", "A trial", "A charge"], correct: 1 },
      { question: "'Manslaughter' is:", options: ["Self-defense", "Unintentional killing", "Theft", "Fraud"], correct: 1 },
    ],
    conv: [
      { question: "The defendant has:", options: ["Many priors", "No prior record", "A reward", "A job"], correct: 1 },
      { question: "The defendant is entitled to:", options: ["Freedom", "Bail", "A reward", "Nothing"], correct: 1 },
    ],
    grammar: [
      { question: "'The defendant ___ charged.'", options: ["is", "are", "am", "were"], correct: 0 },
      { question: "'We request a ___ bail amount.'", options: ["unreasonable", "reasonable", "high", "zero"], correct: 1 },
    ],
    exam: [
      { question: "A 'misdemeanor' is:", options: ["A felony", "A minor offense", "A reward", "A contract"], correct: 1 },
      { question: "'Probation' is:", options: ["Prison time", "Supervised release", "A fine", "A reward"], correct: 1 },
    ],
    homework: [
      { question: "'He was granted ___.'", options: ["Prison", "Parole", "A fine", "Probation"], correct: 1 },
      { question: "'Robbery is a ___.'", options: ["Misdemeanor", "Felony", "Tort", "Breach"], correct: 1 },
    ],
  },
  5: {
    vocab: [
      { question: "A 'tort' is:", options: ["A cake", "A wrongful act", "A contract", "A law"], correct: 1 },
      { question: "'Damages' are:", options: ["Broken items", "Money awarded for loss", "Fines", "Penalties"], correct: 1 },
      { question: "An 'injunction' is:", options: ["A surgery", "Court order to stop an action", "A contract", "A fine"], correct: 1 },
    ],
    conv: [
      { question: "The plaintiff claims:", options: ["Victory", "Negligence caused injuries", "Friendship", "Nothing"], correct: 1 },
      { question: "The mediator wants to find:", options: ["Blame", "A solution both agree on", "Evidence", "A winner"], correct: 1 },
    ],
    grammar: [
      { question: "'The defendant's negligence ___ the injuries.'", options: ["cause", "caused", "causing", "causes"], correct: 1 },
      { question: "'I ___ fair compensation.'", options: ["wants", "want", "wanting", "wanted"], correct: 1 },
    ],
    exam: [
      { question: "'Negligence' is:", options: ["Care", "Failure to take proper care", "A reward", "A law"], correct: 1 },
      { question: "'Mediation' involves:", options: ["A judge", "A third-party resolver", "A jury", "Police"], correct: 1 },
    ],
    homework: [
      { question: "'The court awarded ___.'", options: ["Prizes", "Damages", "Gifts", "Points"], correct: 1 },
      { question: "'They chose ___ over court.'", options: ["Fighting", "Mediation", "Silence", "Running"], correct: 1 },
    ],
  },
  6: {
    vocab: [
      { question: "A 'patent' protects:", options: ["Songs", "Inventions", "Buildings", "Food"], correct: 1 },
      { question: "'Infringement' means:", options: ["Following rules", "Violating IP rights", "Creating art", "Buying products"], correct: 1 },
      { question: "'Royalty' is:", options: ["A king", "Payment for using IP", "A fine", "A penalty"], correct: 1 },
    ],
    conv: [
      { question: "Patent protection lasts:", options: ["5 years", "10 years", "20 years", "Forever"], correct: 2 },
      { question: "If someone copies the design, it's:", options: ["Flattery", "Infringement", "Legal", "Normal"], correct: 1 },
    ],
    grammar: [
      { question: "'Your invention ___ for a patent.'", options: ["qualify", "qualifies", "qualified", "qualifying"], correct: 1 },
      { question: "'That ___ be infringement.'", options: ["will", "would", "shall", "may"], correct: 1 },
    ],
    exam: [
      { question: "A 'trademark' protects:", options: ["Inventions", "Brand symbols", "Books", "Music"], correct: 1 },
      { question: "'Copyright' protects:", options: ["Inventions", "Creative works", "Brands", "Patents"], correct: 1 },
    ],
    homework: [
      { question: "'The logo is a registered ___.'", options: ["Patent", "Trademark", "Copyright", "Royalty"], correct: 1 },
      { question: "'The artist receives ___.'", options: ["Fines", "Royalties", "Penalties", "Injunctions"], correct: 1 },
    ],
  },
  7: {
    vocab: [
      { question: "'Discrimination' is:", options: ["Fair treatment", "Unfair treatment", "A reward", "A promotion"], correct: 1 },
      { question: "A 'whistleblower' is someone who:", options: ["Plays music", "Reports wrongdoing", "Hires staff", "Fires staff"], correct: 1 },
      { question: "'Severance' is:", options: ["A promotion", "Payment upon job ending", "A fine", "A warning"], correct: 1 },
    ],
    conv: [
      { question: "The employee experienced:", options: ["Promotion", "Harassment", "A raise", "Training"], correct: 1 },
      { question: "The lawyer says to:", options: ["Ignore it", "Document everything", "Quit immediately", "Do nothing"], correct: 1 },
    ],
    grammar: [
      { question: "'I ___ fired without warning.'", options: ["is", "was", "are", "am"], correct: 1 },
      { question: "'Discrimination ___ illegal.'", options: ["are", "is", "were", "am"], correct: 1 },
    ],
    exam: [
      { question: "'Wrongful termination' is:", options: ["Legal firing", "Illegal firing", "Resignation", "Retirement"], correct: 1 },
      { question: "'Harassment' is:", options: ["Kindness", "Unwanted aggressive behavior", "A compliment", "A meeting"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ was protected by law.'", options: ["Criminal", "Whistleblower", "Manager", "CEO"], correct: 1 },
      { question: "'He received ___ pay.'", options: ["Bonus", "Severance", "Holiday", "Overtime"], correct: 1 },
    ],
  },
  8: {
    vocab: [
      { question: "'Asylum' provides:", options: ["Employment", "Protection to refugees", "Education", "Money"], correct: 1 },
      { question: "A 'tribunal' is:", options: ["A prison", "A court for specific matters", "A law firm", "A school"], correct: 1 },
      { question: "'Ratification' is:", options: ["Rejection", "Formal approval", "A protest", "A fine"], correct: 1 },
    ],
    conv: [
      { question: "The convention protects:", options: ["Soldiers only", "Civilians", "Politicians", "Lawyers"], correct: 1 },
      { question: "Ratification requires:", options: ["One vote", "Majority approval", "No votes", "Unanimous"], correct: 1 },
    ],
    grammar: [
      { question: "'Economic sanctions ___ imposed.'", options: ["is", "was", "were", "am"], correct: 2 },
      { question: "'The treaty ___ ratification.'", options: ["await", "awaits", "awaited", "awaiting"], correct: 1 },
    ],
    exam: [
      { question: "A 'sanction' is:", options: ["A reward", "A penalty or restriction", "A treaty", "An agreement"], correct: 1 },
      { question: "A 'convention' is:", options: ["A party", "An international agreement", "A trial", "A meeting"], correct: 1 },
    ],
    homework: [
      { question: "'She applied for ___.'", options: ["A job", "Asylum", "A visa", "School"], correct: 1 },
      { question: "'The ___ heard the case.'", options: ["School", "Tribunal", "Hospital", "Office"], correct: 1 },
    ],
  },
  9: {
    vocab: [
      { question: "'Deportation' means:", options: ["Welcome", "Forced removal", "Immigration", "Travel"], correct: 1 },
      { question: "'Naturalization' is:", options: ["Gardening", "Becoming a citizen", "Traveling", "Studying"], correct: 1 },
      { question: "A 'petition' is:", options: ["A question", "A formal request", "A test", "An exam"], correct: 1 },
    ],
    conv: [
      { question: "The visa expires in:", options: ["A week", "30 days", "A year", "Never"], correct: 1 },
      { question: "Naturalization takes about:", options: ["1 year", "5 years", "10 years", "20 years"], correct: 1 },
    ],
    grammar: [
      { question: "'Her visa ___ next month.'", options: ["expire", "expires", "expired", "expiring"], correct: 1 },
      { question: "'He ___ for permanent residency.'", options: ["apply", "applied", "applies", "applying"], correct: 1 },
    ],
    exam: [
      { question: "'Residency' means:", options: ["Visiting", "Permission to live in a country", "Tourism", "Traveling"], correct: 1 },
      { question: "A 'visa' allows:", options: ["Driving", "Entry into a country", "Shopping", "Banking"], correct: 1 },
    ],
    homework: [
      { question: "'He faced ___.'", options: ["Promotion", "Deportation", "Graduation", "Celebration"], correct: 1 },
      { question: "'They filed an immigration ___.'", options: ["Report", "Petition", "Email", "Letter"], correct: 1 },
    ],
  },
  10: {
    vocab: [
      { question: "An 'affidavit' is:", options: ["A letter", "A sworn statement", "A bill", "A receipt"], correct: 1 },
      { question: "'Notarize' means:", options: ["To sign", "To officially certify", "To read", "To write"], correct: 1 },
      { question: "A 'retainer' is:", options: ["A bill", "An advance fee to a lawyer", "A fine", "A reward"], correct: 1 },
    ],
    conv: [
      { question: "The document needs to be:", options: ["Thrown away", "Notarized", "Hidden", "Ignored"], correct: 1 },
      { question: "The retainer fee is:", options: ["$100", "$3,000", "$1", "Free"], correct: 1 },
    ],
    grammar: [
      { question: "'The document ___ notarized.'", options: ["is", "was", "are", "were"], correct: 1 },
      { question: "'She ___ an affidavit.'", options: ["sign", "signed", "signing", "signs"], correct: 1 },
    ],
    exam: [
      { question: "A 'memorandum' is:", options: ["A memo", "A formal written message", "A receipt", "A bill"], correct: 1 },
      { question: "A 'deposition' is:", options: ["A deposit", "Testimony outside court", "A fine", "A sentence"], correct: 1 },
    ],
    homework: [
      { question: "'The legal ___ was detailed.'", options: ["Memorandum", "Recipe", "Menu", "Song"], correct: 0 },
      { question: "'The ___ lasted three hours.'", options: ["Meeting", "Deposition", "Lunch", "Party"], correct: 1 },
    ],
  },
};

// Apply enhancements
for (let i = 1; i <= 10; i++) {
  const key = `legal-${i}`;
  const lesson = legalLessons[key];
  if (!lesson) continue;

  if (extraVocab[i]) lesson.vocabulary.push(...extraVocab[i]);
  if (extraDialogues[i]) lesson.dialogue.push(...extraDialogues[i]);
  if (extraExercises[i]) {
    lesson.vocabExercises.push(...extraExercises[i].vocab);
    lesson.conversationExercises.push(...extraExercises[i].conv);
    lesson.grammarExercises.push(...extraExercises[i].grammar);
    lesson.examQuestions.push(...extraExercises[i].exam);
    lesson.homeworkQuestions.push(...extraExercises[i].homework);
  }
}
