import React, { useState } from 'react';
import { Heart, AlertCircle, RotateCcw, Send, Activity, Stethoscope, Lightbulb, ShieldAlert } from 'lucide-react';
import { diseaseApi } from '../services/api';
import RiskMeter from '../components/RiskMeter';

export default function HeartPredictor() {
  const initialForm = {
    age: 52,
    sex: 1, // 1: Male, 0: Female
    chest_pain_type: 1, // 0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic
    resting_bp: 130,
    cholesterol: 235,
    fasting_bs: 0,
    resting_ecg: 0,
    max_heart_rate: 145,
    exercise_angina: 0,
    st_depression: 1.0,
    st_slope: 1,
    major_vessels: 0,
    thalassemia: 2,
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const presets = [
    {
      name: 'Normal Cardiac Profile',
      data: { age: 38, sex: 0, chest_pain_type: 0, resting_bp: 115, cholesterol: 180, fasting_bs: 0, resting_ecg: 0, max_heart_rate: 172, exercise_angina: 0, st_depression: 0.0, st_slope: 0, major_vessels: 0, thalassemia: 1 }
    },
    {
      name: 'Moderate Risk Profile',
      data: { age: 54, sex: 1, chest_pain_type: 1, resting_bp: 138, cholesterol: 245, fasting_bs: 1, resting_ecg: 1, max_heart_rate: 140, exercise_angina: 0, st_depression: 1.2, st_slope: 1, major_vessels: 1, thalassemia: 2 }
    },
    {
      name: 'High Cardiac Risk',
      data: { age: 64, sex: 1, chest_pain_type: 3, resting_bp: 165, cholesterol: 310, fasting_bs: 1, resting_ecg: 1, max_heart_rate: 110, exercise_angina: 1, st_depression: 2.8, st_slope: 2, major_vessels: 2, thalassemia: 3 }
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await diseaseApi.predictHeart(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to predict cardiovascular risk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-mono mb-1">
            <Heart className="w-4 h-4" />
            <span>Cleveland Cardiovascular Risk Framework</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Heart Disease Predictor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Machine Learning analysis of blood pressure, serum cholesterol, ECG, and arterial markers.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Presets:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setFormData(p.data); setResult(null); }}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-rose-400" />
            <span>Cardiovascular Parameters</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Age (Years) *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="120"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              {/* Sex */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Biological Sex *</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value={1}>Male</option>
                  <option value={0}>Female</option>
                </select>
              </div>

              {/* Chest Pain Type */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Chest Pain Presentation *</label>
                <select
                  name="chest_pain_type"
                  value={formData.chest_pain_type}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value={0}>Typical Angina</option>
                  <option value={1}>Atypical Angina</option>
                  <option value={2}>Non-Anginal Discomfort</option>
                  <option value={3}>Asymptomatic</option>
                </select>
              </div>

              {/* Resting Blood Pressure */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Resting BP (mmHg) *</label>
                <input
                  type="number"
                  name="resting_bp"
                  value={formData.resting_bp}
                  onChange={handleChange}
                  min="80"
                  max="250"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: &lt;120 mmHg</span>
              </div>

              {/* Cholesterol */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Serum Cholesterol (mg/dL) *</label>
                <input
                  type="number"
                  name="cholesterol"
                  value={formData.cholesterol}
                  onChange={handleChange}
                  min="100"
                  max="600"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Desirable: &lt;200 mg/dL</span>
              </div>

              {/* Max Heart Rate */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Max Heart Rate Achieved *</label>
                <input
                  type="number"
                  name="max_heart_rate"
                  value={formData.max_heart_rate}
                  onChange={handleChange}
                  min="60"
                  max="230"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Target: 220 - Age</span>
              </div>

              {/* Exercise Induced Angina */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Exercise-Induced Angina</label>
                <select
                  name="exercise_angina"
                  value={formData.exercise_angina}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value={0}>No (Absent)</option>
                  <option value={1}>Yes (Present on exertion)</option>
                </select>
              </div>

              {/* ST Depression */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">ST Depression (Oldpeak in mm)</label>
                <input
                  type="number"
                  name="st_depression"
                  value={formData.st_depression}
                  onChange={handleChange}
                  min="0.0"
                  max="8.0"
                  step="0.1"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: &lt;1.0 mm</span>
              </div>

              {/* Major Vessels */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Fluoroscopy Major Vessels (0-3)</label>
                <select
                  name="major_vessels"
                  value={formData.major_vessels}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                >
                  <option value={0}>0 Vessels Colored</option>
                  <option value={1}>1 Vessel Colored</option>
                  <option value={2}>2 Vessels Colored</option>
                  <option value={3}>3 Vessels Colored</option>
                </select>
              </div>

              {/* Fasting Blood Sugar */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Fasting Blood Sugar &gt; 120 mg/dL</label>
                <select
                  name="fasting_bs"
                  value={formData.fasting_bs}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value={0}>False (&le; 120 mg/dL)</option>
                  <option value={1}>True (&gt; 120 mg/dL)</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-4 flex items-center space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Evaluate Cardiac Risk</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setFormData(initialForm); setResult(null); }}
                className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Reset Form"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <div className="space-y-6 animate-fade-in">
              <RiskMeter
                probability={result.probability}
                riskLevel={result.risk_level}
                riskColor={result.risk_color}
              />

              {/* Contributing Factors */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Cardiovascular Stress Drivers</span>
                </h4>
                <ul className="space-y-2">
                  {result.key_factors.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Plan */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-rose-400" />
                  <span>Physician Consultation Advice</span>
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-rose-400 font-bold">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-12 h-12 rounded-2xl bg-rose-900/20 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Awaiting Cardiac Biometrics</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Enter your blood pressure, cholesterol, and stress tests to view cardiovascular probability.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

