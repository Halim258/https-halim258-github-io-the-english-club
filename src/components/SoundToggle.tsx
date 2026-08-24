import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { isSoundEnabled, setSoundEnabled } from "@/lib/ui-sounds";

const SoundToggle = () => {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(isSoundEnabled());
    const handler = (e: Event) => setOn((e as CustomEvent).detail as boolean);
    window.addEventListener("ui-sound-change", handler);
    return () => window.removeEventListener("ui-sound-change", handler);
  }, []);

  return (
    <button
      data-no-sound
      onClick={() => setSoundEnabled(!on)}
      className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted/50 text-foreground hover:border-primary/30 hover:text-primary transition-colors"
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      title={on ? "Sounds on — click to mute" : "Sounds muted — click to enable"}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
};

export default SoundToggle;
