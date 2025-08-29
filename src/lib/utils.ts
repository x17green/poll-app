'use client'

// Import theme system utilities and re-export them
import * as ThemeSystem from './theme'
import { ComponentSize, ComponentVariant } from './theme/types'
import { ClassValue } from 'clsx'

// Re-export theme system
export * from './theme'

/**************************************
 * GENERAL UTILITIES
 **************************************/

/**
 * Combines and merges tailwind classes
 * Re-exported from theme system for backward compatibility
 */
export function cn(...inputs: ClassValue[]) {
  return ThemeSystem.cn(...inputs)
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

// These types and utilities are now imported from the theme system
// They are kept here for backward compatibility
// Use ThemeSystem imports directly for new code

/**
 * Gets a brand color with optional opacity
 * @deprecated Use ThemeSystem utilities instead
 */
export const getBrandColor = (color: string, opacity?: number): string => {
  if (opacity !== undefined) {
    return `hsla(var(--brand-${color}), ${opacity})`
  }
  return `hsl(var(--brand-${color}))`
}

/**
 * Gets a semantic color with optional opacity
 * @deprecated Use ThemeSystem.getSemanticColor instead
 */
export const getSemanticColor = (variant: keyof typeof ThemeSystem.SEMANTIC_COLORS, opacity?: number): string => {
  return ThemeSystem.getSemanticColor(variant, !!opacity)
}

/**************************************
 * COMPONENT STYLE UTILITIES
 **************************************/

/**
 * Generates button styles based on variant and size
 * @deprecated Use buttonVariants from theme system instead
 */
export const getButtonStyles = (
  variant: ComponentVariant = 'default',
  size: ComponentSize = 'md'
) => {
  // Create a mapped version of our inputs to match button variants
  const variantMap: Record<ComponentVariant, string> = {
    default: 'default',
    destructive: 'destructive',
    outline: 'outline',
    secondary: 'secondary',
    ghost: 'ghost',
    link: 'link',
    glass: 'glass',
    gradient: 'gradient',
    premium: 'premium',
    minimal: 'ghost', // Map minimal to ghost
  };

  const sizeMap: Record<ComponentSize, string> = {
    default: 'default',
    xs: 'xs',
    sm: 'sm',
    md: 'default', // Map md to default
    lg: 'lg',
    xl: 'xl',
    icon: 'icon',
    'icon-sm': 'icon-sm',
    'icon-lg': 'icon-lg'
  };

  return ThemeSystem.buttonVariants({
    variant: variantMap[variant] as ThemeSystem.ButtonVariantProps['variant'],
    size: sizeMap[size] as ThemeSystem.ButtonVariantProps['size']
  });
}

/**
 * Generates card styles based on variant
 * @deprecated Use cardVariants from theme system instead
 */
export const getCardStyles = (variant: 'default' | 'glass' | 'elevated' = 'default') => {
  return ThemeSystem.cardVariants({ variant })
}

/**
 * Generates input styles based on variant
 * @deprecated Use inputVariants from theme system instead
 */
export const getInputStyles = (variant: 'default' | 'glass' = 'default') => {
  const baseStyles = cn(
    'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
    'placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200'
  )

  return cn(baseStyles, ThemeSystem.inputVariants[variant])
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
 * @deprecated Use ThemeSystem.getSystemTheme instead
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  return ThemeSystem.getSystemTheme()
}

/**
 * Applies a theme to the document
 * @deprecated Use ThemeSystem.applyTheme instead
 */
export const applyTheme = (theme: ThemeSystem.ThemeMode) => {
  ThemeSystem.applyTheme(theme)
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
 * @deprecated Use ThemeSystem.getContrastColor instead
 */
export const getContrastColor = (backgroundColor: string): string => {
  return ThemeSystem.getContrastColor(backgroundColor)
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
 * @deprecated Use ThemeSystem.setCSSVariable instead
 */
export const setCSSVariable = (name: string, value: string) => {
  ThemeSystem.setCSSVariable(name, value)
}

/**
 * Gets a CSS variable value
 * @deprecated Use ThemeSystem.getCSSVariable instead
 */
export const getCSSVariable = (name: string): string => {
  return ThemeSystem.getCSSVariable(name)
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
