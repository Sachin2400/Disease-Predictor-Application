@echo off
title Disease Predictor - React Frontend
cd /d "%~dp0frontend"
echo ========================================================
echo   DISEASE PREDICTOR APPLICATION - REACT FRONTEND
echo ========================================================
set "PATH=C:\Users\sachi\AppData\Local\nvm\v20.20.2;%PATH%"
echo Starting Vite Dev Server on http://localhost:5173
echo Opening browser automatically...
call npm run dev -- --open
pause
