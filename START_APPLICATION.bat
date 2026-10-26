@echo off
title Disease Predictor - Application Launcher
echo ========================================================
echo   STARTING DISEASE PREDICTOR (REACT + DJANGO + ML)
echo ========================================================
echo [1/2] Launching Django ML Backend (Port 8000)...
start "Django Backend" cmd /k "cd /d "%~dp0backend" && call "venv\Scripts\activate.bat" && python manage.py runserver 127.0.0.1:8000"

echo Waiting 2 seconds for backend initialization...
timeout /t 2 /nobreak >nul

echo [2/2] Launching React Frontend and opening browser (Port 5173)...
start "React Frontend" cmd /k "cd /d "%~dp0frontend" && set "PATH=C:\Users\sachi\AppData\Local\nvm\v20.20.2;%%PATH%%" && call npm run dev -- --open"

echo.
echo ========================================================
echo Both servers launched in their own windows!
echo Frontend: http://localhost:5173
echo Backend:  http://127.0.0.1:8000
echo ========================================================
exit

