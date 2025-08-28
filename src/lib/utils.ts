'use client'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**************************************
 * GENERAL UTILITIES
 **************************************/

/**
 * Combines and merges tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date in a user-friendly format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Calculates a percentage value
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

/**
 * Truncates text to a specific length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generates a URL-friendly slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**************************************
 * THEME UTILITIES
 **************************************/

export type ThemeMode = 'light' | 'dark' | 'system'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 'default' | 'outline' | 'ghost' | 'glass' | 'gradient'

// Color theme constants
export const THEME_COLORS = {
  light: {
    primary: 'hsl(221.2 83.2% 53.3%)',
    primaryForeground: 'hsl(210 40% 98%)',
    secondary: 'hsl(210 40% 96%)',
    secondaryForeground: 'hsl(222.2 84% 4.9%)',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    muted: 'hsl(210 40% 96%)',
    mutedForeground: 'hsl(215.4 16.3% 46.9%)',
    accent: 'hsl(210 40% 96%)',
    accentForeground: 'hsl(222.2 84% 4.9%)',
    border: 'hsl(214.3 31.8% 91.4%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(222.2 84% 4.9%)',
    glass: 'rgba(255, 255, 255, 0.8)',
    glassHover: 'rgba(255, 255, 255, 0.9)',
  },
  dark: {
    primary: 'hsl(217.2 91.2% 59.8%)',
    primaryForeground: 'hsl(222.2 84% 4.9%)',
    secondary: 'hsl(217.2 32.6% 17.5%)',
    secondaryForeground: 'hsl(210 40% 98%)',
    background: 'hsl(222.2 84% 4.9%)',
    foreground: 'hsl(210 40% 98%)',
    muted: 'hsl(217.2 32.6% 17.5%)',
    mutedForeground: 'hsl(215 20.2% 65.1%)',
    accent: 'hsl(217.2 32.6% 17.5%)',
    accentForeground: 'hsl(210 40% 98%)',
    border: 'hsl(217.2 32.6% 17.5%)',
    card: 'hsl(222.2 84% 4.9%)',
    cardForeground: 'hsl(210 40% 98%)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassHover: 'rgba(255, 255, 255, 0.1)',
  },
}

/**
 * Gets a brand color with optional opacity
 */
export const getBrandColor = (color: string, opacity?: number): string => {
  if (opacity !== undefined) {
    return `hsla(var(--brand-${color}), ${opacity})`
  }
  return `hsl(var(--brand-${color}))`
}

/**
 * Gets a semantic color with optional opacity
 */
export const getSemanticColor = (variant: ColorVariant, opacity?: number): string => {
  const colorMap: Record<ColorVariant, string> = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: 'var(--brand-blue)',
  }

  const color = colorMap[variant]
  if (opacity !== undefined) {
    return `hsla(${color}, ${opacity})`
  }
  return `hsl(${color})`
}

/**************************************
 * COMPONENT STYLE UTILITIES
 **************************************/

/**
 * Generates button styles based on variant and size
 */
export const getButtonStyles = (
  variant: ComponentVariant = 'default',
  size: ComponentSize = 'md'
) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'

  const sizeStyles = {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
    xl: 'h-12 px-8 text-lg',
  }

  const variantStyles = {
    default: cn(
      'bg-primary text-primary-foreground shadow hover:bg-primary/90',
      'focus:ring-primary/50'
    ),
    outline: cn(
      'border border-border bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground',
      'focus:ring-border'
    ),
    ghost: cn(
      'bg-transparent text-foreground hover:bg-muted hover:text-muted-foreground',
      'focus:ring-muted'
    ),
    glass: cn(
      'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10',
      'text-foreground hover:bg-white/20 dark:hover:bg-white/10',
      'focus:ring-primary/50'
    ),
    gradient: cn(
      'bg-gradient-to-br from-brand-blue to-brand-indigo text-white',
      'hover:from-brand-blue-light hover:to-brand-indigo shadow-glow',
      'focus:ring-brand-blue/50'
    ),
  }

  return cn(baseStyles, sizeStyles[size], variantStyles[variant])
}

/**
 * Generates card styles based on variant
 */
export const getCardStyles = (variant: 'default' | 'glass' | 'elevated' = 'default') => {
  const baseStyles = 'rounded-lg border transition-all duration-200'

  const variantStyles = {
    default: 'bg-card border-border shadow-sm',
    glass: cn(
      'bg-white/10 dark:bg-white/5 backdrop-blur-lg border-white/20 dark:border-white/10',
      'shadow-glass hover:shadow-glass-hover'
    ),
    elevated: 'bg-card border-border shadow-lg hover:shadow-xl',
  }

  return cn(baseStyles, variantStyles[variant])
}

/**
 * Generates input styles based on variant
 */
export const getInputStyles = (variant: 'default' | 'glass' = 'default') => {
  const baseStyles = cn(
    'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
    'placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200'
  )

  const variantStyles = {
    default: cn(
      'bg-background border-border',
      'focus:ring-primary/50 focus:border-primary'
    ),
    glass: cn(
      'bg-white/10 dark:bg-white/5 backdrop-blur-lg border-white/20 dark:border-white/10',
      'focus:ring-brand-blue/50 focus:border-brand-blue focus:bg-white/20 dark:focus:bg-white/10'
    ),
  }

  return cn(baseStyles, variantStyles[variant])
}

