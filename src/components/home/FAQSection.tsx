import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInUp } from "@/components/AnimatedSection";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What levels do you offer?",
    a: "We offer all Cambridge-aligned levels from A1 (Beginner) through C2 (Mastery). Each level has 20 structured lessons covering grammar, vocabulary, speaking, and writing.",
  },
  {
    q: "Can I learn online or do I need to visit in person?",
    a: "Both! You can explore our full curriculum online for free, or book a teacher for personalized 1-on-1 lessons. We also offer in-person classes at our Alexandria, Egypt center.",
  },
  {
    q: "What is the PCC Competition?",
    a: "PCC (Presentation Course & Competition) is our flagship program that trains students in public speaking and presentation skills, culminating in team-based competitive events with medals and certificates.",
  },
  {
    q: "How do I book a teacher?",
    a: "Visit our Teachers page to see available instructors, or tap the WhatsApp button to message us directly. We'll match you with the right teacher for your level and goals.",
  },
  {
    q: "Is the platform free to use?",
    a: "Yes! All self-study lessons and curriculum content are completely free. Teacher-guided private sessions are available at affordable rates.",
  },
  {
    q: "What age groups do you teach?",
    a: "We teach students of all ages — from young learners to adults. Our curriculum is adapted to suit different age groups and learning objectives.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Everything you need to know about learning with The English Club.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-xl border bg-card px-6 shadow-soft"
                >
                  <AccordionTrigger className="text-left text-sm font-semibold font-display hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
