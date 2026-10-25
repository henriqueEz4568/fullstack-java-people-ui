import { useId, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@/components/text-field'
import { Button } from '@/components/ui/button'
import { useApiKey } from '@/features/api-key/use-api-key'
import { API_KEY_HEADER } from '@/lib/api'

type ApiKeyFormValues = {
  apiKey: string
}

type ApiKeyFormProps = {
  error?: string
  submitLabel?: string
  secondaryAction?: ReactNode
  onSaved?: () => void
}

export function ApiKeyForm({ error, submitLabel = 'Salvar', secondaryAction, onSaved }: ApiKeyFormProps) {
  const inputId = useId()
  const { saveApiKey } = useApiKey()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApiKeyFormValues>({ defaultValues: { apiKey: '' } })

  const onSubmit = handleSubmit(({ apiKey }) => {
    saveApiKey(apiKey.trim())
    onSaved?.()
  })

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <TextField
        id={inputId}
        label="API key"
        type="password"
        autoComplete="off"
        autoFocus
        description={`Enviada no header ${API_KEY_HEADER} e salva apenas nesta aba do navegador.`}
        error={errors.apiKey ?? (error ? { message: error } : undefined)}
        {...register('apiKey', {
          validate: (value) => value.trim() !== '' || 'Informe a API key',
        })}
      />
      <div className="flex justify-end gap-2">
        {secondaryAction}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
