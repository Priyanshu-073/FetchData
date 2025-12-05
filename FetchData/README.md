# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## How to Host / Deploy

### Building for Production

First, build the production assets:

```bash
npm run build
```

This creates a `dist` folder with optimized static files ready for deployment.

### Hosting Options

#### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/log in
3. Click "New Project" and import your GitHub repository
4. Vercel auto-detects Vite and configures the build settings
5. Click "Deploy"

Your app will be live at a Vercel URL (e.g., `your-app.vercel.app`).

#### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/log in
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Deploy site"

Your app will be live at a Netlify URL (e.g., `your-app.netlify.app`).

#### GitHub Pages

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add `base` to `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. Run the deploy command:
   ```bash
   npm run deploy
   ```

Your app will be live at `https://username.github.io/your-repo-name/`.

#### Static Hosting (Manual)

For any static hosting provider (e.g., Firebase Hosting, AWS S3, Cloudflare Pages):

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your hosting provider

### Preview Production Build Locally

Before deploying, you can preview the production build locally:

```bash
npm run build
npm run preview
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
