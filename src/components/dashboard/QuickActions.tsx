import { Button } from '@/components/ui/button'
import type { QuickAction } from '@/lib/dashboard'
import { useRouter } from 'next/navigation'

type Props = {
  actions: QuickAction[]
}

export function QuickActions({ actions }: Props) {
  const router = useRouter()
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {actions.map((action) => (
        <Button
          key={action.href}
          variant="outline"
          className="h-auto flex-col items-start p-4 space-y-2"
          onClick={() => router.push(action.href)}
        >
          <div className={`p-2 rounded-lg ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <div className="space-y-1 text-left">
            <div className="font-medium">{action.title}</div>
            <div className="text-xs text-muted-foreground">{action.description}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}

