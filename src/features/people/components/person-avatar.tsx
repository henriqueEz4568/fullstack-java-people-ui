import { cn } from '@/lib/utils'
import type { Person } from '@/features/people/types'

type PersonAvatarProps = {
  person: Pick<Person, 'firstName' | 'lastName'>
  className?: string
}

export function PersonAvatar({ person, className }: PersonAvatarProps) {
  const initials = `${person.firstName.charAt(0)}${person.lastName.charAt(0)}`.toUpperCase()

  return (
    <span
      aria-hidden
      className={cn('flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground', className)}
    >
      {initials}
    </span>
  )
}
