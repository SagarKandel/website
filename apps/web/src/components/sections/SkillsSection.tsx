'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    title: 'Network Engineering',
    color: '#0066cc',
    bg: '#e8f0fb',
    skills: [
      { name: '100 GbE Switching & Routing',       level: 95 },
      { name: 'BGP / OSPF / Advanced Routing',     level: 92 },
      { name: 'Dark Fibre / CWDM / DWDM',          level: 88 },
      { name: 'Fortigate Firewall (Design & HA)',   level: 90 },
      { name: 'ISP / Cross-Connect / DCC',          level: 86 },
      { name: 'VPN — IPsec / SSL',                 level: 88 },
    ],
  },
  {
    title: 'Systems & Virtualisation',
    color: '#6b21a8',
    bg: '#f3e8ff',
    skills: [
      { name: 'Proxmox VE (Clustering & HA)',  level: 90 },
      { name: 'Linux Administration',          level: 92 },
      { name: 'TrueNAS / ZFS / OMV',          level: 88 },
      { name: 'Hyper-V / Windows Server',      level: 82 },
      { name: 'Docker / Portainer',            level: 90 },
      { name: 'Ceph Distributed Storage',      level: 82 },
    ],
  },
  {
    title: 'Cloud, AI & Automation',
    color: '#b45309',
    bg: '#fef3c7',
    skills: [
      { name: 'AWS (SAA-C03 Certified)',       level: 82 },
      { name: 'Ollama / vLLM Self-Hosted AI',  level: 85 },
      { name: 'RMM & Software Deployment',     level: 88 },
      { name: 'Python / Bash Scripting',       level: 78 },
      { name: 'AYON / NIM Pipeline',          level: 85 },
      { name: 'Google Workspace / GAM',        level: 80 },
    ],
  },
]

const toolGroups = [
  { label: 'Networking',          tools: ['Fortigate', 'Cisco', 'BGP', 'OSPF', 'CWDM', 'DWDM', 'Dark Fibre', 'VLANs', 'LACP', 'Wireshark', 'tcpdump'] },
  { label: 'Virtualisation',      tools: ['Proxmox VE', 'Hyper-V', 'KVM', 'LXC', 'Windows Server 2022', 'Active Directory', 'WSUS'] },
  { label: 'Storage',             tools: ['TrueNAS SCALE', 'ZFS', 'iSCSI', 'NFS', 'SMB', 'Ceph', 'RAIDZ2', 'S3'] },
  { label: 'Containers & DevOps', tools: ['Docker', 'Portainer', 'Docker Compose', 'Nginx', 'Traefik', 'Git', 'GitHub Actions'] },
  { label: 'AI & Monitoring',     tools: ['Ollama', 'vLLM', 'LLaMA 3', 'Mistral', 'Open WebUI', 'Grafana', 'InfluxDB', 'Netdata'] },
  { label: 'VFX & Studio',        tools: ['AYON', 'NIM Studio', 'RMM', 'SolarWinds', 'PRTG', 'Google Workspace', 'GAM', 'GYB'] },
]

const certs = [
  { name: 'AWS Certified Solutions Architect', sub: 'Associate · SAA-C03', issuer: 'Amazon Web Services', color: '#ff9900', bg: '#fff3e0' },
  { name: 'Bachelor of Information Technology', sub: 'Network & System Computing', issuer: 'Victoria University, Melbourne', color: '#0066cc', bg: '#e8f0fb' },
]

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="py-28 section-alt">
      <div className="section-container" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="eyebrow">Technical Skills</p>
          <h2 className="h2">Built across years of<br className="hidden sm:block" /> real infrastructure work</h2>
        </motion.div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + ci * 0.1 }}
              className="card-flat rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg"
                style={{ background: cat.bg }}>
                <span style={{ color: cat.color, fontWeight: 700, fontSize: '14px' }}>
                  {ci === 0 ? '⬡' : ci === 1 ? '⬢' : '☁'}
                </span>
              </div>
              <h3 className="font-semibold text-text mb-5 text-[15px]">{cat.title}</h3>
              <div className="space-y-4">
                {cat.skills.map((sk, i) => (
                  <div key={sk.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-text-2">{sk.name}</span>
                      <span className="text-[12px] font-semibold" style={{ color: cat.color }}>{sk.level}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}cc)` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${sk.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + ci * 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-flat rounded-2xl p-6 mb-8"
        >
          <h3 className="font-semibold text-text mb-6 text-[15px]">Tools &amp; Technologies</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {toolGroups.map((g) => (
              <div key={g.label}>
                <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2.5">{g.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {g.tools.map((t) => (
                    <span key={t} className="tag text-[12px]">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">Certifications &amp; Education</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certs.map((c) => (
              <div key={c.name} className="card-flat rounded-2xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl"
                  style={{ background: c.bg }}>
                  {c.issuer.includes('Amazon') ? '☁️' : '🎓'}
                </div>
                <div>
                  <p className="font-semibold text-text text-sm leading-snug mb-0.5">{c.name}</p>
                  <p className="text-xs text-accent font-medium mb-0.5">{c.sub}</p>
                  <p className="text-xs text-muted">{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
