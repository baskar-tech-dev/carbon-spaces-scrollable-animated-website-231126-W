"use client";

import Image from "next/image";

interface Leader {
  id: string;
  name: string;
  initials: string;
  designation: string;
  quote: string;
  phone: string;
  telLink: string;
  ctaText: string;
}

const LEADERS: Leader[] = [
  {
    id: "kb",
    name: "Kanakabharathi K",
    initials: "KB",
    designation: "Managing Director",
    quote: "Every great transformation begins with a vision.",
    phone: "+91 98948 39789",
    telLink: "tel:+919894839789",
    ctaText: "CONNECT WITH OUR MANAGING DIRECTOR →",
  },
  {
    id: "sm",
    name: "Sivakumar Mani",
    initials: "SM",
    designation: "Regional Director",
    quote: "Turning a shared vision into meaningful progress.",
    phone: "+91 94894 86866",
    telLink: "tel:+919489486866",
    ctaText: "DISCUSS YOUR PROJECT →",
  },
  {
    id: "gp",
    name: "Gowtham Palaniswamy",
    initials: "GP",
    designation: "Regional Director",
    quote: "Every detail matters when an idea becomes reality.",
    phone: "+91 97919 99998",
    telLink: "tel:+919791999998",
    ctaText: "TALK ABOUT YOUR SPACE →",
  },
];

export default function LeadershipSection() {
  return (
    <section className="leadership-section" id="leadership">
      <div className="leadership-header">
        <div className="section-title-with-emblem">
          <div>
            <span className="section-eyebrow">THE PEOPLE BEHIND THE SPACES</span>
            <h2 className="section-headline">
              GREAT SPACES BEGIN WITH PEOPLE<br />
              <em>WHO SEE BEYOND THEM.</em>
            </h2>
          </div>
          <Image
            src="/brand/cs-emblem.png"
            alt="CARBON SPACES Emblem"
            width={72}
            height={48}
            className="section-header-emblem"
          />
        </div>
        <p className="section-sublead">
          Behind every transformation is a vision, a decision and a team committed to bringing ideas into reality.
          Meet the leadership behind <strong>CARBON SPACES</strong>.
        </p>
      </div>

      <div className="leadership-grid">
        {LEADERS.map((leader, index) => (
          <div key={leader.id} className="leader-card">
            <div className="leader-portrait-frame">
              <div className="leader-monogram">
                <span className="leader-initials">{leader.initials}</span>
                <span className="leader-ring" />
              </div>
              <div className="leader-number">0{index + 1}</div>
            </div>

            <div className="leader-info">
              <span className="leader-designation">{leader.designation}</span>
              <h3 className="leader-name">{leader.name}</h3>
              <blockquote className="leader-quote">&ldquo;{leader.quote}&rdquo;</blockquote>

              <div className="leader-contact">
                <span className="leader-phone-label">DIRECT LINE</span>
                <a href={leader.telLink} className="leader-phone-number">
                  {leader.phone}
                </a>
              </div>

              <a href={leader.telLink} className="leader-cta-btn">
                {leader.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
