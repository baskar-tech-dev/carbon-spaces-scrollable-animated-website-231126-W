"use client";

import { useState } from "react";
import Image from "next/image";

export type ServiceType =
  | "Interior Solutions"
  | "Acoustics"
  | "Signboards"
  | "Elevation"
  | "Multiple Services"
  | "Not Sure Yet";

interface ContactExperienceProps {
  initialService?: ServiceType;
}

export default function ContactExperience({
  initialService = "Interior Solutions",
}: ContactExperienceProps) {
  const [service, setService] = useState<ServiceType>(initialService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [preferredMethod, setPreferredMethod] = useState<"Phone" | "WhatsApp" | "Email">("Phone");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const leadershipContacts = [
    {
      name: "Kanakabharathi K",
      role: "Managing Director",
      phone: "+91 98948 39789",
      tel: "tel:+919894839789",
    },
    {
      name: "Sivakumar Mani",
      role: "Regional Director",
      phone: "+91 94894 86866",
      tel: "tel:+919489486866",
    },
    {
      name: "Gowtham Palaniswamy",
      role: "Regional Director",
      phone: "+91 97919 99998",
      tel: "tel:+919791999998",
    },
  ];

  const getWhatsAppLink = (selectedCategory: string) => {
    const text = `Hello CARBON SPACES, I am interested in discussing a ${selectedCategory} project.`;
    return `https://wa.me/919600336656?text=${encodeURIComponent(text)}`;
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";

    const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
    if (!phone.trim()) {
      errs.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(phone.trim())) {
      errs.phone = "Please provide a valid phone number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please provide a valid email address.";
    }

    if (!location.trim()) errs.location = "Please enter your city/location.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        email,
        location,
        service,
        description,
        preferredMethod,
        timestamp: new Date().toISOString(),
      };
      console.log("CARBON SPACES project consultation submission:", payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        "There was a temporary transmission issue. You can reach our office directly at +91 96003 36656."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-experience-section" id="contact">
      <div className="contact-experience-container">
        {/* Editorial Contact Header */}
        <div className="contact-editorial-header">
          <div className="contact-badge-line">
            <span className="section-eyebrow">PROJECT INITIATION</span>
            <span className="contact-location-tag">COIMBATORE · TAMIL NADU</span>
          </div>

          <h2 className="contact-headline">
            Have a space in mind?
          </h2>

          <p className="contact-subheadline">
            Let&apos;s turn your vision into something you can experience.
          </p>
        </div>

        <div className="contact-editorial-grid">
          {/* Left Column: Direct Consultation & Leadership Access */}
          <div className="contact-info-column">
            <div className="contact-brand-card">
              <Image
                src="/brand/logo-horizontal-double.png"
                alt="CARBON SPACES — We Design Experience"
                width={260}
                height={72}
                className="contact-brand-logo"
              />
              <p className="contact-brand-statement">
                We design environments, acoustic soundscapes, illuminated identities, and exterior elevations
                that reshape everyday human experiences.
              </p>
            </div>

            <div className="contact-direct-office">
              <span className="direct-label">OFFICE DESK</span>
              <a href="tel:+919600336656" className="direct-phone-val">
                +91 96003 36656
              </a>
              <span className="direct-sublabel">MON – SAT · 09:30 AM TO 07:00 PM IST</span>
            </div>

            <div className="contact-direct-whatsapp">
              <a
                href={getWhatsAppLink(service)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-action-card"
              >
                <div className="wa-icon-col">💬</div>
                <div className="wa-text-col">
                  <span className="wa-title">DIRECT WHATSAPP CONSULTATION</span>
                  <span className="wa-desc">Instant conversation regarding your space</span>
                </div>
                <span className="wa-arrow">↗</span>
              </a>
            </div>

            <div className="contact-leadership-list">
              <span className="leadership-section-tag">EXECUTIVE LEADERSHIP</span>
              <div className="leadership-mini-cards">
                {leadershipContacts.map((leader) => (
                  <div key={leader.name} className="leader-mini-card">
                    <div className="leader-mini-top">
                      <span className="leader-mini-name">{leader.name}</span>
                      <span className="leader-mini-role">{leader.role}</span>
                    </div>
                    <a href={leader.tel} className="leader-mini-call">
                      <span>{leader.phone}</span>
                      <span className="call-icon">📞</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Full-Screen Editorial Form */}
          <div className="contact-form-column">
            <div className="editorial-form-wrapper">
              <div className="form-legend-row">
                <span className="form-legend-title">PROJECT SPECIFICATIONS</span>
                <span className="form-legend-note">CONFIDENTIAL ENQUIRY</span>
              </div>

              {isSubmitted ? (
                <div className="contact-success-state">
                  <div className="success-crest">✓</div>
                  <h3 className="success-title">THANK YOU FOR THINKING BEYOND THE ORDINARY.</h3>
                  <p className="success-message">
                    Your enquiry regarding <strong>{service}</strong> in <strong>{location}</strong> has been logged.
                    Our architectural team will review spatial parameters and reach out via {preferredMethod}.
                  </p>
                  <div className="success-actions-row">
                    <a
                      href={getWhatsAppLink(service)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      OPEN IN WHATSAPP ↗
                    </a>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      SUBMIT ANOTHER SPACE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="editorial-contact-form">
                  {submitError && <div className="form-error-banner">{submitError}</div>}

                  {/* Service Selection Pills */}
                  <div className="form-group">
                    <label className="field-label">SERVICE REQUIRED *</label>
                    <div className="service-pills-selector">
                      {(
                        [
                          "Interior Solutions",
                          "Acoustics",
                          "Signboards",
                          "Elevation",
                          "Multiple Services",
                          "Not Sure Yet",
                        ] as ServiceType[]
                      ).map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={`service-select-pill ${service === item ? "selected" : ""}`}
                          onClick={() => setService(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Phone */}
                  <div className="form-fields-duo">
                    <div className="form-field-unit">
                      <label htmlFor="client-name" className="field-label">
                        YOUR NAME *
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        placeholder="e.g. Senthil Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "input-has-error" : ""}
                      />
                      {errors.name && <span className="field-error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-field-unit">
                      <label htmlFor="client-phone" className="field-label">
                        PHONE NUMBER *
                      </label>
                      <input
                        id="client-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={errors.phone ? "input-has-error" : ""}
                      />
                      {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Email and Location */}
                  <div className="form-fields-duo">
                    <div className="form-field-unit">
                      <label htmlFor="client-email" className="field-label">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        id="client-email"
                        type="email"
                        placeholder="senthil@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "input-has-error" : ""}
                      />
                      {errors.email && <span className="field-error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-field-unit">
                      <label htmlFor="client-location" className="field-label">
                        CITY / LOCATION *
                      </label>
                      <input
                        id="client-location"
                        type="text"
                        placeholder="e.g. Coimbatore, Tamil Nadu"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={errors.location ? "input-has-error" : ""}
                      />
                      {errors.location && <span className="field-error-msg">{errors.location}</span>}
                    </div>
                  </div>

                  {/* Project Description */}
                  <div className="form-field-unit">
                    <label htmlFor="client-desc" className="field-label">
                      PROJECT DESCRIPTION & SPATIAL INTENT
                    </label>
                    <textarea
                      id="client-desc"
                      rows={4}
                      placeholder="Tell us about the property, square footage, design requirements, or specific acoustic / signage / facade expectations..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {/* Preferred Contact Mode */}
                  <div className="form-field-unit">
                    <label className="field-label">PREFERRED CONTACT METHOD</label>
                    <div className="contact-methods-row">
                      {(["Phone", "WhatsApp", "Email"] as const).map((method) => (
                        <label key={method} className="method-radio-item">
                          <input
                            type="radio"
                            name="contactMode"
                            checked={preferredMethod === method}
                            onChange={() => setPreferredMethod(method)}
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submission Row */}
                  <div className="form-action-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary submit-project-btn"
                    >
                      {isSubmitting ? "PROCESSING TRANSMISSION…" : "SUBMIT PROJECT ENQUIRY →"}
                    </button>
                    <span className="form-discretion-note">
                      Architectural discretion assured · Carbon Spaces Coimbatore
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
