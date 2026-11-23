"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onTalkClick: () => void;
}

export default function FloatingNav({
  activeSection,
  onNavigate,
  onTalkClick,
}: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const services = [
    { id: "interiors", num: "01", label: "Interiors", title: "Interior Solutions" },
    { id: "acoustics", num: "02", label: "Acoustics", title: "Acoustics Engineering" },
    { id: "signboards", num: "03", label: "Signboards", title: "Architectural Signage" },
    { id: "elevation", num: "04", label: "Elevation", title: "Building Elevation" },
  ];

  const handleMobileNav = (sectionId: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      onNavigate(sectionId);
    }, 150);
  };

  const handleMobileTalk = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      onTalkClick();
    }, 150);
  };

  return (
    <>
      <header
        className={`architectural-header ${scrolled ? "scrolled" : ""}`}
        aria-label="Studio Navigation"
      >
        <div className="header-inner">
          {/* Left: Official Brand Identity */}
          <div
            className="brand-identity-cluster"
            onClick={() => onNavigate("interiors")}
            role="button"
            tabIndex={0}
          >
            <Image
              src="/brand/cs-emblem.png"
              alt="CARBON SPACES"
              width={28}
              height={22}
              className="brand-emblem-img"
              priority
            />
            <div className="brand-typography">
              <span className="brand-wordmark">CARBON SPACES</span>
              <span className="brand-descriptor">WE DESIGN EXPERIENCE</span>
            </div>
          </div>

          {/* Center: Minimalist Architectural Disciplines (Desktop) */}
          <nav className="disciplines-nav" role="tablist">
            {services.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`discipline-item ${isActive ? "active" : ""}`}
                  onClick={() => onNavigate(s.id)}
                >
                  <span className="disc-num">{s.num}</span>
                  <span className="disc-name">{s.label}</span>
                  {isActive && <span className="disc-active-dot" />}
                </button>
              );
            })}
          </nav>

          {/* Right: Direct Conversation Link & Mobile Hamburger */}
          <div className="header-action-cluster">
            <button
              type="button"
              className="talk-action-link"
              onClick={onTalkClick}
              aria-label="Contact Studio"
            >
              <span>Let&apos;s Talk</span>
              <span className="talk-arrow">↗</span>
            </button>

            {/* Minimal Animated Menu Trigger (Mobile) */}
            <button
              type="button"
              className={`mobile-menu-trigger ${mobileMenuOpen ? "is-active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="menu-line line-1" />
              <span className="menu-line line-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Mobile Navigation Drawer */}
      <div
        className={`mobile-fullscreen-nav ${mobileMenuOpen ? "active" : ""}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="mobile-nav-content">
          <div className="mobile-nav-eyebrow">
            <span>SPATIAL DISCIPLINES</span>
            <span className="eyebrow-rule" />
          </div>

          <div className="mobile-disciplines-list" role="tablist">
            {services.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={() => handleMobileNav(s.id)}
                >
                  <div className="link-num-col">
                    <span className="link-num">{s.num}</span>
                  </div>
                  <div className="link-text-col">
                    <span className="link-title">{s.label}</span>
                    <span className="link-subtitle">{s.title}</span>
                  </div>
                  <span className="link-arrow">↗</span>
                </button>
              );
            })}
          </div>

          <div className="mobile-nav-footer">
            <button
              type="button"
              className="mobile-nav-cta"
              onClick={handleMobileTalk}
            >
              <span>LET&apos;S TALK ABOUT YOUR SPACE ↗</span>
            </button>

            <div className="mobile-nav-meta">
              <span className="meta-studio">CARBON SPACES STUDIO</span>
              <span className="meta-location">COIMBATORE · TAMIL NADU</span>
              <a href="tel:+919600336656" className="meta-phone">+91 96003 36656</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
