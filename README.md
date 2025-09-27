# Revive Sales Marketing Site

This repository hosts the static marketing website for **Revive Sales**, an AI-powered lead reactivation service that helps sales teams turn dormant leads into booked calls.

## 🚀 Live Website

Production deploys are automatically published to **https://revivesales.github.io/website** whenever changes land on the `main` branch.

## 📄 Pages

The site is composed of static HTML pages that share a common header and footer through client-side includes:

- `index.html` – Primary landing page with value proposition, social proof, industry benefits, and FAQ.
- `profit-calculator.html` – Interactive ROI calculator that embeds the Revive Sales HighLevel widget via iframe.
- `demo-ai-training.html` & `demo-ai-training-confirmation.html` – Flow for booking and confirming product demos.
- `8-day-launch.html` – Promotional landing page detailing the 8-day launch offer.
- `privacy-policy.html`, `terms-conditions.html`, `sitemap.xml`, and `robots.txt` – Compliance and SEO assets.

## ✨ Key Features

- **Lightweight static build** powered by HTML, CSS, and a small amount of vanilla JavaScript.
- **Reusable layout components** delivered by `assets/js/includes.js`, which hydrates `partials/header.html` and `partials/footer.html` on every page.
- **Conversion-focused UX** with persistent promotional banner, detailed service breakdown, testimonials, and FAQ coverage.
- **Embedded HighLevel CRM experiences** for demos and ROI calculations.
- **Responsive design** optimized for both desktop and mobile visitors.

## 🛠️ Technology Stack

- **Markup & Styling:** Hand-authored HTML with generated CSS in `assets/index-BW-gzsfY.css`.
- **JavaScript:** Vanilla JS for partial includes and light interactivity.
- **Tooling:** HTMLHint, ESLint, and Stylelint via Node.js for code quality checks.
- **Hosting:** GitHub Pages with GitHub Actions automation.

## 📁 Project Structure

```
├── assets/                  # Compiled CSS, JavaScript helpers, and images
├── partials/                # Header and footer partial HTML fragments
├── *.html                   # Stand-alone static pages
├── package.json             # Linting scripts and devDependencies
├── .github/workflows/       # Deployment workflow for GitHub Pages
└── README.md
```

## 🧑‍💻 Local Development

1. Install dependencies for linting (optional but recommended):
   ```bash
   npm install
   ```
2. Serve the site with any static web server to avoid CORS issues when loading partials:
   ```bash
   npx http-server .
   ```
   Then open `http://localhost:8080` in your browser.
3. Run lint checks before committing:
   ```bash
   npm run test
   ```

Because the site uses client-side includes, opening the HTML files directly from the filesystem will not render the shared header/footer.

## 🤝 Contributing

1. Create a feature branch from `main`.
2. Make your changes and run the lint suite.
3. Submit a pull request—deployments run automatically after merge.

---

© 2025 Revive Sales. All rights reserved.
