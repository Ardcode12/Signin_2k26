import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Shuffle, Sparkles, Users, Phone, ChevronDown } from 'lucide-react';

const NAV_HEIGHT = 72;
const HEADER_HEIGHT = 118;
const STACK_OFFSET = 26;
const CARD_DWELL = '55vh';

const NON_TECHNICAL_EVENTS = [
  {
    title: 'Dumb Charades / Guess the Image',
    icon: Smile,
    tag: 'FUN · 01',
    num: '01',
    description: 'Put your acting skills and visual intuition to the test in this hilarious and brain-teasing challenge. Can you decode the cosmos through mime and imagery?',
    coordinators: [
      { name: 'Srimathi', phone: '9715206206' },
      { name: 'DineshKumar', phone: '9345660839' },
      { name: 'Pavithra', phone: 'TBA' },
    ],
  },
  {
    title: 'Flip Flop',
    icon: Shuffle,
    tag: 'FUN · 02',
    num: '02',
    description: 'A fast-paced, mind-bending flip-side challenge where quick thinking and adaptability are your greatest superpowers. Flip the script and claim the galaxy!',
    coordinators: [
      { name: 'Dharanish BM', phone: 'TBA' },
      { name: 'Manivel Karthick', phone: 'TBA' },
      { name: 'Dhanursi V', phone: 'TBA' },
    ],
  },
];

