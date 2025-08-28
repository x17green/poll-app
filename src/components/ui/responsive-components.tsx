'use client'

/**
 * Unified Responsive Components
 *
 * This file contains all responsive UI components and utilities in one place.
 * It consolidates the previous separate responsive component files into a single source of truth.
 */

import * as React from 'react'
import { useResponsive, useResponsiveColumns, useResponsiveSpacing } from '@/hooks/use-responsive'
import { cn } from '@/lib/utils'

// Re-export the hook for direct access
export { useResponsive }

// ============================================================
// ResponsiveContainer Component
// ============================================================

export interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  as?: React.ElementType
  centerContent?: boolean
}

export const ResponsiveContainer = React.forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  (
    {
      children,
      size = 'lg',
      padding = 'md',
      as: Component = 'div',
      centerContent = false,
      className,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    }

    // Padding classes - simplified and consistent
    const paddingClasses = {
      none: 'px-0',
      sm: 'px-3 sm:px-4 md:px-5 lg:px-6',
      md: 'px-4 sm:px-6 md:px-8 lg:px-10',
      lg: 'px-5 sm:px-8 md:px-12 lg:px-16',
      xl: 'px-6 sm:px-10 md:px-16 lg:px-24',
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'w-full mx-auto container-responsive',
          sizeClasses[size],
          paddingClasses[padding],
          centerContent && 'flex flex-col items-center',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ResponsiveContainer.displayName = 'ResponsiveContainer'

// ============================================================
// ResponsiveGrid Component
// ============================================================

export interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  autoFit?: boolean
  minChildWidth?: string
  maxColumns?: number
  as?: React.ElementType
  centerItems?: boolean
}

export const ResponsiveGrid = React.forwardRef<HTMLDivElement, ResponsiveGridProps>(
  (
    {
      children,
      columns,
      gap,
      autoFit = false,
      minChildWidth = '320px',
      maxColumns = 6,
      as: Component = 'div',
      centerItems = false,
      className,
      ...props
    },
    ref
  ) => {
    const cols = useResponsiveColumns(columns)

    // Predefined gap classes based on size
    const gapClasses = {
      sm: 'gap-2 sm:gap-3 md:gap-4',
      md: 'gap-3 sm:gap-4 md:gap-6',
      lg: 'gap-4 sm:gap-6 md:gap-8',
      xl: 'gap-6 sm:gap-8 md:gap-10',
    }

    // For autoFit mode, we still use the spacing hook
    const gapSizes = {
      sm: { xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.5rem' },
      md: { xs: '1rem', sm: '1.5rem', md: '1.5rem', lg: '2rem' },
      lg: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
      xl: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
    }

    // Get responsive spacing for the gap (only used with autoFit)
    const spacing = useResponsiveSpacing(gap ? gapSizes[gap as keyof typeof gapSizes] : undefined)

    // Inline styles for auto-fit grid if enabled
    const autoFitStyles = autoFit
      ? {
          gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`,
          gap: spacing,
        }
      : {}

    // CSS grid classes based on columns prop
    const getGridColsClass = () => {
      if (autoFit) return ''

      const baseCols = Math.min(cols, maxColumns)
      return `grid-cols-1 ${
        baseCols >= 2 ? 'sm:grid-cols-2' : ''
      } ${
        baseCols >= 3 ? 'md:grid-cols-3' : ''
      } ${
        baseCols >= 4 ? 'lg:grid-cols-4' : ''
      } ${
        baseCols >= 5 ? 'xl:grid-cols-5' : ''
      } ${
        baseCols >= 6 ? '2xl:grid-cols-6' : ''
      }`
    }

    // Gap classes
    const getGapClass = () => {
      if (autoFit) return ''
      return gap ? gapClasses[gap] : 'gap-3 sm:gap-4 md:gap-6'
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'grid w-full',
          getGridColsClass(),
          getGapClass(),
          centerItems && 'place-items-center',
          autoFit ? '' : 'grid-responsive',
          className
        )}
        style={autoFit ? autoFitStyles : {}}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ResponsiveGrid.displayName = 'ResponsiveGrid'

// ============================================================
// ResponsiveSection Component
// ============================================================

export interface ResponsiveSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  verticalSpacing?: 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  as?: React.ElementType
}

export const ResponsiveSection: React.FC<ResponsiveSectionProps> = ({
  children,
  containerSize = 'lg',
  padding = 'md',
  verticalSpacing = 'md',
  centered = false,
  as = 'section',
  className,
  ...props
}) => {
  // Spacing classes
  const verticalSpacingClasses = {
    sm: 'py-6 sm:py-8 md:py-10',
    md: 'py-8 sm:py-12 md:py-16',
    lg: 'py-12 sm:py-16 md:py-20 lg:py-24',
    xl: 'py-16 sm:py-20 md:py-24 lg:py-32',
  }

  return (
    <ResponsiveContainer
      as={as}
      size={containerSize}
      padding={padding}
      centerContent={centered}
      className={cn(verticalSpacingClasses[verticalSpacing], className)}
      {...props}
    >
      {children}
    </ResponsiveContainer>
  )
}

// ============================================================
// ResponsiveText Component
// ============================================================

export interface ResponsiveTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'caption' | 'lead' | 'muted'
  size?: {
    base: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
  as?: React.ElementType
}

export const ResponsiveText = React.forwardRef<HTMLParagraphElement, ResponsiveTextProps>(
  (
    {
      children,
      variant = 'body',
      size,
      as: Component = 'p',
      className,
      ...props
    },
    ref
  ) => {
    // Base variants
    const variantClasses = {
      body: 'text-foreground',
      caption: 'text-xs text-muted-foreground',
      lead: 'text-lg font-medium text-foreground',
      muted: 'text-muted-foreground',
    }

    // Apply responsive sizes if provided
    const responsiveSizes = size
      ? cn(
          size.base,
          size.sm && `sm:${size.sm}`,
          size.md && `md:${size.md}`,
          size.lg && `lg:${size.lg}`,
          size.xl && `xl:${size.xl}`
        )
      : ''

    return (
      <Component
        ref={ref}
        className={cn(variantClasses[variant], responsiveSizes, className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ResponsiveText.displayName = 'ResponsiveText'

// ============================================================
// ResponsiveLayout Component
// ============================================================

export interface ResponsiveLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'sidebar' | 'split' | 'stack'
  sidebarWidth?: string
  reversed?: boolean
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  sidebarFirst?: boolean
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ResponsiveLayout = React.forwardRef<HTMLDivElement, ResponsiveLayoutProps>(
  (
    {
      children,
      variant = 'stack',
      sidebarWidth = '280px',
      reversed = false,
      breakpoint = 'lg',
      sidebarFirst = true,
      gap = 'md',
      className,
      ...props
    },
    ref
  ) => {
    // Gap mapping
    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }

    // Variant styles
    const variantStyles = {
      sidebar: cn(
        'grid',
        `grid-cols-1 ${breakpoint}:grid-cols-[${sidebarFirst ? sidebarWidth : 'auto'}_1fr_${
          !sidebarFirst ? sidebarWidth : 'auto'
        }]`,
        reversed && `${breakpoint}:flex-row-reverse`,
        gapClasses[gap]
      ),
      split: cn(
        'grid grid-cols-1',
        `${breakpoint}:grid-cols-2`,
        reversed && `${breakpoint}:flex-row-reverse`,
        gapClasses[gap]
      ),
      stack: cn('flex flex-col', gapClasses[gap]),
    }

    return (
      <div
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ResponsiveLayout.displayName = 'ResponsiveLayout'

// ============================================================
// ResponsiveCard Component
// ============================================================

export interface ResponsiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  interactive?: boolean
}

export const ResponsiveCard = React.forwardRef<HTMLDivElement, ResponsiveCardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      hover = false,
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    // Variant mapping
    const variantClasses = {
      default: 'bg-card border border-border shadow-sm',
      glass: 'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-glass',
      bordered: 'bg-background border-2 border-border',
      elevated: 'bg-card border border-border shadow-lg',
    }

    // Padding classes
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-3 sm:p-4',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
    }

    // Hover effects
    const hoverClasses = hover
      ? variant === 'glass'
        ? 'hover:bg-white/15 dark:hover:bg-white/10 hover:shadow-glass-hover'
        : 'hover:shadow-md hover:border-border/80'
      : ''

    // Interactive styles
    const interactiveClasses = interactive
      ? 'cursor-pointer transition-all duration-200 active:scale-[0.98]'
      : ''

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variantClasses[variant],
          paddingClasses[padding],
          hoverClasses,
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ResponsiveCard.displayName = 'ResponsiveCard'

// ============================================================
// ResponsiveBox Component - A simple utility for spacing
// ============================================================

export interface ResponsiveBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  as?: React.ElementType
}

export const ResponsiveBox = React.forwardRef<HTMLDivElement, ResponsiveBoxProps>(
  (
    {
      children,
      padding = 'none',
      margin = 'none',
      as: Component = 'div',
      className,
      ...props
    },
    ref
  ) => {
    const paddingClasses = {
      none: '',
      sm: 'p-2 sm:p-3 md:p-4',
      md: 'p-3 sm:p-4 md:p-6',
      lg: 'p-4 sm:p-6 md:p-8',
      xl: 'p-6 sm:p-8 md:p-12',
    }

    const marginClasses = {
      none: '',
      sm: 'm-2 sm:m-3 md:m-4',
      md: 'm-3 sm:m-4 md:m-6',
      lg: 'm-4 sm:m-6 md:m-8',
      xl: 'm-6 sm:m-8 md:m-12',
    }

    return (
      <Component
        ref={ref}
        className={cn(paddingClasses[padding], marginClasses[margin], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ResponsiveBox.displayName = 'ResponsiveBox'

// ============================================================
// Utility components export for responsive needs
// ============================================================

// A simple component that conditionally renders based on screen size
export const OnlyOnMobile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile } = useResponsive()
  return <>{isMobile && children}</>
}

export const OnlyOnTablet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTablet } = useResponsive()
  return <>{isTablet && children}</>
}

export const OnlyOnDesktop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isDesktop } = useResponsive()
  return <>{isDesktop && children}</>
}

// A component that renders different content based on screen size
export const ResponsiveContent: React.FC<{
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop?: React.ReactNode
}> = ({ mobile, tablet, desktop }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive()

  if (isMobile && mobile) return <>{mobile}</>
  if (isTablet && tablet) return <>{tablet}</>
  if (isDesktop && desktop) return <>{desktop}</>

  // Fallback logic: use the closest available content
  if (isMobile) return <>{mobile || tablet || desktop}</>
  if (isTablet) return <>{tablet || desktop || mobile}</>
  return <>{desktop || tablet || mobile}</>
}
