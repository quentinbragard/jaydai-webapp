// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect to dashboard if logged in
        router.replace('/dashboard');
      } else {
        // Redirect to login if not logged in
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto animate-pulse">
          <div className="w-6 h-6 bg-primary rounded-lg" />
        </div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}