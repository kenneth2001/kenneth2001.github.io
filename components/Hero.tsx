import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { fadeUp, fadeUpStagger, decryptBlur } from '../reveal';
import ScrambleText from './ScrambleText';
import TerminalWindow from './TerminalWindow';
import { gsap, isTouchDevice } from '../smooth-scroll';
import { scrollTo } from '../smooth-scroll';

const NAME = PERSONAL_INFO.name.split(' ')[0];

const Hero: React.FC = () => {
  const reduce = Boolean(useReducedMotion());
  const touch = isTouchDevice();
  const sectionRef = useRef<HTMLElement>(null);
  const skylineRef = useRef<HTMLDivElement>(null);

  // Cinematic Hero exit (GSAP ScrollTrigger, NOT pinned).
  // As you scroll away from the hero: skyline strokes draw in, skyline
  // parallaxes for depth. Skipped on touch devices — native scroll is better
  // on mobile and ScrollTrigger scrub can cause iOS Safari issues.
  useEffect(() => {
    if (reduce || touch || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // Skyline strokes draw in via stroke-dashoffset as the hero exits.
      const skylinePaths = gsap.utils.toArray<SVGPathElement>('.hero-skyline path');
      skylinePaths.forEach((path) => {
        if (!path.getTotalLength) return;
        const length = path.getTotalLength();
        if (length > 0) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 0.5 }, 0);
        }
      });
      // Skyline drifts down gently for depth.
      if (skylineRef.current) {
        tl.to(skylineRef.current, { y: '15%', ease: 'none', duration: 1 }, 0);
      }
    }, sectionRef.current);
    return () => ctx.revert();
  }, [reduce, touch]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-16 md:pt-24 md:pb-32 overflow-hidden bg-slate-950" id="about">
      <style>{`
        @keyframes ht-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        .ht-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .ht-cursor { animation: ht-blink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .ht-cursor { animation: none; } }
      `}</style>

      {/* Background Glow Orbs — blend-mode + infinite animation disabled on touch.
          mix-blend-screen + blur-[120px] + animate-pulse-slow is the most
          expensive paint combo on iOS Safari (forces per-frame re-composite
          of the blend stack). Gated behind max-md: for mobile. */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-neon-purple/15 rounded-full blur-[120px] opacity-40 max-md:opacity-20 max-md:blur-[60px] md:mix-blend-screen animate-pulse-slow max-md:[animation:none]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-blue/15 rounded-full blur-[100px] opacity-40 max-md:opacity-20 max-md:blur-[60px] md:mix-blend-screen animate-pulse-slow max-md:[animation:none]" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left z-20"
            variants={fadeUpStagger}
            initial="hidden"
            animate="show"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center py-1 px-3 rounded-full bg-slate-900/80 border border-neon-blue/30 text-neon-blue text-sm font-semibold mb-6 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-neon-blue mr-2 animate-pulse shadow-[0_0_5px_rgba(0,243,255,1)]"></span>
              Available for Data Science Roles
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight lg:whitespace-nowrap">
              <ScrambleText
                as="span"
                text="Hi, I'm "
                trigger="mount"
                speed={30}
                disabled={touch}
              />
              <ScrambleText
                as="span"
                text={NAME}
                trigger="mount"
                speed={30}
                disabled={touch}
                className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple"
              />
            </h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {PERSONAL_INFO.headline}
            </motion.p>

            <motion.div variants={fadeUp} className="text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
              <span className="flex items-center group"><span className="text-neon-green mr-2 group-hover:drop-shadow-[0_0_5px_rgba(10,255,0,0.8)] transition-all">✓</span> Multi-Agent Systems</span>
              <span className="flex items-center group"><span className="text-neon-green mr-2 group-hover:drop-shadow-[0_0_5px_rgba(10,255,0,0.8)] transition-all">✓</span> Deep Learning</span>
              <span className="flex items-center group"><span className="text-neon-green mr-2 group-hover:drop-shadow-[0_0_5px_rgba(10,255,0,0.8)] transition-all">✓</span> Optimisation</span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <a href="#experience" className="px-8 py-3.5 bg-primary-700/90 hover:bg-primary-600 text-white rounded-lg font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 flex items-center border border-primary-500/50">
                View Experience
              </a>
              <a href="#contact" className="px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-neon-blue/50 rounded-lg font-medium transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                Contact Me
              </a>
            </motion.div>

            {/* Hong Kong Location Badge - Neon Style */}
            <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start text-slate-500 text-sm">
              <MapPin size={16} className="text-neon-pink mr-2 drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
              <span className="tracking-widest uppercase text-xs font-semibold text-slate-400 border-l border-slate-700 pl-3 ml-1">
                Based in <span className="text-slate-200 group-hover:text-neon-pink transition-colors">Hong Kong</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visual Content - Animated Terminal (isolated component) */}
          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-xl z-20"
            variants={decryptBlur}
            initial={reduce ? 'show' : 'hidden'}
            animate="show"
            custom={4}
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>

      {/* HK Skyline Silhouette - Stylized */}
      <div ref={skylineRef} className="hero-skyline absolute bottom-0 left-0 right-0 h-48 lg:h-64 w-full overflow-hidden z-0 pointer-events-none opacity-30 select-none">
        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10"></div>

        {/* Skyline SVG */}
        <svg className="w-full h-full absolute bottom-0 text-slate-800 fill-current" preserveAspectRatio="none" viewBox="0 0 1200 300" xmlns="http://www.w3.org/2000/svg">
          {/* Layer 1: Back buildings */}
          <path d="M0,300 L0,200 L50,200 L50,150 L80,150 L80,220 L120,220 L120,100 L160,100 L160,250 L200,250 L200,300 Z" opacity="0.5" />
          <path d="M1000,300 L1000,180 L1050,180 L1050,240 L1100,240 L1100,120 L1140,120 L1140,300 Z" opacity="0.5" />

          {/* Layer 2: Iconic Shapes (Resembling BOC, IFC, Center) */}
          {/* Generic */}
          <rect x="0" y="250" width="1200" height="50" />

          {/* IFC-ish Shape */}
          <path d="M300,300 L300,80 L310,70 L340,70 L350,80 L350,300 Z" />

          {/* The Center-ish */}
          <path d="M450,300 L450,120 L475,100 L500,120 L500,300 Z" />

          {/* BOC-ish (Triangles) */}
          <path d="M600,300 L600,100 L625,50 L650,100 L650,300 Z" />
          <path d="M600,300 L650,220 L600,220" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none"/>
          <path d="M650,220 L600,150 L650,150" stroke="rgba(0,0,0,0.3)" strokeWidth="2" fill="none"/>

          {/* ICC-ish (far right) */}
          <path d="M850,300 L850,90 L900,90 L900,300 Z" />

          {/* Random fillers */}
          <rect x="180" y="200" width="40" height="100" />
          <rect x="380" y="180" width="50" height="120" />
          <rect x="530" y="210" width="40" height="90" />
          <rect x="700" y="160" width="60" height="140" />

        </svg>

        {/* Neon glow line at the base */}
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink blur-[2px] opacity-70"></div>
      </div>

      <motion.div
        style={{ x: '-50%' }}
        animate={reduce || touch ? { y: 0, x: '-50%' } : { y: [0, 10, 0], x: '-50%' }}
        transition={reduce || touch ? undefined : { repeat: Infinity, duration: 2 }}
        className="absolute bottom-2 md:bottom-8 left-1/2 text-slate-500 cursor-pointer hover:text-neon-blue transition-colors z-20"
        onClick={() => {
          scrollTo('#experience');
        }}
      >
        <ArrowDown size={28} className="drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]" />
      </motion.div>
    </section>
  );
};

export default Hero;
