import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Shuffle, Sparkles, Users, Phone, ChevronDown } from 'lucide-react';

/* Fixed star positions inside event card */
const STARS = [
  { x: 6, y: 12, s: 1.5 }, { x: 22, y: 68, s: 1 },
  { x: 38, y: 28, s: 2 }, { x: 55, y: 60, s: 1 },
  { x: 74, y: 14, s: 1.5 }, { x: 89, y: 75, s: 1 },
  { x: 14, y: 50, s: 1 }, { x: 47, y: 86, s: 1.5 },
  { x: 63, y: 40, s: 2 }, { x: 92, y: 32, s: 1 },
  { x: 31, y: 92, s: 1 }, { x: 78, y: 54, s: 1.5 },
  { x: 4, y: 36, s: 1 }, { x: 96, y: 64, s: 1 },
];

const NAV_HEIGHT = 72;
const HEADER_HEIGHT = 118;
const STACK_OFFSET = 48;
const CARD_DWELL = '15vh';

const NON_TECHNICAL_EVENTS = [
  {
    title: 'Stellar Signals',
    icon: Smile,
    tag: 'FUN · 01',
    num: '01',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfpWBwfaA6WSxdr35bPV_GVA1UbFHjFWEZD6SVzeY9Z57ZAQw/viewform?usp=publish-editor', // ← Replace with actual Google Form URL
    description: 'Actions Speak Louder Than Words.One teammate receives the name of a movie, object, personality, or phrase and must communicate it to the rest of the team using actions and expressions alone—without speaking, writing, or making sounds. The team that guesses the maximum number of clues within the given time emerges victorious. Teamwork, creativity, and quick thinking are the keys to success.',
    coordinators: [
      { name: 'Srimathi', phone: '9715206206' },
      { name: 'DineshKumar', phone: '9345660839' },
      { name: 'Pavithra', phone: '75388 11389' },
    ],
  },
  {
    title: 'Reverse Gravity',
    icon: Shuffle,
    tag: 'FUN · 02',
    num: '02',
    formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSf1wr5N_caXTTLnQtlLe6cU9yORojOhwf8mf9Nekt0YjtHJHA/viewform?usp=publish-editor', // ← Replace with actual Google Form URL
    description: 'A fast-paced one-on-one battle where participants must answer every question with an irrelevant response. The challenge is to avoid giving a relevant answer or repeating any previous response. As the pace intensifies, maintaining composure and thinking unpredictably becomes the ultimate test. The participant who survives the longest without breaking the rules wins.',
    coordinators: [
      { name: 'Dharanish BM', phone: '+91 98423 75676' },
      { name: 'Manivel Karthick', phone: '+91 63804 48154' },
      { name: 'Dhanursi V', phone: '+91 96291 42271' },
    ],
  },
];

