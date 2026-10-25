import { isAxiosError } from 'axios'

export type ProblemDetail = {
  status: number
  title?: string
  detail?: string
  instance?: string
  errors?: Record<string, string>
}

const STATUS_MESSAGES: Record<number, string> = {
  401: 'API key ausente ou inválida',
}

export function getErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined
}

export function getProblemDetail(error: unknown): ProblemDetail | undefined {
  if (!isAxiosError(error) || !error.response) {
    return undefined
  }

  const { data, status } = error.response
  const body = typeof data === 'object' && data !== null ? data : {}
  return { ...body, status }
}

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error) && !error.response) {
    return 'Não foi possível conectar à API. Verifique se ela está no ar e se o CORS libera esta origem.'
  }

  const problem = getProblemDetail(error)
  if (!problem) {
    return 'Erro inesperado'
  }

  return problem.detail ?? STATUS_MESSAGES[problem.status] ?? 'Erro inesperado'
}
