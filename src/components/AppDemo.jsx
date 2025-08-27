import { useState } from 'react'
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

// Import mock data
import { mockTemplates, mockBlocks, mockFolders } from './lib/mockData.js'

import './App.css'

function AppDemo() {
  const [activeTab, setActiveTab] = useState('templates')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Data states
  const [templates, setTemplates] = useState(mockTemplates)
  const [blocks, setBlocks] = useState(mockBlocks)
  const [folders, setFolders] = useState(mockFolders)
  
  // Form states
  const [templateFormOpen, setTemplateFormOpen] = useState(false)
  const [blockFormOpen, setBlockFormOpen] = useState(false)
  const [folderFormOpen, setFolderFormOpen] = useState(false)
  
  // Edit states
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [editingBlock, setEditingBlock] = useState(null)
  const [editingFolder, setEditingFolder] = useState(null)

  // Event handlers for templates
  const handleCreateTemplate = (data) => {
    const newTemplate = {
      ...data,
      id: Date.now().toString(),
      usage_count: 0,
      created_at: new Date().toISOString(),
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
    setTemplates(prev => [...prev, newTemplate])
    setTemplateFormOpen(false)
    toast.success('Template created successfully!')
  }

  const handleEditTemplate = (template) => {
    setEditingTemplate(template)
    setTemplateFormOpen(true)
  }

  const handleUpdateTemplate = (data) => {
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id ? { ...t, ...data } : t
      ))
      setEditingTemplate(null)
      setTemplateFormOpen(false)
      toast.success('Template updated successfully!')
    }
  }

  const handleDeleteTemplate = (id) => {
    setTemplates(prev => prev.filter(t => t.id !== id))
    toast.success('Template deleted successfully!')
  }

  // Event handlers for blocks
  const handleCreateBlock = (data) => {
    const newBlock = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
    setBlocks(prev => [...prev, newBlock])
    setBlockFormOpen(false)
    toast.success('Block created successfully!')
  }

  const handleEditBlock = (block) => {
    setEditingBlock(block)
    setBlockFormOpen(true)
  }

  const handleUpdateBlock = (data) => {
    if (editingBlock) {
      setBlocks(prev => prev.map(b => 
        b.id === editingBlock.id ? { ...b, ...data } : b
      ))
      setEditingBlock(null)
      setBlockFormOpen(false)
      toast.success('Block updated successfully!')
    }
  }

  const handleDeleteBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id))
    toast.success('Block deleted successfully!')
  }

  // Event handlers for folders
  const handleCreateFolder = (data) => {
    const newFolder = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      user_id: 'user1',
      organization_id: 'org1',
      company_id: 'company1'
    }
    setFolders(prev => [...prev, newFolder])
    setFolderFormOpen(false)
    toast.success('Folder created successfully!')
  }

  const handleEditFolder = (folder) => {
    setEditingFolder(folder)
    setFolderFormOpen(true)
  }

  const handleUpdateFolder = (data) => {
    if (editingFolder) {
      setFolders(prev => prev.map(f => 
        f.id === editingFolder.id ? { ...f, ...data } : f
      ))
      setEditingFolder(null)
      setFolderFormOpen(false)
      toast.success('Folder updated successfully!')
    }
  }

  const handleDeleteFolder = (id) => {
    setFolders(prev => prev.filter(f => f.id !== id))
    toast.success('Folder deleted successfully!')
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
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">Demo</span>
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
                <TemplateList
                  templates={filteredTemplates}
                  folders={folders}
                  onEdit={handleEditTemplate}
                  onDelete={handleDeleteTemplate}
                />
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
                <BlockList
                  blocks={filteredBlocks}
                  onEdit={handleEditBlock}
                  onDelete={handleDeleteBlock}
                />
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
                <FolderList
                  folders={filteredFolders}
                  onEdit={handleEditFolder}
                  onDelete={handleDeleteFolder}
                />
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

      <Toaster />
    </div>
  )
}

export default AppDemo

