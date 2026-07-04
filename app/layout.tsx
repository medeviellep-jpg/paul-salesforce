import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AccessGate from './components/AccessGate'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Agentforce Deal Intelligence',
  description: 'Conversational AI over Salesforce Agentforce pipeline',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased h-screen font-sans">
        <AccessGate>{children}</AccessGate>
      </body>
    </html>
  )
}
