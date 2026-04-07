import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { categories } from "@/data/course-categories";
import { useAuth } from "@/hooks/useAuth";

export default function CoursesSection() {
  const { user, loading } = useAuth();
  const isLoggedIn = loading || !!user; // treat loading as logged-in to avoid flash of locks

  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
              Our Courses
            </p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            Complete Course Catalog
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            From beginner basics to professional mastery — explore our full range of English courses designed for every goal and level.
          </p>
        </FadeInUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => {
            const CardContent = (
              <>
                <span className="absolute -right-2 -top-2 text-6xl opacity-[0.07] select-none pointer-events-none">
                  {cat.emoji}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`h-10 w-10 rounded-lg ${cat.iconBg} flex items-center justify-center shrink-0`}>
                      <cat.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold font-display">{cat.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{cat.courses.length} courses</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {cat.courses.slice(0, 4).map((course) => (
                      <li key={course.name} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary/60 mt-0.5 shrink-0" />
                        {course.name}
                      </li>
                    ))}
                    {cat.courses.length > 4 && (
                      <li className="text-xs text-primary font-medium">+{cat.courses.length - 4} more</li>
                    )}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {isLoggedIn ? (
                      <>Explore courses <ArrowRight className="h-3.5 w-3.5" /></>
                    ) : (
                      <><Lock className="h-3 w-3" /> Sign up to access</>
                    )}
                  </div>
                </div>
              </>
            );

            const cardClass = `group relative block rounded-2xl border bg-gradient-to-br ${cat.color} p-6 shadow-soft transition-all hover:shadow-card hover:border-primary/30 hover:-translate-y-1 duration-300 overflow-hidden h-full`;

            return (
              <motion.div key={cat.title} variants={staggerItem}>
                {isLoggedIn ? (
                  <Link to={`/courses/category/${cat.slug}`} className={cardClass}>
                    {CardContent}
                  </Link>
                ) : (
                  <Link to="/signup" className={cardClass}>
                    {CardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <FadeInUp delay={0.2}>
          <div className="mt-10 flex justify-center">
            {isLoggedIn ? (
              <Link to="/courses">
                <Button className="rounded-full px-8 font-semibold font-display">
                  View Full Curriculum <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button className="rounded-full px-8 font-semibold font-display">
                  <Lock className="mr-2 h-4 w-4" /> Sign Up to Access Courses
                </Button>
              </Link>
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
