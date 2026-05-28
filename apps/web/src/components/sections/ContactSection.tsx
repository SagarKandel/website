'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { toast } from 'sonner'
import { Send, Mail, Linkedin, Github, MapPin, Terminal, Wifi } from 'lucide-react'

const contactLinks = [
  {
    icon: Mail,
    label: 'sagar@sagarkandel.com',
    href: 'mailto:sagar@sagarkandel.com',
    desc: 'Direct channel',
    color: 'text-cyan',
    bg: 'bg-cyan/10',
    border: 'border-cyan/20',
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/sagar-kandel4742',
    href: 'https://linkedin.com/in/sagar-kandel4742',
    desc: 'Professional profile',
    color: 'text-purple',
    bg: 'bg-purple/10',
    border: 'border-purple/20',
  },
  {
    icon: Github,
    label: 'github.com/SagarKandel',
    href: 'https://github.com/SagarKandel',
    desc: 'Code repositories',
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
  },
  {
    icon: MapPin,
    label: 'Sydney, Australia',
    href: null,
    desc: 'AEST (UTC+10/11)',
    color: 'text-green',
    bg: 'bg-green/10',
    border: 'border-green/20',
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
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      toast.success('Connection established. Message received.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Transmission failed. Please email directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-surface net-grid">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ ssh sagar@sagarkandel.com</p>
          <h2 className="section-title">Establish Connection</h2>
          <p className="text-text-2 mt-3 max-w-xl leading-relaxed text-sm">
            Open to new opportunities, interesting projects, and conversations about enterprise networking,
            VFX infrastructure, or building reliable systems at scale.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left: contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Status badge */}
            <div className="terminal-chrome mb-6">
              <div className="terminal-chrome-bar">
                <span className="font-mono text-xs text-muted">connection-status</span>
                <span className="ml-auto flex items-center gap-1.5">
                  <Wifi size={11} className="text-green animate-pulse" />
                  <span className="text-xs font-mono text-green">REACHABLE</span>
                </span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                <div className="text-text-2 text-xs">
                  <span className="text-cyan">➜</span> ping sagar@sagarkandel.com
                </div>
                <div className="text-xs space-y-1 pl-4">
                  <p className="text-green">PING sagar@sagarkandel.com — 64 bytes</p>
                  <p className="text-text-2">Response time: <span className="text-cyan">&lt; 24h</span></p>
                  <p className="text-text-2">Status: <span className="text-green font-semibold">● AVAILABLE FOR HIRE</span></p>
                  <p className="text-text-2">Timezone: <span className="text-amber">AEST UTC+10/11</span></p>
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map((link, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`card-dark flex items-center gap-4 hover:border-border-bright transition-all group`}
                    >
                      <div className={`p-2.5 rounded-xl ${link.bg} border ${link.border} flex-shrink-0`}>
                        <link.icon className={`w-4 h-4 ${link.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-mono ${link.color} group-hover:underline truncate`}>{link.label}</p>
                        <p className="text-xs text-muted">{link.desc}</p>
                      </div>
                    </a>
                  ) : (
                    <div className={`card-dark flex items-center gap-4`}>
                      <div className={`p-2.5 rounded-xl ${link.bg} border ${link.border} flex-shrink-0`}>
                        <link.icon className={`w-4 h-4 ${link.color}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-mono ${link.color}`}>{link.label}</p>
                        <p className="text-xs text-muted">{link.desc}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="terminal-chrome">
              <div className="terminal-chrome-bar">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber/70" />
                <span className="w-3 h-3 rounded-full bg-green/70" />
                <span className="ml-3 font-mono text-xs text-muted">new-connection.sh</span>
                <span className="ml-auto">
                  <Terminal size={12} className="text-cyan" />
                </span>
              </div>

              {sent ? (
                <div className="p-8 text-center font-mono">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-3"
                  >
                    <div className="text-4xl mb-4">✓</div>
                    <p className="text-green font-semibold text-lg">CONNECTION ESTABLISHED</p>
                    <p className="text-text-2 text-sm">Message transmitted successfully.</p>
                    <p className="text-muted text-xs">Response ETA: &lt; 24 hours</p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-4 text-xs text-cyan border border-cyan/30 rounded px-4 py-2 hover:bg-cyan/5 transition-all"
                    >
                      send another
                    </button>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-cyan block mb-1.5">
                        --name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-bg border border-border rounded-lg text-text text-sm font-mono px-3.5 py-2.5
                                   focus:outline-none focus:ring-1 focus:ring-cyan/40 focus:border-cyan/50 transition-all
                                   placeholder:text-muted"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-cyan block mb-1.5">
                        --email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-bg border border-border rounded-lg text-text text-sm font-mono px-3.5 py-2.5
                                   focus:outline-none focus:ring-1 focus:ring-cyan/40 focus:border-cyan/50 transition-all
                                   placeholder:text-muted"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-cyan block mb-1.5">
                      --subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-bg border border-border rounded-lg text-text text-sm font-mono px-3.5 py-2.5
                                 focus:outline-none focus:ring-1 focus:ring-cyan/40 focus:border-cyan/50 transition-all
                                 placeholder:text-muted"
                      placeholder="Job Opportunity / Collaboration / Project"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-cyan block mb-1.5">
                      --message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-bg border border-border rounded-lg text-text text-sm font-mono px-3.5 py-2.5
                                 focus:outline-none focus:ring-1 focus:ring-cyan/40 focus:border-cyan/50 transition-all
                                 resize-none placeholder:text-muted"
                      placeholder="Describe your project, opportunity, or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-cyan w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-cyan/30 border-t-cyan rounded-full animate-spin" />
                        <span className="font-mono text-sm">Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span className="font-mono text-sm">Initiate Connection</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs font-mono text-muted">
                    <span className="text-cyan">// </span>
                    Direct email: <a href="mailto:sagar@sagarkandel.com" className="text-cyan hover:underline">sagar@sagarkandel.com</a>
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
