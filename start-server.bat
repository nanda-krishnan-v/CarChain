@echo off
echo ========================================
echo Starting Local Server for Car Registry DApp
echo ========================================
echo.
echo Server will be available at: http://localhost:8000
echo.
echo Make sure MetaMask is installed and unlocked!
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

python -m http.server 8000

if errorlevel 1 (
    echo.
    echo Python not found. Trying alternative methods...
    echo.
    if exist "C:\Program Files\nodejs\node.exe" (
        echo Using Node.js...
        npx --yes http-server -p 8000
    ) else (
        echo.
        echo ERROR: Neither Python nor Node.js found!
        echo Please install Python or Node.js to run the server.
        echo.
        pause
    )
)

