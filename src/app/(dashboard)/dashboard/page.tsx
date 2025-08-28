// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { useState } from 'react'
import { useSpace } from '@/contexts/SpaceContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SpaceBadge } from '@/components/dashboard/SpaceBadge'
import { StatsCards, type DashboardStats } from '@/components/dashboard/StatsCards'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { SpaceFeatures } from '@/components/dashboard/SpaceFeatures'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { useGreeting } from '@/hooks/useGreeting'
import { getWelcomeMessage, type QuickAction } from '@/lib/dashboard'
import { FileText, Blocks, Folder, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user } = useAuth()
  const { currentSpace, currentOrganization } = useSpace()
  const router = useRouter()
  const greeting = useGreeting()
  const [stats] = useState<DashboardStats>({ templates: 0, blocks: 0, folders: 0 })

  const quickActions: QuickAction[] = [
    {
      title: 'Create Template',
      description: 'Start with a new prompt template',
      icon: FileText,
      href: '/templates/new',
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Add Block',
      description: 'Create reusable content blocks',
      icon: Blocks,
      href: '/blocks/new',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'New Folder',
      description: 'Organize your content',
      icon: Folder,
      href: '/folders/new',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, {user?.metadata?.name || 'there'}!
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <SpaceBadge space={currentSpace} />
            <p className="text-muted-foreground">
              {getWelcomeMessage(currentSpace, currentOrganization?.name)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/templates')}>
            Browse Templates
          </Button>
          <Button onClick={() => router.push('/templates/new')}>
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <QuickActions actions={quickActions} />
        </CardContent>
      </Card>

      {/* Space-specific features */}
      <SpaceFeatures space={currentSpace} />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
