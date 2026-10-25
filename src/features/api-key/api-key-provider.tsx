import { useMemo, useState, type PropsWithChildren } from 'react'
import { ApiKeyContext, type ApiKeyContextValue } from '@/features/api-key/context'
import { apiKeyStorage } from '@/features/api-key/storage'

export function ApiKeyProvider({ children }: PropsWithChildren) {
  const [apiKey, setApiKey] = useState(apiKeyStorage.get)

  const value = useMemo<ApiKeyContextValue>(
    () => ({
      apiKey,
      saveApiKey: (nextApiKey) => {
        apiKeyStorage.set(nextApiKey)
        setApiKey(nextApiKey)
      },
      clearApiKey: () => {
        apiKeyStorage.clear()
        setApiKey(null)
      },
    }),
    [apiKey],
  )

  return <ApiKeyContext value={value}>{children}</ApiKeyContext>
}
