import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import geoip from 'geoip-lite'

const router = Router()
const prisma = new PrismaClient()

function getIP(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    ''
  )
}

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad/i.test(ua)) return 'mobile'
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  return 'desktop'
}

function parseBrowser(ua: string): string {
  if (/chrome/i.test(ua) && !/edge|opr/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari'
  if (/edge/i.test(ua)) return 'Edge'
  if (/opr|opera/i.test(ua)) return 'Opera'
  return 'Other'
}

function parseOS(ua: string): string {
  if (/windows/i.test(ua)) return 'Windows'
  if (/macintosh|mac os x/i.test(ua)) return 'macOS'
  if (/linux/i.test(ua)) return 'Linux'
  if (/android/i.test(ua)) return 'Android'
  if (/iphone|ipad/i.test(ua)) return 'iOS'
  return 'Other'
}

// POST /track/pageview
router.post('/pageview', async (req: Request, res: Response) => {
  try {
    const ip = getIP(req)
    const geo = geoip.lookup(ip)
    const ua = req.body.userAgent || req.headers['user-agent'] || ''

    await prisma.pageView.create({
      data: {
        page: req.body.page || '/',
        referrer: req.body.referrer || null,
        userAgent: ua,
        ip: ip || null,
        country: geo?.country || null,
        city: geo?.city || null,
        device: parseDevice(ua),
        browser: parseBrowser(ua),
        os: parseOS(ua),
        screenResolution: req.body.screenResolution || null,
        language: req.body.language || null,
      },
    })

    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Track pageview error:', err)
    res.status(500).json({ error: 'Failed to track' })
  }
})

// POST /track/resume-download
router.post('/resume-download', async (req: Request, res: Response) => {
  try {
    const ip = getIP(req)
    const geo = geoip.lookup(ip)

    await prisma.resumeDownload.create({
      data: {
        ip: ip || null,
        country: geo?.country || null,
        referrer: req.headers.referer || null,
        userAgent: req.headers['user-agent'] || null,
      },
    })

    res.status(201).json({ ok: true })
  } catch (err) {
    console.error('Track resume error:', err)
    res.status(500).json({ error: 'Failed to track' })
  }
})

export { router as trackRouter }
