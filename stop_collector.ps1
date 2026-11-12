# Stop Tee82 KakaoTalk Collector Background Process
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Windows.Forms

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptDir "kakaotalk_bot\config.json"

$stoppedCount = 0
try {
    $oldConns = Get-NetTCPConnection -LocalPort 18900 -State Listen -ErrorAction SilentlyContinue
    foreach ($oc in $oldConns) {
        if ($oc.OwningProcess -and $oc.OwningProcess -ne $PID) {
            Stop-Process -Id $oc.OwningProcess -Force -ErrorAction SilentlyContinue
            $stoppedCount++
        }
    }
} catch {}
try {
    $procs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*kakaotalk_collector.ps1*" }
    foreach ($p in $procs) {
        Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue
        $stoppedCount++
    }
} catch {}

$cfg = $null
if (Test-Path $ConfigPath) {
    try {
        $cfg = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
    } catch {}
}

$msg = if ($stoppedCount -gt 0) {
    if ($cfg.messages.stopped_success) { $cfg.messages.stopped_success } else { "Background collector stopped successfully." }
} else {
    if ($cfg.messages.stopped_none) { $cfg.messages.stopped_none } else { "No running collector process found." }
}

[System.Windows.Forms.MessageBox]::Show($msg, "Tee82", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
