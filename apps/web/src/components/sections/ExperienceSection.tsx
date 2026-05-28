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
      'Designed and operate 100Gbps studio network backbone — spine-leaf architecture serving render farms, on-set DIT, and remote production pipelines simultaneously',
      'Engineered dark fibre WAN links with CWDM/DWDM wavelength multiplexing between studio facilities, eliminating ISP dependency for inter-site traffic',
      'Advanced BGP and OSPF-wrapped BGP configurations at ISP interconnect level — full routing table handling, route policy, AS path manipulation',
      'Full Fortigate firewall estate — design, deployment, HA clustering, DPI policies, SSL VPN and IPsec site-to-site tunnels',
      'Built and maintains Proxmox VE hypervisor clusters — HA node configuration, live migration, Ceph storage integration',
      'Deployed TrueNAS SCALE NAS infrastructure — ZFS pool design, replication, multi-protocol serving (iSCSI, NFS, SMB)',
      'Self-hosted AI inference: Ollama and vLLM on local GPU nodes, cutting reliance on external AI APIs',
      'Manages AYON pipeline and NIM Studio Management alongside RMM-based endpoint management across Windows/Linux/macOS fleets',
    ],
    tech: ['100GbE', 'Dark Fibre', 'BGP', 'OSPF', 'Fortigate', 'Proxmox', 'TrueNAS', 'ZFS', 'Docker', 'Ollama', 'AWS', 'Linux'],
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
      'Capstone project on high-availability network architecture for media production environments',
      'Developed foundations in routing protocols, enterprise network design, and systems administration',
    ],
    tech: ['Network Engineering', 'Systems Admin', 'Security', 'Python', 'Linux'],
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
          <p className="section-label">Career</p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        <div className="space-y-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card hover:border-accent/30 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <h3 className="text-lg font-bold text-ink">{exp.role}</h3>
                    {exp.current && (
                      <span className="text-xs font-semibold bg-accent-light text-accent px-2.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-2">
                    <span className="font-medium">{exp.company}</span>
                    <span className="text-border">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ink">{exp.period}</p>
                  <p className="text-xs text-muted">{exp.type}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.description.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                    <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▸</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-5 border-t border-border">
                {exp.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
