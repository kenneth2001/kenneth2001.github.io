import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface ScrambleTextProps {
  /** Final text to decode into. */
  text: string;
  /** Optional className applied to the rendered element (preserves gradient styles etc). */
  className?: string;
  /** HTML tag. Defaults to span (use inside headings). */
  as?: 'span' | 'h1' | 'h2' | 'h3';
  /** ms per frame. Lower = faster decode. Default 35. */
  speed?: number;
  /**
   * Trigger mode:
   * - 'mount'   — decode once on mount (Hero H1)
   * - 'inView'  — decode on enter, scramble-back on leave (Section titles, bidirectional)
   */
  trigger?: 'mount' | 'inView';
  /** For 'inView': root margin for the IntersectionObserver. Default '-80px'. */
  rootMargin?: string;
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$&%01ABCDEF';

/**
 * ScrambleText — decodes from random characters to the final text, char by char.
 * The terminal/hacker "decrypt" effect. Each position iterates through random
 * chars before locking onto its final character, left-to-right.
 *
 * Under prefers-reduced-motion: renders the final text instantly, no animation.
 */
const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as = 'span',
  speed = 35,
  trigger = 'mount',
  rootMargin = '-80px',
}) => {
  const reduce = Boolean(useReducedMotion());
  const [display, setDisplay] = useState<string>(reduce ? text : '');
  const elRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | undefined>(undefined);

  // Run one decode pass: scramble each char, locking left-to-right over a
  // FIXED duration (time-based, not frame-counted). This ensures the decode
  // completes in the same wall-clock time regardless of rAF throttle (mobile
  // Safari Low Power Mode, background tabs, etc. can throttle rAF to ~10fps).
  const runDecode = (finalText: string) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const chars = finalText.split('');
    const duration = speed * 40; // ~1200ms at speed=30
    const startTime = performance.now();

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const lockedCount = Math.floor(progress * chars.length);

      const output = chars
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < lockedCount) return char; // locked
          // still scrambling
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');
      setDisplay(output);

      if (elapsed < duration) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  // Scramble-back: replace text with random chars (for leave-back in inView mode).
  const runScrambleBack = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const output = text
      .split('')
      .map((char) =>
        char === ' '
          ? ' '
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
      )
      .join('');
    setDisplay(output);
  };

  // Mount trigger: decode once.
  useEffect(() => {
    if (reduce || trigger !== 'mount') return;
    runDecode(text);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // runDecode is a stable closure over refs/state; re-running on its identity change is undesirable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, trigger, text, speed]);

  // inView trigger: IntersectionObserver, decode on enter, scramble-back on leave.
  useEffect(() => {
    if (reduce || trigger !== 'inView' || !elRef.current) return;
    const el = elRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runDecode(text);
          } else {
            runScrambleBack();
          }
        });
      },
      { rootMargin, threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // runDecode/runScrambleBack are stable closures; re-running on identity change is undesirable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, trigger, text, rootMargin, speed]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={elRef as React.Ref<HTMLElement>} className={className}>
      {reduce ? text : display}
    </Tag>
  );
};

export default ScrambleText;
