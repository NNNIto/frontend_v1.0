# Publish this project to GitHub

Target repository: https://github.com/NNNIto/frontend_v1.0

If the remote repository is empty and you want to publish this project from this folder, run these commands in PowerShell (from project root):

```powershell
# initialize git if not already
git init
git add .
git commit -m "chore: initial frontend import"
git branch -M main
git remote add origin https://github.com/NNNIto/frontend_v1.0.git
git push -u origin main
```

If you prefer SSH:

```powershell
git remote add origin git@github.com:NNNIto/frontend_v1.0.git
git push -u origin main
```

If the remote already has commits and you intentionally want to overwrite it, use `--force` when pushing (be careful):

```powershell
git push -u origin main --force
```

Notes:
- `.env.local` and other env files are in `.gitignore`. Do not commit secrets.
- If Git prompts for credentials when pushing over HTTPS, create a GitHub Personal Access Token (PAT) with `repo` scope and use it as the password.
- If you want me to prepare a `LICENSE` or to update `package.json` before push, tell me and I will add them.
