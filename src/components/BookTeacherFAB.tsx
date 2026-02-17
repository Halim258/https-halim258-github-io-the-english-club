import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function BookTeacherFAB() {
  return (
    <Link
      to="/teachers"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <GraduationCap className="h-5 w-5" />
      <span className="hidden sm:inline">Book a Teacher</span>
    </Link>
  );
}
