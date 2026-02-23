# Whizzfly – Publish to GitHub & Deploy

## 1. Publish to GitHub (new repo: whizzfly)

Run these in your project folder (PowerShell or Git Bash):

```powershell
cd "c:\Users\ShaikJahangeer\OneDrive - PEI Media\Desktop\New folder\Siri-finance"

# Stage and commit all Wizzfly/Whizzfly changes
git add .
git commit -m "Whizzfly: Wizzfly Overseas site, publish as whizzfly project"

# Create new GitHub repo "whizzfly" and push (requires GitHub CLI: gh auth login)
gh repo create whizzfly --public --source=. --remote=whizzfly --push
```

If you don't have GitHub CLI, do this instead:

1. Go to https://github.com/new
2. Repository name: **whizzfly**
3. Public, leave "Add a README" unchecked
4. Create repository
5. Then run (replace YOUR_USERNAME with your GitHub username):

```powershell
git remote add whizzfly https://github.com/YOUR_USERNAME/whizzfly.git
git push whizzfly main
```

## 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import the **whizzfly** repository from GitHub
3. Project name: **whizzfly** (or leave default)
4. Framework: Next.js (auto-detected)
5. Optional: add Environment Variable `NEXT_PUBLIC_SITE_URL` = your live URL
6. Click Deploy

Your site will be live at `https://whizzfly.vercel.app` (or your custom domain).
