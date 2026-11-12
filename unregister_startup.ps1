# Unregister Tee82 KakaoTalk Collector from Windows Startup
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

Add-Type -AssemblyName System.Windows.Forms

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptDir "kakaotalk_bot\config.json"
$StartupFolder = [Environment]::GetFolderPath("Startup")
$LnkPath = Join-Path $StartupFolder "Tee82_KakaoNoticeCollector.lnk"

if (Test-Path $LnkPath) {
    try { Remove-Item $LnkPath -Force } catch {}
}

$LnkOld = Join-Path $StartupFolder "Tee82_*.lnk"
try { Remove-Item $LnkOld -Force -ErrorAction SilentlyContinue } catch {}

$msg = "Unregistered from Windows Startup."
if (Test-Path $ConfigPath) {
    try {
        $cfg = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
        if ($cfg.messages.startup_unregistered) {
            $msg = $cfg.messages.startup_unregistered
        }
    } catch {}
}

[System.Windows.Forms.MessageBox]::Show($msg, "Tee82", [System.Windows.Forms.MessageBoxButtons]::OK, [System.Windows.Forms.MessageBoxIcon]::Information)
