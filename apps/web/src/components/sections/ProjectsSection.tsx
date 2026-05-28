'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Activity } from 'lucide-react'

/* Live uptime counter that slowly ticks up */
function UptimeCounter({ base }: { base: number }) {
  const [val, setVal] = useState(base)
  useEffect(() => {
    const t = setInterval(() => setVal(v => Math.min(100, +(v + 0.001).toFixed(3))), 3000)
    return () => clearInterval(t)
  }, [])
  return <span>{val.toFixed(1)}%</span>
}

const statusBoard = [
  { service: '100 Gbps Studio Network Fabric', status: 'OPERATIONAL', statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.9 },
  { service: 'Dark Fibre WAN (CWDM/DWDM)',      status: 'OPERATIONAL', statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.7 },
  { service: 'BGP Peering — 3 ISP Peers',        status: 'ESTABLISHED', statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 100  },
  { service: 'IS-IS Adjacencies',               status: 'ALL UP',      statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.9 },
  { service: 'Fortigate HA Firewall Cluster',    status: 'PROTECTED',   statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.8 },
  { service: 'Proxmox VE Cluster',               status: 'HEALTHY',     statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.9 },
  { service: 'TrueNAS SCALE Storage',            status: 'SYNCED',      statusColor: 'text-green',  dotColor: 'bg-green',  uptime: 99.6 },
  { service: 'Self-Hosted LLM Inference',        status: 'SERVING',     statusColor: 'text-cyan',   dotColor: 'bg-cyan',   uptime: 98.4 },
  { service: 'VFX Pipeline (AYON / NIM)',        status: 'RUNNING',     statusColor: 'text-cyan',   dotColor: 'bg-cyan',   uptime: 99.1 },
]

const featuredProjects = [
  {
    title: '100 Gbps VFX Studio Network Fabric',
    desc: 'Designed and operate a full spine-leaf 100 GbE switching fabric — concurrent render farm traffic, on-set DIT feeds, and inter-facility WAN with LACP bonding, ECMP load balancing, and sub-millisecond failover.',
    tech: ['100GbE','QSFP28','OSPF','LACP','ECMP','Jumbo Frames'],
    cat: 'Network Infrastructure', catColor: 'text-cyan bg-cyan/10 border-cyan/20',
  },
  {
    title: 'Dark Fibre WAN with CWDM/DWDM Multiplexing',
    desc: 'Multi-site dark fibre connectivity using CWDM wavelength multiplexing — dedicated 10G/100G inter-site bandwidth completely off ISP infrastructure, with optical monitoring and wavelength-level fault isolation.',
    tech: ['Dark Fibre','CWDM','DWDM','SFP+/QSFP','OTDR','Optical Mon.'],
    cat: 'WAN / Dark Fibre', catColor: 'text-purple bg-purple/10 border-purple/20',
  },
  {
    title: 'ISP-Level BGP & Leased Line Architecture',
    desc: 'Full BGP peering at ISP interconnect points — full routing table management, route policy, AS-path manipulation, and community tagging. Cross-connect and direct leased line (DCC) provisioning end-to-end.',
    tech: ['BGP','OSPF','AS-Path','Route Policy','Cross-Connect','DCC'],
    cat: 'ISP Networking', catColor: 'text-amber bg-amber/10 border-amber/20',
  },
]

const otherProjects = [
  { title: 'Fortigate HA Firewall Estate',       cat: 'Security',        tech: ['Fortigate','HA','IPsec','SSL VPN','DPI'],              github: null, demo: null },
  { title: 'Proxmox VE Hypervisor Cluster',      cat: 'Virtualisation',  tech: ['Proxmox VE','Ceph','HA','KVM','ZFS'],                  github: null, demo: null },
  { title: 'TrueNAS SCALE Production Storage',   cat: 'Storage',         tech: ['TrueNAS SCALE','ZFS','RAIDZ2','iSCSI','NFS','SMB'],    github: null, demo: null },
  { title: 'Self-Hosted LLM Inference Stack',    cat: 'AI / Self-Hosted',tech: ['Ollama','vLLM','LLaMA 3','Open WebUI','Docker'],        github: null, demo: null },
  { title: 'AYON + NIM VFX Pipeline',            cat: 'VFX Pipeline',    tech: ['AYON','NIM Studio','Python','Docker'],                 github: null, demo: null },
  { title: 'Portfolio + Analytics Backend',      cat: 'Web Dev',         tech: ['Next.js 14','TypeScript','Express','PostgreSQL'],       github: 'https://github.com/SagarKandel/website', demo: 'https://sagarkandel.com' },
]

