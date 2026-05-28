'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Send, Mail, Linkedin, Github, MapPin } from 'lucide-react'

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      toast.success("Message sent! I'll get back to you soon.")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send. Please email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>
          <p className="text-ink-2 mt-3 max-w-xl leading-relaxed">
            Open to interesting conversations — job opportunities, cool projects, or just connecting
            with people in the industry.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="card space-y-4">
              <a
                href="mailto:sagar@sagarkandel.com"
                className="flex items-center gap-3 text-ink-2 hover:text-accent transition-colors text-sm"
              >
                <div className="p-2 bg-accent-light rounded-lg flex-shrink-0">
                  <Mail size={16} className="text-accent" />
                </div>
                sagar@sagarkandel.com
              </a>
              <a
                href="https://linkedin.com/in/sagar-kandel4742"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-2 hover:text-accent transition-colors text-sm"
              >
                <div className="p-2 bg-accent-light rounded-lg flex-shrink-0">
                  <Linkedin size={16} className="text-accent" />
                </div>
                linkedin.com/in/sagar-kandel4742
              </a>
              <a
                href="https://github.com/SagarKandel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-2 hover:text-accent transition-colors text-sm"
              >
                <div className="p-2 bg-accent-light rounded-lg flex-shrink-0">
                  <Github size={16} className="text-accent" />
                </div>
                github.com/SagarKandel
              </a>
              <div className="flex items-center gap-3 text-ink-2 text-sm">
                <div className="p-2 bg-surface-alt rounded-lg flex-shrink-0">
                  <MapPin size={16} className="text-muted" />
                </div>
                Sydney, Australia
              </div>
            </div>

            <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-800">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="card space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-ink-2 block mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface-alt border border-border rounded-lg text-ink text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-ink-2 block mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface-alt border border-border rounded-lg text-ink text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-2 block mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-surface-alt border border-border rounded-lg text-ink text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  placeholder="Job Opportunity / Collaboration / Hello"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-2 block mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-surface-alt border border-border rounded-lg text-ink text-sm px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
