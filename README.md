# Do You Like Me? — Landing Page

This folder contains a small static site (HTML/CSS/JS) converted from your Python Tkinter app.

Files:
- `index.html` — main page
- `style.css` — styles
- `script.js` — interaction
- `serve.ps1` — helper PowerShell script to run a local server and open the browser

Quick local preview (PowerShell):

```pwsh
cd "c:\Users\attal\OneDrive\Documents\phython love.py"
# start local server on port 8000 (same as I used)
python -m http.server 8000
# then open http://localhost:8000 in your browser (or use the serve script below)
```

Use the included `serve.ps1` to start the server and open your browser automatically:

```pwsh
# Run in PowerShell from the project folder
.\serve.ps1
# Stop with Ctrl+C in the terminal
```

Share this site with others
--------------------------

You have three simple options to let others open the site on their devices:

1) Temporary tunnel (quick demo)
   - ngrok (recommended):
     - Download from https://ngrok.com, sign up, and get your auth token.
     - Authenticate once:
       ```pwsh
       ngrok authtoken <YOUR_AUTHTOKEN>
       ```
     - Start a tunnel for port 8000:
       ```pwsh
       ngrok http 8000
       ```
     - ngrok will display a public URL like `https://abcd-12-34-56.ngrok.io`. Share that URL.
     - Notes: link is temporary. Use a paid ngrok account for stable subdomains.

   - localtunnel (Node required):
     ```pwsh
     npm install -g localtunnel
     lt --port 8000 --subdomain yoursubdomain
     ```
     It prints a public URL to share.

2) Permanent free hosting (recommended for long-term sharing)
   - GitHub Pages (static sites)
     - Create a GitHub repository and push the site files.
     - Commands to push (replace `<username>` and `<repo>`):
       ```pwsh
       cd "c:\Users\attal\OneDrive\Documents\phython love.py"
       git init
       git add .
       git commit -m "Initial site"
       git branch -M main
       git remote add origin https://github.com/<username>/<repo>.git
       git push -u origin main
       ```
     - On GitHub, go to `Settings` → `Pages` → set `Source` to `main` branch (root). Your site will be published at `https://<username>.github.io/<repo>/`.
     - If you name your repo `<username>.github.io`, your site is published at `https://<username>.github.io/`.

   - Netlify (very simple)
     - Drag-and-drop: go to https://app.netlify.com/drop and drop the project folder (the three files). Netlify creates a public URL.
     - Or connect your GitHub repo for automatic deploys.

   - Vercel
     - Connect your GitHub repo at https://vercel.com/new and deploy. Vercel gives a public URL and preview links.

Security notes
--------------
- When using a temporary tunnel, only share the ngrok/localtunnel link with people you trust.
- Do not expose sensitive files or credentials in the folder you serve.

If you want I can:
- Provide the exact `git` commands with your GitHub repo name filled in (I'll show them here; you'll run them locally), or
- Walk you through ngrok steps interactively (I can provide commands you run locally), or
- Deploy to Netlify via drag-and-drop and confirm the URL steps.

Which option would you like me to perform next? (I cannot run ngrok or push to your GitHub from here; I can prepare everything and give exact commands.)
