@echo off
echo ========================================
echo    HabitHero - Local Development Server
echo ========================================
echo.

REM Try Python first
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Python...
    echo.
    echo Open your browser to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Try Python3
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Python3...
    echo.
    echo Open your browser to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python3 -m http.server 8000
    goto :end
)

REM Try Node.js npx
where npx >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Starting server with Node.js...
    echo.
    echo Open your browser to: http://localhost:3000
    echo Press Ctrl+C to stop the server
    echo.
    npx serve -l 3000
    goto :end
)

REM No server available - open file directly
echo No Python or Node.js found.
echo Opening index.html directly in browser...
echo (Note: Some PWA features may not work)
echo.
start index.html
goto :end

:end
pause
