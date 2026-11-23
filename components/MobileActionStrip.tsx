"use client";

export default function MobileActionStrip() {
  return (
    <div className="mobile-action-strip" aria-label="Quick contact actions">
      <a href="tel:+919600336656" className="mobile-strip-btn call-btn">
        <span className="btn-icon">📞</span>
        <span>CALL OFFICE</span>
      </a>
      <a
        href="https://wa.me/919600336656?text=Hello%20CARBON%20SPACES,%20I%20would%20like%20to%20discuss%20my%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-strip-btn whatsapp-btn"
      >
        <span className="btn-icon">💬</span>
        <span>WHATSAPP</span>
      </a>
    </div>
  );
}
