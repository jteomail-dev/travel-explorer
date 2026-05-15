# /gitpush — Publish Travel Explorer to GitHub Pages

Safely commit, push, and publish this project to GitHub Pages. Follow every step below in order.

---

## Step 1 — Secret Scan (NEVER skip this)

Before staging any file, scan the working tree for real secrets.

Run these checks and **STOP** (report what you found and ask the user) if any check fails:

```bash
# 1a. Check for real OpenWeather API keys (anything that is NOT the placeholder)
grep -rn "OPENWEATHER_API_KEY\s*=\s*\"[^\"]\+\"" script.js | grep -v "YOUR_API_KEY_HERE"

# 1b. Generic secret patterns across all tracked text files
grep -rEn "(password|passwd|secret|api_key|apikey|token|auth_token|private_key)\s*[:=]\s*['\"][^'\"]{6,}" \
  --include="*.js" --include="*.html" --include="*.css" --include="*.json" --include="*.env" .

# 1c. .env files must never be staged
ls .env* 2>/dev/null

# 1d. Warn if a real key pattern appears (Bearer tokens, long hex strings, etc.)
grep -rEn "(Bearer\s+[A-Za-z0-9\-._~+/]{20,}|['\"][0-9a-f]{32,}['\"])" \
  --include="*.js" --include="*.html" . | grep -v node_modules
```

If all checks are clean, continue. If anything is flagged, show the user the exact line and file, explain the risk, and wait for explicit confirmation before proceeding.

---

## Step 2 — Ensure .gitignore is Correct

Read the current `.gitignore` (if it exists). Make sure it contains at minimum:

```
.env
.env.*
*.env
node_modules/
```

If any of these lines are missing, add them. If no `.gitignore` exists, create one containing those lines plus:

```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/settings.json
*.suo
*.user
```

Do NOT add `script.js`, `style.css`, or `index.html` to .gitignore — they are core app files.

---

## Step 3 — Ensure README.md is Complete

Read the current `README.md`. It should include:

- Project title and tagline
- Live GitHub Pages URL: `https://jteomail-dev.github.io/travel-explorer/`
- Features list
- Weather API setup instructions (with the placeholder key — never a real key)
- Project structure
- Tech stack

If the live URL badge/link is missing or the README is thin, update it to include all the above. Preserve any existing content that is accurate.

---

## Step 4 — Ensure GitHub Actions Workflow Exists

Read `.github/workflows/deploy.yml`. If it doesn't exist, create it exactly as follows:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Prepare site files
        run: |
          mkdir -p _site
          cp index.html _site/
          cp style.css _site/
          cp script.js _site/
          touch _site/.nojekyll

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: "_site"

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

If the file already exists and matches this structure, leave it as-is.

---

## Step 5 — Stage Only Safe Files

Stage exactly these files (do not use `git add .` or `git add -A`):

```bash
git add index.html style.css script.js README.md .gitignore
git add .github/workflows/deploy.yml
git add .nojekyll 2>/dev/null || true
git add CLAUDE.md 2>/dev/null || true
git add .claude/commands/gitpush.md 2>/dev/null || true
```

Do **NOT** stage:
- `.env` or any file matching `.env*`
- Any file containing a real API key or credential detected in Step 1
- Binary or media files in subdirectories with special characters in their names (e.g., the `Travel Explorer — .../_files/` folder)
- `prompt_travel.md` or any local planning notes

Show the user the output of `git status` after staging so they can review what will be committed.

---

## Step 6 — Commit

Check `git status`. If there is nothing new to commit, skip this step and tell the user.

Otherwise, create a commit. Draft a concise message that describes what actually changed (e.g., "Add gitpush command and update README with live URL"). Pass it via heredoc:

```bash
git commit -m "$(cat <<'EOF'
<your message here>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Step 7 — Push to GitHub

```bash
git push origin main
```

If the push is rejected because the remote has commits the local branch doesn't have, run `git pull --rebase origin main` first, then push again. Do NOT force-push unless the user explicitly asks.

---

## Step 8 — Update Repo About via GitHub CLI

Use `gh` to update the repository description, homepage, and topics:

```bash
gh repo edit jteomail-dev/travel-explorer \
  --description "A curated city travel guide for Asia & beyond — built with pure HTML, CSS & JS" \
  --homepage "https://jteomail-dev.github.io/travel-explorer/" \
  --add-topic travel \
  --add-topic html \
  --add-topic css \
  --add-topic javascript \
  --add-topic github-pages \
  --add-topic travel-guide
```

If `gh` is not installed or not authenticated, tell the user and provide the manual steps to update the About panel on GitHub.com (Settings → About).

---

## Step 9 — Report Status

Print a summary:

```
✓ Secret scan passed — no credentials in tracked files
✓ .gitignore updated
✓ README.md updated with live URL
✓ GitHub Actions workflow verified
✓ Committed: <message>
✓ Pushed to origin/main
✓ Repo About updated

Live site (deploys in ~30–60 seconds):
  https://jteomail-dev.github.io/travel-explorer/

GitHub Actions progress:
  https://github.com/jteomail-dev/travel-explorer/actions
```

If any step was skipped or failed, replace the ✓ with a clear note explaining why and what the user should do next.
