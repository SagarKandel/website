'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-ead1.up.railway.app'

type Experience = {
  id: string; company: string; role: string; startDate: string
  endDate?: string | null; description: string; tech: string[]; order: number
}

const staticExperiences = [
  {
    id: 's1', company: 'Blockhead VFX', role: 'Senior Systems & Network Engineer',
    startDate: '2019', endDate: null, order: 0,
    description: 'Designed and operate a 100 Gbps studio network backbone — spine-leaf architecture serving render farms, on-set DIT, and remote production pipelines simultaneously.\nEngineered dark fibre WAN links with CWDM/DWDM wavelength multiplexing between studio facilities, eliminating ISP dependency for inter-site traffic.\nAdvanced BGP and OSPF-wrapped BGP at ISP interconnect level — full routing table management, route policy, AS-path manipulation, and community tagging.\nBuilt and maintain Fortigate firewall estate — design, deployment, active-passive HA clustering, DPI policies, SSL VPN and IPsec site-to-site tunnels.\nProxmox VE hypervisor clusters — HA node configuration, live migration, Ceph distributed storage integration across compute and storage nodes.\nTrueNAS SCALE NAS infrastructure — RAIDZ2 ZFS pool design, replication policies, multi-protocol serving (iSCSI, NFS, SMB) for render workloads.\nSelf-hosted AI inference: Ollama and vLLM on local GPU nodes for internal LLM tooling, cutting external API reliance completely.\nAYON pipeline and NIM Studio Management alongside RMM-based endpoint management across Windows, Linux, and macOS fleets.',
    tech: ['100GbE', 'Dark Fibre', 'CWDM/DWDM', 'BGP', 'OSPF', 'Fortigate', 'Proxmox VE', 'TrueNAS', 'ZFS', 'Docker', 'Ollama', 'vLLM', 'AWS', 'Linux'],
  },
  {
    id: 's2', company: 'Victoria University', role: 'Bachelor of Information Technology',
    startDate: '2016', endDate: '2019', order: 1,
    description: 'Majored in Network and System Computing with strong academic performance across networking, security, and systems administration subjects.\nCapstone project: designed a high-availability network architecture for media production environments — grade: Distinction.\nBuilt deep foundations in routing protocols, enterprise network design, Linux systems administration, and software development.',
    tech: ['Network Engineering', 'Systems Admin', 'Security', 'Python', 'Linux', 'Routing Protocols'],
  },
]

function formatPeriod(exp: Experience) {
  const start = exp.startDate?.slice(0, 4) || ''
  const end = exp.endDate ? exp.endDate.slice(0, 4) : 'Present'
  return `${start} — ${end}`
}

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [experiences, setExperiences] = useState<Experience[]>(staticExperiences)

  useEffect(() => {
    fetch(`${API}/content/experience`)
      .then(r => r.json())
      .then((data: Experience[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        setExperiences(data.sort((a, b) => a.order - b.order))
      })
      .catch(() => {})
  }, [])

  return (
    <section id="experience" className="py-28 bg-bg">
      <div className="section-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow">Experience</p>
          <h2 className="h2">Career journey</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 top-3 bottom-3 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, rgba(0,102,204,0.3), rgba(0,102,204,0.05))' }} />

          <div className="space-y-8">
            {experiences.map((exp, i) => {
              const isCurrent = !exp.endDate
              const bullets = exp.description.split('\n').filter(Boolean)
              const period = formatPeriod(exp)

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                  className="relative sm:pl-16"
                >
                  <div className={`absolute left-3.5 top-7 w-3 h-3 rounded-full border-2 hidden sm:block -translate-x-1/2
                    ${isCurrent ? 'border-accent bg-accent' : 'border-[rgba(0,0,0,0.2)] bg-white'}`}
                  />

                  <div className="card-flat rounded-2xl overflow-hidden">
                    <div className="px-7 pt-6 pb-5 border-b border-[rgba(0,0,0,0.06)]">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2.5 mb-1">
                            <h3 className="text-lg font-bold text-text">{exp.role}</h3>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                style={{ color: '#1a7a4a', background: 'rgba(52,199,89,0.1)', border: '1px solid rgba(52,199,89,0.2)' }}>
                                <span className="dot-live w-1.5 h-1.5" />
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-text-2">
                            <span className="font-semibold text-accent">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted">
                          <Calendar size={13} />
                          <span>{period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-7 py-5">
                      <ul className="space-y-2.5 mb-6">
                        {bullets.map((item, j) => (
                          <li key={j} className="flex gap-3 text-[15px] text-text-2 leading-relaxed">
                            <span className="text-accent mt-1.5 shrink-0 text-xs">▸</span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="divider mb-4" />

                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t) => <span key={t} className="tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
