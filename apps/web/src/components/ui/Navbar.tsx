'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'testimonials', href: '#testimonials' },
  { label: 'blog', href: '#blog' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-terminal-bg/95 backdrop-blur-md border-b border-terminal-border'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <Terminal className="w-5 h-5 text-terminal-green group-hover:animate-spin transition-all" />
              <span className="font-display text-sm text-terminal-green text-glow tracking-widest">
                SK<span className="text-terminal-muted">.exe</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 border border-transparent
                    ${activeSection === href.slice(1)
                      ? 'text-terminal-green border-terminal-border bg-terminal-surface'
                      : 'text-terminal-muted hover:text-terminal-green'
                    }`}
                >
                  <span className="text-terminal-muted mr-1">/</span>{label}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="ml-4 btn-primary text-xs"
                onClick={() => {
                  fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})
                }}
              >
                resume
              </motion.a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-terminal-green p-2"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-terminal-bg/98 flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-xl text-terminal-green text-glow tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
            <a href="/resume.pdf" download className="btn-primary mt-4">
              resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
