import { AppHeader } from '@/components/app-header'
import { DocumentSearch } from '@/features/people/components/document-search'
import { PeopleSection } from '@/features/people/components/people-section'

function App() {
  return (
    <div className="min-h-svh bg-muted/40">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
        <DocumentSearch />
        <PeopleSection />
      </main>
    </div>
  )
}

export default App
