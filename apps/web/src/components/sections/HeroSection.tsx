'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight } from 'lucide-react'
import NetworkCanvas from '@/components/ui/NetworkCanvas'

/* ─── Terminal command sequences ─────────────────────────── */
const COMMANDS = [
  {
    prompt: 'show bgp summary',
    lines: [
      { t: 'BGP Router: BLOCKHEAD-VFX-CORE  |  Local AS: 65001', c: 'text-text-2' },
      { t: '', c: '' },
      { t: 'Neighbor         V   AS      Up/Down    State/PfxRcd', c: 'text-muted' },
      { t: '10.0.0.1         4   65100   14d:06h    ESTABLISHED   ●', c: 'text-green' },
      { t: '172.16.1.1       4   65200    5d:22h    ESTABLISHED   ●', c: 'text-green' },
      { t: 'ISP-PEER-01      4   65300   30d:11h    ESTABLISHED   ●', c: 'text-green' },
      { t: '', c: '' },
      { t: 'Total prefixes: 789,432  ·  All 3 peers active  ·  HA: OK', c: 'text-cyan' },
    ],
  },
  {
    prompt: 'verify dark-fibre link STUDIO-01',
    lines: [
      { t: 'Probing CWDM wavelengths on link: STUDIO-01', c: 'text-text-2' },
      { t: '', c: '' },
      { t: '  λ1310nm   Rx: -2.8 dBm   ▓▓▓▓▓▓▓▓▓▓▓▓   OPTIMAL', c: 'text-green' },
      { t: '  λ1470nm   Rx: -3.0 dBm   ▓▓▓▓▓▓▓▓▓▓▓▓   OPTIMAL', c: 'text-green' },
      { t: '  λ1550nm   Rx: -3.1 dBm   ▓▓▓▓▓▓▓▓▓▓▓▓   OPTIMAL', c: 'text-green' },
      { t: '', c: '' },
      { t: '  Latency: 0.28ms  ·  Capacity: 100 Gbps  ·  ● LINK LIVE', c: 'text-cyan' },
    ],
  },
  {
    prompt: 'show cluster status --verbose',
    lines: [
      { t: 'Proxmox VE Cluster: BLOCKHEAD-PROD', c: 'text-text-2' },
      { t: '', c: '' },
      { t: '  ●  compute-01   ONLINE    CPU: 34%    MEM: 67%', c: 'text-green' },
      { t: '  ●  compute-02   ONLINE    CPU: 28%    MEM: 71%', c: 'text-green' },
      { t: '  ●  storage-01   ONLINE    ZFS: 89 TB / 200 TB', c: 'text-green' },
      { t: '', c: '' },
      { t: '  HA Status: PROTECTED ✓   Quorum: HEALTHY ✓', c: 'text-cyan' },
    ],
  },
  {
    prompt: 'show isis neighbors detail',
    lines: [
      { t: 'System ID        Type  Interface  IP Address      State', c: 'text-muted' },
      { t: 'BH-CORE-SW-01    L2    Gi1/0/48   192.168.10.1    UP  ●', c: 'text-green' },
      { t: 'BH-EDGE-SW-01    L2    Gi1/0/24   192.168.10.2    UP  ●', c: 'text-green' },
      { t: 'BH-DIST-SW-01    L1/2  Te1/1/1    192.168.10.3    UP  ●', c: 'text-green' },
      { t: '', c: '' },
      { t: '  All IS-IS adjacencies ESTABLISHED  ·  Protocol: IPv4/IPv6', c: 'text-cyan' },
    ],
  },
]

