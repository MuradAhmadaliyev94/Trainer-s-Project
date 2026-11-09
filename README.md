# Təlimçi Kabineti (Trainer's Platform)

```
index.html            entry page
css/styles.css        all styles
js/config.js          GENERATED from .env (gitignored)
js/data/trainers.js   trainer roster, avatar presets, photo paths
js/data/sections.js   cabinet sections
js/app.js             application logic (classic script, shared globals)
assets/images/trainers/  trainer photos (t1..t11.jpg)
scripts/build-config.ps1 .env -> js/config.js
docs/original-index.backup.html  original single-file version
.env / .env.example   PINs and Drive link
```

## Setup
1. Copy `.env.example` to `.env`, fill values.
2. Run `powershell -File scripts\build-config.ps1`.
3. Open `index.html` (or serve the folder).

## Important
- `.env` does NOT make PINs secret: they end up in `js/config.js`, which the browser downloads. Real security needs a backend that checks PINs server-side.
- Data storage uses `claude.use("db")`, which only exists inside the Claude artifact runtime. Outside it the app shows as offline until a real backend is added.