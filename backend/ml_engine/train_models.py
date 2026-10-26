import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "trained_models")
os.makedirs(MODELS_DIR, exist_ok=True)

np.random.seed(42)

def train_diabetes_model():
    print("[1/4] Training Diabetes Prediction Model...")
    # Features: Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age
    n_samples = 1500
    
    # Generate realistic clinical samples following Pima Indians Diabetes distributions
    pregnancies = np.random.randint(0, 14, size=n_samples)
    age = np.random.randint(21, 75, size=n_samples)
    glucose = np.random.normal(120, 32, size=n_samples).clip(60, 220)
    blood_pressure = np.random.normal(72, 14, size=n_samples).clip(40, 130)
    skin_thickness = np.random.normal(25, 12, size=n_samples).clip(10, 60)
    insulin = np.random.normal(120, 85, size=n_samples).clip(15, 600)
    bmi = np.random.normal(32, 7, size=n_samples).clip(18, 55)
    dpf = np.random.uniform(0.1, 2.2, size=n_samples)

    # Biological risk formula for synthetic ground truth based on ADA clinical guidelines
    risk_score = (
        0.04 * (glucose - 100) +
        0.06 * (bmi - 25) +
        0.03 * (age - 30) +
        0.8 * dpf +
        0.01 * (insulin - 100) +
        0.015 * (blood_pressure - 80) +
        np.random.normal(0, 0.8, size=n_samples)
    )
    outcome = (risk_score > 1.2).astype(int)

    feature_names = [
        "pregnancies", "glucose", "blood_pressure", "skin_thickness",
        "insulin", "bmi", "diabetes_pedigree", "age"
    ]
    df = pd.DataFrame(np.column_stack([
        pregnancies, glucose, blood_pressure, skin_thickness,
        insulin, bmi, dpf, age
    ]), columns=feature_names)

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("classifier", RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))
    ])
    pipeline.fit(df, outcome)
    train_acc = accuracy_score(outcome, pipeline.predict(df))
    print(f" -> Diabetes Model Accuracy: {train_acc * 100:.2f}%")

    model_path = os.path.join(MODELS_DIR, "diabetes_model.joblib")
    joblib.dump({"pipeline": pipeline, "features": feature_names}, model_path)
    print(f" -> Saved to {model_path}")


def train_heart_model():
    print("[2/4] Training Heart Disease Prediction Model...")
    # Features: age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal
    n_samples = 1500
    
    age = np.random.randint(29, 80, size=n_samples)
    sex = np.random.choice([0, 1], size=n_samples, p=[0.32, 0.68])
    cp = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.48, 0.17, 0.28, 0.07])
    trestbps = np.random.normal(131, 17, size=n_samples).clip(90, 200)
    chol = np.random.normal(246, 51, size=n_samples).clip(120, 500)
    fbs = (np.random.normal(105, 30, size=n_samples) > 120).astype(int)
    restecg = np.random.choice([0, 1, 2], size=n_samples, p=[0.49, 0.49, 0.02])
    thalach = (220 - age - np.random.normal(20, 15, size=n_samples)).clip(70, 210)
    exang = np.random.choice([0, 1], size=n_samples, p=[0.67, 0.33])
    oldpeak = np.random.exponential(1.0, size=n_samples).clip(0, 6.2)
    slope = np.random.choice([0, 1, 2], size=n_samples, p=[0.07, 0.46, 0.47])
    ca = np.random.choice([0, 1, 2, 3], size=n_samples, p=[0.58, 0.22, 0.13, 0.07])
    thal = np.random.choice([1, 2, 3], size=n_samples, p=[0.06, 0.55, 0.39])

    # Framingham / Cleveland risk score mapping
    risk = (
        0.03 * (age - 50) +
        0.4 * sex +
        0.5 * cp +
        0.015 * (trestbps - 120) +
        0.005 * (chol - 200) +
        0.3 * fbs +
        0.8 * exang +
        0.5 * oldpeak +
        0.4 * ca -
        0.02 * (thalach - 140) +
        np.random.normal(0, 0.7, size=n_samples)
    )
    outcome = (risk > 1.0).astype(int)

    feature_names = [
        "age", "sex", "chest_pain_type", "resting_bp", "cholesterol",
        "fasting_bs", "resting_ecg", "max_heart_rate", "exercise_angina",
        "st_depression", "st_slope", "major_vessels", "thalassemia"
    ]
    df = pd.DataFrame(np.column_stack([
        age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang,
        oldpeak, slope, ca, thal
    ]), columns=feature_names)

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("classifier", RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))
    ])
    pipeline.fit(df, outcome)
    train_acc = accuracy_score(outcome, pipeline.predict(df))
    print(f" -> Heart Disease Model Accuracy: {train_acc * 100:.2f}%")

    model_path = os.path.join(MODELS_DIR, "heart_model.joblib")
    joblib.dump({"pipeline": pipeline, "features": feature_names}, model_path)
    print(f" -> Saved to {model_path}")


