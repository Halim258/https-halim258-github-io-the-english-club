import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Send, Users, User, Trash2, Search, Filter, Sparkles, Flame, Trophy, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NotificationRow {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string | null;
}

const typeOptions = [
  { value: "info", label: "Info", icon: Info },
  { value: "achievement", label: "Achievement", icon: Trophy },
  { value: "lesson", label: "Lesson", icon: BookOpen },
  { value: "streak", label: "Streak", icon: Flame },
  { value: "tip", label: "Tip", icon: Sparkles },
];

const typeColors: Record<string, string> = {
  achievement: "bg-amber-500/10 text-amber-600",
  lesson: "bg-primary/10 text-primary",
  streak: "bg-orange-500/10 text-orange-600",
  tip: "bg-violet-500/10 text-violet-600",
  info: "bg-blue-500/10 text-blue-600",
};

export default function AdminNotifications() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [target, setTarget] = useState<"all" | "single">("all");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [recentNotifications, setRecentNotifications] = useState<NotificationRow[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [usersRes, notifRes] = await Promise.all([
        supabase.from("profiles").select("id, full_name").order("full_name"),
        supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(50),
      ]);
      setUsers(usersRes.data || []);
      setRecentNotifications((notifRes.data as NotificationRow[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Title and message are required.", variant: "destructive" });
      return;
    }

    setSending(true);

    if (target === "single") {
      if (!selectedUserId) {
        toast({ title: "No user selected", description: "Please select a user to send to.", variant: "destructive" });
        setSending(false);
        return;
      }
      const { error } = await supabase.from("notifications").insert({
        user_id: selectedUserId,
        title, message, type,
      });
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Sent! ✅", description: "Notification sent to user." });
      }
    } else {
      // Send to all users
      const rows = users.map(u => ({ user_id: u.id, title, message, type }));
      if (rows.length === 0) {
        toast({ title: "No users", description: "No users found to notify.", variant: "destructive" });
        setSending(false);
        return;
      }
      // Batch insert in chunks of 100
      for (let i = 0; i < rows.length; i += 100) {
        const chunk = rows.slice(i, i + 100);
        await supabase.from("notifications").insert(chunk);
      }
      toast({ title: "Broadcast sent! 📢", description: `Notification sent to ${rows.length} users.` });
    }

    // Refresh
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
    setRecentNotifications((data as NotificationRow[]) || []);
    setTitle("");
    setMessage("");
    setSending(false);
  };

  const deleteNotif = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setRecentNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredUsers = users.filter(u =>
    (u.full_name || "").toLowerCase().includes(searchUser.toLowerCase())
  );

  const getUserName = (userId: string) => {
    return users.find(u => u.id === userId)?.full_name || "Unknown";
  };

  if (loading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Send Notification */}
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-5">
          <Send className="h-4 w-4 text-primary" />
          Send Notification
        </h2>

        <div className="space-y-4">
          {/* Target */}
          <div className="flex gap-2">
            <Button
              variant={target === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs flex-1"
              onClick={() => setTarget("all")}
            >
              <Users className="h-3.5 w-3.5 mr-1.5" />
              All Users ({users.length})
            </Button>
            <Button
              variant={target === "single" ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs flex-1"
              onClick={() => setTarget("single")}
            >
              <User className="h-3.5 w-3.5 mr-1.5" />
              Single User
            </Button>
          </div>

          {/* User picker */}
          {target === "single" && (
            <div className="space-y-2">
              <Label className="text-xs font-medium">Select User</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="pl-9 h-9 rounded-lg text-xs"
                />
              </div>
              <div className="max-h-32 overflow-y-auto rounded-lg border divide-y">
                {filteredUsers.slice(0, 20).map(u => (
                  <button
                    key={u.id}
                    onClick={() => { setSelectedUserId(u.id); setSearchUser(u.full_name || ""); }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-muted/50 transition-colors ${
                      selectedUserId === u.id ? "bg-primary/5 text-primary font-semibold" : ""
                    }`}
                  >
                    {u.full_name || "Unnamed"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Type */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Type</Label>
            <div className="flex gap-1.5 flex-wrap">
              {typeOptions.map(t => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                    type === t.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <t.icon className="h-3 w-3" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title..."
              className="h-9 rounded-lg text-sm"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              rows={3}
              className="rounded-lg text-sm resize-none"
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={sending || !title.trim() || !message.trim()}
            className="w-full rounded-xl font-semibold"
          >
            {sending ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            {target === "all" ? `Send to All (${users.length})` : "Send to User"}
          </Button>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="rounded-2xl border bg-card p-6 shadow-soft">
        <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-4">
          <Bell className="h-4 w-4 text-primary" />
          Recent Notifications
          <span className="text-xs text-muted-foreground font-normal">({recentNotifications.length})</span>
        </h2>

        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {recentNotifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No notifications sent yet.</p>
          ) : (
            recentNotifications.map(n => (
              <div key={n.id} className="flex items-start gap-3 rounded-xl border p-3 group hover:bg-muted/20 transition-colors">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${typeColors[n.type] || typeColors.info}`}>
                  {(() => {
                    const T = typeOptions.find(t => t.value === n.type)?.icon || Info;
                    return <T className="h-3.5 w-3.5" />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold truncate">{n.title}</p>
                    {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                    To: {getUserName(n.user_id)} · {new Date(n.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <button
                  onClick={() => deleteNotif(n.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
