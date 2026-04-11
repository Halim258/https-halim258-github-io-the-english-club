import { financeLessons } from "./finance-lessons";
import { financeLessons2 } from "./finance-lessons-2";

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
  6: [
    { word: "Risk assessment", meaning: "Evaluating potential dangers", example: "Risk assessment is crucial for insurance.", emoji: "⚠️", arabic: "تقييم المخاطر" },
    { word: "Reinsurance", meaning: "Insurance for insurance companies", example: "Reinsurance spreads risk across markets.", emoji: "🔄", arabic: "إعادة التأمين" },
    { word: "Pool", meaning: "Shared risk among many", example: "The insurance pool covers thousands of policyholders.", emoji: "👥", arabic: "تجمع" },
    { word: "Loss ratio", meaning: "Claims paid vs premiums collected", example: "A high loss ratio affects profitability.", emoji: "📊", arabic: "نسبة الخسارة" },
    { word: "Probation", meaning: "Trial period before full coverage", example: "There's a 30-day probation period.", emoji: "⏳", arabic: "فترة اختبار" },
  ],
  7: [
    { word: "Ledger", meaning: "Digital record of transactions", example: "The blockchain ledger is immutable.", emoji: "📖", arabic: "دفتر أستاذ" },
    { word: "Fork", meaning: "Split in blockchain protocol", example: "A hard fork created Bitcoin Cash.", emoji: "🍴", arabic: "تفرع" },
    { word: "Fiat", meaning: "Government-issued currency", example: "Bitcoin is not fiat money.", emoji: "💵", arabic: "عملة ورقية" },
    { word: "Custody", meaning: "Safekeeping of digital assets", example: "Institutional custody services are growing.", emoji: "🔐", arabic: "حفظ" },
    { word: "Airdrop", meaning: "Free distribution of tokens", example: "The airdrop rewarded early adopters.", emoji: "🎁", arabic: "توزيع مجاني" },
  ],
  8: [
    { word: "Appraisal", meaning: "Professional property valuation", example: "The appraisal came in at $420,000.", emoji: "🏠", arabic: "تقييم عقاري" },
    { word: "Escrow", meaning: "Third-party holding funds", example: "Funds are held in escrow until closing.", emoji: "🔒", arabic: "حساب ضمان" },
    { word: "Closing costs", meaning: "Fees when finalising purchase", example: "Closing costs are 3-5% of the price.", emoji: "💰", arabic: "تكاليف الإغلاق" },
    { word: "Amortization", meaning: "Paying off debt over time", example: "Amortization schedules show principal vs interest.", emoji: "📉", arabic: "استهلاك" },
    { word: "Refinancing", meaning: "Replacing a loan with new terms", example: "Refinancing lowered their interest rate.", emoji: "🔄", arabic: "إعادة التمويل" },
  ],
  9: [
    { word: "Seed round", meaning: "Early startup funding", example: "They raised $500K in a seed round.", emoji: "🌱", arabic: "جولة تمويل أولية" },
    { word: "Series A", meaning: "First major venture round", example: "Series A funding targets $2-10M.", emoji: "📈", arabic: "جولة أ" },
    { word: "Cap table", meaning: "Ownership structure chart", example: "The cap table shows founder percentages.", emoji: "📊", arabic: "جدول الملكية" },
    { word: "Dilution", meaning: "Reduction in ownership percentage", example: "New funding causes dilution for early investors.", emoji: "💧", arabic: "تخفيف" },
    { word: "Exit strategy", meaning: "Plan to sell investment", example: "IPO is a common exit strategy.", emoji: "🚪", arabic: "استراتيجية الخروج" },
  ],
  10: [
    { word: "Ethics", meaning: "Moral principles in business", example: "Financial ethics guide professional conduct.", emoji: "⚖️", arabic: "أخلاقيات" },
    { word: "Conflict of interest", meaning: "Personal gain vs professional duty", example: "Trading on insider info is a conflict of interest.", emoji: "🔄", arabic: "تضارب المصالح" },
    { word: "Fiduciary", meaning: "Person with legal duty to act for another", example: "A fiduciary must prioritise client interests.", emoji: "👔", arabic: "وصي" },
    { word: "Sarbanes-Oxley", meaning: "US corporate governance law", example: "Sarbanes-Oxley requires CEO certification.", emoji: "📜", arabic: "قانون ساربانيس-أوكسلي" },
    { word: "Know Your Customer", meaning: "Verifying client identity", example: "KYC prevents financial crimes.", emoji: "🆔", arabic: "اعرف عميلك" },
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
  6: [
    { speaker: "Underwriter", text: "We need to assess the flood risk for this property." },
    { speaker: "Agent", text: "The area hasn't flooded in 20 years." },
    { speaker: "Underwriter", text: "Still, we should check the elevation and drainage." },
    { speaker: "Agent", text: "What about reinsurance for catastrophic events?" },
    { speaker: "Underwriter", text: "Yes, we cede 30% to our reinsurance partner." },
  ],
  7: [
    { speaker: "Trader", text: "Ethereum just hard forked. Did you move your funds?" },
    { speaker: "Holder", text: "No, my wallet auto-updated. What's different?" },
    { speaker: "Trader", text: "Gas fees dropped 40%, and staking rewards increased." },
    { speaker: "Holder", text: "Should I convert some to fiat for stability?" },
    { speaker: "Trader", text: "Maybe 20% — keep the rest in cold custody." },
  ],
  8: [
    { speaker: "Buyer", text: "The appraisal came in lower than my offer. What now?" },
    { speaker: "Agent", text: "You can negotiate with the seller or increase your down payment." },
    { speaker: "Buyer", text: "What's the closing timeline?" },
    { speaker: "Agent", text: "Typically 30-45 days after escrow opens." },
    { speaker: "Buyer", text: "And closing costs are around 4%?" },
  ],
  9: [
    { speaker: "VC", text: "Walk me through your cap table." },
    { speaker: "Founder", text: "Founders own 60%, employees 20%, seed investors 15%, advisors 5%." },
    { speaker: "VC", text: "What's your planned use of Series A funds?" },
    { speaker: "Founder", text: "40% engineering, 30% sales, 20% marketing, 10% operations." },
    { speaker: "VC", text: "And your exit strategy timeline?" },
  ],
  10: [
    { speaker: "Regulator", text: "We've identified potential Sarbanes-Oxley violations." },
    { speaker: "Compliance", text: "Which sections are affected?" },
    { speaker: "Regulator", text: "Section 302 — CEO certification of financials." },
    { speaker: "Compliance", text: "Our CFO signed off, but the CEO delegated." },
    { speaker: "Regulator", text: "That's a violation. The CEO must personally certify." },
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
  6: {
    vocab: [
      { question: "'Risk assessment' evaluates:", options: ["Profits", "Potential dangers", "Market prices", "Interest rates"], correct: 1 },
      { question: "'Reinsurance' is insurance for:", options: ["Homes", "Insurance companies", "Cars", "Banks"], correct: 1 },
      { question: "A 'loss ratio' compares:", options: ["Income to expenses", "Claims to premiums", "Assets to liabilities", "Revenue to profit"], correct: 1 },
    ],
    conv: [
      { question: "The property's flood risk requires checking:", options: ["Only history", "Elevation and drainage", "Just price", "Colour"], correct: 1 },
      { question: "Reinsurance ceding percentage mentioned:", options: ["10%", "20%", "30%", "40%"], correct: 2 },
    ],
    grammar: [
      { question: "'We ___ 30% to our reinsurance partner.'", options: ["cedes", "cede", "ceding", "ceded"], correct: 1 },
      { question: "'Risk assessment ___ crucial for insurance.'", options: ["is", "are", "be", "being"], correct: 0 },
    ],
    exam: [
      { question: "An insurance 'pool' involves:", options: ["One person", "Shared risk among many", "A swimming pool", "A fee"], correct: 1 },
      { question: "'Probation' is a:", options: ["Trial period", "Full coverage", "Claim", "Penalty"], correct: 0 },
    ],
    homework: [
      { question: "'A high ___ ratio affects profitability.'", options: ["Profit", "Loss", "Growth", "Revenue"], correct: 1 },
      { question: "'There's a 30-day ___ period.'", options: ["Full", "Probation", "Active", "Closed"], correct: 1 },
    ],
  },
  7: {
    vocab: [
      { question: "A 'ledger' in crypto is:", options: ["A notebook", "A digital transaction record", "A bank", "A coin"], correct: 1 },
      { question: "A 'fork' in blockchain means:", options: ["Eating", "Protocol split", "Mining", "Buying"], correct: 1 },
      { question: "'Fiat' refers to:", options: ["Crypto", "Government currency", "Gold", "Stocks"], correct: 1 },
    ],
    conv: [
      { question: "Ethereum gas fees dropped by:", options: ["20%", "30%", "40%", "50%"], correct: 2 },
      { question: "Suggested fiat conversion percentage:", options: ["10%", "15%", "20%", "30%"], correct: 2 },
    ],
    grammar: [
      { question: "'My wallet ___ updated automatically.'", options: ["update", "updates", "updated", "updating"], correct: 1 },
      { question: "'Gas fees ___ 40% after the fork.'", options: ["drop", "dropped", "dropping", "drops"], correct: 1 },
    ],
    exam: [
      { question: "'Custody' services are for:", options: ["Real estate", "Digital asset safekeeping", "Bank loans", "Stock trading"], correct: 1 },
      { question: "An 'airdrop' is:", options: ["A fee", "Free token distribution", "A trade", "A penalty"], correct: 1 },
    ],
    homework: [
      { question: "'The blockchain ___ is immutable.'", options: ["Coin", "Ledger", "Token", "Wallet"], correct: 1 },
      { question: "'Keep the rest in cold ___.'", options: ["Storage", "Custody", "Air", "Trading"], correct: 1 },
    ],
  },
  8: {
    vocab: [
      { question: "An 'appraisal' is a:", options: ["Loan", "Property valuation", "Contract", "Payment"], correct: 1 },
      { question: "'Escrow' means funds are:", options: ["Gone", "Held by third party", "Spent", "Invested"], correct: 1 },
      { question: "'Amortization' shows:", options: ["Debt payoff over time", "Instant payment", "No payment", "Random payment"], correct: 0 },
    ],
    conv: [
      { question: "Closing costs are typically:", options: ["1-2%", "3-5%", "6-8%", "10-12%"], correct: 1 },
      { question: "Closing timeline is:", options: ["10-20 days", "30-45 days", "60-90 days", "6 months"], correct: 1 },
    ],
    grammar: [
      { question: "'The ___ came in lower than my offer.'", options: ["Agent", "Appraisal", "Banker", "Seller"], correct: 1 },
      { question: "'___ schedules show principal vs interest.'", options: ["Payment", "Amortization", "Escrow", "Closing"], correct: 1 },
    ],
    exam: [
      { question: "'Refinancing' replaces a loan:", options: ["With the same terms", "With new terms", "With no terms", "With cash"], correct: 1 },
      { question: "'Closing costs' are:", options: ["No fees", "Fees when finalising purchase", "Monthly payments", "Down payment"], correct: 1 },
    ],
    homework: [
      { question: "'Funds are held in ___ until closing.'", options: ["Bank", "Escrow", "Wallet", "Account"], correct: 1 },
      { question: "'___ lowered their interest rate.'", options: ["Selling", "Refinancing", "Buying", "Renting"], correct: 1 },
    ],
  },
  9: {
    vocab: [
      { question: "A 'seed round' is:", options: ["Late funding", "Early startup funding", "Public offering", "Bank loan"], correct: 1 },
      { question: "'Series A' is the:", options: ["First funding", "First major venture round", "Last round", "IPO"], correct: 1 },
      { question: "A 'cap table' shows:", options: ["Prices", "Ownership structure", "Products", "Locations"], correct: 1 },
    ],
    conv: [
      { question: "Founders own:", options: ["40%", "50%", "60%", "70%"], correct: 2 },
      { question: "Series A engineering allocation:", options: ["30%", "40%", "50%", "60%"], correct: 1 },
    ],
    grammar: [
      { question: "'They ___ $500K in a seed round.'", options: ["raise", "raised", "raising", "raises"], correct: 1 },
      { question: "'The cap table ___ founder percentages.'", options: ["show", "shows", "showed", "showing"], correct: 1 },
    ],
    exam: [
      { question: "'Dilution' means:", options: ["Increase in ownership", "Reduction in ownership percentage", "More profit", "Less risk"], correct: 1 },
      { question: "An 'exit strategy' is a plan to:", options: ["Start", "Sell investment", "Hire", "Build"], correct: 1 },
    ],
    homework: [
      { question: "'___ causes dilution for early investors.'", options: ["Profit", "New funding", "Success", "Growth"], correct: 1 },
      { question: "'IPO is a common ___ strategy.'", options: ["Entry", "Exit", "Growth", "Investment"], correct: 1 },
    ],
  },
  10: {
    vocab: [
      { question: "'Ethics' are:", options: ["Laws", "Moral principles", "Rules", "Taxes"], correct: 1 },
      { question: "A 'fiduciary' must prioritise:", options: ["Their own interests", "Client interests", "Company profit", "Stock price"], correct: 1 },
      { question: "'KYC' stands for:", options: ["Know Your Company", "Know Your Customer", "Keep Your Cash", "Key Your Code"], correct: 1 },
    ],
    conv: [
      { question: "Sarbanes-Oxley violation section:", options: ["101", "201", "302", "404"], correct: 2 },
      { question: "Who must personally certify financials:", options: ["CFO only", "CEO only", "Both", "Neither"], correct: 1 },
    ],
    grammar: [
      { question: "'Financial ethics ___ professional conduct.'", options: ["guide", "guides", "guiding", "guided"], correct: 1 },
      { question: "'The CEO ___ personally certify.'", options: ["must", "musts", "musting", "musted"], correct: 0 },
    ],
    exam: [
      { question: "'Conflict of interest' is when:", options: ["Everyone agrees", "Personal gain conflicts with duty", "Business grows", "Profits rise"], correct: 1 },
      { question: "KYC prevents:", options: ["Marketing", "Financial crimes", "Growth", "Investment"], correct: 1 },
    ],
    homework: [
      { question: "'Trading on insider info is a ___ of interest.'", options: ["Type", "Conflict", "Form", "Style"], correct: 1 },
      { question: "'___ requires CEO certification.'", options: ["KYC", "Sarbanes-Oxley", "GDPR", "IPO"], correct: 1 },
    ],
  },
};

// Apply enhancements to financeLessons (1-5)
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

// Apply enhancements to financeLessons2 (6-10)
for (let i = 6; i <= 10; i++) {
  const key = `finance-${i}`;
  const lesson = financeLessons2[key];
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
