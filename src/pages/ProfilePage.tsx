import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, BarChart3, BookOpen, Flame, Zap, Award, Trophy, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Stats
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [badges, setBadges] = useState(0);
  const [memberSince, setMemberSince] = useState("");

  useEffect(() => {
    if (!user) return;
    async function load() {
      const [profileRes, progressRes, xpRes, achieveRes] = await Promise.all([
        supabase.from("profiles").select("full_name, avatar_url, created_at").eq("id", user!.id).single(),
        supabase.from("lesson_progress").select("id").eq("user_id", user!.id).eq("completed", true),
        supabase.from("user_xp").select("total_xp, current_streak, longest_streak").eq("user_id", user!.id).maybeSingle(),
        supabase.from("achievements").select("id").eq("user_id", user!.id),
      ]);

      if (profileRes.data) {
        setFullName(profileRes.data.full_name || "");
        setAvatarUrl(profileRes.data.avatar_url);
        setMemberSince(new Date(profileRes.data.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" }));
      }
      setLessonsCompleted(progressRes.data?.length || 0);
      if (xpRes.data) {
        setTotalXp(xpRes.data.total_xp);
        setCurrentStreak(xpRes.data.current_streak);
        setLongestStreak(xpRes.data.longest_streak);
      }
      setBadges(achieveRes.data?.length || 0);
      setLoading(false);
    }
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null, updated_at: new Date().toISOString() })
      .eq("id", user.id);
    if (error) {
      toast.error("Failed to save profile.");
    } else {
      toast.success("Profile updated!");
    }
    setSaving(false);
  };

  const stats = [
    { icon: BookOpen, label: "Lessons Done", value: lessonsCompleted, color: "text-primary" },
    { icon: Zap, label: "Total XP", value: totalXp.toLocaleString(), color: "text-amber-500" },
    { icon: Flame, label: "Current Streak", value: `${currentStreak}d`, color: "text-orange-500" },
    { icon: Trophy, label: "Best Streak", value: `${longestStreak}d`, color: "text-emerald-500" },
    { icon: Award, label: "Badges", value: badges, color: "text-violet-500" },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 pb-24 md:pb-10 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold font-display mb-6">My Profile</h1>
      </motion.div>

      {/* Profile card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border bg-card p-6 shadow-soft mb-6"
      >
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-2xl font-bold font-display text-primary">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-20 w-20 rounded-2xl object-cover" />
              ) : (
                initials
              )}
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="space-y-3 max-w-sm">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Display Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your name"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                <Input value={user?.email || ""} disabled className="rounded-xl bg-muted/50" />
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleSave} disabled={saving} size="sm" className="rounded-full gap-1.5">
                  <Save className="h-3.5 w-3.5" /> {saving ? "Saving..." : "Save"}
                </Button>
                <span className="text-[10px] text-muted-foreground">Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h2 className="text-sm font-semibold font-display flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" /> Learning Stats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="rounded-2xl border bg-card p-4 shadow-soft text-center"
            >
              <s.icon className={`h-5 w-5 mx-auto mb-1.5 ${s.color}`} />
              <p className="text-xl font-bold font-display">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold font-display mb-3">Quick Links</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            { to: "/progress", label: "My Progress", icon: BarChart3 },
            { to: "/achievements", label: "Achievements", icon: Award },
            { to: "/bookmarks", label: "Bookmarks", icon: PenLine },
            { to: "/notifications", label: "Notifications", icon: User },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center gap-3 rounded-xl border bg-card p-3 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <l.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium group-hover:text-primary transition-colors">{l.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
