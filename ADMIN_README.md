# Admin & company login

## Access model (how it works)

- **Public / clients** – The website is **fully public**. Anyone can open it, browse, and fill forms (Hero “Get Free Quotes”, Contact, Apply). No login required.
- **Form data** – Submissions go to Formspree (and optionally WhatsApp). **Only registered and logged-in employees** can view or use that data.
- **Employees** – An **admin** adds employees (Users → Add user). Until the admin **approves** them, they cannot sign in. Once approved, the employee logs in at `/admin/login` with **their own email and password** and can access Dashboard and Export to Word.
- **Removing access** – An admin can **revoke** an employee anytime (Users → Revoke). That user can no longer sign in until approved again.
- So: **public view stays as-is; data filled by the public is only visible after you log in as an approved admin/employee; employee access requests are handled by the admin (add user → approve); admin can remove permissions (revoke).**

## Setup (one-time)

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the dashboard, go to **SQL Editor** and run the script in **`supabase/admin_users.sql`** (creates the `admin_users` table).
3. In **Project Settings → API**, copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under "Project API keys") → `SUPABASE_SERVICE_ROLE_KEY`

### 2. NextAuth

1. Generate a secret:  
   `openssl rand -base64 32`  
   → set as **`NEXTAUTH_SECRET`**
2. Set **`NEXTAUTH_URL`**:
   - Local: `http://localhost:3000`
   - Production: `https://yourdomain.com`

### 3. Super admins (recommended)

The two super-admin emails are **jahangeershaik997@gmail.com** and **malleshmuthyala5@gmail.com**; both use password **123456789** and show as **Jahangeer** / **Mallesh** when logged in. Only these two can access **Users** (grant/revoke, add users).

1. In Supabase SQL Editor, run **`supabase/admin_users.sql`** (and if the table already existed, run: `alter table public.admin_users add column if not exists display_name text;`).
2. In env, set **`SEED_SUPER_ADMINS_KEY`** to any secret string (e.g. a random password).
3. Call the seed API once (e.g. from a terminal):
   ```bash
   curl -X POST http://localhost:3000/api/admin/seed-super-admins -H "x-seed-key: YOUR_SEED_KEY"
   ```
   Or from browser console: `fetch('/api/admin/seed-super-admins', { method: 'POST', headers: { 'x-seed-key': 'YOUR_SEED_KEY' } }).then(r=>r.json()).then(console.log)`
4. Go to **`/admin/login`** and sign in with one of the two emails and password **123456789**.

Alternatively, use the generic first-admin flow: set **`ADMIN_SEED_EMAIL`** and **`ADMIN_SEED_PASSWORD`**, visit **`/admin/setup`**, then add the second super admin from **Users** (only the two super-admin emails can open Users).

## Roles

- **Admin** – Can sign in, access Dashboard, Export to Word, and **Users** (register/approve others).
- **Company** – Can sign in and access Dashboard and Export to Word only. Must be **approved** by an admin before they can sign in.

## Pages

| URL | Who | Description |
|-----|-----|-------------|
| `/admin/setup` | Anyone | One-time: create first admin (when no users exist and seed env is set). |
| `/admin/login` | Anyone | Sign in. |
| `/admin` | Logged-in, approved | Dashboard (links to Export, Users for admins). |
| `/admin/export` | Logged-in, approved | Export submissions to Word. |
| `/admin/users` | **Admin only** | List users, add user, approve/revoke. |

## Adding users (admin only)

1. Sign in as **admin** → open **Users**.
2. Fill **Add user** (email, password, role: Admin or Company, and optionally tick **Approved**).
3. New users can sign in at `/admin/login` only after they are **approved** (or you ticked Approved when adding them).
4. Use **Approve** / **Revoke** in the table to change approval.

## Email routing

- **Display:** The site shows **info@sirifinancialservices.com** everywhere (footer, contact page, etc.).
- **mailto:** All mailto links open **malleshmuthyala5@gmail.com** (or the value of `COMPANY_EMAIL_RECIPIENT` in env).
- **Formspree:** Hero, Contact, and Apply forms submit to Formspree. To have submissions go to **malleshmuthyala5@gmail.com**, set that as the notification/recipient email in the Formspree dashboard for each form.
- **Env:** Optional `COMPANY_EMAIL_RECIPIENT=malleshmuthyala5@gmail.com` (default is already that address).

## Env summary

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL  
- `SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key  
- `NEXTAUTH_SECRET` – Random secret for sessions  
- `NEXTAUTH_URL` – App URL (e.g. `https://siri-finance.vercel.app`)  
- `SEED_SUPER_ADMINS_KEY` – Secret to call `/api/admin/seed-super-admins` once (creates the two super admins)  
- `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` – Optional; alternative first admin via `/admin/setup`  
- `COMPANY_EMAIL_RECIPIENT` – Optional; default malleshmuthyala5@gmail.com (where mailto and routing send)
