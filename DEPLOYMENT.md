# Deployment Guide

## Step 1: Push to GitHub

```bash
cd sagar-portfolio
git init
git add .
git commit -m "feat: initial portfolio setup"
git branch -M main
git remote add origin https://github.com/SagarKandel/sagar-portfolio.git
git push -u origin main
```

## Step 2: Deploy Backend → Railway

1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select `SagarKandel/sagar-portfolio`
3. Set **Root Directory**: `apps/api`
4. Add plugins: **PostgreSQL** and **Redis**
5. Add environment variables (copy from `apps/api/.env.example`):
   ```
   DATABASE_URL=(auto-filled by Railway PostgreSQL plugin)
   JWT_SECRET=generate-a-strong-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your@gmail.com
   SMTP_PASS=your-app-password
   NOTIFY_EMAIL=sagar@sagarkandel.com
   ADMIN_EMAIL=admin@sagarkandel.com
   ADMIN_PASSWORD=strong-password-here
   FRONTEND_URL=https://sagarkandel.com
   PORT=4000
   ```
6. Run seed: Railway → Service → Shell → `npx tsx src/db/seed.ts`
7. Note your Railway public domain (e.g., `xyz.railway.app`)
8. Add custom domain: `api.sagarkandel.com`

## Step 3: Deploy Frontend → Vercel

1. Go to https://vercel.com → New Project → Import `SagarKandel/sagar-portfolio`
2. Set **Root Directory**: `apps/web`
3. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.sagarkandel.com
   NEXT_PUBLIC_SITE_URL=https://sagarkandel.com
   ```
4. Deploy
5. Add custom domains: `sagarkandel.com` and `www.sagarkandel.com`

## Step 4: GitHub Actions Secrets

In GitHub repo → Settings → Secrets → Actions, add:
```
VERCEL_TOKEN          ← from vercel.com/account/tokens
VERCEL_ORG_ID         ← from .vercel/project.json after first deploy
VERCEL_PROJECT_ID     ← from .vercel/project.json after first deploy  
RAILWAY_TOKEN         ← from railway.app/account/tokens
NEXT_PUBLIC_API_URL   ← https://api.sagarkandel.com
```

## Step 5: Gmail App Password (for email notifications)

1. Go to myaccount.google.com → Security → 2-Step Verification → App passwords
2. Generate a password for "Mail"
3. Use this 16-character password as SMTP_PASS

## Step 6: Cloudflare DNS

See CLOUDFLARE_SETUP.md for detailed DNS configuration.

## Verification Checklist

- [ ] `sagarkandel.com` loads portfolio
- [ ] `api.sagarkandel.com/health` returns `{"status":"ok"}`  
- [ ] Contact form sends email notification
- [ ] `sagarkandel.com/admin` dashboard loads
- [ ] Admin login works
- [ ] Analytics tracking records page views
- [ ] `sagar-kandel.com.np` redirects to `sagarkandel.com`
- [ ] SSL works on both domains (green padlock)
- [ ] GitHub Actions CI/CD passes on push to main
