@echo off
title Disease Predictor - Django Backend (Medware)
cd /d "%~dp0"
echo ========================================================
echo   MEDWARE DISEASE PREDICTOR - DJANGO ML BACKEND
echo ========================================================
echo Activating Virtual Environment...
call "backend\venv\Scripts\activate.bat"
echo Starting Django Development Server on http://127.0.0.1:8000
python manage.py runserver 127.0.0.1:8000
pause
