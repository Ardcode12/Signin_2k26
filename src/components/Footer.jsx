import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const CONTACTS = [
  { name: 'Mohammed Yunus', phone: '7010499316', role: 'Overall Coordinator' },
  { name: 'Dharun Vidyakar', phone: '8610708272', role: 'Overall Coordinator' },
  { name: 'Shreyaa', phone: '9842484828', role: 'Overall Coordinator' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Footer / Contact Section
 */
export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        position: 'relative',
        padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 80px) 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Hero-style background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#04050e',
        zIndex: 0,
      }} />

      {/* Glowing background nebulas */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <motion.div
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            top: '5%', right: '-10%',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            width: 420, height: 420,
            background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
            bottom: '15%', left: '-5%',
            borderRadius: '50%',
            filter: 'blur(70px)',
          }}
        />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 48,
          marginBottom: 60,
        }}>
          {/* Brand column */}
          <motion.div variants={itemVariants}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48,
                background: '#000',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 0 15px rgba(255,255,255,0.1)',
              }}>
                <img src="/images/dept_logo.jpg" alt="Dept Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 900,
                fontSize: 22,
                color: '#ffffff',
                textShadow: '0 0 20px rgba(255,255,255,0.2)',
              }}>Siginin'26</span>
            </div>
            <p style={{
              fontFamily: 'Enbora',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8,
              maxWidth: 260,
              marginBottom: 24,
            }}>
              The Interstellar Tech & Non-Tech Fest.
              Charting new frontiers of knowledge and creativity across the cosmos.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {SOCIALS.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  style={{
                    width: 40, height: 40,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick nav */}
          <motion.div variants={itemVariants}>
            <h4 style={{
              fontFamily: 'Enbora',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 20,
            }}>Navigation</h4>
            {['home', 'about', 'technical', 'nontechnical', 'coordinators', 'contact'].map(id => (
              <motion.button
                key={id}
                onClick={() => onNavigate(id)}
                whileHover={{ x: 6, color: 'rgba(255,255,255,0.9)' }}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Enbora',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 10,
                  padding: 0,
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  transition: 'color 0.2s ease',
                }}
              >
                → {id === 'nontechnical' ? 'Non-Technical' : id.charAt(0).toUpperCase() + id.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 style={{
              fontFamily: 'Enbora',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 20,
            }}>Mission Control</h4>
            {CONTACTS.map((c) => (
              <div key={c.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
              }}>
                <div style={{
                  width: 36, height: 36,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Orbitron',
                  fontWeight: 800,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.7)',
                  flexShrink: 0,
                }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontFamily: 'Enbora', fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                    {c.name}
                  </div>
                  <a href={`tel:${c.phone}`} style={{
                    fontFamily: 'Enbora',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}>
                    {c.phone}
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={itemVariants}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '28px 0 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <p style={{
              fontFamily: 'Enbora',
              fontSize: 13,
              color: 'rgba(255,255,255,0.3)',
            }}>
              © {currentYear} Siginin'26. All rights reserved across the galaxy.
            </p>

            {/* Closing space tagline */}
            <p style={{
              fontFamily: 'Enbora',
              fontSize: 13,
              color: 'rgba(255,255,255,0.3)',
              fontStyle: 'italic',
              textAlign: 'right',
            }}>
              "The cosmos is within us. We are made of star-stuff." — Carl Sagan
            </p>
          </div>

          {/* Web Team Credits */}
          <div style={{
            borderTop: '1px dashed rgba(255,255,255,0.1)',
            paddingTop: 24,
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'Orbitron',
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Developed by Web Team - IT Association, Kongu Engineering College
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
              fontFamily: 'Enbora',
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
            }}>
              {['Arnald S', 'MohanRaja', 'Soundhar Hari', 'Sesanth'].map((name, i) => (
                <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                  <span>{name}</span>
                  {i !== 3 && <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Big watermark */}
        <div style={{
          textAlign: 'center',
          overflow: 'hidden',
          height: 120,
          marginTop: 40,
          position: 'relative',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}>
            Siginin'26
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
