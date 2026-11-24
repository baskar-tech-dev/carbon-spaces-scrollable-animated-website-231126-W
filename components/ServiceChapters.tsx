"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ServiceChapterId = "interiors" | "acoustics" | "signboards" | "elevation";

export interface StoryScene {
  headline: string;
  highlight: string;
  layoutClass: string;
}

export interface ChapterStory {
  id: ServiceChapterId;
  num: string;
  title: string;
  serviceCategory: string;
  ctaText: string;
  frameCount: number;
  framePath: (f: number) => string;
  scenes: StoryScene[];
}

export const CHAPTERS_DATA: ChapterStory[] = [
  {
    id: "interiors",
    num: "01",
    title: "Interiors",
    serviceCategory: "Interior Solutions",
    ctaText: "LET'S SHAPE YOUR SPACE ↗",
    frameCount: 200,
    framePath: (f) => `/frames/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    scenes: [
      {
        headline: "A space is more than walls.",
        highlight: "It begins with a feeling.",
        layoutClass: "layout-lower-left",
      },
      {
        headline: "Every detail has a purpose.",
        highlight: "Every element has a place.",
        layoutClass: "layout-mid-left",
      },
      {
        headline: "Light creates the mood.",
        highlight: "Materials create character.",
        layoutClass: "layout-center-left",
      },
      {
        headline: "Function meets imagination.",
        highlight: "Form becomes an experience.",
        layoutClass: "layout-lower-left-offset",
      },
      {
        headline: "Your vision.",
        highlight: "Our interpretation.",
        layoutClass: "layout-grand-reveal",
      },
    ],
  },
  {
    id: "acoustics",
    num: "02",
    title: "Acoustics",
    serviceCategory: "Acoustics",
    ctaText: "DISCOVER THE SOUND OF SPACE ↗",
    frameCount: 240,
    framePath: (f) => `/acoustics-frames/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    scenes: [
      {
        headline: "A beautiful space is seen.",
        highlight: "A great space is heard.",
        layoutClass: "layout-lower-left",
      },
      {
        headline: "Every sound has a journey.",
        highlight: "Every surface matters.",
        layoutClass: "layout-mid-left",
      },
      {
        headline: "Balance changes everything.",
        highlight: "Clarity creates comfort.",
        layoutClass: "layout-center-left",
      },
      {
        headline: "Silence is not empty.",
        highlight: "It is thoughtfully designed.",
        layoutClass: "layout-lower-left-offset",
      },
      {
        headline: "Hear the difference.",
        highlight: "Feel the atmosphere.",
        layoutClass: "layout-grand-reveal",
      },
    ],
  },
  {
    id: "signboards",
    num: "03",
    title: "Signboards",
    serviceCategory: "Signboards",
    ctaText: "MAKE YOUR BRAND VISIBLE ↗",
    frameCount: 240,
    framePath: (f) => `/signage/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    scenes: [
      {
        headline: "Every brand deserves",
        highlight: "To be seen.",
        layoutClass: "layout-lower-left",
      },
      {
        headline: "First impressions matter.",
        highlight: "Make yours unforgettable.",
        layoutClass: "layout-mid-left",
      },
      {
        headline: "Shape the identity.",
        highlight: "Define the presence.",
        layoutClass: "layout-center-left",
      },
      {
        headline: "Beyond letters and lights.",
        highlight: "Comes a lasting impression.",
        layoutClass: "layout-lower-left-offset",
      },
      {
        headline: "Stand out from the ordinary.",
        highlight: "Become impossible to ignore.",
        layoutClass: "layout-grand-reveal",
      },
    ],
  },
  {
    id: "elevation",
    num: "04",
    title: "Elevation",
    serviceCategory: "Elevation",
    ctaText: "REIMAGINE YOUR ELEVATION ↗",
    frameCount: 240,
    framePath: (f) => `/elevation/ezgif-frame-${String(f + 1).padStart(3, "0")}.jpg`,
    scenes: [
      {
        headline: "Architecture begins",
        highlight: "With a vision.",
        layoutClass: "layout-lower-left",
      },
      {
        headline: "Lines create structure.",
        highlight: "Details create identity.",
        layoutClass: "layout-mid-left",
      },
      {
        headline: "Materials shape character.",
        highlight: "Light reveals beauty.",
        layoutClass: "layout-center-left",
      },
      {
        headline: "Beyond the exterior.",
        highlight: "Lies an expression.",
        layoutClass: "layout-lower-left-offset",
      },
      {
        headline: "Make an entrance.",
        highlight: "Leave an impression.",
        layoutClass: "layout-grand-reveal",
      },
    ],
  },
];

interface ServiceChaptersProps {
  onChapterInView?: (chapter: ServiceChapterId) => void;
  onCtaClick: (serviceCategory: string) => void;
}

export default function ServiceChapters({
  onChapterInView,
  onCtaClick,
}: ServiceChaptersProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const bottomRuleRef = useRef<HTMLDivElement | null>(null);
  const transitionShutterRef = useRef<HTMLDivElement | null>(null);
  const transitionHairlineFillRef = useRef<HTMLSpanElement | null>(null);

  // Cached HTMLImageElements per chapter
  const cacheRef = useRef<Record<string, HTMLImageElement[]>>({
    interiors: new Array(200),
    acoustics: new Array(240),
    signboards: new Array(240),
    elevation: new Array(240),
  });

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTargetTitle, setTransitionTargetTitle] = useState("");

  const activeChapRef = useRef(0);
  const activeProgRef = useRef(0);
  const lastChapIdxRef = useRef(0);
  const lastSceneIdxRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const onChapterInViewRef = useRef(onChapterInView);
  onChapterInViewRef.current = onChapterInView;

  // Controlled camera transforms per scene (zero excessive zoom)
  const cameraTransforms = [
    "scale(1.00) translate(0%, 0%)",
    "scale(1.00) translate(0%, 0%)",
    "scale(1.00) translate(0%, 0%)",
    "scale(1.00) translate(0%, 0%)",
    "scale(1.00) translate(0%, 0%)",
  ];

  const currentChapter = CHAPTERS_DATA[activeChapterIndex] || CHAPTERS_DATA[0];
  const currentScene = currentChapter.scenes[activeSceneIndex] || currentChapter.scenes[0];

  // Helper to determine optimal focal Y per chapter to keep architectural elements in view
  const getChapterFocalY = (chapterId?: string): number => {
    switch (chapterId) {
      case "elevation":
        return 0.16; // Keeps building roofline, facade, and architectural height fully in frame
      case "signboards":
        return 0.32; // Keeps entrance canopy lettering and signboard monolith in frame
      case "interiors":
        return 0.40; // Balanced villa architecture & garden
      case "acoustics":
      default:
        return 0.50; // Centered
    }
  };

  // Forward ref for renderFrameAt to avoid circular dependency in requestFrame
  const renderFrameAtRef = useRef<((chapIdx: number, chapProg: number) => void) | null>(null);

  // High-performance on-demand frame request with immediate onload redraw trigger
  const requestFrame = useCallback((chapter: ChapterStory, f: number): HTMLImageElement | null => {
    const arr = cacheRef.current[chapter.id];
    if (!arr || f < 0 || f >= chapter.frameCount) return null;

    if (!arr[f]) {
      const img = new window.Image();
      img.src = chapter.framePath(f);
      img.onload = () => {
        // If user is currently viewing this chapter, check if this frame is active
        const curChap = CHAPTERS_DATA[activeChapRef.current];
        if (curChap && curChap.id === chapter.id) {
          const curTarget = Math.min(
            curChap.frameCount - 1,
            Math.max(0, Math.floor(activeProgRef.current * curChap.frameCount))
          );
          if (Math.abs(curTarget - f) <= 2) {
            renderFrameAtRef.current?.(activeChapRef.current, activeProgRef.current);
          }
        }
      };
      arr[f] = img;
    }
    return arr[f];
  }, []);

  // Helper to draw an image centered with balanced architectural scaling (zero over-zoom)
  const drawImageCover = useCallback(
    (
      context: CanvasRenderingContext2D,
      img: HTMLImageElement,
      targetWidth: number,
      targetHeight: number,
      alpha = 1.0,
      chapterId?: string
    ) => {
      if (!img || !img.complete || !img.naturalWidth) return;

      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = targetWidth / targetHeight;

      // Intelligent architectural aspect scaling:
      // When screen is wider than 16:9 (common on laptops/desktops), pure cover
      // blows up the height and crops the top & bottom of buildings/signs.
      // We moderate the scale so subjects retain their full architectural stature:
      let scale: number;
      if (screenAspect > imgAspect) {
        const heightScale = targetHeight / img.naturalHeight;
        const widthScale = targetWidth / img.naturalWidth;
        scale = Math.min(widthScale, heightScale * 1.20);
      } else {
        scale = Math.max(targetWidth / img.naturalWidth, targetHeight / img.naturalHeight);
      }

      const drawWidth = img.naturalWidth * scale;
      const drawHeight = img.naturalHeight * scale;
      const x = (targetWidth - drawWidth) / 2;

      // Intelligent focal point per chapter so building tops and signboards are never cut off
      const focalY = getChapterFocalY(chapterId);
      const y = (targetHeight - drawHeight) * focalY;

      context.save();
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.drawImage(img, x, y, drawWidth, drawHeight);
      context.restore();
    },
    []
  );

  // Find nearest loaded frame if exact target frame is still pending
  const getNearestLoadedFrame = useCallback(
    (chapterId: ServiceChapterId, frameIndex: number): HTMLImageElement | null => {
      const arr = cacheRef.current[chapterId];
      if (!arr) return null;
      if (arr[frameIndex]?.complete && arr[frameIndex]?.naturalWidth) {
        return arr[frameIndex];
      }
      // Search backwards
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (arr[i]?.complete && arr[i]?.naturalWidth) return arr[i];
      }
      // Search forwards
      for (let i = frameIndex + 1; i < arr.length; i++) {
        if (arr[i]?.complete && arr[i]?.naturalWidth) return arr[i];
      }
      return null;
    },
    []
  );

  // Master frame render with seamless bidirectional inter-chapter crossfade transitions
  const renderFrameAt = useCallback(
    (chapIdx: number, chapProg: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

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

      context.clearRect(0, 0, targetWidth, targetHeight);

      const chapter = CHAPTERS_DATA[chapIdx];
      if (!chapter) return;

      // Exact frame index calculation across all available frames
      const targetFrame = Math.min(
        chapter.frameCount - 1,
        Math.max(0, Math.floor(chapProg * chapter.frameCount))
      );

      // On-demand buffer prefetching around current playhead
      requestFrame(chapter, targetFrame);
      for (let b = 1; b <= 10; b++) {
        if (targetFrame + b < chapter.frameCount) requestFrame(chapter, targetFrame + b);
        if (targetFrame - b >= 0) requestFrame(chapter, targetFrame - b);
      }

      const activeImg = getNearestLoadedFrame(chapter.id, targetFrame);

      // SECTION-TO-SECTION TRANSITIONS:
      // 1. Forward transition: Near the end of current chapter (chapProg > 0.88)
      const nextChapter = CHAPTERS_DATA[chapIdx + 1];
      // 2. Reverse transition: Near the start of current chapter (chapProg < 0.08)
      const prevChapter = CHAPTERS_DATA[chapIdx - 1];

      if (chapProg > 0.88 && nextChapter) {
        // Forward crossfade into next chapter
        const factor = (chapProg - 0.88) / 0.12; // 0.0 to 1.0
        // Prefetch opening frames of next chapter
        for (let k = 0; k < 12; k++) {
          requestFrame(nextChapter, k);
        }
        const nextImg = getNearestLoadedFrame(nextChapter.id, 0);

        if (activeImg) {
          drawImageCover(context, activeImg, targetWidth, targetHeight, 1.0 - factor, currentChapter.id);
        }
        if (nextImg) {
          drawImageCover(context, nextImg, targetWidth, targetHeight, factor, nextChapter.id);
        }
      } else if (chapProg < 0.08 && prevChapter) {
        // Reverse crossfade into previous chapter's final frame
        const factor = (0.08 - chapProg) / 0.08; // 1.0 down to 0.0
        const prevLastFrame = prevChapter.frameCount - 1;
        requestFrame(prevChapter, prevLastFrame);
        const prevImg = getNearestLoadedFrame(prevChapter.id, prevLastFrame);

        if (activeImg) {
          drawImageCover(context, activeImg, targetWidth, targetHeight, 1.0 - factor, currentChapter.id);
        }
        if (prevImg) {
          drawImageCover(context, prevImg, targetWidth, targetHeight, factor, prevChapter.id);
        }
      } else if (chapIdx === CHAPTERS_DATA.length - 1 && chapProg > 0.90) {
        // Final chapter (Elevation) transition into Project Gallery:
        // Gracefully dissolve to architectural black (#111111) to seamlessly blend into Project Gallery
        const exitFactor = (chapProg - 0.90) / 0.10;
        if (activeImg) {
          drawImageCover(context, activeImg, targetWidth, targetHeight, 1.0 - exitFactor * 0.75, currentChapter.id);
        }
      } else {
        // Normal single scene frame
        if (activeImg) {
          drawImageCover(context, activeImg, targetWidth, targetHeight, 1.0, currentChapter.id);
        }
      }
    },
    [drawImageCover, getNearestLoadedFrame, requestFrame]
  );

  renderFrameAtRef.current = renderFrameAt;

  // Ultra-Responsive Multi-Tier Preloading Engine
  useEffect(() => {
    let cancelled = false;

    // TIER 1: Load Frame 0 of ALL 4 chapters immediately for zero-delay visual on load
    CHAPTERS_DATA.forEach((chap) => {
      const img = requestFrame(chap, 0);
      if (img && chap.id === "interiors") {
        img.onload = () => {
          if (!cancelled) renderFrameAt(0, 0);
        };
      }
    });

    // TIER 2: Load keyframe anchors across ALL 4 chapters in parallel (every 15 frames)
    // Guarantees that within ~200ms, every chapter has instant visual anchors across its entire sequence!
    const loadKeyframes = () => {
      if (cancelled) return;
      CHAPTERS_DATA.forEach((chap) => {
        for (let f = 15; f < chap.frameCount; f += 15) {
          requestFrame(chap, f);
        }
      });
    };
    const keyframeTimer = setTimeout(loadKeyframes, 50);

    // TIER 3: Dense high-throughput preloader for all intermediate frames (all 920 frames)
    // Prioritizes Chapter 0 (Interiors) first, followed immediately by Acoustics, Signboards, Elevation
    const preloadAllFramesSequentially = () => {
      if (cancelled) return;

      const queue: { chapter: ChapterStory; frame: number }[] = [];

      // Interleave: Chapter 0 full sequence first, then remaining chapters
      CHAPTERS_DATA.forEach((chap) => {
        for (let f = 1; f < chap.frameCount; f++) {
          if (f % 15 !== 0) {
            queue.push({ chapter: chap, frame: f });
          }
        }
      });

      let cursor = 0;
      const BATCH_SIZE = 12;

      const processBatch = () => {
        if (cancelled || cursor >= queue.length) return;
        const end = Math.min(queue.length, cursor + BATCH_SIZE);
        for (let i = cursor; i < end; i++) {
          const item = queue[i];
          requestFrame(item.chapter, item.frame);
        }
        cursor = end;
        if (cursor < queue.length) {
          if ("requestIdleCallback" in window) {
            window.requestIdleCallback(processBatch, { timeout: 40 });
          } else {
            setTimeout(processBatch, 15);
          }
        }
      };

      processBatch();
    };

    const streamTimer = setTimeout(preloadAllFramesSequentially, 250);

    return () => {
      cancelled = true;
      clearTimeout(keyframeTimer);
      clearTimeout(streamTimer);
    };
  }, [renderFrameAt, requestFrame]);

  // Master ScrollTrigger orchestration across all four chapters (mounted ONCE)
  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    if (!container || !stage) return;

    let disposed = false;
    const isTouch = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
    // 2400px per chapter on desktop, 1400px per chapter on touch
    const perChapterDist = isTouch ? 1400 : 2400;
    const totalDistance = perChapterDist * CHAPTERS_DATA.length;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${totalDistance}`,
      pin: stage,
      scrub: isTouch ? 0.2 : 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (disposed) return;
        const p = self.progress; // 0.0 to 1.0

        // Direct DOM update for bottom rule to avoid 60fps React re-renders
        if (bottomRuleRef.current) {
          bottomRuleRef.current.style.width = `${Math.round(p * 100)}%`;
        }

        // Map global progress to active chapter index (0, 1, 2, 3)
        const chapterSpan = 1 / CHAPTERS_DATA.length;
        const chapIdx = Math.min(CHAPTERS_DATA.length - 1, Math.floor(p / chapterSpan));
        const chapProgress = (p - chapIdx * chapterSpan) / chapterSpan;

        activeChapRef.current = chapIdx;
        activeProgRef.current = chapProgress;

        // Only trigger React state updates when chapter actually changes
        if (lastChapIdxRef.current !== chapIdx) {
          lastChapIdxRef.current = chapIdx;
          setActiveChapterIndex(chapIdx);
          onChapterInViewRef.current?.(CHAPTERS_DATA[chapIdx].id);
        }

        // Only trigger React state updates when scene actually changes
        const scnIdx = Math.min(4, Math.floor(chapProgress * 5));
        if (lastSceneIdxRef.current !== scnIdx) {
          lastSceneIdxRef.current = scnIdx;
          setActiveSceneIndex(scnIdx);
        }

        // Section transition detection with direct DOM updates
        const nextChapter = CHAPTERS_DATA[chapIdx + 1];
        if (chapProgress > 0.88 && nextChapter) {
          if (!isTransitioningRef.current) {
            isTransitioningRef.current = true;
            setIsTransitioning(true);
            setTransitionTargetTitle(`${nextChapter.num} ${nextChapter.title.toUpperCase()}`);
          }
          const transProg = (chapProgress - 0.88) / 0.12;
          if (transitionShutterRef.current) {
            transitionShutterRef.current.style.opacity = String(Math.sin(transProg * Math.PI) * 0.95);
          }
          if (transitionHairlineFillRef.current) {
            transitionHairlineFillRef.current.style.width = `${Math.round(transProg * 100)}%`;
          }
        } else {
          if (isTransitioningRef.current) {
            isTransitioningRef.current = false;
            setIsTransitioning(false);
            if (transitionShutterRef.current) {
              transitionShutterRef.current.style.opacity = "0";
            }
          }
        }

        // Render synchronized frames on canvas
        renderFrameAtRef.current?.(chapIdx, chapProgress);
      },
    });

    scrollTriggerRef.current = st;

    const onResize = () => {
      if (!disposed) {
        renderFrameAtRef.current?.(activeChapRef.current, activeProgRef.current);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="service-chapters"
      className="service-chapters-unified-container"
    >
      {/* Precision Scroll Anchors for Seamless Header Navigation */}
      <div id="chapter-interiors" className="chapter-nav-anchor" style={{ top: "0%" }} />
      <div id="chapter-acoustics" className="chapter-nav-anchor" style={{ top: "25%" }} />
      <div id="chapter-signboards" className="chapter-nav-anchor" style={{ top: "50%" }} />
      <div id="chapter-elevation" className="chapter-nav-anchor" style={{ top: "75%" }} />

      <div ref={stageRef} className="architectural-stage">
        {/* Full-bleed Continuous Visual Canvas with Focal Transition */}
        <canvas
          ref={canvasRef}
          className="architectural-canvas"
          style={{
            transform: cameraTransforms[activeSceneIndex],
            transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label={`${currentChapter.title} — ${currentScene.headline}`}
        />

        {/* Delicate Scrim for Natural Contrast */}
        <div className="architectural-scrim" />

        {/* Watermark Concealment Shield */}
        <div className="watermark-blur-shield" aria-hidden="true" />

        {/* Cinematic Section-to-Section Transition Horizon */}
        <div
          ref={transitionShutterRef}
          className={`chapter-transition-shutter ${isTransitioning ? "active" : ""}`}
          style={{
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <div className="transition-badge">
            <span className="transition-eyebrow">TRANSITIONING TO CHAPTER</span>
            <span className="transition-title">{transitionTargetTitle}</span>
            <div className="transition-hairline">
              <span
                ref={transitionHairlineFillRef}
                className="transition-hairline-fill"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        {/* Pure Editorial Typography Stage */}
        <div className={`editorial-text-stage ${currentScene.layoutClass}`}>
          <div
            key={`${currentChapter.id}-scene-${activeSceneIndex}`}
            className="editorial-scene-block"
          >
            <h2 className="editorial-headline-primary">
              {currentScene.headline}
            </h2>
            <h3 className="editorial-headline-highlight">
              <em className="editorial-italic">{currentScene.highlight}</em>
            </h3>

            {/* Contextual CTA: Revealed solely on Scene 05 of each chapter */}
            {activeSceneIndex === 4 && (
              <div className="editorial-cta-wrapper">
                <button
                  type="button"
                  className="architectural-cta-link"
                  onClick={() => onCtaClick(currentChapter.serviceCategory)}
                >
                  <span className="cta-link-text">{currentChapter.ctaText}</span>
                  <span className="cta-underline" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hairline Bottom Progress Rule */}
        <div
          ref={bottomRuleRef}
          className="architectural-bottom-rule"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
