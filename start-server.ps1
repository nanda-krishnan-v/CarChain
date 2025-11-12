Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Local Server for Car Registry DApp" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will be available at: http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Make sure MetaMask is installed and unlocked!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Try Python first
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Using Python HTTP Server..." -ForegroundColor Green
    python -m http.server 8000
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    Write-Host "Using Python3 HTTP Server..." -ForegroundColor Green
    python3 -m http.server 8000
} else {
    Write-Host "Python not found. Trying Node.js..." -ForegroundColor Yellow
    
    # Try Node.js
    if (Get-Command node -ErrorAction SilentlyContinue) {
        if (Get-Command npx -ErrorAction SilentlyContinue) {
            Write-Host "Using Node.js http-server..." -ForegroundColor Green
            npx --yes http-server -p 8000
        } else {
            Write-Host ""
            Write-Host "ERROR: npx not found!" -ForegroundColor Red
            Write-Host "Please install Node.js or Python to run the server." -ForegroundColor Red
            Write-Host ""
            Read-Host "Press Enter to exit"
        }
    } else {
        Write-Host ""
        Write-Host "ERROR: Neither Python nor Node.js found!" -ForegroundColor Red
        Write-Host "Please install one of the following:" -ForegroundColor Red
        Write-Host "  - Python: https://www.python.org/downloads/" -ForegroundColor Yellow
        Write-Host "  - Node.js: https://nodejs.org/" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Press Enter to exit"
    }
}

