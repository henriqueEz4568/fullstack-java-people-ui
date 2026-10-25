import type { ComponentProps } from 'react'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type TextFieldProps = ComponentProps<typeof Input> & {
  id: string
  label: string
  description?: string
  error?: { message?: string }
}

export function TextField({ id, label, description, error, ...inputProps }: TextFieldProps) {
  const invalid = Boolean(error)

  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} aria-invalid={invalid} {...inputProps} />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={[error]} />
    </Field>
  )
}
