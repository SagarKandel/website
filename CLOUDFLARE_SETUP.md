# Cloudflare DNS & SSL Setup Guide

## 1. Add both domains to Cloudflare
Go to dash.cloudflare.com → Add Site for each domain:
- sagarkandel.com
- sagar-kandel.com.np

## 2. DNS Records for sagarkandel.com

### Frontend (Vercel)
| Type  | Name | Value                     | Proxy |
|-------|------|---------------------------|-------|
| A     | @    | 76.76.19.61               | ✅    |
| A     | www  | 76.76.19.61               | ✅    |
| CNAME | www  | cname.vercel-dns.com      | ✅    |

> Get exact Vercel IP from your Vercel project settings → Domains

### Backend API (Railway)
| Type  | Name | Value                           | Proxy |
|-------|------|---------------------------------|-------|
| CNAME | api  | your-service.railway.app        | ✅    |

> Replace with your Railway service domain

### Email (Gmail MX — optional if using custom email)
| Type | Name | Value                        | Priority |
|------|------|------------------------------|----------|
| MX   | @    | aspmx.l.google.com           | 1        |
| MX   | @    | alt1.aspmx.l.google.com      | 5        |

## 3. DNS Records for sagar-kandel.com.np

Redirect this domain to your primary domain:
| Type     | Name | Value                    | Proxy |
|----------|------|--------------------------|-------|
| CNAME    | @    | sagarkandel.com          | ✅    |

Then in Cloudflare → Rules → Redirect Rules:
- If hostname equals sagar-kandel.com.np
- Then Redirect to https://sagarkandel.com (301)

## 4. SSL/TLS Settings
In Cloudflare → SSL/TLS:
- Mode: Full (strict)
- Always Use HTTPS: ON
- HSTS: enabled (max-age: 1 year)

## 5. Speed Optimizations (free tier)
- Auto Minify: JS ✅, CSS ✅, HTML ✅
- Brotli compression: ON
- Early Hints: ON

## 6. Security
- Bot Fight Mode: ON
- Browser Integrity Check: ON
- Security Level: Medium

## 7. Vercel Domain Setup
In Vercel project → Settings → Domains:
- Add sagarkandel.com
- Add www.sagarkandel.com
- Vercel auto-provisions Let's Encrypt SSL

## 8. Railway Custom Domain
In Railway → Service → Settings → Domains:
- Add api.sagarkandel.com
- Railway provides SSL automatically
