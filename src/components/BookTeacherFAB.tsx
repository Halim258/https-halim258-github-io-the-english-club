import { Link } from "react-router-dom";
import { GraduationCap, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=%2B201554901390";

export default function BookTeacherFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 sm:px-5 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <Link
        to="/teachers"
        className="flex items-center gap-2 rounded-full bg-accent px-4 sm:px-5 py-3 font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 text-sm"
      >
        <GraduationCap className="h-5 w-5" />
        <span className="hidden sm:inline">Book a Teacher</span>
      </Link>
    </div>
  );
}
