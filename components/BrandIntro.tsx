"use client";

import Image from "next/image";

interface BrandIntroProps {
  onSelectCategory: (category: "interior" | "acoustics" | "signage" | "elevation") => void;
  onExploreClick: () => void;
  onTransformClick: () => void;
}

export default function BrandIntro({
  onSelectCategory,
  onExploreClick,
  onTransformClick,
}: BrandIntroProps) {
  const categories = [
    { id: "interior" as const, num: "01", name: "INTERIOR SOLUTIONS", desc: "Atmosphere & Emotion" },
    { id: "acoustics" as const, num: "02", name: "ACOUSTICS", desc: "Precision Sound Architecture" },
    { id: "signage" as const, num: "03", name: "SIGNBOARDS", desc: "Distinctive Brand Presence" },
    { id: "elevation" as const, num: "04", name: "ELEVATION", desc: "Landmark Facade Systems" },
  ];

  return (
    <section className="brand-intro" id="brand-intro">
      <div className="brand-intro-backdrop" />
      <div className="brand-intro-content">
        {/* Master Double-Line Brand Lockup */}
        <div className="brand-header-lockup">
          <Image
            src="/brand/logo-horizontal-double.png"
            alt="CARBON SPACES — We Design Experience"
            width={320}
            height={88}
            className="brand-intro-logo"
            priority
          />
          <div className="brand-badge-wrapper">
            <span className="brand-intro-badge">COMPLETE SPACE TRANSFORMATION COMPANY</span>
            <span className="brand-location-tag">TAMIL NADU, INDIA</span>
          </div>
        </div>

        <h1 className="brand-intro-headline">
          YOUR SPACE IS SAYING SOMETHING.<br />
          <em>IS IT SAYING THE RIGHT THING?</em>
        </h1>

        <div className="brand-intro-grid">
          <div className="brand-intro-body">
            <p className="brand-lead">
              Your space speaks before you do. It shapes first impressions, influences experiences
              and reflects the identity behind your business.
            </p>
            <p className="brand-sublead">
              At <strong>CARBON SPACES</strong>, we transform ordinary spaces into extraordinary experiences.
              We unite interior design, acoustic science, dimensional signage, and architectural elevation into
              one seamless vision.
            </p>

            <div className="brand-intro-ctas">
              <button
                type="button"
                className="btn-primary"
                onClick={onTransformClick}
              >
                LET&apos;S TRANSFORM YOUR SPACE →
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={onExploreClick}
              >
                DISCOVER WHAT YOUR SPACE COULD BECOME ↓
              </button>
            </div>

            <p className="brand-microcopy">
              Have a space in mind? Let&apos;s talk about what it could become.
            </p>
          </div>

          <div className="brand-disciplines-list">
            <div className="disciplines-header-row">
              <span className="disciplines-header">DISCOVER THE FOUR DISCIPLINES</span>
              <Image
                src="/brand/cs-emblem.png"
                alt="CS Emblem"
                width={36}
                height={24}
                className="disciplines-emblem-icon"
              />
            </div>
            <div className="disciplines-cards">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className="discipline-card"
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <div className="discipline-meta">
                    <span className="discipline-num">{cat.num}</span>
                    <span className="discipline-arrow">↗</span>
                  </div>
                  <h3 className="discipline-name">{cat.name}</h3>
                  <p className="discipline-desc">{cat.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
