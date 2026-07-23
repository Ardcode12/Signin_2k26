import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

import ModelCanvas from './ModelCanvas';

const MODEL_BREAKPOINTS = {
  desktop: {
    pos: [-4.5, -0.5, -4],
    rot: [0.3, 0.9, 0],
    scale: 1.3,
  },
  tablet: {
    pos: [-3.5, 0, -4],
    rot: [0.3, 0.9, 0],
    scale: 1.1,
  },
  mobile: {
    pos: [0, -2, -4],
    rot: [0.3, 0.9, 0],
    scale: 0.9,
  },
  mobileSmall: {
    pos: [-1.5, 0.7, -3.5],
    rot: [0.3, 0.9, 0],
    scale: 0.8,
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
const STACK_OFFSET = 28;
const CARD_DWELL = '60vh';

const COORDINATORS = [
  {
    num: '01',
    name: 'Mohammed Yunus',
    phone: '7010499316',
    role: 'Overall Coordinator',
    // image: '/coordinators/yunus.jpg',
  },
  {
    num: '02',
    name: 'Dharun Vidyakar',
    phone: '8610708272',
    role: 'Overall Coordinator',
    // image: '/coordinators/dharun.jpg',
  },
  {
    num: '03',
    name: 'Shreyaa',
    phone: '9842484828',
    role: 'Overall Coordinator',
    // image: '/coordinators/shreyaa.jpg',
  },
];

/* Fixed star positions inside card */
const STARS = [
  { x: 8, y: 18, s: 1.5 }, { x: 23, y: 70, s: 1 },
  { x: 40, y: 30, s: 2 }, { x: 56, y: 62, s: 1 },
  { x: 72, y: 15, s: 1.5 }, { x: 88, y: 78, s: 1 },
  { x: 15, y: 52, s: 1 }, { x: 48, y: 88, s: 1.5 },
  { x: 64, y: 42, s: 2 }, { x: 91, y: 33, s: 1 },
  { x: 32, y: 90, s: 1 }, { x: 79, y: 55, s: 1.5 },
  { x: 5, y: 38, s: 1 }, { x: 95, y: 65, s: 1 },
];

/* ──────────────────────────────────────────────────────────
   AVATAR  — snake border ring, shiny black sphere
   ────────────────────────────────────────────────────────── */
function Avatar({ person, size = 110 }) {
  const initials = person.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    /* Outer snake ring wrapper */
    <div className="coord-avatar-snake-wrap" style={{ width: size + 4, height: size + 4 }}>
      {/* Black gap ring */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {/* Shiny black sphere face */}
        <div style={{
          width: size - 4, height: size - 4,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          /* Shiny black — multi-stop gradient for depth */
          background: 'radial-gradient(circle at 35% 28%, #2a2a2a 0%, #111 30%, #000 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `
            inset 0 2px 8px rgba(255,255,255,0.12),
            inset 0 -4px 12px rgba(0,0,0,0.9),
            inset 4px 0 12px rgba(0,0,0,0.5)
          `,
        }}>
          {person.image ? (
            <>
              <img src={person.image} alt={person.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Gloss overlay on photo */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                borderRadius: '50%', pointerEvents: 'none',
              }} />
            </>
          ) : (
            <>
              {/* Top-left specular gloss — piano black shine */}
              <div style={{
                position: 'absolute', top: 8, left: 10,
                width: 30, height: 13,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                transform: 'rotate(-28deg)',
                filter: 'blur(4px)',
                pointerEvents: 'none',
              }} />
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: (size - 4) * 0.24,
                fontWeight: 900,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '-0.02em',
                textShadow: '0 0 16px rgba(255,255,255,0.4)',
                position: 'relative', zIndex: 1,
              }}>
                {initials}
              </span>
            </>
          )}
        </div>

        {/* Online dot */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: 5, right: 5,
            width: 14, height: 14,
            background: '#fff',
            borderRadius: '50%',
            border: '2px solid #000',
            boxShadow: '0 0 8px rgba(255,255,255,0.8)',
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   COORDINATOR CARD
   ─────────────────
   Outer: .coord-snake-wrap — rotating snake arc around border
   Inner: shiny black card — no color, just black + white
   ────────────────────────────────────────────────────────── */
function CoordinatorCard({ person }) {
  return (
    /* Snake border wrapper from CSS class */
    <div className="coord-snake-wrap">

      {/* ── SHINY BLACK CARD — inner div fills the wrapper ── */}
      <div style={{
        borderRadius: 28,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        /* Deep piano-black — polished surface */
        background: `
          radial-gradient(ellipse at 28% 0%, rgba(255,255,255,0.10) 0%, transparent 45%),
          radial-gradient(ellipse at 72% 100%, rgba(255,255,255,0.03) 0%, transparent 50%),
          linear-gradient(160deg, #1c1c1c 0%, #000000 25%, #050505 60%, #0d0d0d 100%)
        `,
        /* Intense specular depth */
        boxShadow: `
          inset 0 1.5px 0 rgba(255,255,255,0.18),
          inset 0 0 60px rgba(0,0,0,0.85),
          inset 0 -1.5px 0 rgba(255,255,255,0.06),
          inset 3px 0 20px rgba(0,0,0,0.4),
          0 0 80px rgba(0,0,0,0.9)
        `,
      }}>

        {/* Stars twinkling inside */}
        {STARS.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
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

        {/* Diagonal gloss sweep — shiny surface light pass */}
        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '25%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
            transform: 'skewX(-16deg)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Card body */}
        <div className="custom-scrollbar" style={{
          padding: '32px 32px 40px',
          position: 'relative', zIndex: 2,
          maxHeight: 'calc(100vh - 280px)',
          overflowY: 'auto',
        }}>

          {/* Large number + role badge */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(3.5rem, 9vw, 6rem)',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              {person.num}
            </span>

            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100, padding: '5px 16px',
              backdropFilter: 'blur(4px)',
            }}>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 9,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>
                {person.role}
              </span>
            </div>
          </div>

          {/* Avatar + Name + Phone */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 3vw, 36px)',
            flexWrap: 'wrap',
          }}>
            <Avatar person={person} size={110} />

            <div style={{ flex: 1, minWidth: 180 }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: 14,
                /* Subtle white glow — shiny surface text */
                textShadow: '0 0 30px rgba(255,255,255,0.15)',
              }}>
                {person.name}
              </h3>

              {/* White divider */}
              <div style={{
                width: '100%', height: 1,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, transparent 80%)',
                marginBottom: 18,
              }} />

              <a
                href={`tel:${person.phone}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 12,
                  padding: '11px 22px',
                  color: 'rgba(255,255,255,0.8)',
                  fontFamily: 'Enbora, sans-serif',
                  fontSize: 15, fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(255,255,255,0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Phone size={14} strokeWidth={1.5} />
                {person.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Long arc orbit line — 3/4 card width, rotating */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="565 63"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
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
              stroke="rgba(255,255,255,0.09)"
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

/* ──────────────────────────────────────────────────────────
   SECTION
   ────────────────────────────────────────────────────────── */
export default function Coordinators() {
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
    speed: 0.55,
    visible: true,
  };

  return (
    <div style={{ position: 'relative' }}>

      {/* ── STICKY BACKGROUND ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'visible',
        zIndex: 0, pointerEvents: 'none',
      }}>
        <ModelCanvas
          path="/model_glb/blackhole.glb"
          config={modelConfig}
          fov={38}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 1, opacity: 0.9,
          }}
        />

        {/* Subtle white nebula blobs — no green */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 700, height: 700,
              background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 68%)',
              top: '5%', left: '-18%',
              borderRadius: '50%',
              filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0,
            }}
          />
          <motion.div
            animate={{ y: [0, 22, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{
              position: 'absolute',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
              bottom: '8%', right: '-5%',
              borderRadius: '50%',
              filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
            }}
          />
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>

        {/* ── PINNED HEADER — right aligned ── */}
        <div className="responsive-align" style={{
          position: 'sticky',
          top: NAV_HEIGHT,
          zIndex: 10,
          padding: '20px clamp(24px, 5vw, 80px) 16px',
          background: 'transparent',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'Enbora, sans-serif',
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 100, padding: '5px 16px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              ✦ Mission Command
            </span>
            <span style={{
              fontFamily: 'Enbora, sans-serif',
              fontSize: 10, color: 'rgba(255,255,255,0.2)',
              letterSpacing: '0.1em',
            }}>— {COORDINATORS.length} coordinators</span>
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
            textAlign: 'right',
          }}>
            Overall Coordinators
          </h2>
        </div>

        {/* ── STACKED CARDS — RIGHT ── */}
        <div className="responsive-align" style={{
          padding: '0 clamp(24px, 5vw, 80px) 30vh',
          paddingTop: '60vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end',
        }}>
          {COORDINATORS.map((person, i) => (
            <div
              key={person.name}
              style={{
                position: 'sticky',
                top: `${NAV_HEIGHT + HEADER_HEIGHT + i * STACK_OFFSET}px`,
                zIndex: i + 1,
                paddingTop: 8,
                marginBottom: CARD_DWELL,
                width: '100%',
                maxWidth: 440,
              }}
            >
              <CoordinatorCard person={person} />
            </div>
          ))}
          {/* Spacer to allow the last card to dwell */}
          <div style={{ height: '80vh', width: '100%' }} />
        </div>
      </div>
    </div>
  );
}
