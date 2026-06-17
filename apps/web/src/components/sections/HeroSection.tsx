'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight, Download } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-ead1.up.railway.app'

const ease = [0.22, 1, 0.36, 1]

const defaults = {
  hero_name:          'Sagar Kandel',
  hero_role:          'Network & Systems Engineer',
  hero_location:      'Sydney, Australia',
  hero_employer:      'Blockhead VFX',
  hero_timezone:      'AEST (UTC+10)',
  hero_bio:           '5+ years engineering enterprise infrastructure at the intersection of high-performance networking and VFX production. 100 Gbps fabrics, dark fibre, ISP-level BGP, Proxmox clusters, and self-hosted AI — the systems that keep studios running.',
  hero_available:     'true',
  hero_available_text:'Available for new opportunities',
  hero_stat1_value:   '5+',
  hero_stat1_label:   'Years at Blockhead VFX',
  hero_stat2_value:   '100G',
  hero_stat2_label:   'Network backbone',
  hero_stat3_value:   'BGP',
  hero_stat3_label:   'ISP-level routing',
  hero_stat4_value:   'AWS',
  hero_stat4_label:   'SAA-C03 certified',
  social_github:      'https://github.com/SagarKandel',
  social_linkedin:    'https://linkedin.com/in/sagar-kandel4742',
  social_email:       'sagar@sagarkandel.com',
}

export default function HeroSection() {
  const [s, setS] = useState(defaults)

  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data && typeof data === 'object') setS(prev => ({ ...prev, ...data }))
      })
      .catch(() => {})
  }, [])

  const stats = [
    { value: s.hero_stat1_value, label: s.hero_stat1_label },
    { value: s.hero_stat2_value, label: s.hero_stat2_label },
    { value: s.hero_stat3_value, label: s.hero_stat3_label },
    { value: s.hero_stat4_value, label: s.hero_stat4_label },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center hero-mesh pt-16 overflow-hidden">

      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(100,60,240,0.05) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10 py-20 flex flex-col items-center text-center">

        {s.hero_available === 'true' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8"
          >
            <span className="pill-available">
              <span className="dot-live" />
              {s.hero_available_text}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-6xl sm:text-7xl lg:text-8xl font-bold text-text tracking-tight leading-[1.0] mb-5"
        >
          {s.hero_name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-xl sm:text-2xl text-text-2 font-medium mb-4"
        >
          {s.hero_role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease }}
          className="flex items-center gap-3 text-sm text-muted mb-10"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {s.hero_location}
          </span>
          <span className="w-px h-3 bg-[rgba(0,0,0,0.15)]" />
          <span>{s.hero_employer}</span>
          <span className="w-px h-3 bg-[rgba(0,0,0,0.15)]" />
          <span>{s.hero_timezone}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="text-base sm:text-lg text-text-2 leading-relaxed max-w-2xl mb-12"
        >
          {s.hero_bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <a href="#contact" className="btn-primary">
            Get in touch <ArrowRight size={15} />
          </a>
          <a href="#experience" className="btn-secondary">View my work</a>
          <a href="/resume.pdf" download className="btn-secondary"
            onClick={() => fetch(`${API}/track/resume-download`, { method: 'POST' }).catch(() => {})}>
            <Download size={14} />
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.44, ease }}
          className="flex items-center gap-6 mb-20"
        >
          {[
            { href: s.social_github, icon: Github, label: 'GitHub' },
            { href: s.social_linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${s.social_email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label}
              className="text-muted hover:text-text transition-colors duration-150">
              <Icon size={20} />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
          className="w-full max-w-2xl"
        >
          <div className="glass rounded-2xl p-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[rgba(0,0,0,0.07)]">
              {stats.map((st, i) => (
                <div key={i} className="flex flex-col items-center py-5 px-4">
                  <span className="text-2xl font-bold text-accent mb-1">{st.value}</span>
                  <span className="text-xs text-muted text-center leading-tight">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  )
}
