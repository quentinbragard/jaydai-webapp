// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react'
import { useSpace } from '@/contexts/SpaceContext'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Blocks, 
  Folder, 
  Plus,
  TrendingUp,
  Users,
  Building2,
  User,
  Activity,
  Target,
  Sparkles,
  ArrowRight,
  Clock,
  BarChart3
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user } = useAuth()
  const { currentSpace, currentOrganization, companyId } = useSpace()
  const router = useRouter()
  const [stats, setStats] = useState({
    templates: 0,
    blocks: 0,
    folders: 0,
    recentActivity: []
  })

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  // Get space-specific welcome message
  const getWelcomeMessage = () => {
    switch (currentSpace) {
      case 'personal':
        return 'Welcome to your personal workspace'
      case 'company':
        return 'Welcome to your company workspace'
      case 'organization':
        return `Welcome to ${currentOrganization?.name || 'your organization'}`
      default:
        return 'Welcome back'
    }
  }

  const getSpaceIcon = () => {
    switch (currentSpace) {
      case 'personal':
        return <User className="h-5 w-5" />
      case 'company':
        return <Building2 className="h-5 w-5" />
      case 'organization':
        return <Users className="h-5 w-5" />
    }
  }

  const quickActions = [
    {
      title: 'Create Template',
      description: 'Start with a new prompt template',
      icon: FileText,
      href: '/templates/new',
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Add Block',
      description: 'Create reusable content blocks',
      icon: Blocks,
      href: '/blocks/new',
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'New Folder',
      description: 'Organize your content',
      icon: Folder,
      href: '/folders/new',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20'
    }
  ]

  const spaceSpecificFeatures = () => {
    if (currentSpace === 'organization' || currentSpace === 'company') {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/analytics')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <BarChart3 className="h-8 w-8 text-primary" />
                <Badge variant="secondary">New</Badge>
              </div>
              <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
              <CardDescription>
                View usage statistics and team insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto">
                View Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/team')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-sm text-muted-foreground">12 members</span>
              </div>
              <CardTitle className="mt-4">Team Management</CardTitle>
              <CardDescription>
                Manage team members and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto">
                Manage Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/access-control')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-primary" />
                <Badge>Pro</Badge>
              </div>
              <CardTitle className="mt-4">Access Control</CardTitle>
              <CardDescription>
                Configure permissions and access rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto">
                Configure <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getGreeting()}, {user?.metadata?.name || 'there'}!
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              {getSpaceIcon()}
              <span className="capitalize">{currentSpace}</span>
            </Badge>
            <p className="text-muted-foreground">{getWelcomeMessage()}</p>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templates}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocks Created</CardTitle>
            <Blocks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blocks}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Folders</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.folders}</div>
            <p className="text-xs text-muted-foreground">
              Well organized workspace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Last used 2 minutes ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Button
                key={action.href}
                variant="outline"
                className="h-auto flex-col items-start p-4 space-y-2"
                onClick={() => router.push(action.href)}
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Space-specific features */}
      {spaceSpecificFeatures()}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions and updates</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Created new template "Email Response"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Blocks className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Added new block "Professional Tone"</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Folder className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Organized templates in "Marketing" folder</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}