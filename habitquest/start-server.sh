#!/bin/bash

echo "========================================"
echo "   HabitHero - Local Development Server"
echo "========================================"
echo ""

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Try Python3 first (macOS default)
if command -v python3 &> /dev/null; then
    echo "Starting server with Python3..."
    echo ""
    echo -e "Open your browser to: \033[36mhttp://localhost:8000\033[0m"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
    exit 0
fi

# Try Python
if command -v python &> /dev/null; then
    echo "Starting server with Python..."
    echo ""
    echo -e "Open your browser to: \033[36mhttp://localhost:8000\033[0m"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
    exit 0
fi

# Try Node.js
if command -v npx &> /dev/null; then
    echo "Starting server with Node.js..."
    echo ""
    echo -e "Open your browser to: \033[36mhttp://localhost:3000\033[0m"
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx serve -l 3000
    exit 0
fi

# Fallback
echo "No Python or Node.js found!"
echo "Install Python: brew install python"
echo "Or open index.html directly in your browser"
open index.html
