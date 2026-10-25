import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <main className="flex min-h-svh items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => toast.success('shadcn/ui funcionando')}>
            Testar
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </main>
  )
}

export default App
