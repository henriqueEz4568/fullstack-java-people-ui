import { Users } from 'lucide-react'
import { ApiKeyDialog } from '@/features/api-key/components/api-key-dialog'

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">People</span>
            <span className="hidden text-sm text-muted-foreground sm:block">Cadastro e consulta de pessoas</span>
          </div>
        </div>
        <ApiKeyDialog />
      </div>
    </header>
  )
}
