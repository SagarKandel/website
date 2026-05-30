import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

// ── Projects ──────────────────────────────────────────────────────────────────

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  longDesc: z.string().optional(),
  tech: z.array(z.string()).default([]),
  github: z.string().url().optional().or(z.literal('')),
  demo: z.string().url().optional().or(z.literal('')),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
})

router.get('/projects', async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })
  res.json(projects)
})

router.post('/projects', async (req: Request, res: Response) => {
  const parsed = projectSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const project = await prisma.project.create({ data: parsed.data })
  res.status(201).json(project)
})

router.put('/projects/:id', async (req: Request, res: Response) => {
  const parsed = projectSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const project = await prisma.project.update({ where: { id: req.params.id }, data: parsed.data })
    res.json(project)
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

router.delete('/projects/:id', async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

// ── Experience ────────────────────────────────────────────────────────────────

const expSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  description: z.string().min(1),
  tech: z.array(z.string()).default([]),
  order: z.number().int().default(0),
})

router.get('/experience', async (_req: Request, res: Response) => {
  const items = await prisma.experience.findMany({ orderBy: { order: 'asc' } })
  res.json(items)
})

router.post('/experience', async (req: Request, res: Response) => {
  const parsed = expSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const item = await prisma.experience.create({ data: parsed.data })
  res.status(201).json(item)
})

router.put('/experience/:id', async (req: Request, res: Response) => {
  const parsed = expSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const item = await prisma.experience.update({ where: { id: req.params.id }, data: parsed.data })
    res.json(item)
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

router.delete('/experience/:id', async (req: Request, res: Response) => {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

// ── Skills ────────────────────────────────────────────────────────────────────

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  level: z.number().int().min(0).max(100).default(80),
  order: z.number().int().default(0),
})

router.get('/skills', async (_req: Request, res: Response) => {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  res.json(skills)
})

router.post('/skills', async (req: Request, res: Response) => {
  const parsed = skillSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const skill = await prisma.skill.create({ data: parsed.data })
  res.status(201).json(skill)
})

router.put('/skills/:id', async (req: Request, res: Response) => {
  const parsed = skillSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const skill = await prisma.skill.update({ where: { id: req.params.id }, data: parsed.data })
    res.json(skill)
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

router.delete('/skills/:id', async (req: Request, res: Response) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

// ── Blog Posts ────────────────────────────────────────────────────────────────

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
})

router.get('/posts', async (req: Request, res: Response) => {
  const all = req.query.all === 'true'
  const posts = await prisma.blogPost.findMany({
    where: all ? {} : { published: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json(posts)
})

router.get('/posts/:slug', async (req: Request, res: Response) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } })
  if (!post) return res.status(404).json({ error: 'Not found' })
  res.json(post)
})

router.post('/posts', async (req: Request, res: Response) => {
  const parsed = postSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const post = await prisma.blogPost.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    })
    res.status(201).json(post)
  } catch {
    res.status(409).json({ error: 'Slug already exists' })
  }
})

router.put('/posts/:id', async (req: Request, res: Response) => {
  const parsed = postSchema.partial().safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const existing = await prisma.blogPost.findUnique({ where: { id: req.params.id } })
    const publishedAt =
      parsed.data.published && !existing?.publishedAt ? new Date() : existing?.publishedAt
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { ...parsed.data, publishedAt },
    })
    res.json(post)
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

router.delete('/posts/:id', async (req: Request, res: Response) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } })
    res.json({ ok: true })
  } catch {
    res.status(404).json({ error: 'Not found' })
  }
})

// Public read-only router — only GET endpoints
const publicRouter = Router()
const pubPrisma = new PrismaClient()

publicRouter.get('/projects', async (_req, res) => {
  const items = await pubPrisma.project.findMany({ where: { published: true }, orderBy: { order: 'asc' } })
  res.json(items)
})
publicRouter.get('/experience', async (_req, res) => {
  const items = await pubPrisma.experience.findMany({ orderBy: { order: 'asc' } })
  res.json(items)
})
publicRouter.get('/skills', async (_req, res) => {
  const items = await pubPrisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] })
  res.json(items)
})
publicRouter.get('/posts', async (_req, res) => {
  const items = await pubPrisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' } })
  res.json(items)
})
publicRouter.get('/posts/:slug', async (req, res) => {
  const post = await pubPrisma.blogPost.findUnique({ where: { slug: req.params.slug, published: true } })
  if (!post) return res.status(404).json({ error: 'Not found' })
  res.json(post)
})

export { router as cmsRouter, publicRouter as contentRouter }
