'use client'

import { useState, useEffect } from 'react'

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface Breakpoints {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

export interface ResponsiveState {
  width: number
  height: number
  breakpoint: BreakpointKey
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2Xl: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouch: boolean
}

const breakpoints: Breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const getBreakpoint = (width: number): BreakpointKey => {
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'xs'
}

const getDeviceType = (width: number) => {
  const isMobile = width < breakpoints.md
  const isTablet = width >= breakpoints.md && width < breakpoints.lg
  const isDesktop = width >= breakpoints.lg

  return { isMobile, isTablet, isDesktop }
}

export function useResponsive(): ResponsiveState {
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Initialize with current window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Detect touch capability
    const detectTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).msMaxTouchPoints > 0
      )
    }

    // Initial setup
    handleResize()
    detectTouch()

    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  const { width, height } = windowSize
  const breakpoint = getBreakpoint(width)
  const { isMobile, isTablet, isDesktop } = getDeviceType(width)

  return {
    width,
    height,
    breakpoint,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
  }
}

export function useBreakpoint(breakpoint: BreakpointKey): boolean {
  const { width } = useResponsive()
  return width >= breakpoints[breakpoint]
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQuery.matches)

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    // Legacy browsers
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [query])

  return matches
}

// Utility function to get responsive values
export function useResponsiveValue<T>(values: {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
  default: T
}): T {
  const { breakpoint } = useResponsive()

  // Return the value for the current breakpoint or fall back to smaller breakpoints
  if (values[breakpoint] !== undefined) {
    return values[breakpoint] as T
  }
  if (breakpoint === '2xl' && values.xl !== undefined) {
    return values.xl as T
  }
  if (['2xl', 'xl'].includes(breakpoint) && values.lg !== undefined) {
    return values.lg as T
  }
  if (['2xl', 'xl', 'lg'].includes(breakpoint) && values.md !== undefined) {
    return values.md as T
  }
  if (['2xl', 'xl', 'lg', 'md'].includes(breakpoint) && values.sm !== undefined) {
    return values.sm as T
  }
  if (['2xl', 'xl', 'lg', 'md', 'sm'].includes(breakpoint) && values.xs !== undefined) {
    return values.xs as T
  }
  return values.default
}

// Hook for responsive grid columns
export function useResponsiveColumns(options?: {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}): number {
  return useResponsiveValue({
    xs: options?.xs ?? 1,
    sm: options?.sm ?? 2,
    md: options?.md ?? 2,
    lg: options?.lg ?? 3,
    xl: options?.xl ?? 4,
    '2xl': options?.['2xl'] ?? 4,
    default: 1,
  })
}

// Hook for responsive spacing
export function useResponsiveSpacing(options?: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}): string {
  return useResponsiveValue({
    xs: options?.xs ?? '1rem',
    sm: options?.sm ?? '1.5rem',
    md: options?.md ?? '1.5rem',
    lg: options?.lg ?? '2rem',
    xl: options?.xl ?? '2.5rem',
    '2xl': options?.['2xl'] ?? '3rem',
    default: '1rem',
  })
}

// Hook for responsive font sizes
export function useResponsiveFontSize(options?: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}): string {
  return useResponsiveValue({
    xs: options?.xs ?? '0.875rem',
    sm: options?.sm ?? '1rem',
    md: options?.md ?? '1rem',
    lg: options?.lg ?? '1.125rem',
    xl: options?.xl ?? '1.25rem',
    '2xl': options?.['2xl'] ?? '1.5rem',
    default: '1rem',
  })
}

// Export breakpoints for external use
export { breakpoints }
