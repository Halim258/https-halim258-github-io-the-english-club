import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { FadeInUp } from "@/components/AnimatedSection";

export default function LocationSection() {
  return (
    <section className="border-y bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <FadeInUp>
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">Location</p>
          </div>
          <h2 className="text-center text-2xl md:text-3xl font-bold font-display">
            Visit Us in Alexandria
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-soft text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold font-display">Our Address</h3>
              <p className="mt-1 text-sm text-muted-foreground">Alexandria, Egypt</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-soft text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold font-display">Working Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">Sat – Thu: 10 AM – 9 PM</p>
              <p className="text-sm text-muted-foreground">Friday: Closed</p>
            </div>

            <div className="flex flex-col items-center rounded-xl border bg-card p-6 shadow-soft text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold font-display">Get in Touch</h3>
              <a
                href="https://api.whatsapp.com/send?phone=%2B201554901390"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
