SET ASPNETCORE_ENVIRONMENT=Development
SET LAUNCHER_PATH=bin\Debug\net5.0\API.exe
cd /d "C:\Program Files\IIS Express\"
iisexpress.exe /config:"C:\Users\scott.lissone\Desktop\DatingAppFolder\.vscode\config\applicationhost.config" /site:"DatingApp" /apppool:"Clr4IntegratedAppPool"
PAUSE