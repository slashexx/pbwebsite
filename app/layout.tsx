
import './css/style.css'
import { Inter } from 'next/font/google'
import Header from '@/components/ui/header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

config.autoAddCss = false

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  title: 'Point Blank',
  description: 'Hello World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-black text-white tracking-tight`}>
        <NextThemesProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            {children}
          </div>
        </NextThemesProvider>
      </body>
    </html>
  )
}
