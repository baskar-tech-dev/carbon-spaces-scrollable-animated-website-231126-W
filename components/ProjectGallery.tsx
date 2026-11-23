"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  location: string;
  year: string;
  image: string;
  aspectClass: string;
  description: string;
  details: string[];
}

const PROJECTS: ProjectItem[] = [
  {
    id: "horizon-villa",
    name: "The Horizon Villa Sanctuary",
    category: "Interior Solutions",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    image: "/frames/ezgif-frame-140.jpg",
    aspectClass: "project-large",
    description:
      "A complete spatial transformation uniting contemporary luxury interior architecture with natural lighting, bespoke finishes, and tactile material compositions.",
    details: [
      "Custom Teakwood & Bronze Millwork",
      "Concealed Architectural Ambient Lighting",
      "Open-Plan Living & Dining Flow",
      "Ergonomic Spatial Balance",
    ],
  },
  {
    id: "acoustic-hall",
    name: "Precision Auditorium Acoustics",
    category: "Acoustics",
    location: "Avinashi Road, Coimbatore",
    year: "2024",
    image: "/acoustics-frames/ezgif-frame-120.jpg",
    aspectClass: "project-tall",
    description:
      "Scientifically engineered acoustic wall panels and ceiling baffles delivering pristine speech intelligibility and balanced reverberation control.",
    details: [
      "NRC 0.85+ Acoustic Panel Systems",
      "Reverberation Time (RT60) Optimization",
      "Sound Isolation & Vibration Damping",
      "Integrated Architectural Lighting Sconces",
    ],
  },
  {
    id: "monolith-signage",
    name: "The Carbon Commercial Monolith",
    category: "Signboards",
    location: "Commercial Hub, Tamil Nadu",
    year: "2024",
    image: "/signage/ezgif-frame-120.jpg",
    aspectClass: "project-wide",
    description:
      "Precision-machined 3D architectural lettering mounted on natural textured stone, illuminated by warm, indirect champagne-gold LED backlighting.",
    details: [
      "Laser-Cut Solid Metal Lettering",
      "Architectural Backlit LED Array (3000K Warm Gold)",
      "Weather-Resistant Marine Grade Backing",
      "Distinctive Street-Level Brand Stature",
    ],
  },
  {
    id: "lumina-elevation",
    name: "Lumina Facade & Elevation",
    category: "Elevation",
    location: "Coimbatore, Tamil Nadu",
    year: "2024",
    image: "/elevation/ezgif-frame-120.jpg",
    aspectClass: "project-large",
    description:
      "Transforming an ordinary commercial building exterior into an architectural landmark through contemporary ACP cladding and expansive glass facade systems.",
    details: [
      "High-Spec ACP Exterior Cladding",
      "Structural Glazing & Insulated Glass",
      "Architectural Louvers & Sunshades",
      "Day-to-Night Dynamic Facade Lighting",
    ],
  },
];

interface ProjectGalleryProps {
  onEnquireProject: (category: string) => void;
}

export default function ProjectGallery({ onEnquireProject }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="project-gallery-section" id="selected-work">
      <div className="gallery-header-block">
        <div className="gallery-eyebrow-row">
          <span className="section-eyebrow">SELECTED WORK</span>
          <span className="gallery-count-badge">04 FEATURED ARCHITECTURAL SPACES</span>
        </div>
        <h2 className="section-headline">
          Environments conceived with purpose.<br />
          <em>Executed with precision.</em>
        </h2>
        <p className="gallery-subtext">
          An editorial survey of spaces transformed across Tamil Nadu, where structure, sound, identity, and elevation coalesce.
        </p>
      </div>

      {/* Asymmetrical Architectural Gallery Grid */}
      <div className="asymmetrical-gallery-grid">
        {PROJECTS.map((project, idx) => (
          <article
            key={project.id}
            className={`gallery-item-card ${project.aspectClass}`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="gallery-image-wrapper">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="gallery-project-img"
              />
              <div className="gallery-image-scrim" />
              <div className="gallery-item-index">0{idx + 1}</div>
            </div>

            <div className="gallery-item-caption">
              <div className="caption-meta">
                <span className="caption-category">{project.category}</span>
                <span className="caption-location">{project.location}</span>
              </div>
              <h3 className="caption-title">{project.name}</h3>
              <div className="caption-cta">
                <span>VIEW PROJECT SPECIFICATIONS</span>
                <span className="caption-arrow">↗</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dedicated Full-Screen Project Detail Modal */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="project-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Project Detail"
            >
              ✕
            </button>

            <div className="modal-hero-image-wrap">
              <Image
                src={selectedProject.image}
                alt={selectedProject.name}
                fill
                priority
                className="modal-hero-image"
              />
              <div className="modal-image-gradient" />
              <div className="modal-badge-group">
                <span className="modal-cat-badge">{selectedProject.category}</span>
                <span className="modal-loc-badge">{selectedProject.location}</span>
              </div>
            </div>

            <div className="modal-body-content">
              <h3 className="modal-project-title">{selectedProject.name}</h3>
              <p className="modal-project-desc">{selectedProject.description}</p>

              <div className="modal-specs-section">
                <h4 className="modal-specs-heading">ARCHITECTURAL SPECIFICATIONS</h4>
                <ul className="modal-specs-list">
                  {selectedProject.details.map((spec) => (
                    <li key={spec}>
                      <span className="spec-bullet">◆</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    onEnquireProject(selectedProject.category);
                    setSelectedProject(null);
                  }}
                >
                  DISCUSS SIMILAR {selectedProject.category.toUpperCase()} PROJECT →
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  CLOSE SPECIFICATIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
