'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin } from 'lucide-react'

const experiences = [
  {
    company: 'Blockhead VFX',
    role: 'Senior Systems & Network Engineer',
    period: '2019 — Present',
    location: 'Sydney, Australia',
    type: 'Full-time · 5+ years',
    current: true,
    description: [
      'Designed and operate 100 Gbps studio network backbone — spine-leaf architecture serving render farms, on-set DIT, and remote production pipelines simultaneously',
      'Engineered dark fibre WAN links with CWDM/DWDM wavelength multiplexing between studio facilities, eliminating ISP dependency for inter-site traffic',
      'Advanced BGP and OSPF-wrapped BGP at ISP interconnect level — full routing table, route policy, AS-path manipulation, and community tagging',
      'Full Fortigate firewall estate — design, deployment, active-passive HA clustering, DPI policies, SSL VPN and IPsec site-to-site tunnels',
      'Built and maintains Proxmox VE hypervisor clusters — HA node configuration, live migration, Ceph distributed storage integration',
      'Deployed TrueNAS SCALE NAS infrastructure — RAIDZ2 ZFS pool design, replication policies, multi-protocol serving (iSCSI, NFS, SMB)',
      'Self-hosted AI inference: Ollama and vLLM on local GPU nodes for internal LLM tooling, cutting external API reliance completely',
      'Manages AYON pipeline and NIM Studio Management alongside RMM-based endpoint management across Windows / Linux / macOS fleets',
    ],
    tech: ['100GbE','Dark Fibre','CWDM/DWDM','BGP','OSPF','Fortigate','Proxmox VE','TrueNAS','ZFS','Docker','Ollama','vLLM','AWS','Linux'],
  },
  {
    company: 'Victoria University',
    role: 'Bachelor of Information Technology',
    period: '2016 — 2019',
    location: 'Melbourne, Australia',
    type: 'Education',
    current: false,
    description: [
      'Majored in Network and System Computing with strong academic performance',
      'Capstone project: high-availability network architecture for media production environments',
      'Developed deep foundations in routing protocols, enterprise network design, and systems administration',
    ],
    tech: ['Network Engineering','Systems Admin','Security','Python','Linux','Routing Protocols'],
  },
]

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="py-24 bg-bg">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ traceroute career</p>
          <h2 className="section-title">Career Path</h2>
        </motion.div>

        {/* Network path line + nodes */}
        <div className="relative">
          {/* Vertical "cable" */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-border hidden sm:block">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-cyan via-cyan/50 to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
                className="relative sm:pl-16"
              >
                {/* Node dot */}
                <div className={`absolute left-3 top-6 w-6 h-6 rounded-full border-2 hidden sm:flex items-center justify-center
                  ${exp.current
                    ? 'border-cyan bg-cyan/15 animate-glow-pulse'
                    : 'border-border-bright bg-surface'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${exp.current ? 'bg-cyan animate-pulse' : 'bg-muted'}`} />
                </div>

                <div className="terminal-chrome hover:border-border-bright transition-all duration-300">
                  {/* Header */}
                  <div className="terminal-chrome-bar">
                    <span className="font-mono text-xs text-muted">
                      node: {exp.company.toLowerCase().replace(/\s/g, '-')}
                    </span>
                    {exp.current && (
                      <span className="ml-3 inline-flex items-center gap-1.5 text-xs font-mono text-green">
                        <span className="status-online" /> CURRENT
                      </span>
                    )}
                    <span className="ml-auto font-mono text-xs text-amber">{exp.period}</span>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-lg font-bold text-text mb-1">{exp.role}</h3>
                        <div className="flex items-center gap-2 text-sm text-text-2 font-mono">
                          <span className="text-cyan">{exp.company}</span>
                          <span className="text-border">·</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} className="text-muted" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted font-mono border border-border rounded px-2 py-1">
                        {exp.type}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex gap-3 text-sm text-text-2 leading-relaxed">
                          <span className="text-cyan mt-1.5 flex-shrink-0 text-xs">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="link-bar" />

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tech.map(t => (
                        <span key={t}
                          className="text-xs font-mono px-2.5 py-1 border border-border text-muted rounded
                                     hover:border-cyan/50 hover:text-cyan transition-all cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
