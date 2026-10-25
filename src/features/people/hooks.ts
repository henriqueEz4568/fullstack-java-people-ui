import { skipToken, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getErrorStatus } from '@/lib/api-error'
import { peopleApi } from '@/features/people/api'
import type { PersonInput } from '@/features/people/types'

const NATIONALITY_STALE_TIME = 5 * 60 * 1000

export const peopleKeys = {
  all: ['people'] as const,
  list: () => [...peopleKeys.all, 'list'] as const,
  byDocument: (document: string | null) => [...peopleKeys.all, 'document', document] as const,
  nationality: (document: string) => [...peopleKeys.all, 'nationality', document] as const,
}

export function usePeople() {
  return useQuery({
    queryKey: peopleKeys.list(),
    queryFn: peopleApi.list,
  })
}

export function usePersonByDocument(document: string | null) {
  return useQuery({
    queryKey: peopleKeys.byDocument(document),
    queryFn: document ? () => peopleApi.findByDocument(document) : skipToken,
  })
}

export function useNationality(document: string) {
  return useQuery({
    queryKey: peopleKeys.nationality(document),
    queryFn: () => peopleApi.findNationality(document),
    staleTime: NATIONALITY_STALE_TIME,
  })
}

export function useCreatePerson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: PersonInput) => peopleApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: peopleKeys.all }),
  })
}

export function useDeletePerson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, apiKey }: { id: number; apiKey: string }) => peopleApi.remove(id, apiKey),
    onSettled: (_data, error) => {
      if (!error || getErrorStatus(error) === 404) {
        return queryClient.invalidateQueries({ queryKey: peopleKeys.all })
      }
    },
  })
}
