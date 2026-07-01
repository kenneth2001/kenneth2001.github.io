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

/**
 * Decrypt reveal — opacity + scale. The "booting up / decrypting" reveal.
 *
 * NOTE: Previously animated `filter: blur(12px → 0)`. Filter blur animation is
 * one of the most expensive CSS operations on iOS Safari (per-frame
 * re-rasterization), and was a primary cause of the mobile paint storm.
 * The visual difference between fade+scale and fade+scale+blur is minimal;
 * the performance difference is 5-10×.
 *
 * Pass an index via `custom` for a sequential delay.
 */
export const decryptBlur: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
  }),
};

/** Masked word slide-up — used inside SplitHeading. Inner span sits in an overflow-hidden parent. */
export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.7, ease: EASE } },
};

/** Container that staggers masked words inside SplitHeading. */
export const maskStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/** One-shot viewport — body content (play once, never reverse). */
export const viewportOnce = { once: true, margin: '-80px' } as const;

/** Bidirectional viewport — re-animates on enter AND leave. Fancy elements only. */
export const viewportFancy = { once: false, margin: '-80px' } as const;
