'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from 'lucide-react'

const stats = [
  { value: '5+',   label: 'Years at Blockhead VFX' },
  { value: '100G', label: 'Network backbone' },
  { value: 'BGP',  label: 'ISP-level routing' },
  { value: 'AWS',  label: 'SAA-C03 certified' },
]

const ease = [0.22, 1, 0.36, 1]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center hero-mesh pt-16 overflow-hidden">

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,60,240,0.05) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10 py-20 flex flex-col items-center text-center">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <span className="pill-available">
            <span className="dot-live" />
            Available for new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-text tracking-tight leading-[1.0] mb-5"
        >
          Sagar Kandel
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-xl sm:text-2xl text-text-2 font-medium mb-4"
        >
          Network &amp; Systems Engineer
        </motion.p>

        {/* Location + employer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex items-center gap-3 text-sm text-muted mb-10"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            Sydney, Australia
          </span>
          <span className="w-px h-3 bg-[rgba(0,0,0,0.15)]" />
          <span>Blockhead VFX</span>
          <span className="w-px h-3 bg-[rgba(0,0,0,0.15)]" />
          <span>AEST (UTC+10)</span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="text-base sm:text-lg text-text-2 leading-relaxed max-w-2xl mb-12"
        >
          5+ years engineering enterprise infrastructure at the intersection of high-performance
          networking and VFX production. 100 Gbps fabrics, dark fibre, ISP-level BGP,
          Proxmox clusters, and self-hosted AI — the systems that keep studios running.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <a href="#contact" className="btn-primary">
            Get in touch <ArrowRight size={15} />
          </a>
          <a href="#experience" className="btn-secondary">
            View my work
          </a>
          <a
            href="/resume.pdf"
            download
            className="btn-secondary"
            onClick={() =>
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})
            }
          >
            <Download size={14} />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.44, ease }}
          className="flex items-center gap-6 mb-20"
        >
          {[
            { href: 'https://github.com/SagarKandel', icon: Github, label: 'GitHub' },
            { href: 'https://linkedin.com/in/sagar-kandel4742', icon: Linkedin, label: 'LinkedIn' },
            { href: 'mailto:sagar@sagarkandel.com', icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label}
              className="text-muted hover:text-text transition-colors duration-150">
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="w-full max-w-2xl"
        >
          <div className="glass rounded-2xl p-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[rgba(0,0,0,0.07)]">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center py-5 px-4">
                  <span className="text-2xl font-bold text-accent mb-1">{s.value}</span>
                  <span className="text-xs text-muted text-center leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  )
}
