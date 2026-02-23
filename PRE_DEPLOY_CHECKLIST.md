# Pre-Deploy Checklist (Whizzfly)

Before going live on Vercel, verify:

## Already done
- [x] All Whizzfly files pushed to **https://github.com/jahangeershaik997-dev/whizzfly**
- [x] CountryTabs TypeScript fix (build passes)
- [x] Formspree endpoint set (xreaoqpq) in code
- [x] Contact: phone 7794920021, WhatsApp, email Syed.mujaheedsm77949@gmail.com
- [x] vercel.json and next.config.js present

## On Vercel (before deploy / after first deploy)
1. **Import repo:** https://github.com/jahangeershaik997-dev/whizzfly → Continue → Deploy
2. **Optional env var (Vercel Project → Settings → Environment Variables):**
   - `NEXT_PUBLIC_SITE_URL` = your live URL (e.g. `https://whizzfly.vercel.app`) — for SEO/OG tags
3. **Formspree:** Lead and contact forms already use Formspree; no env needed unless you create a new form and want to override:
   - `NEXT_PUBLIC_FORMSPREE_LEAD_FORM_ID`
   - `NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID`

## After deploy
- [ ] Open the live URL and test: Home, Services, Contact
- [ ] Submit the hero lead form once — check Formspree dashboard for submission
- [ ] Submit the contact page form once — check Formspree
- [ ] Click phone and WhatsApp links (mobile)
- [ ] Optional: add custom domain in Vercel (Project → Settings → Domains)

Nothing else is required for a basic deploy. Forms work without env vars.
