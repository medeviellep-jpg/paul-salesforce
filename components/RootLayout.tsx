'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

const FULL_SCREEN_ROUTES = ['/intelligence']

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const fullScreen = FULL_SCREEN_ROUTES.some(r => pathname.startsWith(r))

  if (fullScreen) {
    return <div className="h-screen">{children}</div>
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
