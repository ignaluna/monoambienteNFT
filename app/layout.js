import './globals.css'
import localFont from 'next/font/local'

const miFuente = localFont({
 src: '../public/fonts/Garet-Book.ttf',
 variable: '--font-mi-fuente',
})


export const metadata = {
  title: 'MithW3',
  description: 'MFT´S Mitología Griega',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={miFuente.className}>{children}</body>
    </html>
  )
}
