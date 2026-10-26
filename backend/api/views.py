from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ml_engine.predictor_service import DiseasePredictorService
from .serializers import (
    DiabetesInputSerializer,
    HeartInputSerializer,
    KidneyInputSerializer,
    SymptomsInputSerializer
)

# Instantiate the ML service singleton
service = DiseasePredictorService()

class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "online",
            "service": "Disease Predictor ML API",
            "version": "1.0.0",
            "models_loaded": {
                "diabetes": True,
                "heart": True,
                "kidney": True,
                "symptoms": True
            }
        }, status=status.HTTP_200_OK)

class PredictDiabetesView(APIView):
    def post(self, request):
        serializer = DiabetesInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = service.predict_diabetes(serializer.validated_data)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PredictHeartView(APIView):
    def post(self, request):
        serializer = HeartInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = service.predict_heart(serializer.validated_data)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PredictKidneyView(APIView):
    def post(self, request):
        serializer = KidneyInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            result = service.predict_kidney(serializer.validated_data)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PredictSymptomsView(APIView):
    def post(self, request):
        serializer = SymptomsInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": "Validation failed", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            symptoms = serializer.validated_data.get("symptoms", [])
            result = service.predict_by_symptoms(symptoms)
            if "error" in result:
                return Response(result, status=status.HTTP_400_BAD_REQUEST)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SymptomsListView(APIView):
    def get(self, request):
        try:
            symptoms = service.get_all_symptoms()
            return Response({"count": len(symptoms), "symptoms": symptoms}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to retrieve symptoms: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
