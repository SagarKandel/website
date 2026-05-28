# Sagar Kandel — Personal Portfolio

A full-stack personal portfolio with analytics dashboard, lead management, and email notifications.

## 🏗️ Architecture

```
sagar-portfolio/
├── apps/
│   ├── web/          → Next.js 14 frontend (sagarkandel.com)
│   └── api/          → Express.js backend API
├── packages/
│   └── shared/       → Shared TypeScript types
└── .github/
    └── workflows/    → CI/CD pipelines
```

## 🚀 Tech Stack

### Frontend
- **Next.js 14** — App Router, SSR/SSG, SEO
- **TypeScript** — Type safety throughout
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **Three.js** — 3D interactive background
- **shadcn/ui** — Accessible component library

### Backend
- **Node.js + Express** — REST API
- **PostgreSQL + Prisma** — Database & ORM
- **Redis** — Rate limiting & caching
- **JWT** — Admin authentication
- **Nodemailer** — Email notifications

### Infrastructure
- **Vercel** — Frontend hosting
- **Railway** — Backend + DB hosting
- **Cloudflare** — DNS + CDN + SSL for both domains
- **GitHub Actions** — CI/CD

## 🌐 Domains
- `sagarkandel.com` — Primary portfolio
- `sagar-kandel.com.np` — Nepal domain redirect

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Redis

### 1. Clone & Install
```bash
git clone https://github.com/SagarKandel/sagar-portfolio.git
cd sagar-portfolio
npm install
```

### 2. Environment Variables

**Frontend** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Backend** (`apps/api/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/sagar_portfolio
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-super-secret-jwt-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
NOTIFY_EMAIL=sagar@sagarkandel.com
PORT=4000
```

### 3. Database Setup
```bash
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

### 4. Run Development
```bash
# From root
npm run dev
```

## 📊 Admin Dashboard
Access at `/admin` — login with credentials set during seed.

Features:
- Real-time visitor analytics (hits, geo, device, referrer)
- Lead / contact form management
- Email notification logs
- Resume download tracking

## 🚀 Deployment

### Frontend → Vercel
1. Connect GitHub repo to Vercel
2. Set `Root Directory` to `apps/web`
3. Add environment variables
4. Deploy

### Backend → Railway
1. Connect GitHub repo
2. Set `Root Directory` to `apps/api`
3. Add PostgreSQL + Redis plugins
4. Add environment variables
5. Deploy

### Cloudflare DNS
- `sagarkandel.com` → Vercel IP (A record)
- `api.sagarkandel.com` → Railway domain (CNAME)
- `sagar-kandel.com.np` → Redirect to `sagarkandel.com`

## 📁 Key Files
- `apps/web/src/app/` — Next.js pages
- `apps/web/src/components/sections/` — Portfolio sections
- `apps/api/src/routes/` — API endpoints
- `apps/api/prisma/schema.prisma` — Database schema
