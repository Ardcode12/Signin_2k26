import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import StarfieldBackground from './components/StarfieldBackground';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechnicalEvents from './components/TechnicalEvents';
import NonTechnicalEvents from './components/NonTechnicalEvents';
import Coordinators from './components/Coordinators';
import Footer from './components/Footer';
import ModelConfigPanel, { DEFAULTS } from './components/ModelConfigPanel';
import ModelCanvas from './components/ModelCanvas';

/**
 * Root Application
 *
 * Architecture:
 * - Fixed StarfieldBackground canvas (z-index 0)
 * - Fixed CustomCursor overlay (z-index 9999)
 * - Preloader shown on first load
 * - Sticky Navbar (z-index 1000)
 * - Floating 3D Config panel (z-index 2000) — top-right, always visible
 * - Main content area with parallax sections
 * - Footer always rendered below main section
 *
 * 3D GLB models:
 *   - ship.glb  → fixed overlay on Hero section
 *   - man.glb   → fixed overlay on Hero section
 *   - blackhole.glb → positioned at Events section
 */
export default function App() {
  const [ready, setReady] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 3D model config state — driven by ModelConfigPanel
  const [modelConfigs, setModelConfigs] = useState(DEFAULTS);

  const handleConfigChange = useCallback((modelKey, field, value) => {
    setModelConfigs(prev => ({
      ...prev,
      [modelKey]: { ...prev[modelKey], [field]: value },
    }));
  }, []);

  const handleNavigate = useCallback((id) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 'contact') {
      const footer = document.getElementById('section-contact');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', position: 'relative' }}>
      {/* Layer 0: Animated Starfield Background */}
      <StarfieldBackground />

      {/* Layer 9999: Custom Cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!ready && <Preloader onComplete={() => setReady(true)} />}

      {/* 3D Config Panel — always mounted, hidden when not ready */}
      {ready && (
        <ModelConfigPanel configs={modelConfigs} onChange={handleConfigChange} />
      )}

      {/* Main app (fades in after preloader) */}
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

        {/* ── HERO GLB OVERLAYS ──
            Absolutely positioned over the hero viewport.
            ship (jet) on the right side, man on the left side.
        */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 2,
        }}>
          {/* Jet / Ship — right side of hero */}
          <ModelCanvas
            path="/model_glb/ship.glb"
            config={modelConfigs.ship}
            fov={35}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '55%',
              height: '100%',
            }}
          />
          {/* Astronaut Man — left side of hero */}
          <ModelCanvas
            path="/model_glb/man.glb"
            config={modelConfigs.man}
            fov={40}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '45%',
              height: '100%',
            }}
          />
        </div>

        {/* Main Content — all sections scrollable with parallax */}
        <main>
          {/* Home */}
          <div id="section-home">
            <AnimatePresence mode="wait">
              <Hero key="hero" onNavigate={handleNavigate} />
            </AnimatePresence>
          </div>

          <SectionDivider />

          {/* About */}
          <div id="section-about">
            <About />
          </div>

          <SectionDivider />

          {/* Technical Events — blackhole GLB overlaid here */}
          <div id="section-technical" style={{ position: 'relative' }}>
            {/* Blackhole — floats in the background of events section */}
            <ModelCanvas
              path="/model_glb/blackhole.glb"
              config={modelConfigs.blackhole}
              fov={38}
              style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '60%',
                height: '120%',
                zIndex: 0,
                opacity: 0.85,
              }}
            />
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

/**
 * Subtle cosmic divider between sections.
 */
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
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,184,150,0.2), transparent)' }} />
      <div style={{
        width: 6, height: 6,
        background: 'rgba(34,229,187,0.6)',
        borderRadius: '50%',
        boxShadow: '0 0 8px rgba(34,229,187,0.6)',
      }} />
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,184,150,0.2), transparent)' }} />
    </div>
  );
}
