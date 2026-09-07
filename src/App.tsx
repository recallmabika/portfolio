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

const ALL_SEQUENCE: SectionId[] = ['home', 'about', 'competencies', 'projects', 'certifications', 'contact'];

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const isHome = activeSection === 'home';
  const lastScrollTime = useRef<number>(0);

  // Wheel gesture navigation (desktop)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 550) return;
      if (Math.abs(e.deltaY) < 25) return;

      const currentIndex = ALL_SEQUENCE.indexOf(activeSection);
      if (e.deltaY > 0) {
        const nextIndex = (currentIndex + 1) % ALL_SEQUENCE.length;
        setActiveSection(ALL_SEQUENCE[nextIndex]);
        lastScrollTime.current = now;
      } else if (e.deltaY < 0) {
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
    <div className="relative w-screen h-screen min-h-screen overflow-hidden flex flex-col justify-between bg-black text-white select-none">
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

      {/* Main Responsive Stage */}
      <main className="flex-1 px-4 sm:px-8 md:px-16 flex flex-col justify-between py-1 min-h-0 z-10 relative overflow-hidden">
        {!isHome ? (
          /* ================= EXPLORATION LAYOUT ================= */
          <div className="flex-1 flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-8 min-h-0 my-1 overflow-hidden">
            {/* Left Column: Top profile frame + Bottom kinetic ring */}
            <div className="w-full md:w-[340px] lg:w-[400px] flex flex-row md:flex-col justify-between items-center md:items-start flex-shrink-0 min-h-0 gap-3">
              {/* Profile Box */}
              <motion.div
                layoutId="profile-frame"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-none flex-shrink-0"
              >
                <ProfileFrame />
              </motion.div>

              {/* Kinetic Ring */}
              <motion.div
                layoutId="kinetic-ring"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="w-full flex justify-center md:justify-start items-center py-1 hidden sm:flex"
              >
                <div className="scale-75 sm:scale-80 md:scale-90 origin-center md:origin-left">
                  <KineticRing
                    activeSection={activeSection}
                    onSelectSection={setActiveSection}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column: Detailed Section Content with fluid scroll container */}
            <div className="flex-1 flex flex-col justify-center min-h-0 pl-0 md:pl-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full overflow-y-auto max-h-[62vh] sm:max-h-[66vh] md:max-h-[68vh] pr-1 sm:pr-2"
                >
                  {renderActiveSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ================= HOME LAYOUT ================= */
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 min-h-0">
              {/* Left Kinetic Ring Controller */}
              <motion.div 
                layoutId="kinetic-ring"
                transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                className="flex-shrink-0 flex items-center justify-center sm:justify-start w-full sm:w-auto"
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
                className="flex-shrink-0 flex justify-center sm:justify-end w-full sm:w-auto"
              >
                <ProfileFrame />
              </motion.div>
            </div>

            {/* Minimal initial text for Home */}
            <div className="w-full flex-1 flex flex-col justify-center min-h-0 my-1 pt-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="w-full overflow-y-auto max-h-[38vh] sm:max-h-[44vh]"
                >
                  <HomeSection />
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}

        {/* Action Bar just above footer: Responsive Download CV & Hire Now */}
        <div className="w-full flex justify-end pt-1 pb-1">
          <ActionButtons onHireClick={() => setActiveSection('contact')} />
        </div>
      </main>

      {/* Bottom Legal & Social Channels Footer */}
      <Footer />
    </div>
  );
};

export default App;