// src/components/auth/LoginForm.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

interface LoginFormProps {
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  showPassword: boolean
  toggleShowPassword: () => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  toggleShowPassword,
  isLoading,
  onSubmit,
}: LoginFormProps) {
  const { t } = useI18n()

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email" className="text-foreground">{t('auth.labels.email')}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-email"
            type="email"
            placeholder={t('auth.placeholders.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password" className="text-foreground">{t('auth.labels.password')}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.placeholders.enterPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 smooth-transition">
          {t('auth.forgotPassword')}
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg button-gradient-hover smooth-transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('auth.buttons.signingIn')}
          </>
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" />
            {t('auth.buttons.signIn')}
          </>
        )}
      </Button>
    </form>
  )
}

