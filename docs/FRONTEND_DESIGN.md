# Frontend Design System

The visual language of the Delusion Calculator is inspired by the "Miami After Hours" aesthetic of the Fresh & Fit podcast—dark, sleek, confrontational, and neon-lit.

## Design Philosophy

- **Dark Mode Default**: No light mode exists. 
- **High Contrast**: Neon accents against deep blacks.
- **Brutalism mixed with Glassmorphism**: Sharp edges on typography, smooth frosted glass on UI panels.

## Color System

| Name | Hex Code | Usage |
| :--- | :--- | :--- |
| Obsidian Black | `#0D0D0D` | Main background, deep shadows. |
| Crimson Red | `#E50914` | Primary brand color, errors, "Delusional" states. |
| Neon Cyan | `#00E5FF` | Secondary accents, sliders, "Realistic" states. |
| Neon Pink | `#FF007F` | Tertiary highlights, Cat Lady Meter accents. |
| Electric Gold | `#FFCC00` | Highlighting critical numbers, premium features. |
| Slate Gray | `#2A2A2A` | Card backgrounds, borders, muted text. |

## Typography System

| Font | Purpose | CSS Variable |
| :--- | :--- | :--- |
| **Bebas Neue** | Main Headlines, Title | `font-bebas` |
| **Anton** | Sub-headlines, Impact text | `font-anton` |
| **Inter** | Body text, UI labels | `font-inter` |
| **JetBrains Mono** | Output numbers, Terminal/Code aesthetics | `font-mono` |

## Component Catalog

1. **DelusionSlider**: Range slider with a neon glowing thumb.
2. **NeonToggle**: Custom checkbox that glows when active.
3. **CatLadyMeter**: A semi-circle gauge dial charting from 0 to 5, transitioning from Cyan -> Pink -> Red.
4. **StatDisplay**: Large, monospace readout of the final percentage.
5. **RoastTerminal**: A brutalist box resembling a command-line interface that outputs the roasts.

## Visual Effects

- **Neon Glow**: Achieved using heavy `drop-shadow` and `box-shadow` Tailwind utilities.
- **Glassmorphism**: `backdrop-blur-md bg-white/5` on overlapping panels.
- **Scanlines**: A subtle CSS overlay simulating CRT monitor scanlines for the Roast Terminal.

## Animation Guidelines

- Powered by **Framer Motion**.
- **Spring Physics**: Use `type: "spring", stiffness: 300, damping: 20` for UI interactions to make them feel punchy.
- **CountUp**: All percentage numbers must animate from 0 to the target value dynamically as sliders move.

## Responsive Breakpoints

- Mobile (`sm`, `<640px`): Single column, sticky results at the bottom.
- Tablet (`md`, `768px`): 2-column layout (Inputs left, Results right).
- Desktop (`lg`, `1024px+`): Expanded 2-column layout with extra stats sidebars.

## Stream Mode Specifications

For Twitch/YouTube streamers (like F&F reacting live):
- A toggle that injects `#00FF00` (chromakey green) as the background.
- UI elements convert to high-opacity solids to prevent semi-transparent elements from keying out.

## Accessibility Considerations

- Maintain WCAG AA contrast for text.
- Ensure all custom sliders and toggles are keyboard navigable (`tabIndex={0}`).
- Use `aria-live="polite"` on the percentage output so screen readers announce the changing score.
