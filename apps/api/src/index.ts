import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import { PrismaClient } from '@prisma/client'

import { trackRouter } from './routes/track'
import { leadsRouter } from './routes/leads'
import { authRouter } from './routes/auth'
import { dashboardRouter } from './routes/dashboard'
import { cmsRouter, contentRouter } from './routes/cms'
import { authMiddleware } from './middleware/auth'

const app = express()
const PORT = process.env.PORT || 4000
const prisma = new PrismaClient()

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}))

// CORS
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://sagarkandel.com',
    'https://www.sagarkandel.com',
    'https://sagar-kandel.com.np',
  ],
  credentials: true,
}))

app.use(compression())
app.use(express.json({ limit: '10kb' }))
app.use(morgan('combined'))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
})

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions, please try again later.' },
})

app.use('/api', limiter)

// Routes
app.use('/track', trackRouter)
app.use('/leads', strictLimiter, leadsRouter)
app.use('/auth', authRouter)
app.use('/dashboard', authMiddleware, dashboardRouter)
app.use('/content', contentRouter)          // public read-only
app.use('/cms', authMiddleware, cmsRouter)  // admin write + read

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

// Cleanup stale realtime sessions every minute
setInterval(async () => {
  const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000)
  await prisma.activeSession.deleteMany({ where: { lastSeen: { lt: tenMinAgo } } }).catch(() => {})
}, 60_000)

export default app
