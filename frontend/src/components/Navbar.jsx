import React, { useState, useEffect } from 'react';
import { Activity, Heart, Droplets, Filter, ShieldAlert, Sparkles } from 'lucide-react';
import { diseaseApi } from '../services/api';

export default function Navbar({ activeTab, setActiveTab }) {
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    diseaseApi.checkHealth()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));
    
    const interval = setInterval(() => {
      diseaseApi.checkHealth()
        .then(() => setBackendOnline(true))
        .catch(() => setBackendOnline(false));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'diabetes', label: 'Diabetes', icon: Droplets },
    { id: 'heart', label: 'Heart Disease', icon: Heart },
    { id: 'kidney', label: 'Kidney (CKD)', icon: Filter },
    { id: 'symptoms', label: 'Symptom Checker', icon: Activity },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                Disease Predictor
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-cyan-400 uppercase -mt-0.5">
                Clinical Diagnostics Engine
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* System Status Pill */}
          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                backendOnline ? 'bg-emerald-400' : 'bg-rose-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                backendOnline ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></span>
            </span>
            <span className={`font-mono ${backendOnline ? 'text-emerald-400' : 'text-rose-400'}`}>
              {backendOnline ? 'ML API Online' : 'Connecting ML...'}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800/80 space-x-1 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

