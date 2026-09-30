from pathlib import Path
from PIL import Image, ImageDraw

# Map waarin dit script staat
INPUT = Path(__file__).parent
OUTPUT = INPUT / "rounded"

# Hoekradius in pixels
RADIUS = 23

OUTPUT.mkdir(exist_ok=True)

files = [
    f for f in INPUT.iterdir()
    if f.is_file() and f.suffix.lower() == ".png"
]

print()
print("=" * 50)
print("  KAARTEN - TRANSPARANTE HOEKEN")
print("=" * 50)
print()
print(f"Kaarten gevonden: {len(files)}")
print(f"Hoekradius: {RADIUS}px")
print()

if not files:
    print("GEEN PNG-BESTANDEN GEVONDEN!")
    input("\nDruk op Enter om af te sluiten...")
    raise SystemExit

for file in files:
    print(f"Verwerken: {file.name}")

    try:
        # Open originele afbeelding
        image = Image.open(file).convert("RGBA")

        width, height = image.size

        print(f"  Afmetingen: {width} x {height}")

        # Maak een volledig transparant masker
        mask = Image.new("L", (width, height), 0)

        # Teken een witte afgeronde rechthoek
        draw = ImageDraw.Draw(mask)

        draw.rounded_rectangle(
            (0, 0, width - 1, height - 1),
            radius=RADIUS,
            fill=255
        )

        # Bestaande alpha behouden en combineren met masker
        alpha = image.getchannel("A")

        # Vermenigvuldig bestaande alpha met het masker
        new_alpha = Image.new("L", (width, height), 0)

        alpha_pixels = alpha.load()
        mask_pixels = mask.load()
        new_alpha_pixels = new_alpha.load()

        for y in range(height):
            for x in range(width):
                new_alpha_pixels[x, y] = (
                    alpha_pixels[x, y] * mask_pixels[x, y] // 255
                )

        image.putalpha(new_alpha)

        # Opslaan
        destination = OUTPUT / file.name
        image.save(destination, "PNG")

        print(f"  OK -> {destination.name}")

    except Exception as error:
        print(f"  FOUT: {error}")

print()
print("=" * 50)
print("KLAAR")
print("=" * 50)
print()
print(f"De nieuwe kaarten staan in:")
print(OUTPUT)
print()

input("Druk op Enter om af te sluiten...")