from django.shortcuts import render
from django.http import FileResponse, HttpResponse
from django.conf import settings
import os

def index(request):
    dist_index = os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'index.html')
    if os.path.exists(dist_index):
        return render(request, 'index.html')
    return HttpResponse("Backend API is running. Access the application at http://localhost:5173 or build frontend.")

def load_icon(request):
    icon_path = os.path.join(settings.BASE_DIR, 'frontend', 'dist', 'icon.svg')
    if not os.path.exists(icon_path):
        icon_path = os.path.join(settings.BASE_DIR, 'frontend', 'src', 'assets', 'img', 'logo.svg')
    if os.path.exists(icon_path):
        return FileResponse(open(icon_path, 'rb'), content_type='image/svg+xml')
    return HttpResponse(status=404)

