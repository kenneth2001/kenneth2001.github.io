import type { Variants } from 'framer-motion';

/**
 * Shared reveal language for the site.
 * Smooth ease-out curve (cubic-bezier, easeOutExpo-like) used across all reveals
 * so the whole page shares one consistent motion feel.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Fade + slide up. Pass an index via `custom` for a sequential delay. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.08 },
  }),
};

/** Container that staggers its children's reveals. */
export const fadeUpStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Fade + scale in. Pass an index via `custom` for a sequential delay. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.1 },
  }),
};

/** Slide in from the left. Good for timeline entries. */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Shared viewport config for whileInView reveals. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
