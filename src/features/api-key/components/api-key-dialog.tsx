import { KeyRound } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ApiKeyForm } from '@/features/api-key/components/api-key-form'
import { useApiKey } from '@/features/api-key/use-api-key'
import { cn } from '@/lib/utils'

const VISIBLE_KEY_CHARS = 4

function maskApiKey(apiKey: string) {
  return `••••${apiKey.slice(-VISIBLE_KEY_CHARS)}`
}

export function ApiKeyDialog() {
  const [open, setOpen] = useState(false)
  const { apiKey, clearApiKey } = useApiKey()

  const handleSaved = () => {
    setOpen(false)
    toast.success('API key salva')
  }

  const handleClear = () => {
    clearApiKey()
    toast.info('API key removida')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <KeyRound />
          API key
          <Badge variant="secondary" className="gap-1.5">
            <span className={cn('size-1.5 rounded-full', apiKey ? 'bg-emerald-500' : 'bg-amber-500')} />
            {apiKey ? 'Configurada' : 'Pendente'}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API key</DialogTitle>
          <DialogDescription>Necessária para excluir pessoas. As demais operações são públicas.</DialogDescription>
        </DialogHeader>
        {apiKey && (
          <div className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm">
            <span>
              Chave atual: <code className="font-mono">{maskApiKey(apiKey)}</code>
            </span>
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Remover
            </Button>
          </div>
        )}
        <ApiKeyForm submitLabel={apiKey ? 'Substituir' : 'Salvar'} onSaved={handleSaved} />
      </DialogContent>
    </Dialog>
  )
}
