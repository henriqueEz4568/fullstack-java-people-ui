import { Globe, SearchX, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { StateMessage } from '@/components/state-message'
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
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { getErrorMessage, getErrorStatus } from '@/lib/api-error'
import { countryFlag, formatPercent } from '@/lib/format'
import { useNationality } from '@/features/people/hooks'
import type { Person } from '@/features/people/types'
import { getFullName } from '@/features/people/utils'

function NationalityResult({ document }: { document: string }) {
  const { data: nationality, isPending, isError, error } = useNationality(document)

  if (isPending) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-2 w-full" />
      </div>
    )
  }

  if (isError) {
    const notFound = getErrorStatus(error) === 404
    return (
      <StateMessage
        icon={notFound ? SearchX : TriangleAlert}
        tone={notFound ? 'default' : 'destructive'}
        title={notFound ? 'Nacionalidade não encontrada' : 'Falha ao consultar a nacionalidade'}
        description={getErrorMessage(error)}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-3xl" aria-hidden>
          {countryFlag(nationality.countryCode)}
        </span>
        <div className="flex flex-col">
          <span className="text-lg font-medium">{nationality.countryName}</span>
          <Badge variant="outline">{nationality.countryCode}</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Probabilidade</span>
          <span className="font-medium">{formatPercent(nationality.probability)}</span>
        </div>
        <Progress value={nationality.probability * 100} aria-label="Probabilidade" />
      </div>
    </div>
  )
}

export function NationalityDialog({ person }: { person: Person }) {
  const [open, setOpen] = useState(false)
  const fullName = getFullName(person)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Ver nacionalidade de ${fullName}`}
          title="Nacionalidade"
          className="text-muted-foreground hover:text-primary"
        >
          <Globe />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nacionalidade provável</DialogTitle>
          <DialogDescription>
            Previsão para {fullName} a partir do primeiro nome, consultada em nationalize.io.
          </DialogDescription>
        </DialogHeader>
        <NationalityResult document={person.document} />
      </DialogContent>
    </Dialog>
  )
}