function TerminalTyper() {
  const [ci, setCi]   = useState(0)     // command index
  const [cc, setCc]   = useState(0)     // chars typed
  const [sl, setSl]   = useState(0)     // lines shown
  const [phase, setPhase] = useState<'typing'|'revealing'|'pausing'>('typing')
  const cmd = COMMANDS[ci]

  const next = useCallback(() => {
    setCi(i => (i + 1) % COMMANDS.length)
    setCc(0); setSl(0); setPhase('typing')
  }, [])

  useEffect(() => {
    if (phase === 'typing') {
      if (cc < cmd.prompt.length) {
        const t = setTimeout(() => setCc(n => n + 1), 52)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('revealing'), 250)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'revealing') {
      if (sl < cmd.lines.length) {
        const t = setTimeout(() => setSl(n => n + 1), 190)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('pausing'), 2800)
        return () => clearTimeout(t)
      }
    }
    if (phase === 'pausing') {
      const t = setTimeout(next, 0)
      return () => clearTimeout(t)
    }
  }, [phase, cc, sl, cmd, next])

  return (
    <div className="terminal-chrome w-full">
      {/* Title bar */}
      <div className="terminal-chrome-bar">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber/70" />
        <span className="w-3 h-3 rounded-full bg-green/70" />
        <span className="ml-3 font-mono text-xs text-muted tracking-wider">
          sagar@blockhead-vfx: ~
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="status-online" />
          <span className="text-xs font-mono text-green">CONNECTED</span>
        </span>
      </div>

      {/* Body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[220px]">
        {/* Previous commands (ghost) */}
        {ci > 0 && (
          <div className="text-muted/40 text-xs mb-3 line-clamp-1">
            <span className="text-cyan/40">➜</span> {COMMANDS[(ci - 1 + COMMANDS.length) % COMMANDS.length].prompt}
          </div>
        )}

        {/* Current command line */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-cyan">➜</span>
          <span className="text-text">{cmd.prompt.slice(0, cc)}</span>
          {phase === 'typing' && <span className="text-cyan cursor-blink">█</span>}
        </div>

        {/* Output lines */}
        <div className="space-y-0.5 pl-1">
          {cmd.lines.slice(0, sl).map((line, i) =>
            line.t === '' ? (
              <div key={i} className="h-2" />
            ) : (
              <motion.div
                key={`${ci}-${i}`}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`text-xs leading-5 ${line.c}`}
              >
                {line.t}
              </motion.div>
            )
          )}
        </div>

        {/* Ready prompt */}
        {phase === 'pausing' && sl >= cmd.lines.length && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-cyan">➜</span>
            <span className="text-cyan cursor-blink">█</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Hero ───────────────────────────────────────────────── */
export default function HeroSection() {
  const stats = [
    { v: '5+',   l: 'Years VFX IT' },
    { v: '100G', l: 'Network' },
    { v: 'BGP',  l: 'ISP Level' },
    { v: 'SAA',  l: 'AWS Cert' },
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-bg overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0">
        <NetworkCanvas opacity={0.35} nodeCount={40} maxDist={145} packetCount={14} />
      </div>
      <div className="absolute inset-0 net-grid" />
      {/* Radial gradient overlay — keeps text readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,13,31,0.75)_80%)]" />

      <div className="section-container relative z-10 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 border border-green/30 bg-green/5 rounded-full px-4 py-1.5 mb-7">
              <span className="status-online" />
              <span className="text-xs font-mono text-green tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text leading-[1.0] tracking-tight mb-5">
              SAGAR<br />
              <span className="text-cyan" style={{ textShadow: '0 0 40px rgba(0,212,255,0.4)' }}>
                KANDEL
              </span>
            </h1>

            <p className="font-mono text-text-2 text-lg mb-3 tracking-wide">
              Network &amp; Systems Engineer
            </p>
            <p className="text-text-2 leading-relaxed max-w-md mb-8">
              5+ years engineering enterprise infrastructure for VFX production at{' '}
              <span className="text-text font-semibold">Blockhead VFX</span>, Sydney.
              100 Gbps networks, dark fibre, ISP-level BGP, Proxmox clusters, and self-hosted AI.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-9">
              {stats.map(s => (
                <div key={s.l} className="border border-border rounded-xl p-3 text-center bg-surface/50">
                  <div className="text-xl font-bold text-cyan font-mono">{s.v}</div>
                  <div className="text-[10px] text-muted mt-0.5 tracking-wide">{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-9">
              <a href="#contact" className="btn-cyan">
                Get in touch <ArrowRight size={15} />
              </a>
              <a href="#experience" className="btn-outline">View my work</a>
              <a
                href="/resume.pdf"
                download
                className="btn-outline"
                onClick={() => fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})}
              >
                Resume ↓
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              <a href="https://github.com/SagarKandel" target="_blank" rel="noopener noreferrer"
                className="text-muted hover:text-cyan transition-colors" aria-label="GitHub">
                <Github size={19} />
              </a>
              <a href="https://linkedin.com/in/sagar-kandel4742" target="_blank" rel="noopener noreferrer"
                className="text-muted hover:text-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin size={19} />
              </a>
              <a href="mailto:sagar@sagarkandel.com"
                className="text-muted hover:text-cyan transition-colors" aria-label="Email">
                <Mail size={19} />
              </a>
              <span className="flex items-center gap-1.5 text-xs font-mono text-muted">
                <MapPin size={13} />Sydney, AU
              </span>
            </div>
          </motion.div>

          {/* ── Right ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Photo placeholder */}
            <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 flex-shrink-0">
              {/* Pulsing rings */}
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-cyan/20"
                  animate={{ scale: [1, 1 + i * 0.15], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan/30 bg-surface-2 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(0,212,255,0.15), 0 0 0 1px rgba(0,212,255,0.2)' }}>
                {/* Replace with <Image src="/photo.jpg" fill alt="Sagar Kandel" className="object-cover" /> */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan font-mono mb-1">SK</div>
                  <div className="text-xs text-muted font-mono">Add photo</div>
                </div>
              </div>
              {/* Floating cert badge */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -right-3 bg-surface border border-border rounded-xl px-3 py-2 shadow-lg"
              >
                <p className="text-[10px] text-muted font-mono">AWS Certified</p>
                <p className="text-xs font-semibold text-cyan font-mono">SAA-C03 ✓</p>
              </motion.div>
            </div>

            {/* Terminal */}
            <TerminalTyper />
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg to-transparent" />
    </section>
  )
}
