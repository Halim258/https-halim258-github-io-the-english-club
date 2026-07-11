import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, Sparkles, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

function mapAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login") || m.includes("invalid credentials")) return "Wrong email or password. Please try again.";
  if (m.includes("email not confirmed")) return "Please confirm your email before logging in — check your inbox.";
  if (m.includes("too many")) return "Too many attempts. Please wait a moment and try again.";
  if (m.includes("network")) return "Network error. Check your connection and try again.";
  return msg;
}

const benefits = [
  "200+ structured lessons from A1 to C2",
  "AI-powered tutor & pronunciation checker",
  "Track your progress & earn achievements",
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, role, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading || !user) return;
    if (role === "admin" || role === "secretary") navigate("/admin", { replace: true });
    else if (role === "teacher") navigate("/teacher-dashboard", { replace: true });
    else navigate("/courses", { replace: true });
  }, [user, role, authLoading, navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("remembered_email");
    if (saved) { setEmail(saved); setRememberMe(true); }
  }, []);

  if (authLoading || user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "email" | "password";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    if (rememberMe) localStorage.setItem("remembered_email", email);
    else localStorage.removeItem("remembered_email");

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      setLoading(false);
      const friendly = mapAuthError(error.message);
      setErrors({ form: friendly });
      toast({ title: "Login failed", description: friendly, variant: "destructive" });
      return;
    }
    // Navigation handled by the useEffect above once useAuth resolves the role.
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pb-20 md:pb-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left side - Benefits (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <h2 className="text-3xl font-bold font-display leading-tight mb-4">
            Welcome back to<br />
            <span className="text-primary">The English Club</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Continue your learning journey where you left off.
          </p>
          <div className="space-y-4">
            {benefits.map((b, i) => (
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
              <p className="text-[11px] text-muted-foreground">are already learning with us</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-card"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
            >
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <h1 className="text-2xl font-bold font-display">Welcome Back</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Log in to continue your learning journey</p>
          </div>

          {errors.form && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`h-12 rounded-xl pl-10 text-base focus:ring-2 focus:ring-primary/20 transition-shadow ${errors.email ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                />
              </div>
              {errors.email && <p id="email-error" className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  onKeyUp={(e) => setCapsLock(e.getModifierState && e.getModifierState("CapsLock"))}
                  onKeyDown={(e) => setCapsLock(e.getModifierState && e.getModifierState("CapsLock"))}
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`h-12 rounded-xl pl-10 pr-11 text-base focus:ring-2 focus:ring-primary/20 transition-shadow ${errors.password ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
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
              {errors.password && <p id="password-error" className="text-xs text-destructive">{errors.password}</p>}
              {capsLock && !errors.password && (
                <p className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                  <AlertCircle className="h-3 w-3" /> Caps Lock is on
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(v) => setRememberMe(!!v)} />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-muted-foreground">Remember me</Label>
            </div>
            <Button className="w-full h-12 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform" type="submit" disabled={loading}>
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing you in…</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> Log In</>
              )}
            </Button>
          </form>

          {/* Sign up & Start learning CTA */}
          <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?
            </p>
            <Link to="/signup" className="block">
              <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-semibold border-primary/30 hover:bg-primary/5 hover:border-primary group active:scale-[0.98] transition-transform">
                <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                Sign Up & Start Learning Now
                <ArrowRight className="h-4 w-4 ml-2 text-primary group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
