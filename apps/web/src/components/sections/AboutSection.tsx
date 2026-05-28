'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Network, Shield, Cpu, Database, Workflow } from 'lucide-react'

const stats = [
  { label: 'Years in VFX IT', value: '5+' },
  { label: 'Network Capacity', value: '100G' },
  { label: 'AWS Certified', value: 'SAA' },
  { label: 'Open Source First', value: '✓' },
]

const highlights = [
  {
    icon: Network,
    label: 'Enterprise & ISP-Level Networking',
    desc: 'BGP, OSPF, dark fibre, CWDM/DWDM wavelengths, direct leased lines, cross-connects, L2 provider management.',
  },
  {
    icon: Shield,
    label: 'Security & Firewall Engineering',
    desc: 'Fortigate firewall design and deployment, network segmentation, VPN architectures, zero-trust access.',
  },
  {
    icon: Server,
    label: 'Datacenter & Hypervisor Infrastructure',
    desc: 'Proxmox VE clustering, Hyper-V, high-availability design, and bare-metal server management.',
  },
  {
    icon: Database,
    label: 'Storage & NAS Engineering',
    desc: 'TrueNAS SCALE/CORE, ZFS pool design, replication, snapshots, and iSCSI/NFS/SMB for VFX render pipelines.',
  },
  {
    icon: Cpu,
    label: 'Containerisation & Self-Hosted AI',
    desc: 'Docker, Portainer, container orchestration, and self-hosted LLM inference with Ollama and vLLM.',
  },
  {
    icon: Workflow,
    label: 'VFX Pipeline & Studio Systems',
    desc: 'AYON pipeline, NIM Studio Management, RMM tooling, and endpoint management across mixed OS environments.',
  },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="section-label">About me</p>
          <h2 className="section-title mb-5">Who I am</h2>
          <p className="text-ink-2 leading-relaxed">
            I&apos;m <strong className="text-ink">Sagar Kandel</strong> — a senior Systems and Network
            Engineer with 5+ years specialising in VFX production infrastructure at{' '}
            <strong className="text-ink">Blockhead VFX</strong> in Sydney, Australia.
          </p>
          <p className="text-ink-2 leading-relaxed mt-4">
            My work lives at the intersection of high-performance networking and production systems:
            100Gig fabrics, dark fibre, ISP-level BGP routing, and the infrastructure that keeps render
            farms and live VFX pipelines running without a frame dropped.
          </p>
          <p className="text-ink-2 leading-relaxed mt-4">
            I hold a Bachelor of IT from Victoria University, am{' '}
            <strong className="text-ink">AWS Certified Solutions Architect</strong>, and strongly advocate
            for open-source tooling — from TrueNAS and Proxmox to self-hosted AI with Ollama and vLLM.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface-alt rounded-2xl p-5 text-center">
              <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-xs text-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.07 }}
              className="card flex items-start gap-4 hover:border-accent/30 transition-colors"
            >
              <div className="p-2.5 bg-accent-light rounded-xl flex-shrink-0">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-ink text-sm mb-1">{item.label}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10"
        >
          <div className="inline-flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-800">
              Open to senior roles — infrastructure, network architecture, VFX pipeline, consulting
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
