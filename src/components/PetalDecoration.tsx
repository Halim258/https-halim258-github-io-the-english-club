/**
 * Decorative petal/leaf shapes inspired by Off2Class branding.
 * Renders SVG petals at absolute positions for background decoration.
 */

interface PetalProps {
  className?: string;
}

export function PetalTopRight({ className = "" }: PetalProps) {
  return (
    <div className={`absolute top-0 right-0 pointer-events-none overflow-hidden ${className}`}>
      <svg width="400" height="500" viewBox="0 0 400 500" fill="none" className="opacity-[0.08]">
        {/* Teal petal */}
        <ellipse cx="350" cy="80" rx="120" ry="50" transform="rotate(30 350 80)" fill="hsl(174 62% 41%)" />
        {/* Pink petal */}
        <ellipse cx="380" cy="180" rx="110" ry="45" transform="rotate(60 380 180)" fill="hsl(340 65% 70%)" />
        {/* Lavender petal */}
        <ellipse cx="320" cy="280" rx="100" ry="40" transform="rotate(15 320 280)" fill="hsl(280 40% 75%)" />
        {/* Orange petal */}
        <ellipse cx="370" cy="370" rx="90" ry="38" transform="rotate(45 370 370)" fill="hsl(25 85% 58%)" />
        {/* Green petal */}
        <ellipse cx="300" cy="150" rx="80" ry="35" transform="rotate(-20 300 150)" fill="hsl(140 50% 50%)" />
      </svg>
    </div>
  );
}

export function PetalBottomLeft({ className = "" }: PetalProps) {
  return (
    <div className={`absolute bottom-0 left-0 pointer-events-none overflow-hidden ${className}`}>
      <svg width="300" height="400" viewBox="0 0 300 400" fill="none" className="opacity-[0.06]">
        <ellipse cx="50" cy="320" rx="120" ry="50" transform="rotate(-30 50 320)" fill="hsl(174 62% 41%)" />
        <ellipse cx="30" cy="220" rx="100" ry="42" transform="rotate(-60 30 220)" fill="hsl(340 65% 70%)" />
        <ellipse cx="80" cy="130" rx="90" ry="38" transform="rotate(-15 80 130)" fill="hsl(280 40% 75%)" />
      </svg>
    </div>
  );
}
