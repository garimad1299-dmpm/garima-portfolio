# Garima Dandotiya — Portfolio Website

Live domain: **https://www.garimadandotiya.com**

Pure static site (HTML + CSS + JavaScript). No build step, no frameworks.

## Files
```
index.html                  → main page
style.css                   → all styles (light theme)
script.js                   → animations, counters, tabs, menu
404.html                    → not-found page
assets/garima.jpg           → profile photo
assets/Garima-Dandotiya-Resume.pdf → downloadable resume
assets/favicon.svg, og-thumb.jpg
robots.txt, sitemap.xml     → SEO
render.yaml                 → Render static-site config
```

## 1) Upload to GitHub
1. github.com → **New repository** → name: `garima-portfolio` → Public → Create.
2. **Add file → Upload files** → zip ke andar ki *saari files aur `assets` folder* drag karo
   (zip folder khud nahi, uske andar ka content — `index.html` repo ke root me hona chahiye).
3. **Commit changes**.

## 2) Live on Render.com
1. render.com → **New + → Static Site** → GitHub repo `garima-portfolio` select karo.
2. Settings:
   - **Build Command:** *(khali chhodo)*
   - **Publish Directory:** `.`
3. **Create Static Site** → 1–2 min me `https://garima-portfolio.onrender.com` live.

## 3) Custom domain (www.garimadandotiya.com)
1. Render → site → **Settings → Custom Domains → Add** → `www.garimadandotiya.com` (aur `garimadandotiya.com`).
2. Domain provider (GoDaddy/Hostinger etc.) ke DNS me Render jo records batata hai woh add karo:
   - `www` → **CNAME** → `garima-portfolio.onrender.com`
   - root `@` → Render ka diya hua **A record** / ALIAS
3. Verify par click karo — SSL (https) Render khud laga deta hai.

## Edit karna ho to
- Contact: `index.html` me `919755232487`, `garimad1299@gmail.com`, LinkedIn URL search karke badlo.
- Results numbers: `index.html` → `#results` section → `data-to="..."` value badlo.
- Photo: `assets/garima.jpg` ko same naam se replace karo.
