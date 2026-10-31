$targetDir = $PSScriptRoot
$updaterBat = Join-Path $targetDir "update.bat"
if (-not (Test-Path $updaterBat)) {
    $updaterBat = Join-Path $targetDir "Tee82_업데이트.bat"
}

Clear-Host
Write-Host "============================================================" -ForegroundColor Green
Write-Host "       Tee82 Chrome Extension - One-Click Setup" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Registering tee82:// protocol in Windows..." -ForegroundColor Cyan

try {
    $regPath = "HKCU:\Software\Classes\tee82"
    if (-not (Test-Path $regPath)) {
        New-Item -Path $regPath -Force | Out-Null
    }
    Set-ItemProperty -Path $regPath -Name "(Default)" -Value "URL:Tee82 Protocol"
    Set-ItemProperty -Path $regPath -Name "URL Protocol" -Value ""

    $cmdPath = "HKCU:\Software\Classes\tee82\shell\open\command"
    if (-not (Test-Path $cmdPath)) {
        New-Item -Path $cmdPath -Force | Out-Null
    }
    
    $cmdValue = "cmd.exe /c start `"`" `"$updaterBat`""
    Set-ItemProperty -Path $cmdPath -Name "(Default)" -Value $cmdValue

    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  [SUCCESS] One-click protocol registered successfully!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "Target file: $updaterBat" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Now clicking the update button in GolfTee82 will launch" -ForegroundColor White
    Write-Host "the updater automatically!" -ForegroundColor White
    Write-Host "============================================================" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host ">> ERROR: Registration failed." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
}