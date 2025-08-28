'use client'

/**
 * Responsive UI Components
 *
 * This file re-exports the unified responsive components from responsive-components.tsx
 * to maintain backward compatibility with existing imports.
 */

import {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveSection,
  ResponsiveCard,
  ResponsiveBox,
  ResponsiveLayout,
  ResponsiveText,
  OnlyOnMobile,
  OnlyOnTablet,
  OnlyOnDesktop,
  ResponsiveContent,
  useResponsive
} from './responsive-components'

import { Button } from './button'
// import { Card } from './card'
import { Input } from './input'
import { ThemeToggle } from '@/contexts/ThemeContext'

// Legacy components - using the new components under the hood but keeping the same API
/**
 * ResponsiveButton
 *
 * A Button component with responsive behavior built in.
 */
const ResponsiveButton = (props: React.ComponentProps<typeof Button>) => (
  <Button responsive {...props} />
)

/**
 * ResponsiveInput
 *
 * An Input component with responsive behavior built in.
 */
const ResponsiveInput = (props: React.ComponentProps<typeof Input>) => (
  <Input responsive {...props} />
)

// Export everything
export {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveSection,
  ResponsiveCard,
  ResponsiveButton,
  ResponsiveInput,
  ResponsiveBox,
  ResponsiveLayout,
  ResponsiveText,
  OnlyOnMobile,
  OnlyOnTablet,
  OnlyOnDesktop,
  ResponsiveContent,
  ThemeToggle,
  useResponsive,
}

// We also export the extended interfaces from the original file for type compatibility
export type {
  ResponsiveSectionProps,
  ResponsiveGridProps,
  ResponsiveContainerProps,
  ResponsiveCardProps,
  ResponsiveBoxProps,
  ResponsiveLayoutProps,
  ResponsiveTextProps
} from './responsive-components'
