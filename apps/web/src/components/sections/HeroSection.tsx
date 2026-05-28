'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'

const terminalLines = [
  '> Initializing system...',
  '> Loading profile: sagar.kandel',
  '> Experience: 5+ years VFX IT Infrastructure',
  '> Certifications: AWS Solutions Architect ✓',
  '> Network: 100Gig | Dark Fibre | ISP-Level BGP',
  '> Stack: Fortigate | Proxmox | Docker | TrueNAS',
  '> Current: Blockhead VFX — Systems Engineer',
  '> Status: Available for senior opportunities',
  '> System ready.',
]

export default function HeroSection() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current++
      setVisibleLines(current)
      if (current >= terminalLines.length) {
        clearInterval(interval)
        setTimeout(() => setBootComplete(true), 500)
      }
    }, 320)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 12, 6, 0.8) 100%)' }}
      />

      <div className="section-container relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="terminal-card mb-8 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-terminal-border">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span className="ml-2 text-terminal-muted text-xs tracking-widest">bash — sagar@portfolio ~</span>
            </div>
            <div className="space-y-1">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${
                    line.includes('✓') || line.includes('ready') ? 'text-terminal-green text-glow' :
                    line.includes('Available') ? 'text-terminal-amber' :
                    line.includes('100Gig') || line.includes('ISP') ? 'text-terminal-blue' :
                    'text-terminal-muted'
                  }`}
                >
                  {line}
                </motion.div>
              ))}
              {visibleLines < terminalLines.length && (
                <span className="text-terminal-green animate-blink">█</span>
              )}
            </div>
          </motion.div>

          {bootComplete && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-terminal-muted text-sm tracking-widest mb-3 uppercase">
                <span className="text-terminal-green">$</span> whoami
              </p>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-terminal-green text-glow-strong mb-4 leading-none">
                SAGAR<br />
                <span className="text-terminal-text opacity-80">KANDEL</span>
              </h1>

              <div className="text-lg sm:text-xl text-terminal-muted font-mono mb-8 h-8">
                <TypeAnimation
                  sequence={[
                    'Senior Systems & Network Engineer',
                    2000,
                    'VFX Infrastructure Specialist',
                    2000,
                    'Dark Fibre & ISP-Level Networking',
                    2000,
                    'Datacenter & Cloud Architect',
                    2000,
                    'Open Source & Automation Engineer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-terminal-green"
                />
              </div>

              <p className="text-terminal-text/70 font-body max-w-xl mb-10 leading-relaxed">
                5+ years engineering enterprise-grade infrastructure for VFX production at scale.
                100Gig networks, dark fibre, ISP-level BGP, Fortigate firewalls, Proxmox clusters,
                and self-hosted AI — based in Australia.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a href="#contact" className="btn-primary">
                  <span className="text-terminal-green mr-2">→</span>
                  Get in Touch
                </a>
                <a href="#experience" className="btn-ghost">View Experience</a>
                <a href="/resume.pdf" download className="btn-ghost"
                  onClick={() => fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})}>
                  Download Resume
                </a>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-terminal-muted text-xs tracking-widest">CONNECT://</span>
                <a href="https://github.com/SagarKandel" target="_blank" rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal-green transition-colors" aria-label="GitHub">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/sagar-kandel4742" target="_blank" rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-terminal-green transition-colors" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:sagar@sagarkandel.com"
                  className="text-terminal-muted hover:text-terminal-green transition-colors" aria-label="Email">
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {bootComplete && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-terminal-muted text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="text-terminal-green animate-bounce" size={20} />
        </motion.div>
      )}
    </section>
  )
}
