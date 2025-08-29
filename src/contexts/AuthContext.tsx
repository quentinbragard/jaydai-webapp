// src/contexts/AuthContext.tsx - Updated signInWithGoogle method
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  metadata?: {
    name?: string
    pinned_folder_ids?: string[]
    organization_ids?: string[]
  }
}

interface Session {
  access_token: string
  refresh_token: string
  expires_at: number
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: (idToken: string) => Promise<void>
  signUp: (email: string, password: string, name?: string) => Promise<void>
  signOut: () => void
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const signOut = useCallback(() => {
    setUser(null)
    setSession(null)
    localStorage.removeItem('session')
    localStorage.removeItem('auth_token')
    toast.success('Successfully signed out')
    router.push('/login')
  }, [router])

  const refreshSession = useCallback(async () => {
    try {
      const storedSession = localStorage.getItem('session')
      if (!storedSession) return

      const parsedSession = JSON.parse(storedSession)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/refresh_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: parsedSession.refresh_token }),
      })

      if (!response.ok) {
        throw new Error('Failed to refresh session')
      }

      const data = await response.json()
      
      setSession(data.session)
      localStorage.setItem('session', JSON.stringify(data.session))
      localStorage.setItem('auth_token', data.session.access_token)
    } catch (error) {
      console.error('Error refreshing session:', error)
      signOut()
    }
  }, [signOut])

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = localStorage.getItem('session')
        if (storedSession) {
          const parsedSession = JSON.parse(storedSession)
          
          // Check if session is expired
          if (parsedSession.expires_at * 1000 > Date.now()) {
            setSession(parsedSession)
            
            // Fetch user data
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/me`, {
              headers: {
                'Authorization': `Bearer ${parsedSession.access_token}`
              }
            })
            
            if (response.ok) {
              const userData = await response.json()
              setUser(userData.user || userData) // Handle different response formats
            } else {
              // Session invalid, clear it
              localStorage.removeItem('session')
              localStorage.removeItem('auth_token')
            }
          } else {
            // Try to refresh the session
            await refreshSession()
          }
        }
      } catch (error) {
        console.error('Error loading session:', error)
        // Clear invalid session data
        localStorage.removeItem('session')
        localStorage.removeItem('auth_token')
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [refreshSession])

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign_in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Failed to sign in')
      }

      const data = await response.json()
      
      setUser(data.user)
      setSession(data.session)
      
      // Store session in localStorage
      localStorage.setItem('session', JSON.stringify(data.session))
      localStorage.setItem('auth_token', data.session.access_token)
      
      toast.success('Successfully signed in!')
      router.push('/')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to sign in'
      toast.error(message)
      throw error
    }
  }

  const signInWithGoogle = async (idToken: string) => {
    try {
      // Send the ID token directly to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign_in_with_google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id_token: idToken
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Failed to sign in with Google')
      }

      const data = await response.json()
      
      setUser(data.user)
      setSession(data.session)
      
      // Store session in localStorage
      localStorage.setItem('session', JSON.stringify(data.session))
      localStorage.setItem('auth_token', data.session.access_token)
      
      if (data.is_new_user) {
        toast.success('Welcome to Jaydai! Your account has been created.')
      } else {
        toast.success('Successfully signed in!')
      }
      
      router.push('/')
    } catch (error: unknown) {
      console.error('Google sign-in error:', error)
      const message = error instanceof Error ? error.message : 'Failed to sign in with Google'
      toast.error(message)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign_up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Failed to sign up')
      }

      const data = await response.json()
      
      if (data.session && data.user) {
        setUser(data.user)
        setSession(data.session)
        
        // Store session in localStorage
        localStorage.setItem('session', JSON.stringify(data.session))
        localStorage.setItem('auth_token', data.session.access_token)
        
        toast.success('Account created successfully!')
        router.push('/')
      } else {
        toast.success(data.message || 'Account created! Please check your email to verify.')
        router.push('/login')
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create account'
      toast.error(message)
      throw error
    }
  }

  // Set up automatic token refresh
  useEffect(() => {
    if (!session) return

    const expiresAt = session.expires_at * 1000
    const now = Date.now()
    const timeUntilExpiry = expiresAt - now
    
    // Refresh 5 minutes before expiry
    const refreshTime = timeUntilExpiry - (5 * 60 * 1000)
    
    if (refreshTime > 0) {
      const timeout = setTimeout(() => {
        refreshSession()
      }, refreshTime)

      return () => clearTimeout(timeout)
    }
  }, [session, refreshSession])

  const value = {
    user,
    session,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
