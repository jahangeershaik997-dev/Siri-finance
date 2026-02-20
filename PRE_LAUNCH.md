# Pre-launch checklist – Siri Financial Services

Use this list before going live.

---

## ✅ Done in code

- **Site URL from env** – Set `NEXT_PUBLIC_SITE_URL` in Vercel to your live domain (e.g. `https://sirifinancialservices.com`). Sitemap, robots, and Open Graph use it.
- **Service pages SEO** – Each service (e.g. `/services/personal-loan`) has its own title and description for search.
- **Contact page SEO** – Contact has a proper title and description.
- **Security headers** – `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` are set.
- **Custom 404** – Branded “Page not found” with a link back to home.

---

## 🔧 You should do

### 1. **Domain & env (Vercel)**

- [ ] Add custom domain in Vercel (e.g. `sirifinancialservices.com`) if not already.
- [ ] Set **`NEXT_PUBLIC_SITE_URL`** = your live URL (e.g. `https://sirifinancialservices.com`).  
  If you only use `siri-finance.vercel.app`, set it to `https://siri-finance.vercel.app`.
- [ ] Redeploy after changing env.

### 2. **Favicon & OG image**

- [ ] Add `app/icon.png` (or `favicon.ico` in `public/`) so the browser tab shows your logo.
- [ ] Add `public/images/logo-og.png` (or update layout if you use another path) for link previews on WhatsApp/Social.  
  Recommended size: 1200×630 px.

### 3. **Forms & WhatsApp**

- [ ] Confirm Formspree forms (Hero, Contact, Apply) are receiving submissions and (if set) forwarding to Discord/email.
- [ ] When CallMeBot has capacity: get API key, set **`CALLMEBOT_API_KEY`** in Vercel, redeploy.  
  Optional second number: **`CALLMEBOT_API_KEY_2`** and **`WHATSAPP_PHONE_2`**.

### 4. **Content & legal**

- [ ] Read Privacy Policy and Terms; update contact email/phone if needed.
- [ ] Confirm address, phone, email, and hours in Footer/Contact match reality.
- [ ] If you use Google Analytics: set **`NEXT_PUBLIC_GA_ID`** and add the script (if not already).

### 5. **Quick tests**

- [ ] Submit Hero, Contact, and Apply forms once and check Formspree.
- [ ] Open `/services/personal-loan` and another service – titles in the tab should match the service.
- [ ] Visit a wrong URL (e.g. `/xyz`) – custom 404 and “Back to Home” should show.
- [ ] Share homepage link on WhatsApp – preview should show (once OG image exists).

---

## Optional later

- **WhatsApp** – Enable when CallMeBot gives you the key (see earlier steps).
- **Leads export** – `/api/leads/export` is for admin; keep **`ADMIN_API_KEY`** secret and only use from a safe place.
- **Export to Word** – Go to **/admin/export**. Paste a submission (as JSON from Formspree or any source), enter your `ADMIN_API_KEY`, and click **Download Word** to get a .docx file.
- **PWA** – `manifest.json` is already linked; add icons if you want “Add to home screen” to look good.

---

Once the above is done, you’re in good shape to go live.
