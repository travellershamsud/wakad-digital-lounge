import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AnimatedLogo = ({ size = "md", className }: AnimatedLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-4xl md:text-6xl",
    lg: "text-6xl md:text-8xl lg:text-9xl",
  };

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Main text with gradient */}
      <h1
        className={cn(
          "font-black tracking-wider relative z-10",
          "bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent",
          "animate-gradient-x bg-[length:200%_auto]",
          sizeClasses[size]
        )}
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        LIVE
      </h1>
      
      {/* Glitch layers */}
      <span
        className={cn(
          "absolute inset-0 font-black tracking-wider z-0",
          "text-primary opacity-70 animate-glitch-1",
          sizeClasses[size]
        )}
        style={{ fontFamily: "Orbitron, sans-serif" }}
        aria-hidden="true"
      >
        LIVE
      </span>
      <span
        className={cn(
          "absolute inset-0 font-black tracking-wider z-0",
          "text-secondary opacity-70 animate-glitch-2",
          sizeClasses[size]
        )}
        style={{ fontFamily: "Orbitron, sans-serif" }}
        aria-hidden="true"
      >
        LIVE
      </span>
      
      {/* Glow effect */}
      <div className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-slow" />
    </div>
  );
};
