from PIL import Image

im = Image.open(r"d:\hypermart-web\reference_pages_60\page_02.png")
# Crop sidebar: 0, 0 to 240, 800
sidebar_crop = im.crop((0, 0, 240, 800))
sidebar_crop.save(r"d:\hypermart-web\hypermart-web\scripts\sidebar_ref_02.png")

# Also crop top header of page_02: 240, 0 to 1092, 100
header_crop = im.crop((240, 0, 1092, 100))
header_crop.save(r"d:\hypermart-web\hypermart-web\scripts\header_ref_02.png")

print("Saved crops.")

