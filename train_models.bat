@echo off
title Disease Predictor - Train ML Models
cd /d "%~dp0backend"
echo ========================================================
echo   DISEASE PREDICTOR - RETRAINING MACHINE LEARNING MODELS
echo ========================================================
call "venv\Scripts\activate.bat"
python ml_engine\train_models.py
pause

