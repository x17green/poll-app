'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserPlus } from 'lucide-react'
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
  UsernameField,
  PasswordField,
  CheckboxField,
  FormError,
  FormFooter,
  LinkText,
  PasswordStrengthIndicator
} from './form-components'

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, hyphens, and underscores'
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z
      .boolean()
      .refine(val => val === true, 'You must accept the terms and conditions'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerFormSchema>

interface RegisterFormProps {
  onSubmit: (
    data: Omit<RegisterFormData, 'confirmPassword' | 'acceptTerms'>
  ) => Promise<void>
  isLoading?: boolean
  className?: string
  showLoginLink?: boolean
  title?: string
  description?: string
}

export function RegisterForm({
  onSubmit,
  isLoading = false,
  className,
  showLoginLink = true,
  title = 'Create your account',
  description = 'Join us to start creating and participating in polls',
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    mode: 'onChange',
  })

  const password = watch('password')

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      setSubmitError('')
      await onSubmit({
        username: data.username,
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred during registration'
      setSubmitError(errorMessage)

      // If it's a field-specific error, set it on the appropriate field
      if (errorMessage.toLowerCase().includes('username')) {
        setError('username', { message: errorMessage })
      } else if (errorMessage.toLowerCase().includes('email')) {
        setError('email', { message: errorMessage })
      } else if (errorMessage.toLowerCase().includes('password')) {
        setError('password', { message: errorMessage })
      }
    }
  }

  // No longer need these toggle functions as they are handled by the components

  // Password strength is now handled by the PasswordStrengthIndicator component

  return (
    <Card className={cn('w-full max-w-md mx-auto', className)}>
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="p-3 rounded-full bg-primary/10">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Username Field */}
          <UsernameField
            label="Username"
            placeholder="Enter your username"
            error={errors.username?.message}
            disabled={isLoading}
            required
            {...register('username')}
          />

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
            placeholder="Create a password"
            error={errors.password?.message}
            disabled={isLoading}
            required
            showPasswordState={[showPassword, setShowPassword]}
            {...register('password')}
          />

          {/* Password Strength Indicator */}
          {password && (
            <PasswordStrengthIndicator password={password} />
          )}

          {/* Confirm Password Field */}
          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            disabled={isLoading}
            required
            showPasswordState={[showConfirmPassword, setShowConfirmPassword]}
            {...register('confirmPassword')}
          />

          {/* Terms and Conditions */}
          <CheckboxField
            label={
              <>
                I agree to the{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <span className="text-destructive"> *</span>
              </>
            }
            error={errors.acceptTerms?.message}
            disabled={isLoading}
            {...register('acceptTerms')}
          />

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
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </Button>

          {/* Login Link */}
          {showLoginLink && (
            <FormFooter>
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <LinkText href="/auth/login">Sign in</LinkText>
              </p>
            </FormFooter>
          )}

          {/* Password Requirements */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              Password requirements:
            </p>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• At least 8 characters long</li>
              <li>• Contains lowercase and uppercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Special characters recommended</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
