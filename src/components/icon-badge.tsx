import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type IconBadgeProps = {
  icon: LucideIcon
  tone?: 'primary' | 'destructive'
  className?: string
}

const TONE_CLASSES = {
  primary: 'bg-secondary text-primary',
  destructive: 'bg-destructive/10 text-destructive',
}

export function IconBadge({ icon: Icon, tone = 'primary', className }: IconBadgeProps) {
  return (
    <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', TONE_CLASSES[tone], className)}>
      <Icon className="size-4.5" />
    </span>
  )
}
