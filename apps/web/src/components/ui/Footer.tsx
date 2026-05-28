import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate py-14">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-lg mb-1">Sagar Kandel</p>
            <p className="text-white/40 text-sm">Network &amp; Systems Engineer · Sydney, Australia</p>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/SagarKandel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/sagar-kandel4742"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:sagar@sagarkandel.com"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Sagar Kandel · sagarkandel.com
          </p>
        </div>
      </div>
    </footer>
  )
}
