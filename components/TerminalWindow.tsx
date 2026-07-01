import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FileJson, Terminal } from 'lucide-react';
import { isTouchDevice } from '../smooth-scroll';

// Terminal code content — rendered character-by-character via imperative DOM.
const CODE_LINES: { text: string; cls?: string }[][] = [
  [{ text: '# Personal Highlights', cls: 'text-slate-500' }],
  [{ text: 'role', cls: 'text-neon-purple' }, { text: ' = ', cls: 'text-slate-400' }, { text: '"Data Scientist"', cls: 'text-amber-300' }],
  [{ text: ' ' }],
  [{ text: 'key_expertise', cls: 'text-neon-purple' }, { text: ' = [', cls: 'text-slate-400' }],
  [{ text: '  "Multi-Agent Systems"', cls: 'text-amber-300' }, { text: ',', cls: 'text-slate-400' }],
  [{ text: '  "Deep Learning"', cls: 'text-amber-300' }, { text: ',', cls: 'text-slate-400' }],
  [{ text: '  "Optimisation"', cls: 'text-amber-300' }],
  [{ text: ']', cls: 'text-slate-400' }],
  [{ text: ' ' }],
  [{ text: '# Ready to contribute', cls: 'text-slate-500' }],
  [{ text: 'status', cls: 'text-neon-purple' }, { text: ' = ', cls: 'text-slate-400' }, { text: '"Open for Opportunities"', cls: 'text-neon-green' }],
];

/**
 * TerminalWindow — animated terminal with character-by-character typewriter.
 *
 * The colored char spans are built imperatively in useEffect and revealed
 * one-by-one via rAF by toggling `opacity`. Zero React re-renders during
 * the animation.
 *
 * On touch devices the typewriter is skipped (static render) — Safari
 * throttles rAF during mount, causing the animation to freeze.
 */
const TerminalWindow: React.FC = () => {
  const reduce = Boolean(useReducedMotion());
  const touch = isTouchDevice();
  const skipAnimation = reduce || touch;
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (skipAnimation || !codeRef.current) return;
    const code = codeRef.current;
    code.innerHTML = '';

    // Build the full colored DOM imperatively: one <span> per character,
    // grouped into block-level line containers. All start at opacity: 0.
    const charSpans: HTMLSpanElement[] = [];

    CODE_LINES.forEach((line) => {
      const lineEl = document.createElement('span');
      lineEl.style.display = 'block';

      if (line.length === 1 && line[0].text.trim() === '') {
        lineEl.innerHTML = '&nbsp;';
        code.appendChild(lineEl);
        return;
      }

      line.forEach((seg) => {
        Array.from(seg.text).forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          if (seg.cls) span.className = seg.cls;
          span.style.opacity = '0';
          lineEl.appendChild(span);
          charSpans.push(span);
        });
      });
      code.appendChild(lineEl);
    });

    // Add blinking cursor — follows the last revealed character.
    const cursor = document.createElement('span');
    cursor.className = 'ht-cursor';
    cursor.style.cssText = 'display:inline-block;width:0.5rem;height:1em;background:#0aff00;margin-left:1px;vertical-align:middle;animation:ht-blink 1s steps(1) infinite;translate:0 0.1em;';
    // Start cursor before the first character
    charSpans[0]?.parentNode?.insertBefore(cursor, charSpans[0]);

    // Reveal characters one-by-one via rAF (~70 chars/sec).
    const charsPerSecond = 70;
    let revealedCount = 0;
    let lastTime = 0;
    let raf = 0;

    const step = (now: number) => {
      if (lastTime === 0) lastTime = now;
      const elapsed = now - lastTime;
      const charsToReveal = Math.floor((elapsed / 1000) * charsPerSecond);
      if (charsToReveal > 0) {
        for (let j = 0; j < charsToReveal && revealedCount < charSpans.length; j++, revealedCount++) {
          charSpans[revealedCount].style.opacity = '1';
        }
        // Move cursor to right after the last revealed character
        const lastRevealed = charSpans[revealedCount - 1];
        if (lastRevealed) {
          lastRevealed.parentNode?.insertBefore(cursor, lastRevealed.nextSibling);
        }
        lastTime = now;
      }
      if (revealedCount < charSpans.length) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);

    const snap = () => {
      if (document.visibilityState === 'visible') {
        charSpans.forEach((s) => (s.style.opacity = '1'));
        revealedCount = charSpans.length;
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener('visibilitychange', snap);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', snap);
      code.innerHTML = '';
    };
  }, [skipAnimation]);

  return (
    <div className="relative group">
      {/* Neon Border Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Window Header */}
        <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 hover:shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50 hover:bg-amber-500 hover:shadow-[0_0_8px_rgba(245,158,11,0.8)] transition-all"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 hover:bg-emerald-500 hover:shadow-[0_0_8px_rgba(16,185,129,0.8)] transition-all"></div>
          </div>
          <div className="flex items-center text-xs text-slate-500 font-mono">
            <FileJson size={12} className="mr-2 text-neon-purple" />
            profile.py
          </div>
          <div className="w-10"></div>
        </div>

        {/* Code Content — built imperatively in useEffect for zero React re-renders. */}
        <div className="p-6 overflow-x-auto bg-slate-900/95">
          <pre className="ht-mono text-sm md:text-base leading-relaxed">
            <code ref={codeRef}>
              {/* Static render when animation is skipped (reduced motion or touch) */}
              {skipAnimation &&
                CODE_LINES.map((line, li) => (
                  <span key={li} className="block">
                    {line.map((seg, si) => (
                      <span key={si} className={seg.cls}>{seg.text}</span>
                    ))}
                  </span>
                ))}
            </code>
          </pre>
        </div>

        {/* System Status Strip */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/60 px-4 py-2.5">
          <div className="flex items-center gap-2 ht-mono text-[11px] tracking-wider text-slate-500">
            <Terminal size={11} className="text-neon-purple" />
            <span className="text-slate-600">LOC</span>
            <span className="text-slate-300">HKG</span>
          </div>
          <div className="flex items-center gap-2 ht-mono text-[11px] tracking-wider text-slate-500">
            <span className="text-slate-600">TZ</span>
            <span className="text-slate-300">HKT</span>
          </div>
          <div className="flex items-center gap-2 ht-mono text-[11px] tracking-wider text-slate-500">
            <span className="text-slate-600">STATUS</span>
            <span className="flex items-center gap-1.5 text-neon-green">
              <span className="h-1.5 w-1.5 rounded-full bg-neon-green animate-pulse shadow-[0_0_5px_rgba(10,255,0,0.8)]"></span>
              online
            </span>
          </div>
        </div>

        {/* Subtle scanline overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 3px)' }}></div>
      </div>
    </div>
  );
};

export default TerminalWindow;
