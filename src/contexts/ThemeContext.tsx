'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ThemeMode,
  getSystemTheme,
  applyTheme,
  cn
} from '@/lib/utils'

// Theme Context Types
export type Theme = ThemeMode

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
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

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('poll-app-theme') as Theme
    const systemTheme = getSystemTheme()
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
    localStorage.setItem('poll-app-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const value = {
    theme,
    toggleTheme,
    setTheme,
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
  variant?: 'default' | 'outline' | 'ghost' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ThemeToggle({
  variant = 'floating',
  size = 'md',
  className
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
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
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }

  // Different variant classes
  const variantClasses = {
    default: 'bg-background border-border',
    outline: 'bg-transparent border-border',
    ghost: 'bg-transparent border-transparent hover:bg-muted',
    floating: cn(
      'fixed bottom-4 right-4 z-50 rounded-full shadow-lg',
      'border border-border/50 bg-background/80 backdrop-blur-md',
      'hover:shadow-xl hover:scale-105 transition-all duration-300'
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
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
