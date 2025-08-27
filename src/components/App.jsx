import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Input } from '@/components/ui/input.jsx'
import { toast, Toaster } from 'sonner'
import { Plus, Folder, FileText, Blocks, Search } from 'lucide-react'

// Import our components
import { TemplateForm } from './components/TemplateForm.jsx'
import { BlockForm } from './components/BlockForm.jsx'
import { FolderForm } from './components/FolderForm.jsx'
import { TemplateList } from './components/TemplateList.jsx'
import { BlockList } from './components/BlockList.jsx'
import { FolderList } from './components/FolderList.jsx'

// Import API functions
import { templatesApi, blocksApi, foldersApi } from './lib/api.js'

import './App.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function AppContent() {
  const [activeTab, setActiveTab] = useState('templates')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Form states
  const [templateFormOpen, setTemplateFormOpen] = useState(false)
  const [blockFormOpen, setBlockFormOpen] = useState(false)
  const [folderFormOpen, setFolderFormOpen] = useState(false)
  
  // Edit states
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [editingBlock, setEditingBlock] = useState(null)
  const [editingFolder, setEditingFolder] = useState(null)

  const queryClientInstance = useQueryClient()

  // Queries
  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: async () => {
      try {
        const response = await templatesApi.getAll()
        return response.data
      } catch (error) {
        console.error('Error fetching templates:', error)
        return []
      }
    },
  })

  const { data: blocks = [], isLoading: blocksLoading } = useQuery({
    queryKey: ['blocks'],
    queryFn: async () => {
      try {
        const response = await blocksApi.getAll()
        return response.data
      } catch (error) {
        console.error('Error fetching blocks:', error)
        return []
      }
    },
  })

  const { data: folders = [], isLoading: foldersLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      try {
        const response = await foldersApi.getAll()
        return response.data
      } catch (error) {
        console.error('Error fetching folders:', error)
        return []
      }
    },
  })

  // Mutations for templates
  const createTemplateMutation = useMutation({
    mutationFn: templatesApi.create,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['templates'])
      setTemplateFormOpen(false)
      toast.success('Template created successfully!')
    },
    onError: (error) => {
      toast.error('Failed to create template: ' + (error.response?.data?.detail || error.message))
    },
  })

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, data }) => templatesApi.update(id, data),
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['templates'])
      setEditingTemplate(null)
      setTemplateFormOpen(false)
      toast.success('Template updated successfully!')
    },
    onError: (error) => {
      toast.error('Failed to update template: ' + (error.response?.data?.detail || error.message))
    },
  })

  const deleteTemplateMutation = useMutation({
    mutationFn: templatesApi.delete,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['templates'])
      toast.success('Template deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete template: ' + (error.response?.data?.detail || error.message))
    },
  })

  // Mutations for blocks
  const createBlockMutation = useMutation({
    mutationFn: blocksApi.create,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['blocks'])
      setBlockFormOpen(false)
      toast.success('Block created successfully!')
    },
    onError: (error) => {
      toast.error('Failed to create block: ' + (error.response?.data?.detail || error.message))
    },
  })

  const updateBlockMutation = useMutation({
    mutationFn: ({ id, data }) => blocksApi.update(id, data),
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['blocks'])
      setEditingBlock(null)
      setBlockFormOpen(false)
      toast.success('Block updated successfully!')
    },
    onError: (error) => {
      toast.error('Failed to update block: ' + (error.response?.data?.detail || error.message))
    },
  })

  const deleteBlockMutation = useMutation({
    mutationFn: blocksApi.delete,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['blocks'])
      toast.success('Block deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete block: ' + (error.response?.data?.detail || error.message))
    },
  })

  // Mutations for folders
  const createFolderMutation = useMutation({
    mutationFn: foldersApi.create,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['folders'])
      setFolderFormOpen(false)
      toast.success('Folder created successfully!')
    },
    onError: (error) => {
      toast.error('Failed to create folder: ' + (error.response?.data?.detail || error.message))
    },
  })

  const updateFolderMutation = useMutation({
    mutationFn: ({ id, data }) => foldersApi.update(id, data),
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['folders'])
      setEditingFolder(null)
      setFolderFormOpen(false)
      toast.success('Folder updated successfully!')
    },
    onError: (error) => {
      toast.error('Failed to update folder: ' + (error.response?.data?.detail || error.message))
    },
  })

  const deleteFolderMutation = useMutation({
    mutationFn: foldersApi.delete,
    onSuccess: () => {
      queryClientInstance.invalidateQueries(['folders'])
      toast.success('Folder deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete folder: ' + (error.response?.data?.detail || error.message))
    },
  })

  // Event handlers
  const handleCreateTemplate = (data) => {
    createTemplateMutation.mutate({ ...data, type: 'user' })
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setTemplateFormOpen(true)
  }

  const handleUpdateTemplate = (data) => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data })
    }
  }

  const handleDeleteTemplate = (id) => {
    deleteTemplateMutation.mutate(id)
  }

  const handleCreateBlock = (data) => {
    createBlockMutation.mutate(data)
  }

  const handleEditBlock = (block) => {
    setEditingBlock(block)
    setBlockFormOpen(true)
  }

  const handleUpdateBlock = (data) => {
    if (editingBlock) {
      updateBlockMutation.mutate({ id: editingBlock.id, data })
    }
  }

  const handleDeleteBlock = (id) => {
    deleteBlockMutation.mutate(id)
  }

  const handleCreateFolder = (data) => {
    createFolderMutation.mutate(data)
  }

  const handleEditFolder = (folder) => {
    setEditingFolder(folder)
    setFolderFormOpen(true)
  }

  const handleUpdateFolder = (data) => {
    if (editingFolder) {
      updateFolderMutation.mutate({ id: editingFolder.id, data })
    }
  }

  const handleDeleteFolder = (id) => {
    deleteFolderMutation.mutate(id)
  }

  // Filter data based on search query
  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBlocks = blocks.filter(block =>
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFolders = folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Jaydai Prompt Manager</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEditingTemplate(null)
                  setTemplateFormOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEditingBlock(null)
                  setBlockFormOpen(true)
                }}
              >
                <Blocks className="w-4 h-4 mr-2" />
                New Block
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setEditingFolder(null)
                  setFolderFormOpen(true)
                }}
              >
                <Folder className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates, blocks, and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Templates ({filteredTemplates.length})</span>
            </TabsTrigger>
            <TabsTrigger value="blocks" className="flex items-center space-x-2">
              <Blocks className="w-4 h-4" />
              <span>Blocks ({filteredBlocks.length})</span>
            </TabsTrigger>
            <TabsTrigger value="folders" className="flex items-center space-x-2">
              <Folder className="w-4 h-4" />
              <span>Folders ({filteredFolders.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>
                  Manage your prompt templates here. Create, edit, and organize your templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="text-center py-8">Loading templates...</div>
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
          </TabsContent>

          <TabsContent value="blocks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocks</CardTitle>
                <CardDescription>
                  Manage your prompt blocks here. Blocks are reusable components for your templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blocksLoading ? (
                  <div className="text-center py-8">Loading blocks...</div>
                ) : (
                  <BlockList
                    blocks={filteredBlocks}
                    onEdit={handleEditBlock}
                    onDelete={handleDeleteBlock}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="folders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Folders</CardTitle>
                <CardDescription>
                  Organize your templates and blocks with folders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {foldersLoading ? (
                  <div className="text-center py-8">Loading folders...</div>
                ) : (
                  <FolderList
                    folders={filteredFolders}
                    onEdit={handleEditFolder}
                    onDelete={handleDeleteFolder}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Forms */}
      <TemplateForm
        open={templateFormOpen}
        onOpenChange={setTemplateFormOpen}
        template={editingTemplate}
        folders={folders}
        onSubmit={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
      />

      <BlockForm
        open={blockFormOpen}
        onOpenChange={setBlockFormOpen}
        block={editingBlock}
        onSubmit={editingBlock ? handleUpdateBlock : handleCreateBlock}
      />

      <FolderForm
        open={folderFormOpen}
        onOpenChange={setFolderFormOpen}
        folder={editingFolder}
        folders={folders}
        onSubmit={editingFolder ? handleUpdateFolder : handleCreateFolder}
      />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App

