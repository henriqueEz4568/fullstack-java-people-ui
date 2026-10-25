const STORAGE_KEY = 'people-ui:api-key'

function withSessionStorage<T>(action: (storage: Storage) => T, fallback: T): T {
  try {
    return action(window.sessionStorage)
  } catch {
    return fallback
  }
}

export const apiKeyStorage = {
  get: () => withSessionStorage((storage) => storage.getItem(STORAGE_KEY), null),
  set: (apiKey: string) => withSessionStorage((storage) => storage.setItem(STORAGE_KEY, apiKey), undefined),
  clear: () => withSessionStorage((storage) => storage.removeItem(STORAGE_KEY), undefined),
}
