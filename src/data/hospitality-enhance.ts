import { hospitalityLessons } from "./hospitality-lessons";

const extraVocab: Record<number, { word: string; meaning: string; example: string; emoji: string; arabic: string }[]> = {
  1: [
    { word: "Foyer", meaning: "Entrance hall of a hotel", example: "Wait in the foyer please.", emoji: "🏛️", arabic: "بهو" },
    { word: "Bellhop", meaning: "Hotel staff carrying luggage", example: "The bellhop took our bags.", emoji: "🧳", arabic: "حامل أمتعة" },
    { word: "Key card", meaning: "Electronic room key", example: "Your key card is for room 205.", emoji: "🔑", arabic: "بطاقة مفتاح" },
    { word: "Vacancy", meaning: "An available room", example: "Do you have any vacancies tonight?", emoji: "🛏️", arabic: "غرفة شاغرة" },
    { word: "Front desk", meaning: "The reception area", example: "Please collect your key at the front desk.", emoji: "🛎️", arabic: "مكتب الاستقبال" },
  ],
  2: [
    { word: "Single room", meaning: "Room for one person", example: "A single room costs $80 per night.", emoji: "🛏️", arabic: "غرفة فردية" },
    { word: "Double room", meaning: "Room with a double bed", example: "We'd like a double room please.", emoji: "🛌", arabic: "غرفة مزدوجة" },
    { word: "Mini-bar", meaning: "Small fridge with drinks in room", example: "The mini-bar has juice and water.", emoji: "🍹", arabic: "ثلاجة صغيرة" },
    { word: "Room service", meaning: "Food delivered to your room", example: "Let's order room service tonight.", emoji: "🍽️", arabic: "خدمة الغرف" },
    { word: "Balcony", meaning: "Outdoor area attached to a room", example: "The room has a sea-view balcony.", emoji: "🌅", arabic: "شرفة" },
  ],
  3: [
    { word: "Appetizer", meaning: "A small dish before the main course", example: "Would you like an appetizer?", emoji: "🥗", arabic: "مقبلات" },
    { word: "Entrée", meaning: "The main course", example: "For my entrée, I'll have the fish.", emoji: "🍽️", arabic: "طبق رئيسي" },
    { word: "Tip", meaning: "Extra money for good service", example: "We left a generous tip.", emoji: "💰", arabic: "بقشيش" },
    { word: "Waiter", meaning: "Person serving food", example: "The waiter was very attentive.", emoji: "🧑‍🍳", arabic: "نادل" },
    { word: "Bill", meaning: "The total charges for a meal", example: "Can we have the bill, please?", emoji: "🧾", arabic: "فاتورة" },
  ],
  4: [
    { word: "Inconvenience", meaning: "Trouble or difficulty caused", example: "We apologize for the inconvenience.", emoji: "😔", arabic: "إزعاج" },
    { word: "Compensation", meaning: "Something given to make up for a problem", example: "We'll offer a discount as compensation.", emoji: "🎁", arabic: "تعويض" },
    { word: "Escalate", meaning: "To refer to a higher authority", example: "I'll escalate this to my manager.", emoji: "📤", arabic: "تصعيد" },
    { word: "Feedback", meaning: "Comments about quality of service", example: "We value your feedback.", emoji: "📝", arabic: "ملاحظات" },
    { word: "Refund", meaning: "Money returned to a customer", example: "You'll receive a full refund.", emoji: "💸", arabic: "استرداد" },
  ],
  5: [
    { word: "Lobby", meaning: "The main area of a hotel", example: "Meet me in the lobby at 9 AM.", emoji: "🏨", arabic: "ردهة" },
    { word: "Landmark", meaning: "A recognizable place", example: "The Eiffel Tower is a famous landmark.", emoji: "🗼", arabic: "معلم" },
    { word: "Intersection", meaning: "Where two roads cross", example: "Turn left at the intersection.", emoji: "🔀", arabic: "تقاطع" },
    { word: "Shuttle", meaning: "A bus between locations", example: "The hotel shuttle goes to the airport.", emoji: "🚌", arabic: "حافلة نقل" },
    { word: "Valet", meaning: "A person who parks your car", example: "The valet parked our car.", emoji: "🚗", arabic: "خادم سيارات" },
  ],
  6: [
    { word: "Cuisine", meaning: "A style of cooking", example: "We specialize in Italian cuisine.", emoji: "🍝", arabic: "مطبخ" },
    { word: "Dietary", meaning: "Related to food requirements", example: "Do you have any dietary restrictions?", emoji: "🥦", arabic: "غذائي" },
    { word: "Reservation", meaning: "A table booking", example: "I have a reservation for two.", emoji: "📋", arabic: "حجز" },
    { word: "Sommelier", meaning: "Wine expert in a restaurant", example: "The sommelier suggested a red wine.", emoji: "🍷", arabic: "خبير نبيذ" },
    { word: "Buffet", meaning: "Self-service meal display", example: "Breakfast is served as a buffet.", emoji: "🍳", arabic: "بوفيه" },
  ],
  7: [
    { word: "Confirmation", meaning: "Verification of a booking", example: "I'll send a confirmation email.", emoji: "✅", arabic: "تأكيد" },
    { word: "Availability", meaning: "Whether something is free", example: "Let me check availability.", emoji: "📅", arabic: "توفر" },
    { word: "Extension", meaning: "Extra time on a booking", example: "Can I get an extension on my stay?", emoji: "⏰", arabic: "تمديد" },
    { word: "Cancellation", meaning: "Calling off a booking", example: "The cancellation policy is 24 hours.", emoji: "❌", arabic: "إلغاء" },
    { word: "Upgrade", meaning: "Moving to a better option", example: "We've upgraded you to a suite.", emoji: "⬆️", arabic: "ترقية" },
  ],
  8: [
    { word: "Linen", meaning: "Bed sheets and towels", example: "Fresh linen is provided daily.", emoji: "🛏️", arabic: "بياضات" },
    { word: "Turndown service", meaning: "Preparing room for sleeping", example: "Turndown service is at 8 PM.", emoji: "🌙", arabic: "خدمة تجهيز الغرفة" },
    { word: "Do Not Disturb", meaning: "Sign asking not to enter", example: "Please hang the Do Not Disturb sign.", emoji: "🚫", arabic: "عدم الإزعاج" },
    { word: "Toiletries", meaning: "Personal care products", example: "Toiletries are in the bathroom.", emoji: "🧴", arabic: "أدوات عناية شخصية" },
    { word: "Laundry", meaning: "Clothes washing service", example: "The laundry service is same-day.", emoji: "👔", arabic: "غسيل" },
  ],
  9: [
    { word: "Banquet", meaning: "A formal large meal/event", example: "The banquet hall seats 500.", emoji: "🎉", arabic: "مأدبة" },
    { word: "Conference", meaning: "A formal meeting event", example: "The conference room is booked.", emoji: "💼", arabic: "مؤتمر" },
    { word: "Catering", meaning: "Providing food for events", example: "We handle all the catering.", emoji: "🍽️", arabic: "تقديم الطعام" },
    { word: "Audio-visual", meaning: "Sound and display equipment", example: "Check the audio-visual setup.", emoji: "🎙️", arabic: "سمعي بصري" },
    { word: "Venue", meaning: "Location for an event", example: "This venue is perfect for weddings.", emoji: "🏰", arabic: "مكان" },
  ],
  10: [
    { word: "Invoice", meaning: "A detailed bill", example: "I'll email you the invoice.", emoji: "🧾", arabic: "فاتورة" },
    { word: "Gratuity", meaning: "A tip or service charge", example: "A 15% gratuity is included.", emoji: "💵", arabic: "إكرامية" },
    { word: "Receipt", meaning: "Proof of payment", example: "Here's your receipt.", emoji: "🧾", arabic: "إيصال" },
    { word: "Checkout time", meaning: "When guests must leave", example: "Checkout time is 11 AM.", emoji: "⏰", arabic: "وقت المغادرة" },
    { word: "Express checkout", meaning: "Fast departure process", example: "Use express checkout to save time.", emoji: "⚡", arabic: "مغادرة سريعة" },
  ],
};

