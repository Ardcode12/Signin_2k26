import { useState, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import StarfieldBackground from './components/StarfieldBackground';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalEvents from './components/TechnicalEvents';
import NonTechnicalEvents from './components/NonTechnicalEvents';
import Coordinators from './components/Coordinators';
import Footer from './components/Footer';

/**
 * Root Application
 */
export default function App() {
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavigate = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      {/* Layer 0: Animated Starfield Background */}
      <StarfieldBackground />

      {/* Preloader */}
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      {/* Main app */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: ready ? 'all' : 'none',
        }}
      >
        {/* Sticky Navbar */}
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        <main>
          {/* ── HERO SECTION ── */}
          <div id="section-home" style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
              <Hero key="hero" onNavigate={handleNavigate} />
            </AnimatePresence>
          </div>

          <SectionDivider />

          {/* About */}
          <div id="section-about" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <About />
            </div>
          </div>

          <SectionDivider />

          {/* Technical Events — blackhole in background */}
          <div id="section-technical" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <TechnicalEvents />
            </div>
          </div>

          <SectionDivider />

          {/* Non-Technical Events */}
          <div id="section-nontechnical">
            <NonTechnicalEvents />
          </div>

          <SectionDivider />

          {/* Coordinators */}
          <div id="section-coordinators">
            <Coordinators />
          </div>
        </main>

        {/* Footer / Contact */}
        <div id="section-contact">
          <Footer onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
}

function SectionDivider() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '0 clamp(20px, 5vw, 80px)',
      maxWidth: 1100,
      margin: '0 auto',
    }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
      <div style={{
        width: 5, height: 5,
        background: 'rgba(255,255,255,0.35)',
        borderRadius: '50%',
        boxShadow: '0 0 8px rgba(255,255,255,0.3)',
      }} />
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
    </div>
  );
}
