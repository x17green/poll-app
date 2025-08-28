'use client'

import * as React from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

/**
 * FormField Component
 *
 * A reusable form field component with label, input, and error message
 */
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
  required?: boolean
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  errorClassName?: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      error,
      required = false,
      leftIcon,
      rightElement,
      containerClassName,
      labelClassName,
      inputClassName,
      errorClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('space-y-2', containerClassName)}>
        <Label
          htmlFor={name}
          className={cn(labelClassName)}
        >
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <Input
            id={name}
            ref={ref}
            className={cn(
              leftIcon && 'pl-10',
              rightElement && 'pr-10',
              error && 'border-destructive focus-visible:ring-destructive',
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${name}-error`}
            className={cn('text-sm text-destructive', errorClassName)}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

/**
 * PasswordField Component
 *
 * A specialized form field for password input with visibility toggle
 */
interface PasswordFieldProps extends Omit<FormFieldProps, 'type' | 'leftIcon' | 'rightElement'> {
  showPasswordState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export const PasswordField = React.forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      name,
      showPasswordState,
      ...props
    },
    ref
  ) => {
    // Extract useState to avoid conditional hook call
    const defaultState = React.useState(false)
    const [showPassword, setShowPassword] = showPasswordState || defaultState

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <FormField
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        leftIcon={<Lock className="h-4 w-4" />}
        rightElement={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-full px-2 py-0 hover:bg-transparent"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            disabled={props.disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        }
        ref={ref}
        {...props}
      />
    )
  }
)

PasswordField.displayName = 'PasswordField'

/**
 * EmailField Component
 *
 * A specialized form field for email input
 */
export const EmailField = React.forwardRef<HTMLInputElement, Omit<FormFieldProps, 'type' | 'leftIcon'>>(
  (props, ref) => (
    <FormField
      type="email"
      leftIcon={<Mail className="h-4 w-4" />}
      ref={ref}
      autoComplete="email"
      {...props}
    />
  )
)

EmailField.displayName = 'EmailField'

/**
 * UsernameField Component
 *
 * A specialized form field for username input
 */
export const UsernameField = React.forwardRef<HTMLInputElement, Omit<FormFieldProps, 'type' | 'leftIcon'>>(
  (props, ref) => (
    <FormField
      type="text"
      leftIcon={<User className="h-4 w-4" />}
      ref={ref}
      autoComplete="username"
      {...props}
    />
  )
)

UsernameField.displayName = 'UsernameField'

/**
 * CheckboxField Component
 *
 * A reusable checkbox field with label
 */
interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
  name: string
  error?: string
  containerClassName?: string
  labelClassName?: string
  errorClassName?: string
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  error,
  containerClassName,
  labelClassName,
  errorClassName,
  ...props
}) => {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id={name}
          name={name}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
        <Label
          htmlFor={name}
          className={cn('text-sm font-normal leading-relaxed cursor-pointer', labelClassName)}
        >
          {label}
        </Label>
      </div>
      {error && (
        <p
          id={`${name}-error`}
          className={cn('text-sm text-destructive', errorClassName)}
        >
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * FormError Component
 *
 * A component to display form-level errors
 */
interface FormErrorProps {
  error?: string
  className?: string
}

export const FormError: React.FC<FormErrorProps> = ({ error, className }) => {
  if (!error) return null

  return (
    <div className={cn('p-3 rounded-md bg-destructive/10 border border-destructive/20', className)}>
      <p className="text-sm text-destructive">{error}</p>
    </div>
  )
}

/**
 * FormActions Component
 *
 * A container for form actions like submit buttons
 */
interface FormActionsProps {
  children: React.ReactNode
  className?: string
}

export const FormActions: React.FC<FormActionsProps> = ({ children, className }) => (
  <div className={cn('flex flex-col gap-3', className)}>
    {children}
  </div>
)

/**
 * FormDivider Component
 *
 * A divider with optional text for forms
 */
interface FormDividerProps {
  text?: string
  className?: string
}

export const FormDivider: React.FC<FormDividerProps> = ({ text, className }) => (
  <div className={cn('relative flex items-center py-3', className)}>
    <div className="flex-grow border-t border-border"></div>
    {text && (
      <span className="flex-shrink mx-3 text-xs text-muted-foreground">
        {text}
      </span>
    )}
    <div className="flex-grow border-t border-border"></div>
  </div>
)

/**
 * FormFooter Component
 *
 * A footer for forms with links and additional information
 */
interface FormFooterProps {
  children: React.ReactNode
  className?: string
}

export const FormFooter: React.FC<FormFooterProps> = ({ children, className }) => (
  <div className={cn('text-center pt-4 border-t', className)}>
    {children}
  </div>
)

/**
 * LinkText Component
 *
 * A text link component for forms
 */
interface LinkTextProps {
  href: string
  children: React.ReactNode
  className?: string
}

export const LinkText: React.FC<LinkTextProps> = ({ href, children, className }) => (
  <Link
    href={href}
    className={cn('text-primary hover:underline font-medium', className)}
  >
    {children}
  </Link>
)

/**
 * PasswordStrengthIndicator Component
 *
 * A component to visualize password strength
 */
interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  className
}) => {
  const strength = getPasswordStrength(password)

  if (!password) return null

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Password strength:
        </span>
        <span
          className={cn(
            'text-xs font-medium',
            strength.score < 2
              ? 'text-red-600'
              : strength.score < 4
                ? 'text-yellow-600'
                : 'text-green-600'
          )}
        >
          {strength.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            strength.color
          )}
          style={{ width: `${(strength.score / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}

// Helper function for password strength
const getPasswordStrength = (
  password: string
): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z\d]/.test(password),
  ]

  score = checks.filter(Boolean).length

  if (score < 2) return { score, label: 'Weak', color: 'bg-red-500' }
  if (score < 4) return { score, label: 'Fair', color: 'bg-yellow-500' }
  if (score < 5) return { score, label: 'Good', color: 'bg-green-500' }
  return { score, label: 'Strong', color: 'bg-green-600' }
}
