from PIL import Image

def analyze(path):
    im = Image.open(path)
    w, h = im.size
    print(f"=== {path} ({w}x{h}) ===")
    
    # Check sidebar width by scanning horizontally at y=300
    green_start = -1
    green_end = -1
    for x in range(w):
        r, g, b = im.getpixel((x, 300))[:3]
        is_green = (g > 60 and g > r * 1.3 and g > b * 1.3) or (r < 30 and g > 60 and b < 60)
        if is_green:
            if green_start == -1:
                green_start = x
            green_end = x
        else:
            if green_start != -1 and green_end != -1 and x > green_end + 10:
                break
    print(f"Sidebar horizontal span at y=300: x={green_start} to x={green_end} (width={green_end - green_start + 1 if green_start != -1 else 0})")
    
    # Check sidebar vertical span at x=50
    green_top = -1
    green_bottom = -1
    for y in range(h):
        r, g, b = im.getpixel((50, y))[:3]
        is_green = (g > 50 and g > r) or (g > 80)
        if is_green:
            if green_top == -1:
                green_top = y
            green_bottom = y
    print(f"Sidebar vertical span at x=50: y={green_top} to y={green_bottom}")

    # Check top bar above main content at x=500
    print("Main content vertical colors at x=500:")
    for y in [10, 30, 50, 70, 100, 150, 200]:
        print(f"  y={y}: {im.getpixel((500, y))[:3]}")

analyze(r"d:\hypermart-web\reference_pages_60\page_02.png")
analyze(r"d:\hypermart-web\reference_pages_60\page_08.png")
analyze(r"d:\hypermart-web\reference_pages_60\page_25.png")