const catColors: Record<string,string> = {
  'Security':        'text-red bg-red/10 border-red/20',
  'Virtualisation':  'text-amber bg-amber/10 border-amber/20',
  'Storage':         'text-amber bg-amber/10 border-amber/20',
  'AI / Self-Hosted':'text-purple bg-purple/10 border-purple/20',
  'VFX Pipeline':    'text-cyan bg-cyan/10 border-cyan/20',
  'Web Dev':         'text-green bg-green/10 border-green/20',
}

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04 })
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="projects" className="py-24 bg-bg">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ show infrastructure status</p>
          <h2 className="section-title">Infrastructure & Projects</h2>
        </motion.div>

        {/* ── Live Status Board ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="terminal-chrome mb-14"
        >
          <div className="terminal-chrome-bar">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-amber/70" />
            <span className="w-3 h-3 rounded-full bg-green/70" />
            <span className="ml-3 font-mono text-xs text-muted">infrastructure-status-board</span>
            <span className="ml-auto flex items-center gap-1.5">
              <Activity size={12} className="text-green animate-pulse" />
              <span className="text-xs font-mono text-green">LIVE</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2/60">
                  <th className="text-left text-xs text-muted tracking-widest px-5 py-3 font-normal">SERVICE / SYSTEM</th>
                  <th className="text-left text-xs text-muted tracking-widest px-4 py-3 font-normal">STATUS</th>
                  <th className="text-right text-xs text-muted tracking-widest px-5 py-3 font-normal">UPTIME</th>
                </tr>
              </thead>
              <tbody>
                {statusBoard.map((row, i) => (
                  <motion.tr
                    key={row.service}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="border-b border-border/50 hover:bg-surface/60 transition-colors"
                  >
                    <td className="px-5 py-3 text-text-2 text-xs">{row.service}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${row.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.dotColor} ${i % 3 === 0 ? 'animate-pulse' : ''}`} />
                        {row.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-xs text-green font-mono">
                      <UptimeCounter base={row.uptime} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted font-mono">
              Last sync: <span className="text-cyan">{new Date().toISOString().slice(0,19).replace('T',' ')} UTC</span>
            </span>
            <span className="text-xs text-green font-mono">All systems nominal ✓</span>
          </div>
        </motion.div>

        {/* ── Featured Projects ── */}
        <div className="space-y-5 mb-14">
          {featuredProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="card-dark hover:border-border-bright transition-all"
            >
              <div className="mb-3">
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md border ${p.catColor}`}>
                  {p.cat}
                </span>
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{p.title}</h3>
              <p className="text-text-2 text-sm leading-relaxed mb-4">{p.desc}</p>
              <div className="link-bar" />
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tech.map(t => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 border border-border text-muted rounded hover:border-cyan/40 hover:text-cyan transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Other Projects ── */}
        <p className="text-xs font-mono text-muted tracking-widest uppercase mb-5">
          <span className="text-cyan">// </span>other notable work
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.07 }}
              className="card-dark flex flex-col hover:border-border-bright transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${catColors[p.cat] || 'text-muted bg-surface border-border'}`}>
                  {p.cat}
                </span>
                <div className="flex gap-2">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan transition-colors"><Github size={14} /></a>}
                  {p.demo   && <a href={p.demo}   target="_blank" rel="noopener noreferrer" className="text-muted hover:text-cyan transition-colors"><ExternalLink size={14} /></a>}
                </div>
              </div>
              <h3 className="font-semibold text-text text-sm mb-2 flex-1 leading-snug">{p.title}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {p.tech.slice(0, 4).map(t => <span key={t} className="text-xs font-mono text-muted">{t}</span>)}
                {p.tech.length > 4 && <span className="text-xs font-mono text-muted">+{p.tech.length - 4}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
