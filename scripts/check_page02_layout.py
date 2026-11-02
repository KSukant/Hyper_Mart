from PIL import Image

im = Image.open(r"d:\hypermart-web\reference_pages_60\page_02.png")
# Top bar: (0, 0, 1092, 70)
# Sidebar: (20, 70, 230, 800)
# Top header of main: (240, 70, 1092, 140)
# First row of KPI cards: (240, 140, 1092, 280)

print("Top bar row at y=25 from x=20 to 1080 step 60:")
for x in range(20, 1080, 60):
    print(f"x={x}: {im.getpixel((x, 25))}")

print("\nSidebar column at x=100 from y=70 to 780 step 30:")
for y in range(70, 780, 30):
    print(f"y={y}: {im.getpixel((100, y))}")

