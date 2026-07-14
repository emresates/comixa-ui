# README assets

Put images for the GitHub README in this folder.

## How GitHub shows images

In `README.md`, use a **relative path** from the repo root:

```md
![Comixa logo](docs/assets/logo.png)

![Showcase](docs/assets/showcase.png)

![Button](docs/assets/components/button.svg)
```

After you push to GitHub, these files are part of the repo and render on the README automatically. No CDN required.

## Files

| Path | Use |
|------|-----|
| `logo.png` | Big logo at the top of the README |
| `showcase.png` | Optional full playground screenshot |
| `components/*.svg` (or `.png`) | Small preview next to each component |

## Updating component screenshots

### Easy — keep SVG thumbs
The repo ships simple comic SVG placeholders in `components/`. Edit them or replace with real PNGs using the **same filename**.

### Better — real screenshots from Showcase

1. Run the playground: `cd playground && npm run dev`
2. Open **Showcase**
3. Screenshot each section (or crop from a full-page shot)
4. Save as PNG, e.g. `docs/assets/components/button.png`
5. Change the README link from `.svg` to `.png` (or overwrite and keep the name)

Tips:

- Prefer ~320–640px wide, light background
- Keep thick black comic borders visible
- Use PNG for photos/screenshots, SVG for logos/simple illustrations
