'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: '100Gbps VFX Studio Network Fabric',
    description: 'Designed and deployed a full spine-leaf 100GbE switching fabric for a major VFX studio — supporting concurrent render farm traffic, on-set DIT feeds, and inter-facility WAN. Included LACP bonding, ECMP load balancing, and sub-millisecond failover.',
    tech: ['100GbE', 'QSFP28', 'OSPF', 'LACP', 'ECMP', 'VLAN Segmentation'],
    category: 'Network Infrastructure',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'Dark Fibre WAN with CWDM/DWDM Multiplexing',
    description: 'Engineered multi-site dark fibre connectivity between studio facilities using CWDM wavelength multiplexing — delivering dedicated 10G/100G inter-site bandwidth completely off ISP infrastructure.',
    tech: ['Dark Fibre', 'CWDM', 'DWDM', 'SFP+/QSFP', 'OTDR', 'Optical Monitoring'],
    category: 'WAN / Dark Fibre',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'ISP-Level BGP & Leased Line Architecture',
    description: 'Managed full BGP peering at ISP interconnect points — handling full routing table, route policy, AS-path manipulation, and community tagging. Provisioned cross-connects and managed L2 provider relationships end-to-end.',
    tech: ['BGP', 'OSPF', 'AS-Path', 'Route Policy', 'Cross-Connect', 'DCC'],
    category: 'ISP Networking',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'Fortigate HA Firewall Estate',
    description: 'Active-passive HA cluster across studio perimeter and DMZ — DPI, IPS/IDS, SSL inspection, IPsec site-to-site VPN, and SSL VPN for remote artists.',
    tech: ['Fortigate', 'HA Clustering', 'IPsec', 'SSL VPN', 'DPI'],
    category: 'Security',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Proxmox VE Hypervisor Cluster',
    description: 'Proxmox cluster with HA node configuration, live VM migration, Ceph-based distributed storage, and automated backup policies.',
    tech: ['Proxmox VE', 'Ceph', 'HA', 'KVM', 'ZFS'],
    category: 'Virtualisation',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'TrueNAS SCALE Production Storage',
    description: 'TrueNAS SCALE NAS with RAIDZ2 ZFS pools, automated snapshot policies, multi-protocol serving, and encrypted offsite cloud backup.',
    tech: ['TrueNAS SCALE', 'ZFS', 'RAIDZ2', 'iSCSI', 'NFS', 'SMB'],
    category: 'Storage',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Self-Hosted LLM Inference Stack',
    description: 'On-premise AI inference using Ollama and vLLM on local GPU nodes — serving internal LLM tooling without sending data to external APIs.',
    tech: ['Ollama', 'vLLM', 'LLaMA 3', 'Open WebUI', 'Docker', 'NVIDIA GPU'],
    category: 'AI / Self-Hosted',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'AYON + NIM VFX Pipeline',
    description: 'Deployed and maintains AYON open-source VFX pipeline and NIM Studio Management across a full production studio — integrating workstations, render farms, storage, and project tracking.',
    tech: ['AYON', 'NIM Studio', 'Python', 'Docker', 'MongoDB'],
    category: 'VFX Pipeline',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Personal Portfolio + Analytics Backend',
    description: 'This site — Next.js 14, TypeScript, Framer Motion. Express backend with PostgreSQL, custom analytics tracking, lead management, and email notifications.',
    tech: ['Next.js 14', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma'],
    category: 'Web Dev',
    featured: false,
    github: 'https://github.com/SagarKandel/website',
    demo: 'https://sagarkandel.com',
  },
]

const categoryColor: Record<string, string> = {
  'Network Infrastructure': 'bg-blue-50 text-blue-700',
  'WAN / Dark Fibre': 'bg-violet-50 text-violet-700',
  'ISP Networking': 'bg-indigo-50 text-indigo-700',
  'Security': 'bg-red-50 text-red-700',
  'Virtualisation': 'bg-amber-50 text-amber-700',
  'Storage': 'bg-orange-50 text-orange-700',
  'AI / Self-Hosted': 'bg-purple-50 text-purple-700',
  'VFX Pipeline': 'bg-teal-50 text-teal-700',
  'Web Dev': 'bg-green-50 text-green-700',
}

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const featured = projects.filter((p) => p.featured)
  const other = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 bg-bg">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I&apos;ve built</h2>
        </motion.div>

        {/* Featured */}
        <div className="space-y-5 mb-14">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="card hover:border-accent/30 transition-colors"
            >
              <div className="mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[project.category] || 'bg-surface-alt text-ink-2'}`}>
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">{project.title}</h3>
              <p className="text-ink-2 text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other */}
        <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-5">
          Other projects
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {other.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="card flex flex-col hover:border-accent/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor[project.category] || 'bg-surface-alt text-ink-2'}`}>
                  {project.category}
                </span>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                      <Github size={15} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink transition-colors">
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-ink text-sm mb-2 leading-snug flex-1">{project.title}</h3>
              <p className="text-muted text-xs leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs text-muted">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs text-muted">+{project.tech.length - 4} more</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
