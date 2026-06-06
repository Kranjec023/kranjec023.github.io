# 🤖 AI_FEATURE — Setup & Deploy

---

## Feature Identity

- **Feature Name:** Setup & Deploy — Portfolio on GitHub Pages
- **Related Area:** Project Setup / DevOps
- **Priority:** 🔴 High — must be completed before any other feature

---

## Feature Goal

Scaffold a React + Vite application, configure it correctly for GitHub Pages deployment, and automate the build and deploy process using GitHub Actions. The result is a live portfolio accessible at `https://username.github.io` with clean URL routing (no `/home`, `/portfolio`, etc. in the URL).

---

## Feature Scope

### In Scope (Included)

- Scaffold React app using Vite (`npm create vite@latest`)
- Configure `vite.config.js` with correct `base` path for GitHub Pages
- Create GitHub Actions workflow (`deploy.yml`) for automated build and deploy
- Configure GitHub Pages to serve from the Actions deployment
- Environment variable setup in GitHub Actions (if applicable)
- Verify the app loads correctly at `https://username.github.io`
- Verify routing stays at root URL (no sub-paths in the browser bar)

### Out of Scope (Excluded)

- Any page content or component building (handled in individual feature files)
- Custom domain configuration
- Paid hosting or CDN setup
- Backend or API setup
- CSS / design system implementation (handled in `design-system.feature.md`)

---

## Sub-Requirements (Feature Breakdown)

- **SR-1** — React app is scaffolded using Vite with the correct project name
- **SR-2** — Project folder is initialized as a Git repository and pushed to GitHub
- **SR-3** — `vite.config.js` sets `base: '/'` for root GitHub Pages repo
- **SR-4** — A workflow file exists at `.github/workflows/deploy.yml`
- **SR-5** — Workflow triggers on every push to the `main` branch
- **SR-6** — Workflow runs `npm ci` to install dependencies
- **SR-7** — Workflow runs `npm run build` to produce the `dist/` folder
- **SR-8** — Workflow deploys the `dist/` folder to GitHub Pages
- **SR-9** — GitHub Pages is configured to serve from the **Actions** deployment source
- **SR-10** — Navigating to `https://username.github.io` loads the React application
- **SR-11** — All page navigation stays at `https://username.github.io` — no sub-paths in URL
- **SR-12** — If environment variables are used, they are defined as GitHub Actions secrets

---

## Step-by-Step Setup Instructions

### Step 1 — Scaffold the React App

```bash
npm create vite@latest username.github.io
# Select: React
# Select: JavaScript (or TypeScript for extra challenge)

cd username.github.io
npm install
npm run dev   # verify it runs locally at http://localhost:5173
```

### Step 2 — Initialize Git & Push to GitHub

```bash
git init
git add .
git commit -m "init: scaffold React Vite project"
git remote add origin https://github.com/username/username.github.io.git
git branch -M main
git push -u origin main
```

### Step 3 — Configure Vite Base Path

```js
// filepath: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',   // Root repo → always '/'
})
```

### Step 4 — Create GitHub Actions Workflow

```yaml
# filepath: .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      # If you use environment variables, add them here:
      # - name: Set environment variables
      #   run: echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" >> $GITHUB_ENV

      - name: Build
        run: npm run build
        # If you use environment variables, pass them as env:
        # env:
        #   VITE_API_URL: ${{ secrets.VITE_API_URL }}

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5 — Configure GitHub Pages in Repo Settings

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under **Source** → select **GitHub Actions**
4. Save — GitHub Pages will now deploy from the workflow

### Step 6 — Handle Client-Side Routing (No Sub-Paths in URL)

> Since GitHub Pages is a static host, use **hash-based routing** to keep all navigation at `https://username.github.io` without sub-paths.

```bash
npm install react-router-dom
```

```jsx
// filepath: src/main.jsx
import { HashRouter } from 'react-router-dom'

// Use HashRouter instead of BrowserRouter
// This keeps all routes at https://username.github.io/#/section
// URL stays clean — no /home, /portfolio in the path
<HashRouter>
  <App />
</HashRouter>
```

> ✅ `HashRouter` ensures all navigation is handled client-side at the root URL.
> ❌ Do **not** use `BrowserRouter` — GitHub Pages cannot serve deep routes.

---

## File Structure After Setup

```
username.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── public/
├── src/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js              ← base: '/' configured
├── package.json
└── README.md
```

---

## Environment Variables (If Applicable)

| Variable | Where to Set | Example |
|---|---|---|
| `VITE_API_URL` | GitHub → Settings → Secrets → Actions | `https://api.example.com` |
| `VITE_CONTACT_KEY` | GitHub → Settings → Secrets → Actions | `your_formspree_key` |

> All Vite environment variables must be prefixed with `VITE_` to be exposed to the client.
> Never commit `.env` files to the repository.

---

## Tech Constraints (Feature-Level)

- Use **Vite** — no Create React App
- Use **React Router DOM** with `HashRouter` — no `BrowserRouter`
- Use **GitHub Actions** — no third-party deploy services (Netlify, Vercel, etc.)
- `base` in `vite.config.js` must be `'/'` — this is a root `username.github.io` repo
- Node.js version in workflow must be **20**
- Do **not** commit the `dist/` folder — it is built by the workflow

---

## Acceptance Criteria

- [ ] SR-1 through SR-12 are all implemented
- [ ] `npm run dev` runs the app locally without errors
- [ ] `npm run build` produces a `dist/` folder without errors
- [ ] `.github/workflows/deploy.yml` exists and is correctly configured
- [ ] Workflow triggers automatically on push to `main`
- [ ] Workflow completes all steps: checkout → install → build → deploy
- [ ] GitHub Pages source is set to **GitHub Actions** in repo settings
- [ ] App loads at `https://username.github.io`
- [ ] All navigation stays at `https://username.github.io` — no sub-paths in URL
- [ ] No sensitive data or `.env` files committed to the repository
- [ ] `README.md` updated with live URL and setup instructions

---

## Notes for the AI

- Always use `HashRouter` for GitHub Pages — `BrowserRouter` will cause 404s on refresh
- `base: '/'` is correct for `username.github.io` repos — only sub-repos need a `/repo-name/` base
- The `deploy.yml` workflow uses the official GitHub Actions for Pages — do not use `gh-pages` npm package
- Environment variables in Vite must start with `VITE_` — otherwise they are not exposed to the frontend
- Do not build any page content in this feature — scaffold only