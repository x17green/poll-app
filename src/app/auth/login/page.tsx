'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'
import { ArrowLeft } from '@/components/ui/icons'
import { cn, glassStyles } from '@/lib/theme'

interface LoginData {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual authentication API call
      console.log('Login attempt:', {
        email: data.email,
        rememberMe: data.rememberMe,
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock authentication logic
      if (data.email === 'demo@example.com' && data.password === 'demo123') {
        // Store user session (replace with proper auth implementation)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', data.email)

        // Redirect to dashboard or return URL
        const returnUrl =
          new URLSearchParams(window.location.search).get('returnUrl') || '/'
        router.push(returnUrl)
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>

          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
              <div className="text-white font-bold text-xl">P</div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed text-center">
              Sign in to your account to access your polls and create new ones
            </p>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className={cn("rounded-lg border p-6 sm:p-8 transition-all duration-200", glassStyles.all)}>
            <LoginForm
              onSubmit={handleLogin}
              isLoading={isLoading}
              title=""
              description=""
            />

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Demo Credentials
              </h4>
              <div className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                <div>Email: demo@example.com</div>
                <div>Password: demo123</div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground/80 leading-relaxed">Don&apos;t have an account? </span>
              <Link
                href="/auth/register"
                className="font-medium text-primary hover:underline transition-colors duration-200"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground/50">
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
