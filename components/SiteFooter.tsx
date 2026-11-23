"use client";

import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact-info">
      <div className="footer-container">
        <div className="footer-top-row">
          {/* Brand Col */}
          <div className="footer-brand-column">
            <Image
              src="/brand/logo-horizontal-double.png"
              alt="CARBON SPACES — We Design Experience"
              width={260}
              height={72}
              className="footer-brand-logo"
            />
            <p className="footer-editorial-statement">
              Complete space transformations across Tamil Nadu. Uniting interior solutions, acoustic engineering,
              dimensional signage, and modern building elevation into one holistic architectural identity.
            </p>
          </div>

          {/* Direct Lines */}
          <div className="footer-info-col">
            <span className="footer-col-title">DIRECT INQUIRIES</span>
            <ul className="footer-contact-list">
              <li>
                <span className="item-label">General Desk</span>
                <a href="tel:+919600336656" className="item-val">
                  +91 96003 36656
                </a>
              </li>
              <li>
                <span className="item-label">Direct Email</span>
                <a href="mailto:interioirscarboniq@gmail.com" className="item-val">
                  interioirscarboniq@gmail.com
                </a>
              </li>
              <li>
                <span className="item-label">WhatsApp Channel</span>
                <a
                  href="https://wa.me/919600336656?text=Hello%20CARBON%20SPACES,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-val"
                >
                  Start WhatsApp Conversation ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Address */}
          <div className="footer-info-col">
            <span className="footer-col-title">STUDIO LOCATION</span>
            <address className="footer-studio-address">
              <strong>CARBON SPACES</strong><br />
              No. 204, 2nd Floor, Tanny Beacon,<br />
              Near KMCH, Avinashi Road,<br />
              Coimbatore, Tamil Nadu, India.
            </address>
            <a
              href="https://maps.google.com/?q=Tanny+Beacon+Avinashi+Road+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-action"
            >
              LOCATE ON GOOGLE MAPS ↗
            </a>
          </div>

          {/* Spatial Disciplines */}
          <div className="footer-info-col">
            <span className="footer-col-title">SPATIAL DISCIPLINES</span>
            <ul className="footer-disciplines-index">
              <li><a href="#service-chapters">01 / Interior Solutions</a></li>
              <li><a href="#service-chapters">02 / Acoustics Architecture</a></li>
              <li><a href="#service-chapters">03 / Dimensional Signboards</a></li>
              <li><a href="#service-chapters">04 / Building Elevation</a></li>
              <li><a href="#selected-work">Selected Architectural Work</a></li>
              <li><a href="#philosophy">Architectural Manifesto</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="footer-colophon-row">
          <p className="colophon-copyright">
            &copy; {new Date().getFullYear()} CARBON SPACES. ALL RIGHTS RESERVED. WE DESIGN EXPERIENCE.
          </p>
          <div className="colophon-regional-notes">
            <span>COIMBATORE · CHENNAI · SALEM · TIRUPPUR · TAMIL NADU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
