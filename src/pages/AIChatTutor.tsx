import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Send, Bot, User, Loader2, Mic, MicOff, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useTTS } from "@/hooks/useTTS";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const scenarios = [
  { label: "🛒 At the Shop", prompt: "Let's practice a conversation at a grocery store. You are the shopkeeper." },
  { label: "✈️ At the Airport", prompt: "Let's practice a conversation at an airport check-in counter. You are the airline agent." },
  { label: "🍽️ At a Restaurant", prompt: "Let's practice ordering food at a restaurant. You are the waiter." },
  { label: "🏨 Hotel Check-in", prompt: "Let's practice checking into a hotel. You are the receptionist." },
  { label: "💼 Job Interview", prompt: "Let's practice a job interview. You are the interviewer." },
  { label: "🏥 At the Doctor", prompt: "Let's practice visiting a doctor. You are the doctor." },
  { label: "💬 Free Chat", prompt: "Let's have a free conversation in English. Help me practice." },
];

export default function AIChatTutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { speak } = useTTS();
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const toggleListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const systemPrompt = `You are a friendly English tutor helping Arabic-speaking students practice English. 
Keep responses short (2-4 sentences). After each response:
1. Correct any grammar/spelling mistakes the student made (if any)
2. Suggest a better way to say it (if applicable)  
3. Continue the conversation naturally
Use simple English appropriate for the student's level. Add emoji to make it fun. 
If starting a scenario, set the scene briefly then begin the roleplay.`;

      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          systemPrompt,
        },
      });

      if (error) throw error;
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, I couldn't respond. Please try again! 😊" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startScenario = (s: typeof scenarios[0]) => {
    setScenario(s.label);
    setMessages([]);
    sendMessage(s.prompt);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-950/20 dark:via-background dark:to-blue-950/20 py-8">
        <div className="container mx-auto px-4">
          <Link to="/courses" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" /> Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">🤖</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">AI Chat Tutor</h1>
              <p className="text-muted-foreground text-sm">Practice English conversations with AI — get instant corrections</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-1 container mx-auto px-4 max-w-2xl py-4 flex flex-col">
        {messages.length === 0 && !scenario ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <Bot className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h2 className="text-lg font-bold font-display mb-2">Choose a Scenario</h2>
            <p className="text-sm text-muted-foreground mb-6">Pick a situation to practice, or start free chatting</p>
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
              {scenarios.map((s) => (
                <Button
                  key={s.label}
                  variant="outline"
                  className="rounded-xl h-auto py-3 text-sm"
                  onClick={() => startScenario(s)}
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {scenario && (
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="rounded-full">{scenario}</Badge>
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => { setMessages([]); setScenario(null); }}>
                  New Scenario
                </Button>
              </div>
            )}
            <ScrollArea className="flex-1 max-h-[50vh] pr-2" ref={scrollRef}>
              <div className="space-y-3 py-2">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border rounded-bl-sm"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>
                      {m.role === "assistant" && (
                        <button
                          onClick={() => speak(m.content)}
                          className="mt-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    {m.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-card border rounded-2xl px-4 py-3 rounded-bl-sm">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}

        {/* Input */}
        <div className="mt-4 flex items-center gap-2 border-t pt-4">
          <Button
            variant={listening ? "default" : "outline"}
            size="icon"
            className="rounded-full shrink-0"
            onClick={toggleListening}
          >
            {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Input
            placeholder="Type your message in English..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="rounded-full"
            disabled={loading}
          />
          <Button
            size="icon"
            className="rounded-full shrink-0"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
