# Generates js/config.js from .env (browsers cannot read .env directly).
# PINs are NOT written to the browser config any more; they are only used by scripts\seed-firebase.ps1.
$root = Split-Path $PSScriptRoot -Parent
$envFile = Join-Path $root ".env"
if (-not (Test-Path $envFile)) { Write-Error ".env not found. Copy .env.example to .env first."; exit 1 }
$v = @{}
foreach ($line in Get-Content $envFile -Encoding UTF8) {
  if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
  $k, $val = $line -split '=', 2
  $v[$k.Trim()] = $val.Trim()
}
$fb = @(
 @('apiKey','FB_API_KEY'),@('authDomain','FB_AUTH_DOMAIN'),@('projectId','FB_PROJECT_ID'),
 @('storageBucket','FB_STORAGE_BUCKET'),@('messagingSenderId','FB_MESSAGING_SENDER_ID'),
 @('appId','FB_APP_ID'),@('measurementId','FB_MEASUREMENT_ID')
) | ForEach-Object { "    $($_[0]): `"$($v[$_[1]])`"" }
$out = "// AUTO-GENERATED from .env by scripts/build-config.ps1 - do not edit. Contains only the PUBLIC Firebase web config, so it is committed and deployed.`nwindow.APP_CONFIG = {`n  DRIVE_URL: `"$($v['DRIVE_URL'])`",`n  FIREBASE: {`n$($fb -join ",`n")`n  }`n};`n"
[IO.File]::WriteAllText((Join-Path $root "js\config.js"), $out, (New-Object Text.UTF8Encoding($false)))
Write-Host "js/config.js generated."