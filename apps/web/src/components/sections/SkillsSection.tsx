'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-ead1.up.railway.app'

type Skill = { id: string; name: string; category: string; level: number; order: number }

const categoryStyle: Record<string, { color: string; bg: string; icon: string }> = {
  'Network Engineering':       { color: '#0066cc', bg: '#e8f0fb', icon: '⬡' },
  'Systems & Virtualisation':  { color: '#6b21a8', bg: '#f3e8ff', icon: '⬢' },
  'Cloud, AI & Automation':    { color: '#b45309', bg: '#fef3c7', icon: '☁' },
  'Security':                  { color: '#dc2626', bg: '#fee2e2', icon: '🔒' },
  'DevOps':                    { color: '#1a7a4a', bg: '#d1fae5', icon: '⚙' },
}

const fallbackStyle = { color: '#6e6e73', bg: '#f5f5f7', icon: '●' }

const staticSkills: Skill[] = [
  { id: 's01', category: 'Network Engineering', name: '100 GbE Switching & Routing', level: 95, order: 0 },
  { id: 's02', category: 'Network Engineering', name: 'BGP / OSPF / Advanced Routing', level: 92, order: 1 },
  { id: 's03', category: 'Network Engineering', name: 'Dark Fibre / CWDM / DWDM', level: 88, order: 2 },
  { id: 's04', category: 'Network Engineering', name: 'Fortigate Firewall (Design & HA)', level: 90, order: 3 },
  { id: 's05', category: 'Network Engineering', name: 'ISP / Cross-Connect / DCC', level: 86, order: 4 },
  { id: 's06', category: 'Network Engineering', name: 'VPN — IPsec / SSL', level: 88, order: 5 },
  { id: 's07', category: 'Systems & Virtualisation', name: 'Proxmox VE (Clustering & HA)', level: 90, order: 0 },
  { id: 's08', category: 'Systems & Virtualisation', name: 'Linux Administration', level: 92, order: 1 },
  { id: 's09', category: 'Systems & Virtualisation', name: 'TrueNAS / ZFS / OMV', level: 88, order: 2 },
  { id: 's10', category: 'Systems & Virtualisation', name: 'Hyper-V / Windows Server', level: 82, order: 3 },
  { id: 's11', category: 'Systems & Virtualisation', name: 'Docker / Portainer', level: 90, order: 4 },
  { id: 's12', category: 'Systems & Virtualisation', name: 'Ceph Distributed Storage', level: 82, order: 5 },
  { id: 's13', category: 'Cloud, AI & Automation', name: 'AWS (SAA-C03 Certified)', level: 82, order: 0 },
  { id: 's14', category: 'Cloud, AI & Automation', name: 'Ollama / vLLM Self-Hosted AI', level: 85, order: 1 },
  { id: 's15', category: 'Cloud, AI & Automation', name: 'RMM & Software Deployment', level: 88, order: 2 },
  { id: 's16', category: 'Cloud, AI & Automation', name: 'Python / Bash Scripting', level: 78, order: 3 },
  { id: 's17', category: 'Cloud, AI & Automation', name: 'AYON / NIM Pipeline', level: 85, order: 4 },
  { id: 's18', category: 'Cloud, AI & Automation', name: 'Google Workspace / GAM', level: 80, order: 5 },
]

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const [skills, setSkills] = useState<Skill[]>(staticSkills)

  useEffect(() => {
    fetch(`${API}/content/skills`)
      .then(r => r.json())
      .then((data: Skill[]) => {
        if (Array.isArray(data) && data.length > 0) setSkills(data)
      })
      .catch(() => {})
  }, [])

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, sk) => {
    if (!acc[sk.category]) acc[sk.category] = []
    acc[sk.category].push(sk)
    return acc
  }, {})

  const categories = Object.entries(grouped).map(([title, items]) => ({
    title,
    items: items.sort((a, b) => a.order - b.order),
    style: categoryStyle[title] || fallbackStyle,
  }))

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
                style={{ background: cat.style.bg }}>
                <span style={{ color: cat.style.color, fontWeight: 700, fontSize: '14px' }}>{cat.style.icon}</span>
              </div>
              <h3 className="font-semibold text-text mb-5 text-[15px]">{cat.title}</h3>
              <div className="space-y-4">
                {cat.items.map((sk, i) => (
                  <div key={sk.id}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[13px] text-text-2">{sk.name}</span>
                      <span className="text-[12px] font-semibold" style={{ color: cat.style.color }}>{sk.level}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        style={{ background: `linear-gradient(90deg, ${cat.style.color}, ${cat.style.color}cc)` }}
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

      </div>
    </section>
  )
}
