// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { toast, Toaster } from 'sonner'
import { Plus, Folder, FileText, Blocks, Search, LogOut, User, Settings } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Import our components
import { TemplateForm } from '@/components/TemplateForm'
import { BlockForm } from '@/components/BlockForm'
import { FolderForm } from '@/components/FolderForm'
import { TemplateList } from '@/components/TemplateList'
import { BlockList } from '@/components/BlockList'
import { FolderList } from '@/components/FolderList'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuth } from '@/contexts/AuthContext'

// Import API functions
import { templatesApi, blocksApi, foldersApi } from '@/lib/api'

import '@/app/globals.css'

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
  const { user, signOut } = useAuth()
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
        console.log('Templates API response:', response)
        return response.data
      } catch (error) {
        console.error('Error fetching templates:', error)
        return []
      }
    },
    enabled: !!user, // Only fetch when user is authenticated
  })

  const { data: blocks = [], isLoading: blocksLoading } = useQuery({
    queryKey: ['blocks'],
    queryFn: async () => {
      try {
        const response = await blocksApi.getAll()
        console.log('Blocks API response:', response)
        return response.data
      } catch (error) {
        console.error('Error fetching blocks:', error)
        return []
      }
    },
    enabled: !!user,
  })

  const { data: folders = [], isLoading: foldersLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      try {
        const response = await foldersApi.getAll()
        console.log('Folders API response:', response)
        return response.data
      } catch (error) {
        console.error('Error fetching folders:', error)
        return []
      }
    },
    enabled: !!user,
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
  const filteredTemplates = Array.isArray(templates) ? templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  const filteredBlocks = Array.isArray(blocks) ? blocks.filter(block =>
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  const filteredFolders = Array.isArray(folders) ? folders.filter(folder =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
  ) : []

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return '?'
    const name = user.metadata?.name || user.email
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-gentle-pulse">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Jaydai</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditingTemplate(null)
                    setTemplateFormOpen(true)
                  }}
                  className="border-border hover:bg-accent smooth-transition"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Template
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditingBlock(null)
                    setBlockFormOpen(true)
                  }}
                  className="border-border hover:bg-accent smooth-transition"
                >
                  <Blocks className="w-4 h-4 mr-2" />
                  Block
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setEditingFolder(null)
                    setFolderFormOpen(true)
                  }}
                  className="border-border hover:bg-accent smooth-transition"
                >
                  <Folder className="w-4 h-4 mr-2" />
                  Folder
                </Button>
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={user?.metadata?.name || user?.email} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-popover border-border" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-popover-foreground">
                        {user?.metadata?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="hover:bg-accent">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem onClick={signOut} className="hover:bg-destructive/10 text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6 animate-slide-up-fade-in">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates, blocks, and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border focus:border-primary enhanced-focus smooth-transition"
            />
          </div>
        </div>

        {/* Mobile Create Buttons */}
        <div className="md:hidden flex space-x-2 mb-6 animate-slide-up-fade-in">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setEditingTemplate(null)
              setTemplateFormOpen(true)
            }}
            className="flex-1 border-border hover:bg-accent smooth-transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            Template
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setEditingBlock(null)
              setBlockFormOpen(true)
            }}
            className="flex-1 border-border hover:bg-accent smooth-transition"
          >
            <Blocks className="w-4 h-4 mr-2" />
            Block
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setEditingFolder(null)
              setFolderFormOpen(true)
            }}
            className="flex-1 border-border hover:bg-accent smooth-transition"
          >
            <Folder className="w-4 h-4 mr-2" />
            Folder
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-slide-up-fade-in">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="templates" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Templates ({filteredTemplates.length})</span>
              <span className="sm:hidden">({filteredTemplates.length})</span>
            </TabsTrigger>
            <TabsTrigger value="blocks" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
              <Blocks className="w-4 h-4" />
              <span className="hidden sm:inline">Blocks ({filteredBlocks.length})</span>
              <span className="sm:hidden">({filteredBlocks.length})</span>
            </TabsTrigger>
            <TabsTrigger value="folders" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground">
              <Folder className="w-4 h-4" />
              <span className="hidden sm:inline">Folders ({filteredFolders.length})</span>
              <span className="sm:hidden">({filteredFolders.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Templates</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your prompt templates here. Create, edit, and organize your templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {templatesLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-4 animate-pulse-glow flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Loading templates...</p>
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
          </TabsContent>

          <TabsContent value="blocks" className="mt-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Blocks</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your prompt blocks here. Blocks are reusable components for your templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blocksLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-4 animate-pulse-glow flex items-center justify-center">
                      <Blocks className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Loading blocks...</p>
                  </div>
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
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Folders</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Organize your templates and blocks with folders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {foldersLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg mx-auto mb-4 animate-pulse-glow flex items-center justify-center">
                      <Folder className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">Loading folders...</p>
                  </div>
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
    <ProtectedRoute>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <Toaster 
          theme="system"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </QueryClientProvider>
    </ProtectedRoute>
  )
}

export default App