import React from 'react';
import { Shield, Cpu, Activity, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-slate-200 font-semibold mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span>Disease Predictor Application</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An intelligent clinical risk assessment application engineered with modern React,
              Django REST framework, and Scikit-Learn supervised Machine Learning models.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Core Diagnostic Models
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400">
              <li>• Type 2 Diabetes (Pima Indians Diagnostic Pipeline)</li>
              <li>• Cardiovascular / Coronary Heart Disease (Cleveland Architecture)</li>
              <li>• Chronic Kidney Disease - CKD (Glomerular Biomarkers)</li>
              <li>• 28+ Multi-Symptom Probabilistic Differential Diagnoses</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-medium text-xs mb-2">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span>Medical Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This application is an educational and analytical tool designed to assist in risk exploration.
              It does not replace professional medical advice, clinical diagnosis, or hospital triage.
              Always consult a certified medical practitioner for health concerns.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Disease Predictor Application. Local Disk D Installation.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Scikit-Learn ML</span>
            </span>
            <span>•</span>
            <span>Django REST</span>
            <span>•</span>
            <span>React + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

