// src/components/GoogleOAuthProvider.tsx
'use client'

import { GoogleOAuthProvider as GoogleProvider } from '@react-oauth/google'
import { ReactNode } from 'react'

interface GoogleOAuthProviderProps {
  children: ReactNode
}

export function GoogleOAuthProvider({ children }: GoogleOAuthProviderProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) {
    console.warn('Google Client ID not found. Google Sign-In will not work.')
    return <>{children}</>
  }

  return (
    <GoogleProvider clientId={clientId}>
      {children}
    </GoogleProvider>
  )
}