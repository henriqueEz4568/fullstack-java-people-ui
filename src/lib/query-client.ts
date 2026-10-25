import { QueryClient } from '@tanstack/react-query'
import { getErrorStatus } from '@/lib/api-error'

const MAX_RETRIES = 2

function isRetryable(error: unknown) {
  const status = getErrorStatus(error)
  return status === undefined || status >= 500
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => failureCount < MAX_RETRIES && isRetryable(error),
      refetchOnWindowFocus: false,
    },
  },
})
