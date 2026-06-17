import { Github, Linkedin, Mail } from 'lucide-react'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[rgba(0,0,0,0.07)]">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <p className="font-semibold text-text text-[15px] mb-1">Sagar Kandel</p>
            <p className="text-sm text-muted">Network & Systems Engineer · Sydney, AU</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                className="text-sm text-muted hover:text-text transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a href="https://github.com/SagarKandel" target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className="text-muted hover:text-text transition-colors">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/sagar-kandel4742" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn" className="text-muted hover:text-text transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="mailto:sagar@sagarkandel.com" aria-label="Email"
              className="text-muted hover:text-text transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="divider mt-8 pt-6">
          <p className="text-xs text-muted text-center">
            © {new Date().getFullYear()} Sagar Kandel · sagarkandel.com
          </p>
        </div>
      </div>
    </footer>
  )
}
