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
                {/* Category image */}
                <div className="relative -mx-6 -mt-6 mb-4 h-32 overflow-hidden rounded-t-2xl">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110 duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className={`h-8 w-8 rounded-lg ${cat.iconBg} flex items-center justify-center shrink-0 shadow-sm backdrop-blur-sm`}>
                      <cat.icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold font-display text-foreground drop-shadow-sm">{cat.title}</h3>
                      <p className="text-[10px] text-muted-foreground">{cat.courses.length} courses</p>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
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
