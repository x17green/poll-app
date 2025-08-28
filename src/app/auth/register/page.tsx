'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RegisterForm } from '@/components/auth/register-form'
import { ArrowLeft } from '@/components/ui/icons'

interface RegisterData {
  username: string
  email: string
  password: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual registration API call
      console.log('Registration attempt:', {
        username: data.username,
        email: data.email,
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock registration logic
      // In a real app, you would validate the data server-side
      if (data.email.includes('@')) {
        // Store user session (replace with proper auth implementation)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('username', data.username)

        // Redirect to onboarding or dashboard
        router.push('/polls')
      } else {
        throw new Error('Please enter a valid email address')
      }
    } catch (error) {
      console.error('Registration error:', error)

      // Handle specific errors
      if (error instanceof Error) {
        if (error.message.includes('email')) {
          throw new Error('This email is already registered')
        } else if (error.message.includes('username')) {
          throw new Error('This username is already taken')
        }
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-green-500/5" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm premium-muted hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg mb-4">
              <div className="text-white font-bold text-xl">P</div>
            </div>
            <h1 className="premium-heading-lg">Create your account</h1>
            <p className="mt-2 premium-body text-center">
              Join thousands of users creating engaging polls and surveys
            </p>
          </div>
        </div>

        {/* Register Form Container */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card p-6 sm:p-8">
            <RegisterForm
              onSubmit={handleRegister}
              isLoading={isLoading}
              title=""
              description=""
            />

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <span className="premium-body-sm">Already have an account? </span>
              <Link
                href="/auth/login"
                className="font-medium premium-accent-text hover:underline transition-colors duration-200"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4 text-sm premium-subtle">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-foreground transition-colors">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
