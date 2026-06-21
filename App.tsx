import React, { useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const Ratings = React.lazy(() => import('./components/Ratings'));

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse shadow-[0_0_20px_4px_rgba(168,85,247,0.7)]" />
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-primary-500/30 selection:text-white flex flex-col">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      <main className="flex-grow">
        {currentView === 'home' ? <Home /> : (
          <Suspense fallback={<LoadingFallback />}>
            <Ratings />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
