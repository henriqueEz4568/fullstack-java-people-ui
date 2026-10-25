import { Users } from 'lucide-react'
import { ApiKeyDialog } from '@/features/api-key/components/api-key-dialog'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight">People</span>
            <span className="hidden text-xs text-muted-foreground sm:block">Cadastro e consulta de pessoas</span>
          </div>
        </div>
        <ApiKeyDialog />
      </div>
    </header>
  )
}
