# Tiny local web server (no Python/Node needed). Usage:
#   powershell -ExecutionPolicy Bypass -File scripts\serve.ps1
# Then open http://localhost:5500  (Ctrl+C to stop)
$root = Split-Path $PSScriptRoot -Parent
$port = 5500
$types = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8';
            '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.png'='image/png'; '.svg'='image/svg+xml'; '.json'='application/json'; '.ico'='image/x-icon' }
$l = New-Object Net.HttpListener
$l.Prefixes.Add("http://localhost:$port/")
$l.Start()
Write-Host "Serving $root at http://localhost:$port  (Ctrl+C to stop)"
Start-Process "http://localhost:$port"
try {
  while ($l.IsListening) {
    $ctx = $l.GetContext()
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if (-not $rel) { $rel = 'index.html' }
    $path = [IO.Path]::GetFullPath((Join-Path $root $rel))
    if ($path.StartsWith($root) -and (Test-Path $path -PathType Leaf) -and ($rel -notmatch '(^|/)\.env')) {
      $ext = [IO.Path]::GetExtension($path).ToLower()
      $ctx.Response.ContentType = $(if ($types[$ext]) { $types[$ext] } else { 'application/octet-stream' })
      $bytes = [IO.File]::ReadAllBytes($path)
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else { $ctx.Response.StatusCode = 404 }
    $ctx.Response.Close()
  }
} finally { $l.Stop() }
