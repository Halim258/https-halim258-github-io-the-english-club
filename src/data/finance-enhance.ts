import { financeLessons } from "./finance-lessons";

const extraVocab: Record<number, { word: string; meaning: string; example: string; emoji: string; arabic: string }[]> = {
  1: [
    { word: "ATM", meaning: "Automated Teller Machine", example: "Withdraw cash from the ATM.", emoji: "🏧", arabic: "صراف آلي" },
    { word: "PIN", meaning: "Personal Identification Number", example: "Enter your PIN to proceed.", emoji: "🔢", arabic: "رقم سري" },
    { word: "Installment", meaning: "A regular partial payment", example: "Pay in monthly installments.", emoji: "📆", arabic: "قسط" },
    { word: "Collateral", meaning: "Asset pledged for a loan", example: "The house was used as collateral.", emoji: "🏠", arabic: "ضمان" },
    { word: "Bankruptcy", meaning: "Legal state of being unable to pay debts", example: "The company filed for bankruptcy.", emoji: "📉", arabic: "إفلاس" },
  ],
  2: [
    { word: "IPO", meaning: "Initial Public Offering", example: "The company's IPO was successful.", emoji: "🎯", arabic: "طرح عام أولي" },
    { word: "Hedge fund", meaning: "An investment fund using complex strategies", example: "Hedge funds target high returns.", emoji: "🏦", arabic: "صندوق تحوط" },
    { word: "Index", meaning: "A benchmark measuring market performance", example: "The S&P 500 is a major index.", emoji: "📊", arabic: "مؤشر" },
    { word: "Commodity", meaning: "A raw material traded on markets", example: "Gold is a popular commodity.", emoji: "🥇", arabic: "سلعة" },
    { word: "Speculation", meaning: "Risky investment hoping for profit", example: "Speculation drove prices up.", emoji: "🎲", arabic: "مضاربة" },
  ],
  3: [
    { word: "Depreciation", meaning: "Decrease in value over time", example: "Equipment depreciation affects profits.", emoji: "📉", arabic: "إهلاك" },
    { word: "Cash flow", meaning: "Money moving in and out of a business", example: "Positive cash flow is essential.", emoji: "💸", arabic: "تدفق نقدي" },
    { word: "Balance sheet", meaning: "Statement of assets and liabilities", example: "Review the balance sheet carefully.", emoji: "📊", arabic: "ميزانية عمومية" },
    { word: "Fiscal year", meaning: "A 12-month accounting period", example: "Our fiscal year ends in March.", emoji: "📅", arabic: "سنة مالية" },
    { word: "Expenditure", meaning: "Money spent on something", example: "Capital expenditure increased this year.", emoji: "💳", arabic: "نفقات" },
  ],
  4: [
    { word: "Premium", meaning: "Amount paid for insurance", example: "Pay your insurance premium monthly.", emoji: "💰", arabic: "قسط تأمين" },
    { word: "Deductible", meaning: "Amount you pay before insurance kicks in", example: "The deductible is $500.", emoji: "💵", arabic: "مبلغ قابل للخصم" },
    { word: "Claim", meaning: "A request for insurance payment", example: "She filed an insurance claim.", emoji: "📝", arabic: "مطالبة" },
    { word: "Coverage", meaning: "The protection provided by insurance", example: "Full coverage includes theft.", emoji: "🛡️", arabic: "تغطية" },
    { word: "Underwriter", meaning: "Person who assesses insurance risk", example: "The underwriter approved the policy.", emoji: "🧑‍💼", arabic: "ضامن" },
  ],
  5: [
    { word: "Inflation", meaning: "General rise in prices", example: "Inflation erodes purchasing power.", emoji: "📈", arabic: "تضخم" },
    { word: "Deflation", meaning: "General fall in prices", example: "Deflation can slow the economy.", emoji: "📉", arabic: "انكماش" },
    { word: "GDP", meaning: "Gross Domestic Product", example: "GDP measures economic output.", emoji: "🌍", arabic: "ناتج محلي إجمالي" },
    { word: "Fiscal policy", meaning: "Government spending and tax decisions", example: "Fiscal policy affects the economy.", emoji: "🏛️", arabic: "سياسة مالية" },
    { word: "Monetary policy", meaning: "Central bank control of money supply", example: "Monetary policy set interest rates.", emoji: "🏦", arabic: "سياسة نقدية" },
  ],
};

