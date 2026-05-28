'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="font-bold text-ink text-lg tracking-tight hover:text-accent transition-colors">
              Sagar Kandel
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="px-4 py-2 text-sm text-ink-2 hover:text-ink font-medium transition-colors rounded-lg hover:bg-surface-alt"
                >
                  {label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() =>
                  fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})
                }
                className="ml-3 btn-primary py-2 text-sm"
              >
                Resume
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-ink-2 hover:text-ink rounded-lg hover:bg-surface-alt transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-4"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 text-ink-2 hover:text-ink"
            >
              <X size={24} />
            </button>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-ink hover:text-accent transition-colors"
              >
                {label}
              </a>
            ))}
            <a href="/resume.pdf" download className="mt-4 btn-primary">
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
