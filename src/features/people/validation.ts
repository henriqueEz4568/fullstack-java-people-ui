import type { RegisterOptions } from 'react-hook-form'
import type { PersonInput } from '@/features/people/types'

const NAME_MAX_LENGTH = 100
const EMAIL_MAX_LENGTH = 255
const DOCUMENT_PATTERN = /^\d{11}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+$/

export const DOCUMENT_LENGTH = 11

const notBlank = (value: string) => value.trim() !== '' || 'É obrigatório'

export const documentRules = {
  required: 'É obrigatório',
  pattern: { value: DOCUMENT_PATTERN, message: 'Deve conter exatamente 11 dígitos numéricos' },
} satisfies RegisterOptions

const nameRules = {
  validate: notBlank,
  maxLength: { value: NAME_MAX_LENGTH, message: `Deve ter no máximo ${NAME_MAX_LENGTH} caracteres` },
} satisfies RegisterOptions

export const personRules = {
  document: documentRules,
  firstName: nameRules,
  lastName: nameRules,
  email: {
    validate: notBlank,
    pattern: { value: EMAIL_PATTERN, message: 'Deve ser um e-mail válido' },
    maxLength: { value: EMAIL_MAX_LENGTH, message: `Deve ter no máximo ${EMAIL_MAX_LENGTH} caracteres` },
  },
} satisfies Record<keyof PersonInput, RegisterOptions>

export function isPersonField(field: string): field is keyof PersonInput {
  return field in personRules
}
