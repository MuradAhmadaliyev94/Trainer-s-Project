# Creates one Firebase Auth account per trainer (id@trainers.app, password "tp-<PIN>") from .env.
# Safe to re-run: existing accounts are skipped. Requires Email/Password sign-in enabled in the console.
$root = Split-Path $PSScriptRoot -Parent
$v=@{}; foreach($l in Get-Content (Join-Path $root ".env") -Encoding UTF8){ if($l -match '^\s*#' -or $l -notmatch '='){continue}; $k,$x=$l -split '=',2; $v[$k.Trim()]=$x.Trim() }
$key=$v['FB_API_KEY']
foreach($k in ($v.Keys | Where-Object { $_ -match '^PIN_T\d+$' } | Sort-Object)){
  $id=($k -replace '^PIN_','').ToLower(); $email="$id@trainers.app"; $pw="tp-"+$v[$k]
  $body=@{email=$email;password=$pw;returnSecureToken=$false}|ConvertTo-Json
  try{
    Invoke-RestMethod -Method Post -Uri "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=$key" -ContentType "application/json" -Body $body | Out-Null
    Write-Host "created  $email"
  }catch{
    $msg=$_.ErrorDetails.Message; if(-not $msg -and $_.Exception.Response){ $msg=(New-Object IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() }
    if($msg -match 'EMAIL_EXISTS'){ Write-Host "exists   $email" }
    else { Write-Host "FAILED   $email : $msg" -ForegroundColor Red }
  }
}