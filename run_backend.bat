@echo off
title Disease Predictor - Django Backend
cd /d "%~dp0backend"
echo ========================================================
echo   DISEASE PREDICTOR APPLICATION - DJANGO ML BACKEND
echo ========================================================
echo Activating Virtual Environment...
call "venv\Scripts\activate.bat"
echo Starting Django Development Server on http://127.0.0.1:8000
python manage.py runserver 127.0.0.1:8000
pause

