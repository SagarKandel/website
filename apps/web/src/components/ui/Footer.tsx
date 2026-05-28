export default function Footer() {
  return (
    <footer className="border-t border-terminal-border py-8">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-terminal-muted text-xs font-mono">
            <span className="text-terminal-green">©</span> {new Date().getFullYear()} Sagar Kandel — 
            Designed & built with Next.js + TypeScript
          </p>
          <p className="text-terminal-muted text-xs font-mono">
            <span className="text-terminal-green">sagarkandel.com</span> · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
