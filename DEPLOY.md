# Deploy MUN Dashboard (thedashboard.seamuns.site)

The **"Failed to load module script" (MIME type text/plain)** and **favicon 404** errors happen when the host serves the **source** (repo root) instead of the **built** app. Fix: deploy the **`dist/`** folder after building.

---

## Why the errors happen

- **Root `index.html`** asks for `/src/main.tsx` (uncompiled). The server sends that file with `Content-Type: text/plain`, so the browser blocks it → MIME type error.
- **Favicon** lives in `public/favicon.svg`. When you serve the repo root, the server often doesn’t map `/favicon.svg` to `public/favicon.svg` → 404.

**Fix:** Run `npm run build` and deploy the **contents of `dist/`** as the site root. The built `index.html` loads compiled JS from `/assets/...` with correct MIME type, and `favicon.svg` is at the root of `dist/`.

---

## 1. Build locally (to test)

```bash
npm install
npm run build
```

The built site is in **`dist/`**. Locally you can run `npm run preview` and open the URL it prints.

---

## 2. Deploy the `dist/` folder

Configure your host so that:

1. **Build command:** `npm run build`
2. **Publish / output directory:** `dist`

Do **not** publish the repo root or `src/` as the site root.

---

### GitHub Pages (with Actions)

1. In the repo: **Settings → Pages → Build and deployment → Source:** GitHub Actions.
2. Add this workflow (e.g. `.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency: group=pages
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. After the first push, **Settings → Pages** should show the site URL. If you use a custom domain (e.g. `thedashboard.seamuns.site`), set it there.
4. If the site is **not** at the root (e.g. `username.github.io/thedashboard.seamuns.site/`), set in `vite.config.ts`:

```ts
base: '/thedashboard.seamuns.site/',
```

Then rebuild and redeploy.

---

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Base directory:** (leave empty if the repo root is the project)

---

### Vercel

1. Import the repo; framework preset **Vite** is usually auto-detected.
2. **Build command:** `npm run build`
3. **Output directory:** `dist`

---

## 3. Custom domain (e.g. thedashboard.seamuns.site)

- **GitHub Pages:** Settings → Pages → Custom domain → set `thedashboard.seamuns.site` and follow DNS instructions.
- **Netlify / Vercel:** Add the domain in the dashboard and point DNS as instructed.

No change to Vite is needed if the site is served at the root of that domain (`https://thedashboard.seamuns.site/`). Only set `base` in `vite.config.ts` if the app is served in a subpath (e.g. `https://example.com/thedashboard.seamuns.site/`).

---

## Summary

| Problem              | Cause              | Fix                          |
|----------------------|--------------------|------------------------------|
| MIME type text/plain | Serving source     | Deploy `dist/` after build   |
| favicon 404          | Not serving build  | Same: deploy `dist/`         |

Always use **Build command: `npm run build`** and **Publish directory: `dist`**.

---

## 4. Workflow failed – how to find the error

1. Go to the repo → **Actions**.
2. Click the **failed** run (red X).
3. Click the **failed job** (e.g. **build** or **deploy**).
4. Expand the **failed step** (red step). The log at the bottom shows the error (e.g. `npm ci` failed, `npm run build` failed, or deploy failed).

**Common causes:**

- **`npm ci` failed:** Run `npm install` locally and commit `package-lock.json` if it changed.
- **`npm run build` failed:** Run `npm run build` locally and fix any TypeScript or build errors, then push.
- **deploy failed:** Ensure **Settings → Pages → Source** is **GitHub Actions** and the **github-pages** environment exists. If another workflow (e.g. “Deploy Next.js site to Pages”) is also deploying to Pages, disable or remove that workflow so only **Deploy to GitHub Pages** runs.

---

## 5. Two workflows (e.g. “Deploy Next.js site to Pages”)

If you see **two** workflows running on each push (e.g. “Deploy to GitHub Pages” and “Deploy Next.js site to Pages”):

- We only want to deploy the **MUN Dashboard** (Vite app in the repo root), not the Next.js app in `auth0-nextjs-app/`.
- **Remove or disable** the “Deploy Next.js site to Pages” (or any other Pages) workflow: repo → **Actions** → click that workflow → **⋯** (top right) → **Delete workflow**, or delete its file under **.github/workflows/** in the repo.
- Keep only **Deploy to GitHub Pages**, which builds the root app and deploys `dist/`.
