from Accounts.models import symptoms_diseases, Predicted_Diseases
from Accounts.serializers import PredictionSerializer
from django.shortcuts import render
from django.http import JsonResponse
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import csv
from django.db import transaction
import os
import pickle
from django.conf import settings


def insert_patient_data(request):
    data = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Training.csv')
    if not os.path.exists(data):
        data = os.path.join(settings.BASE_DIR, 'Training.csv')

    with open(data, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        with transaction.atomic():
            for row in reader:
                symptom_values = [int(value) for value in row[:-1]]
                prognosis = row[-1]
                field_names = [field.name for field in symptoms_diseases._meta.fields if field.name != 'id' and field.name != 'prognosis']
                field_values = dict(zip(field_names, symptom_values))
                symptoms_diseases.objects.create(prognosis=prognosis, **field_values)

    return JsonResponse({'status': 'Patient dataset inserted successfully'})


def scale_dataset(dataframe, oversample=False):
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values
    scaler = StandardScaler()
    X = scaler.fit_transform(X)
    if oversample:
        try:
            from imblearn.over_sampling import RandomOverSampler
            ros = RandomOverSampler()
            X, y = ros.fit_resample(X, y)
        except Exception as e:
            print("Oversampling warning:", e)
    data = np.hstack((X, np.reshape(y, (-1, 1))))
    return data, X, y


svm_model = None


def train(request):
    global svm_model
    data = pd.DataFrame.from_records(
        symptoms_diseases.objects.all().values()
    ).drop('id', axis=1, errors='ignore')

    if data.empty:
        csv_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Training.csv')
        if not os.path.exists(csv_path):
            csv_path = os.path.join(settings.BASE_DIR, 'Training.csv')
        data = pd.read_csv(csv_path)

    _, X, Y = scale_dataset(data, oversample=True)
    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, Y)

    model_path = os.path.join(settings.BASE_DIR, 'model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(svm_model, f)

    return JsonResponse({'status': 'SVM model trained and saved to model.pkl successfully'})


@api_view(['GET'])
@permission_classes([AllowAny])
def predict(request, symptoms=''):
    model_path = os.path.join(settings.BASE_DIR, 'model.pkl')
    if not os.path.exists(model_path):
        model_path = 'model.pkl'

    with open(model_path, 'rb') as f:
        loaded_model = pickle.load(f)

    # Convert binary symptom string to array
    raw_list = [int(ch) for ch in list(symptoms) if ch in ('0', '1')]
    if len(raw_list) > 1:
        x = np.asarray(raw_list[1:], dtype=np.int_)
    else:
        x = np.asarray(raw_list, dtype=np.int_)

    # Ensure length matches expected 129 features
    expected_features = getattr(loaded_model, 'n_features_in_', 129)
    if len(x) < expected_features:
        x = np.pad(x, (0, expected_features - len(x)), 'constant')
    elif len(x) > expected_features:
        x = x[:expected_features]

    x_ = x.reshape(1, -1)

    probas = loaded_model.predict_proba(x_)
    num_classes = probas.shape[1]
    top_k = min(5, num_classes)

    top5_indices = np.argsort(probas, axis=1)[:, -top_k:]
    top5_values = np.take_along_axis(probas, top5_indices, axis=1)

    top5_labels = loaded_model.classes_[top5_indices]

    pd_labels = top5_labels[0][::-1].tolist()
    predicted_disease = pd_labels[0]

    Rheumatologist = ['Osteoarthristis', 'Arthritis']
    Cardiologist = ['Heart attack', 'Bronchial Asthma', 'Hypertension ']
    ENT_specialist = [
        '(vertigo) Paroymsal  Positional Vertigo', 'Hypothyroidism'
    ]
    Neurologist = ['Varicose veins', 'Paralysis (brain hemorrhage)', 'Migraine']
    Allergist_Immunologist = [
        'Allergy', 'Pneumonia', 'AIDS', 'Common Cold', 'Tuberculosis', 'Malaria', 'Dengue', 'Typhoid'
    ]
    Urologist = ['Urinary tract infection', 'Dimorphic hemmorhoids(piles)']
    Dermatologist = [
        'Acne', 'Chicken pox', 'Fungal infection', 'Psoriasis', 'Impetigo'
    ]
    Gastroenterologist = [
        'Peptic ulcer diseae', 'GERD', 'Chronic cholestasis', 'Alcoholic hepatitis', 'Jaundice', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E'
    ]

    if predicted_disease in Rheumatologist:
        consultdoctor = "Rheumatologist"
    elif predicted_disease in Cardiologist:
        consultdoctor = "Cardiologist"
    elif predicted_disease in ENT_specialist:
        consultdoctor = "ENT specialist"
    elif predicted_disease in Neurologist:
        consultdoctor = "Neurologist"
    elif predicted_disease in Allergist_Immunologist:
        consultdoctor = "Allergist/Immunologist"
    elif predicted_disease in Urologist:
        consultdoctor = "Urologist"
    elif predicted_disease in Dermatologist:
        consultdoctor = "Dermatologist"
    elif predicted_disease in Gastroenterologist:
        consultdoctor = "Gastroenterologist"
    else:
        consultdoctor = "other"

    pd_prob = top5_values[0][::-1].astype(float).tolist()

    Predicted_Diseases.objects.all().delete()
    Predicted_Diseases.objects.create(
        diseases=pd_labels,
        diseases_prob=pd_prob,
        consult_doctor=consultdoctor
    )

    data = Predicted_Diseases.objects.all()
    serializer = PredictionSerializer(data, many=True)
    return Response(serializer.data)
