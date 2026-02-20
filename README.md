# Siri Financial Services Website

A production-ready multi-page website for Siri Financial Services (SFS) - a loan and financial services company in Hyderabad, India.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form** + **Zod** (form validation)
- **Framer Motion** (animations)
- **Sonner** (toast notifications)

## Features

- ✅ Multi-step loan application form
- ✅ Lead generation and management
- ✅ EMI calculator
- ✅ Service pages with dynamic routing
- ✅ Responsive design (mobile-first)
- ✅ SEO optimized
- ✅ PWA ready

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Siri-finance.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository `jahangeershaik997-dev/Siri-finance`
4. Configure settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=917095899552
NEXT_PUBLIC_PHONE_NUMBER=7095899552
NEXT_PUBLIC_COMPANY_EMAIL=info@sirifinancialservices.com
ADMIN_API_KEY=sfs-admin-secret-key
```

(Optional) For Google Sheets integration:
```
GOOGLE_SHEET_ID=your_sheet_id
```

(Optional) For email notifications:
```
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NOTIFICATION_EMAIL=your_notification_email@gmail.com
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete. Your site will be live at:
`https://siri-finance.vercel.app` (or your custom domain)

## API Endpoints

### POST `/api/leads`
Submit a lead/enquiry. Saves to `data/leads.json`.

**Request Body:**
```json
{
  "source": "hero-form" | "apply-page" | "service-page",
  "fullName": "string",
  "mobileNumber": "string",
  "loanType": "string",
  "loanAmount": "string",
  "city": "string"
}
```

**Response:**
```json
{
  "success": true,
  "referenceNumber": "SFS-20250220-1234"
}
```

### GET `/api/leads/export`
Export all leads as CSV. Requires `x-api-key` header with `ADMIN_API_KEY` value.

## Project Structure

```
/app
  /api/leads          # Lead management API
  /apply              # Multi-step application form
  /services           # Services listing and detail pages
  /about              # About page
  /contact            # Contact page
  /privacy-policy     # Privacy policy
  /terms              # Terms and conditions
/components
  /layout             # Navbar, Footer, FloatingButtons
  /home               # Home page sections
  /apply              # Application form steps
  /shared             # Reusable components
/lib
  /constants.ts       # All constants and options
  /validations.ts     # Zod schemas
  /utils.ts           # Utility functions
  /types.ts           # TypeScript types
/data
  /services.ts        # Service data
  /leads.json         # Lead storage (gitignored)
```

## Environment Variables

See `.env.local.example` for all available environment variables.

## License

Private - Siri Financial Services
