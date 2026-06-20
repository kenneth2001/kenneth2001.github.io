import React from 'react';
import Hero from './Hero';
import Experience from './Experience';
import Education from './Education';

const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <div className="relative bg-slate-950">
        <Experience />
        <Education />
      </div>
    </div>
  );
};

export default Home;