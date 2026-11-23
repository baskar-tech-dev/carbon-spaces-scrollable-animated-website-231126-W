"use client";

import Image from "next/image";

interface WhyCarbonSpacesProps {
  onDiscussClick: () => void;
}

export default function WhyCarbonSpaces({ onDiscussClick }: WhyCarbonSpacesProps) {
  const pillars = [
    {
      num: "01",
      title: "THINK BEYOND APPEARANCES",
      text: "Great spaces are designed around the people who experience them. We shape environments that evoke emotion, spark connection, and leave lasting impressions.",
    },
    {
      num: "02",
      title: "DESIGN WITH PURPOSE",
      text: "Every material, detail and element should contribute to the bigger vision. Nothing is accidental — form and function align to elevate your everyday reality.",
    },
    {
      num: "03",
      title: "EXECUTE WITH PRECISION",
      text: "An idea becomes meaningful when it is carefully brought to life. Rigorous architectural discipline ensures the finish matches the original creative ambition.",
    },
    {
      num: "04",
      title: "CREATE A COMPLETE EXPERIENCE",
      text: "Look beyond individual elements. Think about the entire environment — where interior aesthetics, sound acoustics, brand signage, and exterior elevation harmonize into one identity.",
    },
  ];

  return (
    <section className="why-section" id="why-carbon-spaces">
      <div className="why-container">
        <div className="why-header">
          <div className="section-title-with-emblem">
            <div>
              <span className="section-eyebrow">THE PHILOSOPHY</span>
              <h2 className="section-headline">
                WHY SETTLE FOR PIECES WHEN YOU CAN<br />
                <em>TRANSFORM THE WHOLE EXPERIENCE?</em>
              </h2>
            </div>
            <Image
              src="/brand/cs-emblem.png"
              alt="CARBON SPACES Emblem"
              width={64}
              height={44}
              className="section-header-emblem"
            />
          </div>
          <p className="why-sublead">
            <strong>Interior. Acoustics. Signage. Elevation.</strong><br />
            Four disciplines that shape how a space looks, sounds, communicates and feels.
          </p>
        </div>

        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="pillar-card">
              <div className="pillar-num">{pillar.num}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.text}</p>
            </div>
          ))}
        </div>

        <div className="why-action">
          <button type="button" className="btn-primary" onClick={onDiscussClick}>
            LET&apos;S DISCUSS YOUR PROJECT →
          </button>
        </div>
      </div>
    </section>
  );
}
