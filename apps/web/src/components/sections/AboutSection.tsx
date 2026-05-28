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
    desc: 'BGP, OSPF, dark fibre, CWDM/DWDM wavelengths, direct leased lines, cross-connects, L2 provider management — the full stack of how the internet actually works.',
  },
  {
    icon: Shield,
    label: 'Security & Firewall Engineering',
    desc: 'Fortigate firewall design and deployment, network segmentation, advanced ACLs, VPN architectures, and zero-trust access for production environments.',
  },
  {
    icon: Server,
    label: 'Datacenter & Hypervisor Infrastructure',
    desc: 'Proxmox VE clustering, Hyper-V, Windows Storage Spaces, high-availability design, and bare-metal server management at datacenter scale.',
  },
  {
    icon: Database,
    label: 'Storage & NAS Engineering',
    desc: 'TrueNAS SCALE/CORE, OpenMediaVault, ZFS pool design, replication, snapshots, and iSCSI/NFS/SMB shares for VFX render pipelines.',
  },
  {
    icon: Cpu,
    label: 'Containerisation & Self-Hosted AI',
    desc: 'Docker, Portainer, container orchestration, and self-hosted LLM inference with Ollama and vLLM — AI infrastructure on your own hardware.',
  },
  {
    icon: Workflow,
    label: 'VFX Pipeline & Studio Systems',
    desc: 'AYON pipeline, NIM Studio Management, RMM tooling, software deployment automation, and endpoint management across mixed OS environments.',
  },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">01.</span> about_me
          </p>
          <h2 className="section-title">WHO AM I</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="terminal-card">
              <p className="text-xs text-terminal-muted tracking-widest mb-4">
                <span className="text-terminal-green">cat</span> bio.txt
              </p>
              <div className="space-y-4 text-terminal-text/80 font-body leading-relaxed">
                <p>
                  I&apos;m <span className="text-terminal-green font-mono">Sagar Kandel</span> — a senior Systems and Network Engineer with
                  5+ years specialising in VFX production infrastructure at{' '}
                  <span className="text-terminal-green">Blockhead VFX</span> in Australia.
                </p>
                <p>
                  My work lives at the intersection of high-performance networking and production systems:
                  100Gig fabrics, dark fibre, ISP-level BGP routing, and the kind of infrastructure
                  that keeps render farms and live VFX pipelines running without a frame dropped.
                </p>
                <p>
                  I hold a Bachelor of IT from Victoria University, am{' '}
                  <span className="text-terminal-green">AWS Certified Solutions Architect</span>,
                  and am a strong advocate for open-source tooling — from TrueNAS and Proxmox
                  to self-hosted AI inference with Ollama and vLLM.
                </p>
                <p>
                  If it touches a fibre patch panel, a hypervisor cluster, or a GPU node running
                  an LLM, I&apos;ve probably engineered it.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="terminal-card text-center"
                >
                  <div className="font-display text-3xl text-terminal-green text-glow mb-1">{stat.value}</div>
                  <div className="text-xs text-terminal-muted tracking-wider uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="terminal-card">
              <p className="text-xs text-terminal-muted tracking-widest mb-3">
                <span className="text-terminal-green">$</span> availability --status
              </p>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
                <span className="text-terminal-green text-sm font-mono">Open to senior opportunities</span>
              </div>
              <p className="text-terminal-muted text-xs font-body">
                Infrastructure roles, network architecture, VFX pipeline tech, or hands-on consulting.
                Australia-based, open to remote.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="terminal-card flex items-start gap-4 group cursor-default"
              >
                <div className="p-2 border border-terminal-border group-hover:border-terminal-green group-hover:bg-terminal-green/10 transition-all duration-300 flex-shrink-0">
                  <item.icon className="w-5 h-5 text-terminal-green" />
                </div>
                <div>
                  <h3 className="text-terminal-green text-sm font-mono tracking-wider mb-1">{item.label}</h3>
                  <p className="text-terminal-muted text-xs font-body leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
