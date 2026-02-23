# Deploy Whizzfly to Vercel

Your GitHub repo: **https://github.com/jahangeershaik997-dev/whizzfly**

---

## Step 1: Push this project to your whizzfly repo (one-time)

Run in PowerShell from this project folder:

```powershell
cd "c:\Users\ShaikJahangeer\OneDrive - PEI Media\Desktop\New folder\Siri-finance"

# Add your whizzfly repo as a remote (if not already added)
git remote add whizzfly https://github.com/jahangeershaik997-dev/whizzfly.git

# Push main branch to whizzfly
git push whizzfly main
```

If you get "remote whizzfly already exists", just run:
```powershell
git push whizzfly main
```

---

## Step 2: Deploy on Vercel

1. Go to **https://vercel.com/new**
2. In **"Enter a Git repository URL to deploy..."** paste:
   ```
   https://github.com/jahangeershaik997-dev/whizzfly
   ```
3. Click **Continue**
4. Vercel will detect Next.js. Project name can stay **whizzfly**
5. Click **Deploy**

Your site will be live at **https://whizzfly.vercel.app** (or similar).

---

## Later: push updates

After you change code:

```powershell
git add .
git commit -m "Your message"
git push whizzfly main
```

Vercel will auto-deploy when you push to `main`.
