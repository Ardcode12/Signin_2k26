import { motion } from 'framer-motion';
import { User, Phone, Sparkles } from 'lucide-react';

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
    color: '#f97316',
    colorRGB: '249,115,22',
  },
  {
    name: 'Shreyaa',
    phone: '9842484828',
    role: 'Overall Coordinator',
    color: '#f59e0b',
    colorRGB: '245,158,11',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Coordinators Section — glowing astronaut crew cards.
 */
export default function Coordinators() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        minHeight: '80vh',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Nebula */}
      <div className="nebula-blob" style={{
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,184,150,0.1), transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        animationDelay: '1s',
      }} />

      {/* Header */}
      <motion.div
        variants={cardVariants}
        style={{ textAlign: 'center', marginBottom: 64 }}
      >
        <span style={{
          fontFamily: 'Space Grotesk',
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#38bdf8',
          background: 'rgba(56,189,248,0.1)',
          border: '1px solid rgba(56,189,248,0.3)',
          borderRadius: 100,
          padding: '5px 16px',
          display: 'inline-block',
          marginBottom: 20,
        }}>
          <Sparkles size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Mission Command <Sparkles size={12} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </span>
        <h2 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: 16,
          background: 'linear-gradient(135deg, #38bdf8, #22e5bb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Overall Coordinators
        </h2>
        <p style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 500,
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          The crew navigating SIGIN'26 through the cosmos.
          Reach out to Mission Control for any assistance.
        </p>
      </motion.div>

      {/* Crew cards */}
      <div style={{
        display: 'flex',
        gap: 28,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {COORDINATORS.map((person, i) => (
          <motion.div
            key={person.name}
            variants={cardVariants}
            whileHover={{
              scale: 1.06,
              boxShadow: `0 30px 80px rgba(${person.colorRGB},0.25)`,
            }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              border: `1px solid rgba(${person.colorRGB},0.2)`,
              borderRadius: 28,
              padding: '40px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              width: 'clamp(240px, 30vw, 300px)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            {/* Top gradient */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 200,
              background: `radial-gradient(ellipse at 50% 0%, rgba(${person.colorRGB},0.15), transparent)`,
              pointerEvents: 'none',
            }} />
            <div className="scan-line" style={{ opacity: 0.3 }} />

            {/* Astronaut avatar */}
            <div style={{
              position: 'relative',
              width: 90, height: 90,
              margin: '0 auto 24px',
            }}>
              {/* Spinning gradient ring */}
              <div style={{
                position: 'absolute', inset: -4,
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, ${person.color}, transparent, ${person.color})`,
                animation: 'warp-spin 3s linear infinite',
              }} />
              {/* Inner ring */}
              <div style={{
                position: 'absolute', inset: -1,
                borderRadius: '50%',
                background: '#05060f',
              }} />
              {/* Avatar circle */}
              <div style={{
                position: 'relative',
                width: '100%', height: '100%',
                background: `radial-gradient(circle at 35% 35%, rgba(${person.colorRGB},0.4), rgba(${person.colorRGB},0.1))`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid rgba(${person.colorRGB},0.3)`,
              }}>
                <User size={32} color={person.color} strokeWidth={1.5} />
              </div>
              {/* Status dot */}
              <div style={{
                position: 'absolute', bottom: 4, right: 4,
                width: 14, height: 14,
                background: '#22c55e',
                borderRadius: '50%',
                border: '2px solid #05060f',
                boxShadow: '0 0 8px rgba(34,197,94,0.8)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
            </div>

            {/* Cosmic ID badge */}
            <div style={{
              display: 'inline-block',
              background: `rgba(${person.colorRGB},0.15)`,
              border: `1px solid rgba(${person.colorRGB},0.3)`,
              borderRadius: 100,
              padding: '3px 12px',
              marginBottom: 14,
            }}>
              <span style={{
                fontFamily: 'Orbitron',
                fontSize: 9,
                color: person.color,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}>
                {person.role}
              </span>
            </div>

            <h3 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: 'white',
              marginBottom: 16,
            }}>
              {person.name}
            </h3>

            {/* Phone */}
            <a
              href={`tel:${person.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: `rgba(${person.colorRGB},0.1)`,
                border: `1px solid rgba(${person.colorRGB},0.3)`,
                borderRadius: 12,
                padding: '10px 20px',
                color: person.color,
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = `rgba(${person.colorRGB},0.2)`}
              onMouseLeave={e => e.currentTarget.style.background = `rgba(${person.colorRGB},0.1)`}
            >
              <Phone size={14} strokeWidth={1.5} /> {person.phone}
            </a>

            {/* Orbit decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                bottom: -20, right: -20,
                width: 100, height: 100,
                border: `1px dashed rgba(${person.colorRGB},0.2)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
