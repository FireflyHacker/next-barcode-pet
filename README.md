# next-barcode-pet

The barcode pet is a pet that you interact with using barcodes. It was originally written in PHP, before being rewritten in Python and now in Nextjs.

## Ideas:

- Take input from barcodes via Serial
- Compare barcodes to previously seen versions
- Hidden CTF
- API for submitting codes
- Prefix changes the impact of scanning the code
  - $ = Play with the pet
  - \# = Feed the pet
  - & = Give the pet water
- The pet should randomly tell jokes (like the original version)
- Proper system for when the pet changes status
  - The PHP version has 1 second ticks
  - The Python version just kinda estimates based on time passed
- Some kind of notification or visual indicator when another user submits a barcode.
- Global vs Individual pet (login required for individual pets)

## Implementation Ideas:

- Websocket for live updates of the pet
- Canvas API for multiple layers

## Resources:

#### 2D Sprites to consider:

- https://toffeecraft.itch.io/cat-pack
- https://henrysoftware.itch.io/pixel-food
- https://cupnooble.itch.io/sprout-lands-asset-pack
- https://pop-shop-packs.itch.io/cats-pixel-asset-pack
