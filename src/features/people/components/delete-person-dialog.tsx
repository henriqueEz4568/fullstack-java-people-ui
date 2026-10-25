import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ApiKeyForm } from '@/features/api-key/components/api-key-form'
import { useApiKey } from '@/features/api-key/use-api-key'
import { getErrorMessage, getErrorStatus } from '@/lib/api-error'
import { useDeletePerson } from '@/features/people/hooks'
import type { Person } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'

const INVALID_API_KEY_MESSAGE = 'API key inválida. Informe a chave correta para continuar.'

export function DeletePersonDialog({ person }: { person: Person }) {
  const [open, setOpen] = useState(false)
  const [apiKeyError, setApiKeyError] = useState<string>()
  const { apiKey, clearApiKey } = useApiKey()
  const deletePerson = useDeletePerson()
  const fullName = getFullName(person)

  const handleOpenChange = (nextOpen: boolean) => {
    if (deletePerson.isPending) {
      return
    }
    setOpen(nextOpen)
    setApiKeyError(undefined)
  }

  const handleDelete = (currentApiKey: string) =>
    deletePerson.mutate(
      { id: person.id, apiKey: currentApiKey },
      {
        onSuccess: () => {
          toast.success(`${fullName} foi excluída`)
          setOpen(false)
        },
        onError: (error) => {
          const status = getErrorStatus(error)
          if (status === 401) {
            clearApiKey()
            setApiKeyError(INVALID_API_KEY_MESSAGE)
            return
          }
          toast.error(getErrorMessage(error))
          if (status === 404) {
            setOpen(false)
          }
        },
      },
    )

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={`Excluir ${fullName}`} title="Excluir">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir {fullName}?</AlertDialogTitle>
          <AlertDialogDescription>
            {apiKey
              ? `O cadastro do documento ${person.document} será removido permanentemente.`
              : 'A exclusão é protegida. Informe a API key para continuar.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {apiKey ? (
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePerson.isPending}>Cancelar</AlertDialogCancel>
            <Button variant="destructive" disabled={deletePerson.isPending} onClick={() => handleDelete(apiKey)}>
              {deletePerson.isPending && <Loader2 className="animate-spin" />}
              Excluir
            </Button>
          </AlertDialogFooter>
        ) : (
          <ApiKeyForm
            error={apiKeyError}
            submitLabel="Continuar"
            onSaved={() => setApiKeyError(undefined)}
            secondaryAction={<AlertDialogCancel>Cancelar</AlertDialogCancel>}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
