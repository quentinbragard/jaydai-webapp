import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, BarChart3, Target, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  space: 'personal' | 'company' | 'organization' | undefined
}

export function SpaceFeatures({ space }: Props) {
  const router = useRouter()
  if (space !== 'organization' && space !== 'company') return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/analytics')}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <BarChart3 className="h-8 w-8 text-primary" />
            <Badge variant="secondary">New</Badge>
          </div>
          <CardTitle className="mt-4">Analytics Dashboard</CardTitle>
          <CardDescription>View usage statistics and team insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            View Analytics <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/team')}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Users className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">12 members</span>
          </div>
          <CardTitle className="mt-4">Team Management</CardTitle>
          <CardDescription>Manage team members and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            Manage Team <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/access-control')}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Target className="h-8 w-8 text-primary" />
            <Badge>Pro</Badge>
          </div>
          <CardTitle className="mt-4">Access Control</CardTitle>
          <CardDescription>Configure permissions and access rules</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="p-0 h-auto">
            Configure <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

