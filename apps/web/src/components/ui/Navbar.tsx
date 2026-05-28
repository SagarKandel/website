'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="flex items-end gap-0.5">
                {[0,1,2].map(i => (
                  <span
                    key={i}
                    className="w-0.5 bg-cyan rounded-sm transition-all duration-300 group-hover:bg-cyan"
                    style={{ height: `${8 + i * 4}px` }}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-text font-semibold tracking-wider group-hover:text-cyan transition-colors">
                SAGAR<span className="text-cyan">.</span>KANDEL
              </span>
            </a>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-0.5">
              {links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="px-4 py-2 text-sm text-text-2 hover:text-cyan font-mono tracking-wide transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                onClick={() => fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/resume-download`, { method: 'POST' }).catch(() => {})}
                className="ml-4 btn-cyan py-2 text-xs tracking-wider"
              >
                Resume ↓
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-text-2 hover:text-cyan transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg net-grid flex flex-col items-center justify-center gap-6"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-5 text-text-2 hover:text-cyan">
              <X size={24} />
            </button>
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="font-mono text-2xl text-text hover:text-cyan transition-colors tracking-widest"
              >
                {label}
              </a>
            ))}
            <a href="/resume.pdf" download className="mt-2 btn-cyan">Resume ↓</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
