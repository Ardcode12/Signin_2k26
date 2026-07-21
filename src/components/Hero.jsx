import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import useParallax from '../hooks/useParallax';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Hero Section — clean editorial layout.
 * Left-aligned content, floating planet on the right.
 * No emojis. Single accent color (violet).
 */
export default function Hero({ onNavigate }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.1, [-40, 40]);
  const { ref: planetParallaxRef, y: planetY } = useParallax(0.08, [30, -30]);

  useEffect(() => {
    const handle = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 22,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <motion.section
      ref={(el) => { heroRef.current = el; parallaxRef.current = el; }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px clamp(24px, 6vw, 96px) 80px',
      }}
    >
      {/* Single ambient nebula glow — teal only */}
      <div className="nebula-blob" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,184,150,0.14) 0%, transparent 70%)',
        top: '10%', right: '-8%',
        animationDelay: '0s',
      }} />
      <div className="nebula-blob" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(0,184,150,0.07) 0%, transparent 70%)',
        bottom: '5%', left: '-5%',
        animationDelay: '4s',
      }} />

      {/* Main layout: left content + right planet */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 48,
        flexWrap: 'wrap',
      }}>

        {/* LEFT: Text content — parallax shifts up */}
        <motion.div style={{ flex: '1 1 480px', maxWidth: 640, position: 'relative', zIndex: 2, y: parallaxY }}

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ marginBottom: 28 }}
          >
            <span className="section-badge">Interstellar Theme &nbsp;·&nbsp; Tech Fest 2026</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(3.8rem, 10vw, 8.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 0.92,
              marginBottom: 24,
              color: '#f0f0f8',
            }}
          >
            <span className="hero-title-shimmer">SIGIN</span>
            <br />
            <span style={{ color: 'rgba(34,229,187,0.82)', fontWeight: 800 }}>'26</span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.48, duration: 0.6, ease: 'easeOut' }}
            style={{
              width: 60, height: 1,
              background: 'rgba(34,229,187,0.6)',
              marginBottom: 24,
              transformOrigin: 'left',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              fontWeight: 300,
              color: 'rgba(240,240,248,0.72)',
              lineHeight: 1.65,
              marginBottom: 48,
              maxWidth: 480,
            }}
          >
            Journey beyond the known.{' '}
            <span style={{ color: 'rgba(240,240,248,0.95)', fontWeight: 500 }}>
              Where intellect meets the infinite cosmos.
            </span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.button
              className="btn-primary"
              onClick={() => onNavigate('technical')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Events
            </motion.button>
            <motion.button
              className="btn-ghost"
              onClick={() => onNavigate('about')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            style={{
              display: 'flex',
              gap: 40,
              marginTop: 64,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              flexWrap: 'wrap',
            }}
          >
            {[
              { val: '5+',  label: 'Events' },
              { val: '2',   label: 'Tracks' },
              { val: '\'26', label: 'Edition' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                  fontWeight: 800,
                  color: '#f0f0f8',
                  lineHeight: 1,
                  marginBottom: 6,
                }}>{val}</div>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 11,
                  color: 'rgba(240,240,248,0.35)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Planet / orbit visual — parallax shifts opposite direction */}
        <motion.div
          ref={planetParallaxRef}
          className="hide-mobile"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: '0 0 auto',
            width: 'clamp(260px, 30vw, 380px)',
            height: 'clamp(260px, 30vw, 380px)',
            position: 'relative',
            zIndex: 1,
            transform: `translate(${mousePos.x * 0.35}px, ${mousePos.y * 0.35}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            {/* Outer orbit ring */}
            <div style={{
              position: 'absolute', inset: -24,
              border: '1px solid rgba(0,184,150,0.18)',
              borderRadius: '50%',
              animation: 'slow-spin 28s linear infinite',
            }}>
              {/* Orbiting dot */}
              <div style={{
                position: 'absolute', top: '8%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 7, height: 7,
                borderRadius: '50%',
                background: 'rgba(34,229,187,0.8)',
                boxShadow: '0 0 10px rgba(34,229,187,0.6)',
              }} />
            </div>

            {/* Inner orbit ring */}
            <div style={{
              position: 'absolute', inset: 12,
              border: '1px solid rgba(0,184,150,0.1)',
              borderRadius: '50%',
              animation: 'slow-spin-rev 18s linear infinite',
            }}>
              <div style={{
                position: 'absolute', bottom: '6%', right: '8%',
                width: 5, height: 5,
                borderRadius: '50%',
                background: 'rgba(34,229,187,0.5)',
              }} />
            </div>

            {/* Planet body */}
            <div style={{
              position: 'absolute', inset: 28,
              borderRadius: '50%',
              background: `
                radial-gradient(circle at 32% 28%,
                  rgba(34,229,187,0.35) 0%,
                  rgba(0,140,115,0.5) 35%,
                  rgba(5,30,35,0.9) 70%,
                  rgba(8,10,28,1) 100%
                )
              `,
              boxShadow: `
                inset -20px -20px 40px rgba(0,0,0,0.6),
                inset 15px 10px 30px rgba(34,229,187,0.12),
                0 0 60px rgba(0,184,150,0.18),
                0 0 120px rgba(0,184,150,0.07)
              `,
              overflow: 'hidden',
            }}>
              {/* Surface highlight bands */}
              <div style={{
                position: 'absolute', top: '22%', left: '10%',
                width: '55%', height: '10%',
                background: 'rgba(34,229,187,0.08)',
                borderRadius: 20,
                filter: 'blur(5px)',
              }} />
              <div style={{
                position: 'absolute', top: '48%', left: '25%',
                width: '35%', height: '7%',
                background: 'rgba(34,229,187,0.05)',
                borderRadius: 20,
                filter: 'blur(4px)',
              }} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}
      >
        <span style={{
          fontFamily: 'Space Grotesk',
          fontSize: 9,
          letterSpacing: '0.35em',
          color: 'rgba(240,240,248,0.25)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        {/* Animated mouse */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 18, height: 28,
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 9,
            display: 'flex', justifyContent: 'center', paddingTop: 5,
          }}
        >
          <div style={{
            width: 2, height: 6,
            background: 'rgba(34,229,187,0.6)',
            borderRadius: 2,
          }} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
