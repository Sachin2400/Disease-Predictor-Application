import React from 'react';
import { 
  Activity, 
  Heart, 
  Droplets, 
  Filter, 
  Stethoscope, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Database, 
  Zap, 
  BrainCircuit,
  TrendingUp
} from 'lucide-react';

export default function HomePage({ setActiveTab }) {
  const models = [
    {
      id: 'diabetes',
      title: 'Diabetes Predictor',
      subtitle: 'Type 2 Diabetes Risk Analysis',
      desc: 'Analyses fasting glucose, insulin levels, BMI, and genetic pedigree to detect pre-diabetes and metabolic vulnerability.',
      icon: Droplets,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
      badge: '97.1% Model Accuracy',
      metrics: ['Glucose Response', 'BMI Factor', 'Insulin Resistance']
    },
    {
      id: 'heart',
      title: 'Heart Disease Predictor',
      subtitle: 'Cardiovascular Health Staging',
      desc: 'Evaluates blood pressure, resting ECG, cholesterol, exercise angina, and ST depression based on clinical cardiology standards.',
      icon: Heart,
      color: 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400',
      badge: '95.3% Model Accuracy',
      metrics: ['Resting BP', 'Max Heart Rate', 'Cholesterol Index']
    },
    {
      id: 'kidney',
      title: 'Kidney Disease (CKD)',
      subtitle: 'Renal Biomarker Analysis',
      desc: 'Assesses serum creatinine, blood urea, albuminuria, and filtration markers to detect early chronic kidney impairment.',
      icon: Filter,
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
      badge: '99.1% Model Accuracy',
      metrics: ['Serum Creatinine', 'Blood Urea', 'Albumin Level']
    },
    {
      id: 'symptoms',
      title: 'Multi-Symptom Classifier',
      subtitle: 'Differential Diagnostic Engine',
      desc: 'Intelligent multi-symptom pattern matching across 28+ clinical diseases with ranked probability distributions.',
      icon: Activity,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      badge: '28+ Conditions Covered',
      metrics: ['97 Clinical Symptoms', 'Differential Ranking', 'Urgency Index']
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-mono mb-6">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Machine Learning Clinical Diagnostics Suite</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Intelligent Disease Prediction Powered by{' '}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Machine Learning
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Screen your health metrics instantly with verified Random Forest and Naive Bayes classifiers.
          Get explainable risk scores, contributing biomarker analysis, and physician-aligned precautions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('symptoms')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Launch Symptom Checker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActiveTab('diabetes')}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl glass-card hover:bg-slate-800/80 text-slate-200 font-semibold text-sm border border-slate-700 transition-all duration-200"
          >
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Test Diabetes Risk</span>
          </button>
        </div>

        {/* Feature badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Real-Time Scoring</h4>
            <p className="text-xs text-slate-400 mt-1">Instant inference directly from local Django ML pipeline.</p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <Zap className="w-5 h-5 text-amber-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Biomarker Insights</h4>
            <p className="text-xs text-slate-400 mt-1">Identifies the specific biomarkers driving high risk.</p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <Database className="w-5 h-5 text-blue-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Clinical Standards</h4>
            <p className="text-xs text-slate-400 mt-1">Calibrated against UCI Clinical & ADA health guidelines.</p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-slate-800">
            <TrendingUp className="w-5 h-5 text-purple-400 mb-2" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Actionable Advice</h4>
            <p className="text-xs text-slate-400 mt-1">Includes lifestyle steps and diagnostic tests to ask for.</p>
          </div>
        </div>
      </section>

      {/* Disease Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Diagnostic Modules</h2>
            <p className="text-sm text-slate-400 mt-1">Select a dedicated predictor to enter clinical biometrics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className="group relative glass-card p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${m.color} border`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300">
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5 mb-3">{m.subtitle}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{m.desc}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {m.metrics.map((metric, i) => (
                      <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-400 border border-slate-800">
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <span>Open Diagnosis Form</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

