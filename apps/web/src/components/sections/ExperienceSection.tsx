'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    company: 'Blockhead VFX',
    role: 'Senior Systems & Network Engineer',
    period: '2019 — Present',
    location: 'Sydney, Australia',
    type: 'Full-time · 5+ years',
    current: true,
    description: [
      'Designed and operate 100Gbps studio network backbone — spine-leaf architecture serving render farms, on-set DIT, and remote production pipelines simultaneously',
      'Engineered dark fibre WAN links with CWDM/DWDM wavelength multiplexing between studio facilities — eliminating ISP dependency for inter-site traffic',
      'Advanced BGP and OSPF-wrapped BGP configurations at ISP interconnect level, including full BGP table handling, route policy, and AS path manipulation',
      'Full Fortigate firewall estate — design, deployment, HA clustering, deep packet inspection policies, SSL VPN and IPsec site-to-site tunnels',
      'Provisioned and managed cross-connects and direct leased lines (DCC) with carriers; owns L2 provider relationships and troubleshoots to physical layer',
      'Built and maintains Proxmox VE hypervisor clusters for studio compute — HA node configuration, live migration, Ceph storage integration',
      'Deployed TrueNAS SCALE NAS infrastructure for project storage — ZFS pool design, replication jobs, snapshot policies, and iSCSI/NFS/SMB multi-protocol serving',
      'Containerised studio services using Docker and Portainer — from internal tools to self-hosted monitoring and LLM inference endpoints',
      'Self-hosted AI inference: Ollama and vLLM on local GPU nodes for internal LLM tooling, cutting reliance on external AI APIs',
      'Manages AYON pipeline and NIM Studio Management for production workflow, alongside RMM-based endpoint management across Windows/Linux/macOS fleets',
      'Administers Google Workspace (GAM/GYB automation), Microsoft Teams, Slack, and cross-platform identity management at org level',
      'Automated patch management, software deployment, and config management using open-source RMM tooling and scripting',
    ],
    tech: [
      '100GbE', 'Dark Fibre', 'CWDM/DWDM', 'BGP', 'OSPF', 'Fortigate', 'ISP Networking',
      'Cross-Connect', 'DCC/Leased Lines', 'Proxmox', 'TrueNAS', 'ZFS', 'Docker', 'Portainer',
      'Ollama', 'vLLM', 'AYON', 'NIM', 'RMM', 'AWS', 'Hyper-V', 'Windows Server', 'Linux',
      'GAM/GYB', 'Google Workspace', 'RustDesk', 'OMV',
    ],
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
      'Developed deep foundations in routing protocols, enterprise network design, and systems administration',
      'Capstone project on high-availability network architecture for media production environments',
      'Led university IT and networking community initiatives',
    ],
    tech: ['Network Engineering', 'Systems Admin', 'Security', 'Python', 'Linux', 'Cloud Fundamentals'],
  },
]

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="experience" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">02.</span> experience
          </p>
          <h2 className="section-title">CAREER TIMELINE</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-terminal-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative pl-12 md:pl-20"
              >
                <div className={`absolute left-0 md:left-4 top-2 w-8 h-8 flex items-center justify-center border
                  ${exp.current ? 'border-terminal-green bg-terminal-green/10' : 'border-terminal-border bg-terminal-surface'}`}>
                  <div className={`w-2 h-2 ${exp.current ? 'bg-terminal-green animate-pulse' : 'bg-terminal-muted'}`} />
                </div>

                <div className="terminal-card">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-display text-lg text-terminal-green">{exp.role}</h3>
                        {exp.current && (
                          <span className="text-xs border border-terminal-green text-terminal-green px-2 py-0.5 tracking-widest animate-glow-pulse">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-terminal-text font-mono text-sm">
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-terminal-amber text-sm font-mono">{exp.period}</p>
                      <p className="text-terminal-muted text-xs">{exp.type}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-5">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-terminal-text/70 font-body leading-relaxed">
                        <span className="text-terminal-green mt-0.5 flex-shrink-0">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-terminal-border">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 border border-terminal-dim text-terminal-muted hover:border-terminal-green hover:text-terminal-green transition-all cursor-default">
                        {t}
                      </span>
                    ))}
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
