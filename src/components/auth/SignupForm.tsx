// src/components/auth/SignupForm.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Mail, User, Eye, EyeOff, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

interface SignupFormProps {
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  confirmPassword: string
  setConfirmPassword: (v: string) => void
  showPassword: boolean
  toggleShowPassword: () => void
  showConfirmPassword: boolean
  toggleShowConfirmPassword: () => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function SignupForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  toggleShowPassword,
  showConfirmPassword,
  toggleShowConfirmPassword,
  isLoading,
  onSubmit,
}: SignupFormProps) {
  const { t } = useI18n()
  const benefits: string[] = (t('auth.benefits.items') as unknown as string[]) || []

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name" className="text-foreground">{t('auth.labels.fullName')}</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-name"
            type="text"
            placeholder={t('auth.placeholders.fullName')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-foreground">{t('auth.labels.email')}</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-email"
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
        <Label htmlFor="signup-password" className="text-foreground">{t('auth.labels.password')}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.placeholders.password')}
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
        <p className="text-xs text-muted-foreground">{t('auth.benefits.passwordRule')}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password" className="text-foreground">{t('auth.labels.confirmPassword')}</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder={t('auth.placeholders.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="pl-10 pr-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="bg-accent/50 border border-accent rounded-lg p-4 space-y-3">
        <p className="text-sm font-medium text-foreground flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-primary" />
          {t('auth.benefits.title', 'What you\'ll get:')}
        </p>
        <div className="space-y-2">
          {benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
              {benefit}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg button-gradient-hover smooth-transition"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('auth.buttons.creatingAccount')}
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            {t('auth.buttons.createAccount')}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        {t('auth.legal.agreePrefix', 'By creating an account, you agree to our')}{' '}
        <a href="/terms" className="text-primary hover:text-primary/80 smooth-transition">
          {t('auth.legal.tos')}
        </a>{' '}
        {t('auth.legal.and')}{' '}
        <a href="/privacy" className="text-primary hover:text-primary/80 smooth-transition">
          {t('auth.legal.privacy')}
        </a>
      </p>
    </form>
  )
}

