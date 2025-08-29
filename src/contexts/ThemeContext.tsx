'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ThemeMode,
  getSystemTheme,
  applyTheme,
  cn,
  shadowStyles,
  glassStyles
} from '@/lib/theme'

// Theme Context Types
export type Theme = ThemeMode

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDark: boolean
  isLight: boolean
  systemTheme: 'light' | 'dark'
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * ThemeProvider Component
 *
 * Provides theme context and functionality to the entire application
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme())

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('poll-app-theme') as Theme
    const currentSystemTheme = getSystemTheme()
    setSystemTheme(currentSystemTheme)
    const initialTheme = savedTheme || currentSystemTheme
    setTheme(initialTheme)
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light'
      setSystemTheme(newSystemTheme)
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    // Legacy browsers
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
    localStorage.setItem('poll-app-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  // Derive additional properties
  const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')
  const isLight = !isDark

  const value = {
    theme,
    toggleTheme,
    setTheme,
    isDark,
    isLight,
    systemTheme,
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="opacity-0">{children}</div>
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme Hook
 *
 * Custom hook to access the theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return a fallback for SSR and cases where provider is missing
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      isDark: true,
      isLight: false,
      systemTheme: 'dark',
    }
  }
  return context
}

/**
 * ThemeToggle Component
 *
 * A button to toggle between light and dark themes
 */
interface ThemeToggleProps {
  variant?: 'default' | 'outline' | 'ghost' | 'glass' | 'floating' | 'minimal'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showLabel?: boolean
  position?: 'fixed' | 'static' | 'absolute' | 'relative'
  showThemeIndicator?: boolean
}

export function ThemeToggle({
  variant = 'floating',
  size = 'md',
  className,
  showLabel = false,
  position = 'fixed',
  showThemeIndicator = false
}: ThemeToggleProps) {
  const { theme, toggleTheme, isDark, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the toggle after hydration to avoid SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Different size classes
  const sizeClasses = {
    xs: 'h-7 w-7 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-14 w-14 text-xl',
  }

  // Different variant classes
  const variantClasses = {
    default: 'bg-background border-border',
    outline: 'bg-transparent border border-border',
    ghost: 'bg-transparent border-transparent hover:bg-muted',
    glass: cn(glassStyles.all, 'hover:bg-white/20 dark:hover:bg-white/10'),
    minimal: 'bg-transparent border-transparent hover:bg-muted/20',
    floating: cn(
      position === 'fixed' ? 'fixed bottom-4 right-4 z-50' : '',
      'rounded-full',
      shadowStyles.lg,
      'border border-border/50 bg-background/80 backdrop-blur-md',
      'hover:' + shadowStyles.xl + ' hover:scale-105 transition-all duration-300'
    ),
  }

  const buttonClass = cn(
    'flex items-center justify-center',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={buttonClass}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun icon */}
        <Sun
          className={cn(
            "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          )}
        />

        {/* Moon icon */}
        <Moon
          className={cn(
            "h-[1.2rem] w-[1.2rem] absolute transition-all duration-300",
            !isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
          )}
        />

        {/* Theme indicator */}
        {showThemeIndicator && (
          <div className={cn(
            "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full",
            theme === 'system'
              ? systemTheme === 'dark'
                ? "bg-blue-400"
                : "bg-yellow-400"
              : theme === 'dark'
                ? "bg-blue-500"
                : "bg-yellow-500",
            "shadow-[0_0_4px_rgba(0,0,0,0.3)]"
          )} />
        )}
      </div>

      {showLabel && (
        <span className={cn(
          "ml-2 text-sm font-medium whitespace-nowrap",
          showLabel && size === 'sm' ? 'hidden sm:inline-block' : ''
        )}>
          {theme === 'system'
            ? `System (${systemTheme === 'dark' ? 'Dark' : 'Light'})`
            : theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
      {!showLabel && <span className="sr-only">Toggle theme</span>}
    </Button>
  )
}
