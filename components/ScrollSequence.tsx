"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type DisciplineId = "interior" | "acoustics" | "signage" | "elevation";

export interface StoryState {
  stateNum: string;
  stateLabel: string;
  headline: string;
  description: string;
  ctaText: string;
}

export interface DisciplineConfig {
  id: DisciplineId;
  num: string;
  label: string;
  shortLabel: string;
  mainHeadline: string;
  supportingLine: string;
  frameCount: number;
  framePath: (frame: number) => string;
  serviceHighlights: string[];
  states: [StoryState, StoryState, StoryState, StoryState];
  scrollDistance: number;
  nextDisciplineId?: DisciplineId;
  nextDisciplineName?: string;
  transitionNote: string;
}

export const DISCIPLINES: Record<DisciplineId, DisciplineConfig> = {
  interior: {
    id: "interior",
    num: "01",
    label: "01 / INTERIOR SOLUTIONS",
    shortLabel: "01 INTERIOR",
    mainHeadline: "PEOPLE NOTICE HOW A SPACE MAKES THEM FEEL.",
    supportingLine: "An ordinary room can become an extraordinary experience. It starts with the way you imagine it.",
    frameCount: 200,
    framePath: (f) => `/frames/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    serviceHighlights: [
      "Commercial Interiors",
      "Residential Interiors",
      "Office Spaces",
      "Space Planning",
      "Interior Finishing",
    ],
    states: [
      {
        stateNum: "STATE 01",
        stateLabel: "THE EMPTY SPACE",
        headline: "Is your space functional, but missing its character?",
        description: "Every remarkable interior begins with a question: what should this space make people feel?",
        ctaText: "RETHINK MY SPACE →",
      },
      {
        stateNum: "STATE 02",
        stateLabel: "THE VISION",
        headline: "Imagine a space designed around the way people live, work and connect.",
        description: "Every colour, material and layout should have a deliberate reason to exist.",
        ctaText: "EXPLORE THE POSSIBILITIES →",
      },
      {
        stateNum: "STATE 03",
        stateLabel: "THE CRAFT",
        headline: "Beautiful spaces are not accidental. They are carefully thought through and precisely executed.",
        description: "From the first detail to the final finish, every decision shapes the sensory experience.",
        ctaText: "DISCUSS MY INTERIOR PROJECT →",
      },
      {
        stateNum: "STATE 04",
        stateLabel: "THE EXPERIENCE",
        headline: "Don't just fill a space. Give people a reason to remember it.",
        description: "Your environment should reflect the experience you want people to have.",
        ctaText: "START MY INTERIOR PROJECT →",
      },
    ],
    scrollDistance: 2600,
    nextDisciplineId: "acoustics",
    nextDisciplineName: "02 / ACOUSTICS",
    transitionNote: "Moving from interior architectural surfaces into acoustic wave dynamics…",
  },
  acoustics: {
    id: "acoustics",
    num: "02",
    label: "02 / ACOUSTICS",
    shortLabel: "02 ACOUSTICS",
    mainHeadline: "YOU CAN SEE A BEAUTIFUL SPACE. BUT CAN YOU FEEL THE DIFFERENCE IN ITS SOUND?",
    supportingLine: "Great environments are not only designed to be seen. They are designed to be experienced.",
    frameCount: 240,
    framePath: (f) => `/acoustics-frames/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    serviceHighlights: [
      "Acoustic Wall Panels",
      "Acoustic Ceiling Systems",
      "Soundproofing Solutions",
      "Auditorium Acoustics",
      "Studio & Workspace Acoustics",
    ],
    states: [
      {
        stateNum: "STATE 01",
        stateLabel: "THE PROBLEM",
        headline: "Echoes, unwanted noise and poor sound change the entire experience of a room.",
        description: "Is your space helping people communicate, concentrate and perform?",
        ctaText: "SOLVE MY SOUND PROBLEM →",
      },
      {
        stateNum: "STATE 02",
        stateLabel: "THE SCIENCE",
        headline: "Every room has a different acoustic challenge.",
        description: "The right solution begins with understanding the space, its purpose and the way sound waves travel.",
        ctaText: "DISCUSS MY ACOUSTIC SPACE →",
      },
      {
        stateNum: "STATE 03",
        stateLabel: "THE TRANSFORMATION",
        headline: "Better sound doesn't happen by accident.",
        description: "Thoughtful materials, placement and precision installation bring sound, comfort and performance into balance.",
        ctaText: "EXPLORE ACOUSTIC SOLUTIONS →",
      },
      {
        stateNum: "STATE 04",
        stateLabel: "THE RESULT",
        headline: "Hear every conversation. Experience every performance. Feel the difference.",
        description: "Acoustic architecture tuned for pristine speech intelligibility and immersive resonance.",
        ctaText: "PLAN MY ACOUSTIC SPACE →",
      },
    ],
    scrollDistance: 2800,
    nextDisciplineId: "signage",
    nextDisciplineName: "03 / SIGNBOARDS",
    transitionNote: "Moving through acoustic panel geometries into dimensional brand identity…",
  },
  signage: {
    id: "signage",
    num: "03",
    label: "03 / SIGNBOARDS",
    shortLabel: "03 SIGNBOARDS",
    mainHeadline: "IF PEOPLE CAN'T NOTICE YOUR BRAND, HOW WILL THEY REMEMBER IT?",
    supportingLine: "Your brand deserves to be seen, recognized and remembered.",
    frameCount: 240,
    framePath: (f) => `/signage/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    serviceHighlights: [
      "3D Letter Signage",
      "LED Signboards",
      "Building Signage",
      "Reception Signage",
      "Wayfinding & Directional",
    ],
    states: [
      {
        stateNum: "STATE 01",
        stateLabel: "THE IDENTITY",
        headline: "Your business may be excellent. But does your signage make people stop and notice?",
        description: "Your first impression often begins before a customer enters the door.",
        ctaText: "UPGRADE MY BRAND PRESENCE →",
      },
      {
        stateNum: "STATE 02",
        stateLabel: "THE DESIGN",
        headline: "Your identity deserves more than a name on a wall.",
        description: "Design every detail to communicate your brand with stature, clarity and confidence.",
        ctaText: "EXPLORE SIGNAGE IDEAS →",
      },
      {
        stateNum: "STATE 03",
        stateLabel: "THE INSTALLATION",
        headline: "An idea becomes an identity when design meets craftsmanship.",
        description: "Exact laser cutting, metal fabrication, structural backing, and calibrated LED backlighting.",
        ctaText: "DISCUSS MY SIGNAGE PROJECT →",
      },
      {
        stateNum: "STATE 04",
        stateLabel: "THE PRESENCE",
        headline: "Make your first impression visible, distinctive and memorable.",
        description: "Turn commercial entrances and storefronts into unforgettable architectural landmarks.",
        ctaText: "CREATE MY SIGNBOARD →",
      },
    ],
    scrollDistance: 2800,
    nextDisciplineId: "elevation",
    nextDisciplineName: "04 / ELEVATION",
    transitionNote: "Approaching building sign and expanding perspective to the entire facade…",
  },
  elevation: {
    id: "elevation",
    num: "04",
    label: "04 / ELEVATION",
    shortLabel: "04 ELEVATION",
    mainHeadline: "YOUR BUILDING HAS AN IDENTITY. DOES ITS EXTERIOR REFLECT IT?",
    supportingLine: "An ordinary structure can become an architectural landmark through thoughtful design and execution.",
    frameCount: 240,
    framePath: (f) => `/elevation/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    serviceHighlights: [
      "Commercial Building Elevation",
      "Shopping Mall Facades",
      "ACP Cladding",
      "Aluminium Facade Systems",
      "Glass Facades",
      "Exterior Finishes",
    ],
    states: [
      {
        stateNum: "STATE 01",
        stateLabel: "THE ORIGINAL",
        headline: "A building is more than walls and floors.",
        description: "It's the first impression of everything inside. Does your exterior match your vision?",
        ctaText: "REIMAGINE MY BUILDING →",
      },
      {
        stateNum: "STATE 02",
        stateLabel: "THE VISION",
        headline: "What if the building people walk past every day became the one they remember?",
        description: "An entirely new architectural identity begins with a bold, contemporary perspective.",
        ctaText: "EXPLORE ELEVATION IDEAS →",
      },
      {
        stateNum: "STATE 03",
        stateLabel: "THE TRANSFORMATION",
        headline: "Precision, materials and craftsmanship come together to redefine the exterior.",
        description: "High-spec ACP panels, structural glass curtain walls, louvers, and bespoke entrance canopies.",
        ctaText: "DISCUSS MY BUILDING PROJECT →",
      },
      {
        stateNum: "STATE 04",
        stateLabel: "THE LANDMARK",
        headline: "Don't settle for an ordinary exterior when your vision can go beyond it.",
        description: "Not just a facade. A transformative new architectural identity.",
        ctaText: "START MY ELEVATION PROJECT →",
      },
    ],
    scrollDistance: 2800,
    nextDisciplineId: undefined,
    nextDisciplineName: "LEADERSHIP & PEOPLE",
    transitionNote: "Pulling away from the completed architectural landmark into the leadership vision…",
  },
};

