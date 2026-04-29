import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Accent = "us" | "uk";

const ACCENT_KEY = "tts-accent";

async function fetchNaturalVoice(text: string, accent: Accent): Promise<string> {
  const { data, error } = await supabase.functions.invoke("natural-tts", {
    body: { text, accent },
  });

  if (error) throw error;
  const blob = data instanceof Blob ? data : new Blob([data], { type: "audio/mpeg" });
  if (blob.size < 100) throw new Error("Empty natural voice response");
  return URL.createObjectURL(blob);
}

// Google's endpoint limits each request to ~200 chars.
function chunkText(text: string, max = 180): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return [clean];
  const parts: string[] = [];
  const sentences = clean.split(/(?<=[.!?])\s+/);
  let buf = "";
  for (const s of sentences) {
    if ((buf + " " + s).trim().length > max) {
      if (buf) parts.push(buf.trim());
      if (s.length > max) {
        const words = s.split(" ");
        let line = "";
        for (const w of words) {
          if ((line + " " + w).trim().length > max) {
            parts.push(line.trim());
            line = w;
          } else {
            line = (line + " " + w).trim();
          }
        }
        buf = line || "";
      } else {
        buf = s;
      }
    } else {
      buf = (buf + " " + s).trim();
    }
  }
  if (buf) parts.push(buf.trim());
  return parts;
}

function getStoredAccent(): Accent {
  if (typeof window === "undefined") return "us";
  const v = window.localStorage.getItem(ACCENT_KEY);
  return v === "uk" ? "uk" : "us";
}

function pickVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  if (accent === "uk") {
    return (
      voices.find((v) => v.lang === "en-GB" && /Google/i.test(v.name)) ||
      voices.find((v) => v.lang === "en-GB" && /(Daniel|Kate|Serena|Arthur|Oliver|Libby|Sonia|Ryan|UK)/i.test(v.name)) ||
      voices.find((v) => v.lang === "en-GB") ||
      voices.find((v) => v.lang.startsWith("en-GB")) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      null
    );
  }
  return (
    voices.find((v) => v.lang === "en-US" && /Google/i.test(v.name)) ||
    voices.find((v) => v.lang === "en-US" && /(Samantha|Alex|Aria|Jenny|Guy|US)/i.test(v.name)) ||
    voices.find((v) => v.lang === "en-US") ||
    voices.find((v) => v.lang.startsWith("en-US")) ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null
  );
}

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [accent, setAccentState] = useState<Accent>(getStoredAccent());
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelTokenRef = useRef(0);

  // Warm up voice list (browsers load voices async)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", handler);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", handler);
  }, []);

  // Sync accent across tabs/components
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ACCENT_KEY) setAccentState(getStoredAccent());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setAccent = useCallback((a: Accent) => {
    window.localStorage.setItem(ACCENT_KEY, a);
    setAccentState(a);
  }, []);

  const stopAll = useCallback(() => {
    cancelTokenRef.current++;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  const speakBrowser = useCallback(
    (text: string, useAccent: Accent, rate: number, langOverride?: string) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langOverride ?? (useAccent === "uk" ? "en-GB" : "en-US");
      utterance.rate = rate;
      utterance.pitch = 1;
      const voice = pickVoice(useAccent);
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  const speak = useCallback(
    async (text: string, langOverride?: string, rate = 1, accentOverride?: Accent) => {
      if (!text || !text.trim()) return;
      const useAccent: Accent = accentOverride ?? accent;

      // Non-English language → use browser TTS (e.g. Arabic).
      if (langOverride && !langOverride.toLowerCase().startsWith("en")) {
        speakBrowser(text, useAccent, rate, langOverride);
        return;
      }

      stopAll();
      const myToken = ++cancelTokenRef.current;
      const chunks = chunkText(text);
      setSpeaking(true);

      try {
        for (const chunk of chunks) {
          if (myToken !== cancelTokenRef.current) return;
          const url = await fetchNaturalVoice(chunk, useAccent);
          const audio = new Audio(url);
          audio.playbackRate = rate;
          audioRef.current = audio;
          await new Promise<void>((resolve, reject) => {
            audio.onended = () => {
              URL.revokeObjectURL(url);
              resolve();
            };
            audio.onerror = () => reject(new Error("audio error"));
            audio.play().catch(reject);
          });
        }
      } catch {
        if (myToken === cancelTokenRef.current) {
          speakBrowser(text, useAccent, rate, langOverride);
          return;
        }
      } finally {
        if (myToken === cancelTokenRef.current) setSpeaking(false);
      }
    },
    [accent, speakBrowser, stopAll],
  );

  const stop = useCallback(() => {
    stopAll();
  }, [stopAll]);

  return { speak, stop, speaking, accent, setAccent };
}
