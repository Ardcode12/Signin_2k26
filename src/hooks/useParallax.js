import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * useParallax — returns a { ref, y } pair.
 * Wrap any section with the ref, then apply `style={{ y }}` to
 * the inner content you want to shift on scroll.
 *
 * @param {number} factor  — 0 = no shift, 1 = full shift (default 0.12)
 * @param {string} output  — [top, bottom] offset in pixels (default [-60, 60])
 */
export default function useParallax(factor = 0.12, output = [-60, 60]) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], output);

  return { ref, y };
}
