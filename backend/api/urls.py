from django.urls import path
from .views import (
    HealthCheckView,
    PredictDiabetesView,
    PredictHeartView,
    PredictKidneyView,
    PredictSymptomsView,
    SymptomsListView
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('predict/diabetes/', PredictDiabetesView.as_view(), name='predict-diabetes'),
    path('predict/heart/', PredictHeartView.as_view(), name='predict-heart'),
    path('predict/kidney/', PredictKidneyView.as_view(), name='predict-kidney'),
    path('predict/symptoms/', PredictSymptomsView.as_view(), name='predict-symptoms'),
    path('symptoms/', SymptomsListView.as_view(), name='symptoms-list'),
]

