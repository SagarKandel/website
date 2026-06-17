import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400','500','600','700','800'] })

export const metadata: Metadata = {
  title: 'Sagar Kandel — Network & Systems Engineer',
  description:
    'AWS Certified Solutions Architect | Senior Network & Systems Engineer at Blockhead VFX, Sydney. 100G networking, dark fibre, BGP, Proxmox, self-hosted AI.',
  keywords: ['Sagar Kandel','Network Engineer','Systems Engineer','AWS','BGP','Fortigate','Proxmox','Dark Fibre','Australia','Blockhead VFX'],
  authors: [{ name: 'Sagar Kandel' }],
  creator: 'Sagar Kandel',
  openGraph: {
    type: 'website', locale: 'en_AU', url: 'https://sagarkandel.com',
    title: 'Sagar Kandel — Network & Systems Engineer',
    description: 'AWS Certified Solutions Architect | Network & Systems Engineer at Blockhead VFX',
    siteName: 'Sagar Kandel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sagar Kandel — Network & Systems Engineer',
    description: 'AWS Certified | Network & Systems Engineer at Blockhead VFX',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  metadataBase: new URL('https://sagarkandel.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-bg text-text`}>
        {children}
        <Toaster
          toastOptions={{
            style: { background: '#fff', border: '1px solid rgba(0,0,0,0.1)', color: '#1d1d1f', fontFamily: 'var(--font-inter)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
          }}
        />
      </body>
    </html>
  )
}
