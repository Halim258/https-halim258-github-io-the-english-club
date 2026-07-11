import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { lovable } from "@/integrations/lovable/index";

interface Props {
  label?: string;
  className?: string;
}

export function GoogleSignInButton({ label = "Continue with Google", className }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast({
          title: "Google sign-in failed",
          description: result.error.message || "Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      if (result.redirected) return; // browser is navigating away
      // session set — useAuth listener will route the user
    } catch (e) {
      toast({
        title: "Google sign-in failed",
        description: e instanceof Error ? e.message : "Unexpected error",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      aria-label={label}
      className={
        "w-full h-12 rounded-xl text-sm font-semibold gap-2.5 border-2 hover:bg-muted/60 active:scale-[0.98] transition-transform " +
        (className ?? "")
      }
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.9 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 5.9 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.7 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.5 5.9 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.3 0 10.2-2 13.9-5.4l-6.4-5.4C29.3 34.9 26.8 36 24 36c-5.4 0-9.9-3.1-11.3-7.6l-6.5 5C9.6 39.5 16.2 44 24 44z"/>
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.8-3.8 5.1l6.4 5.4C41 34.4 44 29.6 44 24c0-1.2-.1-2.3-.4-3.5z"/>
        </svg>
      )}
      <span>{label}</span>
    </Button>
  );
}