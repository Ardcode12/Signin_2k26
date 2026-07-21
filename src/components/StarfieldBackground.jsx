import { useEffect, useRef } from 'react';

/**
 * StarfieldBackground — canvas starfield.
 * Fixed, behind all content, pointer-events none.
 * Stars are all white/silver — no multi-color chaos.
 */
export default function StarfieldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let width, height;

    // Star data
    const STAR_COUNT = 320;
    const stars = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.2,
          alpha: Math.random() * 0.6 + 0.15,
          speed: Math.random() * 0.012 + 0.003,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    resize();
    initStars();
    window.addEventListener('resize', () => { resize(); initStars(); });

    // Mouse parallax (very subtle)
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 12;
      my = (e.clientY / window.innerHeight - 0.5) * 8;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let t = 0;
    function draw() {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.speed * 80 + s.phase);
        const a = s.alpha * (0.4 + 0.6 * twinkle);

        ctx.beginPath();
        ctx.arc(
          s.x + mx * s.r * 0.4,
          s.y + my * s.r * 0.3,
          s.r,
          0, Math.PI * 2
        );
        ctx.fillStyle = `rgba(220, 215, 240, ${a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
  );
}
