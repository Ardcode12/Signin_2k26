import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import useParallax from '../hooks/useParallax';

const ModelCanvas = lazy(() => import('./ModelCanvas'));

const SHIP_CONFIG = {
  pos: [-0.5, 0.2, -2],
  rot: [0, -0.6, -0.1],
  scale: 0.4,
  speed: 1,
  visible: true,
  autoRotate: false,
  animate: true,
  mobile: {
    scale: 0.28,
    pos: [0, 0.5, -3],
  },
};

/* ── Spec easing: cubic-bezier(0.16, 1, 0.3, 1) ── */
const EASE = [0.16, 1, 0.3, 1];

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    const isNumeric = !isNaN(Number(target.replace(/[^0-9]/g, '')));
    if (!isNumeric) { setCount(target); return; }
    const end = parseInt(target.replace(/[^0-9]/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(`${Math.floor(eased * end)}${suffix}`);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

/* ── Individual stat counter ── */
function StatCounter({ val, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useCountUp(val, 1600, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1,
        marginBottom: 6,
        textShadow: '0 0 20px rgba(255,255,255,0.3)',
      }}>{count || val}</div>
      <div style={{
        fontFamily: 'Enbora, sans-serif',
        fontSize: 11,
        color: 'rgba(240,240,248,0.35)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
      }}>{label}</div>
    </motion.div>
  );
}

/**
 * Hero Section — with college logo above title.
 */
export default function Hero({ onNavigate }) {
  const heroRef = useRef(null);
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.1, [-40, 40]);

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
        padding: '120px clamp(16px, 3vw, 48px) 80px',
      }}
    >
      {/* ── Floating gradient blobs — subtle white, no green ── */}
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
        }}
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          bottom: '5%', left: '-5%',
          borderRadius: '50%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main layout */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 48, flexWrap: 'wrap',
      }}>
        {/* LEFT: staggered entrance sequence */}
        <motion.div style={{ flex: '1 1 300px', maxWidth: 640, position: 'relative', zIndex: 2, y: parallaxY }}>

          {/* College Logo — Top of Hero */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}
          >
            <div style={{
              height: 90,
              width: 'auto',
              maxWidth: '100%',
              flexShrink: 0,
              display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
            }}>
              <img
                src="/images/clg_logo.png"
                alt="College Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

          </motion.div>

          {/* 1. Badge — first to enter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            style={{ marginBottom: 16 }}
          >
            <span className="section-badge">Department of Information Technology</span>
          </motion.div>

          {/* 2. Main heading — Fedrin Sambo font */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            style={{
              fontFamily: "'Fedrin Sambo', 'Orbitron', sans-serif",
              fontSize: 'clamp(3.8rem, 10vw, 8.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              lineHeight: 0.92,
              marginBottom: 12,
              color: '#f0f0f8',
            }}
          >
            <span className="hero-title-shimmer">Siginin</span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 800 }}>'26</span>
          </motion.h1>


          {/* Divider line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.48, duration: 0.6, ease: 'easeOut' }}
            style={{
              width: 60, height: 1.5,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
              marginBottom: 16,
              transformOrigin: 'left',
              borderRadius: 2,
            }}
          />

          {/* 3. Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: EASE }}
            style={{
              fontFamily: 'Enbora, sans-serif',
              fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
              fontWeight: 300,
              color: 'rgba(240,240,248,0.7)',
              lineHeight: 1.7,
              marginBottom: 28,
              maxWidth: 480,
            }}
          >
            Journey beyond the known.{' '}
            <span style={{ color: 'rgba(240,240,248,0.95)', fontWeight: 500 }}>
              Where intellect meets the infinite cosmos.
            </span>
          </motion.p>

          {/* 4. CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.6, ease: EASE }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <motion.button
              className="btn-primary"
              onClick={() => onNavigate('technical')}
              whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Explore Events
            </motion.button>
            <motion.button
              className="btn-ghost"
              onClick={() => onNavigate('about')}
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              Learn More
            </motion.button>
          </motion.div>


        </motion.div>

        {/* RIGHT: 3D Ship */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', zIndex: 1 }}>
          <Suspense fallback={null}>
            <ModelCanvas path="/model_glb/ship.glb" config={SHIP_CONFIG} fov={35} style={{ width: '100%', height: '100%' }} />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute', bottom: 36, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}
      >
        <span style={{
          fontFamily: 'Enbora', fontSize: 9,
          letterSpacing: '0.35em', color: 'rgba(240,240,248,0.25)',
          textTransform: 'uppercase',
        }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 18, height: 28,
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 9,
            display: 'flex', justifyContent: 'center', paddingTop: 5,
          }}
        >
          <div style={{ width: 2, height: 6, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
