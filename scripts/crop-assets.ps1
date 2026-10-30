Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\H\.gemini\antigravity\brain\fd0a2a51-1e22-4ee1-8f12-6e23bd27567f\.user_uploaded\media_1793366833593_e8ca5242.jpg"
$src = [System.Drawing.Bitmap]::FromFile($inputPath)

Write-Host "Source image size: $($src.Width) x $($src.Height)"

# Crop the left supermarket hero image (from approx left: 0 to 35% width, from top to bottom)
# In the original image:
# Left hero card starts around x = 20, y = 60, width = 36% of total width, height = 80% of total height
$heroX = [int]($src.Width * 0.015)
$heroY = [int]($src.Height * 0.065)
$heroW = [int]($src.Width * 0.365)
$heroH = [int]($src.Height * 0.815)

$rect = New-Object System.Drawing.Rectangle($heroX, $heroY, $heroW, $heroH)
$heroCrop = $src.Clone($rect, $src.PixelFormat)

$outDir = "d:\hypermart-web\hypermart-web\public\landing"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$heroCrop.Save("$outDir\hero-store.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$heroCrop.Dispose()

# Also save the full reference image in landing for exact reference
$src.Save("$outDir\unified-workspace-ref.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also let's crop the individual card illustrations:
# Customer card illustration (x approx 40.5% to 54%, y approx 27% to 39%)
# Let's crop card 1 to card 7 if needed
function CropCardThumb($name, $xRatio, $yRatio, $wRatio, $hRatio) {
    $x = [int]($src.Width * $xRatio)
    $y = [int]($src.Height * $yRatio)
    $w = [int]($src.Width * $wRatio)
    $h = [int]($src.Height * $hRatio)
    $r = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $c = $src.Clone($r, $src.PixelFormat)
    $c.Save("$outDir\$name.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $c.Dispose()
    Write-Host "Cropped $name ($w x $h)"
}

# Row 1 cards:
CropCardThumb "card-customer" 0.407 0.278 0.134 0.106
CropCardThumb "card-admin" 0.550 0.278 0.134 0.106
CropCardThumb "card-support" 0.693 0.278 0.134 0.106
CropCardThumb "card-finance" 0.835 0.278 0.134 0.106

# Row 2 cards:
CropCardThumb "card-warehouse" 0.407 0.528 0.180 0.108
CropCardThumb "card-delivery" 0.598 0.528 0.180 0.108
CropCardThumb "card-operations" 0.789 0.528 0.180 0.108

$src.Dispose()
Write-Host "Asset cropping complete!"