/* ── Single large left-aligned event card ── */
function BigEventCard({ event, accent = '#38bdf8', accentRGB = '56,189,248' }) {
  const [open, setOpen] = useState(false);
  const [coordIdx, setCoordIdx] = useState(0);
  const Icon = event.icon;

  const nextCoord = (e) => {
    e.stopPropagation();
    setCoordIdx((prev) => (prev + 1) % event.coordinators.length);
  };
  const prevCoord = (e) => {
    e.stopPropagation();
    setCoordIdx((prev) => (prev - 1 + event.coordinators.length) % event.coordinators.length);
  };

  return (
    <div
      style={{
        background: '#04050e',
        border: '1px solid rgba(' + accentRGB + ',0.4)',
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        maxWidth: 620,
        width: '100%',
        boxShadow: '0 0 40px rgba(' + accentRGB + ', 0.15), inset 0 0 20px rgba(' + accentRGB + ', 0.05)',
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${accent}, rgba(${accentRGB},0.2) 80%, transparent)`,
      }} />

      {/* Top glow wash */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 180,
        background: `radial-gradient(ellipse at 20% 0%, rgba(${accentRGB},0.2), transparent)`,
        pointerEvents: 'none',
      }} />

      <div style={{ padding: 'clamp(32px, 5vw, 48px)' }}>
        {/* Event number + tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 900,
            color: `rgba(${accentRGB},0.12)`,
            lineHeight: 1,
            userSelect: 'none',
          }}>
            {event.num}
          </span>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `rgba(${accentRGB},0.12)`,
              border: `1px solid rgba(${accentRGB},0.3)`,
              borderRadius: 100, padding: '4px 14px',
              marginBottom: 8,
            }}>
              <Icon size={13} color={accent} strokeWidth={1.5} />
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: 10, color: accent,
                letterSpacing: '0.25em', textTransform: 'uppercase',
              }}>{event.tag}</span>
            </div>
          </div>
        </div>

        {/* Title — large */}
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 900,
          color: '#f0f0f8',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 20,
        }}>{event.title}</h3>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          color: 'rgba(255,255,255,0.58)',
          lineHeight: 1.85,
          marginBottom: 32,
        }}>{event.description}</p>

        {/* Coordinator toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: open ? `rgba(${accentRGB},0.1)` : 'rgba(255,255,255,0.04)',
            border: `1px solid rgba(${accentRGB},0.25)`,
            borderRadius: 12, padding: '12px 20px',
            color: accent,
            fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', width: '100%',
            transition: 'background 0.3s ease',
            letterSpacing: '0.05em',
          }}
          onMouseEnter={e => e.currentTarget.style.background = `rgba(${accentRGB},0.12)`}
          onMouseLeave={e => e.currentTarget.style.background = open ? `rgba(${accentRGB},0.1)` : 'rgba(255,255,255,0.04)'}
        >
          <Users size={14} strokeWidth={1.5} />
          <span style={{ flex: 1, textAlign: 'left' }}>
            {open ? 'Hide' : 'View'} Coordinators
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <ChevronDown size={16} />
          </motion.span>
        </button>

        {/* Coordinator list */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="coords"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 16 }}>
                <motion.div
                  key={coordIdx}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: `rgba(${accentRGB},0.06)`,
                    border: `1px solid rgba(${accentRGB},0.3)`,
                    borderRadius: 16,
                    boxShadow: `0 0 20px rgba(${accentRGB}, 0.15)`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 40, height: 40,
                      background: `rgba(${accentRGB},0.2)`,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Orbitron', fontWeight: 800, fontSize: 16,
                      color: accent, flexShrink: 0,
                      border: `1px solid rgba(${accentRGB}, 0.4)`,
                      boxShadow: `0 0 10px rgba(${accentRGB}, 0.2)`,
                    }}>{event.coordinators[coordIdx].name.charAt(0)}</div>
                    <div>
                      <span style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: 16, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                        {event.coordinators[coordIdx].name}
                      </span>
                      <a
                        href={`tel:${event.coordinators[coordIdx].phone}`}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          fontFamily: 'Inter', fontSize: 13,
                          color: accent, textDecoration: 'none',
                          marginTop: 4,
                        }}
                      >
                        <Phone size={12} strokeWidth={1.5} /> {event.coordinators[coordIdx].phone}
                      </a>
                    </div>
                  </div>
                  
                  {/* Carousel Controls */}
                  {event.coordinators.length > 1 && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={prevCoord} style={{
                        background: `rgba(${accentRGB}, 0.1)`,
                        border: `1px solid rgba(${accentRGB}, 0.3)`,
                        borderRadius: '50%', width: 28, height: 28,
                        color: accent, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>&lt;</button>
                      <button onClick={nextCoord} style={{
                        background: `rgba(${accentRGB}, 0.1)`,
                        border: `1px solid rgba(${accentRGB}, 0.3)`,
                        borderRadius: '50%', width: 28, height: 28,
                        color: accent, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>&gt;</button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Non-Technical Events Section
 * ─────────────────────────────
 * • Hero-style sticky background (frozen)
 * • Section heading is PINNED to top
 * • Cards STACK on scroll — same effect as pechacks.org "Domains" page
 */
export default function NonTechnicalEvents() {
  return (
    <div style={{ position: 'relative' }}>

      {/* ── STICKY BACKGROUND ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: 0, pointerEvents: 'none',
      }}>
        {/* Background is transparent to show global Starfield */}

        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(0,184,150,0.15) 0%, transparent 70%)',
            top: '5%', right: '-10%', borderRadius: '50%',
            filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
          }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', width: 420, height: 420,
            background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
            bottom: '5%', left: '-5%', borderRadius: '50%',
            filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
          }}
        />
      </div>

      {/* ── CONTENT (Header + Cards) ── */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>
        
        {/* ── PINNED HEADER ── */}
        <div style={{
          position: 'sticky',
          top: NAV_HEIGHT,
          zIndex: 10,
          padding: '20px clamp(24px, 5vw, 80px) 16px',
          background: 'linear-gradient(180deg, rgba(4,5,14,0.98) 75%, rgba(4,5,14,0) 100%)',
          backdropFilter: 'blur(6px)',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Space Grotesk', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.45em', textTransform: 'uppercase',
              color: '#38bdf8',
              background: 'rgba(56,189,248,0.12)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: 100, padding: '5px 16px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <Sparkles size={11} />
              Non-Technical Events
            </span>
            <span style={{
              fontFamily: 'Space Grotesk', fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em',
            }}>— {NON_TECHNICAL_EVENTS.length} events</span>
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.8rem, 4.2vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginTop: 8, marginBottom: 0,
            background: 'linear-gradient(135deg, #38bdf8 0%, #00b896 60%, #f0f0f8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Fun & Creativity
          </h2>
        </div>

        {/* ── SCROLLABLE CARDS ── */}
        <div style={{
          padding: '0 clamp(24px, 5vw, 80px) 30vh',
          paddingTop: '60vh', /* push cards down so they start entering from the bottom */
          display: 'flex', flexDirection: 'column',
        }}>
          {NON_TECHNICAL_EVENTS.map((event, i) => (
            <div
              key={event.title}
              style={{
                position: 'sticky',
                top: `${NAV_HEIGHT + HEADER_HEIGHT + i * STACK_OFFSET}px`,
                zIndex: i + 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                paddingTop: 8,
                marginBottom: CARD_DWELL, /* Creates the scroll distance before next card */
              }}
            >
              <BigEventCard
                event={event}
                accent={i % 2 === 0 ? '#38bdf8' : '#00b896'}
                accentRGB={i % 2 === 0 ? '56,189,248' : '0,184,150'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}