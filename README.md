# Welcome to your Eros Console project

TODO: Document your project here

## Host on GitHub Pages

This app is built with **Vite**. The live site is produced by **GitHub Actions** (see `.github/workflows/deploy.yml`), not by Jekyll and **not** from a `/docs` folder.

### Fix “Failed to create deployment (status: 404)”

That error means **Pages is not using Actions as the source**. In [**Settings → Pages**](https://github.com/Saravanan-eros/eucs-console-demo/settings/pages) → **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”). Save if prompted, then re-run the failed workflow or push again.

### If your Pages screen looks like the branch + `/docs` setup

In **Settings → Pages → Build and deployment**:

1. Under **Source**, change **Deploy from a branch** to **GitHub Actions** (required for `deploy-pages`; branch mode does not use the workflow artifact).
2. Do **not** use the **Branch** dropdown with folder **`/docs`**. That mode runs Jekyll on a `docs` folder; this repo has no `docs` folder, which causes:  
   `No such file or directory ... /github/workspace/docs`.
3. After you select **GitHub Actions**, GitHub may show a suggested workflow—choose **Deploy to GitHub Pages** (this repo’s workflow), or push `main` so the workflow runs from `.github/workflows/deploy.yml`.
4. Open the **Actions** tab and wait for **Deploy to GitHub Pages** to finish. The first run may ask you to **approve** the `github-pages` environment.
5. Your site URL will be:  
   `https://<your-username>.github.io/<repository-name>/`  
   Example: `https://Saravanan-eros.github.io/eucs-console-demo/`

### Deploy from git

```bash
git push origin main
```

To run a deploy without new commits: **Actions → Deploy to GitHub Pages → Run workflow**.
