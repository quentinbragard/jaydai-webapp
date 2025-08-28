import { Badge } from '@/components/ui/badge'
import { getSpaceIcon } from '@/lib/dashboard'

type Props = {
  space: 'personal' | 'company' | 'organization' | undefined
}

export function SpaceBadge({ space }: Props) {
  return (
    <Badge variant="outline" className="gap-1">
      {getSpaceIcon(space)}
      <span className="capitalize">{space}</span>
    </Badge>
  )
}

