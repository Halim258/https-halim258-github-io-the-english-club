import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, BookOpen, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "teacher";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

    // If teacher, update profile with youtube URL and set role
    if (signupData.user && role === "teacher") {
      await supabase.from("profiles").update({ youtube_intro_url: youtubeUrl }).eq("id", signupData.user.id);
      // Update the auto-created student role to teacher
      await supabase.from("user_roles").update({ role: "teacher" }).eq("user_id", signupData.user.id);
    }

    toast({ title: "Account created! 🎉", description: "You can now log in." });
    navigate("/login");
  };

  const handleGoogleSignup = async () => {
    if (role === "teacher" && !youtubeUrl.trim()) {
      toast({ title: "YouTube link required", description: "Please add your video introduction first, then sign up with Google.", variant: "destructive" });
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });

      if (result.error) {
        toast({ title: "Google signup failed", description: String(result.error), variant: "destructive" });
        setGoogleLoading(false);
        return;
      }

      if (result.redirected) return;

      // After Google auth, update role and profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        if (role === "teacher") {
          await supabase.from("user_roles").update({ role: "teacher" }).eq("user_id", user.id);
          await supabase.from("profiles").update({ youtube_intro_url: youtubeUrl }).eq("id", user.id);
          navigate("/teacher-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch {
      toast({ title: "Google signup failed", description: "Something went wrong", variant: "destructive" });
    }
    setGoogleLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-display">Join The English Club</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start your English learning journey</p>
        </div>

        {/* Role selector */}
        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all ${
              role === "student"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <BookOpen className={`h-6 w-6 ${role === "student" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-semibold ${role === "student" ? "text-primary" : "text-muted-foreground"}`}>
              Student
            </span>
            <span className="text-[10px] text-muted-foreground">I want to learn</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all ${
              role === "teacher"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            <Users className={`h-6 w-6 ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`} />
            <span className={`text-sm font-semibold ${role === "teacher" ? "text-primary" : "text-muted-foreground"}`}>
              Teacher
            </span>
            <span className="text-[10px] text-muted-foreground">I want to teach</span>
          </button>
        </div>

        {/* Google Sign Up */}
        <Button
          variant="outline"
          className="w-full mb-4 gap-2 rounded-xl h-11"
          onClick={handleGoogleSignup}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          )}
          Sign up with Google
        </Button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required />
          </div>

          {/* YouTube intro for teachers */}
          {role === "teacher" && (
            <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4">
              <Label htmlFor="youtube" className="flex items-center gap-1.5 text-primary font-semibold mb-2">
                🎥 Video Introduction
              </Label>
              <p className="text-xs text-muted-foreground mb-2">
                Add a YouTube link introducing yourself as a teacher. Students will see this on your profile.
              </p>
              <Input
                id="youtube"
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                required={role === "teacher"}
              />
            </div>
          )}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Create {role === "teacher" ? "Teacher" : "Student"} Account
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
