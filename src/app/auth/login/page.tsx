'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/auth/login-form'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          title="Welcome back"
          description="Sign in to your account to access your polls and create new ones"
        />
      </div>
    </div>
  )
}
