import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { MoreHorizontal, Edit, Trash2, Blocks, Calendar, Eye, EyeOff } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const BLOCK_TYPE_LABELS = {
  role: 'Role',
  context: 'Context',
  goal: 'Goal',
  tone_style: 'Tone & Style',
  output_format: 'Output Format',
  audience: 'Audience',
  example: 'Example',
  constraint: 'Constraint',
  custom: 'Custom',
}

const BLOCK_TYPE_COLORS = {
  role: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  context: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  goal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  tone_style: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  output_format: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  audience: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  example: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  constraint: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
}

export function BlockList({ blocks = [], onEdit, onDelete }) {
  const [deleteBlock, setDeleteBlock] = useState(null)

  const handleDelete = () => {
    if (deleteBlock) {
      onDelete(deleteBlock.id)
      setDeleteBlock(null)
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Blocks className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No blocks found. Create your first block to get started.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(blocks) && blocks.map((block) => (
          <Card key={block.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs ${BLOCK_TYPE_COLORS[block.type] || BLOCK_TYPE_COLORS.custom}`}>
                      {BLOCK_TYPE_LABELS[block.type] || 'Custom'}
                    </Badge>
                    {block.published ? (
                      <Eye className="h-3 w-3 text-green-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-1">{block.title}</CardTitle>
                  {block.description && (
                    <CardDescription className="mt-1 line-clamp-2">
                      {block.description}
                    </CardDescription>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(block)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setDeleteBlock(block)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {block.created_at && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Created {formatDate(block.created_at)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant={block.published ? "default" : "secondary"} className="text-xs">
                    {block.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                {block.content && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                    {block.content}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteBlock} onOpenChange={() => setDeleteBlock(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the block
              "{deleteBlock?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

