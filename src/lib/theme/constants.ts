/**
 * Theme Constants
 *
 * This file contains all theme-related constants and utilities used across the application.
 * It centralizes our theme definition to ensure consistency.
 */

import { cva, type VariantProps } from 'class-variance-authority'

// ==============================
// Theme Types
// ==============================

export type ThemeMode = 'light' | 'dark' | 'system'
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 'default' | 'outline' | 'ghost' | 'glass' | 'gradient' | 'premium' | 'minimal'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

// ==============================
// Theme Colors
// ==============================

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

// Semantic colors (consistent across themes)
export const SEMANTIC_COLORS = {
  success: {
    light: '#22c55e', // Green-500
    dark: '#34d399', // Green-400
  },
  warning: {
    light: '#f59e0b', // Amber-500
    dark: '#fbbf24', // Amber-400
  },
  error: {
    light: '#ef4444', // Red-500
    dark: '#f87171', // Red-400
  },
  info: {
    light: '#3b82f6', // Blue-500
    dark: '#60a5fa', // Blue-400
  },
}

// Brand colors used for gradients and accents
export const BRAND_COLORS = {
  blue: 'var(--brand-blue)',
  blueLight: 'var(--brand-blue-light)',
  blueDark: 'var(--brand-blue-dark)',
  indigo: 'var(--brand-indigo)',
  purple: 'var(--brand-purple)',
  accent: 'var(--brand-accent)',
}

// ==============================
// Spacing System
// ==============================

export const SPACING = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  18: '4.5rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  128: '32rem',
}

// ==============================
// Style Presets
// ==============================

// Glass effect styles
export const glassStyles = {
  bg: 'bg-white/10 dark:bg-white/5',
  border: 'border border-white/20 dark:border-white/10',
  blur: 'backdrop-blur-lg',
  shadow: 'shadow-glass hover:shadow-glass-hover',
  transition: 'transition-all duration-200',
  get all() {
    return `${this.bg} ${this.border} ${this.blur} ${this.shadow} ${this.transition}`
  }
}

// Shadow system
export const shadowStyles = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
  glow: 'shadow-glow',
  'glow-lg': 'shadow-glow-lg',
  glass: 'shadow-glass',
  'glass-hover': 'shadow-glass-hover',
}

// Border radiuses
export const radiusStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
  full: 'rounded-full',
}

// Color mapping for different variants
export const colorStyles = {
  primary: 'text-primary bg-primary-foreground',
  secondary: 'text-secondary bg-secondary-foreground',
  success: 'text-success-500 dark:text-success-400',
  warning: 'text-warning-500 dark:text-warning-400',
  error: 'text-destructive',
  info: 'text-blue-500 dark:text-blue-400',
  muted: 'text-muted-foreground',
}

// ==============================
// Component Variant Presets
// ==============================

// Button variants
export type LabelVariantProps = VariantProps<typeof labelVariants>
export type ButtonVariantProps = VariantProps<typeof buttonVariants>
export type CardVariantProps = VariantProps<typeof cardVariants>

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 hover:shadow-lg active:scale-95',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md active:scale-95',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md active:scale-95',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-glass hover:shadow-glass-hover active:scale-95',
        gradient: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 dark:from-blue-600 dark:via-blue-700 dark:to-indigo-700 text-white shadow-glow hover:shadow-glow-lg hover:from-blue-400 hover:via-blue-500 hover:to-indigo-500 dark:hover:from-blue-500 dark:hover:via-blue-600 dark:hover:to-indigo-600 active:scale-95',
        premium: 'bg-gradient-to-br from-brand-blue to-brand-indigo text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/25 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Card variants
