import { healthcareLessons } from "./healthcare-lessons";

const extraVocab: Record<number, { word: string; meaning: string; example: string; emoji: string; arabic: string }[]> = {
  1: [
    { word: "Symptom", meaning: "A sign of illness", example: "Fever is a common symptom.", emoji: "🤒", arabic: "عَرَض" },
    { word: "Diagnosis", meaning: "Identifying a disease", example: "The diagnosis was confirmed by tests.", emoji: "🔬", arabic: "تشخيص" },
    { word: "Prescription", meaning: "A doctor's written order for medicine", example: "Take this prescription to the pharmacy.", emoji: "📝", arabic: "وصفة طبية" },
    { word: "Vital signs", meaning: "Key body measurements", example: "The nurse checked my vital signs.", emoji: "📊", arabic: "علامات حيوية" },
    { word: "Triage", meaning: "Sorting patients by urgency", example: "Triage determines who is seen first.", emoji: "🚨", arabic: "فرز طبي" },
  ],
  2: [
    { word: "Stethoscope", meaning: "Tool to listen to heart/lungs", example: "The doctor used a stethoscope.", emoji: "🩺", arabic: "سماعة طبية" },
    { word: "Syringe", meaning: "A device for injections", example: "The nurse prepared the syringe.", emoji: "💉", arabic: "حقنة" },
    { word: "Thermometer", meaning: "Measures body temperature", example: "The thermometer showed 38°C.", emoji: "🌡️", arabic: "ميزان حرارة" },
    { word: "Bandage", meaning: "A strip used to cover wounds", example: "Apply a bandage to the cut.", emoji: "🩹", arabic: "ضمادة" },
    { word: "Wheelchair", meaning: "A chair with wheels for mobility", example: "The patient used a wheelchair.", emoji: "♿", arabic: "كرسي متحرك" },
  ],
  3: [
    { word: "Allergy", meaning: "Immune reaction to a substance", example: "She has a peanut allergy.", emoji: "🤧", arabic: "حساسية" },
    { word: "Chronic", meaning: "Long-lasting condition", example: "He has chronic back pain.", emoji: "⏳", arabic: "مزمن" },
    { word: "Acute", meaning: "Sudden and severe", example: "She experienced acute pain.", emoji: "⚡", arabic: "حاد" },
    { word: "Dosage", meaning: "The amount of medicine to take", example: "Follow the correct dosage.", emoji: "💊", arabic: "جرعة" },
    { word: "Side effect", meaning: "Unwanted reaction to medicine", example: "Drowsiness is a common side effect.", emoji: "😴", arabic: "أثر جانبي" },
  ],
  4: [
    { word: "Trauma", meaning: "Physical or emotional injury", example: "The patient suffered head trauma.", emoji: "🤕", arabic: "صدمة" },
    { word: "Resuscitation", meaning: "Reviving someone", example: "CPR is a form of resuscitation.", emoji: "❤️‍🩹", arabic: "إنعاش" },
    { word: "Defibrillator", meaning: "Device to restart the heart", example: "Use the defibrillator immediately.", emoji: "⚡", arabic: "جهاز صدمات كهربائية" },
    { word: "Stabilize", meaning: "To make a patient's condition steady", example: "We need to stabilize the patient.", emoji: "📈", arabic: "تثبيت الحالة" },
    { word: "Intubation", meaning: "Inserting a tube into the airway", example: "The patient required intubation.", emoji: "🫁", arabic: "تنبيب" },
  ],
  5: [
    { word: "Oncology", meaning: "Study of cancer", example: "She works in oncology.", emoji: "🔬", arabic: "علم الأورام" },
    { word: "Benign", meaning: "Not cancerous", example: "The tumor was benign.", emoji: "✅", arabic: "حميد" },
    { word: "Malignant", meaning: "Cancerous and spreading", example: "The biopsy showed malignant cells.", emoji: "⚠️", arabic: "خبيث" },
    { word: "Chemotherapy", meaning: "Cancer treatment using drugs", example: "She started chemotherapy last week.", emoji: "💉", arabic: "علاج كيميائي" },
    { word: "Remission", meaning: "Period when cancer is not active", example: "The cancer is in remission.", emoji: "🎉", arabic: "هدوء المرض" },
  ],
  6: [
    { word: "Orthopedic", meaning: "Related to bones and muscles", example: "He visited an orthopedic surgeon.", emoji: "🦴", arabic: "جراحة عظام" },
    { word: "Fracture", meaning: "A broken bone", example: "The X-ray showed a fracture.", emoji: "🩻", arabic: "كسر" },
    { word: "Physical therapy", meaning: "Rehabilitation exercises", example: "Physical therapy helped her recover.", emoji: "🏋️", arabic: "علاج طبيعي" },
    { word: "Sprain", meaning: "A stretched or torn ligament", example: "He has an ankle sprain.", emoji: "🦶", arabic: "التواء" },
    { word: "Prosthesis", meaning: "An artificial body part", example: "She was fitted with a prosthesis.", emoji: "🦿", arabic: "طرف اصطناعي" },
  ],
  7: [
    { word: "Pediatrician", meaning: "A children's doctor", example: "Take the baby to the pediatrician.", emoji: "👶", arabic: "طبيب أطفال" },
    { word: "Vaccination", meaning: "Injection to prevent disease", example: "Vaccination protects children.", emoji: "💉", arabic: "تطعيم" },
    { word: "Growth chart", meaning: "Tracking a child's development", example: "The growth chart looks normal.", emoji: "📏", arabic: "مخطط النمو" },
    { word: "Immunization", meaning: "Making the body resistant to disease", example: "Immunization is essential for kids.", emoji: "🛡️", arabic: "تحصين" },
    { word: "Milestone", meaning: "A developmental achievement", example: "Walking is a major milestone.", emoji: "🎯", arabic: "مرحلة تطورية" },
  ],
  8: [
    { word: "Psychiatrist", meaning: "Doctor for mental health", example: "She consulted a psychiatrist.", emoji: "🧠", arabic: "طبيب نفسي" },
    { word: "Anxiety", meaning: "Feeling of worry or fear", example: "Anxiety can affect daily life.", emoji: "😰", arabic: "قلق" },
    { word: "Therapy", meaning: "Treatment for mental health", example: "Therapy helped him cope.", emoji: "🗣️", arabic: "علاج نفسي" },
    { word: "Depression", meaning: "Persistent sadness", example: "Depression is treatable.", emoji: "😔", arabic: "اكتئاب" },
    { word: "Cognitive", meaning: "Related to thinking and memory", example: "Cognitive therapy is effective.", emoji: "💭", arabic: "إدراكي" },
  ],
  9: [
    { word: "Radiology", meaning: "Medical imaging specialty", example: "The radiology report is ready.", emoji: "🩻", arabic: "الأشعة" },
    { word: "MRI", meaning: "Magnetic Resonance Imaging", example: "The MRI scan was clear.", emoji: "🧲", arabic: "تصوير بالرنين المغناطيسي" },
    { word: "Ultrasound", meaning: "Imaging using sound waves", example: "The ultrasound showed the baby.", emoji: "📡", arabic: "موجات فوق صوتية" },
    { word: "CT scan", meaning: "Detailed cross-section X-ray", example: "A CT scan was ordered.", emoji: "🖥️", arabic: "أشعة مقطعية" },
    { word: "Biopsy", meaning: "Tissue sample for testing", example: "The biopsy results were negative.", emoji: "🔬", arabic: "خزعة" },
  ],
  10: [
    { word: "Consent form", meaning: "Permission document for treatment", example: "Please sign the consent form.", emoji: "📋", arabic: "نموذج موافقة" },
    { word: "Confidentiality", meaning: "Keeping patient info private", example: "Confidentiality is a legal requirement.", emoji: "🔒", arabic: "سرية" },
    { word: "Malpractice", meaning: "Professional negligence", example: "Malpractice can lead to lawsuits.", emoji: "⚖️", arabic: "سوء ممارسة طبية" },
    { word: "HIPAA", meaning: "US health privacy law", example: "HIPAA protects patient data.", emoji: "🛡️", arabic: "قانون حماية البيانات الصحية" },
    { word: "Informed consent", meaning: "Agreement after understanding risks", example: "Informed consent is required before surgery.", emoji: "✍️", arabic: "موافقة مستنيرة" },
  ],
};

