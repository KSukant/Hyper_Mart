from PIL import Image
import os

im = Image.open(r"d:\hypermart-web\reference_pages_60\page_01.png")
print("page_01 size:", im.size)
w, h = im.size

# Let's crop the left hero image without the text overlay if possible or the left half
# Or we can crop the left 58% of the image
left_hero = im.crop((0, 0, int(w * 0.58), h))
os.makedirs(r"d:\hypermart-web\hypermart-web\public\warehouse", exist_ok=True)
left_hero.save(r"d:\hypermart-web\hypermart-web\public\warehouse\login-hero.jpg", quality=95)
print("Saved login-hero.jpg")
