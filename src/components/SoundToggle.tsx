import { useEffect, useState } from "react";
import { Volume2, VolumeX, MousePointerClick, Sparkles, BellRing } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  isSoundEnabled,
  setSoundEnabled,
  getSoundVolume,
  setSoundVolume,
  playSound,
} from "@/lib/ui-sounds";

const PREVIEWS = [
  { name: "click", label: "Click", icon: MousePointerClick },
  { name: "navigate", label: "Chime", icon: Sparkles },
  { name: "notify", label: "Notify", icon: BellRing },
] as const;

const SoundToggle = () => {
  const [on, setOn] = useState(true);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    setOn(isSoundEnabled());
    setVolume(getSoundVolume());
    const soundHandler = (e: Event) => setOn((e as CustomEvent).detail as boolean);
    const volHandler = (e: Event) => setVolume((e as CustomEvent).detail as number);
    window.addEventListener("ui-sound-change", soundHandler);
    window.addEventListener("ui-volume-change", volHandler);
    return () => {
      window.removeEventListener("ui-sound-change", soundHandler);
      window.removeEventListener("ui-volume-change", volHandler);
    };
  }, []);

  const muted = !on || volume === 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          data-no-sound
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted/50 text-foreground hover:border-primary/30 hover:text-primary transition-colors"
          aria-label="Sound settings"
          title={muted ? "Sounds muted" : `Sounds on — ${volume}%`}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-4" data-no-sound>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">Interface sounds</p>
          <button
            data-no-sound
            onClick={() => setSoundEnabled(!on)}
            className="rounded-full border px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
          >
            {on ? "On" : "Off"}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Volume</span>
            <span className="font-semibold tabular-nums">{volume}%</span>
          </div>
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={5}
            disabled={!on}
            onValueChange={(v) => {
              setVolume(v[0]);
              setSoundVolume(v[0]);
            }}
            onValueCommit={(v) => playSound("click", { force: true, volume: v[0] })}
          />
        </div>

        <div className="mt-4">
          <p className="mb-2 text-[11px] text-muted-foreground">Preview</p>
          <div className="grid grid-cols-3 gap-2">
            {PREVIEWS.map(({ name, label, icon: Icon }) => (
              <button
                key={name}
                data-no-sound
                onClick={() => playSound(name, { force: true, volume: volume || 70 })}
                className="flex flex-col items-center gap-1 rounded-lg border bg-muted/40 px-2 py-2 text-[10px] font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-colors active:scale-95"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SoundToggle;
