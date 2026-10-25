import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type StateMessageProps = {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  tone?: 'default' | 'destructive'
}

export function StateMessage({ icon: Icon, title, description, action, tone = 'default' }: StateMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center">
      <Icon className={cn('size-6 text-muted-foreground', tone === 'destructive' && 'text-destructive')} />
      <p className="font-medium">{title}</p>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
