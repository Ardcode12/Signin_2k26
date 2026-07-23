import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Phone } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

/**
 * EventCard — shiny black style, white accent only.
 * - Scroll entrance: fade-in + slide-up 30px, cubic-bezier(0.16,1,0.3,1), staggered 0.1s
 * - Hover: translateY(-8px) + white glowing box-shadow, 0.3s ease-in-out
 * - Icon: scale(1.12) on card hover
 * - Accordion: smooth height + opacity expand/collapse, chevron rotates 180deg
 */
export default function EventCard({ event, index = 0 }) {
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        /* Piano-black depth gradient */
        background: `
          radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.07) 0%, transparent 55%),
          linear-gradient(160deg, #1e1e1e 0%, #000000 35%, #060606 65%, #0e0e0e 100%)
        `,
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 24,
        overflow: 'hidden',
        cursor: 'default',
        position: 'relative',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 24px 60px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.12)`
          : `0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
    >
      {/* Top gloss stripe */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, rgba(255,255,255,${hovered ? '0.5' : '0.2'}), transparent 60%, rgba(255,255,255,${hovered ? '0.3' : '0.1'}))`,
        transition: 'background 0.3s ease',
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 130,
        background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,${hovered ? '0.08' : '0.04'}), transparent)`,
        pointerEvents: 'none',
        transition: 'background 0.3s ease',
      }} />

      {/* Diagonal gloss sweep */}
      <motion.div
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 10, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0,
          width: '20%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          transform: 'skewX(-16deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ padding: '28px 28px 0', position: 'relative', zIndex: 1 }}>
        {/* Icon + tag row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          {/* Icon — scales on hover */}
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              width: 52, height: 52,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {typeof event.icon === 'string'
              ? <span style={{ fontSize: 24 }}>{event.icon}</span>
              : <event.icon size={24} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
            }
          </motion.div>

          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 10, color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.2em',
            background: 'rgba(255,255,255,0.06)',
            padding: '4px 10px', borderRadius: 100,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            {event.tag || `EVENT ${String(index + 1).padStart(2, '0')}`}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Enbora, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
          color: 'white',
          marginBottom: 10,
          letterSpacing: '-0.01em',
          textShadow: hovered ? '0 0 20px rgba(255,255,255,0.2)' : 'none',
          transition: 'text-shadow 0.3s ease',
        }}>{event.title}</h3>

        {event.description && (
          <p style={{
            fontFamily: 'Enbora, sans-serif',
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
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)', borderRadius: 6,
                  padding: '2px 8px', fontSize: 10,
                  fontFamily: 'Orbitron', flexShrink: 0, marginTop: 2,
                  border: '1px solid rgba(255,255,255,0.18)',
                }}>R{i + 1}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', fontFamily: 'Enbora', lineHeight: 1.6 }}>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expand/collapse accordion button */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%',
          background: expanded ? 'rgba(255,255,255,0.07)' : 'none',
          border: 'none',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          marginTop: 4,
          padding: '14px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Enbora, sans-serif',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
          transition: 'background 0.3s ease',
          position: 'relative', zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
        onMouseLeave={e => e.currentTarget.style.background = expanded ? 'rgba(255,255,255,0.07)' : 'none'}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Users size={14} strokeWidth={1.5} /> {expanded ? 'Hide' : 'View'} Coordinators
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ fontSize: 16, display: 'inline-block' }}
        >▾</motion.span>
      </button>

      {/* Expandable coordinator list */}
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
              background: 'rgba(255,255,255,0.03)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <p style={{
                fontFamily: 'Enbora', fontSize: 10,
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
                      background: 'radial-gradient(circle at 35% 28%, #2a2a2a 0%, #111 30%, #000 100%)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Orbitron', fontWeight: 800, fontSize: 13,
                      color: 'rgba(255,255,255,0.85)', flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.1)',
                    }}>
                      {c.name.charAt(0)}
                    </div>
                    <span style={{ fontFamily: 'Enbora', fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {c.name}
                    </span>
                  </div>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontFamily: 'Enbora', fontSize: 12,
                        color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                        background: 'rgba(255,255,255,0.07)',
                        padding: '4px 10px', borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.15)',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#ffffff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
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
