'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Star } from 'lucide-react'

const projects = [
  {
    title: '100Gbps VFX Studio Network Fabric',
    description:
      'Designed and deployed a full spine-leaf 100GbE switching fabric for a major VFX studio — supporting concurrent render farm traffic, on-set DIT feeds, and inter-facility WAN. Included LACP bonding, ECMP load balancing, and sub-millisecond failover.',
    tech: ['100GbE', 'QSFP28', 'OSPF', 'LACP', 'ECMP', 'VLAN Segmentation', 'Jumbo Frames'],
    category: 'Network Infrastructure',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'Dark Fibre WAN with CWDM/DWDM Multiplexing',
    description:
      'Engineered multi-site dark fibre connectivity between studio facilities using CWDM wavelength multiplexing — delivering dedicated 10G/100G inter-site bandwidth completely off ISP infrastructure. Includes optical monitoring and wavelength-level fault isolation.',
    tech: ['Dark Fibre', 'CWDM', 'DWDM', 'SFP+/QSFP', 'OTDR', 'Optical Monitoring'],
    category: 'WAN / Dark Fibre',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'ISP-Level BGP & Leased Line Architecture',
    description:
      'Managed full BGP peering at ISP interconnect points — handling full routing table, route policy, AS-path manipulation, and community tagging. Provisioned and troubleshot direct leased lines (DCC), cross-connects, and managed L2 provider relationships end-to-end.',
    tech: ['BGP', 'OSPF', 'AS-Path', 'Route Policy', 'Cross-Connect', 'DCC', 'L2 Provider'],
    category: 'ISP Networking',
    featured: true,
    github: null,
    demo: null,
  },
  {
    title: 'Fortigate HA Firewall Estate',
    description:
      'Designed and deployed a Fortigate firewall cluster in active-passive HA across studio perimeter and DMZ — including DPI policies, IPS/IDS, SSL inspection, IPsec site-to-site VPN, and SSL VPN for remote artists.',
    tech: ['Fortigate', 'HA Clustering', 'IPsec', 'SSL VPN', 'IPS/IDS', 'DPI', 'SD-WAN'],
    category: 'Security',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Proxmox VE Hypervisor Cluster',
    description:
      'Built a Proxmox VE cluster for studio virtualisation — HA node configuration with live VM migration, Ceph-based distributed storage, and automated backup policies. Hosts core studio services including monitoring, LDAP, and internal tooling.',
    tech: ['Proxmox VE', 'Ceph', 'HA', 'KVM', 'LXC', 'ZFS', 'DRBD'],
    category: 'Virtualisation',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'TrueNAS SCALE Production Storage',
    description:
      'Deployed TrueNAS SCALE as primary NAS for VFX project storage — ZFS pool design with RAIDZ2, automated snapshot and replication policies, multi-protocol serving (iSCSI, NFS, SMB), and encrypted offsite backup to cloud object storage.',
    tech: ['TrueNAS SCALE', 'ZFS', 'RAIDZ2', 'iSCSI', 'NFS', 'SMB', 'Replication', 'S3'],
    category: 'Storage',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Self-Hosted LLM Inference Stack',
    description:
      'Built on-premise AI inference infrastructure using Ollama and vLLM on local GPU nodes — serving internal LLM tooling for the studio without sending data to external APIs. Includes Open WebUI frontend and API gateway for internal consumers.',
    tech: ['Ollama', 'vLLM', 'LLaMA 3', 'Mistral', 'Open WebUI', 'Docker', 'NVIDIA GPU'],
    category: 'AI / Self-Hosted',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'AYON + NIM VFX Pipeline Integration',
    description:
      'Deployed and maintains AYON open-source VFX pipeline management and NIM Studio Management across a full production studio — integrating artist workstations, render farms, storage, and project tracking into a unified pipeline.',
    tech: ['AYON', 'NIM Studio', 'Python', 'REST API', 'MongoDB', 'Docker'],
    category: 'VFX Pipeline',
    featured: false,
    github: null,
    demo: null,
  },
  {
    title: 'Personal Portfolio + Analytics Backend',
    description:
      'This site — Next.js 14, TypeScript, Framer Motion, dark fibre-themed terminal UI. Express backend with PostgreSQL, custom analytics tracking (geo, device, referrer), lead management, and email notifications. Deployed on Vercel + Railway with GitHub Actions CI/CD.',
    tech: ['Next.js 14', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Vercel', 'Railway'],
    category: 'Web Dev',
    featured: false,
    github: 'https://github.com/SagarKandel/sagar-portfolio',
    demo: 'https://sagarkandel.com',
  },
]

const categoryColors: Record<string, string> = {
  'Network Infrastructure': 'text-terminal-green border-terminal-green',
  'WAN / Dark Fibre': 'text-terminal-blue border-terminal-blue',
  'ISP Networking': 'text-terminal-blue border-terminal-blue',
  'Security': 'text-terminal-red border-terminal-red',
  'Virtualisation': 'text-terminal-amber border-terminal-amber',
  'Storage': 'text-terminal-amber border-terminal-amber',
  'AI / Self-Hosted': 'text-terminal-green border-terminal-green',
  'VFX Pipeline': 'text-terminal-muted border-terminal-muted',
  'Web Dev': 'text-terminal-muted border-terminal-muted',
}

export default function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const featured = projects.filter((p) => p.featured)
  const other = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">04.</span> projects
          </p>
          <h2 className="section-title">BUILT THINGS</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        <div className="space-y-6 mb-16">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="terminal-card group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-terminal-amber fill-terminal-amber" />
                  <span className={`text-xs font-mono px-2 py-0.5 border ${categoryColors[project.category] || 'text-terminal-muted border-terminal-border'}`}>
                    {project.category}
                  </span>
                </div>
                <div className="flex gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-terminal-muted hover:text-terminal-green transition-colors">
                      <Github size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="text-terminal-muted hover:text-terminal-green transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="font-display text-xl text-terminal-green mb-3 group-hover:text-glow transition-all">
                {project.title}
              </h3>
              <p className="text-terminal-text/70 font-body text-sm leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-terminal-muted border border-terminal-dim px-2 py-1">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="text-terminal-muted text-xs tracking-widest mb-6 font-mono">
          <span className="text-terminal-green">// </span>other noteworthy projects
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {other.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="terminal-card group flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono px-2 py-0.5 border ${categoryColors[project.category] || 'text-terminal-muted border-terminal-border'}`}>
                  {project.category}
                </span>
                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-terminal-muted hover:text-terminal-green transition-colors">
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="text-terminal-muted hover:text-terminal-green transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="font-mono text-sm text-terminal-green mb-2 group-hover:text-glow transition-all leading-snug flex-1">
                {project.title}
              </h3>
              <p className="text-terminal-text/60 text-xs font-body leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs font-mono text-terminal-muted">{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-xs font-mono text-terminal-muted">+{project.tech.length - 4} more</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
