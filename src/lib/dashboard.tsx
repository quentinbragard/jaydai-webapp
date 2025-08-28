import { Building2, User, Users } from 'lucide-react'
import type { ReactNode } from 'react'

type Space = 'personal' | 'company' | 'organization' | undefined

export function getWelcomeMessage(space: Space, organizationName?: string) {
  switch (space) {
    case 'personal':
      return 'Welcome to your personal workspace'
    case 'company':
      return 'Welcome to your company workspace'
    case 'organization':
      return `Welcome to ${organizationName || 'your organization'}`
    default:
      return 'Welcome back'
  }
}

export function getSpaceIcon(space: Space): ReactNode {
  switch (space) {
    case 'personal':
      return <User className="h-5 w-5" />
    case 'company':
      return <Building2 className="h-5 w-5" />
    case 'organization':
      return <Users className="h-5 w-5" />
    default:
      return null
  }
}

export type QuickAction = {
  title: string
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  href: string
  color: string
}

