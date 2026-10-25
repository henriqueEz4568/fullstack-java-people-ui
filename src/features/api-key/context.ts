import { createContext } from 'react'

export type ApiKeyContextValue = {
  apiKey: string | null
  saveApiKey: (apiKey: string) => void
  clearApiKey: () => void
}

export const ApiKeyContext = createContext<ApiKeyContextValue | null>(null)
