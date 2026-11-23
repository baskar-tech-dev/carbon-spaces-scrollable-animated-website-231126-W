"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"center" | "reveal" | "fadeout" | "hidden">("center");

  useEffect(() => {
    // Phase 1: Emblem alone in center with big view
    // Phase 2: At 850ms, emblem moves left and right-side content reveals
    const revealTimer = setTimeout(() => {
      setPhase("reveal");
    }, 850);

    // Phase 3: At 2300ms, smooth dissolve into the site
    const fadeTimer = setTimeout(() => {
      setPhase("fadeout");
    }, 2350);

    // Phase 4: At 2950ms, unmount completely
    const finishTimer = setTimeout(() => {
      setPhase("hidden");
      if (onComplete) onComplete();
    }, 2950);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (phase === "hidden") return null;

  return (
    <aside
      className={`splash-overlay ${phase === "fadeout" ? "splash-fade-out" : ""}`}
      aria-label="Welcome to Carbon Spaces"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        setPhase("fadeout");
        setTimeout(() => {
          setPhase("hidden");
          if (onComplete) onComplete();
        }, 400);
      }}
    >
      <div className="splash-ambient-glow" />

      {/* Cinematic Logo Transformation Stage */}
      <div className={`splash-lockup-stage phase-${phase}`}>
        {/* CS 3D Emblem: Initial center big view, then shifts smoothly to the left */}
        <div className="splash-emblem-unit">
          <Image
            src="/brand/cs-emblem.png"
            alt="CARBON SPACES CS Emblem"
            width={240}
            height={196}
            className="splash-emblem-large"
            priority
          />
        </div>

        {/* Right-Side Content: Reveals after emblem shifts left */}
        <div className="splash-text-unit">
          <Image
            src="/brand/logo-double-text-only.png"
            alt="CARBON SPACES — WE DESIGN EXPERIENCE"
            width={340}
            height={104}
            className="splash-text-reveal-img"
            priority
          />
        </div>
      </div>
    </aside>
  );
}
