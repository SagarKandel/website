'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Network, Shield, Server, Database, Cpu, Workflow } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-ead1.up.railway.app'

const specialisms = [
  { icon: Network,   title: 'Enterprise & ISP Networking',         desc: 'BGP, OSPF, dark fibre, CWDM/DWDM multiplexing, direct leased lines, cross-connects, and full L2 provider management.' },
  { icon: Shield,    title: 'Security & Firewall Engineering',      desc: 'Fortigate HA clusters, deep packet inspection, IPS/IDS, IPsec site-to-site VPN, SSL VPN, and zero-trust network access.' },
  { icon: Server,    title: 'Datacenter & Hypervisor Infrastructure', desc: 'Proxmox VE clustering, Hyper-V, Ceph distributed storage, live migration, and HA at datacenter scale.' },
  { icon: Database,  title: 'Storage & NAS Engineering',            desc: 'TrueNAS SCALE, ZFS pool design, RAIDZ2, snapshot replication, iSCSI/NFS/SMB for VFX render pipelines.' },
  { icon: Cpu,       title: 'Containerisation & Self-Hosted AI',    desc: 'Docker, Portainer, Ollama and vLLM on bare-metal GPU nodes — AI inference without cloud API dependency.' },
  { icon: Workflow,  title: 'VFX Pipeline & Studio Systems',        desc: 'AYON pipeline, NIM Studio Management, RMM tooling, and endpoint management across Windows/Linux/macOS fleets.' },
]

const defaults = {
  about_heading:    'Engineering infrastructure that never sleeps',
  about_subheading: 'From Nepal to Melbourne to Sydney — 5+ years building the networks and systems that power award-winning VFX production at Blockhead VFX.',
  about_name:       'Sagar Kandel',
  about_role:       'Network & Systems Engineer',
  about_currently:  'Blockhead VFX, Sydney',
  about_education:  'B.IT — Victoria University, Melbourne',
  about_cert:       'AWS Solutions Architect Associate',
  about_experience: '5+ years enterprise infrastructure',
  about_timezone:   'AEST — UTC+10/11',
  social_email:     'sagar@sagarkandel.com',
}

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const [s, setS] = useState(defaults)

  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        if (data && typeof data === 'object') setS(prev => ({ ...prev, ...data }))
      })
      .catch(() => {})
  }, [])

  const profile = [
    { label: 'Currently at',  value: s.about_currently },
    { label: 'Role',          value: s.about_role },
    { label: 'Education',     value: s.about_education },
    { label: 'Certification', value: s.about_cert },
    { label: 'Experience',    value: s.about_experience },
    { label: 'Timezone',      value: s.about_timezone },
  ]

  return (
    <section id="about" className="py-28 section-alt">
      <div className="section-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow">About</p>
          <h2 className="h2 mb-4">{s.about_heading}</h2>
          <p className="text-lg text-text-2 leading-relaxed max-w-2xl">{s.about_subheading}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card-flat rounded-2xl overflow-hidden">
              <div className="h-48 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e8f0fb 0%, #f0eaff 100%)' }}>
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-accent"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '2px solid rgba(0,102,204,0.15)' }}>
                  {s.about_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-text text-lg mb-1">{s.about_name}</h3>
                <p className="text-sm text-muted mb-5">{s.about_role}</p>

                <div className="space-y-3">
                  {profile.map((row) => (
                    <div key={row.label} className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-muted uppercase tracking-wide">{row.label}</span>
                      <span className="text-sm text-text">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-[rgba(0,0,0,0.07)] flex gap-2">
                  <a href="#contact" className="btn-primary flex-1 justify-center text-sm py-2.5">Contact me</a>
                  <a href="/resume.pdf" download className="btn-secondary flex-1 justify-center text-sm py-2.5">Resume</a>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {specialisms.map((sp, i) => (
              <motion.div
                key={sp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.07 }}
                className="card group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: '#e8f0fb' }}>
                  <sp.icon size={20} className="text-accent" />
                </div>
                <h3 className="font-semibold text-text text-sm mb-2 leading-snug">{sp.title}</h3>
                <p className="text-xs text-text-2 leading-relaxed">{sp.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
