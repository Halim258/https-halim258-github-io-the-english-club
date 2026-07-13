import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Plus, Search, Users, ArrowLeft, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Profile { id: string; full_name: string | null; avatar_url: string | null; }
interface Conversation {
  id: string;
  title: string | null;
  is_group: boolean;
  last_message_at: string;
  created_by: string;
}
interface Member { conversation_id: string; user_id: string; }
interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

function initials(name: string | null | undefined) {
  if (!name) return "?";
  return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
}
function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  if (m < 1440) return `${Math.floor(m / 60)}h`;
  return `${Math.floor(m / 1440)}d`;
}

export default function Messages() {
  const { user } = useAuth();
  const { conversationId } = useParams<{ conversationId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load conversations + members
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: mine } = await supabase
        .from("conversation_members")
        .select("conversation_id")
        .eq("user_id", user.id);
      const convIds = (mine || []).map(m => m.conversation_id);
      if (convIds.length === 0) { setConversations([]); setLoading(false); return; }

      const [{ data: convs }, { data: allMembers }] = await Promise.all([
        supabase.from("conversations").select("*").in("id", convIds).order("last_message_at", { ascending: false }),
        supabase.from("conversation_members").select("conversation_id, user_id").in("conversation_id", convIds),
      ]);
      setConversations((convs || []) as Conversation[]);
      setMembers((allMembers || []) as Member[]);

      const userIds = Array.from(new Set((allMembers || []).map(m => m.user_id)));
      if (userIds.length) {
        const { data: ps } = await supabase.rpc("get_public_profiles", { _user_ids: userIds });
        const map: Record<string, Profile> = {};
        (ps as Profile[] || []).forEach(p => { map[p.id] = p; });
        setProfiles(map);
      }
      setLoading(false);
    })();
  }, [user]);

  // Realtime: new conversations / bumped last_message_at
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel("conversations-user")
      .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, async (payload) => {
        const row = (payload.new || payload.old) as Conversation;
        // Only care about ones we are a member of
        const { data } = await supabase.from("conversation_members").select("user_id").eq("conversation_id", row.id).eq("user_id", user.id).maybeSingle();
        if (!data) return;
        setConversations(prev => {
          const other = prev.filter(c => c.id !== row.id);
          if (payload.eventType === "DELETE") return other;
          return [payload.new as Conversation, ...other].sort((a, b) => +new Date(b.last_message_at) - +new Date(a.last_message_at));
        });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  // Load messages for active conversation
  useEffect(() => {
    if (!conversationId) { setMessages([]); return; }
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .limit(200);
      setMessages((data || []) as Message[]);
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }), 50);

      // update last_read_at
      if (user) {
        await supabase.from("conversation_members")
          .update({ last_read_at: new Date().toISOString() })
          .eq("conversation_id", conversationId)
          .eq("user_id", user.id);
      }
    })();
  }, [conversationId, user]);

  // Realtime: new messages in active conversation
  useEffect(() => {
    if (!conversationId) return;
    const ch = supabase
      .channel(`messages-${conversationId}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages(prev => {
            const m = payload.new as Message;
            if (prev.some(x => x.id === m.id)) return prev;
            return [...prev, m];
          });
          setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);
        })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [conversationId]);

  const activeConv = conversations.find(c => c.id === conversationId);
  const activeMembers = members.filter(m => m.conversation_id === conversationId);

  function convDisplay(c: Conversation): { name: string; sub: string; avatar: string | null } {
    if (c.is_group) {
      const names = members.filter(m => m.conversation_id === c.id).map(m => profiles[m.user_id]?.full_name || "…").slice(0, 3).join(", ");
      return { name: c.title || "Group", sub: names, avatar: null };
    }
    const other = members.find(m => m.conversation_id === c.id && m.user_id !== user?.id);
    const p = other ? profiles[other.user_id] : null;
    return { name: p?.full_name || "Direct message", sub: "", avatar: p?.avatar_url ?? null };
  }

  async function sendMessage() {
    if (!input.trim() || !conversationId || !user || sending) return;
    setSending(true);
    const content = input.trim();
    setInput("");
    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      content,
    });
    if (error) {
      toast({ title: "Failed to send", description: error.message, variant: "destructive" });
      setInput(content);
    }
    setSending(false);
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-0 md:px-4 py-0 md:py-6 pb-20 md:pb-6 max-w-6xl">
      <div className="md:rounded-2xl md:border md:shadow-soft overflow-hidden bg-card">
        <div className="grid md:grid-cols-[320px_1fr] min-h-[calc(100vh-8rem)] md:min-h-[70vh]">
          {/* Sidebar */}
          <aside className={`border-r bg-card ${conversationId ? "hidden md:block" : "block"}`}>
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-lg font-display font-bold flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" /> Messages
              </h1>
              <Dialog open={showNew} onOpenChange={setShowNew}>
                <DialogTrigger asChild>
                  <Button size="sm" className="rounded-full h-8 gap-1"><Plus className="h-3.5 w-3.5" /> New</Button>
                </DialogTrigger>
                <NewChatDialog
                  onCreated={(id) => { setShowNew(false); navigate(`/messages/${id}`); }}
                  currentUserId={user.id}
                />
              </Dialog>
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-14rem)]">
              {loading ? (
                <p className="p-6 text-sm text-muted-foreground text-center">Loading…</p>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No conversations yet</p>
                  <Button size="sm" className="mt-3 rounded-full" onClick={() => setShowNew(true)}>Start one</Button>
                </div>
              ) : conversations.map(c => {
                const info = convDisplay(c);
                const isActive = c.id === conversationId;
                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/messages/${c.id}`)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-b hover:bg-muted/40 transition-colors text-left ${isActive ? "bg-primary/5" : ""}`}
                  >
                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-sm font-semibold text-primary overflow-hidden">
                      {info.avatar ? <img src={info.avatar} alt="" className="h-full w-full object-cover" /> : c.is_group ? <Users className="h-4 w-4" /> : initials(info.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">{info.name}</p>
                        <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(c.last_message_at)}</span>
                      </div>
                      {info.sub && <p className="text-xs text-muted-foreground truncate">{info.sub}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Chat window */}
          <section className={`flex flex-col ${conversationId ? "flex" : "hidden md:flex"}`}>
            {!conversationId ? (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <MessageCircle className="h-14 w-14 text-muted-foreground/20 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Select a conversation to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                <header className="flex items-center gap-3 px-4 py-3 border-b bg-card/60 backdrop-blur">
                  <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={() => navigate("/messages")}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  {activeConv && (() => {
                    const info = convDisplay(activeConv);
                    return (
                      <>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden">
                          {info.avatar ? <img src={info.avatar} alt="" className="h-full w-full object-cover" /> : activeConv.is_group ? <Users className="h-4 w-4" /> : initials(info.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{info.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{activeConv.is_group ? `${activeMembers.length} members` : "Direct message"}</p>
                        </div>
                      </>
                    );
                  })()}
                </header>

                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-muted/10">
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => {
                      const mine = m.sender_id === user.id;
                      const sender = profiles[m.sender_id];
                      const prev = messages[i - 1];
                      const showSender = !mine && activeConv?.is_group && (!prev || prev.sender_id !== m.sender_id);
                      return (
                        <motion.div
                          key={m.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${mine ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-[78%] ${mine ? "items-end" : "items-start"} flex flex-col`}>
                            {showSender && <span className="text-[10px] text-muted-foreground px-3 pb-0.5">{sender?.full_name || "Unknown"}</span>}
                            <div className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed break-words ${
                              mine ? "bg-primary text-primary-foreground rounded-br-md" : "bg-card border rounded-bl-md"
                            }`}>
                              {m.content}
                            </div>
                            <span className="text-[10px] text-muted-foreground/70 px-2 pt-0.5">{new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {messages.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-10">No messages yet — say hi 👋</p>
                  )}
                </div>

                <form
                  onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                  className="flex items-center gap-2 border-t p-3 bg-card"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="rounded-full h-10"
                    maxLength={4000}
                  />
                  <Button type="submit" size="icon" disabled={!input.trim() || sending} className="rounded-full h-10 w-10 shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function NewChatDialog({ onCreated, currentUserId }: { onCreated: (id: string) => void; currentUserId: string; }) {
  const { toast } = useToast();
  const [tab, setTab] = useState<"direct" | "group">("direct");
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("profiles").select("id, full_name, avatar_url").order("full_name").limit(200);
      setUsers(((data || []) as Profile[]).filter(u => u.id !== currentUserId));
    })();
  }, [currentUserId]);

  const filtered = useMemo(
    () => users.filter(u => (u.full_name || "").toLowerCase().includes(q.toLowerCase())),
    [users, q]
  );

  async function startDirect(otherId: string) {
    setCreating(true);
    const { data, error } = await supabase.rpc("get_or_create_direct_conversation", { _other_user: otherId });
    setCreating(false);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    onCreated(data as string);
  }

  async function createGroup() {
    if (!groupTitle.trim() || selected.length === 0) return;
    setCreating(true);
    const { data, error } = await supabase.rpc("create_group_conversation", {
      _title: groupTitle.trim(),
      _member_ids: selected,
    });
    setCreating(false);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    onCreated(data as string);
  }

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>New conversation</DialogTitle>
      </DialogHeader>
      <div className="flex gap-2 mb-3">
        <Button size="sm" variant={tab === "direct" ? "default" : "outline"} className="rounded-full flex-1" onClick={() => setTab("direct")}>Direct</Button>
        <Button size="sm" variant={tab === "group" ? "default" : "outline"} className="rounded-full flex-1" onClick={() => setTab("group")}><Users className="h-3.5 w-3.5 mr-1" />Group</Button>
      </div>

      {tab === "group" && (
        <Input placeholder="Group name…" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} className="mb-2" maxLength={100} />
      )}

      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="pl-9 h-9" />
      </div>

      <div className="max-h-64 overflow-y-auto border rounded-lg divide-y">
        {filtered.length === 0 ? (
          <p className="p-4 text-xs text-muted-foreground text-center">No users found</p>
        ) : filtered.slice(0, 100).map(u => {
          const isSel = selected.includes(u.id);
          return (
            <button
              key={u.id}
              disabled={creating}
              onClick={() => {
                if (tab === "direct") startDirect(u.id);
                else setSelected(s => isSel ? s.filter(x => x !== u.id) : [...s, u.id]);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-muted/40 text-left disabled:opacity-50 ${tab === "group" && isSel ? "bg-primary/5" : ""}`}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden">
                {u.avatar_url ? <img src={u.avatar_url} alt="" className="h-full w-full object-cover" /> : initials(u.full_name)}
              </div>
              <span className="text-sm flex-1 truncate">{u.full_name || "Unnamed"}</span>
              {tab === "group" && isSel && <Check className="h-4 w-4 text-primary" />}
            </button>
          );
        })}
      </div>

      {tab === "group" && (
        <Button disabled={creating || !groupTitle.trim() || selected.length === 0} onClick={createGroup} className="w-full rounded-full mt-3">
          Create group ({selected.length})
        </Button>
      )}
    </DialogContent>
  );
}