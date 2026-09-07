import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SectionId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { KineticRing } from './components/KineticRing';
import { ProfileFrame } from './components/ProfileFrame';
import { ActionButtons } from './components/ActionButtons';
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { CompetenciesSection } from './components/sections/CompetenciesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';

// Ordered sequence including home for scroll/wheel navigation
const ALL_SEQUENCE: SectionId[] = ['home', 'about', 'competencies', 'projects', 'certifications', 'contact'];

export const App: React.FC = () => {
  // Start on 'home' (initial closed ring state with minimal info)
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const isHome = activeSection === 'home';
  const lastScrollTime = useRef<number>(0);

  // Wheel / Scroll gesture navigation: scrolling down moves to next section, scrolling up moves to previous
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Threshold & debounce to avoid rapid multi-triggers
      const now = Date.now();
      if (now - lastScrollTime.current < 550) return;
      if (Math.abs(e.deltaY) < 25) return;

      const currentIndex = ALL_SEQUENCE.indexOf(activeSection);
      if (e.deltaY > 0) {
        // Scroll Down -> Next Section
        const nextIndex = (currentIndex + 1) % ALL_SEQUENCE.length;
        setActiveSection(ALL_SEQUENCE[nextIndex]);
        lastScrollTime.current = now;
      } else if (e.deltaY < 0) {
        // Scroll Up -> Previous Section
        const prevIndex = (currentIndex - 1 + ALL_SEQUENCE.length) % ALL_SEQUENCE.length;
        setActiveSection(ALL_SEQUENCE[prevIndex]);
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'about':
        return <AboutSection />;
      case 'competencies':
        return <CompetenciesSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col justify-between bg-black text-white select-none">
      {/* Background Graphic: User's Dotted Africa Map */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-25 mix-blend-screen"
        style={{
          backgroundImage: 'url(/africa-map.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8% center',
          backgroundSize: 'contain',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
      </div>

      {/* Top Header Navigation */}
      <Header 
        activeSection={activeSection} 
        onSelectSection={setActiveSection}
        hideName={!isHome}
      />

      {/* Main Single-Viewport Stage */}
      <main className="flex-1 px-8 md:px-16 flex flex-col justify-between py-1 min-h-0 z-10 relative">
        {/* Dynamic Multi-State Stage */}
        {!isHome ? (
          /* ================= EXPLORATION LAYOUT (ABOUT, COMPETENCIES, PROJECTS, CERTS, CONTACT) =================
             1. Profile box moves to top-left (where the name brand was).
             2. Kinetic Ring moves down to lower-left and expands.
             3. Expanded content renders on the right where the profile box was.
          */
          <div className="flex-1 flex flex-col md:flex-row items-stretch justify-between gap-8 min-h-0 my-1">
            {/* Left Column: Top profile frame + Bottom expanded kinetic ring */}
            <div className="w-full md:w-[380px] lg:w-[420px] flex flex-col justify-between items-start flex-shrink-0 min-h-0">
              {/* Profile Box positioned at top-left */}
              <motion.div
                layoutId="profile-frame"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="w-full flex-shrink-0"
              >
                <ProfileFrame />
              </motion.div>

              {/* Kinetic Ring shifted down towards the bottom */}
              <motion.div
                layoutId="kinetic-ring"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="w-full flex justify-start items-center py-2"
              >
                <div className="scale-85 md:scale-90 origin-left">
                  <KineticRing
                    activeSection={activeSection}
                    onSelectSection={setActiveSection}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Detailed Section Content occupying the large right space */}
            <div className="flex-1 flex flex-col justify-center min-h-0 pl-0 md:pl-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  className="w-full overflow-y-auto max-h-[68vh] pr-2"
                >
                  {renderActiveSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ================= HOME LAYOUT =================
             - Closed/collapsed ring on top left with 'HOME' label
             - Profile box on top right
             - Minimal initial home info displayed below
          */
          <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 min-h-0">
              {/* Left Kinetic Ring Controller (Closed circles in Home) */}
              <motion.div 
                layoutId="kinetic-ring"
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="flex-shrink-0 flex items-center justify-start"
              >
                <KineticRing
                  activeSection={activeSection}
                  onSelectSection={setActiveSection}
                />
              </motion.div>

              {/* Right Profile Frame */}
              <motion.div 
                layoutId="profile-frame"
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="flex-shrink-0 flex justify-end"
              >
                <ProfileFrame />
              </motion.div>
            </div>

            {/* Minimal initial text for Home */}
            <div className="w-full flex-1 flex flex-col justify-center min-h-0 my-1 pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  className="w-full"
                >
                  <HomeSection />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Action Bar just above the footer: Download CV & Hire Now */}
        <ActionButtons onHireClick={() => setActiveSection('contact')} />
      </main>

      {/* Bottom Legal & Social Channels Footer */}
      <Footer />
    </div>
  );
};

export default App;