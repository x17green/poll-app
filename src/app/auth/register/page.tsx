'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/components/auth/register-form'

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isLoading}
          title="Create your account"
          description="Join us to start creating and participating in polls"
        />
      </div>
    </div>
  )
}
