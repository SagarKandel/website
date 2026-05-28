'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Clock } from 'lucide-react'

const posts = [
  {
    title: 'Building Zero-Trust Networks in VFX Environments',
    excerpt: 'How we implemented identity-aware network segmentation in a high-throughput VFX studio without disrupting creative workflows.',
    date: 'Jun 2024',
    readTime: '8 min',
    tags: ['Networking', 'Security', 'ZeroTrust'],
    href: '#',
  },
  {
    title: 'AWS VPC Design Patterns for Media Workloads',
    excerpt: 'Key architectural decisions when building AWS VPCs for render farm workloads — multi-AZ, placement groups, and enhanced networking.',
    date: 'Apr 2024',
    readTime: '6 min',
    tags: ['AWS', 'Cloud', 'Architecture'],
    href: '#',
  },
  {
    title: 'Python for Network Engineers: Real-World Automation',
    excerpt: 'Moving beyond basic scripts — using Netmiko, NAPALM, and Ansible to build production-grade network automation pipelines.',
    date: 'Feb 2024',
    readTime: '10 min',
    tags: ['Python', 'Automation', 'Networking'],
    href: '#',
  },
]

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="blog" className="py-24 bg-bg">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="section-label">Writing</p>
            <h2 className="section-title">Thoughts &amp; articles</h2>
          </div>
          <a
            href="https://hashnode.com/@SagarKandel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            All posts <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="card flex flex-col group hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-accent bg-accent-light px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-ink text-sm mb-3 flex-1 leading-relaxed group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed mb-5">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-muted text-xs">{post.date}</span>
                <span className="flex items-center gap-1 text-muted text-xs">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
