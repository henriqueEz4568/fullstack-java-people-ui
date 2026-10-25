import { PersonActions } from '@/features/people/components/person-actions'
import type { Person } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'

export function PersonSummary({ person }: { person: Person }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <span className="font-medium">{getFullName(person)}</span>
        <span className="text-sm text-muted-foreground">{person.email}</span>
        <dl className="flex gap-4 text-sm">
          <div className="flex gap-1">
            <dt className="text-muted-foreground">Documento</dt>
            <dd className="font-mono">{person.document}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-muted-foreground">ID</dt>
            <dd>{person.id}</dd>
          </div>
        </dl>
      </div>
      <PersonActions person={person} />
    </div>
  )
}
