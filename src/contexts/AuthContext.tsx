'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseClient, Session, User } from '@supabase/supabase-js'
import { getClient } from '@/lib/supabase/client'

type AuthContextType = {
  supabase: SupabaseClient
  session: Session | null
  user: User | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = getClient()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <AuthContext.Provider value={{ supabase, session, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
