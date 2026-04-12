import { useState } from "react";
import { Send, Users, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const notifTypes = [
  { value: "info", label: "ℹ️ Info" },
  { value: "tip", label: "💡 Tip" },
  { value: "achievement", label: "🏆 Achievement" },
  { value: "lesson", label: "📚 Lesson" },
  { value: "streak", label: "🔥 Streak" },
];

export default function AdminBulkNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [link, setLink] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Title and message are required.");
      return;
    }

    setSending(true);
    try {
      // Get all user IDs from user_roles
      const { data: users, error: usersErr } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "student");

      if (usersErr) throw usersErr;
      if (!users || users.length === 0) {
        toast.error("No students found.");
        setSending(false);
        return;
      }

      const notifications = users.map((u) => ({
        user_id: u.user_id,
        title: title.trim(),
        message: message.trim(),
        type,
        link: link.trim() || null,
        read: false,
      }));

      // Insert in batches of 100
      for (let i = 0; i < notifications.length; i += 100) {
        const batch = notifications.slice(i, i + 100);
        const { error } = await supabase.from("notifications").insert(batch);
        if (error) throw error;
      }

      toast.success(`✅ Sent to ${users.length} students!`);
      setSent(true);
      setTitle("");
      setMessage("");
      setLink("");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to send notifications.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold font-display">Bulk Notifications</h3>
      </div>
      <p className="text-sm text-muted-foreground">Send a notification to all students at once.</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
          <Input
            placeholder="e.g. New Course Available!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Message</label>
          <Textarea
            placeholder="Write your notification message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
            <div className="flex flex-wrap gap-1.5">
              {notifTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    type === t.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Link (optional)</label>
            <Input
              placeholder="/courses or /leaderboard"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>

        <Button
          onClick={handleSend}
          disabled={sending || !title.trim() || !message.trim()}
          className="rounded-full gap-2 w-full"
        >
          {sending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send to All Students
            </>
          )}
        </Button>

        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4" />
              Notifications sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
