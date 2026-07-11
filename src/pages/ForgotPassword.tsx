import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, ArrowLeft, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address").max(255);

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    // Send reset email. We intentionally do NOT reveal whether the email is
    // registered — always show the same "sent" state to avoid account
    // enumeration. Supabase issues a single-use link that expires (default
    // 1 hour) server-side.
    await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pb-20 md:pb-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border-2 border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25"
          >
            {sent ? <Mail className="h-8 w-8 text-primary-foreground" /> : <GraduationCap className="h-8 w-8 text-primary-foreground" />}
          </motion.div>
          <h1 className="text-2xl font-bold font-display">
            {sent ? "Check your inbox" : "Forgot your password?"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {sent
              ? "If an account exists for that email, we've sent a reset link."
              : "Enter your email and we'll send you a secure reset link."}
          </p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p>
                We sent a link to <strong className="text-foreground break-all">{email}</strong>. Check your inbox and spam folder — it can take a minute to arrive.
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>The link is single-use and expires in about 1 hour for your security.</span>
            </div>
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={() => { setSent(false); setError(null); }}
            >
              Use another email
            </Button>
          </div>
        ) : (
          <>
            {error && (
              <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
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
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
                    placeholder="you@example.com"
                    aria-invalid={!!error}
                    className={`h-12 rounded-xl pl-10 text-base focus:ring-2 focus:ring-primary/20 ${error ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  />
                </div>
              </div>
              <Button className="w-full h-12 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform" type="submit" disabled={loading}>
                {loading ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" /> Sending link…</>) : "Send Reset Link"}
              </Button>
            </form>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Log In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
