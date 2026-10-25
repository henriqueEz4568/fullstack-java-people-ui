import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { TextField } from '@/components/text-field'
import { Button } from '@/components/ui/button'
import { getErrorMessage, getProblemDetail } from '@/lib/api-error'
import { capitalize } from '@/lib/format'
import { useCreatePerson } from '@/features/people/hooks'
import type { Person, PersonInput } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'
import { DOCUMENT_LENGTH, isPersonField, personRules } from '@/features/people/validation'

const EMPTY_PERSON: PersonInput = {
  document: '',
  firstName: '',
  lastName: '',
  email: '',
}

type CreatePersonFormProps = {
  secondaryAction?: ReactNode
  onCreated?: (person: Person) => void
}

function applyServerErrors(error: unknown, setError: UseFormSetError<PersonInput>) {
  const problem = getProblemDetail(error)
  const fieldErrors = Object.entries(problem?.errors ?? {}).filter(
    (entry): entry is [keyof PersonInput, string] => isPersonField(entry[0]),
  )

  if (fieldErrors.length > 0) {
    fieldErrors.forEach(([field, message]) => setError(field, { message: capitalize(message) }))
    return
  }

  if (problem?.status === 409) {
    setError('document', { message: problem.detail })
    return
  }

  toast.error(getErrorMessage(error))
}

export function CreatePersonForm({ secondaryAction, onCreated }: CreatePersonFormProps) {
  const createPerson = useCreatePerson()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PersonInput>({ defaultValues: EMPTY_PERSON })

  const onSubmit = handleSubmit((input) =>
    createPerson.mutate(input, {
      onSuccess: (person) => {
        toast.success(`${getFullName(person)} cadastrada com sucesso`)
        onCreated?.(person)
      },
      onError: (error) => applyServerErrors(error, setError),
    }),
  )

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextField
        id="person-document"
        label="Documento"
        inputMode="numeric"
        maxLength={DOCUMENT_LENGTH}
        placeholder="12345678901"
        description={`Somente números, ${DOCUMENT_LENGTH} dígitos.`}
        error={errors.document}
        {...register('document', personRules.document)}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="person-first-name"
          label="Nome"
          autoComplete="given-name"
          error={errors.firstName}
          {...register('firstName', personRules.firstName)}
        />
        <TextField
          id="person-last-name"
          label="Sobrenome"
          autoComplete="family-name"
          error={errors.lastName}
          {...register('lastName', personRules.lastName)}
        />
      </div>
      <TextField
        id="person-email"
        label="E-mail"
        type="email"
        autoComplete="email"
        error={errors.email}
        {...register('email', personRules.email)}
      />
      <div className="flex justify-end gap-2">
        {secondaryAction}
        <Button type="submit" disabled={createPerson.isPending}>
          {createPerson.isPending && <Loader2 className="animate-spin" />}
          Cadastrar
        </Button>
      </div>
    </form>
  )
}
