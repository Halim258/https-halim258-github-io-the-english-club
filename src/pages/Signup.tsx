import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, BookOpen, Users, Sparkles, Eye, EyeOff, Check, X, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { notifyWelcome } from "@/lib/notifications";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { z } from "zod";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";

type Role = "student" | "teacher";

const signupBaseSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password is too long"),
  youtubeUrl: z.string().trim().max(255).optional().or(z.literal("")),
});

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;

function mapSignupError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered") || m.includes("user already"))
    return "An account with this email already exists. Try logging in instead.";
  if (m.includes("password")) return "Password doesn't meet requirements. Try a stronger one.";
  if (m.includes("rate") || m.includes("too many")) return "Too many attempts. Please wait a minute and try again.";
  return msg;
}

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
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; youtubeUrl?: string; form?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = signupBaseSchema.safeParse({ name, email, password, youtubeUrl });
    const fieldErrors: typeof errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof errors;
        fieldErrors[key] = issue.message;
      }
    }
    if (role === "teacher") {
      if (!youtubeUrl.trim()) fieldErrors.youtubeUrl = "A YouTube intro is required for teachers.";
      else if (!youtubeRegex.test(youtubeUrl.trim())) fieldErrors.youtubeUrl = "Please enter a valid YouTube URL.";
    }
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    const { data: signupData, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { full_name: name.trim(), role, youtube_intro_url: role === "teacher" ? youtubeUrl.trim() : undefined },
      },
    });
    setLoading(false);

    if (error) {
      const friendly = mapSignupError(error.message);
      setErrors({ form: friendly });
      toast({ title: "Sign up failed", description: friendly, variant: "destructive" });
      return;
    }

    if (signupData.user) {
      if (role === "teacher") {
        await supabase.from("profiles").update({ youtube_intro_url: youtubeUrl.trim() }).eq("id", signupData.user.id);
        await supabase.from("user_roles").update({ role: "teacher" }).eq("user_id", signupData.user.id);
      }
      // Send welcome notification (fire-and-forget)
      notifyWelcome(signupData.user.id).catch(() => {});
    }

    toast({ title: "Account created! 🎉", description: "Check your email to verify your account, then log in." });
    navigate("/login");
  };

  const perks = [
    "Free forever — start learning right away",
    "Personalized level from A1 to C2",
    "Earn XP, badges, and daily streaks",
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-6 pb-24 md:pb-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side — perks */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <h2 className="text-3xl font-bold font-display leading-tight mb-4">
            Start learning with<br />
            <span className="text-primary">The English Club</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join a community of learners mastering English from A1 to C2.
          </p>
          <div className="space-y-4">
            {perks.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{b}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-3 rounded-2xl border bg-muted/30 p-4">
            <div className="flex -space-x-2">
              {["from-rose-400 to-pink-500", "from-violet-400 to-purple-500", "from-sky-400 to-blue-500", "from-emerald-400 to-green-500"].map((c, i) => (
                <div key={i} className={`h-8 w-8 rounded-full bg-gradient-to-br ${c} border-2 border-background flex items-center justify-center text-[10px] font-bold text-white`}>
                  {["M", "N", "A", "S"][i]}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold">500+ students</p>
              <p className="text-[11px] text-muted-foreground">joined this year</p>
            </div>
          </div>
        </motion.div>

        {/* Right side — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-card"
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

          {role === "student" && (
            <div className="mb-5">
              <GoogleSignInButton label="Sign up with Google" />
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">or use email</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </div>
          )}

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
                aria-pressed={role === r.id}
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

          {errors.form && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <div className="relative">
                <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  className={`h-12 rounded-xl pl-10 text-base focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
              </div>
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className={`h-12 rounded-xl pl-10 text-base focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  placeholder="••••••••"
                  minLength={6}
                  aria-invalid={!!errors.password}
                  className={`h-12 rounded-xl pl-10 pr-11 text-base focus:ring-2 focus:ring-primary/20 ${errors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
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
                  onChange={(e) => { setYoutubeUrl(e.target.value); if (errors.youtubeUrl) setErrors((p) => ({ ...p, youtubeUrl: undefined })); }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  aria-invalid={!!errors.youtubeUrl}
                  className={`h-12 rounded-xl text-base focus:ring-2 focus:ring-primary/20 ${errors.youtubeUrl ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
                {errors.youtubeUrl && <p className="mt-1.5 text-xs text-destructive">{errors.youtubeUrl}</p>}
              </motion.div>
            )}

            <Button className="w-full h-12 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform" type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Creating your account…</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> Create {role === "teacher" ? "Teacher" : "Student"} Account</>
              )}
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              By signing up, you agree to our terms and privacy policy.
            </p>
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
