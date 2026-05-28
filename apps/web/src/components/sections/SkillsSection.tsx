'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    title: 'Network Engineering',
    cmd: 'show interfaces status',
    color: 'text-cyan',
    borderColor: 'border-cyan/30',
    skills: [
      { name: '100 GbE Switching & Routing',     level: 95 },
      { name: 'BGP / OSPF / Advanced Routing',   level: 92 },
      { name: 'Dark Fibre / CWDM / DWDM',        level: 88 },
      { name: 'Fortigate Firewall (Design & HA)', level: 90 },
      { name: 'ISP / Cross-Connect / DCC',        level: 86 },
      { name: 'L2 Provider & Leased Lines',       level: 87 },
    ],
  },
  {
    title: 'Systems & Virtualisation',
    cmd: 'show platform resources',
    color: 'text-purple',
    borderColor: 'border-purple/30',
    skills: [
      { name: 'Proxmox VE (Clustering & HA)',    level: 90 },
      { name: 'Linux Administration',             level: 92 },
      { name: 'TrueNAS / ZFS / OMV',             level: 88 },
      { name: 'Hyper-V / Windows Server',         level: 82 },
      { name: 'Docker / Portainer',               level: 90 },
      { name: 'Windows Storage Spaces',           level: 78 },
    ],
  },
  {
    title: 'Cloud, AI & Automation',
    cmd: 'show cloud-services health',
    color: 'text-amber',
    borderColor: 'border-amber/30',
    skills: [
      { name: 'AWS (SAA-C03 Certified)',         level: 82 },
      { name: 'Ollama / vLLM Self-Hosted AI',    level: 85 },
      { name: 'RMM & Software Deployment',        level: 88 },
      { name: 'Python / Bash Scripting',          level: 78 },
      { name: 'AYON / NIM Studio Pipeline',       level: 85 },
      { name: 'GAM / GYB / Google Workspace',    level: 80 },
    ],
  },
]

const toolGroups = [
  { label: 'Networking',          tools: ['Fortigate','Cisco','Juniper','BGP','OSPF','CWDM','DWDM','Dark Fibre','VLANs','LACP','SFP+','QSFP28','Wireshark','tcpdump'] },
  { label: 'Virtualisation',      tools: ['Proxmox VE','Hyper-V','VMware ESXi','KVM','LXC','Windows Server 2022','Active Directory','WSUS'] },
  { label: 'Storage',             tools: ['TrueNAS SCALE','TrueNAS CORE','OpenMediaVault','ZFS','iSCSI','NFS','SMB','Ceph','RAIDZ2','S3'] },
  { label: 'Containers & DevOps', tools: ['Docker','Portainer','Docker Compose','Nginx','Traefik','Git','GitHub Actions','CI/CD'] },
  { label: 'AI & Open Source',    tools: ['Ollama','vLLM','LLaMA 3','Mistral','Open WebUI','Stable Diffusion','Netdata','Grafana','InfluxDB'] },
  { label: 'VFX & Studio',        tools: ['AYON','NIM Studio','RMM','SolarWinds','PRTG','Nagios','Slack','Teams','Google Workspace','GAM','GYB'] },
]

const certs = [
  { icon: '☁️', name: 'AWS Certified Solutions Architect', level: 'Associate · SAA-C03', issuer: 'Amazon Web Services' },
  { icon: '🎓', name: 'Bachelor of Information Technology', level: 'Network & System Computing', issuer: 'Victoria University · Melbourne' },
]

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="skills" className="py-24 bg-surface net-grid">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ show tech-stack --all</p>
          <h2 className="section-title">Technical Stack</h2>
        </motion.div>

        {/* Certifications */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="terminal-chrome flex items-center gap-4 p-5"
            >
              <div className="text-4xl">{c.icon}</div>
              <div>
                <p className="font-semibold text-text text-sm">{c.name}</p>
                <p className="text-text-2 text-sm font-mono">{c.level}</p>
                <p className="text-muted text-xs mt-0.5">{c.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill categories with animated bars */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.1 }}
              className={`terminal-chrome border ${cat.borderColor}`}
            >
              <div className="terminal-chrome-bar">
                <span className="font-mono text-xs text-muted">{cat.cmd}</span>
              </div>
              <div className="p-5 space-y-4">
                <h3 className={`font-mono text-xs tracking-widest uppercase mb-4 ${cat.color}`}>
                  {cat.title}
                </h3>
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-text-2">{skill.name}</span>
                      <span className={`text-xs font-mono ${cat.color}`}>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.1, delay: 0.4 + ci * 0.1 + si * 0.06, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          cat.color === 'text-cyan' ? 'bg-cyan' :
                          cat.color === 'text-purple' ? 'bg-purple' : 'bg-amber'
                        }`}
                        style={{ boxShadow: cat.color === 'text-cyan'
                          ? '0 0 8px rgba(0,212,255,0.5)'
                          : cat.color === 'text-purple'
                          ? '0 0 8px rgba(139,92,246,0.5)'
                          : '0 0 8px rgba(245,158,11,0.5)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tool groups */}
        <div className="terminal-chrome">
          <div className="terminal-chrome-bar">
            <span className="font-mono text-xs text-muted">show inventory --all-tools</span>
          </div>
          <div className="p-5 divide-y divide-border">
            {toolGroups.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="flex flex-wrap items-center gap-2.5 py-3 first:pt-0 last:pb-0"
              >
                <span className="text-xs font-mono text-cyan min-w-[140px]">
                  [{group.label}]
                </span>
                {group.tools.map(tool => (
                  <span key={tool}
                    className="text-xs font-mono px-2.5 py-1 border border-border text-muted rounded
                               hover:border-cyan/40 hover:text-cyan transition-all cursor-default">
                    {tool}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
