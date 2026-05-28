'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Add Your Testimonials',
    role: 'Colleague / Manager',
    company: 'Company Name',
    content: 'Ask colleagues, managers, or clients for a short quote about working with you. Strong testimonials highlight specific achievements and your reliability under pressure.',
    initials: 'PL',
    color: 'text-cyan',
    borderColor: 'border-cyan/20',
    bgColor: 'bg-cyan/5',
  },
  {
    name: 'Senior Peer Testimonial',
    role: 'Senior Network Engineer',
    company: 'Blockhead VFX',
    content: 'Add a quote from a senior colleague here. Peer testimonials carry strong credibility — especially those highlighting technical depth, incident response, and infrastructure ownership.',
    initials: 'SN',
    color: 'text-purple',
    borderColor: 'border-purple/20',
    bgColor: 'bg-purple/5',
  },
  {
    name: 'Stakeholder / Client',
    role: 'IT Director',
    company: 'Partner Studio',
    content: 'A quote from a stakeholder about project delivery, communication, and uptime commitments demonstrates business impact beyond pure technical skill.',
    initials: 'ST',
    color: 'text-amber',
    borderColor: 'border-amber/20',
    bgColor: 'bg-amber/5',
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.07 })

  return (
    <section id="testimonials" className="py-24 bg-surface net-grid">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">$ query peer-reviews --verified</p>
          <h2 className="section-title">Peer Reviews</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12 }}
              className={`terminal-chrome flex flex-col border ${t.borderColor}`}
            >
              {/* Chrome bar */}
              <div className="terminal-chrome-bar">
                <span className={`text-xs font-mono ${t.color}`}>peer-review-{String(i + 1).padStart(2, '0')}.log</span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <Quote className={`mb-3 flex-shrink-0 ${t.color} opacity-30`} size={22} />
                <p className="text-text-2 text-sm leading-relaxed flex-1 mb-5 font-mono">
                  <span className={`${t.color} opacity-60`}>// </span>
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className={`flex items-center gap-3 pt-4 border-t border-border`}>
                  <div className={`w-9 h-9 rounded-full ${t.bgColor} border ${t.borderColor} flex items-center justify-center flex-shrink-0`}>
                    <span className={`text-xs font-bold font-mono ${t.color}`}>{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className={`text-xs font-mono ${t.color} opacity-70`}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-xs font-mono text-muted">
            <span className="text-cyan">// </span>
            Replace with real testimonials from LinkedIn recommendations or direct colleagues
          </p>
        </motion.div>
      </div>
    </section>
  )
}