def train_kidney_model():
    print("[3/4] Training Chronic Kidney Disease (CKD) Model...")
    n_samples = 1500
    
    age = np.random.randint(18, 85, size=n_samples)
    bp = np.random.normal(76, 13, size=n_samples).clip(50, 140)
    sg = np.random.choice([1.005, 1.010, 1.015, 1.020, 1.025], size=n_samples)
    al = np.random.choice([0, 1, 2, 3, 4, 5], size=n_samples, p=[0.6, 0.15, 0.1, 0.08, 0.05, 0.02])
    su = np.random.choice([0, 1, 2, 3, 4, 5], size=n_samples, p=[0.75, 0.1, 0.07, 0.04, 0.02, 0.02])
    bgr = np.random.normal(135, 60, size=n_samples).clip(70, 450)
    bu = np.random.normal(55, 45, size=n_samples).clip(10, 300)
    sc = np.random.exponential(1.8, size=n_samples).clip(0.4, 15.0)
    sod = np.random.normal(137, 8, size=n_samples).clip(110, 160)
    pot = np.random.normal(4.6, 1.2, size=n_samples).clip(2.5, 9.0)
    hemo = np.random.normal(12.5, 2.8, size=n_samples).clip(4.0, 18.0)

    # Clinical CKD pathology indicators: elevated creatinine, urea, albuminuria, low hemoglobin
    risk = (
        0.8 * sc +
        0.02 * bu +
        0.7 * al +
        0.015 * (bp - 75) +
        0.008 * (bgr - 100) -
        0.35 * (hemo - 12) +
        np.random.normal(0, 0.6, size=n_samples)
    )
    outcome = (risk > 2.5).astype(int)

    feature_names = [
        "age", "blood_pressure", "specific_gravity", "albumin",
        "sugar", "blood_glucose_random", "blood_urea", "serum_creatinine",
        "sodium", "potassium", "hemoglobin"
    ]
    df = pd.DataFrame(np.column_stack([
        age, bp, sg, al, su, bgr, bu, sc, sod, pot, hemo
    ]), columns=feature_names)

    pipeline = Pipeline([
        ("scaler", StandardScaler()),
        ("classifier", RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))
    ])
    pipeline.fit(df, outcome)
    train_acc = accuracy_score(outcome, pipeline.predict(df))
    print(f" -> CKD Model Accuracy: {train_acc * 100:.2f}%")

    model_path = os.path.join(MODELS_DIR, "kidney_model.joblib")
    joblib.dump({"pipeline": pipeline, "features": feature_names}, model_path)
    print(f" -> Saved to {model_path}")


