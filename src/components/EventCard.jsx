import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * EventCard — spec animations:
 * - Scroll entrance: fade-in + slide-up 30px, cubic-bezier(0.16,1,0.3,1), staggered 0.1s
 * - Hover: translateY(-8px) + glowing box-shadow, 0.3s ease-in-out
 * - Icon: scale(1.12) on card hover
 * - Accordion: smooth height + opacity expand/collapse, chevron rotates 180deg
 */
export default function EventCard({ event, accentColor = '#00b896', index = 0 }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  /* 3D tilt on mouse move */
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateY(-8px)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    setHovered(false);
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
      /* ── Scroll entrance: fade + slide-up, stagger 0.1s per item ── */
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(${accentRGB},0.2)`,
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'default',
        position: 'relative',
        /* Lift + glow on hover — spec: translateY(-8px), 0.3s ease-in-out */
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 24px 60px rgba(${accentRGB},0.28), 0 0 0 1px rgba(${accentRGB},0.35)`
          : `0 4px 20px rgba(0,0,0,0.2)`,
        borderColor: hovered ? `rgba(${accentRGB},0.45)` : `rgba(${accentRGB},0.2)`,
      }}
    >
      {/* Top gradient stripe */}
      <div style={{
        height: 4,
        background: `linear-gradient(90deg, ${accentColor}, transparent 60%, ${accentColor})`,
        opacity: hovered ? 1 : 0.7,
        transition: 'opacity 0.3s ease',
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 130,
        background: `radial-gradient(ellipse at 50% 0%, rgba(${accentRGB},${hovered ? '0.18' : '0.1'}), transparent)`,
        pointerEvents: 'none',
        transition: 'background 0.3s ease',
      }} />

      <div style={{ padding: '28px 28px 0' }}>
        {/* Icon + tag row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          {/* Icon — scales on hover per spec */}
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              width: 52, height: 52,
              background: `rgba(${accentRGB},0.15)`,
              border: `1px solid rgba(${accentRGB},0.3)`,
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {typeof event.icon === 'string'
              ? <span style={{ fontSize: 24 }}>{event.icon}</span>
              : <event.icon size={24} color={accentColor} strokeWidth={1.5} />
            }
          </motion.div>

          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 10, color: accentColor,
            letterSpacing: '0.2em',
            background: `rgba(${accentRGB},0.1)`,
            padding: '4px 10px', borderRadius: 100,
            border: `1px solid rgba(${accentRGB},0.2)`,
          }}>
            {event.tag || `EVENT ${String(index + 1).padStart(2, '0')}`}
          </span>
        </div>

        {/* Title — slightly lifts on hover */}
        <h3 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
          color: 'white',
          marginBottom: 10,
          letterSpacing: '-0.01em',
          transition: 'color 0.3s ease',
        }}>{event.title}</h3>

        {event.description && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 14, lineHeight: 1.75,
            color: 'rgba(255,255,255,0.52)',
            marginBottom: 16,
          }}>{event.description}</p>
        )}

        {/* Round tags */}
        {event.rounds && (
          <div style={{ marginBottom: 16 }}>
            {event.rounds.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                <span style={{
                  background: `rgba(${accentRGB},0.2)`,
                  color: accentColor, borderRadius: 6,
                  padding: '2px 8px', fontSize: 10,
                  fontFamily: 'Orbitron', flexShrink: 0, marginTop: 2,
                }}>R{i + 1}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', fontFamily: 'Inter', lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expand/collapse accordion button — spec: chevron rotates 180deg */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: expanded ? `rgba(${accentRGB},0.07)` : 'none',
          border: 'none',
          borderTop: `1px solid rgba(${accentRGB},0.15)`,
          marginTop: 4,
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
          color: accentColor,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
          /* Spec: 0.3–0.4s ease */
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = `rgba(${accentRGB},0.09)`}
        onMouseLeave={e => e.currentTarget.style.background = expanded ? `rgba(${accentRGB},0.07)` : 'none'}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Users size={14} strokeWidth={1.5} /> {expanded ? 'Hide' : 'View'} Coordinators
        </span>
        {/* Spec: chevron rotates 180deg on expand */}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ fontSize: 16, display: 'inline-block' }}
        >▾</motion.span>
      </button>

      {/* Expandable coordinator list — spec: animate height + opacity, 0.35s ease */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="coords"
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
                fontFamily: 'Space Grotesk', fontSize: 10,
                letterSpacing: '0.25em', color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase', marginBottom: 14,
              }}>Coordinators</p>
              {event.coordinators.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: EASE }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: i < event.coordinators.length - 1
                      ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32,
                      background: `rgba(${accentRGB},0.2)`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Orbitron', fontWeight: 800, fontSize: 13,
                      color: accentColor, flexShrink: 0,
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
                        fontFamily: 'Inter', fontSize: 12,
                        color: accentColor, textDecoration: 'none',
                        background: `rgba(${accentRGB},0.1)`,
                        padding: '4px 10px', borderRadius: 8,
                        border: `1px solid rgba(${accentRGB},0.22)`,
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = `rgba(${accentRGB},0.22)`}
                      onMouseLeave={e => e.currentTarget.style.background = `rgba(${accentRGB},0.1)`}
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
