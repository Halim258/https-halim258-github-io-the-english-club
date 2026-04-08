import { Link } from "react-router-dom";
import { Star, Mail, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const teachers = [
  { id: 1, name: "Radwa Badwi", email: "radwa@theenglishclub.com", bio: "Experienced English teacher. Fun, engaging, and communicative methods.", avatar: "RB", rating: 4.9 },
  { id: 2, name: "Sarah Mitchell", email: "sarah@theenglishclub.com", bio: "CELTA-certified with 10+ years experience in General English and IELTS.", avatar: "SM", rating: 4.9 },
  { id: 3, name: "Nadia Kamal", email: "nadia@theenglishclub.com", bio: "Bilingual teacher from Alexandria. Patient and structured approach.", avatar: "NK", rating: 4.8 },
];

export default function Teachers() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-display">Our Teachers</h1>
        <p className="mt-2 text-muted-foreground">Meet the team at The English Club, Alexandria</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((t) => (
          <div key={t.id} className="rounded-2xl border-2 border-border/50 bg-card p-6 shadow-soft text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mb-3">
              {t.avatar}
            </div>
            <h3 className="font-semibold">{t.name}</h3>
            <div className="flex items-center justify-center gap-1 text-sm mt-1">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              <span className="font-medium">{t.rating}</span>
            </div>
            <a href={`mailto:${t.email}`} className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary mt-1.5 transition-colors">
              <Mail className="h-3 w-3" />
              {t.email}
            </a>
            <p className="text-sm text-muted-foreground mt-3">{t.bio}</p>
          </div>
        ))}
      </div>

      {/* Link to Groups */}
      <div className="mt-10 text-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
        <Users2 className="h-10 w-10 mx-auto text-primary mb-3" />
        <h2 className="text-xl font-bold mb-2">Want to join a group?</h2>
        <p className="text-sm text-muted-foreground mb-4">Browse available groups and enroll yourself directly</p>
        <Button asChild>
          <Link to="/groups">View Available Groups</Link>
        </Button>
      </div>
    </div>
  );
}
