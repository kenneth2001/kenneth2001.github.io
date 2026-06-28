import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce, EASE } from '../reveal';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}>
      {title && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative inline-block">
            {title}
            <motion.span
              className="absolute -bottom-2 left-0 w-2/3 h-1 origin-left rounded-full bg-gradient-to-r from-neon-purple to-neon-blue shadow-[0_0_8px_rgba(139,92,246,0.6)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            />
          </h2>
        </motion.div>
      )}
      {children}
    </section>
  );
};

export default Section;
