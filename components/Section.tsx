import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { decryptBlur, viewportFancy, EASE } from '../reveal';
import ScrambleText from './ScrambleText';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  const reduce = Boolean(useReducedMotion());
  return (
    <section id={id} className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {title && (
        <motion.div
          variants={decryptBlur}
          initial={reduce ? 'show' : 'hidden'}
          whileInView={reduce ? undefined : 'show'}
          viewport={reduce ? undefined : viewportFancy}
          className="mb-8 md:mb-12"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <ScrambleText
                as="span"
                text={title}
                trigger={reduce ? 'mount' : 'inView'}
                speed={15}
              />
            </h2>
            <motion.span
              className="absolute -bottom-2 left-0 w-2/3 h-1 origin-left rounded-full bg-gradient-to-r from-neon-purple to-neon-blue shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={reduce ? undefined : viewportFancy}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            />
          </div>
        </motion.div>
      )}
      {children}
    </section>
  );
};

export default Section;
