import type { LessonData } from "./lessons";

const baseHosp = (n: number, title: string, desc: string): LessonData => ({
  levelId: "hospitality", levelLabel: "Hospitality English", lessonNumber: n, title, description: desc,
  vocabulary: [
    { word: "Reservation", meaning: "A booking for a room or table", example: "I'd like to make a reservation.", emoji: "📋", arabic: "حجز" },
    { word: "Guest", meaning: "A person staying at a hotel", example: "Welcome, dear guest!", emoji: "🧳", arabic: "ضيف" },
    { word: "Check-in", meaning: "Arriving and registering at hotel", example: "Check-in is at 3 PM.", emoji: "🏨", arabic: "تسجيل الوصول" },
    { word: "Check-out", meaning: "Leaving and paying at hotel", example: "Check-out is at 11 AM.", emoji: "🚪", arabic: "تسجيل المغادرة" },
    { word: "Concierge", meaning: "Hotel staff who assists guests", example: "Ask the concierge for recommendations.", emoji: "🛎️", arabic: "موظف الاستقبال" },
    { word: "Amenities", meaning: "Hotel facilities and services", example: "The hotel has great amenities.", emoji: "🏊", arabic: "وسائل الراحة" },
    { word: "Suite", meaning: "A set of connected hotel rooms", example: "We booked a luxury suite.", emoji: "🛏️", arabic: "جناح" },
    { word: "Housekeeping", meaning: "Staff who clean rooms", example: "Housekeeping cleans daily.", emoji: "🧹", arabic: "خدمة الغرف" },
    { word: "Complimentary", meaning: "Free of charge", example: "Breakfast is complimentary.", emoji: "🆓", arabic: "مجاني" },
    { word: "Hospitality", meaning: "Friendly treatment of guests", example: "The hospitality was excellent.", emoji: "❤️", arabic: "ضيافة" },
  ],
  dialogue: [
    { speaker: "Receptionist", text: `Welcome! How can I help you with ${title.toLowerCase()}?` },
    { speaker: "Guest", text: "I'd like some information please." },
    { speaker: "Receptionist", text: "Of course! Let me assist you." },
    { speaker: "Guest", text: "Thank you for your hospitality." },
    { speaker: "Receptionist", text: "It's our pleasure. Enjoy your stay!" },
  ],
  grammar: { title: "Polite Requests & Offers", explanation: "In hospitality, we use polite language: 'Would you like...?', 'Could I...?', 'May I help you?'", examples: [
    { sentence: "Would you like a room with a view?", note: "Polite offer" },
    { sentence: "Could I have your passport, please?", note: "Polite request" },
    { sentence: "May I help you with your luggage?", note: "Offering assistance" },
    { sentence: "I'd like to make a reservation.", note: "Polite wish" },
  ]},
  vocabExercises: [
    { question: "A 'reservation' is:", options: ["A complaint", "A booking", "A menu", "A tip"], correct: 1 },
    { question: "'Complimentary' means:", options: ["Expensive", "Free of charge", "Broken", "Late"], correct: 1 },
    { question: "A 'concierge' is:", options: ["A chef", "Hotel staff who assists guests", "A driver", "A cleaner"], correct: 1 },
    { question: "'Amenities' are:", options: ["Problems", "Facilities and services", "Complaints", "Bills"], correct: 1 },
    { question: "'Check-in' means:", options: ["Leaving the hotel", "Arriving and registering", "Paying the bill", "Making a complaint"], correct: 1 },
  ],
  conversationExercises: [
    { question: "The receptionist offers to:", options: ["Complain", "Assist the guest", "Leave", "Sleep"], correct: 1 },
    { question: "The guest says thank you for:", options: ["The food", "The hospitality", "The weather", "The traffic"], correct: 1 },
    { question: "The receptionist says 'Enjoy your ___.'", options: ["Food", "Trip", "Stay", "Flight"], correct: 2 },
  ],
  grammarExercises: [
    { question: "'___ you like a room with a view?'", options: ["Do", "Would", "Are", "Is"], correct: 1 },
    { question: "'___ I have your passport?'", options: ["Do", "Would", "Could", "Am"], correct: 2 },
    { question: "'___ I help you with your luggage?'", options: ["Do", "Would", "May", "Am"], correct: 2 },
    { question: "'I___ like to make a reservation.'", options: ["'d", "'m", "'ve", "'ll"], correct: 0 },
  ],
  examQuestions: [
    { question: "A 'suite' is:", options: ["One small room", "Connected luxury rooms", "The lobby", "The restaurant"], correct: 1 },
    { question: "'Housekeeping' does:", options: ["Cooking", "Cleaning rooms", "Driving guests", "Security"], correct: 1 },
    { question: "'Guest' means:", options: ["An employee", "A person staying at hotel", "A manager", "A chef"], correct: 1 },
    { question: "'Hospitality' means:", options: ["Rudeness", "Friendly treatment", "Strict rules", "High prices"], correct: 1 },
    { question: "'Check-out' is when you:", options: ["Arrive", "Leave and pay", "Make a reservation", "Order food"], correct: 1 },
  ],
  homeworkQuestions: [
    { question: "'___ you like breakfast in your room?'", options: ["Do", "Would", "Are", "Is"], correct: 1 },
    { question: "Breakfast that is free is called:", options: ["Premium", "Complimentary", "Expensive", "Optional"], correct: 1 },
    { question: "'The hotel has excellent ___.'", options: ["Problems", "Amenities", "Complaints", "Delays"], correct: 1 },
  ],
});

export const hospitalityLessons: Record<string, LessonData> = {};

[
  { n: 1, t: "Hotel Check-in", d: "Greet guests and handle arrivals." },
  { n: 2, t: "Room Types & Amenities", d: "Describe different rooms and facilities." },
  { n: 3, t: "Restaurant Service", d: "Taking orders and serving guests." },
  { n: 4, t: "Handling Complaints", d: "Dealing with guest complaints professionally." },
  { n: 5, t: "Giving Directions", d: "Help guests find locations in the hotel and city." },
  { n: 6, t: "Making Recommendations", d: "Suggest restaurants, activities, and sights." },
  { n: 7, t: "Phone Reservations", d: "Taking bookings over the phone." },
  { n: 8, t: "Housekeeping Communication", d: "Requesting and providing room service." },
  { n: 9, t: "Event Planning", d: "Organizing conferences and events." },
  { n: 10, t: "Check-out & Billing", d: "Processing payments and farewells." },
  { n: 11, t: "Tour Guide English", d: "Leading tours and describing attractions." },
  { n: 12, t: "Airport & Transfer", d: "Airport pickup and transportation vocabulary." },
  { n: 13, t: "Spa & Wellness", d: "Vocabulary for spa and wellness services." },
  { n: 14, t: "Food & Beverage", d: "Menu descriptions and dietary requirements." },
  { n: 15, t: "VIP Guest Service", d: "Special services for important guests." },
  { n: 16, t: "Safety & Emergencies", d: "Emergency procedures and safety vocabulary." },
  { n: 17, t: "Online Reviews", d: "Responding to guest reviews professionally." },
  { n: 18, t: "Cultural Sensitivity", d: "Serving guests from different cultures." },
  { n: 19, t: "Upselling Techniques", d: "Politely offering upgrades and extras." },
  { n: 20, t: "Career in Hospitality", d: "Discussing career paths in the industry." },
].forEach(({ n, t, d }) => { hospitalityLessons[`hospitality-${n}`] = baseHosp(n, t, d); });
