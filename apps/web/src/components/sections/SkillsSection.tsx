'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillCategories = [
  {
    category: 'Network Engineering',
    color: '#00ff7f',
    skills: [
      { name: '100GbE Switching & Routing', level: 95 },
      { name: 'BGP / OSPF / Advanced Routing', level: 92 },
      { name: 'Dark Fibre / CWDM / DWDM', level: 88 },
      { name: 'Fortigate Firewall (Design & HA)', level: 90 },
      { name: 'ISP / Cross-Connect / DCC', level: 85 },
      { name: 'L2 Provider & Leased Lines', level: 87 },
    ],
  },
  {
    category: 'Systems & Virtualisation',
    color: '#00d4ff',
    skills: [
      { name: 'Proxmox VE (Clustering & HA)', level: 90 },
      { name: 'Linux Administration', level: 92 },
      { name: 'TrueNAS / ZFS / OMV', level: 88 },
      { name: 'Hyper-V / Windows Server', level: 82 },
      { name: 'Windows Storage Spaces', level: 78 },
      { name: 'Docker / Portainer', level: 90 },
    ],
  },
  {
    category: 'Cloud, AI & Automation',
    color: '#ffb800',
    skills: [
      { name: 'AWS (SAA-C03 Certified)', level: 82 },
      { name: 'Ollama / vLLM Self-Hosted AI', level: 85 },
      { name: 'RMM & Software Deployment', level: 88 },
      { name: 'Python / Bash Scripting', level: 78 },
      { name: 'AYON / NIM Studio Pipeline', level: 85 },
      { name: 'GAM / GYB / Google Workspace', level: 80 },
    ],
  },
]

const toolGroups = [
  {
    label: 'Networking',
    tools: ['Fortigate', 'Cisco', 'Juniper', 'BGP', 'OSPF', 'CWDM', 'DWDM', 'Dark Fibre', 'VLANs', 'LACP', 'SFP+', 'QSFP28', 'Wireshark', 'tcpdump'],
  },
  {
    label: 'Virtualisation',
    tools: ['Proxmox VE', 'Hyper-V', 'VMware ESXi', 'KVM', 'LXC', 'Windows Server 2022', 'Active Directory', 'WSUS'],
  },
  {
    label: 'Storage',
    tools: ['TrueNAS SCALE', 'TrueNAS CORE', 'OpenMediaVault', 'ZFS', 'iSCSI', 'NFS', 'SMB', 'Ceph', 'RAID', 'Replication'],
  },
  {
    label: 'Containers & DevOps',
    tools: ['Docker', 'Portainer', 'Docker Compose', 'Nginx', 'Traefik', 'Git', 'GitHub Actions', 'CI/CD'],
  },
  {
    label: 'AI & Open Source',
    tools: ['Ollama', 'vLLM', 'LLaMA', 'Mistral', 'Open WebUI', 'Stable Diffusion', 'RustDesk', 'Netdata', 'Grafana', 'InfluxDB'],
  },
  {
    label: 'VFX & Studio',
    tools: ['AYON', 'NIM Studio', 'RMM', 'SolarWinds', 'PRTG', 'Nagios', 'Slack', 'Teams', 'Google Workspace', 'GAM', 'GYB'],
  },
]

const certifications = [
  { name: 'AWS Certified Solutions Architect', level: 'Associate (SAA-C03)', issuer: 'Amazon Web Services', badge: '☁', color: 'text-terminal-amber' },
  { name: 'Bachelor of Information Technology', level: 'Network & System Computing', issuer: 'Victoria University · Melbourne', badge: '🎓', color: 'text-terminal-blue' },
]

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">03.</span> skills
          </p>
          <h2 className="section-title">TECH STACK</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="terminal-card flex items-center gap-4"
            >
              <div className="text-4xl">{cert.badge}</div>
              <div>
                <p className={`${cert.color} font-mono text-sm font-bold`}>{cert.name}</p>
                <p className="text-terminal-text text-sm">{cert.level}</p>
                <p className="text-terminal-muted text-xs">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIdx * 0.12 }}
              className="terminal-card"
            >
              <h3 className="font-mono text-sm tracking-wider mb-5 pb-3 border-b border-terminal-border"
                style={{ color: cat.color }}>
                <span className="text-terminal-muted">// </span>{cat.category}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-terminal-text/80 font-mono">{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: cat.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-terminal-dim rounded-none overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 + catIdx * 0.15 + skillIdx * 0.06, ease: 'easeOut' }}
                        className="h-full"
                        style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}66` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool groups */}
        <div className="space-y-4">
          {toolGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + i * 0.07 }}
              className="terminal-card"
            >
              <p className="text-xs text-terminal-muted tracking-widest mb-3 font-mono">
                <span className="text-terminal-green">// </span>{group.label.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span key={tool}
                    className="text-xs font-mono px-3 py-1.5 border border-terminal-border text-terminal-muted
                               hover:border-terminal-green hover:text-terminal-green transition-all duration-200 cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
