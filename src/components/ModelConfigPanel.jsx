import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

/**
 * ModelConfigPanel — floating top-right panel for tweaking
 * position, rotation, scale and animation of each 3D model.
 *
 * Props:
 *   configs: { [modelKey]: { pos, rot, scale, speed, visible } }
 *   onChange: (modelKey, field, value) => void
 */

const MODEL_META = {
  ship:      { label: 'Jet · Hero',       color: '#22e5bb' },
  man:       { label: 'Astronaut · Hero', color: '#38bdf8' },
  blackhole: { label: 'Blackhole · Events', color: '#f59e0b' },
};

const DEFAULTS = {
  ship:      { pos: [3, -0.5, -2], rot: [0, -0.6, 0.1], scale: 1.2, speed: 0.4, visible: true },
  man:       { pos: [-2.5, -1.2, -1], rot: [0, 0.4, 0], scale: 1.0, speed: 0.3, visible: true },
  blackhole: { pos: [2, 0, -3], rot: [0.3, 0, 0], scale: 1.5, speed: 0.6, visible: true },
};

function SliderRow({ label, value, min, max, step = 0.01, onChange }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'Orbitron', fontWeight: 600 }}>
          {Number(value).toFixed(2)}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{
          width: '100%',
          accentColor: '#22e5bb',
          height: 2,
          cursor: 'pointer',
        }}
      />
    </div>
  );
}

function ModelSection({ modelKey, cfg, onChange, meta }) {
  const [open, setOpen] = useState(true);

  return (
    <div style={{
      marginBottom: 12,
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid rgba(255,255,255,0.07)`,
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '9px 12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          borderBottom: open ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: meta.color, boxShadow: `0 0 6px ${meta.color}` }} />
          <span style={{ fontFamily: 'Space Grotesk', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em' }}>
            {meta.label}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Visible toggle */}
          <button
            onClick={e => { e.stopPropagation(); onChange(modelKey, 'visible', !cfg.visible); }}
            style={{
              width: 28, height: 14,
              borderRadius: 7,
              background: cfg.visible ? meta.color : 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s ease',
            }}
          >
            <span style={{
              position: 'absolute',
              top: 2, left: cfg.visible ? 16 : 2,
              width: 10, height: 10,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s ease',
            }} />
          </button>
          {open ? <ChevronUp size={12} color="rgba(255,255,255,0.4)" /> : <ChevronDown size={12} color="rgba(255,255,255,0.4)" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '10px 12px 12px' }}>
              {/* Position */}
              <p style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6 }}>Position</p>
              <SliderRow label="X" value={cfg.pos[0]} min={-8} max={8} onChange={v => onChange(modelKey, 'pos', [v, cfg.pos[1], cfg.pos[2]])} />
              <SliderRow label="Y" value={cfg.pos[1]} min={-5} max={5} onChange={v => onChange(modelKey, 'pos', [cfg.pos[0], v, cfg.pos[2]])} />
              <SliderRow label="Z" value={cfg.pos[2]} min={-8} max={2} onChange={v => onChange(modelKey, 'pos', [cfg.pos[0], cfg.pos[1], v])} />

              {/* Rotation */}
              <p style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6, marginTop: 10 }}>Rotation</p>
              <SliderRow label="RX" value={cfg.rot[0]} min={-Math.PI} max={Math.PI} step={0.02} onChange={v => onChange(modelKey, 'rot', [v, cfg.rot[1], cfg.rot[2]])} />
              <SliderRow label="RY" value={cfg.rot[1]} min={-Math.PI} max={Math.PI} step={0.02} onChange={v => onChange(modelKey, 'rot', [cfg.rot[0], v, cfg.rot[2]])} />
              <SliderRow label="RZ" value={cfg.rot[2]} min={-Math.PI} max={Math.PI} step={0.02} onChange={v => onChange(modelKey, 'rot', [cfg.rot[0], cfg.rot[1], v])} />

              {/* Scale & Speed */}
              <p style={{ fontFamily: 'Orbitron', fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 6, marginTop: 10 }}>Scale & Animation</p>
              <SliderRow label="Scale" value={cfg.scale} min={0.1} max={5} step={0.05} onChange={v => onChange(modelKey, 'scale', v)} />
              <SliderRow label="Spin Speed" value={cfg.speed} min={0} max={2} step={0.02} onChange={v => onChange(modelKey, 'speed', v)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { DEFAULTS };

export default function ModelConfigPanel({ configs, onChange }) {
  const [panelOpen, setPanelOpen] = useState(false);

  const handleReset = () => {
    Object.keys(DEFAULTS).forEach(key => {
      Object.keys(DEFAULTS[key]).forEach(field => {
        onChange(key, field, DEFAULTS[key][field]);
      });
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 72,
      right: 16,
      zIndex: 2000,
      userSelect: 'none',
    }}>
      {/* Toggle button */}
      <motion.button
        onClick={() => setPanelOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: panelOpen ? 'rgba(0,184,150,0.2)' : 'rgba(8,11,26,0.85)',
          border: `1px solid ${panelOpen ? 'rgba(34,229,187,0.5)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: 10,
          padding: '8px 14px',
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: panelOpen ? '#22e5bb' : 'rgba(255,255,255,0.7)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          transition: 'all 0.2s ease',
          marginLeft: 'auto',
          marginBottom: 8,
        }}
      >
        <Settings2 size={14} />
        3D CONFIG
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              width: 240,
              background: 'rgba(6, 8, 20, 0.92)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14,
              padding: 14,
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                3D Model Config
              </span>
              <button
                onClick={handleReset}
                title="Reset all to default"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <RotateCcw size={11} />
                <span style={{ fontFamily: 'Inter', fontSize: 10 }}>Reset</span>
              </button>
            </div>

            {/* Each model */}
            {Object.keys(MODEL_META).map(key => (
              <ModelSection
                key={key}
                modelKey={key}
                cfg={configs[key]}
                onChange={onChange}
                meta={MODEL_META[key]}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
