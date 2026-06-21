# ✿ Vintage Photobooth

A cute, vintage-styled photobooth web app built with React + Vite. Take webcam photos with filters, a countdown timer, build a photo strip (strip / grid / polaroid layouts), add a caption, and download the result as PNG or JPG.

## Features

- Live webcam preview with permission handling
- 8 retro filters (sepia, b&w, vintage, dreamy, polaroid, warm, cool, film) plus brightness/contrast/saturation/warmth sliders
- Configurable shoot: 2 / 4 / 6 photos, timer of 0 / 3 / 5 / 10 seconds, with on-screen countdown and flash effect
- Three strip layouts: vertical strip, 2-column grid, polaroid (white-framed)
- 6 border color choices, plus optional caption text baked into the final image
- Canvas-based strip generation, downloadable as PNG or JPG
- Fully responsive (stacks vertically on mobile)

## Project structure

```
photobooth/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Header.jsx / .module.css
    │   ├── CameraPanel.jsx / .module.css
    │   ├── FilterChip.jsx / .module.css
    │   ├── AdjustSlider.jsx / .module.css
    │   ├── ControlPanel.jsx / .module.css
    │   ├── SetupTab.jsx / .module.css
    │   ├── StripTab.jsx / .module.css
    │   └── DownloadTab.jsx / .module.css
    ├── hooks/
    │   ├── useCamera.js
    │   └── useCapture.js
    ├── utils/
    │   ├── filters.js
    │   └── stripGenerator.js
    └── styles/
        ├── global.css
        └── App.module.css
```

## Running locally in VS Code

1. **Install Node.js** (v18+) if you don't have it already: https://nodejs.org

2. **Open the `photobooth` folder in VS Code.**

3. **Open a terminal in VS Code** (`` Ctrl+` `` or `View > Terminal`) and install dependencies:

   ```bash
   npm install
   ```

4. **Start the dev server:**

   ```bash
   npm run dev
   ```

5. Open the printed local URL (usually `http://localhost:5173`) in your browser. Your browser will ask for camera permission — allow it to use the photobooth.

   > Webcam access requires either `localhost` or HTTPS — `http://localhost:5173` works fine for local dev.

6. To build a production bundle:

   ```bash
   npm run build
   npm run preview   # preview the production build locally
   ```

## Deploying to Vercel

**Option A — Vercel CLI**

```bash
npm install -g vercel
cd photobooth
vercel
```

Follow the prompts (link or create a project). Vercel auto-detects Vite — no extra config needed. For production deploys:

```bash
vercel --prod
```

**Option B — GitHub + Vercel dashboard**

1. Push this folder to a new GitHub repository:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: vintage photobooth"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. Go to https://vercel.com/new, import the repository.
3. Framework Preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist` (defaults, no changes needed).
4. Click **Deploy**.

Camera access will work on the deployed `https://your-app.vercel.app` URL since Vercel serves over HTTPS.

## Notes

- All photo processing (filters, strip generation) happens client-side via the Canvas API — no backend or image upload required.
- Tabler Icons and Google Fonts (Playfair Display, DM Sans) are loaded via CDN links in `index.html`.
