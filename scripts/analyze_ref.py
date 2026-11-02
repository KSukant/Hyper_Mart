from PIL import Image
import os

img_path = r"d:\hypermart-web\reference_pages_60\page_02.png"
if os.path.exists(img_path):
    im = Image.open(img_path)
    print(f"Size: {im.size}")
    # sample some pixel colors
    # top-left corner
    print(f"(10, 10): {im.getpixel((10, 10))}")
    # sidebar area: x=50, y=100
    print(f"(50, 100): {im.getpixel((50, 100))}")
    # main header area: x=400, y=30
    print(f"(400, 30): {im.getpixel((400, 30))}")
    # main body area: x=400, y=200
    print(f"(400, 200): {im.getpixel((400, 200))}")