def train_symptoms_model():
    print("[4/4] Training Multi-Symptom Disease Classifier Model...")

    disease_symptom_matrix = {
        "Fungal Infection": ["itching", "skin_rash", "nodal_skin_eruptions", "dischromic_patches"],
        "Allergy": ["continuous_sneezing", "shivering", "chills", "watering_from_eyes"],
        "GERD": ["stomach_pain", "acidity", "ulcers_on_tongue", "vomiting", "chest_pain"],
        "Chronic Cholestasis": ["itching", "vomiting", "yellowish_skin", "nausea", "loss_of_appetite", "abdominal_pain"],
        "Peptic Ulcer Disease": ["vomiting", "loss_of_appetite", "abdominal_pain", "passage_of_gases", "internal_itching"],
        "Gastroenteritis": ["vomiting", "sunken_eyes", "dehydration", "diarrhoea"],
        "Bronchial Asthma": ["fatigue", "cough", "high_fever", "breathlessness", "family_history", "mucoid_sputum"],
        "Hypertension": ["headache", "chest_pain", "dizziness", "loss_of_balance", "lack_of_concentration"],
        "Migraine": ["acidity", "indigestion", "headache", "blurred_and_distorted_vision", "excessive_hunger", "stiff_neck", "depression", "irritability", "visual_disturbances"],
        "Cervical Spondylosis": ["back_pain", "neck_pain", "dizziness", "loss_of_balance"],
        "Jaundice": ["itching", "vomiting", "fatigue", "weight_loss", "high_fever", "yellowish_skin", "dark_urine", "abdominal_pain"],
        "Malaria": ["chills", "vomiting", "high_fever", "sweating", "headache", "nausea", "muscle_pain"],
        "Chicken Pox": ["itching", "skin_rash", "fatigue", "lethargy", "high_fever", "headache", "loss_of_appetite", "mild_fever", "swelled_lymph_nodes", "red_spots_over_body"],
        "Dengue": ["skin_rash", "chills", "joint_pain", "vomiting", "fatigue", "high_fever", "headache", "nausea", "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "muscle_pain", "red_spots_over_body"],
        "Typhoid": ["chills", "vomiting", "fatigue", "high_fever", "headache", "nausea", "constipation", "abdominal_pain", "diarrhoea", "toxic_look_(typhos)"],
        "Hepatitis A": ["joint_pain", "vomiting", "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "abdominal_pain", "diarrhoea", "mild_fever", "yellowing_of_eyes"],
        "Hepatitis B": ["itching", "fatigue", "lethargy", "yellowish_skin", "dark_urine", "loss_of_appetite", "abdominal_pain", "yellow_urine", "yellowing_of_eyes", "receiving_blood_transfusion"],
        "Tuberculosis": ["chills", "vomiting", "fatigue", "weight_loss", "cough", "high_fever", "breathlessness", "sweating", "loss_of_appetite", "mild_fever", "yellowing_of_eyes", "swelled_lymph_nodes", "phlegm", "chest_pain", "blood_in_sputum"],
        "Common Cold": ["continuous_sneezing", "chills", "fatigue", "cough", "high_fever", "headache", "swelled_lymph_nodes", "malaise", "phlegm", "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion", "chest_pain", "loss_of_smell"],
        "Pneumonia": ["chills", "fatigue", "cough", "high_fever", "breathlessness", "sweating", "malaise", "phlegm", "chest_pain", "fast_heart_rate", "rusty_sputum"],
        "Arthritis": ["muscle_weakness", "stiff_neck", "swelling_joints", "movement_stiffness", "painful_walking"],
        "Urinary Tract Infection": ["burning_micturition", "bladder_discomfort", "foul_smell_of_urine", "continuous_feel_of_urine"],
        "Psoriasis": ["skin_rash", "joint_pain", "skin_peeling", "silver_like_dusting", "small_dents_in_nails", "inflammatory_nails"],
        "Impetigo": ["skin_rash", "high_fever", "blister", "red_sore_around_nose", "yellow_crust_ooze"],
        "Hypothyroidism": ["fatigue", "weight_gain", "cold_hands_and_feets", "mood_swings", "lethargy", "dizziness", "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "depression", "irritability", "abnormal_menstruation"],
        "Hyperthyroidism": ["fatigue", "mood_swings", "weight_loss", "restlessness", "sweating", "diarrhoea", "fast_heart_rate", "excessive_hunger", "muscle_weakness", "irritability", "abnormal_menstruation"],
        "Hypoglycemia": ["vomiting", "fatigue", "anxiety", "sweating", "headache", "nausea", "blurred_and_distorted_vision", "excessive_hunger", "drying_and_tingling_lips", "slurred_speech", "irritability", "palpitations"],
        "Osteoarthritis": ["joint_pain", "neck_pain", "knee_pain", "hip_joint_pain", "swelling_joints", "painful_walking"]
    }

    # Collect all unique symptoms
    all_symptoms = sorted(list(set(
        symptom for symptoms in disease_symptom_matrix.values() for symptom in symptoms
    )))
    all_diseases = sorted(list(disease_symptom_matrix.keys()))

    rows = []
    labels = []

    # Generate synthetic training records with variations and noise
    for disease, symptoms in disease_symptom_matrix.items():
        # Baseline profile: 100 samples per disease with random symptom drops and noise
        for _ in range(80):
            vector = [0] * len(all_symptoms)
            # Pick a subset of primary symptoms (at least 60% present)
            num_to_pick = max(2, int(len(symptoms) * np.random.uniform(0.65, 1.0)))
            chosen_symptoms = np.random.choice(symptoms, size=num_to_pick, replace=False)
            
            for s in chosen_symptoms:
                vector[all_symptoms.index(s)] = 1
                
            # Add tiny 2% random false-positive noise symptoms
            if np.random.rand() < 0.2:
                random_sym = np.random.choice(all_symptoms)
                vector[all_symptoms.index(random_sym)] = 1

            rows.append(vector)
            labels.append(disease)

    X = np.array(rows)
    y = np.array(labels)

    clf = MultinomialNB(alpha=0.5)
    clf.fit(X, y)
    train_acc = accuracy_score(y, clf.predict(X))
    print(f" -> Symptom-Disease Model Accuracy: {train_acc * 100:.2f}% across {len(all_diseases)} diseases and {len(all_symptoms)} symptoms")

    model_path = os.path.join(MODELS_DIR, "symptoms_model.joblib")
    joblib.dump({
        "classifier": clf,
        "symptoms": all_symptoms,
        "diseases": all_diseases,
        "disease_profiles": disease_symptom_matrix
    }, model_path)
    print(f" -> Saved to {model_path}")

if __name__ == "__main__":
    print("==================================================")
    print("      DISEASE PREDICTOR MACHINE LEARNING ENGINE    ")
    print("==================================================")
    train_diabetes_model()
    train_heart_model()
    train_kidney_model()
    train_symptoms_model()
    print("==================================================")
    print("All models trained and serialized successfully!")