interface ScrollSequenceProps {
  activeDiscipline: DisciplineId;
  onDisciplineChange: (discipline: DisciplineId) => void;
  onCtaClick: (serviceName: string) => void;
}

export default function ScrollSequence({
  activeDiscipline,
  onDisciplineChange,
  onCtaClick,
}: ScrollSequenceProps) {
  const config = DISCIPLINES[activeDiscipline];

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [activeStateIndex, setActiveStateIndex] = useState(0);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      const safeIndex = Math.max(0, Math.min(config.frameCount - 1, index));
      const image = imagesRef.current[safeIndex];
      if (!image?.complete || !image.naturalWidth) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      const targetWidth = Math.round(width * dpr);
      const targetHeight = Math.round(height * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      const scale = Math.max(targetWidth / image.naturalWidth, targetHeight / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const x = (targetWidth - drawWidth) / 2;
      const y = (targetHeight - drawHeight) / 2;

      context.clearRect(0, 0, targetWidth, targetHeight);
      context.drawImage(image, x, y, drawWidth, drawHeight);

      setCurrentFrame(safeIndex + 1);

      const ratio = safeIndex / (config.frameCount - 1);
      let nextState = 0;
      if (ratio >= 0.75) nextState = 3;
      else if (ratio >= 0.5) nextState = 2;
      else if (ratio >= 0.25) nextState = 1;
      else nextState = 0;

      setActiveStateIndex(nextState);
    },
    [config.frameCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!canvas || !section || !stage) return;

    let disposed = false;
    setLoaded(0);
    setReady(false);
    setCurrentFrame(1);
    setActiveStateIndex(0);

    const images: HTMLImageElement[] = new Array(config.frameCount);
    imagesRef.current = images;

    const resize = () => {
      drawFrame(0);
    };

    let scrollTween: gsap.core.Tween | undefined;
    let cancelled = false;
    const playhead = { frame: 0 };

    const setupScroll = () => {
      if (cancelled || disposed || scrollTween) return;

      scrollTween = gsap.to(playhead, {
        frame: config.frameCount - 1,
        ease: "none",
        onUpdate: () => drawFrame(Math.round(playhead.frame)),
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${config.scrollDistance}`,
          pin: stage,
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });
    };

    const firstImage = new window.Image();
    images[0] = firstImage;
    firstImage.onload = () => {
      if (disposed) return;
      setLoaded(1);
      setReady(true);
      drawFrame(0);
      setupScroll();

      for (let index = 1; index < config.frameCount; index += 1) {
        const image = new window.Image();
        images[index] = image;
        image.onload = () => {
          if (!disposed) {
            setLoaded((value) => Math.min(config.frameCount, value + 1));
            if (index === Math.round(playhead.frame)) drawFrame(index);
          }
        };
        image.src = config.framePath(index);
      }
    };
    firstImage.onerror = () => setReady(false);
    firstImage.src = config.framePath(0);

    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelled = true;
      scrollTween?.scrollTrigger?.kill();
      scrollTween?.kill();
      window.removeEventListener("resize", resize);
      imagesRef.current = [];
    };
  }, [config, drawFrame]);

  const activeState = config.states[activeStateIndex];

  const handleNextDiscipline = () => {
    if (config.nextDisciplineId) {
      onDisciplineChange(config.nextDisciplineId);
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const leaderSection = document.getElementById("leadership");
      if (leaderSection) {
        leaderSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={sectionRef} className="sequence-section hero-sequence-section" id="sequence-stage">
      <div ref={stageRef} className="sequence-stage">
        <canvas ref={canvasRef} className="sequence-canvas" aria-label={config.mainHeadline} />

        {/* Cinematic Black Shadow Overlay (replaces washed-out white gradient) */}
        <div className="sequence-shade black-shadow-overlay" />

        {/* Global Cinematic Top Bar with Single-Line Brand Logo & Disciplines Switcher */}
        <header className="sequence-header">
          <div className="header-left">
            <a href="#sequence-stage" className="brand-logo-link">
              <Image
                src="/brand/logo-horizontal-single.png"
                alt="CARBON SPACES"
                width={200}
                height={44}
                className="header-brand-logo"
                priority
              />
            </a>
            <span className="brand-tagline-pill">WE DESIGN EXPERIENCE</span>
          </div>

          <nav className="disciplines-nav" aria-label="Discipline switcher">
            {(["interior", "acoustics", "signage", "elevation"] as DisciplineId[]).map((discId) => {
              const item = DISCIPLINES[discId];
              return (
                <button
                  key={discId}
                  type="button"
                  className={`discipline-nav-btn ${activeDiscipline === discId ? "active" : ""}`}
                  onClick={() => {
                    onDisciplineChange(discId);
                    if (sectionRef.current) {
                      sectionRef.current.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <span className="btn-num">{item.num}</span>
                  <span className="btn-label">{item.shortLabel.replace(/^\d+\s*/, "")}</span>
                </button>
              );
            })}
          </nav>

          <div className="header-right">
            <button
              type="button"
              className="quick-enquire-btn"
              onClick={() => onCtaClick(config.states[activeStateIndex].ctaText)}
            >
              LET&apos;S TALK <span>↗</span>
            </button>
          </div>
        </header>

        {/* Big Text Animated Reveal (NO TEXT SECTION BOX) */}
        <div className="story-overlay borderless-story-overlay">
          <div
            key={`${activeDiscipline}-${activeStateIndex}`}
            className="story-reveal-animate"
          >
            <div className="story-meta-row">
              <span className="discipline-label">{config.label}</span>
              <span className="state-badge">
                {activeState.stateNum} · {activeState.stateLabel}
              </span>
            </div>

            {/* ONLY SHOW THE BIG TEXT WITH DRAMATIC REVEAL */}
            <h1 className="story-big-headline">
              {activeState.headline}
            </h1>

            <p className="story-subline">
              {activeState.description}
            </p>

            <div className="story-actions">
              <button
                type="button"
                className="btn-primary hero-reveal-btn"
                onClick={() => onCtaClick(activeState.ctaText)}
              >
                {activeState.ctaText}
              </button>
            </div>
          </div>
        </div>

        {/* Cinematic Progress & Status Footer */}
        <div className="sequence-footer">
          <div className="scroll-indicator">
            <span className="scroll-pulse" />
            <span className="scroll-text">SCROLL TO DRIVE STORY</span>
          </div>

          <div className="states-progress-track">
            {config.states.map((st, idx) => (
              <div
                key={st.stateNum}
                className={`state-step-node ${activeStateIndex === idx ? "active" : ""} ${
                  activeStateIndex > idx ? "completed" : ""
                }`}
                title={st.stateLabel}
              >
                <span className="node-bar" />
                <span className="node-label">0{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="status-indicators">
            <span className="frame-counter">
              FRAME {String(currentFrame).padStart(3, "0")} / {config.frameCount}
            </span>
            <span className="preload-badge">
              {ready ? `${loaded}/${config.frameCount} LOADED` : "BUFFERING…"}
            </span>
          </div>
        </div>
      </div>

      {/* Category Interlude / Transition Banner */}
      <div className="discipline-outro">
        <div className="outro-container">
          <div className="outro-left">
            <span className="outro-category-label">{config.label} COMPLETED</span>
            <h3 className="outro-title">{config.supportingLine}</h3>
            <p className="outro-transition-note">{config.transitionNote}</p>
          </div>

          <div className="outro-right">
            <button
              type="button"
              className="btn-primary outro-next-btn"
              onClick={handleNextDiscipline}
            >
              NEXT: {config.nextDisciplineName || "LEADERSHIP"} →
            </button>
            <button
              type="button"
              className="btn-secondary outro-enquiry-btn"
              onClick={() => onCtaClick(config.label)}
            >
              DISCUSS THIS DISCIPLINE ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
