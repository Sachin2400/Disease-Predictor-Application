import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  Plus, 
  X, 
  Send, 
  RotateCcw, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { diseaseApi } from '../services/api';

export default function SymptomChecker() {
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['chills', 'high_fever', 'headache']);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    diseaseApi.getSymptoms()
      .then(data => setAvailableSymptoms(data.symptoms || []))
      .catch(err => console.error("Failed to load symptoms list:", err));
  }, []);

  const presets = [
    {
      name: 'Malaria / Dengue Profile',
      symptoms: ['chills', 'high_fever', 'sweating', 'headache', 'muscle_pain']
    },
    {
      name: 'Respiratory / Pneumonia',
      symptoms: ['chills', 'cough', 'high_fever', 'breathlessness', 'phlegm', 'chest_pain']
    },
    {
      name: 'Allergy / Cold',
      symptoms: ['continuous_sneezing', 'chills', 'watering_from_eyes', 'headache', 'throat_irritation']
    },
    {
      name: 'Gastroenteritis / Food Poisoning',
      symptoms: ['vomiting', 'sunken_eyes', 'dehydration', 'diarrhoea', 'abdominal_pain']
    }
  ];

  const handleToggleSymptom = (id) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleDiagnose = async (e) => {
    if (e) e.preventDefault();
    if (selectedSymptoms.length < 2) {
      setError("Please select at least 2 symptoms for probabilistic classification.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await diseaseApi.predictSymptoms(selectedSymptoms);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Symptom classification failed.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSymptoms = availableSymptoms.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono mb-1">
            <Activity className="w-4 h-4" />
            <span>Differential Diagnostic Machine Learning Model</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Multi-Symptom Disease Classifier</h1>
          <p className="text-sm text-slate-400 mt-1">
            Multinomial Naive Bayes classification mapping 97 standardized clinical symptoms to 28+ diseases.
          </p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setSelectedSymptoms(p.symptoms); setResult(null); }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Symptom Selector */}
        <div className="lg:col-span-7 space-y-5">
          {/* Selected Pills */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                Selected Symptoms ({selectedSymptoms.length})
              </span>
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={() => { setSelectedSymptoms([]); setResult(null); }}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {selectedSymptoms.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 italic text-center">
                No symptoms selected yet. Use the search below to pick your symptoms.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map(id => (
                  <span
                    key={id}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-950/80 text-purple-300 border border-purple-500/40"
                  >
                    <span>{id.replace(/_/g, ' ')}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleSymptom(id)}
                      className="hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center space-x-3">
              <button
                type="button"
                onClick={handleDiagnose}
                disabled={loading || selectedSymptoms.length < 2}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 disabled:opacity-40 transition-all"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Probabilistic Diagnosis</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setSelectedSymptoms(['chills', 'high_fever']); setResult(null); }}
                className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mt-3 p-3 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Search & Browse Symptoms */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800">
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search across 97 clinical symptoms (e.g. fever, joint pain, cough)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 placeholder-slate-400"
              />
            </div>

            <div className="max-h-64 overflow-y-auto pr-1 space-y-1.5">
              {filteredSymptoms.map(item => {
                const isSelected = selectedSymptoms.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleSymptom(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                        : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isSelected ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Diagnosis Results */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              {/* Primary Match Card */}
              <div className="glass-card p-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-slate-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                    Primary Diagnosis Match
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {result.primary_confidence}% Match
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mt-1 mb-2">
                  {result.primary_diagnosis}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Identified with high probabilistic likelihood based on {result.matched_symptoms_count} verified symptoms.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Triage Urgency:</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                    result.urgency === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                  }`}>
                    {result.urgency} Attention Recommended
                  </span>
                </div>
              </div>

              {/* Differential Diagnoses */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center space-x-1.5">
                  <Activity className="w-4 h-4 text-purple-400" />
                  <span>Differential Diagnoses Ranking</span>
                </h4>
                <div className="space-y-3">
                  {result.differential_diagnoses.map((d, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-sm text-white">{d.disease}</span>
                        <span className="text-xs font-mono font-bold text-purple-400">{d.confidence}%</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                          style={{ width: `${d.confidence}%` }}
                        />
                      </div>
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                        <span className="text-slate-400">Matching:</span>
                        {d.matching_symptoms.map((s, idx) => (
                          <span key={idx} className="text-purple-300 font-mono">
                            {s.replace(/_/g, ' ')}{idx < d.matching_symptoms.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advice */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Clinical Care Guidance</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.general_advice}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-12 h-12 rounded-2xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Awaiting Symptom Analysis</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Select 2 or more symptoms from the catalog on the left to view probabilistic differential rankings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

