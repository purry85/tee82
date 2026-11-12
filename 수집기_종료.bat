@echo off
chcp 65001 >nul
title Tee82 - 카카오톡 공지수집기 종료

echo ========================================================
echo   Tee82 카카오톡 무인 공지수집기 종료 중...
echo ========================================================
echo.

:: 1. HTTP API 종료 요청
curl -s -m 2 -X POST http://127.0.0.1:18900/api/stop >nul 2>&1

:: 2. PowerShell 수집기 프로세스 강제 종료 확인
timeout /t 1 /nobreak >nul 2>&1
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*kakaotalk_collector*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }; $conns = Get-NetTCPConnection -LocalPort 18900 -ErrorAction SilentlyContinue; foreach($c in $conns){if($c.OwningProcess){Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue}}" >nul 2>&1

echo.
echo [완료] 카카오톡 공지수집기가 안전하게 종료되었습니다.
timeout /t 2 >nul 2>&1
