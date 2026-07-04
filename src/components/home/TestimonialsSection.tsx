import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, Send, Loader2, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const defaultTestimonials = [
  {
    id: "default-1",
    display_name: "Sarah M.",
    text: "The AI tutor helped me practice conversations anytime. My speaking improved dramatically in just 3 months!",
    rating: 5,
    user_id: "",
    created_at: "",
  },
  {
    id: "default-2",
    display_name: "Ahmed K.",
    text: "The slide-based lessons are incredible. Each lesson feels like a mini-class with vocabulary, grammar, and practice all in one.",
    rating: 5,
    user_id: "",
    created_at: "",
  },
  {
    id: "default-3",
    display_name: "Fatima H.",
    text: "Writing practice with AI feedback is a game-changer. I get instant corrections and tips that actually help me improve.",
    rating: 5,
    user_id: "",
    created_at: "",
  },
  {
    id: "default-4",
    display_name: "Omar R.",
    text: "My kids love the game center! They learn English while having fun. The daily challenges keep them motivated every day.",
    rating: 5,
    user_id: "",
    created_at: "",
  },
];

const avatarEmojis = ["👩‍💼", "👨‍🎓", "👩‍🏫", "👨‍👧‍👦", "🧑‍💻", "👩‍🎨", "👨‍🔬", "🧑‍🚀", "👩‍⚕️", "👨‍🍳"];

function getAvatar(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return avatarEmojis[Math.abs(hash) % avatarEmojis.length];
}

interface Review {
  id: string;
  display_name: string;
  text: string;
  rating: number;
  user_id: string;
  created_at: string;
}

export default function TestimonialsSection() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setReviews(data);
  };

  const handleSubmit = async () => {
    if (!user) return;
    if (!name.trim() || !text.trim()) {
      toast.error("Please fill in your name and review.");
      return;
    }
    if (text.trim().length < 10) {
      toast.error("Review must be at least 10 characters.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      display_name: name.trim().slice(0, 50),
      text: text.trim().slice(0, 500),
      rating,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to submit review.");
    } else {
      toast.success("Thank you for your review! ⭐");
      setShowForm(false);
      setName("");
      setText("");
      setRating(5);
      fetchReviews();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) {
      toast.success("Review deleted.");
      setReviews((r) => r.filter((x) => x.id !== id));
    }
  };

  const allReviews = [...reviews, ...defaultTestimonials];

  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-background border-y border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-foreground/20"
        >
          <div>
            <span className="eyebrow block mb-3">Vol. VI · Field Notes</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-[0.95]">
              What our <em className="text-primary">students</em> say.
            </h2>
          </div>
          <p className="text-sm md:text-base text-foreground/70 max-w-sm font-serif italic leading-relaxed">
            Unedited voices from the cohort — collected in Alexandria, printed here in full.
          </p>
        </motion.div>

        {/* Add Review Button */}
        {user && !showForm && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="gap-2 rounded-full border-primary/30 hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> Write a Review
            </Button>
          </div>
        )}

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
            >
              <div className="max-w-md mx-auto rounded-2xl border bg-card p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Share Your Experience</h3>
                  <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <Input
                  placeholder="Your name (e.g. Sarah M.)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  className="mb-3"
                />

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-sm text-muted-foreground mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-125">
                      <Star
                        className={`h-5 w-5 transition-colors ${
                          s <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <Textarea
                  placeholder="Write your review here... (min 10 characters)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={500}
                  rows={3}
                  className="mb-1 resize-none"
                />
                <p className="text-[10px] text-muted-foreground text-right mb-3">{text.length}/500</p>

                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full gap-2"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Submit Review
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-px bg-foreground/15 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
          {allReviews.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 6) * 0.05 }}
              className="group bg-background hover:bg-card p-6 md:p-8 transition-colors relative min-w-[280px] max-w-[320px] md:min-w-0 md:max-w-none snap-start shrink-0 md:shrink flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="eyebrow">№ {String(i + 1).padStart(2, "0")}</span>
                <div className="flex gap-px">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <Quote className="h-5 w-5 text-primary mb-3" strokeWidth={2.5} />
              <p className="font-display italic text-lg md:text-xl leading-snug text-foreground mb-6 flex-1">
                “{t.text}”
              </p>
              <div className="mt-auto pt-4 border-t border-foreground/15 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider">{t.display_name}</p>
                  {t.created_at && (
                    <p className="text-[10px] font-editorial-mono text-foreground/50 uppercase tracking-widest mt-0.5">
                      {new Date(t.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
                {user && t.user_id === user.id && (
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-foreground/40 hover:text-primary transition-all"
                    title="Delete review"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
