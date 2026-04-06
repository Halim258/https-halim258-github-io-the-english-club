import type { LessonData } from "./lessons";

export const financeLessons: Record<string, LessonData> = {
  "finance-1": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 1,
    title: "Banking Basics & Vocabulary",
    description: "Essential banking terms for opening accounts, making transactions, and managing money.",
    vocabulary: [
      { word: "Account", meaning: "A bank arrangement for managing money", example: "I'd like to open a savings account.", emoji: "🏦", arabic: "حساب" },
      { word: "Transaction", meaning: "A financial exchange", example: "The transaction was processed immediately.", emoji: "💳", arabic: "معاملة مالية" },
      { word: "Balance", meaning: "The amount of money in an account", example: "Your current balance is £2,500.", emoji: "💰", arabic: "رصيد" },
      { word: "Deposit", meaning: "To put money into an account", example: "I'd like to deposit £500.", emoji: "💵", arabic: "إيداع" },
      { word: "Withdraw", meaning: "To take money out of an account", example: "You can withdraw cash from any ATM.", emoji: "🏧", arabic: "سحب" },
      { word: "Interest rate", meaning: "The percentage charged or earned on money", example: "The interest rate on this loan is 5%.", emoji: "📈", arabic: "معدل الفائدة" },
      { word: "Mortgage", meaning: "A loan for buying property", example: "They took out a 25-year mortgage.", emoji: "🏠", arabic: "رهن عقاري" },
      { word: "Currency", meaning: "The money system of a country", example: "The local currency is Egyptian pounds.", emoji: "💱", arabic: "عملة" },
      { word: "Statement", meaning: "A record of bank transactions", example: "I receive monthly bank statements.", emoji: "📄", arabic: "كشف حساب" },
      { word: "Overdraft", meaning: "Spending more than what's in your account", example: "She went into overdraft this month.", emoji: "📉", arabic: "سحب على المكشوف" },
    ],
    dialogue: [
      { speaker: "Customer", text: "Good morning. I'd like to open a current account." },
      { speaker: "Banker", text: "Of course! Do you have a form of ID and proof of address?" },
      { speaker: "Customer", text: "Yes, I have my passport and a utility bill." },
      { speaker: "Banker", text: "Would you also like to set up online banking?" },
      { speaker: "Customer", text: "Yes please. What's the interest rate on savings?" },
      { speaker: "Banker", text: "Our savings account offers 3.5% annual interest." },
      { speaker: "Customer", text: "That's competitive. I'll open both accounts." },
    ],
    grammar: {
      title: "Conditional Sentences for Financial Decisions",
      explanation: "Use first conditional ('If you deposit…, you will earn…') for likely outcomes, and second conditional ('If I had more savings, I would invest…') for hypothetical situations.",
      examples: [
        { sentence: "If you maintain a minimum balance, you'll avoid fees.", note: "First conditional — likely" },
        { sentence: "If I had £10,000, I would invest in stocks.", note: "Second conditional — hypothetical" },
        { sentence: "Unless you pay by Friday, there will be a late fee.", note: "'Unless' = 'if not'" },
      ],
    },
    vocabExercises: [
      { question: "To 'deposit' means to:", options: ["Take money out", "Put money in", "Transfer money", "Borrow money"], correct: 1 },
      { question: "An 'overdraft' means:", options: ["Having extra money", "Spending more than your balance", "A type of savings", "A loan"], correct: 1 },
      { question: "A 'mortgage' is a loan for:", options: ["Cars", "Education", "Property", "Travel"], correct: 2 },
    ],
    conversationExercises: [
      { question: "You want to open a bank account. First question?", options: ["Give me money.", "I'd like to open a current account, please.", "How rich is your bank?", "Do you have cash?"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'If you ___ monthly, you'll pay less interest.'", options: ["pay", "pays", "paid", "paying"], correct: 0 },
    ],
    examQuestions: [
      { question: "'Interest rate' is:", options: ["A bank fee", "The percentage earned or charged on money", "A type of account", "A currency"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Compare current accounts vs savings accounts. Key difference?", options: ["They're the same", "Current is for daily use; savings earns more interest", "Savings has no money", "Current earns more interest"], correct: 1 },
    ],
  },
  "finance-2": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 2,
    title: "Investments & Stock Market",
    description: "Learn investment terminology and discuss market trends professionally.",
    vocabulary: [
      { word: "Stock", meaning: "A share of ownership in a company", example: "I bought stocks in Apple.", emoji: "📊", arabic: "سهم" },
      { word: "Portfolio", meaning: "A collection of investments", example: "Diversify your portfolio to reduce risk.", emoji: "💼", arabic: "محفظة استثمارية" },
      { word: "Dividend", meaning: "A share of profits paid to shareholders", example: "The company pays quarterly dividends.", emoji: "💸", arabic: "أرباح" },
      { word: "Bull market", meaning: "A market with rising prices", example: "We're currently in a bull market.", emoji: "🐂", arabic: "سوق صاعد" },
      { word: "Bear market", meaning: "A market with falling prices", example: "Investors are cautious in a bear market.", emoji: "🐻", arabic: "سوق هابط" },
      { word: "Volatility", meaning: "Rapid and unpredictable price changes", example: "Crypto markets have high volatility.", emoji: "📉", arabic: "تقلب" },
      { word: "Bond", meaning: "A loan to a government or company", example: "Government bonds are considered safe.", emoji: "🔒", arabic: "سند" },
      { word: "Yield", meaning: "The income earned from an investment", example: "This bond has a 4% yield.", emoji: "🌾", arabic: "عائد" },
      { word: "Broker", meaning: "A person who buys/sells investments for others", example: "My broker recommended tech stocks.", emoji: "🧑‍💼", arabic: "وسيط" },
      { word: "Diversify", meaning: "To spread investments across different areas", example: "Diversify to reduce overall risk.", emoji: "🔀", arabic: "ينوّع" },
    ],
    dialogue: [
      { speaker: "Advisor", text: "Based on your risk profile, I'd recommend a balanced portfolio." },
      { speaker: "Client", text: "What does 'balanced' mean exactly?" },
      { speaker: "Advisor", text: "About 60% stocks for growth and 40% bonds for stability." },
      { speaker: "Client", text: "What if the market drops?" },
      { speaker: "Advisor", text: "That's why we diversify. Not all sectors fall at the same time." },
      { speaker: "Client", text: "Are dividends guaranteed?" },
      { speaker: "Advisor", text: "No, but well-established companies have a reliable dividend history." },
    ],
    grammar: {
      title: "Passive Voice for Financial Reporting",
      explanation: "Financial reports often use passive voice: 'Shares were traded at…', 'The dividend was announced…'. This emphasises the action over who did it.",
      examples: [
        { sentence: "The stock was listed at £50 per share.", note: "Passive — focus on the stock" },
        { sentence: "Dividends are paid quarterly.", note: "Passive — focus on the process" },
        { sentence: "The portfolio was diversified across sectors.", note: "Passive — focus on the action" },
      ],
    },
    vocabExercises: [
      { question: "A 'bull market' has:", options: ["Falling prices", "Rising prices", "No change", "Closed markets"], correct: 1 },
      { question: "To 'diversify' means:", options: ["Put all money in one stock", "Spread investments across areas", "Sell everything", "Buy only bonds"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A client asks 'Is investing safe?' Best response?", options: ["Always!", "All investments carry risk, but diversification helps manage it.", "Never invest.", "It's gambling."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The annual report ___ published last week.'", options: ["is", "was", "been", "being"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'dividend' is:", options: ["A bank fee", "A share of company profits paid to shareholders", "A type of loan", "An interest rate"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Explain why diversification is important. Best reason?", options: ["To make things complicated", "To reduce risk by spreading investments", "It's not important", "To avoid taxes"], correct: 1 },
    ],
  },
  "finance-3": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 3,
    title: "Financial Reports & Analysis",
    description: "Read and discuss financial statements, balance sheets, and profit reports.",
    vocabulary: [
      { word: "Revenue", meaning: "Total money earned by a business", example: "Revenue increased by 15% this quarter.", emoji: "💰", arabic: "إيرادات" },
      { word: "Profit", meaning: "Money earned after expenses", example: "Net profit was £2 million.", emoji: "📈", arabic: "ربح" },
      { word: "Loss", meaning: "When expenses exceed revenue", example: "The company reported a loss this year.", emoji: "📉", arabic: "خسارة" },
      { word: "Asset", meaning: "Something of value owned by a company", example: "Real estate is a valuable asset.", emoji: "🏢", arabic: "أصل" },
      { word: "Liability", meaning: "Debts or obligations owed", example: "Reduce liabilities to improve the balance sheet.", emoji: "⚖️", arabic: "التزام" },
      { word: "Equity", meaning: "The value of ownership in a company", example: "Shareholder equity grew by 10%.", emoji: "🧮", arabic: "حقوق الملكية" },
      { word: "Forecast", meaning: "A prediction of future performance", example: "The forecast shows strong growth.", emoji: "🔮", arabic: "توقعات" },
      { word: "Quarter", meaning: "A three-month period", example: "Q3 results exceeded expectations.", emoji: "📅", arabic: "ربع سنة" },
      { word: "Audit", meaning: "An official examination of accounts", example: "The annual audit found no irregularities.", emoji: "🔍", arabic: "تدقيق" },
      { word: "Margin", meaning: "The difference between cost and selling price", example: "Our profit margin is 25%.", emoji: "📐", arabic: "هامش" },
    ],
    dialogue: [
      { speaker: "CFO", text: "Let me walk you through the Q3 financial report." },
      { speaker: "Board member", text: "How did revenue compare to last quarter?" },
      { speaker: "CFO", text: "Revenue grew 12% quarter-over-quarter, reaching £8.5 million." },
      { speaker: "Board member", text: "And what about profitability?" },
      { speaker: "CFO", text: "Net profit was £1.2 million with a margin of 14%." },
      { speaker: "Board member", text: "Any concerns about liabilities?" },
      { speaker: "CFO", text: "Our debt-to-equity ratio improved. We reduced long-term liabilities by 8%." },
    ],
    grammar: {
      title: "Comparatives for Financial Trends",
      explanation: "Use comparatives to discuss financial performance: 'higher than', 'lower than', 'better than expected'. Add percentages and figures for precision.",
      examples: [
        { sentence: "Revenue was 15% higher than the previous quarter.", note: "Comparative + percentage" },
        { sentence: "Costs were lower than projected.", note: "Comparative + benchmark" },
        { sentence: "This quarter's results are the strongest in two years.", note: "Superlative for best performance" },
      ],
    },
    vocabExercises: [
      { question: "'Revenue' is:", options: ["Profit after expenses", "Total money earned", "A type of investment", "A tax"], correct: 1 },
      { question: "A 'liability' is:", options: ["Something you own", "A debt or obligation", "A profit", "An asset"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Presenting financial results. Best opening?", options: ["Money good.", "Let me walk you through the Q3 financial highlights.", "We made stuff.", "Revenue exists."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Profit was 20% ___ than last year.'", options: ["high", "higher", "highest", "highly"], correct: 1 },
    ],
    examQuestions: [
      { question: "An 'audit' is:", options: ["A financial prediction", "An official examination of accounts", "A marketing report", "A tax form"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Read a company's annual report. What are the three key financial statements?", options: ["Only revenue", "Income statement, balance sheet, cash flow statement", "Only profit", "Only taxes"], correct: 1 },
    ],
  },
  "finance-4": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 4,
    title: "Taxes & Personal Finance",
    description: "Understand tax terminology and manage personal finances effectively.",
    vocabulary: [
      { word: "Tax", meaning: "Money paid to the government", example: "Income tax is deducted from your salary.", emoji: "🏛️", arabic: "ضريبة" },
      { word: "Deduction", meaning: "An amount subtracted from taxable income", example: "Charitable donations are tax deductions.", emoji: "➖", arabic: "خصم ضريبي" },
      { word: "Budget", meaning: "A plan for spending money", example: "Create a monthly budget to save more.", emoji: "📊", arabic: "ميزانية" },
      { word: "Expense", meaning: "Money spent on something", example: "Track your daily expenses.", emoji: "🧾", arabic: "مصروف" },
      { word: "Savings", meaning: "Money put aside for the future", example: "Build an emergency savings fund.", emoji: "🐷", arabic: "مدخرات" },
      { word: "Debt", meaning: "Money owed to someone", example: "Pay off high-interest debt first.", emoji: "💸", arabic: "دين" },
      { word: "Income", meaning: "Money received from work or investments", example: "Her annual income is £45,000.", emoji: "💵", arabic: "دخل" },
      { word: "Inflation", meaning: "Rising prices over time", example: "Inflation reduces purchasing power.", emoji: "📈", arabic: "تضخم" },
      { word: "Retirement", meaning: "Stopping work due to age", example: "Start saving for retirement early.", emoji: "👴", arabic: "تقاعد" },
      { word: "Insurance", meaning: "Protection against financial loss", example: "Health insurance covers medical costs.", emoji: "🛡️", arabic: "تأمين" },
    ],
    dialogue: [
      { speaker: "Advisor", text: "Let's review your financial health. What's your monthly income?" },
      { speaker: "Client", text: "About £3,000 after tax." },
      { speaker: "Advisor", text: "And your expenses?" },
      { speaker: "Client", text: "Rent is £900, bills around £200, food £300. The rest goes to… well, I'm not sure." },
      { speaker: "Advisor", text: "That's common. Let's create a budget to track where every pound goes." },
      { speaker: "Client", text: "Should I focus on saving or paying off my credit card debt?" },
      { speaker: "Advisor", text: "Pay off high-interest debt first, then build your emergency savings." },
    ],
    grammar: {
      title: "Should / Ought to for Financial Advice",
      explanation: "Use 'should' and 'ought to' for financial recommendations. Use 'shouldn't' for warnings about bad financial habits.",
      examples: [
        { sentence: "You should create a monthly budget.", note: "'Should' for strong advice" },
        { sentence: "You ought to save at least 20% of your income.", note: "'Ought to' for formal recommendation" },
        { sentence: "You shouldn't rely on credit cards for daily expenses.", note: "'Shouldn't' for warnings" },
      ],
    },
    vocabExercises: [
      { question: "'Inflation' means:", options: ["Falling prices", "Rising prices over time", "Stable prices", "No change"], correct: 1 },
      { question: "A 'deduction' reduces your:", options: ["Salary", "Taxable income", "Savings", "Debt"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A friend asks how to save money. Best advice?", options: ["Don't spend anything.", "Create a budget and track your expenses.", "Just earn more.", "Savings don't matter."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'You ___ start saving for retirement as early as possible.'", options: ["must not", "should", "won't", "can't"], correct: 1 },
    ],
    examQuestions: [
      { question: "What should you pay off first?", options: ["Low-interest debt", "High-interest debt", "No debt matters", "Your mortgage first"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Create a personal budget. What's the 50/30/20 rule?", options: ["50% savings, 30% fun, 20% bills", "50% needs, 30% wants, 20% savings", "50% fun, 30% bills, 20% food", "It doesn't matter"], correct: 1 },
    ],
  },
  "finance-5": {
    levelId: "finance", levelLabel: "English for Finance", lessonNumber: 5,
    title: "International Trade & Currency",
    description: "Discuss global trade, exchange rates, and international business transactions.",
    vocabulary: [
      { word: "Exchange rate", meaning: "The value of one currency against another", example: "The exchange rate is 1 USD = 0.82 GBP.", emoji: "💱", arabic: "سعر الصرف" },
      { word: "Import", meaning: "To bring goods into a country", example: "Egypt imports wheat from several countries.", emoji: "📦", arabic: "استيراد" },
      { word: "Export", meaning: "To send goods to another country", example: "We export cotton worldwide.", emoji: "🚢", arabic: "تصدير" },
      { word: "Tariff", meaning: "A tax on imported goods", example: "The government imposed a tariff on steel.", emoji: "🏷️", arabic: "تعريفة" },
      { word: "Surplus", meaning: "More exports than imports", example: "The country has a trade surplus.", emoji: "➕", arabic: "فائض" },
      { word: "Deficit", meaning: "More imports than exports", example: "The trade deficit widened this quarter.", emoji: "➖", arabic: "عجز" },
      { word: "GDP", meaning: "Gross Domestic Product — total economic output", example: "GDP growth was 3.2% this year.", emoji: "📊", arabic: "الناتج المحلي الإجمالي" },
      { word: "Recession", meaning: "A significant decline in economic activity", example: "The 2008 recession affected global markets.", emoji: "📉", arabic: "ركود" },
      { word: "Commodity", meaning: "A raw material that is traded", example: "Oil and gold are major commodities.", emoji: "🛢️", arabic: "سلعة" },
      { word: "Sanction", meaning: "A penalty imposed on a country", example: "Economic sanctions restrict trade.", emoji: "🚫", arabic: "عقوبة" },
    ],
    dialogue: [
      { speaker: "Reporter", text: "The Egyptian pound has weakened against the dollar. What's your analysis?" },
      { speaker: "Economist", text: "The currency depreciation reflects higher import costs and a widening trade deficit." },
      { speaker: "Reporter", text: "How will this affect ordinary citizens?" },
      { speaker: "Economist", text: "Imported goods will become more expensive, leading to higher inflation." },
      { speaker: "Reporter", text: "Is there any positive side?" },
      { speaker: "Economist", text: "Yes — a weaker currency can boost exports, as our goods become cheaper abroad." },
    ],
    grammar: {
      title: "Cause & Effect with 'Lead to', 'Result in', 'Due to'",
      explanation: "Use cause-effect language for economic analysis: 'lead to', 'result in', 'due to', 'as a result of'. These connect economic events to their consequences.",
      examples: [
        { sentence: "Higher tariffs led to increased consumer prices.", note: "'Led to' = caused" },
        { sentence: "The deficit resulted from excessive imports.", note: "'Resulted from' = was caused by" },
        { sentence: "Due to inflation, purchasing power declined.", note: "'Due to' = because of" },
      ],
    },
    vocabExercises: [
      { question: "A 'trade surplus' means:", options: ["More imports than exports", "More exports than imports", "Equal imports and exports", "No trade at all"], correct: 1 },
      { question: "'GDP' stands for:", options: ["Global Digital Payment", "Gross Domestic Product", "General Data Protection", "Growth Development Plan"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Explaining inflation to a client. Best approach?", options: ["Just numbers.", "Rising prices mean your money buys less over time.", "It's complicated.", "Don't worry about it."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Higher oil prices ___ increased transportation costs.'", options: ["led to", "lead from", "leading", "leads at"], correct: 0 },
    ],
    examQuestions: [
      { question: "A 'tariff' is:", options: ["A discount on exports", "A tax on imported goods", "A currency", "An investment"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Research current exchange rates. Why do they fluctuate?", options: ["They never change", "Supply and demand, inflation, and economic conditions", "Random chance", "Government decisions only"], correct: 1 },
    ],
  },
};
