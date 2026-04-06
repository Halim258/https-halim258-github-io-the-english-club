import type { LessonData } from "./lessons";

export const healthcareLessons: Record<string, LessonData> = {
  "healthcare-1": {
    levelId: "healthcare", levelLabel: "English for Healthcare", lessonNumber: 1,
    title: "Hospital Departments & Roles",
    description: "Learn the names of hospital departments and healthcare professionals.",
    vocabulary: [
      { word: "Ward", meaning: "A room or section in a hospital", example: "The patient was moved to the surgical ward.", emoji: "🏥", arabic: "جناح" },
      { word: "Nurse", meaning: "A healthcare professional who cares for patients", example: "The nurse checked his blood pressure.", emoji: "👩‍⚕️", arabic: "ممرض/ة" },
      { word: "Surgeon", meaning: "A doctor who performs operations", example: "The surgeon performed a successful surgery.", emoji: "🔪", arabic: "جرّاح" },
      { word: "Pharmacist", meaning: "A person who prepares medicines", example: "Ask the pharmacist about dosage.", emoji: "💊", arabic: "صيدلي" },
      { word: "Emergency", meaning: "A serious, unexpected situation", example: "Call 999 in an emergency.", emoji: "🚨", arabic: "طوارئ" },
      { word: "Outpatient", meaning: "A patient not staying overnight", example: "She visited as an outpatient.", emoji: "🚶", arabic: "مريض خارجي" },
      { word: "Inpatient", meaning: "A patient staying in hospital", example: "He was admitted as an inpatient.", emoji: "🛏️", arabic: "مريض داخلي" },
      { word: "Radiology", meaning: "Department for X-rays and scans", example: "Go to radiology for your MRI.", emoji: "📡", arabic: "الأشعة" },
      { word: "Paediatrician", meaning: "A doctor for children", example: "Take the baby to the paediatrician.", emoji: "👶", arabic: "طبيب أطفال" },
      { word: "Anaesthesia", meaning: "Loss of sensation during surgery", example: "The patient was under general anaesthesia.", emoji: "😴", arabic: "تخدير" },
    ],
    dialogue: [
      { speaker: "Nurse", text: "Good morning! Welcome to St. Mary's Hospital. How can I help?" },
      { speaker: "Visitor", text: "I'm looking for the maternity ward. My sister just had a baby." },
      { speaker: "Nurse", text: "Congratulations! The maternity ward is on the third floor, turn left from the lift." },
      { speaker: "Visitor", text: "Thank you. Are there visiting hours?" },
      { speaker: "Nurse", text: "Yes, visiting hours are from 2 PM to 8 PM. You'll need to sign in at reception." },
      { speaker: "Visitor", text: "Got it. Is there a pharmacy in the hospital too?" },
      { speaker: "Nurse", text: "Yes, the pharmacy is on the ground floor near the main entrance." },
    ],
    grammar: {
      title: "Articles with Medical Terminology",
      explanation: "Use 'the' with specific departments ('the emergency room'), 'a/an' for roles ('a nurse', 'an anaesthetist'), and zero article for uncountable conditions ('anaesthesia', 'surgery').",
      examples: [
        { sentence: "The patient is in the ICU.", note: "'The' for specific location" },
        { sentence: "She's a paediatrician at the hospital.", note: "'A' for a role" },
        { sentence: "He needs surgery immediately.", note: "No article for uncountable noun" },
      ],
    },
    vocabExercises: [
      { question: "A 'ward' is:", options: ["A type of medicine", "A room or section in a hospital", "A medical tool", "A doctor's office"], correct: 1 },
      { question: "An 'outpatient' is:", options: ["A patient staying overnight", "A patient who visits but doesn't stay", "A doctor", "A visitor"], correct: 1 },
      { question: "A 'pharmacist' works in:", options: ["The operating room", "The pharmacy", "The ward", "The ambulance"], correct: 1 },
    ],
    conversationExercises: [
      { question: "You need to find the X-ray department. Best question?", options: ["X-ray where?", "Could you direct me to the radiology department?", "I need pictures.", "Scan me."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'She works as ___ nurse in ___ emergency department.'", options: ["a / the", "the / a", "an / the", "— / —"], correct: 0 },
    ],
    examQuestions: [
      { question: "'Paediatrician' specialises in:", options: ["Heart surgery", "Children's health", "Eye care", "Mental health"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "List 5 hospital departments you might visit. Which is most common?", options: ["Library", "Emergency department", "Cafeteria only", "Parking"], correct: 1 },
    ],
  },
  "healthcare-2": {
    levelId: "healthcare", levelLabel: "English for Healthcare", lessonNumber: 2,
    title: "Patient Intake & Medical History",
    description: "Gather patient information and discuss medical history professionally.",
    vocabulary: [
      { word: "Medical history", meaning: "A record of past health issues", example: "Please fill out your medical history form.", emoji: "📋", arabic: "التاريخ الطبي" },
      { word: "Allergy", meaning: "A bad reaction to a substance", example: "Are you allergic to any medications?", emoji: "🤧", arabic: "حساسية" },
      { word: "Medication", meaning: "Drugs used to treat illness", example: "What medication are you currently taking?", emoji: "💊", arabic: "دواء" },
      { word: "Blood pressure", meaning: "The force of blood against artery walls", example: "Your blood pressure is normal.", emoji: "❤️", arabic: "ضغط الدم" },
      { word: "Insurance", meaning: "A plan that covers medical costs", example: "Do you have health insurance?", emoji: "🛡️", arabic: "تأمين" },
      { word: "Hereditary", meaning: "Passed from parent to child", example: "Diabetes can be hereditary.", emoji: "🧬", arabic: "وراثي" },
      { word: "Symptom", meaning: "A sign of disease or illness", example: "What symptoms have you been experiencing?", emoji: "🤒", arabic: "عرض" },
      { word: "Chronic", meaning: "Long-lasting, ongoing", example: "She has a chronic condition.", emoji: "⏳", arabic: "مزمن" },
      { word: "Vital signs", meaning: "Basic body measurements (temp, pulse, BP)", example: "Let me check your vital signs.", emoji: "📊", arabic: "العلامات الحيوية" },
      { word: "Next of kin", meaning: "Closest living relative", example: "Who is your next of kin?", emoji: "👨‍👩‍👧", arabic: "أقرب الأقارب" },
    ],
    dialogue: [
      { speaker: "Nurse", text: "Good afternoon. I need to take some details before the doctor sees you." },
      { speaker: "Patient", text: "Of course, go ahead." },
      { speaker: "Nurse", text: "Do you have any allergies to medications?" },
      { speaker: "Patient", text: "Yes, I'm allergic to penicillin." },
      { speaker: "Nurse", text: "Noted. Are you currently taking any medication?" },
      { speaker: "Patient", text: "I take medication for high blood pressure — lisinopril." },
      { speaker: "Nurse", text: "Any family history of heart disease or diabetes?" },
      { speaker: "Patient", text: "My father had diabetes, and my mother has high cholesterol." },
      { speaker: "Nurse", text: "Thank you. Let me check your vital signs — temperature, pulse, and blood pressure." },
    ],
    grammar: {
      title: "Yes/No Questions for Patient Screening",
      explanation: "Use 'Do you have…?', 'Are you…?', 'Have you ever…?' for screening questions. Follow up with open-ended questions for more detail.",
      examples: [
        { sentence: "Do you have any allergies?", note: "Standard screening question" },
        { sentence: "Have you ever had surgery?", note: "Present perfect for past experience" },
        { sentence: "Are you currently taking any medication?", note: "Present continuous for ongoing actions" },
      ],
    },
    vocabExercises: [
      { question: "'Vital signs' include:", options: ["Only temperature", "Temperature, pulse, and blood pressure", "Only weight", "Only height"], correct: 1 },
      { question: "'Hereditary' means:", options: ["Caught from others", "Passed from parent to child", "Temporary", "Environmental"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A patient says 'I'm allergic to penicillin.' You should:", options: ["Ignore it", "Note it clearly in their records", "Give them penicillin anyway", "Ask them to prove it"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ you ever had surgery before?'", options: ["Do", "Are", "Have", "Did"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Next of kin' refers to:", options: ["Your doctor", "Your closest living relative", "Your employer", "Your friend"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Create 5 patient intake questions. Which is essential?", options: ["Favourite colour", "Current medications and allergies", "Favourite food", "Holiday plans"], correct: 1 },
    ],
  },
  "healthcare-3": {
    levelId: "healthcare", levelLabel: "English for Healthcare", lessonNumber: 3,
    title: "Explaining Procedures to Patients",
    description: "Communicate medical procedures clearly in simple, reassuring language.",
    vocabulary: [
      { word: "Procedure", meaning: "A medical treatment or operation", example: "The procedure takes about 30 minutes.", emoji: "🔬", arabic: "إجراء" },
      { word: "Consent", meaning: "Permission given by the patient", example: "We need your written consent.", emoji: "✍️", arabic: "موافقة" },
      { word: "Sedation", meaning: "Medicine to make you relaxed or sleepy", example: "You'll be under light sedation.", emoji: "😴", arabic: "تهدئة" },
      { word: "Incision", meaning: "A surgical cut", example: "The incision will be very small.", emoji: "✂️", arabic: "شق" },
      { word: "Recovery", meaning: "The process of getting better", example: "Recovery takes about two weeks.", emoji: "🏥", arabic: "تعافي" },
      { word: "Sterile", meaning: "Free from germs", example: "All instruments are sterile.", emoji: "🧼", arabic: "معقم" },
      { word: "Complication", meaning: "An unexpected medical problem", example: "We'll explain possible complications.", emoji: "⚠️", arabic: "مضاعفة" },
      { word: "Local anaesthetic", meaning: "Numbing a specific area", example: "We'll use a local anaesthetic.", emoji: "💉", arabic: "مخدر موضعي" },
      { word: "Biopsy", meaning: "Taking a tissue sample for testing", example: "The biopsy results will be ready in a week.", emoji: "🔎", arabic: "خزعة" },
      { word: "Discharge", meaning: "Being released from hospital", example: "You'll be discharged the same day.", emoji: "🚪", arabic: "خروج من المستشفى" },
    ],
    dialogue: [
      { speaker: "Doctor", text: "I'd like to explain the procedure so you know what to expect." },
      { speaker: "Patient", text: "OK, I'm a bit nervous. Will it hurt?" },
      { speaker: "Doctor", text: "We'll use a local anaesthetic, so you won't feel any pain during the procedure." },
      { speaker: "Patient", text: "How long will it take?" },
      { speaker: "Doctor", text: "About 20 minutes. You'll be able to go home the same day." },
      { speaker: "Patient", text: "Are there any risks?" },
      { speaker: "Doctor", text: "Complications are rare, but we'll discuss them in the consent form." },
      { speaker: "Patient", text: "Thank you for explaining everything clearly." },
    ],
    grammar: {
      title: "Future Tense for Procedure Explanations",
      explanation: "Use 'will' for definite steps and 'going to' for planned actions when explaining what will happen: 'We will apply anaesthetic', 'You're going to feel some pressure.'",
      examples: [
        { sentence: "First, we'll clean the area with antiseptic.", note: "'Will' for definite step" },
        { sentence: "You're going to feel a slight pinch.", note: "'Going to' for expected sensation" },
        { sentence: "The whole procedure will take about 30 minutes.", note: "'Will' for duration" },
      ],
    },
    vocabExercises: [
      { question: "'Consent' means:", options: ["Disagreement", "Permission from the patient", "A type of medicine", "A medical instrument"], correct: 1 },
      { question: "'Sterile' means:", options: ["Dirty", "Free from germs", "Old", "Broken"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A patient asks 'Will it hurt?' Best reassuring response?", options: ["Yes, a lot.", "We'll use anaesthetic so you won't feel pain.", "I don't know.", "Probably."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'You ___ a small bandage after the procedure.'", options: ["are needing", "will need", "needed", "needing"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Discharge' from hospital means:", options: ["Admission", "Being released to go home", "An emergency", "A transfer"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Explain a blood test procedure to a nervous patient. What's most important?", options: ["Use medical jargon", "Be clear, reassuring, and explain each step simply", "Rush through it", "Tell them not to worry without explaining"], correct: 1 },
    ],
  },
  "healthcare-4": {
    levelId: "healthcare", levelLabel: "English for Healthcare", lessonNumber: 4,
    title: "Medication & Prescriptions",
    description: "Discuss dosages, side effects, and medication instructions with patients.",
    vocabulary: [
      { word: "Dosage", meaning: "The amount of medicine to take", example: "Take the correct dosage as prescribed.", emoji: "💊", arabic: "جرعة" },
      { word: "Side effect", meaning: "An unwanted reaction to medicine", example: "Drowsiness is a common side effect.", emoji: "⚠️", arabic: "أثر جانبي" },
      { word: "Prescription", meaning: "A doctor's written order for medicine", example: "Here's your prescription — take it to the pharmacy.", emoji: "📝", arabic: "وصفة طبية" },
      { word: "Over-the-counter", meaning: "Medicine available without a prescription", example: "Paracetamol is available over-the-counter.", emoji: "🏪", arabic: "بدون وصفة" },
      { word: "Tablet", meaning: "A solid form of medicine", example: "Take one tablet twice a day.", emoji: "💊", arabic: "قرص" },
      { word: "Capsule", meaning: "A small case containing medicine", example: "Swallow the capsule with water.", emoji: "💉", arabic: "كبسولة" },
      { word: "Interaction", meaning: "When medicines affect each other", example: "Check for drug interactions first.", emoji: "🔄", arabic: "تفاعل دوائي" },
      { word: "Antibiotic", meaning: "Medicine that kills bacteria", example: "Complete the full course of antibiotics.", emoji: "🦠", arabic: "مضاد حيوي" },
      { word: "Refill", meaning: "Getting more of the same medicine", example: "I need a refill of my prescription.", emoji: "🔁", arabic: "إعادة تعبئة" },
      { word: "Contraindication", meaning: "A reason not to use a medicine", example: "Pregnancy is a contraindication for this drug.", emoji: "🚫", arabic: "مانع استخدام" },
    ],
    dialogue: [
      { speaker: "Pharmacist", text: "Here's your medication. Do you have any questions about it?" },
      { speaker: "Patient", text: "Yes — how often should I take it?" },
      { speaker: "Pharmacist", text: "Take one tablet three times a day, after meals." },
      { speaker: "Patient", text: "Are there any side effects I should know about?" },
      { speaker: "Pharmacist", text: "You may experience mild drowsiness. Avoid driving if that happens." },
      { speaker: "Patient", text: "I'm also taking blood pressure medication. Is that OK?" },
      { speaker: "Pharmacist", text: "Let me check for interactions… Yes, there's no conflict. You're safe to take both." },
    ],
    grammar: {
      title: "Frequency Adverbs for Medication Instructions",
      explanation: "Use frequency adverbs and phrases for clear dosage instructions: 'twice a day', 'every 8 hours', 'before meals', 'with water'.",
      examples: [
        { sentence: "Take one tablet twice a day after meals.", note: "Frequency + timing" },
        { sentence: "Apply the cream every 8 hours.", note: "Specific interval" },
        { sentence: "Never take more than 4 tablets in 24 hours.", note: "Maximum dosage with 'never'" },
      ],
    },
    vocabExercises: [
      { question: "'Over-the-counter' medicine:", options: ["Requires a prescription", "Is available without a prescription", "Is only for children", "Is only in hospitals"], correct: 1 },
      { question: "A 'contraindication' means:", options: ["Take more medicine", "A reason NOT to use a medicine", "A side effect", "A dosage"], correct: 1 },
    ],
    conversationExercises: [
      { question: "Patient asks about side effects. Best response?", options: ["There are none.", "You may experience drowsiness — avoid driving.", "Don't worry about it.", "Read the box."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Take one capsule ___ a day with food.'", options: ["one", "twice", "two times a", "double"], correct: 1 },
    ],
    examQuestions: [
      { question: "Why should you complete a full course of antibiotics?", options: ["To waste medicine", "To ensure all bacteria are killed", "It doesn't matter", "The doctor said so"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "A patient is confused about their medication. What helps most?", options: ["Give them more pills", "Write clear, simple instructions with timing", "Tell them to Google it", "Nothing"], correct: 1 },
    ],
  },
  "healthcare-5": {
    levelId: "healthcare", levelLabel: "English for Healthcare", lessonNumber: 5,
    title: "Mental Health Vocabulary & Conversations",
    description: "Discuss mental health sensitively using appropriate language.",
    vocabulary: [
      { word: "Anxiety", meaning: "Excessive worry or fear", example: "She experiences anxiety in social situations.", emoji: "😰", arabic: "قلق" },
      { word: "Depression", meaning: "A persistent feeling of sadness", example: "Depression is a treatable condition.", emoji: "😔", arabic: "اكتئاب" },
      { word: "Therapy", meaning: "Treatment for mental health issues", example: "Cognitive therapy has helped many patients.", emoji: "🧠", arabic: "علاج نفسي" },
      { word: "Stigma", meaning: "Negative attitudes towards something", example: "We need to reduce the stigma around mental health.", emoji: "🚷", arabic: "وصمة" },
      { word: "Wellbeing", meaning: "The state of being healthy and happy", example: "Exercise improves mental wellbeing.", emoji: "🌿", arabic: "رفاهية" },
      { word: "Counsellor", meaning: "A professional who gives guidance", example: "A school counsellor can help students.", emoji: "🧑‍💼", arabic: "مستشار" },
      { word: "Coping", meaning: "Dealing with stress effectively", example: "Healthy coping strategies include exercise.", emoji: "💪", arabic: "تأقلم" },
      { word: "Mindfulness", meaning: "Being present and aware", example: "Mindfulness meditation reduces stress.", emoji: "🧘", arabic: "يقظة ذهنية" },
      { word: "Burnout", meaning: "Exhaustion from too much work/stress", example: "Healthcare workers are at risk of burnout.", emoji: "🔥", arabic: "إنهاك" },
      { word: "Self-care", meaning: "Actions to maintain your health", example: "Self-care includes rest, exercise, and socialising.", emoji: "🛁", arabic: "عناية ذاتية" },
    ],
    dialogue: [
      { speaker: "Patient", text: "Doctor, I've been feeling really low lately. I can't seem to enjoy anything." },
      { speaker: "Doctor", text: "I'm glad you told me. How long have you been feeling this way?" },
      { speaker: "Patient", text: "About two months. I also have trouble sleeping." },
      { speaker: "Doctor", text: "I understand. Have you experienced this before?" },
      { speaker: "Patient", text: "No, this is the first time. I feel overwhelmed at work." },
      { speaker: "Doctor", text: "It sounds like you might be experiencing burnout and possibly depression. Would you be open to speaking with a counsellor?" },
      { speaker: "Patient", text: "I was worried about being judged, but yes, I'd like help." },
      { speaker: "Doctor", text: "There's absolutely nothing to be ashamed of. Seeking help is a sign of strength." },
    ],
    grammar: {
      title: "Expressing Feelings with 'I feel' + Adjective / 'I've been feeling'",
      explanation: "Use 'I feel + adjective' for current state and 'I've been feeling + adjective' for ongoing states. These are essential for mental health conversations.",
      examples: [
        { sentence: "I feel anxious about the presentation.", note: "Current feeling" },
        { sentence: "I've been feeling overwhelmed for weeks.", note: "Ongoing feeling" },
        { sentence: "She doesn't feel like herself lately.", note: "Changed state" },
      ],
    },
    vocabExercises: [
      { question: "'Burnout' is caused by:", options: ["Too much sleep", "Exhaustion from excessive work/stress", "Eating too much", "Exercise"], correct: 1 },
      { question: "'Stigma' around mental health means:", options: ["Support", "Negative attitudes", "Treatment", "Awareness"], correct: 1 },
    ],
    conversationExercises: [
      { question: "A colleague says they're struggling. Best response?", options: ["Cheer up!", "I'm here for you. Would you like to talk about it?", "Everyone feels that way.", "Just exercise more."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'I ___ really stressed for the past few weeks.'", options: ["feel", "am feeling", "have been feeling", "felt"], correct: 2 },
    ],
    examQuestions: [
      { question: "Seeking help for mental health is:", options: ["A weakness", "A sign of strength", "Unnecessary", "Only for serious cases"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "List 3 healthy coping strategies. Which is most effective?", options: ["Ignoring problems", "A combination of exercise, therapy, and social support", "Working harder", "Isolation"], correct: 1 },
    ],
  },
};
