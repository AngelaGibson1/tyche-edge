import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/navigation.js'  // ← No .js extension needed

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tyche-Edge - Data-Driven Sports Betting Platform',
  description: 'Your premier destination for data-driven sports betting insights, community predictions, and professional analytics.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}