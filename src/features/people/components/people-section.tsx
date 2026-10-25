import { RefreshCw, TriangleAlert, Users } from 'lucide-react'
import { StateMessage } from '@/components/state-message'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getErrorMessage } from '@/lib/api-error'
import { cn } from '@/lib/utils'
import { CreatePersonDialog } from '@/features/people/components/create-person-dialog'
import { PeopleTable, PeopleTableSkeleton } from '@/features/people/components/people-table'
import { usePeople } from '@/features/people/hooks'

function describeCount(count: number) {
  return count === 1 ? '1 pessoa cadastrada' : `${count} pessoas cadastradas`
}

function PeopleContent() {
  const { data: people, isPending, isError, error, refetch } = usePeople()

  if (isPending) {
    return <PeopleTableSkeleton />
  }

  if (isError) {
    return (
      <StateMessage
        icon={TriangleAlert}
        tone="destructive"
        title="Não foi possível carregar as pessoas"
        description={getErrorMessage(error)}
        action={
          <Button variant="outline" onClick={() => refetch()}>
            Tentar novamente
          </Button>
        }
      />
    )
  }

  if (people.length === 0) {
    return (
      <StateMessage
        icon={Users}
        title="Nenhuma pessoa cadastrada"
        description="Use o botão Nova pessoa para fazer o primeiro cadastro."
      />
    )
  }

  return <PeopleTable people={people} />
}

export function PeopleSection() {
  const { data: people, isFetching, refetch } = usePeople()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pessoas</CardTitle>
        <CardDescription>{people ? describeCount(people.length) : 'Lista de todos os cadastros'}</CardDescription>
        <CardAction className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Atualizar lista"
            title="Atualizar lista"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            <RefreshCw className={cn(isFetching && 'animate-spin')} />
          </Button>
          <CreatePersonDialog />
        </CardAction>
      </CardHeader>
      <CardContent>
        <PeopleContent />
      </CardContent>
    </Card>
  )
}
