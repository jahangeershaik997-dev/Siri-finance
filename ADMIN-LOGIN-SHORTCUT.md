# Whizzfly Admin Login – Shortcut (no curl, no seed key)

Use **only these 6 environment variables** in Vercel. Then create your admin from the browser.

---

## 1. Add these 6 in Vercel (Settings → Environment Variables)

| # | Key | Value | Sensitive? |
|---|-----|-------|------------|
| 1 | `NEXT_PUBLIC_SUPABASE_URL` | `https://rpjhltefgwxsnbvuuxad.supabase.co` | No |
| 2 | `SUPABASE_SERVICE_ROLE_KEY` | (paste your Supabase **service_role** key from Supabase → Settings → API) | Yes |
| 3 | `NEXTAUTH_SECRET` | `p5X3m9qL2zA8wV7sK4tB1cN6yR0uH9dJ2fG8kL3nM` | Yes |
| 4 | `NEXTAUTH_URL` | Your Whizzfly site URL, e.g. `https://whizzfly.vercel.app` | No |
| 5 | `ADMIN_SEED_EMAIL` | `jahangeershaik997@gmail.com` | Yes (optional) |
| 6 | `ADMIN_SEED_PASSWORD` | The password you want for admin (e.g. `123456789`) | Yes |

**You do NOT need:** `SEED_SUPER_ADMINS_KEY` or any curl command.

---

## 2. Redeploy

Vercel → Deployments → Redeploy the latest. Wait until it’s done.

---

## 3. Create your admin (in the browser)

1. Open: **https://YOUR-WHIZZFLY-URL/admin/setup**  
   (Replace YOUR-WHIZZFLY-URL with your real site, e.g. `whizzfly.vercel.app`.)

2. Click **“Create first admin”**.

3. When it says “First admin created”, click **“Go to login”**.

---

## 4. Log in

- **URL:** `https://YOUR-WHIZZFLY-URL/admin/login`
- **Email:** `jahangeershaik997@gmail.com`
- **Password:** whatever you set in `ADMIN_SEED_PASSWORD` (e.g. `123456789`)

---

## Summary

| Step | What to do |
|------|------------|
| 1 | Add the 6 env vars in Vercel (see table above). |
| 2 | Redeploy. |
| 3 | Visit `/admin/setup` → click “Create first admin”. |
| 4 | Visit `/admin/login` → sign in with your email and password. |

Done. No Supabase “Create new secret API key”, no curl, no `SEED_SUPER_ADMINS_KEY`.
