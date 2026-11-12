@echo off
chcp 65001 >nul
title [Tee82] Restart Notice Collector
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*kakaotalk_collector*' } | Stop-Process -Force -ErrorAction SilentlyContinue" >nul 2>&1
timeout /t 1 /nobreak >nul 2>&1
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$f='%~dp0kakaotalk_bot\kakaotalk_collector.ps1'; $b=[System.IO.File]::ReadAllBytes($f); if($b.Length -ge 3 -and ($b[0] -ne 239 -or $b[1] -ne 187 -or $b[2] -ne 191)){ [System.IO.File]::WriteAllBytes($f, ([byte[]]@(239, 187, 191) + $b)) }" >nul 2>&1
wscript.exe "%~dp0kakaotalk_bot\kakaotalk_collector_silent.vbs"
timeout /t 2 >nul 2>&1
