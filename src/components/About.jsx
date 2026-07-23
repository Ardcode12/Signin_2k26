import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import ModelCanvas from './ModelCanvas';

const MODEL_BREAKPOINTS = {
  desktop: {
    scale: 1.5,
    pos: [0.5, -1.8, -1],
    rot: [0.01, 0.4, 0],
  },
  tablet: {
    scale: 1.2,
    pos: [0.3, -1.5, -1],
    rot: [0.01, 0.4, 0],
  },
  mobile: {
    scale: 0.9,
    pos: [0, -1.2, -1],
    rot: [0.01, 0.3, 0],
  },
  mobileSmall: {
    scale: 2,
    pos: [0, -1.9, -1],
    rot: [0.01, 0.3, 0],
  },
};

function getBreakpointKey(width) {
  if (width <= 480) return 'mobileSmall';
  if (width < 768)  return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

const PILLARS = [
  {
    label: 'Deep Space Theme',
    desc: 'An Interstellar-inspired universe redefines the way intellect and creativity collide.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="11" cy="11" r="4" />
        <ellipse cx="11" cy="11" rx="10" ry="4" transform="rotate(-30 11 11)" />
      </svg>
    ),
  },
  {
    label: 'Tech & Non-Tech',
    desc: 'From coding challenges and paper presentations to creative group events — one fest, two dimensions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 9 2 12 5 15" />
        <polyline points="17 9 20 12 17 15" />
        <line x1="9" y1="6" x2="13" y2="18" />
      </svg>
    ),
  },
  {
    label: 'Prizes & Glory',
    desc: 'Stellar rewards for the brightest minds. Compete, collaborate, and claim your place among the stars.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 2 13.4 8.5 20 8.5 14.8 12.6 16.9 19 11 15.2 5.1 19 7.2 12.6 2 8.5 8.6 8.5 11 2" />
      </svg>
    ),
  },
];

/**
 * About Section — sticky freeze effect + deep indigo theme.
 * The outer wrapper is sticky so the viewport "freezes" here
 * while content animates in.
 */
export default function About() {
  const [activeKey, setActiveKey] = useState(() => getBreakpointKey(typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const update = () => setActiveKey(getBreakpointKey(window.innerWidth));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const bp = MODEL_BREAKPOINTS[activeKey];
  const modelConfig = {
    pos: bp.pos,
    rot: bp.rot,
    scale: bp.scale,
    speed: 1.0,
    visible: true,
    autoRotate: false,
    animate: true,
    interactable: true,
    float: false,
    floatSpeed: 0.45,
    floatAmplitude: 0.08,
    sway: true,
    swaySpeed: 0.3,
    swayAmplitude: 0.025,
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  useEffect(() => {
    if (isInView) {
      // Use window object to prevent duplicate plays during React HMR or strict mode double-renders
      if (!window.__aboutAudioPlayed) {
        window.__aboutAudioPlayed = true;
        const audio = new Audio('/audio/man_sppech.mp3');
        audio.volume = 0.8; // Set volume to 80% to be present but not deafening
        
        // Duck the global background audio to make speech clear
        if (window.__bgAudio) {
          window.__bgAudio.volume = 0.08; // Mild volume
        }

        audio.play().catch(e => console.warn('Audio playback blocked by browser:', e));

        // Restore global background audio when speech finishes
        audio.addEventListener('ended', () => {
          if (window.__bgAudio) {
            window.__bgAudio.volume = 0.4; // Normal ambient volume
          }
        });
      }
    }
  }, [isInView]);

  return (
    /* ── Full height section wrapper ── */
    <div ref={containerRef} style={{ position: 'relative', minHeight: '100vh', overflow: 'visible' }}>
      {/* Background is transparent to show global Starfield */}

      {/* ── Floating gradient blobs (from Hero) ── */}
      <motion.div
        animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          top: '5%', right: '-10%',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          bottom: '5%', left: '-5%',
          borderRadius: '50%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* 3D Astronaut model */}
      <ModelCanvas
        path="/model_glb/man.glb"
        config={modelConfig}
        fov={42}
        style={{
          position: 'absolute',
          top: (activeKey === 'mobile' || activeKey === 'mobileSmall') ? '0' : '-10%',
          left: 0,
          width: (activeKey === 'mobile' || activeKey === 'mobileSmall') ? '100%' : '45%',
          height: (activeKey === 'mobile' || activeKey === 'mobileSmall') ? '55vh' : '120%',
          zIndex: 1, 
          opacity: 0.95,
        }}
      />

      {/* Content — animates in on scroll */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, margin: '0 auto',
          padding: (activeKey === 'mobile' || activeKey === 'mobileSmall')
            ? 'clamp(48vh, 52vh, 58vh) clamp(16px, 5vw, 48px) 60px'
            : 'clamp(120px, 15vh, 160px) clamp(24px, 6vw, 96px) 100px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: (activeKey === 'mobile' || activeKey === 'mobileSmall') ? 'flex-start' : 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px', /* reduced gap */
          width: '100%',
          maxWidth: '540px', /* Restrict to right half of screen */
        }}>
          {/* TOP: Heading + body */}
          <div>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              style={{ marginBottom: 24 }}
            >
              <span style={{
                fontFamily: 'Enbora',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 100,
                padding: '5px 18px',
                display: 'inline-block',
              }}>
                About the Event
              </span>
            </motion.div>

            {/* LARGE display heading — mixed sizes */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <p style={{
                fontFamily: 'Enbora',
                fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
              }}>
                SIGININ'26 — ANNUAL SYMPOSIUM
              </p>
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', /* reduced size */
                fontWeight: 900,
                color: '#f0f0f8',
                lineHeight: 1.08,
                marginBottom: 4,
                letterSpacing: '-0.02em',
              }}>
                Where Technology
              </h2>
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 900,
                lineHeight: 1.08,
                marginBottom: 20,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                textShadow: '0 0 40px rgba(255,255,255,0.15)',
              }}>
                Meets the Cosmos
              </h2>
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } }}
              style={{
                fontFamily: 'Enbora',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', /* slightly smaller */
                lineHeight: 1.8,
                color: 'rgba(240,240,248,0.6)',
                marginBottom: 8,
                maxWidth: 480,
              }}
            >
              <strong style={{ color: 'rgba(240,240,248,0.95)', fontFamily: 'Enbora', fontWeight: 600 }}>Siginin'26</strong> is the annual intercollegiate symposium, reborn under an{' '}
              <em style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'normal', fontWeight: 500 }}>Interstellar</em> theme — an odyssey through innovation, creativity, and intellect.
            </motion.p>
            {/* Second paragraph removed to fit on page nicely */}
          </div>

          {/* BOTTOM: Feature pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PILLARS.map(({ label, desc, icon }, i) => (
              <motion.div
                key={label}
                variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } } }}
                whileHover={{ borderColor: 'rgba(255,255,255,0.25)', boxShadow: '0 8px 40px rgba(255,255,255,0.08)', x: 4 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: '16px 24px', /* reduced padding to fit vertically */
                  display: 'flex', gap: 18, alignItems: 'center', /* center align for smaller height */
                  transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 42, height: 42, /* slightly smaller icon box */
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  {icon}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'Enbora',
                    fontWeight: 700,
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                    color: '#f0f0f8',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                  }}>{label}</h3>
                  <p style={{
                    fontFamily: 'Enbora',
                    fontSize: 12, /* slightly smaller font to fit well */
                    color: 'rgba(240,240,248,0.48)',
                    lineHeight: 1.5,
                    margin: 0,
                  }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
