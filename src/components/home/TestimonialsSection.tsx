import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    role: "B2 Student",
    text: "The AI tutor helped me practice conversations anytime. My speaking improved dramatically in just 3 months!",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    name: "Ahmed K.",
    role: "A2 → B1",
    text: "The slide-based lessons are incredible. Each lesson feels like a mini-class with vocabulary, grammar, and practice all in one.",
    rating: 5,
    avatar: "👨‍🎓",
  },
  {
    name: "Fatima H.",
    role: "C1 Student",
    text: "Writing practice with AI feedback is a game-changer. I get instant corrections and tips that actually help me improve.",
    rating: 5,
    avatar: "👩‍🏫",
  },
  {
    name: "Omar R.",
    role: "Parent",
    text: "My kids love the game center! They learn English while having fun. The daily challenges keep them motivated every day.",
    rating: 5,
    avatar: "👨‍👧‍👦",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-4">
            <Star className="h-3.5 w-3.5" /> Student Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
            What Our Students Say
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Join thousands of learners who have transformed their English skills with us.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{t.avatar}</span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground font-medium">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
