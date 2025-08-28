import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Blocks, FileText, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Created new template &quot;Email Response&quot;</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Blocks className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Added new block &quot;Professional Tone&quot;</p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Folder className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Organized templates in &quot;Marketing&quot; folder</p>
              <p className="text-xs text-muted-foreground">Yesterday</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
