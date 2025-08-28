'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg active:scale-95',
        destructive:
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90 hover:shadow-lg active:scale-95',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md active:scale-95',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md active:scale-95',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-95',
        link: 'text-primary underline-offset-4 hover:underline',
        glass:
          'bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-glass hover:shadow-glass-hover active:scale-95',
        gradient:
          'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 dark:from-blue-600 dark:via-blue-700 dark:to-indigo-700 text-white shadow-glow hover:shadow-glow-lg hover:from-blue-400 hover:via-blue-500 hover:to-indigo-500 dark:hover:from-blue-500 dark:hover:via-blue-600 dark:hover:to-indigo-600 active:scale-95',
        premium:
          'bg-gradient-to-br from-brand-blue to-brand-indigo text-white shadow-lg hover:shadow-xl hover:shadow-brand-blue/25 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
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
      rounded: {
        default: 'rounded-lg',
        none: 'rounded-none',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      ripple = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [rippleArray, setRippleArray] = React.useState<
      Array<{ x: number; y: number; key: number }>
    >([])

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading || disabled) return

        if (ripple) {
          const button = event.currentTarget
          const rect = button.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          const newRipple = { x, y, key: Date.now() }

          setRippleArray((prev) => [...prev, newRipple])

          // Remove ripple after animation
          setTimeout(() => {
            setRippleArray((prev) => prev.filter((r) => r.key !== newRipple.key))
          }, 600)
        }

        onClick?.(event)
      },
      [loading, disabled, ripple, onClick]
    )

    const buttonContent = (
      <>
        {/* Loading spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Button content */}
        <div
          className={cn(
            'flex items-center gap-2 relative z-10',
            loading && 'opacity-0'
          )}
        >
          {leftIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {leftIcon}
            </span>
          )}
          {children && <span className="flex-1">{children}</span>}
          {rightIcon && (
            <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Ripple effect */}
        {ripple && (
          <div className="absolute inset-0 overflow-hidden rounded-inherit">
            {rippleArray.map((ripple) => (
              <span
                key={ripple.key}
                className="absolute bg-white/30 rounded-full animate-ping"
                style={{
                  left: ripple.x - 10,
                  top: ripple.y - 10,
                  width: 20,
                  height: 20,
                  animationDuration: '600ms',
                }}
              />
            ))}
          </div>
        )}

        {/* Shine effect for premium variant */}
        {variant === 'premium' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        )}

        {/* Glass morphism highlight */}
        {variant === 'glass' && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-inherit" />
        )}
      </>
    )

    if (asChild) {
      return (
        <div
          className={cn(buttonVariants({ variant, size, rounded, className }))}
        >
          {buttonContent}
        </div>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={loading || disabled}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
