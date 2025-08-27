import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const BLOCK_TYPES = [
  { value: 'role', label: 'Role' },
  { value: 'context', label: 'Context' },
  { value: 'goal', label: 'Goal' },
  { value: 'tone_style', label: 'Tone & Style' },
  { value: 'output_format', label: 'Output Format' },
  { value: 'audience', label: 'Audience' },
  { value: 'example', label: 'Example' },
  { value: 'constraint', label: 'Constraint' },
  { value: 'custom', label: 'Custom' },
]

export function BlockForm({ open, onOpenChange, block = null, onSubmit }) {
  const [formData, setFormData] = useState({
    title: block?.title || '',
    content: block?.content || '',
    description: block?.description || '',
    type: block?.type || '',
    published: block?.published || false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      title: '',
      content: '',
      description: '',
      type: '',
      published: false,
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{block ? 'Edit Block' : 'Create New Block'}</DialogTitle>
          <DialogDescription>
            {block ? 'Update your block details below.' : 'Fill in the details to create a new block.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter block title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Block Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange('type', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select block type" />
              </SelectTrigger>
              <SelectContent>
                {BLOCK_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter block description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Enter your block content here..."
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) => handleChange('published', checked)}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {block ? 'Update Block' : 'Create Block'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

