import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Accent = "us" | "uk";

function cleanText(input: unknown): string {
  return String(input ?? "").replace(/\s+/g, " ").trim().slice(0, 180);
}

function googleTTSUrl(text: string, accent: Accent): string {
  const tl = accent === "uk" ? "en-gb" : "en-us";
  const q = encodeURIComponent(text);
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}&total=1&idx=0&textlen=${text.length}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST required" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const text = cleanText(body.text);
    const accent: Accent = body.accent === "uk" ? "uk" : "us";

    if (!text) {
      return new Response(JSON.stringify({ error: "Text required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch(googleTTSUrl(text, accent), {
      headers: {
        "Accept": "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; TheEnglishClub/1.0)",
      },
    });

    if (!response.ok) throw new Error(`Voice provider returned ${response.status}`);

    const audio = await response.arrayBuffer();
    if (audio.byteLength < 100) throw new Error("Empty voice response");

    return new Response(audio, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/octet-stream",
        "Cache-Control": "public, max-age=604800",
      },
    });
  } catch (error) {
    console.error("natural-tts error:", error);
    return new Response(JSON.stringify({ error: "Natural voice unavailable" }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});