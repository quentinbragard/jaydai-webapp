// src/app/(dashboard)/templates/page.tsx
'use client';

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSpace } from '@/contexts/SpaceContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Plus, Search, FileText, User, Building2, Users } from 'lucide-react'
import { TemplateForm } from '@/components/TemplateForm'
import { TemplateList } from '@/components/TemplateList'
import { templatesApi, foldersApi } from '@/lib/api'
import { useI18n } from '@/i18n/I18nProvider'

type Template = {
  id: string
  title?: string
  content?: string
  description?: string
  user_id?: string
  company_id?: string
  organization_id?: string
  folder_id?: string | null
  created_at?: string
  is_free?: boolean
  usage_count?: number
}

type Folder = {
  id: string
  title?: string
  user_id?: string
  company_id?: string
  organization_id?: string
}

export default function TemplatesPage() {
  const { user } = useAuth()
  const { currentSpace, currentOrganization, companyId } = useSpace()
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState('')
  const [templateFormOpen, setTemplateFormOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const queryClient = useQueryClient()

  // Fetch templates based on current space
  const { data: templates = [], isLoading: templatesLoading } = useQuery<Template[]>({
    queryKey: ['templates', currentSpace, currentOrganization?.id, companyId],
    queryFn: async () => {
      try {
        const response = await templatesApi.getAll()
        const raw = (response as { data?: unknown }).data as unknown
        const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
        let allTemplates: unknown[] = []
        if (Array.isArray(raw)) {
          allTemplates = raw
        } else if (isObj(raw) && Array.isArray(raw.results as unknown[])) {
          allTemplates = raw.results as unknown[]
        } else if (isObj(raw) && Array.isArray(raw.data as unknown[])) {
          allTemplates = raw.data as unknown[]
        }
        
        // Filter templates based on current space
        return (allTemplates as Template[]).filter(template => {
          switch (currentSpace) {
            case 'personal':
              return template.user_id === user?.id
            case 'company':
              return template.company_id === companyId
            case 'organization':
              return template.organization_id === currentOrganization?.id
            default:
              return false
          }
        })
      } catch (error) {
        console.error('Error fetching templates:', error)
        return []
      }
    },
    enabled: !!user,
  })

  // Fetch folders for the current space
  const { data: folders = [] } = useQuery<Folder[]>({
    queryKey: ['folders', currentSpace, currentOrganization?.id, companyId],
    queryFn: async () => {
      try {
        const response = await foldersApi.getAll()
        const raw = (response as { data?: unknown }).data as unknown
        const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
        let allFolders: unknown[] = []
        if (Array.isArray(raw)) {
          allFolders = raw
        } else if (isObj(raw) && Array.isArray(raw.results as unknown[])) {
          allFolders = raw.results as unknown[]
        } else if (isObj(raw) && Array.isArray(raw.data as unknown[])) {
          allFolders = raw.data as unknown[]
        }
        
        // Filter folders based on current space
        return (allFolders as Folder[]).filter(folder => {
          switch (currentSpace) {
            case 'personal':
              return folder.user_id === user?.id
            case 'company':
              return folder.company_id === companyId
            case 'organization':
              return folder.organization_id === currentOrganization?.id
            default:
              return false
          }
        })
      } catch (error) {
        console.error('Error fetching folders:', error)
        return []
      }
    },
    enabled: !!user,
  })

  // Template mutations
  const createTemplateMutation = useMutation({
    mutationFn: async (data: Partial<Template> & Record<string, unknown>) => {
      // Add space-specific fields
      const templateData: Partial<Template> & Record<string, unknown> = { ...data }
      
      switch (currentSpace) {
        case 'personal':
          templateData.user_id = user?.id
          break
        case 'company':
          if (companyId) templateData.company_id = companyId
          break
        case 'organization':
          if (currentOrganization?.id) templateData.organization_id = currentOrganization.id
          break
      }
      
      return templatesApi.create(templateData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
      setTemplateFormOpen(false)
      toast.success(t('toasts.templateCreated'))
    },
    onError: () => {
      toast.error(t('toasts.templateCreateFailed'))
    },
  })

  const updateTemplateMutation = useMutation({
    mutationFn: (vars: { id: string, data: Partial<Template> }) => templatesApi.update(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
      setEditingTemplate(null)
      setTemplateFormOpen(false)
      toast.success(t('toasts.templateUpdated'))
    },
    onError: () => {
      toast.error(t('toasts.templateUpdateFailed'))
    },
  })

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: string) => templatesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] })
      toast.success(t('toasts.templateDeleted'))
    },
    onError: () => {
      toast.error(t('toasts.templateDeleteFailed'))
    },
  })

  // Event handlers
  const handleCreateTemplate = (data: Partial<Template> & Record<string, unknown>) => {
    createTemplateMutation.mutate({ ...data, type: currentSpace === 'personal' ? 'user' : currentSpace })
  }

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template)
    setTemplateFormOpen(true)
  }

  const handleUpdateTemplate = (data: Partial<Template>) => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data })
    }
  }

  const handleDeleteTemplate = (id: string) => {
    deleteTemplateMutation.mutate(id)
  }

  // Filter templates based on search
  const filteredTemplates = templates.filter(template =>
    template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  const getSpaceLabel = () => {
    switch (currentSpace) {
      case 'personal':
        return 'Personal Templates'
      case 'company':
        return 'Company Templates'
      case 'organization':
        return `${currentOrganization?.name || 'Organization'} Templates`
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('templates.title')}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="gap-1">
              {getSpaceIcon()}
              <span>{getSpaceLabel()}</span>
            </Badge>
            <p className="text-muted-foreground">
              {t('templates.count', { count: filteredTemplates.length, suffix: filteredTemplates.length !== 1 ? 's' : '' })}
            </p>
          </div>
        </div>
        
        <Button onClick={() => {
          setEditingTemplate(null)
          setTemplateFormOpen(true)
        }}>
          <Plus className="mr-2 h-4 w-4" />
          {t('templates.newTemplate')}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('templates.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Templates List */}
      <Card>
        <CardHeader>
          <CardTitle>{t('templates.yourTemplates')}</CardTitle>
          <CardDescription>
            {t('templates.manageAndOrganize', { space: currentSpace === 'personal' ? 'your personal' : currentSpace === 'company' ? 'the company' : (currentOrganization?.name || 'organization') })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {templatesLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-4 animate-pulse-glow flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <p className="text-muted-foreground">{t('templates.loadingTemplates')}</p>
            </div>
          ) : (
            <TemplateList
              templates={filteredTemplates}
              folders={folders}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
            />
          )}
        </CardContent>
      </Card>

      {/* Template Form Dialog */}
      <TemplateForm
        open={templateFormOpen}
        onOpenChange={setTemplateFormOpen}
        template={editingTemplate}
        folders={folders}
        onSubmit={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
      />
    </div>
  )
}
