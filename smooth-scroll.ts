import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Singleton Lenis smooth-scroll instance, kept in module scope so any
 * component can import `lenis` / `scrollTo` without prop-drilling.
 *
 * Returned getters are null-safe: if reduced-motion is requested we never
 * instantiate Lenis and scrollTo falls back to native behavior.
 */
let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis + sync with GSAP ScrollTrigger. Call once at app mount.
 * Returns a cleanup function. No-op (returns no-op) under reduced motion.
 */
export function initSmoothScroll(): () => void {
  // Honor reduced motion: skip Lenis entirely, use native scroll.
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  if (lenisInstance) return () => {};

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });
  lenisInstance = lenis;

  // Sync Lenis -> ScrollTrigger on every scroll frame.
  lenis.on('scroll', () => ScrollTrigger.update());

  // Drive Lenis via GSAP's ticker for a single rAF loop.
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Recalculate triggers after fonts/layout settle.
  const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 300);

  return () => {
    window.clearTimeout(refreshTimer);
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenisInstance = null;
  };
}

/**
 * Smooth-scroll to a target. Accepts a CSS selector, element, or pixel offset.
 * Falls back to native scroll if Lenis isn't running (reduced motion).
 */
export function scrollTo(target: string | HTMLElement | number): void {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(target, { offset: -80, duration: 1.2 });
  } else {
    // Reduced-motion fallback
    if (typeof target === 'number') {
      window.scrollTo({ top: target });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView();
    } else {
      target.scrollIntoView();
    }
  }
}

export { gsap, ScrollTrigger };
