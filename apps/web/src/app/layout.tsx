import type { Metadata } from 'next'
import { JetBrains_Mono, Orbitron, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sagar Kandel — Network & Systems Engineer',
  description:
    'AWS Certified Solutions Architect | Network & Systems Engineer at Blockhead VFX | Based in Australia. Specializing in cloud infrastructure, network security, and systems administration.',
  keywords: [
    'Sagar Kandel', 'Network Engineer', 'Systems Engineer', 'AWS', 'Cloud', 'Australia',
    'Blockhead VFX', 'Network Security', 'DevOps', 'Python', 'Infrastructure',
  ],
  authors: [{ name: 'Sagar Kandel' }],
  creator: 'Sagar Kandel',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://sagarkandel.com',
    title: 'Sagar Kandel — Network & Systems Engineer',
    description: 'AWS Certified Solutions Architect | Network & Systems Engineer at Blockhead VFX',
    siteName: 'Sagar Kandel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Kandel — Network & Systems Engineer',
    description: 'AWS Certified Solutions Architect | Network & Systems Engineer at Blockhead VFX',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  metadataBase: new URL('https://sagarkandel.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${orbitron.variable} ${inter.variable} bg-terminal-bg text-terminal-text font-mono antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: '#041209',
              border: '1px solid #0d3320',
              color: '#00ff7f',
              fontFamily: 'var(--font-jetbrains)',
            },
          }}
        />
      </body>
    </html>
  )
}
