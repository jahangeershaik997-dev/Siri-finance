# Deployment Guide for Siri Financial Services

## Quick Deploy to Vercel

### Step 1: Push Code to GitHub

If you haven't already:

```bash
cd "c:\Users\ShaikJahangeer\OneDrive - PEI Media\Desktop\siri"
git init
git add .
git commit -m "Initial commit - Siri Financial Services website"
git branch -M main
git remote add origin https://github.com/jahangeershaik997-dev/Siri-finance.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "New Project"**
4. **Import Repository**: Select `jahangeershaik997-dev/Siri-finance`
5. **Configure Project**:
   - **Framework Preset**: `Next.js` (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### Step 3: Add Environment Variables

**IMPORTANT**: Click "Environment Variables" section and add:

```
NEXT_PUBLIC_WHATSAPP_NUMBER = 917095899552
NEXT_PUBLIC_PHONE_NUMBER = 7095899552
NEXT_PUBLIC_COMPANY_EMAIL = info@sirifinancialservices.com
ADMIN_API_KEY = sfs-admin-secret-key
```

**Optional** (for future features):
```
GOOGLE_SHEET_ID = (leave empty for now)
SMTP_HOST = (leave empty for now)
SMTP_USER = (leave empty for now)
SMTP_PASS = (leave empty for now)
NOTIFICATION_EMAIL = (leave empty for now)
```

### Step 4: Deploy

1. Click the **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://siri-finance.vercel.app` (or your custom domain)

## After Deployment

### Your Live URL
Once deployed, Vercel will provide you with a URL like:
- `https://siri-finance-xyz.vercel.app`
- Or your custom domain if configured

### Test the Forms

1. **Home Page Form**: Fill the "Get Free Loan Consultation" form on homepage
2. **Apply Page**: Test the multi-step application form at `/apply`
3. **Contact Form**: Test the contact form at `/contact`

All forms submit to `/api/leads` and save to `data/leads.json` (stored in Vercel's file system).

### Access Leads Data

To export leads:
1. Make a GET request to `https://your-domain.vercel.app/api/leads/export`
2. Include header: `x-api-key: sfs-admin-secret-key`
3. Or use: `Authorization: Bearer sfs-admin-secret-key`

Example using curl:
```bash
curl -H "x-api-key: sfs-admin-secret-key" https://your-domain.vercel.app/api/leads/export
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (Vercel auto-detects)

### Forms Not Working
- Verify environment variables are set correctly
- Check browser console for errors
- Ensure API route `/api/leads` is accessible

### 404 Errors
- Verify all pages exist in `/app` directory
- Check `next.config.js` is correct

## Next Steps

1. **Custom Domain**: Add your domain in Vercel project settings
2. **Analytics**: Add `NEXT_PUBLIC_GA_ID` environment variable for Google Analytics
3. **Email Notifications**: Configure SMTP settings to receive lead notifications
4. **Google Sheets**: Add `GOOGLE_SHEET_ID` to sync leads to Google Sheets

## Support

For issues, check:
- Vercel deployment logs
- Browser console errors
- Network tab for API calls
