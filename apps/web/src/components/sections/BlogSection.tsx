'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Clock } from 'lucide-react'

// Replace with real posts or fetch from a CMS like Hashnode, Dev.to, or your own blog
const posts = [
  {
    title: 'Building Zero-Trust Networks in VFX Environments',
    excerpt:
      'How we implemented identity-aware network segmentation in a high-throughput VFX studio environment without disrupting creative workflows.',
    date: 'Jun 2024',
    readTime: '8 min',
    tags: ['Networking', 'Security', 'ZeroTrust'],
    href: '#',
  },
  {
    title: 'AWS VPC Design Patterns for Media Workloads',
    excerpt:
      'Key architectural decisions when building AWS VPCs for render farm workloads — multi-AZ, placement groups, and enhanced networking.',
    date: 'Apr 2024',
    readTime: '6 min',
    tags: ['AWS', 'Cloud', 'Architecture'],
    href: '#',
  },
  {
    title: 'Python for Network Engineers: Real-World Automation',
    excerpt:
      'Moving beyond basic scripts — using Netmiko, NAPALM, and Ansible to build production-grade network automation pipelines.',
    date: 'Feb 2024',
    readTime: '10 min',
    tags: ['Python', 'Automation', 'Networking'],
    href: '#',
  },
]

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="blog" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <p className="text-terminal-muted text-sm tracking-widest mb-2">
              <span className="text-terminal-green">06.</span> blog
            </p>
            <h2 className="section-title">THOUGHTS</h2>
            <div className="w-16 h-px bg-terminal-green mt-3" />
          </div>
          <a
            href="https://hashnode.com/@SagarKandel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-xs flex items-center gap-2"
          >
            all posts <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="terminal-card group flex flex-col cursor-pointer"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-terminal-muted border border-terminal-border px-2 py-0.5">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-mono text-sm text-terminal-green mb-3 flex-1 group-hover:text-glow transition-all leading-relaxed">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-terminal-text/60 text-xs font-body leading-relaxed mb-4">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-terminal-border">
                <span className="text-terminal-muted text-xs font-mono">{post.date}</span>
                <div className="flex items-center gap-1 text-terminal-muted text-xs">
                  <Clock size={12} />
                  {post.readTime}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-terminal-muted text-xs font-mono mt-8"
        >
          <span className="text-terminal-green">// </span>
          Connect Hashnode, Dev.to, or Medium RSS to populate real posts automatically
        </motion.p>
      </div>
    </section>
  )
}
