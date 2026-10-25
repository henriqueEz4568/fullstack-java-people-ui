import { Loader2, Search, SearchX, TriangleAlert, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconBadge } from '@/components/icon-badge'
import { StateMessage } from '@/components/state-message'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { getErrorMessage, getErrorStatus } from '@/lib/api-error'
import { PersonSummary } from '@/features/people/components/person-summary'
import { usePersonByDocument } from '@/features/people/hooks'
import { DOCUMENT_LENGTH, documentRules } from '@/features/people/validation'

type DocumentSearchFormProps = {
  searching: boolean
  canClear: boolean
  onSearch: (document: string) => void
  onClear: () => void
}

function DocumentSearchForm({ searching, canClear, onSearch, onClear }: DocumentSearchFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ document: string }>({ defaultValues: { document: '' } })

  const onSubmit = handleSubmit(({ document }) => onSearch(document))

  const handleClear = () => {
    reset()
    onClear()
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <Field data-invalid={Boolean(errors.document)}>
        <FieldLabel htmlFor="search-document">Documento</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="search-document"
            inputMode="numeric"
            maxLength={DOCUMENT_LENGTH}
            placeholder="12345678901"
            aria-invalid={Boolean(errors.document)}
            {...register('document', documentRules)}
          />
          <Button type="submit" disabled={searching}>
            {searching ? <Loader2 className="animate-spin" /> : <Search />}
            Buscar
          </Button>
          {canClear && (
            <Button type="button" variant="ghost" size="icon" aria-label="Limpar busca" onClick={handleClear}>
              <X />
            </Button>
          )}
        </div>
        <FieldError errors={[errors.document]} />
      </Field>
    </form>
  )
}

function DocumentSearchResult({ document }: { document: string }) {
  const { data: person, isPending, isError, error } = usePersonByDocument(document)

  if (isPending) {
    return <Skeleton className="h-20 w-full" />
  }

  if (isError) {
    const notFound = getErrorStatus(error) === 404
    return (
      <StateMessage
        icon={notFound ? SearchX : TriangleAlert}
        tone={notFound ? 'default' : 'destructive'}
        title={notFound ? 'Nenhuma pessoa encontrada' : 'Falha na busca'}
        description={notFound ? `Não há cadastro com o documento ${document}.` : getErrorMessage(error)}
      />
    )
  }

  return <PersonSummary person={person} />
}

export function DocumentSearch() {
  const [searchedDocument, setSearchedDocument] = useState<string | null>(null)
  const { isFetching } = usePersonByDocument(searchedDocument)

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <IconBadge icon={Search} />
          <div className="flex flex-col gap-1">
            <CardTitle>Buscar por documento</CardTitle>
            <CardDescription>Consulte um cadastro pelo documento de {DOCUMENT_LENGTH} dígitos.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <DocumentSearchForm
          searching={isFetching}
          canClear={searchedDocument !== null}
          onSearch={setSearchedDocument}
          onClear={() => setSearchedDocument(null)}
        />
        {searchedDocument && <DocumentSearchResult document={searchedDocument} />}
      </CardContent>
    </Card>
  )
}