/* ── Single large left-aligned event card — shiny piano-black, matches coordinator style ── */
function BigEventCard({ event }) {
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
    /* Snake border wrapper — same as coordinator cards */
    <div className="coord-snake-wrap">

      {/* ── SHINY BLACK CARD ── */}
      <div style={{
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        height: 'calc(100vh - 200px)', // Force consistent height that reaches the bottom to maintain the stacking illusion
        /* Piano-black depth gradient */
        background: `
          radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.07) 0%, transparent 55%),
          linear-gradient(160deg, #1e1e1e 0%, #000000 35%, #060606 65%, #0e0e0e 100%)
        `,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.12),
          inset 0 0 50px rgba(0,0,0,0.7),
          inset 0 -1px 0 rgba(255,255,255,0.04),
          0 0 60px rgba(0,0,0,0.8)
        `,
      }}>

        {/* Twinkling stars */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.12, 0.95, 0.12] }}
            transition={{
              duration: 2.5 + (i % 4) * 0.6,
              repeat: Infinity,
              delay: i * 0.22,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.s,
              height: star.s,
              background: '#fff',
              borderRadius: '50%',
              boxShadow: `0 0 ${star.s * 3}px rgba(255,255,255,0.9)`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Diagonal gloss sweep */}
        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 9, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '25%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            transform: 'skewX(-16deg)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Card body — scrollable if content exceeds viewport */}
        <div className="custom-scrollbar" style={{
          padding: 'clamp(24px, 5vw, 48px)',
          position: 'relative', zIndex: 2,
          height: '100%',
          overflowY: 'auto',
        }}>

          {/* Event number + tag */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{
              fontFamily: 'Orbitron',
              fontSize: 'clamp(3.5rem, 9vw, 6rem)',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              {event.num}
            </span>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100, padding: '5px 14px',
              backdropFilter: 'blur(4px)',
            }}>
              <Icon size={11} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: 9, color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>{event.tag}</span>
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
            textShadow: '0 0 30px rgba(255,255,255,0.12)',
          }}>{event.title}</h3>

          {/* White divider */}
          <div style={{
            width: '100%', height: 1,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, transparent 80%)',
            marginBottom: 20,
          }} />

          {/* Description */}
          <p style={{
            fontFamily: 'Enbora',
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            color: 'rgba(255,255,255,0.52)',
            lineHeight: 1.85,
            marginBottom: 28,
          }}>{event.description}</p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href={event.formLink && event.formLink !== 'YOUR_FORM_LINK_HERE' ? event.formLink : '#'}
              target={event.formLink && event.formLink !== 'YOUR_FORM_LINK_HERE' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(!event.formLink || event.formLink === 'YOUR_FORM_LINK_HERE')
                ? (e) => { e.preventDefault(); alert('Registration will open shortly via Google Forms!'); }
                : undefined
              }
              style={{
                display: 'block', textAlign: 'center',
                background: 'rgba(255,255,255,0.85)',
                color: '#000',
                borderRadius: 12, padding: '12px 20px',
                fontFamily: 'Enbora', fontSize: 14, fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Register Now
            </a>

            {/* Coordinator toggle */}
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 12, padding: '12px 20px',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'Enbora', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', width: '100%',
                transition: 'all 0.25s ease',
                letterSpacing: '0.05em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)';
                e.currentTarget.style.boxShadow = 'none';
              }}
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
                  <div style={{ paddingTop: 14 }}>
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
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: 16,
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40, height: 40,
                          background: 'radial-gradient(circle at 35% 28%, #2a2a2a 0%, #111 30%, #000 100%)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Orbitron', fontWeight: 800, fontSize: 15,
                          color: 'rgba(255,255,255,0.85)', flexShrink: 0,
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.1), 0 0 12px rgba(255,255,255,0.08)',
                        }}>{event.coordinators[coordIdx].name.charAt(0)}</div>
                        <div>
                          <span style={{ display: 'block', fontFamily: 'Enbora', fontSize: 15, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                            {event.coordinators[coordIdx].name}
                          </span>
                          <a
                            href={`tel:${event.coordinators[coordIdx].phone}`}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              fontFamily: 'Enbora', fontSize: 13,
                              color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
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
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            borderRadius: '50%', width: 30, height: 30,
                            color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13,
                          }}>&lt;</button>
                          <button onClick={nextCoord} style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            borderRadius: '50%', width: 30, height: 30,
                            color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13,
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

        {/* Long arc orbit line — 3/4 card width, rotating */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: -55, right: -55,
            width: 220, height: 220,
            pointerEvents: 'none',
          }}
        >
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ overflow: 'visible' }}>
            <circle
              cx="110" cy="110" r="100"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
              strokeDasharray="565 63"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: -28, right: -28,
            width: 110, height: 110,
            pointerEvents: 'none',
          }}
        >
          <svg width="110" height="110" viewBox="0 0 110 110" style={{ overflow: 'visible' }}>
            <circle
              cx="55" cy="55" r="48"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              strokeDasharray="270 31"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Non-Technical Events Section
 */
export default function NonTechnicalEvents() {
  return (
    <div style={{ position: 'relative' }}>

      {/* ── STICKY BACKGROUND ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'visible',
        zIndex: 0, pointerEvents: 'none',
      }}>
        {/* Subtle white nebula blobs — no green */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <motion.div
            animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
              top: '5%', right: '-10%', borderRadius: '50%',
              filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
              willChange: 'transform',
            }}
          />
          <motion.div
            animate={{ y: [0, 14, 0], x: [0, -6, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute', width: 350, height: 350,
              background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
              bottom: '5%', left: '-5%', borderRadius: '50%',
              filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* ── CONTENT (Header + Cards) ── */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>

        {/* ── PINNED HEADER ── */}
        <div style={{
          position: 'sticky',
          top: NAV_HEIGHT,
          zIndex: 10,
          padding: '20px clamp(24px, 5vw, 80px) 16px',
          background: 'transparent',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Enbora', fontSize: 10, fontWeight: 600,
              letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100, padding: '5px 16px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <Sparkles size={11} />
              Non-Technical Events
            </span>
            <span style={{
              fontFamily: 'Enbora', fontSize: 10,
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
            color: '#ffffff',
            textShadow: '0 0 40px rgba(255,255,255,0.15)',
          }}>
            Non Technical Sectors
          </h2>
        </div>

        {/* ── SCROLLABLE CARDS ── */}
        <div style={{
          padding: '0 clamp(24px, 5vw, 80px) 12vh',
          paddingTop: '18vh',
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
                marginBottom: CARD_DWELL,
              }}
            >
              <BigEventCard event={event} />
            </div>
          ))}
          {/* Spacer to allow the last card to dwell */}
          <div style={{ height: '15vh' }} />
        </div>
      </div>
    </div>
  );
}