import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JARVIS + TARS - AI Interface',
  description: 'Futuristic JARVIS + TARS fusion AI interface with holographic displays and quantum processing',
  keywords: 'AI, JARVIS, TARS, interface, futuristic, holographic, quantum',
  authors: [{ name: 'AI Interface Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 