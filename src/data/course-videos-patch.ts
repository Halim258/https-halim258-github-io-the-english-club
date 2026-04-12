import type { LessonData } from "./lessons";

/**
 * YouTube video assignments for Music, Legal, and Hospitality courses.
 * Applied via Object.assign in lessons.ts after all lesson data is merged.
 */

type VideoPatch = { youtubeId: string; videoTitle: string; videoContext: string };

export const courseVideoPatches: Record<string, VideoPatch> = {
  // ═══════════ MUSIC (20 lessons) ═══════════
  "music-1": { youtubeId: "ZbZSe6N_BXs", videoTitle: "Ed Sheeran – Perfect", videoContext: "Listen to Ed Sheeran's 'Perfect' and focus on the vocabulary used in the lyrics — notice words like 'melody', 'chorus', and 'verse'." },
  "music-2": { youtubeId: "RgKAFK5djSk", videoTitle: "Wiz Khalifa – See You Again", videoContext: "Watch 'See You Again' and identify the emotions expressed through the lyrics — words like 'happy', 'sad', 'miss', and 'remember'." },
  "music-3": { youtubeId: "fJ9rUzIMcZQ", videoTitle: "Queen – Bohemian Rhapsody", videoContext: "Sing along to Bohemian Rhapsody and practice your pronunciation. Notice how words connect in natural singing." },
  "music-4": { youtubeId: "YQHsXMglC9A", videoTitle: "Adele – Hello", videoContext: "Listen to Adele's 'Hello' — a powerful pop ballad. Identify the genre characteristics: emotional vocals, piano melody, and storytelling lyrics." },
  "music-5": { youtubeId: "hTWKbfoikeg", videoTitle: "Nirvana – Smells Like Teen Spirit (Live)", videoContext: "Watch this iconic live performance and learn concert vocabulary: stage, crowd, performer, amplifier, and encore." },
  "music-6": { youtubeId: "kXYiU_JCYtU", videoTitle: "Linkin Park – Numb", videoContext: "Watch Linkin Park and identify the instruments: electric guitar, drums, keyboard, and vocals working together." },
  "music-7": { youtubeId: "CevxZvSJLk8", videoTitle: "Katy Perry – Roar", videoContext: "Analyze the songwriting in 'Roar' — notice the verse-chorus structure, rhyming patterns, and motivational message." },
  "music-8": { youtubeId: "YR5ApYxkU-U", videoTitle: "Lady Gaga – Shallow (A Star Is Born)", videoContext: "Explore how this song connects American pop culture with emotional storytelling and musical tradition." },
  "music-9": { youtubeId: "09R8_2nJtjg", videoTitle: "Maroon 5 – Sugar", videoContext: "Watch how modern music production combines live instruments with technology — auto-tune, mixing, and digital effects." },
  "music-10": { youtubeId: "ru0K8uYEZWw", videoTitle: "Pharrell Williams – Happy", videoContext: "Listen to 'Happy' and notice how the upbeat rhythm and positive lyrics create a joyful mood." },
  "music-11": { youtubeId: "JGwWNGJdvx8", videoTitle: "Ed Sheeran – Shape of You", videoContext: "Analyze the rhythm and beat patterns in this global hit. Notice the blend of pop and dancehall influences." },
  "music-12": { youtubeId: "450p7goxZqg", videoTitle: "John Legend – All of Me", videoContext: "Study how love is expressed through music — the vocabulary of romance, devotion, and emotional connection." },
  "music-13": { youtubeId: "PT2_F-1esPk", videoTitle: "The Weeknd – Blinding Lights", videoContext: "Explore 80s-inspired synth-pop — notice the retro synthesizer sounds blended with modern production." },
  "music-14": { youtubeId: "60ItHLz5WEA", videoTitle: "Alan Walker – Faded", videoContext: "Listen to this electronic dance music track and learn vocabulary for EDM: drop, build-up, synth, and bass." },
  "music-15": { youtubeId: "pRpeEdMmmQ0", videoTitle: "Shakira – Waka Waka", videoContext: "Experience how music unites cultures — this World Cup anthem blends African rhythms with Latin pop." },
  "music-16": { youtubeId: "lp-EO5I60KA", videoTitle: "Eminem – Lose Yourself", videoContext: "Study rap and hip-hop vocabulary: flow, bars, rhyme scheme, and storytelling in music." },
  "music-17": { youtubeId: "OPf0YbXqDm0", videoTitle: "Mark Ronson ft. Bruno Mars – Uptown Funk", videoContext: "Analyze the funk and soul genre — notice the brass instruments, groove, and call-and-response style." },
  "music-18": { youtubeId: "2Vv-BfVoq4g", videoTitle: "Ed Sheeran – Perfect (Official Music Video)", videoContext: "Watch how music videos tell visual stories that complement the lyrics and melody." },
  "music-19": { youtubeId: "YBHQbu5rbdQ", videoTitle: "Imagine Dragons – Whatever It Takes", videoContext: "Study the vocabulary of determination and ambition expressed through rock music lyrics." },
  "music-20": { youtubeId: "bo_efYhYU2A", videoTitle: "Sia – Cheap Thrills", videoContext: "Explore how simple, catchy lyrics combined with danceable beats create a global hit song." },

  // ═══════════ LEGAL (20 lessons) ═══════════
  "legal-1": { youtubeId: "yFLnM1I2xdY", videoTitle: "How Courts Work – Introduction", videoContext: "Watch this overview of the legal system and learn foundational legal vocabulary." },
  "legal-2": { youtubeId: "Ud4sB1A6FZ0", videoTitle: "Contract Law Explained", videoContext: "Learn about the essential elements of contracts: offer, acceptance, consideration, and legal capacity." },
  "legal-3": { youtubeId: "9xQp2sLDquo", videoTitle: "Criminal Law Basics", videoContext: "Understand the basics of criminal law: crimes, charges, prosecution, and defense." },
  "legal-4": { youtubeId: "Yt25xqPVaCQ", videoTitle: "Civil vs Criminal Law", videoContext: "Learn the difference between civil and criminal proceedings — lawsuits, plaintiffs, and damages." },
  "legal-5": { youtubeId: "mG4t8kErZCA", videoTitle: "The Court System Explained", videoContext: "Understand how courts are organized: trial courts, appellate courts, and supreme courts." },
  "legal-6": { youtubeId: "dSmLrWFERds", videoTitle: "Legal Documents Overview", videoContext: "Learn about the main types of legal documents: affidavits, motions, and declarations." },
  "legal-7": { youtubeId: "Maq5CkEaMLE", videoTitle: "Intellectual Property Rights", videoContext: "Understand patents, trademarks, and copyrights — how ideas and creations are legally protected." },
  "legal-8": { youtubeId: "yi-GEKCy5YM", videoTitle: "Corporate Law Basics", videoContext: "Learn about business formation, corporate governance, mergers, and acquisitions." },
  "legal-9": { youtubeId: "Pt4yGfUcrPE", videoTitle: "Employment Law Essentials", videoContext: "Understand employee rights, workplace discrimination, wrongful termination, and labor laws." },
  "legal-10": { youtubeId: "SB_vbOM5hxA", videoTitle: "Real Estate Law", videoContext: "Learn about property law: buying, selling, leasing, mortgages, and property rights." },
  "legal-11": { youtubeId: "J8wfOm_DLHM", videoTitle: "Family Law Overview", videoContext: "Understand family law concepts: divorce, child custody, alimony, and adoption." },
  "legal-12": { youtubeId: "2R5lICrkC0U", videoTitle: "Immigration Law Explained", videoContext: "Learn about visas, work permits, asylum, and the immigration process." },
  "legal-13": { youtubeId: "JfVJwDp_-Nk", videoTitle: "Constitutional Law Basics", videoContext: "Explore fundamental rights, amendments, and how constitutions protect citizens." },
  "legal-14": { youtubeId: "Qtn-v9bSEP4", videoTitle: "International Law Introduction", videoContext: "Understand how international treaties, diplomatic immunity, and cross-border laws work." },
  "legal-15": { youtubeId: "aw7hGhFMzL8", videoTitle: "Tort Law Explained", videoContext: "Learn about negligence, liability, and how personal injury claims work in court." },
  "legal-16": { youtubeId: "uw_5MSKFHWI", videoTitle: "Evidence in Court", videoContext: "Understand the rules of evidence: admissibility, burden of proof, and witness testimony." },
  "legal-17": { youtubeId: "sVgQBEe8ZrE", videoTitle: "Legal Ethics", videoContext: "Learn about attorney-client privilege, conflicts of interest, and professional duties of lawyers." },
  "legal-18": { youtubeId: "oTVtBbKGePE", videoTitle: "Mediation and Arbitration", videoContext: "Explore alternative dispute resolution methods: how mediation and arbitration differ from court trials." },
  "legal-19": { youtubeId: "i62yKR7fFAM", videoTitle: "Legal Writing Skills", videoContext: "Learn how legal professionals write briefs, memoranda, and legal arguments." },
  "legal-20": { youtubeId: "XPmB7GQYaj0", videoTitle: "Career in Law", videoContext: "Explore career paths in law: law firms, public interest, corporate counsel, and specializations." },

  // ═══════════ HOSPITALITY (20 lessons) ═══════════
  "hospitality-1": { youtubeId: "xNRHhKm4Alk", videoTitle: "Hotel Check-in Process", videoContext: "Watch a typical hotel check-in and learn the key phrases and vocabulary used by reception staff." },
  "hospitality-2": { youtubeId: "Bz4pK8HP_Kk", videoTitle: "Restaurant Service Training", videoContext: "Learn how to take orders, describe menu items, and handle dining requests professionally." },
  "hospitality-3": { youtubeId: "3J6aKhXFm80", videoTitle: "Room Service Best Practices", videoContext: "Watch how room service works — from taking orders to delivering food to guest rooms." },
  "hospitality-4": { youtubeId: "T5rAk5OFx4I", videoTitle: "Handling Guest Complaints", videoContext: "Learn professional techniques for dealing with guest complaints and turning negative experiences positive." },
  "hospitality-5": { youtubeId: "sqyJBE1ljqg", videoTitle: "Hotel Amenities Tour", videoContext: "Take a virtual tour of hotel facilities and learn vocabulary for gym, pool, spa, and business center." },
  "hospitality-6": { youtubeId: "Ep0lMPfbaOQ", videoTitle: "Tour Guide Skills", videoContext: "Watch a professional tour guide and learn the vocabulary for attractions, sightseeing, and cultural tours." },
  "hospitality-7": { youtubeId: "PbK1eqEZSJE", videoTitle: "Airport Transfer Communication", videoContext: "Learn how to coordinate airport transfers, give directions, and assist travelers with transportation." },
  "hospitality-8": { youtubeId: "6zxBJYG0VJo", videoTitle: "Event Planning in Hotels", videoContext: "Watch how hotels organize conferences, weddings, and banquets — learn the key event planning vocabulary." },
  "hospitality-9": { youtubeId: "EkMESnAW6GY", videoTitle: "Kitchen & Menu Planning", videoContext: "Learn kitchen terminology, food preparation vocabulary, and how to handle dietary requirements." },
  "hospitality-10": { youtubeId: "c1RIQJG9xhA", videoTitle: "Housekeeping Standards", videoContext: "Watch housekeeping procedures and learn vocabulary for cleaning schedules, supplies, and room inspection." },
  "hospitality-11": { youtubeId: "JsCcwdVbVzQ", videoTitle: "Front Desk Phone Skills", videoContext: "Learn professional phone etiquette for hotels — handling reservations, messages, and guest inquiries." },
  "hospitality-12": { youtubeId: "VIo58gLpjzE", videoTitle: "Hotel Billing & Checkout", videoContext: "Understand the checkout process — invoicing, payment methods, and handling billing disputes." },
  "hospitality-13": { youtubeId: "J2LGQP-pN_o", videoTitle: "Hotel Safety & Emergencies", videoContext: "Learn emergency procedures, evacuation vocabulary, and how to communicate during safety incidents." },
  "hospitality-14": { youtubeId: "oSRLnxwCf14", videoTitle: "Cultural Awareness in Hospitality", videoContext: "Understand how to serve international guests with cultural sensitivity and awareness." },
  "hospitality-15": { youtubeId: "ZsZlBQbz2tM", videoTitle: "Bar Service Training", videoContext: "Learn bar and lounge vocabulary: cocktail names, mixing terms, and professional bar etiquette." },
  "hospitality-16": { youtubeId: "1ZYbU82GVz4", videoTitle: "Spa & Wellness Services", videoContext: "Learn the vocabulary for spa treatments, wellness services, and how to describe relaxation experiences." },
  "hospitality-17": { youtubeId: "qBtq3F5bDyI", videoTitle: "Catering & Banquet Service", videoContext: "Watch catering operations and learn about buffet setup, plated service, and special event coordination." },
  "hospitality-18": { youtubeId: "5MgBikgcWnY", videoTitle: "Travel Agency Communication", videoContext: "Learn how travel agents communicate: booking tours, creating itineraries, and giving travel advice." },
  "hospitality-19": { youtubeId: "L_jWHffIx5E", videoTitle: "Building Customer Loyalty", videoContext: "Understand loyalty programs, collecting feedback, and strategies for retaining repeat guests." },
  "hospitality-20": { youtubeId: "Tt08KmFfIYQ", videoTitle: "Hospitality Career Development", videoContext: "Explore career paths in hospitality: preparing for interviews, writing CVs, and advancing your career." },
};

/** Apply video patches to lesson data */
export function applyVideoPatches(lessons: Record<string, any>) {
  for (const [key, patch] of Object.entries(courseVideoPatches)) {
    if (lessons[key]) {
      lessons[key].youtubeId = patch.youtubeId;
      lessons[key].videoTitle = patch.videoTitle;
      lessons[key].videoContext = patch.videoContext;
    }
  }
}
