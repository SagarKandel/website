import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// GET /settings — public, returns all settings as { key: value } map
router.get('/', async (_req: Request, res: Response) => {
  const rows = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  rows.forEach(r => { map[r.key] = r.value })
  res.json(map)
})

// PUT /settings — admin only, body: { key: string, value: string }[]
router.put('/', authMiddleware, async (req: Request, res: Response) => {
  const entries: { key: string; value: string }[] = req.body
  if (!Array.isArray(entries)) return res.status(400).json({ error: 'Expected array' })

  await Promise.all(
    entries.map(({ key, value }) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  )
  res.json({ ok: true })
})

export { router as settingsRouter }
