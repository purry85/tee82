' Tee82 KakaoTalk Collector Silent Launcher (No CMD Window)
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strDir = fso.GetParentFolderName(WScript.ScriptFullName)
If strDir = "" Or Not fso.FolderExists(strDir) Then
    strDir = "C:\golfmon_extension\kakaotalk_bot"
End If
strPs1 = strDir & "\kakaotalk_collector.ps1"

' Check if stop, kill, or restart command requested via protocol (e.g. golftee82://restart or golftee82://stop)
If WScript.Arguments.Count > 0 Then
    strArg = LCase(WScript.Arguments(0))
    If InStr(strArg, "restart") > 0 Then
        cmdKill = "powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command ""Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*kakaotalk_collector*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }; $conns=Get-NetTCPConnection -LocalPort 18900 -ErrorAction SilentlyContinue; foreach($c in $conns){if($c.OwningProcess){Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue}}"""
        WshShell.Run cmdKill, 0, True
        WScript.Sleep 600
    ElseIf InStr(strArg, "stop") > 0 Or InStr(strArg, "kill") > 0 Or InStr(strArg, "exit") > 0 Then
        cmdKill = "powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -Command ""Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*kakaotalk_collector*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }; $conns=Get-NetTCPConnection -LocalPort 18900 -ErrorAction SilentlyContinue; foreach($c in $conns){if($c.OwningProcess){Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue}}"""
        WshShell.Run cmdKill, 0, True
        WScript.Quit 0
    End If
End If

' Check if already running on port 18900
bAlreadyRunning = False
On Error Resume Next
Set objHttp = CreateObject("MSXML2.ServerXMLHTTP.6.0")
If Err.Number = 0 Then
    objHttp.open "GET", "http://127.0.0.1:18900/api/status", False
    objHttp.setTimeouts 400, 400, 400, 400
    objHttp.send
    If Err.Number = 0 Then
        If objHttp.Status = 200 Then
            bAlreadyRunning = True
        End If
    End If
End If
Err.Clear
On Error GoTo 0

If bAlreadyRunning Then
    WScript.Quit 0
End If

' Launch silent PowerShell process in background (0 = hidden window)
cmd = "powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & strPs1 & """"
WshShell.Run cmd, 0, False
