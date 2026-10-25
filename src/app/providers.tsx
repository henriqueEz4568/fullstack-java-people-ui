import { QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { ApiKeyProvider } from '@/features/api-key/api-key-provider'
import { queryClient } from '@/lib/query-client'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiKeyProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ApiKeyProvider>
    </QueryClientProvider>
  )
}
