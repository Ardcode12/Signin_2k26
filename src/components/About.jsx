import { motion } from 'framer-motion';
import useParallax from '../hooks/useParallax';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
const itemVariants = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const PILLARS = [
  {
    label: 'Deep Space Theme',
    desc:  'An Interstellar-inspired universe redefines the way intellect and creativity collide in a single arena.',
    // SVG icon: planet/orbit
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="11" cy="11" r="4"/>
        <ellipse cx="11" cy="11" rx="10" ry="4" transform="rotate(-30 11 11)"/>
      </svg>
    ),
  },
  {
    label: 'Tech & Non-Tech',
    desc:  'From rigorous coding challenges and paper presentations to creative group events — one fest, two dimensions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="5 9 2 12 5 15"/>
        <polyline points="17 9 20 12 17 15"/>
        <line x1="9" y1="6" x2="13" y2="18"/>
      </svg>
    ),
  },
  {
    label: 'Prizes & Glory',
    desc:  'Stellar rewards for the brightest minds. Compete, collaborate, and claim your place among the stars.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 2 13.4 8.5 20 8.5 14.8 12.6 16.9 19 11 15.2 5.1 19 7.2 12.6 2 8.5 8.6 8.5 11 2"/>
      </svg>
    ),
  },
];

/**
 * About Section — clean two-column layout.
 * Left: heading + body copy. Right: three feature pillars.
 * No emojis, single accent color.
 */
export default function About() {
  const { ref, y } = useParallax(0.08, [-50, 50]);
  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={{
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 96px)',
        position: 'relative',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Nebula blob */}
      <div className="nebula-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(0,184,150,0.1), transparent 70%)',
        top: '15%', left: '-12%',
        animationDelay: '2s',
      }} />

      {/* Inner grid: two columns — with parallax */}
      <motion.div style={{ y }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(40px, 7vw, 100px)',
        alignItems: 'start',
        position: 'relative', zIndex: 1,
      }}>

        {/* LEFT: Heading + copy */}
        <div>
          <motion.div variants={itemVariants} style={{ marginBottom: 20 }}>
            <span className="section-badge">About the Event</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              color: '#f0f0f8',
              lineHeight: 1.12,
              marginBottom: 24,
              letterSpacing: '-0.01em',
            }}
          >
            Where Technology<br />
            <span style={{ color: 'rgba(34,229,187,0.85)' }}>Meets the Cosmos</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
              lineHeight: 1.9,
              color: 'rgba(240,240,248,0.58)',
              marginBottom: 20,
            }}
          >
            <strong style={{ color: 'rgba(240,240,248,0.9)', fontFamily: 'Space Grotesk' }}>SIGIN'26</strong> is the annual intercollegiate technical and non-technical
            symposium, reborn under an{' '}
            <em style={{ color: 'rgba(34,229,187,0.85)', fontStyle: 'normal', fontWeight: 500 }}>Interstellar</em> theme —
            an odyssey through innovation, creativity, and intellect.
          </motion.p>
          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.08rem)',
              lineHeight: 1.9,
              color: 'rgba(240,240,248,0.55)',
            }}
          >
            Navigate through constellations of competition — from mind-bending code challenges
            to paper presentations and beyond. The cosmos is calling.
          </motion.p>
        </div>

        {/* RIGHT: Feature pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {PILLARS.map(({ label, desc, icon }, i) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ borderColor: 'rgba(0,184,150,0.35)', boxShadow: '0 8px 40px rgba(0,184,150,0.1)' }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '24px 24px',
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              {/* Icon box */}
              <div style={{
                flexShrink: 0,
                width: 44, height: 44,
                background: 'rgba(0,184,150,0.12)',
                border: '1px solid rgba(0,184,150,0.22)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(34,229,187,0.85)',
              }}>
                {icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 15,
                  color: '#f0f0f8',
                  marginBottom: 6,
                }}>{label}</h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  color: 'rgba(240,240,248,0.50)',
                  lineHeight: 1.7,
                }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </motion.div>
    </motion.section>
  );
}
