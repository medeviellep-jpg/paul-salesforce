import type { Metadata } from 'next'
import './globals.css'
import AccessGate from './components/AccessGate'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Agentforce Portfolio',
  description: 'Meeting Managers — Portfolio Agentforce',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased h-screen">
        <AccessGate>{children}</AccessGate>
        <Analytics />
      </body>
    </html>
  )
}
