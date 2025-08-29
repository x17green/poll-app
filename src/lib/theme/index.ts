/**
 * Theme System
 *
 * This file exports all theme-related constants, utilities, and components.
 * Use this as the main entry point for importing theme functionality.
 */

// Export types
export * from './types';

// Export constants
export * from './constants';

// Export utilities
export * from './utils';

// Re-export utility functions from main utils that are theme-related
export {
  // Basic utilities
  cn,

  // Theme utilities
  getSystemTheme,
  applyTheme,
} from './utils';

// Export component variants
export {
  buttonVariants,
  cardVariants,
  inputVariants,
  inputSizes,
  labelVariants,
} from './constants';

// Export types
export type {
  ThemeMode,
  ColorVariant,
  ComponentSize,
  ComponentVariant,
  Radius,
  FontWeight,
  ButtonVariantProps,
  CardVariantProps,
  LabelVariantProps,
  BreakpointKey,
  ResponsiveValue,
  ThemeColors,
  SemanticColors,
  BrandColors,
  GlassStyles,
  ThemeContextType,
  PremiumTextStyles,
  ResponsiveSpacing,
  ResponsiveGrids,
  ContainerSizes,
  DefaultFormProps,
  AnimationStyles,
  Breakpoints,
  MediaQueries
} from './types';

// Export glass, shadow, and color utilities
export {
  glassStyles,
  shadowStyles,
  colorStyles,
  radiusStyles,
  premiumTextStyles,
} from './constants';

// Export responsive utilities
export {
  responsiveSpacing,
  responsiveGrids,
  containerSizes,
  breakpoints,
} from './constants';

// Export default form props
export { defaultFormProps } from './constants';
