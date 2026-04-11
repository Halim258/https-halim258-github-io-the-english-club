import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, BookOpen, Sparkles, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("remembered_email");
    if (saved) { setEmail(saved); setRememberMe(true); }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (rememberMe) localStorage.setItem("remembered_email", email);
    else localStorage.removeItem("remembered_email");

    const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }

    const userId = signInData.user?.id;
    if (userId) {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .limit(1)
        .single();

      if (data?.role === "admin") navigate("/admin");
      else if (data?.role === "teacher") navigate("/teacher-dashboard");
      else navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 relative overflow-hidden">
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
          className="rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm p-8 shadow-card"
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

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={(v) => setRememberMe(!!v)} />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-muted-foreground">Remember me</Label>
            </div>
            <Button className="w-full h-11 rounded-xl text-sm font-semibold" type="submit" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Log In
            </Button>
          </form>

          {/* Sign up & Start learning CTA */}
          <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?
            </p>
            <Link to="/signup" className="block">
              <Button variant="outline" className="w-full h-11 rounded-xl text-sm font-semibold border-primary/30 hover:bg-primary/5 hover:border-primary group">
                <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                Sign Up & Start Learning Now
                <ArrowRight className="h-4 w-4 ml-2 text-primary group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Features hint - mobile only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:hidden"
      >
        <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /> 200+ Lessons</span>
        <span className="flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-primary" /> AI Tutor</span>
      </motion.div>
    </div>
  );
}
