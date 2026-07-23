import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'technical', label: 'Technical' },
  { id: 'nontechnical', label: 'Non-Technical' },
  { id: 'coordinators', label: 'Coordinators' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Navbar — transparent → frosted glass on scroll.
 * Active item has a bottom underline indicator.
 * Mobile: slide-in drawer from right.
 * No emojis, no rainbow colors.
 */
export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled
            ? 'rgba(4, 5, 14, 0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'padding 0.4s ease, background 0.4s ease, border 0.4s ease',
        }}
      >
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <motion.div
              whileHover={{ opacity: 0.8 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            >
              {/* Department Logo */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 0 10px rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#000',
              }}>
                <img src="/images/dept_logo.jpg" alt="Dept Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: 800,
                fontSize: 17,
                letterSpacing: '0.08em',
                color: '#f0f0f8',
              }}>
                Siginin<span style={{ color: 'rgba(255,255,255,0.45)' }}>'26</span>
              </span>
            </motion.div>
          </button>

          {/* Desktop nav links */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  whileHover={{ y: -1 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontFamily: 'Enbora, sans-serif',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#f0f0f8' : 'rgba(240,240,248,0.5)',
                    position: 'relative',
                    transition: 'color 0.25s ease',
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '18%',
                        width: '64%',
                        height: '1.5px',
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(m => !m)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              zIndex: 1100,
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="hamburger-line"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              className="hamburger-line"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="hamburger-line"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 998,
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: '72%', maxWidth: 300,
                background: 'rgba(8, 11, 26, 0.98)',
                backdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                zIndex: 999,
                padding: '88px 24px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.id)}
                  style={{
                    background: activeSection === item.id
                      ? 'rgba(255,255,255,0.08)'
                      : 'transparent',
                    border: activeSection === item.id
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid transparent',
                    borderRadius: 8,
                    padding: '13px 18px',
                    color: activeSection === item.id
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(240,240,248,0.7)',
                    fontFamily: 'Enbora, sans-serif',
                    fontSize: 15,
                    fontWeight: activeSection === item.id ? 600 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}

              <div style={{
                marginTop: 'auto',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                paddingTop: 24,
              }}>
                <p style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 9,
                  letterSpacing: '0.3em',
                  color: 'rgba(240,240,248,0.2)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>
                  Siginin'26 · Interstellar
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
