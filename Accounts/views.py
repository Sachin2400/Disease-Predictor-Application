from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from django.http import JsonResponse
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, PatientSerializer, DoctorProfileSerializer
from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile, AppUser, PatientProfile as PatientProfileModel


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


def check_email(request):
    email = request.GET.get('email')
    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        response_data = {'email_exists': email_exists}
        return JsonResponse(response_data)
    else:
        response_data = {'error': 'Email parameter is missing'}
        return JsonResponse(response_data, status=400)


class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        try:
            profile = request.user.profile
        except Exception:
            profile = PatientProfileModel.objects.create(user=request.user)
        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        try:
            profile = request.user.profile
        except Exception:
            profile = PatientProfileModel.objects.create(user=request.user)
        serializer = PatientSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileListAPIView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        if speciality == 'All' or not speciality:
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(speciality__icontains=speciality)

        # Return up to 12 doctors
        return queryset.order_by('?')[:12]


def insert_data(request):
    values = [
        # Family Medicine
        ('Dr. John Smith', 'Family Medicine', 'male', 15, '123 Main Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/john_smith'),
        ('Dr. Emma Thompson', 'Family Medicine', 'female', 12, '456 Elm Street, City, State', '555-987-6543', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/emma_thompson'),
        ('Dr. David Wilson', 'Family Medicine', 'male', 10, '789 Oak Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/david_wilson'),
        ('Dr. Lily Rodriguez', 'Family Medicine', 'female', 8, '321 Maple Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/lily_rodriguez'),

        # Internal Medicine
        ('Dr. Emily Johnson', 'Internal Medicine', 'female', 20, '123 Main Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/emily_johnson'),
        ('Dr. Benjamin Davis', 'Internal Medicine', 'male', 18, '456 Elm Street, City, State', '555-876-5432', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_davis'),
        ('Dr. Sophia Thompson', 'Internal Medicine', 'female', 22, '789 Oak Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_thompson'),
        ('Dr. Daniel Wilson', 'Internal Medicine', 'male', 16, '321 Maple Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/daniel_wilson'),

        # Pediatrician
        ('Dr. Michael Johnson', 'Pediatrician', 'male', 18, '123 Main Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/michael_johnson'),
        ('Dr. Abigail Smith', 'Pediatrician', 'female', 15, '456 Elm Street, City, State', '555-765-4321', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/abigail_smith'),
        ('Dr. Ethan Davis', 'Pediatrician', 'male', 10, '789 Oak Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/ethan_davis'),
        ('Dr. Isabella Wilson', 'Pediatrician', 'female', 12, '321 Maple Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/isabella_wilson'),

        # Obstetricians/gynecologist (OBGYNs)
        ('Dr. Olivia Davis', 'Gynecologist', 'female', 25, '123 Main Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_davis'),
        ('Dr. Liam Johnson', 'Gynecologist', 'male', 22, '456 Elm Street, City, State', '555-654-3210', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson'),
        ('Dr. Ava Brown', 'Gynecologist', 'female', 20, '789 Oak Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown'),
        ('Dr. Noah Thompson', 'Gynecologist', 'male', 18, '321 Maple Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson'),

        # Cardiologist
        ('Dr. Benjamin Smith', 'Cardiologist', 'male', 22, '123 Main Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_smith'),
        ('Dr. Charlotte Johnson', 'Cardiologist', 'female', 20, '456 Elm Street, City, State', '555-543-2109', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson'),
        ('Dr. Samuel Brown', 'Cardiologist', 'male', 18, '789 Oak Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown'),
        ('Dr. Grace Thompson', 'Cardiologist', 'female', 16, '321 Maple Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson'),

        # Oncologist
        ('Dr. William Wilson', 'Oncologist', 'male', 30, '123 Main Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/william_wilson'),
        ('Dr. Sophia Johnson', 'Oncologist', 'female', 28, '456 Elm Street, City, State', '555-432-1098', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_johnson'),
        ('Dr. Alexander Brown', 'Oncologist', 'male', 25, '789 Oak Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/alexander_brown'),
        ('Dr. Mia Thompson', 'Oncologist', 'female', 22, '321 Maple Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/mia_thompson'),

        # Gastroenterologist
        ('Dr. Olivia Smith', 'Gastroenterologist', 'female', 25, '123 Main Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_smith'),
        ('Dr. Liam Johnson', 'Gastroenterologist', 'male', 22, '456 Elm Street, City, State', '555-321-0987', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson_gi'),
        ('Dr. Ava Brown', 'Gastroenterologist', 'female', 20, '789 Oak Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown_gi'),
        ('Dr. Noah Thompson', 'Gastroenterologist', 'male', 18, '321 Maple Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson_gi'),

        # Pulmonologist
        ('Dr. Benjamin Wilson', 'Pulmonologist', 'male', 20, '123 Main Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_wilson_pulm'),
        ('Dr. Charlotte Johnson', 'Pulmonologist', 'female', 18, '456 Elm Street, City, State', '555-210-9876', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson_pulm'),
        ('Dr. Samuel Brown', 'Pulmonologist', 'male', 16, '789 Oak Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown_pulm'),
        ('Dr. Grace Thompson', 'Pulmonologist', 'female', 14, '321 Maple Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson_pulm'),

        # Infectious Disease
        ('Dr. William Smith', 'Infectious Disease', 'male', 18, '123 Main Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/william_smith_id'),
        ('Dr. Sophia Johnson', 'Infectious Disease', 'female', 16, '456 Elm Street, City, State', '555-109-8765', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_johnson_id'),
        ('Dr. Alexander Brown', 'Infectious Disease', 'male', 14, '789 Oak Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/alexander_brown_id'),
        ('Dr. Mia Thompson', 'Infectious Disease', 'female', 12, '321 Maple Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/mia_thompson_id'),

        # Nephrologist
        ('Dr. Olivia Smith', 'Nephrologist', 'female', 25, '123 Main Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_smith_neph'),
        ('Dr. Liam Johnson', 'Nephrologist', 'male', 22, '456 Elm Street, City, State', '555-098-7654', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson_neph'),
        ('Dr. Ava Brown', 'Nephrologist', 'female', 20, '789 Oak Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown_neph'),
        ('Dr. Noah Thompson', 'Nephrologist', 'male', 18, '321 Maple Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson_neph'),

        # Endocrinologist
        ('Dr. Benjamin Wilson', 'Endocrinologist', 'male', 20, '123 Main Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_wilson_endo'),
        ('Dr. Charlotte Johnson', 'Endocrinologist', 'female', 18, '456 Elm Street, City, State', '555-987-6543', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson_endo'),
        ('Dr. Samuel Brown', 'Endocrinologist', 'male', 16, '789 Oak Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown_endo'),
        ('Dr. Grace Thompson', 'Endocrinologist', 'female', 14, '321 Maple Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson_endo'),

        # Ophthalmologist
        ('Dr. William Smith', 'Ophthalmologist', 'male', 18, '123 Main Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/william_smith_ophth'),
        ('Dr. Sophia Johnson', 'Ophthalmologist', 'female', 16, '456 Elm Street, City, State', '555-876-5432', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_johnson_ophth'),
        ('Dr. Alexander Brown', 'Ophthalmologist', 'male', 14, '789 Oak Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/alexander_brown_ophth'),
        ('Dr. Mia Thompson', 'Ophthalmologist', 'female', 12, '321 Maple Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/mia_thompson_ophth'),

        # Otolaryngologist
        ('Dr. Olivia Smith', 'Otolaryngologist', 'female', 25, '123 Main Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_smith_oto'),
        ('Dr. Liam Johnson', 'Otolaryngologist', 'male', 22, '456 Elm Street, City, State', '555-765-4321', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson_oto'),
        ('Dr. Ava Brown', 'Otolaryngologist', 'female', 20, '789 Oak Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown_oto'),
        ('Dr. Noah Thompson', 'Otolaryngologist', 'male', 18, '321 Maple Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson_oto'),

        # Dermatologist
        ('Dr. Benjamin Wilson', 'Dermatologist', 'male', 20, '123 Main Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_wilson_derm'),
        ('Dr. Charlotte Johnson', 'Dermatologist', 'female', 18, '456 Elm Street, City, State', '555-654-3210', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson_derm'),
        ('Dr. Samuel Brown', 'Dermatologist', 'male', 16, '789 Oak Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown_derm'),
        ('Dr. Grace Thompson', 'Dermatologist', 'female', 14, '321 Maple Street, City, State', '555-456-7890', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson_derm'),

        # Psychiatrist
        ('Dr. William Smith', 'Psychiatrist', 'male', 18, '123 Main Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/william_smith_psych'),
        ('Dr. Sophia Johnson', 'Psychiatrist', 'female', 16, '456 Elm Street, City, State', '555-543-2109', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_johnson_psych'),
        ('Dr. Alexander Brown', 'Psychiatrist', 'male', 14, '789 Oak Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/alexander_brown_psych'),
        ('Dr. Mia Thompson', 'Psychiatrist', 'female', 12, '321 Maple Street, City, State', '555-345-6789', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/mia_thompson_psych'),

        # Neurologist
        ('Dr. Olivia Smith', 'Neurologist', 'female', 25, '123 Main Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_smith_neuro'),
        ('Dr. Liam Johnson', 'Neurologist', 'male', 22, '456 Elm Street, City, State', '555-432-1098', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson_neuro'),
        ('Dr. Ava Brown', 'Neurologist', 'female', 20, '789 Oak Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown_neuro'),
        ('Dr. Noah Thompson', 'Neurologist', 'male', 18, '321 Maple Street, City, State', '555-234-5678', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson_neuro'),

        # Radiologist
        ('Dr. Benjamin Wilson', 'Radiologist', 'male', 20, '123 Main Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_wilson_rad'),
        ('Dr. Charlotte Johnson', 'Radiologist', 'female', 18, '456 Elm Street, City, State', '555-321-0987', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson_rad'),
        ('Dr. Samuel Brown', 'Radiologist', 'male', 16, '789 Oak Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown_rad'),
        ('Dr. Grace Thompson', 'Radiologist', 'female', 14, '321 Maple Street, City, State', '555-123-4567', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson_rad'),

        # Anesthesiologist
        ('Dr. William Smith', 'Anesthesiologist', 'male', 18, '123 Main Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/william_smith_anes'),
        ('Dr. Sophia Johnson', 'Anesthesiologist', 'female', 16, '456 Elm Street, City, State', '555-210-9876', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/sophia_johnson_anes'),
        ('Dr. Alexander Brown', 'Anesthesiologist', 'male', 14, '789 Oak Street, City, State', '555-789-0123', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/alexander_brown_anes'),
        ('Dr. Mia Thompson', 'Anesthesiologist', 'female', 12, '321 Maple Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/mia_thompson_anes'),

        # Surgeon
        ('Dr. Olivia Smith', 'Surgeon', 'female', 25, '123 Main Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/olivia_smith_surg'),
        ('Dr. Liam Johnson', 'Surgeon', 'male', 22, '456 Elm Street, City, State', '555-109-8765', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/liam_johnson_surg'),
        ('Dr. Ava Brown', 'Surgeon', 'female', 20, '789 Oak Street, City, State', '555-678-9012', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/ava_brown_surg'),
        ('Dr. Noah Thompson', 'Surgeon', 'male', 18, '321 Maple Street, City, State', '555-901-2345', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/noah_thompson_surg'),

        # Physician Executive
        ('Dr. Benjamin Wilson', 'Physician Executive', 'male', 20, '123 Main Street, City, State', '555-012-3456', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300', 'https://example.com/profiles/benjamin_wilson_exec'),
        ('Dr. Charlotte Johnson', 'Physician Executive', 'female', 18, '456 Elm Street, City, State', '555-098-7654', 'https://images.unsplash.com/photo-1594824813689-c45330364ec8?w=300', 'https://example.com/profiles/charlotte_johnson_exec'),
        ('Dr. Samuel Brown', 'Physician Executive', 'male', 16, '789 Oak Street, City, State', '555-567-8901', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300', 'https://example.com/profiles/samuel_brown_exec'),
        ('Dr. Grace Thompson', 'Physician Executive', 'female', 14, '321 Maple Street, City, State', '555-890-1234', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300', 'https://example.com/profiles/grace_thompson_exec'),
    ]

    for item in values:
        DoctorProfile.objects.get_or_create(
            name=item[0],
            speciality=item[1],
            sex=item[2],
            experience=item[3],
            work_address=item[4],
            mobile_no=item[5],
            image_link=item[6],
            profile_link=item[7]
        )

    return JsonResponse({'status': 'Doctor profiles seeded successfully', 'count': len(values)})


def check_admin(request):
    email = request.GET.get('email')
    if email:
        try:
            user = AppUser.objects.get(email=email)
            is_superuser = user.is_superuser
            response_data = {'email_exists': True, 'is_superuser': is_superuser}
            return JsonResponse(response_data)
        except AppUser.DoesNotExist:
            response_data = {'email_exists': False, 'is_superuser': False}
            return JsonResponse(response_data)
    else:
        response_data = {'error': 'Email parameter is missing'}
        return JsonResponse(response_data, status=400)

