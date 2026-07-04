import { Link } from "react-router-dom";
import { GraduationCap, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=%2B201554901390";

export default function BookTeacherFAB() {
  return (
    <div className="fixed bottom-[5.5rem] md:bottom-6 right-3 md:right-6 z-40 flex flex-col gap-2 items-end">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 h-11 md:h-10 px-3 md:px-4 border border-foreground/20 bg-background/95 backdrop-blur text-foreground shadow-md hover:border-foreground/50 hover:-translate-y-0.5 active:translate-y-0 transition-all text-[11px] font-editorial-mono uppercase tracking-widest font-semibold"
      >
        <span className="h-1.5 w-1.5 bg-[#25D366] rounded-full" aria-hidden />
        <MessageCircle className="h-4 w-4" />
        <span className="hidden md:inline">WhatsApp</span>
      </a>
      <Link
        to="/teachers"
        className="group flex items-center gap-2 h-11 md:h-10 px-3 md:px-4 bg-foreground text-background shadow-md hover:bg-primary hover:-translate-y-0.5 active:translate-y-0 transition-all text-[11px] font-editorial-mono uppercase tracking-widest font-semibold"
      >
        <span className="h-1.5 w-1.5 bg-primary group-hover:bg-background rounded-full" aria-hidden />
        <GraduationCap className="h-4 w-4" />
        <span className="hidden md:inline">Book a Teacher</span>
      </Link>
    </div>
  );
}