const extraDialogues: Record<number, { speaker: string; text: string }[]> = {
  1: [
    { speaker: "Customer", text: "What's the minimum deposit to open an account?" },
    { speaker: "Banker", text: "Just £100 for a savings account." },
    { speaker: "Customer", text: "Can I pay my mortgage in installments?" },
    { speaker: "Banker", text: "Yes, monthly installments over 15 to 30 years." },
    { speaker: "Customer", text: "What happens if I can't pay?" },
  ],
  2: [
    { speaker: "Advisor", text: "Have you considered investing in commodities?" },
    { speaker: "Client", text: "Like gold? Is it a good time?" },
    { speaker: "Advisor", text: "Gold tends to hold value during market volatility." },
    { speaker: "Client", text: "What about an IPO? Should I invest early?" },
    { speaker: "Advisor", text: "IPOs can be profitable but carry significant risk." },
  ],
  3: [
    { speaker: "CFO", text: "Our cash flow improved significantly this quarter." },
    { speaker: "Analyst", text: "Yes, expenditure was down 12% compared to last year." },
    { speaker: "CFO", text: "How does the balance sheet look?" },
    { speaker: "Analyst", text: "Assets exceed liabilities by a healthy margin." },
    { speaker: "CFO", text: "Good. Let's prepare the fiscal year summary." },
  ],
  4: [
    { speaker: "Agent", text: "This policy covers fire, theft, and natural disasters." },
    { speaker: "Client", text: "What's the monthly premium?" },
    { speaker: "Agent", text: "About £45 per month with a £200 deductible." },
    { speaker: "Client", text: "How do I file a claim?" },
    { speaker: "Agent", text: "Call our hotline or use the mobile app." },
  ],
  5: [
    { speaker: "Economist", text: "Inflation reached 6% this year." },
    { speaker: "Reporter", text: "How does that affect ordinary people?" },
    { speaker: "Economist", text: "It reduces purchasing power. Everyday items cost more." },
    { speaker: "Reporter", text: "What can the government do?" },
    { speaker: "Economist", text: "Fiscal and monetary policies can help control it." },
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
      { question: "'ATM' stands for:", options: ["Automatic Transfer Machine", "Automated Teller Machine", "Account Transfer Method", "Auto Transaction Machine"], correct: 1 },
      { question: "'Collateral' is:", options: ["A loan type", "An asset pledged for a loan", "A fee", "A bank"], correct: 1 },
      { question: "'Bankruptcy' means:", options: ["Being rich", "Unable to pay debts", "A type of loan", "A savings plan"], correct: 1 },
    ],
    conv: [
      { question: "The minimum deposit is:", options: ["£50", "£100", "£200", "£500"], correct: 1 },
      { question: "Mortgage installments are:", options: ["Weekly", "Monthly", "Yearly", "Daily"], correct: 1 },
    ],
    grammar: [
      { question: "'Enter your ___ to proceed.'", options: ["Name", "PIN", "Address", "Email"], correct: 1 },
      { question: "'Pay in monthly ___.'", options: ["Payments", "Installments", "Fees", "Charges"], correct: 1 },
    ],
    exam: [
      { question: "A 'PIN' is:", options: ["A name", "A personal number", "A card", "A bank"], correct: 1 },
      { question: "An 'installment' is:", options: ["One full payment", "A regular partial payment", "A fee", "A fine"], correct: 1 },
    ],
    homework: [
      { question: "'The company filed for ___.'", options: ["Success", "Bankruptcy", "Growth", "Profit"], correct: 1 },
      { question: "'The house was used as ___.'", options: ["Investment", "Collateral", "Currency", "A gift"], correct: 1 },
    ],
  },
  2: {
    vocab: [
      { question: "An 'IPO' is:", options: ["A tax", "Initial Public Offering", "A fund type", "A bank"], correct: 1 },
      { question: "A 'commodity' is:", options: ["A stock", "A raw material traded", "A bond", "A fee"], correct: 1 },
      { question: "'Speculation' is:", options: ["Safe investing", "Risky investment for profit", "Saving", "Budgeting"], correct: 1 },
    ],
    conv: [
      { question: "Gold holds value during:", options: ["Growth", "Volatility", "IPOs", "Dividends"], correct: 1 },
      { question: "IPOs carry:", options: ["No risk", "Significant risk", "Guaranteed profit", "Low returns"], correct: 1 },
    ],
    grammar: [
      { question: "'Gold ___ to hold value.'", options: ["tend", "tends", "tended", "tending"], correct: 1 },
      { question: "'Have you ___ investing in commodities?'", options: ["consider", "considered", "considering", "considers"], correct: 1 },
    ],
    exam: [
      { question: "A 'hedge fund' uses:", options: ["Simple strategies", "Complex strategies", "No strategies", "Only bonds"], correct: 1 },
      { question: "An 'index' measures:", options: ["Single stock", "Market performance", "One bond", "One fund"], correct: 1 },
    ],
    homework: [
      { question: "'The S&P 500 is a major ___.'", options: ["Stock", "Index", "Bond", "Fund"], correct: 1 },
      { question: "'___ drove prices up.'", options: ["Saving", "Speculation", "Budgeting", "Planning"], correct: 1 },
    ],
  },
  3: {
    vocab: [
      { question: "'Depreciation' means:", options: ["Increase in value", "Decrease in value", "No change", "A profit"], correct: 1 },
      { question: "'Cash flow' is:", options: ["Cash in a safe", "Money moving in and out", "A type of account", "A fee"], correct: 1 },
      { question: "A 'fiscal year' is:", options: ["A calendar year", "A 12-month accounting period", "A quarter", "A month"], correct: 1 },
    ],
    conv: [
      { question: "Expenditure was down:", options: ["5%", "8%", "12%", "20%"], correct: 2 },
      { question: "Assets exceed:", options: ["Revenue", "Liabilities", "Profits", "Losses"], correct: 1 },
    ],
    grammar: [
      { question: "'Cash flow ___ this quarter.'", options: ["improve", "improved", "improving", "improves"], correct: 1 },
      { question: "'Let's ___ the fiscal year summary.'", options: ["preparing", "prepare", "prepared", "prepares"], correct: 1 },
    ],
    exam: [
      { question: "A 'balance sheet' shows:", options: ["Only profits", "Assets and liabilities", "Only losses", "Only revenue"], correct: 1 },
      { question: "'Expenditure' is:", options: ["Money earned", "Money spent", "Money saved", "Money borrowed"], correct: 1 },
    ],
    homework: [
      { question: "'Positive ___ is essential for business.'", options: ["Debt", "Cash flow", "Loss", "Expense"], correct: 1 },
      { question: "'Our ___ year ends in March.'", options: ["Calendar", "Fiscal", "Academic", "Natural"], correct: 1 },
    ],
  },
  4: {
    vocab: [
      { question: "An insurance 'premium' is:", options: ["A reward", "Amount paid for insurance", "A claim", "A deductible"], correct: 1 },
      { question: "A 'deductible' is paid:", options: ["By the insurance", "By you before insurance pays", "By the government", "Never"], correct: 1 },
      { question: "A 'claim' is:", options: ["A premium", "A request for payment", "A policy", "A deductible"], correct: 1 },
    ],
    conv: [
      { question: "The monthly premium is about:", options: ["£25", "£35", "£45", "£55"], correct: 2 },
      { question: "Claims can be filed via:", options: ["Mail only", "Hotline or app", "In person only", "Email only"], correct: 1 },
    ],
    grammar: [
      { question: "'This policy ___ fire and theft.'", options: ["cover", "covers", "covered", "covering"], correct: 1 },
      { question: "'How ___ I file a claim?'", options: ["am", "is", "do", "does"], correct: 2 },
    ],
    exam: [
      { question: "'Coverage' is:", options: ["A fee", "Protection provided by insurance", "A claim", "A deductible"], correct: 1 },
      { question: "An 'underwriter' assesses:", options: ["Food quality", "Insurance risk", "Stock prices", "Interest rates"], correct: 1 },
    ],
    homework: [
      { question: "'Full ___ includes theft.'", options: ["Premium", "Coverage", "Deductible", "Claim"], correct: 1 },
      { question: "'She filed an insurance ___.'", options: ["Premium", "Claim", "Policy", "Fee"], correct: 1 },
    ],
  },
  5: {
    vocab: [
      { question: "'Inflation' causes prices to:", options: ["Fall", "Rise", "Stay same", "Disappear"], correct: 1 },
      { question: "'GDP' measures:", options: ["Population", "Economic output", "Inflation", "Debt"], correct: 1 },
      { question: "'Fiscal policy' involves:", options: ["Banking", "Government spending and tax", "Trading", "Insurance"], correct: 1 },
    ],
    conv: [
      { question: "Inflation reached:", options: ["3%", "4%", "5%", "6%"], correct: 3 },
      { question: "Inflation reduces:", options: ["Debt", "Purchasing power", "Savings", "Taxes"], correct: 1 },
    ],
    grammar: [
      { question: "'Inflation ___ 6% this year.'", options: ["reach", "reached", "reaching", "reaches"], correct: 1 },
      { question: "'Everyday items ___ more.'", options: ["costs", "cost", "costing", "costed"], correct: 1 },
    ],
    exam: [
      { question: "'Deflation' means prices:", options: ["Rise", "Fall", "Stay same", "Double"], correct: 1 },
      { question: "'Monetary policy' is set by:", options: ["Companies", "Central banks", "Individuals", "Schools"], correct: 1 },
    ],
    homework: [
      { question: "'___ erodes purchasing power.'", options: ["Deflation", "Inflation", "GDP", "Revenue"], correct: 1 },
      { question: "'GDP stands for Gross ___ Product.'", options: ["Daily", "Domestic", "Direct", "Digital"], correct: 1 },
    ],
  },
};

// Apply enhancements
for (let i = 1; i <= 5; i++) {
  const key = `finance-${i}`;
  const lesson = financeLessons[key];
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
