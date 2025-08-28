'use client'

import React from 'react'
import { Sun, Moon } from '@/components/ui/icons'
import { useTheme } from '@/contexts/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)

  const handleToggle = () => {
    if (isAnimating) return
    setIsAnimating(true)
    toggleTheme()

    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Main toggle button */}
      <button
        onClick={handleToggle}
        disabled={isAnimating}
        className="group relative block"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {/* Button container with glass effect */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer overflow-hidden">

          {/* Background glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Rotating background on theme switch */}
          <div className={`absolute inset-0 rounded-full transition-transform duration-700 ${isAnimating ? 'animate-spin' : ''}`}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/10 via-yellow-300/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Icon container */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Light mode icon (Sun) - shows in dark theme */}
            <div className={`absolute transition-all duration-500 transform ${
              theme === 'dark'
                ? 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 rotate-180 scale-0'
            }`}>
              <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 drop-shadow-lg" />
              {/* Sun rays animation */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                <div className="absolute top-0 left-1/2 w-px h-2 bg-yellow-400/40 transform -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-px h-2 bg-yellow-400/40 transform -translate-x-1/2" />
                <div className="absolute left-0 top-1/2 h-px w-2 bg-yellow-400/40 transform -translate-y-1/2" />
                <div className="absolute right-0 top-1/2 h-px w-2 bg-yellow-400/40 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Dark mode icon (Moon) - shows in light theme */}
            <div className={`absolute transition-all duration-500 transform ${
              theme === 'light'
                ? 'opacity-100 rotate-0 scale-100'
                : 'opacity-0 -rotate-180 scale-0'
            }`}>
              <Moon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 dark:text-blue-300 drop-shadow-lg" />
              {/* Moon glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md animate-pulse" />
            </div>
          </div>

          {/* Ripple effect on click */}
          <div className={`absolute inset-0 rounded-full bg-white/20 transition-transform duration-300 ${
            isAnimating ? 'scale-100' : 'scale-0'
          } group-active:scale-100`} />

          {/* Border highlight on hover */}
          <div className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-br from-blue-400/50 via-purple-500/50 to-pink-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.3) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(236, 72, 153, 0.3) 75%, transparent 100%)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px'
            }}
          />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900/90 dark:bg-gray-100/90 text-white dark:text-gray-900 text-sm px-3 py-1.5 rounded-lg whitespace-nowrap backdrop-blur-sm font-medium">
            {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90 dark:border-t-gray-100/90" />
          </div>
        </div>

        {/* Keyboard focus indicator */}
        <div className="absolute inset-0 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent opacity-0 focus-visible:opacity-100 transition-opacity duration-200" />
      </button>

      {/* Theme transition overlay */}
      <div className={`fixed inset-0 bg-white dark:bg-gray-900 pointer-events-none transition-opacity duration-300 ${
        isAnimating ? 'opacity-20' : 'opacity-0'
      }`} />
    </div>
  )
}
