import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, MessageCircle, Send, Trash2, Image, Loader2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  author_name: string;
  liked_by_me: boolean;
}

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  author_name: string;
}

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export default function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const loadPosts = useCallback(async () => {
    const { data: postsData } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (!postsData) { setLoading(false); return; }

    const userIds = [...new Set(postsData.map((p) => p.user_id))];
    const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
    const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name || "Student"]) || []);

    let likedPostIds = new Set<string>();
    if (user) {
      const { data: likes } = await supabase
        .from("community_likes")
        .select("post_id")
        .eq("user_id", user.id);
      likedPostIds = new Set(likes?.map((l) => l.post_id) || []);
    }

    setPosts(
      postsData.map((p) => ({
        ...p,
        author_name: profileMap.get(p.user_id) || "Student",
        liked_by_me: likedPostIds.has(p.id),
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("community-posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "community_posts" }, () => {
        loadPosts();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [loadPosts]);

  const createPost = async () => {
    if (!user) { navigate("/login"); return; }
    if (!newPost.trim() || posting) return;
    setPosting(true);
    const { error } = await supabase.from("community_posts").insert({ user_id: user.id, content: newPost.trim() });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { setNewPost(""); loadPosts(); }
    setPosting(false);
  };

  const toggleLike = async (post: Post) => {
    if (!user) { navigate("/login"); return; }
    if (post.liked_by_me) {
      await supabase.from("community_likes").delete().eq("post_id", post.id).eq("user_id", user.id);
    } else {
      await supabase.from("community_likes").insert({ post_id: post.id, user_id: user.id });
    }
    // Update counts
    const { count } = await supabase.from("community_likes").select("*", { count: "exact", head: true }).eq("post_id", post.id);
    await supabase.from("community_posts").update({ likes_count: count || 0 }).eq("id", post.id);
    loadPosts();
  };

  const loadComments = async (postId: string) => {
    const { data } = await supabase
      .from("community_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (!data) return;
    const userIds = [...new Set(data.map((c) => c.user_id))];
    const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
    const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name || "Student"]) || []);
    setComments((prev) => ({
      ...prev,
      [postId]: data.map((c) => ({ ...c, author_name: profileMap.get(c.user_id) || "Student" })),
    }));
  };

  const toggleComments = (postId: string) => {
    const next = new Set(expandedComments);
    if (next.has(postId)) next.delete(postId);
    else { next.add(postId); loadComments(postId); }
    setExpandedComments(next);
  };

  const addComment = async (postId: string) => {
    if (!user) { navigate("/login"); return; }
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    await supabase.from("community_comments").insert({ post_id: postId, user_id: user.id, content: text });
    // Update count
    const { count } = await supabase.from("community_comments").select("*", { count: "exact", head: true }).eq("post_id", postId);
    await supabase.from("community_posts").update({ comments_count: count || 0 }).eq("id", postId);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    loadComments(postId);
    loadPosts();
  };

  const deletePost = async (postId: string) => {
    await supabase.from("community_posts").delete().eq("id", postId);
    loadPosts();
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-pink-950/20 dark:via-background dark:to-purple-950/20 py-12">
        <div className="container mx-auto px-4">
          <Link to="/" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Home
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">👥</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display">Community</h1>
              <p className="text-muted-foreground mt-1">Share your progress, ask questions & connect with other learners</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Create Post */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder={user ? "What's on your mind? Share your English learning journey! 📝" : "Log in to post..."}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="resize-none min-h-[80px] border-0 p-0 focus-visible:ring-0 text-sm"
                    disabled={!user}
                  />
                  <div className="flex items-center justify-end mt-2">
                    <Button
                      size="sm"
                      className="rounded-full gap-2"
                      onClick={createPost}
                      disabled={!newPost.trim() || posting || !user}
                    >
                      {posting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
              <h2 className="text-xl font-bold font-display mb-2">No posts yet!</h2>
              <p className="text-muted-foreground">Be the first to share something with the community 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        {/* Author */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <User className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm">{post.author_name}</p>
                            <p className="text-[10px] text-muted-foreground">{timeAgo(post.created_at)}</p>
                          </div>
                          {user?.id === post.user_id && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deletePost(post.id)}>
                              <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          )}
                        </div>

                        {/* Content */}
                        <p className="text-sm whitespace-pre-wrap mb-3">{post.content}</p>
                        {post.image_url && (
                          <img src={post.image_url} alt="" className="rounded-xl w-full max-h-80 object-cover mb-3" />
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4 border-t pt-2">
                          <button
                            onClick={() => toggleLike(post)}
                            className={`flex items-center gap-1.5 text-sm transition-colors ${
                              post.liked_by_me ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${post.liked_by_me ? "fill-current" : ""}`} />
                            {post.likes_count > 0 && post.likes_count}
                          </button>
                          <button
                            onClick={() => toggleComments(post.id)}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {post.comments_count > 0 && post.comments_count}
                          </button>
                        </div>

                        {/* Comments */}
                        <AnimatePresence>
                          {expandedComments.has(post.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 border-t pt-3 space-y-2">
                                {(comments[post.id] || []).map((c) => (
                                  <div key={c.id} className="flex items-start gap-2">
                                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                                      <User className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                    <div className="bg-muted/50 rounded-xl px-3 py-1.5 flex-1">
                                      <p className="text-xs font-bold">{c.author_name}</p>
                                      <p className="text-xs">{c.content}</p>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex items-center gap-2 mt-2">
                                  <Input
                                    placeholder="Write a comment..."
                                    value={commentInputs[post.id] || ""}
                                    onChange={(e) => setCommentInputs((p) => ({ ...p, [post.id]: e.target.value }))}
                                    onKeyDown={(e) => e.key === "Enter" && addComment(post.id)}
                                    className="rounded-full text-xs h-8"
                                  />
                                  <Button
                                    size="icon"
                                    className="h-8 w-8 rounded-full shrink-0"
                                    onClick={() => addComment(post.id)}
                                    disabled={!commentInputs[post.id]?.trim()}
                                  >
                                    <Send className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
