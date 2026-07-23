import { Link } from "react-router-dom";
import { Clock, MessageCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function PendingApproval() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-10 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Clock className="h-8 w-8 text-primary" />
      </div>
      <h1 className="mb-3 font-display text-2xl font-semibold">Membership pending approval</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Thanks for signing up! To unlock the courses, you need to become a member of
        The English Club. Contact us on WhatsApp to complete your enrollment — an admin
        will approve your account right after payment is confirmed.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full">
          <a href="https://wa.me/201554901390" target="_blank" rel="noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact us on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-3 w-3" /> Sign out
      </button>
      <p className="mt-6 text-xs text-muted-foreground/70">
        Already approved? Refresh the page after the admin confirms your membership.
      </p>
    </div>
  );
}