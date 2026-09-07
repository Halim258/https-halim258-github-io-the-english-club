import { useEffect, useState } from "react";
import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const SNOOZE_KEY = "phone-prompt-snoozed-until";
const PHONE_RE = /^[+0-9][0-9\s()-]{6,19}$/;

/** Asks existing members who have no phone number on file to add one. */
export default function PhonePrompt() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;
    const snoozed = Number(localStorage.getItem(SNOOZE_KEY) || 0);
    if (snoozed && Date.now() < snoozed) return;

    (async () => {
      const { data } = await supabase.from("profiles").select("phone").eq("id", user.id).maybeSingle();
      if (cancelled) return;
      if (!data?.phone || !data.phone.trim()) setOpen(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, loading]);

  const snooze = () => {
    localStorage.setItem(SNOOZE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    setOpen(false);
  };

  const save = async () => {
    const value = phone.trim();
    if (!PHONE_RE.test(value)) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!user) return;
    setSaving(true);
    const { error: err } = await supabase
      .from("profiles")
      .update({ phone: value, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    setSaving(false);
    if (err) {
      setError("We could not save it. Please try again.");
      return;
    }
    toast({ title: "Phone number saved", description: "Thank you — we can now reach you about your classes." });
    localStorage.removeItem(SNOOZE_KEY);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : snooze())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" /> Add your phone number
          </DialogTitle>
          <DialogDescription>
            We use it to contact you about your classes, schedule changes and results on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="prompt-phone">Phone number</Label>
          <Input
            id="prompt-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError(null);
            }}
            placeholder="+20 100 000 0000"
            aria-invalid={!!error}
            onKeyDown={(e) => {
              if (e.key === "Enter") void save();
            }}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={snooze} disabled={saving}>
            Later
          </Button>
          <Button onClick={save} disabled={saving} className="gap-1.5">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Save number
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
