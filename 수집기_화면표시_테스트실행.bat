@echo off
chcp 65001 >nul
title [Tee82] KakaoTalk Notice Collector Monitor
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$f='%~dp0kakaotalk_bot\kakaotalk_collector.ps1'; $b=[System.IO.File]::ReadAllBytes($f); if($b.Length -ge 3 -and ($b[0] -ne 239 -or $b[1] -ne 187 -or $b[2] -ne 191)){ [System.IO.File]::WriteAllBytes($f, ([byte[]]@(239, 187, 191) + $b)) }; powershell.exe -NoProfile -ExecutionPolicy Bypass -File $f"
pause
