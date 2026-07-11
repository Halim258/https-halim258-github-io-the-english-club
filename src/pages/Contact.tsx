import { MapPin, Phone, MessageCircle, Clock, ArrowUpRight, Mail } from "lucide-react";
import { FadeInUp, FadeIn } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative border-b bg-muted/30 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary)/5%,transparent_40%)]" />
        <div className="container mx-auto px-4 relative">
          <FadeInUp>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="h-4 w-4 text-primary" />
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Get in Touch</p>
            </div>
            <h1 className="text-center text-3xl md:text-5xl font-bold font-display">
              Contact Us
            </h1>
            <p className="mt-4 text-center text-muted-foreground max-w-xl mx-auto">
              Visit our center in Alexandria or reach out on WhatsApp. We are happy to help you choose the right course.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <FadeInUp delay={0}>
              <div className="group relative rounded-2xl border bg-card p-6 shadow-soft transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display">Our Address</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  عنوانا البطاش بيانكي فوق سوبر ماركت اولاد العدل ٢
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Al-Batash, Bianchi — above Awlad Al-Adl 2 Supermarket
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="group relative rounded-2xl border bg-card p-6 shadow-soft transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display">WhatsApp</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  +20 155 490 1390
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=%2B201554901390"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="group relative rounded-2xl border bg-card p-6 shadow-soft transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold font-display">Working Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Saturday – Thursday: 10 AM – 9 PM
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Friday: Closed
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Map + CTA */}
      <section className="border-y bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <FadeIn>
              <div className="rounded-2xl border bg-card p-2 shadow-soft h-[320px] md:h-[400px] overflow-hidden">
                <iframe
                  title="The English Club Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.0!2d29.924!3d31.215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDEyJzU0LjAiTiAyOcKwNTUnMjYuNCJF!5e0!3m2!1sen!2seg!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale-[0.2] dark:invert-[0.15]"
                />
              </div>
            </FadeIn>

            <FadeInUp delay={0.1}>
              <div className="lg:pl-8">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">Ready to start?</p>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  Book a free placement test
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Not sure which level is right for you? Send us a message and we will schedule a quick, free placement test at our center or online.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://api.whatsapp.com/send?phone=%2B201554901390"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="rounded-full gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Us
                    </Button>
                  </a>
                  <a href="tel:+201554901390">
                    <Button variant="outline" className="rounded-full gap-2">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </div>
  );
}
