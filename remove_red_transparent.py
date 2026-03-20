import cv2
import numpy as np
from PIL import Image

# 1. Load the image (update path if needed)
input_path = "assets/images/background/string-light-base.png"
output_path = "assets/images/background/string-light-base-transparent.png"
img = cv2.imread(input_path)

# 2. Convert to HSV color space
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)


# 3. Create a mask for all warm hues (red/orange/yellow, very aggressive)
lower_warm = np.array([0, 0, 0])
upper_warm = np.array([35, 255, 255])
red_mask = cv2.inRange(hsv, lower_warm, upper_warm)

# 4. Invert mask to keep non-red areas
non_red_mask = cv2.bitwise_not(red_mask)

# 5. Add alpha channel: non-red = opaque, red = transparent
b, g, r = cv2.split(img)
alpha = non_red_mask
rgba = cv2.merge([b, g, r, alpha])

# 6. Save as PNG with transparency
cv2.imwrite(output_path, rgba)

# Optional: Convert to PIL and save (for extra compatibility)
# pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))
# pil_img.save(output_path)

print("Done! Transparent PNG saved as:", output_path)

# --- Adjusting Red Sensitivity ---
# To make the red detection more or less sensitive, change the lower/upper bounds:
# - Lower the S (saturation) or V (value) minimums to catch more faded reds.
# - Expand the H (hue) range to include more orange or pink if needed.
# Example: lower_red1 = np.array([0, 50, 30]), upper_red2 = np.array([180, 255, 255])
