'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillCategories = [
  {
    category: 'Network Engineering',
    skills: ['100GbE Switching & Routing', 'BGP / OSPF / Advanced Routing', 'Dark Fibre / CWDM / DWDM', 'Fortigate Firewall', 'ISP / Cross-Connect / DCC', 'L2 Provider & Leased Lines'],
  },
  {
    category: 'Systems & Virtualisation',
    skills: ['Proxmox VE (Clustering & HA)', 'Linux Administration', 'TrueNAS / ZFS / OMV', 'Hyper-V / Windows Server', 'Docker / Portainer', 'Windows Storage Spaces'],
  },
  {
    category: 'Cloud, AI & Automation',
    skills: ['AWS (SAA-C03 Certified)', 'Ollama / vLLM Self-Hosted AI', 'RMM & Software Deployment', 'Python / Bash Scripting', 'AYON / NIM Studio Pipeline', 'GAM / GYB / Google Workspace'],
  },
]

const toolGroups = [
  { label: 'Networking', tools: ['Fortigate', 'Cisco', 'Juniper', 'BGP', 'OSPF', 'CWDM', 'DWDM', 'Dark Fibre', 'VLANs', 'LACP', 'Wireshark', 'tcpdump'] },
  { label: 'Virtualisation', tools: ['Proxmox VE', 'Hyper-V', 'VMware ESXi', 'KVM', 'LXC', 'Windows Server', 'Active Directory'] },
  { label: 'Storage', tools: ['TrueNAS SCALE', 'TrueNAS CORE', 'ZFS', 'iSCSI', 'NFS', 'SMB', 'Ceph', 'RAIDZ2'] },
  { label: 'Containers & DevOps', tools: ['Docker', 'Portainer', 'Docker Compose', 'Nginx', 'Traefik', 'Git', 'GitHub Actions'] },
  { label: 'AI & Open Source', tools: ['Ollama', 'vLLM', 'LLaMA', 'Mistral', 'Open WebUI', 'Netdata', 'Grafana', 'InfluxDB'] },
  { label: 'VFX & Studio', tools: ['AYON', 'NIM Studio', 'RMM', 'SolarWinds', 'PRTG', 'Google Workspace', 'GAM', 'GYB'] },
]

const certifications = [
  { name: 'AWS Certified Solutions Architect', level: 'Associate (SAA-C03)', issuer: 'Amazon Web Services', icon: '☁️' },
  { name: 'Bachelor of Information Technology', level: 'Network & System Computing', issuer: 'Victoria University · Melbourne', icon: '🎓' },
]

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">Technical skills</p>
          <h2 className="section-title">What I work with</h2>
        </motion.div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="card flex items-center gap-4"
            >
              <div className="text-4xl">{cert.icon}</div>
              <div>
                <p className="font-semibold text-ink text-sm">{cert.name}</p>
                <p className="text-ink-2 text-sm">{cert.level}</p>
                <p className="text-muted text-xs mt-0.5">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIdx * 0.1 }}
              className="card"
            >
              <h3 className="font-semibold text-ink text-sm mb-4 pb-3 border-b border-border">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool groups */}
        <div className="space-y-0">
          {toolGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.06 }}
              className="flex flex-wrap items-center gap-3 py-3.5 border-b border-border last:border-0"
            >
              <span className="text-xs font-semibold text-ink-2 min-w-[130px]">{group.label}</span>
              {group.tools.map((tool) => (
                <span key={tool} className="text-xs text-ink-2 bg-surface-alt px-2.5 py-1 rounded-md">
                  {tool}
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
