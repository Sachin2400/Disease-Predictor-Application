import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DiabetesPredictor from './pages/DiabetesPredictor';
import HeartPredictor from './pages/HeartPredictor';
import KidneyPredictor from './pages/KidneyPredictor';
import SymptomChecker from './pages/SymptomChecker';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'diabetes':
        return <DiabetesPredictor />;
      case 'heart':
        return <HeartPredictor />;
      case 'kidney':
        return <KidneyPredictor />;
      case 'symptoms':
        return <SymptomChecker />;
      case 'home':
      default:
        return <HomePage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background ambient medical glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>

        <Footer />
      </div>
    </div>
  );
}

