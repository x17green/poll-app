import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider, ThemeToggle } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Poll App - Create and Share Polls',
    template: '%s | Poll App'
  },
  description: 'Create engaging polls, collect votes, and analyze results with our modern polling platform. Build beautiful surveys with real-time analytics and seamless sharing.',
  keywords: ['polls', 'voting', 'surveys', 'feedback', 'analytics', 'real-time', 'interactive', 'data collection'],
  authors: [{ name: 'Poll App Team', url: 'https://poll-app.example.com' }],
  creator: 'Poll App Team',
  publisher: 'Poll App',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://poll-app.example.com'),
  alternates: {
    canonical: 'https://poll-app.example.com',
  },
  openGraph: {
    title: 'Poll App - Create and Share Polls',
    description: 'Create engaging polls, collect votes, and analyze results with our modern polling platform.',
    url: 'https://poll-app.example.com',
    siteName: 'Poll App',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Poll App - Create and Share Polls',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poll App - Create and Share Polls',
    description: 'Create engaging polls, collect votes, and analyze results with our modern polling platform.',
    creator: '@pollapp',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3B82F6' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Additional meta tags for better SEO and performance */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Poll App" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`
          ${inter.className}
          font-sans
          antialiased
          min-h-screen
          flex
          flex-col
          bg-background
          text-foreground
          selection:bg-primary/20
          selection:text-foreground
          scroll-smooth
          overflow-x-hidden
        `}
      >
        {/* Theme Provider with enhanced error boundary */}
        <AuthProvider>
          <ThemeProvider>
            {/* Skip to main content for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md transition-all duration-200"
            >
              Skip to main content
            </a>

            {/* Navigation with sticky positioning */}
            <Navigation />

            {/* Main content area with proper semantic structure */}
            <main
              id="main-content"
              className="flex-1 relative focus:outline-none"
              tabIndex={-1}
            >
              <div className="min-h-full">
                {children}
              </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Theme toggle button */}
            <ThemeToggle />

            {/* Scroll indicator for long pages */}
            <div
              className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 z-50 transition-all duration-300"
              style={{
                width: 'var(--scroll-progress, 0%)',
                transformOrigin: 'left',
              }}
            />
          </ThemeProvider>
        </AuthProvider>

        {/* Loading state for page transitions */}
        <div
          id="page-loading-indicator"
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center opacity-0 invisible transition-all duration-300"
          role="status"
          aria-label="Page loading"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>

        {/* Global error boundary fallback */}
        <div id="global-error-boundary" className="hidden" />

        {/* Performance monitoring script placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Scroll progress indicator
              function updateScrollProgress() {
                const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
                document.documentElement.style.setProperty('--scroll-progress', Math.min(100, Math.max(0, scrolled)) + '%');
              }

              // Throttled scroll handler
              let scrollTimeout;
              window.addEventListener('scroll', () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                  updateScrollProgress();
                  scrollTimeout = null;
                }, 16); // ~60fps
              }, { passive: true });

              // Initial calculation
              updateScrollProgress();

              // Handle page visibility changes for performance
              document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                  updateScrollProgress();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  )
}
