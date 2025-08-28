'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'default' | 'glass' | 'minimal'
  inputSize?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    variant = 'default',
    inputSize = 'md',
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    const baseClasses = 'flex w-full rounded-lg border font-medium ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200'

    const variantClasses = {
      default: 'border-input bg-background text-foreground hover:border-border focus:border-primary',
      glass: 'bg-glass border-white/20 dark:border-white/10 backdrop-blur-lg text-foreground hover:bg-glass-hover focus:border-primary/50 focus:bg-glass-hover',
      minimal: 'border-transparent bg-muted/30 text-foreground hover:bg-muted/50 focus:bg-muted/50 focus:border-primary/30'
    }

    const sizeClasses = {
      sm: 'h-8 px-2.5 py-1 text-xs',
      md: 'h-10 px-3 py-2 text-sm',
      lg: 'h-12 px-4 py-3 text-base'
    }

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
