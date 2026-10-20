$repoUrl = "https://github.com/purry85/tee82.git"
$targetDir = $PSScriptRoot

Clear-Host
Write-Host "============================================================" -ForegroundColor Green
Write-Host "       Tee82 Golfmon Automation - GitHub Uploader" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Repository: $repoUrl" -ForegroundColor Yellow
Write-Host ""

function Create-Zip-Fallback {
    $zipPath = Join-Path $targetDir "Tee82_Latest.zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    
    $exclude = @("Tee82_Latest.zip", ".git", ".github", "1_깃허브_올리기.bat", "upload.ps1")
    $topItems = Get-ChildItem -Path $targetDir | Where-Object { $exclude -notcontains $_.Name } | Select-Object -ExpandProperty FullName
    Compress-Archive -Path $topItems -DestinationPath $zipPath -Force
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host "  [Fallback] Tee82_Latest.zip created in folder." -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host "If git push is not working, you can manually upload" -ForegroundColor White
    Write-Host "Tee82_Latest.zip to https://github.com/purry85/tee82" -ForegroundColor White
    Write-Host "============================================================" -ForegroundColor Yellow
}

$gitCmd = Get-Command git -ErrorAction SilentlyContinue

if ($gitCmd) {
    Write-Host ">> [1/4] Git detected. Preparing repository..." -ForegroundColor Cyan
    Set-Location $targetDir
    
    # Auto configure author if not set
    $currentEmail = git config user.email 2>$null
    if (-not $currentEmail) {
        Write-Host ">> Setting Git user.email (purry85@users.noreply.github.com)..." -ForegroundColor Cyan
        git config --global user.email "purry85@users.noreply.github.com"
        git config user.email "purry85@users.noreply.github.com"
    }
    $currentName = git config user.name 2>$null
    if (-not $currentName) {
        Write-Host ">> Setting Git user.name (purry85)..." -ForegroundColor Cyan
        git config --global user.name "purry85"
        git config user.name "purry85"
    }

    if (-not (Test-Path (Join-Path $targetDir ".git"))) {
        Write-Host ">> Initializing git repository..." -ForegroundColor Cyan
        git init
    }
    
    $currentRemote = git remote get-url origin 2>$null
    if (-not $currentRemote) {
        git remote add origin $repoUrl
    } elseif ($currentRemote -ne $repoUrl) {
        git remote set-url origin $repoUrl
    }

    # ---------------------------------------------------------
    # [Version Auto-Increment] 0.1씩 버전 자동 증가 로직
    # ---------------------------------------------------------
    $manifestPath = Join-Path $targetDir "manifest.json"
    $popupHtmlPath = Join-Path $targetDir "popup.html"
    $sidepanelHtmlPath = Join-Path $targetDir "sidepanel.html"
    $targetVersionShort = "3.0"
    $targetVersionFull = "3.0.0"

    if (Test-Path $manifestPath) {
        try {
            $manifestRaw = Get-Content $manifestPath -Raw -Encoding UTF8
            $currentVerStr = "3.0.0"
            if ($manifestRaw -match '"version":\s*"([^"]+)"') {
                $currentVerStr = $matches[1]
            }

            # Git HEAD(직전 커밋)의 manifest.json 버전 확인
            $headVerStr = $null
            try {
                $headManifestRaw = git show HEAD:manifest.json 2>$null
                if ($headManifestRaw -and ($headManifestRaw -match '"version":\s*"([^"]+)"')) {
                    $headVerStr = $matches[1]
                }
            } catch {}

            $shouldBump = $true
            # 직전 커밋 버전(HEAD)과 현재 파일의 버전이 다르면 (예: 2.2에서 1.0으로 리셋된 첫 커밋인 경우)
            # 현재 지정된 버전(1.0)을 그대로 최초 커밋하고, 그 다음 업로드부터 0.1씩 증가
            if (-not $headVerStr -or ($headVerStr -ne $currentVerStr)) {
                $shouldBump = $false
                $targetVersionFull = $currentVerStr
                $targetVersionShort = ($currentVerStr -replace '\.\d+$', '')
                Write-Host ">> [VERSION] Version change detected (HEAD: $headVerStr -> Current: $targetVersionShort)." -ForegroundColor Yellow
                Write-Host ">> [VERSION] Uploading initial version Ver $targetVersionShort ($targetVersionFull)..." -ForegroundColor Green
            }

            if ($shouldBump) {
                # 0.1 단위 올림 계산 (1.0 -> 1.1 -> 1.2 ... 1.9 -> 2.0)
                $vParts = $currentVerStr.Split('.')
                $major = [int]$vParts[0]
                $minor = if ($vParts.Length -gt 1) { [int]$vParts[1] } else { 0 }
                
                $minor++
                if ($minor -ge 10) {
                    $major += [Math]::Floor($minor / 10)
                    $minor = $minor % 10
                }

                $targetVersionShort = "$major.$minor"
                $targetVersionFull = "$major.$minor.0"

                Write-Host ">> [VERSION] Auto-incrementing version (+0.1): $currentVerStr -> $targetVersionFull (Ver $targetVersionShort)" -ForegroundColor Green

                # 1. manifest.json 갱신 (정규식 치환으로 UTF8 인코딩 및 한글 완벽 보존)
                $manifestRaw = $manifestRaw -replace '(?<="version":\s*")[^"]+', $targetVersionFull
                [System.IO.File]::WriteAllText($manifestPath, $manifestRaw, (New-Object System.Text.UTF8Encoding($false)))

                # 2. popup.html 갱신
                if (Test-Path $popupHtmlPath) {
                    $pHtml = Get-Content $popupHtmlPath -Raw -Encoding UTF8
                    $pHtml = $pHtml -replace '(?<=Automation\s+Ver\s+)\d+\.\d+', $targetVersionShort
                    $pHtml = $pHtml -replace '(?<=id="badgeCurrentVer">Ver\s+)\d+\.\d+', $targetVersionShort
                    [System.IO.File]::WriteAllText($popupHtmlPath, $pHtml, (New-Object System.Text.UTF8Encoding($false)))
                }

                # 3. sidepanel.html 갱신
                if (Test-Path $sidepanelHtmlPath) {
                    $sHtml = Get-Content $sidepanelHtmlPath -Raw -Encoding UTF8
                    $sHtml = $sHtml -replace '(?<=Automation\s+Ver\s+)\d+\.\d+', $targetVersionShort
                    $sHtml = $sHtml -replace '(?<=id="badgeCurrentVer">Ver\s+)\d+\.\d+', $targetVersionShort
                    [System.IO.File]::WriteAllText($sidepanelHtmlPath, $sHtml, (New-Object System.Text.UTF8Encoding($false)))
                }
            }
        } catch {
            Write-Host ">> [WARNING] Version processing warning: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }

    Write-Host ">> [2/4] Adding all files (git add -A)..." -ForegroundColor Cyan
    git add -A
    
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host ">> [3/4] Committing changes (Ver $targetVersionShort)..." -ForegroundColor Cyan
    git commit -m "Tee82 Ver $targetVersionShort ($timestamp)"
    
    # Ensure current branch is named main
    git branch -M main
    
    Write-Host ">> [4/4] Pushing to GitHub (origin main)..." -ForegroundColor Cyan
    Write-Host "   (Note: If a browser or login window opens, please sign in to GitHub to authorize)" -ForegroundColor Yellow
    
    git push -u origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host ">> Regular push rejected (possible remote conflict). Retrying with force push..." -ForegroundColor Yellow
        git push -u origin main --force
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "============================================================" -ForegroundColor Green
        Write-Host "  [SUCCESS] GitHub upload completed successfully!" -ForegroundColor Green
        Write-Host "  Repository: https://github.com/purry85/tee82" -ForegroundColor Green
        Write-Host "============================================================" -ForegroundColor Green
        Write-Host "You can now run 'update.bat' (or 'Tee82_업데이트.bat') on other computers!" -ForegroundColor White
        Write-Host "============================================================" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host ">> [WARNING] git push failed. Creating fallback zip package..." -ForegroundColor Red
        Create-Zip-Fallback
    }
} else {
    Write-Host ">> [INFO] Git is not installed on this computer." -ForegroundColor Yellow
    Write-Host ">> Creating zip package for easy upload..." -ForegroundColor Cyan
    Create-Zip-Fallback
}
