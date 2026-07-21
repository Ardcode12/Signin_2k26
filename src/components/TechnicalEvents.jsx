import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Code2, Bot, Sparkles, Users, Phone, ChevronDown } from 'lucide-react';

const ModelCanvas = lazy(() => import('./ModelCanvas'));

const BLACKHOLE_CONFIG = { pos: [4, 0, -3], rot: [0.3, 0, 0], scale: 1.5, speed: 0.6, visible: true };

const NAV_HEIGHT = 72;
const HEADER_HEIGHT = 118;
const STACK_OFFSET = 26;
const CARD_DWELL = '55vh';

const TECHNICAL_EVENTS = [
  {
    title: 'Paper Presentation',
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
    title: 'Coding Challenge',
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
    title: 'Prompt Arena',
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

function BigEventCard({ event, accent, accentRGB }) {
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
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, ' + accent + ', rgba(' + accentRGB + ',0.2) 80%, transparent)',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 180,
        background: 'radial-gradient(ellipse at 20% 0%, rgba(' + accentRGB + ',0.2), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: 'clamp(32px, 5vw, 48px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{
            fontFamily: 'Orbitron',
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: 900,
            color: 'rgba(' + accentRGB + ',0.12)',
            lineHeight: 1,
            userSelect: 'none',
          }}>
            {event.num}
          </span>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(' + accentRGB + ',0.12)',
              border: '1px solid rgba(' + accentRGB + ',0.3)',
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

        <h3 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 900,
          color: '#f0f0f8',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 20,
        }}>{event.title}</h3>

        <p style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          color: 'rgba(255,255,255,0.58)',
          lineHeight: 1.85,
          marginBottom: event.rounds ? 24 : 32,
        }}>{event.description}</p>

        {event.rounds && (
          <div style={{ marginBottom: 32 }}>
            {event.rounds.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                marginBottom: 12,
                padding: '12px 16px',
                background: 'rgba(' + accentRGB + ',0.07)',
                border: '1px solid rgba(' + accentRGB + ',0.15)',
                borderRadius: 12,
              }}>
                <span style={{
                  fontFamily: 'Orbitron', fontSize: 9,
                  color: accent, flexShrink: 0,
                  background: 'rgba(' + accentRGB + ',0.2)',
                  padding: '3px 8px', borderRadius: 6,
                  letterSpacing: '0.15em',
                  marginTop: 2,
                }}>{'R' + (i + 1)}</span>
                <span style={{
                  fontFamily: 'Inter', fontSize: 14,
                  color: 'rgba(255,255,255,0.68)',
                  lineHeight: 1.6,
                }}>{r}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen(function (o) { return !o; })}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: open ? 'rgba(' + accentRGB + ',0.1)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(' + accentRGB + ',0.25)',
            borderRadius: 12, padding: '12px 20px',
            color: accent,
            fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', width: '100%',
            transition: 'background 0.3s ease',
            letterSpacing: '0.05em',
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
              <div style={{
                paddingTop: 16,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                {event.coordinators.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(' + accentRGB + ',0.06)',
                      border: '1px solid rgba(' + accentRGB + ',0.12)',
                      borderRadius: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 30, height: 30,
                        background: 'rgba(' + accentRGB + ',0.2)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Orbitron', fontWeight: 800, fontSize: 12,
                        color: accent, flexShrink: 0,
                      }}>{c.name.charAt(0)}</div>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                        {c.name}
                      </span>
                    </div>
                    <a
                      href={'tel:' + c.phone}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontFamily: 'Inter', fontSize: 12,
                        color: accent, textDecoration: 'none',
                        background: 'rgba(' + accentRGB + ',0.1)',
                        padding: '4px 10px', borderRadius: 8,
                        border: '1px solid rgba(' + accentRGB + ',0.22)',
                        transition: 'background 0.2s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <Phone size={11} strokeWidth={1.5} /> {c.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function TechnicalEvents() {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        zIndex: 0, pointerEvents: 'none',
      }}>
        {/* Background is transparent to show global Starfield */}

        <Suspense fallback={null}>
          <ModelCanvas
            path="/model_glb/blackhole.glb"
            config={BLACKHOLE_CONFIG}
            fov={38}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, opacity: 0.92 }}
          />
        </Suspense>

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
              color: '#00b896',
              background: 'rgba(0,184,150,0.12)',
              border: '1px solid rgba(0,184,150,0.3)',
              borderRadius: 100, padding: '5px 16px',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <Sparkles size={11} />
              Technical Events
            </span>
            <span style={{
              fontFamily: 'Space Grotesk', fontSize: 10,
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
            background: 'linear-gradient(135deg, #22e5bb 0%, #38bdf8 60%, #f0f0f8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Technical Sectors
          </h2>
        </div>

        {/* ── SCROLLABLE CARDS ── */}
        <div style={{
          padding: '0 clamp(24px, 5vw, 80px) 30vh',
          paddingTop: '60vh', /* push cards down so they start entering from the bottom */
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
                marginBottom: CARD_DWELL, /* Creates the scroll distance before next card */
              }}
            >
              <BigEventCard
                event={event}
                accent={i % 2 === 0 ? '#00b896' : '#38bdf8'}
                accentRGB={i % 2 === 0 ? '0,184,150' : '56,189,248'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}