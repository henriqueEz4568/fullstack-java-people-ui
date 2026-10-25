import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PersonActions } from '@/features/people/components/person-actions'
import type { Person } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'

const SKELETON_ROWS = 4

function PeopleTableHeader() {
  return (
    <TableHeader>
      <TableRow>
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
          <TableRow key={person.id}>
            <TableCell className="text-muted-foreground">{person.id}</TableCell>
            <TableCell className="font-medium">{getFullName(person)}</TableCell>
            <TableCell className="font-mono">{person.document}</TableCell>
            <TableCell>{person.email}</TableCell>
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
