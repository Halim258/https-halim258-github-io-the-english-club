import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, CheckCircle, Eye, EyeOff, Lock, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

type Status = "verifying" | "invalid" | "ready" | "success";


export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>("verifying");
  const [linkError, setLinkError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verify the recovery link once. Supabase auto-exchanges the URL code into
  // a short-lived recovery session; we consider the link valid only if that
  // session actually resolves to an authenticated user.
  useEffect(() => {
    let cancelled = false;

    const url = new URL(window.location.href);
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    const hashParams = new URLSearchParams(hash);

    // Errors can arrive in the hash or the query string.
    const errCode = hashParams.get("error_code") || hashParams.get("error") || url.searchParams.get("error_code") || url.searchParams.get("error");
    const errDesc = hashParams.get("error_description") || url.searchParams.get("error_description");
    if (errCode) {
      const friendly =
        errCode.includes("expired") || (errDesc && errDesc.toLowerCase().includes("expired"))
          ? "This reset link has expired. Please request a new one."
          : errDesc?.replace(/\+/g, " ") || "This reset link is invalid or has already been used.";
      setLinkError(friendly);
      setStatus("invalid");
      return;
    }

    const cleanUrl = () => {
      window.history.replaceState({}, "", `${window.location.pathname}`);
    };

    const check = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (cancelled) return;
      if (error || !data?.user) {
        setLinkError("This reset link is invalid or has expired. Please request a new one.");
        setStatus("invalid");
      } else {
        setStatus("ready");
      }
    };

    const run = async () => {
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash") || url.searchParams.get("token");
      const type = url.searchParams.get("type");
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      try {
        if (accessToken && refreshToken) {
          // Implicit flow: set the recovery session explicitly.
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          cleanUrl();
        } else if (code) {
          // PKCE flow.
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          cleanUrl();
          if (error) {
            const { data } = await supabase.auth.getUser();
            if (!data?.user) {
              if (cancelled) return;
              setLinkError("This reset link is invalid or has already been used. Please request a new one.");
              setStatus("invalid");
              return;
            }
          }
        } else if (tokenHash && (type === "recovery" || !type)) {
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });
          cleanUrl();
          if (error) {
            if (cancelled) return;
            setLinkError("This reset link is invalid or has already been used. Please request a new one.");
            setStatus("invalid");
            return;
          }
        }
      } catch {
        /* fall through to the session check below */
      }
      if (cancelled) return;
      await check();
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        check();
      }
    });

    run();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 1) {
      setFormError("Please enter a password.");
      return;
    }
    if (password !== confirm) {
      setFormError("Passwords don't match.");
      return;
    }


    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      const msg = error.message.toLowerCase().includes("same")
        ? "New password must be different from your current one."
        : error.message;
      setFormError(msg);
      toast({ title: "Couldn't update password", description: msg, variant: "destructive" });
      return;
    }

    setStatus("success");
    toast({ title: "Password updated", description: "You're now signed in with your new password." });
    setTimeout(() => navigate("/courses", { replace: true }), 1800);
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
            {status === "success" ? (
              <CheckCircle className="h-8 w-8 text-primary-foreground" />
            ) : (
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            )}
          </motion.div>
          <h1 className="text-2xl font-bold font-display">
            {status === "success" ? "Password updated" : "Set a new password"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {status === "success"
              ? "Signing you in — redirecting…"
              : "Choose a strong password you haven't used before."}
          </p>
        </div>

        {status === "verifying" && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Verifying reset link…</p>
          </div>
        )}

        {status === "invalid" && (
          <div className="space-y-4">
            <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{linkError}</span>
            </div>
            <Link to="/forgot-password">
              <Button className="w-full h-12 rounded-xl text-sm font-semibold">Request a new link</Button>
            </Link>
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Log In
            </Link>
          </div>
        )}

        {status === "ready" && (
          <>
            {formError && (
              <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (formError) setFormError(null); }}
                    placeholder="••••••••"
                    minLength={8}
                    required
                    className="h-12 rounded-xl pl-10 pr-11 text-base focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); if (formError) setFormError(null); }}
                    placeholder="••••••••"
                    minLength={8}
                    required
                    className={`h-12 rounded-xl pl-10 text-base focus:ring-2 focus:ring-primary/20 ${confirm && confirm !== password ? "border-destructive focus-visible:ring-destructive/30" : ""}`}
                  />
                </div>
                {confirm && confirm !== password && (
                  <p className="text-xs text-destructive">Passwords don't match</p>
                )}
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>This reset link is single-use and expires soon. You'll be signed in after updating.</span>
              </div>

              <Button className="w-full h-12 rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform" type="submit" disabled={loading}>
                {loading ? (<><Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating…</>) : "Update Password"}
              </Button>
            </form>
          </>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
            <p className="text-sm text-muted-foreground">Your password has been changed successfully.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