/**************************************
 * TEXT AND TYPOGRAPHY UTILITIES
 **************************************/

/**
 * Gets text styles based on variant and size
 */
export const getTextStyles = (variant: 'heading' | 'body' | 'caption' | 'accent', size?: string) => {
  const baseStyles = {
    heading: 'font-semibold text-foreground',
    body: 'text-muted-foreground',
    caption: 'text-xs text-muted-foreground/70 uppercase tracking-wide',
    accent: 'font-medium text-brand-blue',
  }

  return cn(baseStyles[variant], size)
}

/**
 * Gets responsive text sizes for different breakpoints
 */
export const getResponsiveTextSize = (
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) => {
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  )
}

/**************************************
 * ANIMATION UTILITIES
 **************************************/

/**
 * Gets animation class with optional delay
 */
export const getAnimationClass = (animation: string, delay?: number) => {
  const delayClass = delay ? `animation-delay-${delay}` : ''
  return cn(`animate-${animation}`, delayClass)
}

/**
 * Gets hover effect classes based on variant
 */
export const getHoverEffects = (variant: 'scale' | 'lift' | 'glow' | 'pulse' = 'scale') => {
  const effects = {
    scale: 'hover:scale-105 active:scale-95',
    lift: 'hover:-translate-y-1 hover:shadow-lg',
    glow: 'hover:shadow-glow hover:shadow-brand-blue/25',
    pulse: 'hover:animate-pulse-glow',
  }

  return `transition-all duration-200 ${effects[variant]}`
}

/**************************************
 * LAYOUT UTILITIES
 **************************************/

/**
 * Gets container styles based on size
 */
export const getContainerStyles = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'lg') => {
  const baseStyles = 'mx-auto px-4 sm:px-6 lg:px-8'

  const sizeStyles = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }

  return cn(baseStyles, sizeStyles[size])
}

/**
 * Gets grid styles with responsive columns
 */
export const getGridStyles = (cols?: { xs?: number; sm?: number; md?: number; lg?: number; xl?: number }) => {
  const baseStyles = 'grid gap-4'

  if (!cols) return cn(baseStyles, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3')

  const colStyles = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean)

  return cn(baseStyles, ...colStyles)
}

/**************************************
 * THEME DETECTION UTILITIES
 **************************************/

/**
 * Gets the system theme preference
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Applies a theme to the document
 */
export const applyTheme = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = getSystemTheme()
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }
}

/**************************************
 * COLOR MANIPULATION UTILITIES
 **************************************/

/**
 * Converts a hex color to HSL format
 */
export const hexToHsl = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

/**
 * Adjusts the opacity of a color
 */
export const adjustOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('hsl')) {
    return color.replace('hsl(', `hsla(`).replace(')', `, ${opacity})`)
  }
  return color
}

/**************************************
 * ACCESSIBILITY UTILITIES
 **************************************/

/**
 * Gets a contrasting text color for a background
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation - in a real app you might want a more sophisticated approach
  const isDark = backgroundColor.includes('dark') || backgroundColor.includes('222.2')
  return isDark ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)'
}

/**
 * Gets focus styles with custom color
 */
export const getFocusStyles = (color: string = 'primary') => {
  return `focus:outline-none focus:ring-2 focus:ring-${color}/50 focus:ring-offset-2 focus:ring-offset-background`
}

/**************************************
 * CSS VARIABLE UTILITIES
 **************************************/

/**
 * Sets a CSS variable
 */
export const setCSSVariable = (name: string, value: string) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(`--${name}`, value)
}

/**
 * Gets a CSS variable value
 */
export const getCSSVariable = (name: string): string => {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`)
}

/**************************************
 * COMMON STYLE COMBINATIONS
 **************************************/

export const COMMON_STYLES = {
  glassMorphism: 'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10',
  gradientText: 'bg-gradient-to-br from-brand-blue to-brand-purple bg-clip-text text-transparent',
  gradientBorder: 'bg-gradient-to-r from-brand-blue to-brand-purple p-[1px] rounded-lg',
  floatingCard: 'bg-card border border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200',
  premiumShadow: 'shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.15)]',
  responsivePadding: 'px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12',
  responsiveText: 'text-sm sm:text-base lg:text-lg',
  centerContent: 'flex items-center justify-center',
  absoluteCenter: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

/**
 * Gets a class that changes based on theme
 */
export const getThemeAwareClass = (lightClass: string, darkClass: string) => {
  return `${lightClass} dark:${darkClass}`
}

/**
 * Creates theme variants for a component
 */
export const createThemeVariants = (baseClass: string, variants: Record<string, string>) => {
  return Object.entries(variants).reduce((acc, [key, value]) => {
    acc[key] = cn(baseClass, value)
    return acc
  }, {} as Record<string, string>)
}
