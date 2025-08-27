import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FolderForm({ open, onOpenChange, folder = null, folders = [], onSubmit }) {
  const [formData, setFormData] = useState({
    title: folder?.title || '',
    description: folder?.description || '',
    parent_folder_id: folder?.parent_folder_id || 'none',
    type: folder?.type || 'user',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: '',
      description: '',
      parent_folder_id: 'none',
      type: 'user',
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Filter out the current folder from parent options to prevent circular references
  const availableParentFolders = Array.isArray(folders) ? folders.filter(f => f.id !== folder?.id) : []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{folder ? 'Edit Folder' : 'Create New Folder'}</DialogTitle>
          <DialogDescription>
            {folder ? 'Update your folder details below.' : 'Fill in the details to create a new folder.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter folder title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter folder description (optional)"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent_folder">Parent Folder</Label>
            <Select value={formData.parent_folder_id} onValueChange={(value) => handleChange('parent_folder_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select parent folder (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No parent folder</SelectItem>
                {availableParentFolders.map((parentFolder) => (
                  <SelectItem key={parentFolder.id} value={parentFolder.id}>
                    {parentFolder.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {folder ? 'Update Folder' : 'Create Folder'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

