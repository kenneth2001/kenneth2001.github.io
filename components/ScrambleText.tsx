import React, { useEffect, useRef, memo } from 'react';
import { useReducedMotion } from 'framer-motion';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$&%01ABCDEF';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'div';
  speed?: number;
  trigger?: 'mount' | 'inView';
  rootMargin?: string;
  disabled?: boolean;
}

/**
 * ScrambleText — decode-from-random-chars effect.
 *
 * Writes scrambled text directly to `elRef.current.textContent` inside a rAF
 * loop. Zero React re-renders during the animation.
 *
 * When `disabled` is true, renders the final text with no animation (used to
 * skip the effect on touch devices where Safari throttles rAF during mount).
 */
const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  as = 'span',
  speed = 35,
  trigger = 'mount',
  rootMargin = '-80px',
  disabled = false,
}) => {
  const reduce = Boolean(useReducedMotion());
  const elRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cleanup = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (failsafeRef.current) clearTimeout(failsafeRef.current);
    frameRef.current = undefined;
    failsafeRef.current = undefined;
  };

  const inactive = reduce || disabled;

  /** Write scrambled text to DOM, locking `lockedCount` chars from the left. */
  const writeScramble = (lockedCount: number) => {
    const el = elRef.current;
    if (!el) return;
    el.textContent = text
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (i < lockedCount) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join('');
  };

  /** Decode: scramble each char, locking left-to-right over a fixed duration. */
  const runDecode = () => {
    cleanup();
    const el = elRef.current;
    if (!el) return;

    const chars = text.split('');
    const duration = speed * 40; // ~1200ms at speed=30
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (!elRef.current) return;
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const lockedCount = Math.floor(progress * chars.length);
      writeScramble(lockedCount);

      if (elapsed < duration) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        elRef.current.textContent = text;
        cleanup();
      }
    };

    failsafeRef.current = setTimeout(() => {
      if (elRef.current) elRef.current.textContent = text;
      cleanup();
    }, duration + 2000);

    frameRef.current = requestAnimationFrame(tick);
  };

  /** Scramble-back: replace text with random chars (for inView leave). */
  const runScrambleBack = () => {
    cleanup();
    writeScramble(0);
  };

  // Mount trigger: decode on mount.
  useEffect(() => {
    if (inactive || trigger !== 'mount') return;
    runDecode();
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inactive, trigger, text, speed]);

  // inView trigger: decode on enter, scramble-back on leave.
  useEffect(() => {
    if (inactive || trigger !== 'inView' || !elRef.current) return;
    const el = elRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runDecode();
          else runScrambleBack();
        });
      },
      { rootMargin, threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inactive, trigger, text, rootMargin, speed]);

  // visibilitychange: snap to final text when tab becomes visible.
  useEffect(() => {
    if (inactive) return;
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && elRef.current) {
        elRef.current.textContent = text;
        cleanup();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [inactive, text]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={elRef as React.Ref<HTMLElement>} className={className}>
      {text}
    </Tag>
  );
};

export default memo(ScrambleText);
