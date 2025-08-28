'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  EmailField,
  PasswordField,
  CheckboxField,
  FormError,
  FormFooter,
  LinkText
} from './form-components'

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
})

type LoginFormData = z.infer<typeof loginFormSchema>

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  isLoading?: boolean
  className?: string
  showRememberMe?: boolean
  showRegisterLink?: boolean
  title?: string
  description?: string
}

export function LoginForm({
  onSubmit,
  isLoading = false,
  className,
  showRememberMe = true,
  showRegisterLink = true,
  title = 'Welcome back',
  description = 'Sign in to your account to continue',
}: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  })

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      setSubmitError('')
      await onSubmit(data)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during login'
      setSubmitError(errorMessage)

      // If it's a field-specific error, set it on the appropriate field
      if (errorMessage.toLowerCase().includes('email')) {
        setError('email', { message: errorMessage })
      } else if (errorMessage.toLowerCase().includes('password')) {
        setError('password', { message: errorMessage })
      }
    }
  }

  // We don't need this function as it's handled by the PasswordField component

  return (
    <Card variant="glass" className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="p-3 rounded-full bg-primary/10">
            <LogIn className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Email Field */}
          <EmailField
            label="Email address"
            placeholder="Enter your email"
            error={errors.email?.message}
            disabled={isLoading}
            required
            {...register('email')}
          />

          {/* Password Field */}
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            error={errors.password?.message}
            disabled={isLoading}
            required
            showPasswordState={[showPassword, setShowPassword]}
            {...register('password')}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            {showRememberMe && (
              <CheckboxField
                label="Remember me"
                disabled={isLoading}
                {...register('rememberMe')}
              />
            )}
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Error */}
          <FormError error={submitError} />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>

          {/* Register Link */}
          {showRegisterLink && (
            <FormFooter>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <LinkText href="/auth/register">Create account</LinkText>
              </p>
            </FormFooter>
          )}

          {/* Demo Account Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              Demo Account:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Email: demo@example.com</p>
              <p>Password: demo123</p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
