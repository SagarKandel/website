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

      toast.success('Message sent! I\'ll get back to you soon.', {
        description: 'You should receive a confirmation email shortly.',
      })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try emailing directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">07.</span> contact
          </p>
          <h2 className="section-title">GET IN TOUCH</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="terminal-card">
              <p className="text-terminal-text/80 font-body leading-relaxed mb-6">
                I&apos;m always open to interesting conversations — whether it&apos;s a job opportunity, 
                a cool project, a technical problem to solve, or just connecting with people in the industry. 
                Feel free to reach out.
              </p>
              <div className="space-y-4">
                <a href="mailto:sagar@sagarkandel.com"
                  className="flex items-center gap-3 text-terminal-muted hover:text-terminal-green transition-colors text-sm font-mono">
                  <Mail size={16} className="text-terminal-green" />
                  sagar@sagarkandel.com
                </a>
                <a href="https://linkedin.com/in/sagar-kandel4742" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-terminal-muted hover:text-terminal-green transition-colors text-sm font-mono">
                  <Linkedin size={16} className="text-terminal-green" />
                  linkedin.com/in/sagar-kandel4742
                </a>
                <a href="https://github.com/SagarKandel" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-terminal-muted hover:text-terminal-green transition-colors text-sm font-mono">
                  <Github size={16} className="text-terminal-green" />
                  github.com/SagarKandel
                </a>
                <span className="flex items-center gap-3 text-terminal-muted text-sm font-mono">
                  <MapPin size={16} className="text-terminal-green" />
                  Sydney / Australia
                </span>
              </div>
            </div>

            <div className="terminal-card">
              <p className="text-xs text-terminal-muted tracking-widest mb-3 font-mono">
                <span className="text-terminal-green">$</span> availability --status
              </p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                <span className="text-terminal-green text-sm font-mono">Available for opportunities</span>
              </div>
              <p className="text-terminal-muted text-xs mt-2 font-body">
                Open to full-time roles, contract work, and consulting in network engineering & cloud infrastructure.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="terminal-card space-y-4">
              <p className="text-xs text-terminal-muted tracking-widest mb-2 font-mono">
                <span className="text-terminal-green">POST</span> /api/contact
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-terminal-muted font-mono tracking-wider block mb-1">
                    name <span className="text-terminal-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-terminal-bg border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2
                               focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs text-terminal-muted font-mono tracking-wider block mb-1">
                    email <span className="text-terminal-red">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-terminal-bg border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2
                               focus:outline-none focus:border-terminal-green transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-terminal-muted font-mono tracking-wider block mb-1">
                  subject <span className="text-terminal-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-terminal-bg border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2
                             focus:outline-none focus:border-terminal-green transition-colors"
                  placeholder="Job Opportunity / Collaboration / Hello"
                />
              </div>

              <div>
                <label className="text-xs text-terminal-muted font-mono tracking-wider block mb-1">
                  message <span className="text-terminal-red">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-terminal-bg border border-terminal-border text-terminal-text font-mono text-sm px-3 py-2
                             focus:outline-none focus:border-terminal-green transition-colors resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border border-terminal-green border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} />
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
