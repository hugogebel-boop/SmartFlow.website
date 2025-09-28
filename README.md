# SmartFlow — Site One-Page (Vite + React + TS + Tailwind)

## Prérequis
- Node.js LTS (>=18)
- npm

## Installation & lancement local
```bash
npm install
npm run dev
```
Ouvre ensuite l’URL affichée (souvent http://localhost:5173).

## Déploiement GitHub Pages (automatique via GitHub Actions)
1. Crée un repository GitHub **public** (ex: `smrtflow-site`).
2. Pousse ce dossier sur GitHub :
   ```bash
   git init
   git add .
   git commit -m "init smartflow site"
   git branch -M main
   git remote add origin https://github.com/<TON_USER>/<TON_REPO>.git
   git push -u origin main
   ```
3. Dans GitHub, va dans **Settings → Pages** : vérifie que la **Source** est réglée sur "Deploy from a branch" ou via **GitHub Actions**. Ce projet inclut déjà un workflow qui build & publie automatiquement.
4. Le workflow publiera sur la branche **gh-pages** et activera Pages.

### Base path (assets) pour Pages
Vite a besoin d’un `base` correct. Ici, on le déduit automatiquement à partir de `GITHUB_REPOSITORY` en CI (voir `vite.config.ts`). Pas besoin de changer manuellement.

## Déploiement manuel (optionnel)
Tu peux aussi faire `npm run build` puis servir le dossier `dist` avec un hébergeur statique.

## Modifier le contenu
La page principale est dans `src/App.tsx`. Le style Tailwind est déjà configuré.
