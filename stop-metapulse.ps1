# MetaPulse Stop Script
# Oprește toate serviciile MetaPulse

Write-Host "🛑 Stopping MetaPulse Services..." -ForegroundColor Red

# Oprește toate procesele Node.js
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "✅ All MetaPulse services stopped!" -ForegroundColor Green
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host