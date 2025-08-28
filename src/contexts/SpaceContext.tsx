// src/contexts/SpaceContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { toast } from 'sonner'

export type SpaceType = 'personal' | 'organization' | 'company'

interface Organization {
  id: string
  name: string
  image_url?: string
  banner_url?: string
  website_url?: string
}

interface SpaceContextType {
  currentSpace: SpaceType
  currentOrganization: Organization | null
  availableOrganizations: Organization[]
  companyId: string | null
  switchSpace: (space: SpaceType, organizationId?: string) => void
  hasCompanyAccess: boolean
  hasOrganizationAccess: boolean
  isLoading: boolean
}

const SpaceContext = createContext<SpaceContextType | undefined>(undefined)

export function SpaceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [currentSpace, setCurrentSpace] = useState<SpaceType>('personal')
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null)
  const [availableOrganizations, setAvailableOrganizations] = useState<Organization[]>([])
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user metadata and organizations
  useEffect(() => {
    const loadSpaceData = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        // Fetch user metadata
        const metadataResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/user/metadata`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          }
        )

        let metadataPayload: { data?: { company_id?: string } } = {}
        if (metadataResponse.ok) {
          metadataPayload = await metadataResponse.json()
          setCompanyId(metadataPayload.data?.company_id || null)
        }

        // Fetch available organizations
        const orgsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/organizations`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
          }
        )

        let orgsData: { data?: Organization[] } = {}
        if (orgsResponse.ok) {
          orgsData = await orgsResponse.json()
          setAvailableOrganizations(orgsData.data || [])
          
          // If user has organizations, set the first one as default when switching to org space
          if (orgsData.data && orgsData.data.length > 0) {
            // Check if there's a saved preference in localStorage
            const savedOrgId = localStorage.getItem('preferred_organization_id')
            const savedOrg = orgsData.data.find((org: Organization) => org.id === savedOrgId)
            if (savedOrg) {
              setCurrentOrganization(savedOrg)
            }
          }
        }

        // Restore saved space preference
        const savedSpace = localStorage.getItem('preferred_space') as SpaceType | null
        if (savedSpace) {
          const hasCompany = Boolean(metadataPayload?.data?.company_id)
          const hasOrgs = Boolean(orgsData?.data && orgsData.data.length > 0)
          if (savedSpace === 'personal' ||
              (savedSpace === 'company' && hasCompany) ||
              (savedSpace === 'organization' && hasOrgs)) {
            setCurrentSpace(savedSpace)
          }
        }
      } catch (error) {
        console.error('Error loading space data:', error)
        toast.error('Failed to load workspace data')
      } finally {
        setIsLoading(false)
      }
    }

    loadSpaceData()
  }, [user])

  const switchSpace = (space: SpaceType, organizationId?: string) => {
    // Validate space switch
    if (space === 'company' && !companyId) {
      toast.error('You do not have access to a company space')
      return
    }

    if (space === 'organization') {
      if (availableOrganizations.length === 0) {
        toast.error('You do not have access to any organizations')
        return
      }

      // If switching to org space, set the organization
      if (organizationId) {
        const org = availableOrganizations.find(o => o.id === organizationId)
        if (org) {
          setCurrentOrganization(org)
          localStorage.setItem('preferred_organization_id', organizationId)
        } else {
          toast.error('Invalid organization selected')
          return
        }
      } else if (!currentOrganization && availableOrganizations.length > 0) {
        // If no org selected, select the first one
        setCurrentOrganization(availableOrganizations[0])
        localStorage.setItem('preferred_organization_id', availableOrganizations[0].id)
      }
    }

    setCurrentSpace(space)
    localStorage.setItem('preferred_space', space)
    
    // Show confirmation
    const spaceName = space === 'personal' ? 'Personal' : 
                     space === 'company' ? 'Company' :
                     `${currentOrganization?.name || 'Organization'}`
    toast.success(`Switched to ${spaceName} space`)
  }

  const value = {
    currentSpace,
    currentOrganization,
    availableOrganizations,
    companyId,
    switchSpace,
    hasCompanyAccess: !!companyId,
    hasOrganizationAccess: availableOrganizations.length > 0,
    isLoading
  }

  return <SpaceContext.Provider value={value}>{children}</SpaceContext.Provider>
}

export const useSpace = () => {
  const context = useContext(SpaceContext)
  if (context === undefined) {
    throw new Error('useSpace must be used within a SpaceProvider')
  }
  return context
}
