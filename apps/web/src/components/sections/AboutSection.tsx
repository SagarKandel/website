'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Network, Shield, Cpu, Database, Workflow } from 'lucide-react'

const profile = [
  { k: 'NAME',        v: 'Sagar Kandel' },
  { k: 'ROLE',        v: 'Senior Network & Systems Eng.' },
  { k: 'EMPLOYER',    v: 'Blockhead VFX — Sydney, AU' },
  { k: 'CLEARANCE',   v: 'Senior Infrastructure' },
  { k: 'CERTS',       v: 'AWS SAA-C03 · B.IT Victoria Uni' },
  { k: 'STATUS',      v: '● AVAILABLE FOR HIRE', green: true },
]

const highlights = [
  { icon: Network,  label: 'Enterprise & ISP-Level Networking',    desc: 'BGP, OSPF, dark fibre, CWDM/DWDM, direct leased lines, cross-connects, full L2 provider management.' },
  { icon: Shield,   label: 'Security & Firewall Engineering',      desc: 'Fortigate HA clusters, DPI, IPS/IDS, IPsec site-to-site VPN, SSL VPN, and zero-trust network access.' },
  { icon: Server,   label: 'Datacenter & Hypervisor Infrastructure', desc: 'Proxmox VE clustering, Hyper-V, Ceph storage, live migration, and high-availability at datacenter scale.' },
  { icon: Database, label: 'Storage & NAS Engineering',             desc: 'TrueNAS SCALE, ZFS pool design, RAIDZ2, snapshot replication, and iSCSI/NFS/SMB for VFX render pipelines.' },
  { icon: Cpu,      label: 'Containerisation & Self-Hosted AI',    desc: 'Docker, Portainer, Ollama and vLLM on bare-metal GPU nodes — AI inference without external API dependency.' },
  { icon: Workflow, label: 'VFX Pipeline & Studio Systems',        desc: 'AYON pipeline, NIM Studio Management, RMM tooling, and endpoint management across Windows/Linux/macOS fleets.' },
]

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section id="about" className="py-24 bg-surface net-grid">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ whoami</p>
          <h2 className="section-title">Operator Profile</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* System profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="terminal-chrome">
              <div className="terminal-chrome-bar">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-amber/70" />
                <span className="w-3 h-3 rounded-full bg-green/70" />
                <span className="ml-3 font-mono text-xs text-muted">system-profile.sh</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-muted text-xs mb-4">
                  <span className="text-cyan">➜</span> cat /etc/operator/profile
                </div>

                {/* Profile rows */}
                <div className="border border-border rounded-lg overflow-hidden">
                  {profile.map((row, i) => (
                    <div
                      key={row.k}
                      className={`flex items-center gap-4 px-4 py-3 ${
                        i < profile.length - 1 ? 'border-b border-border' : ''
                      } ${i % 2 === 0 ? 'bg-surface/50' : 'bg-transparent'}`}
                    >
                      <span className="text-muted text-xs tracking-widest w-24 flex-shrink-0">{row.k}</span>
                      <span className="text-border mx-1">│</span>
                      <span className={row.green ? 'text-green font-semibold' : 'text-text'}>
                        {row.v}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 text-xs text-muted leading-relaxed">
                  <span className="text-cyan"># </span>
                  5+ years engineering enterprise-grade infrastructure at the intersection of
                  high-performance networking and VFX production. 100 Gbps fabrics, dark fibre,
                  ISP-level BGP, and self-hosted AI — the systems that keep creative studios running
                  without a frame dropped.
                </div>

                <div className="link-bar mt-4" />

                <div className="text-xs text-muted mt-3">
                  <span className="text-cyan">➜</span>
                  <span className="cursor-blink text-cyan ml-1">█</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-3"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.07 }}
                className="card-dark flex items-start gap-4 group transition-all hover:border-cyan/30"
              >
                <div className="p-2.5 bg-cyan/10 rounded-xl flex-shrink-0 group-hover:bg-cyan/15 transition-colors">
                  <h.icon className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-text text-sm mb-1">{h.label}</h3>
                  <p className="text-muted text-xs leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
