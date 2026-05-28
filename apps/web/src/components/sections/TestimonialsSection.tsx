'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Placeholder — Add Your Testimonials',
    role: 'Colleague / Manager',
    company: 'Company Name',
    content: 'This is a placeholder testimonial. Ask your colleagues, managers, or clients for a short quote about working with you. Strong testimonials highlight specific achievements and your work style.',
    initials: 'PL',
  },
  {
    name: 'Another Testimonial',
    role: 'Senior Engineer',
    company: 'Blockhead VFX',
    content: 'Add a quote from a senior colleague here. Testimonials from peers in the industry carry strong credibility for technical roles.',
    initials: 'AT',
  },
  {
    name: 'Client / Stakeholder',
    role: 'IT Manager',
    company: 'Partner Company',
    content: 'A quote from a stakeholder or client about project delivery, communication skills, or technical expertise can be very powerful here.',
    initials: 'CS',
  },
]

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">What people say</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="card flex flex-col"
            >
              <Quote className="text-accent opacity-20 mb-4" size={28} />
              <p className="text-ink-2 text-sm leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-accent">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-muted text-xs mt-8"
        >
          Replace placeholders with real testimonials from LinkedIn or colleagues
        </motion.p>
      </div>
    </section>
  )
}
