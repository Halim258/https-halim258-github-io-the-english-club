import { useState } from "react";
import { Star, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const teachers = [
  { id: 1, name: "Sarah Mitchell", bio: "CELTA-certified English teacher with 10+ years experience. Specializes in General English and exam preparation.", langs: ["English", "Arabic"], specializations: ["General", "IELTS"], price25: 15, price50: 25, rating: 4.9, reviews: 124, avatar: "SM" },
  { id: 2, name: "James Robertson", bio: "Cambridge-trained ESL instructor. Expert in Business English and corporate training.", langs: ["English"], specializations: ["Business", "General"], price25: 18, price50: 30, rating: 5.0, reviews: 89, avatar: "JR" },
  { id: 3, name: "Nadia Kamal", bio: "Bilingual English teacher from Alexandria. Patient and structured approach for beginners.", langs: ["English", "Arabic"], specializations: ["General", "Kids"], price25: 12, price50: 20, rating: 4.8, reviews: 201, avatar: "NK" },
  { id: 4, name: "David Chen", bio: "IELTS examiner and Cambridge FCE/CAE specialist. Proven track record of high scores.", langs: ["English", "Mandarin"], specializations: ["IELTS", "Cambridge"], price25: 20, price50: 35, rating: 4.9, reviews: 156, avatar: "DC" },
  { id: 5, name: "Amira Soliman", bio: "Experienced kids and teens English teacher. Fun, engaging, and communicative methods.", langs: ["English", "Arabic", "French"], specializations: ["Kids", "General"], price25: 14, price50: 24, rating: 4.7, reviews: 97, avatar: "AS" },
  { id: 6, name: "Michael Thompson", bio: "University lecturer in Applied Linguistics. Advanced grammar and academic writing specialist.", langs: ["English", "German"], specializations: ["Business", "Cambridge"], price25: 22, price50: 38, rating: 5.0, reviews: 64, avatar: "MT" },
];

export default function Teachers() {
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("all");

  const filtered = teachers.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchSpec = spec === "all" || t.specializations.includes(spec);
    return matchSearch && matchSpec;
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">Find a Teacher</h1>
      <p className="mt-2 text-muted-foreground">Book 1-on-1 lessons with expert English teachers at The English Club, Alexandria.</p>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={spec} onValueChange={setSpec}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specializations</SelectItem>
            <SelectItem value="MSA">Standard Arabic</SelectItem>
            <SelectItem value="Egyptian">Egyptian Arabic</SelectItem>
            <SelectItem value="Quran">Quran Recitation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Teacher Grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} className="rounded-xl border bg-card p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {t.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{t.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  <span className="font-medium">{t.rating}</span>
                  <span className="text-muted-foreground">({t.reviews})</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{t.bio}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.specializations.map((s) => (
                <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s}</span>
              ))}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-semibold">${t.price25} <span className="text-xs font-normal text-muted-foreground">/ 25 min</span></p>
              </div>
              <Button size="sm">Book Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
