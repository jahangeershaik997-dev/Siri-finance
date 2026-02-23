# Whizzfly – Publish to GitHub & Deploy

**Commit is already done.** Next: create the GitHub repo and push, then deploy.

## 1. Publish to GitHub (new repo: whizzfly)

1. Go to **https://github.com/new**
2. Repository name: **whizzfly**
3. Public, leave "Add a README" unchecked
4. Click **Create repository**
5. In your project folder, run (replace **YOUR_USERNAME** with your GitHub username):

```powershell
cd "c:\Users\ShaikJahangeer\OneDrive - PEI Media\Desktop\New folder\Siri-finance"
git remote add whizzfly https://github.com/YOUR_USERNAME/whizzfly.git
git push whizzfly main
```

If you prefer SSH:
```powershell
git remote add whizzfly git@github.com:YOUR_USERNAME/whizzfly.git
git push whizzfly main
```

## 2. Deploy to Vercel (as project "whizzfly")

**Option A – New project named whizzfly (after you push to GitHub)**  
1. Go to https://vercel.com/new  
2. Import the **whizzfly** repository from GitHub  
3. Project name: **whizzfly**  
4. Framework: Next.js (auto-detected)  
5. Optional: add Environment Variable `NEXT_PUBLIC_SITE_URL` = your live URL  
6. Click Deploy  

Your site will be at `https://whizzfly.vercel.app` (or your custom domain).

**Option B – Current deploy**  
A deploy was started from this folder; it may be linked to an existing Vercel project (e.g. siri-finance). Check: https://vercel.com/shaik-jahangeers-projects/siri-finance  
To have a separate **whizzfly** project and URL, push this code to a new GitHub repo named **whizzfly** (step 1 above), then use Option A to create a new Vercel project from that repo.
