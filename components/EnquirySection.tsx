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

export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Retail / Shopping Mall"
  | "Office"
  | "Auditorium"
  | "Other";

export type ContactMethod = "Phone" | "WhatsApp" | "Email";

interface EnquirySectionProps {
  initialService?: ServiceType;
}

export default function EnquirySection({ initialService = "Interior Solutions" }: EnquirySectionProps) {
  const [service, setService] = useState<ServiceType>(initialService);
  const [projectType, setProjectType] = useState<ProjectType>("Commercial");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("Phone");
  const [fileName, setFileName] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const choices: { id: ServiceType; title: string; cta: string; desc: string }[] = [
    {
      id: "Interior Solutions",
      title: "INTERIOR SOLUTIONS",
      cta: "TRANSFORM MY INTERIOR →",
      desc: "Complete interior spatial planning, bespoke finishes, and evocative living and working environments.",
    },
    {
      id: "Acoustics",
      title: "ACOUSTICS",
      cta: "IMPROVE MY ACOUSTICS →",
      desc: "Architectural sound isolation, reverberation control, acoustic wood slats, and auditorium engineering.",
    },
    {
      id: "Signboards",
      title: "SIGNBOARDS",
      cta: "CREATE MY SIGNAGE →",
      desc: "Precision 3D lettering, architectural building identification, and custom LED illuminated facades.",
    },
    {
      id: "Elevation",
      title: "ELEVATION",
      cta: "REIMAGINE MY BUILDING →",
      desc: "ACP cladding, glass curtain walls, kinetic louvers, and landmark commercial exterior transformations.",
    },
  ];

  const handleSelectChoice = (selectedService: ServiceType) => {
    setService(selectedService);
    const formElement = document.getElementById("enquiry-form-card");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getWhatsAppMessage = (selectedService: string) => {
    const text = `Hello CARBON SPACES, I am interested in your ${selectedService}. I would like to discuss my project.`;
    return `https://wa.me/919600336656?text=${encodeURIComponent(text)}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";

    const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
    if (!phone.trim()) {
      newErrors.phone = "Please enter your contact number.";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Please provide a valid phone number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!location.trim()) newErrors.location = "Please provide your city/location.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
        projectType,
        details,
        contactMethod,
        fileName,
        submittedAt: new Date().toISOString(),
      };

      console.log("CARBON SPACES project enquiry payload:", payload);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch {
      setSubmitError("There was an issue processing your submission. Please call our office directly at +91 96003 36656.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="enquiry-section" id="enquiry-form">
      <div className="enquiry-container">
        {/* Section 08 Conversion Showcase */}
        <div className="enquiry-hero">
          <span className="section-eyebrow">THE CONVERSATION</span>
          <h2 className="section-headline">
            YOU HAVE THE SPACE.<br />
            <em>WE SEE WHAT IT COULD BECOME.</em>
          </h2>
          <p className="enquiry-lead">
            An empty interior. A noisy environment. An unnoticed brand. An ordinary building.<br />
            Whatever you&apos;re planning, the next transformation starts with a conversation.
          </p>

          <div className="enquiry-choices-header">
            <h3>WHAT ARE YOU THINKING OF TRANSFORMING?</h3>
            <p>Select a discipline to pre-configure your project conversation:</p>
          </div>

          <div className="enquiry-choices-grid">
            {choices.map((choice) => (
              <div
                key={choice.id}
                className={`choice-card ${service === choice.id ? "selected" : ""}`}
                onClick={() => handleSelectChoice(choice.id)}
              >
                <div className="choice-title-row">
                  <h4>{choice.title}</h4>
                  <span className="choice-indicator">{service === choice.id ? "● ACTIVE" : "○"}</span>
                </div>
                <p className="choice-desc">{choice.desc}</p>
                <button type="button" className="choice-cta">
                  {choice.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="direct-actions-row">
            <a href="tel:+919600336656" className="direct-call-btn">
              CALL OUR OFFICE: +91 96003 36656
            </a>
            <a
              href={getWhatsAppMessage(service)}
              target="_blank"
              rel="noopener noreferrer"
              className="direct-whatsapp-btn"
            >
              CHAT ON WHATSAPP ↗
            </a>
          </div>
        </div>

        {/* Section 13 Interactive Form Card */}
        <div className="enquiry-form-card" id="enquiry-form-card">
          <div className="form-header">
            <div className="form-brand-top">
              <Image
                src="/brand/carbon-text.png"
                alt="CARBON"
                width={160}
                height={55}
                className="form-text-logo"
              />
            </div>
            <span className="form-badge">PROJECT CONVERSATION</span>
            <h3>LET&apos;S TALK ABOUT YOUR SPACE.</h3>
            <p>Tell us what you&apos;re planning. We&apos;ll take the conversation forward.</p>
          </div>

          {isSubmitted ? (
            <div className="form-success-box">
              <div className="success-icon">✓</div>
              <h4>THANK YOU FOR THINKING BEYOND THE ORDINARY.</h4>
              <p>
                Your enquiry for <strong>{service}</strong> in <strong>{location}</strong> has been received.
                The CARBON SPACES team will follow up with you via {contactMethod}.
              </p>
              <div className="success-actions">
                <a
                  href={getWhatsAppMessage(service)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  START WHATSAPP CHAT NOW ↗
                </a>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsSubmitted(false)}
                >
                  SUBMIT ANOTHER PROJECT
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="project-form">
              {submitError && <div className="form-error-banner">{submitError}</div>}

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Senthil Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={errors.name ? "input-error" : ""}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Contact Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? "input-error" : ""}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="senthil@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="location">Location / City *</label>
                  <input
                    id="location"
                    type="text"
                    placeholder="e.g. Coimbatore, Tamil Nadu"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={errors.location ? "input-error" : ""}
                  />
                  {errors.location && <span className="error-text">{errors.location}</span>}
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label htmlFor="service">Service Required *</label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceType)}
                  >
                    <option value="Interior Solutions">Interior Solutions</option>
                    <option value="Acoustics">Acoustics</option>
                    <option value="Signboards">Signboards</option>
                    <option value="Elevation">Elevation</option>
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Not Sure Yet">Not Sure Yet</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="projectType">Project Type</label>
                  <select
                    id="projectType"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Retail / Shopping Mall">Retail / Shopping Mall</option>
                    <option value="Office">Office</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="details">Tell Us About Your Project</label>
                <textarea
                  id="details"
                  rows={4}
                  placeholder="Share details regarding your space, timeline, existing condition, or specific requirements..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>

              <div className="form-row form-row-2">
                <div className="form-field">
                  <label>Preferred Contact Method</label>
                  <div className="radio-group">
                    {(["Phone", "WhatsApp", "Email"] as ContactMethod[]).map((method) => (
                      <label key={method} className="radio-label">
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={contactMethod === method}
                          onChange={() => setContactMethod(method)}
                        />
                        <span>{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="referenceUpload">Optional Reference Upload</label>
                  <input
                    id="referenceUpload"
                    type="file"
                    className="file-input"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                  {fileName && <span className="file-hint">Attached: {fileName}</span>}
                </div>
              </div>

              <div className="form-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary form-submit-btn"
                >
                  {isSubmitting ? "PROCESSING ENQUIRY…" : "LET'S DISCUSS MY PROJECT →"}
                </button>
                <span className="privacy-note">
                  Your information is handled with architectural confidentiality.
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
