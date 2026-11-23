"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroExperienceProps {
  onExploreClick: () => void;
}

export default function HeroExperience({ onExploreClick }: HeroExperienceProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-experience" id="hero" aria-label="Hero Architectural Experience">
      {/* Cinematic Full-Bleed Architectural Visual with Subtle Parallax & Material Depth */}
      <div className={`hero-visual-container ${revealed ? "revealed" : "initial"}`}>
        <Image
          src="/frames/ezgif-frame-001.jpg"
          alt="Contemporary Architectural Villa by Carbon Spaces"
          fill
          priority
          sizes="100vw"
          className="hero-backdrop-image"
        />
        {/* Subtle Architectural Gradient Mask for Maximum Legibility without Washing Image */}
        <div className="hero-architectural-mask" />
      </div>

      {/* Floating Spatial Coordinates Indicator */}
      <div className="hero-spatial-coordinates">
        <span className="coord-dot" />
        <span className="coord-text">11.0168° N, 76.9558° E · COIMBATORE, TAMIL NADU</span>
      </div>

      {/* Architectural Composition Content */}
      <div className="hero-content-stage">
        <div className={`hero-editorial-block ${revealed ? "content-entered" : ""}`}>
          <div className="hero-eyebrow-row">
            <span className="hero-studio-label">CARBON SPACES / SPATIAL DESIGN STUDIO</span>
            <span className="hero-discipline-pill">INTERIORS · ACOUSTICS · SIGNBOARDS · ELEVATION</span>
          </div>

          <h1 className="hero-headline">
            Spaces are more than<br />
            <em className="headline-italic">what you see.</em>
          </h1>

          <p className="hero-supporting-statement">
            They shape how you feel, how you move and how you experience life.
          </p>

          <div className="hero-action-row">
            <button
              type="button"
              className="hero-explore-btn"
              onClick={onExploreClick}
            >
              <span>EXPLORE OUR WORLD</span>
              <span className="btn-arrow">→</span>
            </button>

            <div className="hero-scroll-cue" onClick={onExploreClick}>
              <span className="scroll-cue-line" />
              <span className="scroll-cue-text">SCROLL TO EXPERIENCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
