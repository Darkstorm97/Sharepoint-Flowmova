param(
  [int]$Size = 512,
  [int]$CanvasWidth = 0,
  [int]$CanvasHeight = 0,
  [string]$OutputPath = (Join-Path $PSScriptRoot 'priority-banner-icon-512.png')
)

Add-Type -AssemblyName System.Drawing

function New-RoundedRectanglePath {
  param(
    [System.Drawing.RectangleF]$Rectangle,
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddArc($Rectangle.X, $Rectangle.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($Rectangle.X, $Rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-Brush([string]$Hex) {
  return [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml($Hex))
}

$canvas = [System.Drawing.Bitmap]::new(512, 512)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.Clear([System.Drawing.Color]::Transparent)

$navy = New-Brush '#13233E'
$white = New-Brush '#FFFFFF'
$orange = New-Brush '#FF8A1E'
$blue = New-Brush '#168AF4'
$aqua = New-Brush '#37CBD7'
$green = New-Brush '#2FB252'

$background = New-RoundedRectanglePath ([System.Drawing.RectangleF]::new(0, 0, 512, 512)) 112
$banner = New-RoundedRectanglePath ([System.Drawing.RectangleF]::new(64, 152, 384, 208)) 48
$graphics.FillPath($navy, $background)
$graphics.FillPath($white, $banner)

$graphics.SetClip($banner)
$graphics.FillRectangle($orange, 64, 152, 82, 208)
$graphics.ResetClip()

$graphics.FillEllipse($blue, 126, 206, 100, 100)
$alertStem = New-RoundedRectanglePath ([System.Drawing.RectangleF]::new(168, 220, 16, 48)) 8
$graphics.FillPath($white, $alertStem)
$graphics.FillEllipse($white, 167, 279, 18, 18)

$headline = New-RoundedRectanglePath ([System.Drawing.RectangleF]::new(246, 218, 142, 22)) 11
$detail = New-RoundedRectanglePath ([System.Drawing.RectangleF]::new(246, 270, 110, 18)) 9
$graphics.FillPath($navy, $headline)
$graphics.FillPath($aqua, $detail)

$graphics.FillEllipse($green, 370, 298, 84, 84)
$checkPen = [System.Drawing.Pen]::new([System.Drawing.Color]::White, 14)
$checkPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$checkPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$checkPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
$graphics.DrawLines($checkPen, @(
  [System.Drawing.PointF]::new(392, 340),
  [System.Drawing.PointF]::new(405, 353),
  [System.Drawing.PointF]::new(432, 324)
))

$targetWidth = if ($CanvasWidth -gt 0) { $CanvasWidth } else { $Size }
$targetHeight = if ($CanvasHeight -gt 0) { $CanvasHeight } else { $Size }

if ($targetWidth -ne 512 -or $targetHeight -ne 512) {
  $resized = [System.Drawing.Bitmap]::new($targetWidth, $targetHeight)
  $resizeGraphics = [System.Drawing.Graphics]::FromImage($resized)
  $resizeGraphics.Clear([System.Drawing.Color]::Transparent)
  $resizeGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $resizeGraphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $iconSize = [Math]::Min($targetWidth, $targetHeight)
  $offsetX = ($targetWidth - $iconSize) / 2
  $offsetY = ($targetHeight - $iconSize) / 2
  $resizeGraphics.DrawImage($canvas, $offsetX, $offsetY, $iconSize, $iconSize)
  $resizeGraphics.Dispose()
  $canvas.Dispose()
  $canvas = $resized
}

$outputDirectory = Split-Path -Parent $OutputPath
if ($outputDirectory) {
  [System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
}
$canvas.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$checkPen.Dispose()
$background.Dispose()
$banner.Dispose()
$alertStem.Dispose()
$headline.Dispose()
$detail.Dispose()
$navy.Dispose()
$white.Dispose()
$orange.Dispose()
$blue.Dispose()
$aqua.Dispose()
$green.Dispose()
$graphics.Dispose()
$canvas.Dispose()