const extraDialogues: Record<number, { speaker: string; text: string }[]> = {
  1: [
    { speaker: "Receptionist", text: "Do you have a reservation?" },
    { speaker: "Guest", text: "Yes, under the name Johnson." },
    { speaker: "Receptionist", text: "I see it here. Room 305, king-size bed." },
    { speaker: "Guest", text: "Is breakfast included?" },
    { speaker: "Receptionist", text: "Yes, breakfast is served from 7 to 10 AM in the restaurant." },
  ],
  2: [
    { speaker: "Guest", text: "What's the difference between standard and deluxe?" },
    { speaker: "Receptionist", text: "The deluxe has a balcony and a larger bathroom." },
    { speaker: "Guest", text: "Does the room have a mini-bar?" },
    { speaker: "Receptionist", text: "Yes, it's stocked with snacks and beverages." },
    { speaker: "Guest", text: "Can I request extra pillows?" },
  ],
  3: [
    { speaker: "Waiter", text: "Good evening! Here are your menus." },
    { speaker: "Guest", text: "What do you recommend as an appetizer?" },
    { speaker: "Waiter", text: "Our Caesar salad is very popular." },
    { speaker: "Guest", text: "I'll have that. And the grilled salmon for my entrée." },
    { speaker: "Waiter", text: "Excellent choice. Would you like anything to drink?" },
  ],
  4: [
    { speaker: "Guest", text: "The air conditioning in my room isn't working." },
    { speaker: "Manager", text: "I sincerely apologize for the inconvenience." },
    { speaker: "Guest", text: "This is unacceptable. It's very hot." },
    { speaker: "Manager", text: "I'll move you to another room immediately and offer a complimentary dinner." },
    { speaker: "Guest", text: "That would be helpful, thank you." },
  ],
  5: [
    { speaker: "Guest", text: "How do I get to the nearest museum?" },
    { speaker: "Concierge", text: "It's a 10-minute walk. Go straight, then turn right at the intersection." },
    { speaker: "Guest", text: "Is there a shuttle to the airport?" },
    { speaker: "Concierge", text: "Yes, the shuttle departs every hour from the lobby." },
    { speaker: "Guest", text: "Can the valet bring my car?" },
  ],
  6: [
    { speaker: "Guest", text: "I'd like to make a dinner reservation for four." },
    { speaker: "Host", text: "Certainly. Would 7:30 PM work?" },
    { speaker: "Guest", text: "Perfect. One person is vegetarian." },
    { speaker: "Host", text: "No problem. Our chef prepares excellent vegetarian cuisine." },
    { speaker: "Guest", text: "Do you have a sommelier?" },
  ],
  7: [
    { speaker: "Guest", text: "I'd like to book a room for Friday night." },
    { speaker: "Receptionist", text: "Let me check availability... Yes, we have rooms." },
    { speaker: "Guest", text: "What's the cancellation policy?" },
    { speaker: "Receptionist", text: "Free cancellation up to 24 hours before check-in." },
    { speaker: "Guest", text: "Can I extend my stay if needed?" },
  ],
  8: [
    { speaker: "Guest", text: "Could I get extra towels please?" },
    { speaker: "Housekeeping", text: "Of course! I'll bring them right away." },
    { speaker: "Guest", text: "When is turndown service?" },
    { speaker: "Housekeeping", text: "Between 7 and 9 PM. Shall I schedule it?" },
    { speaker: "Guest", text: "Yes, and please don't disturb before 10 AM." },
  ],
  9: [
    { speaker: "Organizer", text: "We need the banquet hall for 200 guests." },
    { speaker: "Event Manager", text: "Our Grand Ballroom can accommodate that." },
    { speaker: "Organizer", text: "Do you provide catering?" },
    { speaker: "Event Manager", text: "Yes, we offer full catering with custom menus." },
    { speaker: "Organizer", text: "What about audio-visual equipment?" },
  ],
  10: [
    { speaker: "Guest", text: "I'd like to check out please." },
    { speaker: "Receptionist", text: "Of course. Your total is $450 for three nights." },
    { speaker: "Guest", text: "Is gratuity included?" },
    { speaker: "Receptionist", text: "Yes, a 10% service charge is included." },
    { speaker: "Guest", text: "Can I get an itemized receipt?" },
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
      { question: "A 'bellhop' carries:", options: ["Food", "Luggage", "Keys", "Mail"], correct: 1 },
      { question: "A 'key card' opens:", options: ["The car", "The hotel room", "The safe", "The pool"], correct: 1 },
      { question: "'Vacancy' means:", options: ["No rooms", "An available room", "A complaint", "A booking"], correct: 1 },
    ],
    conv: [
      { question: "Where is the key collected?", options: ["Restaurant", "Front desk", "Room", "Pool"], correct: 1 },
      { question: "Breakfast is served from:", options: ["6-9 AM", "7-10 AM", "8-11 AM", "9-12 PM"], correct: 1 },
    ],
    grammar: [
      { question: "'___ you like a room with a view?'", options: ["Do", "Would", "Are", "Is"], correct: 1 },
      { question: "'Your key card ___ for room 205.'", options: ["are", "is", "were", "am"], correct: 1 },
    ],
    exam: [
      { question: "A 'foyer' is:", options: ["A bedroom", "An entrance hall", "A restaurant", "A pool"], correct: 1 },
      { question: "The 'front desk' is:", options: ["The gym", "The reception area", "The restaurant", "The room"], correct: 1 },
    ],
    homework: [
      { question: "'Do you have any ___?'", options: ["Food", "Vacancies", "Cars", "Keys"], correct: 1 },
      { question: "'The ___ took our bags to the room.'", options: ["Chef", "Bellhop", "Manager", "Guest"], correct: 1 },
    ],
  },
  2: {
    vocab: [
      { question: "A 'mini-bar' contains:", options: ["Books", "Drinks and snacks", "Towels", "Keys"], correct: 1 },
      { question: "A 'balcony' is:", options: ["Indoor area", "Outdoor area attached to room", "Parking lot", "Lobby"], correct: 1 },
      { question: "'Room service' delivers:", options: ["Mail", "Food to your room", "Towels", "Luggage"], correct: 1 },
    ],
    conv: [
      { question: "The deluxe room has:", options: ["No window", "A balcony", "No bathroom", "Two beds"], correct: 1 },
      { question: "The guest asked for extra:", options: ["Food", "Pillows", "Keys", "Money"], correct: 1 },
    ],
    grammar: [
      { question: "'___ the room have a mini-bar?'", options: ["Do", "Does", "Is", "Are"], correct: 1 },
      { question: "'Can I ___ extra pillows?'", options: ["requesting", "request", "requested", "requests"], correct: 1 },
    ],
    exam: [
      { question: "A 'single room' is for:", options: ["Two people", "One person", "A family", "A group"], correct: 1 },
      { question: "A 'double room' has:", options: ["No bed", "A double bed", "Two bathrooms", "A kitchen"], correct: 1 },
    ],
    homework: [
      { question: "'The room has a sea-view ___.'", options: ["Kitchen", "Balcony", "Garage", "Office"], correct: 1 },
      { question: "'Let's order ___ tonight.'", options: ["A taxi", "Room service", "A flight", "Tickets"], correct: 1 },
    ],
  },
  3: {
    vocab: [
      { question: "An 'appetizer' comes:", options: ["After dessert", "Before the main course", "With the bill", "At checkout"], correct: 1 },
      { question: "A 'tip' is:", options: ["Advice", "Extra money for service", "A complaint", "A menu item"], correct: 1 },
      { question: "The 'bill' shows:", options: ["The menu", "Total charges", "Room number", "The address"], correct: 1 },
    ],
    conv: [
      { question: "The waiter recommended:", options: ["Fish", "Caesar salad", "Pasta", "Soup"], correct: 1 },
      { question: "For the entrée, the guest ordered:", options: ["Salad", "Grilled salmon", "Soup", "Bread"], correct: 1 },
    ],
    grammar: [
      { question: "'___ you like anything to drink?'", options: ["Do", "Would", "Are", "Is"], correct: 1 },
      { question: "'I ___ have the grilled salmon.'", options: ["'d", "'m", "'ve", "'re"], correct: 0 },
    ],
    exam: [
      { question: "An 'entrée' is:", options: ["A dessert", "The main course", "A drink", "A snack"], correct: 1 },
      { question: "A 'waiter' does:", options: ["Cooking", "Serving food", "Cleaning", "Managing"], correct: 1 },
    ],
    homework: [
      { question: "'Can we have the ___, please?'", options: ["Menu", "Bill", "Key", "Towel"], correct: 1 },
      { question: "'We left a generous ___.'", options: ["Complaint", "Tip", "Review", "Note"], correct: 1 },
    ],
  },
  4: {
    vocab: [
      { question: "'Compensation' is given for:", options: ["Good behavior", "A problem", "Checking in", "Ordering food"], correct: 1 },
      { question: "To 'escalate' means:", options: ["Ignore", "Refer to higher authority", "Solve alone", "Leave"], correct: 1 },
      { question: "A 'refund' returns:", options: ["The room key", "Money to the customer", "The menu", "Luggage"], correct: 1 },
    ],
    conv: [
      { question: "The guest's problem was:", options: ["No towels", "Broken AC", "Cold food", "Noisy room"], correct: 1 },
      { question: "The manager offered:", options: ["Nothing", "A complimentary dinner", "A discount code", "An apology only"], correct: 1 },
    ],
    grammar: [
      { question: "'I ___ apologize for the inconvenience.'", options: ["sincere", "sincerely", "sinceres", "sincerest"], correct: 1 },
      { question: "'I ___ move you to another room.'", options: ["'d", "'ll", "'m", "'ve"], correct: 1 },
    ],
    exam: [
      { question: "'Inconvenience' means:", options: ["Comfort", "Trouble caused", "Luxury", "Service"], correct: 1 },
      { question: "'Feedback' is:", options: ["A complaint only", "Comments about service quality", "A tip", "A refund"], correct: 1 },
    ],
    homework: [
      { question: "'We apologize for the ___.'", options: ["Upgrade", "Inconvenience", "Reservation", "Payment"], correct: 1 },
      { question: "'You'll receive a full ___.'", options: ["Meal", "Refund", "Upgrade", "Key"], correct: 1 },
    ],
  },
  5: {
    vocab: [
      { question: "A 'landmark' is:", options: ["A hotel room", "A recognizable place", "A menu item", "A key card"], correct: 1 },
      { question: "A 'shuttle' is:", options: ["A boat", "A bus between locations", "A car", "A plane"], correct: 1 },
      { question: "A 'valet' parks:", options: ["Bikes", "Cars", "Boats", "Planes"], correct: 1 },
    ],
    conv: [
      { question: "The museum is a:", options: ["30-minute drive", "10-minute walk", "1-hour flight", "5-minute drive"], correct: 1 },
      { question: "The shuttle departs from:", options: ["The room", "The lobby", "The restaurant", "The pool"], correct: 1 },
    ],
    grammar: [
      { question: "'Go straight, ___ turn right.'", options: ["than", "then", "that", "this"], correct: 1 },
      { question: "'How ___ I get to the museum?'", options: ["am", "is", "do", "does"], correct: 2 },
    ],
    exam: [
      { question: "The 'lobby' is:", options: ["A bedroom", "The main hotel area", "A parking lot", "A gym"], correct: 1 },
      { question: "An 'intersection' is where:", options: ["Hotels are", "Two roads cross", "Guests eat", "Cars park"], correct: 1 },
    ],
    homework: [
      { question: "'The hotel ___ goes to the airport.'", options: ["Taxi", "Shuttle", "Bike", "Train"], correct: 1 },
      { question: "'The Eiffel Tower is a famous ___.'", options: ["Hotel", "Landmark", "Restaurant", "Museum"], correct: 1 },
    ],
  },
  6: {
    vocab: [
      { question: "A 'sommelier' is an expert in:", options: ["Coffee", "Wine", "Tea", "Juice"], correct: 1 },
      { question: "A 'buffet' is:", options: ["Table service", "Self-service meal display", "Room service", "A menu"], correct: 1 },
      { question: "'Dietary restrictions' relate to:", options: ["Exercise", "Food requirements", "Sleep", "Travel"], correct: 1 },
    ],
    conv: [
      { question: "One person is:", options: ["Vegan", "Vegetarian", "Allergic", "Fasting"], correct: 1 },
      { question: "The reservation is for:", options: ["Two", "Three", "Four", "Five"], correct: 2 },
    ],
    grammar: [
      { question: "'I'd like to ___ a dinner reservation.'", options: ["making", "make", "made", "makes"], correct: 1 },
      { question: "'___ 7:30 PM work for you?'", options: ["Do", "Would", "Are", "Is"], correct: 1 },
    ],
    exam: [
      { question: "'Cuisine' is:", options: ["A dish", "A style of cooking", "A recipe", "An ingredient"], correct: 1 },
      { question: "A 'reservation' is:", options: ["A complaint", "A booking", "A refund", "A tip"], correct: 1 },
    ],
    homework: [
      { question: "'Breakfast is served as a ___.'", options: ["Menu", "Buffet", "Course", "Snack"], correct: 1 },
      { question: "'Do you have any ___ restrictions?'", options: ["Financial", "Dietary", "Travel", "Work"], correct: 1 },
    ],
  },
  7: {
    vocab: [
      { question: "A 'confirmation' verifies:", options: ["A complaint", "A booking", "A meal", "A tip"], correct: 1 },
      { question: "'Cancellation' means:", options: ["Booking", "Calling off a booking", "Upgrading", "Extending"], correct: 1 },
      { question: "An 'upgrade' is:", options: ["A downgrade", "Moving to a better option", "A complaint", "A refund"], correct: 1 },
    ],
    conv: [
      { question: "Free cancellation is up to:", options: ["12 hours", "24 hours", "48 hours", "1 week"], correct: 1 },
      { question: "The guest asks about:", options: ["Food", "Extending the stay", "Complaints", "Parking"], correct: 1 },
    ],
    grammar: [
      { question: "'Let me ___ availability.'", options: ["checking", "check", "checked", "checks"], correct: 1 },
      { question: "'I ___ send a confirmation email.'", options: ["'d", "'ll", "'m", "'ve"], correct: 1 },
    ],
    exam: [
      { question: "'Availability' means:", options: ["Cost", "Whether something is free", "Quality", "Size"], correct: 1 },
      { question: "An 'extension' gives:", options: ["Less time", "Extra time", "A refund", "A discount"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ policy is 24 hours.'", options: ["Upgrade", "Cancellation", "Extension", "Booking"], correct: 1 },
      { question: "'We've ___ you to a suite.'", options: ["Downgraded", "Upgraded", "Moved", "Cancelled"], correct: 1 },
    ],
  },
  8: {
    vocab: [
      { question: "'Turndown service' prepares the room for:", options: ["Breakfast", "Sleeping", "Checkout", "Cleaning"], correct: 1 },
      { question: "'Toiletries' are:", options: ["Towels", "Personal care products", "Furniture", "Food"], correct: 1 },
      { question: "'Laundry' service washes:", options: ["Dishes", "Clothes", "Cars", "Windows"], correct: 1 },
    ],
    conv: [
      { question: "Turndown service is between:", options: ["5-7 PM", "7-9 PM", "9-11 PM", "11 PM-1 AM"], correct: 1 },
      { question: "The guest wants no disturbance before:", options: ["8 AM", "9 AM", "10 AM", "11 AM"], correct: 2 },
    ],
    grammar: [
      { question: "'___ I get extra towels?'", options: ["May", "Could", "Can", "All of the above"], correct: 3 },
      { question: "'Fresh linen ___ provided daily.'", options: ["are", "is", "were", "am"], correct: 1 },
    ],
    exam: [
      { question: "'Linen' includes:", options: ["Food", "Bed sheets and towels", "Furniture", "Luggage"], correct: 1 },
      { question: "'Do Not Disturb' means:", options: ["Come in", "Don't enter", "Clean now", "Leave a tip"], correct: 1 },
    ],
    homework: [
      { question: "'___ are in the bathroom.'", options: ["Keys", "Toiletries", "Menus", "Luggage"], correct: 1 },
      { question: "'The laundry service is ___.'", options: ["Weekly", "Same-day", "Monthly", "Never"], correct: 1 },
    ],
  },
  9: {
    vocab: [
      { question: "A 'banquet' is:", options: ["A small meal", "A formal large event", "A snack", "A drink"], correct: 1 },
      { question: "'Catering' provides:", options: ["Music", "Food for events", "Decoration", "Parking"], correct: 1 },
      { question: "A 'venue' is:", options: ["A meal", "A location for an event", "A drink", "A service"], correct: 1 },
    ],
    conv: [
      { question: "The banquet hall seats:", options: ["100", "200", "300", "500"], correct: 1 },
      { question: "The organizer asks about:", options: ["Room keys", "Audio-visual equipment", "Towels", "Parking"], correct: 1 },
    ],
    grammar: [
      { question: "'Our ballroom ___ accommodate 200 guests.'", options: ["can", "may", "will", "shall"], correct: 0 },
      { question: "'Do you ___ catering?'", options: ["providing", "provide", "provided", "provides"], correct: 1 },
    ],
    exam: [
      { question: "A 'conference' is:", options: ["A party", "A formal meeting event", "A meal", "A game"], correct: 1 },
      { question: "'Audio-visual' includes:", options: ["Food", "Sound and display equipment", "Furniture", "Linen"], correct: 1 },
    ],
    homework: [
      { question: "'The ___ hall seats 500 people.'", options: ["Dining", "Banquet", "Lobby", "Conference"], correct: 1 },
      { question: "'This ___ is perfect for weddings.'", options: ["Menu", "Venue", "Dish", "Suite"], correct: 1 },
    ],
  },
  10: {
    vocab: [
      { question: "An 'invoice' is:", options: ["A key", "A detailed bill", "A menu", "A card"], correct: 1 },
      { question: "'Gratuity' is:", options: ["A complaint", "A tip or service charge", "A refund", "A discount"], correct: 1 },
      { question: "'Express checkout' is:", options: ["Slow departure", "Fast departure process", "Late checkout", "Early check-in"], correct: 1 },
    ],
    conv: [
      { question: "The total for three nights is:", options: ["$300", "$450", "$500", "$600"], correct: 1 },
      { question: "Gratuity included is:", options: ["5%", "10%", "15%", "20%"], correct: 1 },
    ],
    grammar: [
      { question: "'I'd like to ___ out please.'", options: ["checking", "check", "checked", "checks"], correct: 1 },
      { question: "'___ gratuity included?'", options: ["Are", "Is", "Were", "Am"], correct: 1 },
    ],
    exam: [
      { question: "A 'receipt' is:", options: ["A booking", "Proof of payment", "A complaint", "A menu"], correct: 1 },
      { question: "'Checkout time' is when guests:", options: ["Arrive", "Must leave", "Eat breakfast", "Book"], correct: 1 },
    ],
    homework: [
      { question: "'Here's your ___.'", options: ["Key", "Receipt", "Room", "Menu"], correct: 1 },
      { question: "'Use ___ checkout to save time.'", options: ["Late", "Express", "Early", "Slow"], correct: 1 },
    ],
  },
};

// Apply enhancements
for (let i = 1; i <= 10; i++) {
  const key = `hospitality-${i}`;
  const lesson = hospitalityLessons[key];
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
