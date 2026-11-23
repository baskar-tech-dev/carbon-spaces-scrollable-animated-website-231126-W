"use client";

import { useState, useCallback } from "react";
import SplashScreen from "@/components/SplashScreen";
import FloatingNav from "@/components/FloatingNav";
import ServiceChapters, { ServiceChapterId } from "@/components/ServiceChapters";
import ProjectGallery from "@/components/ProjectGallery";
import BrandPhilosophy from "@/components/BrandPhilosophy";
import ContactExperience, { ServiceType } from "@/components/ContactExperience";
import SiteFooter from "@/components/SiteFooter";
import MobileActionStrip from "@/components/MobileActionStrip";

export default function Home() {
  const [activeNavSection, setActiveNavSection] = useState<string>("interiors");
  const [selectedService, setSelectedService] = useState<ServiceType>("Interior Solutions");

  const mapChapterToService = (chap: ServiceChapterId): ServiceType => {
    switch (chap) {
      case "interiors":
        return "Interior Solutions";
      case "acoustics":
        return "Acoustics";
      case "signboards":
        return "Signboards";
      case "elevation":
        return "Elevation";
    }
  };

  const handleNavigate = (sectionId: string) => {
    if (["interiors", "acoustics", "signboards", "elevation"].includes(sectionId)) {
      setActiveNavSection(sectionId);
      setSelectedService(mapChapterToService(sectionId as ServiceChapterId));

      const container = document.getElementById("service-chapters");
      if (container) {
        const rect = container.getBoundingClientRect();
        const startY = window.scrollY + rect.top;
        const isTouch = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
        const perChapterDist = isTouch ? 1400 : 2400;
        const chapterIndices: Record<string, number> = {
          interiors: 0,
          acoustics: 1,
          signboards: 2,
          elevation: 3,
        };
        const idx = chapterIndices[sectionId] ?? 0;
        const targetY = startY + idx * perChapterDist + (idx > 0 ? 12 : 0);
        window.scrollTo({
          top: targetY,
          behavior: "smooth",
        });
        return;
      }

      const el = document.getElementById(`chapter-${sectionId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChapterInView = useCallback((chapterId: ServiceChapterId) => {
    setActiveNavSection(chapterId);
    setSelectedService(mapChapterToService(chapterId));
  }, []);

  const handleCtaClick = (serviceCategory: string) => {
    if (serviceCategory.toLowerCase().includes("interior")) {
      setSelectedService("Interior Solutions");
    } else if (serviceCategory.toLowerCase().includes("acoustic")) {
      setSelectedService("Acoustics");
    } else if (serviceCategory.toLowerCase().includes("sign")) {
      setSelectedService("Signboards");
    } else if (serviceCategory.toLowerCase().includes("elevation")) {
      setSelectedService("Elevation");
    } else {
      setSelectedService("Interior Solutions");
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleTalkClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="main-viewport">
      {/* 00. Cinematic Splash Screen */}
      <SplashScreen />

      {/* 01. Single Refined Floating Architectural Control */}
      <FloatingNav
        activeSection={activeNavSection}
        onNavigate={handleNavigate}
        onTalkClick={handleTalkClick}
      />

      {/* 02. Unified Master Hero Experience: Four Service Chapters with 20 Scroll Storytelling Scenes */}
      <ServiceChapters
        onChapterInView={handleChapterInView}
        onCtaClick={handleCtaClick}
      />

      {/* 03. Selected Work — Architectural Project Gallery */}
      <ProjectGallery onEnquireProject={handleCtaClick} />

      {/* 04. Brand Philosophy — Make People Feel the Brand */}
      <BrandPhilosophy />

      {/* 05. Contact Experience — Let's Create Something */}
      <ContactExperience initialService={selectedService} />

      {/* 06. Shared Architectural Studio Footer */}
      <SiteFooter />

      {/* Mobile Sticky Quick Action Strip */}
      <MobileActionStrip />
    </main>
  );
}
