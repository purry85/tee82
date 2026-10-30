@echo off
title [Tee82] KakaoTalk Notice Collector
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0kakaotalk_collector.ps1"
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Collector terminated with error code %errorlevel%.
    pause
)
