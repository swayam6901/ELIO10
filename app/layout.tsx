import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ELI10 - Explain Like I'm 10",
  description: 'Get explanations for any concept at your preferred level of understanding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Puter.js SDK add kar diya */}
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body
        className={`${inter.className} bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
