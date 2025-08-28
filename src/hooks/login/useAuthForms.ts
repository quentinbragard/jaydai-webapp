// src/hooks/useAuthForms.ts
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useI18n } from '@/i18n/I18nProvider'

export function useAuthForms() {
  const { signIn, signUp, user, loading: authLoading } = useAuth()
  const { t } = useI18n()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')

  useEffect(() => {
    // Clear any prior errors when switching tabs
    setError('')
  }, [activeTab])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await signIn(loginEmail, loginPassword)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('auth.errors.signInFailed')
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!signupEmail || !signupPassword || !signupName) {
      setError(t('auth.errors.fillRequired'))
      return
    }
    if (signupPassword !== signupConfirmPassword) {
      setError(t('auth.errors.passwordsMismatch'))
      return
    }
    if (signupPassword.length < 6) {
      setError(t('auth.errors.passwordTooShort'))
      return
    }

    setIsLoading(true)
    try {
      await signUp(signupEmail, signupPassword, signupName)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('auth.errors.signUpFailed')
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // meta
    authLoading,
    user,
    t,

    // ui state
    activeTab,
    setActiveTab,
    isLoading,
    error,
    setError,

    // visibility toggles
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,

    // login state
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,

    // signup state
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupConfirmPassword,
    setSignupConfirmPassword,

    // handlers
    handleLogin,
    handleSignup,
  }
}
