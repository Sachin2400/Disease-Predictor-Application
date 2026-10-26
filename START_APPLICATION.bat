@echo off
title Launch Disease Predictor Application (Medware)
cd /d "%~dp0"
echo ========================================================
echo      LAUNCHING MEDWARE CLINICAL PREDICTOR & HEALTH SUITE
echo ========================================================
echo.
echo 1. Starting Django Backend...
start "Django Backend Server" cmd /k "call backend\venv\Scripts\activate.bat && python manage.py runserver 127.0.0.1:8000"
timeout /t 3 >nul

echo 2. Starting React Vite Frontend...
start "React Frontend Server" cmd /k "cd /d frontend && npm run dev"

echo.
echo ========================================================
echo Both servers have been launched in separate windows!
echo - Backend API:  http://127.0.0.1:8000
echo - Frontend App: http://localhost:5173
echo ========================================================
echo.
pause
