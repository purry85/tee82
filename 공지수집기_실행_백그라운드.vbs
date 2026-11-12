' Tee82 KakaoTalk Collector Silent Launcher (No CMD Window)
Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
strDir = fso.GetParentFolderName(WScript.ScriptFullName)
strPs1 = strDir & "\kakaotalk_collector.ps1"

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
