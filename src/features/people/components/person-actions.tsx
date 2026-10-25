import { DeletePersonDialog } from '@/features/people/components/delete-person-dialog'
import { NationalityDialog } from '@/features/people/components/nationality-dialog'
import type { Person } from '@/features/people/types'

export function PersonActions({ person }: { person: Person }) {
  return (
    <div className="flex justify-end gap-1">
      <NationalityDialog person={person} />
      <DeletePersonDialog person={person} />
    </div>
  )
}
