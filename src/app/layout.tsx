import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NHCAM - Direction Artistique & Production Vidéo',
  description: 'Direction artistique et production vidéo professionnelle. Création d\'univers visuels authentiques et narratifs contemporains à Paris.',
  keywords: 'direction artistique, production vidéo, cinéma, portrait, événementiel, Paris, NHCAM',
  authors: [{ name: 'NHCAM' }],
  creator: 'NHCAM',
  publisher: 'NHCAM',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nhcam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NHCAM - Direction Artistique & Production Vidéo',
    description: 'Direction artistique et production vidéo professionnelle. Création d\'univers visuels authentiques et narratifs contemporains.',
    url: 'https://nhcam.com',
    siteName: 'NHCAM',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NHCAM - Direction Artistique & Production Vidéo',
    description: 'Direction artistique et production vidéo professionnelle.',
    creator: '@nhcam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification-code-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 