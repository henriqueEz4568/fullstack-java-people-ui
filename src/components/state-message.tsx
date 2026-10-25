import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { IconBadge } from '@/components/icon-badge'

type StateMessageProps = {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  tone?: 'default' | 'destructive'
}

export function StateMessage({ icon, title, description, action, tone = 'default' }: StateMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed bg-muted/30 px-4 py-8 text-center">
      <IconBadge icon={icon} tone={tone === 'destructive' ? 'destructive' : 'primary'} className="size-11 rounded-full" />
      <p className="mt-1 font-medium">{title}</p>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
