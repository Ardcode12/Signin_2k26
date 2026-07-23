import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

/**
 * Preloader — clean warp-speed intro.
 * Dept logo + concentric spinning rings + title + progress bar.
 * Fades out after assets load.
 */
export default function Preloader({ onComplete }) {
  const [done, setDone] = useState(false);
  const { progress, total } = useProgress();

  useEffect(() => {
    if (progress === 100 && total > 0) {
      const t = setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [progress, total, onComplete]);

  // Fallback in case models fail to load or cache skips the 100% event
  useEffect(() => {
    const t = setTimeout(() => {
      if (!done) {
        setDone(true);
        onComplete?.();
      }
    }, 15000);
    return () => clearTimeout(t);
  }, [done, onComplete]);

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
            /* Shiny black bg — deep piano black with subtle gloss */
            background: 'radial-gradient(ellipse at 30% 20%, #1a1a1a 0%, #050505 40%, #000000 100%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 36,
            overflow: 'hidden',
          }}
        >
          {/* Top-left subtle gloss sheen */}
          <div style={{
            position: 'absolute', top: 0, left: 0,
            width: '60%', height: '40%',
            background: 'radial-gradient(ellipse at 20% 10%, rgba(255,255,255,0.035) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

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
                  /* White warp lines — no green */
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
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

          {/* Dept Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Outer rotating arc ring around logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -14,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 120 120">
                <circle
                  cx="60" cy="60" r="56"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                  strokeDasharray="263 88"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
            {/* Inner counter-rotating arc */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: -6,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="216 72"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Dept logo image */}
            <div style={{
              width: 92, height: 92,
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'radial-gradient(circle at 35% 28%, #2a2a2a 0%, #111 30%, #000 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: `
                inset 0 2px 8px rgba(255,255,255,0.1),
                inset 0 -4px 12px rgba(0,0,0,0.9),
                0 0 30px rgba(255,255,255,0.06)
              `,
            }}>
              <img
                src="/images/dept_logo.jpg"
                alt="Department Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
                onError={e => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          </motion.div>

          {/* Title + subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{
              fontFamily: "'Fedrin Sambo', 'Orbitron', sans-serif",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '0.18em',
              color: '#f0f0f8',
              marginBottom: 10,
              textShadow: '0 0 40px rgba(255,255,255,0.15)',
            }}>
              Siginin<span style={{ color: 'rgba(255,255,255,0.5)' }}>'26</span>
            </h1>
            <p style={{
              fontFamily: 'Enbora, sans-serif',
              color: 'rgba(240,240,248,0.35)',
              letterSpacing: '0.4em',
              fontSize: 11,
              textTransform: 'uppercase',
            }}>
              {progress < 100 ? `Loading Assets · ${Math.round(progress)}%` : 'Interstellar · Ready'}
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
              style={{ height: '100%', background: 'rgba(255,255,255,0.6)', borderRadius: 2 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
