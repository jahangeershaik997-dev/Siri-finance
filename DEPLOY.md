# Deploy to production (Vercel)

Use this to publish the Siri Financial Services site.

---

## 1. Supabase (run once)

1. In your Supabase project (**siri-finance**), open **SQL Editor**.
2. Run the table scripts if not already done:
   - **Admin users:** `supabase/admin_users.sql` (for login).
   - **Submissions:** `supabase/submissions.sql` (for form data visible in Admin → Submissions).
3. If the policy "Service role full access" for `submissions` already exists, skip that line or run only the `create table` and `create index` parts.

---

## 2. Vercel

1. Push your code to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. **Framework:** Next.js (auto-detected). **Root Directory:** leave as is. Click **Deploy** (first deploy may fail until env is set).
4. In the project, go to **Settings** → **Environment Variables**. Add:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | From Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | (service_role key) | Same place; keep secret |
| `NEXTAUTH_SECRET` | (random string) | e.g. `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-domain.com` | Your live site URL (e.g. `https://sirifinancialservices.com`) |
| `SEED_SUPER_ADMINS_KEY` | (a secret you choose) | For one-time seed of super admins |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | Same as NEXTAUTH_URL for OG/sitemap |

Optional:

- `ADMIN_API_KEY` – if set, Export to Word (when not logged in) requires this key.
- `COMPANY_EMAIL_RECIPIENT` – mailto/form recipient email.
- `CALLMEBOT_API_KEY` / `WHATSAPP_PHONE` – WhatsApp alerts.
- `NEXT_PUBLIC_FORMSPREE_*` – Formspree form IDs if different from defaults.

5. **Redeploy** (Deployments → ⋮ → Redeploy) after saving env vars.

---

## 3. After first deploy

1. **Seed super admins** (once):  
   `POST https://your-domain.com/api/admin/seed-super-admins`  
   with header `x-seed-key: <SEED_SUPER_ADMINS_KEY>` and body `{}`.  
   Then log in at `https://your-domain.com/admin/login` with the seeded email and password.

2. **Share the Get info link** with the public:  
   `https://your-domain.com/get-info`  
   Submissions from Apply, Contact, Hero, and Get info are stored in Supabase and visible in **Admin → Submissions**. You can view detail and **Download Word** per submission.

3. **Custom domain:** In Vercel → Settings → Domains, add your domain and follow DNS instructions. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

---

## 4. Quick checks

- [ ] Homepage loads.
- [ ] Submit a form on **Get info** or **Apply**; then log in as admin and open **Submissions** – the new row appears.
- [ ] **Admin → Submissions** → View → **Download Word** works.
- [ ] **Admin → Export to Word** still works (manual paste and download).

---

See **PRE_LAUNCH.md** for pre-launch checklist (favicon, OG image, Formspree, etc.).
