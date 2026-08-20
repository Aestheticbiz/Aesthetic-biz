@echo off
setlocal
set "BROWSER=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%BROWSER%" set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%BROWSER%" set "BROWSER=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if not exist "%BROWSER%" (
  echo Chrome or Edge could not be found. Edit this file and set BROWSER to the correct path.
  pause
  exit /b 1
)
set "OUTPUT=%~1"
if "%OUTPUT%"=="" set "OUTPUT=audit-report.pdf"
for %%I in ("%cd%\index.html") do set "PAGE=file:///%%~fI"
"%BROWSER%" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="%cd%\%OUTPUT%" "%PAGE%"
echo PDF created: %OUTPUT%
pause
