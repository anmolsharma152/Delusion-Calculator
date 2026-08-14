# Deployment & Production Guidelines

> **Project: The Delusion Calculator**

---

## 1. Local Development Workflow

Run the Next.js development server locally:

```bash
npm run dev
```

* Dev server will run on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).
* Changes are hot-reloaded automatically via Turbopack.

---

## 2. Production Build & Static Export

The project is configured for optimal performance using static generation:

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### Static Optimization Details:
* All pages (`/`, `/about`, `/stream`) are fully prerendered at build time.
* Fast client-side calculations execute with zero API latency.
* Assets in `public/Assets/` and `public/Soundbites/` are served with static caching headers.

---

## 3. OBS Studio Broadcast Setup

To embed the Delusion Calculator inside OBS Studio:

1. In OBS, add a **Browser Source**.
2. Set URL to `http://localhost:3000` (or your production deployment domain).
3. Set Width: `1920` and Height: `1080` (or `1280` × `720`).
4. Press **`[Space]`** or click **`STREAM MODE`** to activate the broadcast overlay.
5. In Obsidian Dark theme, the background is pure `#080808` obsidian black for seamless broadcast integration.
