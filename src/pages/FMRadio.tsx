import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Radio, Play, Pause, Volume2, VolumeX, Newspaper, Music2, Mic2, BookOpen, Globe2, Headphones } from "lucide-react";
import { FadeInUp, staggerContainer, staggerItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";

interface Station {
  name: string;
  description: string;
  streamUrl: string;
  category: string;
  country: string;
}

const stations: Station[] = [
  // News
  { name: "BBC World Service", description: "Global news, analysis & features in English", streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service", category: "News", country: "🇬🇧 UK" },
  { name: "NPR News", description: "America's leading non-profit news station", streamUrl: "https://npr-ice.streamguys1.com/live.mp3", category: "News", country: "🇺🇸 USA" },
  { name: "ABC News Radio", description: "Australian news in clear English", streamUrl: "https://mediaserv33.live-streams.nl/live/mp3:abcnews/playlist.m3u8", category: "News", country: "🇦🇺 AU" },
  { name: "Sky News Radio", description: "Breaking news from around the world", streamUrl: "https://video.buto.tv/media/sky-news-radio/hls/stream.m3u8", category: "News", country: "🇬🇧 UK" },

  // Music
  { name: "BBC Radio 1", description: "New music & entertainment", streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one", category: "Music", country: "🇬🇧 UK" },
  { name: "BBC Radio 2", description: "Great music variety & entertainment", streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_two", category: "Music", country: "🇬🇧 UK" },
  { name: "Classic FM", description: "The world's greatest classical music", streamUrl: "https://media-ice.musicradio.com/ClassicFMMP3", category: "Music", country: "🇬🇧 UK" },
  { name: "Heart FM", description: "Feel-good hits & pop music", streamUrl: "https://media-ice.musicradio.com/HeartLondonMP3", category: "Music", country: "🇬🇧 UK" },

  // Talk Shows
  { name: "BBC Radio 4", description: "Intelligent speech — drama, comedy, documentaries", streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_fourfm", category: "Talk", country: "🇬🇧 UK" },
  { name: "LBC", description: "Leading Britain's Conversation — debates & discussion", streamUrl: "https://media-ice.musicradio.com/LBCUKMP3", category: "Talk", country: "🇬🇧 UK" },
  { name: "TalkSport", description: "Sports talk & live commentary", streamUrl: "https://radio.talksport.com/stream", category: "Talk", country: "🇬🇧 UK" },

  // Learning
  { name: "BBC Learning English", description: "Programmes designed for English learners", streamUrl: "https://stream.live.vc.bbcmedia.co.uk/bbc_world_service", category: "Learning", country: "🇬🇧 UK" },
  { name: "Voice of America", description: "Clear, slow English for learners worldwide", streamUrl: "https://voa-ingest.akamaized.net/hls/live/2035800/161/playlist.m3u8", category: "Learning", country: "🇺🇸 USA" },
];

const categoryConfig: Record<string, { icon: typeof Radio; color: string; bg: string }> = {
  News: { icon: Newspaper, color: "text-red-500", bg: "bg-red-500/10" },
  Music: { icon: Music2, color: "text-violet-500", bg: "bg-violet-500/10" },
  Talk: { icon: Mic2, color: "text-blue-500", bg: "bg-blue-500/10" },
  Learning: { icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
};

const categoryList = ["All", "News", "Music", "Talk", "Learning"];

export default function FMRadio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [playingStation, setPlayingStation] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredStations = activeCategory === "All"
    ? stations
    : stations.filter((s) => s.category === activeCategory);

  const handlePlay = (station: Station) => {
    if (playingStation === station.name) {
      audioRef.current?.pause();
      setPlayingStation(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(station.streamUrl);
    audio.muted = muted;
    audio.play().catch(() => {
      // stream may not be available
    });
    audioRef.current = audio;
    setPlayingStation(station.name);
  };

  const toggleMute = () => {
    setMuted((prev) => {
      if (audioRef.current) audioRef.current.muted = !prev;
      return !prev;
    });
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-60" />
        <span className="absolute right-8 top-8 text-[120px] opacity-[0.06] select-none pointer-events-none">📻</span>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/15 flex items-center justify-center shadow-sm">
                <Radio className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display">FM Radio Stations</h1>
                <p className="text-sm text-muted-foreground mt-1">Listen & improve your English</p>
              </div>
            </div>
            <p className="max-w-xl text-muted-foreground mt-2">
              Tune in to live English radio stations — news, music, talk shows, and learning channels. A great way to immerse yourself in real English every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Stations */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category Filter */}
          <FadeInUp>
            <div className="flex flex-wrap gap-2 mb-8">
              {categoryList.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs font-semibold"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "All" && <Headphones className="h-3.5 w-3.5 mr-1.5" />}
                  {cat !== "All" && (() => { const Icon = categoryConfig[cat].icon; return <Icon className="h-3.5 w-3.5 mr-1.5" />; })()}
                  {cat}
                </Button>
              ))}
            </div>
          </FadeInUp>

          {/* Now Playing Bar */}
          {playingStation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 rounded-xl border bg-primary/5 px-4 py-3"
            >
              <div className="relative flex h-8 w-8 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/30" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Now Playing: {playingStation}</p>
              </div>
              <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8" onClick={toggleMute}>
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </motion.div>
          )}

          {/* Station Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2"
          >
            {filteredStations.map((station) => {
              const config = categoryConfig[station.category];
              const Icon = config.icon;
              const isPlaying = playingStation === station.name;

              return (
                <motion.div key={station.name} variants={staggerItem}>
                  <div
                    className={`group relative rounded-xl border bg-card p-5 shadow-soft transition-all duration-300 cursor-pointer hover:shadow-card hover:border-primary/20 ${isPlaying ? "ring-2 ring-primary/30 border-primary/30" : ""}`}
                    onClick={() => handlePlay(station)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.bg} shrink-0`}>
                        <Icon className={`h-5 w-5 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold font-display text-sm truncate">{station.name}</h3>
                          <span className="text-[10px] text-muted-foreground shrink-0">{station.country}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{station.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.bg} ${config.color}`}>
                            {station.category}
                          </span>
                          {isPlaying && (
                            <span className="flex items-center gap-1 text-[10px] font-medium text-primary">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                              </span>
                              LIVE
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant={isPlaying ? "default" : "outline"}
                        className="shrink-0 h-9 w-9 rounded-full"
                        onClick={(e) => { e.stopPropagation(); handlePlay(station); }}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tips */}
          <FadeInUp delay={0.2}>
            <div className="mt-12 rounded-2xl border bg-gradient-to-r from-primary/5 to-accent/5 p-6">
              <h3 className="font-bold font-display text-base mb-3 flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-primary" />
                Tips for Learning with Radio
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🎧 Listen for at least 15 minutes daily to build your ear</li>
                <li>📝 Write down new words you hear and look them up later</li>
                <li>🗣️ Try to repeat sentences you hear to practice pronunciation</li>
                <li>📰 Start with news channels — they use clear, formal English</li>
                <li>🎵 Sing along with music stations to improve fluency naturally</li>
              </ul>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
