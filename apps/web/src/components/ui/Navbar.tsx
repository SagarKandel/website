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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-[rgba(0,0,0,0.08)]' : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="text-[15px] font-semibold text-text tracking-tight hover:opacity-60 transition-opacity">
              Sagar Kandel
            </a>

            <div className="hidden md:flex items-center gap-0.5">
              {links.map(({ label, href }) => (
                <a key={label} href={href}
                  className="px-4 py-1.5 text-[14px] text-text-2 hover:text-text rounded-full transition-colors hover:bg-black/[0.04]">
                  {label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#contact" className="btn-primary py-2 px-5 text-[13px]">Get in touch</a>
            </div>

            <button onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-xl hover:bg-black/[0.05] transition-colors text-text">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-[rgba(0,0,0,0.08)] md:hidden"
          >
            <div className="section-container py-3 flex flex-col gap-0.5">
              {links.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm text-text-2 hover:text-text rounded-xl hover:bg-black/[0.04] transition-colors">
                  {label}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
