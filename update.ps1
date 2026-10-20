$owner = "purry85"
$repo = "tee82"
$branch = "main"
$token = ""

$targetDir = $PSScriptRoot
if (-not (Test-Path (Join-Path $targetDir "manifest.json")) -and (Test-Path "C:\Tee82\manifest.json")) {
    $targetDir = "C:\Tee82"
}

Clear-Host
Write-Host "============================================================" -ForegroundColor Green
Write-Host "       Tee82 Chrome Extension - Auto Updater" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Target Folder : $targetDir" -ForegroundColor Cyan
Write-Host "  Repository    : https://github.com/$owner/$repo" -ForegroundColor Cyan
Write-Host ""
Write-Host "Downloading latest update from GitHub..." -ForegroundColor Yellow
Write-Host ""

$tempZip = Join-Path $env:TEMP "Tee82_latest.zip"
$tempExtract = Join-Path $env:TEMP ("Tee82_extract_" + (Get-Random))

if (Test-Path $tempZip) { Remove-Item $tempZip -Force }
if (Test-Path $tempExtract) { Remove-Item $tempExtract -Recurse -Force }
New-Item -ItemType Directory -Path $tempExtract -Force | Out-Null

$url = "https://github.com/$owner/$repo/archive/refs/heads/$branch.zip"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$headers = @{}
if ($token) { $headers["Authorization"] = "token $token" }

try {
    Write-Host ">> [1/2] Downloading update package..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $url -Headers $headers -OutFile $tempZip -UseBasicParsing
} catch {
    Write-Host ">> ERROR: Download failed. Please check network or repo visibility." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    exit 1
}

try {
    Write-Host ">> [2/2] Extracting and applying files..." -ForegroundColor Cyan
    Expand-Archive -Path $tempZip -DestinationPath $tempExtract -Force
    $subDirs = Get-ChildItem -Path $tempExtract -Directory
    $sourceDir = if ($subDirs.Count -eq 1) { $subDirs[0].FullName } else { $tempExtract }
    
    $exclude = @(".git", ".github", "1_깃허브_올리기.bat", "upload.ps1", "Tee82_업데이트.bat", "update.bat", "update.ps1", "원클릭_등록.bat", "setup.ps1", "Tee82_Latest.zip")
    Get-ChildItem -Path $sourceDir -Recurse | ForEach-Object {
        $relPath = $_.FullName.Substring($sourceDir.Length).TrimStart("\", "/")
        if ($relPath -and -not ($exclude -contains $relPath.Split("\")[0])) {
            $destPath = Join-Path $targetDir $relPath
            if ($_.PSIsContainer) {
                if (-not (Test-Path $destPath)) { New-Item -ItemType Directory -Path $destPath -Force | Out-Null }
            } else {
                $destParent = Split-Path $destPath -Parent
                if (-not (Test-Path $destParent)) { New-Item -ItemType Directory -Path $destParent -Force | Out-Null }
                Copy-Item -Path $_.FullName -Destination $destPath -Force
            }
        }
    }
    
    Remove-Item $tempZip -Force -ErrorAction SilentlyContinue
    Remove-Item $tempExtract -Recurse -Force -ErrorAction SilentlyContinue
    
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "  [SUCCESS] Tee82 update completed successfully!" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  [Next Steps]" -ForegroundColor Yellow
    Write-Host "  1. Open Chrome browser." -ForegroundColor White
    Write-Host "  2. Go to chrome://extensions" -ForegroundColor White
    Write-Host "  3. Click the Reload button on Tee82!" -ForegroundColor White
    Write-Host "============================================================" -ForegroundColor Green
} catch {
    Write-Host ">> ERROR: Failed to apply update files." -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Yellow
    exit 1
}
