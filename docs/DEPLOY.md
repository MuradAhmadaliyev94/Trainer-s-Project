# Deploy to GitHub Pages

## One-time
1. Create a repository on github.com (e.g. `trainers-platform`), **Public** (free Pages) or Private (needs paid plan).
2. In the project folder (PowerShell):
   ```
   git init
   git add .
   git status        # CHECK: .env, check.html, docs/original-index.backup.html must NOT be listed
   git commit -m "Initial version"
   git branch -M main
   git remote add origin https://github.com/<your-user>/<repo>.git
   git push -u origin main
   ```
   No git installed? Use **GitHub Desktop**, or on the repo page: Add file → Upload files (drag all folders/files EXCEPT `.env`, `check.html`, `docs/original-index.backup.html`).
3. Repo → Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
4. After ~1 minute the site is at `https://<your-user>.github.io/<repo>/`.
5. Firebase console → Authentication → Settings → **Authorized domains** → Add `<your-user>.github.io`.

## Every later change
```
git add .
git commit -m "What changed"
git push
```
Pages republishes automatically (1-2 min; hard-refresh with Ctrl+F5).

## Rules
Changes to `firestore.rules` are NOT deployed by GitHub. Paste them in Firebase console → Firestore → Rules → Publish.

## Safety checklist
- `.env` holds the initial PINs: never commit it.
- `js/config.js` is committed on purpose: it contains only the public Firebase web config. Real protection = Firestore rules + Auth.
- Optional: Google Cloud console → APIs & Services → Credentials → restrict the browser API key to `https://<your-user>.github.io/*`.