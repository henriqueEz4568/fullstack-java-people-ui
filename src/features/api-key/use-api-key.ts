import { useContext } from 'react'
import { ApiKeyContext } from '@/features/api-key/context'

export function useApiKey() {
  const context = useContext(ApiKeyContext)
  if (!context) {
    throw new Error('useApiKey must be used within ApiKeyProvider')
  }
  return context
}
