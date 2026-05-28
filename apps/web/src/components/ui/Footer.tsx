import { Github, Linkedin, Mail, MapPin, Activity } from 'lucide-react'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="section-container py-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* Animated bar logo */}
              <div className="flex items-end gap-0.5 h-5">
                {[3, 5, 4, 5, 3].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 bg-cyan rounded-sm animate-pulse"
                    style={{
                      height: `${h * 3}px`,
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '1.8s',
                    }}
                  />
                ))}
              </div>
              <span className="font-mono font-bold text-text tracking-widest text-sm">SAGAR.KANDEL</span>
            </div>
            <p className="text-muted text-xs font-mono">Network &amp; Systems Engineer · Sydney, AU</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-muted">
              <MapPin size={11} className="text-cyan" />
              <span>Sydney, Australia · AEST (UTC+10/11)</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono text-muted hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SagarKandel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-cyan transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/sagar-kandel4742"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-cyan transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:sagar@sagarkandel.com"
              className="text-muted hover:text-cyan transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-mono text-muted">
              © {new Date().getFullYear()} Sagar Kandel · sagarkandel.com
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <Activity size={11} className="text-green animate-pulse" />
              <span>All systems operational</span>
              <span className="text-border">·</span>
              <span className="text-cyan">uptime: 99.9%</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
