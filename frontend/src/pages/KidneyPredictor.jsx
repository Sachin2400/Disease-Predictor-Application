import React, { useState } from 'react';
import { Filter, AlertCircle, RotateCcw, Send, Activity, Stethoscope, Lightbulb, ShieldCheck } from 'lucide-react';
import { diseaseApi } from '../services/api';
import RiskMeter from '../components/RiskMeter';

export default function KidneyPredictor() {
  const initialForm = {
    age: 48,
    blood_pressure: 80,
    specific_gravity: 1.020,
    albumin: 0,
    sugar: 0,
    blood_glucose_random: 110,
    blood_urea: 32,
    serum_creatinine: 1.0,
    sodium: 138,
    potassium: 4.4,
    hemoglobin: 14.2,
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const presets = [
    {
      name: 'Healthy Renal Function',
      data: { age: 32, blood_pressure: 74, specific_gravity: 1.025, albumin: 0, sugar: 0, blood_glucose_random: 95, blood_urea: 24, serum_creatinine: 0.9, sodium: 140, potassium: 4.2, hemoglobin: 15.1 }
    },
    {
      name: 'Early Renal Stress',
      data: { age: 52, blood_pressure: 88, specific_gravity: 1.015, albumin: 1, sugar: 1, blood_glucose_random: 150, blood_urea: 48, serum_creatinine: 1.4, sodium: 134, potassium: 4.8, hemoglobin: 11.8 }
    },
    {
      name: 'Advanced CKD Profile',
      data: { age: 66, blood_pressure: 95, specific_gravity: 1.010, albumin: 3, sugar: 2, blood_glucose_random: 230, blood_urea: 115, serum_creatinine: 4.2, sodium: 128, potassium: 5.6, hemoglobin: 8.4 }
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
      const data = await diseaseApi.predictKidney(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to predict renal health.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-1">
            <Filter className="w-4 h-4" />
            <span>Glomerular Filtration & Renal Biomarker Suite</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Chronic Kidney Disease (CKD) Predictor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Machine Learning analysis of serum creatinine, blood urea, albuminuria, and electrolytes.
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
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Renal Biomarkers</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Serum Creatinine */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Serum Creatinine (mg/dL) *</label>
                <input
                  type="number"
                  name="serum_creatinine"
                  value={formData.serum_creatinine}
                  onChange={handleChange}
                  min="0.1"
                  max="20.0"
                  step="0.1"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 0.6 - 1.2 mg/dL</span>
              </div>

              {/* Blood Urea */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Blood Urea Nitrogen (mg/dL) *</label>
                <input
                  type="number"
                  name="blood_urea"
                  value={formData.blood_urea}
                  onChange={handleChange}
                  min="5"
                  max="400"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 7 - 25 mg/dL</span>
              </div>

              {/* Albumin */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Urine Albumin Grade (0-5)</label>
                <select
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
                >
                  <option value={0}>0 (Negative / Trace)</option>
                  <option value={1}>1+ (30 mg/dL)</option>
                  <option value={2}>2+ (100 mg/dL)</option>
                  <option value={3}>3+ (300 mg/dL)</option>
                  <option value={4}>4+ (1000 mg/dL)</option>
                </select>
                <span className="text-[11px] text-slate-400">Glomerular barrier indicator</span>
              </div>

              {/* Hemoglobin */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Hemoglobin (g/dL) *</label>
                <input
                  type="number"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleChange}
                  min="3.0"
                  max="20.0"
                  step="0.1"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 12.0 - 17.5 g/dL</span>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Diastolic BP (mmHg) *</label>
                <input
                  type="number"
                  name="blood_pressure"
                  value={formData.blood_pressure}
                  onChange={handleChange}
                  min="50"
                  max="180"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              {/* Specific Gravity */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Urine Specific Gravity</label>
                <select
                  name="specific_gravity"
                  value={formData.specific_gravity}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                >
                  <option value={1.005}>1.005</option>
                  <option value={1.010}>1.010</option>
                  <option value={1.015}>1.015</option>
                  <option value={1.020}>1.020 (Normal)</option>
                  <option value={1.025}>1.025</option>
                </select>
              </div>

              {/* Blood Glucose Random */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Random Blood Sugar (mg/dL)</label>
                <input
                  type="number"
                  name="blood_glucose_random"
                  value={formData.blood_glucose_random}
                  onChange={handleChange}
                  min="50"
                  max="500"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Patient Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
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
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Evaluate Kidney Health</span>
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
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Renal Impairment Drivers</span>
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
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Nephrology Recommendations</span>
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-12 h-12 rounded-2xl bg-amber-900/20 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Filter className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Awaiting Renal Biomarkers</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Provide serum creatinine, albuminuria, and urea levels to compute glomerular risk.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

