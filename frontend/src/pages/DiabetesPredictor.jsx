import React, { useState } from 'react';
import { Droplets, AlertCircle, CheckCircle2, RotateCcw, Send, FileSpreadsheet, Stethoscope, Lightbulb } from 'lucide-react';
import { diseaseApi } from '../services/api';
import RiskMeter from '../components/RiskMeter';

export default function DiabetesPredictor() {
  const initialForm = {
    glucose: 110,
    bmi: 26.5,
    age: 35,
    blood_pressure: 75,
    insulin: 85,
    skin_thickness: 22,
    pregnancies: 0,
    diabetes_pedigree: 0.45,
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const presets = [
    {
      name: 'Healthy Individual',
      data: { glucose: 92, bmi: 22.4, age: 28, blood_pressure: 70, insulin: 65, skin_thickness: 18, pregnancies: 0, diabetes_pedigree: 0.25 }
    },
    {
      name: 'Pre-Diabetic Profile',
      data: { glucose: 122, bmi: 28.5, age: 45, blood_pressure: 82, insulin: 120, skin_thickness: 26, pregnancies: 1, diabetes_pedigree: 0.55 }
    },
    {
      name: 'High Risk Case',
      data: { glucose: 175, bmi: 35.8, age: 54, blood_pressure: 92, insulin: 240, skin_thickness: 34, pregnancies: 3, diabetes_pedigree: 1.15 }
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await diseaseApi.predictDiabetes(formData);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to generate prediction.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono mb-1">
            <Droplets className="w-4 h-4" />
            <span>Pima Indian Diabetes Diagnostic Pipeline</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Type 2 Diabetes Risk Predictor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Machine Learning analysis of fasting blood glucose, BMI, and metabolic markers.
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
            <FileSpreadsheet className="w-4 h-4 text-blue-400" />
            <span>Patient Biometrics</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Glucose */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Fasting Glucose (mg/dL) *
                </label>
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  min="40"
                  max="300"
                  step="1"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 70 - 99 mg/dL</span>
              </div>

              {/* BMI */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  BMI (kg/m²) *
                </label>
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  min="10"
                  max="70"
                  step="0.1"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 18.5 - 24.9</span>
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Adult baseline</span>
              </div>

              {/* Blood Pressure */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Diastolic BP (mmHg)
                </label>
                <input
                  type="number"
                  name="blood_pressure"
                  value={formData.blood_pressure}
                  onChange={handleChange}
                  min="30"
                  max="200"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 60 - 80 mmHg</span>
              </div>

              {/* Insulin */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Serum Insulin (mu U/ml)
                </label>
                <input
                  type="number"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleChange}
                  min="0"
                  max="800"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Normal: 15 - 160 mu U/ml</span>
              </div>

              {/* Skin Thickness */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Triceps Skin Fold (mm)
                </label>
                <input
                  type="number"
                  name="skin_thickness"
                  value={formData.skin_thickness}
                  onChange={handleChange}
                  min="0"
                  max="99"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Subcutaneous adipose</span>
              </div>

              {/* Pregnancies */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Number of Pregnancies
                </label>
                <input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  min="0"
                  max="20"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Gestational history</span>
              </div>

              {/* Diabetes Pedigree Function */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Diabetes Pedigree Score
                </label>
                <input
                  type="number"
                  name="diabetes_pedigree"
                  value={formData.diabetes_pedigree}
                  onChange={handleChange}
                  min="0.05"
                  max="3.0"
                  step="0.01"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                />
                <span className="text-[11px] text-slate-400">Genetic lineage risk</span>
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
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Run ML Risk Assessment</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
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

              {/* Key Factors */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Key Biomarker Indicators</span>
                </h4>
                <ul className="space-y-2">
                  {result.key_factors.map((f, i) => (
                    <li key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Recommendations */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-blue-400" />
                  <span>Clinical Action Plan</span>
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((r, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                      <span className="text-blue-400 font-bold">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center min-h-[360px]">
              <div className="w-12 h-12 rounded-2xl bg-blue-900/20 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">Awaiting Biometric Submission</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Fill in the patient's diagnostic values or click one of the presets above, then click 'Run ML Risk Assessment'.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

