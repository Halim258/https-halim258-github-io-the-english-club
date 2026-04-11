import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, BookOpen, Users, Sparkles, Eye, EyeOff, Check, X } from "lucide-react";
import { notifyWelcome } from "@/lib/notifications";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Role = "student" | "teacher";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "6+ characters", pass: password.length >= 6 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
  ];
  const strength = checks.filter(c => c.pass).length;
  const colors = ["bg-destructive", "bg-amber-500", "bg-emerald-500"];
  const labels = ["Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < strength ? colors[strength - 1] : "bg-muted"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {checks.map(c => (
            <span key={c.label} className={`flex items-center gap-1 text-[10px] ${c.pass ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}>
              {c.pass ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {c.label}
            </span>
          ))}
        </div>
        {strength > 0 && <span className={`text-[10px] font-semibold ${strength === 3 ? "text-emerald-600" : strength === 2 ? "text-amber-500" : "text-destructive"}`}>{labels[strength - 1]}</span>}
      </div>
    </div>
  );
}

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "teacher" && !youtubeUrl.trim()) {
      toast({ title: "YouTube link required", description: "Please add a video introduction as a teacher.", variant: "destructive" });
      return;
    }

    setLoading(true);

    const { data: signupData, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role, youtube_intro_url: role === "teacher" ? youtubeUrl : undefined } },
    });
    setLoading(false);

    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
      return;
    }

    if (signupData.user) {
      if (role === "teacher") {
        await supabase.from("profiles").update({ youtube_intro_url: youtubeUrl }).eq("id", signupData.user.id);
        await supabase.from("user_roles").update({ role: "teacher" }).eq("user_id", signupData.user.id);
      }
      // Send welcome notification (fire-and-forget)
      notifyWelcome(signupData.user.id).catch(() => {});
    }

    toast({ title: "Account created! 🎉", description: "Check your email to verify your account, then log in." });
    navigate("/login");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm p-8 shadow-card"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
            >
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-bold font-display">Join The English Club</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Start your English learning journey today</p>
          </div>

          {/* Role selector */}
          <div className="flex gap-3 mb-6">
            {[
              { id: "student" as Role, icon: BookOpen, label: "Student", sub: "I want to learn" },
              { id: "teacher" as Role, icon: Users, label: "Teacher", sub: "I want to teach" },
            ].map((r) => (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all ${
                  role === r.id
                    ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <r.icon className={`h-6 w-6 ${role === r.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-semibold ${role === r.id ? "text-primary" : "text-muted-foreground"}`}>
                  {r.label}
                </span>
                <span className="text-[10px] text-muted-foreground">{r.sub}</span>
              </motion.button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {role === "teacher" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4"
              >
                <Label htmlFor="youtube" className="flex items-center gap-1.5 text-primary font-semibold mb-2">
                  🎥 Video Introduction
                </Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Add a YouTube link introducing yourself as a teacher.
                </p>
                <Input
                  id="youtube"
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required={role === "teacher"}
                  className="h-11 rounded-xl"
                />
              </motion.div>
            )}

            <Button className="w-full h-11 rounded-xl text-sm font-semibold" type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Create {role === "teacher" ? "Teacher" : "Student"} Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
