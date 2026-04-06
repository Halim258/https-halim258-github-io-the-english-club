import type { LessonData } from "./lessons";

export const aviationLessons: Record<string, LessonData> = {
  "aviation-1": {
    levelId: "aviation", levelLabel: "English for Aviation", lessonNumber: 1,
    title: "Airport Vocabulary & Navigation",
    description: "Master essential airport terms for passengers and aviation staff.",
    vocabulary: [
      { word: "Terminal", meaning: "A building at an airport for passengers", example: "Depart from Terminal 3.", emoji: "🏢", arabic: "صالة" },
      { word: "Gate", meaning: "The area where you board a plane", example: "Your flight departs from Gate 12.", emoji: "🚪", arabic: "بوابة" },
      { word: "Boarding pass", meaning: "A document that allows you to board", example: "Please have your boarding pass ready.", emoji: "🎫", arabic: "بطاقة صعود" },
      { word: "Departure", meaning: "The act of leaving", example: "The departure time is 14:30.", emoji: "🛫", arabic: "مغادرة" },
      { word: "Arrival", meaning: "The act of reaching a destination", example: "The arrival hall is on the ground floor.", emoji: "🛬", arabic: "وصول" },
      { word: "Customs", meaning: "The area where goods are checked", example: "Do you have anything to declare at customs?", emoji: "🛃", arabic: "جمارك" },
      { word: "Baggage claim", meaning: "The area to collect luggage", example: "Go to baggage claim on Level 1.", emoji: "🧳", arabic: "استلام الأمتعة" },
      { word: "Check-in", meaning: "Registering for your flight", example: "Online check-in opens 24 hours before.", emoji: "✅", arabic: "تسجيل الوصول" },
      { word: "Layover", meaning: "A stop between connecting flights", example: "We have a 3-hour layover in Dubai.", emoji: "⏰", arabic: "توقف مؤقت" },
      { word: "Turbulence", meaning: "Rough, unsteady air movement", example: "Please fasten your seatbelt during turbulence.", emoji: "🌪️", arabic: "اضطراب جوي" },
    ],
    dialogue: [
      { speaker: "Passenger", text: "Excuse me, where is the check-in counter for EgyptAir?" },
      { speaker: "Staff", text: "EgyptAir check-in is at counters 15 to 20 in Terminal 1." },
      { speaker: "Passenger", text: "Thank you. Do I need to show my passport at check-in?" },
      { speaker: "Staff", text: "Yes, your passport and booking reference. Have you checked in online?" },
      { speaker: "Passenger", text: "Not yet. Is there a self-service kiosk?" },
      { speaker: "Staff", text: "Yes, right next to the counters. It's much faster." },
      { speaker: "Passenger", text: "Great! And where's the gate for Dubai flights?" },
      { speaker: "Staff", text: "After security, follow signs to Gates 20-35. Your gate will be on your boarding pass." },
    ],
    grammar: {
      title: "Prepositions of Place & Direction for Navigation",
      explanation: "Use specific prepositions for airport navigation: 'at' (location), 'to' (direction), 'from' (origin), 'through' (passing). These are essential for giving and following directions.",
      examples: [
        { sentence: "The flight departs from Gate 12.", note: "'From' for origin point" },
        { sentence: "Go through security and turn left.", note: "'Through' for passing a checkpoint" },
        { sentence: "Meet me at the arrivals hall.", note: "'At' for specific location" },
      ],
    },
    vocabExercises: [
      { question: "A 'layover' is:", options: ["A cancelled flight", "A stop between connecting flights", "A type of ticket", "A gate change"], correct: 1 },
      { question: "'Baggage claim' is where you:", options: ["Check in", "Collect your luggage", "Buy tickets", "Go through security"], correct: 1 },
      { question: "'Turbulence' is:", options: ["Smooth flying", "Rough air movement", "A type of aircraft", "A security check"], correct: 1 },
    ],
    conversationExercises: [
      { question: "You can't find your gate. Best question?", options: ["Gate where?", "Excuse me, could you direct me to Gate 24?", "I'm lost forever.", "Where am I going?"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'The flight departs ___ Gate 15.'", options: ["at", "in", "from", "on"], correct: 2 },
    ],
    examQuestions: [
      { question: "'Customs' is the area where:", options: ["You buy food", "Goods are checked when entering a country", "You board the plane", "You check in"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Describe the airport journey from arrival to boarding. First step?", options: ["Go to the gate", "Check in and get your boarding pass", "Go through customs", "Collect baggage"], correct: 1 },
    ],
  },
  "aviation-2": {
    levelId: "aviation", levelLabel: "English for Aviation", lessonNumber: 2,
    title: "In-Flight Communication",
    description: "Communicate with cabin crew and understand in-flight announcements.",
    vocabulary: [
      { word: "Cabin crew", meaning: "Flight attendants on an aircraft", example: "The cabin crew demonstrated safety procedures.", emoji: "👩‍✈️", arabic: "طاقم الطائرة" },
      { word: "Seatbelt", meaning: "A safety strap in your seat", example: "Please fasten your seatbelt for landing.", emoji: "🔒", arabic: "حزام الأمان" },
      { word: "Overhead compartment", meaning: "Storage space above seats", example: "Place your bag in the overhead compartment.", emoji: "📦", arabic: "الخزانة العلوية" },
      { word: "Tray table", meaning: "A fold-down table at your seat", example: "Please fold up your tray table for takeoff.", emoji: "🍽️", arabic: "طاولة قابلة للطي" },
      { word: "Emergency exit", meaning: "A door for evacuation", example: "Note the nearest emergency exit.", emoji: "🚨", arabic: "مخرج طوارئ" },
      { word: "Altitude", meaning: "Height above sea level", example: "We're cruising at an altitude of 35,000 feet.", emoji: "⬆️", arabic: "ارتفاع" },
      { word: "Descent", meaning: "Moving downward", example: "We've begun our descent into Cairo.", emoji: "⬇️", arabic: "هبوط" },
      { word: "Beverage", meaning: "A drink served during flight", example: "Would you like a beverage?", emoji: "🥤", arabic: "مشروب" },
      { word: "Aisle", meaning: "The walkway between seats", example: "Would you prefer an aisle or window seat?", emoji: "🚶", arabic: "ممر" },
      { word: "Announcement", meaning: "A public spoken message", example: "Please listen to the captain's announcement.", emoji: "📢", arabic: "إعلان" },
    ],
    dialogue: [
      { speaker: "Captain", text: "Ladies and gentlemen, this is your captain. We'll be cruising at 36,000 feet today." },
      { speaker: "Flight attendant", text: "Good afternoon! Would you like something to drink?" },
      { speaker: "Passenger", text: "Yes, could I have apple juice, please?" },
      { speaker: "Flight attendant", text: "Of course. And would you prefer chicken or pasta for your meal?" },
      { speaker: "Passenger", text: "Pasta, please. Also, could I get a blanket? It's quite cold." },
      { speaker: "Flight attendant", text: "Certainly! I'll bring it right away." },
      { speaker: "Captain", text: "We're experiencing some turbulence. Please return to your seats and fasten your seatbelts." },
    ],
    grammar: {
      title: "Passive Voice for Announcements",
      explanation: "In-flight announcements use passive voice for formal, impersonal communication: 'Passengers are requested…', 'Seatbelts must be fastened…'",
      examples: [
        { sentence: "Passengers are requested to remain seated.", note: "Passive — formal request" },
        { sentence: "All electronic devices must be switched off.", note: "Modal passive — instruction" },
        { sentence: "Meals will be served shortly.", note: "Future passive — information" },
      ],
    },
    vocabExercises: [
      { question: "'Cabin crew' refers to:", options: ["Pilots only", "Flight attendants", "Passengers", "Airport staff"], correct: 1 },
      { question: "The 'aisle' seat is next to:", options: ["The window", "The walkway", "The emergency exit", "The cockpit"], correct: 1 },
    ],
    conversationExercises: [
      { question: "You need a blanket on the plane. Best request?", options: ["Blanket!", "Excuse me, could I have a blanket, please?", "I'm cold, fix it.", "Give me warmth."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Passengers ___ requested to return to their seats.'", options: ["is", "are", "was", "being"], correct: 1 },
    ],
    examQuestions: [
      { question: "During turbulence, you should:", options: ["Walk around", "Fasten your seatbelt", "Open the window", "Stand up"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Write 3 in-flight announcements. What tone should they use?", options: ["Casual and funny", "Clear, calm, and professional", "Loud and urgent always", "Informal slang"], correct: 1 },
    ],
  },
  "aviation-3": {
    levelId: "aviation", levelLabel: "English for Aviation", lessonNumber: 3,
    title: "Pilot & ATC Communication Basics",
    description: "Introduction to pilot-ATC radiotelephony and standard phraseology.",
    vocabulary: [
      { word: "Roger", meaning: "I have received and understood", example: "Roger, turning right heading 270.", emoji: "📻", arabic: "مفهوم" },
      { word: "Wilco", meaning: "Will comply (I'll do it)", example: "Wilco, descending to flight level 200.", emoji: "✅", arabic: "سيتم التنفيذ" },
      { word: "Mayday", meaning: "Distress call for life-threatening emergency", example: "Mayday, mayday, mayday — engine failure.", emoji: "🚨", arabic: "نداء استغاثة" },
      { word: "Runway", meaning: "The strip where planes take off/land", example: "Cleared for takeoff, runway 27 left.", emoji: "🛤️", arabic: "مدرج" },
      { word: "Taxiway", meaning: "A path for planes to move on the ground", example: "Taxi via taxiway Alpha to runway 09.", emoji: "🛬", arabic: "ممر أرضي" },
      { word: "Clearance", meaning: "Permission to do something", example: "You are cleared for approach.", emoji: "🟢", arabic: "تصريح" },
      { word: "Altitude", meaning: "Height above sea level", example: "Maintain altitude 5,000 feet.", emoji: "📏", arabic: "ارتفاع" },
      { word: "Heading", meaning: "The direction a plane is pointing", example: "Turn left heading 180.", emoji: "🧭", arabic: "اتجاه" },
      { word: "Squawk", meaning: "A transponder code for identification", example: "Squawk 7700 for emergency.", emoji: "📡", arabic: "رمز الرادار" },
      { word: "Affirmative", meaning: "Yes (in aviation communication)", example: "Affirmative, we have the runway in sight.", emoji: "👍", arabic: "نعم (إيجابي)" },
    ],
    dialogue: [
      { speaker: "Pilot", text: "Cairo Tower, EgyptAir 801, ready for departure, runway 05 right." },
      { speaker: "ATC", text: "EgyptAir 801, Cairo Tower. Wind 060 at 12 knots. Cleared for takeoff, runway 05 right." },
      { speaker: "Pilot", text: "Cleared for takeoff, runway 05 right, EgyptAir 801." },
      { speaker: "ATC", text: "EgyptAir 801, contact departure on 121.5." },
      { speaker: "Pilot", text: "121.5, EgyptAir 801. Good day." },
      { speaker: "ATC", text: "Good day, EgyptAir 801." },
    ],
    grammar: {
      title: "Standard Aviation Phraseology Patterns",
      explanation: "Aviation English uses specific patterns: callsign + instruction, readback of instructions, and confirmation. Numbers are spoken individually: '180' = 'one eight zero'.",
      examples: [
        { sentence: "EgyptAir 801, descend to flight level 250.", note: "Callsign + instruction" },
        { sentence: "Descending to flight level 250, EgyptAir 801.", note: "Readback with callsign at end" },
        { sentence: "Negative, unable. Request alternative routing.", note: "Refusal with explanation" },
      ],
    },
    vocabExercises: [
      { question: "'Roger' means:", options: ["I disagree", "I have received and understood", "Please repeat", "Emergency"], correct: 1 },
      { question: "'Squawk 7700' indicates:", options: ["Normal flight", "An emergency", "Radio failure", "Hijacking"], correct: 1 },
      { question: "'Wilco' means:", options: ["I don't understand", "I will comply", "Repeat please", "Negative"], correct: 1 },
    ],
    conversationExercises: [
      { question: "ATC says 'Turn right heading 090.' Correct readback?", options: ["OK.", "Right turn 090, callsign.", "Turning right heading 090, EgyptAir 801.", "Sure."], correct: 2 },
    ],
    grammarExercises: [
      { question: "In aviation, '180' is spoken as:", options: ["One hundred eighty", "One eight zero", "Eighteen-oh", "Hundred eighty"], correct: 1 },
    ],
    examQuestions: [
      { question: "'Mayday' is used for:", options: ["Routine communication", "Life-threatening emergencies", "Weather reports", "Greetings"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Why is standard phraseology important in aviation?", options: ["It sounds cool", "It ensures clear, unambiguous communication for safety", "It's just tradition", "It's not important"], correct: 1 },
    ],
  },
  "aviation-4": {
    levelId: "aviation", levelLabel: "English for Aviation", lessonNumber: 4,
    title: "Weather Reports & Briefings",
    description: "Understand aviation weather reports (METARs) and weather-related vocabulary.",
    vocabulary: [
      { word: "Visibility", meaning: "How far you can see clearly", example: "Visibility is 10 kilometres.", emoji: "👁️", arabic: "الرؤية" },
      { word: "Ceiling", meaning: "The lowest cloud layer", example: "The ceiling is at 3,000 feet.", emoji: "☁️", arabic: "سقف السحب" },
      { word: "Crosswind", meaning: "Wind blowing across the runway", example: "There's a strong crosswind from the east.", emoji: "💨", arabic: "رياح عرضية" },
      { word: "Thunderstorm", meaning: "A storm with lightning and heavy rain", example: "Avoid the thunderstorm area.", emoji: "⛈️", arabic: "عاصفة رعدية" },
      { word: "Fog", meaning: "Thick cloud at ground level", example: "Dense fog is reducing visibility to 200 metres.", emoji: "🌫️", arabic: "ضباب" },
      { word: "Precipitation", meaning: "Rain, snow, or hail", example: "Light precipitation is expected.", emoji: "🌧️", arabic: "هطول" },
      { word: "Tailwind", meaning: "Wind blowing from behind", example: "A tailwind will shorten our flight time.", emoji: "➡️", arabic: "رياح خلفية" },
      { word: "Headwind", meaning: "Wind blowing from the front", example: "Strong headwinds may cause delays.", emoji: "⬅️", arabic: "رياح أمامية" },
      { word: "METAR", meaning: "A coded weather observation report", example: "Check the METAR before departure.", emoji: "📋", arabic: "تقرير الطقس" },
      { word: "Icing", meaning: "Ice forming on the aircraft", example: "Icing conditions above 10,000 feet.", emoji: "🧊", arabic: "تجمد" },
    ],
    dialogue: [
      { speaker: "Dispatcher", text: "Captain, here's the weather briefing for your route to London." },
      { speaker: "Captain", text: "What's the visibility at Heathrow?" },
      { speaker: "Dispatcher", text: "Currently 8 km, but fog is forecast for your arrival time." },
      { speaker: "Captain", text: "What about winds?" },
      { speaker: "Dispatcher", text: "Headwind of 40 knots at cruising altitude. Crosswind 15 knots at Heathrow." },
      { speaker: "Captain", text: "Any thunderstorm activity on our route?" },
      { speaker: "Dispatcher", text: "There's a line of thunderstorms over France. I'd recommend routing south to avoid them." },
    ],
    grammar: {
      title: "Present & Future for Weather Conditions",
      explanation: "Use present simple for current conditions ('Visibility is 5km'), present continuous for changing conditions ('Fog is clearing'), and future for forecasts ('Rain will arrive by noon').",
      examples: [
        { sentence: "Visibility is currently 3 kilometres.", note: "Present simple for current state" },
        { sentence: "The fog is gradually clearing.", note: "Present continuous for change" },
        { sentence: "Thunderstorms will develop by afternoon.", note: "Future for forecast" },
      ],
    },
    vocabExercises: [
      { question: "A 'headwind' blows:", options: ["From behind", "From the side", "From the front", "From below"], correct: 2 },
      { question: "'Ceiling' in aviation refers to:", options: ["The roof of the plane", "The lowest cloud layer", "Maximum altitude", "The floor"], correct: 1 },
    ],
    conversationExercises: [
      { question: "ATC reports 'visibility below minimums.' What does this mean?", options: ["Great weather", "You can't see well enough to land safely", "Clear skies", "Windy conditions"], correct: 1 },
    ],
    grammarExercises: [
      { question: "'Thunderstorms ___ expected later this evening.'", options: ["is", "are", "be", "been"], correct: 1 },
    ],
    examQuestions: [
      { question: "A 'METAR' is:", options: ["A type of aircraft", "A coded weather observation report", "A runway name", "A radio frequency"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Why is weather important in aviation?", options: ["It's not", "It affects safety, visibility, and flight planning", "Only for comfort", "For fuel savings only"], correct: 1 },
    ],
  },
  "aviation-5": {
    levelId: "aviation", levelLabel: "English for Aviation", lessonNumber: 5,
    title: "Safety & Emergency Procedures",
    description: "Learn emergency vocabulary and standard safety communication.",
    vocabulary: [
      { word: "Evacuate", meaning: "To leave a place quickly in an emergency", example: "Evacuate the aircraft immediately!", emoji: "🏃", arabic: "إخلاء" },
      { word: "Life vest", meaning: "An inflatable safety device for water", example: "Your life vest is under your seat.", emoji: "🦺", arabic: "سترة نجاة" },
      { word: "Oxygen mask", meaning: "A mask providing air in an emergency", example: "Oxygen masks will drop automatically.", emoji: "😷", arabic: "قناع أكسجين" },
      { word: "Brace", meaning: "To prepare for impact", example: "Brace! Brace! Head down, stay down!", emoji: "🙇", arabic: "استعد للارتطام" },
      { word: "Extinguisher", meaning: "A device to put out fires", example: "Use the fire extinguisher if needed.", emoji: "🧯", arabic: "طفاية حريق" },
      { word: "First aid", meaning: "Emergency medical treatment", example: "The first aid kit is in the overhead bin.", emoji: "🩹", arabic: "إسعافات أولية" },
      { word: "Decompression", meaning: "Loss of cabin pressure", example: "In case of decompression, put on your mask first.", emoji: "💨", arabic: "فقدان الضغط" },
      { word: "Ditching", meaning: "Emergency landing on water", example: "Prepare for ditching procedures.", emoji: "🌊", arabic: "هبوط اضطراري على الماء" },
      { word: "PAN PAN", meaning: "Urgency call (not life-threatening)", example: "PAN PAN, PAN PAN — we have a medical emergency on board.", emoji: "🟡", arabic: "نداء طوارئ عاجل" },
      { word: "Fireproof", meaning: "Resistant to fire", example: "The cockpit door is fireproof.", emoji: "🔥", arabic: "مقاوم للحريق" },
    ],
    dialogue: [
      { speaker: "Senior FA", text: "Attention crew: we have a medical emergency. Passenger in row 22 is unresponsive." },
      { speaker: "FA", text: "I'll get the first aid kit and AED. Should I make an announcement for a doctor?" },
      { speaker: "Senior FA", text: "Yes. 'Is there a medical professional on board? Please press your call button.'" },
      { speaker: "Doctor", text: "I'm a doctor. What happened?" },
      { speaker: "Senior FA", text: "The passenger collapsed about 2 minutes ago. He's breathing but unconscious." },
      { speaker: "Doctor", text: "Let's lay him flat and check his vitals. Has the captain been informed?" },
      { speaker: "Senior FA", text: "Yes, we're assessing whether to divert to the nearest airport." },
    ],
    grammar: {
      title: "Imperatives for Emergency Commands",
      explanation: "In emergencies, use short, clear imperatives: 'Evacuate!', 'Brace!', 'Stay calm!'. These are direct commands without politeness markers because speed saves lives.",
      examples: [
        { sentence: "Brace! Brace! Head down, stay down!", note: "Repeated imperative for urgency" },
        { sentence: "Leave everything and proceed to the nearest exit.", note: "Two imperatives in sequence" },
        { sentence: "Do NOT inflate your life vest inside the aircraft.", note: "Strong negative imperative" },
      ],
    },
    vocabExercises: [
      { question: "'PAN PAN' is used for:", options: ["Life-threatening emergencies", "Urgent but not life-threatening situations", "Routine communication", "Greetings"], correct: 1 },
      { question: "'Decompression' means:", options: ["Gaining pressure", "Loss of cabin pressure", "Turbulence", "Engine failure"], correct: 1 },
    ],
    conversationExercises: [
      { question: "The captain orders evacuation. First instruction to passengers?", options: ["Please wait.", "Leave all belongings and proceed to the nearest exit immediately!", "Relax.", "Find your bags first."], correct: 1 },
    ],
    grammarExercises: [
      { question: "'___ your seatbelt and remain seated!'", options: ["Fasten", "Fastening", "Fastened", "To fasten"], correct: 0 },
    ],
    examQuestions: [
      { question: "In case of decompression, you should first:", options: ["Help others", "Put on your own oxygen mask", "Call the crew", "Look out the window"], correct: 1 },
    ],
    homeworkQuestions: [
      { question: "Why are safety demonstrations important?", options: ["They're boring", "They prepare passengers for emergencies and save lives", "Just for show", "Legal requirement only"], correct: 1 },
    ],
  },
};
