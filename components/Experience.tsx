import React from 'react';
import Section from './Section';
import { EXPERIENCES } from '../constants';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Briefcase, ChevronRight, Info } from 'lucide-react';
import { decryptBlur, viewportFancy } from '../reveal';

const Experience: React.FC = () => {
  const reduce = Boolean(useReducedMotion());
  return (
    <Section id="experience" title="Work Experience">
      <div className="space-y-12">
        {EXPERIENCES.map((job, index) => (
          <motion.div
            key={index}
            variants={decryptBlur}
            custom={index}
            initial={reduce ? 'show' : 'hidden'}
            whileInView={reduce ? undefined : 'show'}
            viewport={reduce ? undefined : viewportFancy}
            className="relative group"
          >
            {/* Timeline connector for Desktop */}
            <div className={`hidden md:block absolute left-[28px] top-[28px] bottom-[-48px] w-0.5 bg-slate-800 group-hover:bg-slate-700 transition-colors ${index === EXPERIENCES.length - 1 ? 'hidden' : ''}`}></div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Icon & Date - Desktop */}
              <div className="hidden md:flex flex-col items-center min-w-[60px]">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center z-10 shadow-lg shadow-black/20 group-hover:border-neon-purple group-hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] transition-all duration-300">
                  <Briefcase size={24} className="text-slate-400 group-hover:text-neon-purple transition-colors" />
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-slate-900/40 rounded-2xl p-4 sm:p-6 border border-slate-800 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">{job.title}</h3>
                    <h4 className="text-lg text-primary-400 font-medium">{job.company}</h4>
                  </div>
                  <div className="flex items-center self-start md:self-auto mt-2 md:mt-0 text-slate-400 bg-slate-950 px-3 py-1 rounded-full text-sm border border-slate-800 group-hover:border-slate-700">
                    <Calendar size={16} className="mr-2" />
                    {job.period}
                  </div>
                </div>

                {/* Role Highlight / Special Note */}
                {job.highlight && (
                  <div className="flex items-center p-3 mb-4 rounded-lg bg-fuchsia-900/10 border border-fuchsia-900/30 text-neon-pink text-sm font-medium shadow-[0_0_5px_rgba(255,0,255,0.1)]">
                    <Info size={16} className="mr-2 flex-shrink-0" />
                    {job.highlight}
                  </div>
                )}

                {/* Direct Description */}
                {job.description && (
                  <ul className="space-y-2 mb-6">
                    {job.description.map((desc, i) => (
                      <li key={i} className="flex items-start text-slate-300">
                        <ChevronRight size={16} className="mt-1 mr-2 text-neon-purple flex-shrink-0" />
                        <span className="text-justify">{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Projects (Specific for OOCL or similar roles) */}
                {job.projects && (
                  <div className="mt-6 space-y-6">
                    <h5 className="text-sm uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-800 pb-2 mb-4">Key Projects</h5>
                    {(() => {
                      // Group projects by category, preserving insertion order.
                      const grouped: { category: string; projects: NonNullable<typeof job.projects> }[] = [];
                      const indexByKey = new Map<string, number>();
                      (job.projects || []).forEach(p => {
                        const key = p.category ?? '';
                        if (!indexByKey.has(key)) {
                          indexByKey.set(key, grouped.length);
                          grouped.push({ category: key, projects: [] });
                        }
                        grouped[indexByKey.get(key)].projects.push(p);
                      });

                      // Fallback: when no project carries a category, render flat (legacy behaviour).
                      const hasCategories = grouped.some(g => g.category !== '');

                      if (!hasCategories) {
                        return job.projects.map((project, pIndex) => (
                          <div key={pIndex} className="border-l-2 border-neon-purple/30 pl-3 sm:p-5 sm:rounded-lg sm:border sm:border-slate-800/50 sm:bg-slate-950/50 hover:sm:border-neon-blue/30 transition-colors">
                            <h6 className="text-lg font-semibold text-fuchsia-400 mb-3 drop-shadow-[0_0_3px_rgba(167,139,250,0.5)]">{project.title}</h6>
                            <ul className="space-y-2">
                              {project.description.map((desc, dIndex) => (
                                <li key={dIndex} className="flex items-start text-slate-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 mr-3 flex-shrink-0 group-hover:bg-neon-blue transition-colors"></div>
                                  <span className="text-justify text-sm md:text-base">{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ));
                      }

                      return grouped.map((group, gIndex) => {
                        const catSkills = job.categorySkills?.[group.category];
                        return (
                          <div key={gIndex} className="border-l-2 border-neon-purple/30 pl-3 sm:p-5 sm:rounded-lg sm:border sm:border-slate-800/50 sm:bg-slate-950/50 hover:sm:border-neon-blue/30 transition-colors">
                            <h6 className="text-lg font-semibold text-fuchsia-400 mb-4 drop-shadow-[0_0_3px_rgba(167,139,250,0.5)]">{group.category}</h6>
                            <ul className="sm:space-y-3">
                              {group.projects.map((project, pIndex) => (
                                <li key={pIndex} className={`flex items-start text-slate-300 ${pIndex > 0 ? 'mt-3 border-t border-slate-800/50 pt-3 sm:mt-0 sm:border-0 sm:pt-0' : ''}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-2 mr-3 flex-shrink-0 group-hover:bg-neon-blue transition-colors hidden sm:block"></div>
                                  <div className="min-w-0">
                                    <span className="block font-semibold text-slate-100 mb-1">{project.title}</span>
                                    <span className="block text-justify text-sm md:text-base">{project.description[0]}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            {catSkills && catSkills.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {catSkills.map((skill, sIndex) => (
                                  <span key={sIndex} className="bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-xs font-medium rounded-full px-3 py-1 drop-shadow-[0_0_3px_rgba(139,92,246,0.5)] hover:bg-neon-purple/15 hover:border-neon-purple/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.7)] hover:-translate-y-0.5 transition-all duration-300">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}

                {/* Skill chips */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="bg-neon-purple/5 border border-neon-purple/20 text-neon-purple text-xs font-medium rounded-full px-3 py-1 drop-shadow-[0_0_3px_rgba(139,92,246,0.5)] hover:bg-neon-purple/15 hover:border-neon-purple/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.4)] hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.7)] hover:-translate-y-0.5 transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
