import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Code2, Bot, Sparkles, Users, Phone, ChevronDown } from 'lucide-react';

import ModelCanvas from './ModelCanvas';

const MODEL_BREAKPOINTS = {
  desktop: {
    pos: [4, 0, -3],
    rot: [0.3, 0, 0],
    scale: 1.5,
  },
  tablet: {
    pos: [3, -1, -3],
    rot: [0.3, 0, 0],
    scale: 1.3,
  },
  mobile: {
    pos: [0, -2, -3],
    rot: [0.3, 0, 0],
    scale: 1.05,
  },
  mobileSmall: {
    pos: [1.5, 0.7, -3.5],
    rot: [0.3, 0, 0],
    scale: 0.7,
  },
};

function getBreakpointKey(width) {
  if (width <= 480) return 'mobileSmall';
  if (width < 768)  return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

const NAV_HEIGHT = 72;
const HEADER_HEIGHT = 118;
const STACK_OFFSET = 48;
const CARD_DWELL = '55vh';

/* Fixed star positions inside event card */
const STARS = [
  { x:  6, y: 12, s: 1.5 }, { x: 22, y: 68, s: 1   },
  { x: 38, y: 28, s: 2   }, { x: 55, y: 60, s: 1   },
  { x: 74, y: 14, s: 1.5 }, { x: 89, y: 75, s: 1   },
  { x: 14, y: 50, s: 1   }, { x: 47, y: 86, s: 1.5 },
  { x: 63, y: 40, s: 2   }, { x: 92, y: 32, s: 1   },
  { x: 31, y: 92, s: 1   }, { x: 78, y: 54, s: 1.5 },
  { x:  4, y: 36, s: 1   }, { x: 96, y: 64, s: 1   },
];

const TECHNICAL_EVENTS = [
  {
    title: 'Cosmic Research ',
    icon: FileText,
    tag: 'TECH · 01',
    num: '01',
    description: 'Present your research and innovations to a panel of expert judges. Explore the frontiers of science and engineering through rigorous academic discourse.',
    coordinators: [
      { name: 'Dharun Vidyakar', phone: '8610708272' },
      { name: 'Mithik Karthikeyan', phone: '8220391947' },
      { name: 'Sheshanth', phone: '8072953989' },
    ],
  },
  {
    title: 'Code Orbit',
    icon: Code2,
    tag: 'TECH · 02',
    num: '02',
    description: 'A two-round coding gauntlet designed to test your algorithmic thinking, debugging prowess, and speed under pressure.',
    rounds: [
      'Round 1 — Tech Quiz, Code Snippets & Debugging Challenges',
      'Round 2 — Two competitive coding problems on HackerRank',
    ],
    coordinators: [
      { name: 'MohanRaja V', phone: 'TBA' },
      { name: 'Soundarahari', phone: 'TBA' },
      { name: 'Arnald', phone: 'TBA' },
    ],
  },
  {
    title: 'Prompt Protocol',
    icon: Bot,
    tag: 'TECH · 03',
    num: '03',
    description: 'Harness the power of AI. Craft the most creative, precise, and effective prompts to solve challenges in this cutting-edge GenAI competition.',
    coordinators: [
      { name: 'Shreyaa', phone: '9842484828' },
      { name: 'Deepika', phone: 'TBA' },
      { name: 'Shirustihaa', phone: 'TBA' },
    ],
  },
];

/* ── Single large event card — shiny piano-black, matches coordinator style ── */
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
        height: 'calc(100vh - 280px)', // Force consistent height for all cards so they stack cleanly
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
              top:  `${star.y}%`,
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
            marginBottom: event.rounds ? 24 : 28,
          }}>{event.description}</p>

          {event.rounds && (
            <div style={{ marginBottom: 28 }}>
              {event.rounds.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  marginBottom: 12,
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12,
                }}>
                  <span style={{
                    fontFamily: 'Orbitron', fontSize: 9,
                    color: 'rgba(255,255,255,0.7)', flexShrink: 0,
                    background: 'rgba(255,255,255,0.1)',
                    padding: '3px 8px', borderRadius: 6,
                    letterSpacing: '0.15em',
                    marginTop: 2,
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}>{'R' + (i + 1)}</span>
                  <span style={{
                    fontFamily: 'Enbora', fontSize: 14,
                    color: 'rgba(255,255,255,0.68)',
                    lineHeight: 1.6,
                  }}>{r}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Registration will open shortly via Google Forms!'); }}
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
          {/* Arc: a partial ring (~270deg visible stroke = 3/4 length) */}
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

export default function TechnicalEvents() {
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
    speed: 0.6,
    visible: true,
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: 0, pointerEvents: 'none',
      }}>
        {/* Background is transparent to show global Starfield */}

        <ModelCanvas
          path="/model_glb/blackhole.glb"
          config={modelConfig}
          fov={38}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.92 }}
        />

        {/* Subtle white/silver nebula — no green */}
        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            top: '5%', right: '-10%', borderRadius: '50%',
            filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
          }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute', width: 420, height: 420,
            background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
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
              Technical Events
            </span>
            <span style={{
              fontFamily: 'Enbora', fontSize: 10,
              color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em',
            }}>— {TECHNICAL_EVENTS.length} events</span>
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
            Technical Sectors
          </h2>
        </div>

        {/* ── SCROLLABLE CARDS ── */}
        <div style={{
          padding: '0 clamp(24px, 5vw, 80px) 30vh',
          paddingTop: '60vh',
          display: 'flex', flexDirection: 'column',
        }}>
          {TECHNICAL_EVENTS.map((event, i) => (
            <div
              key={event.title}
              style={{
                position: 'sticky',
                top: (NAV_HEIGHT + HEADER_HEIGHT + i * STACK_OFFSET) + 'px',
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
          <div style={{ height: '80vh' }} />
        </div>
      </div>
    </div>
  );
}