const extraDialogues: Record<number, { speaker: string; text: string }[]> = {
  1: [
    { speaker: "Patient", text: "I've been feeling dizzy for three days." },
    { speaker: "Nurse", text: "Let me check your blood pressure first." },
    { speaker: "Patient", text: "Is that normal?" },
    { speaker: "Nurse", text: "It's slightly elevated. The doctor will see you now." },
    { speaker: "Doctor", text: "Based on your symptoms, I'd like to run some blood tests." },
  ],
  2: [
    { speaker: "Nurse", text: "I need to take your blood sample now." },
    { speaker: "Patient", text: "Will it hurt?" },
    { speaker: "Nurse", text: "Just a small pinch. You'll be fine." },
    { speaker: "Patient", text: "What equipment do you need?" },
    { speaker: "Nurse", text: "A syringe, alcohol swab, and a bandage." },
  ],
  3: [
    { speaker: "Pharmacist", text: "Here's your prescription. Take one tablet twice daily." },
    { speaker: "Patient", text: "Are there any side effects?" },
    { speaker: "Pharmacist", text: "You may feel drowsy. Avoid driving." },
    { speaker: "Patient", text: "Should I take it with food?" },
    { speaker: "Pharmacist", text: "Yes, always take it after meals." },
  ],
  4: [
    { speaker: "Paramedic", text: "We have a trauma patient incoming!" },
    { speaker: "Doctor", text: "Prepare the resuscitation room immediately." },
    { speaker: "Nurse", text: "Vital signs are unstable." },
    { speaker: "Doctor", text: "Start IV fluids and prepare for intubation." },
    { speaker: "Paramedic", text: "Patient was in a car accident. Multiple injuries." },
  ],
  5: [
    { speaker: "Oncologist", text: "The biopsy results are back." },
    { speaker: "Patient", text: "What do they show?" },
    { speaker: "Oncologist", text: "The tumor is benign. No cancer detected." },
    { speaker: "Patient", text: "That's such a relief!" },
    { speaker: "Oncologist", text: "We'll monitor it with follow-up scans every six months." },
  ],
  6: [
    { speaker: "Surgeon", text: "The X-ray confirms a fracture in your wrist." },
    { speaker: "Patient", text: "Will I need surgery?" },
    { speaker: "Surgeon", text: "A cast should be sufficient for healing." },
    { speaker: "Patient", text: "How long until I can use my hand normally?" },
    { speaker: "Surgeon", text: "About six to eight weeks with physical therapy." },
  ],
  7: [
    { speaker: "Mother", text: "My baby has had a fever since yesterday." },
    { speaker: "Pediatrician", text: "Let me examine her. Has she been vaccinated recently?" },
    { speaker: "Mother", text: "Yes, she got her shots last week." },
    { speaker: "Pediatrician", text: "A mild fever after vaccination is normal." },
    { speaker: "Mother", text: "Should I give her any medicine?" },
  ],
  8: [
    { speaker: "Therapist", text: "How have you been feeling this week?" },
    { speaker: "Patient", text: "I've been having trouble sleeping and concentrating." },
    { speaker: "Therapist", text: "Those are common symptoms of anxiety." },
    { speaker: "Patient", text: "What can I do about it?" },
    { speaker: "Therapist", text: "Let's try some cognitive behavioral techniques." },
  ],
  9: [
    { speaker: "Radiologist", text: "We need to do an MRI of your knee." },
    { speaker: "Patient", text: "How long does it take?" },
    { speaker: "Radiologist", text: "About 30 to 45 minutes. Please lie still." },
    { speaker: "Patient", text: "Is it painful?" },
    { speaker: "Radiologist", text: "Not at all. You'll just hear some loud noises." },
  ],
  10: [
    { speaker: "Administrator", text: "Please sign this consent form before the procedure." },
    { speaker: "Patient", text: "What exactly am I agreeing to?" },
    { speaker: "Administrator", text: "It outlines the procedure, risks, and your rights." },
    { speaker: "Patient", text: "Is my information kept confidential?" },
    { speaker: "Administrator", text: "Absolutely. All records are protected by law." },
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
      { question: "'Triage' means:", options: ["Treatment", "Sorting patients by urgency", "Surgery", "Recovery"], correct: 1 },
      { question: "A 'symptom' is:", options: ["A cure", "A sign of illness", "A tool", "A medicine"], correct: 1 },
      { question: "'Vital signs' include:", options: ["Eye color", "Heart rate and temperature", "Hair length", "Weight only"], correct: 1 },
    ],
    conv: [
      { question: "What did the nurse check first?", options: ["Temperature", "Blood pressure", "Weight", "Height"], correct: 1 },
      { question: "What did the doctor want to run?", options: ["A race", "Blood tests", "X-rays", "Nothing"], correct: 1 },
    ],
    grammar: [
      { question: "'The patient ___ examined by the doctor.'", options: ["is", "was", "are", "were"], correct: 1 },
      { question: "'You ___ take this medicine twice daily.'", options: ["shall", "should", "would", "could"], correct: 1 },
    ],
    exam: [
      { question: "A 'prescription' is:", options: ["A medical tool", "A written order for medicine", "A surgery", "A disease"], correct: 1 },
      { question: "'Diagnosis' means:", options: ["A treatment", "Identifying a disease", "A symptom", "An allergy"], correct: 1 },
    ],
    homework: [
      { question: "'The nurse ___ the patient's vitals.'", options: ["check", "checked", "checking", "checks"], correct: 1 },
      { question: "'Triage' is done in the:", options: ["Pharmacy", "Emergency room", "Library", "Office"], correct: 1 },
    ],
  },
  2: {
    vocab: [
      { question: "A 'stethoscope' is used to:", options: ["Measure weight", "Listen to heart/lungs", "Take blood", "Check eyes"], correct: 1 },
      { question: "A 'syringe' is used for:", options: ["Eating", "Injections", "Writing", "Cleaning"], correct: 1 },
      { question: "A 'thermometer' measures:", options: ["Blood pressure", "Body temperature", "Height", "Weight"], correct: 1 },
    ],
    conv: [
      { question: "The nurse needed a syringe, swab, and:", options: ["Stethoscope", "Bandage", "Thermometer", "Wheelchair"], correct: 1 },
      { question: "The patient was worried about:", options: ["Cost", "Pain", "Time", "Food"], correct: 1 },
    ],
    grammar: [
      { question: "'The blood sample ___ taken.'", options: ["is", "was", "are", "were"], correct: 1 },
      { question: "'Please ___ still during the procedure.'", options: ["remain", "remaining", "remained", "remains"], correct: 0 },
    ],
    exam: [
      { question: "A 'wheelchair' is for:", options: ["Sleeping", "Mobility assistance", "Eating", "Writing"], correct: 1 },
      { question: "A 'bandage' covers:", options: ["Eyes", "Wounds", "Ears", "Hair"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ showed 38 degrees.'", options: ["Stethoscope", "Thermometer", "Syringe", "Bandage"], correct: 1 },
      { question: "'The nurse ___ the syringe.'", options: ["prepare", "prepared", "preparing", "prepares"], correct: 1 },
    ],
  },
  3: {
    vocab: [
      { question: "'Chronic' means:", options: ["Short-term", "Long-lasting", "Mild", "Sudden"], correct: 1 },
      { question: "'Acute' pain is:", options: ["Mild", "Sudden and severe", "Chronic", "Imaginary"], correct: 1 },
      { question: "A 'side effect' is:", options: ["The main effect", "An unwanted reaction", "A benefit", "A cure"], correct: 1 },
    ],
    conv: [
      { question: "The pharmacist warned about:", options: ["Cost", "Drowsiness", "Taste", "Color"], correct: 1 },
      { question: "Medicine should be taken:", options: ["Before meals", "After meals", "At midnight", "Without water"], correct: 1 },
    ],
    grammar: [
      { question: "'Take one tablet ___ daily.'", options: ["one", "twice", "three", "four"], correct: 1 },
      { question: "'You ___ feel drowsy.'", options: ["must", "may", "shall", "will"], correct: 1 },
    ],
    exam: [
      { question: "'Dosage' refers to:", options: ["Type of medicine", "Amount to take", "Medicine color", "Brand name"], correct: 1 },
      { question: "An 'allergy' is:", options: ["A cure", "An immune reaction", "A medicine", "A vitamin"], correct: 1 },
    ],
    homework: [
      { question: "'The patient has a ___ condition.'", options: ["chronic", "quick", "fast", "sudden"], correct: 0 },
      { question: "'Always follow the correct ___.'", options: ["recipe", "dosage", "route", "song"], correct: 1 },
    ],
  },
  4: {
    vocab: [
      { question: "'Resuscitation' means:", options: ["Surgery", "Reviving someone", "Diagnosis", "Testing"], correct: 1 },
      { question: "A 'defibrillator' is used to:", options: ["Check blood", "Restart the heart", "Take X-rays", "Measure weight"], correct: 1 },
      { question: "'Intubation' involves:", options: ["A cast", "A tube in the airway", "A bandage", "Stitches"], correct: 1 },
    ],
    conv: [
      { question: "The patient was in a:", options: ["Meeting", "Car accident", "Restaurant", "Class"], correct: 1 },
      { question: "The doctor ordered:", options: ["Food", "IV fluids", "Rest", "Exercise"], correct: 1 },
    ],
    grammar: [
      { question: "'___ the resuscitation room!'", options: ["Prepare", "Preparing", "Prepared", "Prepares"], correct: 0 },
      { question: "'Vital signs ___ unstable.'", options: ["is", "was", "are", "am"], correct: 2 },
    ],
    exam: [
      { question: "'Trauma' is:", options: ["A medicine", "Physical/emotional injury", "Equipment", "A ward"], correct: 1 },
      { question: "'Stabilize' means to make:", options: ["Worse", "Steady", "Faster", "Louder"], correct: 1 },
    ],
    homework: [
      { question: "'The paramedic ___ the patient.'", options: ["stabilize", "stabilized", "stabilizing", "stabilizes"], correct: 1 },
      { question: "'CPR is a form of ___.'", options: ["Diagnosis", "Resuscitation", "Prescription", "Triage"], correct: 1 },
    ],
  },
  5: {
    vocab: [
      { question: "'Benign' means:", options: ["Cancerous", "Not cancerous", "Unknown", "Dangerous"], correct: 1 },
      { question: "'Malignant' means:", options: ["Harmless", "Cancerous", "Mild", "Healing"], correct: 1 },
      { question: "'Remission' means cancer is:", options: ["Spreading", "Not active", "Terminal", "New"], correct: 1 },
    ],
    conv: [
      { question: "The biopsy showed the tumor was:", options: ["Malignant", "Benign", "Unknown", "Growing"], correct: 1 },
      { question: "Follow-up scans are every:", options: ["Week", "Month", "Six months", "Year"], correct: 2 },
    ],
    grammar: [
      { question: "'The tumor ___ benign.'", options: ["are", "is", "were", "am"], correct: 1 },
      { question: "'We ___ monitor it regularly.'", options: ["will", "shall", "would", "could"], correct: 0 },
    ],
    exam: [
      { question: "'Oncology' is the study of:", options: ["Bones", "Cancer", "Brain", "Heart"], correct: 1 },
      { question: "'Chemotherapy' treats:", options: ["Fractures", "Cancer", "Allergies", "Anxiety"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ results were negative.'", options: ["Biopsy", "Recipe", "Exam", "Interview"], correct: 0 },
      { question: "'Cancer in ___ means it's not active.'", options: ["Remission", "Progression", "Stage", "Treatment"], correct: 0 },
    ],
  },
  6: {
    vocab: [
      { question: "A 'fracture' is:", options: ["A bruise", "A broken bone", "A cut", "A burn"], correct: 1 },
      { question: "'Physical therapy' helps with:", options: ["Cooking", "Rehabilitation", "Driving", "Shopping"], correct: 1 },
      { question: "A 'prosthesis' is:", options: ["A medicine", "An artificial body part", "A bandage", "A tool"], correct: 1 },
    ],
    conv: [
      { question: "The fracture was in the:", options: ["Leg", "Wrist", "Arm", "Ankle"], correct: 1 },
      { question: "Healing takes about:", options: ["2 weeks", "6-8 weeks", "6 months", "1 year"], correct: 1 },
    ],
    grammar: [
      { question: "'The X-ray ___ a fracture.'", options: ["confirm", "confirms", "confirmed", "confirming"], correct: 2 },
      { question: "'A cast ___ be sufficient.'", options: ["will", "should", "may", "can"], correct: 1 },
    ],
    exam: [
      { question: "'Orthopedic' relates to:", options: ["Heart", "Bones and muscles", "Brain", "Lungs"], correct: 1 },
      { question: "A 'sprain' is a:", options: ["Broken bone", "Torn ligament", "Cut", "Burn"], correct: 1 },
    ],
    homework: [
      { question: "'She needs ___ therapy after surgery.'", options: ["Chemical", "Physical", "Mental", "Vocal"], correct: 1 },
      { question: "'The ___ showed the fracture.'", options: ["MRI", "X-ray", "Ultrasound", "Blood test"], correct: 1 },
    ],
  },
  7: {
    vocab: [
      { question: "A 'pediatrician' treats:", options: ["Adults", "Children", "Animals", "Elderly"], correct: 1 },
      { question: "'Immunization' makes the body:", options: ["Weak", "Resistant to disease", "Tired", "Hungry"], correct: 1 },
      { question: "A 'milestone' is:", options: ["A stone", "A developmental achievement", "A medicine", "A toy"], correct: 1 },
    ],
    conv: [
      { question: "The baby had a fever after:", options: ["Eating", "Vaccination", "Sleeping", "Playing"], correct: 1 },
      { question: "A mild fever after vaccination is:", options: ["Dangerous", "Normal", "Rare", "Impossible"], correct: 1 },
    ],
    grammar: [
      { question: "'The baby ___ vaccinated last week.'", options: ["is", "was", "are", "were"], correct: 1 },
      { question: "'___ I give her medicine?'", options: ["Will", "Should", "Do", "Am"], correct: 1 },
    ],
    exam: [
      { question: "A 'growth chart' tracks:", options: ["Grades", "Development", "Behavior", "Diet"], correct: 1 },
      { question: "'Vaccination' prevents:", options: ["Hunger", "Disease", "Growth", "Sleep"], correct: 1 },
    ],
    homework: [
      { question: "'Take the baby to the ___.'", options: ["Dentist", "Pediatrician", "Vet", "Pharmacist"], correct: 1 },
      { question: "'Walking is a major ___.'", options: ["Problem", "Milestone", "Disease", "Side effect"], correct: 1 },
    ],
  },
  8: {
    vocab: [
      { question: "A 'psychiatrist' treats:", options: ["Bones", "Mental health", "Eyes", "Teeth"], correct: 1 },
      { question: "'Anxiety' is:", options: ["Happiness", "Worry or fear", "Hunger", "Tiredness"], correct: 1 },
      { question: "'Cognitive' relates to:", options: ["Muscles", "Thinking and memory", "Skin", "Blood"], correct: 1 },
    ],
    conv: [
      { question: "The patient had trouble:", options: ["Eating", "Sleeping and concentrating", "Walking", "Driving"], correct: 1 },
      { question: "The therapist suggested:", options: ["Surgery", "Cognitive techniques", "Medicine only", "Exercise"], correct: 1 },
    ],
    grammar: [
      { question: "'Anxiety ___ affect daily life.'", options: ["must", "can", "shall", "will"], correct: 1 },
      { question: "'Depression ___ treatable.'", options: ["are", "is", "were", "am"], correct: 1 },
    ],
    exam: [
      { question: "'Therapy' helps with:", options: ["Cooking", "Mental health", "Sports", "Driving"], correct: 1 },
      { question: "'Depression' is:", options: ["Joy", "Persistent sadness", "Excitement", "Energy"], correct: 1 },
    ],
    homework: [
      { question: "'She consulted a ___.'", options: ["Chef", "Psychiatrist", "Teacher", "Driver"], correct: 1 },
      { question: "'___ behavioral therapy is effective.'", options: ["Physical", "Cognitive", "Chemical", "Surgical"], correct: 1 },
    ],
  },
  9: {
    vocab: [
      { question: "'MRI' stands for:", options: ["Medical Record Info", "Magnetic Resonance Imaging", "Major Report Index", "Manual Review Item"], correct: 1 },
      { question: "An 'ultrasound' uses:", options: ["X-rays", "Sound waves", "Lasers", "Magnets"], correct: 1 },
      { question: "A 'biopsy' takes:", options: ["Blood", "Tissue sample", "X-ray", "Urine"], correct: 1 },
    ],
    conv: [
      { question: "The MRI takes about:", options: ["5 minutes", "30-45 minutes", "2 hours", "5 hours"], correct: 1 },
      { question: "During the MRI you hear:", options: ["Music", "Silence", "Loud noises", "Voices"], correct: 2 },
    ],
    grammar: [
      { question: "'The MRI scan ___ clear.'", options: ["is", "was", "are", "were"], correct: 1 },
      { question: "'Please ___ still during the scan.'", options: ["lie", "lay", "laid", "lying"], correct: 0 },
    ],
    exam: [
      { question: "'Radiology' is a:", options: ["Treatment", "Medical imaging specialty", "Surgery", "Ward"], correct: 1 },
      { question: "A 'CT scan' provides:", options: ["Sound", "Cross-section images", "Blood results", "Heart rate"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ report is ready.'", options: ["Radiology", "Cooking", "Travel", "Music"], correct: 0 },
      { question: "'The ultrasound showed the ___.'", options: ["Fracture", "Baby", "Tumor", "Infection"], correct: 1 },
    ],
  },
  10: {
    vocab: [
      { question: "'Confidentiality' means:", options: ["Sharing data", "Keeping info private", "Deleting records", "Publishing results"], correct: 1 },
      { question: "'Malpractice' is:", options: ["Good care", "Professional negligence", "A promotion", "A reward"], correct: 1 },
      { question: "'Informed consent' requires:", options: ["Guessing", "Understanding risks first", "Signing blindly", "Nothing"], correct: 1 },
    ],
    conv: [
      { question: "The consent form outlines:", options: ["Menu options", "Procedure and risks", "Hotel amenities", "Job duties"], correct: 1 },
      { question: "Patient records are protected by:", options: ["Tradition", "Law", "Opinion", "Custom"], correct: 1 },
    ],
    grammar: [
      { question: "'All records ___ protected.'", options: ["is", "are", "was", "am"], correct: 1 },
      { question: "'Please ___ the consent form.'", options: ["sign", "signed", "signing", "signs"], correct: 0 },
    ],
    exam: [
      { question: "'HIPAA' protects:", options: ["Animals", "Patient data", "Buildings", "Equipment"], correct: 1 },
      { question: "A 'consent form' gives:", options: ["Medicine", "Permission", "Diagnosis", "Treatment"], correct: 1 },
    ],
    homework: [
      { question: "'___ is a legal requirement.'", options: ["Confidentiality", "Cooking", "Shopping", "Sleeping"], correct: 0 },
      { question: "'Malpractice can lead to ___.'", options: ["Rewards", "Lawsuits", "Promotions", "Holidays"], correct: 1 },
    ],
  },
};

// Apply enhancements
for (let i = 1; i <= 10; i++) {
  const key = `healthcare-${i}`;
  const lesson = healthcareLessons[key];
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
