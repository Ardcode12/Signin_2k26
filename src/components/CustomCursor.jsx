import { useEffect, useRef } from 'react';

/**
 * CustomCursor — minimal dot + ring, no glow trail.
 * Desktop only (hidden on touch devices via opacity).
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf;
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let dx = rx, dy = ry;

    const onMove = (e) => { dx = e.clientX; dy = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Dot follows exactly, ring lerps
    function tick() {
      rx += (dx - rx) * 0.13;
      ry += (dy - ry) * 0.13;

      dot.style.left  = `${dx}px`;
      dot.style.top   = `${dy}px`;
      ring.style.left = `${rx}px`;
      ring.style.top  = `${ry}px`;

      raf = requestAnimationFrame(tick);
    }
    tick();

    // Scale ring on interactive elements
    const onEnter = () => { ring.style.transform = 'translate(-50%,-50%) scale(1.6)'; ring.style.opacity = '0.4'; };
    const onLeave = () => { ring.style.transform = 'translate(-50%,-50%) scale(1)';   ring.style.opacity = '1'; };
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Hide on touch
    const onTouch = () => {
      dot.style.display  = 'none';
      ring.style.display = 'none';
    };
    window.addEventListener('touchstart', onTouch, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 6, height: 6,
          background: 'rgba(34,229,187,0.95)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.05s linear',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 30, height: 30,
          border: '1px solid rgba(34,229,187,0.45)',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%,-50%)',
          transition: 'transform 0.25s ease, opacity 0.25s ease',
        }}
      />
    </>
  );
}
