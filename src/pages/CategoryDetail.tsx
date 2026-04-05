import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircle, BookOpen, Target, Briefcase, Globe2, Headphones, Brain, PenLine, BookMarked, CheckCircle2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/course-categories";

export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const cat = categories.find((c) => c.slug === categorySlug);

  if (!cat) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-primary hover:underline">← Back to Courses</Link>
      </div>
    );
  }

  const IconComponent = cat.icon;

  return (
    <div className="overflow-x-hidden">
      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="relative h-48 md:h-64">
          <img src={cat.image} alt={cat.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 -mt-20 pb-6">
          <Link to="/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors font-medium">
            <ChevronLeft className="h-4 w-4" /> Back to All Courses
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`h-14 w-14 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-sm backdrop-blur-sm`}>
                <IconComponent className="h-7 w-7 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display">{cat.title}</h1>
                <p className="text-sm text-muted-foreground mt-1">{cat.courses.length} courses available</p>
              </div>
            </div>
            <p className="max-w-xl text-muted-foreground mt-2">
              {cat.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeInUp>
            <h2 className="text-lg font-bold font-display mb-6">Choose a Course to Start</h2>
          </FadeInUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-5"
          >
            {cat.courses.map((course, i) => (
              <motion.div key={course.name} variants={staggerItem}>
                <div className="group relative rounded-2xl border-2 border-border/60 bg-card p-6 md:p-7 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-display text-lg leading-tight">{course.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{course.description}</p>
                        {course.topics && course.topics.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {course.topics.map((topic) => (
                              <span key={topic} className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href="https://wa.me/201234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button size="sm" variant="outline" className="rounded-full px-5 py-2 text-sm font-semibold gap-2 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        Enroll
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <FadeInUp delay={0.2}>
            <div className="mt-10 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Not sure which course is right for you?</p>
              <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full px-6 font-semibold font-display">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Ask Us on WhatsApp
                </Button>
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
