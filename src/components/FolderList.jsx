import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { MoreHorizontal, Edit, Trash2, Folder, Calendar, FolderOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function FolderList({ folders = [], onEdit, onDelete }) {
  const [deleteFolder, setDeleteFolder] = useState(null)

  const handleDelete = () => {
    if (deleteFolder) {
      onDelete(deleteFolder.id)
      setDeleteFolder(null)
    }
  }

  const getParentFolderName = (parentId) => {
    const parent = folders.find(f => f.id === parentId)
    return parent ? parent.title : null
  }

  // Create a hierarchy structure for better display
  const createFolderHierarchy = (folders) => {
    const folderMap = new Map()
    const rootFolders = []

    // First, create a map of all folders
    folders.forEach(folder => {
      folderMap.set(folder.id, { ...folder, children: [] })
    })

    // Then, organize them into hierarchy
    folders.forEach(folder => {
      if (folder.parent_folder_id) {
        const parent = folderMap.get(folder.parent_folder_id)
        if (parent) {
          parent.children.push(folderMap.get(folder.id))
        } else {
          rootFolders.push(folderMap.get(folder.id))
        }
      } else {
        rootFolders.push(folderMap.get(folder.id))
      }
    })

    return rootFolders
  }

  const renderFolder = (folder, level = 0) => (
    <div key={folder.id} className={`${level > 0 ? 'ml-6 border-l-2 border-muted pl-4' : ''}`}>
      <Card className="hover:shadow-md transition-shadow mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {folder.children.length > 0 ? (
                  <FolderOpen className="h-4 w-4 text-blue-600" />
                ) : (
                  <Folder className="h-4 w-4 text-blue-600" />
                )}
                <CardTitle className="text-lg">{folder.title}</CardTitle>
                {level > 0 && (
                  <Badge variant="outline" className="text-xs">
                    Subfolder
                  </Badge>
                )}
              </div>
              {folder.description && (
                <CardDescription className="mt-1">
                  {folder.description}
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
                <DropdownMenuItem onClick={() => onEdit(folder)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDeleteFolder(folder)}
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
            {folder.created_at && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Created {formatDate(folder.created_at)}</span>
              </div>
            )}
            {folder.children.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {folder.children.length} subfolder{folder.children.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Render children */}
      {Array.isArray(folder.children) && folder.children.map(child => renderFolder(child, level + 1))}
    </div>
  )

  if (!Array.isArray(folders) || folders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No folders found. Create your first folder to organize your content.</p>
      </div>
    )
  }

  const folderHierarchy = createFolderHierarchy(folders)

  return (
    <>
      <div className="space-y-4">
        {Array.isArray(folderHierarchy) && folderHierarchy.map(folder => renderFolder(folder))}
      </div>

      <AlertDialog open={!!deleteFolder} onOpenChange={() => setDeleteFolder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the folder
              "{deleteFolder?.title}" and all its contents.
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

