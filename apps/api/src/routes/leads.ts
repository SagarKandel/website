import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import geoip from 'geoip-lite'

const router = Router()
const prisma = new PrismaClient()

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
})

function getIP(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    ''
  )
}

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

// POST /leads — submit contact form
router.post('/', async (req: Request, res: Response) => {
  const parsed = leadSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() })
  }

  const { name, email, subject, message } = parsed.data
  const ip = getIP(req)
  const geo = geoip.lookup(ip)

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        subject,
        message,
        ip: ip || null,
        country: geo?.country || null,
      },
    })

    // Send notification email to Sagar
    if (process.env.SMTP_HOST && process.env.NOTIFY_EMAIL) {
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.NOTIFY_EMAIL,
          subject: `[Portfolio] New Lead: ${subject}`,
          html: `
            <div style="font-family: monospace; background: #020c06; color: #b4ffda; padding: 24px; border: 1px solid #0d3320;">
              <h2 style="color: #00ff7f;">New Contact Form Submission</h2>
              <table style="width:100%; border-collapse:collapse;">
                <tr><td style="color:#4a7a5e; padding:8px 0;">Name:</td><td style="color:#b4ffda;">${name}</td></tr>
                <tr><td style="color:#4a7a5e; padding:8px 0;">Email:</td><td style="color:#00ff7f;">${email}</td></tr>
                <tr><td style="color:#4a7a5e; padding:8px 0;">Subject:</td><td style="color:#b4ffda;">${subject}</td></tr>
                <tr><td style="color:#4a7a5e; padding:8px 0;">Country:</td><td style="color:#b4ffda;">${geo?.country || 'Unknown'}</td></tr>
                <tr><td style="color:#4a7a5e; padding:8px 0;">Lead ID:</td><td style="color:#ffb800;">${lead.id}</td></tr>
              </table>
              <div style="margin-top:16px; padding:16px; border:1px solid #0d3320;">
                <p style="color:#4a7a5e; margin:0 0 8px;">Message:</p>
                <p style="color:#b4ffda; white-space:pre-wrap;">${message}</p>
              </div>
              <p style="color:#4a7a5e; margin-top:16px; font-size:12px;">
                View in dashboard: <a href="https://sagarkandel.com/admin" style="color:#00ff7f;">sagarkandel.com/admin</a>
              </p>
            </div>
          `,
        })

        // Send confirmation to sender
        await transporter.sendMail({
          from: `"Sagar Kandel" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Got your message, ${name.split(' ')[0]}!`,
          html: `
            <div style="font-family: monospace; background: #020c06; color: #b4ffda; padding: 24px; border: 1px solid #0d3320;">
              <h2 style="color: #00ff7f;">Thanks for reaching out!</h2>
              <p>Hi ${name.split(' ')[0]},</p>
              <p>I've received your message and will get back to you as soon as possible — usually within 24-48 hours.</p>
              <p style="color:#4a7a5e; font-size:12px;">Your message summary:</p>
              <p style="color:#00ff7f;">Subject: ${subject}</p>
              <hr style="border-color:#0d3320;">
              <p style="color:#4a7a5e;">— Sagar Kandel<br>Network & Systems Engineer<br>sagarkandel.com</p>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('Email send failed (non-critical):', emailErr)
      }
    }

    return res.status(201).json({ ok: true, id: lead.id })
  } catch (err) {
    console.error('Lead create error:', err)
    return res.status(500).json({ error: 'Failed to submit' })
  }
})

export { router as leadsRouter }
