import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Preloader — clean warp-speed intro, no emojis.
 * Three concentric spinning rings + title + progress bar.
 * Fades out after ~2.8s.
 */
export default function Preloader({ onComplete }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      onComplete?.();
    }, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020309',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 40,
            overflow: 'hidden',
          }}
        >
          {/* Warp speed lines (background) */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${(i / 24) * 100 + Math.sin(i) * 3}%`,
                  left: '50%',
                  height: `${0.5 + (i % 3) * 0.5}px`,
                  background: 'linear-gradient(90deg, transparent, rgba(0,184,150,0.7), transparent)',
                  animationName: i % 2 === 0 ? 'warp-out' : undefined,
                  animationDuration: `${0.5 + (i % 4) * 0.2}s`,
                  animationDelay: `${(i * 0.06)}s`,
                  animationTimingFunction: 'ease-out',
                  animationIterationCount: '4',
                  animationFillMode: 'both',
                  width: 0,
                  opacity: 0,
                  transform: i % 2 !== 0 ? 'scaleX(-1)' : undefined,
                }}
              />
            ))}
          </div>

          {/* Concentric rings */}
          <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute', inset: 0,
              border: '1px solid rgba(0,184,150,0.4)',
              borderTopColor: 'rgba(34,229,187,0.9)',
              borderRadius: '50%',
              animation: 'slow-spin 1.6s linear infinite',
            }} />
            {/* Mid ring */}
            <div style={{
              position: 'absolute', inset: 14,
              border: '1px solid rgba(0,184,150,0.25)',
              borderBottomColor: 'rgba(34,229,187,0.7)',
              borderRadius: '50%',
              animation: 'slow-spin-rev 2s linear infinite',
            }} />
            {/* Inner filled orb */}
            <div style={{
              position: 'absolute', inset: 30,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, rgba(34,229,187,0.35), rgba(0,184,150,0.08))',
              border: '1px solid rgba(0,184,150,0.2)',
            }} />
            {/* Center dot */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 8, height: 8,
              borderRadius: '50%',
              background: 'rgba(34,229,187,0.9)',
              boxShadow: '0 0 16px rgba(34,229,187,0.7)',
            }} />
          </div>

          {/* Title + subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '0.18em',
              color: '#f0f0f8',
              marginBottom: 10,
            }}>
              SIGIN<span style={{ color: 'rgba(34,229,187,0.85)' }}>'26</span>
            </h1>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              color: 'rgba(240,240,248,0.35)',
              letterSpacing: '0.4em',
              fontSize: 11,
              textTransform: 'uppercase',
            }}>
              Interstellar · Initiating
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              width: 180,
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{ height: '100%', background: 'rgba(34,229,187,0.8)', borderRadius: 2 }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
