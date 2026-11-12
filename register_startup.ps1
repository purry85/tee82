# Register Tee82 KakaoTalk Collector to Windows Startup
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Windows.Forms

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$VbsPath = Join-Path $ScriptDir "tee82_silent_runner.vbs"
$ConfigPath = Join-Path $ScriptDir "kakaotalk_bot\config.json"
$StartupFolder = [Environment]::GetFolderPath("Startup")
$LnkPath = Join-Path $StartupFolder "Tee82_KakaoNoticeCollector.lnk"

# 0. Terminate any previous collector process to ensure latest code runs
try {
    $oldConns = Get-NetTCPConnection -LocalPort 18900 -State Listen -ErrorAction SilentlyContinue
    foreach ($oc in $oldConns) {
        if ($oc.OwningProcess -and $oc.OwningProcess -ne $PID) {
            Stop-Process -Id $oc.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
} catch {}
try {
    $oldProcs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*kakaotalk_collector.ps1*" }
    foreach ($op in $oldProcs) {
        Stop-Process -Id $op.ProcessId -Force -ErrorAction SilentlyContinue
    }
} catch {}

# 1. Clean up old shortcut if any
$LnkOld = Join-Path $StartupFolder "Tee82_*.lnk"
try { Remove-Item $LnkOld -Force -ErrorAction SilentlyContinue } catch {}

# 2. Create Startup Shortcut
try {
    $ws = New-Object -ComObject WScript.Shell
    $shortcut = $ws.CreateShortcut($LnkPath)
    $shortcut.TargetPath = "wscript.exe"
    $shortcut.Arguments = "`"$VbsPath`""
    $shortcut.WorkingDirectory = $ScriptDir
    $shortcut.Description = "Tee82 KakaoTalk Notice Collector"
    $shortcut.Save()
} catch {}

# 3. Launch in background immediately
try {
    Start-Process "wscript.exe" -ArgumentList "`"$VbsPath`"" -WindowStyle Hidden
} catch {}

# 4. Read message from config.json and display Windows native dialog
$msg = "Registered to Windows Startup successfully!`n`nIt will now run silently in the background whenever your PC starts.`n(Background execution started now!)"
if (Test-Path $ConfigPath) {
    try {
        $cfg = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
        if ($cfg.messages.startup_registered) {
            $msg = $cfg.messages.startup_registered
        }
    } catch {}
}

[System.Windows.Forms.MessageBox]::Show($msg, "Tee82", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
