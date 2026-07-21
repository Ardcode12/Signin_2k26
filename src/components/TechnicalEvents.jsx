import { motion } from 'framer-motion';
import { FileText, Code2, Bot, Sparkles } from 'lucide-react';
import EventCard from './EventCard';

const TECHNICAL_EVENTS = [
  {
    title: 'Paper Presentation',
    icon: FileText,
    tag: 'TECH · 01',
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
    description: 'A two-round coding gauntlet designed to test your algorithmic thinking, debugging prowess, and speed under pressure.',
    rounds: [
      'Tech Quiz, Code Snippets & Debugging Challenges',
      'Two competitive coding problems on HackerRank',
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
    description: 'Harness the power of AI. Craft the most creative, precise, and effective prompts to solve challenges in this cutting-edge GenAI competition.',
    coordinators: [
      { name: 'Shreyaa', phone: '9842484828' },
      { name: 'Deepika', phone: 'TBA' },
      { name: 'Shirustihaa', phone: 'TBA' },
    ],
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Technical Events Section
 */
export default function TechnicalEvents() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{
        minHeight: '100vh',
        padding: 'clamp(80px, 12vh, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      {/* Nebula blobs */}
      <div className="nebula-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(0,184,150,0.12), transparent 70%)',
        top: '-5%', left: '-15%',
        animationDelay: '0s',
      }} />

      {/* Header */}
      <motion.div variants={headerVariants} style={{ textAlign: 'center', marginBottom: 64 }}>
        <span style={{
          fontFamily: 'Space Grotesk',
          fontSize: 11,
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#00b896',
          background: 'rgba(0,184,150,0.12)',
          border: '1px solid rgba(0,184,150,0.3)',
          borderRadius: 100,
          padding: '5px 16px',
          display: 'inline-block',
          marginBottom: 20,
        }}>
          <Sparkles size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Technical Events <Sparkles size={12} style={{ display: 'inline', marginLeft: 6, verticalAlign: 'middle' }} />
        </span>
        <h2 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          marginBottom: 16,
          background: 'linear-gradient(135deg, #22e5bb, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1.1,
        }}>
          Technical Sectors
        </h2>
        <p style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 560,
          margin: '0 auto',
          lineHeight: 1.8,
        }}>
          Navigate through our constellation of intellectual competitions.
          Choose your orbital path and make your mark on the cosmos.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {TECHNICAL_EVENTS.map((event, i) => (
          <EventCard
            key={event.title}
            event={event}
            index={i}
            accentColor={['#00b896', '#38bdf8', '#0d9488'][i]}
          />
        ))}
      </div>

      {/* Decorative orbit element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: '10%', right: '5%',
          width: 200, height: 200,
          border: '1px dashed rgba(0,184,150,0.15)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
    </motion.section>
  );
}
