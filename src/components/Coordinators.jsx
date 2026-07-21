import { motion } from 'framer-motion';
import { User, Phone } from 'lucide-react';

const COORDINATORS = [
  {
    name: 'Mohammed Yunus',
    phone: '7010499316',
    role: 'Overall Coordinator',
    color: '#38bdf8',
    colorRGB: '56,189,248',
  },
  {
    name: 'Dharun Vidyakar',
    phone: '8610708272',
    role: 'Overall Coordinator',
    color: '#00b896',
    colorRGB: '0,184,150',
  },
  {
    name: 'Shreyaa',
    phone: '9842484828',
    role: 'Overall Coordinator',
    color: '#38bdf8',
    colorRGB: '56,189,248',
  },
];

/**
 * Coordinators Section
 * Unified theme: Deep space dark background with teal and sky blue accents.
 */
export default function Coordinators() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '80vh',
      overflow: 'hidden',
      background: 'transparent',
    }}>
      {/* ── Floating gradient blobs (from Hero) ── */}
      <motion.div
        animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(0,184,150,0.15) 0%, transparent 70%)',
          top: '5%', right: '-10%',
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)',
          bottom: '5%', left: '-5%',
          borderRadius: '50%',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <span style={{
            fontFamily: 'Space Grotesk',
            fontSize: 10, fontWeight: 600,
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: '#00b896',
            background: 'rgba(0,184,150,0.12)',
            border: '1px solid rgba(0,184,150,0.28)',
            borderRadius: 100, padding: '5px 18px',
            display: 'inline-block', marginBottom: 24,
          }}>
            Mission Command
          </span>

          {/* Mixed font sizes */}
          <p style={{
            fontFamily: 'Space Grotesk',
            fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(0,184,150,0.5)',
            marginBottom: 10,
          }}>
            SIGININ'26 — CREW DIRECTORY
          </p>
          <h2 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(2rem, 5.5vw, 4rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #00b896, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Overall Coordinators
          </h2>
          <p style={{
            fontFamily: 'Inter',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 480, margin: '0 auto',
            lineHeight: 1.85,
          }}>
            The crew navigating Siginin'26 through the cosmos.
            Reach out to Mission Control for any assistance.
          </p>
        </motion.div>

        {/* Coordinator cards */}
        <div style={{
          display: 'flex', gap: 32,
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {COORDINATORS.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 30px 80px rgba(${person.colorRGB},0.25), 0 0 0 1px rgba(0,184,150,0.15)`,
              }}
              style={{
                /* Glassmorphism card */
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: `1px solid rgba(${person.colorRGB},0.4)`,
                boxShadow: `0 0 40px rgba(${person.colorRGB}, 0.15), inset 0 0 20px rgba(${person.colorRGB}, 0.05)`,
                borderRadius: 28,
                padding: '44px 36px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                width: 'clamp(240px, 30vw, 300px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
            >
              {/* Top color wash */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 220,
                background: `radial-gradient(ellipse at 50% 0%, rgba(${person.colorRGB},0.18), transparent)`,
                pointerEvents: 'none',
              }} />
              {/* Bottom tint */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
                background: `linear-gradient(0deg, rgba(${person.colorRGB},0.07), transparent)`,
                pointerEvents: 'none',
              }} />

              {/* Avatar */}
              <div style={{ position: 'relative', width: 96, height: 96, margin: '0 auto 28px' }}>
                {/* Spinning conic ring */}
                <div style={{
                  position: 'absolute', inset: -5, borderRadius: '50%',
                  background: `conic-gradient(from 0deg, ${person.color}, rgba(${person.colorRGB},0.4), ${person.color})`,
                  animation: 'warp-spin 3s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: -1, borderRadius: '50%',
                  background: '#04050e',
                }} />
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  background: `radial-gradient(circle at 35% 35%, rgba(${person.colorRGB},0.4), rgba(${person.colorRGB},0.1))`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid rgba(${person.colorRGB},0.3)`,
                }}>
                  <User size={36} color={person.color} strokeWidth={1.5} />
                </div>
                {/* Online dot */}
                <div style={{
                  position: 'absolute', bottom: 4, right: 4,
                  width: 15, height: 15,
                  background: '#22c55e', borderRadius: '50%',
                  border: '2px solid #04050e',
                  boxShadow: '0 0 10px rgba(34,197,94,0.85)',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }} />
              </div>

              {/* Role badge */}
              <div style={{
                display: 'inline-block',
                background: `rgba(${person.colorRGB},0.14)`,
                border: `1px solid rgba(${person.colorRGB},0.32)`,
                borderRadius: 100, padding: '3px 14px', marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: 'Orbitron',
                  fontSize: 9, color: person.color,
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                }}>
                  {person.role}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)',
                color: 'white', marginBottom: 20,
                letterSpacing: '-0.01em',
              }}>
                {person.name}
              </h3>

              <a
                href={`tel:${person.phone}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: `rgba(${person.colorRGB},0.1)`,
                  border: `1px solid rgba(${person.colorRGB},0.3)`,
                  borderRadius: 12, padding: '11px 22px',
                  color: person.color,
                  fontFamily: 'Inter', fontSize: 14, fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `rgba(${person.colorRGB},0.22)`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = `rgba(${person.colorRGB},0.1)`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Phone size={14} strokeWidth={1.5} /> {person.phone}
              </a>

              {/* Orbit deco */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', bottom: -24, right: -24,
                  width: 110, height: 110,
                  border: `1px dashed rgba(${person.colorRGB},0.2)`,
                  borderRadius: '50%', pointerEvents: 'none',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
