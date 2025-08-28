// src/components/AppSidebar.tsx
'use client'

import React from 'react'
import { useSpace } from '@/contexts/SpaceContext'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  Blocks,
  Folder,
  Home,
  Settings,
  Users,
  BarChart3,
  BookOpen,
  ChevronDown,
  Building2,
  User,
  LogOut,
  ChevronsUpDown,
  Shield,
  Newspaper,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export function AppSidebar() {
  const { user, signOut } = useAuth()
  const { 
    currentSpace, 
    currentOrganization, 
    availableOrganizations,
    companyId,
    switchSpace,
    hasCompanyAccess,
    hasOrganizationAccess 
  } = useSpace()
  const router = useRouter()
  const pathname = usePathname()

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '?'
    const name = user.metadata?.name || user.email
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Navigation items based on current space
  const getNavigationItems = () => {
    const baseItems = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: Home,
      },
      {
        title: 'Templates',
        href: '/templates',
        icon: FileText,
      },
      {
        title: 'Blocks',
        href: '/blocks',
        icon: Blocks,
      },
      {
        title: 'Folders',
        href: '/folders',
        icon: Folder,
      },
    ]

    // Add space-specific items
    if (currentSpace === 'organization' || currentSpace === 'company') {
      baseItems.push(
        {
          title: 'Analytics',
          href: '/analytics',
          icon: BarChart3,
        },
        {
          title: 'Access Control',
          href: '/access-control',
          icon: Shield,
        },
        {
          title: 'Team',
          href: '/team',
          icon: Users,
        }
      )
    }

    return baseItems
  }

  // Portal items (always visible)
  const portalItems = [
    {
      title: 'News & Updates',
      href: '/portal/news',
      icon: Newspaper,
    },
    {
      title: 'Learning Center',
      href: '/portal/learning',
      icon: GraduationCap,
    },
    {
      title: 'Best Practices',
      href: '/portal/best-practices',
      icon: BookOpen,
    },
  ]

  const handleSpaceChange = (value: string) => {
    if (value.startsWith('org-')) {
      const orgId = value.replace('org-', '')
      switchSpace('organization', orgId)
    } else {
      switchSpace(value as 'personal' | 'company')
    }
  }

  const getSpaceIcon = () => {
    switch (currentSpace) {
      case 'personal':
        return <User className="h-4 w-4" />
      case 'company':
        return <Building2 className="h-4 w-4" />
      case 'organization':
        return <Users className="h-4 w-4" />
    }
  }

  const getSpaceName = () => {
    switch (currentSpace) {
      case 'personal':
        return 'Personal Space'
      case 'company':
        return 'Company Space'
      case 'organization':
        return currentOrganization?.name || 'Organization'
    }
  }

  const getSpaceValue = () => {
    if (currentSpace === 'organization' && currentOrganization) {
      return `org-${currentOrganization.id}`
    }
    return currentSpace
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-gentle-pulse">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Jaydai</span>
          </div>
        </div>
        
        {/* Space Selector */}
        <div className="px-3 pb-3">
          <Select value={getSpaceValue()} onValueChange={handleSpaceChange}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                {getSpaceIcon()}
                <SelectValue>{getSpaceName()}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Personal Space</span>
                </div>
              </SelectItem>
              
              {hasCompanyAccess && (
                <SelectItem value="company">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span>Company Space</span>
                  </div>
                </SelectItem>
              )}
              
              {hasOrganizationAccess && availableOrganizations.length > 0 && (
                <>
                  <Separator className="my-1" />
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    Organizations
                  </div>
                  {availableOrganizations.map((org) => (
                    <SelectItem key={org.id} value={`org-${org.id}`}>
                      <div className="flex items-center gap-2">
                        {org.image_url ? (
                          <img 
                            src={org.image_url} 
                            alt={org.name}
                            className="h-4 w-4 rounded"
                          />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                        <span>{org.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getNavigationItems().map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    isActive={pathname === item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Portal Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Portal
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portalItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href)}
                    isActive={pathname === item.href}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => router.push('/settings')}
                  isActive={pathname === '/settings'}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="" alt={user?.metadata?.name || user?.email} />
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">
                      {user?.metadata?.name || 'User'}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </div>
                  </div>
                  <ChevronsUpDown className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[--radix-dropdown-menu-trigger-width]" 
                align="start"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={signOut} 
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}