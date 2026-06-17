'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Send, Mail, Linkedin, Github, MapPin } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'sagar@sagarkandel.com',
    href: 'mailto:sagar@sagarkandel.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sagar-kandel4742',
    href: 'https://linkedin.com/in/sagar-kandel4742',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/SagarKandel',
    href: 'https://github.com/SagarKandel',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sydney, Australia (AEST)',
    href: null,
  },
]

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      toast.success('Message sent! I\'ll be in touch soon.')
    } catch {
      toast.error('Something went wrong. Try emailing directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-28 section-alt">
      <div className="section-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow">Contact</p>
          <h2 className="h2">Let's work together</h2>
          <p className="text-lg text-text-2 leading-relaxed max-w-xl mt-4">
            Open to new opportunities, collaborations, or just a conversation about
            enterprise networking and infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card-flat rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#e8f0fb' }}>
                  <Icon size={18} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-text hover:text-accent transition-colors truncate block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-text truncate">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="card-flat rounded-2xl p-5 mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="dot-live" />
                <span className="text-sm font-semibold" style={{ color: '#1a7a4a' }}>Available for work</span>
              </div>
              <p className="text-sm text-text-2 leading-relaxed">
                Currently open to senior network engineering, infrastructure, or systems roles
                in Sydney or remote — happy to discuss opportunities.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="card-flat rounded-2xl p-7">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-2xl"
                    style={{ background: '#d1fae5' }}>
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">Message received!</h3>
                  <p className="text-text-2 text-sm">I'll get back to you as soon as possible.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="btn-secondary mt-6 text-sm py-2.5">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-2 mb-1.5">Full name *</label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-2 mb-1.5">Email address *</label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-2 mb-1.5">Subject *</label>
                    <input
                      type="text" required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="input"
                      placeholder="Job opportunity / Collaboration / Project"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-2 mb-1.5">Message *</label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input resize-none"
                      placeholder="Tell me about the opportunity or project..."
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                    ) : (
                      <><Send size={15} />Send message</>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted">
                    Or email directly at{' '}
                    <a href="mailto:sagar@sagarkandel.com" className="text-accent hover:underline">
                      sagar@sagarkandel.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
