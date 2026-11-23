"use client";

import Image from "next/image";

export default function BrandPhilosophy() {
  return (
    <section className="brand-philosophy-section" id="philosophy">
      <div className="philosophy-container">
        {/* Magazine-Style Editorial Header with Strong Negative Space */}
        <div className="philosophy-manifesto-grid">
          <div className="philosophy-text-col">
            <div className="philosophy-eyebrow-line">
              <span className="section-eyebrow">ARCHITECTURAL MANIFESTO</span>
              <span className="edition-tag">CARBON SPACES / EDITORIAL</span>
            </div>

            <h2 className="philosophy-oversized-headline">
              Design is not just about<br />
              creating spaces.<br />
              <em className="editorial-em">It&apos;s about creating experiences.</em>
            </h2>

            <div className="philosophy-columns-block">
              <p className="philosophy-column-text">
                Every structure begins as inert matter — concrete, glass, aluminium, timber.
                It only breathes when spatial proportion, light, and acoustic atmosphere converge.
                We reject the idea that an interior is merely furnished or a facade is simply clad.
              </p>
              <p className="philosophy-column-text">
                When you step into a Carbon Spaces environment, your senses register harmony before
                your intellect analyzes the room. True luxury is not ostentation; it is the deliberate
                absence of discord and the effortless presence of purpose.
              </p>
            </div>

            <div className="philosophy-quote-attribution">
              <div className="attribution-avatar">
                <Image
                  src="/brand/cs-emblem.png"
                  alt="CS Emblem"
                  width={36}
                  height={24}
                  className="attribution-emblem"
                />
              </div>
              <div className="attribution-meta">
                <span className="attribution-name">CARBON SPACES</span>
                <span className="attribution-role">COIMBATORE · TAMIL NADU</span>
              </div>
            </div>
          </div>

          <div className="philosophy-visual-col">
            <div className="philosophy-featured-frame">
              <Image
                src="/frames/ezgif-frame-195.jpg"
                alt="Architectural Interior by Carbon Spaces"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="philosophy-portrait-img"
              />
              <div className="philosophy-frame-caption">
                <span className="caption-marker">FIG. 01</span>
                <span className="caption-text">SPATIAL TRANSFORMATION · RESIDENTIAL LIVING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
