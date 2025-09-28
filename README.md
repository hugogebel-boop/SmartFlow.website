# 🌐 SmartFlow.website

Site officiel de **SmartFlow** — présentation de notre offre en développement logiciel sur mesure, notre méthode de travail et un formulaire de contact.  
Le site est pensé pour être clair, fluide et professionnel, avec un design moderne en violet.

## 🚀 Aperçu

- **Sections**
  - Accueil (hero + CTA)
  - Qui nous sommes
  - Offre (logiciels sur mesure)
  - Méthode (processus de travail)
  - Contact (formulaire Formspree)

- **Stack**
  - [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
  - TailwindCSS pour le style
  - Déploiement continu via **GitHub Pages**

## 📦 Installation locale

```bash
git clone https://github.com/hugogebel-boop/SmartFlow.website.git
cd SmartFlow.website
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

## 🌍 Déploiement

Le site est automatiquement déployé via **GitHub Actions** sur :

👉 [https://hugogebel-boop.github.io/SmartFlow.website/](https://hugogebel-boop.github.io/SmartFlow.website/)

### Workflow utilisé
- `vite.config.ts` configure correctement la base pour GitHub Pages.
- `pages.yml` construit le site puis publie dans GitHub Pages.
- Un fallback `404.html` est créé pour supporter la navigation type SPA.

## 👤 Auteur

Développé par **Hugo Gebel**  
Étudiant ingénieur civil, passionné par le développement logiciel et la création d’outils sur mesure.

📫 Contact : [hugogebel@epfl.ch](mailto:hugogebel@epfl.ch)

---

✨ *SmartFlow : des logiciels qui servent le métier, pas l’inverse.*
