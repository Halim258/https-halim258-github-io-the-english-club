import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Phone, PhoneOff, Users, Clock, Shuffle,
  Volume2, VolumeX, MessageCircle, Sparkles, Globe2, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";

const CALL_DURATION = 5 * 60; // 5 minutes in seconds
const TOPICS = [
  "What's your favorite hobby?",
  "Describe your perfect weekend.",
  "What's the best movie you've seen recently?",
  "If you could travel anywhere, where would you go?",
  "What do you like about learning English?",
  "Tell me about your family.",
  "What's your dream job?",
  "Describe your favorite food.",
  "What music do you listen to?",
  "If you could meet anyone, who would it be?",
  "What's the most interesting thing you learned this week?",
  "Describe your city or town.",
  "What are you afraid of?",
  "What makes you happy?",
  "Tell me about a memorable trip.",
];

type Status = "idle" | "searching" | "connecting" | "connected" | "ended";

export default function PracticeSpeaking() {
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState(CALL_DURATION);
  const [muted, setMuted] = useState(false);
  const [topic, setTopic] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [partnerId, setPartnerId] = useState<string | null>(null);

  const localStream = useRef<MediaStream | null>(null);
  const remoteAudio = useRef<HTMLAudioElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const myId = useRef(crypto.randomUUID());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pick a random topic
  const pickTopic = () => setTopic(TOPICS[Math.floor(Math.random() * TOPICS.length)]);

  // Clean up everything
  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    peerConnection.current?.close();
    peerConnection.current = null;
    localStream.current?.getTracks().forEach((t) => t.stop());
    localStream.current = null;
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setPartnerId(null);
  }, []);

  // Start searching for a partner
  const startSearching = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.current = stream;
    } catch {
      alert("Microphone access is required for speaking practice.");
      return;
    }

    pickTopic();
    setStatus("searching");
    setTimeLeft(CALL_DURATION);
    myId.current = crypto.randomUUID();

    // Join a Supabase Realtime channel for matching
    const channel = supabase.channel("practice-queue", {
      config: { presence: { key: myId.current } },
    });

    channelRef.current = channel;

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        const users = Object.keys(state);
        setOnlineCount(users.length);

        // If there are exactly 2 users and I'm the "lower" ID, I initiate
        if (users.length >= 2 && status === "searching") {
          const sorted = users.sort();
          const otherUser = sorted.find((u) => u !== myId.current);
          if (otherUser && sorted[0] === myId.current) {
            // I'm the initiator
            initiateCall(otherUser);
          }
        }
      })
      .on("broadcast", { event: "webrtc" }, async ({ payload }) => {
        if (payload.to !== myId.current) return;
        await handleSignaling(payload);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user_id: myId.current, joined_at: Date.now() });
        }
      });
  };

  // Initiate a WebRTC call
  const initiateCall = async (targetId: string) => {
    setStatus("connecting");
    setPartnerId(targetId);

    const pc = createPeerConnection(targetId);
    peerConnection.current = pc;

    // Add local audio tracks
    localStream.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current!);
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    channelRef.current?.send({
      type: "broadcast",
      event: "webrtc",
      payload: { type: "offer", sdp: offer.sdp, from: myId.current, to: targetId },
    });
  };

  // Handle incoming WebRTC signals
  const handleSignaling = async (payload: any) => {
    if (payload.type === "offer") {
      setStatus("connecting");
      setPartnerId(payload.from);

      const pc = createPeerConnection(payload.from);
      peerConnection.current = pc;

      localStream.current?.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current!);
      });

      await pc.setRemoteDescription(new RTCSessionDescription({ type: "offer", sdp: payload.sdp }));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      channelRef.current?.send({
        type: "broadcast",
        event: "webrtc",
        payload: { type: "answer", sdp: answer.sdp, from: myId.current, to: payload.from },
      });
    } else if (payload.type === "answer") {
      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp: payload.sdp })
      );
    } else if (payload.type === "ice-candidate") {
      await peerConnection.current?.addIceCandidate(new RTCIceCandidate(payload.candidate));
    } else if (payload.type === "hangup") {
      endCall();
    }
  };

  // Create a peer connection
  const createPeerConnection = (targetId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        channelRef.current?.send({
          type: "broadcast",
          event: "webrtc",
          payload: {
            type: "ice-candidate",
            candidate: e.candidate.toJSON(),
            from: myId.current,
            to: targetId,
          },
        });
      }
    };

    pc.ontrack = (e) => {
      if (remoteAudio.current) {
        remoteAudio.current.srcObject = e.streams[0];
        remoteAudio.current.play().catch(() => {});
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "connected") {
        setStatus("connected");
        // Untrack from queue so others can match
        channelRef.current?.untrack();
        startTimer();
      } else if (pc.connectionState === "disconnected" || pc.connectionState === "failed") {
        endCall();
      }
    };

    return pc;
  };

  // Timer
  const startTimer = () => {
    setTimeLeft(CALL_DURATION);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // End call
  const endCall = useCallback(() => {
    if (partnerId && channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "webrtc",
        payload: { type: "hangup", from: myId.current, to: partnerId },
      });
    }
    cleanup();
    setStatus("ended");
  }, [partnerId, cleanup]);

  // Toggle mute
  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
      setMuted(!muted);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="overflow-x-hidden">
      <audio ref={remoteAudio} autoPlay playsInline />

      {/* Hero */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-60" />
        <span className="absolute right-8 top-8 text-[120px] opacity-[0.06] select-none pointer-events-none">🗣️</span>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center shadow-sm">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display">Practice Speaking</h1>
                <p className="text-sm text-muted-foreground mt-1">Random voice calls with other learners</p>
              </div>
            </div>
            <p className="max-w-xl text-muted-foreground mt-2">
              Get matched with a random English learner for a 5-minute voice call. Practice speaking, build confidence, and make friends — just like Lingbe!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Area */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-lg">
          {/* Call Card */}
          <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-soft text-center">
            <AnimatePresence mode="wait">
              {/* IDLE */}
              {status === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-4"
                    >
                      <Phone className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h2 className="text-xl font-bold font-display">Ready to Practice?</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      You'll be matched with another learner for a 5-minute voice call.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full px-10 font-semibold font-display text-base h-12 w-full max-w-xs"
                    onClick={startSearching}
                  >
                    <Shuffle className="mr-2 h-5 w-5" /> Find a Partner
                  </Button>
                </motion.div>
              )}

              {/* SEARCHING */}
              {status === "searching" && (
                <motion.div key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <div className="relative inline-flex h-24 w-24 items-center justify-center mb-4">
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-primary/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-2 rounded-full border-4 border-primary/20"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shuffle className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold font-display">Searching for a partner...</h2>
                    <p className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
                      <Users className="h-4 w-4" />
                      {onlineCount} {onlineCount === 1 ? "person" : "people"} online
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full font-semibold"
                    onClick={() => { cleanup(); setStatus("idle"); }}
                  >
                    Cancel
                  </Button>
                </motion.div>
              )}

              {/* CONNECTING */}
              {status === "connecting" && (
                <motion.div key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/10 mb-4"
                    >
                      <Zap className="h-10 w-10 text-emerald-500" />
                    </motion.div>
                    <h2 className="text-xl font-bold font-display">Connecting...</h2>
                    <p className="text-sm text-muted-foreground mt-2">Setting up your voice call</p>
                  </div>
                </motion.div>
              )}

              {/* CONNECTED */}
              {status === "connected" && (
                <motion.div key="connected" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Timer */}
                  <div className="mb-6">
                    <div className={`inline-flex h-24 w-24 items-center justify-center rounded-full mb-4 ${
                      timeLeft <= 60 ? "bg-destructive/10" : "bg-emerald-500/10"
                    }`}>
                      <Clock className={`h-6 w-6 mr-1 ${timeLeft <= 60 ? "text-destructive" : "text-emerald-500"}`} />
                      <span className={`text-2xl font-bold font-display ${timeLeft <= 60 ? "text-destructive" : "text-emerald-500"}`}>
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold font-display text-emerald-600">Connected!</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      You're speaking with a partner
                    </p>
                  </div>

                  {/* Topic */}
                  <div className="rounded-xl border bg-muted/30 p-4 mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-primary mb-1">Conversation Topic</p>
                    <p className="text-sm font-medium">{topic}</p>
                    <button onClick={pickTopic} className="text-[11px] text-primary hover:underline mt-2 font-medium">
                      🔀 New topic
                    </button>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="icon"
                      variant={muted ? "destructive" : "outline"}
                      className="h-14 w-14 rounded-full"
                      onClick={toggleMute}
                    >
                      {muted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-16 w-16 rounded-full shadow-lg"
                      onClick={endCall}
                    >
                      <PhoneOff className="h-7 w-7" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ENDED */}
              {status === "ended" && (
                <motion.div key="ended" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h2 className="text-xl font-bold font-display">Great Practice!</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      Keep practicing to improve your fluency.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 items-center">
                    <Button
                      size="lg"
                      className="rounded-full px-10 font-semibold font-display h-12 w-full max-w-xs"
                      onClick={() => { setStatus("idle"); }}
                    >
                      <Shuffle className="mr-2 h-5 w-5" /> Practice Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* How It Works */}
          <FadeInUp delay={0.1}>
            <div className="mt-10">
              <h3 className="font-bold font-display text-base mb-4 text-center">How It Works</h3>
              <div className="grid gap-3">
                {[
                  { icon: "🎤", title: "Allow Microphone", desc: "Grant mic access to speak with your partner" },
                  { icon: "🔀", title: "Get Matched", desc: "You'll be randomly paired with another learner online" },
                  { icon: "🗣️", title: "Talk for 5 Minutes", desc: "Practice speaking on a conversation topic" },
                  { icon: "🔁", title: "Repeat!", desc: "Match again to practice with someone new" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-soft">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-sm font-semibold font-display">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Tips */}
          <FadeInUp delay={0.2}>
            <div className="mt-8 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6">
              <h3 className="font-bold font-display text-base mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Speaking Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🎯 Don't worry about making mistakes — focus on communicating</li>
                <li>🐢 Speak slowly and clearly if your partner doesn't understand</li>
                <li>❓ Ask questions to keep the conversation flowing</li>
                <li>📝 Write down new words or phrases you learn</li>
                <li>😊 Be friendly and encouraging — you're both learning!</li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
