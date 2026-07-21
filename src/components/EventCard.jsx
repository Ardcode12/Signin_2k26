import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone } from 'lucide-react';

/**
 * Reusable EventCard with 3D tilt, hover glow, and expandable accordion.
 */
export default function EventCard({ event, accentColor = '#00b896', index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  const accentRGB = {
    '#00b896': '0,184,150',
    '#22e5bb': '34,229,187',
    '#38bdf8': '56,189,248',
    '#f59e0b': '245,158,11',
    '#0d9488': '13,148,136',
    '#db2777': '219,39,119',
    '#f97316': '249,115,22',
  }[accentColor] || '0,184,150';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(${accentRGB},0.2)`,
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'none',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        boxShadow: `0 20px 60px rgba(${accentRGB},0.2), 0 0 0 1px rgba(${accentRGB},0.3)`,
      }}
    >
      {/* Top gradient stripe */}
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${accentColor}, transparent, ${accentColor})`,
        opacity: 0.8,
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRGB},0.12), transparent)`,
        pointerEvents: 'none',
      }} />

      {/* Scan line */}
      <div className="scan-line" style={{ opacity: 0.3 }} />

      <div style={{ padding: '28px 28px 0' }}>
        {/* Icon + number */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div style={{
            width: 52, height: 52,
            background: `rgba(${accentRGB},0.15)`,
            border: `1px solid rgba(${accentRGB},0.3)`,
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>
            {typeof event.icon === 'function'
              ? <event.icon size={24} color={accentColor} strokeWidth={1.5} />
              : <span style={{ fontSize: 24 }}>{event.icon}</span>
            }
          </div>
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 11,
            color: accentColor,
            opacity: 0.6,
            letterSpacing: '0.2em',
            background: `rgba(${accentRGB},0.1)`,
            padding: '4px 10px',
            borderRadius: 100,
            border: `1px solid rgba(${accentRGB},0.2)`,
          }}>
            {event.tag || `EVENT ${String(index + 1).padStart(2, '0')}`}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
          color: 'white',
          marginBottom: 10,
        }}>{event.title}</h3>

        {event.description && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            marginBottom: 16,
          }}>{event.description}</p>
        )}

        {/* Rounds if present */}
        {event.rounds && (
          <div style={{ marginBottom: 16 }}>
            {event.rounds.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                marginBottom: 8,
              }}>
                <span style={{
                  background: `rgba(${accentRGB},0.2)`,
                  color: accentColor,
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontFamily: 'Orbitron',
                  flexShrink: 0,
                  marginTop: 2,
                }}>R{i + 1}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter', lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expand button */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          borderTop: `1px solid rgba(${accentRGB},0.15)`,
          marginTop: 4,
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'none',
          color: accentColor,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.05em',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = `rgba(${accentRGB},0.06)`}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Users size={14} strokeWidth={1.5} /> {expanded ? 'Hide' : 'View'} Coordinators
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 16 }}
        >
          ▾
        </motion.span>
      </button>

      {/* Expandable coordinator section */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '16px 28px 24px',
              background: `rgba(${accentRGB},0.04)`,
              borderTop: `1px solid rgba(${accentRGB},0.1)`,
            }}>
              <p style={{
                fontFamily: 'Space Grotesk',
                fontSize: 11,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>Coordinators</p>
              {event.coordinators.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: i < event.coordinators.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32,
                      background: `rgba(${accentRGB},0.2)`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14,
                      color: accentColor,
                      fontFamily: 'Orbitron',
                      fontWeight: 800,
                      flexShrink: 0,
                    }}>
                      {c.name.charAt(0)}
                    </div>
                    <span style={{ fontFamily: 'Space Grotesk', fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {c.name}
                    </span>
                  </div>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontFamily: 'Inter',
                        fontSize: 12,
                        color: accentColor,
                        textDecoration: 'none',
                        background: `rgba(${accentRGB},0.1)`,
                        padding: '4px 10px',
                        borderRadius: 8,
                        border: `1px solid rgba(${accentRGB},0.2)`,
                        cursor: 'none',
                      }}
                    >
                      <Phone size={12} strokeWidth={1.5} /> {c.phone}
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
