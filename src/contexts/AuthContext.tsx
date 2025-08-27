// src/contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
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
  signInWithGoogle: (accessToken: string) => Promise<void>
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
  }, [])

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
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in')
      throw error
    }
  }

  const signInWithGoogle = async (accessToken: string) => {
    try {
      // First, get user info from Google
      const googleUserResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
      
      if (!googleUserResponse.ok) {
        throw new Error('Failed to get user info from Google')
      }
      
      const googleUser = await googleUserResponse.json()
      
      // Create a mock ID token with the necessary information
      const mockIdToken = btoa(JSON.stringify({
        sub: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        email_verified: googleUser.verified_email
      }))

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/auth/sign_in_with_google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id_token: mockIdToken,
          access_token: accessToken // Send access token as backup
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
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      toast.error(error.message || 'Failed to sign in with Google')
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
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
      throw error
    }
  }

  const signOut = () => {
    setUser(null)
    setSession(null)
    localStorage.removeItem('session')
    localStorage.removeItem('auth_token')
    toast.success('Successfully signed out')
    router.push('/login')
  }

  const refreshSession = async () => {
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
  }, [session])

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