# HabitHero - Local Development Server (PowerShell)
Write-Host "========================================"
Write-Host "   HabitHero - Local Development Server"
Write-Host "========================================"
Write-Host ""

# Try Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starting server with Python..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Open your browser to: " -NoNewline
    Write-Host "http://localhost:8000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server"
    Write-Host ""
    python -m http.server 8000
    exit
}

# Try Node.js
if (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "Starting server with Node.js..." -ForegroundColor Green
    Write-Host ""
    Write-Host "Open your browser to: " -NoNewline
    Write-Host "http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server"
    Write-Host ""
    npx serve -l 3000
    exit
}

# Fallback - open directly
Write-Host "No Python or Node.js found." -ForegroundColor Yellow
Write-Host "Opening index.html directly..."
Write-Host "(Note: Some PWA features may not work)"
Start-Process "index.html"
