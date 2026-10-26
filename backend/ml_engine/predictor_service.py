import os
import joblib
import numpy as np
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "trained_models")

class DiseasePredictorService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DiseasePredictorService, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        print("[ML SERVICE] Loading pre-trained models from disk...")
        self.diabetes_data = joblib.load(os.path.join(MODELS_DIR, "diabetes_model.joblib"))
        self.heart_data = joblib.load(os.path.join(MODELS_DIR, "heart_model.joblib"))
        self.kidney_data = joblib.load(os.path.join(MODELS_DIR, "kidney_model.joblib"))
        self.symptoms_data = joblib.load(os.path.join(MODELS_DIR, "symptoms_model.joblib"))
        print("[ML SERVICE] All models successfully mounted in memory.")

    # ----------------------------------------------------
    # 1. DIABETES PREDICTION
    # ----------------------------------------------------
    def predict_diabetes(self, data: dict):
        pipeline = self.diabetes_data["pipeline"]
        features = self.diabetes_data["features"]

        input_df = pd.DataFrame([{
            "pregnancies": float(data.get("pregnancies", 0)),
            "glucose": float(data.get("glucose", 100)),
            "blood_pressure": float(data.get("blood_pressure", 70)),
            "skin_thickness": float(data.get("skin_thickness", 20)),
            "insulin": float(data.get("insulin", 80)),
            "bmi": float(data.get("bmi", 25.0)),
            "diabetes_pedigree": float(data.get("diabetes_pedigree", 0.5)),
            "age": float(data.get("age", 30))
        }])[features]

        prob = pipeline.predict_proba(input_df)[0][1]
        risk_pct = round(prob * 100, 2)
        prediction = bool(prob >= 0.5)

        # Risk stratification
        if risk_pct >= 75:
            risk_level = "High Risk"
            risk_color = "red"
        elif risk_pct >= 45:
            risk_level = "Moderate Risk"
            risk_color = "amber"
        else:
            risk_level = "Low Risk"
            risk_color = "emerald"

        # Explainable factors
        factors = []
        glucose = float(data.get("glucose", 100))
        bmi = float(data.get("bmi", 25.0))
        bp = float(data.get("blood_pressure", 70))
        age = float(data.get("age", 30))

        if glucose >= 140:
            factors.append(f"Elevated fasting/random blood glucose ({glucose} mg/dL). Normal is <100 mg/dL fasting.")
        elif glucose >= 100:
            factors.append(f"Borderline/pre-diabetic glucose level ({glucose} mg/dL).")
        
        if bmi >= 30:
            factors.append(f"BMI of {bmi} indicates clinical obesity, a major driver of insulin resistance.")
        elif bmi >= 25:
            factors.append(f"Overweight BMI ({bmi}).")

        if bp >= 90:
            factors.append(f"High diastolic blood pressure ({bp} mmHg).")

        recommendations = [
            "Schedule an HbA1c test with a certified lab to confirm 3-month glycemic control.",
            "Incorporate at least 150 minutes of moderate-intensity aerobic exercise per week.",
            "Adopt a low-glycemic Mediterranean or DASH dietary plan rich in fiber."
        ]
        if prediction:
            recommendations.insert(0, "Consult an Endocrinologist or Primary Care Physician for clinical evaluation.")

        return {
            "disease": "Type 2 Diabetes",
            "prediction": prediction,
            "prediction_label": "High Likelihood of Diabetes" if prediction else "Low Likelihood of Diabetes",
            "probability": risk_pct,
            "risk_level": risk_level,
            "risk_color": risk_color,
            "key_factors": factors if factors else ["All primary metabolic biomarkers fall within typical reference bounds."],
            "recommendations": recommendations,
            "clinical_notes": "Model trained on validated Pima Indians Diabetes biometric patterns using Random Forest Ensemble."
        }

    # ----------------------------------------------------
    # 2. HEART DISEASE PREDICTION
    # ----------------------------------------------------
    def predict_heart(self, data: dict):
        pipeline = self.heart_data["pipeline"]
        features = self.heart_data["features"]

        input_df = pd.DataFrame([{
            "age": float(data.get("age", 45)),
            "sex": int(data.get("sex", 1)),
            "chest_pain_type": int(data.get("chest_pain_type", 0)),
            "resting_bp": float(data.get("resting_bp", 120)),
            "cholesterol": float(data.get("cholesterol", 200)),
            "fasting_bs": int(data.get("fasting_bs", 0)),
            "resting_ecg": int(data.get("resting_ecg", 0)),
            "max_heart_rate": float(data.get("max_heart_rate", 150)),
            "exercise_angina": int(data.get("exercise_angina", 0)),
            "st_depression": float(data.get("st_depression", 0.0)),
            "st_slope": int(data.get("st_slope", 1)),
            "major_vessels": int(data.get("major_vessels", 0)),
            "thalassemia": int(data.get("thalassemia", 2))
        }])[features]

        prob = pipeline.predict_proba(input_df)[0][1]
        risk_pct = round(prob * 100, 2)
        prediction = bool(prob >= 0.5)

        if risk_pct >= 75:
            risk_level = "High Cardiovascular Risk"
            risk_color = "red"
        elif risk_pct >= 45:
            risk_level = "Moderate Risk"
            risk_color = "amber"
        else:
            risk_level = "Low Risk"
            risk_color = "emerald"

        factors = []
        trestbps = float(data.get("resting_bp", 120))
        chol = float(data.get("cholesterol", 200))
        exang = int(data.get("exercise_angina", 0))
        oldpeak = float(data.get("st_depression", 0.0))

        if trestbps >= 140:
            factors.append(f"Stage 2 Hypertension detected ({trestbps} mmHg).")
        elif trestbps >= 130:
            factors.append(f"Stage 1 Hypertension ({trestbps} mmHg).")

        if chol >= 240:
            factors.append(f"Hypercholesterolemia ({chol} mg/dL) significantly increases arterial plaque risk.")
        elif chol >= 200:
            factors.append(f"Borderline elevated serum cholesterol ({chol} mg/dL).")

        if exang == 1:
            factors.append("Exercise-induced angina noted during cardiovascular stress.")
        if oldpeak >= 2.0:
            factors.append(f"Significant ST-depression ({oldpeak} mm) indicates potential myocardial ischemia.")

        recommendations = [
            "Consult a Cardiologist for a 12-lead ECG, 2D Echocardiogram, and Treadmill Test (TMT).",
            "Monitor daily blood pressure and maintain a resting BP under 120/80 mmHg.",
            "Limit dietary sodium to <2,000 mg/day and replace saturated fats with heart-healthy omega-3s.",
            "Engage in cardiovascular conditioning as approved by your physician."
        ]

        return {
            "disease": "Cardiovascular / Coronary Heart Disease",
            "prediction": prediction,
            "prediction_label": "Elevated Cardiac Risk" if prediction else "Healthy Cardiac Profile",
            "probability": risk_pct,
            "risk_level": risk_level,
            "risk_color": risk_color,
            "key_factors": factors if factors else ["Cardiovascular markers within normal physiological limits."],
            "recommendations": recommendations,
            "clinical_notes": "Evaluated against Cleveland Heart Disease parameters via Scikit-Learn Random Forest Pipeline."
        }

    # ----------------------------------------------------
    # 3. CHRONIC KIDNEY DISEASE (CKD) PREDICTION
    # ----------------------------------------------------
    def predict_kidney(self, data: dict):
        pipeline = self.kidney_data["pipeline"]
        features = self.kidney_data["features"]

        input_df = pd.DataFrame([{
            "age": float(data.get("age", 50)),
            "blood_pressure": float(data.get("blood_pressure", 80)),
            "specific_gravity": float(data.get("specific_gravity", 1.020)),
            "albumin": float(data.get("albumin", 0)),
            "sugar": float(data.get("sugar", 0)),
            "blood_glucose_random": float(data.get("blood_glucose_random", 110)),
            "blood_urea": float(data.get("blood_urea", 30)),
            "serum_creatinine": float(data.get("serum_creatinine", 1.0)),
            "sodium": float(data.get("sodium", 138)),
            "potassium": float(data.get("potassium", 4.5)),
            "hemoglobin": float(data.get("hemoglobin", 14.0))
        }])[features]

        prob = pipeline.predict_proba(input_df)[0][1]
        risk_pct = round(prob * 100, 2)
        prediction = bool(prob >= 0.5)

        if risk_pct >= 75:
            risk_level = "High Renal Risk"
            risk_color = "red"
        elif risk_pct >= 45:
            risk_level = "Moderate Risk"
            risk_color = "amber"
        else:
            risk_level = "Low Risk"
            risk_color = "emerald"

        factors = []
        sc = float(data.get("serum_creatinine", 1.0))
        bu = float(data.get("blood_urea", 30))
        al = float(data.get("albumin", 0))
        hemo = float(data.get("hemoglobin", 14.0))

        if sc >= 1.5:
            factors.append(f"High Serum Creatinine ({sc} mg/dL). Normal is typically 0.6 - 1.2 mg/dL.")
        if bu >= 50:
            factors.append(f"Elevated Blood Urea ({bu} mg/dL) points to reduced glomerular filtration.")
        if al >= 1:
            factors.append(f"Albuminuria present (grade {int(al)}), indicating compromised renal filter integrity.")
        if hemo <= 10.0:
            factors.append(f"Anemia detected (Hemoglobin {hemo} g/dL), a frequent secondary complication of CKD.")

        recommendations = [
            "Undergo a comprehensive Renal Function Panel (eGFR, BUN, Serum Creatinine, Microalbuminuria).",
            "Maintain strict hydration and avoid nephrotoxic medications like excessive NSAIDs.",
            "Manage blood pressure aggressively (<130/80 mmHg) to prevent glomerular scarring.",
            "Seek early nephrology consultation if eGFR is declining."
        ]

        return {
            "disease": "Chronic Kidney Disease (CKD)",
            "prediction": prediction,
            "prediction_label": "High Probability of Renal Impairment" if prediction else "Normal Renal Function Profile",
            "probability": risk_pct,
            "risk_level": risk_level,
            "risk_color": risk_color,
            "key_factors": factors if factors else ["Kidney filtration markers within normal reference range."],
            "recommendations": recommendations,
            "clinical_notes": "Trained on clinical renal biomarker datasets incorporating creatinine and urea ratios."
        }

    # ----------------------------------------------------
    # 4. MULTI-SYMPTOM DISEASE CLASSIFIER
    # ----------------------------------------------------
    def predict_by_symptoms(self, symptoms_selected: list):
        if not symptoms_selected:
            return {
                "error": "No symptoms provided. Please select at least 2 symptoms."
            }

        clf = self.symptoms_data["classifier"]
        all_symptoms = self.symptoms_data["symptoms"]
        all_diseases = self.symptoms_data["diseases"]
        profiles = self.symptoms_data["disease_profiles"]

        vector = [0] * len(all_symptoms)
        matched_input_symptoms = []

        for s in symptoms_selected:
            cleaned = s.strip().lower().replace(" ", "_")
            if cleaned in all_symptoms:
                vector[all_symptoms.index(cleaned)] = 1
                matched_input_symptoms.append(cleaned)

        if sum(vector) == 0:
            return {
                "error": "None of the submitted symptoms matched the clinical vocabulary."
            }

        probs = clf.predict_proba([vector])[0]
        top_indices = np.argsort(probs)[::-1][:4]

        predictions = []
        for idx in top_indices:
            disease_name = clf.classes_[idx]
            confidence = round(float(probs[idx]) * 100, 2)
            if confidence < 1.0 and len(predictions) > 0:
                continue

            expected_symptoms = profiles.get(disease_name, [])
            overlapping = [s for s in matched_input_symptoms if s in expected_symptoms]

            predictions.append({
                "disease": disease_name,
                "confidence": confidence,
                "matching_symptoms": overlapping,
                "expected_symptoms": expected_symptoms
            })

        top_pred = predictions[0]

        return {
            "primary_diagnosis": top_pred["disease"],
            "primary_confidence": top_pred["confidence"],
            "differential_diagnoses": predictions,
            "matched_symptoms_count": len(matched_input_symptoms),
            "analyzed_symptoms": matched_input_symptoms,
            "urgency": "High" if top_pred["confidence"] > 80 else "Moderate",
            "general_advice": "This symptom assessment is powered by automated probabilistic classification. If you experience severe symptoms like chest pain, difficulty breathing, or sudden weakness, seek emergency care immediately."
        }

    def get_all_symptoms(self):
        return [
            {
                "id": s,
                "name": s.replace("_", " ").title()
            }
            for s in self.symptoms_data["symptoms"]
        ]

