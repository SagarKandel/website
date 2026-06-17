'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-ead1.up.railway.app'

const accentPalette = [
  { accent: '#0066cc', bg: '#e8f0fb' },
  { accent: '#6b21a8', bg: '#f3e8ff' },
  { accent: '#b45309', bg: '#fef3c7' },
  { accent: '#1a7a4a', bg: '#d1fae5' },
  { accent: '#dc2626', bg: '#fee2e2' },
]

const categoryColors: Record<string, { text: string; bg: string }> = {
  'Security':       { text: '#dc2626', bg: '#fee2e2' },
  'Virtualisation': { text: '#b45309', bg: '#fef3c7' },
  'Storage':        { text: '#b45309', bg: '#fef3c7' },
  'AI':             { text: '#6b21a8', bg: '#f3e8ff' },
  'VFX Pipeline':   { text: '#0066cc', bg: '#e8f0fb' },
  'Web Dev':        { text: '#1a7a4a', bg: '#d1fae5' },
  'Network Infrastructure': { text: '#0066cc', bg: '#e8f0fb' },
  'WAN / Dark Fibre': { text: '#6b21a8', bg: '#f3e8ff' },
  'ISP Networking': { text: '#b45309', bg: '#fef3c7' },
}

const staticFeatured = [
  {
    id: 's1', category: 'Network Infrastructure', featured: true, order: 0,
    title: '100 Gbps VFX Studio Network Fabric',
    description: 'Designed and operate a full spine-leaf 100 GbE switching fabric — concurrent render farm traffic, on-set DIT feeds, and inter-facility WAN with LACP bonding, ECMP load balancing, and sub-millisecond failover.',
    tech: ['100GbE', 'QSFP28', 'OSPF', 'LACP', 'ECMP', 'Jumbo Frames', 'Spine-Leaf'],
    github: null, demo: null,
  },
  {
    id: 's2', category: 'WAN / Dark Fibre', featured: true, order: 1,
    title: 'Dark Fibre WAN with CWDM/DWDM Multiplexing',
    description: 'Multi-site dark fibre connectivity using CWDM wavelength multiplexing — dedicated 10G/100G inter-site bandwidth completely off ISP infrastructure.',
    tech: ['Dark Fibre', 'CWDM', 'DWDM', 'SFP+', 'QSFP', 'OTDR', 'Optical Monitoring'],
    github: null, demo: null,
  },
  {
    id: 's3', category: 'ISP Networking', featured: true, order: 2,
    title: 'ISP-Level BGP & Leased Line Architecture',
    description: 'Full BGP peering at ISP interconnect points — full routing table management, route policy, AS-path manipulation, and community tagging.',
    tech: ['BGP', 'OSPF', 'AS-Path', 'Route Policy', 'Cross-Connect', 'DCC', 'Full Table'],
    github: null, demo: null,
  },
]

const staticOther = [
  { id: 'o1', title: 'Fortigate HA Firewall Estate',     category: 'Security',       tech: ['Fortigate', 'HA Clustering', 'IPsec', 'SSL VPN', 'DPI', 'IPS/IDS'], github: null, demo: null, featured: false, order: 0 },
  { id: 'o2', title: 'Proxmox VE Hypervisor Cluster',    category: 'Virtualisation', tech: ['Proxmox VE', 'Ceph', 'HA', 'KVM', 'ZFS', 'Live Migration'],          github: null, demo: null, featured: false, order: 1 },
  { id: 'o3', title: 'TrueNAS SCALE Production Storage', category: 'Storage',        tech: ['TrueNAS SCALE', 'ZFS', 'RAIDZ2', 'iSCSI', 'NFS', 'SMB'],            github: null, demo: null, featured: false, order: 2 },
  { id: 'o4', title: 'Self-Hosted LLM Inference Stack',  category: 'AI',             tech: ['Ollama', 'vLLM', 'LLaMA 3', 'Open WebUI', 'Docker', 'GPU Nodes'],    github: null, demo: null, featured: false, order: 3 },
  { id: 'o5', title: 'AYON + NIM VFX Pipeline',          category: 'VFX Pipeline',   tech: ['AYON', 'NIM Studio', 'Python', 'Docker', 'Pipeline Automation'],     github: null, demo: null, featured: false, order: 4 },
  { id: 'o6', title: 'Portfolio & Analytics Platform',   category: 'Web Dev',        tech: ['Next.js 14', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma'],        github: 'https://github.com/SagarKandel/website', demo: 'https://sagarkandel.com', featured: false, order: 5 },
]

type Project = {
  id: string; title: string; description: string; tech: string[]
  github?: string | null; demo?: string | null; featured: boolean
  category?: string; order: number
}

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.04 })
  const [featured, setFeatured] = useState<Project[]>(staticFeatured)
  const [other, setOther] = useState<Project[]>(staticOther)

  useEffect(() => {
    fetch(`${API}/content/projects`)
      .then(r => r.json())
      .then((data: Project[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        setFeatured(data.filter(p => p.featured).sort((a, b) => a.order - b.order))
        setOther(data.filter(p => !p.featured).sort((a, b) => a.order - b.order))
      })
      .catch(() => {})
  }, [])

  return (
    <section id="projects" className="py-28 bg-bg">
      <div className="section-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow">Projects & Infrastructure</p>
          <h2 className="h2">What I've built</h2>
        </motion.div>

        {/* Featured */}
        <div className="space-y-5 mb-14">
          {featured.map((p, i) => {
            const palette = accentPalette[i % accentPalette.length]
            const catColor = categoryColors[p.category || ''] || { text: palette.accent, bg: palette.bg }
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                className="card-flat rounded-2xl overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1.5 h-1.5 md:h-auto rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                    style={{ background: palette.accent }} />
                  <div className="p-7 flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ color: catColor.text, background: catColor.bg }}>
                        {p.category || 'Infrastructure'}
                      </span>
                      <div className="flex gap-3">
                        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><Github size={16} /></a>}
                        {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><ExternalLink size={16} /></a>}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-text mb-3 leading-snug">{p.title}</h3>
                    <p className="text-[15px] text-text-2 leading-relaxed mb-5">{p.description}</p>
                    <div className="divider mb-4" />
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Other projects */}
        {other.length > 0 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
              className="text-xs font-semibold text-muted uppercase tracking-widest mb-5"
            >
              Other notable work
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {other.map((p, i) => {
                const color = categoryColors[p.category || ''] || { text: '#6e6e73', bg: '#f5f5f7' }
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}
                    className="card flex flex-col p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ color: color.text, background: color.bg }}>
                        {p.category}
                      </span>
                      <div className="flex gap-2">
                        {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><Github size={15} /></a>}
                        {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors"><ExternalLink size={15} /></a>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-text text-sm leading-snug mb-3 flex-1">{p.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => <span key={t} className="tag text-[11px]">{t}</span>)}
                      {p.tech.length > 4 && <span className="tag text-[11px]">+{p.tech.length - 4}</span>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
