import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /dashboard/stats — overview stats
router.get('/stats', async (_req: Request, res: Response) => {
  try {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalViews,
      viewsToday,
      viewsWeek,
      viewsMonth,
      totalLeads,
      newLeads,
      resumeDownloads,
      resumeDownloadsMonth,
    ] = await Promise.all([
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: today } } }),
      prisma.pageView.count({ where: { createdAt: { gte: weekAgo } } }),
      prisma.pageView.count({ where: { createdAt: { gte: monthAgo } } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.resumeDownload.count(),
      prisma.resumeDownload.count({ where: { createdAt: { gte: monthAgo } } }),
    ])

    res.json({
      pageViews: { total: totalViews, today: viewsToday, week: viewsWeek, month: viewsMonth },
      leads: { total: totalLeads, new: newLeads },
      resumeDownloads: { total: resumeDownloads, month: resumeDownloadsMonth },
    })
  } catch (err) {
    console.error('Stats error:', err)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

// GET /dashboard/views-over-time — daily views for chart (last 30 days)
router.get('/views-over-time', async (_req: Request, res: Response) => {
  try {
    const days = 30
    const since = new Date()
    since.setDate(since.getDate() - days)

    const views = await prisma.pageView.groupBy({
      by: ['createdAt'],
      where: { createdAt: { gte: since } },
      _count: true,
      orderBy: { createdAt: 'asc' },
    })

    // Aggregate by day
    const byDay: Record<string, number> = {}
    views.forEach((v) => {
      const day = v.createdAt.toISOString().split('T')[0]
      byDay[day] = (byDay[day] || 0) + v._count
    })

    // Fill gaps
    const result = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const key = d.toISOString().split('T')[0]
      result.push({ date: key, views: byDay[key] || 0 })
    }

    res.json(result)
  } catch (err) {
    console.error('Views over time error:', err)
    res.status(500).json({ error: 'Failed to fetch views' })
  }
})

// GET /dashboard/geo — top countries
router.get('/geo', async (_req: Request, res: Response) => {
  try {
    const data = await prisma.pageView.groupBy({
      by: ['country'],
      where: { country: { not: null } },
      _count: { country: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    })
    res.json(data.map((d) => ({ country: d.country, count: d._count.country })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch geo' })
  }
})

// GET /dashboard/devices — device breakdown
router.get('/devices', async (_req: Request, res: Response) => {
  try {
    const data = await prisma.pageView.groupBy({
      by: ['device'],
      _count: { device: true },
    })
    res.json(data.map((d) => ({ device: d.device || 'unknown', count: d._count.device })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch devices' })
  }
})

// GET /dashboard/leads — all leads
router.get('/leads', async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = 20
    const status = req.query.status as string | undefined

    const where = status ? { status: status as 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED' } : {}

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lead.count({ where }),
    ])

    res.json({ leads, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads' })
  }
})

// PATCH /dashboard/leads/:id — update lead status
router.patch('/leads/:id', async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body
    const lead = await prisma.lead.update({
      where: { id: req.params.id },
      data: { status, notes },
    })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update lead' })
  }
})

// GET /dashboard/referrers — top referrers
router.get('/referrers', async (_req: Request, res: Response) => {
  try {
    const data = await prisma.pageView.groupBy({
      by: ['referrer'],
      where: { referrer: { not: null } },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    })
    res.json(data.map((d) => ({ referrer: d.referrer, count: d._count.referrer })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch referrers' })
  }
})

// GET /dashboard/browsers — browser breakdown
router.get('/browsers', async (_req: Request, res: Response) => {
  try {
    const data = await prisma.pageView.groupBy({
      by: ['browser'],
      _count: { browser: true },
      orderBy: { _count: { browser: 'desc' } },
    })
    res.json(data.map((d) => ({ browser: d.browser || 'Unknown', count: d._count.browser })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch browsers' })
  }
})

// GET /dashboard/pages — top pages by views
router.get('/pages', async (_req: Request, res: Response) => {
  try {
    const monthAgo = new Date()
    monthAgo.setDate(monthAgo.getDate() - 30)
    const data = await prisma.pageView.groupBy({
      by: ['page'],
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } },
      take: 15,
    })
    const monthData = await prisma.pageView.groupBy({
      by: ['page'],
      where: { createdAt: { gte: monthAgo } },
      _count: { page: true },
    })
    const monthMap: Record<string, number> = {}
    monthData.forEach((d) => { monthMap[d.page] = d._count.page })
    res.json(data.map((d) => ({
      page: d.page,
      total: d._count.page,
      month: monthMap[d.page] || 0,
    })))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pages' })
  }
})

// GET /dashboard/realtime — active sessions in last 5 min
router.get('/realtime', async (_req: Request, res: Response) => {
  try {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
    const active = await prisma.activeSession.findMany({
      where: { lastSeen: { gte: fiveMinAgo } },
      orderBy: { lastSeen: 'desc' },
    })
    res.json({ count: active.length, sessions: active })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch realtime' })
  }
})

export { router as dashboardRouter }
