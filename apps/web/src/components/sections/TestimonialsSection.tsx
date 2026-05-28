'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Placeholder — Add Your Testimonials',
    role: 'Colleague / Manager',
    company: 'Company Name',
    content:
      'This is a placeholder testimonial. Ask your colleagues, managers, or clients for a short quote about working with you. Strong testimonials highlight specific achievements and your work style.',
    initials: 'PL',
  },
  {
    name: 'Another Testimonial',
    role: 'Senior Engineer',
    company: 'Blockhead VFX',
    content:
      'Add a quote from a senior colleague here. Testimonials from peers in the industry carry strong credibility for technical roles.',
    initials: 'AT',
  },
  {
    name: 'Client / Stakeholder',
    role: 'IT Manager',
    company: 'Partner Company',
    content:
      'A quote from a stakeholder or client about project delivery, communication skills, or technical expertise can be very powerful here.',
    initials: 'CS',
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-terminal-muted text-sm tracking-widest mb-2">
            <span className="text-terminal-green">05.</span> testimonials
          </p>
          <h2 className="section-title">WHAT PEOPLE SAY</h2>
          <div className="w-16 h-px bg-terminal-green mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="terminal-card flex flex-col"
            >
              <Quote className="text-terminal-green opacity-30 mb-4" size={32} />
              <p className="text-terminal-text/70 font-body text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-terminal-border">
                <div className="w-10 h-10 bg-terminal-green/10 border border-terminal-border flex items-center justify-center">
                  <span className="font-display text-xs text-terminal-green">{t.initials}</span>
                </div>
                <div>
                  <p className="text-terminal-green text-sm font-mono">{t.name}</p>
                  <p className="text-terminal-muted text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-terminal-muted text-xs font-mono mt-8"
        >
          <span className="text-terminal-green">// </span>
          Replace placeholder content with real testimonials from LinkedIn recommendations or colleagues
        </motion.p>
      </div>
    </section>
  )
}
