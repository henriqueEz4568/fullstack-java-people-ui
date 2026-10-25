import type { Person } from '@/features/people/types'

export function getFullName(person: Pick<Person, 'firstName' | 'lastName'>) {
  return `${person.firstName} ${person.lastName}`
}
