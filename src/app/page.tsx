// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/i18n/I18nProvider';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const { locale } = useI18n();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace(`/${locale}/dashboard`);
      } else {
        router.replace(`/${locale}/login`);
      }
    }
  }, [user, loading, router, locale]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto animate-pulse">
          <div className="w-6 h-6 bg-primary rounded-lg" />
        </div>
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    </div>
  );
}
