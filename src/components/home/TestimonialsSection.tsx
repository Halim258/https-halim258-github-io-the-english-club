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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {allReviews.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border bg-card p-5 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{getAvatar(t.display_name)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t.display_name}</p>
                  {t.created_at && (
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(t.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {user && t.user_id === user.id && (
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    title="Delete review"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
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
