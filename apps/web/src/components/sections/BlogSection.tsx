'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Clock, ExternalLink } from 'lucide-react'

const posts = [
  {
    title: 'Building Zero-Trust Networks in VFX Environments',
    excerpt: 'How we implemented identity-aware network segmentation in a high-throughput VFX studio without disrupting creative workflows or render farm throughput.',
    date: 'Jun 2024',
    readTime: '8 min',
    tags: ['Networking', 'Security', 'ZeroTrust'],
    tagColor: 'text-cyan bg-cyan/10 border-cyan/20',
    href: '#',
  },
  {
    title: 'AWS VPC Design Patterns for Media Workloads',
    excerpt: 'Key architectural decisions when building AWS VPCs for render farm workloads — multi-AZ placement groups, enhanced networking, and cost optimisation.',
    date: 'Apr 2024',
    readTime: '6 min',
    tags: ['AWS', 'Cloud', 'Architecture'],
    tagColor: 'text-amber bg-amber/10 border-amber/20',
    href: '#',
  },
  {
    title: 'Self-Hosted LLM Inference on Bare Metal GPU Nodes',
    excerpt: 'Running Ollama and vLLM on local GPU hardware for internal AI tooling — cutting external API costs and keeping sensitive data fully on-premises.',
    date: 'Feb 2024',
    readTime: '10 min',
    tags: ['AI', 'Self-Hosted', 'GPU'],
    tagColor: 'text-purple bg-purple/10 border-purple/20',
    href: '#',
  },
]

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 })

  return (
    <section id="blog" className="py-24 bg-bg">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-14"
        >
          <div>
            <p className="section-label">$ tail -f /var/log/thoughts</p>
            <h2 className="section-title">Technical Writing</h2>
          </div>
          <a
            href="https://hashnode.com/@SagarKandel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan border border-cyan/30 rounded-lg px-4 py-2 hover:bg-cyan/5 transition-all"
          >
            All posts <ExternalLink size={12} />
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
              className="terminal-chrome flex flex-col group hover:border-border-bright transition-all cursor-pointer"
            >
              {/* Chrome bar */}
              <div className="terminal-chrome-bar">
                <span className="font-mono text-xs text-muted truncate">{post.title.split(' ').slice(0, 4).join('-').toLowerCase()}.md</span>
                <span className="ml-auto flex items-center gap-1 text-xs font-mono text-muted flex-shrink-0">
                  <Clock size={10} />
                  {post.readTime}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${post.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-text text-sm mb-3 flex-1 leading-relaxed group-hover:text-cyan transition-colors">
                  {post.title}
                </h3>

                <p className="text-text-2 text-xs leading-relaxed mb-4">{post.excerpt}</p>

                <div className="link-bar" />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-muted text-xs font-mono">{post.date}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                    read post <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
