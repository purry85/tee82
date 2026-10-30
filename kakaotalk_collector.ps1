# Tee82 - KakaoTalk PC Notice Collector (Ultra-Fast Native Win32 + Clipboard RPA Engine)
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Load Windows Built-in UIAutomation & Forms Assemblies (.NET 4.0+)
try {
    Add-Type -AssemblyName UIAutomationClient -ErrorAction Stop
    Add-Type -AssemblyName UIAutomationTypes -ErrorAction Stop
    Add-Type -AssemblyName System.Windows.Forms -ErrorAction Stop
} catch {
    Write-Host ("[ERROR] Failed to load required assemblies: " + $_) -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Win32 Native Window & Chat List Controller (AttachThreadInput + PostKeyEx RPA Engine)
$Win32Code = @"
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;

public class Tee82Win32 {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern bool EnumChildWindows(IntPtr hWndParent, EnumWindowsProc lpEnumFunc, IntPtr lParam);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
    public static extern int GetClassName(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("kernel32.dll")]
    public static extern uint GetCurrentThreadId();

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool AttachThreadInput(uint idAttach, uint idAttachTo, bool fAttach);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool GetKeyboardState(byte[] lpKeyState);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool SetKeyboardState(byte[] lpKeyState);

    [DllImport("user32.dll")]
    public static extern uint MapVirtualKey(uint uCode, uint uMapType);

    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern IntPtr SendMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr FindWindowEx(IntPtr hwndParent, IntPtr hwndChildAfter, string lpszClass, string lpszWindow);

    [DllImport("user32.dll")]
    public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern uint GetClipboardSequenceNumber();

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")]
    public static extern IntPtr SetFocus(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    [DllImport("user32.dll")]
    public static extern IntPtr GetAncestor(IntPtr hwnd, uint gaFlags);

    public const uint GA_ROOT = 2;
    public const uint KEYEVENTF_KEYUP = 0x0002;
    public const uint WM_ACTIVATE = 0x0006;
    public const uint WM_SETFOCUS = 0x0007;
    public const uint WM_KEYDOWN = 0x0100;
    public const uint WM_KEYUP = 0x0101;
    public const uint WM_COPY = 0x0301;
    public const int VK_CONTROL = 0x11;
    public const int VK_A = 0x41;
    public const int VK_C = 0x43;
    public const int VK_RIGHT = 0x27;

    public static string GetWindowTitle(IntPtr hWnd) {
        if (hWnd == IntPtr.Zero) return "";
        var sb = new StringBuilder(512);
        GetWindowText(hWnd, sb, 512);
        return sb.ToString().Trim();
    }

    public class WinInfo {
        public IntPtr Hwnd;
        public string Title;
        public string ClassName;
        public uint ProcessId;
    }

    public static List<WinInfo> FindTargetWindows(string[] keywords, string[] ignoreWords) {
        var list = new List<WinInfo>();
        if (keywords == null || keywords.Length == 0) return list;

        EnumWindows((hWnd, lParam) => {
            if (IsWindowVisible(hWnd)) {
                var sbTitle = new StringBuilder(512);
                GetWindowText(hWnd, sbTitle, 512);
                string title = sbTitle.ToString().Trim();
                if (!string.IsNullOrEmpty(title)) {
                    string lowerTitle = title.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "");

                    // 1. Check if title matches any target keyword
                    bool matchesKeyword = false;
                    foreach (var kw in keywords) {
                        if (!string.IsNullOrEmpty(kw)) {
                            string lowerKw = kw.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "");
                            if (lowerTitle.Contains(lowerKw)) {
                                matchesKeyword = true;
                                break;
                            }
                        }
                    }
                    if (!matchesKeyword) return true;

                    // 2. Check ignore words, but NEVER ignore if the ignore word conflicts with a target keyword!
                    bool isIgnored = false;
                    if (ignoreWords != null && ignoreWords.Length > 0) {
                        foreach (var ig in ignoreWords) {
                            if (!string.IsNullOrEmpty(ig)) {
                                string lowerIg = ig.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "");
                                if (lowerTitle.Contains(lowerIg)) {
                                    bool kwContainsIg = false;
                                    foreach (var kw in keywords) {
                                        string lKw = kw.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "");
                                        if (lKw.Contains(lowerIg) || lowerIg.Contains(lKw)) {
                                            kwContainsIg = true;
                                            break;
                                        }
                                    }
                                    if (!kwContainsIg) {
                                        isIgnored = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (isIgnored) return true;

                    var sbClass = new StringBuilder(256);
                    GetClassName(hWnd, sbClass, 256);
                    uint pid = 0;
                    GetWindowThreadProcessId(hWnd, out pid);
                    list.Add(new WinInfo {
                        Hwnd = hWnd,
                        Title = title,
                        ClassName = sbClass.ToString(),
                        ProcessId = pid
                    });
                }
            }
            return true;
        }, IntPtr.Zero);
        return list;
    }

    public static IntPtr FindChatListControl(IntPtr hwndMain) {
        if (hwndMain == IntPtr.Zero) return IntPtr.Zero;
        IntPtr hList = FindWindowEx(hwndMain, IntPtr.Zero, "EVA_VH_ListControl_Dblclk", null);
        if (hList != IntPtr.Zero) return hList;

        EnumChildWindows(hwndMain, (hWnd, lParam) => {
            var sbClass = new StringBuilder(256);
            GetClassName(hWnd, sbClass, 256);
            string cName = sbClass.ToString();
            if (cName == "EVA_VH_ListControl_Dblclk" || cName.Contains("ListControl")) {
                hList = hWnd;
                return false;
            }
            return true;
        }, IntPtr.Zero);
        return hList;
    }

    public static bool TriggerCopyChat(IntPtr hwndMain, IntPtr hwndList) {
        if (hwndList == IntPtr.Zero) return false;
        try {
            IntPtr fg = GetForegroundWindow();
            bool isForeground = (fg != IntPtr.Zero && (fg == hwndMain || fg == hwndList || GetAncestor(hwndList, GA_ROOT) == fg));

            if (isForeground) {
                // Chat window is in foreground
                SetFocus(hwndList);
                SendMessage(hwndList, WM_SETFOCUS, IntPtr.Zero, IntPtr.Zero);
                System.Threading.Thread.Sleep(30);

                // Ctrl + A
                keybd_event((byte)VK_CONTROL, 0, 0, UIntPtr.Zero);
                keybd_event((byte)VK_A, 0, 0, UIntPtr.Zero);
                System.Threading.Thread.Sleep(30);
                keybd_event((byte)VK_A, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
                System.Threading.Thread.Sleep(150);

                // Ctrl + C
                keybd_event((byte)VK_C, 0, 0, UIntPtr.Zero);
                System.Threading.Thread.Sleep(30);
                keybd_event((byte)VK_C, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
                keybd_event((byte)VK_CONTROL, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
                System.Threading.Thread.Sleep(40);

                // Deselect highlight so chat doesn't stay blue
                keybd_event((byte)VK_RIGHT, 0, 0, UIntPtr.Zero);
                keybd_event((byte)VK_RIGHT, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
            } else {
                // Background mode: Proven Python win32 sequence for EVA_VH_ListControl_Dblclk
                PostMessage(hwndList, WM_KEYDOWN, (IntPtr)VK_CONTROL, IntPtr.Zero);
                System.Threading.Thread.Sleep(25);
                PostMessage(hwndList, WM_KEYDOWN, (IntPtr)VK_A, IntPtr.Zero);
                PostMessage(hwndList, WM_KEYUP, (IntPtr)VK_A, IntPtr.Zero);
                System.Threading.Thread.Sleep(200);
                PostMessage(hwndList, WM_KEYDOWN, (IntPtr)VK_C, IntPtr.Zero);
                PostMessage(hwndList, WM_KEYUP, (IntPtr)VK_C, IntPtr.Zero);
                PostMessage(hwndList, WM_KEYUP, (IntPtr)VK_CONTROL, IntPtr.Zero);
                System.Threading.Thread.Sleep(150);
            }
            return true;
        } catch {
            return false;
        }
    }
}
"@

$hasWin32Helper = $false
try {
    Add-Type -TypeDefinition $Win32Code -ErrorAction Stop
    $hasWin32Helper = $true
} catch {
    $hasWin32Helper = $false
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ConfigPath = Join-Path $ScriptDir "config.json"
$DataPath = Join-Path $ScriptDir "collected_notices.json"
$StatusPath = Join-Path $ScriptDir "status.json"
$LogPath = Join-Path $ScriptDir "collector.log"

# Default configuration
$Config = @{
    target_rooms = @()
    ignore_rooms = @()
    lobby_names = @()
    auto_detect_golf_rooms = $false
    auto_room_keywords = @()
    poll_interval_sec = 2
    server_port = 18900
    server_host = "127.0.0.1"
    max_history_count = 1000
    ignore_prefixes = @()
    ignore_exact = @()
    keyword_regex = ""
    date_regex = ""
    price_regex = ""
    time_regex = ""
    messages = @{}
}

function Load-CollectorConfig {
    if (Test-Path $ConfigPath) {
        try {
            $rawJson = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8)
            $parsed = $rawJson | ConvertFrom-Json
            if ($parsed.target_rooms) { $Config.target_rooms = @($parsed.target_rooms) }
            if ($parsed.ignore_rooms) { $Config.ignore_rooms = @($parsed.ignore_rooms) }
            if ($parsed.lobby_names) { $Config.lobby_names = @($parsed.lobby_names) }
            if ($parsed.auto_detect_golf_rooms -ne $null) { $Config.auto_detect_golf_rooms = [bool]$parsed.auto_detect_golf_rooms }
            if ($parsed.auto_room_keywords) { $Config.auto_room_keywords = @($parsed.auto_room_keywords) }
            if ($parsed.poll_interval_sec) { $Config.poll_interval_sec = [int]$parsed.poll_interval_sec }
            if ($parsed.server_port) { $Config.server_port = [int]$parsed.server_port }
            if ($parsed.server_host) { $Config.server_host = [string]$parsed.server_host }
            if ($parsed.max_history_count) { $Config.max_history_count = [int]$parsed.max_history_count }
            if ($parsed.ignore_prefixes) { $Config.ignore_prefixes = @($parsed.ignore_prefixes) }
            if ($parsed.ignore_exact) { $Config.ignore_exact = @($parsed.ignore_exact) }
            if ($parsed.keyword_regex) { $Config.keyword_regex = [string]$parsed.keyword_regex }
            if ($parsed.date_regex) { $Config.date_regex = [string]$parsed.date_regex }
            if ($parsed.price_regex) { $Config.price_regex = [string]$parsed.price_regex }
            if ($parsed.time_regex) { $Config.time_regex = [string]$parsed.time_regex }
            if ($parsed.messages) { $Config.messages = $parsed.messages }
        } catch {}
    }
}

Load-CollectorConfig
$Port = $Config.server_port

# Kill lingering collector processes on the same port or script
try {
    $oldConns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    foreach ($oc in $oldConns) {
        if ($oc.OwningProcess -and $oc.OwningProcess -ne $PID) {
            Stop-Process -Id $oc.OwningProcess -Force -ErrorAction SilentlyContinue
        }
    }
} catch {}

try {
    $oldPs = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*kakaotalk_collector.ps1*" -and $_.ProcessId -ne $PID }
    foreach ($op in $oldPs) {
        Stop-Process -Id $op.ProcessId -Force -ErrorAction SilentlyContinue
    }
} catch {}
Start-Sleep -Milliseconds 600

# Initialize collected_notices.json if not present
if (-not (Test-Path $DataPath)) {
    try {
        [System.IO.File]::WriteAllText($DataPath, "[]", [System.Text.Encoding]::UTF8)
    } catch {}
}

function Write-CollectorLog {
    param([string]$line)
    try {
        $ts = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        $logEntry = "[" + $ts + "] " + $line
        $lines = @()
        if (Test-Path $LogPath) {
            try { $lines = [System.IO.File]::ReadAllLines($LogPath, [System.Text.Encoding]::UTF8) } catch {}
        }
        $linesList = [System.Collections.Generic.List[string]]::new()
        foreach ($l in $lines) { [void]$linesList.Add($l) }
        [void]$linesList.Add($logEntry)
        while ($linesList.Count -gt 200) { $linesList.RemoveAt(0) }
        [System.IO.File]::WriteAllLines($LogPath, $linesList, [System.Text.Encoding]::UTF8)
    } catch {}
}

function Update-StatusFile {
    param([string]$room, [int]$count)
    try {
        $statObj = @{
            status = "ok"
            collector_running = $true
            active_room = $room
            collected_count = $count
            updated_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }
        $json = $statObj | ConvertTo-Json
        $fs = [System.IO.FileStream]::new($StatusPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write, [System.IO.FileShare]::ReadWrite)
        $sw = [System.IO.StreamWriter]::new($fs, [System.Text.Encoding]::UTF8)
        $sw.Write($json)
        $sw.Flush()
        $sw.Close()
        $fs.Close()
    } catch {
        Write-CollectorLog ("Error writing status.json: " + $_)
    }
}

Update-StatusFile "" 0
Write-CollectorLog ("Tee82 KakaoTalk Collector started on port " + $Port + " (Win32Helper: " + $hasWin32Helper + ")")

# Console Banner
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  [Tee82] KakaoTalk PC Notice Collector (Direct RPA)" -ForegroundColor Green
Write-Host ("  Local API: http://127.0.0.1:" + $Port + "/api/notices") -ForegroundColor Cyan
Write-Host ("  Target Rooms: " + ($Config.target_rooms -join ', ')) -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Green
Write-Host ""

# ==============================================================================
# ENGINE 1: Dedicated Background HTTP Server (Non-blocking, sub-millisecond response)
# ==============================================================================
$HttpServerScript = {
    param($Port, $DataPath, $ConfigPath, $StatusPath, $MainPid)

    $Listener = New-Object System.Net.HttpListener
    $Listener.Prefixes.Add("http://127.0.0.1:" + $Port + "/")
    $started = $false
    for ($i = 0; $i -lt 15; $i++) {
        try {
            $Listener.Start()
            $started = $true
            break
        } catch {
            Start-Sleep -Milliseconds 400
        }
    }
    if (-not $started) { return }

    while ($Listener.IsListening) {
        try {
            $context = $Listener.GetContext()
            $req = $context.Request
            $res = $context.Response

            $res.Headers.Add("Access-Control-Allow-Origin", "*")
            $res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            $res.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
            $res.ContentType = "application/json; charset=utf-8"

            if ($req.HttpMethod -eq "OPTIONS") {
                $res.StatusCode = 200
                $res.Close()
                continue
            }

            $activeRoom = ""
            if ([System.IO.File]::Exists($StatusPath)) {
                try {
                    $sRaw = [System.IO.File]::ReadAllText($StatusPath, [System.Text.Encoding]::UTF8)
                    $sObj = $sRaw | ConvertFrom-Json
                    if ($sObj.active_room) { $activeRoom = [string]$sObj.active_room }
                } catch {}
            }

            $path = $req.Url.AbsolutePath
            if ($path -like "/api/notices*") {
                $content = "[]"
                if ([System.IO.File]::Exists($DataPath)) {
                    try {
                        $fs = [System.IO.FileStream]::new($DataPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
                        $sr = [System.IO.StreamReader]::new($fs, [System.Text.Encoding]::UTF8)
                        $content = $sr.ReadToEnd()
                        $sr.Close()
                        $fs.Close()
                    } catch {}
                }
                $trimmed = $content.Trim()
                if ([string]::IsNullOrWhiteSpace($trimmed)) {
                    $content = "[]"
                } elseif ($trimmed.StartsWith("{")) {
                    $content = "[" + $trimmed + "]"
                }

                $count = 0
                try {
                    $arr = $content | ConvertFrom-Json
                    if ($arr) { $count = $arr.Count }
                } catch {}

                $safeRoom = $activeRoom.Replace('\', '\\').Replace('"', '\"')
                $json = '{"status":"ok","count":' + $count + ',"active_room":"' + $safeRoom + '","notices":' + $content + '}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
            } elseif ($path -like "/api/config*") {
                if ($req.HttpMethod -eq "POST") {
                    try {
                        $sr = [System.IO.StreamReader]::new($req.InputStream, [System.Text.Encoding]::UTF8)
                        $body = $sr.ReadToEnd()
                        $sr.Close()
                        if (![string]::IsNullOrWhiteSpace($body)) {
                            $postObj = $body | ConvertFrom-Json
                            if ($postObj.target_rooms) {
                                $cfgRaw = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8)
                                $cfgObj = $cfgRaw | ConvertFrom-Json
                                $cfgObj.target_rooms = @($postObj.target_rooms)
                                if ($postObj.max_history_count) {
                                    $cfgObj.max_history_count = [int]$postObj.max_history_count
                                }
                                if ($postObj.ignore_rooms) {
                                    $cfgObj.ignore_rooms = @($postObj.ignore_rooms)
                                }
                                if ($cfgObj.ignore_rooms) {
                                    $filteredIg = @()
                                    foreach ($ig in $cfgObj.ignore_rooms) {
                                        $igClean = $ig.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "")
                                        $conflict = $false
                                        foreach ($tr in $cfgObj.target_rooms) {
                                            $trClean = $tr.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "")
                                            if ($trClean.Contains($igClean) -or $igClean.Contains($trClean)) {
                                                $conflict = $true
                                                break
                                            }
                                        }
                                        if (-not $conflict) { $filteredIg += $ig }
                                    }
                                    $cfgObj.ignore_rooms = $filteredIg
                                }
                                $newJson = $cfgObj | ConvertTo-Json -Depth 5
                                [System.IO.File]::WriteAllText($ConfigPath, $newJson, [System.Text.Encoding]::UTF8)
                            }
                        }
                    } catch {}
                }

                $content = "{}"
                if ([System.IO.File]::Exists($ConfigPath)) {
                    try {
                        $content = [System.IO.File]::ReadAllText($ConfigPath, [System.Text.Encoding]::UTF8)
                    } catch {}
                }
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($content)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
            } elseif ($path -like "/api/status*") {
                $count = 0
                if ([System.IO.File]::Exists($DataPath)) {
                    try {
                        $fs = [System.IO.FileStream]::new($DataPath, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
                        $sr = [System.IO.StreamReader]::new($fs, [System.Text.Encoding]::UTF8)
                        $raw = $sr.ReadToEnd()
                        $sr.Close()
                        $fs.Close()
                        $arr = $raw | ConvertFrom-Json
                        if ($arr) { $count = $arr.Count }
                    } catch {}
                }
                $safeRoom = $activeRoom.Replace('\', '\\').Replace('"', '\"')
                $json = '{"status":"ok","collector_running":true,"collected_count":' + $count + ',"active_room":"' + $safeRoom + '"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
            } elseif ($path -like "/api/clear*") {
                try {
                    $fs = [System.IO.FileStream]::new($DataPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write, [System.IO.FileShare]::ReadWrite)
                    $sw = [System.IO.StreamWriter]::new($fs, [System.Text.Encoding]::UTF8)
                    $sw.Write("[]")
                    $sw.Flush()
                    $sw.Close()
                    $fs.Close()
                } catch {}
                $json = '{"status":"ok","message":"cleared"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
            } elseif ($path -like "/api/restart*") {
                $json = '{"status":"ok","message":"restarting"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
                try { $res.Close() } catch {}
                try { $Listener.Stop() } catch {}
                try { $Listener.Close() } catch {}
                Start-Sleep -Milliseconds 150

                try {
                    $parentDir = Split-Path -Parent $ScriptDir
                    $vbsPath = Join-Path $parentDir "tee82_silent_runner.vbs"
                    if (Test-Path $vbsPath) {
                        Start-Process "wscript.exe" -ArgumentList "`"$vbsPath`"" -WindowStyle Hidden
                    }
                } catch {}

                Start-Sleep -Milliseconds 200
                try {
                    if ($MainPid) { Stop-Process -Id $MainPid -Force -ErrorAction SilentlyContinue }
                } catch {}
                try { [System.Diagnostics.Process]::GetCurrentProcess().Kill() } catch {}
                return
            } elseif ($path -like "/api/stop*" -or $path -like "/api/shutdown*" -or $path -like "/api/exit*") {
                $json = '{"status":"ok","message":"stopped"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
                try { $res.Close() } catch {}
                try { $Listener.Stop() } catch {}
                try { $Listener.Close() } catch {}
                Start-Sleep -Milliseconds 150
                try {
                    if ($MainPid) { Stop-Process -Id $MainPid -Force -ErrorAction SilentlyContinue }
                } catch {}
                try {
                    Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*kakaotalk_collector.ps1*" } | ForEach-Object {
                        Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
                    }
                } catch {}
                try { [System.Diagnostics.Process]::GetCurrentProcess().Kill() } catch {}
                return
            } else {
                $res.StatusCode = 404
                $json = '{"status":"error","message":"not found"}'
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
                $res.OutputStream.Flush()
            }
            try { $res.Close() } catch {}
        } catch {}
    }
}

# Launch Background Server
$rs = [runspacefactory]::CreateRunspace()
$rs.Open()
$psServer = [powershell]::Create()
$psServer.Runspace = $rs
[void]$psServer.AddScript($HttpServerScript).AddArgument($Port).AddArgument($DataPath).AddArgument($ConfigPath).AddArgument($StatusPath).AddArgument($PID)
$asyncServer = $psServer.BeginInvoke()

# ==============================================================================
# ENGINE 2: KakaoTalk Dedicated Monitor (Main Thread)
# ==============================================================================
$CollectedNotices = [System.Collections.Generic.List[object]]::new()
$SeenHashes = [System.Collections.Generic.HashSet[string]]::new()
$global:ActiveWindowTitle = ""

# Load existing records
if (Test-Path $DataPath) {
    try {
        $savedRaw = [System.IO.File]::ReadAllText($DataPath, [System.Text.Encoding]::UTF8)
        $saved = $savedRaw | ConvertFrom-Json
        if ($saved) {
            foreach ($item in $saved) {
                [void]$CollectedNotices.Add($item)
                if ($item.hash) { [void]$SeenHashes.Add($item.hash) }
            }
        }
    } catch {}
}

function Save-NoticesToFile {
    try {
        $json = "[]"
        if ($CollectedNotices.Count -eq 1) {
            $json = "[" + ($CollectedNotices[0] | ConvertTo-Json -Depth 5) + "]"
        } elseif ($CollectedNotices.Count -gt 1) {
            $json = $CollectedNotices | ConvertTo-Json -Depth 5
        }
        $fs = [System.IO.FileStream]::new($DataPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write, [System.IO.FileShare]::ReadWrite)
        $sw = [System.IO.StreamWriter]::new($fs, [System.Text.Encoding]::UTF8)
        $sw.Write($json)
        $sw.Flush()
        $sw.Close()
        $fs.Close()
    } catch {}
}

function Test-IsGolfNotice {
    param([string]$text)
    if ([string]::IsNullOrWhiteSpace($text) -or $text.Trim().Length -lt 8) { return $false }
    $clean = $text.Trim()

    try {
        # 1. Strictly reject booking confirmations / alimtalk
        if ($clean -match '\[\uC608\uC57D\uD655\uC815\]' -or $clean -match '\uC54C\uB9BC\uD1A1\s*\uB3C4\uCC29' -or $clean -match '\uACE0\uAC1D\uBC88\uD638\s*:' -or $clean -match '\uC608\uC57D\uC790\s*:\s*\S+\uB2D8') {
            return $false
        }

        if ($Config.ignore_prefixes) {
            foreach ($pre in $Config.ignore_prefixes) {
                if ($clean.StartsWith($pre)) { return $false }
            }
        }
        if ($Config.ignore_exact) {
            foreach ($exact in $Config.ignore_exact) {
                if ($clean -eq $exact) { return $false }
            }
        }

        $hasKeyword = $false
        if (![string]::IsNullOrEmpty($Config.keyword_regex)) {
            $hasKeyword = $clean -match $Config.keyword_regex
        }

        $hasDate = $false
        if (![string]::IsNullOrEmpty($Config.date_regex)) {
            $hasDate = $clean -match $Config.date_regex
        } else {
            $hasDate = $clean -match '(\d{1,2}[./\-]\d{1,2})'
        }

        $hasPrice = $false
        if (![string]::IsNullOrEmpty($Config.price_regex)) {
            $hasPrice = $clean -match $Config.price_regex
        }

        $hasTime = $false
        if (![string]::IsNullOrEmpty($Config.time_regex)) {
            $hasTime = $clean -match $Config.time_regex
        }

        if ($hasKeyword -and ($hasPrice -or $hasDate)) { return $true }
        if ($hasDate -and $hasTime -and $hasPrice) { return $true }
    } catch {
        return $false
    }
    return $false
}

function Parse-ChatLogIntoNotices {
    param([string]$chatLog, [string]$roomName, [int]$maxCount = 1000)
    $msgs = [System.Collections.Generic.List[object]]::new()
    if ([string]::IsNullOrWhiteSpace($chatLog)) { return @() }

    # ChatLog MUST contain KakaoTalk message author/timestamp headers: e.g. [홍길동] [오후 1:23]
    if ($chatLog -notmatch '\[[^\]\r\n]+\]\s*\[[^\]\r\n]*\d{1,2}:\d{2}\]') {
        return @()
    }

    # Split chat history by KakaoTalk author/timestamp headers: e.g. [이름] [시간]
    $chunks = [System.Text.RegularExpressions.Regex]::Split($chatLog, "(?=\r?\n\[[^\]\r\n]+\]\s*\[[^\]\r\n]+\])")
    
    # Process from newest chunk (end of list) backwards to oldest (ensures most recent 1000 notices)
    for ($i = $chunks.Count - 1; $i -ge 0; $i--) {
        $c = $chunks[$i].Trim()
        # Strictly verify that each individual chunk starts with a valid KakaoTalk header!
        if ($c.Length -ge 8 -and ($c -match '^\[[^\]\r\n]+\]\s*\[[^\]\r\n]*\d{1,2}:\d{2}\]') -and (Test-IsGolfNotice $c)) {
            $msgs.Add(@{
                room = $roomName
                text = $c
            })
            if ($msgs.Count -ge $maxCount) {
                break
            }
        }
    }

    # Reverse so list is in chronological order (oldest of the recent 1000 -> newest at the end)
    $msgs.Reverse()
    return $msgs.ToArray()
}

function Get-KakaoMessages {
    $messages = @()
    $foundTitles = @()

    $keywords = [System.Collections.Generic.List[string]]::new()
    if ($Config.target_rooms -and $Config.target_rooms.Count -gt 0) {
        foreach ($t in $Config.target_rooms) {
            if (-not [string]::IsNullOrWhiteSpace($t)) { [void]$keywords.Add($t.Trim()) }
        }
    } elseif ($Config.auto_detect_golf_rooms -and $Config.auto_room_keywords) {
        foreach ($ak in $Config.auto_room_keywords) {
            if (-not [string]::IsNullOrWhiteSpace($ak) -and -not $keywords.Contains($ak.Trim())) {
                [void]$keywords.Add($ak.Trim())
            }
        }
    }

    $ignoreList = [System.Collections.Generic.List[string]]::new()
    if ($Config.ignore_rooms) {
        foreach ($ig in $Config.ignore_rooms) {
            if (-not [string]::IsNullOrWhiteSpace($ig)) {
                $igClean = $ig.Trim().ToLower().Replace(" ", "").Replace("_", "").Replace("-", "")
                $isTargeted = $false
                foreach ($kw in $keywords) {
                    $kwClean = $kw.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "")
                    if ($kwClean.Contains($igClean) -or $igClean.Contains($kwClean)) {
                        $isTargeted = $true
                        break
                    }
                }
                if (-not $isTargeted) {
                    [void]$ignoreList.Add($ig.Trim())
                }
            }
        }
    }

    if ($hasWin32Helper) {
        try {
            $kwArray = [string[]]$keywords.ToArray()
            $igArray = [string[]]$ignoreList.ToArray()
            $matchedWins = [Tee82Win32]::FindTargetWindows($kwArray, $igArray)

            foreach ($mw in $matchedWins) {
                $wTitle = $mw.Title
                if ([string]::IsNullOrWhiteSpace($wTitle)) { continue }

                # Check if this window matches an explicit target
                $wClean = $wTitle.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "").Replace("[", "").Replace("]", "").Replace("(", "").Replace(")", "")
                $isExplicitTarget = $false
                foreach ($kw in $keywords) {
                    $kwClean = $kw.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "")
                    if ($wClean.Contains($kwClean)) {
                        $isExplicitTarget = $true
                        break
                    }
                }

                # Check ignored rooms only if NOT an explicit target
                $isIgnored = $false
                if (-not $isExplicitTarget -and $igArray.Length -gt 0) {
                    foreach ($ig in $igArray) {
                        $igClean = $ig.ToLower().Replace(" ", "").Replace("_", "").Replace("-", "").Replace("[", "").Replace("]", "").Replace("(", "").Replace(")", "")
                        if (-not [string]::IsNullOrEmpty($igClean) -and $wClean.Contains($igClean)) {
                            $isIgnored = $true
                            break
                        }
                    }
                }
                if ($isIgnored) { continue }

                $foundTitles += $wTitle

                # METHOD 1: Direct Win32 PostKeyEx RPA (Ctrl+A, Ctrl+C to EVA_VH_ListControl_Dblclk)
                try {
                    $hList = [Tee82Win32]::FindChatListControl($mw.Hwnd)
                    if ($hList -ne [IntPtr]::Zero) {
                        [void][Tee82Win32]::TriggerCopyChat($mw.Hwnd, $hList)
                        Start-Sleep -Milliseconds 250
                    }
                } catch {
                    Write-CollectorLog ("RPA chat copy error: " + $_)
                }
            }
        } catch {
            Write-CollectorLog ("Win32 FindTargetWindows error: " + $_)
        }
    }

    # CLIPBOARD INGESTION:
    # 1. Background RPA automatic copy
    # 2. User in KakaoTalk pressing Ctrl+A, Ctrl+C after scrolling
    # 3. User right-clicking a message bubble and clicking '복사'
    try {
        if ([System.Windows.Forms.Clipboard]::ContainsText()) {
            $clipContent = [System.Windows.Forms.Clipboard]::GetText()
            if (-not [string]::IsNullOrWhiteSpace($clipContent) -and $clipContent.Length -ge 8) {
                $targetRoomName = if ($foundTitles.Count -gt 0) { $foundTitles[0] } else { "골프락_그린피방" }

                # Check A: Standard KakaoTalk multi-message chat log with headers: [이름] [시간]
                if ($clipContent -match '\[[^\]\r\n]+\]\s*\[[^\]\r\n]*\d{1,2}:\d{2}\]') {
                    $parsedFromClip = Parse-ChatLogIntoNotices $clipContent $targetRoomName $Config.max_history_count
                    if ($parsedFromClip -and $parsedFromClip.Count -gt 0) {
                        $messages += $parsedFromClip
                    }
                }
                # Check B: Single message copied without headers (e.g. right-click message -> '복사')
                elseif ($foundTitles.Count -gt 0 -and (Test-IsGolfNotice $clipContent)) {
                    $messages += @{
                        room = $targetRoomName
                        text = $clipContent.Trim()
                    }
                }
            }
        }
    } catch {}

    $global:ActiveWindowTitle = $foundTitles -join ", "
    Update-StatusFile $global:ActiveWindowTitle $CollectedNotices.Count
    return $messages
}

$md5 = [System.Security.Cryptography.MD5]::Create()
$lastLoggedRoom = $null

$lastCfgWrite = [DateTime]::MinValue
if (Test-Path $ConfigPath) {
    try { $lastCfgWrite = (Get-Item $ConfigPath).LastWriteTimeUtc } catch {}
}

Write-CollectorLog "Entering main monitoring loop..."

while ($true) {
    try {
        # Check if config.json was modified dynamically (Live Hot-Reloading!)
        if (Test-Path $ConfigPath) {
            try {
                $curWrite = (Get-Item $ConfigPath).LastWriteTimeUtc
                if ($curWrite -ne $lastCfgWrite) {
                    $lastCfgWrite = $curWrite
                    Load-CollectorConfig
                    $lastLoggedRoom = $null
                    Write-CollectorLog ("Config reloaded: " + ($Config.target_rooms -join ', '))

                    # If explicit target_rooms are configured, prune notices from untargeted rooms
                    if ($Config.target_rooms -and $Config.target_rooms.Count -gt 0) {
                        $toRemove = @()
                        foreach ($it in $CollectedNotices) {
                            $match = $false
                            foreach ($tr in $Config.target_rooms) {
                                if ($it.room -and $it.room.Contains($tr)) {
                                    $match = $true
                                    break
                                }
                            }
                            if (-not $match) { $toRemove += $it }
                        }
                        if ($toRemove.Count -gt 0) {
                            foreach ($rem in $toRemove) {
                                [void]$CollectedNotices.Remove($rem)
                                if ($rem.hash) { [void]$SeenHashes.Remove($rem.hash) }
                            }
                            Save-NoticesToFile
                            Update-StatusFile $global:ActiveWindowTitle $CollectedNotices.Count
                            Write-CollectorLog ("Pruned " + $toRemove.Count + " notices from previous untargeted rooms.")
                        }
                    }
                }
            } catch {}
        }

        # Collect Messages from KakaoTalk
        $msgs = Get-KakaoMessages

        if ($global:ActiveWindowTitle -ne $lastLoggedRoom) {
            $lastLoggedRoom = $global:ActiveWindowTitle
            if (![string]::IsNullOrEmpty($global:ActiveWindowTitle)) {
                $fmtConn = if ($Config.messages.monitor_connected) { $Config.messages.monitor_connected } else { "[연결 성공] 감시 대상 채팅방: {0}" }
                $txtGuide = if ($Config.messages.monitor_guide) { $Config.messages.monitor_guide } else { "  -> 카톡방에서 위로 스크롤 후 대화창 클릭 + Ctrl+A, Ctrl+C 또는 공지 우클릭 '복사' 시 즉시 수집됩니다." }
                Write-Host ""
                Write-Host ($fmtConn -f $global:ActiveWindowTitle) -ForegroundColor Green
                Write-Host $txtGuide -ForegroundColor Yellow
                Write-Host ""
                Write-CollectorLog ("Connected to room: " + $global:ActiveWindowTitle)
            } else {
                $fmtWait = if ($Config.messages.monitor_waiting) { $Config.messages.monitor_waiting } else { "[대기 중] 카톡 채팅방을 열어주세요... ({0})" }
                Write-Host ""
                Write-Host ($fmtWait -f ($Config.target_rooms -join ', ')) -ForegroundColor Yellow
                Write-CollectorLog "Waiting for room window... (no target room open)"
            }
        }

        # Check if notices file was emptied outside (e.g. /api/clear)
        if (Test-Path $DataPath) {
            try {
                $fi = Get-Item $DataPath
                if ($fi.Length -le 4 -and $CollectedNotices.Count -gt 0) {
                    $CollectedNotices.Clear()
                    $SeenHashes.Clear()
                    Write-CollectorLog "Notices reset detected from file. Cleared internal state."
                }
            } catch {}
        }

        $newNoticesCount = 0
        foreach ($m in $msgs) {
            $rawText = $m.text
            if (-not (Test-IsGolfNotice $rawText)) { continue }

            # Compute MD5 Hash
            $cleanNormalized = ($rawText -replace '\s+', ' ').Trim()
            $hBytes = $md5.ComputeHash([System.Text.Encoding]::UTF8.GetBytes($cleanNormalized))
            $hStr = [BitConverter]::ToString($hBytes) -replace '-'

            if ($SeenHashes.Contains($hStr)) { continue }

            [void]$SeenHashes.Add($hStr)
            $nowStr = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

            $entry = @{
                id = ("kakao_" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() + "_" + [System.Guid]::NewGuid().ToString("N").Substring(0, 4))
                hash = $hStr
                room = $m.room
                text = $rawText
                collected_at = $nowStr
            }

            [void]$CollectedNotices.Add($entry)
            while ($CollectedNotices.Count -gt $Config.max_history_count) {
                $oldItem = $CollectedNotices[0]
                [void]$CollectedNotices.RemoveAt(0)
                if ($oldItem.hash) { [void]$SeenHashes.Remove($oldItem.hash) }
            }
            $newNoticesCount++

            $firstLine = ($rawText -split "`n")[0].Trim()
            $first50 = $firstLine.Substring(0, [Math]::Min(50, $firstLine.Length))
            $fmtNew = if ($Config.messages.monitor_new_notice) { $Config.messages.monitor_new_notice } else { "[새 공지 수집!] [{0}] {1}..." }
            Write-Host "`n$($fmtNew -f $m.room, $first50)" -ForegroundColor Cyan
        }

        if ($newNoticesCount -gt 0) {
            Save-NoticesToFile
            Update-StatusFile $global:ActiveWindowTitle $CollectedNotices.Count
            $fmtTot = if ($Config.messages.monitor_total_count) { $Config.messages.monitor_total_count } else { "  ==> 총 {0}건 공지 수집 완료 (JSON 저장됨)" }
            Write-Host ($fmtTot -f $CollectedNotices.Count) -ForegroundColor Green
            Write-CollectorLog ("Collected $newNoticesCount new notices. Current total: " + $CollectedNotices.Count)
        } else {
            $timeStr = (Get-Date).ToString("HH:mm:ss")
            $fmtHb = if ($Config.messages.monitor_heartbeat) { $Config.messages.monitor_heartbeat } else { "[{0}] 실시간 감시 중... (현재 수집된 공지: {1}건)   " }
            Write-Host -NoNewline "`r$($fmtHb -f $timeStr, $CollectedNotices.Count)"
        }
    } catch {
        Write-CollectorLog ("Loop error: " + $_)
    }

    Start-Sleep -Seconds $Config.poll_interval_sec
}
