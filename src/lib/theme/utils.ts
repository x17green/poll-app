/**
 * Theme Utilities
 *
 * This file contains utility functions for working with the theme system.
 * It provides helpers for accessing theme values, calculating derived styles,
 * and handling theme-related operations.
 */

import {
  THEME_COLORS,
  SEMANTIC_COLORS,
  glassStyles,
  shadowStyles,
  colorStyles,
  premiumTextStyles,
  radiusStyles,
  breakpoints
} from './constants'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines and merges tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gets the appropriate system theme
 */
export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Applies a theme to the document
 */
export function applyTheme(theme: 'light' | 'dark' | 'system') {
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

/**
 * Gets a contrasting text color for a background
 */
export function getContrastColor(backgroundColor: string): string {
  // Simple contrast calculation - in a real app you might want a more sophisticated approach
  const isDark = backgroundColor.includes('dark') || backgroundColor.includes('222.2')
  return isDark ? 'hsl(210 40% 98%)' : 'hsl(222.2 84% 4.9%)'
}

/**
 * Creates a reusable glass effect style
 */
export function createGlassEffect(opacity: number = 10, blur: number = 16, isDark: boolean = false) {
  return {
    backgroundColor: isDark
      ? `rgba(255, 255, 255, ${opacity / 100})`
      : `rgba(255, 255, 255, ${(opacity + 70) / 100})`,
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid ${isDark
      ? `rgba(255, 255, 255, ${(opacity + 10) / 100})`
      : `rgba(255, 255, 255, ${(opacity + 20) / 100})`}`,
  }
}

/**
 * Gets glass style classes
 */
export function getGlassStyles(variant: 'default' | 'light' | 'heavy' = 'default') {
  switch (variant) {
    case 'light':
      return glassStyles.bg + ' backdrop-blur-md ' + glassStyles.border
    case 'heavy':
      return 'bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/30 dark:border-white/20'
    default:
      return glassStyles.all
  }
}

/**
 * Gets semantic color class based on variant
 */
export function getSemanticColorClass(variant: keyof typeof colorStyles): string {
  return colorStyles[variant]
}

/**
 * Gets shadow class based on size
 */
export function getShadowClass(size: keyof typeof shadowStyles): string {
  return shadowStyles[size]
}

/**
 * Gets radius class based on size
 */
export function getRadiusClass(size: keyof typeof radiusStyles): string {
  return radiusStyles[size]
}

/**
 * Gets premium text style class
 */
export function getPremiumTextClass(style: keyof typeof premiumTextStyles): string {
  return premiumTextStyles[style]
}

/**
 * Gets a color value from the theme
 */
export function getThemeColor(color: string, isDark: boolean = false): string {
  const theme = isDark ? THEME_COLORS.dark : THEME_COLORS.light
  return (theme as Record<string, string>)[color] || color
}

/**
 * Gets a semantic color value
 */
export function getSemanticColor(color: keyof typeof SEMANTIC_COLORS, isDark: boolean = false): string {
  return isDark ? SEMANTIC_COLORS[color].dark : SEMANTIC_COLORS[color].light
}

/**
 * Creates responsive padding class
 */
export function getResponsivePadding(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  switch (size) {
    case 'xs': return 'p-2 sm:p-3'
    case 'sm': return 'p-3 sm:p-4'
    case 'md': return 'p-4 sm:p-6'
    case 'lg': return 'p-6 sm:p-8 lg:p-10'
    case 'xl': return 'p-8 sm:p-10 lg:p-12'
    default: return 'p-4 sm:p-6'
  }
}

/**
 * Creates responsive margin class
 */
export function getResponsiveMargin(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  switch (size) {
    case 'xs': return 'm-2 sm:m-3'
    case 'sm': return 'm-3 sm:m-4'
    case 'md': return 'm-4 sm:m-6'
    case 'lg': return 'm-6 sm:m-8 lg:m-10'
    case 'xl': return 'm-8 sm:m-10 lg:m-12'
    default: return 'm-4 sm:m-6'
  }
}

/**
 * Creates responsive gap class
 */
export function getResponsiveGap(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  switch (size) {
    case 'xs': return 'gap-2 sm:gap-3'
    case 'sm': return 'gap-3 sm:gap-4'
    case 'md': return 'gap-4 sm:gap-6'
    case 'lg': return 'gap-6 sm:gap-8'
    case 'xl': return 'gap-8 sm:gap-10'
    default: return 'gap-4 sm:gap-6'
  }
}

/**
 * Gets a responsive font size class
 */
export function getResponsiveFontSize(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' = 'md'
): string {
  switch (size) {
    case 'xs': return 'text-xs sm:text-sm'
    case 'sm': return 'text-sm sm:text-base'
    case 'md': return 'text-base sm:text-lg'
    case 'lg': return 'text-lg sm:text-xl'
    case 'xl': return 'text-xl sm:text-2xl'
    case '2xl': return 'text-2xl sm:text-3xl'
    case '3xl': return 'text-3xl sm:text-4xl'
    case '4xl': return 'text-4xl sm:text-5xl'
    case '5xl': return 'text-5xl sm:text-6xl'
    default: return 'text-base sm:text-lg'
  }
}

/**
 * Creates a media query helper for custom CSS
 */
export function createMediaQuery(breakpoint: keyof typeof breakpoints): string {
  return `@media (min-width: ${breakpoints[breakpoint]}px)`
}

/**
 * Checks if the current screen matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Checks if the current device is touch-capable
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Checks if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Adds CSS variables to the document
 */
export function setCSSVariable(name: string, value: string): void {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty(`--${name}`, value)
}

/**
 * Gets a CSS variable value
 */
export function getCSSVariable(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`)
}
