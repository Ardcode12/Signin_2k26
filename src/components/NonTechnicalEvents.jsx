import { motion } from 'framer-motion';
import { Smile, Shuffle, Sparkles } from 'lucide-react';
import EventCard from './EventCard';

const NON_TECHNICAL_EVENTS = [
  {
    title: 'Dumb Charades / Guess the Image',
    icon: Smile,
    tag: 'FUN · 01',
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
    description: 'A fast-paced, mind-bending flip-side challenge where quick thinking and adaptability are your greatest superpowers. Flip the script and claim the galaxy!',
    coordinators: [
      { name: 'Dharanish BM', phone: 'TBA' },
      { name: 'Manivel Karthick', phone: 'TBA' },
      { name: 'Dhanursi V', phone: 'TBA' },
    ],
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Non-Technical Events Section
 */
export default function NonTechnicalEvents() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        minHeight: '80vh',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Nebula blobs */}
      <div className="nebula-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(219,39,119,0.1), transparent 70%)',
        top: '10%', right: '-10%',
        animationDelay: '2s',
      }} />
      <div className="nebula-blob" style={{
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%)',
        bottom: '0%', left: '-5%',
        animationDelay: '0s',
      }} />

      {/* Header */}
      <motion.div variants={headerVariants} style={{ textAlign: 'center', marginBottom: 64 }}>
        <span style={{
          fontFamily: 'Space Grotesk',
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#f59e0b',
          background: 'rgba(245,158,11,0.1)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 100,
          padding: '5px 16px',
          display: 'inline-block',
          marginBottom: 20,
        }}>
          <Sparkles size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Non-Technical Events <Sparkles size={12} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </span>
        <h2 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: 16,
          background: 'linear-gradient(135deg, #fcd34d, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Fun & Creativity
        </h2>
        <p style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 560,
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          Take a break from the algorithms and let your creativity shine.
          These events are designed to be pure, unadulterated fun across the cosmos.
        </p>
      </motion.div>

      {/* Cards — centered two-column */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
        maxWidth: 760,
        margin: '0 auto',
      }}>
        {NON_TECHNICAL_EVENTS.map((event, i) => (
          <EventCard
            key={event.title}
            event={event}
            index={i}
            accentColor={['#f59e0b', '#db2777'][i]}
          />
        ))}
      </div>
    </motion.section>
  );
}
