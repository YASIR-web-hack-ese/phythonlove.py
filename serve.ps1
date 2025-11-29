# Helper: start a simple HTTP server and open the browser
# Run from project directory in PowerShell:
# .\serve.ps1

$port = 8000
Start-Process "http://localhost:$port"
python -m http.server $port
