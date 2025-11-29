# Hosting with GitHub Pages

This repository contains a static site (HTML, CSS, JS). To host it on GitHub Pages:

1. In the repository Settings → Pages, choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
2. Save. The published site will be available at:
   https://YASIR-web-hack-ese.github.io/phythonlove.py/

Editing the site:
- index.html — content (titles, text, buttons)
- style.css — styles (colors, fonts, layout)
- script.js — interactive behavior

To publish changes:
```
git add .
git commit -m "Update site"
git push origin main
```

GitHub Pages will auto-deploy updates. 
