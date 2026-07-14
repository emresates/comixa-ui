# Comixa UI

Comic-themed React UI components built with **Tailwind CSS**.

```tsx
import { Button, Input, Badge, Card, Dialog } from "comixa-ui";
```

## Install

```bash
npm i comixa-ui
```

Peer deps (required in your app):

```bash
npm i react react-dom tailwindcss
```

## Setup Tailwind

### 1. Use the Comixa UI preset

```js
// tailwind.config.js
const comixaPreset = require("comixa-ui/preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [comixaPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // IMPORTANT: scan the package so Tailwind keeps comic utility classes
    "./node_modules/comixa-ui/dist/**/*.{js,mjs,cjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

ESM:

```js
import comixaPreset from "comixa-ui/preset";

export default {
  presets: [comixaPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/comixa-ui/dist/**/*.{js,mjs,cjs}",
  ],
};
```

### 2. Optional fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

## Usage

```tsx
import { Button, Input, Badge } from "comixa-ui";

export function Example() {
  return (
    <div className="flex flex-col gap-4 bg-paper p-8">
      <Badge variant="yellow">New</Badge>

      <Button variant="pop" effect="pop">
        Pow!
      </Button>

      <Button variant="primary" size="lg">
        Continue
      </Button>

      <Button variant="danger" effect="shake">
        Boom
      </Button>

      <Input placeholder="Hero name..." />
      <Input state="error" placeholder="Try again..." />
      <Input variant="filled" state="success" placeholder="Looks good" />
    </div>
  );
}
```

## Components

### Button

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `pop` `primary` `danger` `success` `outline` `ghost` | `pop` |
| `size` | `sm` `md` `lg` | `md` |
| `effect` | `none` `pop` `shake` `wiggle` | `none` |

### Input

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `default` `ghost` `filled` | `default` |
| `inputSize` | `sm` `md` `lg` | `md` |
| `state` | `default` `error` `success` | `default` |

### Badge

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `yellow` `red` `blue` `green` `pink` `outline` | `yellow` |
| `size` | `sm` `md` | `md` |

### Card

| Prop | Values | Default |
|------|--------|---------|
| `variant` | `default` `cream` `pop` `panel` `danger` `speech` `outline` | `default` |
| `padding` | `none` `sm` `md` `lg` | `md` |
| `effect` | `none` `pop` `wiggle` | `none` |

Parts: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

```tsx
<Card variant="speech">
  <CardHeader>
    <CardTitle>Caption</CardTitle>
    <CardDescription>A comic speech bubble.</CardDescription>
  </CardHeader>
  <CardContent>Pow!</CardContent>
</Card>
```

### Dialog (Modal)

| Prop (root) | Values | Default |
|------|--------|---------|
| `open` | `boolean` | required |
| `onOpenChange` | `(open: boolean) => void` | required |

| Prop (`DialogContent`) | Values | Default |
|------|--------|---------|
| `variant` | `default` `cream` `boom` `alert` `success` `panel` | `default` |
| `size` | `sm` `md` `lg` | `md` |
| `effect` | `none` `pop` `shake` | `pop` |

```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open</Button>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent variant="boom">
      <DialogHeader>
        <DialogTitle>Boom!</DialogTitle>
        <DialogDescription>Something exploded (in a good way).</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => setOpen(false)}>Got it</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</>
```

## Design tokens (via preset)

- Colors: `ink`, `paper`, `comic.yellow|red|blue|green|pink|orange`
- Shadows: `shadow-comic`, `shadow-comic-sm`, `shadow-comic-lg`
- Animations: `animate-comic-pop`, `animate-comic-shake`, `animate-comic-wiggle`, `animate-comic-dialog-in`, `animate-comic-overlay-in`
- Fonts: `font-comic`, `font-body`
