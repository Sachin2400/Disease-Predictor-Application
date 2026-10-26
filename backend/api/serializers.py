from rest_framework import serializers

class DiabetesInputSerializer(serializers.Serializer):
    pregnancies = serializers.IntegerField(default=0, min_value=0, max_value=25)
    glucose = serializers.FloatField(required=True, min_value=40, max_value=300)
    blood_pressure = serializers.FloatField(default=72, min_value=30, max_value=200)
    skin_thickness = serializers.FloatField(default=20, min_value=0, max_value=99)
    insulin = serializers.FloatField(default=80, min_value=0, max_value=846)
    bmi = serializers.FloatField(required=True, min_value=10, max_value=70)
    diabetes_pedigree = serializers.FloatField(default=0.47, min_value=0.05, max_value=3.0)
    age = serializers.IntegerField(required=True, min_value=1, max_value=120)

class HeartInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(required=True, min_value=18, max_value=120)
    sex = serializers.IntegerField(required=True, min_value=0, max_value=1)  # 0: Female, 1: Male
    chest_pain_type = serializers.IntegerField(default=0, min_value=0, max_value=3)
    resting_bp = serializers.FloatField(required=True, min_value=80, max_value=250)
    cholesterol = serializers.FloatField(required=True, min_value=100, max_value=600)
    fasting_bs = serializers.IntegerField(default=0, min_value=0, max_value=1)
    resting_ecg = serializers.IntegerField(default=0, min_value=0, max_value=2)
    max_heart_rate = serializers.FloatField(required=True, min_value=60, max_value=230)
    exercise_angina = serializers.IntegerField(default=0, min_value=0, max_value=1)
    st_depression = serializers.FloatField(default=0.0, min_value=0.0, max_value=10.0)
    st_slope = serializers.IntegerField(default=1, min_value=0, max_value=2)
    major_vessels = serializers.IntegerField(default=0, min_value=0, max_value=3)
    thalassemia = serializers.IntegerField(default=2, min_value=1, max_value=3)

class KidneyInputSerializer(serializers.Serializer):
    age = serializers.IntegerField(required=True, min_value=1, max_value=120)
    blood_pressure = serializers.FloatField(required=True, min_value=50, max_value=180)
    specific_gravity = serializers.FloatField(default=1.020, min_value=1.005, max_value=1.030)
    albumin = serializers.IntegerField(default=0, min_value=0, max_value=5)
    sugar = serializers.IntegerField(default=0, min_value=0, max_value=5)
    blood_glucose_random = serializers.FloatField(required=True, min_value=50, max_value=500)
    blood_urea = serializers.FloatField(required=True, min_value=5, max_value=400)
    serum_creatinine = serializers.FloatField(required=True, min_value=0.1, max_value=20.0)
    sodium = serializers.FloatField(default=138, min_value=100, max_value=180)
    potassium = serializers.FloatField(default=4.5, min_value=1.5, max_value=10.0)
    hemoglobin = serializers.FloatField(required=True, min_value=3.0, max_value=20.0)

class SymptomsInputSerializer(serializers.Serializer):
    symptoms = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=False,
        required=True
    )

