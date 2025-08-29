/**
 * Theme System Types
 *
 * This file contains all the type definitions for the theme system.
 * It provides strong typing for theme-related values and functions.
 */

import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants, cardVariants, labelVariants } from './constants'

// Theme Modes
export type ThemeMode = 'light' | 'dark' | 'system'

// Color Variants
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'

// Component Sizes
export type ComponentSize = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'icon-sm' | 'icon-lg'

// Component Variants
export type ComponentVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'glass'
  | 'gradient'
  | 'premium'
  | 'minimal'

// Border Radius
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Font Weights
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold'

// Component Variant Props
export type ButtonVariantProps = VariantProps<typeof buttonVariants>
export type CardVariantProps = VariantProps<typeof cardVariants>
export type LabelVariantProps = VariantProps<typeof labelVariants>

// Responsive Breakpoints
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Responsive Props
export type ResponsiveValue<T> = {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
  default: T
}

// Theme Colors
export interface ThemeColors {
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  border: string
  card: string
  cardForeground: string
  glass: string
  glassHover: string
}

// Semantic Colors
export interface SemanticColors {
  success: {
    light: string
    dark: string
  }
  warning: {
    light: string
    dark: string
  }
  error: {
    light: string
    dark: string
  }
  info: {
    light: string
    dark: string
  }
}

// Brand Colors
export interface BrandColors {
  blue: string
  blueLight: string
  blueDark: string
  indigo: string
  purple: string
  accent: string
}

// Glass Styles
export interface GlassStyles {
  bg: string
  border: string
  blur: string
  shadow: string
  transition: string
  all: string
}

// Theme Context
export interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (theme: ThemeMode) => void
  isDark: boolean
  isLight: boolean
}

// Premium Text Styles
export interface PremiumTextStyles {
  text: string
  accent: string
  muted: string
  subtle: string
  headingXl: string
  headingLg: string
  headingMd: string
  headingSm: string
  bodyLg: string
  body: string
  bodySm: string
  caption: string
  success: string
  warning: string
  error: string
}

// Responsive Spacing
export interface ResponsiveSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

// Responsive Grids
export interface ResponsiveGrids {
  default: string
  compact: string
  wide: string
  cards: string
  features: string
}

// Container Sizes
export interface ContainerSizes {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  full: string
}

// Default Form Props
export interface DefaultFormProps {
  inputVariant: string
  inputSize: string
  buttonVariant: string
  buttonSize: string
  labelVariant: string
  labelSize: string
}

// Animation Styles
export interface AnimationStyles {
  fadeIn: string
  fadeOut: string
  slideUp: string
  slideDown: string
  slideLeft: string
  slideRight: string
  scaleUp: string
  scaleDown: string
  pulse: string
  bounce: string
  spin: string
  spinSlow: string
  shimmer: string
}

// Breakpoints
export interface Breakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

// Media Queries
export interface MediaQueries {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  dark: string
  light: string
  motion: string
  'reduced-motion': string
  hover: string
  'no-hover': string
  'high-contrast': string
}
