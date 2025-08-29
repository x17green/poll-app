'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { useResponsive } from '@/hooks/use-responsive'
import { inputVariants, inputSizes } from '@/lib/theme'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'glass' | 'minimal'
  inputSize?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  responsive?: boolean
  fullWidth?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    variant = 'default',
    inputSize = 'md',
    leftIcon,
    rightIcon,
    responsive = false,
    fullWidth = false,
    ...props
  }, ref) => {
    const { isMobile, isTablet } = useResponsive()
    const baseClasses = 'flex w-full rounded-lg border font-medium ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'

    const variantClasses = inputVariants
    const sizeClasses = inputSizes

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[inputSize],
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            responsive && 'input-responsive',
            fullWidth && 'w-full',
            isMobile && responsive && 'h-9 px-2.5 py-1.5 text-sm',
            isTablet && responsive && !isMobile && 'h-10 px-3 py-2',
            className
          )}
          ref={ref}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
