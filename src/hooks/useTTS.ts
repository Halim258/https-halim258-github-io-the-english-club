import { useCallback, useEffect, useRef, useState } from "react";

export type Accent = "us" | "uk";

const ACCENT_KEY = "tts-accent";

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

  const speak = useCallback(
    (text: string, langOverride?: string, rate = 0.95, accentOverride?: Accent) => {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const useAccent: Accent = accentOverride ?? accent;
      const lang = langOverride ?? (useAccent === "uk" ? "en-GB" : "en-US");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
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
    [accent],
  );

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { speak, stop, speaking, accent, setAccent };
}
