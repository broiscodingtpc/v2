# MetaPulse Startup Script
# Pornește toate serviciile MetaPulse cu configurațiile corecte

Write-Host "Starting MetaPulse Services..." -ForegroundColor Green

# Oprește toate procesele Node.js existente
Write-Host "Stopping existing Node.js processes..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Setează variabilele de mediu
Write-Host "Setting environment variables..." -ForegroundColor Yellow
$env:DATABASE_URL = "postgresql://postgres:KyMVHhSuWCVXZzERpSvbflikFnueIxZa@postgres.railway.internal:5432/railway"
$env:JWT_SECRET = "metapulse-jwt-secret-2024-production-key"
$env:REDIS_PUBLIC_URL = "redis://default:xcnucdBhhCzywdafCiUpXCiZsPiDhUZS@shortline.proxy.rlwy.net:47678"
$env:NEXT_PUBLIC_API_URL = "http://localhost:3000"
$env:NEXT_PUBLIC_WS_URL = "ws://localhost:3000"

# Pornește API-ul pe portul 3000
Write-Host "Starting API server on port 3000..." -ForegroundColor Cyan
$env:PORT = "3000"
Start-Process -FilePath "node" -ArgumentList "dist/main.js" -WorkingDirectory "D:\metapulsev2\apps\api" -WindowStyle Minimized

# Așteaptă ca API-ul să pornească
Write-Host "Waiting for API to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Testează API-ul
Write-Host "Testing API connection..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "API is running successfully!" -ForegroundColor Green
    }
} catch {
    Write-Host "API failed to start properly" -ForegroundColor Red
}

# Pornește aplicația web pe portul 3001
Write-Host "Starting Web application on port 3001..." -ForegroundColor Cyan
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "D:\metapulsev2\apps\web" -WindowStyle Minimized

# Așteaptă ca aplicația web să pornească
Write-Host "Waiting for Web app to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Testează aplicația web
Write-Host "Testing Web application..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "Web application is running successfully!" -ForegroundColor Green
    }
} catch {
    Write-Host "Web application failed to start properly" -ForegroundColor Red
}

Write-Host ""
Write-Host "MetaPulse Services Started!" -ForegroundColor Green
Write-Host "Web Application: http://localhost:3000" -ForegroundColor White
Write-Host "API Server: http://localhost:3000/api" -ForegroundColor White
Write-Host "Health Check: http://localhost:3000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host