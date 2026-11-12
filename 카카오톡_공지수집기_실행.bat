@echo off
chcp 65001 >nul
title [Tee82] KakaoTalk Notice Collector
cd /d "%~dp0"

echo ============================================================
echo   [Tee82] KakaoTalk PC Notice Collector (Auto Start)
echo ============================================================
echo.

if exist "kakaotalk_bot\kakaotalk_collector.ps1" (
    powershell -NoProfile -ExecutionPolicy Bypass -STA -File "kakaotalk_bot\kakaotalk_collector.ps1"
) else if exist "kakaotalk_collector.ps1" (
    powershell -NoProfile -ExecutionPolicy Bypass -STA -File "kakaotalk_collector.ps1"
) else if exist "kakaotalk_bot\kakaotalk_collector.py" (
    python "kakaotalk_bot\kakaotalk_collector.py"
) else (
    python "kakaotalk_collector.py"
)

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Collector terminated with error code %errorlevel%.
    pause
)
