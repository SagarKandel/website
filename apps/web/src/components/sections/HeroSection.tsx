'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center bg-bg pt-16">
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-24">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-ink-2 font-medium">Available for opportunities</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-ink leading-[1.05] tracking-tight mb-5">
              Hi, I&apos;m<br />
              <span className="text-accent">Sagar</span> Kandel
            </h1>

            <p className="text-xl text-ink-2 font-medium mb-4">
              Network &amp; Systems Engineer
            </p>

            <p className="text-ink-2 leading-relaxed max-w-lg mb-8">
              5+ years building enterprise-grade infrastructure for VFX production at{' '}
              <span className="font-medium text-ink">Blockhead VFX</span> in Sydney. I work at the
              intersection of high-speed networking, hypervisor clusters, and self-hosted AI — the
              infrastructure that keeps creative studios running without a frame dropped.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#contact" className="btn-primary">
                Get in touch <ArrowRight size={16} />
              </a>
              <a href="#experience" className="btn-ghost">
                View my work
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://github.com/SagarKandel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/sagar-kandel4742"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:sagar@sagarkandel.com"
                className="text-muted hover:text-ink transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={14} />
                Sydney, Australia
              </span>
            </div>
          </motion.div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-accent-light border-2 border-accent/20 flex items-center justify-center overflow-hidden">
                {/* Replace this with <Image src="/photo.jpg" ... /> when ready */}
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold text-accent">SK</span>
                  </div>
                  <p className="text-sm text-accent/50 font-medium">Add your photo here</p>
                </div>
              </div>
              <div className="absolute -inset-3 rounded-3xl border border-accent/10 -z-10" />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-border px-4 py-3"
              >
                <p className="text-xs text-muted font-medium">AWS Certified</p>
                <p className="text-sm font-semibold text-ink">Solutions Architect</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-border px-4 py-3"
              >
                <p className="text-xs text-muted font-medium">Based in</p>
                <p className="text-sm font-semibold text-ink">Sydney 🇦🇺</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
