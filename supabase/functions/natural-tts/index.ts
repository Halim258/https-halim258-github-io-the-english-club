import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Accent = "us" | "uk";

const EDGE_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
const EDGE_BASE_URL = "speech.platform.bing.com/consumer/speech/synthesize/readaloud";
const EDGE_WS_URL = `wss://${EDGE_BASE_URL}/edge/v1?TrustedClientToken=${EDGE_TOKEN}`;

function cleanText(input: unknown): string {
  return String(input ?? "").replace(/\s+/g, " ").trim().slice(0, 180);
}

function googleTTSUrl(text: string, accent: Accent): string {
  const tl = accent === "uk" ? "en-gb" : "en-us";
  const q = encodeURIComponent(text);
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${q}&total=1&idx=0&textlen=${text.length}`;
}

function edgeVoice(accent: Accent): string {
  return accent === "uk" ? "en-GB-SoniaNeural" : "en-US-JennyNeural";
}

function xmlEscape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function concatAudio(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

function audioPayload(data: Uint8Array): Uint8Array | null {
  const marker = new TextEncoder().encode("Path:audio\r\n");
  for (let i = 0; i <= data.length - marker.length; i++) {
    if (marker.every((byte, j) => data[i + j] === byte)) {
      return data.slice(i + marker.length);
    }
  }
  return null;
}

async function synthesizeEdge(text: string, accent: Accent): Promise<Uint8Array> {
  const requestId = crypto.randomUUID().replaceAll("-", "");
  const ws = new WebSocket(`${EDGE_WS_URL}&ConnectionId=${requestId}`);
  const chunks: Uint8Array[] = [];

  return await new Promise<Uint8Array>((resolve, reject) => {
    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("Neural voice timeout"));
    }, 10_000);

    ws.onopen = () => {
      const speechConfig = JSON.stringify({
        context: {
          synthesis: {
            audio: {
              metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: false },
              outputFormat: "audio-24khz-48kbitrate-mono-mp3",
            },
          },
        },
      });

      ws.send(`X-Timestamp:${new Date().toISOString()}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n${speechConfig}`);

      const voice = edgeVoice(accent);
      const lang = accent === "uk" ? "en-GB" : "en-US";
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='${lang}'><voice name='${voice}'><prosody pitch='+0Hz' rate='-4%' volume='+0%'>${xmlEscape(text)}</prosody></voice></speak>`;
      ws.send(`X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${new Date().toISOString()}\r\nPath:ssml\r\n\r\n${ssml}`);
    };

    ws.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Neural voice connection failed"));
    };

    ws.onmessage = async (event) => {
      if (typeof event.data === "string") {
        if (event.data.includes("turn.end")) {
          clearTimeout(timeout);
          ws.close();
          resolve(concatAudio(chunks));
        }
        return;
      }

      const raw = event.data instanceof Blob
        ? new Uint8Array(await event.data.arrayBuffer())
        : event.data instanceof ArrayBuffer
          ? new Uint8Array(event.data)
          : new Uint8Array(event.data);
      const payload = audioPayload(raw);
      if (payload?.length) chunks.push(payload);
    };
  });
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