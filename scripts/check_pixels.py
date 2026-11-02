from PIL import Image

im = Image.open(r"d:\hypermart-web\reference_pages_60\page_02.png")
print("Row at y=300 from x=0 to 300, step 15:")
for x in range(0, 300, 15):
    print(f"x={x}: {im.getpixel((x, 300))}")

print("\nColumn at x=50 from y=0 to 800, step 40:")
for y in range(0, 800, 40):
    print(f"y={y}: {im.getpixel((x, y))}")

