import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PersonActions } from '@/features/people/components/person-actions'
import { PersonAvatar } from '@/features/people/components/person-avatar'
import type { Person } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'

const SKELETON_ROWS = 4

function PeopleTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-muted/60 hover:bg-muted/60 [&>th]:text-xs [&>th]:font-semibold [&>th]:tracking-wide [&>th]:text-muted-foreground [&>th]:uppercase">
        <TableHead className="w-16">ID</TableHead>
        <TableHead>Nome</TableHead>
        <TableHead>Documento</TableHead>
        <TableHead>E-mail</TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export function PeopleTable({ people }: { people: Person[] }) {
  return (
    <Table>
      <PeopleTableHeader />
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id} className="hover:bg-accent/50">
            <TableCell className="font-mono text-muted-foreground">#{person.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <PersonAvatar person={person} />
                <span className="font-medium">{getFullName(person)}</span>
              </div>
            </TableCell>
            <TableCell className="font-mono">{person.document}</TableCell>
            <TableCell className="text-muted-foreground">{person.email}</TableCell>
            <TableCell>
              <PersonActions person={person} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function PeopleTableSkeleton() {
  return (
    <Table>
      <PeopleTableHeader />
      <TableBody>
        {Array.from({ length: SKELETON_ROWS }, (_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={5}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