export const cardVariants = cva(
  'rounded-lg border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground shadow-sm border-border',
        glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-lg border-white/20 dark:border-white/10 shadow-glass',
        elevated: 'bg-card text-card-foreground shadow-lg border-border hover:shadow-xl',
        gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-sm',
        outline: 'border-2 border-dashed border-border bg-transparent hover:bg-muted/50',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// Input variants
export const inputVariants = {
  default: 'border-input bg-background text-foreground hover:border-border focus:border-primary dark:hover:border-border/70 dark:focus:border-primary/70',
  glass: 'bg-glass border-white/20 dark:border-white/10 backdrop-blur-lg text-foreground hover:bg-glass-hover focus:border-primary/50 focus:bg-glass-hover',
  minimal: 'border-transparent bg-muted/30 text-foreground hover:bg-muted/50 focus:bg-muted/50 focus:border-primary/30',
}

// Input sizes
export const inputSizes = {
  sm: 'h-8 px-2.5 py-1 text-xs',
  md: 'h-10 px-3 py-2 text-sm',
  lg: 'h-12 px-4 py-3 text-base',
}

// ==============================
// Premium Design System
// ==============================

// Premium text classes
export const premiumTextStyles = {
  // Base text styles
  text: 'text-foreground font-medium',
  accent: 'bg-gradient-to-br from-blue-500 to-indigo-600 bg-clip-text text-transparent font-semibold',
  muted: 'text-muted-foreground/70',
  subtle: 'text-muted-foreground/50 text-sm',

  // Heading styles
  headingXl: 'text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-foreground',
  headingLg: 'text-3xl sm:text-4xl font-semibold tracking-tight text-foreground',
  headingMd: 'text-2xl font-semibold tracking-tight text-foreground',
  headingSm: 'text-xl font-semibold tracking-tight text-foreground',

  // Body text styles
  bodyLg: 'text-lg text-muted-foreground leading-relaxed',
  body: 'text-base text-muted-foreground leading-relaxed',
  bodySm: 'text-sm text-muted-foreground/80 leading-relaxed',
  caption: 'text-xs uppercase tracking-wide text-muted-foreground/70 font-medium',

  // Semantic text styles
  success: 'text-success-500 dark:text-success-400 font-medium',
  warning: 'text-warning-500 dark:text-warning-400 font-medium',
  error: 'text-destructive font-medium',
}

// ==============================
// Responsive Utilities
// ==============================

// Default spacing for responsive layouts
export const responsiveSpacing = {
  xs: 'gap-2 p-2',
  sm: 'gap-3 p-3 sm:gap-4 sm:p-4',
  md: 'gap-4 p-4 sm:gap-6 sm:p-6',
  lg: 'gap-6 p-6 sm:gap-8 sm:p-8',
  xl: 'gap-8 p-8 sm:gap-10 sm:p-10',
}

// Responsive grid configurations
export const responsiveGrids = {
  default: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  compact: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  wide: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
  cards: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  features: 'grid-cols-1 md:grid-cols-3',
}

// Container sizes
export const containerSizes = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-none',
}

// ==============================
// Label Variants
// ==============================

export const labelVariants = cva(
  'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-primary',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-400',
        error: 'text-destructive',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// ==============================
// Default Form Props
// ==============================

export const defaultFormProps = {
  inputVariant: 'default',
  inputSize: 'md',
  buttonVariant: 'default',
  buttonSize: 'default',
  labelVariant: 'default',
  labelSize: 'md',
}

// ==============================
// Animation Presets
// ==============================

export const animationStyles = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  scaleUp: 'animate-scale-up',
  scaleDown: 'animate-scale-down',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce-gentle',
  spin: 'animate-spin',
  spinSlow: 'animate-spin-slow',
  shimmer: 'animate-shimmer',
}

// ==============================
// Breakpoints
// ==============================

export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// ==============================
// Media Queries
// ==============================

export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  motion: '@media (prefers-reduced-motion: no-preference)',
  'reduced-motion': '@media (prefers-reduced-motion: reduce)',
  hover: '@media (hover: hover)',
  'no-hover': '@media (hover: none)',
  'high-contrast': '@media (prefers-contrast: high)',
}
