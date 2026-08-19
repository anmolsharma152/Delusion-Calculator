# Deployment & Production Guidelines

> **Project: The Delusion Calculator (Fresh & Fit — US)**

---

## 1. Live Production Deployment

* **URL**: [https://female-delusion-calculator.vercel.app/](https://female-delusion-calculator.vercel.app/)
* **Platform**: Vercel (Production Branch: `main`)
* **Framework**: Next.js 16 (App Router with Turbopack)

---

## 2. Local Development Workflow

Run the Next.js development server locally:

```bash
npm run dev
```

* Dev server will run on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).
* Changes are hot-reloaded automatically via Turbopack.

---

## 3. Production Build & Static Optimization

The project is configured for optimal performance using static pre-rendering:

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### Static Optimization Details:
* All public routes (`/`, `robots.txt`, `sitemap.xml`, `icon.png`) are fully pre-rendered at build time.
* Fast client-side demographic calculations execute in $< 1.0\text{ ms}$ with zero server round-trips.
* Assets in `public/Assets/` and `public/Soundbites/` are served with static caching headers.

---

## 4. OBS Studio Broadcast Setup

To embed the Delusion Calculator inside OBS Studio for streaming:

1. In OBS, add a **Browser Source**.
2. Set URL to `https://female-delusion-calculator.vercel.app/` (or `http://localhost:3000` for local testing).
3. Set Width: `1920` and Height: `1080` (or `1280` × `720`).
4. Press **`[Space]`** or **`[S]`** to activate Stream Mode; the top header hides for a clean broadcast canvas and reveals on hover at the top edge.
5. In **Obsidian Dark** theme (`[T]`), the background switches to solid `#080808` obsidian black for seamless overlay integration.
