// src/components/auth/AuthHero.tsx
'use client'

import { FileText, Layers, Shield, Zap } from 'lucide-react'
import { useI18n } from '@/i18n/I18nProvider'

export function AuthHero() {
  const { t } = useI18n()

  const features = [
    { icon: Layers, title: 'Smart Organization', description: 'Organize prompts with intelligent folders and tags' },
    { icon: Zap, title: 'Lightning Fast', description: 'Quick access to your most-used templates' },
    { icon: Shield, title: 'Secure & Private', description: 'Your prompts are encrypted and secure' },
  ]

  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center p-12 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 transform rotate-12 scale-150" />
      </div>

      <div className="relative z-10 max-w-lg animate-slide-up-fade-in">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center animate-gentle-pulse">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">Jaydai</span>
        </div>

        <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">
          {t('auth.hero.headlineTop')}
          <span className="text-primary block mt-2">{t('auth.hero.headlineBottom')}</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {t('auth.hero.tagline')}
        </p>

        <div className="space-y-6 mb-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-center space-x-4 animate-slide-up-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-primary rounded-full border-2 border-background" />
            ))}
          </div>
          <span className="text-sm">{t('auth.hero.cta')}</span>
        </div>
      </div>
    </div>
  )
}

